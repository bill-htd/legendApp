var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var KfArenaRankData = (function () {
    function KfArenaRankData(bytes) {
        this.rank = bytes.readInt();
        this.playerId = bytes.readInt();
        this.score = bytes.readInt();
        this.vip = bytes.readInt();
        this.playerName = bytes.readString();
        this.dan = bytes.readInt();
        this.servId = bytes.readInt();
    }
    return KfArenaRankData;
}());
__reflect(KfArenaRankData.prototype, "KfArenaRankData");
//# sourceMappingURL=KfArenaRankData.js.map