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
var SpringEightDayWin = (function (_super) {
    __extends(SpringEightDayWin, _super);
    function SpringEightDayWin() {
        var _this = _super.call(this) || this;
        _this._curDay = 0;
        _this._curDayIndex = 0;
        _this._curGroupIndex = 0;
        _this.isTopLevel = true;
        _this.setActivityID();
        _this.setCurSkin();
        return _this;
    }
    SpringEightDayWin.prototype.setActivityID = function () {
        var data = Activity.ins().activityData;
        for (var k in data) {
            if (data[k].pageStyle == ActivityPageStyle.SPRINGEIGHTDAY) {
                this._activityID = data[k].id;
                break;
            }
        }
    };
    SpringEightDayWin.prototype.setCurSkin = function () {
        var aCon = GlobalConfig.ActivityConfig[this._activityID];
        if (aCon.pageSkin)
            this.skinName = aCon.pageSkin;
        else
            this.skinName = "SFEightDayWin";
        if (this.actInfo0)
            this.actInfo0.text = aCon.desc;
    };
    SpringEightDayWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.tabP.itemRenderer = HappySevenDayTabListItemRender;
        this.tabD.itemRenderer = HappySevenDayBtnItemRender;
        this.list.itemRenderer = HappySevenDayItemRender;
    };
    SpringEightDayWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this._activityID = param[0];
        this.setCurSkin();
        this._curDayIndex = 0;
        this._curGroupIndex = 0;
        this.updateView();
        this.updateTabs();
        this.tabD.selectedIndex = this._curDayIndex;
        this.tabP.selectedIndex = this._curGroupIndex;
        this.updateData();
        this.updateTargetAward();
        this.addTouchEvent(this, this.onTouch);
        this.observe(Activity.ins().postActivityIsGetAwards, this.refreshReds);
        this.addChangeEvent(this.tabD, this.onClickBtn);
        this.addChangeEvent(this.tabP, this.onTabBtn);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
    };
    SpringEightDayWin.prototype.close = function () {
        this._tabCollect = null;
        this._btnCollect = null;
        this._listCollect = null;
    };
    SpringEightDayWin.prototype.updateView = function () {
        var data = Activity.ins().getActivityDataById(this._activityID);
        this._curDay = data.getCurDay();
        this._items = [];
        var confs = GlobalConfig.ActivityType11_2Config[this._activityID];
        var conf;
        var btnArr = [];
        var days;
        var day;
        var group;
        var groups;
        var achieve;
        for (var k in confs) {
            conf = confs[k];
            day = conf.day;
            days = this._items[conf.day - 1];
            if (!days) {
                days = [];
                this._items[conf.day - 1] = days;
                btnArr.push({ res: conf.dayImg, isOpen: this._curDay >= conf.day, showRed: false, day: conf.day });
            }
            achieve = data.achieveInfo[conf.index - 1];
            if (this._curDay >= conf.day && !achieve.isGot && achieve.times >= conf.dayLimit)
                btnArr[conf.day - 1].showRed = true;
            group = conf.group;
            groups = days[group - 1];
            if (!groups) {
                groups = [];
                days[group - 1] = groups;
            }
            groups.push(conf);
        }
        if (!this._btnCollect) {
            this._btnCollect = new ArrayCollection();
            this.tabD.dataProvider = this._btnCollect;
        }
        this._btnCollect.source = btnArr;
        this.tabD.validateNow();
        if (!this._tabCollect) {
            this._tabCollect = new ArrayCollection();
            this.tabP.dataProvider = this._tabCollect;
        }
    };
    SpringEightDayWin.prototype.refreshReds = function () {
        this.updateView();
        this.updateTabs();
        this.updateData();
        this.updateTargetAward();
    };
    SpringEightDayWin.prototype.updateData = function () {
        var items = this._items[this._curDayIndex][this._curGroupIndex];
        if (!items || !items.length)
            return;
        if (!this._listCollect) {
            this._listCollect = new ArrayCollection();
            this.list.dataProvider = this._listCollect;
        }
        var len = items.length;
        var conf;
        var datas = [];
        var state = 0;
        var achieve;
        var activityData = Activity.ins().getActivityDataById(this._activityID);
        for (var i = 0; i < len; i++) {
            conf = items[i];
            achieve = activityData.achieveInfo[conf.index - 1];
            if (achieve.isGot)
                state = 2;
            else if (achieve.times >= conf.dayLimit)
                state = 1;
            else
                state = 0;
            datas[i] = { activityID: this._activityID, conf: conf, state: state, times: achieve.times };
        }
        datas.sort(this.sort);
        this._listCollect.source = datas;
    };
    SpringEightDayWin.prototype.sort = function (a, b) {
        if (a.state == 1 && b.state != 1)
            return -1;
        if (a.state == 2 && b.state != 2)
            return 1;
        if (a.conf.index < b.conf.index)
            return -1;
        if (a.conf.index > b.conf.index)
            return 1;
        return 0;
    };
    SpringEightDayWin.prototype.updateTargetAward = function () {
        var conf = GlobalConfig.ActivityType11_1Config[this._activityID][Object.keys(GlobalConfig.ActivityType11_1Config[this._activityID]).length];
        this.schedule.maximum = conf.score;
        this.schedule.value = Activity.ins().getActivityDataById(this._activityID).hiScore;
    };
    SpringEightDayWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.rewardBtn:
                ViewManager.ins().open(SDRewardWin, this._activityID);
                break;
        }
    };
    SpringEightDayWin.prototype.onClickBtn = function (e) {
        if (this._curDayIndex == e.currentTarget.selectedIndex)
            return;
        var btnItem = this.tabD.getChildAt(e.currentTarget.selectedIndex);
        if (!btnItem.isOpen)
            UserTips.ins().showCenterTips("活动开启第" + btnItem.day + "天开放");
        else {
            btnItem = this.tabD.getChildAt(this._curDayIndex);
            btnItem.selected = false;
            this._curDayIndex = e.currentTarget.selectedIndex;
        }
        this.tabD.selectedIndex = this._curDayIndex;
        btnItem = this.tabD.getChildAt(this._curDayIndex);
        btnItem.selected = true;
        this.updateTabs();
        this.tabP.selectedIndex = this._curGroupIndex = 0;
        this.updateData();
    };
    SpringEightDayWin.prototype.onTabBtn = function (e) {
        if (this._curGroupIndex == e.currentTarget.selectedIndex)
            return;
        this._curGroupIndex = e.currentTarget.selectedIndex;
        this.tabP.selectedIndex = this._curGroupIndex;
        this.updateData();
    };
    SpringEightDayWin.prototype.updateTabs = function () {
        var days = this._items[this._curDayIndex];
        var data = Activity.ins().getActivityDataById(this._activityID);
        var tabs = [];
        var len;
        var achieve;
        var conf;
        for (var k in days) {
            tabs.push({ gName: days[k][0].gName, showRed: false });
            len = days[k].length;
            for (var i = 0; i < len; i++) {
                conf = days[k][i];
                achieve = data.achieveInfo[conf.index - 1];
                if (this._curDay >= conf.day && !achieve.isGot && achieve.times >= conf.dayLimit) {
                    tabs[k].showRed = true;
                    break;
                }
            }
        }
        this._tabCollect.source = tabs;
    };
    SpringEightDayWin.prototype.setTime = function () {
        var data = Activity.ins().activityData[this._activityID];
        this.actTime0.text = data.getRemainTime();
    };
    return SpringEightDayWin;
}(BaseEuiView));
__reflect(SpringEightDayWin.prototype, "SpringEightDayWin");
ViewManager.ins().reg(SpringEightDayWin, LayerManager.UI_Main);
//# sourceMappingURL=SpringEightDayWin.js.map