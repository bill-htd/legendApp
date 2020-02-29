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
var LaBaRewardItemItemRender = (function (_super) {
    __extends(LaBaRewardItemItemRender, _super);
    function LaBaRewardItemItemRender() {
        return _super.call(this) || this;
    }
    LaBaRewardItemItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.rewardList.itemRenderer = ItemBase;
    };
    LaBaRewardItemItemRender.prototype.dataChanged = function () {
        if (!this.data)
            return;
        var config = this.data.config;
        var index = this.data.index;
        var show = config.rankReward[index];
        var rank = "";
        if (index == config.rankReward.length - 1) {
            rank = "其他名次";
        }
        else if (show.start == show.endi) {
            rank = "\u7B2C" + show.start + "\u540D";
        }
        else {
            rank = "\u7B2C" + show.start + "-" + show.endi + "\u540D";
        }
        this.ranks.text = rank;
        this.rewardList.dataProvider = new eui.ArrayCollection(show.reward);
    };
    LaBaRewardItemItemRender.prototype.destruct = function () {
    };
    return LaBaRewardItemItemRender;
}(BaseItemRender));
__reflect(LaBaRewardItemItemRender.prototype, "LaBaRewardItemItemRender");
//# sourceMappingURL=LaBaRewardItemItemRender.js.map