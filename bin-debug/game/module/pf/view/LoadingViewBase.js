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
var LoadingView = (function (_super) {
    __extends(LoadingView, _super);
    function LoadingView() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    LoadingView.prototype.init = function () {
        this.text = new eui.Label;
        this.text.text = "资源加载中...";
        this.addChild(this.text);
    };
    LoadingView.prototype.setProgress = function (current, total) {
        this.text.text = "资源加载中..." + current + "/" + total;
    };
    return LoadingView;
}(BaseEuiView));
__reflect(LoadingView.prototype, "LoadingView");
//# sourceMappingURL=LoadingViewBase.js.map