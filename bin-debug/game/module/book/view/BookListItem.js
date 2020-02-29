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
var BookListItem = (function (_super) {
    __extends(BookListItem, _super);
    function BookListItem() {
        var _this = _super.call(this) || this;
        _this.isShow = false;
        _this.skinName = "TujiandaanniuSkin";
        _this.init();
        return _this;
    }
    BookListItem.prototype.init = function () {
        this.label.touchEnabled = false;
    };
    BookListItem.prototype.destruct = function () {
    };
    BookListItem.prototype.dataChanged = function () {
        var data = this.data;
        this.label.text = "" + data.name;
        this.btnName.source = data.icon;
        this.idList = data.idList;
        this.checkRedPoint();
    };
    BookListItem.prototype.checkRedPoint = function () {
        for (var _i = 0, _a = this.idList; _i < _a.length; _i++) {
            var k = _a[_i];
            if (Book.ins().getBookUpRedByListId(k) || Book.ins().getSuitRedPoint(k)) {
                this.redPoint.visible = true;
                return;
            }
        }
        this.redPoint.visible = false;
    };
    return BookListItem;
}(BaseItemRender));
__reflect(BookListItem.prototype, "BookListItem");
//# sourceMappingURL=BookListItem.js.map