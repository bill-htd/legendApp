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
var ZSBossCDWin = (function (_super) {
    __extends(ZSBossCDWin, _super);
    function ZSBossCDWin() {
        return _super.call(this) || this;
    }
    ZSBossCDWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "ZSBossCDSkin";
        this.isTopLevel = true;
    };
    ZSBossCDWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.check.selected = param[0];
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.sure, this.onTap);
        this.addTouchEvent(this.giveUp, this.onTap);
        this.addChangeEvent(this.check, this.selectChange);
    };
    ZSBossCDWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.sure, this.onTap);
        this.removeTouchEvent(this.giveUp, this.onTap);
        this.check.removeEventListener(egret.Event.CHANGE, this.selectChange, this);
    };
    ZSBossCDWin.prototype.selectChange = function (e) {
        if (this.check.selected) {
            UserTips.ins().showTips("已开启挑战中自动复活");
        }
    };
    ZSBossCDWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.sure:
                if (ZsBoss.ins().checkIsMoreMoney()) {
                    UserBoss.ins().sendClearCD();
                    ViewManager.ins().close(this);
                }
                break;
            case this.giveUp:
                ViewManager.ins().close(this);
                break;
        }
    };
    return ZSBossCDWin;
}(BaseEuiView));
__reflect(ZSBossCDWin.prototype, "ZSBossCDWin");
ViewManager.ins().reg(ZSBossCDWin, LayerManager.UI_Popup);
//# sourceMappingURL=ZSBossCDWin.js.map