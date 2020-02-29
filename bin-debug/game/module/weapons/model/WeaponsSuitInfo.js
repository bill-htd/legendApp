var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WeaponsSuitInfo = (function () {
    function WeaponsSuitInfo() {
        this.id = 0;
        this.level = 0;
        this.attr = {};
        this.ex_attr = {};
    }
    WeaponsSuitInfo.prototype.setInfo = function (id) {
    };
    return WeaponsSuitInfo;
}());
__reflect(WeaponsSuitInfo.prototype, "WeaponsSuitInfo");
//# sourceMappingURL=WeaponsSuitInfo.js.map