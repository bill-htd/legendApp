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
var OSATarget12Panel1 = (function (_super) {
    __extends(OSATarget12Panel1, _super);
    function OSATarget12Panel1() {
        var _this = _super.call(this) || this;
        _this._time = 0;
        return _this;
    }
    OSATarget12Panel1.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    OSATarget12Panel1.prototype.setCurSkin = function () {
        var aCon = GlobalConfig.ActivityConfig[this.activityID];
        if (aCon.pageSkin)
            this.skinName = aCon.pageSkin;
        else
            this.skinName = "XNHongBaoSkin";
    };
    Object.defineProperty(OSATarget12Panel1.prototype, "activityID", {
        get: function () {
            return this._activityID;
        },
        set: function (value) {
            this._activityID = value;
            this.setCurSkin();
        },
        enumerable: true,
        configurable: true
    });
    OSATarget12Panel1.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        TimerManager.ins().removeAll(this);
        this.removeObserve();
    };
    OSATarget12Panel1.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(Activity.ins().postChangePage, this.updateLogs);
        this.addTouchEvent(this.onbtn, this.onTap);
        this.addTouchEvent(this.leftBtn, this.onTap);
        this.addTouchEvent(this.rightBtn, this.onTap);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        if (!this.dataArr) {
            this.list.itemRenderer = XiaoNianListRenderer;
            this.dataArr = new eui.ArrayCollection;
            this.list.dataProvider = this.dataArr;
        }
        this.index = this.getRuleIndex();
        this.updateData();
        this.updateLogs();
    };
    OSATarget12Panel1.prototype.getRuleIndex = function () {
        var index = 1;
        var activityData = Activity.ins().getActivityDataById(this.activityID);
        for (var k in GlobalConfig.ActivityType12Config[this.activityID]) {
            if (activityData.score >= GlobalConfig.ActivityType12Config[this.activityID][k].score) {
                index = GlobalConfig.ActivityType12Config[this.activityID][k].index;
            }
        }
        return index;
    };
    OSATarget12Panel1.prototype.GetCallBack = function (activityID) {
        if (activityID != this.activityID)
            return;
        this.updateData();
    };
    OSATarget12Panel1.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.onbtn:
                var activityData = Activity.ins().getActivityDataById(this.activityID);
                if (!activityData.isOpenActivity()) {
                    UserTips.ins().showTips("\u6D3B\u52A8\u5DF2\u7ED3\u675F");
                    return;
                }
                var config = GlobalConfig.ActivityType12Config[this.activityID];
                if (config && config[this.index]) {
                    if (activityData.score >= config[this.index].score)
                        ViewManager.ins().open(HongBaoSpeak, this.activityID, this.index);
                    else
                        UserTips.ins().showTips("\u79EF\u5206\u4E0D\u8DB3");
                }
                break;
            case this.leftBtn:
                if (this.index <= 1)
                    return;
                this.index--;
                this.updateBtn();
                break;
            case this.rightBtn:
                if (this.index >= CommonUtils.getObjectLength(GlobalConfig.ActivityType12Config[this.activityID]))
                    return;
                this.index++;
                this.updateBtn();
                break;
        }
    };
    OSATarget12Panel1.prototype.updateBtn = function () {
        if (this.index == 1) {
            this.leftBtn.visible = false;
            this.rightBtn.visible = true;
        }
        else if (this.index == CommonUtils.getObjectLength(GlobalConfig.ActivityType12Config[this.activityID])) {
            this.leftBtn.visible = true;
            this.rightBtn.visible = false;
        }
        else {
            this.leftBtn.visible = this.rightBtn.visible = true;
        }
        var config = GlobalConfig.ActivityType12Config[this.activityID][this.index];
        this.hongbao.data = config.skinType;
        var activityData = Activity.ins().getActivityDataById(this.activityID);
        this.redPoint.visible = activityData.score >= config.score;
    };
    OSATarget12Panel1.prototype.updateLogs = function () {
        var arr = [];
        var activityData = Activity.ins().getActivityDataById(this.activityID);
        this.actPoint.text = activityData.score + "";
        for (var i = activityData.logs.length - 1; i >= 0; i--) {
            var config = GlobalConfig.ActivityType12Config[this.activityID][activityData.logs[i].index];
            var serverName = window['getServerName'](activityData.logs[i].serverId);
            var roleName = "[" + serverName + "]." + activityData.logs[i].name;
            var str = StringUtils.replace(config.record, roleName);
            arr.push(str);
        }
        this.dataArr.replaceAll(arr);
    };
    OSATarget12Panel1.prototype.updateData = function () {
        var activityData = Activity.ins().getActivityDataById(this.activityID);
        var actcfg = GlobalConfig.ActivityConfig[this.activityID];
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(activityData.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(activityData.endTime) - GameServer.serverTime) / 1000);
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
        this.actInfo.text = actcfg.desc;
        this.updateBtn();
    };
    OSATarget12Panel1.prototype.setTime = function () {
        if (this._time > 0) {
            this._time -= 1;
            this.actTime.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 3);
        }
    };
    return OSATarget12Panel1;
}(BaseView));
__reflect(OSATarget12Panel1.prototype, "OSATarget12Panel1");
//# sourceMappingURL=OSATarget12Panel1.js.map