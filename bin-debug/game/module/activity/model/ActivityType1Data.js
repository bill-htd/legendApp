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
var ActivityType1Data = (function (_super) {
    __extends(ActivityType1Data, _super);
    function ActivityType1Data(bytes) {
        var _this = _super.call(this, bytes) || this;
        _this.rewardsSum = [];
        _this.hFTotalConsumption = 0;
        _this.readReawards(bytes);
        return _this;
    }
    ActivityType1Data.prototype.update = function (bytes) {
        _super.prototype.update.call(this, bytes);
        var rewardID = bytes.readShort();
        this.record = bytes.readInt();
    };
    ActivityType1Data.prototype.readReawards = function (bytes) {
        this.record = bytes.readInt();
        this.hFTotalConsumption = bytes.readInt();
        var len = bytes.readShort();
        for (var i = 1; i <= len; i++) {
            this.rewardsSum[i] = bytes.readShort();
        }
    };
    ActivityType1Data.prototype.canReward = function () {
        return this.checkRedPoint();
    };
    ActivityType1Data.prototype.isOpenActivity = function () {
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        if (beganTime < 0 && endedTime > 0) {
            return true;
        }
    };
    ActivityType1Data.prototype.getConfig = function () {
        var config;
        if (this.activityType == ActivityType.Personal) {
            config = GlobalConfig.PActivityType1Config;
        }
        else {
            config = GlobalConfig.ActivityType1Config;
        }
        return config;
    };
    ActivityType1Data.prototype.getIns = function () {
        var ins;
        if (this.activityType == ActivityType.Personal) {
            ins = PActivity.ins();
        }
        else {
            ins = Activity.ins();
        }
        return ins;
    };
    ActivityType1Data.prototype.getRewardStateById = function (index) {
        var config = this.getConfig()[this.id][index];
        switch (config.showType) {
            case ShowType.LEVEL:
                if (Actor.level < config.level || UserZs.ins().lv < config.zslevel)
                    return Activity.NotReached;
                break;
            case ShowType.WING:
                if (WingsData.getWingAllLevel() < config.wingLv)
                    return Activity.NotReached;
                break;
            case ShowType.ZHUZAO:
                if (Role.getAllForgeLevelByType(PackageID.Zhuling) < config.zzLv)
                    return Activity.NotReached;
                break;
            case ShowType.LONGHUN:
                if (LongHunData.getLongHunAllLevel() < config.lhLv)
                    return Activity.NotReached;
                break;
            case ShowType.BOOK:
                var power = Book.ins().getBookPowerNumEx();
                if (power < config.tjPower)
                    return Activity.NotReached;
                break;
            case ShowType.EQUIP:
                if (UserBag.ins().getEquipsScoreByRolesOfBody() < config.equipPower)
                    return Activity.NotReached;
                break;
            case ShowType.XIAOFEI:
                var data = this.getIns().getActivityDataById(config.Id);
                if (data.hFTotalConsumption < config.consumeYuanbao) {
                    return Activity.NotReached;
                }
                break;
            case ShowType.RING:
                var lvl = 0;
                var ringData = SpecialRing.ins().getSpecialRingDataById(SpecialRing.FIRE_RING_ID);
                if (ringData && ringData.level)
                    lvl = ringData.level;
                if (lvl < config.huoyanRingLv) {
                    return Activity.NotReached;
                }
                break;
            case ShowType.SAMSARA:
                if (Actor.samsaraLv < config.lunhLv)
                    return Activity.NotReached;
                break;
            case ShowType.ZHANLING:
                if (ZhanLingModel.ins().getZhanLingDataByLevel(0) < config.zhanlingLv)
                    return Activity.NotReached;
                break;
        }
        var record = Math.floor(this.record / Math.pow(2, (config.index))) % 2;
        return record ? Activity.Geted : Activity.CanGet;
    };
    ActivityType1Data.prototype.checkRedPoint = function () {
        var tmplist = this.getConfig()[this.id];
        for (var k in tmplist) {
            var config = tmplist[k];
            var btnType = this.getRewardStateById(config.index);
            var curget = this.rewardsSum[config.index];
            var sum = config.total ? (config.total - curget) : 1;
            switch (btnType) {
                case Activity.NotReached:
                    break;
                case Activity.CanGet:
                    if (sum > 0)
                        return true;
                    break;
                case Activity.Geted:
                    break;
            }
        }
        return false;
    };
    ActivityType1Data.prototype.getHide = function () {
        if (this.isHide)
            return this.isHide;
        var rec = this.record >> 1;
        var tmplist = this.getConfig()[this.id];
        var tlist = Object.keys(tmplist);
        if (rec >= Math.pow(2, tlist.length) - 1) {
            this.isHide = true;
            return this.isHide;
        }
        this.isHide = false;
        return this.isHide;
    };
    return ActivityType1Data;
}(ActivityBaseData));
__reflect(ActivityType1Data.prototype, "ActivityType1Data");
var ShowType;
(function (ShowType) {
    ShowType[ShowType["LEVEL"] = 0] = "LEVEL";
    ShowType[ShowType["WING"] = 1] = "WING";
    ShowType[ShowType["ZHUZAO"] = 2] = "ZHUZAO";
    ShowType[ShowType["LONGHUN"] = 3] = "LONGHUN";
    ShowType[ShowType["BOOK"] = 5] = "BOOK";
    ShowType[ShowType["EQUIP"] = 6] = "EQUIP";
    ShowType[ShowType["RING"] = 7] = "RING";
    ShowType[ShowType["SAMSARA"] = 8] = "SAMSARA";
    ShowType[ShowType["ZHANLING"] = 9] = "ZHANLING";
    ShowType[ShowType["XIAOFEI"] = 100] = "XIAOFEI";
})(ShowType || (ShowType = {}));
//# sourceMappingURL=ActivityType1Data.js.map