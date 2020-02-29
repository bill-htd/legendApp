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
var SuperVipIconRule = (function (_super) {
    __extends(SuperVipIconRule, _super);
    function SuperVipIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.showMessage = [
            UserVip.ins().postSuperVipData,
            Actor.ins().postLevelChange
        ];
        return _this;
    }
    SuperVipIconRule.prototype.checkShowIcon = function () {
        if (OpenSystem.ins().checkSysOpen(SystemType.SUPERVIP) && UserVip.ins().superVipData) {
            return UserVip.ins().superVipData.enabled;
        }
        return false;
    };
    SuperVipIconRule.prototype.checkShowRedPoint = function () {
        return 0;
    };
    SuperVipIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(SuperVipWin);
    };
    return SuperVipIconRule;
}(RuleIconBase));
__reflect(SuperVipIconRule.prototype, "SuperVipIconRule");
//# sourceMappingURL=SuperVipIconRule.js.map