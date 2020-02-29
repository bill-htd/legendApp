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
var PeakTopRankItemRender = (function (_super) {
    __extends(PeakTopRankItemRender, _super);
    function PeakTopRankItemRender() {
        return _super.call(this) || this;
    }
    PeakTopRankItemRender.prototype.dataChanged = function () {
        if (this.data instanceof PeakTopRankData) {
            this.nameLabel.text = this.data.playerName;
            this.score.text = this.data.likeNum * GlobalConfig.PeakRaceBase.likeScore + "";
            this.supportBtn.visible = PeakedHelp.canSupport();
            if (PeakedSys.ins().kideNum >= GlobalConfig.PeakRaceBase.likeCount) {
                this.supportBtn.enabled = false;
            }
            if (this.data.rank <= 3) {
                this.rankImg.source = "paihang" + this.data.rank;
                this.rank.text = "";
            }
            else {
                this.rank.text = this.data.rank + "";
                this.rankImg.source = "";
            }
        }
    };
    return PeakTopRankItemRender;
}(BaseItemRender));
__reflect(PeakTopRankItemRender.prototype, "PeakTopRankItemRender");
//# sourceMappingURL=PeakTopRankItemRender.js.map