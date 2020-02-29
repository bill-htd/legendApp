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
var MallIconRule = (function (_super) {
    __extends(MallIconRule, _super);
    function MallIconRule(id, t) {
        if (t === void 0) { t = null; }
        var _this = _super.call(this, id, t) || this;
        _this.showMessage = [
            Actor.ins().postLevelChange,
            UserFb.ins().postGuanqiaInfo,
            UserFb.ins().postGuanKaIdChange,
        ];
        _this.updateMessage = [
            ShopRedPoint.ins().postShopRedPoint,
        ];
        return _this;
    }
    MallIconRule.prototype.checkShowIcon = function () {
        return OpenSystem.ins().checkSysOpen(SystemType.MALL);
    };
    MallIconRule.prototype.checkShowRedPoint = function () {
        if (ShopRedPoint.ins().shopRedPoint || !ShopRedPoint.ins().nfirstLogin) {
            return 1;
        }
        return 0;
    };
    MallIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(ShopWin);
        ShopRedPoint.ins().nfirstLogin = true;
        this.update();
    };
    return MallIconRule;
}(RuleIconBase));
__reflect(MallIconRule.prototype, "MallIconRule");
//# sourceMappingURL=MallIconRule.js.map