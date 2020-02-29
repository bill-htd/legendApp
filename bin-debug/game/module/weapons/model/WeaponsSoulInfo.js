var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WeaponsSoulInfo = (function () {
    function WeaponsSoulInfo() {
        this.icon = "";
        this.id = 0;
        this.name = "";
        this.actcond = [];
        this.inside = [];
        this.outside = [];
        this.pic = [];
        this.icon = "";
    }
    WeaponsSoulInfo.prototype.setSoulInfo = function (id) {
        if (id > 0) {
            var wsConfig = GlobalConfig.WeaponSoulConfig[id];
            if (!wsConfig)
                return;
            this.id = wsConfig.id;
            this.name = wsConfig.name;
            this.actcond = wsConfig.actcond;
            this.inside = wsConfig.inside;
            this.outside = wsConfig.outside;
            this.pic = wsConfig.pic;
            this.icon = wsConfig.icon;
        }
    };
    return WeaponsSoulInfo;
}());
__reflect(WeaponsSoulInfo.prototype, "WeaponsSoulInfo");
//# sourceMappingURL=WeaponsSoulInfo.js.map