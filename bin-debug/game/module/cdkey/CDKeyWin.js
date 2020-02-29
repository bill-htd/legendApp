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
var CDKeyWin = (function (_super) {
    __extends(CDKeyWin, _super);
    function CDKeyWin() {
        return _super.call(this) || this;
    }
    CDKeyWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "CDkeySkin";
        this.input.maxChars = 28;
    };
    CDKeyWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.addTouchEvent(this.sendBtn, this.onTap);
    };
    CDKeyWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.closeBtn0, this.onTap);
        this.removeTouchEvent(this.sendBtn, this.onTap);
    };
    CDKeyWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
            case this.closeBtn0:
                ViewManager.ins().close(CDKeyWin);
                break;
            case this.sendBtn:
                CDKey.ins().sendCdkey(this.input.text);
                break;
        }
    };
    return CDKeyWin;
}(BaseEuiView));
__reflect(CDKeyWin.prototype, "CDKeyWin");
ViewManager.ins().reg(CDKeyWin, LayerManager.UI_Main);
//# sourceMappingURL=CDKeyWin.js.map