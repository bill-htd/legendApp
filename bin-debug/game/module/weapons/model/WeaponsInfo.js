var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WeaponsInfo = (function () {
    function WeaponsInfo() {
        this.id = 0;
        this.level = 0;
        this.costItem = 0;
        this.costNum = 0;
        this.showlv = 0;
        this.assault = 0;
        this.icon = "";
        this.name = "";
        this.attr = [];
        this.ex_attr = [];
    }
    WeaponsInfo.prototype.setInfo = function (slot, lv) {
        if (slot > 0 && lv > 0) {
            var wConfig = GlobalConfig.WeaponSoulPosConfig[slot][lv];
            if (!wConfig)
                return;
            this.id = wConfig.id;
            this.level = wConfig.level;
            this.costItem = wConfig.costItem;
            this.costNum = wConfig.costNum;
            this.showlv = wConfig.showlv;
            this.assault = wConfig.assault;
            this.icon = wConfig.icon;
            this.name = wConfig.name;
            this.attr = wConfig.attr;
            this.ex_attr = wConfig.ex_attr;
        }
    };
    return WeaponsInfo;
}());
__reflect(WeaponsInfo.prototype, "WeaponsInfo");
//# sourceMappingURL=WeaponsInfo.js.map