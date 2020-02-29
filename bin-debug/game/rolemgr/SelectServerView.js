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
var SelectServerView = (function (_super) {
    __extends(SelectServerView, _super);
    function SelectServerView() {
        return _super.call(this) || this;
    }
    SelectServerView.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "SelectServerSkin";
    };
    return SelectServerView;
}(BaseEuiView));
__reflect(SelectServerView.prototype, "SelectServerView");
ViewManager.ins().reg(SelectServerView, LayerManager.UI_Main);
//# sourceMappingURL=SelectServerView.js.map