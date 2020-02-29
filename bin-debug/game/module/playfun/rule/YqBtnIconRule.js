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
var YqBtnIconRule = (function (_super) {
    __extends(YqBtnIconRule, _super);
    function YqBtnIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.showMessage = [
            PfActivity.ins().postInviteInfoUpdate
        ];
        return _this;
    }
    YqBtnIconRule.prototype.checkShowIcon = function () {
        var isOpen = true;
        if (PfActivity.ins().wxInviteCount >= 3) {
            isOpen = false;
        }
        return isOpen && YqBtnIconRule.isShowIcon;
    };
    YqBtnIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(YqWin);
    };
    YqBtnIconRule.isShowIcon = false;
    return YqBtnIconRule;
}(RuleIconBase));
__reflect(YqBtnIconRule.prototype, "YqBtnIconRule");
//# sourceMappingURL=YqBtnIconRule.js.map