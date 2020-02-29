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
var GuildBoss = (function (_super) {
    __extends(GuildBoss, _super);
    function GuildBoss() {
        var _this = _super.call(this) || this;
        _this.leftTimes = 0;
        _this.canChallenge = 0;
        _this.isKilled = 0;
        _this.passId = 0;
        _this.challengeTime = 0;
        _this.bossHP = 0;
        _this.otherGuildId = 0;
        _this.otherGuildName = "";
        _this.otherGuildBossHp = 0;
        _this.winnerId = 0;
        _this.guildRankDic = [];
        _this.guildPersonRankDic = [];
        _this.guildBossState = 0;
        _this.sysId = PackageID.GuildBoss;
        _this.regNetMsg(1, _this.postGuildBossInfoChange);
        _this.regNetMsg(2, _this.doRewardRecord);
        _this.regNetMsg(3, _this.postGuildBossDetailChange);
        _this.regNetMsg(4, _this.doGuildChallengeBack);
        _this.regNetMsg(5, _this.postGuildBossRankInfoChange);
        return _this;
    }
    GuildBoss.ins = function () {
        return _super.ins.call(this);
    };
    GuildBoss.prototype.postGuildBossInfoChange = function (bytes) {
        this.leftTimes = bytes.readInt();
        var count = bytes.readUnsignedByte();
        this.passRecord = [];
        for (var i = 0; i < count; i++) {
            this.passRecord[bytes.readByte()] = bytes.readByte();
        }
        this.canChallenge = bytes.readByte();
    };
    GuildBoss.prototype.doRewardRecord = function (bytes) {
        this.isKilled = bytes.readByte();
        var count = bytes.readInt();
        var rewards = [];
        for (var i = 0; i < count; i++) {
            var item = new RewardData();
            item.parser(bytes);
            rewards.push(item);
        }
        TimerManager.ins().doTimer(800, 1, function () {
            ResultManager.ins().create(GameMap.fbType, 1, rewards, "获得奖励如下：");
        }, this);
    };
    GuildBoss.prototype.postGuildBossDetailChange = function (bytes) {
        this.passId = bytes.readInt();
        var time = bytes.readInt();
        this.challengeTime = GameServer.serverTime + time * 1000;
        this.bossHP = bytes.readInt();
        this.otherGuildId = bytes.readInt();
        this.otherGuildName = bytes.readString();
        this.otherGuildBossHp = bytes.readInt();
        this.winnerId = bytes.readInt();
    };
    GuildBoss.prototype.doGuildChallengeBack = function (bytes) {
        this.guildBossState = bytes.readInt();
        if (this.guildBossState == 0) {
            this.leftTimes--;
            this.postChallengeSuccess();
        }
        else if (this.guildBossState == 5) {
            this.sendGetBossInfo();
        }
    };
    GuildBoss.prototype.postGuildBossRankInfoChange = function (bytes) {
        var id = bytes.readInt();
        var count = bytes.readByte();
        this.guildRankDic[id] = [];
        this.guildPersonRankDic[id] = [];
        for (var i = 0; i < count; i++) {
            var obj = new guildBossRankData();
            obj.name = bytes.readString();
            obj.damage = bytes.readInt();
            obj.rank = i + 1;
            this.guildRankDic[id].push(obj);
        }
        count = bytes.readInt();
        for (var i = 0; i < count; i++) {
            var obj = new guildBossRankData();
            obj.name = bytes.readString();
            obj.damage = bytes.readInt();
            obj.devote = bytes.readInt();
            obj.rank = i + 1;
            this.guildPersonRankDic[id].push(obj);
        }
    };
    GuildBoss.prototype.sendChallengeBoss = function (type) {
        var bytes = this.getBytes(1);
        bytes.writeByte(type);
        this.sendToServer(bytes);
    };
    GuildBoss.prototype.sendGetBossReward = function (id) {
        var bytes = this.getBytes(2);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    GuildBoss.prototype.sendGetBossInfo = function () {
        this.sendBaseProto(3);
    };
    GuildBoss.prototype.sendGetBossRankInfo = function (id) {
        var bytes = this.getBytes(5);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    GuildBoss.prototype.getBossRewardState = function () {
        for (var k in GuildBoss.ins().passRecord) {
            if (GuildBoss.ins().passRecord[k] == 1) {
                return true;
            }
        }
        return false;
    };
    GuildBoss.prototype.getBossChallenge = function () {
        if (!this.isOpen())
            return false;
        if (GuildBoss.ins().leftTimes <= 0)
            return false;
        for (var k in GuildBoss.ins().passRecord) {
            if (GuildBoss.ins().passRecord[k] == 0) {
                return true;
            }
        }
        return false;
    };
    GuildBoss.prototype.isOpen = function () {
        return new Date(GameServer.serverTime).getDay() != GlobalConfig.GuildBossConfig.notOpenDayOfWeek;
    };
    GuildBoss.prototype.postChallengeSuccess = function () {
    };
    return GuildBoss;
}(BaseSystem));
__reflect(GuildBoss.prototype, "GuildBoss");
var guildBossRankData = (function () {
    function guildBossRankData() {
        this.name = "";
        this.damage = 0;
        this.rank = 0;
        this.devote = 0;
    }
    return guildBossRankData;
}());
__reflect(guildBossRankData.prototype, "guildBossRankData");
var GameSystem;
(function (GameSystem) {
    GameSystem.guildboss = GuildBoss.ins.bind(GuildBoss);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=GuildBoss.js.map