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
var GuardQuitTips = (function (_super) {
    __extends(GuardQuitTips, _super);
    function GuardQuitTips() {
        var _this = _super.call(this) || this;
        _this.skinName = "guardGodWeaponQuiteTip";
        _this.isTopLevel = true;
        return _this;
    }
    GuardQuitTips.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.closeWin);
        this.addTouchEvent(this.BG, this.closeWin);
        this.addTouchEvent(this.up, this.onQuit);
    };
    GuardQuitTips.prototype.onQuit = function () {
        UserFb.ins().sendExitFb();
        this.closeWin();
    };
    GuardQuitTips.prototype.closeWin = function () {
        ViewManager.ins().close(this);
    };
    return GuardQuitTips;
}(BaseEuiView));
__reflect(GuardQuitTips.prototype, "GuardQuitTips");
ViewManager.ins().reg(GuardQuitTips, LayerManager.UI_Popup);
//# sourceMappingURL=GuardQuitTips.js.map