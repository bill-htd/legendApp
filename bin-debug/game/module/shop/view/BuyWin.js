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
var BuyWin = (function (_super) {
    __extends(BuyWin, _super);
    function BuyWin() {
        return _super.call(this) || this;
    }
    BuyWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "BuySkin";
        this.num = 1;
        this.itemIcon.imgJob.visible = false;
    };
    BuyWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.add1Btn, this.onTap);
        this.addTouchEvent(this.add10Btn, this.onTap);
        this.addTouchEvent(this.sub1Btn, this.onTap);
        this.addTouchEvent(this.sub10Btn, this.onTap);
        this.addTouchEvent(this.buyBtn, this.buy);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.addChangeEvent(this.numLabel, this.inputOver);
        this.num = 1;
        this.shopID = param[0];
        this.shopType = param[1] ? param[1] : 0;
        this.yuanbao0.visible = this.yuanbao1.visible = true;
        if (this.shopType == 2 || this.shopType == 3) {
            this.yuanbao0.visible = this.yuanbao1.visible = false;
            this.num = this.getChipNumRule();
            this.honor0.source = this.shopType == 2 ? "ZSchip" : "204076_png";
            this.honor1.source = this.shopType == 2 ? "ZSchip" : "204076_png";
        }
        this.honor0.visible = this.honor1.visible = !this.yuanbao0.visible;
        this.updateView();
    };
    BuyWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.add1Btn, this.onTap);
        this.removeTouchEvent(this.add10Btn, this.onTap);
        this.removeTouchEvent(this.sub1Btn, this.onTap);
        this.removeTouchEvent(this.sub10Btn, this.onTap);
        this.removeTouchEvent(this.buyBtn, this.buy);
        this.removeTouchEvent(this.bgClose, this.onTap);
        this.numLabel.removeEventListener(egret.Event.CHANGE, this.inputOver, this);
    };
    BuyWin.prototype.getChipNumRule = function () {
        var feats = GlobalConfig.FeatsStore[this.shopID];
        var sum = 0;
        if (feats.shopType == FEATS_SHOP_TYPE.Money) {
            if (Actor.chip < feats.costMoney.count) {
                this.maxNum = 1;
                return this.maxNum;
            }
            sum = Math.floor(Actor.chip / feats.costMoney.count);
        }
        else if (feats.shopType == FEATS_SHOP_TYPE.Item) {
            var costItemNum = UserBag.ins().getBagGoodsCountById(UserBag.BAG_TYPE_OTHTER, feats.costItem.id);
            if (costItemNum < feats.costItem.count) {
                this.maxNum = 1;
                return this.maxNum;
            }
            sum = Math.floor(costItemNum / feats.costItem.count);
        }
        var count = 0;
        if (!Shop.ins().medalData)
            return 0;
        var exchangeCount = Shop.ins().medalData.exchangeCount[this.shopID];
        exchangeCount = exchangeCount ? exchangeCount : 0;
        switch (feats.buyType) {
            case FEATS_TYPE.day:
                count = feats.daycount - exchangeCount;
                count = count > 0 ? count : 1;
                count = count > sum ? sum : count;
                break;
            case FEATS_TYPE.infinite:
                count = sum;
                break;
            case FEATS_TYPE.forever:
                count = feats.daycount - exchangeCount;
                count = count > 0 ? count : 1;
                count = count > sum ? sum : count;
                break;
        }
        this.maxNum = count;
        return this.maxNum;
    };
    BuyWin.prototype.updateView = function () {
        var shopConfig;
        var itemConfig;
        if (this.shopType != 2 && this.shopType != 3) {
            shopConfig = GlobalConfig.ItemStoreConfig[this.shopID];
            itemConfig = GlobalConfig.ItemConfig[shopConfig.itemId];
            this.itemIcon.setData(itemConfig);
            if (shopConfig.vipLimit) {
                this.maxNum = shopConfig.vipLimit[UserVip.ins().lv] - Shop.ins().shopData.getHadBuyCount(shopConfig.itemId);
                this.itemName0.text = "\u8FD8\u53EF\u8D2D\u4E70" + this.maxNum + "\u6B21";
                this.itemName0.visible = true;
            }
            else {
                this.maxNum = Number.MAX_VALUE;
                this.itemName0.visible = false;
            }
            if (this.num > this.maxNum) {
                this.num = this.maxNum;
            }
            this.unitPrice.text = shopConfig.price + "";
            this.allPrice.text = (this.num * shopConfig.price) + "";
            this.numLabel.text = this.num + "";
            this.itemName.text = itemConfig.name;
            this.itemName.textColor = ItemBase.QUALITY_COLOR[ItemConfig.getQuality(itemConfig)];
            this.used.text = "（" + shopConfig.use + "）";
            this.used.x = this.itemName.x + this.itemName.width;
            return;
        }
        this.itemName0.visible = false;
        shopConfig = GlobalConfig.FeatsStore[this.shopID];
        itemConfig = GlobalConfig.ItemConfig[shopConfig.goods[0].id];
        this.itemIcon.setData(itemConfig);
        this.goodId = shopConfig.index;
        if (this.shopType == 2)
            this.unitPrice.text = shopConfig.costMoney.count + "";
        else if (this.shopType == 3)
            this.unitPrice.text = shopConfig.costItem.count + "";
        this.allPrice.text = (this.num * parseInt(this.unitPrice.text)) + "";
        this.numLabel.text = this.num + "";
        this.itemName.text = itemConfig.name;
        this.itemName.textColor = ItemBase.QUALITY_COLOR[ItemConfig.getQuality(itemConfig)];
        this.used.text = "（" + shopConfig.use + "）";
    };
    BuyWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.sub10Btn:
                this.num -= 10;
                break;
            case this.sub1Btn:
                this.num -= 1;
                break;
            case this.add10Btn:
                this.num += 10;
                break;
            case this.add1Btn:
                this.num += 1;
                break;
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
        if (this.num < 1)
            this.num = 1;
        if (this.num > this.maxNum) {
            this.num = this.maxNum;
        }
        this.numLabel.text = this.num + "";
        this.inputOver();
    };
    BuyWin.prototype.closeCB = function (e) {
        ViewManager.ins().close(BuyWin);
    };
    BuyWin.prototype.buy = function (e) {
        if (this.shopType == 2) {
            if (Actor.chip >= parseInt(this.allPrice.text)) {
                Shop.ins().sendBuyMedal(this.goodId, this.num);
                ViewManager.ins().close(this);
            }
            else {
                UserTips.ins().showTips("|C:0xf3311e&T:筹码不足|");
            }
        }
        else if (this.shopType == 3) {
            var feats = GlobalConfig.FeatsStore[this.shopID];
            if (UserBag.ins().getBagGoodsCountById(UserBag.BAG_TYPE_OTHTER, feats.costItem.id) >= parseInt(this.allPrice.text)) {
                Shop.ins().sendBuyMedal(this.goodId, this.num);
                ViewManager.ins().close(this);
            }
            else
                UserTips.ins().showTips("|C:0xf3311e&T:巅峰令不足|");
        }
        else {
            if (Actor.yb >= parseInt(this.allPrice.text)) {
                var arr = [this.shopID, this.num];
                Shop.ins().sendBuy(1, [arr]);
                ViewManager.ins().close(this);
            }
            else {
                UserTips.ins().showTips("|C:0xf3311e&T:元宝不足|");
            }
        }
    };
    BuyWin.prototype.inputOver = function (e) {
        this.num = parseInt(this.numLabel.text);
        if (isNaN(this.num) || this.num < 1)
            this.num = 1;
        if (this.num > 9999)
            this.num = 9999;
        if (this.num > this.maxNum) {
            this.num = this.maxNum;
        }
        this.numLabel.text = this.num + "";
        this.allPrice.text = (this.num * parseInt(this.unitPrice.text)) + "";
    };
    return BuyWin;
}(BaseEuiView));
__reflect(BuyWin.prototype, "BuyWin");
ViewManager.ins().reg(BuyWin, LayerManager.UI_Popup);
//# sourceMappingURL=BuyWin.js.map