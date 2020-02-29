var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var LyMarkSkillTipsWin = (function (_super) {
    __extends(LyMarkSkillTipsWin, _super);
    function LyMarkSkillTipsWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "markSkillTipsSkin";
        _this.isTopLevel = true;
        return _this;
    }
    LyMarkSkillTipsWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._cfg = args[0];
        this.addTouchEvent(this, this.onTouch);
        this.observe(LyMark.ins().postMarkData, this.resetCfg);
        this.observe(UserBag.ins().postItemAdd, this.updateData);
        this.observe(UserBag.ins().postItemChange, this.updateData);
        this.updateData();
    };
    LyMarkSkillTipsWin.prototype.close = function () {
        this.removeTouchEvent(this, this.onTouch);
        this.removeObserve();
        if (this._uiEffect) {
            this._uiEffect.destroy();
            this._uiEffect = null;
        }
    };
    LyMarkSkillTipsWin.prototype.resetCfg = function () {
        var skillLv = LyMark.ins().getSkillLvById(this._cfg.id);
        if (!skillLv)
            skillLv = 1;
        this._cfg = GlobalConfig.FlameStampEffect[this._cfg.id][skillLv];
        this.updateData();
    };
    LyMarkSkillTipsWin.prototype.updateData = function () {
        this.currentState = "skill" + (this._cfg.id - 1);
        this.skillImg.source = this._cfg.icon;
        this.nametxt.text = this._cfg.skillname;
        var lv = LyMark.ins().getSkillLvById(this._cfg.id);
        this.lvtxt.text = "Lv." + lv;
        this.redpoint.visible = false;
        this.nextLevel.text = "";
        if (this._cfg.id == 1) {
            var time = 0;
            var lv3 = LyMark.ins().getSkillLvById(3);
            var mCd = lv3 ? GlobalConfig.FlameStampEffect[3][lv3].reloadTime : 0;
            var skillID = this._cfg.skillId;
            var count = this._cfg.stamp;
            if (!lv)
                mCd = 0;
            else if (LyMark.ins().getSkillLvById(2)) {
                lv3 = LyMark.ins().getSkillLvById(2);
                skillID = GlobalConfig.FlameStampEffect[2][lv3].skillId;
                count = GlobalConfig.FlameStampEffect[2][lv3].stamp;
            }
            var skillDes = GlobalConfig.SkillsDescConfig[GlobalConfig.SkillsConfig[skillID].desc];
            time = (skillDes.cd - mCd) / 1000 >> 0;
            this.keyDesctxt.text = "充能时间：" + time + "秒";
            this.skillDesctxt.textFlow = TextFlowMaker.generateTextFlow1(skillDes.desc.replace("{0}", "|C:" + 0x00ff00 + "&T:" + (time / count >> 0) + "|").replace("{1}", "|C:" + 0x00ff00 + "&T:" + count + "|"));
            this.damageDesctxt.textFlow = TextFlowMaker.generateTextFlow1(LyMark.ins().lyMarkLv ? GlobalConfig.FlameStampLevel[LyMark.ins().lyMarkLv].bulletDesc : "");
        }
        else {
            if (this._cfg.id == 2 || this._cfg.id == 3 || this._cfg.id == 7)
                this.keyDesctxt.text = "最大等级：" + Object.keys(GlobalConfig.FlameStampEffect[this._cfg.id]).length;
            else
                this.keyDesctxt.text = "触发概率：" + (GlobalConfig.EffectsConfig[this._cfg.id == 4 ? this._cfg.selfEffId : this._cfg.effId].probabilityBuff / 100 >> 0) + "%";
            this.skillDesctxt.textFlow = TextFlowMaker.generateTextFlow1(this._cfg.skillDesc);
            var isMax = lv >= (Object.keys(GlobalConfig.FlameStampEffect[this._cfg.id]).length);
            this.cost.visible = false;
            this.update.visible = false;
            if (!isMax) {
                var nextCfg = GlobalConfig.FlameStampEffect[this._cfg.id][lv <= 0 ? 1 : lv + 1];
                if (nextCfg.costItem) {
                    var itemConfig = GlobalConfig.ItemConfig[nextCfg.costItem];
                    this.costImg.source = itemConfig.icon + '_png';
                    var itemData = UserBag.ins().getBagItemById(nextCfg.costItem);
                    var count = itemData ? itemData.count : 0;
                    this.costNum.textFlow = TextFlowMaker.generateTextFlow1("|C:" + (count < nextCfg.costCount ? 0xff0000 : 0xD1C28F) + "&T:X " + nextCfg.costCount + "|");
                    this.redpoint.visible = count >= nextCfg.costCount && LyMark.ins().lyMarkLv >= nextCfg.stampLevel;
                    this._nextCfg = nextCfg;
                    if (LyMark.ins().lyMarkLv >= nextCfg.stampLevel) {
                        this.cost.visible = count < nextCfg.costCount;
                        this.update.visible = !this.cost.visible;
                    }
                    else
                        this.nextLevel.text = "烈焰印记达到" + nextCfg.stampLevel + "级解锁升级";
                }
                else if (LyMark.ins().lyMarkLv < nextCfg.stampLevel) {
                    this.nextLevel.text = "烈焰印记达到" + nextCfg.stampLevel + "级自动升级";
                }
            }
        }
        if (!this._uiEffect) {
            this._uiEffect = ObjectPool.pop("MovieClip");
            this.uieff.addChild(this._uiEffect);
        }
        this._uiEffect.playFile("" + RES_DIR_EFF + this._cfg.uiEff, -1);
    };
    LyMarkSkillTipsWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.update:
                if (this.redpoint.visible)
                    LyMark.ins().sendUpSkill(this._cfg.id);
                else {
                    if (this._nextCfg.stampLevel > LyMark.ins().lyMarkLv)
                        UserTips.ins().showTips("需要烈焰印记达到" + this._nextCfg.stampLevel + "级");
                    else
                        UserTips.ins().showTips("材料不足");
                }
                break;
        }
    };
    return LyMarkSkillTipsWin;
}(BaseEuiView));
__reflect(LyMarkSkillTipsWin.prototype, "LyMarkSkillTipsWin");
ViewManager.ins().reg(LyMarkSkillTipsWin, LayerManager.UI_Main);
//# sourceMappingURL=LyMarkSkillTipsWin.js.map