var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var KFBossData = (function () {
    function KFBossData() {
    }
    return KFBossData;
}());
__reflect(KFBossData.prototype, "KFBossData");
var KFBossInfoData = (function () {
    function KFBossInfoData(bytes) {
        this.dpId = bytes.readShort();
        this.serverId = bytes.readShort();
        this.bossRefTimer = bytes.readInt() * 1000 + egret.getTimer();
        this.flagRefTimer = bytes.readInt() * 1000 + egret.getTimer();
        if (this.dpId == 8)
            this.flagRefTimer = Number.MAX_VALUE + egret.getTimer();
    }
    return KFBossInfoData;
}());
__reflect(KFBossInfoData.prototype, "KFBossInfoData");
//# sourceMappingURL=KFBossData.js.map