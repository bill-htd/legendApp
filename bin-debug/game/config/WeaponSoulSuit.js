var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WeaponSoulSuit = (function () {
    function WeaponSoulSuit() {
        this.id = 0;
        this.level = 0;
        this.attr = [];
        this.ex_attr = [];
        this.skillname = "";
        this.skillicon = "";
        this.skilldesc = "";
    }
    return WeaponSoulSuit;
}());
__reflect(WeaponSoulSuit.prototype, "WeaponSoulSuit");
//# sourceMappingURL=WeaponSoulSuit.js.map