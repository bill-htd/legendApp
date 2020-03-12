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
var FireResultWin = (function (_super) {
    __extends(FireResultWin, _super);
    function FireResultWin() {
        var _this = _super.call(this) || this;
        _this.s = 11;
        _this.skinName = "LYRFbResultSkin";
        _this.lbExp = BitmapNumber.ins().createNumPic(0, 'r0', 5);
        _this.lbExp.y = 103;
        _this.lbExp.x = 171;
        _this.mainGroup.addChild(_this.lbExp);
        return _this;
    }
    FireResultWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.btnGet, this.onTouch);
        this.s = 9;
        this.btnGet.name = "\u524D\u5F80\u9886\u53D6";
        this.updateCloseBtnLabel();
        this.setExp();
        TimerManager.ins().doTimer(1000, this.s, this.updateCloseBtnLabel, this);
    };
    FireResultWin.prototype.onTouch = function () {
        ViewManager.ins().close(this);
    };
    FireResultWin.prototype.updateCloseBtnLabel = function () {
        this.s--;
        if (this.s <= 0)
            ViewManager.ins().close(this);
        this.btnGet.label = this.btnGet.name + "(" + this.s + "s)";
    };
    FireResultWin.prototype.close = function () {
        this.removeObserve();
        TimerManager.ins().remove(this.updateCloseBtnLabel, this);
        ViewManager.ins().open(FireRingWin, 2);
        UserFb.ins().sendExitFb();
    };
    FireResultWin.prototype.setExp = function () {
        var exp = GlobalConfig.ActorExRingFubenConfig.reward[0].count;
        BitmapNumber.ins().changeNum(this.lbExp, exp, "r0", 5);
    };
    return FireResultWin;
}(BaseEuiView));
__reflect(FireResultWin.prototype, "FireResultWin");
ViewManager.ins().reg(FireResultWin, LayerManager.UI_Popup);
//# sourceMappingURL=FireResultWin.js.map