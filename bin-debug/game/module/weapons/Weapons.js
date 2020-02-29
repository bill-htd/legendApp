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
var Weapons = (function (_super) {
    __extends(Weapons, _super);
    function Weapons() {
        var _this = _super.call(this) || this;
        _this.sysId = PackageID.Weapons;
        _this.regNetMsg(0, _this.postWeaponsInfo);
        _this.regNetMsg(1, _this.postWeaponsUpLevel);
        _this.regNetMsg(2, _this.postWeaponsAct);
        _this.regNetMsg(3, _this.postWeaponsUse);
        _this.regNetMsg(4, _this.postWeaponsFlexibleAct);
        _this.regNetMsg(5, _this.postWeaponsFlexibleCount);
        return _this;
    }
    Weapons.ins = function () {
        return _super.ins.call(this);
    };
    Weapons.prototype.checkRedPoint = function (roleId) {
        if (!OpenSystem.ins().checkSysOpen(SystemType.WEAPONS)) {
            return false;
        }
        var role = SubRoles.ins().getSubRoleByIndex(roleId);
        for (var k in GlobalConfig.WeaponSoulConfig) {
            var wsconfig = GlobalConfig.WeaponSoulConfig[k];
            if (role.weapons.getRedPointBySuit(wsconfig.id))
                return true;
        }
        var fb = ForgeRedPoint.ins().getFlexibleRedPoint(roleId);
        if (fb)
            return true;
        var item = UserBag.ins().getBagItemById(GlobalConfig.WeaponSoulBaseConfig.itemid);
        if (item && role.weapons.flexibleCount - 1 < GlobalConfig.WeaponSoulBaseConfig.maxItemNum)
            return true;
        return false;
    };
    Weapons.prototype.checkIsUseFlexible = function (roleId, id) {
        var role = SubRoles.ins().getSubRoleByIndex(roleId);
        if (role.weapons.getFlexibleData().indexOf(id) != -1) {
            return true;
        }
        return false;
    };
    Weapons.prototype.sendWeaponsUpLevel = function (roleId, slot) {
        var bytes = this.getBytes(1);
        bytes.writeByte(roleId);
        bytes.writeShort(slot);
        this.sendToServer(bytes);
    };
    Weapons.prototype.sendWeaponsAct = function (roleId, weaponId) {
        var bytes = this.getBytes(2);
        bytes.writeByte(roleId);
        bytes.writeShort(weaponId);
        this.sendToServer(bytes);
    };
    Weapons.prototype.sendWeaponsUse = function (roleId, weaponId) {
        var bytes = this.getBytes(3);
        bytes.writeByte(roleId);
        bytes.writeShort(weaponId);
        this.sendToServer(bytes);
    };
    Weapons.prototype.sendWeaponsFlexibleAct = function (roleId, control, weaponId) {
        var bytes = this.getBytes(4);
        bytes.writeByte(roleId);
        bytes.writeByte(control);
        bytes.writeShort(weaponId);
        this.sendToServer(bytes);
    };
    Weapons.prototype.sendWeaponsFlexibleCount = function (roleId) {
        var bytes = this.getBytes(5);
        bytes.writeByte(roleId);
        this.sendToServer(bytes);
    };
    Weapons.prototype.postWeaponsInfo = function (bytes) {
        var roleId = bytes.readUnsignedByte();
        var role = SubRoles.ins().getSubRoleByIndex(roleId);
        role.weapons.parser(bytes);
    };
    Weapons.prototype.postWeaponsUpLevel = function (bytes) {
        var roleId = bytes.readUnsignedByte();
        var role = SubRoles.ins().getSubRoleByIndex(roleId);
        role.weapons.parserInfoOnly(bytes);
    };
    Weapons.prototype.postWeaponsAct = function (bytes) {
        var roleId = bytes.readUnsignedByte();
        var role = SubRoles.ins().getSubRoleByIndex(roleId);
        role.weapons.parserSoulInfoOnly(bytes, roleId);
    };
    Weapons.prototype.postWeaponsUse = function (bytes) {
        var roleId = bytes.readUnsignedByte();
        var role = SubRoles.ins().getSubRoleByIndex(roleId);
        role.weapons.weaponsId = bytes.readShort();
        var mainRole = EntityManager.ins().getEntityByHandle(role.handle);
        if (mainRole)
            mainRole.updateModel();
    };
    Weapons.prototype.postWeaponsFlexibleAct = function (bytes) {
        var roleId = bytes.readUnsignedByte();
        var control = bytes.readUnsignedByte();
        var id = bytes.readShort();
        var role = SubRoles.ins().getSubRoleByIndex(roleId);
        var weapons = role.weapons.getFlexibleData();
        if (control == WeaponFlex.act) {
            if (weapons.indexOf(id) == -1)
                weapons.push(id);
        }
        else {
            for (var i = 0; i < weapons.length; i++) {
                if (weapons[i] == id) {
                    weapons.splice(i, 1);
                    break;
                }
            }
        }
    };
    Weapons.prototype.postWeaponsFlexibleCount = function (bytes) {
        var roleId = bytes.readByte();
        var flexibleCount = bytes.readShort();
        var role = SubRoles.ins().getSubRoleByIndex(roleId);
        if (role) {
            role.weapons.flexibleCount = flexibleCount ? (flexibleCount + 1) : 0;
        }
    };
    return Weapons;
}(BaseSystem));
__reflect(Weapons.prototype, "Weapons");
var WeaponFlex;
(function (WeaponFlex) {
    WeaponFlex[WeaponFlex["act"] = 0] = "act";
    WeaponFlex[WeaponFlex["cancel"] = 1] = "cancel";
})(WeaponFlex || (WeaponFlex = {}));
var GameSystem;
(function (GameSystem) {
    GameSystem.weapons = Weapons.ins.bind(Weapons);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=Weapons.js.map