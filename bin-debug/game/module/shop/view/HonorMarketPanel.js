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
var HonorMarketPanel = (function (_super) {
    __extends(HonorMarketPanel, _super);
    function HonorMarketPanel() {
        var _this = _super.call(this) || this;
        _this.name = "功勋商店";
        return _this;
    }
    HonorMarketPanel.prototype.childrenCreated = function () {
        this.init();
    };
    HonorMarketPanel.prototype.init = function () {
        this.listView.itemRenderer = HonorMarketItemRenderer;
        this.dataArr = new eui.ArrayCollection;
        this.listView.dataProvider = this.dataArr;
    };
    HonorMarketPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.listView.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTap, this);
        this.addTouchEndEvent(this.get, this.onClick);
        this.observe(Shop.ins().postRefresMedalMessage, this.updateData);
        this.observe(Actor.ins().postFeatsChange, this.callback);
        this.observe(Shop.ins().postUpdateBuyMedal, this.callback);
        Shop.ins().sendMedalMessage();
    };
    HonorMarketPanel.prototype.callback = function () {
        Shop.ins().sendMedalMessage();
    };
    HonorMarketPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.get, this.onClick);
        this.removeObserve();
    };
    HonorMarketPanel.prototype.updateData = function () {
        var arr = [];
        var dataProvider = GlobalConfig.FeatsStore;
        for (var k in dataProvider) {
            var isPush = true;
            if (dataProvider[k].buyType == FEATS_TYPE.forever) {
                for (var i in Shop.ins().medalData.exchangeCount) {
                    if (dataProvider[k].index == Number(i) && dataProvider[k].daycount) {
                        if (Shop.ins().medalData.exchangeCount[i] >= dataProvider[k].daycount) {
                            isPush = false;
                        }
                        break;
                    }
                }
            }
            if (isPush)
                arr.push(dataProvider[k]);
        }
        this.dataArr.replaceAll(arr);
        this.myAttrValue0.text = Actor.feats + "";
        var text = this.get.text;
        this.get.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:" + text);
    };
    HonorMarketPanel.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.get:
                UserWarn.ins().setBuyGoodsWarn(7);
                break;
        }
    };
    HonorMarketPanel.prototype.onTap = function (e) {
    };
    return HonorMarketPanel;
}(BaseView));
__reflect(HonorMarketPanel.prototype, "HonorMarketPanel");
ViewManager.ins().reg(HonorMarketPanel, LayerManager.UI_Main);
//# sourceMappingURL=HonorMarketPanel.js.map