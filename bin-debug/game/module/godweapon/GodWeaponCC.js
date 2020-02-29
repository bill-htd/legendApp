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
var GodWeaponCC = (function (_super) {
    __extends(GodWeaponCC, _super);
    function GodWeaponCC() {
        var _this = _super.call(this) || this;
        _this.curExp = 0;
        _this._firstExp = true;
        _this.weaponDataAry = [];
        _this._isFirst = false;
        _this.exattrDesObj = {
            "43": "施放刺杀剑法附加吸血效果，恢复%s%%伤害值的生命",
            "48": "白虎会吸收其他角色的亡魂，每死亡一个角色，其伤害提高%s%%",
            "44": "攻击时有几率触发武神之怒效果",
            "45": "攻击时有几率触发武神之怒效果",
            "46": "攻击时有几率触发武神之怒效果",
            "47": "白虎攻击时有10%机率狂暴，增加自身%s%%攻击力并且必暴击，持续3秒"
        };
        _this.sysId = PackageID.GodWeapon;
        _this.gwTask = new GwTaskData();
        _this.regNetMsg(1, _this.postUpdateExp);
        _this.regNetMsg(2, _this.postUpdateInfo);
        _this.regNetMsg(6, _this.postFubenInfo);
        _this.regNetMsg(9, _this.postRankInfo);
        _this.regNetMsg(13, _this.doGetAward);
        _this.regNetMsg(10, _this.postGwTask);
        return _this;
    }
    GodWeaponCC.ins = function () {
        return _super.ins.call(this);
    };
    GodWeaponCC.prototype.createData = function () {
        if (this._isFirst == false) {
            this.initData();
            this._isFirst = true;
        }
    };
    GodWeaponCC.prototype.initData = function () {
        this.maxSkillIdAry = [];
        this.weaponDataAry = [];
        this.allSkillData = {};
        this.allSkillData2 = {};
        this.allGodItemData = {};
        for (var key in GlobalConfig.GodWeaponLineConfig) {
            var tempObj = {};
            var tempObj2 = {};
            var data = GlobalConfig.GodWeaponLineConfig[key];
            this.allSkillData[key] = tempObj;
            this.allSkillData2[key] = tempObj2;
            var maxId = 0;
            for (var i in data) {
                var skillData = new GwSkillData();
                skillData.skillId = parseInt(i);
                skillData.skillLv = 0;
                skillData.config = data[i];
                skillData.weaponId = parseInt(key);
                tempObj2[skillData.skillId] = skillData;
                tempObj[skillData.config.skinId] = skillData;
                maxId++;
            }
            this.maxSkillIdAry.push(maxId);
            var aryItem = [];
            for (var j = 0; j < GlobalConfig.GodWeaponBaseConfig.weaponItemCount; j++) {
                var item = new GwItem();
                item.pos = j + 1;
                item.itemId = undefined;
                item.config = null;
                item.weaponId = parseInt(key);
                aryItem.push(item);
            }
            this.allGodItemData[key] = aryItem;
        }
        this.gwSkillConfig = {};
        for (var key in GlobalConfig.GWSkillReviseConfig) {
            var data = GlobalConfig.GWSkillReviseConfig[key];
            if (!this.gwSkillConfig[data.skill])
                this.gwSkillConfig[data.skill] = {};
            this.gwSkillConfig[data.skill][data.gwIndex] = data;
        }
    };
    GodWeaponCC.prototype.godWeaponIsOpen = function () {
        return UserZs.ins().lv >= GlobalConfig.GodWeaponBaseConfig.zhuanshengLevel && GameServer.serverOpenDay >= GlobalConfig.GodWeaponBaseConfig.openDay;
    };
    GodWeaponCC.prototype.getReviseBySkill = function (skillId) {
        if (!this.allSkillData2)
            return null;
        var weaponId = ("" + skillId).charAt(0);
        var skillData = this.allSkillData2[weaponId];
        if (!skillData)
            return null;
        var skill = Math.floor(skillId / 1000);
        var skills = [];
        for (var skillIdx in skillData) {
            var data = skillData[skillIdx];
            if (data.config.skill == skill) {
                if (data.skillLv == 0) {
                    continue;
                }
                var lv = data.skillLv + data.addLv;
                var index = data.skillId * 1000 + lv;
                if (this.gwSkillConfig[skill] && this.gwSkillConfig[skill][index]) {
                    skills.push(this.gwSkillConfig[skill][index]);
                }
            }
        }
        return skills;
    };
    GodWeaponCC.prototype.getJobGWNewSkill = function (job) {
        if (!this.allSkillData2)
            return null;
        var skillData = this.allSkillData2[job];
        if (!skillData)
            return null;
        var roleData = SubRoles.ins().getSubRoleByJob(job);
        if (!roleData)
            return null;
        if (!roleData.godWeaponSkills)
            roleData.godWeaponSkills = [];
        var count = 0;
        for (var skillIdx in skillData) {
            var data = skillData[skillIdx];
            if (data.config.newskill || data.config.passiveskill) {
                var skill = data.config.newskill || data.config.passiveskill;
                var skillId = skill * 1000 + (data.skillLv + data.addLv);
                roleData.godWeaponSkills[count] = roleData.godWeaponSkills[count] || new SkillData(skillId);
                roleData.godWeaponSkills[count].configID = skillId;
                count += 1;
            }
        }
        return roleData.godWeaponSkills;
    };
    GodWeaponCC.prototype.getWeaponSkinIdData = function (weaponId, skinId) {
        return this.allSkillData[weaponId][skinId];
    };
    GodWeaponCC.prototype.getWeaponSkillidData = function (weaponId, skillId) {
        return this.allSkillData2[weaponId][skillId];
    };
    GodWeaponCC.prototype.getGodItemData = function (weaponId, pos) {
        return this.allGodItemData[weaponId][pos - 1];
    };
    GodWeaponCC.prototype.postUpdateExp = function (bytes) {
        var oldExp = this.curExp;
        this.curExp = bytes.readInt();
        if (!this._firstExp) {
            if (this.curExp - oldExp > 0)
                UserTips.ins().showTips("|C:0xffd93f&T:\u795E\u5175\u7ECF\u9A8C  +" + (this.curExp - oldExp) + "|");
        }
        this._firstExp = false;
    };
    GodWeaponCC.prototype.postUpdateInfo = function (bytes) {
        this.createData();
        var count = bytes.readInt();
        var data;
        for (var i = 0; i < count; i++) {
            if (this.weaponDataAry[i]) {
                data = this.weaponDataAry[i];
                data.parse(bytes);
            }
            else {
                data = new GodWeaponData(bytes);
                this.weaponDataAry.push(data);
            }
        }
        this.weaponDataAry.sort(function (a, b) {
            if (a.weaponId < b.weaponId)
                return -1;
            return 1;
        });
    };
    GodWeaponCC.prototype.getWeaponData = function (weaponId) {
        if (this.weaponDataAry) {
            for (var _i = 0, _a = this.weaponDataAry; _i < _a.length; _i++) {
                var data = _a[_i];
                if (data.weaponId == weaponId)
                    return data;
            }
        }
        return null;
    };
    GodWeaponCC.prototype.upSkill = function (weaponId, skillId) {
        var bytes = this.getBytes(3);
        bytes.writeInt(weaponId);
        bytes.writeInt(skillId);
        this.sendToServer(bytes);
    };
    GodWeaponCC.prototype.inlayItem = function (weaponId, pos, itemId) {
        var bytes = this.getBytes(4);
        bytes.writeInt(weaponId);
        bytes.writeInt(pos);
        bytes.writeInt(itemId);
        this.sendToServer(bytes);
    };
    GodWeaponCC.prototype.upWeapon = function (value) {
        var bytes = this.getBytes(5);
        bytes.writeInt(value);
        this.sendToServer(bytes);
    };
    GodWeaponCC.prototype.hadRedPoint = function () {
        this.createData();
        var b = false;
        if (GameServer.serverOpenDay < GlobalConfig.GodWeaponBaseConfig.openDay) {
            return b;
        }
        if (GodWeaponRedPoint.ins().gwTaskRed) {
            b = true;
        }
        else {
            for (var i = 0; i < this.weaponDataAry.length; i++) {
                if (this.weaponDataAry[i] && this.weaponDataAry[i].hasRedPoint == true || this.getSwRedPoint(this.weaponDataAry[i].weaponId)) {
                    b = true;
                    break;
                }
            }
        }
        b = b || this.mijintHadRedPoint() || this.maxLvRedPoint();
        return b;
    };
    GodWeaponCC.prototype.maxLvRedPoint = function () {
        if (!this.weaponDataAry)
            return false;
        var tempData = this.weaponDataAry.concat();
        tempData.sort(function (a, b) {
            return a.curLv - b.curLv;
        });
        var dataMax = tempData[tempData.length - 1];
        if (dataMax && dataMax.config && GodWeaponCC.ins().curExp >= dataMax.config.everyExp * 2) {
            return true;
        }
        else {
            return false;
        }
    };
    GodWeaponCC.prototype.mijintHadRedPoint = function () {
        if (this.godWeaponIsOpen() && this.fubenInfoData && this.fubenInfoData.hadChallengeNum > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    GodWeaponCC.prototype.getSwRedPoint = function (weaponId) {
        var ary = this.allGodItemData[weaponId];
        var data;
        for (var i = 0; i < ary.length; i++) {
            data = ary[i];
            if (data.isOpen && !data.itemId && GwShengWuChooseView.getGwItemType(data).length > 0) {
                return true;
            }
        }
        return false;
    };
    GodWeaponCC.prototype.gwAddAttr = function (weaponId) {
        var weaponData = this.getWeaponData(weaponId + 1);
        if (!weaponData)
            return [];
        var gwAry = weaponData.addAttr.concat();
        var dataSkill;
        var i = 0;
        var j = 0;
        for (i = 0; i < this.maxSkillIdAry[weaponId]; i++) {
            dataSkill = this.getWeaponSkillidData(weaponId + 1, i + 1);
            if (dataSkill.skillLv + dataSkill.addLv > 0) {
                if (dataSkill.config.attr) {
                    for (j = 0; j < dataSkill.config.attr.length; j++) {
                        var objData = { value: 0, type: 0 };
                        objData.value = dataSkill.config.attr[j].value * (dataSkill.skillLv + dataSkill.addLv);
                        objData.type = dataSkill.config.attr[j].type;
                        gwAry.push(objData);
                    }
                }
            }
        }
        var aryGw = this.allGodItemData[weaponId + 1];
        for (i = 0; i < aryGw.length; i++) {
            if (aryGw[i].itemId) {
                for (j = 0; j < aryGw[i].config.attr.length; j++) {
                    var objData = { value: 0, type: 0 };
                    objData.value = aryGw[i].config.attr[j].value;
                    objData.type = aryGw[i].config.attr[j].type;
                    gwAry.push(objData);
                }
            }
        }
        var addAry = [];
        for (i = 0; i < gwAry.length; i++) {
            var b = false;
            for (j = 0; j < addAry.length; j++) {
                if (addAry[j].type == gwAry[i].type) {
                    addAry[j].value += gwAry[i].value;
                    b = false;
                    break;
                }
                else {
                    b = true;
                }
            }
            if (b == true || addAry.length == 0) {
                var objData = { value: gwAry[i].value, type: gwAry[i].type };
                addAry.push(objData);
            }
        }
        return addAry;
    };
    GodWeaponCC.prototype.postFubenInfo = function (bytes) {
        if (!this.fubenInfoData) {
            this.fubenInfoData = new GwFubenData();
        }
        this.fubenInfoData.parse(bytes);
    };
    GodWeaponCC.prototype.postRankInfo = function (bytes) {
        if (!this.rankInfoDataAry) {
            this.rankInfoDataAry = [];
        }
        var count = bytes.readInt();
        var data;
        for (var i = 0; i < count; i++) {
            data = this.rankInfoDataAry[i];
            if (!data) {
                data = new GwRankInfoData();
                this.rankInfoDataAry[i] = data;
            }
            data.parse(bytes);
        }
        this.rankInfoDataAry.sort(this.sortFun);
    };
    GodWeaponCC.prototype.sortFun = function (a, b) {
        return a.rank - b.rank;
    };
    GodWeaponCC.prototype.postGwTask = function (bytes) {
        this.gwTask.parser(bytes);
    };
    GodWeaponCC.prototype.requestFubenInfo = function () {
        var bytes = this.getBytes(6);
        this.sendToServer(bytes);
    };
    GodWeaponCC.prototype.joinFuben = function (value) {
        var bytes = this.getBytes(7);
        bytes.writeInt(value);
        this.sendToServer(bytes);
    };
    GodWeaponCC.prototype.buybuff = function (type) {
        var bytes = this.getBytes(8);
        bytes.writeInt(type);
        this.sendToServer(bytes);
    };
    GodWeaponCC.prototype.requestRanInfo = function () {
        var bytes = this.getBytes(9);
        this.sendToServer(bytes);
    };
    GodWeaponCC.prototype.doGetAward = function (bytes) {
        var win = bytes.readByte();
        var curPoint = bytes.readByte();
        if (ViewManager.gamescene) {
            ViewManager.gamescene.removeMiingTimeFun();
            ViewManager.gamescene.setMJPingfen(curPoint);
        }
        if (win) {
            ViewManager.ins().open(GwResultView, GameMap.fubenID, curPoint, UserFb.ins().mijingUseTime);
        }
        else {
            ViewManager.ins().open(GwResultView, GameMap.fubenID, 4);
        }
    };
    GodWeaponCC.prototype.requestGetAward = function () {
        var bytes = this.getBytes(13);
        this.sendToServer(bytes);
    };
    GodWeaponCC.prototype.requestReceiveTask = function (job) {
        var bytes = this.getBytes(11);
        bytes.writeInt(job);
        this.sendToServer(bytes);
    };
    GodWeaponCC.prototype.requestActiveWeapon = function () {
        this.sendBaseProto(12);
    };
    GodWeaponCC.prototype.getPinfenTime = function (index) {
        var time;
        if (!this._timeMijinAry) {
            this._timeMijinAry = [];
            for (var key in GlobalConfig.GodWeaponBaseConfig.fbGrade) {
                if (time) {
                    this._timeMijinAry.push(GlobalConfig.GodWeaponBaseConfig.fbGrade[key] - time);
                    time = GlobalConfig.GodWeaponBaseConfig.fbGrade[key];
                }
                else {
                    time = GlobalConfig.GodWeaponBaseConfig.fbGrade[key];
                    this._timeMijinAry.push(time);
                }
            }
        }
        return this._timeMijinAry[index];
    };
    GodWeaponCC.prototype.weaponIsActive = function (weaponId) {
        this.createData();
        if (this.weaponDataAry) {
            for (var _i = 0, _a = this.weaponDataAry; _i < _a.length; _i++) {
                var data = _a[_i];
                if (data.weaponId == weaponId)
                    return true;
            }
        }
        return false;
    };
    GodWeaponCC.prototype.taskIsOpen = function () {
        if (GameServer.serverOpenDay >= GlobalConfig.GodWeaponBaseConfig.openDay) {
            return true;
        }
        return false;
    };
    GodWeaponCC.prototype.sendReset = function (id) {
        var bytes = this.getBytes(14);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    return GodWeaponCC;
}(BaseSystem));
__reflect(GodWeaponCC.prototype, "GodWeaponCC");
var GameSystem;
(function (GameSystem) {
    GameSystem.godWeaponCC = GodWeaponCC.ins.bind(GodWeaponCC);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=GodWeaponCC.js.map