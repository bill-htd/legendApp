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
var ActivityType10Data = (function (_super) {
    __extends(ActivityType10Data, _super);
    function ActivityType10Data(bytes) {
        var _this = _super.call(this, bytes) || this;
        _this.update(bytes);
        return _this;
    }
    ActivityType10Data.prototype.update = function (bytes) {
        this.record = bytes.readInt();
        this.yb = bytes.readInt();
        this.index = bytes.readInt();
        this.state = bytes.readByte();
        var len = bytes.readByte();
        this.noticeArr = [];
        for (var i = 0; i < len; i++) {
            this.noticeArr.push({ name: bytes.readString(), multiple: bytes.readDouble(), yb: bytes.readInt() });
        }
        this.noticeArr.reverse();
    };
    ActivityType10Data.prototype.canReward = function () {
        return this.checkRedPoint();
    };
    ActivityType10Data.prototype.isOpenActivity = function () {
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        if (beganTime < 0 && endedTime > 0) {
            return true;
        }
        return false;
    };
    ActivityType10Data.prototype.checkRedPoint = function () {
        return Activity.ins().getType10RedPoint(this.id);
    };
    ActivityType10Data.prototype.getLeftTime = function () {
        if (this.endTime) {
            var leftTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
            if (leftTime < 0) {
                leftTime = 0;
            }
            return leftTime;
        }
        return 0;
    };
    ActivityType10Data.prototype.getRemainTime = function () {
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
    ActivityType10Data.prototype.getLevel = function () {
        var config = GlobalConfig.ActivityType10Config[this.id];
        var len = Object.keys(config).length;
        var level = this.record + 1;
        if (this.record >= len)
            level = 0;
        return level;
    };
    ActivityType10Data.prototype.getCondition = function (lv) {
        var config = GlobalConfig.ActivityType10Config[this.id][lv];
        if (!config)
            return false;
        if (this.yb >= config.recharge) {
            return true;
        }
        return false;
    };
    return ActivityType10Data;
}(ActivityBaseData));
__reflect(ActivityType10Data.prototype, "ActivityType10Data");
//# sourceMappingURL=ActivityType10Data.js.map