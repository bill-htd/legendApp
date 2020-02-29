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
var GetSamsaraExpPanel = (function (_super) {
    __extends(GetSamsaraExpPanel, _super);
    function GetSamsaraExpPanel() {
        var _this = _super.call(this) || this;
        _this.isTopLevel = true;
        _this.skinName = "GainYeLiSkin";
        return _this;
    }
    GetSamsaraExpPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.redPoint1.visible = false;
        this.redPoint2.visible = false;
        var reward = new RewardData();
        reward.type = 0;
        reward.id = 0;
        reward.count = 0;
        this.item0.data = reward;
        this.item0.isShowName(false);
        this.item1.isShowName(false);
        this.item2.isShowName(false);
        this.addTouchEvent(this.bgClose, this.closeWin);
        this.addTouchEvent(this.btn0, this.expUpgrade);
        this.addTouchEvent(this.btn1, this.normalUpgrade);
        this.addTouchEvent(this.btn2, this.advanceUpgrade);
        this.observe(SamsaraCC.ins().postSamsaraInfo, this.updateView);
        this.observe(Shop.ins().postBuyResult, this.updateView);
        this.observe(Shop.ins().postBuyCount, this.updateView);
        this.updateView();
    };
    GetSamsaraExpPanel.prototype.expUpgrade = function () {
        if (this.btn0.enabled) {
            if (Actor.level >= GlobalConfig.ReincarnationBase.levelLimit) {
                this.lastYeli = SamsaraModel.ins().samsaraInfo.exp;
                SamsaraCC.ins().exchangeSamsaraExp(SamsaraUpgradeType.level);
            }
            else {
                UserTips.ins().showTips("\u7B49\u7EA7\u8FBE\u5230" + GlobalConfig.ReincarnationBase.levelLimit + "\u7EA7\u53EF\u4EE5\u5151\u6362");
            }
        }
    };
    GetSamsaraExpPanel.prototype.normalUpgrade = function () {
        if (this.btn1.label == "购买") {
            this.buy(1, GlobalConfig.ReincarnationBase.normalItem.id);
        }
        else {
            this.lastYeli = SamsaraModel.ins().samsaraInfo.exp;
            SamsaraCC.ins().exchangeSamsaraExp(SamsaraUpgradeType.normal);
        }
    };
    GetSamsaraExpPanel.prototype.advanceUpgrade = function () {
        if (this.btn2.label == "购买") {
            this.buy(2, GlobalConfig.ReincarnationBase.advanceItem.id);
        }
        else {
            this.lastYeli = SamsaraModel.ins().samsaraInfo.exp;
            SamsaraCC.ins().exchangeSamsaraExp(SamsaraUpgradeType.advanced);
        }
    };
    GetSamsaraExpPanel.prototype.buy = function (index, id) {
        var price = this['priceIcon' + index].getPrice();
        if (Actor.yb < price) {
            UserTips.ins().showTips("元宝不足");
            ViewManager.ins().close(this);
        }
        else {
            var conf = CommonUtils.getObjectByAttr(GlobalConfig.ItemStoreConfig, "itemId", id);
            this.buyGoods(conf.id);
        }
    };
    GetSamsaraExpPanel.prototype.buyGoods = function (id) {
        if (Shop.ins().shopData.checkBuyGoodsId(id)) {
            ViewManager.ins().open(BuyWin, id);
        }
    };
    GetSamsaraExpPanel.prototype.closeWin = function () {
        ViewManager.ins().close(this);
    };
    GetSamsaraExpPanel.prototype.updateView = function () {
        if (this.lastYeli != undefined && (SamsaraModel.ins().samsaraInfo.exp - this.lastYeli) > 0) {
            this.lastYeli = SamsaraModel.ins().samsaraInfo.exp;
        }
        if (Actor.level >= GlobalConfig.ReincarnationBase.levelLimit) {
            var cfg = GlobalConfig.ReincarnationExchange[Actor.level];
            this.yeli0.text = cfg.value.toString();
            this.redPoint0.visible = (SamsaraModel.ins().getExpExchangeTimes() > 0);
            this.btn0.enabled = (SamsaraModel.ins().getExpExchangeTimes() > 0);
            this.limit.visible = false;
        }
        else {
            this.yeli0.text = GlobalConfig.ReincarnationExchange[GlobalConfig.ReincarnationBase.levelLimit].value.toString();
            this.redPoint0.visible = false;
            this.limit.visible = true;
        }
        this.toDay0.text = SamsaraModel.ins().getExpExchangeTimes().toString();
        this.updateItem(GlobalConfig.ReincarnationBase.normalItem, 1, SamsaraModel.ins().getNormalExchangeTimes());
        this.updateItem(GlobalConfig.ReincarnationBase.advanceItem, 2, SamsaraModel.ins().getAdvancedExchangeTimes());
    };
    GetSamsaraExpPanel.prototype.updateItem = function (vo, index, times) {
        var itemCfg = GlobalConfig.ItemConfig[vo.id];
        this["item" + index].data = vo.id;
        this["toDay" + index].text = times.toString();
        if (times > 0) {
            this["toDay" + index].textColor = 0x00ff00;
        }
        else {
            this["toDay" + index].textColor = 0xff0000;
        }
        this["yeli" + index].text = vo.value.toString();
        var count = UserBag.ins().getBagGoodsCountById(0, vo.id);
        if (count > 0) {
            this["name" + index].text = itemCfg.name + " \u5269\u4F59\uFF1A" + count + "\u4E2A";
            this["priceIcon" + index].visible = false;
            this["redPoint" + index].visible = times > 0;
            this["btn" + index].label = "立即使用";
        }
        else {
            this["name" + index].text = itemCfg.name;
            this["priceIcon" + index].visible = true;
            this["priceIcon" + index].setPrice(CommonUtils.getObjectByAttr(GlobalConfig.ItemStoreConfig, "itemId", vo.id).price);
            this["redPoint" + index].visible = false;
            this["btn" + index].label = "购买";
        }
    };
    return GetSamsaraExpPanel;
}(BaseEuiView));
__reflect(GetSamsaraExpPanel.prototype, "GetSamsaraExpPanel");
ViewManager.ins().reg(GetSamsaraExpPanel, LayerManager.UI_Popup);
//# sourceMappingURL=GetSamsaraExpPanel.js.map