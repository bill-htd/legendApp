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
var ExpFbResultWin = (function (_super) {
    __extends(ExpFbResultWin, _super);
    function ExpFbResultWin() {
        var _this = _super.call(this) || this;
        _this.s = 11;
        _this.skinName = "jyjiangli";
        _this.lbExp = BitmapNumber.ins().createNumPic(0, 'r0', 5);
        _this.lbExp.y = 97;
        _this.lbExp.x = 180;
        _this.mainGroup.addChild(_this.lbExp);
        return _this;
    }
    ExpFbResultWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.btnGet, this.onTouch);
        this.observe(UserFb.ins().postFbExpInfo, this.update);
        this.update();
        this.s = 9;
        this.btnGet.name = "\u524D\u5F80\u9886\u53D6";
        this.updateCloseBtnLabel();
        TimerManager.ins().doTimer(1000, this.s, this.updateCloseBtnLabel, this);
    };
    ExpFbResultWin.prototype.onTouch = function () {
        ViewManager.ins().close(this);
    };
    ExpFbResultWin.prototype.updateCloseBtnLabel = function () {
        this.s--;
        if (this.s <= 0)
            ViewManager.ins().close(this);
        this.btnGet.label = this.btnGet.name + "(" + this.s + "s)";
    };
    ExpFbResultWin.prototype.close = function () {
        this.removeObserve();
        TimerManager.ins().remove(this.updateCloseBtnLabel, this);
        ViewManager.ins().open(FbWin, 1);
        UserFb.ins().sendExitFb();
    };
    ExpFbResultWin.prototype.update = function () {
        var fbExp = UserFb.ins().fbExp;
        var config = GlobalConfig.ExpFubenConfig[fbExp.cid || fbExp.sid];
        if (config) {
            var discount = GlobalConfig.MonthCardConfig.expFubenPrecent / 100;
            var addValue = Recharge.ins().getIsForeve() ? 1 + discount : 1;
            this.setExp(Math.ceil(config.exp * addValue));
        }
    };
    ExpFbResultWin.prototype.setExp = function (exp) {
        BitmapNumber.ins().changeNum(this.lbExp, exp, "r0", 5);
        this.lbExp.anchorOffsetX = this.lbExp.width / 2;
    };
    return ExpFbResultWin;
}(BaseEuiView));
__reflect(ExpFbResultWin.prototype, "ExpFbResultWin");
ViewManager.ins().reg(ExpFbResultWin, LayerManager.UI_Popup);
//# sourceMappingURL=ExpFbResultWin.js.map