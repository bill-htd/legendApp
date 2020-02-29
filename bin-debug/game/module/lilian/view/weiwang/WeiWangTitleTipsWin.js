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
var WeiWangTitleTipsWin = (function (_super) {
    __extends(WeiWangTitleTipsWin, _super);
    function WeiWangTitleTipsWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "WeiWangTitleTipsSkin";
        return _this;
    }
    WeiWangTitleTipsWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onOtherClose);
        this.title.source = args[0].res;
        this.content.textFlow = TextFlowMaker.generateTextFlow1(args[0].des);
    };
    WeiWangTitleTipsWin.prototype.close = function () {
        this.removeTouchEvent(this.bgClose, this.onOtherClose);
    };
    WeiWangTitleTipsWin.prototype.onOtherClose = function (e) {
        ViewManager.ins().close(this);
    };
    return WeiWangTitleTipsWin;
}(BaseEuiView));
__reflect(WeiWangTitleTipsWin.prototype, "WeiWangTitleTipsWin");
ViewManager.ins().reg(WeiWangTitleTipsWin, LayerManager.UI_Popup);
//# sourceMappingURL=WeiWangTitleTipsWin.js.map