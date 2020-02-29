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
var ExpGoldIconRule = (function (_super) {
    __extends(ExpGoldIconRule, _super);
    function ExpGoldIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.firstTap = true;
        _this.showMessage = _this.updateMessage = [
            UserVip.ins().postUpdateVipAwards
        ];
        return _this;
    }
    ExpGoldIconRule.prototype.checkShowIcon = function () {
        return (UserVip.ins().state >> 2 & 1) == 0;
    };
    ExpGoldIconRule.prototype.checkShowRedPoint = function () {
        var boo = (UserVip.ins().state >> 2 & 1) == 0 && UserVip.ins().lv >= 3;
        return boo ? 1 : 0;
    };
    ExpGoldIconRule.prototype.getEffName = function (redPointNum) {
        return undefined;
    };
    ExpGoldIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(Vip3Win);
        this.firstTap = false;
        this.update();
    };
    return ExpGoldIconRule;
}(RuleIconBase));
__reflect(ExpGoldIconRule.prototype, "ExpGoldIconRule");
//# sourceMappingURL=ExpGoldIconRule.js.map