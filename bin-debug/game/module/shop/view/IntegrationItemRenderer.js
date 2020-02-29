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
var IntegrationItemRenderer = (function (_super) {
    __extends(IntegrationItemRenderer, _super);
    function IntegrationItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "ShopPointItem";
        _this.item = new ItemBase();
        _this.item.x = 21;
        _this.item.y = 8;
        _this.item.isShowName(false);
        _this.addChild(_this.item);
        return _this;
    }
    IntegrationItemRenderer.prototype.dataChanged = function () {
        var shopItem = this.data;
        var itemConfig = GlobalConfig.ItemConfig[shopItem.itemId];
        if (itemConfig == undefined)
            return;
        this.goodsID = shopItem.index;
        this.money.text = CommonUtils.overLength(shopItem.price);
        this.integration.text = CommonUtils.overLength(shopItem.integral);
        this.itemName.text = itemConfig.name;
        this.itemName.textColor = ItemConfig.getQualityColor(itemConfig);
        this.used.text = "";
        this.used.x = this.itemName.x + this.itemName.width;
        var red = new RewardData();
        red.id = itemConfig.id;
        red.count = shopItem.count;
        red.type = shopItem.type;
        this.item.data = red;
    };
    return IntegrationItemRenderer;
}(BaseItemRender));
__reflect(IntegrationItemRenderer.prototype, "IntegrationItemRenderer");
//# sourceMappingURL=IntegrationItemRenderer.js.map