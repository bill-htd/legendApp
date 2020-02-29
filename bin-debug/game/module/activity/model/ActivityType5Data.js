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
var ActivityType5Data = (function (_super) {
    __extends(ActivityType5Data, _super);
    function ActivityType5Data(bytes) {
        var _this = this;
        if (!bytes)
            return;
        _this = _super.call(this, bytes) || this;
        _this.recrod = bytes.readInt();
        return _this;
    }
    ActivityType5Data.prototype.updateRecord = function (bytes) {
        this.recrod = bytes.readInt();
    };
    ActivityType5Data.prototype.update = function (bytes) {
        _super.prototype.update.call(this, bytes);
        var short = bytes.readShort();
        this.recrod = bytes.readInt();
    };
    ActivityType5Data.prototype.updateData = function (bytes) {
        this.logTime = bytes.readInt();
    };
    ActivityType5Data.prototype.isOpenActivity = function () {
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        if (beganTime < 0 && endedTime > 0) {
            return true;
        }
        return false;
    };
    ActivityType5Data.prototype.canReward = function (index) {
        if (index === void 0) { index = 0; }
        if (index == 0) {
            index = this.logTime;
        }
        var configs = GlobalConfig['ActivityType5Config'][this.id];
        for (var k in configs) {
            var statu = (this.recrod >> configs[k].index) & 1;
            if (statu == 0 && configs[k].day <= this.logTime) {
                return true;
            }
        }
        return false;
    };
    ActivityType5Data.prototype.checkOneDayStatu = function (index) {
        if (index === void 0) { index = 0; }
        if (index == 0) {
            index = this.logTime;
        }
        var configs = GlobalConfig['ActivityType5Config'][this.id];
        var statu = (this.recrod >> index) & 1;
        if (statu == 0) {
            return true;
        }
        return false;
    };
    ActivityType5Data.prototype.getCurDay = function () {
        var day = this.logTime;
        if (this.id == 157) {
            day = Activity.ins().hfLoginDay;
        }
        else if (this.id == 210) {
            day = Activity.ins().geLoginDay;
        }
        return day;
    };
    return ActivityType5Data;
}(ActivityBaseData));
__reflect(ActivityType5Data.prototype, "ActivityType5Data");
//# sourceMappingURL=ActivityType5Data.js.map