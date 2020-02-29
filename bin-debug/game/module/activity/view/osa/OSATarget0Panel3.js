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
var OSATarget0Panel3 = (function (_super) {
    __extends(OSATarget0Panel3, _super);
    function OSATarget0Panel3() {
        var _this = _super.call(this) || this;
        _this._time = 0;
        _this.skinName = "OSADailyRechargeSkin";
        return _this;
    }
    OSATarget0Panel3.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.dailyReward.itemRenderer = OSADailyRechargeRender;
    };
    OSATarget0Panel3.prototype.open = function () {
        this.observe(Recharge.ins().postUpdateRechargeEx, this.updateList);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        this.initList();
    };
    OSATarget0Panel3.prototype.updateData = function () {
        this.updateList();
    };
    OSATarget0Panel3.prototype.updateList = function () {
        var dataPro = this.dailyReward.dataProvider;
        var source = dataPro.source;
        source.sort(this.sort);
        dataPro.refresh();
        this.updateTime();
        this.updateValue();
    };
    OSATarget0Panel3.prototype.updateTime = function () {
        var date = new Date(GameServer.serverTime);
        date.setHours(23, 59, 59, 0);
        this._time = Math.floor((date.getTime() - GameServer.serverTime) / 1000);
        if (this._time < 0)
            this._time = 0;
        this.actTime.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 3);
        var data = Activity.ins().getbtnInfo(this.activityID);
        this.actDesc.text = data.acDesc;
    };
    OSATarget0Panel3.prototype.initList = function () {
        var config = Recharge.ins().getCurRechargeConfig();
        var arr = [];
        for (var k in config) {
            arr.push(config[k]);
        }
        arr.sort(this.sort);
        this.dailyReward.dataProvider = new eui.ArrayCollection(arr);
        this.updateTime();
        this.updateValue();
    };
    OSATarget0Panel3.prototype.updateValue = function () {
        var data = Recharge.ins().getRechargeData(0);
        this.record.text = "\u5DF2\u5145\u503C" + data.curDayPay + "\u5143\u5B9D";
    };
    OSATarget0Panel3.prototype.sort = function (a, b) {
        var data = Recharge.ins().getRechargeData(0);
        var aState = ((data.isAwards >> a.index) & 1);
        var bState = ((data.isAwards >> b.index) & 1);
        if (aState && !bState) {
            return 1;
        }
        else if (!aState && bState) {
            return -1;
        }
        else {
            return a.pay < b.pay ? -1 : 1;
        }
    };
    OSATarget0Panel3.prototype.setTime = function () {
        if (this._time > 0) {
            this._time -= 1;
            this.actTime.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 3);
        }
    };
    OSATarget0Panel3.prototype.close = function () {
        this.removeObserve();
        TimerManager.ins().removeAll(this);
    };
    return OSATarget0Panel3;
}(BaseView));
__reflect(OSATarget0Panel3.prototype, "OSATarget0Panel3");
//# sourceMappingURL=OSATarget0Panel3.js.map