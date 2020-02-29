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
var ItemShopPanel = (function (_super) {
    __extends(ItemShopPanel, _super);
    function ItemShopPanel() {
        var _this = _super.call(this) || this;
        _this.name = "道具商城";
        return _this;
    }
    ItemShopPanel.prototype.childrenCreated = function () {
        this.init();
    };
    ItemShopPanel.prototype.init = function () {
        this.listView.itemRenderer = ItemShopItemRenderer;
    };
    ItemShopPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.observe(Shop.ins().postBuyCount, this.refreshList);
        this.updateData();
    };
    ItemShopPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.removeObserve();
    };
    ItemShopPanel.prototype.refreshList = function () {
        var len = this.listView.dataProvider.length;
        for (var i = 0; i < len; i++) {
            var dataProvider = this.listView.dataProvider;
            var item = dataProvider.getItemAt(i);
            dataProvider.itemUpdated(item);
        }
    };
    ItemShopPanel.prototype.updateData = function () {
        var arr = [];
        var dataProvider = GlobalConfig.ItemStoreConfig;
        for (var k in dataProvider) {
            arr.push(dataProvider[k]);
        }
        this.listView.dataProvider = new eui.ArrayCollection(arr);
    };
    ItemShopPanel.prototype.onTap = function (e) {
        if (e.target.name == "buy") {
            var goodsID = e.target.parent['goodsID'];
            var shopItem = GlobalConfig.ItemStoreConfig[goodsID];
            if (Shop.ins().shopData.checkBuyGoodsId(goodsID)) {
                ViewManager.ins().open(BuyWin, goodsID);
            }
        }
    };
    return ItemShopPanel;
}(BaseView));
__reflect(ItemShopPanel.prototype, "ItemShopPanel");
//# sourceMappingURL=ItemShopPanel.js.map