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
var KfCostRankRewardItemRender = (function (_super) {
    __extends(KfCostRankRewardItemRender, _super);
    function KfCostRankRewardItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = 'ISCostRewardItemSkin';
        _this.init();
        return _this;
    }
    KfCostRankRewardItemRender.prototype.init = function () {
        this.reward.itemRenderer = ItemBase;
    };
    KfCostRankRewardItemRender.prototype.onClick = function (e) {
    };
    KfCostRankRewardItemRender.prototype.dataChanged = function () {
        if (!this.data)
            return;
        var data = this.data;
        this.pos.text = data.rank + "";
        this.need.text = data.desc;
        this.reward.dataProvider = new eui.ArrayCollection(data.rewards);
    };
    return KfCostRankRewardItemRender;
}(BaseItemRender));
__reflect(KfCostRankRewardItemRender.prototype, "KfCostRankRewardItemRender");
//# sourceMappingURL=KfCostRankRewardItemRender.js.map