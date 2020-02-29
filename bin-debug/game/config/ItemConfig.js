var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ItemConfig = (function () {
    function ItemConfig() {
        this.bagType = 0;
    }
    ItemConfig.calculateBagItemScore = function (item) {
        var transfrom = {
            'hp': 2,
            'atk': 4,
            'def': 5,
            'res': 6
        };
        var equipConfig = GlobalConfig.EquipConfig[item.itemConfig.id];
        var powerConfig = GlobalConfig.AttrPowerConfig;
        var allPower = 0;
        var attr = item.att;
        var value = 0;
        if (attr) {
            for (var k in transfrom) {
                value = 0;
                if (!equipConfig[k])
                    continue;
                for (var index = 0; index < attr.length; index++) {
                    if (attr[index].type == transfrom[k]) {
                        value = equipConfig[k] + attr[index].value;
                        break;
                    }
                }
                allPower += (value == undefined ? 0 : value) * powerConfig[transfrom[k]].power;
            }
        }
        else {
            for (var j in transfrom) {
                value = equipConfig[j];
                if (!value)
                    continue;
                var type = Role.getAttrTypeByName(j);
                allPower += value * powerConfig[type].power;
            }
        }
        var expower = 0;
        if (equipConfig.baseAttr1) {
            expower += UserBag.getAttrPower([equipConfig.baseAttr1]);
        }
        if (equipConfig.baseAttr2) {
            expower += UserBag.getAttrPower([equipConfig.baseAttr2]);
        }
        if (equipConfig.exPower) {
            expower += equipConfig.exPower;
        }
        return Math.floor(allPower / 100) + Math.floor(expower);
    };
    ItemConfig.pointCalNumber = function (item) {
        var itemId = item.id;
        if (ItemConfig.itemPoints[itemId] != undefined) {
            return ItemConfig.itemPoints[itemId];
        }
        var transfrom = {
            'hp': 2,
            'atk': 4,
            'def': 5,
            'res': 6
        };
        var equipConfig = GlobalConfig.EquipConfig[itemId];
        var powerConfig = GlobalConfig.AttrPowerConfig;
        var allPower = 0;
        for (var i in transfrom) {
            var _type = transfrom[i];
            var value = equipConfig[i];
            if (value) {
                var conf = powerConfig[_type];
                allPower += (value + Math.floor(value * ItemBase.additionRange / 100)) * conf.power;
            }
        }
        ItemConfig.itemPoints[itemId] = Math.floor(allPower / 100);
        return ItemConfig.itemPoints[itemId];
    };
    ItemConfig.getBaseAttrData = function (item) {
        var equipConfig = GlobalConfig.EquipConfig[item.id];
        var transfrom = {
            'hp': 2,
            'atk': 4,
            'def': 5,
            'res': 6
        };
        var otherBaseType = [AttributeType.atHolyDamege];
        var baseAttr = [];
        for (var i in transfrom) {
            if (equipConfig[i]) {
                baseAttr.push(new AttributeData(transfrom[i], equipConfig[i]));
            }
        }
        if (equipConfig.baseAttr1) {
            if (otherBaseType.indexOf(equipConfig.baseAttr1.type) >= 0)
                baseAttr.push(new AttributeData(equipConfig.baseAttr1.type, equipConfig.baseAttr1.value));
        }
        if (equipConfig.baseAttr2) {
            if (otherBaseType.indexOf(equipConfig.baseAttr2.type) >= 0)
                baseAttr.push(new AttributeData(equipConfig.baseAttr2.type, equipConfig.baseAttr2.value));
        }
        return baseAttr;
    };
    ItemConfig.calculateRelatePower = function (attrs, role) {
        var totalPower = 0;
        if (!attrs || !role)
            return totalPower;
        for (var _i = 0, attrs_1 = attrs; _i < attrs_1.length; _i++) {
            var attr = attrs_1[_i];
            totalPower += ItemConfig.relatePower(attr, role);
        }
        return totalPower;
    };
    ItemConfig.relatePower = function (attr, role) {
        var totalPower = 0;
        var powerConfig = GlobalConfig.AttrPowerConfig;
        var config = powerConfig[attr.type];
        if (config && config.relate_type) {
            var value = role.getAtt(config.relate_type);
            var ex_type = AttributeData.exRelate[config.relate_type];
            if (ex_type) {
                var ex_value = role.getAtt(ex_type);
                if (ex_value) {
                    value = Math.floor(value / (1 + ex_value / 10000));
                }
            }
            totalPower += Math.floor(attr.value * value * config.relate_power / 100);
        }
        return totalPower;
    };
    ItemConfig.getQuality = function (config) {
        if (!config)
            return 0;
        if (GlobalConfig.ItemDescConfig[config.descIndex])
            return GlobalConfig.ItemDescConfig[config.descIndex].quality;
        return 0;
    };
    ItemConfig.getQualityColor = function (config) {
        return ItemBase.QUALITY_COLOR[this.getQuality(config)];
    };
    ItemConfig.getType = function (config) {
        if (!config)
            return 0;
        if (GlobalConfig.ItemDescConfig[config.descIndex])
            return GlobalConfig.ItemDescConfig[config.descIndex].type;
        return 0;
    };
    ItemConfig.getSubType = function (config) {
        if (!config)
            return 0;
        if (GlobalConfig.ItemDescConfig[config.descIndex])
            return GlobalConfig.ItemDescConfig[config.descIndex].subType;
        return 0;
    };
    ItemConfig.getJob = function (config) {
        if (!config)
            return 0;
        if (GlobalConfig.ItemDescConfig[config.descIndex])
            return GlobalConfig.ItemDescConfig[config.descIndex].job;
        return 0;
    };
    ItemConfig.isEquip = function (config) {
        var type = this.getType(config);
        switch (type) {
            case ItemType.TYPE_0:
            case ItemType.TYPE_4:
            case ItemType.TYPE_11:
                return true;
        }
        return false;
    };
    ItemConfig.itemPoints = {};
    return ItemConfig;
}());
__reflect(ItemConfig.prototype, "ItemConfig");
//# sourceMappingURL=ItemConfig.js.map