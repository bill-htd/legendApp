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
var MedalShopItemRenderer = (function (_super) {
    __extends(MedalShopItemRenderer, _super);
    function MedalShopItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "FeatsShopItem";
        _this.item = new ItemBase();
        _this.item.x = 21;
        _this.item.y = 8;
        _this.item.isShowName(false);
        _this.addChild(_this.item);
        if (_this.btnGet) {
            _this.btnGet.name = "buy";
        }
        return _this;
    }
    MedalShopItemRenderer.prototype.dataChanged = function () {
        var _data = this.data;
        this.item.data = _data.goods[0];
        this.itemName.text = this.item.getText();
        this.itemName.textColor = this.item.getTextColor();
        this.labelPrice.text = "" + _data.costMoney.count;
        if (_data.daycount) {
            this.labelTimes.visible = true;
            this.labelTimes.text = "今日已兑换" + _data.exchangeCount + "/" + _data.daycount;
        }
        else {
            this.labelTimes.visible = false;
        }
    };
    return MedalShopItemRenderer;
}(BaseItemRender));
__reflect(MedalShopItemRenderer.prototype, "MedalShopItemRenderer");
//# sourceMappingURL=MedalShopItemRenderer.js.map