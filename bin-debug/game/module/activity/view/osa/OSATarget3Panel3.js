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
var OSATarget3Panel3 = (function (_super) {
    __extends(OSATarget3Panel3, _super);
    function OSATarget3Panel3() {
        var _this = _super.call(this) || this;
        _this.skinName = "OSASeriesRechargeSkin";
        return _this;
    }
    OSATarget3Panel3.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.reward.itemRenderer = ItemBase;
    };
    OSATarget3Panel3.prototype.open = function () {
        this.addTouchEvent(this.getBtn, this.onTap);
        this.addTouchEvent(this.gift0, this.onTap);
        this.addTouchEvent(this.gift1, this.onTap);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        this.actType = ActivityPanel.getActivityTypeFromId(this.activityID);
        this.initData();
    };
    OSATarget3Panel3.prototype.initData = function () {
        var act;
        var configs;
        if (this.actType == ActivityType.Normal) {
            act = Activity.ins().getActivityDataById(this.activityID);
            configs = GlobalConfig.ActivityType3Config[this.activityID];
        }
        else if (this.actType == ActivityType.Personal) {
            act = PActivity.ins().getActivityDataById(this.activityID);
            configs = GlobalConfig.PActivity3Config[this.activityID];
        }
        var minIndex = -1;
        var indexStr = Object.keys(configs);
        for (var i in configs) {
            var config = configs[i];
            var index = +i;
            if ((act.dabiao[index - 1] || 0) < config.day) {
                if (minIndex == -1) {
                    minIndex = indexStr.length;
                }
            }
            else if (((act.recrod >> index) & 1) == 0 && (act.dabiao[index - 1] || 0) >= config.day) {
                minIndex = index;
            }
            this['gift' + (index - 1)].setData(this.activityID, index);
        }
        var keys = Object.keys(configs);
        var maxIndex = +(keys[keys.length - 1]);
        this.bar.maximum = configs[maxIndex].day;
        this.bar.value = act.dabiao[maxIndex - 1];
        if (minIndex == -1)
            minIndex = act.getCurIndex();
        this.setSelectIndex(minIndex);
        this.updateTime();
    };
    OSATarget3Panel3.prototype.setSelectIndex = function (index) {
        this._index = index;
        var config;
        var act;
        if (this.actType == ActivityType.Normal) {
            config = GlobalConfig.ActivityType3Config[this.activityID][index];
            act = Activity.ins().getActivityDataById(this.activityID);
        }
        else if (this.actType == ActivityType.Personal) {
            config = GlobalConfig.PActivity3Config[this.activityID][index];
            act = PActivity.ins().getActivityDataById(this.activityID);
        }
        this.reward.dataProvider = new eui.ArrayCollection(config.rewards);
        this.redPoint.visible = false;
        if ((act.dabiao[index - 1] || 0) >= config.day) {
            var state = (act.recrod >> index) & 1;
            if (state == 0) {
                this.getBtn.label = "\u9886\u53D6";
                this.getBtn.visible = true;
                this.getBtn.enabled = true;
                this.already.visible = false;
                this.redPoint.visible = true;
                this._state = 1;
            }
            else {
                this.getBtn.label = "\u5DF2\u9886\u53D6";
                this.getBtn.visible = false;
                this.already.visible = true;
                this._state = 2;
            }
        }
        else {
            this.getBtn.label = "\u672A\u5B8C\u6210";
            this.getBtn.visible = true;
            this.getBtn.enabled = false;
            this.already.visible = false;
            this._state = 0;
        }
        if (index == 1) {
            this.show0.visible = true;
            this.show1.visible = false;
            this.gift0.setSelected(true);
            this.gift1.setSelected(false);
        }
        else {
            this.show0.visible = false;
            this.show1.visible = true;
            this.gift0.setSelected(false);
            this.gift1.setSelected(true);
        }
    };
    OSATarget3Panel3.prototype.updateTime = function () {
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
    OSATarget3Panel3.prototype.setTime = function () {
        if (this._time > 0) {
            this._time -= 1;
            this.actTime.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 3);
        }
    };
    OSATarget3Panel3.prototype.onTap = function (e) {
        var tar = e.currentTarget;
        if (tar == this.getBtn) {
            if (this._state == 1) {
                if (this.actType == ActivityType.Normal) {
                    Activity.ins().sendReward(this.activityID, this._index);
                }
                else if (this.actType == ActivityType.Personal) {
                    PActivity.ins().sendReward(this.activityID, this._index);
                }
            }
        }
        else if (tar == this.gift0) {
            this.setSelectIndex(1);
        }
        else if (tar == this.gift1) {
            this.setSelectIndex(2);
        }
    };
    OSATarget3Panel3.prototype.close = function () {
        this.removeTouchEvent(this.getBtn, this.onTap);
        this.removeTouchEvent(this.gift0, this.onTap);
        this.removeTouchEvent(this.gift1, this.onTap);
        TimerManager.ins().removeAll(this);
    };
    OSATarget3Panel3.prototype.updateData = function () {
        this.initData();
    };
    return OSATarget3Panel3;
}(BaseView));
__reflect(OSATarget3Panel3.prototype, "OSATarget3Panel3");
//# sourceMappingURL=OSATarget3Panel3.js.map