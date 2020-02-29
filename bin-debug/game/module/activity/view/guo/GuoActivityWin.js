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
var GuoActivityWin = (function (_super) {
    __extends(GuoActivityWin, _super);
    function GuoActivityWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "guoqingjie";
        return _this;
    }
    GuoActivityWin.prototype.open = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onTap);
    };
    GuoActivityWin.prototype.onTap = function (e) {
        ViewManager.ins().close(this);
    };
    return GuoActivityWin;
}(BaseEuiView));
__reflect(GuoActivityWin.prototype, "GuoActivityWin");
ViewManager.ins().reg(GuoActivityWin, LayerManager.UI_Popup);
//# sourceMappingURL=GuoActivityWin.js.map