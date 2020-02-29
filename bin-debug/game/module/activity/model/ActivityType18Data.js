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
var ActivityType18Data = (function (_super) {
    __extends(ActivityType18Data, _super);
    function ActivityType18Data(bytes) {
        var _this = _super.call(this, bytes) || this;
        _this.num = 0;
        _this.init(bytes);
        return _this;
    }
    ActivityType18Data.prototype.init = function (bytes) {
        this.num = bytes.readInt();
        this.recrod = bytes.readInt();
        var len = bytes.readShort();
        if (this.logs)
            this.logs.length = 0;
        else
            this.logs = [];
        for (var i = 0; i < len; i++) {
            var data = [bytes.readString(), bytes.readInt()];
            this.logs.push(data);
        }
        this.logs = this.logs.reverse();
        if (this.bestlogs)
            this.bestlogs.length = 0;
        else
            this.bestlogs = [];
        len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            var data = [bytes.readString(), bytes.readInt()];
            this.bestlogs.push(data);
        }
    };
    ActivityType18Data.prototype.update = function (bytes) {
        var index = bytes.readShort();
        this.num = bytes.readInt();
        this.recrod = bytes.readInt();
        var num = bytes.readShort();
        var arr = [];
        for (var i = 0; i < num; i++)
            arr[i] = [bytes.readInt(), bytes.readShort()];
        var type = 0;
        if (index == 2)
            type = 1;
        if (ViewManager.ins().isShow(HuntResultWin))
            Activity.ins().postHuntResult(type, arr, 3, this.id);
        else {
            ViewManager.ins().open(HuntResultWin, type, arr, 2, this.id);
            Activity.ins().postHuntResult(type, arr, 3, this.id);
        }
    };
    ActivityType18Data.prototype.isOpenActivity = function () {
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        if (beganTime < 0 && endedTime > 0)
            return true;
        return false;
    };
    ActivityType18Data.prototype.getLeftTime = function () {
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        if (endedTime < 0)
            endedTime = 0;
        return endedTime;
    };
    ActivityType18Data.prototype.canReward = function () {
        return this.checkRedPoint();
    };
    ActivityType18Data.prototype.getStateByIndex = function (index) {
        var state = (this.recrod >> index) & 1;
        if (state == 0) {
            var config = GlobalConfig.ActivityType18Config[this.id][index];
            if (config && config.dbCount && config.dbCount <= this.num)
                state = 2;
        }
        return state;
    };
    ActivityType18Data.prototype.checkRedPoint = function () {
        var config = GlobalConfig.ActivityType18Config[this.id];
        for (var i in config) {
            if (config[i].dbCount && this.num >= config[i].dbCount && ((this.recrod >> config[i].index) & 1) == 0) {
                return true;
            }
        }
        return false;
    };
    return ActivityType18Data;
}(ActivityBaseData));
__reflect(ActivityType18Data.prototype, "ActivityType18Data");
//# sourceMappingURL=ActivityType18Data.js.map