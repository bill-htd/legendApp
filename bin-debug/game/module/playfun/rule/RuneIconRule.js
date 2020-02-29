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
var RuneIconRule = (function (_super) {
    __extends(RuneIconRule, _super);
    function RuneIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.showMessage = [
            UserZs.ins().postZsData,
        ];
        return _this;
    }
    RuneIconRule.prototype.checkShowIcon = function () {
        var otherCfg = RuneConfigMgr.ins().getOtherCfg();
        return UserZs.ins().lv >= otherCfg.zsLevel;
    };
    RuneIconRule.prototype.getEffName = function () {
        return undefined;
    };
    RuneIconRule.prototype.tapExecute = function () {
        var otherCfg = RuneConfigMgr.ins().getOtherCfg();
        var isOpen = UserZs.ins().lv >= otherCfg.zsLevel;
        if (!isOpen) {
            UserTips.ins().showTips(otherCfg.zsLevel + "\u8F6C\u5F00\u542F\u6218\u7EB9\u7CFB\u7EDF");
            return;
        }
        ViewManager.ins().open(RuneWin);
    };
    return RuneIconRule;
}(RuleIconBase));
__reflect(RuneIconRule.prototype, "RuneIconRule");
//# sourceMappingURL=RuneIconRule.js.map