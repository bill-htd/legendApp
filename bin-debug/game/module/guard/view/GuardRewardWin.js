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
var GuardRewardWin = (function (_super) {
    __extends(GuardRewardWin, _super);
    function GuardRewardWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "guardGodWeaponTishiSkin";
        _this.isTopLevel = true;
        return _this;
    }
    GuardRewardWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.closeWin);
        this.addTouchEvent(this.giveUp, this.closeWin);
    };
    GuardRewardWin.prototype.closeWin = function () {
        ViewManager.ins().close(this);
    };
    return GuardRewardWin;
}(BaseEuiView));
__reflect(GuardRewardWin.prototype, "GuardRewardWin");
ViewManager.ins().reg(GuardRewardWin, LayerManager.UI_Popup);
//# sourceMappingURL=GuardRewardWin.js.map