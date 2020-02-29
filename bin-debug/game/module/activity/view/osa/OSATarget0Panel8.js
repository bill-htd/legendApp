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
var OSATarget0Panel8 = (function (_super) {
    __extends(OSATarget0Panel8, _super);
    function OSATarget0Panel8() {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var _this = _super.call(this) || this;
        _this._time = 0;
        _this.skinName = "HeFuResetRechargeSkin";
        return _this;
    }
    OSATarget0Panel8.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.updateData();
    };
    OSATarget0Panel8.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.pay0, this.onTap);
        this.updateData();
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
    };
    OSATarget0Panel8.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
        TimerManager.ins().removeAll(this);
    };
    OSATarget0Panel8.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.pay0:
                var rdata = Recharge.ins().getRechargeData(0);
                if (!rdata || !rdata.num || rdata.num != 2) {
                    ViewManager.ins().open(Recharge1Win);
                }
                else {
                    ViewManager.ins().open(ChargeFirstWin);
                }
                break;
        }
    };
    OSATarget0Panel8.prototype.updateData = function () {
        var activityData = Activity.ins().getActivityDataById(this.activityID);
        var beganTime = Math.floor(activityData.startTime / 1000 - GameServer.serverTime / 1000);
        var endedTime = Math.floor(activityData.endTime / 1000 - GameServer.serverTime / 1000);
        if (beganTime >= 0) {
            this.actTime1.text = "活动未开启";
        }
        else if (endedTime <= 0) {
            this.actTime1.text = "活动已结束";
        }
        else {
            this.actTime1.text = DateUtils.getFormatBySecond(endedTime, DateUtils.TIME_FORMAT_5, 3);
        }
        var btncfg = GlobalConfig.ActivityBtnConfig[this.activityID];
        this.title.source = btncfg.title;
        this.actDesc.textFlow = TextFlowMaker.generateTextFlow1(btncfg.acDesc);
    };
    OSATarget0Panel8.prototype.setTime = function () {
        if (this._time > 0) {
            this._time -= 1;
            this.actTime1.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 3);
        }
    };
    return OSATarget0Panel8;
}(BaseView));
__reflect(OSATarget0Panel8.prototype, "OSATarget0Panel8");
//# sourceMappingURL=OSATarget0Panel8.js.map