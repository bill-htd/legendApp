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
var WelcomeWin = (function (_super) {
    __extends(WelcomeWin, _super);
    function WelcomeWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "welcomePanelSkin";
        return _this;
    }
    WelcomeWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        var str = LocationProperty.appid;
        if (str != "" && GlobalConfig.TerraceDescConfig[str]) {
            this.slogon.text = GlobalConfig.TerraceDescConfig[str].desc;
        }
        else {
            this.slogon.text = "";
        }
    };
    WelcomeWin.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.validateNow();
    };
    WelcomeWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this, this.onTap);
        this.playEff();
    };
    WelcomeWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this, this.onTap);
        egret.Tween.removeTweens(this.pic);
    };
    WelcomeWin.prototype.onTap = function (e) {
        this.sureBtn.visible = false;
        var tw = egret.Tween.get(this.pic);
        var playPunView = ViewManager.ins().getView(PlayFunView);
        if (!playPunView || !playPunView.location)
            return;
        var btn = playPunView.location;
        if (btn) {
            var p = btn.localToGlobal();
            this.sureGroup.globalToLocal(p.x, p.y, p);
            tw.to({ scaleX: 0, scaleY: 0, x: p.x, y: p.y }, 500).call(function () {
                ViewManager.ins().close(WelcomeWin);
            });
        }
        if (this.eff) {
            DisplayUtils.removeFromParent(this.eff);
            this.eff = null;
        }
        Hint.ins().postWelcome();
    };
    WelcomeWin.prototype.playEff = function () {
        if (!this.eff) {
            this.eff = new MovieClip;
            this.eff.x = this.sureGroup.width / 2;
            this.eff.y = this.sureGroup.height / 2 - 5;
            this.eff.scaleX = this.effgroup.scaleX;
            this.eff.scaleY = this.effgroup.scaleY;
            this.sureGroup.addChild(this.eff);
        }
        this.eff.playFile(RES_DIR_EFF + 'achieveCom', -1);
    };
    return WelcomeWin;
}(BaseEuiView));
__reflect(WelcomeWin.prototype, "WelcomeWin");
ViewManager.ins().reg(WelcomeWin, LayerManager.UI_Popup);
//# sourceMappingURL=WelcomeWin.js.map