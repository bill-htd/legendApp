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
var EffectivenessTip = (function (_super) {
    __extends(EffectivenessTip, _super);
    function EffectivenessTip() {
        var _this = _super.call(this) || this;
        _this.showType = 0;
        _this.skinName = "CheckEfficienSkin";
        return _this;
    }
    EffectivenessTip.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.showType = param[0] ? param[0] : 0;
        this.update();
        this.addTouchEvent(this, this.onTap);
        TimerManager.ins().doTimer(3000, 1, this.playTween, this);
    };
    EffectivenessTip.prototype.playTween = function () {
        var _this = this;
        if (this.showType || true) {
            var tt = egret.Tween.get(this.mainGroup);
            tt.to({ scaleX: 0, scaleY: 0, horizontalCenter: 170, top: 52 }, 500).call(function () {
                ViewManager.ins().close(_this);
            });
        }
        else {
            var t = egret.Tween.get(this);
            t.to({ "alpha": 0 }, 1000).call(function () {
                _this.alpha = 1;
                ViewManager.ins().close(_this);
            }, this);
        }
    };
    EffectivenessTip.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        UserFb.ins().showAni = false;
        this.removeTouchEvent(this, this.onTap);
        TimerManager.ins().remove(this.playTween, this);
        egret.Tween.removeTweens(this.mainGroup);
        egret.Tween.removeTweens(this);
    };
    EffectivenessTip.prototype.onTap = function (e) {
        this.removeTouchEvent(this, this.onTap);
        TimerManager.ins().remove(this.playTween, this);
        this.playTween();
    };
    EffectivenessTip.prototype.update = function () {
        var curId = UserFb.ins().guanqiaID;
        var lastID = curId - 1;
        if (UserFb.ins().expEff == UserFb.ins().expEffLast) {
            this.groupExp.visible = false;
        }
        else {
            this.groupExp.visible = true;
            this.curExp.text = UserFb.ins().expEffLast + "";
            this.nextExp.text = UserFb.ins().expEff + "";
        }
        if (UserFb.ins().goldEff == UserFb.ins().goldEffLast) {
            this.groupGold.visible = false;
        }
        else {
            this.groupGold.visible = true;
            this.curMoney.text = UserFb.ins().goldEffLast + "";
            this.nextMoney.text = UserFb.ins().goldEff + "";
        }
        if (this.showType) {
            this.groupGold.visible = this.groupExp.visible = false;
            this.groupInfoGold.visible = this.groupInfoExp.visible = true;
            this.nextInfoExp.text = UserFb.ins().expEff + "";
            this.nextInfoMoney.text = UserFb.ins().goldEff + "";
            this.descTxt.text = "关卡效率";
        }
        else {
            this.groupGold.visible = this.groupExp.visible = true;
            this.groupInfoGold.visible = this.groupInfoExp.visible = false;
            this.descTxt.text = "关卡效率提升";
        }
        if (UserFb.ins().doubleTime > 0) {
            this.doubleTime.visible = true;
            this.nextInfoExp.textColor = 0xF40909;
            TimerManager.ins().remove(this.updateNextHongBaoTime, this);
            TimerManager.ins().doTimer(1000, 0, this.updateNextHongBaoTime, this);
        }
        else {
            this.nextInfoExp.textColor = 0x20C020;
            this.doubleTime.visible = false;
        }
    };
    EffectivenessTip.prototype.updateNextHongBaoTime = function () {
        if (UserFb.ins().doubleTime > 0) {
            this.doubleTime.visible = true;
            UserFb.ins().doubleTime -= 1000;
            var str = DateUtils.getFormatBySecond(UserFb.ins().doubleTime / 1000, 9);
            this.endTime.text = str;
        }
        else {
            this.doubleTime.visible = false;
            TimerManager.ins().remove(this.updateNextHongBaoTime, this);
        }
    };
    return EffectivenessTip;
}(BaseEuiView));
__reflect(EffectivenessTip.prototype, "EffectivenessTip");
ViewManager.ins().reg(EffectivenessTip, LayerManager.UI_Main);
//# sourceMappingURL=EffectivenessTip.js.map