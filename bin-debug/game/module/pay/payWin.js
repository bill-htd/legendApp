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
var payWin = (function (_super) {
    __extends(payWin, _super);
    function payWin() {
        var _this = _super.call(this) || this;
        _this.money = 0;
        _this.yuanbao = 0;
        _this.payType = 1;
        _this.isTopLevel = true;
        _this.skinName = "paySkin";
        return _this;
    }
    payWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.money = param[0].money;
        this.yuanbao = param[0].yuanbao;
        this.moneyNum.text = this.money + '元';
        this.addTouchEvent(this.WXbtn, this.onTap);
        this.addTouchEvent(this.ZFBbtn, this.onTap);
        this.addTouchEvent(this.Paybtn, this.sendPay);
        this.addTouchEvent(this.bgClose, this.onTap);
    };
    payWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.WXbtn, this.onTap);
        this.removeTouchEvent(this.ZFBbtn, this.onTap);
        this.removeTouchEvent(this.Paybtn, this.onTap);
        this.removeTouchEvent(this.bgClose, this.onTap);
        egret.Tween.removeTweens(this);
        this.removeObserve();
    };
    payWin.prototype.setType = function (num) {
        this.payType = num;
    };
    payWin.prototype.sendPay = function () {
        if (this.payType == 1) {
            WarnWin.show("正在拉起支付...\n如果长时间没有拉起支付页面，请重新拉取", function () { }, this);
            Pay.ins().sendPayStyte(this.money, this.payType, this.yuanbao);
        }
        else {
            WarnWin.show("微信支付目前正在调试中，请先用支付宝支付", function () { }, this);
        }
        ViewManager.ins().close(payWin);
    };
    payWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.WXbtn:
                this.setType(2);
                this.wxChoose.visible = true;
                this.zfbChoose.visible = false;
                break;
            case this.ZFBbtn:
                this.wxChoose.visible = false;
                this.zfbChoose.visible = true;
                this.setType(1);
                break;
            case this.bgClose:
                ViewManager.ins().close(payWin);
        }
    };
    return payWin;
}(BaseEuiView));
__reflect(payWin.prototype, "payWin");
ViewManager.ins().reg(payWin, LayerManager.UI_Popup);
//# sourceMappingURL=payWin.js.map