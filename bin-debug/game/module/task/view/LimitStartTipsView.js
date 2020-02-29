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
var LimitStartTipsView = (function (_super) {
    __extends(LimitStartTipsView, _super);
    function LimitStartTipsView() {
        var _this = _super.call(this) || this;
        _this.skinName = 'LimitStartTipsSkin';
        _this.isTopLevel = true;
        _this.name = "\u9650\u65F6\u4EFB\u52A1\u5F00\u59CB";
        return _this;
    }
    LimitStartTipsView.prototype.open = function () {
        this.addTouchEvent(this.btn, this.onStart);
    };
    LimitStartTipsView.prototype.close = function () {
        _super.prototype.close.call(this);
    };
    LimitStartTipsView.prototype.onStart = function () {
        ViewManager.ins().close(LimitStartTipsView);
        ViewManager.ins().open(LimitTaskView);
    };
    return LimitStartTipsView;
}(BaseEuiView));
__reflect(LimitStartTipsView.prototype, "LimitStartTipsView");
ViewManager.ins().reg(LimitStartTipsView, LayerManager.UI_Popup);
//# sourceMappingURL=LimitStartTipsView.js.map