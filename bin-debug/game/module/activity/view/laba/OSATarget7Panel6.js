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
var OSATarget7Panel6 = (function (_super) {
    __extends(OSATarget7Panel6, _super);
    function OSATarget7Panel6() {
        var _this = _super.call(this) || this;
        _this._leftTime = 0;
        _this.skinName = "LaBaexchangeSkin";
        return _this;
    }
    OSATarget7Panel6.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.actInfo0.text = GlobalConfig.ActivityConfig[this.activityID].desc;
        this.content.itemRenderer = LabaChangeItemRender;
    };
    Object.defineProperty(OSATarget7Panel6.prototype, "activityID", {
        get: function () {
            return this._activityID;
        },
        set: function (value) {
            this._activityID = value;
        },
        enumerable: true,
        configurable: true
    });
    OSATarget7Panel6.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.observe(UserBag.ins().postItemAdd, this.updateList);
        this.observe(UserBag.ins().postItemChange, this.updateList);
        this.observe(Activity.ins().postActivityIsGetAwards, this.updateList);
        this.updateData();
    };
    OSATarget7Panel6.prototype.close = function () {
        this.removeObserve();
        TimerManager.ins().remove(this.setTime, this);
        this._leftTime = 0;
    };
    OSATarget7Panel6.prototype.updateData = function () {
        this._activityData = Activity.ins().getActivityDataById(this.activityID);
        this.checkTime();
        this.updateList();
    };
    OSATarget7Panel6.prototype.updateList = function () {
        var datas = [];
        var configs = GlobalConfig.ActivityType7Config[this.activityID];
        for (var i in configs) {
            var state = this._activityData.getExchange(configs[i].index);
            datas.push({ config: configs[i], state: state });
        }
        datas.sort(this.sort);
        if (!this._dataCollect) {
            this._dataCollect = new ArrayCollection();
            this.content.dataProvider = this._dataCollect;
        }
        this._dataCollect.replaceAll(datas);
    };
    OSATarget7Panel6.prototype.sort = function (a, b) {
        if (a.config.index < b.config.index)
            return -1;
        else
            return 1;
    };
    OSATarget7Panel6.prototype.checkTime = function () {
        this._leftTime = 0;
        if (Math.floor((DateUtils.formatMiniDateTime(this._activityData.startTime) - GameServer.serverTime) / 1000) >= 0)
            this.actTime0.text = "活动未开启";
        else {
            this._leftTime = Math.floor((DateUtils.formatMiniDateTime(this._activityData.endTime) - GameServer.serverTime) / 1000);
            if (this._leftTime <= 0)
                this.actTime0.text = "活动已结束";
            else {
                this.actTime0.text = DateUtils.getFormatBySecond(this._leftTime, DateUtils.TIME_FORMAT_5, 3);
                if (!TimerManager.ins().isExists(this.setTime, this))
                    TimerManager.ins().doTimer(1000, 0, this.setTime, this);
            }
        }
    };
    OSATarget7Panel6.prototype.setTime = function () {
        this._leftTime--;
        this.actTime0.text = DateUtils.getFormatBySecond(this._leftTime, DateUtils.TIME_FORMAT_5, 3);
        if (this._leftTime <= 0)
            this.checkTime();
    };
    return OSATarget7Panel6;
}(BaseView));
__reflect(OSATarget7Panel6.prototype, "OSATarget7Panel6");
//# sourceMappingURL=OSATarget7Panel6.js.map