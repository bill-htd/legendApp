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
var shop = GameSystem.shop;
var ItemShopItemRenderer = (function (_super) {
    __extends(ItemShopItemRenderer, _super);
    function ItemShopItemRenderer() {
        var _this = _super.call(this) || this;
        _this.goodsID = 0;
        _this.skinName = "ItemShopItem";
        _this.itemIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.showTip, _this);
        _this.itemIcon.imgJob.visible = false;
        return _this;
    }
    ItemShopItemRenderer.prototype.dataChanged = function () {
        var shopItem = this.data;
        var itemConfig = GlobalConfig.ItemConfig[shopItem.itemId];
        this.goodsID = shopItem.id;
        var costStr = "";
        if (shopItem.price > 100000) {
            costStr = Math.floor(shopItem.price / 10000) + "万";
        }
        else {
            costStr = shopItem.price + "";
        }
        this.money.text = costStr;
        this.itemName.text = itemConfig.name;
        this.itemName.textColor = ItemConfig.getQualityColor(itemConfig);
        this.used.text = "（" + shopItem.use + "）";
        this.used.x = this.itemName.x + this.itemName.width;
        if (shopItem.viplv && UserVip.ins().lv < shopItem.viplv) {
            this.num.visible = true;
            this.num.text = "VIP" + shopItem.viplv + "\u53EF\u8D2D\u4E70";
        }
        else if (shopItem.vipLimit) {
            var hadBuyItem = Shop.ins().shopData.getHadBuyCountItem(shopItem.itemId);
            var hadBuyCount = 0;
            if (hadBuyItem) {
                hadBuyCount = hadBuyItem.count;
            }
            var total = shopItem.vipLimit[UserVip.ins().lv];
            this.num.text = "\u4ECA\u65E5\u53EF\u8D2D\u4E70" + (total - hadBuyCount) + "\u6B21";
            this.num.visible = true;
        }
        else {
            this.num.visible = false;
        }
        if (this.itemIcon && this.itemIcon.setData) {
            this.itemIcon.setData(itemConfig);
        }
    };
    ItemShopItemRenderer.prototype.showTip = function () {
        var items = GlobalConfig.ItemStoreConfig;
        var configID;
        for (var k in items) {
            if (items[k].id == this.goodsID) {
                configID = items[k].itemId;
            }
        }
        if (configID == undefined) {
            new Error("竟然没有找到该商品ID");
        }
        var itemConfig = GlobalConfig.ItemConfig[configID];
        ViewManager.ins().open(ItemDetailedWin, 0, itemConfig.id, 1);
    };
    return ItemShopItemRenderer;
}(BaseItemRender));
__reflect(ItemShopItemRenderer.prototype, "ItemShopItemRenderer");
//# sourceMappingURL=ItemShopItemRenderer.js.map