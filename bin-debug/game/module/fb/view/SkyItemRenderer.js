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
var SkyItemRenderer = (function (_super) {
    __extends(SkyItemRenderer, _super);
    function SkyItemRenderer() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = false;
        _this.skinName = "chuangtianguanItem";
        return _this;
    }
    SkyItemRenderer.prototype.dataChanged = function () {
        var info = this.data;
        if (info) {
            this.passAllTip0.text = info.layer + "层";
            this.currentState = info.id == SkyLevelModel.ins().cruLevel ? "down" : "up";
        }
    };
    return SkyItemRenderer;
}(eui.ItemRenderer));
__reflect(SkyItemRenderer.prototype, "SkyItemRenderer");
//# sourceMappingURL=SkyItemRenderer.js.map