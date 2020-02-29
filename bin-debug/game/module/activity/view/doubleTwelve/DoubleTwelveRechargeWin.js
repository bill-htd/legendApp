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
var DoubleTwelveRechargeWin = (function (_super) {
    __extends(DoubleTwelveRechargeWin, _super);
    function DoubleTwelveRechargeWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "DTRechargeSkin";
        _this.isTopLevel = true;
        return _this;
    }
    DoubleTwelveRechargeWin.prototype.open = function () {
        var _this = this;
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
        this.observe(Recharge.ins().postUpdateRecharge, this.updateView);
        this.observe(Recharge.ins().postUpdateRechargeEx, this.updateView);
        this.observe(Activity.ins().postChangePage, this.updateView);
        this.observe(Activity.ins().postRewardResult, this.updateView);
        this.observe(Activity.ins().postActivityIsGetAwards, this.updateView);
        TimerManager.ins().doNext(function () { _this.updateView(); }, this);
    };
    DoubleTwelveRechargeWin.prototype.onRecharge = function (e) {
        var id = this.idAry[this.selectIndex];
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
            Activity.ins().sendReward(id, 1);
        }
    };
    DoubleTwelveRechargeWin.prototype.updateView = function () {
        this.idAry = Activity.ins().doubleTwelveRechargeIDAry;
        var data = Activity.ins().doubleTwelveRechargeData[this.idAry[0]];
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
        for (var i = 0; i < 3; i++) {
            this.setText(i);
        }
        if (this.selectIndex) {
            this.selectActivity(this.selectIndex);
        }
        else {
            this.selectActivity(0);
        }
    };
    DoubleTwelveRechargeWin.prototype.selectBtn = function (index) {
        this.select0.visible = false;
        this.select1.visible = false;
        this.select2.visible = false;
        this["select" + index].visible = true;
    };
    DoubleTwelveRechargeWin.prototype.selectActivity = function (index) {
        this.selectIndex = index;
        var activityId = this.idAry[index];
        var data = Activity.ins().doubleTwelveRechargeData[activityId];
        var needMoney = DoubleTwelveModel.ins().getNeedRecharge(activityId);
        this.rechargeCount.text = needMoney.toString();
        if (data.recrod > 0) {
            this.btn.visible = false;
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
        var cfg = GlobalConfig.ActivityType3Config[activityId][1];
        this.list.dataProvider = new ArrayCollection(cfg.rewards);
        this.selectBtn(index);
    };
    DoubleTwelveRechargeWin.prototype.setText = function (index) {
        var id = this.idAry[index];
        var cfg = GlobalConfig.ActivityType3Config[id][1];
        var val = cfg.val;
        if (index == 0) {
            val = Math.floor(val / 1000);
        }
        else {
            val = Math.floor(val / 10000);
            ;
        }
        this["count" + index].text = val.toString();
    };
    DoubleTwelveRechargeWin.prototype.onSelect = function (e) {
        var btn = e.target;
        var index = 0;
        if (btn == this.chooseBtn0) {
            index = 0;
        }
        else if (btn == this.chooseBtn1) {
            index = 1;
        }
        else {
            index = 2;
        }
        this.selectActivity(index);
    };
    DoubleTwelveRechargeWin.prototype.closeWin = function () {
        ViewManager.ins().close(this);
    };
    return DoubleTwelveRechargeWin;
}(BaseEuiView));
__reflect(DoubleTwelveRechargeWin.prototype, "DoubleTwelveRechargeWin");
ViewManager.ins().reg(DoubleTwelveRechargeWin, LayerManager.UI_Popup);
//# sourceMappingURL=DoubleTwelveRechargeWin.js.map