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
var ActivityType22Data = (function (_super) {
    __extends(ActivityType22Data, _super);
    function ActivityType22Data(bytes) {
        var _this = _super.call(this, bytes) || this;
        _this._refreshTime = 0;
        _this.update(bytes);
        return _this;
    }
    ActivityType22Data.prototype.update = function (bytes) {
        this.tScore = bytes.readInt();
        this.refreshFree = bytes.readByte() == 1;
        this._refreshTime = bytes.readInt();
        this._oldTimer = egret.getTimer();
        var len = bytes.readShort();
        this.shopItems = [];
        this.shopItems.length = len;
        for (var i = 0; i < len; i++) {
            this.shopItems[i] = new SpringBeginShopVo();
            this.shopItems[i].parser(bytes);
        }
        len = bytes.readShort();
        this.scoreItems = [];
        this.scoreItems.length = len;
        for (var i = 0; i < len; i++) {
            this.scoreItems[i] = new SpringBeginShopVo();
            this.scoreItems[i].parser2(bytes);
        }
    };
    ActivityType22Data.prototype.canReward = function () {
        return this.checkRedPoint();
    };
    ActivityType22Data.prototype.isOpenActivity = function () {
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        if (beganTime < 0 && endedTime > 0) {
            return true;
        }
        return false;
    };
    ActivityType22Data.prototype.getleftTime = function () {
        if (!this.isOpenActivity()) {
            return 0;
        }
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.endTime) - GameServer.serverTime) / 1000);
        return endedTime;
    };
    ActivityType22Data.prototype.checkRedPoint = function () {
        if (this.refreshFree)
            return true;
        var config = Activity.ins().getConfig22_3(this.id);
        if (config && this.tScore >= config.score)
            return true;
        var itemData = UserBag.ins().getBagItemById(GlobalConfig.ActivityType22_1Config[this.id][1].freshItem);
        if (itemData && itemData.count > 0)
            return true;
        return false;
    };
    ActivityType22Data.prototype.getRemainTime = function () {
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
    ActivityType22Data.prototype.getRefreshTime = function () {
        return this._refreshTime - (egret.getTimer() - this._oldTimer) / 1000;
    };
    return ActivityType22Data;
}(ActivityBaseData));
__reflect(ActivityType22Data.prototype, "ActivityType22Data");
//# sourceMappingURL=ActivityType22Data.js.map