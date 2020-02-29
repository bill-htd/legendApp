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
var BlackMarketItemRenderer = (function (_super) {
    __extends(BlackMarketItemRenderer, _super);
    function BlackMarketItemRenderer() {
        var _this = _super.call(this) || this;
        _this.goodsID = 0;
        _this.skinName = "BlackMarketItem";
        _this.itemIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.showTip, _this);
        return _this;
    }
    BlackMarketItemRenderer.prototype.dataChanged = function () {
        var shopItem = this.data;
        var itemData = shopItem.item;
        var itemConfig = GlobalConfig.ItemConfig[itemData.configID];
        this.goodsID = shopItem.id;
        var costStr = "";
        if (shopItem.costType == 2) {
            costStr = shopItem.costNum + "";
        }
        else if (shopItem.costNum > 100000) {
            costStr = Math.floor(shopItem.costNum / 10000) + "万";
        }
        else {
            costStr = shopItem.costNum + "";
        }
        this.money.text = costStr;
        this.itemName.text = itemConfig.name;
        this.itemName.textColor = ItemConfig.getQualityColor(itemConfig);
        if (itemConfig.zsLevel && itemConfig.zsLevel > 0) {
            this.level.text = "(" + itemConfig.zsLevel + "转)";
        }
        else if (itemConfig.level && itemConfig.level > 0) {
            this.level.text = "(Lv." + itemConfig.level + ")";
        }
        else
            this.level.text = "";
        this.level.x = this.itemName.x + this.itemName.width;
        this.num.text = (itemData.count == 1 ? "" : itemData.count + "");
        this.moneyIcon.source = BlackMarketItemRenderer.moneyTypeToIcon[shopItem.costType];
        this.itemIcon.setData(itemConfig);
        if (ItemConfig.getJob(itemConfig) != 0) {
            var ceGap = UserBag.ins().calculationScore(shopItem.item);
            if (ceGap > 0) {
                this.arrowIcon.visible = true;
                this.CEKey.visible = true;
                this.CEValue.visible = true;
                this.CEValue.text = ceGap + "";
            }
            else {
                this.arrowIcon.visible = false;
                this.CEKey.visible = false;
                this.CEValue.visible = false;
            }
        }
        else {
            this.arrowIcon.visible = false;
            this.CEKey.visible = false;
            this.CEValue.visible = false;
        }
        var dic = ShopEquipData.discountDic[shopItem.discountType];
        if (dic) {
            this.discount.source = dic.res;
            this.wuzhe.visible = false;
        }
        else {
            var eqcfg = GlobalConfig.EquipItemConfig[this.goodsID];
            this.discount.source = eqcfg.discountImg;
            this.wuzhe.visible = false;
        }
    };
    BlackMarketItemRenderer.prototype.showTip = function () {
        var configID;
        var shopData = Shop.ins().shopData;
        var len = shopData.getShopEquipDataLength();
        var sed = null;
        for (var i = 0; i < len; i++) {
            sed = shopData.getShopEquipDataByIndex(i);
            if (sed != null) {
                if (sed.id == this.goodsID) {
                    configID = sed.item.configID;
                    break;
                }
            }
        }
        if (configID == undefined) {
            new Error("竟然没有找到该商品ID");
        }
        var itemConfig = GlobalConfig.ItemConfig[configID];
        var type = ItemConfig.getType(itemConfig);
        if (type != undefined) {
            if (type == 0) {
                ViewManager.ins().open(EquipDetailedWin, 1, this.data.item.handle, itemConfig.id);
            }
            else {
                ViewManager.ins().open(ItemDetailedWin, 0, itemConfig.id, this.data.item.count);
            }
        }
    };
    BlackMarketItemRenderer.moneyTypeToIcon = [
        "占位",
        "szjinbi",
        "szyuanbao",
    ];
    return BlackMarketItemRenderer;
}(BaseItemRender));
__reflect(BlackMarketItemRenderer.prototype, "BlackMarketItemRenderer");
//# sourceMappingURL=BlackMarketItemRenderer.js.map