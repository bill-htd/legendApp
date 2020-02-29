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
var WJBattleIconRule = (function (_super) {
    __extends(WJBattleIconRule, _super);
    function WJBattleIconRule(id, t) {
        return _super.call(this, id, t) || this;
    }
    WJBattleIconRule.prototype.checkShowIcon = function () {
        return WJBattlefieldSys.ins().isOpen;
    };
    WJBattleIconRule.prototype.checkShowRedPoint = function () {
        return KFBattleRedPoint.ins().redPoint1;
    };
    WJBattleIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(WJBattlefieldWin);
    };
    return WJBattleIconRule;
}(RuleIconBase));
__reflect(WJBattleIconRule.prototype, "WJBattleIconRule");
//# sourceMappingURL=WJBattleIconRule.js.map