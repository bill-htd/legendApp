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
var ForgeTipsWin = (function (_super) {
    __extends(ForgeTipsWin, _super);
    function ForgeTipsWin() {
        return _super.call(this) || this;
    }
    ForgeTipsWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "forgeTips";
    };
    ForgeTipsWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.attr = param[0];
        this.attrStr = param[1];
        this.addTouchEndEvent(this, this.otherClose);
        this.attrTxt.text = this.attrStr;
        this.attrTxt0.text = "";
        for (var i = 0; i < this.attr.length; i++) {
            this.attrTxt0.text += this.attr[i] + ((i == this.attr.length - 1) ? "" : "\n");
        }
        this.background.height = this.attrTxt.textHeight + 60;
        this.group.y = this.group.height / 2 - this.background.height / 2;
    };
    ForgeTipsWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.otherClose, this);
    };
    ForgeTipsWin.prototype.otherClose = function (evt) {
        ViewManager.ins().close(this);
    };
    return ForgeTipsWin;
}(BaseEuiView));
__reflect(ForgeTipsWin.prototype, "ForgeTipsWin");
ViewManager.ins().reg(ForgeTipsWin, LayerManager.UI_Popup);
//# sourceMappingURL=ForgeTipsWin.js.map