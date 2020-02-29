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
var LastWeekRankItemRenderer = (function (_super) {
    __extends(LastWeekRankItemRenderer, _super);
    function LastWeekRankItemRenderer() {
        return _super.call(this) || this;
    }
    LastWeekRankItemRenderer.prototype.dataChanged = function () {
        this.index = this.itemIndex + 1;
        if (this.index <= 3) {
            this.rankImg.source = "paihang" + this.index;
            this.rank.text = "";
        }
        else {
            this.rank.text = this.index + "";
            this.rankImg.source = "";
        }
        if (this.data instanceof RankDataLadder) {
            var rankData = this.data;
            this.dwImg.source = "ladder_rank_" + rankData.challgeLevel;
            this.nameLabel.text = rankData.player;
            this.winNum.text = rankData.winNum + "场";
            this.head.source = "head_" + rankData.job + rankData.sex;
            var config = Ladder.ins().getLevelConfig(rankData.challgeLevel, rankData.challgeId);
            this.item1.data = Ladder.ins().creatRewardData(GlobalConfig.TianTiRankAwardConfig[this.index + ""].award[0]);
            this.level.text = config.showDan + "";
            this.setlevelInfo(rankData.challgeLevel < 4);
            if (this.index == 1) {
            }
        }
        else if (this.data instanceof TianTiDanConfig) {
            var danConfig = this.data;
            this.winNum.text = "";
            this.nameLabel.text = danConfig.showLevel + "段位";
            this.item1.data = Ladder.ins().creatRewardData(danConfig.danAward[0]);
            this.setlevelInfo(true);
            this.dwImg.source = "ladder_rank_" + danConfig.level;
            this.level.text = danConfig.showDan + "";
            this.setlevelInfo(false);
            this.rankImg.source = "";
            this.rank.text = "";
        }
        else {
            this.winNum.text = "";
            this.nameLabel.text = "钻石段位第" + this.index + "名";
            this.item1.data = Ladder.ins().creatRewardData(GlobalConfig.TianTiRankAwardConfig[this.index + ""].award[0]);
            this.dwImg.source = "ladder_rank_4";
            this.setlevelInfo(false);
            if (this.index == 1) {
            }
        }
    };
    LastWeekRankItemRenderer.prototype.setlevelInfo = function (boo) {
        this.levelBg.visible = this.level.visible = boo;
    };
    return LastWeekRankItemRenderer;
}(BaseItemRender));
__reflect(LastWeekRankItemRenderer.prototype, "LastWeekRankItemRenderer");
//# sourceMappingURL=LastWeekRankItemRenderer.js.map