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
var ActivityType21Data = (function (_super) {
    __extends(ActivityType21Data, _super);
    function ActivityType21Data(bytes) {
        return _super.call(this, bytes) || this;
    }
    ActivityType21Data.prototype.update = function (bytes) {
    };
    ActivityType21Data.prototype.canReward = function () {
        return this.checkRedPoint();
    };
    ActivityType21Data.prototype.isOpenActivity = function () {
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        if (beganTime < 0 && endedTime > 0) {
            return true;
        }
        return false;
    };
    ActivityType21Data.prototype.getleftTime = function () {
        if (!this.isOpenActivity()) {
            return 0;
        }
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        return endedTime;
    };
    ActivityType21Data.prototype.checkRedPoint = function () {
        return false;
    };
    return ActivityType21Data;
}(ActivityBaseData));
__reflect(ActivityType21Data.prototype, "ActivityType21Data");
//# sourceMappingURL=ActivityType21Data.js.map