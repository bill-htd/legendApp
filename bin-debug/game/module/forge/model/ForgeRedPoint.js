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
var ForgeRedPoint = (function (_super) {
    __extends(ForgeRedPoint, _super);
    function ForgeRedPoint() {
        var _this = _super.call(this) || this;
        _this.roleTabs = {};
        _this.flexible = {};
        _this.tabs = {};
        _this.roleTabs = {};
        _this.flexible = {};
        _this.redPoint = false;
        _this.associated(_this.postForgeRedPoint, _this.postForgeBoostRedPoint, _this.postForgeZhulingRedPoint, _this.postForgeGemRedPoint, _this.postForgeWeaponRedPoint);
        _this.associated(_this.postForgeBoostRedPoint, UserForge.ins().postForgeUpdate, UserForge.ins().postForgeTips);
        _this.associated(_this.postForgeZhulingRedPoint, UserForge.ins().postForgeUpdate, UserForge.ins().postForgeTips);
        _this.associated(_this.postForgeGemRedPoint, UserForge.ins().postForgeUpdate, UserForge.ins().postForgeTips);
        _this.associated(_this.postForgeWeaponRedPoint, UserForge.ins().postForgeUpdate, UserForge.ins().postForgeTips, Weapons.ins().postWeaponsUse, Weapons.ins().postWeaponsFlexibleAct, Weapons.ins().postWeaponsInfo);
        return _this;
    }
    ForgeRedPoint.prototype.postForgeRedPoint = function () {
        var old = this.redPoint;
        this.redPoint = this.tabs[ForgeWin.Page_Select_Boost] ||
            this.tabs[ForgeWin.Page_Select_ZhuLing] ||
            this.tabs[ForgeWin.Page_Select_Gem] ||
            this.tabs[ForgeWin.Page_Select_Weapon];
        return old != this.redPoint;
    };
    ForgeRedPoint.prototype.getRedPoint = function (tab) {
        return this.tabs[tab];
    };
    ForgeRedPoint.prototype.getFlexibleRoleRedPoint = function (tab) {
        return this.flexible[tab];
    };
    ForgeRedPoint.prototype.postForgeBoostRedPoint = function () {
        var tab = ForgeWin.Page_Select_Boost;
        var old = this.tabs[tab];
        var b = false;
        var len = SubRoles.ins().subRolesLen;
        for (var roleIndex = 0; roleIndex < len; roleIndex++) {
            var role = SubRoles.ins().getSubRoleByIndex(roleIndex);
            var index = role.getMinEquipIndexByType(tab);
            var lv = role.getEquipByIndex(index).strengthen;
            var boostConfig = UserForge.ins().getEnhanceCostConfigByLv(lv + 1);
            if (boostConfig) {
                var costNum = boostConfig.stoneNum;
                if (costNum) {
                    var goodId = boostConfig.stoneId;
                    var goodsNum = UserBag.ins().getBagGoodsCountById(0, goodId);
                    if (goodsNum >= costNum) {
                        var isRed = UserForge.ins().isMaxForge(role, tab);
                        if (isRed) {
                            b = true;
                        }
                    }
                    if (!this.roleTabs[tab])
                        this.roleTabs[tab] = {};
                    this.roleTabs[tab][roleIndex] = goodsNum >= costNum;
                }
            }
        }
        this.tabs[tab] = b;
        return old != b;
    };
    ForgeRedPoint.prototype.postForgeZhulingRedPoint = function () {
        var tab = ForgeWin.Page_Select_ZhuLing;
        var old = this.tabs[tab];
        var b = false;
        var len = SubRoles.ins().subRolesLen;
        for (var roleIndex = 0; roleIndex < len; roleIndex++) {
            var role = SubRoles.ins().getSubRoleByIndex(roleIndex);
            var index = role.getMinEquipIndexByType(tab);
            var lv = role.getEquipByIndex(index).zhuling;
            var zhulingConfig = UserForge.ins().getZhulingCostConfigByLv(lv + 1);
            if (zhulingConfig) {
                var costNum = zhulingConfig.count;
                if (costNum) {
                    var goodId = zhulingConfig.itemId;
                    var goodsNum = UserBag.ins().getBagGoodsCountById(0, goodId);
                    if (goodsNum >= costNum) {
                        var isRed = UserForge.ins().isMaxForge(role, tab);
                        if (isRed) {
                            b = true;
                        }
                    }
                    if (!this.roleTabs[tab])
                        this.roleTabs[tab] = {};
                    this.roleTabs[tab][roleIndex] = goodsNum >= costNum;
                }
            }
        }
        this.tabs[tab] = b;
        return old != b;
    };
    ForgeRedPoint.prototype.postForgeGemRedPoint = function () {
        if (Actor.level < GlobalConfig.StoneOpenConfig[0].openLv)
            return false;
        var tab = ForgeWin.Page_Select_Gem;
        var old = this.tabs[tab];
        var b = false;
        var len = SubRoles.ins().subRolesLen;
        for (var roleIndex = 0; roleIndex < len; roleIndex++) {
            var role = SubRoles.ins().getSubRoleByIndex(roleIndex);
            var index = role.getMinEquipIndexByType(tab);
            var lv = role.getEquipByIndex(index).gem;
            var gemConfig = UserForge.ins().getStoneLevelCostConfigByLv(lv + 1);
            if (gemConfig) {
                var costNum = gemConfig.soulNum;
                if (costNum) {
                    var goodId = gemConfig.stoneId;
                    var goodsNum = Actor.soul;
                    if (goodsNum >= costNum) {
                        var isRed = UserForge.ins().isMaxForge(role, tab);
                        if (isRed) {
                            b = true;
                        }
                    }
                    if (!this.roleTabs[tab])
                        this.roleTabs[tab] = {};
                    this.roleTabs[tab][roleIndex] = goodsNum >= costNum;
                }
            }
        }
        this.tabs[tab] = b;
        return old != b;
    };
    ForgeRedPoint.prototype.postForgeWeaponRedPoint = function () {
        var tab = ForgeWin.Page_Select_Weapon;
        var ispost = false;
        var b = false;
        var len = SubRoles.ins().subRolesLen;
        for (var roleIndex = 0; roleIndex < len; roleIndex++) {
            var weapRedPoint = Weapons.ins().checkRedPoint(roleIndex);
            if (weapRedPoint)
                b = weapRedPoint;
            if (!this.roleTabs[tab])
                this.roleTabs[tab] = {};
            if (!ispost && this.roleTabs[tab][roleIndex] != weapRedPoint)
                ispost = true;
            var flexRedPoint = this.getFlexibleRedPoint(roleIndex);
            this.flexible[roleIndex] = flexRedPoint;
            this.roleTabs[tab][roleIndex] = weapRedPoint;
        }
        this.tabs[tab] = b;
        return ispost;
    };
    ForgeRedPoint.prototype.getFlexibleRedPointOnly = function (roleId, id) {
        var role = SubRoles.ins().getSubRoleByIndex(roleId);
        var fb = role.weapons.getFlexibleData();
        if (role.weapons.flexibleCount <= fb.length) {
            return false;
        }
        var ws = role.weapons.getSoulInfoData();
        var weaponsIds = [];
        for (var k in ws) {
            if (ws[k] && ws[k].id) {
                weaponsIds.push(ws[k].id);
            }
        }
        if (fb.indexOf(id) == -1) {
            return true;
        }
        return false;
    };
    ForgeRedPoint.prototype.getFlexibleRedPoint = function (i) {
        var role = SubRoles.ins().getSubRoleByIndex(i);
        var fb = role.weapons.getFlexibleData();
        if (role.weapons.flexibleCount <= fb.length) {
            return false;
        }
        var ws = role.weapons.getSoulInfoData();
        var weaponsIds = [];
        for (var k in ws) {
            if (ws[k] && ws[k].id) {
                weaponsIds.push(ws[k].id);
            }
        }
        for (var j = 0; j < weaponsIds.length; j++) {
            if (fb.indexOf(weaponsIds[j]) == -1) {
                return true;
            }
        }
        if (role.weapons.flexibleCount - 1 < GlobalConfig.WeaponSoulBaseConfig.maxItemNum)
            return true;
        return false;
    };
    return ForgeRedPoint;
}(BaseSystem));
__reflect(ForgeRedPoint.prototype, "ForgeRedPoint");
var GameSystem;
(function (GameSystem) {
    GameSystem.forgeredpoint = ForgeRedPoint.ins.bind(ForgeRedPoint);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=ForgeRedPoint.js.map