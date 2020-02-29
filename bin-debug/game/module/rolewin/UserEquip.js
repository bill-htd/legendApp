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
var UserEquip = (function (_super) {
    __extends(UserEquip, _super);
    function UserEquip() {
        var _this = _super.call(this) || this;
        _this.isFind = false;
        _this.sysId = PackageID.Equip;
        _this.regNetMsg(1, _this.doUpDataEquip);
        _this.regNetMsg(2, _this.postSmeltEquipComplete);
        _this.regNetMsg(3, _this.doGrewupEquipResult);
        _this.regNetMsg(4, _this.doGrewupEquipResult);
        _this.regNetMsg(5, _this.postAddSpirit);
        _this.regNetMsg(7, _this.postAddSoul);
        _this.regNetMsg(8, _this.postZhiZunUpgrade);
        _this.observe(UserBag.ins().postItemChange, _this.delayCheckHaveCan);
        _this.observe(UserBag.ins().postItemAdd, _this.delayCheckHaveCan);
        _this.observe(UserBag.ins().postItemDel, _this.delayCheckHaveCan);
        _this.observe(UserBag.ins().postHuntStore, _this.delayCheckHaveCan);
        _this.observe(Actor.ins().postLevelChange, _this.delayCheckHaveCan);
        return _this;
    }
    UserEquip.ins = function () {
        return _super.ins.call(this);
    };
    UserEquip.prototype.upgradeZhiZunEquip = function (roleId, subType) {
        var bytes = this.getBytes(8);
        bytes.writeShort(roleId);
        bytes.writeShort(subType);
        this.sendToServer(bytes);
    };
    UserEquip.prototype.postZhiZunUpgrade = function (bytes) {
        var roleId = bytes.readShort();
        var subType = bytes.readShort();
        var lv = bytes.readShort();
        var equipData = SubRoles.ins().getSubRoleByIndex(roleId).getEquipByIndex(subType);
        equipData.soulLv = lv;
    };
    UserEquip.prototype.sendWearEquipment = function (itemHandle, pos, roleIndex) {
        var bytes = this.getBytes(1);
        bytes.writeDouble(itemHandle);
        bytes.writeShort(roleIndex);
        bytes.writeShort(pos);
        this.sendToServer(bytes);
    };
    UserEquip.prototype.sendSmeltEquip = function (type, arr) {
        var bytes = this.getBytes(2);
        bytes.writeInt(type);
        var pos = bytes.position;
        bytes.position += 4;
        var n = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] != null) {
                bytes.writeDouble(arr[i].handle);
                ++n;
            }
        }
        if (n == 0)
            return false;
        bytes.position = pos;
        bytes.writeInt(n);
        this.sendToServer(bytes);
        return true;
    };
    UserEquip.prototype.doUpDataEquip = function (bytes) {
        var roleID = bytes.readShort();
        var equipPos = bytes.readShort();
        var item = new ItemData;
        item.parser(bytes);
        var role = SubRoles.ins().getSubRoleByIndex(roleID);
        var equip = role.getEquipByIndex(equipPos);
        equip.item = item;
        this.postEquipChange();
        if (equipPos == 0 || equipPos == 2) {
            var mainRole = EntityManager.ins().getEntityByHandle(role.handle);
            if (mainRole)
                mainRole.updateModel();
        }
    };
    UserEquip.prototype.postEquipChange = function () {
    };
    UserEquip.prototype.postSmeltEquipComplete = function (bytes) {
        var state = bytes.readInt();
        if (state == 0) {
            UserTips.ins().showTips("|C:0xf3311e&T:熔炼失败！|");
            return;
        }
        var goldCount = bytes.readInt();
        var len = bytes.readInt();
        var arr = [];
        for (var i = 0; i < len; i++) {
            var idata = {};
            idata.itemId = bytes.readInt();
            idata.count = bytes.readInt();
            arr.push(idata);
        }
        return arr;
    };
    UserEquip.contrastEquip = function (sourceItem, item) {
        if (!sourceItem || sourceItem.handle == 0)
            return item;
        if (!item || item.handle == 0)
            return sourceItem;
        var sourceItemScore = sourceItem.point;
        var itemScore = item.point;
        if (itemScore > sourceItemScore)
            return item;
        else
            return sourceItem;
    };
    UserEquip.prototype.postEquipCheckList = function (param) {
        return param;
    };
    UserEquip.prototype.getEquipsByJobNPos = function (job, pos) {
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            var roles = SubRoles.ins().getSubRoleByIndex(i);
            if (roles.job == job)
                return roles.getEquipByIndex(pos);
        }
        return null;
    };
    UserEquip.prototype.getEquipConfigIDByPosAndQuality = function (equipPos, quality, job) {
        if (job === void 0) { job = 1; }
        var zhuan = UserZs.ins().lv || 0;
        var level = Actor.level;
        var configID = 100000 + 1 + equipPos * 10000 + quality * 100 + 1000 * job;
        for (var i = 2; i < 99; i++) {
            var id = 100000 + i + equipPos * 10000 + quality * 100 + 1000 * job;
            var config = GlobalConfig.ItemConfig[id];
            if (config != undefined) {
                var equipZhuan = config.zsLevel ? config.zsLevel : 0;
                var equipLevel = config.level ? config.level : 1;
                if (equipZhuan <= zhuan && equipLevel <= level) {
                    configID = id;
                }
                else {
                    break;
                }
            }
            else {
                break;
            }
        }
        return configID;
    };
    UserEquip.prototype.getEquipConfigIDByPosAndQualityByLegend = function (roleId, equipPos, quality, job) {
        if (job === void 0) { job = 1; }
        var zhuan = UserZs.ins().lv || 0;
        var level = Actor.level;
        var configID = 100000 + 1 + equipPos * 10000 + quality * 100 + 1000 * job;
        var role = SubRoles.ins().getSubRoleByIndex(roleId);
        var equipsData = role.getEquipByIndex(equipPos);
        for (var i = 1; i < 99; i++) {
            var id = 100000 + i + equipPos * 10000 + quality * 100 + 1000 * job;
            var config = GlobalConfig.ItemConfig[id];
            if (config != undefined) {
                var equipZhuan = config.zsLevel ? config.zsLevel : 0;
                var equipLevel = config.level ? config.level : 1;
                if (equipZhuan <= zhuan && equipLevel <= level) {
                    if (equipsData && equipsData.item.configID) {
                        var power = ItemConfig.pointCalNumber(GlobalConfig.ItemConfig[id]);
                        if (equipsData.item.point < power) {
                            configID = id;
                            break;
                        }
                    }
                    else
                        configID = id;
                }
                else {
                    break;
                }
            }
            else {
                break;
            }
        }
        return configID;
    };
    UserEquip.prototype.getEquipConfigIDByPosAndQualityByGod = function (role, equipPos, quality, job) {
        if (job === void 0) { job = 1; }
        var zhuan = UserZs.ins().lv || 0;
        var level = Actor.level;
        var configID = 100000 + 1 + equipPos * 10000 + quality * 100 + 1000 * job;
        var equipsData = role.getEquipByIndex(equipPos);
        for (var i = 2; i < 99; i++) {
            var id = 100000 + i + equipPos * 10000 + quality * 100 + 1000 * job;
            var config = GlobalConfig.ItemConfig[id];
            if (config != undefined) {
                var equipZhuan = config.zsLevel ? config.zsLevel : 0;
                var equipLevel = config.level ? config.level : 1;
                if (equipZhuan <= zhuan && equipLevel <= level) {
                    if (equipsData && equipsData.item.configID) {
                        var power = ItemConfig.pointCalNumber(GlobalConfig.ItemConfig[id]);
                        if (equipsData.item.point < power) {
                            configID = id;
                            break;
                        }
                    }
                    else
                        configID = id;
                }
                else {
                    break;
                }
            }
            else {
                break;
            }
        }
        return configID;
    };
    UserEquip.prototype.checkEquipsIsWear = function (item) {
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            var role = SubRoles.ins().getSubRoleByIndex(i);
            if (role.job != ItemConfig.getJob(item.itemConfig) && ItemConfig.getJob(item.itemConfig) != 0)
                continue;
            var equipLen = role.getEquipLen();
            for (var j = 0; j < equipLen; j++) {
                if (item.handle == role.getEquipByIndex(j).item.handle) {
                    return true;
                }
            }
        }
        return false;
    };
    UserEquip.prototype.doGrewupEquipResult = function (bytes) {
        var roleId = bytes.readShort();
        var result = bytes.readInt();
        var configID = bytes.readInt();
        if (ItemConfig.getQuality(GlobalConfig.ItemConfig[configID]) == 4) {
            this.postMixEquip(roleId, result, configID);
        }
        else {
            this.postMixGodEquip(roleId, result, configID);
        }
    };
    UserEquip.prototype.postMixEquip = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return params;
    };
    UserEquip.prototype.postMixGodEquip = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        return params;
    };
    UserEquip.prototype.sendGrewupEquip = function (roleID, pos) {
        var bytes = this.getBytes(3);
        bytes.writeShort(roleID);
        bytes.writeShort(pos);
        this.sendToServer(bytes);
    };
    UserEquip.prototype.sendMixEquip = function (roleID, configID, pos) {
        var bytes = this.getBytes(4);
        bytes.writeShort(roleID);
        bytes.writeInt(configID);
        bytes.writeInt(pos);
        this.sendToServer(bytes);
    };
    UserEquip.prototype.delayCheckHaveCan = function () {
        if (!TimerManager.ins().isExists(this.postCheckHaveCan, this))
            TimerManager.ins().doTimer(60, 1, this.postCheckHaveCan, this);
    };
    UserEquip.prototype.postCheckHaveCan = function () {
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            this.isFind = this.checkRedPoint(4, i);
            if (this.isFind)
                break;
        }
        if (!this.isFind) {
            for (var a = 0; a < len; a++) {
                for (var i = 0; i < 8; i++) {
                    this.isFind = this.setOrangeEquipItemState(i, SubRoles.ins().getSubRoleByIndex(a));
                    if (this.isFind)
                        return 1;
                }
            }
        }
        if (!this.isFind) {
            for (var i = 0; i < len; i++) {
                this.isFind = this.checkRedPoint(5, i);
                if (this.isFind)
                    break;
            }
            if (!this.isFind) {
                for (var a = 0; a < len; a++) {
                    for (var i = 0; i < 2; i++) {
                        this.isFind = this.setLegendEquipItemUpState(i > 0 ? 2 : 0, SubRoles.ins().getSubRoleByIndex(a));
                        this.isFind = this.setLegendEquipItemState(i > 0 ? 2 : 0, SubRoles.ins().getSubRoleByIndex(a)) || this.isFind;
                        if (this.isFind)
                            return 1;
                    }
                }
            }
        }
        if (!this.isFind) {
            this.isFind = Boolean(UserBag.ins().getHuntGoods(0).length);
        }
        return this.isFind ? 1 : 0;
    };
    UserEquip.prototype.checkRedPointEx = function (qualty, roleId) {
        var itemList = UserBag.ins().getBagEquipsByQuality(qualty);
        var len = itemList.length;
        for (var i = 0; i < len; i++) {
            var job = void 0;
            var role = void 0;
            if (!isNaN(roleId)) {
                job = ItemConfig.getJob(itemList[i].itemConfig);
                role = SubRoles.ins().getSubRoleByIndex(roleId);
                if (role.job != job)
                    return false;
            }
            if (!role)
                return false;
            var id = this.getEquipConfigIDByPosAndQualityByGod(role, ItemConfig.getSubType(itemList[i].itemConfig), ItemConfig.getQuality(itemList[i].itemConfig));
            var fitConfig = GlobalConfig.ItemConfig[id];
            if (!fitConfig)
                continue;
            var equipZsLevel = itemList[i].itemConfig.zsLevel ? itemList[i].itemConfig.zsLevel : 0;
            var equipLevel = itemList[i].itemConfig.level ? itemList[i].itemConfig.level : 0;
            var fitZsLevel = fitConfig.zsLevel ? fitConfig.zsLevel : 0;
            var fitLevel = fitConfig.level ? fitConfig.level : 0;
            var L = equipZsLevel * 10000 + equipLevel;
            var fitL = fitZsLevel * 10000 + fitLevel;
            if (fitL > L) {
                if (qualty == 4) {
                    var curNum = UserBag.ins().getBagGoodsCountById(0, id);
                    var comConfig = GlobalConfig.LegendComposeConfig[id];
                    var needNum = comConfig ? comConfig.count : 0;
                    if (curNum >= needNum)
                        return true;
                }
                else {
                    return true;
                }
            }
        }
        return false;
    };
    UserEquip.prototype.checkRedPointExOrg = function (qualty, roleId) {
        var itemList = UserBag.ins().getBagEquipsByQuality(qualty);
        var len = itemList.length;
        if (len) {
            this.checkRedPoint(qualty, roleId);
        }
        else {
            if (isNaN(roleId)) {
                if (this.IsEnoughChip(roleId))
                    return true;
            }
            else {
                for (var i = 0; i < SubRoles.ins().subRolesLen; i++) {
                    if (this.IsEnoughChip(i))
                        return true;
                }
            }
        }
        return false;
    };
    UserEquip.prototype.IsEnoughChip = function (roleId) {
        var arr = [EquipPos.WEAPON, EquipPos.CLOTHES];
        var role = SubRoles.ins().getSubRoleByIndex(roleId);
        for (var j = 0; j < arr.length; j++) {
            var mixConfig = this.getMixConfig(role.index, arr[j]);
            if (!mixConfig)
                continue;
            var needNum = mixConfig.count;
            var costID = mixConfig.itemId;
            var curNum = UserBag.ins().getBagGoodsCountById(0, costID);
            if (curNum >= needNum) {
                return true;
            }
        }
        return false;
    };
    UserEquip.prototype.getMixConfig = function (roleId, pos) {
        var role = SubRoles.ins().getSubRoleByIndex(roleId);
        var configId = this.getEquipConfigIDByPosAndQualityByLegend(role.index, pos, 5);
        var mixConfig = GlobalConfig.LegendComposeConfig[configId];
        return mixConfig;
    };
    UserEquip.prototype.checkRedPoint = function (qualty, roleId) {
        var itemList = UserBag.ins().getBagEquipsByQuality(qualty);
        var len = itemList.length;
        for (var i = 0; i < len; i++) {
            var job = void 0;
            var role = void 0;
            if (!isNaN(roleId)) {
                job = ItemConfig.getJob(itemList[i].itemConfig);
                role = SubRoles.ins().getSubRoleByIndex(roleId);
                if (role.job != job)
                    return false;
            }
            if (!role)
                return false;
            var id = this.getEquipConfigIDByPosAndQualityByGod(role, ItemConfig.getSubType(itemList[i].itemConfig), ItemConfig.getQuality(itemList[i].itemConfig));
            var fitConfig = GlobalConfig.ItemConfig[id];
            if (!fitConfig)
                continue;
            var equipZsLevel = itemList[i].itemConfig.zsLevel ? itemList[i].itemConfig.zsLevel : 0;
            var equipLevel = itemList[i].itemConfig.level ? itemList[i].itemConfig.level : 0;
            var fitZsLevel = fitConfig.zsLevel ? fitConfig.zsLevel : 0;
            var fitLevel = fitConfig.level ? fitConfig.level : 0;
            var L = equipZsLevel * 10000 + equipLevel;
            var fitL = fitZsLevel * 10000 + fitLevel;
            if (fitL > L) {
                return true;
            }
        }
        return false;
    };
    UserEquip.prototype.setOrangeEquipItemState = function (index, role) {
        var equipData = role.getEquipByIndex(index);
        var nextConfig;
        if (equipData.item.itemConfig && ItemConfig.getQuality(equipData.item.itemConfig) < 4)
            nextConfig = null;
        else
            nextConfig = GlobalConfig.ItemConfig[equipData.item.configID + 1];
        var needNum = 0;
        var costID = 0;
        if (equipData.item.itemConfig && ItemConfig.getQuality(equipData.item.itemConfig) == 4 && equipData.item.itemConfig.zsLevel >= 13)
            return false;
        if (equipData.item.itemConfig && ItemConfig.getQuality(equipData.item.itemConfig) == 5)
            return false;
        if (nextConfig != null && (nextConfig.level > Actor.level || nextConfig.zsLevel > UserZs.ins().lv))
            return false;
        if (nextConfig != undefined && equipData.item.handle != 0 && ItemConfig.getQuality(equipData.item.itemConfig) == 4 && equipData.item.itemConfig.level != 1 && UserBag.fitleEquip.indexOf(equipData.item.configID) == -1) {
            var grewupConfig = GlobalConfig.LegendLevelupConfig[equipData.item.configID];
            if (grewupConfig) {
                needNum = grewupConfig.count;
                costID = grewupConfig.itemId;
            }
        }
        else {
            var configId = UserEquip.ins().getEquipConfigIDByPosAndQualityByGod(role, index, 4, role.job);
            var equipsData = role.getEquipByIndex(index);
            if (equipsData && equipsData.item.configID) {
                var power = ItemConfig.pointCalNumber(GlobalConfig.ItemConfig[configId]);
                if (equipsData.item.point > power) {
                    return false;
                }
            }
            var mixConfig = GlobalConfig.LegendComposeConfig[configId];
            if (mixConfig) {
                needNum = mixConfig.count;
                costID = mixConfig.itemId;
            }
        }
        var curNum = UserBag.ins().getBagGoodsCountById(0, costID);
        return curNum >= needNum;
    };
    UserEquip.prototype.setLegendEquipItemState = function (index, role) {
        var equipData = role.getEquipByIndex(index);
        var nextConfig = null;
        var q = ItemConfig.getQuality(equipData.item.itemConfig);
        if (equipData.item.itemConfig && q == 5) {
            if (equipData.item.itemConfig.zsLevel >= 10)
                return false;
            nextConfig = GlobalConfig.ItemConfig[equipData.item.configID + 1];
        }
        else {
            nextConfig = null;
        }
        var needNum = 0;
        var costID = 0;
        if (nextConfig != null && nextConfig.zsLevel > UserZs.ins().lv)
            return false;
        if (nextConfig != null && equipData.item.handle != 0 && q == 5) {
            var grewupConfig = GlobalConfig.LegendLevelupConfig[equipData.item.configID];
            needNum = grewupConfig.count;
            costID = grewupConfig.itemId;
        }
        else {
            var configId = this.getEquipConfigIDByPosAndQualityByLegend(role.index, index, 5);
            var mixConfig = GlobalConfig.LegendComposeConfig[configId];
            if (!mixConfig)
                return false;
            needNum = mixConfig.count;
            costID = mixConfig.itemId;
        }
        var curNum = UserBag.ins().getBagGoodsCountById(0, costID);
        if (UserZs.ins().lv >= 3)
            return curNum >= needNum;
        else
            return false;
    };
    UserEquip.prototype.setLegendEquipItemUpState = function (index, role) {
        var equipData = role.getEquipByIndex(index);
        var nextEquipData = GlobalConfig.ItemConfig[equipData.item.configID + 1];
        var q = ItemConfig.getQuality(equipData.item.itemConfig);
        if (nextEquipData == undefined && equipData.item.handle != 0 && q == 5) {
            return false;
        }
        else {
            if (nextEquipData != undefined && equipData.item.handle != 0 && q == 5) {
                var configID = role.getEquipByIndex(index).item.configID;
                var nextEquipConfig = GlobalConfig.ItemConfig[configID + 1];
                if (nextEquipConfig.level > Actor.level || nextEquipConfig.zsLevel > UserZs.ins().lv) {
                    return false;
                }
                var grewupConfig = GlobalConfig.LegendLevelupConfig[configID];
                var curNum = UserBag.ins().getBagGoodsCountById(0, grewupConfig.itemId);
                return curNum >= grewupConfig.count;
            }
            else {
                return false;
            }
        }
    };
    UserEquip.prototype.getLegendEquipItemUpMax = function (roleId) {
        for (var i = 0; i < 8; i++) {
            if (i != 0 && i != 2)
                continue;
            var equipData = SubRoles.ins().getSubRoleByIndex(roleId).getEquipByIndex(i);
            if (!equipData)
                return true;
            var nextEquipData = GlobalConfig.ItemConfig[equipData.item.configID + 1];
            var q = ItemConfig.getQuality(equipData.item.itemConfig);
            if (nextEquipData == undefined && equipData.item.handle != 0 && q == 5) {
            }
            else {
                return false;
            }
        }
        return true;
    };
    UserEquip.prototype.requestAddSpirit = function (roleIndex, equipIndex, equipAry) {
        var bytes = this.getBytes(5);
        bytes.writeShort(roleIndex);
        bytes.writeShort(equipIndex);
        bytes.writeShort(equipAry.length);
        for (var i = 0; i < equipAry.length; i++) {
            bytes.writeDouble(equipAry[i]);
        }
        this.sendToServer(bytes);
    };
    UserEquip.prototype.postAddSpirit = function (bytes) {
        var roleId = bytes.readShort();
        var equipIndex = bytes.readShort();
        var lv = bytes.readShort();
        var exp = bytes.readInt();
        var equipData = SubRoles.ins().getSubRoleByIndex(roleId).getEquipByIndex(equipIndex);
        equipData.spiritLv = lv;
        equipData.spiritExp = exp;
    };
    UserEquip.prototype.requestAddSoul = function (roleIndex, equipIndex) {
        var bytes = this.getBytes(7);
        bytes.writeShort(roleIndex);
        bytes.writeShort(equipIndex);
        this.sendToServer(bytes);
    };
    UserEquip.prototype.postAddSoul = function (bytes) {
        var roleId = bytes.readShort();
        var equipIndex = bytes.readShort();
        var lv = bytes.readShort();
        var equipData = SubRoles.ins().getSubRoleByIndex(roleId).getEquipByIndex(equipIndex);
        equipData.soulLv = lv;
    };
    UserEquip.FOEGE_MAX = 8;
    return UserEquip;
}(BaseSystem));
__reflect(UserEquip.prototype, "UserEquip");
var GameSystem;
(function (GameSystem) {
    GameSystem.userEquip = UserEquip.ins.bind(UserEquip);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=UserEquip.js.map