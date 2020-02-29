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
var FBCountDown = (function (_super) {
    __extends(FBCountDown, _super);
    function FBCountDown() {
        var _this = _super.call(this) || this;
        _this._count = 1;
        _this.skinName = "FBCountDownSkin";
        return _this;
    }
    FBCountDown.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        switch (GameMap.fbType) {
            case UserFb.FB_TYPE_PEAKED:
                if (args[0])
                    this._count = args[0];
                this.bgImg.source = "peakness_start_fight";
                break;
            default:
                return;
        }
        TimerManager.ins().doTimer(1000, this._count + 1, this.upFun, this);
        this.upFun();
    };
    FBCountDown.prototype.close = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        TimerManager.ins().removeAll(this);
    };
    FBCountDown.prototype.upFun = function () {
        this.countDown.text = this._count + "";
        this._count--;
        if (this._count < 0)
            ViewManager.ins().close(FBCountDown);
    };
    FBCountDown.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        switch (GameMap.fbType) {
            case UserFb.FB_TYPE_PEAKED:
                break;
            default:
                return false;
        }
        return true;
    };
    return FBCountDown;
}(BaseEuiView));
__reflect(FBCountDown.prototype, "FBCountDown");
ViewManager.ins().reg(FBCountDown, LayerManager.UI_Popup);
//# sourceMappingURL=FBCountDown.js.map