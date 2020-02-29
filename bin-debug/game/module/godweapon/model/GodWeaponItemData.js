var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GodweaponItemData = (function () {
    function GodweaponItemData(id, count, quality) {
        this.id = id;
        this.count = count;
        this.quality = quality;
    }
    return GodweaponItemData;
}());
__reflect(GodweaponItemData.prototype, "GodweaponItemData");
//# sourceMappingURL=GodWeaponItemData.js.map