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
var ActivityType6Data = (function (_super) {
    __extends(ActivityType6Data, _super);
    function ActivityType6Data(bytes) {
        var _this = _super.call(this, bytes) || this;
        _this.rewardsBossSum = [];
        _this.initBuyData(bytes);
        return _this;
    }
    ActivityType6Data.prototype.update = function (bytes) {
        _super.prototype.update.call(this, bytes);
        var id = bytes.readShort();
        this.record = bytes.readInt();
    };
    ActivityType6Data.prototype.initBuyData = function (bytes) {
        this.record = bytes.readInt();
        var len = bytes.readShort();
        for (var i = 1; i <= len; i++)
            this.rewardsBossSum[i] = bytes.readShort();
    };
    ActivityType6Data.prototype.canReward = function () {
        return this.checkRedPoint();
    };
    ActivityType6Data.prototype.getBossGroup = function (bossRecord, config) {
        var bossIndex = this.getBossGroupIndex(bossRecord, config);
        for (var i = 0; i < bossIndex.length; i++) {
            if (!bossIndex[i])
                return Activity.NOKILL;
        }
        return Activity.KILL;
    };
    ActivityType6Data.prototype.getBossGroupIndex = function (bossRecord, config) {
        var bossIndex = [];
        var tmpRecord = bossRecord << 1;
        for (var i = 1; i <= 3; i++) {
            var record = Math.floor(tmpRecord / Math.pow(2, i)) % 2;
            bossIndex.push(record);
        }
        return bossIndex;
    };
    ActivityType6Data.prototype.getBossGroupGiftIndex = function (config) {
        var record = Math.floor(this.record / Math.pow(2, (config.index))) % 2;
        return record ? Activity.Geted : Activity.CanGet;
    };
    ActivityType6Data.prototype.isOpenActivity = function () {
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        if (beganTime < 0 && endedTime > 0) {
            return true;
        }
        return false;
    };
    ActivityType6Data.prototype.checkRedPoint = function () {
        var config = GlobalConfig.ActivityType6Config[this.id];
        var i = 1;
        for (var k in config) {
            var record = this.getBossGroupGiftIndex(config[k]);
            var bossRecord = this.getBossGroup(this.rewardsBossSum[i], config[k]);
            if (bossRecord == Activity.KILL && record == Activity.CanGet) {
                return true;
            }
            i++;
        }
        return false;
    };
    ActivityType6Data.prototype.getHide = function () {
        if (this.isHide)
            return this.isHide;
        var rec = this.record >> 1;
        var tmplist = GlobalConfig.ActivityType6Config[this.id];
        var tlist = Object.keys(tmplist);
        if (rec >= Math.pow(2, tlist.length) - 1) {
            this.isHide = true;
            return this.isHide;
        }
        this.isHide = false;
        return this.isHide;
    };
    return ActivityType6Data;
}(ActivityBaseData));
__reflect(ActivityType6Data.prototype, "ActivityType6Data");
//# sourceMappingURL=ActivityType6Data.js.map