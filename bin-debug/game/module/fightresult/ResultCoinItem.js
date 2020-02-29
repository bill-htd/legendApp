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
var ResultCoinItem = (function (_super) {
    __extends(ResultCoinItem, _super);
    function ResultCoinItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "ResultCoinItemSkin";
        return _this;
    }
    ResultCoinItem.prototype.dataChanged = function () {
        var data = this.data;
        this.labelInfo.size = 20;
        this.labelInfo.text = "\u83B7\u5F97" + RewardData.getCurrencyName(data.id) + "\uFF1A";
        this.imgCoin.source = RewardData.getCurrencyRes(data.id);
        this.labelCount.text = "" + data.count;
        this.labelInfo.x = 0;
        this.imgCoin.x = this.labelInfo.x + this.labelInfo.textWidth;
        this.labelCount.x = this.imgCoin.x + this.imgCoin.width;
    };
    return ResultCoinItem;
}(eui.ItemRenderer));
__reflect(ResultCoinItem.prototype, "ResultCoinItem");
//# sourceMappingURL=ResultCoinItem.js.map