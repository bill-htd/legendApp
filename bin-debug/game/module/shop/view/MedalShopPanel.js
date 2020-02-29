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
var MedalShopPanel = (function (_super) {
    __extends(MedalShopPanel, _super);
    function MedalShopPanel() {
        var _this = _super.call(this) || this;
        _this.coin = 0;
        _this.name = "功勋商店";
        _this.skinName = "FeatsShopSkin";
        _this.labelGetCoin.textFlow = (new egret.HtmlTextParser).parser("<a href=\"event:\"><u>" + _this.labelGetCoin.text + "</u></a>");
        _this.list.itemRenderer = MedalShopItemRenderer;
        _this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
        return _this;
    }
    MedalShopPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        Shop.ins().sendMedalMessage();
        this.observe(Shop.ins().postRefresMedalMessage, this.updataData);
        this.observe(Shop.ins().postUpdateBuyMedal, this.buyResult);
        this.addTouchEvent(this.list, this.onBuy);
        this.addTouchEvent(this.labelGetCoin, this.onGetCoin);
    };
    MedalShopPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.list, this.onBuy);
        this.removeTouchEvent(this.labelGetCoin, this.onGetCoin);
        this.removeObserve();
    };
    MedalShopPanel.prototype.updataData = function () {
        var _data = GlobalConfig.FeatsStore;
        var data = Shop.ins().medalData;
        for (var k in _data) {
            var exchangeCount = data.exchangeCount[_data[k].index];
            if (!isNaN(exchangeCount)) {
                _data[k].exchangeCount = exchangeCount;
            }
            else {
                _data[k].exchangeCount = 0;
            }
        }
        this.setListData(_data);
    };
    MedalShopPanel.prototype.onBuy = function (e) {
        if (e.target.name == "buy") {
            var feats = Actor.feats;
            var tag = e.target.parent;
            var _data = tag.data;
            if (_data.exchangeCount >= _data.daycount && _data.daycount != 0) {
                var str = "今日可兑换次数用完，请明日再试";
                UserTips.ins().showTips(str);
            }
            else if (_data.costMoney.count > feats) {
                var str = "功勋值不足，无法兑换物品";
                UserTips.ins().showTips(str);
            }
            else {
                Shop.ins().sendBuyMedal(_data.index, 1);
            }
        }
    };
    MedalShopPanel.prototype.buyResult = function (exchangeData) {
        var str = "成功兑换，消耗";
        var price = 0;
        var _data = GlobalConfig.FeatsStore;
        for (var k in _data) {
            if (_data[k].index == exchangeData[0]) {
                _data[k].exchangeCount = exchangeData[1];
                price = _data[k].costMoney.count;
            }
        }
        str = str + price + "功勋";
        UserTips.ins().showTips(str);
        this.setListData(_data);
    };
    MedalShopPanel.prototype.setListData = function (_data) {
        var arr = new eui.ArrayCollection();
        for (var k in _data) {
            arr.addItem(_data[k]);
        }
        this.list.dataProvider = arr;
        var feats = Actor.feats;
        this.labelCoin.text = Actor.feats.toString();
    };
    MedalShopPanel.prototype.onGetCoin = function (e) {
        ViewManager.ins().open(ShopGoodsWarn).setData(7, 1);
    };
    return MedalShopPanel;
}(BaseView));
__reflect(MedalShopPanel.prototype, "MedalShopPanel");
//# sourceMappingURL=MedalShopPanel.js.map