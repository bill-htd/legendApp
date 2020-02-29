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
var BuySpecialWin = (function (_super) {
    __extends(BuySpecialWin, _super);
    function BuySpecialWin() {
        return _super.call(this) || this;
    }
    BuySpecialWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "BuySpecialSkin";
        this.num = 3;
    };
    BuySpecialWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.add1Btn, this.onTap);
        this.addTouchEvent(this.add10Btn, this.onTap);
        this.addTouchEvent(this.sub1Btn, this.onTap);
        this.addTouchEvent(this.sub10Btn, this.onTap);
        this.addTouchEvent(this.buyBtn, this.buy);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.addChangeEvent(this.numLabel, this.inputOver);
        this.num = 3;
        this.updateView();
    };
    BuySpecialWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.add1Btn, this.onTap);
        this.removeTouchEvent(this.add10Btn, this.onTap);
        this.removeTouchEvent(this.sub1Btn, this.onTap);
        this.removeTouchEvent(this.sub10Btn, this.onTap);
        this.removeTouchEvent(this.buyBtn, this.buy);
        this.removeTouchEvent(this.bgClose, this.onTap);
        this.numLabel.removeEventListener(egret.Event.CHANGE, this.inputOver, this);
    };
    BuySpecialWin.prototype.updateView = function () {
        this.numLabel.text = this.num + "";
        this.unitPrice.text = "" + GlobalConfig.GuardGodWeaponConf.sSummonCost[0];
        this.allPrice.text = (this.num * parseInt(this.unitPrice.text)) + "";
    };
    BuySpecialWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.sub10Btn:
                this.num -= 10;
                break;
            case this.sub1Btn:
                this.num -= 1;
                break;
            case this.add10Btn:
                this.num += 10;
                break;
            case this.add1Btn:
                this.num += 1;
                break;
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
        if (this.num < 0)
            this.num = 0;
        if (this.num > this.maxNum) {
            this.num = this.maxNum;
        }
        this.numLabel.text = this.num + "";
        this.inputOver();
    };
    BuySpecialWin.prototype.closeCB = function (e) {
        ViewManager.ins().close(BuyWin);
    };
    BuySpecialWin.prototype.buy = function (e) {
        if (Actor.yb >= parseInt(this.allPrice.text)) {
            UserFb.ins().sendShSweep(parseInt(this.numLabel.text));
            ViewManager.ins().close(this);
        }
        else {
            UserTips.ins().showTips("|C:0xf3311e&T:元宝不足|");
        }
    };
    BuySpecialWin.prototype.inputOver = function (e) {
        this.num = parseInt(this.numLabel.text);
        if (isNaN(this.num) || this.num < 0)
            this.num = 0;
        if (this.num > 3)
            this.num = 3;
        if (this.num > this.maxNum) {
            this.num = this.maxNum;
        }
        this.numLabel.text = this.num + "";
        this.allPrice.text = (this.num * parseInt(this.unitPrice.text)) + "";
    };
    return BuySpecialWin;
}(BaseEuiView));
__reflect(BuySpecialWin.prototype, "BuySpecialWin");
ViewManager.ins().reg(BuySpecialWin, LayerManager.UI_Popup);
//# sourceMappingURL=BuySpecialWin.js.map