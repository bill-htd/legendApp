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
var PActivityType2Data = (function (_super) {
    __extends(PActivityType2Data, _super);
    function PActivityType2Data(bytes) {
        var _this = _super.call(this, bytes) || this;
        _this.buyData = [];
        _this.serverBuyData = [];
        _this.initBuyData(bytes);
        return _this;
    }
    PActivityType2Data.prototype.update = function (bytes) {
        _super.prototype.update.call(this, bytes);
        var id = bytes.readShort();
        var count = bytes.readInt();
        this.buyData[id] = count;
        this.serverBuyData[id] = bytes.readInt();
    };
    PActivityType2Data.prototype.initBuyData = function (bytes) {
        var count = bytes.readShort();
        for (var i = 1; i <= count; i++) {
            this.buyData[i] = bytes.readShort();
            this.serverBuyData[i] = bytes.readShort();
        }
        this.sumRMB = bytes.readInt();
    };
    PActivityType2Data.prototype.canReward = function () {
        if (Actor.level < PActivityType2Data.LimitLevel)
            return false;
        var activityData;
        activityData = PActivity.ins().getActivityDataById(this.id);
        var config = GlobalConfig.PActivity2Config[this.id];
        var serverBuy = false;
        for (var i in config) {
            var cfd = config[i];
            var isBuy = activityData.buyData[cfd.index] >= cfd.count ? true : false;
            if (!isBuy && activityData.sumRMB >= cfd.needRecharge && Actor.yb >= cfd.price && UserVip.ins().lv >= cfd.vip && !serverBuy) {
                return true;
            }
        }
        return false;
    };
    PActivityType2Data.prototype.isOpenActivity = function () {
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        if (beganTime < 0 && endedTime > 0) {
            return true;
        }
        return false;
    };
    PActivityType2Data.prototype.getHide = function () {
        if (this.isHide)
            return this.isHide;
        var config = GlobalConfig.PActivity2Config[this.id];
        for (var i = 1; i < this.buyData.length; i++) {
            var cfd = config[i];
            if (this.buyData[i] < cfd.count) {
                this.isHide = false;
                return this.isHide;
            }
        }
        this.isHide = true;
        return this.isHide;
    };
    PActivityType2Data.prototype.getLeftTime = function () {
        if (this.endTime) {
            var end_time = DateUtils.formatMiniDateTime(this.endTime) / 1000;
            var leftTime = Math.floor((end_time - GameServer.serverTime) / 1000);
            if (leftTime < 0) {
                leftTime = 0;
            }
            return leftTime;
        }
        return 0;
    };
    PActivityType2Data.prototype.getSpecialOpenLeftTime = function () {
    };
    PActivityType2Data.prototype.getAreaReward = function (index, zqindex) {
        return 0;
    };
    PActivityType2Data.LimitLevel = 50;
    return PActivityType2Data;
}(ActivityBaseData));
__reflect(PActivityType2Data.prototype, "PActivityType2Data");
//# sourceMappingURL=PActivityType2Data.js.map