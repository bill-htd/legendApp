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
var MaBiIconRule = (function (_super) {
    __extends(MaBiIconRule, _super);
    function MaBiIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.firstTap = true;
        _this.showMessage = [
            Actor.ins().postLevelChange,
            UserVip.ins().postUpdateVipAwards,
        ];
        _this.updateMessage = [
            UserVip.ins().postUpdataExp,
        ];
        return _this;
    }
    MaBiIconRule.prototype.checkShowIcon = function () {
        return OpenSystem.ins().checkSysOpen(SystemType.MABI) && !(UserVip.ins().state >> 2 & 1);
    };
    MaBiIconRule.prototype.checkShowRedPoint = function () {
        return UserVip.ins().lv >= 3 ? 1 : 0;
    };
    MaBiIconRule.prototype.getEffName = function (redPointNum) {
        if (this.firstTap) {
            this.effX = 38;
            this.effY = 38;
            return "actIconCircle";
        }
        return undefined;
    };
    MaBiIconRule.prototype.tapExecute = function () {
        this.firstTap = false;
        this.update();
        ViewManager.ins().open(Vip3MWin, 3);
    };
    return MaBiIconRule;
}(RuleIconBase));
__reflect(MaBiIconRule.prototype, "MaBiIconRule");
//# sourceMappingURL=MaBiIconRule.js.map