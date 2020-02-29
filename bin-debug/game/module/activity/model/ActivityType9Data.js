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
var ActivityType9Data = (function (_super) {
    __extends(ActivityType9Data, _super);
    function ActivityType9Data(bytes) {
        var _this = _super.call(this, bytes) || this;
        _this.update(bytes);
        return _this;
    }
    ActivityType9Data.prototype.getIns = function () {
        var ins;
        if (this.activityType == ActivityType.Personal) {
            ins = PActivity.ins();
        }
        else {
            ins = Activity.ins();
        }
        return ins;
    };
    ActivityType9Data.prototype.update = function (bytes) {
        this.record = bytes.readInt();
        this.count = bytes.readInt();
        var len = bytes.readByte();
        this.indexs = [];
        for (var i = 0; i < len; i++) {
            this.indexs.push(bytes.readByte());
        }
        len = bytes.readByte();
        this.noticeArr = [];
        for (var i = 0; i < len; i++) {
            this.noticeArr.push({ name: bytes.readString(), index: bytes.readByte() });
        }
        this.noticeArr.reverse();
    };
    ActivityType9Data.prototype.canReward = function () {
        return this.checkRedPoint();
    };
    ActivityType9Data.prototype.isOpenActivity = function () {
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        if (beganTime < 0 && endedTime > 0) {
            return true;
        }
        return false;
    };
    ActivityType9Data.prototype.checkRedPoint = function () {
        return this.getIns().getType9RedPoint(this.id);
    };
    ActivityType9Data.prototype.getRemainTime = function () {
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
    ActivityType9Data.prototype.getLastTime = function () {
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        var desc = DateUtils.getFormatBySecond(endedTime, DateUtils.TIME_FORMAT_5, 3);
        return desc;
    };
    ActivityType9Data.prototype.getStateByIndex = function (index) {
        var state = (this.record >> index) & 1;
        return state;
    };
    return ActivityType9Data;
}(ActivityBaseData));
__reflect(ActivityType9Data.prototype, "ActivityType9Data");
//# sourceMappingURL=ActivityType9Data.js.map