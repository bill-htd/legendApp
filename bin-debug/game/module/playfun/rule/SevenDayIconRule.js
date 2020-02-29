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
var SevenDayIconRule = (function (_super) {
    __extends(SevenDayIconRule, _super);
    function SevenDayIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.firstTap = true;
        _this.showMessage = [
            Activity.ins().postSevendayIsAwards,
            Actor.ins().postLevelChange
        ];
        _this.updateMessage = [
            Activity.ins().postSevendayIsAwards,
        ];
        return _this;
    }
    SevenDayIconRule.prototype.checkShowIcon = function () {
        return Actor.level >= 10 && Activity.ins().getSevenDayLogIsVisible();
    };
    SevenDayIconRule.prototype.checkShowRedPoint = function () {
        return Activity.ins().getSevenDayStast() ? 1 : 0;
    };
    SevenDayIconRule.prototype.getEffName = function (redPointNum) {
        return undefined;
    };
    SevenDayIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(SevenDayLogWin);
        this.firstTap = false;
        this.update();
    };
    return SevenDayIconRule;
}(RuleIconBase));
__reflect(SevenDayIconRule.prototype, "SevenDayIconRule");
//# sourceMappingURL=SevenDayIconRule.js.map