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
var Vip3Win = (function (_super) {
    __extends(Vip3Win, _super);
    function Vip3Win() {
        var _this = _super.call(this) || this;
        _this.isTopLevel = true;
        return _this;
    }
    Vip3Win.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "Vip3Skin";
        this.artifactEff = new MovieClip;
        this.artifactEff.x = 233;
        this.artifactEff.y = 335;
        var proportionW = 0.178;
        var proportionH = this.height * 0.556;
        this.qualityEff1 = new MovieClip;
        this.qualityEff1.x = this.width * proportionW;
        this.qualityEff1.y = proportionH;
        this.qualityEff2 = new MovieClip;
        this.qualityEff2.x = this.width * 0.5;
        this.qualityEff2.y = proportionH;
        this.qualityEff3 = new MovieClip;
        this.qualityEff3.x = this.width * (1 - proportionW);
        this.qualityEff3.y = proportionH;
        this.closeBtn1Eff = new MovieClip();
        this.closeBtn1Eff.x = this.closeBtn1.x + this.closeBtn1.width / 2 - 2;
        this.closeBtn1Eff.y = this.closeBtn1.y + this.closeBtn1.height / 2 + 2;
        this.closeBtn1Eff.touchEnabled = false;
    };
    Vip3Win.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.addTouchEvent(this.closeBtn1, this.onTap);
        this.addTouchEvent(this.sureBtn, this.onTap);
        this.qualityEff1.playFile(RES_DIR_EFF + "quality_05", -1);
        this.addChild(this.qualityEff1);
        this.qualityEff2.playFile(RES_DIR_EFF + "quality_05", -1);
        this.addChild(this.qualityEff2);
        this.qualityEff3.playFile(RES_DIR_EFF + "quality_05", -1);
        this.addChild(this.qualityEff3);
        this.closeBtn1Eff.playFile(RES_DIR_EFF + "chongzhi", -1);
        this.addChild(this.closeBtn1Eff);
        if (UserVip.ins().lv < 3) {
            this.sureBtn.visible = false;
        }
        else {
            this.sureBtn.visible = true;
            this.closeBtn1.visible = false;
        }
    };
    Vip3Win.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.closeBtn0, this.onTap);
        this.removeTouchEvent(this.closeBtn1, this.onTap);
        this.removeTouchEvent(this.sureBtn, this.onTap);
    };
    Vip3Win.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
            case this.closeBtn0:
                ViewManager.ins().close(Vip3Win);
                break;
            case this.closeBtn1:
                ViewManager.ins().open(ChargeFirstWin);
                break;
            case this.sureBtn:
                ViewManager.ins().open(VipWin);
                ViewManager.ins().close(Vip3Win);
                break;
        }
    };
    return Vip3Win;
}(BaseEuiView));
__reflect(Vip3Win.prototype, "Vip3Win");
ViewManager.ins().reg(Vip3Win, LayerManager.UI_Main);
//# sourceMappingURL=Vip3Win.js.map