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
var Recharge3Win = (function (_super) {
    __extends(Recharge3Win, _super);
    function Recharge3Win() {
        var _this = _super.call(this) || this;
        _this._oneDay = DateUtils.HOURS_PER_DAY * DateUtils.SECOND_PER_HOUR;
        _this.activityID = 20;
        _this.stateDic = {};
        _this.initUI();
        return _this;
    }
    Recharge3Win.prototype.initUI = function () {
        this.skinName = "TotalChargeActSkin";
        this.name = "累计充值";
        this.list.itemRenderer = TotalChargeActItem;
    };
    Recharge3Win.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.setWinData();
        this.observe(Recharge.ins().postUpdateRecharge, this.setWinData);
        this.addTouchEvent(this.recharge, this.onTabTouch);
    };
    Recharge3Win.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.recharge, this.onTabTouch);
        this.removeObserve();
    };
    Recharge3Win.prototype.onTabTouch = function (e) {
        switch (e.currentTarget) {
            case this.recharge:
                ViewManager.ins().open(ChargeFirstWin);
                break;
        }
    };
    Recharge3Win.prototype.setWinData = function () {
        this._data = Recharge.ins().getRechargeData(1);
        this.desc.text = "已累计充值" + this._data.num + "元宝";
        var config = GlobalConfig.ChongZhi2Config[((this._data.day / DateUtils.DAYS_PER_WEEK) >= 1) ? 2 : 1][this._data.day % 7];
        var dataArr = [];
        for (var k in config) {
            dataArr.push(config[k]);
            this.stateDic[config[k].index] = ((this._data.isAwards >> config[k].index) & 1);
        }
        dataArr = dataArr.sort(this.sort);
        this.list.dataProvider = new eui.ArrayCollection(dataArr);
        var times = GameServer.serverTime / 1000 - (new Date).getTimezoneOffset() * 60;
        if (times > this._oneDay)
            times -= this._oneDay;
        var endedTime = this._oneDay - times % this._oneDay;
        var hourst = Math.floor(endedTime / DateUtils.SECOND_PER_HOUR);
        var minst = Math.floor(endedTime % DateUtils.SECOND_PER_HOUR / 60);
        this.date.text = hourst + "\u65F6" + minst + "\u5206";
    };
    Recharge3Win.prototype.sort = function (a, b) {
        var s1 = a.pay;
        var s2 = b.pay;
        if (this.stateDic[a.index] == 0 && this.stateDic[b.index] == 1) {
            return -1;
        }
        else if (this.stateDic[a.index] == 1 && this.stateDic[b.index] == 0) {
            return 1;
        }
        if (s1 > s2)
            return 1;
        else if (s1 < s2)
            return -1;
        else
            return 0;
    };
    return Recharge3Win;
}(BaseView));
__reflect(Recharge3Win.prototype, "Recharge3Win");
ViewManager.ins().reg(Recharge3Win, LayerManager.UI_Main);
//# sourceMappingURL=Recharge3Win.js.map