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
var ActivityType20Data = (function (_super) {
    __extends(ActivityType20Data, _super);
    function ActivityType20Data(bytes) {
        var _this = _super.call(this, bytes) || this;
        _this.update(bytes);
        return _this;
    }
    ActivityType20Data.prototype.update = function (bytes) {
        this.index = bytes.readInt() || 1;
        this.timer = bytes.readInt();
        if (this.timer)
            this.timer = Math.floor(DateUtils.formatMiniDateTime(this.timer) / DateUtils.MS_PER_SECOND);
        this.isGoIn = bytes.readByte();
    };
    ActivityType20Data.prototype.canReward = function () {
        return this.checkRedPoint();
    };
    ActivityType20Data.prototype.isOpenActivity = function () {
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        if (beganTime < 0 && endedTime > 0) {
            return true;
        }
        return false;
    };
    ActivityType20Data.prototype.getleftTime = function () {
        if (!this.isOpenActivity()) {
            return 0;
        }
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        return endedTime;
    };
    ActivityType20Data.prototype.checkRedPoint = function () {
        if (this.IsEnd())
            return false;
        var startTime = this.getStartTimer();
        var endTime = this.getEndTimer();
        var curTime = Math.floor(GameServer.serverTime / DateUtils.MS_PER_SECOND);
        if (curTime < startTime || curTime >= endTime)
            return false;
        return true;
    };
    ActivityType20Data.prototype.IsEnd = function () {
        var endTimer = this.getEndTimer();
        var endDate = new Date(endTimer * DateUtils.MS_PER_SECOND);
        var curDate = new Date(GameServer.serverTime);
        if (curDate.getDate() != endDate.getDate())
            return true;
        return false;
    };
    ActivityType20Data.prototype.go2BossFb = function () {
        return this.isGoIn;
    };
    ActivityType20Data.prototype.getReadyTimer = function () {
        var config = GlobalConfig.ActivityType20Config[this.id][this.index];
        return this.timer - config.duration - config.enterTime;
    };
    ActivityType20Data.prototype.getStartTimer = function () {
        var config = GlobalConfig.ActivityType20Config[this.id][this.index];
        return this.timer - config.duration;
    };
    ActivityType20Data.prototype.getEndTimer = function () {
        return this.timer;
    };
    ActivityType20Data.prototype.getResidueTimer = function () {
        if (this.IsEnd())
            return 0;
        var startTimer = this.getStartTimer();
        var endTimer = this.getEndTimer();
        var curTimer = Math.floor(GameServer.serverTime / DateUtils.MS_PER_SECOND);
        if (curTimer >= startTimer && curTimer < endTimer)
            return endTimer - curTimer;
        return endTimer - curTimer;
    };
    ActivityType20Data.prototype.getResidueStartTimer = function () {
        if (this.IsEnd())
            return 0;
        var startTimer = this.getStartTimer();
        var curTimer = Math.floor(GameServer.serverTime / DateUtils.MS_PER_SECOND);
        if (curTimer >= startTimer)
            return 0;
        return startTimer - curTimer;
    };
    ActivityType20Data.prototype.getDateTime = function (str) {
        var arr = str.split(/[-,.,:]/g);
        var date = new Date(+arr[0], +arr[1] - 1, +arr[2], +arr[3] || 0, +arr[4] || 0);
        return date;
    };
    return ActivityType20Data;
}(ActivityBaseData));
__reflect(ActivityType20Data.prototype, "ActivityType20Data");
var LBBossRankData = (function () {
    function LBBossRankData() {
        this.rank = 0;
        this.name = "";
        this.damage = 0;
    }
    return LBBossRankData;
}());
__reflect(LBBossRankData.prototype, "LBBossRankData");
//# sourceMappingURL=ActivityType20Data.js.map