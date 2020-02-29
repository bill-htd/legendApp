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
var ShopRedPoint = (function (_super) {
    __extends(ShopRedPoint, _super);
    function ShopRedPoint() {
        var _this = _super.call(this) || this;
        _this.shopRedPoint = false;
        _this.blackMarketRedPoint = false;
        _this.associated(_this.postShopRedPoint, _this.postBlackMarketRedPoint);
        _this.associated(_this.postBlackMarketRedPoint, Shop.ins().postUpdateShopData);
        return _this;
    }
    ShopRedPoint.prototype.postShopRedPoint = function () {
        var old = this.shopRedPoint;
        this.shopRedPoint = this.blackMarketRedPoint;
        return this.shopRedPoint != old;
    };
    ShopRedPoint.prototype.postBlackMarketRedPoint = function () {
        var old = this.blackMarketRedPoint;
        this.blackMarketRedPoint = Shop.ins().shopData.refushTime <= 0;
        return this.blackMarketRedPoint != old;
    };
    return ShopRedPoint;
}(BaseSystem));
__reflect(ShopRedPoint.prototype, "ShopRedPoint");
var GameSystem;
(function (GameSystem) {
    var shopRedPoint = ShopRedPoint.ins.bind(ShopRedPoint);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=ShopRedPoint.js.map