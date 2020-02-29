var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WingsData = (function () {
    function WingsData() {
        this.openStatus = 0;
        this.clearTime = 0;
        this.aptitudeDan = 0;
        this.flyUpDan = 0;
    }
    WingsData.prototype.getEquipByIndex = function (index) {
        return this.equipdata[index];
    };
    Object.defineProperty(WingsData.prototype, "equipsLen", {
        get: function () {
            return this.equipdata.length;
        },
        enumerable: true,
        configurable: true
    });
    WingsData.prototype.parser = function (bytes) {
        this.parserBoost(bytes);
        this.parserOpenStatus(bytes);
        this.parserClearTime(bytes);
        this.parserDans(bytes);
    };
    WingsData.prototype.parserBoost = function (bytes) {
        this.lv = bytes.readInt();
        this.exp = bytes.readUnsignedInt();
    };
    WingsData.prototype.parserOpenStatus = function (bytes) {
        this.openStatus = bytes.readInt();
    };
    WingsData.prototype.parserClearTime = function (bytes) {
        this.clearTime = bytes.readUnsignedInt();
    };
    WingsData.prototype.parserDans = function (bytes) {
        this.aptitudeDan = bytes.readShort();
        this.flyUpDan = bytes.readShort();
    };
    WingsData.prototype.parserWingEqupip = function (bytes) {
        this.equipdata = [];
        var equip;
        for (var i = 0; i < 4; i++) {
            equip = new EquipsData();
            equip.parser(bytes);
            this.equipdata.push(equip);
        }
    };
    WingsData.prototype.getImgSource = function () {
        if (this.lv > Wing.WingMaxLv || this.lv < 0)
            return "";
        return GlobalConfig.WingLevelConfig[this.lv].appearance + "_png";
    };
    WingsData.getWingAllLevel = function () {
        var sumlevel = 0;
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            var data = SubRoles.ins().getSubRoleByIndex(i).wingsData;
            sumlevel += data.lv;
            if (data.openStatus)
                sumlevel += 1;
        }
        return sumlevel;
    };
    return WingsData;
}());
__reflect(WingsData.prototype, "WingsData");
//# sourceMappingURL=WingsData.js.map