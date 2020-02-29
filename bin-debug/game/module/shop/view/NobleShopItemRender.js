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
var NobleShopItemRender = (function (_super) {
    __extends(NobleShopItemRender, _super);
    function NobleShopItemRender() {
        var _this = _super.call(this) || this;
        _this.shopType = 2;
        _this.goodsID = 0;
        _this.skinName = "NobleshoSkinItemShopItem";
        _this.itemIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.showTip, _this);
        _this.itemIcon.imgJob.visible = false;
        return _this;
    }
    NobleShopItemRender.prototype.dataChanged = function () {
        var shopItem = this.data;
        if (!shopItem)
            return;
        var itemConfig = GlobalConfig.ItemConfig[shopItem.itemId];
        this.goodsID = shopItem.index;
        var costStr = "";
        if (shopItem.price > 100000) {
            costStr = Math.floor(shopItem.price / 10000) + "万";
        }
        else {
            costStr = shopItem.price + "";
        }
        this.money0.text = costStr;
        if (shopItem.showYuanBao > 100000) {
            costStr = Math.floor(shopItem.showYuanBao / 10000) + "万";
        }
        else {
            costStr = shopItem.showYuanBao + "";
        }
        this.money.text = costStr;
        this.itemName.text = itemConfig.name;
        this.itemName.textColor = ItemConfig.getQualityColor(itemConfig);
        this.used.text = "（" + shopItem.use + "）";
        this.used.x = this.itemName.x + this.itemName.width;
        if (this.itemIcon && this.itemIcon.setData) {
            this.itemIcon.setData(itemConfig);
        }
    };
    NobleShopItemRender.prototype.showTip = function () {
        var items = GlobalConfig.IntegralStore;
        var configID;
        if (items[this.goodsID]) {
            configID = items[this.goodsID].itemId;
        }
        if (configID == undefined) {
            new Error("竟然没有找到该商品ID");
        }
        var itemConfig = GlobalConfig.ItemConfig[configID];
        ViewManager.ins().open(ItemDetailedWin, 0, itemConfig.id, 1);
    };
    return NobleShopItemRender;
}(BaseItemRender));
__reflect(NobleShopItemRender.prototype, "NobleShopItemRender");
//# sourceMappingURL=NobleShopItemRender.js.map