var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var JadeNew = (function (_super) {
    __extends(JadeNew, _super);
    function JadeNew() {
        var _this = _super.call(this) || this;
        _this.jadeData = [];
        _this.sysId = PackageID.JadeNew;
        _this.regNetMsg(1, _this.postJadeData);
        return _this;
    }
    JadeNew.ins = function () {
        return _super.ins.call(this);
    };
    JadeNew.prototype.postJadeData = function (bytes) {
        var roleID = bytes.readShort();
        var jade = this.jadeData[roleID];
        if (!jade) {
            jade = new JadeDataNew();
            this.jadeData[roleID] = jade;
        }
        jade.parser(bytes);
        return roleID;
    };
    JadeNew.prototype.sendUseDan = function (roleID, itemID) {
        var bytes = this.getBytes(2);
        bytes.writeShort(roleID);
        bytes.writeInt(itemID);
        this.sendToServer(bytes);
    };
    JadeNew.prototype.sendUpgrade = function (roleID, itemID) {
        var bytes = this.getBytes(3);
        bytes.writeShort(roleID);
        bytes.writeInt(itemID);
        this.sendToServer(bytes);
    };
    JadeNew.prototype.getJadeDataByID = function (roleID) {
        if (!this.jadeData || !this.jadeData.length)
            return null;
        return this.jadeData[roleID];
    };
    JadeNew.prototype.isJadeMax = function (roleID) {
        var jadeData = this.getJadeDataByID(roleID);
        if (!jadeData)
            return false;
        return jadeData.lv >= Object.keys(GlobalConfig.JadePlateLevelConfig).length - 1;
    };
    JadeNew.prototype.checkRed = function () {
        for (var i = 0; i < 3; i++) {
            if (this.checkRedByRoleID(i))
                return true;
        }
        return false;
    };
    JadeNew.prototype.checkOpen = function () {
        if (Actor.level < GlobalConfig.JadePlateBaseConfig.openlv)
            return false;
        if (GameServer.serverOpenDay < GlobalConfig.JadePlateBaseConfig.openDay - 1)
            return false;
        return true;
    };
    JadeNew.prototype.checkRedByRoleID = function (roleID) {
        if (!this.checkOpen())
            return false;
        if (!SubRoles.ins().getSubRoleByIndex(roleID))
            return false;
        var jadeData = this.getJadeDataByID(roleID);
        if (!jadeData)
            return false;
        if (this.isJadeMax(roleID))
            return false;
        var level = jadeData.lv;
        var itemData;
        var addExp = 0;
        for (var key in GlobalConfig.JadePlateBaseConfig.itemInfo) {
            itemData = UserBag.ins().getBagItemById(+key);
            addExp += ((+GlobalConfig.JadePlateBaseConfig.itemInfo[key]) * (itemData ? itemData.count : 0));
        }
        if ((addExp + jadeData.exp) >= GlobalConfig.JadePlateLevelConfig[level].exp)
            return true;
        var lvCfg;
        var phase = Math.floor(level / GlobalConfig.JadePlateBaseConfig.perLevel) + 1;
        var used = 0, count = 0, curMax = 0;
        for (var key in GlobalConfig.JadePlateBaseConfig.upgradeInfo) {
            itemData = UserBag.ins().getBagItemById(+key);
            count = itemData ? itemData.count : 0;
            used = jadeData.danDate && jadeData.danDate[key] ? (+jadeData.danDate[key]) : 0;
            lvCfg = GlobalConfig.JadePlateLevelConfig[(phase - 1) * GlobalConfig.JadePlateBaseConfig.perLevel];
            curMax = lvCfg.upgradeItemInfo && lvCfg.upgradeItemInfo[key] ? (+lvCfg.upgradeItemInfo[key]) : 0;
            if (used < curMax && count)
                return true;
        }
        return false;
    };
    JadeNew.prototype.getSkillsByLv = function (lv) {
        var phase = Math.floor(lv / GlobalConfig.JadePlateBaseConfig.perLevel) + 1;
        var cfg = GlobalConfig.JadePlateLevelConfig[(phase - 1) * GlobalConfig.JadePlateBaseConfig.perLevel];
        var skillLen = cfg.skillIdList ? cfg.skillIdList.length : 0;
        if (skillLen <= 0)
            return null;
        var len = GlobalConfig.JadePlateBaseConfig.skillUnlock.length;
        var skillList = [];
        var skillID;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < skillLen; j++) {
                skillID = cfg.skillIdList[j];
                if (skillID == GlobalConfig.JadePlateBaseConfig.skillUnlock[i].id && skillID > 100)
                    skillList.push(skillID);
            }
        }
        return skillList.length ? skillList : null;
    };
    return JadeNew;
}(BaseSystem));
__reflect(JadeNew.prototype, "JadeNew");
var GameSystem;
(function (GameSystem) {
    GameSystem.jadeNew = JadeNew.ins.bind(JadeNew);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=JadeNew.js.map