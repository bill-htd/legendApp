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
var OSATarget20Panel = (function (_super) {
    __extends(OSATarget20Panel, _super);
    function OSATarget20Panel() {
        var _this = _super.call(this) || this;
        _this.skinName = "LaBaBossSkin";
        return _this;
    }
    OSATarget20Panel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    OSATarget20Panel.prototype.close = function () {
        this.removeTouchEvent(this.goBtn, this.onTap);
        TimerManager.ins().remove(this.setTime, this);
    };
    OSATarget20Panel.prototype.open = function () {
        this.addTouchEvent(this.goBtn, this.onTap);
        this.initData();
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
    };
    OSATarget20Panel.prototype.initData = function () {
        this.rewardList.itemRenderer = ItemBase;
        this.updateData();
    };
    OSATarget20Panel.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.goBtn:
                var activityData = Activity.ins().getActivityDataById(this.activityID);
                if (activityData.IsEnd()) {
                    UserTips.ins().showTips("\u5DF2\u7ECF\u5168\u90E8\u6D88\u706D\uFF0C\u8BF7\u671F\u5F85\u4E0B\u6B21\uFF01");
                    return;
                }
                if (activityData.go2BossFb()) {
                    Activity.ins().sendReward(this.activityID, activityData.index);
                }
                else {
                    UserTips.ins().showTips("\u672A\u5230\u5237\u65B0\u65F6\u95F4");
                }
                break;
        }
    };
    OSATarget20Panel.prototype.updateData = function () {
        var activityData = Activity.ins().getActivityDataById(this.activityID);
        var beganTime = Math.floor(DateUtils.formatMiniDateTime(activityData.startTime) / DateUtils.MS_PER_SECOND - GameServer.serverTime / DateUtils.MS_PER_SECOND);
        var endedTime = Math.floor(DateUtils.formatMiniDateTime(activityData.endTime) / DateUtils.MS_PER_SECOND - GameServer.serverTime / DateUtils.MS_PER_SECOND);
        if (beganTime >= 0) {
            this.actTime.text = "活动未开启";
            this.readyTime = 0;
        }
        else if (endedTime <= 0) {
            this.actTime.text = "活动已结束";
            this.readyTime = 0;
        }
        else {
            this._time = endedTime;
            if (this._time < 0)
                this._time = 0;
            this.readyTime = activityData.getStartTimer();
            this.actTime.text = DateUtils.getFormatBySecond(endedTime, DateUtils.TIME_FORMAT_5, 3);
        }
        var config = GlobalConfig.ActivityConfig[this.activityID];
        this.actDesc.textFlow = TextFlowMaker.generateTextFlow1(config.desc);
        this.redPoint.visible = activityData.checkRedPoint();
        var cfg = GlobalConfig.ActivityType20Config[this.activityID][activityData.index];
        if (cfg) {
            this.rewardList.dataProvider = new eui.ArrayCollection(cfg.showReward);
        }
        this.playModel();
        this.setDate();
    };
    OSATarget20Panel.prototype.setDate = function () {
        var activityData = Activity.ins().getActivityDataById(this.activityID);
        if (activityData.IsEnd()) {
            this.time.text = "\u4ECA\u5929\u5DF2\u5168\u90E8\u6D88\u706D\uFF0C\u8BF7\u671F\u5F85\u4E0B\u6B21\uFF01";
            return;
        }
        var curTimer = Math.floor(GameServer.serverTime / DateUtils.MS_PER_SECOND);
        var et = activityData.getEndTimer();
        if (curTimer >= et) {
            this.time.text = "\u5DF2\u7ED3\u675F";
            return;
        }
        var st = activityData.getStartTimer();
        if (curTimer >= st && curTimer < et) {
            this.time.text = "BOSS\u5DF2\u51FA\u73B0\uFF0C\u8BF7\u524D\u5F80\u51FB\u6740\uFF01";
            return;
        }
        var config = GlobalConfig.ActivityType20Config[this.activityID][activityData.index];
        var mconfig = GlobalConfig.MonstersConfig[config.monsterId.id];
        var secondTime = DateUtils.getFormatBySecond(st, DateUtils.TIME_FORMAT_6);
        this.time.text = mconfig.name + "\u5C06\u5728" + secondTime + "\u540E\u51FA\u73B0";
    };
    OSATarget20Panel.prototype.setTime = function () {
        if (this._time > 0) {
            this._time -= 1;
            this.actTime.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 3);
        }
    };
    OSATarget20Panel.prototype.playModel = function () {
        if (!this.bossModel)
            this.bossModel = new MovieClip;
        if (!this.bossModel.parent)
            this.Boss.addChild(this.bossModel);
        var activityData = Activity.ins().getActivityDataById(this.activityID);
        var config = GlobalConfig.ActivityType20Config[this.activityID][activityData.index];
        if (config) {
            this.bossModel.playFile(RES_DIR_MONSTER + config.monsterId.monster, -1);
            this.bossModel.scaleX = this.bossModel.scaleY = config.monsterId.scale / 100;
        }
    };
    return OSATarget20Panel;
}(ActivityPanel));
__reflect(OSATarget20Panel.prototype, "OSATarget20Panel");
//# sourceMappingURL=OSATarget20Panel.js.map