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
var LadderRankItemRenderer = (function (_super) {
    __extends(LadderRankItemRenderer, _super);
    function LadderRankItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "TiantiRankItem";
        return _this;
    }
    LadderRankItemRenderer.prototype.dataChanged = function () {
        var rankData = this.data;
        if (rankData.pos <= 3) {
            this.rankImg.source = "paihang" + rankData.pos;
            this.rank.text = "";
        }
        else {
            this.rank.text = rankData.pos + "";
            this.rankImg.source = "";
        }
        this.nameLabel.text = rankData.player;
        this.winNum.text = rankData.winNum + "场";
        this.dwImg.source = "ladder_rank_" + rankData.challgeLevel;
        var config = Ladder.ins().getLevelConfig(rankData.challgeLevel, rankData.challgeId);
        if (config && config.showDan > 0) {
            this.level.source = 'laddergradnum_' + config.showDan;
            this.levelBg.visible = true;
        }
        else {
            this.level.source = null;
            this.levelBg.visible = false;
        }
    };
    return LadderRankItemRenderer;
}(BaseItemRender));
__reflect(LadderRankItemRenderer.prototype, "LadderRankItemRenderer");
//# sourceMappingURL=LadderRankItemRenderer.js.map