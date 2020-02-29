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
var ShieldWin = (function (_super) {
    __extends(ShieldWin, _super);
    function ShieldWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "shieldSkin";
        return _this;
    }
    ShieldWin.prototype.open = function () {
        this.addTouchEvent(this.shieldBtn, this.onTap);
        this.touchEnabled = false;
        this.shieldBtn.selected = !EntityHideBody.ins().isShow;
    };
    ShieldWin.prototype.onTap = function (e) {
        EntityHideBody.ins().setShowState(!this.shieldBtn.selected);
    };
    return ShieldWin;
}(BaseEuiView));
__reflect(ShieldWin.prototype, "ShieldWin");
ViewManager.ins().reg(ShieldWin, LayerManager.UI_Main);
//# sourceMappingURL=ShieldWin.js.map