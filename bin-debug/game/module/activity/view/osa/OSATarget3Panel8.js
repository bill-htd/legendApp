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
var Timer = egret.Timer;
var OSATarget3Panel8 = (function (_super) {
    __extends(OSATarget3Panel8, _super);
    function OSATarget3Panel8(id) {
        var _this = _super.call(this) || this;
        _this.activityID = id || 0;
        _this.initSkin();
        return _this;
    }
    OSATarget3Panel8.prototype.initSkin = function () {
        this.actType = ActivityPanel.getActivityTypeFromId(this.activityID);
        var config;
        if (this.actType == ActivityType.Normal) {
            config = GlobalConfig.ActivityConfig[this.activityID];
            this.skinName = config.pageSkin;
        }
        else if (this.actType == ActivityType.Personal) {
            config = GlobalConfig.PActivityConfig[this.activityID];
            this.skinName = config.pageSkin;
        }
    };
    OSATarget3Panel8.prototype.open = function () {
        this.initSkin();
        for (var i = 0; i < 6; i++) {
            this.addTouchEvent(this["reward" + i], this.onTap);
        }
        this.addTouchEvent(this.rechargeBtn, this.onTap);
        this.observe(Activity.ins().postActivityIsGetAwards, this.showAward);
        this.observe(PActivity.ins().postActivityIsGetAwards, this.showAward);
        this.initData();
        TimerManager.ins().doTimer(1000, 0, this.updateTime, this);
    };
    OSATarget3Panel8.prototype.initData = function () {
        var config;
        if (this.actType == ActivityType.Normal) {
            this.actInfo1.text = GlobalConfig.ActivityConfig[this.activityID].desc;
            config = GlobalConfig.ActivityType3Config[this.activityID];
        }
        else if (this.actType == ActivityType.Personal) {
            this.actInfo1.text = GlobalConfig.PActivityConfig[this.activityID].desc;
            config = GlobalConfig.PActivity3Config[this.activityID];
        }
        for (var i in config) {
            var conf = config[i];
            if (conf.type == 4) {
                this.singleReward.data = conf.rewards[0];
                break;
            }
        }
        this.updateTime();
        this.updateData();
    };
    OSATarget3Panel8.prototype.updateTime = function () {
        var act;
        if (this.actType == ActivityType.Normal) {
            act = Activity.ins().getActivityDataById(this.activityID);
        }
        else if (this.actType == ActivityType.Personal) {
            act = PActivity.ins().getActivityDataById(this.activityID);
        }
        var sec = act.getLeftTime();
        this.actTime1.text = DateUtils.getFormatBySecond(sec, DateUtils.TIME_FORMAT_5, 3);
    };
    OSATarget3Panel8.prototype.onTap = function (e) {
        if (e.currentTarget == this.rechargeBtn) {
            var rdata = Recharge.ins().getRechargeData(0);
            if (!rdata || rdata.num != 2) {
                ViewManager.ins().open(Recharge1Win);
            }
            else {
                ViewManager.ins().open(ChargeFirstWin);
            }
            return;
        }
        var tar = e.currentTarget;
        if (tar) {
            var data = void 0;
            var actData = void 0;
            if (this.actType == ActivityType.Normal) {
                data = tar.data;
                Activity.ins().sendReward(data.Id, data.index);
                actData = Activity.ins().getActivityDataById(data.Id);
            }
            else if (this.actType == ActivityType.Personal) {
                data = tar.data;
                PActivity.ins().sendReward(data.Id, data.index);
                actData = PActivity.ins().getActivityDataById(data.Id);
            }
            var state = actData.getRewardStateById(data.index);
            if (state == Activity.CanGet) {
                this._sendConf = data;
            }
        }
    };
    OSATarget3Panel8.prototype.showAward = function () {
        if (this._sendConf) {
            var actData = void 0;
            if (this.actType == ActivityType.Normal) {
                actData = Activity.ins().getActivityDataById(this._sendConf.Id);
            }
            else if (this.actType == ActivityType.Personal) {
                actData = PActivity.ins().getActivityDataById(this._sendConf.Id);
            }
            var state = actData.getRewardStateById(this._sendConf.index);
            if (state == Activity.Geted) {
                UserTips.ins().showItemTips(this._sendConf.rewards[0].id);
            }
        }
    };
    OSATarget3Panel8.prototype.close = function () {
        for (var i = 0; i < 6; i++) {
            this.removeTouchEvent(this["reward" + i], this.onTap);
        }
        this.removeTouchEvent(this.rechargeBtn, this.onTap);
        this.removeObserve();
        TimerManager.ins().remove(this.updateTime, this);
    };
    OSATarget3Panel8.prototype.updateData = function () {
        var act;
        var config;
        if (this.actType == ActivityType.Normal) {
            act = Activity.ins().getActivityDataById(this.activityID);
            config = GlobalConfig.ActivityType3Config[this.activityID];
        }
        else if (this.actType == ActivityType.Personal) {
            act = PActivity.ins().getActivityDataById(this.activityID);
            config = GlobalConfig.PActivity3Config[this.activityID];
        }
        for (var i = 0; i < 5; i++) {
            var curConf = config[i + 1];
            var nextConf = config[i + 2];
            var v = Math.floor((act.chongzhiTotal - curConf.val) / (nextConf.val - curConf.val) * 5);
            for (var j = 0; j < 5; j++) {
                var key = "sche" + i + "bell" + j;
                if (v > j) {
                    this[key].source = "bell2";
                }
                else {
                    this[key].source = "bell1";
                }
            }
        }
        for (var i = 0; i < 6; i++) {
            this["reward" + i].data = config[i + 1];
        }
        this.numLbl.text = "" + Math.floor(act.chongzhiTotal / 100);
    };
    return OSATarget3Panel8;
}(BaseView));
__reflect(OSATarget3Panel8.prototype, "OSATarget3Panel8");
//# sourceMappingURL=OSATarget3Panel8.js.map