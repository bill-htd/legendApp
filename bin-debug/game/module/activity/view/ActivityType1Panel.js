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
var ActivityType1Panel = (function (_super) {
    __extends(ActivityType1Panel, _super);
    function ActivityType1Panel() {
        var _this = _super.call(this) || this;
        _this.skinName = "ActLevelSkin";
        _this.list.itemRenderer = ActivityType1ItemRenderer;
        return _this;
    }
    ActivityType1Panel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.listData = new eui.ArrayCollection;
        this.list.dataProvider = this.listData;
    };
    ActivityType1Panel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.updateData();
    };
    ActivityType1Panel.prototype.updateData = function () {
        var activityData = Activity.ins().getActivityDataById(this.activityID);
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(activityData.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(activityData.endTime) - GameServer.serverTime) / 1000);
        if (beganTime >= 0) {
            this.date.text = "活动未开启";
        }
        else if (endedTime <= 0) {
            this.date.text = "活动已结束";
        }
        else {
            this.date.text = DateUtils.getFormatBySecond(endedTime, DateUtils.TIME_FORMAT_5, 3);
        }
        this.desc.text = GlobalConfig.ActivityConfig[this.activityID].desc;
        var listData = GlobalConfig.ActivityType1Config[activityData.id].slice();
        listData.sort(this.sortFunc);
        this.listData.replaceAll(listData);
    };
    ActivityType1Panel.prototype.sortFunc = function (aConfig, bConfig) {
        var activityData = Activity.ins().getActivityDataById(aConfig.Id);
        var aState = activityData.getRewardStateById(aConfig.index - 1);
        var bState = activityData.getRewardStateById(bConfig.index - 1);
        if (aState < bState)
            return -1;
        if (aState > bState)
            return 1;
        if (aConfig.zslevel < bConfig.zslevel)
            return -1;
        if (aConfig.zslevel > bConfig.zslevel)
            return 1;
        if (aConfig.level < bConfig.level)
            return -1;
        if (aConfig.level > bConfig.level)
            return 1;
        return 0;
    };
    return ActivityType1Panel;
}(ActivityPanel));
__reflect(ActivityType1Panel.prototype, "ActivityType1Panel");
//# sourceMappingURL=ActivityType1Panel.js.map