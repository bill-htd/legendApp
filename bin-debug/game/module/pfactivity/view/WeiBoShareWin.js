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
var WeiBoShareWin = (function (_super) {
    __extends(WeiBoShareWin, _super);
    function WeiBoShareWin() {
        return _super.call(this) || this;
    }
    WeiBoShareWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "WeiboShareSkin";
        this.input.textDisplay.size = 16;
        this.input.textDisplay.lineSpacing = 0;
        this.input.textDisplay.multiline = true;
        this.input.textDisplay.wordWrap = true;
        this.input.textDisplay.height = 171;
        this.input.textDisplay.maxChars = 40;
    };
    WeiBoShareWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn1, this.onTap);
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.fxBtn, this.onTap);
    };
    WeiBoShareWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn1, this.onTap);
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.fxBtn, this.onTap);
    };
    WeiBoShareWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.fxBtn:
                if (this.input.text.length <= 0) {
                    UserTips.ins().showTips("请输入分享内容");
                    return;
                }
                window['weiboShare'](this.input.text, LocationProperty.openID, LocationProperty.openKey);
            case this.closeBtn1:
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
        }
    };
    return WeiBoShareWin;
}(BaseEuiView));
__reflect(WeiBoShareWin.prototype, "WeiBoShareWin");
ViewManager.ins().reg(WeiBoShareWin, LayerManager.UI_Popup);
//# sourceMappingURL=WeiBoShareWin.js.map