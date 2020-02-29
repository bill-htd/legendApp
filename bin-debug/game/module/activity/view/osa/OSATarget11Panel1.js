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
var OSATarget11Panel1 = (function (_super) {
    __extends(OSATarget11Panel1, _super);
    function OSATarget11Panel1(id) {
        var _this = _super.call(this) || this;
        _this.activityID = id;
        _this.setCurSkin();
        return _this;
    }
    OSATarget11Panel1.prototype.setCurSkin = function () {
        var aCon = GlobalConfig.ActivityConfig[this.activityID];
        if (aCon.pageSkin)
            this.skinName = aCon.pageSkin;
        else
            this.skinName = "NYHighSkin";
    };
    OSATarget11Panel1.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.rewardList.itemRenderer = HighRewardItemRender;
        this.projectList.itemRenderer = HighProjectItemRender;
    };
    OSATarget11Panel1.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.setCurSkin();
        var aCon = GlobalConfig.ActivityConfig[this.activityID];
        this.actInfo1.text = aCon.desc;
        this.observe(Activity.ins().postActivityIsGetAwards, this.updateData);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        this.updateData();
    };
    OSATarget11Panel1.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
        TimerManager.ins().removeAll(this);
    };
    OSATarget11Panel1.prototype.updateData = function () {
        var data = Activity.ins().activityData[this.activityID];
        if (!data)
            return;
        var len = Object.keys(GlobalConfig.ActivityType11_1Config[this.activityID]).length;
        var state = 0;
        var list = [];
        list.length = len;
        var config;
        var i;
        for (i = 1; i <= len; i++) {
            config = GlobalConfig.ActivityType11_1Config[this.activityID][i];
            if (data.rewardInfo >> i & 1)
                state = 2;
            else if (data.hiScore >= config.score)
                state = 1;
            else
                state = 0;
            list[i - 1] = { activityID: this.activityID, index: i, state: state, config: config };
        }
        if (!this._rewardCollect) {
            this._rewardCollect = new ArrayCollection();
            this.rewardList.dataProvider = this._rewardCollect;
        }
        this._rewardCollect.source = list;
        len = Object.keys(GlobalConfig.ActivityType11_2Config[this.activityID]).length;
        var config2;
        list = [];
        list.length = len;
        var total = 0;
        for (i = 0; i < len; i++) {
            var info = data.achieveInfo[i];
            config2 = GlobalConfig.ActivityType11_2Config[this.activityID][i + 1];
            list[i] = { config: config2, times: info.times };
            var cur = Math.floor(info.times / config2.target);
            var max = Math.floor(config2.dayLimit / config2.target);
            if (cur > max)
                cur = max;
            total += config2.score * cur;
        }
        if (!this._achieveCollect) {
            this._achieveCollect = new ArrayCollection;
            this.projectList.dataProvider = this._achieveCollect;
        }
        this._achieveCollect.source = list;
        this.totalScore.text = "当前嗨积分:" + total;
        this.setTime();
    };
    OSATarget11Panel1.prototype.setTime = function () {
        var data = Activity.ins().activityData[this.activityID];
        if (data)
            this.actTime1.text = data.getRemainTime();
    };
    return OSATarget11Panel1;
}(BaseView));
__reflect(OSATarget11Panel1.prototype, "OSATarget11Panel1");
//# sourceMappingURL=OSATarget11Panel1.js.map