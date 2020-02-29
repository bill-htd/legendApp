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
var ActivityType19Data = (function (_super) {
    __extends(ActivityType19Data, _super);
    function ActivityType19Data(bytes) {
        var _this = _super.call(this, bytes) || this;
        _this.awardIndex = 0;
        _this._data = {};
        _this._list = [];
        return _this;
    }
    ActivityType19Data.prototype.CleanRandData = function () {
        this._data = {};
        this._list = [];
    };
    ActivityType19Data.prototype.SetRankData = function (value) {
        this._list[value.rank - 1] = value;
        this._data[value.actorId] = value;
    };
    ActivityType19Data.prototype.GetRankData = function () {
        return this._data;
    };
    ActivityType19Data.prototype.GetRankList = function () {
        return this._list;
    };
    ActivityType19Data.prototype.update = function (bytes) {
    };
    ActivityType19Data.prototype.canReward = function () {
        return this.checkRedPoint();
    };
    ActivityType19Data.prototype.isOpenActivity = function () {
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        if (beganTime < 0 && endedTime > 0) {
            return true;
        }
        return false;
    };
    ActivityType19Data.prototype.getleftTime = function () {
        if (!this.isOpenActivity()) {
            return 0;
        }
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        return endedTime;
    };
    ActivityType19Data.prototype.checkRedPoint = function () {
        var config = GlobalConfig.ActivityType19Config[this.id][1];
        if (config.activityID) {
            var act1 = Activity.ins().getActivityDataById(config.activityID);
            if (act1 && act1.canReward())
                return true;
        }
        return false;
    };
    return ActivityType19Data;
}(ActivityBaseData));
__reflect(ActivityType19Data.prototype, "ActivityType19Data");
//# sourceMappingURL=ActivityType19Data.js.map