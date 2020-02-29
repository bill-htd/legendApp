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
var ActivityType5Panel = (function (_super) {
    __extends(ActivityType5Panel, _super);
    function ActivityType5Panel() {
        var _this = _super.call(this) || this;
        _this.rewardIndex = -1;
        _this.btnMax = 0;
        return _this;
    }
    ActivityType5Panel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.refushSkin();
    };
    ActivityType5Panel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.refushSkin();
        this.updateData();
        this.addTouchEvent(this.sureBtn1, this.onClick);
        this.observe(Activity.ins().postActivityIsGetAwards, this.updateData);
        for (var i = 1; i <= this.btnMax; i++) {
            this.addTouchEvent(this["btn" + i], this.onClick);
        }
    };
    ActivityType5Panel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        debug.log("close");
        this.removeTouchEvent(this.sureBtn1, this.onClick);
        for (var i = 1; i <= this.btnMax; i++) {
            this.removeTouchEvent(this["btn" + i], this.onClick);
        }
        this.removeObserve();
    };
    ActivityType5Panel.prototype.refushSkin = function () {
        if (this.activityBtnType == ActivityBtnType.ZHONG_QIU) {
            this.btnMax = 7;
            this.skinName = "ActMidLogSkin";
        }
        else if (this.activityBtnType == ActivityBtnType.SHENG_XIA) {
            this.btnMax = 5;
            this.skinName = "SunmerLogSkin";
        }
        else {
            this.btnMax = 10;
            this.skinName = "ActNatLogSkin";
        }
        this.list1.itemRenderer = ItemBase;
    };
    ActivityType5Panel.prototype.updateData = function () {
        var activityData = Activity.ins().getActivityDataById(this.activityID);
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(activityData.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(activityData.endTime) - GameServer.serverTime) / 1000);
        if (beganTime >= 0) {
            this.date.text = "活动未开启";
        }
        else if (endedTime <= 0) {
            this.date.text = "活动已结束";
        }
        else {
            this.date.text = DateUtils.getFormatBySecond(endedTime, DateUtils.TIME_FORMAT_5, 3);
        }
        this.desc.text = GlobalConfig.ActivityConfig[this.activityID].desc;
        this.refushBtnReward();
    };
    ActivityType5Panel.prototype.refushBtnReward = function (index) {
        if (index === void 0) { index = 0; }
        var activityData = Activity.ins().getActivityDataById(this.activityID);
        if (index == 0) {
            index = activityData.logTime;
            if (!activityData.logTime) {
                index = 1;
            }
        }
        this.rewardIndex = index;
        var config = GlobalConfig['ActivityType5Config'][this.activityID][(this.rewardIndex - 1) + ""];
        this.list1.dataProvider = new eui.ArrayCollection(config.rewards);
        if (this.selectBtn) {
            this.selectBtn.currentState = "up";
        }
        this.selectBtn = this["btn" + index];
        this.selectBtn.currentState = "down";
        if (index <= activityData.logTime) {
            if (activityData.checkOneDayStatu(index)) {
                this.sign.visible = false;
                this.sureBtn1.visible = true;
            }
            else {
                this.sign.visible = true;
                this.sureBtn1.visible = false;
            }
        }
        else {
            this.sign.visible = false;
            this.sureBtn1.visible = false;
        }
    };
    ActivityType5Panel.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.sureBtn1:
                Activity.ins().sendReward(this.activityID, this.rewardIndex);
                break;
            case this.btn1:
                this.refushBtnReward(1);
                break;
            case this.btn2:
                this.refushBtnReward(2);
                break;
            case this.btn3:
                this.refushBtnReward(3);
                break;
            case this.btn4:
                this.refushBtnReward(4);
                break;
            case this.btn5:
                this.refushBtnReward(5);
                break;
            case this.btn6:
                this.refushBtnReward(6);
                break;
            case this.btn7:
                this.refushBtnReward(7);
                break;
            case this.btn8:
                this.refushBtnReward(8);
                break;
            case this.btn9:
                this.refushBtnReward(9);
                break;
            case this.btn10:
                this.refushBtnReward(10);
                break;
        }
    };
    return ActivityType5Panel;
}(ActivityPanel));
__reflect(ActivityType5Panel.prototype, "ActivityType5Panel");
//# sourceMappingURL=ActivityType5Panel.js.map