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
var SamsaraPanel = (function (_super) {
    __extends(SamsaraPanel, _super);
    function SamsaraPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SamsaraPanel.prototype.childrenCreated = function () {
        this.init();
    };
    SamsaraPanel.prototype.init = function () {
        this.lvImgAry = [this.lv0, this.lv1, this.lv2, this.lv3, this.lv4, this.lv5];
        this.effectContainerAry = [this.eff0, this.eff1, this.eff2, this.eff3, this.eff4, this.eff5];
        for (var i in this.effectContainerAry) {
            var effect = new MovieClip();
            effect.playFile(RES_DIR_EFF + "reincarnation_fire", -1);
            this.effectContainerAry[i].addChild(effect);
        }
        this.ballEffect = new MovieClip();
        this.ballEffect.playFile(RES_DIR_EFF + "reincarnation_ball", -1);
        this.ball.addChild(this.ballEffect);
        this.labelEffect = new MovieClip;
        this.labelEffect.scaleX = 0.7;
        this.labelEffect.scaleY = 0.5;
        this.labelEffect.touchEnabled = false;
        this.redPoint.visible = false;
        this.getItemTxt.textFlow = (new egret.HtmlTextParser).parser("<a href=\"event:\"><u>" + this.getItemTxt.text + "</u></a>");
    };
    SamsaraPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.getItemTxt, this.getItem);
        this.addTouchEvent(this.upBtn, this.upgrade);
        this.observe(SamsaraCC.ins().postSamsaraInfo, this.updateView);
        this.updateView();
    };
    SamsaraPanel.prototype.upgrade = function () {
        if (this.isExpEnough) {
            SamsaraCC.ins().upgradeSamsaraLv();
        }
        else {
            UserTips.ins().showTips("业力不足");
        }
    };
    SamsaraPanel.prototype.getItem = function () {
        ViewManager.ins().open(GetSamsaraExpPanel);
    };
    SamsaraPanel.prototype.getValue = function (attrs, typeValue) {
        var obj = CommonUtils.getObjectByAttr(attrs, "type", typeValue);
        return obj.value.toString();
    };
    SamsaraPanel.prototype.updateView = function () {
        var mode = SamsaraModel.ins().samsaraInfo;
        var lv = mode.lv;
        var cfg = GlobalConfig.ReincarnationLevel[lv];
        var attrDesc = AttributeData.getAttStr(cfg.attrs, 0, 1, "  :  ");
        this.attr1.text = attrDesc;
        var power = UserBag.getAttrPower(cfg.attrs) * 3;
        this.powerPanel1.setPower(power);
        var percent;
        var nextLv = lv + 1;
        var isMax = nextLv >= CommonUtils.getObjectLength(GlobalConfig.ReincarnationLevel);
        if (isMax) {
            this.powerPanel0.setPower(power);
            this.attr0.text = attrDesc;
            this.yeliValue.text = "已满级";
            percent = 1;
        }
        else {
            var nextCfg = GlobalConfig.ReincarnationLevel[nextLv];
            var nextPower = UserBag.getAttrPower(nextCfg.attrs) * 3;
            this.powerPanel2.setPower(nextPower);
            attrDesc = AttributeData.getAttStr(nextCfg.attrs, 0, 1, "  :  ");
            this.attr2.text = attrDesc;
            var colorStr = void 0;
            var exp = mode.exp;
            var needExp = nextCfg.consume;
            if (exp >= needExp) {
                colorStr = ColorUtil.GREEN_COLOR;
                this.isExpEnough = true;
            }
            else {
                colorStr = ColorUtil.RED_COLOR;
                this.isExpEnough = false;
            }
            this.yeliValue.textFlow = TextFlowMaker.generateTextFlow("<font color=" + colorStr + ">" + exp + "</font><font color=" + ColorUtil.WHITE_COLOR + ">/" + needExp + "</font> ");
            percent = exp / needExp;
        }
        this.setMaxSamsaraState(isMax);
        if (SamsaraModel.ins().isCanExchange()) {
            this.addLabelEffect();
        }
        else {
            this.removeLabelEffect();
        }
        var lv1 = SamsaraModel.ins().getSamsara(Actor.samsaraLv);
        var lv2 = SamsaraModel.ins().getSamsaraLv(Actor.samsaraLv);
        var desc = SamsaraModel.ins().getSamsaraDesc(lv1) + "·" + SamsaraModel.ins().getSamsaraLvDesc(lv2);
        this.lunhuiLv.text = desc;
        this.setLvImgState(lv2);
        this.maskImage(percent);
        this.redPoint.visible = this.upBtn.visible && SamsaraModel.ins().isCanUpgrade();
    };
    SamsaraPanel.prototype.setMaxSamsaraState = function (isMax) {
        this.attrGroup0.visible = isMax;
        this["arrow"].visible = !isMax;
        this.attrGroup1.visible = !isMax;
        this.attrGroup2.visible = !isMax;
        this.upBtn.visible = !isMax;
        this.getItemTxt.visible = !isMax;
        this.maxLevel.visible = isMax;
    };
    SamsaraPanel.prototype.setLvImgState = function (samsaraLv) {
        for (var i in this.lvImgAry) {
            this.lvImgAry[i].visible = false;
            this.effectContainerAry[i].visible = false;
        }
        for (var i = 0; i <= samsaraLv; i++) {
            this.lvImgAry[i].visible = true;
            this.effectContainerAry[i].visible = true;
        }
    };
    SamsaraPanel.prototype.addLabelEffect = function () {
        var _this = this;
        TimerManager.ins().doNext(function () {
            DisplayUtils.removeFromParent(_this.labelEffect);
            _this.labelEffect.x = _this.getItemTxt.x + _this.getItemTxt.width / 2;
            _this.labelEffect.y = _this.getItemTxt.y + _this.getItemTxt.height / 2;
            if (_this.labelEffect.parent == null) {
                _this.getItemTxt.parent.addChild(_this.labelEffect);
            }
            _this.labelEffect.playFile(RES_DIR_EFF + "chargeff1", -1);
        }, this);
    };
    SamsaraPanel.prototype.maskImage = function (percent) {
        if (percent >= 1) {
            DisplayUtils.removeFromParent(this.masksp);
            this.masksp = null;
            return;
        }
        var imgHeight = 103;
        if (!this.masksp) {
            this.masksp = new egret.Sprite();
            var square = new egret.Shape();
            square.graphics.beginFill(0xffff00);
            square.graphics.drawRect(this.ball.x - 60, this.ball.y - 45, 120, imgHeight);
            square.graphics.endFill();
            this.masksp.addChild(square);
            this.ball.parent.addChild(this.masksp);
            this.ball.mask = this.masksp;
        }
        this.masksp.y = imgHeight * (1 - percent);
    };
    SamsaraPanel.prototype.removeLabelEffect = function () {
        this.labelEffect.stop();
        DisplayUtils.removeFromParent(this.labelEffect);
    };
    SamsaraPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
    };
    return SamsaraPanel;
}(BaseView));
__reflect(SamsaraPanel.prototype, "SamsaraPanel");
//# sourceMappingURL=SamsaraPanel.js.map