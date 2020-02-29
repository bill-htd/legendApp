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
var GuildFB = (function (_super) {
    __extends(GuildFB, _super);
    function GuildFB() {
        var _this = _super.call(this) || this;
        _this.bossTimer = 1;
        _this.sysId = PackageID.GuildFB;
        _this.regNetMsg(1, _this.doGuildFBInfo);
        _this.regNetMsg(2, _this.doGuildFBRankInfo);
        _this.regNetMsg(3, _this.doGuildFBMaxGKInfo);
        _this.regNetMsg(4, _this.doGuildFBGKInfo);
        _this.regNetMsg(5, _this.doGuildFBChangeInfo);
        _this.regNetMsg(6, _this.doGuildFBRewardInfo);
        _this.regNetMsg(7, _this.postGuildFBBossInfo);
        _this.regNetMsg(8, _this.postGuildFBBossTimerEndInfo);
        _this.regNetMsg(9, _this.postGuildFBSweepEnd);
        return _this;
    }
    GuildFB.ins = function () {
        return _super.ins.call(this);
    };
    GuildFB.prototype.getGkDatas = function (index) {
        if (index === void 0) { index = -1; }
        return index == -1 ? this._gkDatas : this._gkDatas[index];
    };
    GuildFB.prototype.doGuildFBInfo = function (bytes) {
        this.fbNum = bytes.readShort();
        this.sweep = bytes.readByte();
        this.sweepNum = bytes.readShort();
        this.tongguan = bytes.readByte();
        this.zuwei = bytes.readByte();
        this.nextFb = bytes.readByte();
        this.postGuildFubenInfo();
    };
    GuildFB.prototype.postGuildFubenInfo = function () {
    };
    GuildFB.prototype.doGuildFBRankInfo = function (bytes) {
        this.rankDatas = [];
        var len = bytes.readByte();
        for (var i = 0; i < len; i++) {
            var info = new GuildFBRankInfo();
            info.rank = i + 1;
            info.name = bytes.readString();
            info.guanka = bytes.readShort();
            this.rankDatas.push(info);
        }
        this.postGuildFubenInfo();
    };
    GuildFB.prototype.doGuildFBMaxGKInfo = function (bytes) {
        this.isMaxGK = bytes.readByte();
        if (this.isMaxGK != 0) {
            this.maxName = bytes.readString();
            this.maxCareer = bytes.readByte();
            this.maxSex = bytes.readByte();
            this.maxNum = bytes.readShort();
            this.maxZhuwei = bytes.readByte();
        }
        this.postGuildFubenInfo();
    };
    GuildFB.prototype.doGuildFBGKInfo = function (bytes) {
        this.fbgkNum = bytes.readShort();
        var len = bytes.readByte();
        this._gkDatas = [];
        for (var i = 0; i < len; i++) {
            this._gkDatas.push(bytes.readString());
        }
        this.postGuildFubenInfo();
        this.postGuildFubenRoleInfo();
    };
    GuildFB.prototype.postGuildFubenRoleInfo = function () {
    };
    GuildFB.prototype.doGuildFBChangeInfo = function (bytes) {
        this.change = bytes.readByte();
        if (ViewManager.ins().getView(GuildActivityWin) && ViewManager.ins().getView(GuildActivityWin).isShow()) {
            if (this.change == 1) {
                this.sendGuildFBRankInfo();
            }
            else if (this.change == 2) {
                this.sendGuildFBMaxGKInfo();
            }
            this.change = 0;
        }
    };
    GuildFB.prototype.doGuildFBRewardInfo = function (bytes) {
        this.rewardNum = bytes.readShort();
        this.rewardRoleNum = bytes.readShort();
        this.postGuildFubenInfo();
    };
    GuildFB.prototype.postGuildFBBossInfo = function (bytes) {
        this.bossGKNum = bytes.readShort();
    };
    GuildFB.prototype.postGuildFBBossTimerEndInfo = function (bytes) {
        this.bossGKNum = bytes.readShort();
        this.bossTimer = DateUtils.formatMiniDateTime(bytes.readInt());
    };
    GuildFB.prototype.postGuildFBSweepEnd = function (bytes) {
    };
    GuildFB.prototype.sendGuildFBRankInfo = function () {
        this.sendBaseProto(2);
    };
    GuildFB.prototype.sendGuildFBMaxGKInfo = function () {
        this.sendBaseProto(3);
    };
    GuildFB.prototype.sendGuildFBGKRoleInfo = function (num) {
        var bytes = this.getBytes(4);
        bytes.writeShort(num);
        this.sendToServer(bytes);
    };
    GuildFB.prototype.sendGuildFBChallange = function () {
        this.sendBaseProto(5);
    };
    GuildFB.prototype.sendGuildFBSweep = function () {
        this.sendBaseProto(6);
    };
    GuildFB.prototype.sendGuildFBZhuwei = function () {
        this.sendBaseProto(7);
    };
    GuildFB.prototype.sendGuildFBReward = function () {
        this.sendBaseProto(8);
    };
    GuildFB.prototype.hasbtn = function () {
        return (GameServer.serverOpenDay > 0 && ((this.sweep == 0 && this.fbNum > 0) || (this.tongguan == 0 && this.rewardNum > 0)));
    };
    Object.defineProperty(GuildFB.prototype, "bossTimerEnd", {
        get: function () {
            return this.bossTimer + egret.getTimer();
        },
        enumerable: true,
        configurable: true
    });
    return GuildFB;
}(BaseSystem));
__reflect(GuildFB.prototype, "GuildFB");
var GameSystem;
(function (GameSystem) {
    GameSystem.guildfb = GuildFB.ins.bind(GuildFB);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=GuildFB.js.map