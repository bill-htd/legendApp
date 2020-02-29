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
var ExtremeEquipModel = (function (_super) {
    __extends(ExtremeEquipModel, _super);
    function ExtremeEquipModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectJob = 0;
        return _this;
    }
    ExtremeEquipModel.ins = function () {
        return _super.ins.call(this);
    };
    Object.defineProperty(ExtremeEquipModel.prototype, "descNames", {
        get: function () {
            return ["至尊神剑", "至尊头盔", "至尊神甲", "至尊项链", "至尊手镯", "至尊腰带", "至尊戒指", "至尊鞋子"];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExtremeEquipModel.prototype, "positions", {
        get: function () {
            return [EquipPos.WEAPON, EquipPos.CLOTHES, EquipPos.Wrist, EquipPos.RING, EquipPos.SHOE, EquipPos.BRACELET, EquipPos.NECKLACE, EquipPos.HEAD];
        },
        enumerable: true,
        configurable: true
    });
    ExtremeEquipModel.prototype.getZhiZunLv = function (job, subType) {
        var role = SubRoles.ins().getSubRoleByJob(job);
        var data = role.getEquipByIndex(subType);
        var id = data.item.configID;
        if (id) {
            return data.soulLv;
        }
        return 0;
    };
    ExtremeEquipModel.prototype.getZhiZunLvByRoleID = function (role, subType) {
        if (!role || subType > EquipPos.SHOE)
            return 0;
        var data = role.getEquipByIndex(subType);
        var id = data.item.configID;
        if (id) {
            return data.soulLv;
        }
        return 0;
    };
    ExtremeEquipModel.prototype.isWear = function (job, subType) {
        var role = SubRoles.ins().getSubRoleByJob(job);
        var data = role.getEquipByIndex(subType);
        var id = data.item.configID;
        if (id) {
            return true;
        }
        return false;
    };
    ExtremeEquipModel.prototype.canOperate = function (job, subType) {
        var role = SubRoles.ins().getSubRoleByJob(job);
        var data = role.getEquipByIndex(subType);
        var id = data.item.configID;
        if (id) {
            var lv = data.soulLv;
            if (lv < this.getMaxZhiZunEquipLevel(ItemConfig.getSubType(data.item.itemConfig))) {
                var cfg = GlobalConfig.ZhiZunEquipLevel[subType][lv + 1];
                var need = cfg.materialInfo.count;
                var count = UserBag.ins().getBagGoodsCountById(0, cfg.materialInfo.id);
                return count >= need;
            }
        }
        return false;
    };
    ExtremeEquipModel.prototype.getRedPointByJob = function (job) {
        for (var i = EquipPos.WEAPON; i <= EquipPos.SHOE; i++) {
            if (this.canOperate(job, i))
                return true;
        }
        return false;
    };
    ExtremeEquipModel.prototype.getRedPoint = function () {
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            var role = SubRoles.ins().getSubRoleByIndex(i);
            var job = role.job;
            if (this.getRedPointByJob(job))
                return true;
        }
        return false;
    };
    ExtremeEquipModel.prototype.getMaxZhiZunEquipLevel = function (subType) {
        var count = CommonUtils.getObjectLength(GlobalConfig.ZhiZunEquipLevel[subType]);
        return count;
    };
    ExtremeEquipModel.prototype.getZhiZunSkills = function (role) {
        var equipPos = [EquipPos.WEAPON, EquipPos.CLOTHES];
        var skills = [];
        for (var _i = 0, equipPos_1 = equipPos; _i < equipPos_1.length; _i++) {
            var pos = equipPos_1[_i];
            var data = role.getEquipByIndex(pos);
            if (data.item.configID) {
                var lv = data.soulLv;
                if (lv > 0) {
                    var cfg = GlobalConfig.ZhiZunEquipLevel[pos][lv];
                    if (cfg.skillId) {
                        skills.push(new SkillData(cfg.skillId));
                    }
                }
            }
        }
        return skills;
    };
    ExtremeEquipModel.prototype.getZhiZunSkill = function (job, subType) {
        var role = SubRoles.ins().getSubRoleByJob(job);
        var data = role.getEquipByIndex(subType);
        var id = data.item.configID;
        if (id) {
            var lv = data.soulLv;
            if (lv > 0) {
                var cfg = GlobalConfig.ZhiZunEquipLevel[subType][lv];
                return cfg.skillId;
            }
        }
        return 0;
    };
    ExtremeEquipModel.prototype.getZhiZunLinkLv = function (roleIndex, mainPos, soullv) {
        var secPos = this.getLinkEquipPos(mainPos);
        var role = SubRoles.ins().getSubRoleByIndex(roleIndex - 1);
        if (Assert(role, "\u51FD\u6570getZhiZunLinkLv\uFF0C roleIndex:" + roleIndex + ",mainPos:" + mainPos + ",soullv:" + soullv))
            return 0;
        var mainEquip = role.getEquipByIndex(mainPos);
        var secEquip = role.getEquipByIndex(secPos);
        if (mainEquip && secEquip) {
            return Math.min(soullv, secEquip.soulLv);
        }
        return 0;
    };
    ExtremeEquipModel.prototype.getZhiZunLinkLvShow = function (roleIndex, mainPos, soullv) {
        var role = SubRoles.ins().getSubRoleByIndex(roleIndex);
        var mainEquip = role.getEquipByIndex(mainPos);
        if (mainEquip && soullv) {
            var config = GlobalConfig.ZhiZunEquipLevel[mainPos][soullv];
            return config.soulLinkLevel;
        }
        return 1;
    };
    ExtremeEquipModel.prototype.getLinkEquipPos = function (mainPos) {
        for (var i in GlobalConfig.ZhiZunLinkLevel) {
            if (i == mainPos.toString()) {
                for (var j in GlobalConfig.ZhiZunLinkLevel[i]) {
                    return +(j);
                }
            }
        }
        return null;
    };
    ExtremeEquipModel.prototype.getZhiZunLinkLevelConfig = function (pos, roleJob, next) {
        var subType = pos;
        var job = roleJob;
        var zhiZunLv = ExtremeEquipModel.ins().getZhiZunLv(job, subType);
        if (!zhiZunLv)
            zhiZunLv = 1;
        var secPos = ExtremeEquipModel.ins().getLinkEquipPos(subType);
        if (next)
            zhiZunLv += 1;
        var linkconfig = GlobalConfig.ZhiZunLinkLevel[subType][secPos][zhiZunLv];
        return linkconfig;
    };
    ExtremeEquipModel.prototype.getZhiZunEquipLevelConfig = function (pos, level, next) {
        var subType = pos;
        var zhiZunLv = level;
        if (!zhiZunLv)
            zhiZunLv = 1;
        if (next)
            zhiZunLv += 1;
        var config = GlobalConfig.ZhiZunEquipLevel[subType][zhiZunLv];
        return config;
    };
    ExtremeEquipModel.prototype.getSkillName = function (pos) {
        var zzel = GlobalConfig.ZhiZunEquipLevel[pos][1];
        if (!zzel)
            return "";
        var skillconfig = GlobalConfig.SkillsConfig[zzel.skillId];
        if (!skillconfig)
            return "";
        var sdconfig = GlobalConfig.SkillsDescConfig[skillconfig.desc];
        if (!sdconfig)
            return "";
        return sdconfig.name;
    };
    ExtremeEquipModel.prototype.getSkillDesc = function (pos) {
        var zzel = GlobalConfig.ZhiZunEquipLevel[pos][1];
        if (!zzel)
            return "";
        var skillconfig = GlobalConfig.SkillsConfig[zzel.skillId];
        if (!skillconfig)
            return "";
        var sdconfig = GlobalConfig.SkillsDescConfig[skillconfig.desc];
        if (!sdconfig)
            return "";
        var desc = sdconfig.desc;
        desc = desc.replace("%s%", skillconfig.desc_ex[0] + "");
        return desc;
    };
    return ExtremeEquipModel;
}(BaseClass));
__reflect(ExtremeEquipModel.prototype, "ExtremeEquipModel");
//# sourceMappingURL=ExtremeEquipModel.js.map