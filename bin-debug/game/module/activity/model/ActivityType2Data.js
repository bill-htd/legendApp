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
var ActivityType2Data = (function (_super) {
    __extends(ActivityType2Data, _super);
    function ActivityType2Data(bytes) {
        var _this = _super.call(this, bytes) || this;
        _this.buyData = [];
        _this.serverBuyData = [];
        _this.areaBuyData = [];
        _this.areabuyReward = [];
        _this.initBuyData(bytes);
        return _this;
    }
    ActivityType2Data.prototype.update = function (bytes) {
        _super.prototype.update.call(this, bytes);
        var id = bytes.readShort();
        var count = bytes.readInt();
        this.buyData[id] = count;
        this.serverBuyData[id] = bytes.readInt();
        this.areaBuyData[id] = bytes.readInt();
        this.areabuyReward[id] = bytes.readInt();
        for (var j = 0; j <= count; j++) {
            this.areaBuyData[j] = Math.max(this.areaBuyData[j], this.buyData[j]);
        }
    };
    ActivityType2Data.prototype.initBuyData = function (bytes) {
        var count = bytes.readShort();
        for (var i = 1; i <= count; i++) {
            this.buyData[i] = bytes.readShort();
            this.serverBuyData[i] = bytes.readShort();
            this.areaBuyData[i] = bytes.readInt();
            this.areabuyReward[i] = bytes.readInt();
        }
        for (var j = 0; j <= count; j++) {
            this.areaBuyData[j] = Math.max(this.areaBuyData[j], this.buyData[j]);
        }
        this.sumRMB = bytes.readInt();
    };
    ActivityType2Data.prototype.canReward = function () {
        if (Actor.level < ActivityType2Data.LimitLevel)
            return false;
        var activityData;
        if (Activity.ins().doubleElevenIDs.indexOf(this.id) != -1)
            activityData = Activity.ins().getDoubleElevenDataByID(this.id);
        else
            activityData = Activity.ins().getActivityDataById(this.id);
        var config = GlobalConfig.ActivityType2Config[this.id];
        var serverBuy = false;
        for (var i in config) {
            var cfd = config[i];
            var isBuy = activityData.buyData[cfd.index] >= cfd.count ? true : false;
            serverBuy = this.serverBuyData[cfd.index] >= cfd.scount ? true : false;
            if (!isBuy && activityData.sumRMB >= cfd.needRecharge && Actor.yb >= cfd.price && UserVip.ins().lv >= cfd.vip && !serverBuy) {
                return true;
            }
            else {
                if (isBuy && cfd.countReward) {
                    for (var j in cfd.countReward) {
                        if (this.getAreaReward(cfd.index, Number(j) + 1)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };
    ActivityType2Data.prototype.isSpecialOpen = function () {
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        var config = GlobalConfig.ActivityType2Config[this.id][1];
        var hours = Number(config.limitTime[0]);
        var minutes = Number(config.limitTime[1]);
        if (beganTime + hours * 3600 + minutes * 60 < 0 && endedTime > 0) {
            return true;
        }
        return false;
    };
    ActivityType2Data.prototype.getSpecialStrikeTimes = function () {
        var config = GlobalConfig.ActivityType2Config[this.id][1];
        var hours = Number(config.limitTime[0]);
        var minutes = Number(config.limitTime[1]);
        var times = (GameServer.serverTime - DateUtils.formatMiniDateTime(this.startTime) - hours * 3600000 - minutes * 60000) / 1000 / 240;
        return times > 0 ? times : 0;
    };
    ActivityType2Data.prototype.isOpenActivity = function () {
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        if (beganTime < 0 && endedTime > 0) {
            return true;
        }
        return false;
    };
    ActivityType2Data.prototype.getHide = function () {
        if (this.isHide)
            return this.isHide;
        var config = GlobalConfig.ActivityType2Config[this.id];
        for (var i = 1; i < this.buyData.length; i++) {
            var cfd = config[i];
            if (this.buyData[i] < cfd.count) {
                this.isHide = false;
                return this.isHide;
            }
        }
        this.isHide = true;
        return this.isHide;
    };
    ActivityType2Data.prototype.getLeftTime = function () {
        if (this.endTime) {
            var end_time = DateUtils.formatMiniDateTime(this.endTime) / 1000;
            var leftTime = Math.floor((end_time - GameServer.serverTime) / 1000);
            if (leftTime < 0) {
                leftTime = 0;
            }
            return leftTime;
        }
        var actConfig = GlobalConfig.ActivityConfig[this.id];
        var day = 0;
        var endDay = 0;
        if (actConfig.timeType == 0) {
            var time = +(actConfig.startTime.split("-")[0]);
            endDay = +(actConfig.endTime.split("-")[0]) - time;
            day = GameServer.serverOpenDay - time;
        }
        else if (actConfig.timeType == 1) {
            var time = GameServer.serverTime;
            var openTime = (new Date(actConfig.startTime)).getTime();
            var endTime = (new Date(actConfig.endTime)).getTime();
            day = Math.floor((time - openTime) / 1000 / 3600 / 24);
            endDay = Math.round((endTime - openTime) / 1000 / 3600 / 24);
        }
        else if (actConfig.timeType == 2) {
            var time = +(actConfig.startTime.split("-")[0]);
            endDay = +(actConfig.endTime.split("-")[0]) - time;
            var farTime = Math.floor((GameServer.serverTime - DateUtils.formatMiniDateTime(GameServer._serverHeZeroTime)) / 1000 / 3600 / 24);
            day = farTime - time;
        }
        var curDate = new Date(GameServer.serverTime);
        var leftDay = endDay - day;
        if (leftDay <= 0)
            return 0;
        var endDate = new Date(GameServer.serverTime);
        endDate.setDate(curDate.getDate() + leftDay);
        endDate.setHours(0, 0, 0, 0);
        return Math.floor((endDate.getTime() - GameServer.serverTime) / 1000);
    };
    ActivityType2Data.prototype.getSpecialOpenLeftTime = function () {
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        var config = GlobalConfig.ActivityType2Config[this.id][1];
        var hours = Number(config.limitTime[0]);
        var minutes = Number(config.limitTime[1]);
        beganTime += hours * 3600 + minutes * 60;
        if (beganTime < 0 && endedTime > 0)
            return beganTime;
        return 0;
    };
    ActivityType2Data.prototype.getAreaReward = function (index, zqindex) {
        var config = GlobalConfig.ActivityType2Config[this.id][index];
        if (this.buyData[index] && this.buyData[index] >= config.count) {
            if (((this.areabuyReward[index] >> zqindex) & 1) > 0) {
                return Activity.Geted;
            }
            else {
                if (this.areaBuyData[index] >= config.countReward[zqindex - 1].count) {
                    return Activity.CanGet;
                }
            }
        }
        return Activity.NotReached;
    };
    ActivityType2Data.LimitLevel = 50;
    return ActivityType2Data;
}(ActivityBaseData));
__reflect(ActivityType2Data.prototype, "ActivityType2Data");
//# sourceMappingURL=ActivityType2Data.js.map