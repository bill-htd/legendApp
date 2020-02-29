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
var WeiWangOverViewWin = (function (_super) {
    __extends(WeiWangOverViewWin, _super);
    function WeiWangOverViewWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "WeiWangOverViewSkin";
        return _this;
    }
    WeiWangOverViewWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.list.itemRenderer = WeiWangItemRender;
    };
    WeiWangOverViewWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onOtherClose);
        this.update();
    };
    WeiWangOverViewWin.prototype.close = function () {
        this.removeTouchEvent(this.bgClose, this.onOtherClose);
    };
    WeiWangOverViewWin.prototype.update = function () {
        var arr = [];
        var len = Object.keys(GlobalConfig.PrestigeLevel).length;
        for (var i = 1; i <= len; i++)
            arr.push(GlobalConfig.PrestigeLevel[i]);
        this.list.dataProvider = new eui.ArrayCollection(arr.reverse());
    };
    WeiWangOverViewWin.prototype.onOtherClose = function (e) {
        ViewManager.ins().close(this);
    };
    return WeiWangOverViewWin;
}(BaseEuiView));
__reflect(WeiWangOverViewWin.prototype, "WeiWangOverViewWin");
ViewManager.ins().reg(WeiWangOverViewWin, LayerManager.UI_Popup);
//# sourceMappingURL=WeiWangOverViewWin.js.map