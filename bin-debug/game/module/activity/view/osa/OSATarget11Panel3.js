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
var OSATarget11Panel3 = (function (_super) {
    __extends(OSATarget11Panel3, _super);
    function OSATarget11Panel3(id) {
        var _this = _super.call(this) || this;
        _this._curDayIndex = 0;
        _this.activityID = id;
        _this.setCurSkin();
        return _this;
    }
    OSATarget11Panel3.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.tabD.itemRenderer = FDtabBtnItemRender;
        this.list.itemRenderer = FDProjectItemRender;
        this.rewardlist.itemRenderer = FDrewardItemRender;
    };
    OSATarget11Panel3.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.setCurSkin();
        this._curDayIndex = 0;
        this.setAct22ID();
        this.updateView();
        this.tabD.selectedIndex = this._curDayIndex;
        this.updateData();
        this.addTouchEvent(this, this.onTouch);
        this.observe(Activity.ins().postActivityIsGetAwards, this.refreshReds);
        this.addChangeEvent(this.tabD, this.onClickBtn);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        if (this.osa22Panel2) {
            this.osa22Panel2.close();
            DisplayUtils.removeFromParent(this.osa22Panel2);
        }
    };
    OSATarget11Panel3.prototype.setAct22ID = function () {
        this.activity22ID = 0;
        for (var k in Activity.ins().activityData) {
            var ac = Activity.ins().activityData[k];
            if (!ac)
                continue;
            if (ac.pageStyle == ActivityPageStyle.VERSIONCELE && ac.type == ActivityDataFactory.ACTIVITY_TYPE_22 && Activity.ins().getActivityDataById(+k).isOpenActivity() && !Activity.ins().getActivityDataById(+k).getHide()) {
                this.activity22ID = ac.id;
                return;
            }
        }
    };
    OSATarget11Panel3.prototype.close = function () {
        this._btnCollect = null;
        this._listCollect = null;
    };
    OSATarget11Panel3.prototype.setCurSkin = function () {
        var aCon = GlobalConfig.ActivityConfig[this.activityID];
        if (aCon.pageSkin)
            this.skinName = aCon.pageSkin;
        else
            this.skinName = "fiveDaySkin";
        if (this.actDesc)
            this.actDesc.text = aCon.desc;
    };
    OSATarget11Panel3.prototype.updateView = function () {
        var data = Activity.ins().getActivityDataById(this.activityID);
        this._items = [];
        var confs = GlobalConfig.ActivityType11_2Config[this.activityID];
        var conf;
        var btnArr = [];
        var groups;
        var group;
        var achieve;
        for (var k in confs) {
            conf = confs[k];
            group = conf.group;
            groups = this._items[group - 1];
            if (!groups) {
                groups = [];
                this._items[group - 1] = groups;
                btnArr.push({ gName: conf.gName, showRed: false });
            }
            achieve = data.achieveInfo[conf.index - 1];
            if (!achieve.isGot && achieve.times >= conf.dayLimit)
                btnArr[group - 1].showRed = true;
            groups.push(conf);
        }
        if (!this._btnCollect) {
            this._btnCollect = new ArrayCollection();
            this.tabD.dataProvider = this._btnCollect;
        }
        this._btnCollect.source = btnArr;
        this.tabD.validateNow();
        var data2 = Activity.ins().activityData[this.activity22ID];
        this.redPointImg.visible = ActivityType11Data.FIRST_OPEN_SHOP || data2.refreshFree;
    };
    OSATarget11Panel3.prototype.refreshReds = function () {
        this.updateView();
        this.updateData();
    };
    OSATarget11Panel3.prototype.updateData = function () {
        var items = this._items[this._curDayIndex];
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
        var activityData = Activity.ins().getActivityDataById(this.activityID);
        for (var i_1 = 0; i_1 < len; i_1++) {
            conf = items[i_1];
            achieve = activityData.achieveInfo[conf.index - 1];
            if (achieve.isGot)
                state = 2;
            else if (achieve.times >= conf.dayLimit)
                state = 1;
            else
                state = 0;
            datas[i_1] = { activityID: this.activityID, conf: conf, state: state, times: achieve.times };
        }
        datas.sort(this.sort);
        this._listCollect.source = datas;
        len = Object.keys(GlobalConfig.ActivityType11_1Config[this.activityID]).length;
        var list = [];
        list.length = len;
        var config;
        var i;
        for (i = 1; i <= len; i++) {
            config = GlobalConfig.ActivityType11_1Config[this.activityID][i];
            if (activityData.rewardInfo >> i & 1)
                state = 2;
            else if (activityData.hiScore >= config.score)
                state = 1;
            else
                state = 0;
            list[i - 1] = { activityID: this.activityID, index: i, state: state, config: config };
        }
        if (!this._rewardCollect) {
            this._rewardCollect = new ArrayCollection();
            this.rewardlist.dataProvider = this._rewardCollect;
        }
        this._rewardCollect.source = list;
        this.totalScore.text = activityData.hiScore + "";
    };
    OSATarget11Panel3.prototype.sort = function (a, b) {
        if (a.state == 1 && b.state != 1)
            return -1;
        if (a.state != 1 && b.state == 1)
            return 1;
        if (a.state == 2 && b.state != 2)
            return 1;
        if (a.conf.index < b.conf.index)
            return -1;
        if (a.conf.index > b.conf.index)
            return 1;
        return 0;
    };
    OSATarget11Panel3.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.shopBtn:
                if (!this.osa22Panel2) {
                    this.osa22Panel2 = ObjectPool.pop("OSATarget22Panel2", [this.activity22ID]);
                    this.osa22Panel2.top = 0;
                    this.osa22Panel2.bottom = 0;
                    this.osa22Panel2.left = 0;
                    this.osa22Panel2.right = 0;
                }
                this.osa22Panel2.activityID = this.activity22ID;
                this.parent.addChild(this.osa22Panel2);
                this.osa22Panel2.open();
                this.close();
                DisplayUtils.removeFromParent(this);
                ActivityType11Data.FIRST_OPEN_SHOP = false;
                Activity.ins().postActivityIsGetAwards();
                break;
        }
    };
    OSATarget11Panel3.prototype.onClickBtn = function (e) {
        if (this._curDayIndex == e.currentTarget.selectedIndex)
            return;
        this._curDayIndex = e.currentTarget.selectedIndex;
        this.updateData();
    };
    OSATarget11Panel3.prototype.setTime = function () {
        var data = Activity.ins().activityData[this.activityID];
        if (data)
            this.actTime.text = data.getRemainTime();
        var data2 = Activity.ins().activityData[this.activity22ID];
        if (data2) {
            var time = data2.getRefreshTime();
            this.refreshTime.text = DateUtils.getFormatBySecond(time > 0 ? time : 0, DateUtils.TIME_FORMAT_1, 5) + "\u540E\u5237\u65B0";
        }
        else
            this.refreshTime.text = "00:00:00\u540E\u5237\u65B0";
    };
    return OSATarget11Panel3;
}(BaseView));
__reflect(OSATarget11Panel3.prototype, "OSATarget11Panel3");
//# sourceMappingURL=OSATarget11Panel3.js.map