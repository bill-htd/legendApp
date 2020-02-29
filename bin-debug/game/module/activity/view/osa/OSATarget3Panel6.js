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
var OSATarget3Panel6 = (function (_super) {
    __extends(OSATarget3Panel6, _super);
    function OSATarget3Panel6() {
        var _this = _super.call(this) || this;
        _this.skinName = "hefuCostSkin";
        return _this;
    }
    OSATarget3Panel6.prototype.close = function () {
        TimerManager.ins().removeAll(this);
    };
    OSATarget3Panel6.prototype.open = function () {
        this.listData = new eui.ArrayCollection;
        this.content.itemRenderer = OSATarget3ItemRender6;
        this.content.dataProvider = this.listData;
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        this.actType = ActivityPanel.getActivityTypeFromId(this.activityID);
        this.updateData();
    };
    OSATarget3Panel6.prototype.updateTime = function () {
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
    OSATarget3Panel6.prototype.setTime = function () {
        if (this._time > 0) {
            this._time -= 1;
            this.actTime.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 3);
        }
    };
    OSATarget3Panel6.prototype.updateData = function () {
        this.updateTime();
        this.updateList();
    };
    OSATarget3Panel6.prototype.updateList = function () {
        var activityData;
        var tmplist;
        var aBtn;
        if (this.actType == ActivityType.Normal) {
            activityData = Activity.ins().getActivityDataById(this.activityID);
            tmplist = GlobalConfig.ActivityType3Config[this.activityID];
            aBtn = Activity.ins().getbtnInfo(this.activityID.toString());
        }
        else if (this.actType == ActivityType.Personal) {
            activityData = PActivity.ins().getActivityDataById(this.activityID);
            tmplist = GlobalConfig.PActivity3Config[this.activityID];
            aBtn = PActivity.ins().getbtnInfo(this.activityID.toString());
        }
        var listData = [];
        for (var k in tmplist) {
            listData.push(tmplist[k]);
        }
        listData = listData.slice();
        var listDataSort = [];
        var listDataSortTotal = [];
        for (var i = 0; i < listData.length; i++) {
            var state = activityData.getRewardStateById(listData[i].index);
            if (state == Activity.Geted) {
                listDataSortTotal.push(listData[i]);
            }
            else {
                listDataSort.push(listData[i]);
            }
        }
        listDataSort.sort(this.sortFunc);
        listDataSortTotal.sort(this.sortFunc);
        listData = listDataSort.concat(listDataSortTotal);
        this.listData.replaceAll(listData);
        this.title.source = aBtn.title;
    };
    OSATarget3Panel6.prototype.sortFunc = function (aConfig, bConfig) {
        if (aConfig.val < bConfig.val)
            return -1;
        else
            return 1;
    };
    return OSATarget3Panel6;
}(BaseView));
__reflect(OSATarget3Panel6.prototype, "OSATarget3Panel6");
//# sourceMappingURL=OSATarget3Panel6.js.map