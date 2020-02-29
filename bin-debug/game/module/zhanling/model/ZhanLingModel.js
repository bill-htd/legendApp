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
var ZhanLingModel = (function (_super) {
    __extends(ZhanLingModel, _super);
    function ZhanLingModel() {
        var _this = _super.call(this) || this;
        _this._ZhanLingData = {};
        _this._ZhanLingSkinId = 0;
        _this._showZLlist = [];
        return _this;
    }
    ZhanLingModel.ins = function () {
        return _super.ins.call(this);
    };
    Object.defineProperty(ZhanLingModel.prototype, "ZhanLingData", {
        get: function () {
            return this._ZhanLingData;
        },
        enumerable: true,
        configurable: true
    });
    ZhanLingModel.prototype.getZhanLingDataById = function (id) {
        return this._ZhanLingData[id];
    };
    ZhanLingModel.prototype.setZhanLingData = function (value) {
        if (!value)
            return;
        this._ZhanLingData[value.id] = value;
    };
    Object.defineProperty(ZhanLingModel.prototype, "ZhanLingSkinId", {
        get: function () {
            return this._ZhanLingSkinId;
        },
        set: function (value) {
            this._ZhanLingSkinId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZhanLingModel.prototype, "showZLlist", {
        get: function () {
            return this._showZLlist;
        },
        set: function (value) {
            this._showZLlist = value;
        },
        enumerable: true,
        configurable: true
    });
    ZhanLingModel.prototype.ZhanLingOpen = function () {
        return UserZs.ins().lv >= GlobalConfig.ZhanLingConfig.openzhuanshenglv && GameServer.serverOpenDay + 1 >= GlobalConfig.ZhanLingConfig.openserverday;
    };
    ZhanLingModel.prototype.getZhanLingDataByLevel = function (id) {
        return this._ZhanLingData[id] ? this._ZhanLingData[id].level : 0;
    };
    ZhanLingModel.prototype.getZhanLingDataByStage = function (id) {
        if (!this._ZhanLingData[id].level)
            return 1;
        var stage = Math.floor(this._ZhanLingData[id].level / 10);
        var stage2 = Math.floor(this._ZhanLingData[id].level % 10);
        stage += 1;
        if (!stage2) {
            stage -= 1;
        }
        if (!stage)
            stage = 1;
        return stage;
    };
    ZhanLingModel.prototype.getZhanLingDataByNextStage = function (id) {
        var talentLv = 0;
        if (this._ZhanLingData[id]) {
            talentLv = this._ZhanLingData[id].talentLv;
        }
        var zlLevel = GlobalConfig.ZhanLingLevel[id];
        var nextConfig;
        for (var i in zlLevel) {
            var cfg = zlLevel[i];
            if (cfg.talentLevel > talentLv) {
                nextConfig = cfg;
                break;
            }
        }
        if (!nextConfig)
            return null;
        return this.getStageLv(nextConfig.level);
    };
    ZhanLingModel.prototype.getZhanLingDataByStar = function (id) {
        if (!this._ZhanLingData[id] || !this._ZhanLingData[id].level)
            return 0;
        var star = Math.floor(this._ZhanLingData[id].level % 10);
        if (!star)
            star = 10;
        return star;
    };
    ZhanLingModel.prototype.getZhanLingDataByTalentLv = function (id) {
        if (!this._ZhanLingData[id]) {
            return 0;
        }
        var lv = this.getZhanLingDataByLevel(id);
        var talentLevel = GlobalConfig.ZhanLingLevel[id][lv].talentLevel;
        if (talentLevel)
            this._ZhanLingData[id].talentLv = talentLevel;
        return this._ZhanLingData[id].talentLv;
    };
    ZhanLingModel.prototype.getZhanLingDataByExp = function (id) {
        return this._ZhanLingData[id] ? this._ZhanLingData[id].exp : 0;
    };
    ZhanLingModel.prototype.getZhanLingDataByItem = function (id, pos) {
        return this._ZhanLingData[id] ? this._ZhanLingData[id].items[pos - 1] : 0;
    };
    ZhanLingModel.prototype.getZhanLingDataByDrugUse = function (id, itemid) {
        if (!this._ZhanLingData[id])
            return false;
        var myCount = 0;
        var itemData = UserBag.ins().getBagItemById(itemid);
        myCount = itemData ? itemData.count : 0;
        if (!myCount)
            return false;
        var lv = this._ZhanLingData[id].level;
        var config = GlobalConfig.ZhanLingLevel[id][lv];
        if (id && !config.maxCount)
            false;
        var isUseMax = false;
        if (config.maxCount && config.maxCount[itemid]) {
            for (var i = 0; i < this._ZhanLingData[id].drugs.length; i++) {
                if (this._ZhanLingData[id].drugs[i].itemId == itemid && this._ZhanLingData[id].drugs[i].count >= config.maxCount[itemid]) {
                    isUseMax = true;
                    break;
                }
            }
        }
        if (isUseMax)
            return false;
        return true;
    };
    ZhanLingModel.prototype.getZhanLingDataByTalentId = function (id) {
        var config = GlobalConfig.ZhanLingBase[id];
        return config ? config.talent : 0;
    };
    ZhanLingModel.prototype.getZhanLingDataBySkill = function (id) {
        var skill = [];
        if (!this._ZhanLingData[id])
            return skill;
        return GlobalConfig.ZhanLingBase[id].skill;
    };
    ZhanLingModel.prototype.getZhanLingDataByDrug = function (id, itemid) {
        if (!this._ZhanLingData[id])
            return 0;
        for (var i = 0; i < this._ZhanLingData[id].drugs.length; i++) {
            if (this._ZhanLingData[id].drugs[i].itemId == itemid)
                return this._ZhanLingData[id].drugs[i].count;
        }
        return 0;
    };
    ZhanLingModel.prototype.getZhanLingDataBySuit = function (id) {
        if (!this._ZhanLingData[id])
            return 0;
        var lv = 0;
        for (var i = 0; i < this._ZhanLingData[id].items.length; i++) {
            var itemid = this._ZhanLingData[id].items[i];
            var config = GlobalConfig.ZhanLingEquip[itemid];
            if (!config)
                return 0;
            if (!lv)
                lv = config.level;
            if (lv > config.level)
                lv = config.level;
        }
        return lv;
    };
    ZhanLingModel.prototype.getZhanLingDataBySuitCount = function (id, lv) {
        if (!this._ZhanLingData[id])
            return 0;
        var count = 0;
        for (var i = 0; i < this._ZhanLingData[id].items.length; i++) {
            var itemid = this._ZhanLingData[id].items[i];
            var config = GlobalConfig.ZhanLingEquip[itemid];
            if (config.level >= lv) {
                count++;
            }
        }
        return count;
    };
    ZhanLingModel.prototype.getZhanLingDataByMat = function (id, act) {
        if (!act && !this._ZhanLingData[id])
            return 0;
        var config = GlobalConfig.ZhanLingBase[id];
        var talent = config.talent;
        var lv = 0;
        if (act) {
            lv = 1;
        }
        else {
            if (!this._ZhanLingData[id].talentLv)
                return 0;
            lv = this._ZhanLingData[id].talentLv + 1;
        }
        var zltconfig = GlobalConfig.ZhanLingTalent[talent][lv];
        return zltconfig ? zltconfig.costCount : 0;
    };
    ZhanLingModel.prototype.getZhanLingPower = function (id) {
        var power = 0;
        var lv = ZhanLingModel.ins().getZhanLingDataByLevel(id);
        var zllconfig = GlobalConfig.ZhanLingLevel[id][lv];
        if (!zllconfig)
            return [power, [], []];
        var zlData = ZhanLingModel.ins().getZhanLingDataById(id);
        if (!zlData)
            return [power, [], []];
        var nextzllconfig = GlobalConfig.ZhanLingLevel[id][lv + 1];
        var zlValue = 0;
        var zlAttr = [];
        var nzlAttr = [];
        var itValue = 0;
        var tzValue = 0;
        var tzAttr = [];
        var ntzAttr = [];
        var dyValue = 0;
        var dyAttr = [];
        var ndyAttr = [];
        var tfValue = 0;
        var jnValue = 0;
        zlValue += UserBag.getAttrPower(zllconfig.attrs) * SubRoles.ins().subRolesLen;
        for (var r = 0; r < SubRoles.ins().subRolesLen; r++) {
            var role = SubRoles.ins().getSubRoleByIndex(r);
            for (var i in zllconfig.attrs) {
                zlValue += ItemConfig.relatePower(zllconfig.attrs[i], role);
            }
        }
        zlValue += (zllconfig.expower ? zllconfig.expower : 0) * SubRoles.ins().subRolesLen;
        zlAttr = this.addAttrs(zlAttr, zllconfig.attrs);
        if (nextzllconfig) {
            nzlAttr = this.addAttrs(nzlAttr, nextzllconfig.attrs);
        }
        var suitLv = ZhanLingModel.ins().getZhanLingDataBySuit(id);
        if (suitLv) {
            var cfg = GlobalConfig.ZhanLingSuit[suitLv];
            if (cfg && cfg.attrs) {
                tzValue += UserBag.getAttrPower(cfg.attrs) * SubRoles.ins().subRolesLen;
                for (var i = 0; i < cfg.attrs.length; i++) {
                    for (var r = 0; r < SubRoles.ins().subRolesLen; r++) {
                        var role = SubRoles.ins().getSubRoleByIndex(r);
                        tzValue += ItemConfig.relatePower(cfg.attrs[i], role);
                    }
                }
                tzAttr = AttributeData.getPercentAttr(zlAttr, (cfg.precent / 10000));
                if (nextzllconfig) {
                    ntzAttr = AttributeData.getPercentAttr(nzlAttr, (cfg.precent / 10000));
                }
            }
        }
        for (var i = 0; i < zlData.drugs.length; i++) {
            var tempdyAttr = [];
            var ntempdyAttr = [];
            var uginfo = GlobalConfig.ZhanLingConfig.upgradeInfo[zlData.drugs[i].itemId];
            var uginfoAttr = [];
            for (var d = 0; d < uginfo.attr.length; d++) {
                var atb = new AttributeData();
                atb.type = uginfo.attr[d].type;
                atb.value = uginfo.attr[d].value * zlData.drugs[i].count;
                uginfoAttr.push(atb);
            }
            var uginfoFB = { attr: uginfoAttr, precent: uginfo.precent ? uginfo.precent * zlData.drugs[i].count : 0, sort: uginfo.sort };
            dyValue += UserBag.getAttrPower(uginfoFB.attr) * SubRoles.ins().subRolesLen;
            dyAttr = this.addAttrs(dyAttr, uginfoFB.attr);
            ndyAttr = this.addAttrs(ndyAttr, uginfoFB.attr);
            if (uginfoFB.precent) {
                dyValue += Math.floor(zlValue * uginfoFB.precent / 10000);
                if (suitLv)
                    dyValue += Math.floor(zlValue * uginfoFB.precent / 10000);
                tempdyAttr = AttributeData.getPercentAttr(zlAttr, (uginfoFB.precent / 10000));
                dyAttr = this.addAttrs(dyAttr, tempdyAttr);
                if (nextzllconfig) {
                    ntempdyAttr = AttributeData.getPercentAttr(nzlAttr, (uginfoFB.precent / 10000));
                    ndyAttr = this.addAttrs(ndyAttr, ntempdyAttr);
                }
            }
            for (var r = 0; r < SubRoles.ins().subRolesLen; r++) {
                var role = SubRoles.ins().getSubRoleByIndex(r);
                dyValue += ItemConfig.relatePower(uginfoFB.attr[i], role);
            }
        }
        for (var i = 1; i <= GlobalConfig.ZhanLingConfig.equipPosCount; i++) {
            var itemid = ZhanLingModel.ins().getZhanLingDataByItem(id, i);
            itValue += this.getZhanLingItemPower(itemid, 1);
        }
        var talentId = this.getZhanLingDataByTalentId(id);
        var talentLv = this.getZhanLingDataByTalentLv(id);
        var zlTalent = GlobalConfig.ZhanLingTalent[talentId][talentLv];
        if (zlTalent) {
            var tfexpower = zlTalent.expower;
            tfValue += (tfexpower ? tfexpower : 0) * SubRoles.ins().subRolesLen;
            if (zlTalent.attrs)
                tfValue += UserBag.getAttrPower(zlTalent.attrs) * SubRoles.ins().subRolesLen;
        }
        var zlbase = GlobalConfig.ZhanLingBase[id];
        for (var i = 0; i < zlbase.skill.length; i++) {
            var zlsConfig = GlobalConfig.ZhanLingSkill[zlbase.skill[i].id];
            if (!zlsConfig.attrs)
                continue;
            jnValue += UserBag.getAttrPower(zlsConfig.attrs) * SubRoles.ins().subRolesLen;
            for (var r = 0; r < SubRoles.ins().subRolesLen; r++) {
                var role = SubRoles.ins().getSubRoleByIndex(r);
                for (var j = 0; j < zlsConfig.attrs.length; j++) {
                    jnValue += ItemConfig.relatePower(zlsConfig.attrs[j], role);
                }
            }
            if (zlsConfig.expower)
                jnValue += zlsConfig.expower;
        }
        power = zlValue + itValue + tzValue + dyValue + tfValue + jnValue;
        zlAttr = this.addAttrs(zlAttr, tzAttr);
        zlAttr = this.addAttrs(zlAttr, dyAttr);
        if (nextzllconfig) {
            nzlAttr = this.addAttrs(nzlAttr, ntzAttr);
            nzlAttr = this.addAttrs(nzlAttr, ndyAttr);
        }
        return [power, zlAttr, nzlAttr];
    };
    ZhanLingModel.prototype.addAttrs = function (srcAttrs, descAttrs, clone) {
        if (clone === void 0) { clone = true; }
        var arr = clone ? [] : srcAttrs;
        if (clone) {
            for (var a = 0; a < srcAttrs.length; a++) {
                if (ZhanLingModel.showTypeList.indexOf(srcAttrs[a].type) != -1)
                    arr.push(new AttributeData(srcAttrs[a].type, srcAttrs[a].value));
            }
        }
        for (var i = 0; i < descAttrs.length; i++) {
            var isHave = false;
            if (ZhanLingModel.showTypeList.indexOf(descAttrs[i].type) == -1)
                continue;
            for (var j = 0; j < srcAttrs.length; j++) {
                if (srcAttrs[j].type == descAttrs[i].type) {
                    arr[j].value += descAttrs[i].value;
                    isHave = true;
                    break;
                }
            }
            if (!isHave) {
                arr.push(new AttributeData(descAttrs[i].type, descAttrs[i].value));
            }
        }
        return arr;
    };
    ZhanLingModel.prototype.getZhanLingItemPower = function (itemid, have) {
        if (have === void 0) { have = 0; }
        var power = 0;
        var config = GlobalConfig.ZhanLingEquip[itemid];
        if (!config)
            return power;
        var len = have ? SubRoles.ins().subRolesLen : 3;
        power += UserBag.getAttrPower(config.attrs) * len;
        if (have) {
            for (var i = 0; i < len; i++) {
                var role = SubRoles.ins().getSubRoleByIndex(i);
                for (var j = 0; j < config.attrs.length; j++) {
                    power += ItemConfig.relatePower(config.attrs[j], role);
                }
            }
        }
        return power;
    };
    ZhanLingModel.prototype.isUpGradeByStar = function (id) {
        if (!this.getZhanLingDataById(id)) {
            return this.isUpGradeByTalent(id, true);
        }
        var curLv = ZhanLingModel.ins().getZhanLingDataByLevel(id);
        var config = GlobalConfig.ZhanLingLevel[id][curLv];
        if (!config || !config.exp)
            return false;
        var curExp = ZhanLingModel.ins().getZhanLingDataByExp(id);
        var reExp = config.exp - curExp;
        reExp = reExp > 0 ? reExp : 0;
        var needCount = Math.ceil(reExp / GlobalConfig.ZhanLingConfig.stageitemexp);
        var itemData = UserBag.ins().getBagItemById(GlobalConfig.ZhanLingConfig.stageitemid);
        var curCount = itemData ? itemData.count : 0;
        return curCount >= needCount;
    };
    ZhanLingModel.prototype.isHintNum = function (id) {
        var zlData = ZhanLingModel.ins().getZhanLingDataById(id);
        if (!zlData)
            return false;
        var config = GlobalConfig.ZhanLingLevel[id][zlData.level];
        if (!config || !config.exp)
            return false;
        var itemData = UserBag.ins().getBagItemById(GlobalConfig.ZhanLingConfig.stageitemid);
        var curCount = itemData ? itemData.count : 0;
        return curCount >= GlobalConfig.ZhanLingConfig.hintNum;
    };
    ZhanLingModel.prototype.isUpGradeByTalent = function (id, isAct) {
        if (isAct === void 0) { isAct = false; }
        var zlData = ZhanLingModel.ins().getZhanLingDataById(id);
        if (!isAct && !zlData)
            return false;
        var baseconfig = GlobalConfig.ZhanLingBase[id];
        if (!baseconfig.mat)
            return false;
        var itemData = UserBag.ins().getBagItemById(baseconfig.mat);
        var curCount = itemData ? itemData.count : 0;
        var needCount = this.getZhanLingDataByMat(id, isAct);
        return needCount ? (curCount >= needCount) : false;
    };
    ZhanLingModel.prototype.updateShowZLlist = function () {
        var arr = [];
        for (var k in GlobalConfig.ZhanLingBase) {
            if (!GlobalConfig.ZhanLingBase[k].sort)
                continue;
            arr.push(GlobalConfig.ZhanLingBase[k]);
        }
        arr.sort(function (a, b) {
            if (a.sort < b.sort)
                return -1;
            else
                return 1;
        });
        this.showZLlist = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].show) {
                var zlData = ZhanLingModel.ins().getZhanLingDataById(arr[i].id);
                if (zlData)
                    this.showZLlist.push(arr[i]);
                else {
                    var itemData = UserBag.ins().getBagItemById(arr[i].mat);
                    if (itemData && itemData.count)
                        this.showZLlist.push(arr[i]);
                }
            }
            else {
                this.showZLlist.push(arr[i]);
            }
        }
    };
    ZhanLingModel.prototype.getZhanLingItemRedPoint = function (zlId) {
        var zlData = this.getZhanLingDataById(zlId);
        if (!zlData)
            return false;
        var itemData = UserBag.ins().getBagGoodsByType(ItemType.TYPE_21);
        if (itemData)
            itemData.sort(function (a, b) {
                var aconfig = GlobalConfig.ZhanLingEquip[a.configID];
                var bconfig = GlobalConfig.ZhanLingEquip[b.configID];
                if (aconfig.level > bconfig.level)
                    return -1;
                else
                    return 1;
            });
        for (var k = 0; k < zlData.items.length; k++) {
            var slot = k + 1;
            var itemid = zlData.items[k];
            var curequip = void 0;
            if (itemid) {
                curequip = GlobalConfig.ZhanLingEquip[itemid];
            }
            for (var i = 0; i < itemData.length; i++) {
                var id = itemData[i].configID;
                var config = GlobalConfig.ItemConfig[id];
                if (!config)
                    continue;
                var zlequip = GlobalConfig.ZhanLingEquip[id];
                if (!zlequip)
                    continue;
                if (slot != zlequip.pos)
                    continue;
                var lv = config.level ? config.level : 0;
                var zslv = config.zsLevel ? config.zsLevel : 0;
                if (UserZs.ins().lv >= zslv && Actor.level >= lv) {
                    if (curequip) {
                        if (zlequip.level > curequip.level) {
                            return true;
                        }
                        else {
                            break;
                        }
                    }
                    else {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    ZhanLingModel.prototype.getStageLv = function (level) {
        var stage = Math.floor(level / 10);
        var stage2 = Math.floor(level % 10);
        if (!stage2) {
            if (level && level % 10 == 0)
                stage2 = 10;
            else
                stage += 1;
        }
        else {
            stage += 1;
        }
        return [stage, stage2];
    };
    ZhanLingModel.showTypeList = [AttributeType.atAttack, AttributeType.atMaxHp, AttributeType.atDef, AttributeType.atRes];
    return ZhanLingModel;
}(BaseClass));
__reflect(ZhanLingModel.prototype, "ZhanLingModel");
//# sourceMappingURL=ZhanLingModel.js.map