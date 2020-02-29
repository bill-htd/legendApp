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
var GodWeaponIconRule = (function (_super) {
    __extends(GodWeaponIconRule, _super);
    function GodWeaponIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.showMessage = [
            UserZs.ins().postZsLv,
            Actor.ins().postLevelChange,
            GameApp.ins().postZeroInit
        ];
        _this.updateMessage = [
            GodWeaponRedPoint.ins().postGodWeapon,
        ];
        return _this;
    }
    GodWeaponIconRule.prototype.checkShowRedPoint = function () {
        var num = GodWeaponRedPoint.ins().godWeaponRed ? 1 : 0;
        return num;
    };
    GodWeaponIconRule.prototype.checkShowIcon = function () {
        if (Actor.level >= GlobalConfig.GodWeaponBaseConfig.noticeOpenLv && (GameServer.serverOpenDay >= GlobalConfig.GodWeaponBaseConfig.openDay)) {
            return true;
        }
        else {
            return false;
        }
    };
    GodWeaponIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(GodWeaponWin);
    };
    return GodWeaponIconRule;
}(RuleIconBase));
__reflect(GodWeaponIconRule.prototype, "GodWeaponIconRule");
//# sourceMappingURL=GodWeaponIconRule.js.map