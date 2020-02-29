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
var PeakChipMallPanel = (function (_super) {
    __extends(PeakChipMallPanel, _super);
    function PeakChipMallPanel() {
        return _super.call(this) || this;
    }
    PeakChipMallPanel.prototype.childrenCreated = function () {
        this.listView.itemRenderer = HonorMarketItemRenderer;
        this.dataArr = new eui.ArrayCollection;
        this.listView.dataProvider = this.dataArr;
    };
    PeakChipMallPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.getWay, this.onGetway);
        this.observe(Shop.ins().postRefresMedalMessage, this.updateData);
        this.observe(Actor.ins().postChip, this.callback);
        this.observe(Shop.ins().postUpdateBuyMedal, this.callback);
        Shop.ins().sendMedalMessage();
    };
    PeakChipMallPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.$onClose();
        this.removeTouchEvent(this.getWay, this.onGetway);
    };
    PeakChipMallPanel.prototype.callback = function () {
        Shop.ins().sendMedalMessage();
    };
    PeakChipMallPanel.prototype.onGetway = function () {
    };
    PeakChipMallPanel.prototype.updateData = function () {
        var arr = [];
        var dataProvider = GlobalConfig.FeatsStore;
        for (var k in dataProvider) {
            if (dataProvider[k].shopType == 2)
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
        this.myLabel.text = Actor.chip + "";
        var text = this.getWay.text;
        this.getWay.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:" + text);
    };
    return PeakChipMallPanel;
}(BaseView));
__reflect(PeakChipMallPanel.prototype, "PeakChipMallPanel");
//# sourceMappingURL=PeakChipMallPanel.js.map