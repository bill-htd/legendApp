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
var MonthCardWin = (function (_super) {
    __extends(MonthCardWin, _super);
    function MonthCardWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "MonthCardSkin";
        return _this;
    }
    MonthCardWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(Recharge.ins().postUpdateRecharge, this.setView);
        this.addTouchEvent(this.btn1, this.onTap);
        this.addTouchEvent(this.btn0, this.onTap);
        if (this.feng.visible) {
            this.btn1.visible = false;
            this.btn0.visible = false;
            this.xianshi1.visible = false;
            this.xianshi2.visible = false;
        }
        else {
            if (Recharge.ins().monthDay > 0) {
                TimerManager.ins().doTimer(1000, 0, this.setTimeLbel, this);
                this.setTimeLbel();
                this.btn1.visible = false;
                this.btn0.visible = false;
                this.xianshi1.visible = false;
                this.xianshi2.visible = false;
            }
            else {
                this.btn0.visible = true;
                TimerManager.ins().remove(this.setTimeLbel, this);
            }
            this.leftTime.visible = Recharge.ins().monthDay > 0 ? true : false;
            this.setView();
        }
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        var monthCardPriceInfo = window['getmonthCardPriceInfo']();
        if (monthCardPriceInfo[0].status != 1) {
            this.btn1.filters = [colorFlilter];
        }
    };
    MonthCardWin.prototype.setView = function () {
        this.first.visible = !Setting.ins().getValue(ClientSet.firstMonthCard);
    };
    MonthCardWin.prototype.setTimeLbel = function () {
        var endedTime = Recharge.ins().monthDay;
        var str = DateUtils.getFormatBySecond(endedTime, DateUtils.TIME_FORMAT_5, 1);
        str = "<font color='#35e62d'>\u5269\u4F59\u65F6\u95F4:" + str + "</font>";
        this.leftTime.textFlow = new egret.HtmlTextParser().parser(str);
    };
    MonthCardWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
        this.removeTouchEvent(this.btn1, this.onTap);
        this.removeTouchEvent(this.btn0, this.onTap);
        TimerManager.ins().remove(this.setTimeLbel, this);
    };
    MonthCardWin.prototype.onTap = function (e) {
        var monthCardPriceInfo = window['getmonthCardPriceInfo']();
        switch (e.currentTarget) {
            case this.btn1:
                if (monthCardPriceInfo[0].status != 1) {
                    WarnWin.show(monthCardPriceInfo[0].msg, function () { }, this, function () { }, this, 'sure');
                }
                else {
                    Recharge.ins().showReCharge(28, 2800, 0);
                }
                break;
            case this.btn0:
                Recharge.ins().showReCharge(100, 1, 1);
                break;
        }
    };
    return MonthCardWin;
}(BaseView));
__reflect(MonthCardWin.prototype, "MonthCardWin");
//# sourceMappingURL=MonthCardWin.js.map