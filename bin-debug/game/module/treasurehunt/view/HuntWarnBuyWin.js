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
var HuntWarnBuyWin = (function (_super) {
    __extends(HuntWarnBuyWin, _super);
    function HuntWarnBuyWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "WarnBuySkin";
        _this.isTopLevel = true;
        return _this;
    }
    HuntWarnBuyWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.panel = args[0];
        this.callback = args[1];
        this.des = args[2];
        this.addTouchEndEvent(this, this.onTouch);
        this.update();
    };
    HuntWarnBuyWin.prototype.close = function () {
        this.panel = null;
        this.callback = null;
        this.removeTouchEvent(this, this.onTouch);
    };
    HuntWarnBuyWin.showBuyWarn = function (panel, callback, des) {
        if (HuntWarnBuyWin.loginRecords[panel] == true) {
            callback && callback();
        }
        else {
            ViewManager.ins().open(HuntWarnBuyWin, panel, callback, des);
        }
    };
    HuntWarnBuyWin.prototype.update = function () {
        this.tipsCheckbox.selected = false;
        this.desTxt.textFlow = TextFlowMaker.generateTextFlow(this.des);
    };
    HuntWarnBuyWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.noBtn:
            case this.BG:
                ViewManager.ins().close(this);
                break;
            case this.yesBtn:
                HuntWarnBuyWin.loginRecords[this.panel] = this.tipsCheckbox.selected;
                this.callback && this.callback();
                ViewManager.ins().close(this);
                break;
        }
    };
    HuntWarnBuyWin.loginRecords = {};
    return HuntWarnBuyWin;
}(BaseEuiView));
__reflect(HuntWarnBuyWin.prototype, "HuntWarnBuyWin");
ViewManager.ins().reg(HuntWarnBuyWin, LayerManager.UI_Main);
//# sourceMappingURL=HuntWarnBuyWin.js.map