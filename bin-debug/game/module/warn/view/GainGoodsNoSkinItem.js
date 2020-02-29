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
var GainGoodsNoSkinItem = (function (_super) {
    __extends(GainGoodsNoSkinItem, _super);
    function GainGoodsNoSkinItem() {
        return _super.call(this) || this;
    }
    GainGoodsNoSkinItem.prototype.dataChanged = function () {
        this.desc.text = this.data[0];
    };
    Object.defineProperty(GainGoodsNoSkinItem.prototype, "userData", {
        get: function () {
            return this.data;
        },
        enumerable: true,
        configurable: true
    });
    return GainGoodsNoSkinItem;
}(BaseItemRender));
__reflect(GainGoodsNoSkinItem.prototype, "GainGoodsNoSkinItem");
//# sourceMappingURL=GainGoodsNoSkinItem.js.map