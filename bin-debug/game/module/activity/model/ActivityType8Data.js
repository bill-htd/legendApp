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
var ActivityType8Data = (function (_super) {
    __extends(ActivityType8Data, _super);
    function ActivityType8Data(bytes) {
        var _this = _super.call(this, bytes) || this;
        _this.update(bytes);
        return _this;
    }
    ActivityType8Data.prototype.update = function (bytes) {
        this.record = bytes.readInt();
    };
    ActivityType8Data.prototype.canReward = function () {
        return this.checkRedPoint();
    };
    ActivityType8Data.prototype.isOpenActivity = function () {
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        if (beganTime < 0 && endedTime > 0) {
            return true;
        }
        return false;
    };
    ActivityType8Data.prototype.checkRedPoint = function () {
        return Activity.ins().getType8RedPoint(this.id);
    };
    ActivityType8Data.prototype.getRemainTime = function () {
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
    ActivityType8Data.TYPE_RING = 1;
    return ActivityType8Data;
}(ActivityBaseData));
__reflect(ActivityType8Data.prototype, "ActivityType8Data");
//# sourceMappingURL=ActivityType8Data.js.map