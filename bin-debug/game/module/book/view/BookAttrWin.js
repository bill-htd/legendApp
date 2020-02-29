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
var BookAttrWin = (function (_super) {
    __extends(BookAttrWin, _super);
    function BookAttrWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "tujianzonshuxin";
        _this.isTopLevel = true;
        _this.pown = BitmapNumber.ins().createNumPic(0, '8', 8);
        _this.pown.x = 56 + 169;
        _this.pown.y = 199 + 98 + 15;
        _this.addChild(_this.pown);
        return _this;
    }
    BookAttrWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.update();
        this.addTouchEvent(this.bgClose, this.onTop);
    };
    BookAttrWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    BookAttrWin.prototype.onTop = function () {
        ViewManager.ins().close(BookAttrWin);
    };
    BookAttrWin.prototype.update = function () {
        var str = "";
    };
    return BookAttrWin;
}(BaseEuiView));
__reflect(BookAttrWin.prototype, "BookAttrWin");
ViewManager.ins().reg(BookAttrWin, LayerManager.UI_Main);
//# sourceMappingURL=BookAttrWin.js.map