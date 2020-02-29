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
var MonthCardIconRule = (function (_super) {
    __extends(MonthCardIconRule, _super);
    function MonthCardIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.firstTap = true;
        _this.showMessage = [
            Actor.ins().postLevelChange,
            UserExpGold.ins().postExpUpdate
        ];
        return _this;
    }
    MonthCardIconRule.prototype.checkShowIcon = function () {
        var b = true;
        if (Recharge.ins().monthDay > 0 && Recharge.ins().franchise > 0) {
            b = false;
        }
        return OpenSystem.ins().checkSysOpen(SystemType.MONTHCARD) && b;
    };
    MonthCardIconRule.prototype.checkShowRedPoint = function () {
        return 0;
    };
    MonthCardIconRule.prototype.getEffName = function (redPointNum) {
        if (this.firstTap) {
            this.effX = 38;
            this.effY = 38;
            return "actIconCircle";
        }
        return undefined;
    };
    MonthCardIconRule.prototype.tapExecute = function () {
        var index = 2;
        if (Recharge.ins().monthDay > 0)
            index = 3;
        ViewManager.ins().open(FuliWin, index);
        this.firstTap = false;
        this.update();
    };
    return MonthCardIconRule;
}(RuleIconBase));
__reflect(MonthCardIconRule.prototype, "MonthCardIconRule");
//# sourceMappingURL=MonthCardIconRule.js.map