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
var KFIconRule = (function (_super) {
    __extends(KFIconRule, _super);
    function KFIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.showMessage = [
            UserZs.ins().postZsData,
        ];
        _this.updateMessage = [
            KFBattleRedPoint.ins().postRedPoint,
            DevildomRedPoint.ins().postRedPoint,
            KfArenaRedPoint.ins().postRedPoint
        ];
        return _this;
    }
    KFIconRule.prototype.checkShowIcon = function () {
        var boo = KFBossSys.ins().isOpen();
        return boo;
    };
    KFIconRule.prototype.checkShowRedPoint = function () {
        return KFBattleRedPoint.ins().redPoint || DevildomRedPoint.ins().redPoint || KfArenaRedPoint.ins().redpoint;
    };
    KFIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(KFBattleWin);
    };
    return KFIconRule;
}(RuleIconBase));
__reflect(KFIconRule.prototype, "KFIconRule");
//# sourceMappingURL=KFIconRule.js.map