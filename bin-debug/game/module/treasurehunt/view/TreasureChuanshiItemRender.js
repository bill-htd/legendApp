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
var TreasureChuanshiItemRender = (function (_super) {
    __extends(TreasureChuanshiItemRender, _super);
    function TreasureChuanshiItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "TreasureChuanshiItem";
        _this.touchChildren = false;
        _this.touchEnabled = true;
        return _this;
    }
    TreasureChuanshiItemRender.prototype.dataChanged = function () {
        this.gift.data = this.data;
        this.select.visible = this.select2.visible = false;
    };
    TreasureChuanshiItemRender.prototype.checkSelcted = function (index) {
        this.select.visible = this.select2.visible = this.itemIndex == index;
    };
    return TreasureChuanshiItemRender;
}(BaseItemRender));
__reflect(TreasureChuanshiItemRender.prototype, "TreasureChuanshiItemRender");
//# sourceMappingURL=TreasureChuanshiItemRender.js.map