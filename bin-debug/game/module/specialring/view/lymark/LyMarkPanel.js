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
var LyMarkPanel = (function (_super) {
    __extends(LyMarkPanel, _super);
    function LyMarkPanel() {
        var _this = _super.call(this) || this;
        _this._angle = 0.1;
        _this._angles = [0, 0, 0, 0, 0, 0, 0];
        _this._circleCenter = { x: 279, y: 229 };
        _this._a = 155;
        _this._b = 80;
        _this._oldBallNum = 0;
        _this.expBar = new ProgressBarEff();
        return _this;
    }
    LyMarkPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.mixItemTxt.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:" + this.mixItemTxt.text);
        this.expBar.setWidth(470);
        this.expBar.x = -85;
        this.expBar.y = -15;
        this.schedule.addChild(this.expBar);
    };
    LyMarkPanel.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.observe(LyMark.ins().postMarkData, this.update);
        this.observe(UserBag.ins().postItemAdd, this.updateMaterial);
        this.observe(UserBag.ins().postItemChange, this.updateMaterial);
        this.observe(LyMark.ins().postUpgrade, this.updateEff);
        this.addTouchEvent(this, this.onTouch);
        this._oldBallNum = 0;
        this.update();
    };
    LyMarkPanel.prototype.close = function () {
        this.removeTouchEvent(this, this.onTouch);
        this.removeObserve();
        this._materailInfo = null;
        this.resetBalls();
        this.clearRedEff();
        this.expBar.reset();
    };
    LyMarkPanel.prototype.resetBalls = function () {
        TimerManager.ins().removeAll(this);
        if (this._balls) {
            var len = this._balls.length;
            for (var i = 0; i < len; i++) {
                this._balls[i].destroy();
                this._balls[i] = null;
            }
            this._balls.length = 0;
            this._balls = null;
        }
    };
    LyMarkPanel.prototype.update = function () {
        var max = LyMark.ins().isMax, level = LyMark.ins().lyMarkLv;
        this.currentState = max ? "max" : "normal";
        this.lvtxt.text = "Lv." + LyMark.ins().lyMarkLv;
        var objAtts = [];
        var cfg = GlobalConfig.FlameStampLevel[level];
        var attr;
        for (var k in cfg.attrs)
            objAtts.push(new AttributeData(cfg.attrs[k].type, cfg.attrs[k].value));
        var totalPower = UserBag.getAttrPower(objAtts);
        this.nowAttr.textFlow = TextFlowMaker.generateTextFlow1(AttributeData.getAttStr(objAtts, 0, 1, "："));
        if (this.expBar.getMaxValue() != cfg.exp) {
            this.expBar.setData(LyMark.ins().lyMarkExp, cfg.exp);
        }
        else
            this.expBar.setValue(LyMark.ins().lyMarkExp);
        if (!max) {
            objAtts = [];
            var nextCfg = GlobalConfig.FlameStampLevel[level + 1];
            for (var k in nextCfg.attrs)
                objAtts.push(new AttributeData(nextCfg.attrs[k].type, nextCfg.attrs[k].value));
            this.nextAttr.textFlow = TextFlowMaker.generateTextFlow1(AttributeData.getAttStr(objAtts, 0, 1, "："));
            var itemConfig = GlobalConfig.ItemConfig[cfg.costItem];
            this.costImg.source = itemConfig.icon + '_png';
            this.updateMaterial();
        }
        else
            this.clearRedEff();
        var skillLv, effectCfg;
        var bollNum = 0, realLv = 0;
        for (var i = 0; i <= 6; i++) {
            realLv = skillLv = LyMark.ins().getSkillLvById(i + 1);
            if (!skillLv)
                skillLv = 1;
            effectCfg = GlobalConfig.FlameStampEffect[i + 1][skillLv];
            this["skill" + i].setCfg(effectCfg);
            if ((i + 1 == 1 || i + 1 == 2) && realLv)
                bollNum = effectCfg.stamp;
            if (realLv)
                totalPower += effectCfg.exPower;
        }
        var roleNum = SubRoles.ins().subRolesLen;
        this.power.setPower(totalPower * roleNum);
        if (bollNum && this._oldBallNum != bollNum) {
            this.resetBalls();
            this._oldBallNum = bollNum;
            if (!this._balls) {
                this._balls = [];
                TimerManager.ins().doTimer(17 * 3, 0, this.doCircle, this);
            }
            var ball = void 0;
            var radian = 2 * Math.PI / bollNum;
            for (var i = 0; i < bollNum; i++) {
                ball = ObjectPool.pop("MovieClip");
                this.img.parent.addChild(ball);
                this._angles[i] = radian * i;
                ball.x = this._a * Math.cos(radian * i) + this._circleCenter.x;
                ball.y = this._b * Math.sin(radian * i) + this._circleCenter.y;
                this._balls.push(ball);
                ball.playFile(RES_DIR_EFF + "lymarkeff", -1);
            }
        }
    };
    LyMarkPanel.prototype.doCircle = function () {
        if (!this._balls) {
            TimerManager.ins().removeAll(this);
            return;
        }
        var len = this._balls.length, ball;
        var parent;
        var imgIndex = 0, selfIndex = 0;
        for (var i = 0; i < len; i++) {
            ball = this._balls[i];
            ball.x = this._a * Math.cos(this._angles[i]) + this._circleCenter.x;
            ball.y = this._b * Math.sin(this._angles[i]) + this._circleCenter.y;
            this._angles[i] += this._angle;
            this._angles[i] = this._angles[i] % (2 * Math.PI);
            parent = ball.parent;
            imgIndex = parent.getChildIndex(this.img);
            selfIndex = parent.getChildIndex(ball);
            if (this._angles[i] >= 2.5 && this._angles[i] <= 6) {
                if (selfIndex > imgIndex)
                    parent.addChildAt(ball, 3);
            }
            else {
                if (selfIndex < imgIndex)
                    parent.addChildAt(ball, parent.numChildren);
            }
        }
    };
    LyMarkPanel.prototype.updateMaterial = function () {
        if (LyMark.ins().isMax)
            return;
        var cfg = GlobalConfig.FlameStampLevel[LyMark.ins().lyMarkLv];
        var itemData = UserBag.ins().getBagItemById(cfg.costItem);
        var count = itemData ? itemData.count : 0;
        this.costCount.textFlow = TextFlowMaker.generateTextFlow1("|C:" + (count < cfg.costCount ? '0xFF0000' : '0x00FF00') + "&T:" + count + "|/" + cfg.costCount);
        this._materailInfo = { enough: count >= cfg.costCount, id: cfg.costItem };
        var needExp = cfg.exp - LyMark.ins().lyMarkExp;
        if (count >= cfg.costCount && count * GlobalConfig.FlameStampMat[cfg.costItem].exp >= needExp) {
            if (!this._redEffect) {
                this._redEffect = ObjectPool.pop("MovieClip");
                this._redEffect.touchEnabled = false;
                this.lvupGroup.addChild(this._redEffect);
                this._redEffect.x = 77;
                this._redEffect.y = 28;
                this._redEffect.playFile(RES_DIR_EFF + "chargeff1", -1);
            }
        }
        else
            this.clearRedEff();
    };
    LyMarkPanel.prototype.clearRedEff = function () {
        if (this._redEffect) {
            this._redEffect.destroy();
            this._redEffect = null;
        }
    };
    LyMarkPanel.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.lvupBtn:
                if (this._materailInfo.enough)
                    LyMark.ins().sendUpgrade();
                else
                    UserTips.ins().showTips("材料不足");
                break;
            case this.mixItemTxt:
                ViewManager.ins().open(LyMarkMixWin);
                break;
            case this.skill0:
            case this.skill1:
            case this.skill2:
            case this.skill3:
            case this.skill4:
            case this.skill5:
            case this.skill6:
                ViewManager.ins().open(LyMarkSkillTipsWin, e.target.getCfg());
                break;
        }
    };
    LyMarkPanel.prototype.updateEff = function (param) {
        var crit = param[0];
        if (crit > 1) {
            var img_1 = new eui.Image("xn_wingup" + crit);
            img_1.horizontalCenter = 0;
            img_1.verticalCenter = 0;
            img_1.scaleX = img_1.scaleY = 0.5;
            var t = egret.Tween.get(img_1);
            t.to({ "scaleX": 1.5, "scaleY": 1.5, "alpha": 0 }, 500).call(function () {
                DisplayUtils.removeFromParent(img_1);
            }, this);
            this.actEff.addChild(img_1);
        }
    };
    return LyMarkPanel;
}(BaseEuiView));
__reflect(LyMarkPanel.prototype, "LyMarkPanel");
//# sourceMappingURL=LyMarkPanel.js.map