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
var OSATarget3Panel7 = (function (_super) {
    __extends(OSATarget3Panel7, _super);
    function OSATarget3Panel7() {
        var _this = _super.call(this) || this;
        _this.skinName = "hefuSeriesRechargeSkin2";
        return _this;
    }
    OSATarget3Panel7.prototype.open = function () {
        this.observe(Activity.ins().postRewardResult, this.GetCallBack);
        this.observe(PActivity.ins().postRewardResult, this.GetCallBack);
        this.listData = new eui.ArrayCollection;
        this.content0.itemRenderer = OSATarget3ItemRender7;
        this.content0.dataProvider = this.listData;
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        this.actType = ActivityPanel.getActivityTypeFromId(this.activityID);
        this.updateData();
    };
    OSATarget3Panel7.prototype.GetCallBack = function (activityID) {
        if (this.activityID != activityID)
            return;
        var ins;
        if (this.actType == ActivityType.Normal) {
            ins = Activity.ins();
        }
        else if (this.actType == ActivityType.Personal) {
            ins = PActivity.ins();
        }
        if (!ins.isSuccee) {
            if (!UserBag.ins().getSurplusCount()) {
                UserTips.ins().showTips("背包已满");
            }
            else {
                UserTips.ins().showTips("领取失败");
                var activityData = void 0;
                if (this.actType == ActivityType.Normal) {
                    activityData = ins.getActivityDataById(this.activityID);
                }
                else if (this.actType == ActivityType.Personal) {
                    activityData = ins.getActivityDataById(this.activityID);
                }
                ins.sendChangePage(activityData.id);
            }
        }
        ins.isSuccee = false;
        this.updateData();
    };
    OSATarget3Panel7.prototype.updateTime = function () {
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
    OSATarget3Panel7.prototype.setTime = function () {
        if (this._time > 0) {
            this._time -= 1;
            this.actTime.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 3);
        }
    };
    OSATarget3Panel7.prototype.close = function () {
        TimerManager.ins().removeAll(this);
    };
    OSATarget3Panel7.prototype.updateData = function () {
        this.updateTime();
        this.updateList();
    };
    OSATarget3Panel7.prototype.updateList = function () {
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
    OSATarget3Panel7.prototype.sortFunc = function (aConfig, bConfig) {
        if (aConfig.index < bConfig.index)
            return -1;
        else
            return 1;
    };
    return OSATarget3Panel7;
}(BaseView));
__reflect(OSATarget3Panel7.prototype, "OSATarget3Panel7");
//# sourceMappingURL=OSATarget3Panel7.js.map