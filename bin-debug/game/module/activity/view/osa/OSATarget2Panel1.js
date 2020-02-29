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
var OSATarget2Panel1 = (function (_super) {
    __extends(OSATarget2Panel1, _super);
    function OSATarget2Panel1() {
        var _this = _super.call(this) || this;
        _this._time = 0;
        return _this;
    }
    OSATarget2Panel1.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.gift.itemRenderer = OSATargetItemRender1;
    };
    OSATarget2Panel1.prototype.setCurSkin = function () {
        var aCon;
        if (this.activityType == ActivityType.Normal) {
            aCon = GlobalConfig.ActivityConfig[this.activityID];
        }
        else if (this.activityType == ActivityType.Personal) {
            aCon = GlobalConfig.PActivityConfig[this.activityID];
        }
        if (aCon.pageSkin)
            this.skinName = aCon.pageSkin;
        else
            this.skinName = "OSADailyGiftSkin";
    };
    Object.defineProperty(OSATarget2Panel1.prototype, "activityID", {
        get: function () {
            return this._activityID;
        },
        set: function (value) {
            this._activityID = value;
            this.activityType = ActivityPanel.getActivityTypeFromId(this._activityID);
            this.setCurSkin();
        },
        enumerable: true,
        configurable: true
    });
    OSATarget2Panel1.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.setCurSkin();
        this.observe(Activity.ins().postRewardResult, this.GetCallBack);
        this.observe(PActivity.ins().postRewardResult, this.GetCallBack);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        if (!this.dataArr) {
            this.dataArr = new eui.ArrayCollection;
            this.gift.dataProvider = this.dataArr;
        }
        this.updateData();
    };
    OSATarget2Panel1.prototype.setTime = function () {
        if (this._time > 0) {
            this._time -= 1;
            this.actTime1.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 3);
        }
    };
    OSATarget2Panel1.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        TimerManager.ins().removeAll(this);
        this.removeObserve();
    };
    OSATarget2Panel1.prototype.GetCallBack = function (activityID) {
        this.updateData();
    };
    OSATarget2Panel1.prototype.onTap = function (e) {
        switch (e.currentTarget) {
        }
    };
    OSATarget2Panel1.prototype.updateData = function () {
        var activityData;
        var actcfg;
        var config;
        if (this.activityType == ActivityType.Normal) {
            activityData = Activity.ins().getActivityDataById(this.activityID);
            actcfg = GlobalConfig.ActivityConfig[this.activityID];
            config = GlobalConfig.ActivityType2Config[this.activityID];
        }
        else if (this.activityType == ActivityType.Personal) {
            activityData = PActivity.ins().getActivityDataById(this.activityID);
            actcfg = GlobalConfig.PActivityConfig[this.activityID];
            config = GlobalConfig.PActivity2Config[this.activityID];
        }
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(activityData.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(activityData.endTime) - GameServer.serverTime) / 1000);
        if (beganTime >= 0) {
            this.actTime1.text = "活动未开启";
        }
        else if (endedTime <= 0) {
            this.actTime1.text = "活动已结束";
        }
        else {
            this._time = endedTime;
            if (this._time < 0)
                this._time = 0;
            this.actTime1.text = DateUtils.getFormatBySecond(endedTime, DateUtils.TIME_FORMAT_5, 3);
        }
        this.actDesc.text = actcfg.desc;
        var arrconfig = [];
        for (var k in config) {
            arrconfig.push(config[k]);
        }
        this.dataArr.replaceAll(arrconfig);
    };
    return OSATarget2Panel1;
}(BaseView));
__reflect(OSATarget2Panel1.prototype, "OSATarget2Panel1");
//# sourceMappingURL=OSATarget2Panel1.js.map