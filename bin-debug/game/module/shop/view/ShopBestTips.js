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
var ShopBestTips = (function (_super) {
    __extends(ShopBestTips, _super);
    function ShopBestTips() {
        var _this = _super.call(this) || this;
        _this.skinName = "GoodsOverViewSkin";
        return _this;
    }
    ShopBestTips.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.shopList.itemRenderer = ItemBase;
    };
    ShopBestTips.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onClick);
        var items = [];
        for (var k in GlobalConfig.TreasureOverViewConfig) {
            items.push(GlobalConfig.TreasureOverViewConfig[k].itemId);
        }
        this.shopList.dataProvider = new eui.ArrayCollection(items);
    };
    ShopBestTips.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.onClick);
    };
    ShopBestTips.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
    };
    return ShopBestTips;
}(BaseEuiView));
__reflect(ShopBestTips.prototype, "ShopBestTips");
ViewManager.ins().reg(ShopBestTips, LayerManager.UI_Popup);
//# sourceMappingURL=ShopBestTips.js.map