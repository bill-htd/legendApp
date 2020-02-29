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
var StarItem = (function (_super) {
    __extends(StarItem, _super);
    function StarItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "StarItemSkin";
        return _this;
    }
    StarItem.prototype.isShow = function (num) {
        this.starImg.source = num ? "star2" : "";
    };
    StarItem.prototype.isShowFull = function (num) {
        this.fullStarImg.source = num ? "star1" : "";
    };
    return StarItem;
}(BaseView));
__reflect(StarItem.prototype, "StarItem");
//# sourceMappingURL=StarItem.js.map