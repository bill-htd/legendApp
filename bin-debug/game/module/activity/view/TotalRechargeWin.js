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
var TotalRechargeWin = (function (_super) {
    __extends(TotalRechargeWin, _super);
    function TotalRechargeWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "DTRechargeSkin";
        _this.isTopLevel = true;
        return _this;
    }
    TotalRechargeWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.list.itemRenderer = DoubleTwelveRechargeItem;
        this.addTouchEvent(this.closeBtn, this.closeWin);
        this.addTouchEvent(this.bgClose, this.closeWin);
        this.addTouchEvent(this.chooseBtn0, this.onSelect);
        this.addTouchEvent(this.chooseBtn1, this.onSelect);
        this.addTouchEvent(this.chooseBtn2, this.onSelect);
        this.addTouchEvent(this.rechargeBtn, this.onRecharge);
        this.observe(Recharge.ins().postUpdateRecharge, this.update);
        this.observe(Recharge.ins().postUpdateRechargeEx, this.update);
        this.observe(Activity.ins().postChangePage, this.update);
        this.observe(Activity.ins().postRewardResult, this.update);
        this.observe(Activity.ins().postActivityIsGetAwards, this.update);
        this.updateView();
    };
    TotalRechargeWin.prototype.onRecharge = function (e) {
        if (this.recharge.visible) {
            var rdata = Recharge.ins().getRechargeData(0);
            if (!rdata || rdata.num != 2) {
                ViewManager.ins().open(Recharge1Win);
            }
            else {
                ViewManager.ins().open(ChargeFirstWin);
            }
        }
        else {
            Activity.ins().sendReward(this._activityId, this._index);
        }
    };
    TotalRechargeWin.prototype.update = function () {
        TimerManager.ins().remove(this.updateView, this);
        TimerManager.ins().doTimer(80, 1, this.updateView, this);
    };
    TotalRechargeWin.prototype.getActivityId = function () {
        var datas = Activity.ins().activityData;
        for (var i in datas) {
            if (datas[i].pageStyle == ActivityPageStyle.TOTALRECHARGE) {
                if (Activity.ins().getActivityDataById(datas[i].id).isOpenActivity() && !Activity.ins().getActivityDataById(datas[i].id).getHide()) {
                    return datas[i].id;
                }
            }
        }
        return 0;
    };
    TotalRechargeWin.prototype.updateView = function () {
        var id = this.getActivityId();
        this._activityId = id;
        var data = Activity.ins().getActivityDataById(id);
        var time = data.getLeftTime();
        var timedesc = Math.floor(time * 1000 / DateUtils.MS_PER_DAY);
        var desc;
        if (timedesc == 0) {
            timedesc = Math.floor(time * 1000 / (DateUtils.MS_PER_DAY / 24));
            desc = timedesc + "\u5C0F\u65F6";
        }
        else {
            desc = timedesc + "\u5929";
        }
        this.limitTime.text = "\u8DDD\u79BB\u6D3B\u52A8\u7ED3\u675F\u4EC5\u5269" + desc;
        for (var i = 1; i <= 3; i++) {
            this.setText(i);
        }
        var selectId = 1;
        var configs = GlobalConfig.ActivityType3Config[id];
        for (var i = 1; i <= 3; i++) {
            var config = configs[i];
            if (config.val > data.chongzhiTotal || ((data.recrod >> config.index) & 1) == 0) {
                selectId = i;
                break;
            }
        }
        this.selectActivity(selectId);
    };
    TotalRechargeWin.prototype.selectBtn = function (index) {
        this.select0.visible = false;
        this.select1.visible = false;
        this.select2.visible = false;
        this["select" + index].visible = true;
    };
    TotalRechargeWin.prototype.selectActivity = function (index) {
        var activityId = this._activityId;
        this._index = index;
        var data = Activity.ins().getActivityDataById(activityId);
        var config = GlobalConfig.ActivityType3Config[activityId][index];
        var needMoney = Math.max(0, config.val - data.chongzhiTotal);
        this.rechargeCount.text = needMoney.toString();
        if (((data.recrod >> index) & 1) == 1) {
            this.btn.visible = false;
            this.get.visible = false;
            this.recharge.visible = false;
        }
        else {
            this.btn.visible = true;
            if (needMoney > 0) {
                this.recharge.visible = true;
                this.get.visible = false;
            }
            else {
                this.recharge.visible = false;
                this.get.visible = true;
            }
        }
        this.list.dataProvider = new ArrayCollection(config.rewards);
        this.selectBtn(index - 1);
    };
    TotalRechargeWin.prototype.setText = function (index) {
        var id = this._activityId;
        var cfg = GlobalConfig.ActivityType3Config[id][index];
        var val = cfg.val;
        if (val >= 10000) {
            val = Math.floor(val / 10000);
            this["unit" + (index - 1)].source = "dt_wan";
        }
        else {
            val = Math.floor(val / 1000);
            this["unit" + (index - 1)].source = "dt_qian";
        }
        this["count" + (index - 1)].text = val.toString();
    };
    TotalRechargeWin.prototype.onSelect = function (e) {
        var btn = e.currentTarget;
        var index = 1;
        if (btn == this.chooseBtn0) {
            index = 1;
        }
        else if (btn == this.chooseBtn1) {
            index = 2;
        }
        else {
            index = 3;
        }
        this.selectActivity(index);
    };
    TotalRechargeWin.prototype.closeWin = function () {
        ViewManager.ins().close(this);
    };
    return TotalRechargeWin;
}(BaseEuiView));
__reflect(TotalRechargeWin.prototype, "TotalRechargeWin");
ViewManager.ins().reg(TotalRechargeWin, LayerManager.UI_Popup);
//# sourceMappingURL=TotalRechargeWin.js.map