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
var OSATarget7Panel3 = (function (_super) {
    __extends(OSATarget7Panel3, _super);
    function OSATarget7Panel3() {
        var _this = _super.call(this) || this;
        _this._leftTime = 0;
        _this._matrailId = 0;
        _this._oldCount = 0;
        return _this;
    }
    OSATarget7Panel3.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.actInfo0.text = GlobalConfig.ActivityConfig[this.activityID].desc;
        this.content.itemRenderer = limitChangeItemRender;
    };
    Object.defineProperty(OSATarget7Panel3.prototype, "activityID", {
        get: function () {
            return this._activityID;
        },
        set: function (value) {
            this._activityID = value;
            this.setCurSkin();
        },
        enumerable: true,
        configurable: true
    });
    OSATarget7Panel3.prototype.setCurSkin = function () {
        var aCon = GlobalConfig.ActivityConfig[this.activityID];
        if (aCon.pageSkin)
            this.skinName = aCon.pageSkin;
        else
            this.skinName = "limitChangeSkin";
    };
    OSATarget7Panel3.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.setCurSkin();
        this.observe(UserBag.ins().postItemAdd, this.updateMaterial);
        this.observe(UserBag.ins().postItemChange, this.updateMaterial);
        this.updateData();
    };
    OSATarget7Panel3.prototype.close = function () {
        this.removeObserve();
        TimerManager.ins().remove(this.setTime, this);
        this._leftTime = 0;
        this._oldCount = 0;
    };
    OSATarget7Panel3.prototype.updateData = function () {
        this._activityData = Activity.ins().getActivityDataById(this.activityID);
        this.checkTime();
        this.updateList();
    };
    OSATarget7Panel3.prototype.updateMaterial = function () {
        var itemData = UserBag.ins().getBagItemById(this._matrailId);
        var mCount = itemData ? itemData.count : 0;
        if (mCount != this._oldCount)
            this.updateList();
    };
    OSATarget7Panel3.prototype.updateList = function () {
        var configs = GlobalConfig.ActivityType7Config[this.activityID];
        this._matrailId = configs[1].itemId;
        var itemData = UserBag.ins().getBagItemById(this._matrailId);
        var mCount = itemData ? itemData.count : 0;
        this.num.text = mCount + "";
        this._oldCount = mCount;
        var config;
        var datas = [];
        var i = 0;
        var state = 0;
        var pCount = 0, sCount = 0;
        for (var k in configs) {
            config = configs[k];
            if (config.scount == undefined || config.scount == 0)
                sCount = Number.MAX_VALUE;
            else
                sCount = config.scount - this._activityData.worldRewardsSum[i + 1];
            if (config.count == undefined || config.count == 0)
                pCount = Number.MAX_VALUE;
            else
                pCount = config.count - this._activityData.personalRewardsSum[i + 1];
            state = sCount && pCount && mCount >= config.itemCount ? 1 : 0;
            datas[i] = [this.activityID, config, state, pCount, sCount];
            i++;
        }
        datas.sort(this.sort);
        if (!this._dataCollect) {
            this._dataCollect = new ArrayCollection();
            this.content.dataProvider = this._dataCollect;
        }
        this._dataCollect.source = datas;
    };
    OSATarget7Panel3.prototype.sort = function (a, b) {
        if (a[2] > b[2])
            return -1;
        if (a[2] < b[2])
            return 1;
        if (a[1].index < b[1].index)
            return -1;
        return 1;
    };
    OSATarget7Panel3.prototype.checkTime = function () {
        TimerManager.ins().remove(this.setTime, this);
        this._leftTime = 0;
        if (Math.floor((DateUtils.formatMiniDateTime(this._activityData.startTime) - GameServer.serverTime) / 1000) >= 0)
            this.actTime0.text = "活动未开启";
        else {
            this._leftTime = Math.floor((DateUtils.formatMiniDateTime(this._activityData.endTime) - GameServer.serverTime) / 1000);
            if (this._leftTime <= 0)
                this.actTime0.text = "活动已结束";
            else {
                this.actTime0.text = DateUtils.getFormatBySecond(this._leftTime, DateUtils.TIME_FORMAT_5, 3);
                TimerManager.ins().doTimer(1000, 0, this.setTime, this);
            }
        }
    };
    OSATarget7Panel3.prototype.setTime = function () {
        this._leftTime--;
        this.actTime0.text = DateUtils.getFormatBySecond(this._leftTime, DateUtils.TIME_FORMAT_5, 3);
        if (this._leftTime <= 0)
            this.checkTime();
    };
    return OSATarget7Panel3;
}(BaseView));
__reflect(OSATarget7Panel3.prototype, "OSATarget7Panel3");
//# sourceMappingURL=OSATarget7Panel3.js.map