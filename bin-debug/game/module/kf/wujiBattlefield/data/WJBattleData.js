var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WJBattleData = (function () {
    function WJBattleData() {
        this.isFirstKiller = 0;
        this.isMVP = 0;
        this.isResult = false;
    }
    WJBattleData.prototype.readResultData = function (bytes) {
        this.servId = bytes.readInt();
        this.playerName = bytes.readString();
        this.camp = bytes.readInt();
        this.killNum = bytes.readInt();
        this.killedNum = bytes.readInt();
        this.assistsNum = bytes.readInt();
        this.collectFlagNum = bytes.readInt();
        this.isFirstKiller = bytes.readByte();
        this.isMVP = bytes.readByte();
    };
    WJBattleData.prototype.readViewData = function (bytes) {
        this.servId = bytes.readInt();
        this.playerName = bytes.readString();
        this.camp = bytes.readInt();
        this.killNum = bytes.readInt();
        this.killedNum = bytes.readInt();
        this.assistsNum = bytes.readInt();
        this.collectFlagNum = bytes.readInt();
        this.isFirstKiller = bytes.readByte();
    };
    WJBattleData.prototype.readMyData = function (bytes) {
        this.killNum = bytes.readInt();
        this.killedNum = bytes.readInt();
        this.assistsNum = bytes.readInt();
        this.collectFlagNum = bytes.readInt();
    };
    return WJBattleData;
}());
__reflect(WJBattleData.prototype, "WJBattleData");
var WJCampType;
(function (WJCampType) {
    WJCampType[WJCampType["ME"] = 100] = "ME";
    WJCampType[WJCampType["ENEMY"] = 200] = "ENEMY";
})(WJCampType || (WJCampType = {}));
//# sourceMappingURL=WJBattleData.js.map