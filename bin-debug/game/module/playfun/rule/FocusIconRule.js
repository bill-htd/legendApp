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
var FocusIconRule = (function (_super) {
    __extends(FocusIconRule, _super);
    function FocusIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.showMessage = [
            Actor.ins().postLevelChange,
            PfActivity.ins().postGuanZhu
        ];
        return _this;
    }
    FocusIconRule.prototype.checkShowIcon = function () {
        return OpenSystem.ins().checkSysOpen(SystemType.FOCUS) && PfActivity.ins().focusState == 0;
    };
    FocusIconRule.prototype.checkShowRedPoint = function () {
        return 1;
    };
    FocusIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(FocusWin);
    };
    return FocusIconRule;
}(RuleIconBase));
__reflect(FocusIconRule.prototype, "FocusIconRule");
//# sourceMappingURL=FocusIconRule.js.map