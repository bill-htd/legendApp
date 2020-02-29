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
var JadePanel = (function (_super) {
    __extends(JadePanel, _super);
    function JadePanel() {
        var _this = _super.call(this) || this;
        _this._starList = null;
        _this._oldLevel = 0;
        _this.isTopLevel = true;
        return _this;
    }
    JadePanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this._starList = new StarList(10);
        this._starList.x = 15;
        this._starList.y = 0;
        this.starGroup.addChild(this._starList);
        this._iconY = this.yupei.y;
        this._iconMoveY = this.yupei.y - 10;
    };
    JadePanel.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._oldLevel = LiLian.ins().jadeLv;
        this.observe(LiLian.ins().postJadeLv, this.update);
        this.observe(UserBag.ins().postItemAdd, this.updateMaterial);
        this.observe(UserBag.ins().postItemChange, this.updateMaterial);
        this.addTouchEvent(this, this.onTouch);
        this.update();
        this.playIconTween();
    };
    JadePanel.prototype.close = function () {
        this.removeObserve();
        this.removeTouchEvent(this, this.onTouch);
        this.stopIconTween();
    };
    JadePanel.prototype.playIconTween = function () {
        this.yupei.y = this._iconY;
        egret.Tween.removeTweens(this.yupei);
        egret.Tween.get(this.yupei, { loop: true }).to({ y: this._iconMoveY }, 1000).to({ y: this._iconY }, 1000);
    };
    JadePanel.prototype.stopIconTween = function () {
        egret.Tween.removeTweens(this.yupei);
    };
    JadePanel.prototype.update = function () {
        var level = LiLian.ins().jadeLv;
        var objAtts = [];
        var cfg = GlobalConfig.YuPeiConfig[level];
        var per = 0;
        var attr;
        for (var k in cfg.attrs) {
            attr = cfg.attrs[k];
            if (attr.type == AttributeType.atYuPeiDeterDam)
                per = Math.floor(attr.value / 10000 * 100);
            objAtts.push(new AttributeData(attr.type, attr.value));
        }
        this.powerPanel.setPower(UserBag.getAttrPower(objAtts));
        var phase = Math.floor(level / GlobalConfig.YuPeiBasicConfig.perLevel) + 1;
        this.stairImg.setValue(phase);
        var isMax = LiLian.ins().isJadeMax();
        var isUpgrade;
        if (isMax) {
            this.maxGroup.visible = false;
            this.maxLevel.visible = this.maxShowGroup.visible = true;
            this.maxCurAtt.textFlow = TextFlowMaker.generateTextFlow1(AttributeData.getAttStr(objAtts, 0, 1, "："));
        }
        else {
            this.maxGroup.visible = true;
            isUpgrade = this._oldLevel != level;
            this._starList.setStarNum(level % GlobalConfig.YuPeiBasicConfig.perLevel, isUpgrade ? 1 : 0);
            this._oldLevel = level;
            this.updateMaterial();
            this.curAtt.textFlow = TextFlowMaker.generateTextFlow1(AttributeData.getAttStr(objAtts, 0, 1, "："));
            objAtts = [];
            var nextCfg = GlobalConfig.YuPeiConfig[level + 1];
            for (var k in nextCfg.attrs)
                objAtts.push(new AttributeData(nextCfg.attrs[k].type, nextCfg.attrs[k].value));
            this.nextAtt.textFlow = TextFlowMaker.generateTextFlow1(AttributeData.getAttStr(objAtts, 0, 1, "："));
        }
        this.yupei.setLevel(level, isUpgrade && (level % GlobalConfig.YuPeiBasicConfig.perLevel) == 10);
    };
    JadePanel.prototype.updateMaterial = function () {
        var isMax = LiLian.ins().isJadeMax();
        if (isMax)
            return;
        var level = LiLian.ins().jadeLv;
        var str = "";
        this._materialEn = true;
        var cfg = GlobalConfig.YuPeiConfig[level];
        if (cfg.item_id > 0) {
            var item = GlobalConfig.ItemConfig[cfg.item_id];
            var itemData = UserBag.ins().getBagItemById(cfg.item_id);
            var count = itemData ? itemData.count : 0;
            str = "拥有" + item.name + ":|C:" + (count < cfg.count ? "0xFF0000" : "0x00FF00") + "&T:" + count + "|/" + cfg.count;
            this._materialEn = count >= cfg.count;
        }
        this.material.textFlow = TextFlowMaker.generateTextFlow1(str);
        this.redPoint.visible = LiLian.ins().checkJadeRed();
        this.upgradeBtn.label = this._materialEn ? ((level % GlobalConfig.YuPeiBasicConfig.perLevel) == 10 ? "升阶" : "升级") : "获得材料";
        this.upgradeBtn.visible = !isMax;
    };
    JadePanel.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.upgradeBtn:
                if (!this._materialEn) {
                    UserWarn.ins().setBuyGoodsWarn(GlobalConfig.YuPeiConfig[LiLian.ins().jadeLv].item_id);
                    return;
                }
                LiLian.ins().jadeUpgrade();
                break;
            case this.closeBtn:
                ViewManager.ins().close(LiLianWin);
                break;
            case this.deter:
                ViewManager.ins().open(JadeSkillWin);
                break;
        }
    };
    return JadePanel;
}(BaseEuiView));
__reflect(JadePanel.prototype, "JadePanel");
//# sourceMappingURL=JadePanel.js.map