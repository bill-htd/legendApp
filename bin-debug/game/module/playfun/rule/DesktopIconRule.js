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
var DesktopIconRule = (function (_super) {
    __extends(DesktopIconRule, _super);
    function DesktopIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.showMessage = [
            PfActivity.ins().postGameDesktop
        ];
        return _this;
    }
    DesktopIconRule.prototype.checkShowIcon = function () {
        return OpenSystem.ins().checkSysOpen(SystemType.FOCUS) && !!PfActivity.ins().isShowGameDesktop;
    };
    DesktopIconRule.prototype.checkShowRedPoint = function () {
        return 0;
    };
    DesktopIconRule.prototype.tapExecute = function () {
        PfActivity.ins().saveGameDesktop();
    };
    return DesktopIconRule;
}(RuleIconBase));
__reflect(DesktopIconRule.prototype, "DesktopIconRule");
//# sourceMappingURL=DesktopIconRule.js.map