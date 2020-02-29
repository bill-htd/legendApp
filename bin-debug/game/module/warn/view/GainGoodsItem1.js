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
var GainGoodsItem1 = (function (_super) {
    __extends(GainGoodsItem1, _super);
    function GainGoodsItem1() {
        var _this = _super.call(this) || this;
        _this.skinName = "GainGoodsItemSkin";
        return _this;
    }
    GainGoodsItem1.prototype.dataChanged = function () {
        var newData = this.data;
        this.desc.text = newData.str;
    };
    Object.defineProperty(GainGoodsItem1.prototype, "userData", {
        get: function () {
            return this.data;
        },
        enumerable: true,
        configurable: true
    });
    return GainGoodsItem1;
}(BaseItemRender));
__reflect(GainGoodsItem1.prototype, "GainGoodsItem1");
//# sourceMappingURL=GainGoodsItem1.js.map