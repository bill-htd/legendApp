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
var OSATarget3Panel10 = (function (_super) {
    __extends(OSATarget3Panel10, _super);
    function OSATarget3Panel10() {
        var _this = _super.call(this) || this;
        _this.selectRes = ["sd_projecttitle2", "sd_projecttitle1"];
        _this.pageRedPoint = [false, false, false];
        return _this;
    }
    OSATarget3Panel10.prototype.initSkin = function () {
        var config = GlobalConfig.ActivityConfig[this.activityID];
        if (config.pageSkin)
            this.skinName = config.pageSkin;
        else
            this.skinName = "KMHRechargeSkin";
    };
    OSATarget3Panel10.prototype.close = function () {
        this.removeObserve();
        TimerManager.ins().removeAll(this);
    };
    OSATarget3Panel10.prototype.open = function () {
        this.initSkin();
        this.observe(Activity.ins().postRewardResult, this.updateDataCall);
        this.observe(Activity.ins().postChangePage, this.updateDataCall);
        for (var i = 0; i < 3; i++) {
            this["projectbg" + i].name = i.toString();
            this.addTouchEvent(this["projectbg" + i], this.onTap);
        }
        this.rechargeitem.itemRenderer = KaiMenItem;
        this.rechargeitemData = new eui.ArrayCollection();
        this.rechargeitem.dataProvider = this.rechargeitemData;
        this.initData();
        TimerManager.ins().doTimer(1000, 0, this.updateTime, this);
    };
    OSATarget3Panel10.prototype.updateTime = function () {
        var act = Activity.ins().getActivityDataById(this.activityID);
        var sec = act.getLeftTime();
        this.actTime.text = DateUtils.getFormatBySecond(sec, DateUtils.TIME_FORMAT_5, 3);
    };
    OSATarget3Panel10.prototype.updatePageRedPoint = function (arr) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].redPoint)
                return true;
        }
        return false;
    };
    OSATarget3Panel10.prototype.updateList = function (id) {
        var config = GlobalConfig.ActivityType3Config[id];
        var act = Activity.ins().getActivityDataById(id);
        var arr = [];
        for (var j in config) {
            var kmd = new KaiMenData();
            kmd.id = config[j].Id;
            kmd.index = config[j].index;
            kmd.type = config[j].type;
            kmd.day = config[j].day;
            kmd.reward = config[j].rewards;
            kmd.already = (act.recrod >> config[j].index & 1) ? true : false;
            if (kmd.type == 3) {
                kmd.unready = act.isOverTimer(config[j].index);
                if (act.curOpenDay() + 1 == config[j].day) {
                    kmd.redPoint = act.chongzhiNum >= config[j].val ? true : false;
                }
                else {
                    kmd.redPoint = false;
                }
            }
            else if (kmd.type == 1) {
                kmd.unready = act.dabiao[config[j].index - 1] < config[j].day;
                kmd.redPoint = !kmd.already && !kmd.unready;
            }
            if (kmd.unready) {
                kmd.already = kmd.redPoint = false;
            }
            else {
                kmd.redPoint = kmd.already ? false : kmd.redPoint;
            }
            arr.push(kmd);
        }
        return arr;
    };
    OSATarget3Panel10.prototype.onTap = function (e) {
        for (var i = 0; i < 3; i++) {
            this["projectbg" + i].source = this.selectRes[0];
            if (e.currentTarget == this["projectbg" + i]) {
                this.actIndex = i;
                this["projectbg" + i].source = this.selectRes[1];
                var id = this.actIds[this.actIndex];
                var arr = this.updateList(id);
                this.rechargeitemData.replaceAll(arr);
            }
        }
    };
    OSATarget3Panel10.prototype.initData = function () {
        var config = GlobalConfig.ActivityType3Config[this.activityID];
        this.actDesc.text = GlobalConfig.ActivityConfig[this.activityID].desc;
        this.actIds = [];
        this.actIds.push(this.activityID);
        for (var i = 1; i <= config[1].activityID.length; i++) {
            this.actIds.push(config[1].activityID[i - 1]);
        }
        this.actIndex = this.getRuleIndex();
        this.updateTime();
        this.updateData1();
        var btnconfig = GlobalConfig.ActivityBtnConfig[this.activityID];
        if (btnconfig) {
            this.title.source = btnconfig.title;
        }
    };
    OSATarget3Panel10.prototype.getRuleIndex = function () {
        var index = 0;
        return index;
    };
    OSATarget3Panel10.prototype.updateDataCall = function (activityID) {
        if (this.actIds.indexOf(activityID) == -1)
            return;
        this.updateData1();
    };
    OSATarget3Panel10.prototype.updateData1 = function () {
        for (var i = 0; i < 3; i++) {
            this["projectbg" + i].source = this.selectRes[0];
        }
        this["projectbg" + this.actIndex].source = this.selectRes[1];
        for (var i = 0; i < this.actIds.length; i++) {
            var tmpId = this.actIds[i];
            var arr = this.updateList(tmpId);
            this["redpoint" + i].visible = this.updatePageRedPoint(arr);
            if (i == this.actIndex) {
                this.rechargeitemData.replaceAll(arr);
            }
        }
        var act = Activity.ins().getActivityDataById(this.actIds[this.actIndex]);
        this.rechargeCoumt.text = "\u4ECA\u65E5\u5DF2\u5145\u503C" + Math.floor(act.chongzhiNum / 100) + "\u5143";
    };
    OSATarget3Panel10.prototype.updateData = function () {
    };
    return OSATarget3Panel10;
}(BaseView));
__reflect(OSATarget3Panel10.prototype, "OSATarget3Panel10");
//# sourceMappingURL=OSATarget3Panel10.js.map