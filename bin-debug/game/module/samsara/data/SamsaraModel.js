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
var SamsaraModel = (function (_super) {
    __extends(SamsaraModel, _super);
    function SamsaraModel() {
        var _this = _super.call(this) || this;
        _this.samsaraEquipMap = {};
        _this.composeEquipMap = {};
        _this.composeEquipTypes = [];
        _this.equipCompose = {};
        var data = GlobalConfig.ReincarnationBase;
        _this.samsaraDescAry = [data.hellsName, data.ghostsName, data.animalsName, data.demigodsName, data.humansName, data.godsName];
        _this.initComposeEquip();
        _this.composeEquipTypes = _this.getComposeMenu();
        return _this;
    }
    SamsaraModel.ins = function () {
        return _super.ins.call(this);
    };
    SamsaraModel.prototype.isCanUpgrade = function () {
        if (!this.samsaraInfo)
            return false;
        var lv = this.samsaraInfo.lv;
        var nextLv = lv + 1;
        var cfg = GlobalConfig.ReincarnationLevel[nextLv];
        var result = false;
        if (nextLv < CommonUtils.getObjectLength(GlobalConfig.ReincarnationLevel) && this.samsaraInfo.exp >= cfg.consume) {
            result = true;
        }
        return result;
    };
    SamsaraModel.prototype.getExpExchangeTimes = function () {
        if (!this.samsaraInfo)
            return 0;
        var times = GlobalConfig.ReincarnationBase.levelExchangeTimes - this.samsaraInfo.expUpgradeNum;
        return times;
    };
    SamsaraModel.prototype.getNormalExchangeTimes = function () {
        if (!this.samsaraInfo)
            return 0;
        var times = GlobalConfig.ReincarnationBase.normalItem.time - this.samsaraInfo.normalUpgradeNum;
        return times;
    };
    SamsaraModel.prototype.getAdvancedExchangeTimes = function () {
        if (!this.samsaraInfo)
            return 0;
        var times = GlobalConfig.ReincarnationBase.advanceItem.time - this.samsaraInfo.advancedUpgradeNum;
        return times;
    };
    SamsaraModel.prototype.isCanExpExchange = function () {
        var result = false;
        if (Actor.level >= GlobalConfig.ReincarnationBase.levelLimit && this.getExpExchangeTimes() > 0) {
            result = true;
        }
        return result;
    };
    SamsaraModel.prototype.isCanItemExchange = function () {
        var count;
        if (this.getNormalExchangeTimes() > 0) {
            count = UserBag.ins().getBagGoodsCountById(0, GlobalConfig.ReincarnationBase.normalItem.id);
            if (count > 0) {
                return true;
            }
        }
        if (this.getAdvancedExchangeTimes() > 0) {
            count = UserBag.ins().getBagGoodsCountById(0, GlobalConfig.ReincarnationBase.advanceItem.id);
            if (count > 0) {
                return true;
            }
        }
        return false;
    };
    SamsaraModel.prototype.isCanExchange = function () {
        if (this.isMaxSamsara(Actor.samsaraLv)) {
            return false;
        }
        else {
            return this.isCanExpExchange() || this.isCanItemExchange();
        }
    };
    SamsaraModel.prototype.isOpen = function () {
        var roleLv = UserZs.ins().lv * 1000 + Actor.level;
        return roleLv >= GlobalConfig.ReincarnationBase.openLevel;
    };
    SamsaraModel.prototype.isMaxSamsara = function (samsaraLv) {
        var length = CommonUtils.getObjectLength(GlobalConfig.ReincarnationLevel);
        var cfg = GlobalConfig.ReincarnationLevel[length - 1];
        return (samsaraLv >= cfg.level);
    };
    SamsaraModel.prototype.isSuit = function (index, role) {
        var baseLv = this.getEquipSamsaraLvByRole(index, role);
        for (var i = EquipPos.HAT; i < EquipPos.MAX; i++) {
            if (i != index) {
                var lv = this.getEquipSamsaraLvByRole(i, role);
                if (lv < baseLv) {
                    return false;
                }
            }
        }
        return true;
    };
    SamsaraModel.prototype.lowSuitEquips = function (index, role) {
        var items = [];
        var baseLv = this.getEquipSamsaraLvByRole(index, role);
        for (var i = EquipPos.HAT; i < EquipPos.MAX; i++) {
            var lv = this.getEquipSamsaraLvByRole(i, role);
            if (lv < baseLv) {
                items.push(0);
            }
            else {
                items.push(1);
            }
        }
        return items;
    };
    SamsaraModel.prototype.getEquipSamsaraLvByRole = function (index, role) {
        var data = role.getEquipByIndex(index);
        if (!data.item.itemConfig)
            return 0;
        return this.getEquipSamsaraLv(data.item.itemConfig.id);
    };
    SamsaraModel.prototype.getEquipSamsaraLv = function (equipId) {
        var zsLv = GlobalConfig.ItemConfig[equipId].zsLevel;
        return zsLv;
    };
    SamsaraModel.prototype.getReincarnateSuit = function (equipId) {
        var zsLv = GlobalConfig.ItemConfig[equipId].zsLevel;
        return GlobalConfig.ReincarnateSuit[zsLv];
    };
    SamsaraModel.prototype.getSamsara = function (equipSamsaraLv) {
        var lv = 0;
        if (equipSamsaraLv >= 7) {
            lv = Math.ceil((equipSamsaraLv - 6) / 6);
        }
        return lv;
    };
    SamsaraModel.prototype.getSamsaraDesc = function (samsara) {
        return this.samsaraDescAry[samsara];
    };
    SamsaraModel.prototype.getSamsaraLv = function (equipSamsaraLv) {
        var lv = 0;
        if (equipSamsaraLv == 0) {
            lv = -1;
        }
        else {
            lv = Math.ceil((equipSamsaraLv - 1) % 6);
        }
        return lv;
    };
    SamsaraModel.prototype.getSamsaraLvDesc = function (samsaraLv) {
        var index = samsaraLv + 1;
        return GlobalConfig.ReincarnationBase.state[index];
    };
    SamsaraModel.prototype.getAddSpiritEquips = function (role, equipPos, maxLength) {
        if (maxLength === void 0) { maxLength = 10; }
        var equips = [];
        var equipCount = UserBag.ins().itemCount[1];
        var equipData = role.getEquipByIndex(equipPos);
        if (equipCount && !this.checkSpiritLvIsMax(equipData, equipPos)) {
            for (var equip in equipCount) {
                if (GlobalConfig.ReincarnateEquip[equip]) {
                    var id = +equip;
                    var isCan = this.isEquipCanAddSpirit(role, equipPos, id);
                    if (isCan) {
                        var count = equipCount[equip];
                        while (count > 0) {
                            equips.unshift(id);
                            if (equips.length >= maxLength) {
                                return equips;
                            }
                            count--;
                        }
                    }
                }
            }
        }
        return equips;
    };
    SamsaraModel.prototype.isEquipCanAddSpirit = function (role, equipPos, id) {
        var data = role.getEquipByIndex(equipPos);
        var currentZsLv = GlobalConfig.ItemConfig[data.item.itemConfig.id].zsLevel;
        var zslv = GlobalConfig.ItemConfig[id].zsLevel;
        if (currentZsLv < zslv)
            return false;
        return this.checkEquip(id);
    };
    SamsaraModel.prototype.checkEquip = function (equipId) {
        var item = GlobalConfig.ItemConfig[equipId];
        var targetJob = ItemConfig.getJob(item);
        var tempRole = SubRoles.ins().getSubRoleByJob(targetJob);
        if (tempRole) {
            var targetData = tempRole.getEquipByIndex(ItemConfig.getSubType(item));
            if (targetData.item.itemConfig) {
                var zslv = GlobalConfig.ItemConfig[targetData.item.itemConfig.id].zsLevel;
                if (zslv >= item.zsLevel) {
                    var shengEquipId = this.getTargetShengEquipById(equipId, item.zsLevel);
                    return this.checkNormalEquip(targetData, shengEquipId);
                }
            }
        }
        return false;
    };
    SamsaraModel.prototype.checkNormalEquip = function (data, equipId) {
        var point = data.item.point;
        var item = new ItemData();
        item.configID = equipId;
        var targetPoint = item.point;
        return point > targetPoint;
    };
    SamsaraModel.prototype.getTargetShengEquipById = function (id, zsLv) {
        var cfg = this.equipCompose[id];
        if (cfg) {
            return this.getTargetShengEquipById(cfg.id, zsLv);
        }
        return id;
    };
    SamsaraModel.prototype.isCanAddSpirit = function () {
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            var role = SubRoles.ins().getSubRoleByIndex(i);
            for (var j = EquipPos.HAT; j < EquipPos.MAX; j++) {
                var data = role.getEquipByIndex(j);
                if (!data.item.itemConfig)
                    continue;
                var list = this.getAddSpiritEquips(role, j, 1);
                if (list.length > 0) {
                    return true;
                }
            }
        }
        return false;
    };
    SamsaraModel.prototype.checkRoleCanAddSpirit = function (index) {
        var role = SubRoles.ins().getSubRoleByIndex(index);
        for (var j = EquipPos.HAT; j < EquipPos.MAX; j++) {
            var data = role.getEquipByIndex(j);
            if (!data.item.itemConfig)
                continue;
            var list = this.getAddSpiritEquips(role, j, 1);
            if (list.length > 0) {
                return true;
            }
        }
        return false;
    };
    SamsaraModel.prototype.checkEquipPosCanAddSpirit = function (role, equipIndex) {
        var data = role.getEquipByIndex(equipIndex);
        if (data.item.itemConfig && !this.checkSpiritLvIsMax(data, equipIndex)) {
            var list = this.getAddSpiritEquips(role, equipIndex, 1);
            if (list.length > 0) {
                return true;
            }
        }
        return false;
    };
    SamsaraModel.prototype.checkSpiritLvIsMax = function (data, index) {
        var lv = data.spiritLv;
        return !GlobalConfig.ReincarnateSpirit[index][lv + 1];
    };
    SamsaraModel.prototype.getExtraPower = function (role, addPercent, attrType) {
        var power = 0;
        var attr = 0;
        for (var i = EquipPos.HAT; i <= EquipPos.SHIELD; i++) {
            var data = role.getEquipByIndex(i);
            if (data.item.itemConfig) {
                var itemId = data.item.itemConfig.id;
                if (itemId && GlobalConfig.EquipConfig[itemId].baseAttr1) {
                    var attr1 = GlobalConfig.EquipConfig[itemId].baseAttr1;
                    attr += attr1.value;
                }
            }
        }
        if (attrType) {
            var powerConfig = GlobalConfig.AttrPowerConfig;
            var config = powerConfig[attrType];
            power = attr * config.relate_power * addPercent;
        }
        return power;
    };
    SamsaraModel.prototype.initComposeEquip = function () {
        var ary = GlobalConfig.ReincarnationBase.headName;
        var count = ary.length;
        for (var i = 1; i <= count; i++) {
            if (!this.composeEquipMap[i])
                this.composeEquipMap[i] = {};
        }
        for (var j in GlobalConfig.ReincarnateEquipCompose) {
            var cfg = GlobalConfig.ReincarnateEquipCompose[j];
            this.equipCompose[cfg.material.id] = cfg;
            var type = cfg.distinguishi;
            var obj = this.composeEquipMap[type];
            var itemCfg = GlobalConfig.ItemConfig[cfg.id];
            var zsLv = itemCfg.zsLevel;
            var items = obj[zsLv];
            if (!items)
                items = [];
            items.push({ type: MergeType.SamsareEquip, id: cfg.id });
            obj[zsLv] = items;
            this.composeEquipMap[type] = obj;
        }
    };
    SamsaraModel.prototype.getComposeMenu = function () {
        var ary = GlobalConfig.ReincarnationBase.headName;
        var count = ary.length;
        var data = [];
        for (var i = 1; i <= count; i++) {
            data.push(i);
        }
        return data;
    };
    SamsaraModel.prototype.getComposeZsList = function (type) {
        var lv = UserZs.ins().lv;
        var list = GlobalConfig.ReincarnationBase.equipsList[type - 1];
        var ary = [];
        for (var i in list) {
            if (list[i] <= lv) {
                ary.push({ "type": type, "zsLv": list[i] });
            }
        }
        return ary;
    };
    SamsaraModel.prototype.getComposeDesc = function (type) {
        return GlobalConfig.ReincarnationBase.headName[type - 1];
    };
    SamsaraModel.prototype.isCanCompose = function () {
        return this.getComposeEquipList().length > 0;
    };
    SamsaraModel.prototype.getComposeEquipId = function (type, zsLv) {
        var id = 0;
        var list = this.getComposeEquipList();
        for (var i in list) {
            var itemId = list[i];
            var targetId = this.getComposeTarget(itemId);
            if (GlobalConfig.ItemConfig[targetId].zsLevel == zsLv && GlobalConfig.ReincarnateEquipCompose[targetId].distinguishi == type) {
                return itemId;
            }
        }
        return id;
    };
    SamsaraModel.prototype.getComposeEquipList = function () {
        var result = [];
        var equipCount = UserBag.ins().itemCount[1];
        for (var equip in equipCount) {
            if (this.equipCompose[equip]) {
                var itemId = +equip;
                var targetId = this.composeMaxEquip(itemId);
                if (targetId && this.isCanWear(targetId)) {
                    result.push(itemId);
                }
            }
        }
        return result;
    };
    SamsaraModel.prototype.isCanWear = function (itemId) {
        if (!itemId)
            return false;
        var itemData = GlobalConfig.ItemConfig[itemId];
        var roleLv = UserZs.ins().lv * 1000 + Actor.level;
        var equipLv = itemData.zsLevel * 1000 + itemData.level;
        if (roleLv < equipLv)
            return false;
        var job = ItemConfig.getJob(itemData);
        var subType = ItemConfig.getSubType(itemData);
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            var role = SubRoles.ins().getSubRoleByIndex(i);
            if (role.job == job) {
                var data = role.getEquipByIndex(subType);
                var itemCfg = data.item.itemConfig;
                if (itemCfg) {
                    var point = data.item.point;
                    var tempItem = new ItemData();
                    tempItem.configID = itemId;
                    var targetPoint = tempItem.point;
                    if (targetPoint > point) {
                        return true;
                    }
                }
                else {
                    return true;
                }
            }
        }
        return false;
    };
    SamsaraModel.prototype.composeMaxEquip = function (itemId) {
        var num = UserBag.ins().getBagGoodsCountById(UserBag.BAG_TYPE_EQUIP, itemId);
        if (num) {
            var material = new RewardData();
            material.id = itemId;
            material.count = 0;
            var data = this.composeEquip(material);
            if (data && data.id != itemId) {
                return data.id;
            }
        }
        return 0;
    };
    SamsaraModel.prototype.composeEquip = function (material) {
        var itemId = material.id;
        var num = material.count + UserBag.ins().getBagGoodsCountById(UserBag.BAG_TYPE_EQUIP, itemId) + this.wearCount(itemId);
        var data;
        var cfg = this.equipCompose[itemId];
        if (cfg) {
            if (num >= cfg.material.count) {
                data = new RewardData();
                data.id = cfg.id;
                data.count = Math.floor(num / cfg.material.count);
                return this.composeEquip(data);
            }
            else {
                return material;
            }
        }
        return material;
    };
    SamsaraModel.prototype.wearCount = function (itemId) {
        var itemData = GlobalConfig.ItemConfig[itemId];
        var job = ItemConfig.getJob(itemData);
        var subType = ItemConfig.getSubType(itemData);
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            var role = SubRoles.ins().getSubRoleByIndex(i);
            if (role.job == job) {
                var data = role.getEquipByIndex(subType);
                var itemCfg = data.item.itemConfig;
                if (itemCfg && itemCfg.id == itemId) {
                    return 1;
                }
            }
        }
        return 0;
    };
    SamsaraModel.prototype.getRoleIndexByEquip = function (itemId) {
        var itemData = GlobalConfig.ItemConfig[itemId];
        var job = ItemConfig.getJob(itemData);
        var subType = ItemConfig.getSubType(itemData);
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            var role = SubRoles.ins().getSubRoleByIndex(i);
            if (role.job == job) {
                var data = role.getEquipByIndex(subType);
                var itemCfg = data.item.itemConfig;
                if (itemCfg && itemCfg.id == itemId) {
                    return i;
                }
            }
        }
        return -1;
    };
    SamsaraModel.prototype.isCanTypeCompose = function (type) {
        var list = this.getComposeEquipList();
        for (var i in list) {
            var equipId = list[i];
            var cfg = GlobalConfig.ReincarnateEquipCompose[this.getComposeTarget(equipId)];
            if (cfg.distinguishi == type) {
                return true;
            }
        }
        return false;
    };
    SamsaraModel.prototype.getComposeTarget = function (materialId) {
        var obj = this.equipCompose[materialId];
        if (obj)
            return obj.id;
        return 0;
    };
    SamsaraModel.prototype.isCanZsLvCompose = function (type, zsLv) {
        var list = this.getComposeEquipList();
        for (var i in list) {
            var equipId = list[i];
            var targetId = this.getComposeTarget(equipId);
            var cfg = GlobalConfig.ReincarnateEquipCompose[targetId];
            var zsLevel = GlobalConfig.ItemConfig[targetId].zsLevel;
            if (zsLv == zsLevel && cfg.distinguishi == type) {
                return true;
            }
        }
        return false;
    };
    SamsaraModel.prototype.isCanEquipCompose = function (equipId) {
        var list = this.getComposeEquipList();
        return list.indexOf(equipId) >= 0;
    };
    SamsaraModel.prototype.getReincarnationLinkLevel = function (pos, linkLv) {
        for (var i in GlobalConfig.ReincarnationLinkLevel) {
            if (i != pos.toString())
                continue;
            for (var j in GlobalConfig.ReincarnationLinkLevel[i]) {
                for (var k in GlobalConfig.ReincarnationLinkLevel[i][j]) {
                    if (k == linkLv.toString()) {
                        return GlobalConfig.ReincarnationLinkLevel[i][j][k];
                    }
                }
            }
        }
        return null;
    };
    SamsaraModel.prototype.getSoulLinkDesc = function (type) {
        var desc;
        switch (type) {
            case 11:
                desc = "生命";
                break;
            case 55:
                desc = "伤害加成";
                break;
            case 19:
                desc = "暴击伤害";
                break;
            case 56:
                desc = "暴击伤害减免率";
                break;
        }
        return desc;
    };
    SamsaraModel.prototype.getSoulMaxLevel = function () {
        return CommonUtils.getObjectLength(GlobalConfig.ReincarnationDemonLevel[EquipPos.HAT]);
    };
    SamsaraModel.prototype.getSoulLinkLv = function (role, mainPos, soullv) {
        var secPos = this.getLinkEquipPos(mainPos);
        var mainEquip = role.getEquipByIndex(mainPos);
        var secEquip = role.getEquipByIndex(secPos);
        if (mainEquip && secEquip) {
            return Math.min(mainEquip.soulLv, secEquip.soulLv);
        }
        return 0;
    };
    SamsaraModel.prototype.getLinkEquipPos = function (mainPos) {
        for (var i in GlobalConfig.ReincarnationLinkLevel) {
            if (i == mainPos.toString()) {
                for (var j in GlobalConfig.ReincarnationLinkLevel[i]) {
                    return +(j);
                }
            }
        }
        return null;
    };
    SamsaraModel.prototype.isCanUpgradeSoul = function () {
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            for (var j = EquipPos.HAT; j <= EquipPos.SHIELD; j++) {
                var isCan = this.checkUpgradeSoul(SubRoles.ins().getSubRoleByIndex(i), j);
                if (isCan)
                    return true;
            }
        }
        return false;
    };
    SamsaraModel.prototype.checkUpgradeSoul = function (role, pos) {
        var mainEquip = role.getEquipByIndex(pos);
        var soulLv = mainEquip.soulLv;
        if (soulLv == this.getSoulMaxLevel() || !mainEquip.item.itemConfig) {
            return false;
        }
        else {
            var soulCfg = GlobalConfig.ReincarnationSoulLevel[role.job][pos][soulLv + 1];
            var count = UserBag.ins().getBagGoodsCountById(0, soulCfg.materialInfo.id);
            return count >= soulCfg.materialInfo.count;
        }
    };
    return SamsaraModel;
}(BaseClass));
__reflect(SamsaraModel.prototype, "SamsaraModel");
//# sourceMappingURL=SamsaraModel.js.map