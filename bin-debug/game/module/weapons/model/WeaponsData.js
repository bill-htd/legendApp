var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WeaponsData = (function () {
    function WeaponsData() {
        var configIds = Object.keys(GlobalConfig.WeaponSoulConfig);
        this.WeaponsSoulInfoData = {};
        for (var i = 0; i < configIds.length; i++) {
            var index = configIds[i];
            var info = new WeaponsSoulInfo();
            this.WeaponsSoulInfoData[index] = info;
        }
        configIds = Object.keys(GlobalConfig.WeaponSoulPosConfig);
        this.WeaponsInfoData = {};
        for (var i = 0; i < configIds.length; i++) {
            var index = configIds[i];
            if (!this.WeaponsInfoData[index])
                this.WeaponsInfoData[index] = {};
        }
        this.WeaponsFlexibleInfoData = [];
        this.weaponsId = 0;
        this.flexibleCount = 0;
    }
    WeaponsData.prototype.getSuitConfig = function (id) {
        var winfos = this.getInfoData();
        var minLv = 0;
        var everyLv = false;
        var soulConfig = GlobalConfig.WeaponSoulConfig[id];
        for (var z = 0; z < soulConfig.actcond.length; z++) {
            var slot = soulConfig.actcond[z];
            everyLv = true;
            if (!Object.keys(winfos[slot]).length)
                everyLv = false;
            else
                for (var k in winfos[slot]) {
                    var info = winfos[slot][k];
                    if (z == 0)
                        minLv = info.level;
                    if (!info.level) {
                        everyLv = false;
                        break;
                    }
                    if (info.level <= minLv)
                        minLv = info.level;
                }
            if (!everyLv)
                break;
        }
        var suitConfig;
        if (everyLv) {
            var minSuitId = "";
            for (var i in GlobalConfig.WeaponSoulSuit[id]) {
                if (minLv >= Number(i))
                    minSuitId = i;
                else
                    break;
            }
            if (minSuitId)
                suitConfig = GlobalConfig.WeaponSoulSuit[id][minSuitId];
        }
        return suitConfig;
    };
    WeaponsData.prototype.getNextSuitConfig = function (id) {
        var curConfig = this.getSuitConfig(id);
        var nextConfig;
        if (!curConfig)
            curConfig = GlobalConfig.WeaponSoulSuit[id][0];
        for (var i in GlobalConfig.WeaponSoulSuit[id]) {
            if (GlobalConfig.WeaponSoulSuit[id][i].level > curConfig.level) {
                nextConfig = GlobalConfig.WeaponSoulSuit[id][i];
                break;
            }
        }
        return nextConfig;
    };
    WeaponsData.prototype.parser = function (bytes) {
        this.parserInfo(bytes);
        this.parserSoulInfo(bytes);
        this.parserWeaponFlexibleInfo(bytes);
    };
    WeaponsData.prototype.parserInfo = function (bytes) {
        var len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            var id = bytes.readShort();
            var level = bytes.readInt();
            this.WeaponsInfoData[id] = {};
            var info = new WeaponsInfo();
            info.setInfo(id, level);
            this.WeaponsInfoData[id][level] = info;
        }
    };
    WeaponsData.prototype.parserSoulInfo = function (bytes) {
        var len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            var id = bytes.readShort();
            this.WeaponsSoulInfoData[id].setSoulInfo(id);
        }
    };
    WeaponsData.prototype.parserWeaponFlexibleInfo = function (bytes) {
        var len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            var id = bytes.readShort();
            this.WeaponsFlexibleInfoData.push(id);
        }
        this.flexibleCount = bytes.readShort();
        if (this.flexibleCount)
            this.flexibleCount++;
    };
    WeaponsData.prototype.parserInfoOnly = function (bytes) {
        var id = bytes.readShort();
        var level = bytes.readInt();
        this.WeaponsInfoData[id] = {};
        var info = new WeaponsInfo();
        info.setInfo(id, level);
        this.WeaponsInfoData[id][level] = info;
    };
    WeaponsData.prototype.parserSoulInfoOnly = function (bytes, roleId) {
        var id = bytes.readShort();
        if (id > 0) {
            this.WeaponsSoulInfoData[id].setSoulInfo(id);
            var role = SubRoles.ins().getSubRoleByIndex(roleId);
            if (role) {
                var eff = this.WeaponsSoulInfoData[id].inside[role.job - 1];
                if (eff) {
                    ViewManager.ins().close(WeaponPanel);
                    Activationtongyong.show(0, this.WeaponsSoulInfoData[id].name, "new_duanzao_wepon1", true, function () {
                        var view = ViewManager.ins().getView(ForgeWin);
                        if (view && view.weaponsoul) {
                            ViewManager.ins().open(WeaponPanel, view.weaponsoul.roleId, view.weaponsoul.weaponId);
                        }
                    }, eff);
                }
            }
        }
    };
    WeaponsData.prototype.getRedPointBySuit = function (id) {
        var wsconfig = GlobalConfig.WeaponSoulConfig[id];
        if (!wsconfig)
            return false;
        if (!this.WeaponsSoulInfoData[id].id && this.IsActivityWeapon(id)) {
            return true;
        }
        for (var k in wsconfig.actcond) {
            var slot = wsconfig.actcond[k];
            var level = this.getInfoLevel(slot);
            var wspconfig = GlobalConfig.WeaponSoulPosConfig[slot][level];
            var need = wspconfig.costNum;
            var nextwspconfig = GlobalConfig.WeaponSoulPosConfig[slot][level + 1];
            if (!need || !nextwspconfig)
                continue;
            var itemData = UserBag.ins().getBagItemById(wspconfig.costItem);
            var costItemLen = itemData ? itemData.count : 0;
            if (costItemLen >= need)
                return true;
        }
        return this.IsHaveAndNotWear(id);
    };
    WeaponsData.prototype.IsHaveAndNotWear = function (id) {
        if (!this.weaponsId) {
            for (var i in this.WeaponsSoulInfoData) {
                var info = this.WeaponsSoulInfoData[i];
                if (id) {
                    if (id == info.id)
                        return true;
                }
                else {
                    if (info.id)
                        return true;
                }
            }
        }
        return false;
    };
    WeaponsData.prototype.getInfoLevel = function (id) {
        var level = 0;
        if (!this.WeaponsInfoData[id])
            return 0;
        for (var j in this.WeaponsInfoData[id]) {
            level = this.WeaponsInfoData[id][j].level;
            break;
        }
        return level;
    };
    WeaponsData.prototype.getSlotByInfo = function (id) {
        var wsinfo;
        if (!this.WeaponsInfoData[id])
            return wsinfo;
        for (var j in this.WeaponsInfoData[id]) {
            wsinfo = this.WeaponsInfoData[id][j];
            break;
        }
        return wsinfo;
    };
    WeaponsData.prototype.getWeapsInfoBySoulId = function (id) {
        var wsinfo = this.WeaponsSoulInfoData[id];
        return wsinfo;
    };
    WeaponsData.prototype.IsActivityWeapon = function (id) {
        var wsconfig = GlobalConfig.WeaponSoulConfig[id];
        if (wsconfig) {
            for (var i = 0; i < wsconfig.actcond.length; i++) {
                var slot = wsconfig.actcond[i];
                if (!CommonUtils.getObjectLength(this.WeaponsInfoData[slot]))
                    return false;
            }
            return true;
        }
        return false;
    };
    WeaponsData.prototype.getInfoData = function () {
        return this.WeaponsInfoData;
    };
    WeaponsData.prototype.getSoulInfoData = function () {
        return this.WeaponsSoulInfoData;
    };
    WeaponsData.prototype.getFlexibleData = function () {
        return this.WeaponsFlexibleInfoData;
    };
    return WeaponsData;
}());
__reflect(WeaponsData.prototype, "WeaponsData");
//# sourceMappingURL=WeaponsData.js.map