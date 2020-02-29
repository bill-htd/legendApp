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
var ActivityType3Panel = (function (_super) {
    __extends(ActivityType3Panel, _super);
    function ActivityType3Panel() {
        var _this = _super.call(this) || this;
        _this.initUI();
        return _this;
    }
    ActivityType3Panel.prototype.initUI = function () {
        this.skinName = "MoneyActSkin";
        this.list.itemRenderer = ItemBase;
        this.list1.itemRenderer = ItemBase;
    };
    ActivityType3Panel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.suerBtn, this.reward);
        this.addTouchEvent(this.suerBtn0, this.reward);
        Activity.ins().sendLianxuReward(this.activityID);
        this.updateData();
    };
    ActivityType3Panel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.suerBtn, this.reward);
        this.removeTouchEvent(this.suerBtn0, this.reward);
    };
    ActivityType3Panel.prototype.updateData = function () {
        this.sureImg.visible = false;
        this.sureImg0.visible = false;
        this.activityData = Activity.ins().getActivityDataById(this.activityID);
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this.activityData.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.activityData.endTime) - GameServer.serverTime) / 1000);
        if (beganTime >= 0) {
            this.date.text = "活动未开启";
        }
        else if (endedTime <= 0) {
            this.date.text = "活动已结束";
        }
        else {
            this.date.text = DateUtils.getFormatBySecond(endedTime, DateUtils.TIME_FORMAT_5, 3);
        }
        this.label.textFlow = new egret.HtmlTextParser().parser(this.activityData.day7text);
        this.label1.textFlow = new egret.HtmlTextParser().parser(this.activityData.totaltext);
        if (this.activityData.chongzhiTotal > this.activityData.maxTotal) {
            this.activityData.chongzhiTotal = this.activityData.maxTotal;
        }
        this.label2.text = "\u5DF2\u8FBE\u6210" + (this.activityData.dabiao ? this.activityData.dabiao[0] : 0) + "/" + this.activityData.openDay() + "\u5929";
        this.label3.text = "\u5DF2\u5145\u503C" + this.activityData.chongzhiTotal + "/" + this.activityData.maxTotal + "\u5143\u5B9D";
        this.list.dataProvider = new eui.ArrayCollection(this.activityData.rewards1);
        this.list1.dataProvider = new eui.ArrayCollection(this.activityData.rewards2);
        this.activityData.canOnlyReward();
        if (this.activityData.btn1) {
            this.mc1 = this.mc1 || new MovieClip;
            this.mc1.x = 50;
            this.mc1.y = 19;
            this.mc1.playFile(RES_DIR_EFF + 'normalbtn', -1);
            this.suerBtn.addChild(this.mc1);
        }
        else if (this.mc1) {
            DisplayUtils.removeFromParent(this.mc1);
        }
        if (this.activityData.btn2) {
            this.mc2 = this.mc2 || new MovieClip;
            this.mc2.x = 50;
            this.mc2.y = 19;
            this.mc2.playFile(RES_DIR_EFF + 'normalbtn', -1);
            this.suerBtn0.addChild(this.mc2);
        }
        else if (this.mc2) {
            DisplayUtils.removeFromParent(this.mc2);
        }
        this.sureImg0.visible = this.activityData.image1;
        this.sureImg.visible = this.activityData.image2;
        this.suerBtn.visible = !this.activityData.image1;
        this.suerBtn0.visible = !this.activityData.image2;
    };
    ActivityType3Panel.prototype.reward = function (e) {
        switch (e.currentTarget) {
            case this.suerBtn:
                if (this.activityData.btn1) {
                    if (UserBag.ins().getSurplusCount() >= 1) {
                        Activity.ins().sendReward(this.activityData.id, 1);
                    }
                    else {
                        UserTips.ins().showTips("|C:0xf3311e&T:背包已满，请清理背包|");
                    }
                }
                else
                    UserTips.ins().showTips("|C:0xf3311e&T:未达到活动天数！|");
                break;
            case this.suerBtn0:
                if (this.activityData.btn2) {
                    if (UserBag.ins().getSurplusCount() >= 1) {
                        Activity.ins().sendReward(this.activityData.id, 2);
                    }
                    else {
                        UserTips.ins().showTips("|C:0xf3311e&T:背包已满，请清理背包|");
                    }
                }
                else
                    UserTips.ins().showTips("|C:0xf3311e&T:元宝不足|");
                break;
        }
    };
    return ActivityType3Panel;
}(ActivityPanel));
__reflect(ActivityType3Panel.prototype, "ActivityType3Panel");
//# sourceMappingURL=ActivityType3Panel.js.map