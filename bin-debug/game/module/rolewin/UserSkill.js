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
var UserSkill = (function (_super) {
    __extends(UserSkill, _super);
    function UserSkill() {
        var _this = _super.call(this) || this;
        _this.hejiLevel = -1;
        _this.hejiCD = 0;
        _this.hejiEnable = false;
        _this.isFirst = true;
        _this.fieldUse = false;
        _this.equipListData = [];
        _this.hejiProgressList = [];
        _this.reduceCD = 0;
        _this.sysId = PackageID.Skill;
        _this.regNetMsg(1, _this.doSkillResult);
        _this.regNetMsg(2, _this.postDoBuff);
        _this.regNetMsg(3, _this.postDoRemoveBuff);
        _this.regNetMsg(6, _this.doAddEffect);
        _this.regNetMsg(7, _this.doRemoveEffect);
        _this.regNetMsg(4, _this.postSkillUpgrade);
        _this.regNetMsg(5, _this.postSkillUpgradeAll);
        _this.regNetMsg(9, _this.postHejiInfo);
        _this.regNetMsg(10, _this.doHejiEquipInfo);
        _this.regNetMsg(11, _this.doHejiEquipUpdate);
        _this.regNetMsg(12, _this.doHejiUpdateInfo);
        _this.regNetMsg(13, _this.postUpgradeForge);
        return _this;
    }
    UserSkill.ins = function () {
        return _super.ins.call(this);
    };
    UserSkill.prototype.getPunchForge = function () {
        if (!this.punchEquipForge)
            this.punchEquipForge = new PunchEquipForgeData();
        return this.punchEquipForge;
    };
    UserSkill.prototype.sendUseSkill = function (suorceHandle, handle, skillID) {
        var bytes = this.getBytes(1);
        bytes.writeDouble(suorceHandle);
        bytes.writeDouble(handle);
        bytes.writeInt(skillID);
        this.sendToServer(bytes);
    };
    UserSkill.prototype.doSkillResult = function (bytes) {
        var sourceHandle = bytes.readDouble();
        var skillID = bytes.readInt();
        var targetHandle = bytes.readDouble();
        var charSource = EntityManager.ins().getEntityByHandle(sourceHandle);
        if (!charSource) {
            return;
        }
        var charTarget = EntityManager.ins().getEntityByHandle(targetHandle);
        if (!charTarget) {
            return;
        }
        if ((!charTarget.parent && charSource.isMy)) {
            EntityShowMgr.ins().showHideSomeOne(targetHandle);
        }
        if ((!charSource.parent && charTarget.isMy)) {
            EntityShowMgr.ins().showHideSomeOne(sourceHandle);
        }
        if (!charSource.parent) {
            return;
        }
        var skillCfg = new SkillData(skillID);
        var damageType = 0;
        if (Math.floor(skillID / 10000) == 7) {
            damageType = DamageTypes.Heji;
        }
        var count = bytes.readShort();
        var handle;
        var type;
        var value;
        if (charSource.isMy) {
            charTarget.showBlood(true);
            charTarget.showName(true);
        }
        if (charTarget.isMy) {
            charSource.showBlood(true);
            charSource.showName(true);
        }
        var infoList = [];
        var info = [];
        for (var i = 0; i < count; i++) {
            handle = bytes.readDouble();
            info = [handle];
            infoList[i] = info;
        }
        if (AIUtil.ins().userSkill(charSource, charTarget, skillCfg)) {
        }
        if ((charSource instanceof CharRole) && GuildWar.ins().getModel().checkinAppoint(2, true) && SubRoles.ins().getIsMyPlayer(targetHandle) && charSource.infoModel.name) {
            GuildWar.ins().getModel().changeWeiXieList(charSource.infoModel.masterHandle, true, charSource.infoModel.name);
        }
    };
    UserSkill.prototype.postDoBuff = function (bytes) {
        var handle = bytes.readDouble();
        var char = EntityManager.ins().getEntityByHandle(handle);
        if (char) {
            var buff = ObjectPool.pop('EntityBuff');
            buff.effConfig = GlobalConfig.EffectsConfig[bytes.readInt()];
            buff.value = 0;
            buff.addTime = egret.getTimer();
            char.addBuff(buff);
        }
    };
    UserSkill.prototype.postDoRemoveBuff = function (bytes) {
        var handle = bytes.readDouble();
        var char = EntityManager.ins().getEntityByHandle(handle);
        if (char) {
            var id = GlobalConfig.EffectsConfig[bytes.readInt()].group;
            if (char.hasBuff(id))
                char.removeBuff(char.buffList[id]);
        }
    };
    UserSkill.prototype.doAddEffect = function (bytes) {
        var handle = bytes.readDouble();
        var char = EntityManager.ins().getEntityByHandle(handle);
        if (char) {
            var id = bytes.readInt();
            char.addEffect(id);
        }
    };
    UserSkill.prototype.doRemoveEffect = function (bytes) {
        var handle = bytes.readDouble();
        var char = EntityManager.ins().getEntityByHandle(handle);
        if (char)
            char.removeEffect(bytes.readInt());
    };
    UserSkill.prototype.sendGrewUpSkill = function (roleId, skillID) {
        var bytes = this.getBytes(4);
        bytes.writeShort(roleId);
        bytes.writeShort(skillID);
        this.sendToServer(bytes);
    };
    UserSkill.prototype.postSkillUpgrade = function (bytes) {
        var roleId = bytes.readShort();
        var skillID = bytes.readShort();
        var level = bytes.readShort();
        var role = SubRoles.ins().getSubRoleByIndex(roleId);
        var lastLevel = role.skillsData[skillID].lv;
        role.skillsData[skillID] = SkillData.getSkillByJob(role.job, skillID + 1, level);
        if (lastLevel == 0 && level != 0) {
            UserTips.ins().showSkillTips(role.skillsData[skillID].configID);
        }
        return [roleId, skillID, level];
    };
    UserSkill.prototype.sendGrewUpAllSkill = function (roleId, isAll, skillID) {
        if (isAll === void 0) { isAll = true; }
        if (skillID === void 0) { skillID = 0; }
        var bytes = this.getBytes(5);
        bytes.writeShort(isAll ? 1 : 0);
        bytes.writeShort(roleId);
        bytes.writeShort(skillID);
        this.sendToServer(bytes);
    };
    UserSkill.prototype.postSkillUpgradeAll = function (bytes) {
        var roleId = bytes.readShort();
        var role = SubRoles.ins().getSubRoleByIndex(roleId);
        var old = role.skillsData;
        role.skillsData = [];
        for (var i = 0; i < 5; i++) {
            role.skillsData.push(SkillData.getSkillByJob(role.job, i + 1, bytes.readShort()));
        }
        return [old, roleId];
    };
    UserSkill.prototype.postHejiInfo = function (bytes) {
        var hejiLevel = bytes.readUnsignedInt();
        var cd = bytes.readUnsignedInt();
        var isAct = false;
        if (this.hejiLevel == -1 && hejiLevel == 1) {
            isAct = true;
        }
        if (this.hejiLevel != hejiLevel) {
            this.hejiLevel = hejiLevel;
            this.postHejiUpdate();
        }
        this.setHejiCD(cd);
        return { isAct: isAct };
    };
    UserSkill.prototype.doHejiEquipInfo = function (bytes) {
        this.equipListData = [];
        var equip;
        for (var i = 0; i < 8; i++) {
            equip = new ItemData();
            equip.parser(bytes);
            this.equipListData.push(equip);
        }
        this.setQimingInfo();
        this.postHejiEquipChange();
    };
    UserSkill.prototype.setQimingInfo = function () {
        this.qimingEquipDic = {};
        if (!this.qmArr) {
            this.qmArr = [];
            var td = GlobalConfig.TogetherHitEquipQmConfig;
            for (var tZs in td) {
                for (var tLv in td[tZs]) {
                    if (!isNaN(Number(tZs)) && !isNaN(Number(tLv))) {
                        var tNum = Number(tZs) * 10000 + Number(tLv);
                        this.qmArr.push(tNum);
                    }
                }
            }
        }
        for (var k in this.equipListData) {
            if (this.equipListData[k].configID != 0) {
                var item = this.equipListData[k].itemConfig;
                var lv = (item.zsLevel || 0) * 10000 + item.level;
                for (var j = 0; j < this.qmArr.length; j++) {
                    if (lv < this.qmArr[j])
                        continue;
                    var tLv = this.qmArr[j];
                    if (!this.qimingEquipDic[tLv]) {
                        this.qimingEquipDic[tLv] = { num: 0 };
                        this.qimingEquipDic[tLv].num = 1;
                    }
                    else {
                        this.qimingEquipDic[tLv].num++;
                    }
                }
            }
        }
        this.setQmAttr();
    };
    UserSkill.prototype.setQmAttr = function () {
        var config = GlobalConfig.TogetherHitEquipQmConfig;
        this.qimingAttrDic = {};
        for (var k in this.qimingEquipDic) {
            var zsLv = Math.floor(Number(k) / 10000);
            var lv = Math.floor(Number(k) % 10000);
            var num = this.qimingEquipDic[k].num;
            var tempConfig = config[zsLv][lv];
            if (tempConfig) {
                for (var i in tempConfig) {
                    if (num >= Number(i)) {
                        if (!this.qimingAttrDic[k])
                            this.qimingAttrDic[k] = {};
                        this.qimingAttrDic[k][i] = tempConfig[i];
                    }
                }
            }
        }
        this.qimingValueDic = {};
        for (var k in this.qimingAttrDic) {
            for (var l in this.qimingAttrDic[k]) {
                var obj = this.qimingAttrDic[k][l];
                var totalAtt = obj.exAttr["0"];
                if (!this.qimingValueDic[l])
                    this.qimingValueDic[l] = new Object;
                if (!this.qimingValueDic[l].value)
                    this.qimingValueDic[l].value = 0;
                this.qimingValueDic[l].type = totalAtt.type;
                this.qimingValueDic[l].value += totalAtt.value;
            }
        }
    };
    UserSkill.prototype.doHejiEquipUpdate = function (bytes) {
        var pos = bytes.readShort();
        var equip = new ItemData();
        equip.parser(bytes);
        this.equipListData[pos] = equip;
        this.setQimingInfo();
        this.postHejiEquipChange();
    };
    UserSkill.prototype.checkHejiOpen = function () {
        var id = GlobalConfig.TogerherHitBaseConfig.actImbaId;
        if (Artifact.ins().getNewArtifactBy(Artifact.ins().getArtifactIndexById(id))) {
            return Artifact.ins().getNewArtifactBy(Artifact.ins().getArtifactIndexById(id)).open;
        }
        return false;
    };
    UserSkill.prototype.canHejiEquip = function () {
        if (UserSkill.ins().hejiLevel <= 0)
            return false;
        if (Actor.level < UserSkill.HEJI_SHOW_LEVEL)
            return false;
        if (!this.equipListData)
            return false;
        for (var i = 0; i < this.equipListData.length; i++) {
            if (this.checkIsHaveBestEquip(i)) {
                return true;
            }
        }
        return false;
    };
    UserSkill.prototype.canExchange = function () {
        if (UserSkill.ins().hejiLevel <= 0)
            return false;
        if (Actor.level < UserSkill.HEJI_SHOW_LEVEL)
            return false;
        var cost;
        var maxZlv = this.getMaxzLv();
        for (var k in this.equipListData) {
            var item = this.equipListData[k];
            if (item && item.configID) {
                for (var index = +k + 1;; index += 8) {
                    var config = GlobalConfig.TogetherHitEquipExchangeConfig[index];
                    if (!config) {
                        break;
                    }
                    var lv = item.itemConfig.level ? item.itemConfig.level : 0;
                    var zsLv = item.itemConfig.zsLevel ? item.itemConfig.zsLevel : 0;
                    var tempLv = config.level;
                    var tempZslv = config.zsLevel;
                    var getItemId = config.getItem.id;
                    if (tempLv <= lv && tempZslv <= zsLv) {
                        continue;
                    }
                    if ((getItemId % 10000) <= (item.configID % 10000)) {
                        continue;
                    }
                    if (tempLv > Actor.level || tempZslv > UserZs.ins().lv) {
                        continue;
                    }
                    if (tempZslv > maxZlv[0] || tempLv > maxZlv[1]) {
                        break;
                    }
                    if (tempZslv >= zsLv) {
                        if (tempLv >= lv) {
                            cost = config.exchangeMaterial[0]["count"];
                            if (config.exchangeMaterial[0].id == MoneyConst.punch1 && Actor.togeatter1 >= cost) {
                                return true;
                            }
                            else if (config.exchangeMaterial[0].id == MoneyConst.punch2 && Actor.togeatter2 >= cost) {
                                return true;
                            }
                        }
                    }
                }
            }
            else {
                var tempData = GlobalConfig.TogetherHitEquipExchangeConfig[Number(k) + 1];
                if (tempData) {
                    cost = tempData.exchangeMaterial[0]["count"];
                    if (tempData.exchangeMaterial[0].id == MoneyConst.punch1 && Actor.togeatter1 >= cost) {
                        return true;
                    }
                    else if (tempData.exchangeMaterial[0].id == MoneyConst.punch2 && Actor.togeatter2 >= cost) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    UserSkill.prototype.getMaxzLv = function () {
        var maxLv = 0;
        var zs = 0;
        var lv = 0;
        var dic = UserSkill.ins().qimingEquipDic;
        for (var lv_1 in dic) {
            if (+lv_1 > maxLv) {
                maxLv = +lv_1;
            }
        }
        zs = Math.floor(maxLv / 10000);
        lv = maxLv % 10000;
        if (maxLv == 0 || dic[maxLv].num == 8) {
            var config = GlobalConfig.TogetherHitEquipQmConfig;
            var zsArr = [];
            for (var z in config) {
                zsArr.push(+z);
            }
            zsArr.sort(function (a, b) { return a < b ? -1 : 1; });
            if (maxLv == 0) {
                zs = zsArr[0];
            }
            else {
                zs = zsArr[zsArr.indexOf(zs) + 1];
                if (zs == undefined) {
                    zs = zsArr[zsArr.length - 1];
                }
            }
            for (var v in config[zs]) {
                lv = +v;
            }
        }
        return [zs, lv];
    };
    UserSkill.prototype.getPunchExchangePageRedPoint = function (page) {
        var cost;
        var maxZlv = this.getMaxzLv();
        for (var k in this.equipListData) {
            var item = this.equipListData[k];
            if (item && item.configID) {
                if (page == 1)
                    continue;
                var oldIndex = (+k + 1) + (page - 2) * 8;
                var config = GlobalConfig.TogetherHitEquipExchangeConfig[oldIndex];
                var getItemId = config.getItem.id;
                if (getItemId != item.configID) {
                    continue;
                }
                var index = (+k + 1) + (page - 1) * 8;
                config = GlobalConfig.TogetherHitEquipExchangeConfig[index];
                if (config) {
                    var lv = item.itemConfig.level ? item.itemConfig.level : 0;
                    var zsLv = item.itemConfig.zsLevel ? item.itemConfig.zsLevel : 0;
                    var tempLv = config.level;
                    var tempZslv = config.zsLevel;
                    var getItemId_1 = config.getItem.id;
                    if (tempLv <= lv && tempZslv <= zsLv) {
                        continue;
                    }
                    if ((getItemId_1 % 10000) <= (item.configID % 10000)) {
                        continue;
                    }
                    if (tempLv > Actor.level || tempZslv > UserZs.ins().lv) {
                        continue;
                    }
                    if (tempZslv > maxZlv[0] || tempLv > maxZlv[1]) {
                        continue;
                    }
                    if (tempZslv >= zsLv) {
                        if (tempLv >= lv) {
                            cost = config.exchangeMaterial[0]["count"];
                            if (config.exchangeMaterial[0].id == MoneyConst.punch1 && Actor.togeatter1 >= cost) {
                                return true;
                            }
                            else if (config.exchangeMaterial[0].id == MoneyConst.punch2 && Actor.togeatter2 >= cost) {
                                return true;
                            }
                        }
                    }
                }
            }
            else if (page == 1) {
                var tempData = GlobalConfig.TogetherHitEquipExchangeConfig[Number(k) + 1];
                if (tempData) {
                    cost = tempData.exchangeMaterial[0]["count"];
                    if (tempData.exchangeMaterial[0].id == MoneyConst.punch1 && Actor.togeatter1 >= cost) {
                        return true;
                    }
                    else if (tempData.exchangeMaterial[0].id == MoneyConst.punch2 && Actor.togeatter2 >= cost) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    UserSkill.prototype.getPunchExchangeItemRedPoint = function (id) {
        var index = (id - 1) % 8;
        var page = Math.ceil(id / 8);
        var item = this.equipListData[index];
        var cost;
        if (page == 1) {
            if (item && item.configID) {
                return false;
            }
        }
        else {
            if (!item || !item.configID) {
                return false;
            }
            var config = GlobalConfig.TogetherHitEquipExchangeConfig[id - 8];
            if (config.getItem.id != item.configID) {
                return false;
            }
        }
        var tempData = GlobalConfig.TogetherHitEquipExchangeConfig[id];
        if (tempData) {
            if (tempData.zsLevel > UserZs.ins().lv || tempData.level > Actor.level) {
                return false;
            }
            cost = tempData.exchangeMaterial[0]["count"];
            if (tempData.exchangeMaterial[0].id == MoneyConst.punch1 && Actor.togeatter1 >= cost) {
                return true;
            }
            else if (tempData.exchangeMaterial[0].id == MoneyConst.punch2 && Actor.togeatter2 >= cost) {
                return true;
            }
        }
        return false;
    };
    UserSkill.prototype.canAcitve = function () {
        return false;
    };
    UserSkill.prototype.canSolve = function () {
        if (UserSkill.ins().hejiLevel <= 0)
            return false;
        if (Actor.level < UserSkill.HEJI_SHOW_LEVEL)
            return false;
        var itemArr = [];
        UserBag.ins().checkHejiEquipsTodestroy(itemArr);
        if (itemArr.length)
            return true;
        return false;
    };
    UserSkill.prototype.doHejiUpdateInfo = function (bytes) {
        var len = bytes.readByte();
        this.hejiProgressList = [];
        for (var i = 0; i < len; i++) {
            var item = new HejiProgressData();
            item.parser(bytes);
            this.hejiProgressList[item.id - 1] = item;
        }
    };
    UserSkill.prototype.setHejiCD = function (cd) {
        if (cd === void 0) { cd = 0; }
        if (this.hejiLevel > 0) {
            var skill = UserSkill.ins().getHejiSkillId();
            this.reduceCD = 0;
            var role = EntityManager.ins().getMainRole(0);
            if (role && role.infoModel && role.infoModel.getExAtt(ExAttributeType.eatTogetherHitCdSub) > 0) {
                this.reduceCD = role.infoModel.getExAtt(ExAttributeType.eatTogetherHitCdSub) / 10000 * skill.cd;
            }
            if (cd == -1) {
                this.hejiCD = GameServer.serverTime + skill.cd - this.reduceCD;
            }
            else {
                this.hejiCD = GameServer.serverTime + cd;
            }
            this.postHejiStartCD();
        }
    };
    UserSkill.prototype.getHejiSkillId = function () {
        var config = GlobalConfig.TogetherHitConfig[UserSkill.ins().hejiLevel];
        var model = SubRoles.ins().getSubRoleByIndex(0);
        if (!model) {
            return new SkillData(GlobalConfig.SkillsConfig[config.skill_id[0]].id);
        }
        var curSkill = GlobalConfig.SkillsConfig[config.skill_id[model.job - 1]];
        return new SkillData(curSkill.id);
    };
    UserSkill.prototype.getHejiSkillIdIcon = function () {
        var config = GlobalConfig.TogetherHitConfig[UserSkill.ins().hejiLevel];
        var model = SubRoles.ins().getSubRoleByIndex(0);
        if (!model)
            model = { job: 1 };
        var curSkill = GlobalConfig.SkillsConfig[config.skill_id[model.job - 1]];
        var icon = Math.floor(curSkill.id / 1000) * 1000 + "_png";
        return icon;
    };
    UserSkill.prototype.getSkillIdIcon = function (id) {
        var curSkill = GlobalConfig.SkillsConfig[id];
        var icon = Math.floor(curSkill.id / 1000) * 1000 + "_png";
        return icon;
    };
    UserSkill.prototype.sendGrewUpHejiSkill = function () {
        this.sendBaseProto(9);
    };
    UserSkill.prototype.sendUseHejiSkill = function () {
        this.sendBaseProto(10);
    };
    UserSkill.prototype.sendDressHejiEquip = function (equipId, pos) {
        var bytes = this.getBytes(11);
        bytes.writeDouble(equipId);
        bytes.writeShort(pos);
        this.sendToServer(bytes);
    };
    UserSkill.prototype.sendExchangeHejiEquip = function (id) {
        var bytes = this.getBytes(12);
        bytes.writeShort(id);
        this.sendToServer(bytes);
    };
    UserSkill.prototype.getWearEquipsData = function (pos) {
        if (this.equipListData[pos])
            return this.equipListData[pos];
        return null;
    };
    UserSkill.prototype.getSkillLimitLevel = function () {
        return UserZs.ins().lv > 0 ? 80 + UserZs.ins().lv * 10 : (Actor.level > 80 ? 80 : Actor.level);
    };
    UserSkill.prototype.getSingleSkillGrewUpCost = function (roleID, skillIndex) {
        var limitLevel = this.getSkillLimitLevel();
        var singleSkillLevel = SubRoles.ins().getSubRoleByIndex(roleID).skillsData[skillIndex];
        var coin = Actor.gold;
        var cost = 0;
        if (singleSkillLevel.lv > 0) {
            for (var i = singleSkillLevel.lv; i < limitLevel; i++) {
                var upgradeCost = GlobalConfig.SkillsUpgradeConfig[i].cost;
                if (cost + upgradeCost > coin) {
                    return cost;
                }
                else {
                    cost += upgradeCost;
                }
            }
            return cost;
        }
        return 0;
    };
    UserSkill.prototype.canGrewupSkill = function () {
        var isOpens = [];
        var limitLevel = this.getSkillLimitLevel();
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            var role = SubRoles.ins().getSubRoleByIndex(i);
            for (var j = 0; j < role.skillsData.length; j++) {
                var skillData = role.skillsData[j];
                if (skillData.lv > 0 && limitLevel > skillData.lv) {
                    var cost = GlobalConfig.SkillsUpgradeConfig[skillData.lv].cost;
                    if (Actor.gold >= cost) {
                        isOpens[i] = true;
                        break;
                    }
                }
            }
        }
        return isOpens;
    };
    UserSkill.prototype.canGrewupAllSkills = function (roleId) {
        var skillMaxLevel = this.getSkillLimitLevel();
        var skillsLevel = SubRoles.ins().getSubRoleByIndex(roleId).skillsData;
        var isCan = false;
        var coin = Actor.gold;
        for (var i = 0; i < skillsLevel.length; i++) {
            var level = skillsLevel[i];
            if (level.configID == 0)
                continue;
            var upgradeCof = GlobalConfig.SkillsUpgradeConfig[level.lv];
            if (upgradeCof) {
                if (coin >= upgradeCof.cost && level.configID != skillMaxLevel)
                    isCan = true;
            }
        }
        if (isCan) {
            for (var i = 0; i < 5; i++) {
                var level = skillsLevel[i];
                if (level.lv > 0) {
                    if (level.lv < UserSkill.ins().getSkillLimitLevel()) {
                        var costAllNum = UserSkill.ins().getSingleSkillGrewUpCost(roleId, i);
                        if (costAllNum > 0) {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
        return isCan;
    };
    UserSkill.prototype.postShowSkillWord = function (skillWord) {
        return skillWord;
    };
    UserSkill.prototype.postHejiUpdate = function () {
    };
    UserSkill.prototype.postHejiStartCD = function () {
    };
    UserSkill.prototype.postHejiRemove = function () {
    };
    UserSkill.prototype.postHejiEquipChange = function () {
    };
    UserSkill.prototype.checkIsHaveBestEquip = function (pos, roleIndex) {
        if (roleIndex === void 0) { roleIndex = -1; }
        var wear = this.equipListData[pos];
        var itemList = UserBag.ins().getHejiEquipsByType(pos);
        if (itemList.length > 0) {
            var best = void 0;
            var level = 200;
            for (var i = 0; i < itemList.length; i++) {
                best = itemList[i];
                var itemLv = best.itemConfig.level ? best.itemConfig.level : 0;
                var itemzsLv = best.itemConfig.zsLevel ? best.itemConfig.zsLevel : 0;
                if (best.itemConfig.level <= level && (itemLv <= Actor.level || itemzsLv <= UserZs.ins().lv) &&
                    best.itemConfig.level <= Actor.level && itemzsLv <= UserZs.ins().lv) {
                    var wearPoint = 0;
                    if (wear && wear.configID != 0) {
                        wearPoint = wear.point;
                    }
                    else {
                        if (!best.itemConfig.useCond) {
                            return true;
                        }
                        else {
                            continue;
                        }
                    }
                    var beatPoint = best.point;
                    if (beatPoint > wearPoint && best.itemConfig.useCond == wear.itemConfig.id) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    UserSkill.prototype.sendUpgradeForge = function (pos) {
        var bytes = this.getBytes(13);
        bytes.writeShort(pos);
        this.sendToServer(bytes);
    };
    UserSkill.prototype.postUpgradeForge = function (bytes) {
        this.getPunchForge().parser(bytes);
    };
    UserSkill.prototype.sendChangeTogeatterHigh = function (num) {
        var bytes = this.getBytes(14);
        bytes.writeInt(num);
        this.sendToServer(bytes);
    };
    UserSkill.prototype.isHejiSkill = function (id) {
        for (var i in GlobalConfig.TogetherHitConfig) {
            if (GlobalConfig.TogetherHitConfig[i].skill_id.indexOf(id) >= 0)
                return true;
        }
        return false;
    };
    UserSkill.MAX_LEVEL = 200;
    UserSkill.ACTIVE_LEVEL = 10;
    UserSkill.HEJI_SKILL = 70000;
    UserSkill.HEJI_SHOW_LEVEL = 60;
    UserSkill.descArr = [
        "合击技能对角色伤害+%s",
        "合击技能对怪物伤害+%s",
        "怒气恢复速度+%s"
    ];
    return UserSkill;
}(BaseSystem));
__reflect(UserSkill.prototype, "UserSkill");
var GameSystem;
(function (GameSystem) {
    GameSystem.userskill = UserSkill.ins.bind(UserSkill);
})(GameSystem || (GameSystem = {}));
var SHORT_SKILLID;
(function (SHORT_SKILLID) {
    SHORT_SKILLID[SHORT_SKILLID["MAGIC"] = 24] = "MAGIC";
    SHORT_SKILLID[SHORT_SKILLID["CURE"] = 32] = "CURE";
    SHORT_SKILLID[SHORT_SKILLID["POISONING"] = 33] = "POISONING";
    SHORT_SKILLID[SHORT_SKILLID["ARMOR"] = 34] = "ARMOR";
    SHORT_SKILLID[SHORT_SKILLID["SUMMON"] = 35] = "SUMMON";
})(SHORT_SKILLID || (SHORT_SKILLID = {}));
var SkillConst = (function () {
    function SkillConst() {
    }
    SkillConst.EFF_SKY_BALL = 53001;
    SkillConst.HEJI_SKILLS = [71001, 72001, 73001];
    return SkillConst;
}());
__reflect(SkillConst.prototype, "SkillConst");
//# sourceMappingURL=UserSkill.js.map