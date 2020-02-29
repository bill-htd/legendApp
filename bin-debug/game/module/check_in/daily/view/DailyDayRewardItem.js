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
var DailyDayRewardItem = (function (_super) {
    __extends(DailyDayRewardItem, _super);
    function DailyDayRewardItem() {
        var _this = _super.call(this) || this;
        _this.id = 0;
        _this.skinName = "DailyDayRewardItemSkin";
        return _this;
    }
    DailyDayRewardItem.prototype.dataChanged = function () {
        var rewardCfg = this.data;
        this.item.data = rewardCfg.rewards[0];
        this.item.touchChildren = false;
        this.item.touchEnabled = false;
        this.item.isShowName(false);
    };
    DailyDayRewardItem.prototype.resetView = function () {
    };
    return DailyDayRewardItem;
}(eui.ItemRenderer));
__reflect(DailyDayRewardItem.prototype, "DailyDayRewardItem");
//# sourceMappingURL=DailyDayRewardItem.js.map