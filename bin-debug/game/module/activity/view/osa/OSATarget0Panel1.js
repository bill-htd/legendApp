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
var OSATarget0Panel1 = (function (_super) {
    __extends(OSATarget0Panel1, _super);
    function OSATarget0Panel1() {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this.skinName = "OSAComp";
        _this.effs = [];
        _this.rewards = [
            { type: 1, id: 900007, count: 1 },
            { type: 1, id: 900008, count: 1 },
            { type: 1, id: 900009, count: 1 },
            { type: 0, id: 2, count: 20000 }
        ];
        return _this;
    }
    OSATarget0Panel1.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.updateData();
    };
    OSATarget0Panel1.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.go, this.onTap);
        this.updateData();
    };
    OSATarget0Panel1.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.go, this.onTap);
        this.removeObserve();
        for (var i = 0; i < this.effs.length; i++) {
            if (this.effs[i])
                DisplayUtils.removeFromParent(this.effs[i]);
        }
        this.effs = [];
    };
    OSATarget0Panel1.prototype.onTap = function (e) {
        var index;
        switch (e.currentTarget) {
            case this.go:
                if (Guild.ins().guildID != 0) {
                    ViewManager.ins().close(ActivityWin);
                    GuildWar.ins().requestWinGuildInfo();
                    ViewManager.ins().close(GuildMap);
                    ViewManager.ins().open(GuildWarMainWin);
                }
                else {
                    UserTips.ins().showTips("还没加入行会");
                }
                break;
        }
    };
    OSATarget0Panel1.prototype.getTime = function (activityData) {
        var openTime = GlobalConfig.GuildBattleConst.openServer;
        var date = new Date(activityData.startTime - DateUtils.SECOND_PER_DAY * 1000);
        date.setDate(date.getDate() + openTime.day);
        date.setHours(openTime.hours, openTime.min || 0, 0, 0);
        var head = (date.getMonth() + 1) + "月" + date.getDate() + "日" + openTime.hours + ":" + openTime.min + "-";
        var end = openTime.hours + ":" + (openTime.min + GlobalConfig.GuildBattleConst.continueTime / 60);
        var week = date.getDay();
        var weeklist = ["(周日)", "(周一)", "(周二)", "(周三)", "(周四)", "(周五)", "(周六)"];
        return head + end + weeklist[Number(week)];
    };
    OSATarget0Panel1.prototype.updateData = function (index) {
        if (index === void 0) { index = 1; }
        var activityData = Activity.ins().getActivityDataById(this.activityID);
        var beganTime = Math.floor(activityData.startTime / 1000 - GameServer.serverTime / 1000);
        var endedTime = Math.floor(activityData.endTime / 1000 - GameServer.serverTime / 1000);
        if (beganTime >= 0) {
            this.actTime.text = "活动未开启";
            this.over.visible = false;
        }
        else if (endedTime <= 0) {
            this.actTime.text = "活动已结束";
            this.over.visible = true;
        }
        else {
            this.over.visible = false;
            this.actTime.text = this.getTime(activityData);
        }
        this.go.visible = !this.over.visible;
        for (var i = 1; i <= 4; i++) {
            this["reward" + i].data = this.rewards[i - 1];
        }
        for (var i = 1; i <= 3; i++) {
            var effname = "chuanqizbeff";
            if (!this.effs[i - 1] || !this.effs[i - 1].parent) {
                var mc = new MovieClip();
                mc.x = this["reward" + i].width / 2;
                mc.y = this["reward" + i].height / 2;
                mc.y -= 10;
                mc.playFile(RES_DIR_EFF + effname, -1);
                this["reward" + i].addChild(mc);
                this.effs.push(mc);
            }
        }
    };
    return OSATarget0Panel1;
}(BaseView));
__reflect(OSATarget0Panel1.prototype, "OSATarget0Panel1");
//# sourceMappingURL=OSATarget0Panel1.js.map