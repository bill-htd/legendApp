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
var SpecialRing = (function (_super) {
    __extends(SpecialRing, _super);
    function SpecialRing() {
        var _this = _super.call(this) || this;
        _this.mainHandler = [];
        _this.ringList = [];
        _this.loginDayCount = 0;
        _this.ringActiNum = 0;
        _this.specialRingHandler = [];
        _this.ringsConfig = [];
        _this.moneyOpenGrid = 0;
        _this.abilityIds = [];
        _this.skillLvDic = {};
        _this.sysId = PackageID.Ring;
        _this.regNetMsg(1, _this.postRingUpdate);
        _this.regNetMsg(2, _this.postActiveRing);
        _this.regNetMsg(3, _this.postSpicelRingUpdate);
        _this.regNetMsg(4, _this.postGetSpicelRingInfo);
        _this.regNetMsg(5, _this.postSRStairUp);
        _this.regNetMsg(6, _this.postSRStairUp);
        _this.regNetMsg(7, _this.postUnLock);
        _this.regNetMsg(8, _this.postSkillInfo);
        _this.regNetMsg(9, _this.postRingAbility);
        _this.observe(GameLogic.ins().postEnterMap, _this.createRingAvatar);
        return _this;
    }
    SpecialRing.prototype.postRingAbility = function (bytes) {
        var count = bytes.readShort();
        for (var i = 0; i < count; i++) {
            var id = bytes.readShort();
            var lv = bytes.readShort();
            this.abilityIds[id] = lv;
        }
        if (GameMap.fbType == 0) {
            var cfg = this.getSpecialRingDataById(SpecialRing.FIRE_RING_ID);
            if (cfg) {
                var stage = this.getRingStair(cfg.level);
                if (stage >= 2) {
                    if (this.specialRingHandler[SpecialRing.FIRE_RING_ID] > 0) {
                        EntityManager.ins().removeByHandle(this.specialRingHandler[SpecialRing.FIRE_RING_ID]);
                    }
                    SpecialRing.ins().createRingMonster(SpecialRing.FIRE_RING_ID);
                }
            }
        }
        var dp = GlobalConfig.ActorExRingItemConfig[SpecialRing.FIRE_RING_ID];
        for (var id in dp) {
            if (dp[id][1]) {
                var item = UserBag.ins().getBagItemById(dp[id][1].itemId);
                if (item)
                    item.setCanbeUsed();
            }
        }
        UserBag.ins().postHasItemCanUse();
    };
    SpecialRing.prototype.createRingAvatar = function () {
        if (GameMap.fbType == 0) {
            var cfg = this.getSpecialRingDataById(SpecialRing.FIRE_RING_ID);
            if (cfg) {
                var stage = this.getRingStair(cfg.level);
                if (stage >= 2)
                    SpecialRing.ins().createRingMonster(SpecialRing.FIRE_RING_ID);
            }
        }
    };
    SpecialRing.prototype.sendUpGrade = function (index, roleID) {
        var bytes = this.getBytes(1);
        bytes.writeShort(index);
        bytes.writeShort(roleID);
        this.sendToServer(bytes);
    };
    SpecialRing.prototype.postRingUpdate = function (bytes) {
        var ringIndex = bytes.readShort();
        var roleIndex = bytes.readShort();
        var ringLv = bytes.readShort();
        SubRoles.ins().getSubRoleByIndex(roleIndex).setExRingsData(ringIndex, ringLv);
        return true;
    };
    SpecialRing.prototype.sendActiveRing = function (index, useGameGold) {
        if (useGameGold === void 0) { useGameGold = 0; }
        var bytes = this.getBytes(2);
        bytes.writeShort(index);
        bytes.writeByte(useGameGold);
        this.sendToServer(bytes);
    };
    SpecialRing.prototype.postActiveRing = function (bytes) {
        var sRingIndex = bytes.readShort();
        var sRingLv = bytes.readShort();
        var sExp = bytes.readInt();
        var fight = bytes.readByte();
        var specialRing = this.getSpecialRingDataById(sRingIndex);
        specialRing.level = sRingLv;
        specialRing.exp = sExp;
        specialRing.fight = fight;
        this.ringActiNum++;
        if (sRingIndex == SpecialRing.FIRE_RING_ID) {
            this.updateGrid();
        }
        return [sRingIndex, 0];
    };
    SpecialRing.prototype.postSRStairUp = function (bytes) {
        var sRingIndex = bytes.readShort();
        var sRingLv = bytes.readShort();
        var sExp = bytes.readInt();
        var fight = bytes.readByte();
        var specialRing = this.getSpecialRingDataById(sRingIndex);
        specialRing.level = sRingLv;
        specialRing.exp = sExp;
        specialRing.fight = fight;
        this.createRingAvatar();
        this.updateGrid();
        return [sRingIndex, 0];
    };
    SpecialRing.prototype.sendSpicelRingUpdate = function (index) {
        var bytes = this.getBytes(3);
        bytes.writeShort(index);
        this.sendToServer(bytes);
    };
    SpecialRing.prototype.postSpicelRingUpdate = function (bytes) {
        var sRingIndex = bytes.readShort();
        var sRingLv = bytes.readShort();
        var sExp = bytes.readInt();
        var specialRing = this.getSpecialRingDataById(sRingIndex);
        var isCrit = 0;
        isCrit = bytes.readByte();
        var fight = bytes.readByte();
        specialRing.level = sRingLv;
        specialRing.exp = sExp;
        specialRing.fight = fight;
        return [sRingIndex, isCrit];
    };
    SpecialRing.prototype.postGetSpicelRingInfo = function (bytes) {
        this.loginDayCount = bytes.readInt();
        var ringCount = bytes.readShort();
        this.ringList = [];
        this.ringActiNum = 0;
        for (var i = 0; i < ringCount; i++) {
            var specialRing_1 = new SpecialRingData();
            specialRing_1.parser(bytes);
            this.ringList.push(specialRing_1);
            if (specialRing_1.level > 0)
                this.ringActiNum++;
        }
        if (GameMap.fbType == 0) {
            GameLogic.ins().postHookStateChange(GameLogic.HOOK_STATE_FIND_ENMENY);
        }
        this.createRingAvatar();
        return true;
    };
    SpecialRing.prototype.isFireRing = function (handler) {
        return (this.specialRingHandler[SpecialRing.FIRE_RING_ID] == handler);
    };
    SpecialRing.prototype.createRingMonster = function (id) {
        if (!this.ringList || this.ringList.length <= 0)
            return;
        var config = GlobalConfig.ActorExRingConfig[id];
        var data = this.getSpecialRingDataById(id);
        if (data.level < config.showMonsterLv)
            return;
        var monId = config.monsterId;
        var abilityId = this.getAbilityID();
        if (abilityId) {
            var cfg = GlobalConfig.ActorExRingItemConfig[SpecialRing.FIRE_RING_ID][abilityId][this.abilityIds[abilityId]];
            if (cfg)
                monId += cfg.monId;
        }
        if (!EntityManager.ins().getEntityByHandle(this.specialRingHandler[id])) {
            var role = EntityManager.ins().getNoDieRole();
            if (role) {
                var m = UserFb.createModel(GlobalConfig.MonstersConfig[monId]);
                m.setAtt(AttributeType.atMoveSpeed, SpecialRing.FIRE_RING_MOVING_SPEED);
                m.x = role.x;
                m.y = role.y;
                m.masterHandle = Actor.handle;
                this.specialRingHandler[id] = m.handle = egret.getTimer();
                m.lyMarkLv = LyMark.ins().lyMarkLv;
                m.lyMarkSkills = LyMark.ins().skills;
                var monster = GameLogic.ins().createEntityByModel(m, Team.My);
                monster.AI_STATE = AI_State.Stand;
            }
        }
    };
    SpecialRing.prototype.sendRingLevelUp = function (index) {
        var bytes = this.getBytes(5);
        bytes.writeShort(index);
        this.sendToServer(bytes);
    };
    SpecialRing.prototype.sendRingFight = function (index, state) {
        var bytes = this.getBytes(6);
        bytes.writeShort(index);
        bytes.writeByte(state);
        this.sendToServer(bytes);
    };
    SpecialRing.prototype.checkOperation = function () {
        var bool = this.checkHaveUpRing();
        if (!bool && this.isFireRingFuse()) {
            bool = this.isCanStudySkill() || this.isCanUpgradeSkill();
        }
        return bool;
    };
    SpecialRing.prototype.checkHaveUpRing = function () {
        if (!SpecialRing.ins().checkRingOpen())
            return false;
        var len = this.ringList.length;
        for (var i = 0; i < len; i++) {
            var data = this.ringList[i];
            var flag = this.checkRedPoint(data.id, data.level);
            if (flag)
                return flag;
        }
        return false;
    };
    SpecialRing.prototype.checkRingOpen = function () {
        var id = GlobalConfig.ActorExRingCommon.actImbaId;
        if (Artifact.ins().getNewArtifactBy(Artifact.ins().getArtifactIndexById(id))) {
            return Artifact.ins().getNewArtifactBy(Artifact.ins().getArtifactIndexById(id)).open;
        }
        return false;
    };
    SpecialRing.prototype.checkRedPoint = function (id, level) {
        if (level > 0) {
            return this.checkCanUpdate(id, level);
        }
        else {
            return this.checkCanActive(id);
        }
    };
    SpecialRing.prototype.checkCanUpdate = function (id, level) {
        var result = false;
        if (id == SpecialRing.FIRE_RING_ID && this.isFireRingFuse()) {
            var config = GlobalConfig.ActorExRingConfig[id];
            if (this.getRingConfigById(id, level + 1)) {
                if (level % 11 == 0) {
                    result = true;
                }
                else {
                    var config_1 = this.getRingConfigById(id, level);
                    var count = UserBag.ins().getBagGoodsCountById(0, config_1.costItem);
                    result = (config_1.cost <= count);
                }
            }
        }
        return result;
    };
    SpecialRing.prototype.checkCanActive = function (id) {
        var config = GlobalConfig.ActorExRingConfig[id];
        var canActive = false;
        if (id == SpecialRing.FIRE_RING_ID) {
            if (!this.isFireRingActivate()) {
                canActive = this.isFireRingCanActivate();
            }
        }
        else {
            var lvl = this.getSpecialRingDataById(id).level;
            if (lvl == 0) {
                canActive = (SpecialRing.ins().loginDayCount >= config.openDay && config.openDay >= 0)
                    || (UserVip.ins().lv >= config.openVip && config.openVip >= 0)
                        && (Actor.yb >= config.openYb);
            }
        }
        return canActive;
    };
    SpecialRing.prototype.canGradeupRing = function (type) {
        var boolList = [false, false, false];
        var len = SubRoles.ins().subRolesLen;
        var lv = 0;
        var config;
        var costNum = 0;
        var itemNum = 0;
        for (var i = 0; i < len; i++) {
            var role = SubRoles.ins().getSubRoleByIndex(i);
            lv = role.getExRingsData(type);
            config = GlobalConfig["ExRing" + type + "Config"][lv];
            costNum = config.cost;
            if (costNum) {
                itemNum = UserBag.ins().getBagGoodsCountById(0, GlobalConfig.ExRingConfig[type].costItem);
                boolList[i] = (itemNum >= costNum);
            }
            else {
                boolList[i] = false;
            }
        }
        return boolList;
    };
    SpecialRing.prototype.getRingConfigById = function (id, level) {
        if (this.ringsConfig.length == 0) {
            this.initConfig();
        }
        if (this.ringsConfig[id] && this.ringsConfig[id][level])
            return this.ringsConfig[id][level];
        return null;
    };
    SpecialRing.prototype.initConfig = function () {
        this.ringsConfig = [];
        var config = GlobalConfig.ActorExRingConfig;
        for (var k in config) {
            this.ringsConfig[config[k].id] = GlobalConfig["ActorExRing" + k + "Config"];
        }
    };
    SpecialRing.prototype.getRingStair = function (level) {
        var stair = 0;
        stair = Math.ceil(level / (SpecialRing.perStar + 1));
        return stair;
    };
    SpecialRing.prototype.getRingStar = function (level) {
        if (level < 1) {
            return 0;
        }
        return (level - 1) % (SpecialRing.perStar + 1);
    };
    SpecialRing.prototype.hasHanlder = function (handler) {
        for (var i = 0; i < this.mainHandler.length; i++) {
            if (handler == this.mainHandler[i]) {
                return true;
            }
        }
        this.mainHandler.push(handler);
        return false;
    };
    SpecialRing.prototype.delHanlder = function (handler) {
        for (var i = 0; i < this.mainHandler.length; i++) {
            if (handler == this.mainHandler[i]) {
                this.mainHandler.splice(i, 1);
                return;
            }
        }
    };
    SpecialRing.prototype.getSpecialRingDataById = function (id) {
        for (var i = 0; i < this.ringList.length; i++) {
            if (this.ringList[i].id == id) {
                return this.ringList[i];
            }
        }
        return null;
    };
    SpecialRing.prototype.isFireRingFuse = function () {
        var isFuse = false;
        var ringData = this.getSpecialRingDataById(SpecialRing.FIRE_RING_ID);
        if (ringData && ringData.level >= 1) {
            isFuse = true;
        }
        return isFuse;
    };
    SpecialRing.prototype.isFireRingActivate = function () {
        var isActivate = false;
        var ringData = this.getSpecialRingDataById(SpecialRing.FIRE_RING_ID);
        if (ringData && ringData.isUnLock) {
            isActivate = true;
        }
        return isActivate;
    };
    SpecialRing.prototype.isFireRingCanActivate = function () {
        var canActivate = false;
        var config = GlobalConfig.ActorExRingConfig[SpecialRing.FIRE_RING_ID];
        var openDay = config.openDay;
        if (SpecialRing.ins().loginDayCount >= config.openDay) {
            for (var i = 0; i < this.ringList.length; i++) {
                canActivate = true;
                if (this.ringList[i].id != SpecialRing.FIRE_RING_ID && this.ringList[i].level == 0) {
                    canActivate = false;
                    break;
                }
            }
        }
        return canActivate;
    };
    SpecialRing.prototype.requestDeblock = function (ringId) {
        var bytes = this.getBytes(7);
        bytes.writeShort(ringId);
        this.sendToServer(bytes);
    };
    SpecialRing.prototype.postUnLock = function (bytes) {
        var ringId = bytes.readShort();
        var lvl = bytes.readShort();
        var exp = bytes.readInt();
        var isFight = bytes.readByte();
        var isUnlock = bytes.readByte();
        for (var i = 0; i < this.ringList.length; i++) {
            if (this.ringList[i].id == ringId) {
                this.ringList[i].level = lvl;
                this.ringList[i].exp = exp;
                this.ringList[i].fight = isFight;
                this.ringList[i].isUnLock = isUnlock;
                break;
            }
        }
        return isUnlock == 1;
    };
    SpecialRing.prototype.requestOpenGrid = function () {
        var bytes = this.getBytes(8);
        this.sendToServer(bytes);
    };
    SpecialRing.prototype.requestLearnSkill = function (skillId, position) {
        var bytes = this.getBytes(9);
        bytes.writeShort(skillId);
        bytes.writeShort(position);
        this.sendToServer(bytes);
    };
    SpecialRing.prototype.requestUpgradeSkill = function (position) {
        var bytes = this.getBytes(10);
        bytes.writeShort(position);
        this.sendToServer(bytes);
    };
    SpecialRing.prototype.postSkillInfo = function (bytes) {
        this.initSkill();
        this.moneyOpenGrid = bytes.readShort();
        this.updateGrid();
        var count = bytes.readShort();
        for (var i = 0; i < count; i++) {
            var ring_1 = new RingSkillInfo();
            ring_1.position = bytes.readShort();
            ring_1.skillId = bytes.readShort();
            ring_1.skillLvl = bytes.readShort();
            this.updateSkillInfo(ring_1);
        }
    };
    SpecialRing.prototype.updateGrid = function () {
        var cfg = this.getSpecialRingDataById(SpecialRing.FIRE_RING_ID);
        var openCount = 0;
        if (cfg.level > 0) {
            openCount = this.moneyOpenGrid + this.getRingConfigById(SpecialRing.FIRE_RING_ID, cfg.level).freeSkillGrid;
        }
        this.updateGridOpen(openCount);
    };
    SpecialRing.prototype.updateGridOpen = function (num) {
        for (var i = 1; i <= num; i++) {
            var ring_2 = this.skillInfo[i - 1];
            ring_2.isOpen = true;
        }
    };
    SpecialRing.prototype.updateSkillInfo = function (skill) {
        var count = this.skillInfo.length;
        for (var i = 0; i < count; i++) {
            var ring_3 = this.skillInfo[i];
            if (ring_3.position == skill.position) {
                ring_3.skillId = skill.skillId;
                ring_3.skillLvl = skill.skillLvl;
            }
        }
    };
    SpecialRing.prototype.initSkill = function () {
        if (!this.skillInfo) {
            this.skillInfo = [];
            for (var i = 1; i < 9; i++) {
                var ring_4 = new RingSkillInfo();
                ring_4.position = i;
                this.skillInfo.push(ring_4);
            }
        }
    };
    SpecialRing.prototype.getCanStudyBook = function () {
        var ary = [];
        if (!this.skillInfo)
            return ary;
        var count = this.skillInfo.length;
        var filter = [];
        var filterSkill = [];
        for (var i = 0; i < count; i++) {
            var ring_5 = this.skillInfo[i];
            if (ring_5.skillId > 0) {
                filterSkill.push(ring_5.skillId);
            }
        }
        var books = this.getActorExRingBookConfigByLvl(1);
        var len = books.length;
        for (var j = 0; j < len; j++) {
            var cfg = books[j];
            if (filterSkill.indexOf(cfg.id) < 0) {
                var num = UserBag.ins().getBagGoodsCountById(0, cfg.itemId);
                if (num >= cfg.num) {
                    var info = new RewardData();
                    info.id = cfg.itemId;
                    info.count = num;
                    info.type = 1;
                    ary.push(info);
                }
            }
        }
        return ary;
    };
    SpecialRing.prototype.isBookCanStudy = function (itemId) {
        var ary = [];
        var count = this.skillInfo.length;
        var filter = [];
        var filterSkill = [];
        for (var i = 0; i < count; i++) {
            var ring_6 = this.skillInfo[i];
            if (ring_6.skillId > 0) {
                filterSkill.push(ring_6.skillId);
            }
        }
        var books = this.getActorExRingBookConfigByLvl(1);
        var len = books.length;
        for (var j = 0; j < len; j++) {
            var cfg = books[j];
            if (cfg.itemId == itemId && filterSkill.indexOf(cfg.id) < 0) {
                var num = UserBag.ins().getBagGoodsCountById(0, cfg.itemId);
                if (num >= cfg.num) {
                    return true;
                }
            }
        }
        return false;
    };
    SpecialRing.prototype.getStudyBook = function () {
        var ary = [];
        var filter = [];
        var books = this.getActorExRingBookConfigByLvl(1);
        var len = books.length;
        for (var j = 0; j < len; j++) {
            var cfg = books[j];
            var num = UserBag.ins().getBagGoodsCountById(0, cfg.itemId);
            var info = new RewardData();
            info.id = cfg.itemId;
            info.count = num;
            info.type = 1;
            ary.push(info);
        }
        return ary;
    };
    SpecialRing.prototype.getFirstStudyBookIndex = function () {
        var books = this.getActorExRingBookConfigByLvl(1);
        var len = books.length;
        for (var j = 0; j < len; j++) {
            var cfg = books[j];
            if (this.isBookCanStudy(cfg.itemId)) {
                return j;
            }
        }
        return 0;
    };
    SpecialRing.prototype.isCanStudySkill = function () {
        var ary = this.getCanStudyBook();
        var canStudy = false;
        if (ary != undefined && ary.length > 0 && this.isHaveFreeGrid()) {
            canStudy = true;
        }
        return canStudy;
    };
    SpecialRing.prototype.isHaveFreeGrid = function () {
        var count = this.skillInfo.length;
        for (var i = 0; i < count; i++) {
            var ring_7 = this.skillInfo[i];
            if (ring_7.skillId == 0 && ring_7.isOpen) {
                return true;
            }
        }
        return false;
    };
    SpecialRing.prototype.isCanUpgradeSkill = function () {
        var ary = [];
        if (!this.skillInfo)
            return false;
        var count = this.skillInfo.length;
        for (var i = 0; i < count; i++) {
            var ring_8 = this.skillInfo[i];
            if (ring_8.skillId > 0 && ring_8.skillLvl < this.getSkillMaxLvl(ring_8.skillId)) {
                var cfg = this.getActorExRingBookConfig(ring_8.skillId, ring_8.skillLvl);
                var num = UserBag.ins().getBagGoodsCountById(0, cfg.itemId);
                if (num >= cfg.num) {
                    return true;
                }
            }
        }
        return false;
    };
    SpecialRing.prototype.fireRingRedPoint = function () {
        return UserFb.ins().fbRings.challengeTime > 0 || UserFb.ins().fbRings.canTakeAward;
    };
    SpecialRing.prototype.getActorExRingBookConfig = function (skillId, skillLvl) {
        var cfg;
        for (var i in GlobalConfig.ActorExRingBookConfig) {
            for (var j in GlobalConfig.ActorExRingBookConfig[i]) {
                if (i == skillId.toString() && j == skillLvl.toString()) {
                    cfg = GlobalConfig.ActorExRingBookConfig[i][j];
                    break;
                }
            }
        }
        return cfg;
    };
    SpecialRing.prototype.getActorExRingBookConfigByLvl = function (skillLvl) {
        var ary = [];
        var filter = [];
        for (var i in GlobalConfig.ActorExRingBookConfig) {
            for (var j in GlobalConfig.ActorExRingBookConfig[i]) {
                if (j == skillLvl.toString()) {
                    if (filter.indexOf(GlobalConfig.ActorExRingBookConfig[i][j].itemId) < 0) {
                        filter.push(GlobalConfig.ActorExRingBookConfig[i][j].itemId);
                        ary.push(GlobalConfig.ActorExRingBookConfig[i][j]);
                    }
                    break;
                }
            }
        }
        return ary;
    };
    SpecialRing.prototype.getSkillIdByItemId = function (itemId) {
        var skillId;
        for (var i in GlobalConfig.ActorExRingBookConfig) {
            for (var j in GlobalConfig.ActorExRingBookConfig[i]) {
                if (GlobalConfig.ActorExRingBookConfig[i][j].itemId == itemId) {
                    skillId = parseInt(i);
                    return skillId;
                }
            }
        }
        return 0;
    };
    SpecialRing.prototype.getSkillMaxLvl = function (skillId) {
        var count = 0;
        if (this.skillLvDic[skillId] != undefined) {
            count = this.skillLvDic[skillId];
        }
        else {
            for (var i in GlobalConfig.ActorExRingBookConfig) {
                if (i == skillId.toString()) {
                    for (var j in GlobalConfig.ActorExRingBookConfig[i]) {
                        count++;
                    }
                }
            }
            this.skillLvDic[skillId] = count;
        }
        return count;
    };
    SpecialRing.prototype.getNextStageSkillName = function (ringLvl) {
        var skillName;
        for (var i in GlobalConfig.ActorExRingAbilityConfig) {
            var cfg = GlobalConfig.ActorExRingAbilityConfig[i];
            if (cfg && cfg.ringLv == ringLvl) {
                skillName = cfg.abilityName;
                break;
            }
        }
        return skillName;
    };
    SpecialRing.prototype.getUnLockStage = function (id) {
        var cfg = GlobalConfig.ActorExRingAbilityConfig[id];
        var lvl = cfg.ringLv;
        var desc;
        switch (lvl) {
            case 1:
                desc = "一";
                break;
            case 5:
                desc = "五";
                break;
            case 10:
                desc = "十";
                break;
            case 20:
                desc = "二十";
                break;
            case 40:
                desc = "四十";
                break;
            case 60:
                desc = "六十";
                break;
            case 80:
                desc = "八十";
                break;
        }
        return desc;
    };
    SpecialRing.prototype.getRingSkill = function () {
        if (!this.skillInfo)
            return 0;
        var count = this.skillInfo.length;
        var lvl = 0;
        for (var i = 0; i < count; i++) {
            var data = this.skillInfo[i];
            if (data.skillId == 7) {
                lvl = data.skillLvl;
                break;
            }
        }
        var ringLvl = this.getSpecialRingDataById(7).level;
        var skillId = this.getRingConfigById(7, ringLvl).summonerSkillId;
        if (lvl > 0 && skillId) {
            var remainder = skillId % 10;
            remainder += lvl;
            if (remainder > 9)
                remainder = 9;
            var prefix = Math.floor(skillId / 10);
            skillId = prefix * 10 + remainder;
        }
        return skillId;
    };
    SpecialRing.prototype.getCanUpgradeStars = function (materialsCount) {
        var lvl = this.getSpecialRingDataById(SpecialRing.FIRE_RING_ID).level;
        var star = 0;
        while (true) {
            lvl++;
            var cfg = GlobalConfig.ActorExRing7Config[lvl];
            if (!cfg) {
                return star;
            }
            else {
                materialsCount -= cfg.cost;
                if (materialsCount >= 0) {
                    star++;
                }
                else {
                    return star;
                }
            }
        }
    };
    SpecialRing.prototype.getAbilityID = function (index) {
        if (index === void 0) { index = 0; }
        var ix = 0;
        for (var id in this.abilityIds) {
            if (ix == index) {
                return +(id);
            }
            ix++;
        }
        return 0;
    };
    SpecialRing.prototype.getAbilityIdByItemId = function (itemId) {
        var dp = GlobalConfig.ActorExRingItemConfig[SpecialRing.FIRE_RING_ID];
        for (var id in dp) {
            if (dp[id][1].itemId = itemId)
                return +(id);
        }
        return 0;
    };
    SpecialRing.prototype.getMaxAbilityLvByItemId = function (itemId) {
        var dp = GlobalConfig.ActorExRingItemConfig[SpecialRing.FIRE_RING_ID];
        for (var id in dp) {
            if (dp[id][1].itemId = itemId)
                return CommonUtils.getObjectLength(dp[id]);
        }
        return 0;
    };
    SpecialRing.prototype.checkCanUseByItem = function (itemId) {
        var id = this.getAbilityIdByItemId(itemId);
        var maxLv = this.getMaxAbilityLvByItemId(itemId);
        if (id && this.abilityIds[id] >= maxLv) {
            return false;
        }
        return true;
    };
    SpecialRing.ins = function () {
        return _super.ins.call(this);
    };
    SpecialRing.perStar = 10;
    SpecialRing.FIRE_RING_ID = 7;
    SpecialRing.FIRE_RING_MOVING_SPEED = 3750;
    SpecialRing.GRID_OPEN_LEVEL = 20;
    return SpecialRing;
}(BaseSystem));
__reflect(SpecialRing.prototype, "SpecialRing");
var GameSystem;
(function (GameSystem) {
    GameSystem.specialRing = SpecialRing.ins.bind(SpecialRing);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=SpecialRing.js.map