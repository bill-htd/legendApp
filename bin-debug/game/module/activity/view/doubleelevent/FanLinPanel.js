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
var FanLinPanel = (function (_super) {
    __extends(FanLinPanel, _super);
    function FanLinPanel() {
        var _this = _super.call(this) || this;
        _this._time = 0;
        _this._stateList = [];
        return _this;
    }
    FanLinPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.actDesc.text = GlobalConfig.ActivityConfig[this.activityID].desc;
    };
    FanLinPanel.prototype.open = function () {
        var arges = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            arges[_i] = arguments[_i];
        }
        this.addTouchEvent(this.pay0, this.onPay0);
        this.addTouchEvent(this.pay1, this.onPay1);
        this.observe(Activity.ins().postActivityIsGetAwards, this.update);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        this.update();
    };
    FanLinPanel.prototype.update = function () {
        var data = Activity.ins().getDoubleElevenDataByID(this.activityID);
        var configs = GlobalConfig.ActivityType3Config[this.activityID];
        var config;
        var state = 0;
        var btns = [this.pay0, this.pay1];
        var btn;
        var i = 0;
        for (var k in configs) {
            config = configs[k];
            state = ((data.recrod >> config.index) & 1) ? 2 : (data.chongzhiNum >= config.val ? 1 : 0);
            btn = btns[i];
            if (state == 2)
                btn.label = "已领取";
            else if (state == 1)
                btn.label = "领取奖励";
            else
                btn.label = "充值¥" + (config.val / 100);
            btn.enabled = state != 2;
            this._stateList[i] = state;
            this["redPoint" + i].visible = state == 1;
            i++;
        }
        this._time = data.getLeftTime();
        this.actTime1.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 4);
    };
    FanLinPanel.prototype.close = function () {
        this.removeObserve();
        this.removeTouchEvent(this.pay0, this.onPay0);
        this.removeTouchEvent(this.pay1, this.onPay1);
        TimerManager.ins().removeAll(this);
    };
    FanLinPanel.prototype.onPay0 = function (e) {
        this.onPay(0);
    };
    FanLinPanel.prototype.onPay1 = function (e) {
        this.onPay(1);
    };
    FanLinPanel.prototype.onPay = function (index) {
        var state = this._stateList[index];
        if (state == 0) {
            var rdata = Recharge.ins().getRechargeData(0);
            if (!rdata || rdata.num != 2) {
                ViewManager.ins().open(Recharge1Win);
            }
            else {
                ViewManager.ins().open(ChargeFirstWin);
            }
        }
        else if (state == 1)
            Activity.ins().sendReward(this.activityID, index + 1);
    };
    FanLinPanel.prototype.setTime = function () {
        if (this._time > 0) {
            this._time -= 1;
            this.actTime1.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 4);
        }
    };
    return FanLinPanel;
}(BaseView));
__reflect(FanLinPanel.prototype, "FanLinPanel");
//# sourceMappingURL=FanLinPanel.js.map