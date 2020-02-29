var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WeaponSoulConfig = (function () {
    function WeaponSoulConfig() {
        this.id = 1;
        this.name = "";
        this.actcond = [];
        this.inside = [];
        this.outside = [];
        this.pic = [];
        this.icon = "";
    }
    return WeaponSoulConfig;
}());
__reflect(WeaponSoulConfig.prototype, "WeaponSoulConfig");
//# sourceMappingURL=WeaponSoulConfig.js.map