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
var ChargeFirstWin = (function (_super) {
    __extends(ChargeFirstWin, _super);
    function ChargeFirstWin() {
        var _this = _super.call(this) || this;
        _this.barbc = new ProgressBarEff();
        _this.skinName = "ChargeSkin";
        _this.isTopLevel = true;
        return _this;
    }
    ChargeFirstWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.list.itemRenderer = ChargeItemRenderer;
        this.scrollBar.viewport = this.list;
        var dataArr = window["getsecChargePriceInfo"]();
        this.list.dataProvider = new eui.ArrayCollection(dataArr);
        this.barbc.setWidth(340);
        this.barbc.x = 80;
        this.barbc.y = 12;
        this.topGroup.addChild(this.barbc);
        this.vipValue = BitmapNumber.ins().createNumPic(0, "vip_v", 5);
        this.vipValue.x = 36;
        this.vipValue.y = 39;
        this.vipGroup.addChild(this.vipValue);
    };
    ChargeFirstWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.kefuBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.addTouchEvent(this.vipBtn, this.onTap);
        this.observe(Recharge.ins().postUpDataItem, this.refushInfo);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListTap, this);
        this.barbc.reset();
        this.setView();
    };
    ChargeFirstWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.kefuBtn, this.onTap);
        this.removeTouchEvent(this.closeBtn0, this.onTap);
        this.removeTouchEvent(this.vipBtn, this.onTap);
        this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListTap, this);
        this.removeObserve();
    };
    ChargeFirstWin.prototype.onListTap = function (e) {
        var data = e.item;
        var yuanbao = 0;
        var money = 0;
        if (Recharge.ins().getOrderByIndex(data.moneyid)) {
            yuanbao = data.yuanbao_num;
        }
        else {
            yuanbao = data.award;
        }
        if (data.trueCost == 1) {
            money = parseInt(data.dazhe_num);
        }
        else {
            money = parseInt(data.money_num);
        }
        if (data.status == 1) {
            Recharge.ins().showReCharge(money, yuanbao);
        }
        else {
            WarnWin.show(data.msg, function () { }, this, function () { }, this, 'sure');
        }
    };
    ChargeFirstWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
            case this.closeBtn0:
                ViewManager.ins().close(ChargeFirstWin);
                break;
            case this.kefuBtn:
                var url = window['getkefuUrl']();
                if (window['getNative']() == 'web') {
                    window.open(url);
                }
                else {
                    egret.ExternalInterface.call("openURL", url);
                }
                break;
            case this.vipBtn:
                ViewManager.ins().open(VipWin);
                break;
        }
    };
    ChargeFirstWin.prototype.refushInfo = function () {
        var dataPro = this.list.dataProvider;
        for (var i = 0; i < dataPro.length; i++) {
            var data = dataPro.getItemAt(i);
            dataPro.itemUpdated(data);
        }
        this.setView();
    };
    ChargeFirstWin.prototype.setView = function () {
        var curLv = UserVip.ins().lv;
        var nextConfig = GlobalConfig.VipConfig[curLv + 1];
        var nextNeedYb = 0;
        var ybValue = 0;
        var str = "";
        var curNeedYb = UserVip.ins().exp;
        if (nextConfig) {
            nextNeedYb = nextConfig.needYb - curNeedYb;
            var needYb = nextNeedYb - ybValue;
            str = "\u518D\u5145\u503C|C:0xFFAA24&T:" + nextNeedYb + "\u5143\u5B9D|\u6210\u4E3A|C:0xFFAA24&T:VIP" + (curLv + 1) + "|";
            this.barbc.setData(curNeedYb, nextConfig.needYb);
        }
        else {
            str = "VIP等级已满";
            this.barbc.max();
        }
        BitmapNumber.ins().changeNum(this.vipValue, curLv, "vip_v", 3);
        if (curLv < 10) {
            this.vipValue.x = 36;
            this.vipValue.y = 39;
        }
        else {
            this.vipValue.x = 26;
            this.vipValue.y = 39;
        }
        this.tipsText.textFlow = TextFlowMaker.generateTextFlow(str);
    };
    return ChargeFirstWin;
}(BaseEuiView));
__reflect(ChargeFirstWin.prototype, "ChargeFirstWin");
ViewManager.ins().reg(ChargeFirstWin, LayerManager.UI_Popup);
//# sourceMappingURL=ChargeFirstWin.js.map