var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuildFBModel = (function () {
    function GuildFBModel() {
        this.bossTimer = 1;
    }
    GuildFBModel.prototype.parserBaseInfo = function (bytes) {
        this.fbNum = bytes.readShort();
        this.sweep = bytes.readByte();
        this.sweepNum = bytes.readShort();
        this.tongguan = bytes.readByte();
        this.zuwei = bytes.readByte();
        this.nextFb = bytes.readByte();
    };
    GuildFBModel.prototype.parserRankInfo = function (bytes) {
        this.rankDatas = [];
        var len = bytes.readByte();
        for (var i = 0; i < len; i++) {
            var info = new GuildFBRankInfo();
            info.rank = i + 1;
            info.name = bytes.readString();
            info.guanka = bytes.readShort();
            this.rankDatas.push(info);
        }
    };
    GuildFBModel.prototype.parserMaxGkInfo = function (bytes) {
        this.isMaxGK = bytes.readByte();
        if (this.isMaxGK != 0) {
            this.maxName = bytes.readString();
            this.maxCareer = bytes.readByte();
            this.maxSex = bytes.readByte();
            this.maxNum = bytes.readShort();
            this.maxZhuwei = bytes.readByte();
        }
    };
    GuildFBModel.prototype.parserGkInfo = function (bytes) {
        this.fbgkNum = bytes.readShort();
        var len = bytes.readByte();
        this.gkDatas = [];
        for (var i = 0; i < len; i++) {
            this.gkDatas.push(bytes.readString());
        }
    };
    GuildFBModel.prototype.parserRewardInfo = function (bytes) {
        this.rewardNum = bytes.readShort();
        this.rewardRoleNum = bytes.readShort();
    };
    GuildFBModel.prototype.hasbtn = function () {
        return (GameServer.serverOpenDay > 0 && ((this.sweep == 0 && this.fbNum > 0) || (this.tongguan == 0 && this.rewardNum > 0)));
    };
    Object.defineProperty(GuildFBModel.prototype, "bossTimerEnd", {
        get: function () {
            return this.bossTimer + egret.getTimer();
        },
        enumerable: true,
        configurable: true
    });
    return GuildFBModel;
}());
__reflect(GuildFBModel.prototype, "GuildFBModel");
//# sourceMappingURL=GuildFBModel.js.map