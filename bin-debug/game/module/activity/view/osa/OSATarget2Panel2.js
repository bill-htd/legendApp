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
var OSATarget2Panel2 = (function (_super) {
    __extends(OSATarget2Panel2, _super);
    function OSATarget2Panel2() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        _this.skinName = "OSAGift";
        return _this;
    }
    OSATarget2Panel2.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.activityType = ActivityPanel.getActivityTypeFromId(this.activityID);
        var idx = this.getRule();
        this.updateData(idx);
    };
    OSATarget2Panel2.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.buy, this.onTap);
        this.addTouchEvent(this.szlb, this.onTap);
        this.addTouchEvent(this.lhlb, this.onTap);
        this.addTouchEvent(this.yylb, this.onTap);
        this.addTouchEvent(this.sblb, this.onTap);
        this.observe(Activity.ins().postRewardResult, this.GetCallBack);
        this.observe(PActivity.ins().postRewardResult, this.GetCallBack);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        this.hideSelect();
        var idx = this.getRule();
        this.updateData(idx);
    };
    OSATarget2Panel2.prototype.hideSelect = function () {
        for (var i = 0; i < 4; i++) {
            this["select" + i].visible = false;
            this["arrow" + i].visible = false;
            this["select" + i].visible = false;
        }
    };
    OSATarget2Panel2.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.buy, this.onTap);
        this.removeTouchEvent(this.szlb, this.onTap);
        this.removeTouchEvent(this.lhlb, this.onTap);
        this.removeTouchEvent(this.yylb, this.onTap);
        this.removeTouchEvent(this.sblb, this.onTap);
        this.removeObserve();
        TimerManager.ins().removeAll(this);
    };
    OSATarget2Panel2.prototype.GetCallBack = function (activityID) {
        if (this.activityID != activityID)
            return;
        var ins;
        var activityData;
        if (this.activityType == ActivityType.Normal) {
            ins = Activity.ins();
            activityData = ins.getActivityDataById(this.activityID);
        }
        else if (this.activityType == ActivityType.Personal) {
            ins = PActivity.ins();
            activityData = ins.getActivityDataById(this.activityID);
        }
        if (!ins.isSuccee) {
            UserTips.ins().showTips("领取失败");
            ins.sendChangePage(activityData.id);
        }
        ins.isSuccee = false;
        this.hideSelect();
        var idx = this.getRule();
        this.updateData(idx);
    };
    OSATarget2Panel2.prototype.onTap = function (e) {
        var index;
        switch (e.currentTarget) {
            case this.buy:
                if (this.config.vip && UserVip.ins().lv < this.config.vip) {
                    UserTips.ins().showTips("vip等级不足");
                }
                else {
                    if (UserBag.ins().getSurplusCount() < 7) {
                        UserTips.ins().showTips("|C:0xf3311e&T:背包已满，请清理背包|");
                        return;
                    }
                    if (Actor.yb >= this.config.price) {
                        if (this.activityType == ActivityType.Normal) {
                            Activity.ins().sendReward(this.activityID, this._index);
                        }
                        else if (this.activityType == ActivityType.Personal) {
                            PActivity.ins().sendReward(this.activityID, this._index);
                        }
                    }
                    else {
                        UserTips.ins().showTips("|C:0xf3311e&T:元宝不足|");
                    }
                }
                index = -1;
                break;
            case this.lhlb:
                index = 1;
                break;
            case this.yylb:
                index = 2;
                break;
            case this.szlb:
                index = 3;
                break;
            case this.sblb:
                index = 4;
                break;
        }
        if (index != -1) {
            for (var i = 0; i < 4; i++) {
                if (index != (i + 1))
                    this["select" + i].visible = false;
                else
                    this["select" + i].visible = true;
                this["arrow" + i].visible = this["select" + i].visible;
            }
            this.updateData(index);
        }
    };
    OSATarget2Panel2.prototype.getRule = function () {
        var activityData;
        var tmplist;
        if (this.activityType == ActivityType.Normal) {
            activityData = Activity.ins().getActivityDataById(this.activityID);
            tmplist = GlobalConfig.ActivityType2Config[this.activityID];
        }
        else if (this.activityType == ActivityType.Personal) {
            activityData = PActivity.ins().getActivityDataById(this.activityID);
            tmplist = GlobalConfig.PActivity2Config[this.activityID];
        }
        var listData = [];
        for (var k in tmplist) {
            listData.push(tmplist[k]);
        }
        listData.sort(this.sortFunc);
        for (var i = 0; i < listData.length; i++) {
            var config = listData[i];
            var isBuy = activityData.buyData[config.index] >= config.count ? true : false;
            if (!isBuy)
                return config.index;
        }
        return 2;
    };
    OSATarget2Panel2.prototype.sortFunc = function (aConfig, bConfig) {
        if (aConfig.price < bConfig.price)
            return -1;
        if (aConfig.price > bConfig.price)
            return 1;
        return 0;
    };
    OSATarget2Panel2.prototype.updateData = function (index) {
        if (index === void 0) { index = 2; }
        this._index = index;
        this["select" + (index - 1)].visible = true;
        this["arrow" + (index - 1)].visible = true;
        var activityData;
        var btncfg;
        var con2fig;
        if (this.activityType == ActivityType.Normal) {
            activityData = Activity.ins().getActivityDataById(this.activityID);
            this.config = GlobalConfig.ActivityType2Config[this.activityID][index];
            btncfg = GlobalConfig.ActivityBtnConfig[this.activityID];
            con2fig = GlobalConfig.ActivityType2Config[this.activityID];
        }
        else if (this.activityType == ActivityType.Personal) {
            activityData = PActivity.ins().getActivityDataById(this.activityID);
            this.config = GlobalConfig.PActivity2Config[this.activityID][index];
            btncfg = GlobalConfig.PActivityBtnConfig[this.activityID];
            con2fig = GlobalConfig.PActivity2Config[this.activityID];
        }
        this.setTime();
        if (btncfg)
            this.title.source = btncfg.title;
        this.desc3.text = this.config.price + "";
        this.desc5.text = this.config.giftName;
        for (var i = 0; i < this.config.rewards.length; i++) {
            var rew = this.config.rewards[i];
            this["item" + i].data = { type: rew.type, count: rew.count, id: rew.id };
        }
        var isBuy = activityData.buyData[this._index] >= this.config.count ? true : false;
        this.buy.visible = !isBuy;
        this.already.visible = isBuy;
        this.actTime.visible = !this.already.visible;
        this.showbg.source = this.config.source[2] + "_png";
        this.redPoint.visible = this.buy.visible && Actor.yb >= this.config.price;
        if (Actor.level < ActivityType2Data.LimitLevel)
            this.redPoint.visible = false;
        for (var i in con2fig) {
            var cfg = con2fig[i];
            if (cfg && cfg.source[0]) {
                this["bg" + (+i - 1)].source = cfg.source[0];
            }
            if (cfg && cfg.source[1]) {
                this["name" + (+i - 1)].source = cfg.source[1];
            }
        }
    };
    OSATarget2Panel2.prototype.setTime = function () {
        var activityData;
        if (this.activityType == ActivityType.Normal) {
            activityData = Activity.ins().getActivityDataById(this.activityID);
        }
        else if (this.activityType == ActivityType.Personal) {
            activityData = PActivity.ins().getActivityDataById(this.activityID);
        }
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(activityData.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(activityData.endTime) - GameServer.serverTime) / 1000);
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
    OSATarget2Panel2.giftNameArr = ["", "材料礼包", "图鉴礼包", "羽翼礼包", "神兵礼包"];
    return OSATarget2Panel2;
}(BaseView));
__reflect(OSATarget2Panel2.prototype, "OSATarget2Panel2");
//# sourceMappingURL=OSATarget2Panel2.js.map