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
var OSATarget3Panel5 = (function (_super) {
    __extends(OSATarget3Panel5, _super);
    function OSATarget3Panel5() {
        return _super.call(this) || this;
    }
    OSATarget3Panel5.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.reward0.itemRenderer = ItemBase;
        this.reward1.itemRenderer = ItemBase;
    };
    Object.defineProperty(OSATarget3Panel5.prototype, "activityID", {
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
    OSATarget3Panel5.prototype.setCurSkin = function () {
        var aCon = GlobalConfig.ActivityConfig[this.activityID];
        if (aCon.pageSkin)
            this.skinName = aCon.pageSkin;
        else
            this.skinName = "hefuSeriesRechargeSkin";
    };
    OSATarget3Panel5.prototype.open = function () {
        this.setCurSkin();
        this.addTouchEvent(this.getBtn0, this.onTap);
        this.addTouchEvent(this.getBtn1, this.onTap);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        this.actType = ActivityPanel.getActivityTypeFromId(this.activityID);
        this.initData();
    };
    OSATarget3Panel5.prototype.initData = function () {
        this.setIndex(0);
        this.setIndex(1);
        this.updateTime();
    };
    OSATarget3Panel5.prototype.setIndex = function (type) {
        var index, curValue;
        var act;
        var btncfg;
        if (this.actType == ActivityType.Normal) {
            act = Activity.ins().getActivityDataById(this.activityID);
            btncfg = GlobalConfig.ActivityBtnConfig[this.activityID];
        }
        else if (this.actType == ActivityType.Personal) {
            act = PActivity.ins().getActivityDataById(this.activityID);
            btncfg = GlobalConfig.PActivityBtnConfig[this.activityID];
        }
        if (btncfg)
            this.title.source = btncfg.title;
        if (type == 0) {
            index = act.getCurIndex(3);
            this._index = index;
            curValue = act.chongzhiNum;
        }
        else {
            index = act.getCurIndex(2);
            curValue = act.chongzhiTotal;
        }
        var config;
        if (this.actType == ActivityType.Normal) {
            config = GlobalConfig.ActivityType3Config[this.activityID][index];
        }
        else if (this.actType == ActivityType.Personal) {
            config = GlobalConfig.PActivity3Config[this.activityID][index];
        }
        this["reward" + type].dataProvider = new eui.ArrayCollection(config.rewards);
        this["redPoint" + type].visible = false;
        var already = this["already" + type];
        var getBtn = this["getBtn" + type];
        already.visible = false;
        if (curValue >= config.val) {
            var state = (act.recrod >> index) & 1;
            if (state == 0) {
                getBtn.label = "\u7ACB\u5373\u9886\u53D6";
                getBtn.visible = true;
                getBtn.enabled = true;
                this["redPoint" + type].visible = true;
            }
            else {
                getBtn.label = "\u5DF2\u9886\u53D6";
                getBtn.visible = false;
                already.visible = true;
            }
        }
        else {
            getBtn.label = "\u672A\u5B8C\u6210";
            getBtn.visible = true;
            getBtn.enabled = false;
        }
        if (type == 0) {
        }
        else {
            this["state"].text = "\u7D2F\u8BA1\u5145\u503C:" + curValue + "/" + config.val + "\u5143\u5B9D";
        }
        if (this.bar) {
            this.bar.maximum = config.val;
            this.bar.value = curValue;
        }
        if (this.activityID == 158) {
            this.addchong.source = "l_biaoti_leichong800";
        }
        else if (this.activityID == 212) {
            this.addchong.source = "l_biaoti_leichong800";
        }
    };
    OSATarget3Panel5.prototype.updateTime = function () {
        var act;
        var config;
        if (this.actType == ActivityType.Normal) {
            act = Activity.ins().getActivityDataById(this.activityID);
            config = GlobalConfig.ActivityConfig[this.activityID];
        }
        else if (this.actType == ActivityType.Personal) {
            act = PActivity.ins().getActivityDataById(this.activityID);
            config = GlobalConfig.PActivityConfig[this.activityID];
        }
        var sec = act.getLeftTime();
        this._time = sec;
        this.actTime.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 3);
        this.actDesc.text = config.desc;
    };
    OSATarget3Panel5.prototype.setTime = function () {
        if (this._time > 0) {
            this._time -= 1;
            this.actTime.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 3);
        }
    };
    OSATarget3Panel5.prototype.onTap = function (e) {
        var tar = e.currentTarget;
        if (tar == this.getBtn0) {
            if (this.actType == ActivityType.Normal) {
                Activity.ins().sendReward(this.activityID, this._index);
            }
            else if (this.actType == ActivityType.Personal) {
                PActivity.ins().sendReward(this.activityID, this._index);
            }
        }
        else if (tar == this.getBtn1) {
            var act = void 0;
            if (this.actType == ActivityType.Normal) {
                act = Activity.ins().getActivityDataById(this.activityID);
                Activity.ins().sendReward(this.activityID, act.getCurIndex(2));
            }
            else if (this.actType == ActivityType.Personal) {
                act = PActivity.ins().getActivityDataById(this.activityID);
                PActivity.ins().sendReward(this.activityID, act.getCurIndex(2));
            }
        }
    };
    OSATarget3Panel5.prototype.close = function () {
        this.removeTouchEvent(this.getBtn0, this.onTap);
        this.removeTouchEvent(this.getBtn1, this.onTap);
        TimerManager.ins().removeAll(this);
    };
    OSATarget3Panel5.prototype.updateData = function () {
        this.initData();
    };
    return OSATarget3Panel5;
}(BaseView));
__reflect(OSATarget3Panel5.prototype, "OSATarget3Panel5");
//# sourceMappingURL=OSATarget3Panel5.js.map