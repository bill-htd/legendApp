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
var DailyRechargePanel = (function (_super) {
    __extends(DailyRechargePanel, _super);
    function DailyRechargePanel() {
        var _this = _super.call(this) || this;
        _this._time = 0;
        _this.skinName = "DailyRechargeSkin";
        return _this;
    }
    DailyRechargePanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.content.itemRenderer = DailyRechargeItemRender;
    };
    DailyRechargePanel.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.observe(Activity.ins().postActivityIsGetAwards, this.updateData);
        this.observe(PActivity.ins().postActivityIsGetAwards, this.updateData);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        this.actType = ActivityPanel.getActivityTypeFromId(this.activityID);
        this.updateData();
    };
    DailyRechargePanel.prototype.close = function () {
        this.removeObserve();
        TimerManager.ins().removeAll(this);
    };
    DailyRechargePanel.prototype.updateData = function () {
        var data;
        var configs;
        if (this.actType == ActivityType.Normal) {
            data = Activity.ins().getActivityDataById(this.activityID);
            configs = GlobalConfig.ActivityType3Config[this.activityID];
        }
        else if (this.actType == ActivityType.Personal) {
            data = PActivity.ins().getActivityDataById(this.activityID);
            configs = GlobalConfig.PActivity3Config[this.activityID];
        }
        var config;
        var datas = [];
        var i = 0;
        var state = 0;
        for (var k in configs) {
            config = configs[k];
            state = ((data.recrod >> config.index) & 1) ? 2 : (data.chongzhiTotal >= config.val ? 1 : 0);
            datas[i] = [config, state, data.chongzhiTotal, this.activityID, config.index];
            i++;
        }
        this.content.dataProvider = new eui.ArrayCollection(datas);
        this._time = data.getLeftTime();
        this.actTime0.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 4);
    };
    DailyRechargePanel.prototype.setTime = function () {
        if (this._time > 0) {
            this._time -= 1;
            this.actTime0.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 4);
        }
    };
    return DailyRechargePanel;
}(BaseView));
__reflect(DailyRechargePanel.prototype, "DailyRechargePanel");
//# sourceMappingURL=DailyRechargePanel.js.map