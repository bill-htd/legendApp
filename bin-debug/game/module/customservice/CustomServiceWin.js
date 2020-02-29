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
var CustomServiceWin = (function (_super) {
    __extends(CustomServiceWin, _super);
    function CustomServiceWin() {
        return _super.call(this) || this;
    }
    CustomServiceWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "CustomServiceSkin";
        this.defaultText = "点击输入咨询内容";
    };
    CustomServiceWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CustomServiceWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.input.textDisplay.size = 16;
        this.input.textDisplay.lineSpacing = 0;
        this.input.textDisplay.multiline = true;
        this.input.textDisplay.wordWrap = true;
        this.input.textDisplay.height = 335;
        if (this.input.text.length == 0) {
            this.input.text = this.defaultText;
            this.input.textColor = 0x6C6C6C;
        }
        else
            this.input.textColor = 0xDFD1B5;
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.addTouchEvent(this.sendBtn, this.onTap);
        this.input.addEventListener(egret.FocusEvent.FOCUS_IN, this.updateInput, this);
    };
    CustomServiceWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.closeBtn0, this.onTap);
        this.removeTouchEvent(this.sendBtn, this.onTap);
        this.input.removeEventListener(egret.FocusEvent.FOCUS_IN, this.updateInput, this);
    };
    CustomServiceWin.prototype.updateInput = function () {
        if (this.input.text == this.defaultText) {
            this.input.text = "";
            this.input.textColor = 0xDFD1B5;
        }
    };
    CustomServiceWin.prototype.onTap = function (e) {
        switch (e.target) {
            case this.closeBtn0:
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.sendBtn:
                if (this.input.text.length == 0 || this.input.text == this.defaultText) {
                    UserTips.ins().showTips("内容不能为空");
                    return;
                }
                ReportData.getIns().advice(this.input.text, this.callBack, this);
                break;
        }
    };
    CustomServiceWin.prototype.callBack = function () {
        this.input.text = "";
    };
    return CustomServiceWin;
}(BaseEuiView));
__reflect(CustomServiceWin.prototype, "CustomServiceWin");
ViewManager.ins().reg(CustomServiceWin, LayerManager.UI_Main);
//# sourceMappingURL=CustomServiceWin.js.map