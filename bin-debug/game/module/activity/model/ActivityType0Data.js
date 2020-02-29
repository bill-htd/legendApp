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
var ActivityType0Data = (function (_super) {
    __extends(ActivityType0Data, _super);
    function ActivityType0Data(bytes) {
        return _super.call(this, bytes) || this;
    }
    ActivityType0Data.prototype.update = function (bytes) {
        _super.prototype.update.call(this, bytes);
    };
    ActivityType0Data.prototype.specialState = function () {
        var hefuTime = DateUtils.formatMiniDateTime(GameServer._serverHeZeroTime);
        var timeS;
        var date;
        var timeE;
        var dateE;
        if (this.id == ActivityBtnType.HEFU_BOSS) {
            var openTime = [0, 1, 3, 5];
            for (var i = 0; i < openTime.length; i++) {
                timeS = hefuTime + openTime[i] * DateUtils.MS_PER_DAY;
                date = new Date(timeS);
                date.setHours(20, 30, 0);
                timeE = hefuTime + (openTime[i] + 1) * DateUtils.MS_PER_DAY;
                dateE = new Date(timeE);
                if (GameServer.serverTime >= date.getTime() && GameServer.serverTime < dateE.getTime()) {
                    var cof = GlobalConfig.CityBossConfig[i + 1];
                    if (!cof) {
                        return false;
                    }
                    var killBossId = cof.killBossId;
                    var obj = CityCC.ins().bossKillNumData;
                    if (obj && obj[killBossId] != undefined && obj[killBossId][1] != 1) {
                        return true;
                    }
                }
            }
            return false;
        }
        else if (this.id == ActivityBtnType.HEFU_JZLC) {
            var openTime = GlobalConfig.GuildBattleConst.hefuOpen;
            if (!openTime) {
                return false;
            }
            if (GuildWar.ins().getModel().isWatStart) {
                return true;
            }
            return false;
        }
        return true;
    };
    ActivityType0Data.prototype.canReward = function () {
        if (this.id == ActivityBtnType.LEI_JI_DAYS42) {
            return Recharge.ins().rechargeTotal.hasGetDays.length < Recharge.ins().rechargeTotal.totalDay;
        }
        else if (this.id == ActivityBtnType.LEI_JI_EVERYDAY) {
            var data = Recharge.ins().getRechargeData(0);
            var configs = Recharge.ins().getCurRechargeConfig();
            for (var k in configs) {
                var config = configs[k];
                if (data.curDayPay >= config.pay) {
                    var state = ((data.isAwards >> config.index) & 1);
                    if (!state) {
                        return true;
                    }
                }
            }
        }
        else if (this.id == ActivityBtnType.THREE_HEROES)
            return ThreeHeroes.ins().awardState == ThreeHeroes.CanGet;
        else if (this.id == ActivityBtnType.HEFU_JZLC || this.id == ActivityBtnType.HEFU_BOSS) {
            return true;
        }
        else if (this.id == ActivityBtnType.SANRI_RECHARGE) {
            var confing = GlobalConfig.MultiDayRechargeConfig;
            for (var i in confing) {
                var conf = confing[i];
                if (Recharge.ins().mDayNum == parseInt(i) && Recharge.ins().mRecNum >= conf.num && Recharge.ins().mReward == 0) {
                    return true;
                }
            }
        }
        var aCon = GlobalConfig.ActivityBtnConfig[this.id];
        if (aCon && aCon.jump && aCon.jump[0] == StatePageSysType.RING) {
            if (LyMark.ins().checkOpen()) {
                if (!LyMark.ins().isMax) {
                    var cfg = GlobalConfig.FlameStampLevel[LyMark.ins().lyMarkLv];
                    var itemData = UserBag.ins().getBagItemById(cfg.costItem);
                    var count = itemData ? itemData.count : 0;
                    return count >= cfg.costCount;
                }
            }
        }
        return false;
    };
    ActivityType0Data.prototype.getHide = function () {
        if (this.isHide)
            return this.isHide;
        if (this.id == ActivityBtnType.LEI_JI_DAYS42) {
            if (Recharge.ins().rechargeTotal.hasGetDays.length >= CommonUtils.getObjectLength(GlobalConfig.RechargeDaysAwardsConfig)) {
                this.isHide = true;
            }
        }
        else if (this.id == ActivityBtnType.THREE_HEROES)
            this.isHide = !this.isOpenActivity();
        else if (this.id == ActivityBtnType.HEFU_BOSS) {
            var openTime = [0, 1, 3, 5];
            var cof = GlobalConfig.CityBossConfig[openTime.length];
            if (cof) {
                var killBossId = cof.killBossId;
                var obj = CityCC.ins().bossKillNumData;
                if (obj && obj[killBossId] != undefined && obj[killBossId][1] >= 1) {
                    this.isHide = true;
                }
            }
        }
        else if (this.id == ActivityBtnType.HEFU_JZLC) {
            var hefuTime = DateUtils.formatMiniDateTime(GameServer._serverHeZeroTime);
            var openTime = GlobalConfig.GuildBattleConst.hefuOpen;
            var i = openTime.length - 1;
            var timeE = hefuTime + openTime[i].day * DateUtils.MS_PER_DAY;
            var dateE = new Date(timeE);
            dateE.setHours(0, 0, 0);
            if (GameServer.serverTime > dateE.getTime()) {
                return true;
            }
        }
        return this.isHide;
    };
    ActivityType0Data.prototype.isOpenActivity = function () {
        var beganTime = Math.floor((this.startTime - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((this.endTime - GameServer.serverTime) / 1000);
        if (beganTime < 0 && endedTime > 0) {
            return true;
        }
        else if (this.id == ActivityBtnType.THREE_HEROES)
            return ThreeHeroes.ins().showIcon3DaysLater;
        return false;
    };
    return ActivityType0Data;
}(ActivityBaseData));
__reflect(ActivityType0Data.prototype, "ActivityType0Data");
var StatePageSysType;
(function (StatePageSysType) {
    StatePageSysType[StatePageSysType["WING"] = 1] = "WING";
    StatePageSysType[StatePageSysType["RING"] = 2] = "RING";
})(StatePageSysType || (StatePageSysType = {}));
//# sourceMappingURL=ActivityType0Data.js.map