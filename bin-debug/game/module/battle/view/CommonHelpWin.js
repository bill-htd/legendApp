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
var CommonHelpWin = (function (_super) {
    __extends(CommonHelpWin, _super);
    function CommonHelpWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "HelpTipsSkin";
        return _this;
    }
    CommonHelpWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEndEvent(this, this.otherClose);
        this.textInfo.textFlow = TextFlowMaker.generateTextFlow(param[0]);
        this.textInfo.height = this.textInfo.textHeight;
        this.background.height = this.textInfo.textHeight + 60;
        this.anigroup.y = (StageUtils.ins().getHeight() - this.background.height) / 2;
    };
    CommonHelpWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.otherClose, this);
    };
    CommonHelpWin.prototype.otherClose = function (evt) {
        ViewManager.ins().close(this);
    };
    return CommonHelpWin;
}(BaseEuiView));
__reflect(CommonHelpWin.prototype, "CommonHelpWin");
ViewManager.ins().reg(CommonHelpWin, LayerManager.UI_Popup);
//# sourceMappingURL=CommonHelpWin.js.map