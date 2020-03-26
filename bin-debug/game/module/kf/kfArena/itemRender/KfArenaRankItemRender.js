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
var KfArenaRankItemRender = (function (_super) {
    __extends(KfArenaRankItemRender, _super);
    function KfArenaRankItemRender() {
        return _super.call(this) || this;
    }
    KfArenaRankItemRender.prototype.dataChanged = function () {
        if (this.data instanceof KfArenaRankData) {
            if (this.data.rank <= 3) {
                this.rankImg.source = "paihang" + this.data.rank;
                this.rankTxt.visible = false;
                this.rankImg.visible = true;
            }
            else {
                this.rankTxt.text = this.data.rank + "";
                this.rankTxt.visible = true;
                this.rankImg.visible = false;
            }
            this.player.text = this.data.playerName;
            this.score.text = this.data.score + "";
            this.seasonTitle.text = KfArenaSys.ins().duanName[this.data.dan];
            var serverName = window['getServerName'](this.data.servId);
            this.serverId.text = "[" + serverName + "]";
            this.vip.visible = this.data.vip > 0;
            if (GlobalConfig.CrossArenaBase.rankAward[this.data.rank]) {
                this.reward.data = GlobalConfig.CrossArenaBase.rankAward[this.data.rank].mail.tAwardList[0];
                this.reward.visible = true;
            }
            else {
                this.reward.visible = false;
            }
        }
    };
    return KfArenaRankItemRender;
}(BaseItemRender));
__reflect(KfArenaRankItemRender.prototype, "KfArenaRankItemRender");
//# sourceMappingURL=KfArenaRankItemRender.js.map