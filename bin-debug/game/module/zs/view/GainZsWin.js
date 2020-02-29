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
var GainZsWin = (function (_super) {
    __extends(GainZsWin, _super);
    function GainZsWin() {
        return _super.call(this) || this;
    }
    GainZsWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "GainZsSkin";
        this.infoTxts = [this['infoTxt0'], this['infoTxt1'], this['infoTxt2']];
        this.toDays = [this['toDay0'], this['toDay1'], this['toDay2']];
        this.items = [this['item0'], this['item1'], this['item2']];
        this.btns = [this['btn0'], this['btn1'], this['btn2']];
        for (var i = 0; i < this.items.length; i++) {
            this.items[i].isShowName(false);
        }
        this.priceIcon1.setType(MoneyConst.yuanbao);
        this.priceIcon2.setType(MoneyConst.yuanbao);
        var reward = new RewardData();
        reward.type = 0;
        reward.id = 0;
        reward.count = 0;
        this.items[0].data = reward;
        this.isTopLevel = true;
        this.tipsExp = 0;
    };
    GainZsWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this, this.onTap);
        this.observe(UserZs.ins().postZsData, this.setData);
        this.observe(Actor.ins().postLevelChange, this.setData);
        this.observe(Shop.ins().postBuyResult, this.setData);
        this.observe(Shop.ins().postBuyCount, this.setData);
        this.setData();
    };
    GainZsWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this, this.onTap);
        this.removeObserve();
    };
    GainZsWin.prototype.setData = function () {
        var config = GlobalConfig.ZhuanShengConfig;
        var lowestLv = config.level + 1;
        var lv = Math.max(Actor.level, lowestLv);
        var lvConfig = GlobalConfig.ZhuanShengLevelConfig[lv];
        var expConfig = GlobalConfig.ZhuanShengExpConfig[lv];
        var ins = UserZs.ins();
        var sCount;
        this.toDays[0].textColor = Actor.level < lowestLv ? 0xf3311e : 0xA89C88;
        this.infoTxts[0].textFlow = (new egret.HtmlTextParser()).parser("\u589E\u52A0<font color=\"#9de242\">" + expConfig.exp + "</font>\u4FEE\u4E3A\n\n\u7B49\u7EA7\u5151\u6362\uFF1A\u964D1\u7EA7");
        sCount = config.conversionCount - ins.upgradeCount[0];
        this.toDays[0].textFlow = (new egret.HtmlTextParser()).parser(Actor.level <= 80 ? "\u5927\u4E8E" + (lowestLv - 1) + "\u7EA7\u624D\u80FD\u5151\u6362" : "\u4ECA\u5929\u8FD8\u53EF\u5151\u6362<font color=\"#9de242\">" + sCount + "</font>\u6B21");
        this.btns[0].enabled = sCount > 0;
        var itemID = config.normalItem;
        var itemConfig = GlobalConfig.ItemConfig[itemID];
        var count = UserBag.ins().getBagGoodsCountById(0, itemID);
        var itemStoreConfig = ItemStoreConfig.getStoreByItemID(itemID);
        this.items[1].data = itemID;
        this.btns[1].label = count ? "立即使用" : "购买";
        this.btns[1].name = config.normalExp + "";
        this.priceIcon1.visible = count == 0;
        this.priceIcon1.setPrice(itemStoreConfig.price);
        this.priceIcon1.name = itemConfig.name;
        this.infoTxts[1].textFlow = (new egret.HtmlTextParser()).parser("\u589E\u52A0<font color=\"#9de242\">" + config.normalExp + "</font>\u4FEE\u4E3A\n\n" + itemConfig.name + "\uFF1A" + (count ? "\u5269\u4F59" + count + "\u4E2A" : ""));
        sCount = config.normalCount - ins.upgradeCount[1];
        this.toDays[1].textFlow = (new egret.HtmlTextParser()).parser("\u4ECA\u5929\u8FD8\u53EF\u5151\u6362<font color=\"#9de242\">" + sCount + "</font>\u6B21");
        this.btns[1].enabled = sCount > 0;
        if (itemStoreConfig.viplv && UserVip.ins().lv < itemStoreConfig.viplv) {
            this.vipLb1.visible = true;
            this.vipLb1.text = "VIP" + itemStoreConfig.viplv + "\u53EF\u8D2D\u4E70";
        }
        else {
            this.vipLb1.visible = false;
        }
        itemID = config.advanceItem;
        itemConfig = GlobalConfig.ItemConfig[itemID];
        count = UserBag.ins().getBagGoodsCountById(0, itemID);
        itemStoreConfig = ItemStoreConfig.getStoreByItemID(itemID);
        this.items[2].data = itemID;
        this.btns[2].label = count ? "立即使用" : "购买";
        this.btns[2].name = config.advanceExp + "";
        this.priceIcon2.visible = count == 0;
        this.priceIcon2.setPrice(ItemStoreConfig.getStoreByItemID(itemID).price);
        this.priceIcon2.name = itemConfig.name;
        this.infoTxts[2].textFlow = (new egret.HtmlTextParser()).parser("\u589E\u52A0<font color=\"#cb5ac4\">" + config.advanceExp + "</font>\u4FEE\u4E3A\n\n" + itemConfig.name + "\uFF1A" + (count ? "\u5269\u4F59" + count + "\u4E2A" : ""));
        sCount = config.advanceCount - ins.upgradeCount[2];
        this.toDays[2].textFlow = (new egret.HtmlTextParser()).parser("\u4ECA\u5929\u8FD8\u53EF\u5151\u6362<font color=\"#9de242\">" + sCount + "</font>\u6B21");
        this.btns[2].enabled = sCount > 0;
        if (itemStoreConfig.viplv && UserVip.ins().lv < itemStoreConfig.viplv) {
            this.vipLb2.visible = true;
            this.vipLb2.text = "VIP" + itemStoreConfig.viplv + "\u53EF\u8D2D\u4E70";
        }
        else {
            this.vipLb2.visible = false;
        }
        var sum = ins.canGet();
        for (var i = 0; i < 3; i++) {
            this['redPoint' + i].visible = (sum >> i) & 1;
            if (this["redPointRule" + i]) {
                this["redPointRule" + i]();
            }
        }
        lv = Math.max(Actor.level + 1, lowestLv);
        expConfig = GlobalConfig.ZhuanShengExpConfig[lv];
        if (UserZs.ins().isSendXW[0]) {
            UserZs.ins().isSendXW[0] = false;
        }
        else if (UserZs.ins().isSendXW[1]) {
            UserZs.ins().isSendXW[1] = false;
        }
        else if (UserZs.ins().isSendXW[2]) {
            UserZs.ins().isSendXW[2] = false;
        }
    };
    GainZsWin.prototype.redPointRule0 = function () {
        if (!UserZs.ins().exchange)
            UserZs.ins().exchange = true;
    };
    GainZsWin.prototype.onTap = function (e) {
        switch (e.target) {
            case this.colorCanvas:
            case this.closeBtn0:
            case this.closeBtn:
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
            default:
                var index = this.btns.indexOf(e.target);
                if (index > -1) {
                    if (index == 0) {
                        UserZs.ins().isSendXW[index] = true;
                        UserZs.ins().sendGetXiuWei(index + 1);
                    }
                    else if (this.btns[index].label == "立即使用") {
                        UserZs.ins().isSendXW[index] = true;
                        UserZs.ins().sendGetXiuWei(index + 1);
                    }
                    else {
                        var price = this['priceIcon' + index].getPrice();
                        if (Actor.yb < price) {
                            UserTips.ins().showTips("元宝不足");
                            ViewManager.ins().close(this);
                            return;
                        }
                        if (index == 1) {
                            var conf = GlobalConfig.ItemStoreConfig;
                            for (var k in conf) {
                                if (conf[k].itemId == 200009) {
                                    this.buyGoodsId(conf[k].id);
                                    return;
                                }
                            }
                        }
                        else if (index == 2) {
                            var conf = GlobalConfig.ItemStoreConfig;
                            for (var k in conf) {
                                if (conf[k].itemId == 200010) {
                                    this.buyGoodsId(conf[k].id);
                                    return;
                                }
                            }
                        }
                    }
                }
        }
    };
    GainZsWin.prototype.buyGoodsId = function (id) {
        if (Shop.ins().shopData.checkBuyGoodsId(id)) {
            ViewManager.ins().open(BuyWin, id);
        }
    };
    return GainZsWin;
}(BaseEuiView));
__reflect(GainZsWin.prototype, "GainZsWin");
ViewManager.ins().reg(GainZsWin, LayerManager.UI_Popup);
//# sourceMappingURL=GainZsWin.js.map