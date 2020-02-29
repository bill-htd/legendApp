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
var ActivityType11Data = (function (_super) {
    __extends(ActivityType11Data, _super);
    function ActivityType11Data(bytes, id, startTime, endTime) {
        var _this = _super.call(this, bytes) || this;
        _this._rewardInfo = 0;
        _this.id = id;
        _this.startTime = startTime;
        _this.endTime = endTime;
        _this.update(bytes);
        return _this;
    }
    ActivityType11Data.prototype.update = function (bytes) {
        this._rewardInfo = bytes.readInt();
        var len = bytes.readShort();
        this._achieveInfo = [];
        this._achieveInfo.length = Object.keys(GlobalConfig.ActivityType11_2Config[this.id]).length;
        var i;
        for (i = 0; i < len; i++)
            this._achieveInfo[bytes.readShort() - 1] = { times: bytes.readInt(), isGot: bytes.readBoolean() };
        len = this._achieveInfo.length;
        var conf;
        this._hiScore = 0;
        var curDay = this.getCurDay();
        for (i = 0; i < len; i++) {
            if (!this._achieveInfo[i])
                this._achieveInfo[i] = { times: 0, isGot: false };
            conf = GlobalConfig.ActivityType11_2Config[this.id][i + 1];
            if (!conf.day || curDay >= conf.day)
                this._hiScore += (Math.floor(this._achieveInfo[i].times / conf.target)) * conf.score;
        }
    };
    Object.defineProperty(ActivityType11Data.prototype, "rewardInfo", {
        get: function () {
            return this._rewardInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityType11Data.prototype, "hiScore", {
        get: function () {
            return this._hiScore;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityType11Data.prototype, "achieveInfo", {
        get: function () {
            return this._achieveInfo;
        },
        enumerable: true,
        configurable: true
    });
    ActivityType11Data.prototype.canReward = function () {
        return this.checkRedPoint();
    };
    ActivityType11Data.prototype.isOpenActivity = function () {
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        if (beganTime < 0 && endedTime > 0)
            return true;
        return false;
    };
    ActivityType11Data.prototype.checkRedPoint = function () {
        var cfg = GlobalConfig.ActivityConfig[this.id];
        if (cfg.pageStyle == ActivityPageStyle.HAPPYSEVENDAY || cfg.pageStyle == ActivityPageStyle.SPRINGEIGHTDAY || cfg.pageStyle == ActivityPageStyle.VERSIONCELE) {
            var len = Object.keys(GlobalConfig.ActivityType11_2Config[this.id]).length;
            var conf = void 0;
            var achieve = void 0;
            var curDay = this.getCurDay();
            for (var i = 1; i <= len; i++) {
                conf = GlobalConfig.ActivityType11_2Config[this.id][i];
                achieve = this.achieveInfo[conf.index - 1];
                if (curDay >= conf.day && !achieve.isGot && achieve.times >= conf.dayLimit)
                    return true;
            }
        }
        else {
            if (this.checkPhaseAward())
                return true;
        }
        if (cfg.pageStyle == ActivityPageStyle.VERSIONCELE) {
            if (ActivityType11Data.FIRST_OPEN_SHOP)
                return true;
            if (this.checkPhaseAward())
                return true;
            var id = 0;
            for (var k in Activity.ins().activityData) {
                var ac = Activity.ins().activityData[k];
                if (!ac)
                    continue;
                if (ac.pageStyle == ActivityPageStyle.VERSIONCELE && ac.type == ActivityDataFactory.ACTIVITY_TYPE_22 && Activity.ins().getActivityDataById(+k).isOpenActivity() && !Activity.ins().getActivityDataById(+k).getHide()) {
                    id = ac.id;
                    if (ac.refreshFree)
                        return true;
                    break;
                }
            }
        }
        return false;
    };
    ActivityType11Data.prototype.checkPhaseAward = function () {
        var len = Object.keys(GlobalConfig.ActivityType11_1Config[this.id]).length;
        for (var i = 1; i <= len; i++) {
            if ((this._rewardInfo >> i & 1) <= 0 && this._hiScore >= GlobalConfig.ActivityType11_1Config[this.id][i].score)
                return true;
        }
        return false;
    };
    ActivityType11Data.prototype.getRemainTime = function () {
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        var desc;
        if (beganTime >= 0) {
            desc = "活动未开启";
        }
        else if (endedTime <= 0) {
            desc = "活动已结束";
        }
        else {
            desc = DateUtils.getFormatBySecond(endedTime, DateUtils.TIME_FORMAT_5, 3);
        }
        return desc;
    };
    ActivityType11Data.prototype.getCurDay = function () {
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        var desc;
        if (beganTime >= 0)
            return 0;
        else if (endedTime <= 0)
            return 0;
        else
            return Math.ceil(Math.abs(beganTime) / (24 * 3600));
    };
    ActivityType11Data.FIRST_OPEN_SHOP = true;
    return ActivityType11Data;
}(ActivityBaseData));
__reflect(ActivityType11Data.prototype, "ActivityType11Data");
//# sourceMappingURL=ActivityType11Data.js.map