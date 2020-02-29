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
var ShenqiSelectItemWin = (function (_super) {
    __extends(ShenqiSelectItemWin, _super);
    function ShenqiSelectItemWin() {
        return _super.call(this) || this;
    }
    ShenqiSelectItemWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    ShenqiSelectItemWin.prototype.setData = function (len) {
        this.currentState = len.toString();
    };
    ShenqiSelectItemWin.prototype.dataChanged = function () {
    };
    return ShenqiSelectItemWin;
}(BaseView));
__reflect(ShenqiSelectItemWin.prototype, "ShenqiSelectItemWin");
//# sourceMappingURL=shenqiItemSelectWin.js.map