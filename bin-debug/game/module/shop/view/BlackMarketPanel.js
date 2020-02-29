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
var BlackMarketPanel = (function (_super) {
    __extends(BlackMarketPanel, _super);
    function BlackMarketPanel() {
        var _this = _super.call(this) || this;
        _this.name = "神秘商店";
        return _this;
    }
    BlackMarketPanel.prototype.childrenCreated = function () {
        this.init();
    };
    BlackMarketPanel.prototype.init = function () {
    };
    BlackMarketPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.listView.itemRenderer = BlackMarketItemRenderer;
        this.addTouchEvent(this, this.onTap);
        this.addTouchEvent(this.buyAllItemBtn, this.buyAllItem);
        this.addTouchEvent(this.refreshShopBtn, this.refreshShop);
        this.addTouchEvent(this.goodsOverView, this.onClick);
        this.observe(Shop.ins().postUpdateShopData, this.updateData);
        this.observe(Shop.ins().postBuyResult, this.buyResultCB);
        this.observe(ShopRedPoint.ins().postBlackMarketRedPoint, this.updateRedPoint);
        this.price.text = GlobalConfig.StoreCommonConfig.refreshYuanBao + "";
        var text = this.goodsOverView.text;
        this.goodsOverView.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:" + text);
        this.updateData();
    };
    BlackMarketPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.buyAllItemBtn, this.buyAllItem);
        this.removeTouchEvent(this.refreshShopBtn, this.refreshShop);
        this.removeTouchEvent(this, this.onTap);
        this.removeTouchEvent(this.goodsOverView, this.onClick);
        this.removeObserve();
        TimerManager.ins().removeAll(this);
    };
    BlackMarketPanel.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.goodsOverView:
                ViewManager.ins().open(ShopBestTips);
                break;
        }
    };
    BlackMarketPanel.prototype.updateRedPoint = function () {
        this.redPoint.visible = ShopRedPoint.ins().blackMarketRedPoint;
    };
    BlackMarketPanel.prototype.buyAllItem = function (e) {
        var arr = [];
        var allGold = 0;
        var allYb = 0;
        var bagNum = 0;
        var shopData = Shop.ins().shopData;
        var len = shopData.getShopEquipDataLength();
        var sed = null;
        var point = 0;
        for (var i = 0; i < len; i++) {
            sed = shopData.getShopEquipDataByIndex(i);
            if (sed != null) {
                if (ItemConfig.getType(sed.item.itemConfig) == 0) {
                    point = UserBag.ins().calculationScore(sed.item);
                    if (point > 0) {
                        bagNum += 1;
                    }
                    else {
                        continue;
                    }
                }
                arr.push([sed.id, 1]);
                if (sed.costType == 1) {
                    allGold += sed.costNum;
                }
                else {
                    allYb += sed.costNum;
                }
            }
        }
        if (UserBag.ins().getSurplusCount() < bagNum) {
            var strTips = "背包已满，无法全部购买";
            UserTips.ins().showTips(strTips);
            return;
        }
        if (Actor.gold < allGold) {
            UserWarn.ins().setBuyGoodsWarn(1);
            return;
        }
        if (Actor.yb < allYb) {
            UserTips.ins().showTips("|C:0xf3311e&T:元宝不足|");
            return;
        }
        if (allGold == 0 && allYb == 0) {
            UserTips.ins().showTips("|C:0xf3311e&T:没有物品可买！|");
            return;
        }
        Shop.ins().sendBuy(2, arr);
    };
    BlackMarketPanel.prototype.refreshShop = function (e) {
        if (Shop.ins().shopData.times > GlobalConfig.StoreCommonConfig.refreshLimit) {
            UserTips.ins().showTips("|C:0xf3311e&T:今日刷新次数已用完！|");
            return;
        }
        if (Shop.ins().shopData.refushTime <= 0) {
            Shop.ins().sendRefreshShop();
        }
        else {
            var itemData = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_OTHTER, GlobalConfig.StoreCommonConfig.refreshItem);
            var num = itemData ? itemData.count : 0;
            if (num) {
                Shop.ins().sendRefreshShop();
            }
            else {
                if (Actor.yb < GlobalConfig.StoreCommonConfig.refreshYuanBao) {
                    UserTips.ins().showTips("|C:0xf3311e&T:元宝不足|");
                    return;
                }
                Shop.ins().sendRefreshShop();
            }
        }
    };
    BlackMarketPanel.prototype.onTap = function (e) {
        if (e.target.name == "buy") {
            if (UserBag.ins().getSurplusCount() <= 0) {
                var strTips = "背包已满，无法购买";
                UserTips.ins().showTips(strTips);
                return;
            }
            var goodsID = e.target.parent['goodsID'];
            var sed = Shop.ins().shopData.getShopEquipDataById(goodsID);
            if (Assert(sed, "\u795E\u79D8\u5546\u5E97\u627E\u4E0D\u5230\u7269\u54C1\uFF1A" + goodsID)) {
                return;
            }
            if (sed.costType == 1) {
                if (Actor.gold < sed.costNum) {
                    UserWarn.ins().setBuyGoodsWarn(1);
                    return;
                }
            }
            else {
                if (Actor.yb < sed.costNum) {
                    UserTips.ins().showTips("|C:0xf3311e&T:元宝不足|");
                    return;
                }
            }
            var item = sed.item;
            var job = ItemConfig.getJob(item.itemConfig);
            var type = ItemConfig.getType(item.itemConfig);
            if (type == 0 && job != 0) {
                var point = UserBag.ins().calculationScore(item);
                if (point > 0) {
                    var arr = [goodsID, 1];
                    Shop.ins().sendBuy(2, [arr]);
                }
                else {
                    WarnWin.show("购买失败\n\n<font color='#f3311e'>该装备评分过低无法购买</font>", function () {
                    }, this, null, null, "sure");
                }
            }
            else {
                var arr = [goodsID, 1];
                Shop.ins().sendBuy(2, [arr]);
            }
        }
    };
    BlackMarketPanel.prototype.buyResultCB = function (result) {
        if (result == 1) {
            UserTips.ins().showTips("购买成功");
        }
        else {
            UserTips.ins().showTips("|C:0xf3311e&T:购买失败|");
        }
        this.updateOthersUI();
    };
    BlackMarketPanel.prototype.updateOthersUI = function () {
        var itemData = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_OTHTER, GlobalConfig.StoreCommonConfig.refreshItem);
        var num = itemData ? itemData.count : 0;
        var colorStr = "";
        if (num) {
            colorStr = ColorUtil.GREEN_COLOR;
        }
        else {
            colorStr = ColorUtil.RED_COLOR;
        }
        this.keylabel.textFlow = TextFlowMaker.generateTextFlow("<font color=" + colorStr + ">" + num + "</font> ");
        if (Shop.ins().shopData.refushTime <= 0)
            this.refreshShopBtn.label = "免费刷新";
        else
            this.refreshShopBtn.label = "刷   新";
    };
    BlackMarketPanel.prototype.updateData = function () {
        var arr = [];
        var shopData = Shop.ins().shopData;
        var len = shopData.getShopEquipDataLength();
        var sed = null;
        for (var i = 0; i < len; i++) {
            sed = shopData.getShopEquipDataByIndex(i);
            if (sed != null) {
                arr.push(sed);
            }
        }
        this.listView.dataProvider = new eui.ArrayCollection(arr);
        if (!TimerManager.ins().isExists(this.refushEndTime, this)) {
            TimerManager.ins().doTimer(1000, Shop.ins().shopData.refushTime, this.refushEndTime, this);
            this.refushEndTime();
        }
        if (arr.length <= 0) {
            this.noGoods.visible = true;
        }
        else {
            this.noGoods.visible = false;
        }
        this.point.text = "我的积分：" + Shop.ins().shopData.point;
        this.updateOthersUI();
        this.updateRedPoint();
    };
    BlackMarketPanel.prototype.refushEndTime = function () {
        this.tip.text = "下批商品刷新时间：" + DateUtils.getFormatBySecond(Shop.ins().shopData.refushTime);
        this.tipsBg.visible = this.tip.visible = this.costGroup.visible = true;
        if (Shop.ins().shopData.refushTime <= 0) {
            this.tipsBg.visible = this.tip.visible = this.costGroup.visible = false;
        }
    };
    return BlackMarketPanel;
}(BaseComponent));
__reflect(BlackMarketPanel.prototype, "BlackMarketPanel");
ViewManager.ins().reg(BlackMarketPanel, LayerManager.UI_Main);
//# sourceMappingURL=BlackMarketPanel.js.map