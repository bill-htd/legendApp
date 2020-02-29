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
var OSATarget3Panel4 = (function (_super) {
    __extends(OSATarget3Panel4, _super);
    function OSATarget3Panel4() {
        var _this = _super.call(this) || this;
        _this.skinName = "SecondRechargeSkin";
        return _this;
    }
    OSATarget3Panel4.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.reward0.itemRenderer = ItemBase;
        this.reward1.itemRenderer = ItemBase;
    };
    OSATarget3Panel4.prototype.open = function () {
        this.addTouchEvent(this.get0, this.onTap);
        this.addTouchEvent(this.get1, this.onTap);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        this.actType = ActivityPanel.getActivityTypeFromId(this.activityID);
        this.initData();
    };
    OSATarget3Panel4.prototype.initData = function () {
        this.setIndex(0);
        this.setIndex(1);
        this.updateTime();
    };
    OSATarget3Panel4.prototype.setIndex = function (type) {
        var index, curValue;
        var act;
        var config;
        if (this.actType == ActivityType.Normal) {
            act = Activity.ins().getActivityDataById(this.activityID);
        }
        else if (this.actType == ActivityType.Personal) {
            act = PActivity.ins().getActivityDataById(this.activityID);
        }
        if (type == 0) {
            index = act.getCurIndex(3);
            this._index = index;
            curValue = act.chongzhiNum;
        }
        else {
            index = act.getCurIndex(2);
            curValue = act.chongzhiTotal;
        }
        if (this.actType == ActivityType.Normal) {
            config = GlobalConfig.ActivityType3Config[this.activityID][index];
        }
        else if (this.actType == ActivityType.Personal) {
            config = GlobalConfig.ActivityType3Config[this.activityID][index];
        }
        this["reward" + type].dataProvider = new eui.ArrayCollection(config.rewards);
        this["redPoint" + type].visible = false;
        var already = this["already" + type];
        var getBtn = this["get" + type];
        var record = this["record" + type];
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
            record.textColor = 0x00ff00;
        }
        else {
            getBtn.label = "\u672A\u5B8C\u6210";
            getBtn.visible = true;
            getBtn.enabled = false;
            record.textColor = 0xff9900;
        }
        record.text = "\u5DF2\u5145\u503C" + curValue + "/" + config.val + "\u5143\u5B9D";
        if (type == 0) {
            this.target0.text = "\u4ECA\u65E5\u7D2F\u8BA1\u5145\u503C" + config.val + "\u5143\u5B9D\u53EF\u9886\u53D6";
        }
        else {
            this.target1.text = "7\u65E5\u7D2F\u8BA1\u5145\u503C" + config.val + "\u5143\u5B9D\u53EF\u9886\u53D6";
        }
    };
    OSATarget3Panel4.prototype.updateTime = function () {
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
    OSATarget3Panel4.prototype.setTime = function () {
        if (this._time > 0) {
            this._time -= 1;
            this.actTime.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 3);
        }
    };
    OSATarget3Panel4.prototype.onTap = function (e) {
        var tar = e.currentTarget;
        if (tar == this.get0) {
            if (this.actType == ActivityType.Normal) {
                Activity.ins().sendReward(this.activityID, this._index);
            }
            else if (this.actType == ActivityType.Personal) {
                PActivity.ins().sendReward(this.activityID, this._index);
            }
        }
        else if (tar == this.get1) {
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
    OSATarget3Panel4.prototype.close = function () {
        this.removeTouchEvent(this.get0, this.onTap);
        this.removeTouchEvent(this.get1, this.onTap);
        TimerManager.ins().removeAll(this);
    };
    OSATarget3Panel4.prototype.updateData = function () {
        this.initData();
    };
    return OSATarget3Panel4;
}(BaseView));
__reflect(OSATarget3Panel4.prototype, "OSATarget3Panel4");
//# sourceMappingURL=OSATarget3Panel4.js.map