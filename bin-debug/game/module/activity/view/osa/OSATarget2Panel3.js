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
var OSATarget2Panel3 = (function (_super) {
    __extends(OSATarget2Panel3, _super);
    function OSATarget2Panel3() {
        var _this = _super.call(this) || this;
        _this._time = 0;
        _this._curPage = 1;
        _this._maxPage = 1;
        return _this;
    }
    OSATarget2Panel3.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.reward0.itemRenderer = ItemBase;
    };
    OSATarget2Panel3.prototype.setCurSkin = function () {
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
            this.skinName = "SFVipGiftSkin";
    };
    Object.defineProperty(OSATarget2Panel3.prototype, "activityID", {
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
    OSATarget2Panel3.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.setCurSkin();
        this.observe(Activity.ins().postRewardResult, this.GetCallBack);
        this.observe(PActivity.ins().postRewardResult, this.GetCallBack);
        this.addTouchEvent(this, this.onTouch);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        this.updateData();
    };
    OSATarget2Panel3.prototype.setTime = function () {
        if (this._time > 0) {
            this._time -= 1;
            this.actTime0.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 3);
        }
    };
    OSATarget2Panel3.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        TimerManager.ins().removeAll(this);
        this.removeObserve();
        this.removeTouchEvent(this, this.onTouch);
    };
    OSATarget2Panel3.prototype.GetCallBack = function (activityID) {
        this.updateData();
    };
    OSATarget2Panel3.prototype.onTap = function (e) {
        switch (e.currentTarget) {
        }
    };
    OSATarget2Panel3.prototype.updateData = function () {
        if (this.activityType == ActivityType.Normal) {
            this._activityData = Activity.ins().getActivityDataById(this.activityID);
            this._config = GlobalConfig.ActivityType2Config[this.activityID];
        }
        else if (this.activityType == ActivityType.Personal) {
            this._activityData = PActivity.ins().getActivityDataById(this.activityID);
            this._config = GlobalConfig.PActivity2Config[this.activityID];
        }
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(this._activityData.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(this._activityData.endTime) - GameServer.serverTime) / 1000);
        if (beganTime >= 0) {
            this.actTime0.text = "活动未开启";
        }
        else if (endedTime <= 0) {
            this.actTime0.text = "活动已结束";
        }
        else {
            this._time = endedTime;
            if (this._time < 0)
                this._time = 0;
            this.actTime0.text = DateUtils.getFormatBySecond(endedTime, DateUtils.TIME_FORMAT_5, 3);
        }
        this._maxPage = Object.keys(this._config).length;
        this._curPage = 1;
        var config;
        for (var i = 1; i <= this._maxPage; i++) {
            config = this._config[i];
            if (this._activityData.buyData[config.index] < config.count) {
                this._curPage = i;
                break;
            }
        }
        this.updatePage();
    };
    OSATarget2Panel3.prototype.updatePage = function () {
        this.turnBackBtn.visible = this._curPage > 1;
        this.turnNextBtn.visible = this._curPage < this._maxPage;
        var config = this._config[this._curPage];
        this.ggtxt0.source = "viptitle" + config.index + "_png";
        this.tu0.source = "vipshow" + config.index + "_png";
        this.vipLv0.text = config.vip + "";
        this.times0.text = "活动期间仅可购买" + config.count + "次";
        this.get0.label = config.price + "元宝";
        if (!this._collect) {
            this._collect = new ArrayCollection();
            this.reward0.dataProvider = this._collect;
        }
        this._collect.source = config.rewards;
        this.buyred.visible = false;
        this.already0.visible = false;
        this.get0.visible = true;
        if (this._activityData.buyData[config.index] >= config.count) {
            this.isGet = false;
            this.already0.visible = true;
            this.get0.visible = false;
        }
        else {
            this.isGet = UserVip.ins().lv >= config.vip && Actor.yb >= config.price;
            this.buyred.visible = this.isGet;
        }
        this.leftred.visible = this.rightred.visible = false;
        for (var i = 1; i < this._curPage; i++) {
            config = this._config[i];
            if (this._activityData.buyData[config.index] < config.count && UserVip.ins().lv >= config.vip && Actor.yb >= config.price) {
                this.leftred.visible = true;
                break;
            }
        }
        for (var i = this._curPage + 1; i <= this._maxPage; i++) {
            config = this._config[i];
            if (this._activityData.buyData[config.index] < config.count && UserVip.ins().lv >= config.vip && Actor.yb >= config.price) {
                this.rightred.visible = true;
                break;
            }
        }
    };
    OSATarget2Panel3.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.get0:
                var config = this._config[this._curPage];
                if (this.isGet) {
                    if (config instanceof ActivityType2Config)
                        Activity.ins().sendReward(config.Id, config.index);
                    else if (config instanceof PActivity2Config)
                        PActivity.ins().sendReward(config.Id, config.index);
                }
                else {
                    if (UserVip.ins().lv < config.vip)
                        UserTips.ins().showTips("|C:0xff0000&T:VIP\u7B49\u7EA7\u4E0D\u6EE1\u8DB3\u8981\u6C42|");
                    else
                        UserTips.ins().showTips("|C:0xf3311e&T:\u5143\u5B9D\u4E0D\u8DB3|");
                }
                break;
            case this.turnBackBtn:
                if (this._curPage > 1) {
                    this._curPage--;
                    this.updatePage();
                }
                break;
            case this.turnNextBtn:
                if (this._curPage < this._maxPage) {
                    this._curPage++;
                    this.updatePage();
                }
                break;
        }
    };
    return OSATarget2Panel3;
}(BaseView));
__reflect(OSATarget2Panel3.prototype, "OSATarget2Panel3");
//# sourceMappingURL=OSATarget2Panel3.js.map