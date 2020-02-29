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
var ActivityType7Data = (function (_super) {
    __extends(ActivityType7Data, _super);
    function ActivityType7Data(bytes) {
        var _this = _super.call(this, bytes) || this;
        _this.personalRewardsSum = [];
        _this.worldRewardsSum = [];
        _this.exchange = [];
        _this.initBuyData(bytes);
        return _this;
    }
    ActivityType7Data.prototype.update = function (bytes) {
        _super.prototype.update.call(this, bytes);
        var id = bytes.readShort();
        var count = bytes.readShort();
        this.personalRewardsSum[id] = count;
        this.worldRewardsSum[id] = bytes.readShort();
        this.exchange[id] = bytes.readShort();
    };
    ActivityType7Data.prototype.initBuyData = function (bytes) {
        var len = bytes.readShort();
        for (var i = 1; i <= len; i++) {
            this.personalRewardsSum[i] = bytes.readShort();
            this.worldRewardsSum[i] = bytes.readShort();
            this.exchange[i] = bytes.readShort();
        }
        this.bossScore = bytes.readInt();
    };
    ActivityType7Data.prototype.canReward = function () {
        return this.checkRedPoint();
    };
    ActivityType7Data.prototype.isOpenActivity = function () {
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        if (beganTime < 0 && endedTime > 0) {
            return true;
        }
        return false;
    };
    ActivityType7Data.prototype.checkRedPoint = function () {
        return Activity.ins().getType7RedPoint(this.id);
    };
    ActivityType7Data.prototype.getAwardState = function (index) {
        var config = GlobalConfig.ActivityType7Config[this.id][index];
        var record = this.personalRewardsSum[config.index] >= config.count;
        return record ? Activity.Geted : (this.bossScore >= config.score ? Activity.CanGet : Activity.NotReached);
    };
    ActivityType7Data.prototype.getExchange = function (index) {
        var actdata = Activity.ins().getActivityDataById(this.id);
        var config = GlobalConfig.ActivityType7Config[this.id][index];
        if (!config.items)
            return Activity.NotReached;
        var isget = Activity.CanGet;
        var worldRewards = actdata.worldRewardsSum[index];
        var exchange = actdata.exchange[index];
        var personalRewards = actdata.personalRewardsSum[index];
        for (var k in config.items) {
            var itemData = UserBag.ins().getBagItemById(config.items[k].id);
            var count = itemData ? itemData.count : 0;
            if (count < config.items[k].count) {
                isget = Activity.NotReached;
                break;
            }
        }
        if (isget != Activity.NotReached) {
            if (config.scount) {
                if (worldRewards >= config.scount) {
                    isget = Activity.Geted;
                }
            }
            if (config.count) {
                if (personalRewards >= config.count) {
                    isget = Activity.Geted;
                }
            }
            if (config.dailyCount) {
                if (exchange >= config.dailyCount) {
                    isget = Activity.Geted;
                }
            }
        }
        return isget;
    };
    ActivityType7Data.prototype.getLeftTime = function () {
        if (this.endTime) {
            var leftTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
            if (leftTime < 0) {
                leftTime = 0;
            }
            return leftTime;
        }
        return 0;
    };
    ActivityType7Data.TYPE_RING = 1;
    ActivityType7Data.TYPE_HEFUBOSS = 2;
    ActivityType7Data.TYPE_CELEBREATE = 5;
    ActivityType7Data.TYPE_LABA = 6;
    return ActivityType7Data;
}(ActivityBaseData));
__reflect(ActivityType7Data.prototype, "ActivityType7Data");
//# sourceMappingURL=ActivityType7Data.js.map