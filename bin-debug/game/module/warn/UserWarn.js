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
var UserWarn = (function (_super) {
    __extends(UserWarn, _super);
    function UserWarn() {
        return _super.call(this) || this;
    }
    UserWarn.ins = function () {
        return _super.ins.call(this);
    };
    UserWarn.prototype.setWarnLabel = function (str, callBackFun, callBackFun2, statu, align) {
        if (statu === void 0) { statu = "normal"; }
        if (align === void 0) { align = "left"; }
        var rtn = ViewManager.ins().open(WarnWin);
        rtn.setWarnLabel(str, callBackFun, callBackFun2, statu, align);
        return rtn;
    };
    UserWarn.prototype.setBuyGoodsWarn = function (id, num) {
        if (num === void 0) { num = 1; }
        var rtn = ViewManager.ins().open(ShopGoodsWarn);
        rtn.setData(id, num);
        return rtn;
    };
    return UserWarn;
}(BaseSystem));
__reflect(UserWarn.prototype, "UserWarn");
var GameSystem;
(function (GameSystem) {
    GameSystem.userWarn = UserWarn.ins.bind(UserWarn);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=UserWarn.js.map