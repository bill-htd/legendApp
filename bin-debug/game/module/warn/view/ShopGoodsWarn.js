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
var ShopGoodsWarn = (function (_super) {
    __extends(ShopGoodsWarn, _super);
    function ShopGoodsWarn() {
        return _super.call(this) || this;
    }
    ShopGoodsWarn.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "GainGoodsSkin";
        this.gainList.itemRenderer = GainGoodsItem;
        this.countTxt.restrict = "0-9";
        this.price.setType(MoneyConst.yuanbao);
        this.totalPrice.setType(MoneyConst.yuanbao);
        this.itemIcon.imgJob.visible = false;
    };
    ShopGoodsWarn.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.decBtn, this.onTap);
        this.addTouchEvent(this.addBtn, this.onTap);
        this.addTouchEvent(this.dec10Btn, this.onTap);
        this.addTouchEvent(this.add10Btn, this.onTap);
        this.addTouchEvent(this.buyBtn, this.onTap);
        this.addTouchEvent(this.topUpBtn, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.gainList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTouchList, this);
        this.addChangeEvent(this.countTxt, this.onTxtChange);
        this.observe(Shop.ins().postBuyResult, this.buyCallBack);
    };
    ShopGoodsWarn.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.gainList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTouchList, this);
        this.removeTouchEvent(this.decBtn, this.onTap);
        this.removeTouchEvent(this.addBtn, this.onTap);
        this.removeTouchEvent(this.dec10Btn, this.onTap);
        this.removeTouchEvent(this.add10Btn, this.onTap);
        this.removeTouchEvent(this.buyBtn, this.onTap);
        this.removeTouchEvent(this.topUpBtn, this.onTap);
        this.removeTouchEvent(this.bgClose, this.onTap);
        this.countTxt.removeEventListener(egret.TouchEvent.CHANGE, this.onTxtChange, this);
    };
    ShopGoodsWarn.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.decBtn:
                this.setTotalPrice(this._totalNum - 1);
                break;
            case this.addBtn:
                this.setTotalPrice(this._totalNum + 1);
                break;
            case this.dec10Btn:
                this.setTotalPrice(this._totalNum - 10);
                break;
            case this.add10Btn:
                this.setTotalPrice(this._totalNum + 10);
                break;
            case this.buyBtn:
                if (Actor.yb >= this.totalPrice.getPrice()) {
                    Shop.ins().sendBuy(1, [[this._goodsId, this._totalNum]]);
                }
                else {
                    UserTips.ins().showTips("|C:0xf3311e&T:\u5143\u5B9D\u4E0D\u8DB3|");
                    ViewManager.ins().close(this);
                }
                break;
            case this.topUpBtn:
                var rdata = Recharge.ins().getRechargeData(0);
                if (!rdata || rdata.num != 2) {
                    ViewManager.ins().close(ShopGoodsWarn);
                    ViewManager.ins().open(Recharge1Win);
                }
                else {
                    ViewManager.ins().open(ChargeFirstWin);
                }
                break;
            case this.bgClose:
                ViewManager.ins().close(ShopGoodsWarn);
                break;
        }
    };
    ShopGoodsWarn.prototype.onTouchList = function (e) {
        var item = e.item;
        if (e.item == null) {
            return;
        }
        var openSuccess = ViewManager.ins().viewOpenCheck(item[1], item[2]);
        if (openSuccess) {
            var isShow = true;
            if (item[1] == "Recharge2Win") {
                var rdata = Recharge.ins().getRechargeData(0);
                if (!rdata || !rdata.num) {
                    isShow = false;
                    ViewManager.ins().open(Recharge1Win);
                }
            }
            if (isShow && item[1] != "")
                GameGuider.guidance(item[1], item[2], item[3]);
            ViewManager.ins().close(ShopGoodsWarn);
            ViewManager.ins().close(BookUpWin);
            ViewManager.ins().close(WeaponPanel);
            ViewManager.ins().close(WeaponSoulBreakWin);
            if (item[1] != "HeirloomCom")
                ViewManager.ins().close(HeirloomCom);
            if (item[1] == "LadderWin")
                ViewManager.ins().close(ForgeWin);
            if (item[1] == "PlayFunView") {
                ViewManager.ins().close(ShopWin);
            }
        }
    };
    ShopGoodsWarn.prototype.buyCallBack = function (num) {
        if (num > 0) {
            ViewManager.ins().close(ShopGoodsWarn);
        }
        else {
            UserTips.ins().showTips("|C:0xf3311e&T:\u5143\u5B9D\u4E0D\u8DB3|");
            ViewManager.ins().close(this);
        }
    };
    ShopGoodsWarn.prototype.onTxtChange = function (e) {
        var num = Number(this.countTxt.text);
        this.setTotalPrice(num);
    };
    ShopGoodsWarn.prototype.setData = function (id, num) {
        var shopConfig;
        if (id > 20000) {
            var itemConfig = GlobalConfig.ItemConfig[id];
            this.itemIcon.setData(itemConfig);
            this.nameTxt.text = "" + itemConfig.name;
            this.nameTxt.textColor = ItemConfig.getQualityColor(itemConfig);
            shopConfig = ItemStoreConfig.getStoreByItemID(id);
            this.titleTxt.text = "\u6750\u6599\u4E0D\u8DB3\uFF0C\u901A\u8FC7\u4EE5\u4E0B\u65B9\u5F0F\u83B7\u5F97";
        }
        else {
            this.itemIcon.setData(null);
            switch (id) {
                case MoneyConst.gold:
                    this.itemIcon.imgIcon.source = RewardData.CURRENCY_RES[id];
                    this.nameTxt.text = RewardData.CURRENCY_NAME[id];
                    this.titleTxt.text = "\u8D27\u5E01\u4E0D\u8DB3\uFF0C\u901A\u8FC7\u4EE5\u4E0B\u65B9\u5F0F\u83B7\u5F97";
                    break;
                case MoneyConst.soul:
                    this.itemIcon.imgIcon.source = RewardData.CURRENCY_RES[id];
                    this.nameTxt.text = RewardData.CURRENCY_NAME[id];
                    this.titleTxt.text = "\u7CBE\u534E\u4E0D\u8DB3\uFF0C\u901A\u8FC7\u4EE5\u4E0B\u65B9\u5F0F\u83B7\u5F97";
                    break;
                case 7:
                    this.itemIcon.imgIcon.source = RewardData.CURRENCY_RES[id];
                    this.nameTxt.text = RewardData.CURRENCY_NAME[id];
                    this.titleTxt.text = "\u529F\u52CB\u4E0D\u8DB3\uFF0C\u901A\u8FC7\u4EE5\u4E0B\u65B9\u5F0F\u83B7\u5F97";
                    break;
                case 8:
                    this.itemIcon.imgIcon.source = RewardData.CURRENCY_RES[id];
                    this.nameTxt.text = RewardData.CURRENCY_NAME[id];
                    this.titleTxt.text = "\u6210\u5C31\u79EF\u5206\u4E0D\u8DB3\uFF0C\u901A\u8FC7\u4EE5\u4E0B\u65B9\u5F0F\u83B7\u5F97";
                    break;
                case MoneyConst.weiWang:
                    this.itemIcon.imgIcon.source = RewardData.CURRENCY_RES[id];
                    this.nameTxt.text = RewardData.CURRENCY_NAME[id];
                    this.titleTxt.text = "\u5A01\u671B\u4E0D\u8DB3\uFF0C\u901A\u8FC7\u4EE5\u4E0B\u65B9\u5F0F\u83B7\u5F97";
                    break;
            }
            this.nameTxt.textColor = 0xFFB82A;
        }
        var gainConfig = GlobalConfig.GainItemConfig[id];
        var listHeight = 0;
        if (gainConfig) {
            this.gainList.dataProvider = new eui.ArrayCollection(gainConfig.gainWay);
            listHeight = gainConfig.gainWay.length * 60;
        }
        else {
            this.gainList.dataProvider = new eui.ArrayCollection([]);
        }
        if (shopConfig) {
            this.goodsGroup.visible = true;
            this.nameTxt.x = 225;
            this.nameTxt.y = 170;
            this.nameTxt.textAlign = "center";
            this.itemIcon.x = 145;
            this.frame.height = 410 + listHeight;
            this.gainListGroup.y = 352;
            this._goodsId = shopConfig.id;
            this.price.setPrice(shopConfig.price);
            this.setTotalPrice(num);
        }
        else {
            this.goodsGroup.visible = false;
            this.nameTxt.x = 182;
            this.nameTxt.y = 200;
            this.nameTxt.textAlign = "center";
            this.itemIcon.x = 172;
            this.frame.height = 340 + listHeight;
            this.gainListGroup.y = 280;
        }
        this.tipGroup.y = this.gainListGroup.height + this.gainListGroup.y + 3;
    };
    ShopGoodsWarn.prototype.setTotalPrice = function (num) {
        if (num <= 0)
            this._totalNum = 1;
        else if (num >= 10000)
            this._totalNum = 9999;
        else
            this._totalNum = num;
        this.countTxt.text = this._totalNum + "";
        this.totalPrice.setPrice(this._totalNum * this.price.getPrice());
    };
    return ShopGoodsWarn;
}(BaseEuiView));
__reflect(ShopGoodsWarn.prototype, "ShopGoodsWarn");
ViewManager.ins().reg(ShopGoodsWarn, LayerManager.UI_Popup);
//# sourceMappingURL=ShopGoodsWarn.js.map