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
var OSATarget3Panel1 = (function (_super) {
    __extends(OSATarget3Panel1, _super);
    function OSATarget3Panel1() {
        var _this = _super.call(this) || this;
        _this._state = 0;
        _this._index = 1;
        _this._time = 0;
        _this.skinName = "OSASeriesRechargeSkin";
        return _this;
    }
    OSATarget3Panel1.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.reward.itemRenderer = ItemBase;
    };
    OSATarget3Panel1.prototype.open = function () {
        this.addTouchEvent(this.getBtn, this.onTap);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        this.initData();
    };
    OSATarget3Panel1.prototype.initData = function () {
        var act = Activity.ins().getActivityDataById(this.activityID);
        var index = act.getCurIndex();
        this._index = index;
        var config = GlobalConfig.ActivityType3Config[this.activityID][index];
        this.reward.dataProvider = new eui.ArrayCollection(config.rewards);
        this.redPoint.visible = false;
        this.state.visible = true;
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
                this.state.visible = false;
                this._state = 2;
            }
            this.state.textColor = 0x00ff00;
        }
        else {
            this.getBtn.label = "\u672A\u5B8C\u6210";
            this.getBtn.visible = true;
            this.getBtn.enabled = false;
            this.already.visible = false;
            this.state.textColor = 0xff9900;
            this._state = 0;
        }
        this.state.text = "\u5F53\u524D\u8FDB\u5EA6" + (act.dabiao[index - 1] || 0) + "/" + config.day;
        this.updateTime();
    };
    OSATarget3Panel1.prototype.updateTime = function () {
        var act = Activity.ins().getActivityDataById(this.activityID);
        var sec = act.getLeftTime();
        this._time = sec;
        this.actTime.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 3);
        var config = GlobalConfig.ActivityConfig[this.activityID];
        this.actDesc.text = config.desc;
    };
    OSATarget3Panel1.prototype.setTime = function () {
        if (this._time > 0) {
            this._time -= 1;
            this.actTime.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 3);
        }
    };
    OSATarget3Panel1.prototype.onTap = function () {
        if (this._state == 1) {
            Activity.ins().sendReward(this.activityID, this._index);
        }
    };
    OSATarget3Panel1.prototype.close = function () {
        this.removeTouchEvent(this.getBtn, this.onTap);
        TimerManager.ins().removeAll(this);
    };
    OSATarget3Panel1.prototype.updateData = function () {
        this.initData();
    };
    return OSATarget3Panel1;
}(BaseView));
__reflect(OSATarget3Panel1.prototype, "OSATarget3Panel1");
//# sourceMappingURL=OSATarget3Panel1.js.map