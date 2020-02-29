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
var WJBattlefieldStartCountdownPanel = (function (_super) {
    __extends(WJBattlefieldStartCountdownPanel, _super);
    function WJBattlefieldStartCountdownPanel() {
        var _this = _super.call(this) || this;
        _this._maxCount = 3;
        _this.skinName = "WJBattleStartTipSkin";
        return _this;
    }
    WJBattlefieldStartCountdownPanel.prototype.initUI = function () {
        this._count = BitmapNumber.ins().createNumPic(0, "8", 5);
        this._count.x = 105;
        this._count.y = 350;
        this.addChild(this._count);
    };
    WJBattlefieldStartCountdownPanel.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        TimerManager.ins().doTimer(1000, this._maxCount + 1, this.countdownFun, this);
        this.countdownFun();
    };
    WJBattlefieldStartCountdownPanel.prototype.close = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        TimerManager.ins().remove(this.countdownFun, this);
    };
    WJBattlefieldStartCountdownPanel.prototype.countdownFun = function () {
        if (this._maxCount <= 0) {
            ViewManager.ins().close(this);
            return;
        }
        BitmapNumber.ins().changeNum(this._count, this._maxCount, "8", 5);
        this._maxCount--;
    };
    return WJBattlefieldStartCountdownPanel;
}(BaseEuiView));
__reflect(WJBattlefieldStartCountdownPanel.prototype, "WJBattlefieldStartCountdownPanel");
ViewManager.ins().reg(WJBattlefieldStartCountdownPanel, LayerManager.UI_Popup);
//# sourceMappingURL=WJBattlefieldStartCountdownPanel.js.map