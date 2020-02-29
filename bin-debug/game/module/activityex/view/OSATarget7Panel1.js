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
var OSATarget7Panel1 = (function (_super) {
    __extends(OSATarget7Panel1, _super);
    function OSATarget7Panel1() {
        var _this = _super.call(this) || this;
        _this.skinName = "hefuHalftimeBoss";
        _this.bossMc = new MovieClip;
        _this.bossGroup.addChild(_this.bossMc);
        _this.bossMc.x = _this.bossGroup.x;
        _this.bossMc.y = _this.bossGroup.y;
        return _this;
    }
    OSATarget7Panel1.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.updateData();
    };
    OSATarget7Panel1.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.boss, this.onTap);
        this.addTouchEvent(this.costbtn, this.onTap);
        this.observe(Activity.ins().postRewardResult, this.GetCallBack);
        this.observe(Activity.ins().postChangePage, this.GetCallBack);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        this.updateData();
    };
    OSATarget7Panel1.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.boss, this.onTap);
        this.removeTouchEvent(this.costbtn, this.onTap);
        this.removeObserve();
        TimerManager.ins().removeAll(this);
    };
    OSATarget7Panel1.prototype.onClick = function (e) {
    };
    OSATarget7Panel1.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.boss:
                ViewManager.ins().open(BossWin, 1);
                break;
            case this.costbtn:
                if (this.activityData)
                    ViewManager.ins().open(BossScoreExchangeWin, this.activityID);
                break;
        }
    };
    OSATarget7Panel1.prototype.GetCallBack = function (activityID) {
        this.updateData();
    };
    OSATarget7Panel1.prototype.updateData = function () {
        var cfg = GlobalConfig.ActivityType7Config[this.activityID][1];
        if (cfg.showType == ActivityType7Data.TYPE_RING)
            this.currentState = 'lieyan';
        else if (cfg.showType == ActivityType7Data.TYPE_HEFUBOSS)
            this.currentState = 'hefu';
        else
            this.currentState = "celebreate";
        this.validateNow();
        var btncfg = GlobalConfig.ActivityBtnConfig[this.activityID];
        if (btncfg)
            this.title.source = btncfg.title;
        this.activityData = Activity.ins().getActivityDataById(this.activityID);
        this.setTime();
        this.actDesc.text = GlobalConfig.ActivityConfig[this.activityID].desc;
        var actdata = Activity.ins().getActivityDataById(this.activityID);
        this.cost.text = "\u79EF\u5206:" + actdata.bossScore;
        var modelStr = "monster" + 10129 + "_3s";
        if (cfg.exValue && cfg.exValue.bossModel)
            modelStr = cfg.exValue.bossModel;
        this.bossMc.playFile(RES_DIR_MONSTER + modelStr, -1);
        this.redPoint.visible = Activity.ins().getType7RedPoint(this.activityID);
    };
    OSATarget7Panel1.prototype.setTime = function () {
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this.activityData.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this.activityData.endTime) - GameServer.serverTime) / 1000);
        if (beganTime >= 0) {
            this.actTime.text = "活动未开启";
        }
        else if (endedTime <= 0) {
            this.actTime.text = "活动已结束";
        }
        else {
            this.actTime.text = DateUtils.getFormatBySecond(endedTime, DateUtils.TIME_FORMAT_5, 3);
        }
    };
    return OSATarget7Panel1;
}(BaseView));
__reflect(OSATarget7Panel1.prototype, "OSATarget7Panel1");
//# sourceMappingURL=OSATarget7Panel1.js.map