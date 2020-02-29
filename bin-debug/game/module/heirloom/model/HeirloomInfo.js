var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HeirloomInfo = (function () {
    function HeirloomInfo() {
        this.slot = 0;
        this.lv = 0;
        this.expend = { id: 0, count: 0 };
        this.attr = [];
        this.icon = 0;
        this.name = "";
        this.image = "";
        this.model = "";
        this.skillicon = "";
        this.skillname = "";
        this.skilldesc = "";
        this.attr_add = 0;
    }
    HeirloomInfo.prototype.setInfo = function (slot, lv) {
        if (slot > 0 && lv > 0) {
            var hleConfig = GlobalConfig.HeirloomEquipConfig[slot][lv];
            Assert(hleConfig, "HeirloomInfo setInfo error! slot:" + slot + ",lv:" + lv);
            this.slot = hleConfig.slot;
            this.lv = hleConfig.lv;
            this.expend = hleConfig.expend;
            this.attr = hleConfig.attr;
            this.icon = hleConfig.icon;
            this.name = hleConfig.name;
            this.image = hleConfig.image;
            this.model = hleConfig.model;
            this.skillicon = hleConfig.skillicon;
            this.skillname = hleConfig.skillname;
            this.skilldesc = hleConfig.skilldesc;
            this.attr_add = hleConfig.attr_add;
        }
    };
    return HeirloomInfo;
}());
__reflect(HeirloomInfo.prototype, "HeirloomInfo");
//# sourceMappingURL=HeirloomInfo.js.map