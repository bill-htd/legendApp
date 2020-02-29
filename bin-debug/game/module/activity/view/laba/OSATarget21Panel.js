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
var OSATarget21Panel = (function (_super) {
    __extends(OSATarget21Panel, _super);
    function OSATarget21Panel() {
        return _super.call(this) || this;
    }
    OSATarget21Panel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
        TimerManager.ins().removeAll(this);
        TimerManager.ins().remove(this.setTime, this);
    };
    OSATarget21Panel.prototype.setCurSkin = function () {
        var aCon = GlobalConfig.ActivityConfig[this.activityID];
        if (aCon.pageSkin)
            this.skinName = aCon.pageSkin;
        else
            this.skinName = "LaBaActivityTimeDrop";
    };
    OSATarget21Panel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.setCurSkin();
        this.rewardList.itemRenderer = ItemBase;
        this.updateData();
        this.updateUI();
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
    };
    OSATarget21Panel.prototype.updateData = function () {
        var config = GlobalConfig.ActivityBtnConfig[this.activityID];
        if (config.showReward)
            this.rewardList.dataProvider = new eui.ArrayCollection(config.showReward);
    };
    OSATarget21Panel.prototype.updateUI = function () {
        var activityData = Activity.ins().getActivityDataById(this.activityID);
        var beganTime = Math.floor(DateUtils.formatMiniDateTime(activityData.startTime) / DateUtils.MS_PER_SECOND - GameServer.serverTime / DateUtils.MS_PER_SECOND);
        var endedTime = Math.floor(DateUtils.formatMiniDateTime(activityData.endTime) / DateUtils.MS_PER_SECOND - GameServer.serverTime / DateUtils.MS_PER_SECOND);
        if (beganTime >= 0) {
            this.actTime.text = "活动未开启";
        }
        else if (endedTime <= 0) {
            this.actTime.text = "活动已结束";
        }
        else {
            this._time = endedTime;
            if (this._time < 0)
                this._time = 0;
            this.actTime.text = DateUtils.getFormatBySecond(endedTime, DateUtils.TIME_FORMAT_5, 3);
        }
        var config = GlobalConfig.ActivityConfig[this.activityID];
        this.actDesc.text = config.desc;
        var btnconfig = GlobalConfig.ActivityBtnConfig[this.activityID];
        if (btnconfig) {
            this.title.source = btnconfig.title;
        }
    };
    OSATarget21Panel.prototype.setTime = function () {
        if (this._time > 0) {
            this._time -= 1;
            this.actTime.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 3);
        }
    };
    return OSATarget21Panel;
}(ActivityPanel));
__reflect(OSATarget21Panel.prototype, "OSATarget21Panel");
//# sourceMappingURL=OSATarget21Panel.js.map