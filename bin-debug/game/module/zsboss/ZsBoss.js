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
var ZsBoss = (function (_super) {
    __extends(ZsBoss, _super);
    function ZsBoss() {
        var _this = _super.call(this) || this;
        _this.promptList = ["", "你今天已经参加过1次活动了，请明天再来", "挑战CD中", "转生BOSS已经被击杀", "没有符合条件的boss",
            "活动未开启", "在副本中"];
        _this.firstShowWin = false;
        _this._clearOther = false;
        _this.canChange = true;
        _this.sysId = PackageID.ZsBoss;
        _this.regNetMsg(1, _this.postBossList);
        _this.regNetMsg(2, _this.postBossOpen);
        _this.regNetMsg(3, _this.postRrmainTime);
        _this.regNetMsg(4, _this.postRankInfo);
        _this.regNetMsg(5, _this.postLotteryInfo);
        _this.regNetMsg(7, _this.postChallengeResult);
        _this.regNetMsg(8, _this.postHudunPoint);
        _this.regNetMsg(9, _this.postWinResult);
        _this.regNetMsg(11, _this.doGetMyPoint);
        _this.regNetMsg(12, _this.doTalkMaxPoint);
        return _this;
    }
    ZsBoss.ins = function () {
        return _super.ins.call(this);
    };
    ZsBoss.prototype.sendGetBossList = function () {
        this.sendBaseProto(1);
    };
    ZsBoss.prototype.sendRequstChallenge = function () {
        this.sendBaseProto(3);
    };
    ZsBoss.prototype.sendRequstBossRank = function (bossId) {
        var bytes = this.getBytes(4);
        bytes.writeInt(bossId);
        this.sendToServer(bytes);
    };
    ZsBoss.prototype.sendJoinChoujiang = function () {
        this.sendBaseProto(5);
    };
    ZsBoss.prototype.sendBuyCd = function () {
        this.sendBaseProto(6);
    };
    ZsBoss.prototype.postBossList = function (bytes) {
        var len = bytes.readShort();
        this.bossInfoList = [];
        for (var i = 0; i < len; i++) {
            this.bossInfoList.push(new BossInfoData(bytes));
        }
        this.aliveBossNum = bytes.readShort();
    };
    ZsBoss.prototype.getBossListLength = function () {
        var result = 0;
        if (this.bossInfoList != null) {
            result = this.bossInfoList.length;
        }
        return result;
    };
    ZsBoss.prototype.getBossInfoByIndex = function (index) {
        var result = null;
        if (this.bossInfoList != null) {
            if (index >= 0 && index < this.bossInfoList.length) {
                result = this.bossInfoList[index];
            }
        }
        return result;
    };
    ZsBoss.prototype.postBossOpen = function (bytes) {
        this.acIsOpen = bytes.readBoolean();
        if (!this.acIsOpen) {
            this.reliveTime = 0;
        }
        else {
            if (UserZs.ins().lv > 0) {
                if (UserBoss.ins().worldBossLeftTime[UserBoss.BOSS_SUBTYPE_WORLDBOSS]) {
                    UserBoss.ins().postBossData(true, this.canPlayBossName());
                }
            }
        }
    };
    ZsBoss.prototype.postRrmainTime = function (bytes) {
        this.remainTime = bytes.readShort();
        this.reliveTime = bytes.readShort();
    };
    ZsBoss.prototype.postRankInfo = function (bytes) {
        this.parseBossRankList(bytes);
    };
    ZsBoss.prototype.postLotteryInfo = function (bytes) {
        this.lotteryItemId = bytes.readInt();
        ViewManager.ins().open(ZSBossLotteryWin);
    };
    ZsBoss.prototype.postChallengeResult = function (bytes) {
        var index = bytes.readByte();
        if (index > 0) {
            UserTips.ins().showTips(ZsBoss.ins().promptList[index]);
        }
        else if (index == 0) {
            ViewManager.ins().close(BossWin);
        }
    };
    ZsBoss.prototype.postHudunPoint = function (bytes) {
        this.hudun = bytes.readInt();
    };
    ZsBoss.prototype.postWinResult = function (bytes) {
        var infoArr = [bytes.readString(), bytes.readString(), bytes.readShort()];
        var len = bytes.readShort();
        var list = [];
        var item;
        for (var i = 0; i < len; i++) {
            item = new RewardData();
            item.parser(bytes);
            list.push(item);
        }
        ViewManager.ins().open(ZsBossResultWin, infoArr, list);
    };
    Object.defineProperty(ZsBoss.prototype, "reliveTime", {
        get: function () {
            return this._reliveTime;
        },
        set: function (num) {
            if (this._reliveTime != num) {
                this._reliveTime = num;
                TimerManager.ins().remove(this.timeClock, this);
                TimerManager.ins().doTimer(1000, this._reliveTime, this.timeClock, this);
            }
        },
        enumerable: true,
        configurable: true
    });
    ZsBoss.prototype.timeClock = function () {
        this._reliveTime--;
        if (this._reliveTime <= 0) {
            TimerManager.ins().remove(this.timeClock, this);
        }
    };
    ZsBoss.prototype.parseBossRankList = function (bytes) {
        this.bossRankList = [];
        var bossId = bytes.readInt();
        var len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            this.bossRankList.push(new BossRankInfo(bytes, i + 1));
        }
    };
    ZsBoss.prototype.getBarList = function () {
        if (this.barList && this.barList.length > 0) {
            return this.barList;
        }
        if (!this.barList) {
            this.barList = [];
        }
        var config;
        for (var i = 1; i < 5; i++) {
            config = GlobalConfig.OtherBoss1Config[i];
            this.barList.push(config.llimit + "-" + config.hlimit + "转");
        }
        return this.barList;
    };
    ZsBoss.prototype.isZsBossFb = function (fbId) {
        var config;
        for (var i = 1; i < 5; i++) {
            config = GlobalConfig.OtherBoss1Config[i];
            if (fbId == config.fbid) {
                return true;
            }
        }
        return false;
    };
    ZsBoss.prototype.checkIsMoreMoney = function () {
        return Actor.yb >= GlobalConfig.WorldBossBaseConfig.clearCdCost[UserBoss.ins().currBossSubType - 1];
    };
    ZsBoss.prototype.checkIsShowNoticeWin = function () {
        return false;
    };
    ZsBoss.prototype.canPlayBossIndex = function () {
        var zsLv = UserZs.ins().lv;
        var config;
        for (var i = 4; i >= 1; i--) {
            config = GlobalConfig.OtherBoss1Config[i];
            if (zsLv >= config.llimit && zsLv <= config.hlimit) {
                if (this.aliveBossNum >= i) {
                    return i;
                }
            }
        }
        return 0;
    };
    ZsBoss.prototype.canPlayBossName = function () {
        var index = this.canPlayBossIndex();
        if (index > 0) {
            var config = GlobalConfig.OtherBoss1Config[index];
            return GlobalConfig.MonstersConfig[config.bossId].name;
        }
        return "转生boss ";
    };
    Object.defineProperty(ZsBoss.prototype, "clearOther", {
        get: function () {
            return this._clearOther;
        },
        set: function (value) {
            if (this._clearOther != value) {
                this._clearOther = value;
                this.canChange = false;
                TimerManager.ins().doTimer(1000, 10, this.overDealy, this, this.dealyOver, this);
            }
        },
        enumerable: true,
        configurable: true
    });
    ZsBoss.prototype.dealyOver = function () {
        TimerManager.ins().remove(this.overDealy, this);
        this.canChange = true;
    };
    ZsBoss.prototype.overDealy = function () {
    };
    ZsBoss.prototype.doGetMyPoint = function (bytes) {
        this.postLotteryPoint(bytes.readShort());
    };
    ZsBoss.prototype.postLotteryPoint = function (n) {
        return n;
    };
    ZsBoss.prototype.doTalkMaxPoint = function (bytes) {
        this.postLotteryMaxPost(bytes.readString(), bytes.readShort());
    };
    ZsBoss.prototype.postLotteryMaxPost = function (str, n) {
        return [str, n];
    };
    return ZsBoss;
}(BaseSystem));
__reflect(ZsBoss.prototype, "ZsBoss");
var BossInfoData = (function () {
    function BossInfoData(bytes) {
        this.bossId = bytes.readInt();
        this.kill = bytes.readBoolean();
        this.challengeIn = bytes.readBoolean();
    }
    return BossInfoData;
}());
__reflect(BossInfoData.prototype, "BossInfoData");
var BossRankInfo = (function () {
    function BossRankInfo(bytes, ranks) {
        this.id = bytes.readInt();
        this.names = bytes.readString();
        this.shanghai = bytes.readDouble();
        this.rank = ranks;
    }
    return BossRankInfo;
}());
__reflect(BossRankInfo.prototype, "BossRankInfo");
var GameSystem;
(function (GameSystem) {
    GameSystem.zsBoss = ZsBoss.ins.bind(ZsBoss);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=ZsBoss.js.map