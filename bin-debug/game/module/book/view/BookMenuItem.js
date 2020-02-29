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
var BookMenuItem = (function (_super) {
    __extends(BookMenuItem, _super);
    function BookMenuItem() {
        var _this = _super.call(this) || this;
        _this.isShow = false;
        _this.skinName = "TujianzianniuSkin";
        _this.width = 160;
        _this.height = 50;
        _this.label.touchEnabled = false;
        return _this;
    }
    BookMenuItem.prototype.dataChanged = function () {
        this.itemData = GlobalConfig.SuitConfig[this.data][1];
        this.label.text = this.itemData.name;
        this.checkRedPoint();
    };
    BookMenuItem.prototype.checkRedPoint = function () {
        this.redPoint.visible = Book.ins().getSuitRedPoint(this.data);
    };
    BookMenuItem.prototype.show = function (b) {
        this.isShow = b;
        if (this.isShow) {
            this.currentState = "select";
        }
        else {
            this.currentState = "close";
        }
        this.validateNow();
        this.checkRedPoint();
    };
    return BookMenuItem;
}(BaseItemRender));
__reflect(BookMenuItem.prototype, "BookMenuItem");
//# sourceMappingURL=BookMenuItem.js.map