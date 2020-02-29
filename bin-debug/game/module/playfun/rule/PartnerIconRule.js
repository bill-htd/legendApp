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
var PartnerIconRule = (function (_super) {
    __extends(PartnerIconRule, _super);
    function PartnerIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.updateMessage = [
            Actor.ins().postLevelChange,
            GameLogic.ins().postSubRoleChange
        ];
        return _this;
    }
    PartnerIconRule.prototype.checkShowIcon = function () {
        return SubRoles.ins().subRolesLen < 3;
    };
    PartnerIconRule.prototype.checkShowRedPoint = function () {
        var count = SubRoles.ins().subRolesLen;
        var config = GlobalConfig.NewRoleConfig[count];
        if (!config)
            return 0;
        var lv = config.zsLevel ? UserZs.ins().lv : Actor.level;
        var configLv = config.zsLevel ? config.zsLevel : config.level;
        if (lv >= configLv || UserVip.ins().lv >= config.vip)
            return 1;
        return 0;
    };
    PartnerIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(NewRoleWin);
    };
    return PartnerIconRule;
}(RuleIconBase));
__reflect(PartnerIconRule.prototype, "PartnerIconRule");
//# sourceMappingURL=PartnerIconRule.js.map