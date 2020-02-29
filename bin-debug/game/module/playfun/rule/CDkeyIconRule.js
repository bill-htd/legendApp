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
var CDkeyIconRule = (function (_super) {
    __extends(CDkeyIconRule, _super);
    function CDkeyIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.showMessage = [
            Actor.ins().postLevelChange,
            UserFb.ins().postGuanqiaInfo,
            UserFb.ins().postGuanKaIdChange,
        ];
        _this.updateMessage = [
            UserFuLi.ins().postMoneyInfoChange,
            Notice.ins().postGameNotice,
            DailyCheckIn.ins().postCheckInData,
            Activity.ins().postSevendayIsAwards,
            Recharge.ins().postFranchiseInfo,
            Activity.ins().postActivityIsGetAwards
        ];
        return _this;
    }
    CDkeyIconRule.prototype.checkShowIcon = function () {
        return OpenSystem.ins().checkSysOpen(SystemType.FULI);
    };
    CDkeyIconRule.prototype.checkShowRedPoint = function () {
        if (DailyCheckIn.ins().showRedPoint() || Activity.ins().getSevenDayStast() || (Recharge.ins().franchise && Recharge.ins().franchiseget) || Activity.ins().checkNoticeRed()) {
            return 1;
        }
        return 0;
    };
    CDkeyIconRule.prototype.getEffName = function (redPointNum) {
        return undefined;
    };
    CDkeyIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(FuliWin);
        this.update();
    };
    return CDkeyIconRule;
}(RuleIconBase));
__reflect(CDkeyIconRule.prototype, "CDkeyIconRule");
//# sourceMappingURL=CDkeyIconRule.js.map