var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var KfArenaData = (function () {
    function KfArenaData(bytes) {
        if (bytes)
            this.readData(bytes);
    }
    KfArenaData.prototype.readData = function (bytes) {
        this.servId = bytes.readInt();
        this.playerName = bytes.readString();
        this.killNum = bytes.readShort();
        this.aidNum = bytes.readShort();
        this.collectNum = bytes.readShort();
        this.curScore = bytes.readShort();
        this.curGetScore = bytes.readShort();
        this.totalScore = bytes.readShort();
        this.isFirstKiller = bytes.readBoolean();
        this.isFirstCollect = bytes.readBoolean();
        this.isMvp = bytes.readBoolean();
        this.isOnWin = bytes.readBoolean();
        this.isDeserter = bytes.readBoolean();
    };
    KfArenaData.prototype.readRankData = function (bytes) {
        this.servId = bytes.readInt();
        this.playerName = bytes.readString();
        this.killNum = bytes.readShort();
        this.aidNum = bytes.readShort();
        this.collectNum = bytes.readShort();
        this.curScore = bytes.readShort();
        this.totalScore = bytes.readShort();
    };
    return KfArenaData;
}());
__reflect(KfArenaData.prototype, "KfArenaData");
//# sourceMappingURL=KfArenaData.js.map