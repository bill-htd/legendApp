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
var PeakedMallPanel = (function (_super) {
    __extends(PeakedMallPanel, _super);
    function PeakedMallPanel() {
        return _super.call(this) || this;
    }
    PeakedMallPanel.prototype.childrenCreated = function () {
        this.listView.itemRenderer = HonorMarketItemRenderer;
        this.dataArr = new eui.ArrayCollection;
        this.listView.dataProvider = this.dataArr;
    };
    PeakedMallPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.getWay, this.onGetway);
        this.observe(Shop.ins().postRefresMedalMessage, this.updateData);
        this.observe(Shop.ins().postUpdateBuyMedal, this.callback);
        Shop.ins().sendMedalMessage();
    };
    PeakedMallPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.getWay, this.onGetway);
        this.$onClose();
    };
    PeakedMallPanel.prototype.callback = function () {
        Shop.ins().sendMedalMessage();
    };
    PeakedMallPanel.prototype.onGetway = function () {
    };
    PeakedMallPanel.prototype.updateData = function () {
        var arr = [];
        var dataProvider = GlobalConfig.FeatsStore;
        for (var k in dataProvider) {
            if (dataProvider[k].shopType == 1)
                continue;
            var isPush = true;
            if (dataProvider[k].buyType == FEATS_TYPE.forever && Shop.ins().medalData) {
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
        this.myLabel.text = UserBag.ins().getBagGoodsCountById(UserBag.BAG_TYPE_OTHTER, GlobalConfig.PeakRaceBase.exchangeItems[0]) + "";
    };
    return PeakedMallPanel;
}(BaseView));
__reflect(PeakedMallPanel.prototype, "PeakedMallPanel");
//# sourceMappingURL=PeakedMallPanel.js.map