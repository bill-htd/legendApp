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
var BookRedPoint = (function (_super) {
    __extends(BookRedPoint, _super);
    function BookRedPoint() {
        var _this = _super.call(this) || this;
        _this.canLvlUp = false;
        _this.registerOpen(Actor.ins().postLevelChange, UserZs.ins().postZsData);
        _this.registerTab(0, Book.ins().postDataChange, UserBag.ins().postItemAdd, GameLogic.ins().postSubRoleChange);
        _this.registerTab(1, Book.ins().postDataChange, UserBag.ins().postItemAdd);
        _this.associated(_this.postLvlUp, Book.ins().postDataChange);
        return _this;
    }
    BookRedPoint.ins = function () {
        return _super.ins.call(this);
    };
    BookRedPoint.prototype.postLvlUp = function () {
        var oldv = this.canLvlUp;
        this.canLvlUp = Book.ins().getBookUpRed();
        return oldv != this.canLvlUp;
    };
    BookRedPoint.prototype.getTabRedPoint = function (tab) {
        if (tab == 0) {
            return Book.ins().getBookRed();
        }
        else if (tab == 1) {
            return Book.ins().checkResolveRedPoint();
        }
        else if (tab == 2) {
            return Book.ins().getBookUpRed();
        }
        return false;
    };
    BookRedPoint.prototype.getIsOpen = function () {
        return LiLian.ins().checkBookOpen();
    };
    return BookRedPoint;
}(RedPointBase));
__reflect(BookRedPoint.prototype, "BookRedPoint");
var GameSystem;
(function (GameSystem) {
    GameSystem.bookRedPoint = BookRedPoint.ins.bind(BookRedPoint);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=BookRedPoint.js.map