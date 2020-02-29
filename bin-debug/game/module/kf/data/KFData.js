var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var KFData = (function () {
    function KFData() {
    }
    return KFData;
}());
__reflect(KFData.prototype, "KFData");
var KFDropRecordData = (function () {
    function KFDropRecordData(bytes) {
        this.type = bytes.readShort();
        if (this.type == KFDropType.KF_BOSS) {
            this.kfBossData(bytes);
        }
        else if (this.type == KFDropType.DEVILDOM) {
            this.devildomData(bytes);
        }
    }
    KFDropRecordData.prototype.kfBossData = function (bytes) {
        this.time = bytes.readInt();
        this.roleId = bytes.readInt();
        this.servId = bytes.readInt();
        this.nick = bytes.readString();
        this.sceneName = bytes.readString();
        this.bossName = bytes.readString();
        this.goodsId = bytes.readInt();
        this.time = Math.floor(DateUtils.formatMiniDateTime(this.time) / DateUtils.MS_PER_SECOND);
    };
    KFDropRecordData.prototype.devildomData = function (bytes) {
        this.time = bytes.readInt();
        this.servId = bytes.readInt();
        this.guildName = bytes.readString();
        this.bossName = bytes.readString();
        this.goodsId = bytes.readInt();
        this.time = Math.floor(DateUtils.formatMiniDateTime(this.time) / DateUtils.MS_PER_SECOND);
    };
    return KFDropRecordData;
}());
__reflect(KFDropRecordData.prototype, "KFDropRecordData");
var KFDropType;
(function (KFDropType) {
    KFDropType[KFDropType["KF_BOSS"] = 1] = "KF_BOSS";
    KFDropType[KFDropType["DEVILDOM"] = 2] = "DEVILDOM";
})(KFDropType || (KFDropType = {}));
//# sourceMappingURL=KFData.js.map