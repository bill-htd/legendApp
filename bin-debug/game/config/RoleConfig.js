var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RoleConfig = (function () {
    function RoleConfig() {
        this.level = 0;
        this.job = 0;
        this.hp = 0;
        this.mp = 0;
        this.atk = 0;
        this.def = 0;
        this.res = 0;
        this.crit = 0;
        this.tough = 0;
        this.as = 0;
        this.ms = 0;
        this.acrit = 0;
    }
    return RoleConfig;
}());
__reflect(RoleConfig.prototype, "RoleConfig");
//# sourceMappingURL=RoleConfig.js.map