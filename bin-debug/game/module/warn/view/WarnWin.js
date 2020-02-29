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
var WarnWin = (function (_super) {
    __extends(WarnWin, _super);
    function WarnWin() {
        return _super.call(this) || this;
    }
    WarnWin.show = function (str, func, thisObj, func2, thisObj2, statu, align) {
        if (func2 === void 0) { func2 = null; }
        if (thisObj2 === void 0) { thisObj2 = null; }
        if (statu === void 0) { statu = "normal"; }
        if (align === void 0) { align = "center"; }
        var rtn = UserWarn.ins().setWarnLabel(str, {
            "func": func, "thisObj": thisObj
        }, {
            "func2": func2, "thisObj2": thisObj2,
        }, statu, align);
        return rtn;
    };
    WarnWin.prototype.showUI = function (icon1, label1, icon2, label2) {
        this.leftGroup.visible = false;
        this.icon1.visible = false;
        this.label1.visible = false;
        this.rightGroup.visible = false;
        this.icon2.visible = false;
        this.label2.visible = false;
        if (icon1 || label1) {
            this.leftGroup.visible = true;
            if (icon1) {
                this.icon1.visible = true;
                this.icon1.source = icon1;
            }
            if (label1) {
                this.label1.visible = true;
                this.label1.text = label1;
            }
        }
        if (icon2 || label2) {
            this.rightGroup.visible = true;
            if (icon2) {
                this.icon2.visible = true;
                this.icon2.source = icon2;
            }
            if (label2) {
                this.label2.visible = true;
                this.label2.text = label2;
            }
        }
    };
    WarnWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "warnFrameSkin";
    };
    WarnWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.sureBtn, this.onTap);
        this.addTouchEvent(this.notBtn, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.addTouchEvent(this.cbx, this.onTap);
        this.cbx.selected = SysSetting.ins().getBool(SysSetting.DICE);
    };
    WarnWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.sureBtn, this.onTap);
        this.removeTouchEvent(this.notBtn, this.onTap);
        this.removeTouchEvent(this.bgClose, this.onTap);
        this.removeTouchEvent(this.cbx, this.onTap);
    };
    WarnWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.sureBtn:
                if (this.callBack.func != null)
                    this.callBack.func.call(this.callBack.thisObj);
                break;
            case this.notBtn:
            case this.bgClose:
                if (this.calback2.func2) {
                    this.calback2.func2.call(this.calback2.thisObj2);
                }
                break;
            case this.cbx:
                SysSetting.ins().setBool(SysSetting.DICE, e.currentTarget.selected);
                break;
        }
        if (e.currentTarget != this.cbx)
            ViewManager.ins().close(WarnWin);
    };
    Object.defineProperty(WarnWin.prototype, "isShowWin", {
        get: function () {
            return this._isShowWin;
        },
        set: function (bool) {
            if (this._isShowWin == bool)
                return;
            this._isShowWin = bool;
        },
        enumerable: true,
        configurable: true
    });
    WarnWin.prototype.setWarnLabel = function (str, callbackFunc, calbackFun2, statu, align) {
        if (calbackFun2 === void 0) { calbackFun2 = null; }
        if (statu === void 0) { statu = "normal"; }
        if (align === void 0) { align = "left"; }
        this.warnLabel.textFlow = TextFlowMaker.generateTextFlow(str);
        this.callBack = callbackFunc;
        this.calback2 = calbackFun2;
        this.currentState = statu;
        this.warnLabel.textAlign = align;
    };
    WarnWin.prototype.setBtnLabel = function (leftTxt, rightTxt) {
        if (leftTxt)
            this.sureBtn.label = leftTxt;
        if (rightTxt)
            this.notBtn.label = rightTxt;
    };
    return WarnWin;
}(BaseEuiView));
__reflect(WarnWin.prototype, "WarnWin");
ViewManager.ins().reg(WarnWin, LayerManager.UI_Popup);
//# sourceMappingURL=WarnWin.js.map