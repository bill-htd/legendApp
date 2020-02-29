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
var HonorMarketItemRenderer = (function (_super) {
    __extends(HonorMarketItemRenderer, _super);
    function HonorMarketItemRenderer() {
        var _this = _super.call(this) || this;
        _this.goodsID = 0;
        _this.skinName = "HonorMarketItemSkin";
        _this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick, _this);
        _this.itemIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.showTip, _this);
        _this.itemIcon.imgJob.visible = false;
        return _this;
    }
    HonorMarketItemRenderer.prototype.dataChanged = function () {
        var shopItem = this.data;
        if (!shopItem || !(shopItem instanceof FeatsStore))
            return;
        this.goodsID = shopItem.goods[0].id;
        var itemConfig = GlobalConfig.ItemConfig[this.goodsID];
        if (!itemConfig)
            return;
        this.isShowTips = false;
        if (shopItem.shopType == FEATS_SHOP_TYPE.Money) {
            this.money.text = shopItem.costMoney.count + "";
            this.moneyIcon.source = "ZSchip";
        }
        else if (shopItem.shopType == FEATS_SHOP_TYPE.Item) {
            this.money.text = shopItem.costItem.count + "";
            this.moneyIcon.source = "204076_png";
        }
        this.itemName.text = itemConfig.name;
        this.itemName.textColor = ItemConfig.getQualityColor(itemConfig);
        this.num.text = shopItem.goods[0].count + "";
        if (this.itemIcon && this.itemIcon.setData) {
            this.itemIcon.setData(itemConfig);
        }
        if (shopItem.use)
            this.usage.text = "\uFF08" + shopItem.use + "\uFF09";
        if (shopItem.buyType == FEATS_TYPE.forever) {
            this.myTimes.visible = true;
            var myCount = Shop.ins().medalData.exchangeCount[shopItem.index];
            myCount = myCount ? myCount : 0;
            var textcolor = this.myTimes.textColor;
            var colorStr = void 0;
            var str = "";
            if (shopItem.daycount) {
                if (myCount >= shopItem.daycount) {
                    colorStr = ColorUtil.RED;
                    str = "\u6C38\u4E45\u9650\u8D2D:|C:" + colorStr + "&T:" + myCount + "/" + shopItem.daycount;
                }
                else {
                    colorStr = ColorUtil.GREEN;
                    str = "\u6C38\u4E45\u9650\u8D2D:|C:" + colorStr + "&T:" + myCount + "|/|C:" + textcolor + "&T:" + shopItem.daycount;
                }
            }
            this.myTimes.textFlow = TextFlowMaker.generateTextFlow1(str);
        }
        else if (shopItem.buyType == FEATS_TYPE.infinite) {
            this.myTimes.visible = false;
        }
        else if (shopItem.buyType == FEATS_TYPE.day) {
            this.myTimes.visible = true;
            var myCount = Shop.ins().medalData.exchangeCount[shopItem.index];
            myCount = myCount ? myCount : 0;
            var textcolor = this.myTimes.textColor;
            var colorStr = void 0;
            var str = "";
            if (shopItem.daycount) {
                if (myCount >= shopItem.daycount) {
                    colorStr = ColorUtil.RED;
                    str = "\u6BCF\u65E5\u9650\u8D2D:|C:" + colorStr + "&T:" + myCount + "/" + shopItem.daycount;
                    this.isShowTips = true;
                }
                else {
                    colorStr = ColorUtil.GREEN;
                    str = "\u6BCF\u65E5\u9650\u8D2D:|C:" + colorStr + "&T:" + myCount + "|/|C:" + textcolor + "&T:" + shopItem.daycount;
                }
            }
            this.myTimes.textFlow = TextFlowMaker.generateTextFlow1(str);
        }
    };
    HonorMarketItemRenderer.prototype.onClick = function () {
        if (this.isShowTips) {
            UserTips.ins().showTips("|C:" + 0xff0000 + "&T:\u4ECA\u65E5\u5DF2\u65E0\u5151\u6362\u6B21\u6570\uFF0C\u8BF7\u660E\u65E5\u518D\u6765");
            return;
        }
        if (this.data.shopType == FEATS_SHOP_TYPE.Money) {
            ViewManager.ins().open(BuyWin, this.data.index, 2);
        }
        else if (this.data.shopType == FEATS_SHOP_TYPE.Item) {
            ViewManager.ins().open(BuyWin, this.data.index, 3);
        }
    };
    HonorMarketItemRenderer.prototype.showTip = function () {
        var items = GlobalConfig.FeatsStore;
        var configID;
        for (var k in items) {
            if (items[k].goods[0].id == this.goodsID) {
                configID = items[k].goods[0].id;
            }
        }
        if (configID == undefined) {
            new Error("竟然没有找到该商品ID");
        }
        var itemConfig = GlobalConfig.ItemConfig[configID];
        var shopItem = this.data;
        ViewManager.ins().open(ItemDetailedWin, 0, itemConfig.id, shopItem.goods[0].count);
    };
    return HonorMarketItemRenderer;
}(BaseItemRender));
__reflect(HonorMarketItemRenderer.prototype, "HonorMarketItemRenderer");
//# sourceMappingURL=HonorMarketItemRenderer.js.map