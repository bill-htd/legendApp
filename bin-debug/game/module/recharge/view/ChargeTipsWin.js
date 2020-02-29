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
var ChargeTipsWin = (function (_super) {
    __extends(ChargeTipsWin, _super);
    function ChargeTipsWin() {
        return _super.call(this) || this;
    }
    ChargeTipsWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "ChargeTipsSkin";
    };
    return ChargeTipsWin;
}(BaseEuiView));
__reflect(ChargeTipsWin.prototype, "ChargeTipsWin");
ViewManager.ins().reg(ChargeTipsWin, LayerManager.UI_Tips);
//# sourceMappingURL=ChargeTipsWin.js.map