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
var AutoChallengeBoss = (function (_super) {
    __extends(AutoChallengeBoss, _super);
    function AutoChallengeBoss() {
        var _this = _super.call(this) || this;
        _this.observe(UserBoss.ins().postWorldBoss, _this.checkEnter);
        _this.observe(UserBoss.ins().postBossData, _this.delayCheckEnter);
        _this.observe(GameLogic.ins().postEnterMap, function () {
            if (GameMap.fubenID == 0) {
                _this.checkEnter();
            }
        });
        return _this;
    }
    AutoChallengeBoss.ins = function () {
        return _super.ins.call(this);
    };
    AutoChallengeBoss.prototype.refBossTimeFun = function () {
        TimerManager.ins().remove(this.refTimes, this);
        this.refType = UserBoss.BOSS_SUBTYPE_QMBOSS;
        var time = UserBoss.ins().worldBossrestoreTime[this.refType];
        if (time > UserBoss.ins().worldBossrestoreTime[UserBoss.BOSS_SUBTYPE_SHENYU]) {
            this.refType = UserBoss.BOSS_SUBTYPE_SHENYU;
            time = UserBoss.ins().worldBossrestoreTime[this.refType];
        }
        var t = time - egret.getTimer();
        if (t > 0)
            TimerManager.ins().doTimer(t, 1, this.refTimes, this);
    };
    AutoChallengeBoss.prototype.refTimes = function () {
        UserBoss.ins().sendWorldBossInfo(this.refType);
    };
    AutoChallengeBoss.prototype.delayCheckEnter = function (params) {
        if (params[0]) {
            TimerManager.ins().doTimer(1000, 2, this.checkEnter, this);
        }
    };
    AutoChallengeBoss.prototype.checkEnter = function () {
        if (!UserBoss.ins().worldInfoList || GameMap.fubenID != 0)
            return;
        var lunhuiList = [];
        var ywList = [];
        var ywBoss = UserBoss.ins().worldInfoList[UserBoss.BOSS_SUBTYPE_QMBOSS];
        if (ywBoss && this.autoYewaiBoss && UserBoss.ins().worldBossLeftTime[UserBoss.BOSS_SUBTYPE_QMBOSS]) {
            for (var _i = 0, ywBoss_1 = ywBoss; _i < ywBoss_1.length; _i++) {
                var item = ywBoss_1[_i];
                var bossDp = GlobalConfig.WorldBossConfig[item.id];
                if (!UserBoss.isCanChallenge(bossDp))
                    continue;
                bossDp.samsaraLv ? lunhuiList.push(item) : ywList.push(item);
            }
        }
        lunhuiList = lunhuiList.sort(this.compareFn);
        for (var i = 0; i < lunhuiList.length; i++) {
            var item = lunhuiList[i];
            if (item.canChallenge && UserBoss.ins().getBossRemindByIndex(item.id)) {
                this.enterFb(item.id, UserBoss.BOSS_SUBTYPE_QMBOSS);
                return;
            }
        }
        if (UserBoss.ins().worldInfoList[UserBoss.BOSS_SUBTYPE_SHENYU] &&
            this.autoShenyuBoss &&
            UserBoss.ins().worldBossLeftTime[UserBoss.BOSS_SUBTYPE_SHENYU]) {
            var syList = UserBoss.ins().worldInfoList[UserBoss.BOSS_SUBTYPE_SHENYU].slice();
            syList = syList.sort(this.compareFn);
            for (var i = 0; i < syList.length; i++) {
                var item = syList[i];
                if (item.canChallenge && UserBoss.ins().getBossRemindByIndex(item.id)) {
                    this.enterFb(item.id, UserBoss.BOSS_SUBTYPE_SHENYU);
                    return;
                }
            }
        }
        ywList = ywList.sort(this.compareFn);
        for (var i = 0; i < ywList.length; i++) {
            var item = ywList[i];
            if (item.canChallenge && UserBoss.ins().getBossRemindByIndex(item.id)) {
                this.enterFb(item.id, UserBoss.BOSS_SUBTYPE_QMBOSS);
                return;
            }
        }
    };
    AutoChallengeBoss.prototype.enterFb = function (id, type) {
        var cd = UserBoss.ins().worldBossCd[type] - egret.getTimer();
        if (cd > 0) {
            TimerManager.ins().doTimer(cd, 1, this.checkEnter, this);
        }
        else {
            UserBoss.ins().postBossData(false);
            UserBoss.ins().sendChallengWorldBoss(id, type);
        }
    };
    AutoChallengeBoss.prototype.compareFn = function (a, b) {
        var configA = GlobalConfig.WorldBossConfig[a.id];
        var configB = GlobalConfig.WorldBossConfig[b.id];
        if (configA.zsLevel < configB.zsLevel) {
            return 1;
        }
        else if (configA.zsLevel > configB.zsLevel) {
            return -1;
        }
        if (configA.level < configB.level)
            return 1;
        else if (configA.level > configB.level)
            return -1;
        else
            return 0;
    };
    return AutoChallengeBoss;
}(BaseSystem));
__reflect(AutoChallengeBoss.prototype, "AutoChallengeBoss");
var GameSystem;
(function (GameSystem) {
    GameSystem.autoChallengeBoss = AutoChallengeBoss.ins.bind(AutoChallengeBoss);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=AutoChallengeBoss.js.map