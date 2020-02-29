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
var RoleAI = (function (_super) {
    __extends(RoleAI, _super);
    function RoleAI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.canNoAuto = false;
        _this.aiList = {};
        _this.zhanlingTime = 0;
        _this.zhanlingdelayTime = 0;
        _this.isFindDrop = false;
        _this.isLog = false;
        return _this;
    }
    RoleAI.ins = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.ins.call(this, args);
    };
    RoleAI.prototype.init = function () {
        this.stop();
        this.skillCD = {};
        this.attrCD = {};
        this.attrValue = {};
        this.rolePlace = {};
        this.inited = true;
    };
    RoleAI.prototype.start = function () {
        this.isStartAtk = false;
        GameLogic.ins().postHookStateChange(GameLogic.HOOK_STATE_FIND_ENMENY);
        this.teamAction = {};
        if (this.starting)
            return;
        if (!this.inited)
            this.init();
        this.addAITimer();
    };
    RoleAI.prototype.togglePause = function () {
        if (!this.roleStopRun) {
            this.roleStopRun = true;
        }
        else {
            this.roleStopRun = false;
        }
    };
    RoleAI.prototype.startActack = function () {
        this.roleStopRun = false;
    };
    RoleAI.prototype.stopActack = function () {
        this.roleStopRun = true;
    };
    RoleAI.prototype.selfRoleStopActack = function () {
        if (this.Monstertarget)
            return;
        this.roleStopRun = true;
    };
    RoleAI.prototype.selfRoleStartActack = function (monster) {
        this.Monstertarget = monster;
        this.roleStopRun = false;
    };
    RoleAI.prototype.startAutoActack = function () {
        if (this.canNoAuto)
            return;
        for (var i in this.aiList) {
            var target = this.aiList[i];
            if (target instanceof CharRole) {
                if (target.infoModel._name == LocationProperty.userName) {
                    if (this.rolePlace[0] == target.x || this.rolePlace[1] == target.y) {
                        this.roleStopRun = false;
                    }
                    this.rolePlace[0] = target.x;
                    this.rolePlace[1] = target.y;
                    return;
                }
            }
        }
    };
    RoleAI.prototype.stop = function () {
        if (this.inited) {
            this.stopAITimer();
        }
        this.skillCD = {};
        for (var handle in this.curSkill) {
            if (this.curSkill[handle])
                ObjectPool.push(this.curSkill[handle]);
        }
        this.curSkill = {};
        this.curTarget = {};
        this.lastTarget = {};
        this.skillCastType = {};
        this.skillTargetType = {};
        this.hashHpObj = {};
        this.attrCD = {};
        this.attrValue = {};
    };
    RoleAI.prototype.clearTarget = function (target) {
        if (target && target.infoModel) {
            var handle = target.infoModel.handle;
            delete this.skillCD[handle];
            var skill = this.curSkill[handle];
            if (skill) {
                ObjectPool.push(skill);
            }
            delete this.curSkill[handle];
            delete this.curTarget[handle];
            delete this.lastTarget[handle];
            delete this.skillCastType[handle];
            delete this.skillTargetType[handle];
            for (var key in this.curTarget) {
                if (this.curTarget[key] == target) {
                    delete this.curTarget[key];
                }
            }
            for (var key in this.lastTarget) {
                if (key + "" == handle + "") {
                    delete this.lastTarget[key];
                }
            }
        }
    };
    RoleAI.prototype.clearAIList = function () {
        this.aiList = {};
    };
    RoleAI.prototype.clear = function () {
        this.stop();
        this.clearAIList();
        this.isFindDrop = false;
        TimerManager.ins().removeAll(this);
    };
    RoleAI.prototype.destruct = function () {
        this.skillCD = {};
        this.stop();
    };
    Object.defineProperty(RoleAI.prototype, "starting", {
        get: function () {
            return TimerManager.ins().isExists(this.startAI, this);
        },
        enumerable: true,
        configurable: true
    });
    RoleAI.prototype.canAddToAi = function () {
        if (GameMap.sceneInMain())
            return true;
        return false;
    };
    RoleAI.prototype.add = function (char) {
        this.aiList[char.infoModel.handle] = char;
    };
    RoleAI.prototype.remove = function (char) {
        delete this.aiList[char.infoModel.handle];
    };
    RoleAI.prototype.getAIList = function () {
        return this.aiList;
    };
    RoleAI.prototype.startAI = function () {
        var list = this.aiList;
        var jobNames = ["0", "战士", "法师", "道士"];
        var master = EntityManager.ins().getNoDieRole();
        var poxIndex = 0;
        for (var i in list) {
            var selfTarget = list[i];
            var target = void 0;
            var isRole = selfTarget instanceof CharRole;
            var handle = selfTarget.infoModel.handle;
            var jobName = isRole ? jobNames[selfTarget.infoModel.job] : "";
            var selfBuffList = selfTarget.buffList;
            var isCannotHit = false;
            for (var groupID in selfBuffList) {
                if (selfTarget.AI_STATE == AI_State.Die)
                    break;
                var buff = selfBuffList[groupID];
                if (buff.effConfig.type == SkillEffType.AddBlood ||
                    buff.effConfig.type == SkillEffType.AdditionalDamage) {
                    if (buff.isExecute()) {
                        buff.step++;
                        var d = this.hramedDie(selfTarget, buff.value);
                        if (d)
                            selfTarget.AI_STATE = AI_State.Die;
                        this.showHram(d, DamageTypes.HIT, selfTarget, buff.source, buff.value, "buff伤害" + buff.effConfig.id);
                        if (buff.step >= buff.count)
                            selfTarget.removeBuff(buff);
                    }
                }
                if (buff.canRemove()) {
                    selfTarget.removeBuff(buff);
                }
                else if (buff.isCanotHit()) {
                    isCannotHit = true;
                }
            }
            if (isCannotHit)
                continue;
            if (selfTarget.AI_STATE == AI_State.Die)
                continue;
            if (selfTarget.isHardStraight) {
                continue;
            }
            if (selfTarget.infoModel.team == Team.My && UserSkill.ins().hejiLevel > 0 && UserSkill.ins().hejiEnable && (selfTarget.infoModel instanceof Role)) {
                if (master && selfTarget.infoModel.handle == master.infoModel.handle) {
                    target = this.curTarget[handle];
                    var skill = UserSkill.ins().getHejiSkillId();
                    if (UserSkill.ins().fieldUse && skill.id != 0 && target && target.team != Team.My && target.AI_STATE != AI_State.Die) {
                        var tempArr = EntityManager.ins().screeningTargetByPos(selfTarget, false, skill.affectCount, skill.castRange, this.aiList);
                        if (tempArr.length) {
                            this.useSkill(selfTarget, target, skill);
                            ExSkillAiLogic.ins().checkHJTrigger(selfTarget, [target]);
                            UserSkill.ins().fieldUse = false;
                            var config = GlobalConfig.EffectsConfig[skill.selfEff[0]] ? GlobalConfig.EffectsConfig[skill.selfEff[0]] : null;
                            if (config) {
                                var len = SubRoles.ins().subRolesLen;
                                for (var i_1 = 0; i_1 < len; i_1++) {
                                    var roleData = EntityManager.ins().getMainRole(i_1);
                                    if (roleData) {
                                        var buff = ObjectPool.pop('EntityBuff');
                                        buff.effConfig = config;
                                        buff.addTime = egret.getTimer();
                                        buff.endTime = buff.addTime + config.duration;
                                        buff.count = (config.duration / config.interval) >> 0;
                                        buff.step = 0;
                                        buff.source = roleData;
                                        roleData.addBuff(buff);
                                        roleData.stopMove();
                                        if (roleData != master) {
                                            roleData.playAction(EntityAction.STAND);
                                        }
                                        roleData.AI_STATE = AI_State.Stand;
                                    }
                                }
                            }
                            continue;
                        }
                    }
                }
            }
            else if (selfTarget.infoModel.team == Team.WillEntity && HejiUseMgr.ins().canUse()) {
                target = this.curTarget[handle];
                var enemyMaster = HejiUseMgr.ins().getMaster();
                if (target && target.team == Team.My && enemyMaster == selfTarget) {
                    var skill = HejiUseMgr.ins().getSkillData();
                    if (skill && target.AI_STATE != AI_State.Die) {
                        var tempArr = EntityManager.ins().screeningTargetByPos(selfTarget, false, skill.affectCount, skill.castRange, this.aiList);
                        if (tempArr.length) {
                            this.useSkill(selfTarget, target, skill);
                            HejiUseMgr.ins().useSuccess();
                            var config = GlobalConfig.EffectsConfig[skill.selfEff[0]] ? GlobalConfig.EffectsConfig[skill.selfEff[0]] : null;
                            if (config) {
                                var roles = HejiUseMgr.ins().getRoles();
                                var len = roles.length;
                                for (var i_2 = 0; i_2 < len; i_2++) {
                                    var roleData = EntityManager.ins().getEntityByHandle(roles[i_2].handle);
                                    if (roleData) {
                                        var buff = ObjectPool.pop('EntityBuff');
                                        buff.effConfig = config;
                                        buff.addTime = egret.getTimer();
                                        buff.endTime = buff.addTime + config.duration;
                                        buff.count = (config.duration / config.interval) >> 0;
                                        buff.step = 0;
                                        buff.source = roleData;
                                        roleData.addBuff(buff);
                                        roleData.stopMove();
                                        if (roleData != enemyMaster) {
                                            roleData.playAction(EntityAction.STAND);
                                        }
                                        roleData.AI_STATE = AI_State.Stand;
                                    }
                                }
                            }
                            continue;
                        }
                    }
                }
            }
            if (!list[handle])
                continue;
            if (isRole) {
                if (selfTarget.publicCD && egret.getTimer() - selfTarget.publicCD <= 800)
                    continue;
            }
            else {
                if (selfTarget.publicCD && egret.getTimer() - selfTarget.publicCD <= 800)
                    continue;
            }
            if (RoleAI.ins().isFindDrop && selfTarget.team == Team.My) {
                if (master && selfTarget.infoModel.handle == master.infoModel.handle) {
                    continue;
                }
            }
            if (this.roleStopRun) {
                if (isRole && selfTarget.infoModel.name == LocationProperty.userName) {
                    continue;
                }
                else if (selfTarget.infoModel.name == '神兽' || selfTarget.infoModel.name == '火焰戒指') {
                    continue;
                }
            }
            switch (selfTarget.AI_STATE) {
                case AI_State.Stand:
                    this.screeningSkill(handle);
                    var isNoUseSkill = false;
                    var isFollowMaster = false;
                    if (!this.curSkill[handle]) {
                        isNoUseSkill = true;
                    }
                    if (!isNoUseSkill && this.checkCanScreeningTarget(selfTarget, this.curSkill[handle], this.curTarget[handle])) {
                        if (selfTarget.team == Team.WillEntity) {
                            this.screeningTarget(selfTarget, 9);
                        }
                        else {
                            this.screeningTarget(selfTarget);
                        }
                    }
                    if (selfTarget.team == Team.My && selfTarget != master && master) {
                        if (MathUtils.getDistance(selfTarget.x, selfTarget.y, master.x, master.y) > 250) {
                            var masterTarget = this.curTarget[master.infoModel.handle];
                            if (masterTarget && masterTarget.AI_STATE != AI_State.Die) {
                                if (this.curSkill[handle] && this.curSkill[handle].targetType == TargetType.Enemy && masterTarget.team != Team.My) {
                                    if (this.Monstertarget) {
                                        this.curTarget[handle] = this.Monstertarget;
                                        this.Monstertarget = undefined;
                                    }
                                    else {
                                        this.curTarget[handle] = masterTarget;
                                    }
                                }
                                else {
                                    isFollowMaster = true;
                                }
                            }
                            else {
                                isFollowMaster = true;
                            }
                        }
                    }
                    if (isNoUseSkill || isFollowMaster) {
                        if (selfTarget.team == Team.My && selfTarget != master && master) {
                            var selfMaster = master;
                            if (selfTarget.infoModel.masterHandle) {
                                var ms = EntityManager.ins().getEntityByHandle(selfTarget.infoModel.masterHandle);
                                if (ms) {
                                    selfMaster = ms;
                                }
                            }
                            var count = EntityManager.ins().getTeamCount(Team.My);
                            var dirs = [1, -1];
                            if (count == 2) {
                                dirs = [0];
                            }
                            var p = DirUtil.getGridByDir(selfMaster.dir + dirs[poxIndex] != null ? dirs[poxIndex] : 0);
                            poxIndex += 1;
                            GameMap.moveEntity(selfTarget, selfMaster.x + p.x, selfMaster.y + p.y);
                        }
                        continue;
                    }
                    if (!this.curTarget[handle]) {
                        continue;
                    }
                    if (this.tryUseSkill(selfTarget)) {
                        selfTarget.AI_STATE = AI_State.Atk;
                    }
                    else {
                        if (selfTarget.team == Team.My ||
                            selfTarget.team == Team.WillEntity ||
                            selfTarget.team == Team.Faker ||
                            this.teamAction[selfTarget.team]) {
                            GameMap.moveEntity(selfTarget, this.curTarget[handle].x, this.curTarget[handle].y);
                            selfTarget.AI_STATE = AI_State.Run;
                        }
                    }
                    break;
                case AI_State.Run:
                    target = this.curTarget[handle];
                    if (selfTarget.team == Team.My)
                        UserFb.ins().canChallengGuanQia = true;
                    if (!target || target.AI_STATE == AI_State.Die) {
                        selfTarget.stopMove();
                        selfTarget.playAction(EntityAction.STAND);
                        selfTarget.AI_STATE = AI_State.Stand;
                        delete this.curTarget[handle];
                        continue;
                    }
                    else {
                        if (selfTarget.team == Team.Faker) {
                            var wildData = Encounter.ins().wildPersonList[selfTarget.infoModel.masterHandle];
                            if (!wildData)
                                continue;
                            var killNum = EncounterModel.countKillNumByMarster(selfTarget.infoModel.masterHandle);
                            var juli = MathUtils.getDistance(selfTarget.x, selfTarget.y, wildData.backX, wildData.backY);
                            if (wildData && wildData.actionType == 1 && killNum >= wildData.killNum) {
                                if (juli < 10) {
                                    EntityManager.ins().removeByHandle(selfTarget.infoModel.masterHandle);
                                    Encounter.ins().RunAwary(selfTarget.infoModel.masterHandle);
                                    Encounter.ins().sendCleanWildPeople(wildData.index);
                                }
                                else {
                                    GameMap.moveEntity(selfTarget, wildData.backX, wildData.backY);
                                }
                                continue;
                            }
                        }
                        if (this.tryUseSkill(selfTarget)) {
                            selfTarget.stopMove();
                            selfTarget.AI_STATE = AI_State.Atk;
                        }
                        if (selfTarget.action == EntityAction.STAND) {
                            selfTarget.AI_STATE = AI_State.Stand;
                        }
                    }
                    break;
                case AI_State.Atk:
                    if (!this.isStartAtk)
                        GameLogic.ins().postHookStateChange(GameLogic.HOOK_STATE_HOOK);
                    this.isStartAtk = true;
                    target = this.curTarget[handle];
                    if (!target || target.AI_STATE == AI_State.Die) {
                        selfTarget.AI_STATE = AI_State.Stand;
                        delete this.curTarget[handle];
                        continue;
                    }
                    this.teamAction[target.team] = true;
                    if (selfTarget.atking)
                        continue;
                    var skill = this.curSkill[handle];
                    if (!skill)
                        continue;
                    this.skillCD[handle][skill.id] = egret.getTimer();
                    this.skillCastType[handle] = skill.castType;
                    this.skillTargetType[handle] = skill.targetType;
                    selfTarget.atking = true;
                    if (selfTarget.team == Team.My)
                        UserFb.ins().canChallengGuanQia = false;
                    selfTarget.publicCD = egret.getTimer();
                    GameLogic.skyBallCheck(selfTarget);
                    this.useSkill(selfTarget, target, skill);
                    delete this.curSkill[handle];
                    break;
                case AI_State.Patrol:
                    var configID = selfTarget.infoModel.configID;
                    var config = UserFb.ins().guanqiaMonster[configID];
                    if (selfTarget.infoModel.isWander && config.attrange) {
                        this.screeningTarget(selfTarget, config.attrange);
                        if (this.curTarget[selfTarget.infoModel.handle]) {
                            selfTarget.AI_STATE = AI_State.Stand;
                        }
                        else {
                            selfTarget.startPatrol();
                        }
                    }
                    else {
                        selfTarget.startPatrol();
                    }
                    break;
            }
        }
    };
    RoleAI.prototype.checkShowZhanling = function () {
        this.zhanlingTime = egret.getTimer();
        if (!GameMap.sceneInMain())
            return;
        var skinId = ZhanLingModel.ins().ZhanLingSkinId;
        if (ZhanLingModel.ins().getZhanLingDataById(0)) {
            var role = EntityManager.ins().getNoDieRole();
            if (role) {
                var lv = ZhanLingModel.ins().getZhanLingDataById(0).level;
                role.showZhanling(skinId, lv);
                ExSkillAiLogic.ins().checkWarSpiritBubbleTrigger();
            }
        }
    };
    RoleAI.prototype.checkCanScreeningTarget = function (selfTarget, skill, curTarget) {
        if (!curTarget || !curTarget.parent || curTarget.AI_STATE == AI_State.Die) {
            return true;
        }
        var handle = selfTarget.infoModel.handle;
        if (this.skillCastType[handle] == undefined && this.skillTargetType[handle] == undefined) {
            return true;
        }
        if (this.skillCastType[handle] != skill.castType || this.skillTargetType[handle] != skill.targetType) {
            return true;
        }
        return false;
    };
    RoleAI.prototype.getTargetMonsterPoint = function (selfTarget, target) {
        if (selfTarget.x == target.x) {
            return target;
        }
        var k = (target.y - selfTarget.y) / (target.x - selfTarget.x);
        var x = target.x, y = target.y;
        var fixMax = 60;
        var fixMin = 20;
        if (Math.abs(k) <= 1) {
            if (k < 0) {
                y += Math.floor(fixMax * Math.random());
            }
            else {
                y -= Math.floor(fixMax * Math.random());
            }
            x += Math.floor(fixMin * Math.random());
        }
        else {
            if (k < 0) {
                x += Math.floor(fixMax * Math.random());
            }
            else {
                x -= Math.floor(fixMax * Math.random());
            }
            y += Math.floor(fixMin * Math.random());
        }
        return { x: x, y: y };
    };
    RoleAI.prototype.useUnitionSkill = function () {
    };
    RoleAI.prototype.useSkill = function (selfTarget, target, skill) {
        var _this = this;
        var skillEff = skill.tarEff ? GlobalConfig.EffectsConfig[skill.tarEff[0]] : null;
        var selfSkillEff = skill.selfEff ? GlobalConfig.EffectsConfig[skill.selfEff[0]] : null;
        var pTarget = skill.castType == castType.Self ? selfTarget : target;
        var tempArr;
        var critAdd = 0;
        var ImbaData;
        var gwSkillConfig;
        var gwSkills;
        var isYlBullet = false;
        var selfInfo = selfTarget.infoModel;
        if (selfTarget.team == Team.My) {
            ImbaData = Artifact.ins().getReviseBySkill(skill.id);
            if (ImbaData) {
                critAdd = ImbaData.crit;
            }
            gwSkills = GodWeaponCC.ins().getReviseBySkill(skill.id);
            if (gwSkills) {
                gwSkillConfig = gwSkills[0];
            }
            if (gwSkillConfig) {
                critAdd = gwSkillConfig.crit;
            }
        }
        var affectCount = skill.affectCount;
        if (ImbaData && ImbaData.affectCount) {
            affectCount += ImbaData.affectCount;
        }
        if (gwSkillConfig && gwSkillConfig.affectCount) {
            affectCount += gwSkillConfig.affectCount;
        }
        if (skill.castType == castType.SelfHpLess) {
            tempArr = EntityManager.ins().screeningTargetByPos(selfTarget, true, 0, Number.MAX_VALUE, this.aiList);
            for (var m = 0; m < tempArr.length; m++) {
                if (tempArr[m].isCanAddBlood) {
                    tempArr[0] = tempArr[m];
                    break;
                }
            }
        }
        else {
            if (skill.castType != castType.Other && skill.targetType == TargetType.Enemy) {
                tempArr = EntityManager.ins().screeningTargetByPos(pTarget, false, affectCount, skill.affectRange, this.aiList);
            }
            else {
                tempArr = affectCount > 1 ? EntityManager.ins().screeningTargetByPos(pTarget, pTarget.team == target.team, affectCount, skill.affectRange, this.aiList) : [target];
            }
            if (tempArr.length == 0) {
                tempArr = [target];
            }
        }
        if (skill.preId && GlobalConfig.FlameStamp.skillId.indexOf(skill.preId) >= 0) {
            isYlBullet = true;
        }
        var hasCrit = false;
        var len = tempArr.length = Math.min(tempArr.length, affectCount);
        var hitTargetInfo = [];
        for (var j = 0; j < len; j++) {
            var ttarget = tempArr[j];
            var tarInfo = ttarget.infoModel;
            var isSiZhou = false;
            var isMainTar = j == 0;
            if (ttarget.team != selfTarget.team) {
                var effBuff = void 0;
                if (GameLogic.triggerAttr(selfTarget, AttributeType.atStunPower) || skill.id == 90005) {
                    effBuff = ObjectPool.pop('EntityBuff');
                    effBuff.effConfig = GlobalConfig.EffectsConfig[51001];
                    effBuff.value = selfInfo.getAtt(AttributeType.atStunTime);
                    effBuff.addTime = egret.getTimer();
                    effBuff.endTime = effBuff.addTime + effBuff.value;
                    ttarget.addBuff(effBuff);
                    ttarget.stopMove();
                    ttarget.AI_STATE = AI_State.Stand;
                }
                if (GameLogic.triggerExAttr(selfTarget, ExAttributeType.eatDeathCurseProbability)) {
                    effBuff = ObjectPool.pop('EntityBuff');
                    effBuff.effConfig = GlobalConfig.EffectsConfig[52001];
                    effBuff.addTime = egret.getTimer();
                    effBuff.endTime = effBuff.effConfig.args.d ? selfInfo.attributeExData[ExAttributeType.eatDeathCurseTime] : effBuff.effConfig.duration;
                    ttarget.addBuff(effBuff);
                    selfTarget.addPaoPao(3);
                    isSiZhou = true;
                }
                if (GameLogic.triggerExAttr(selfTarget, ExAttributeType.eatAttackAddHpProbability)) {
                }
            }
            var isHeji = UserSkill.ins().isHejiSkill(skill.configID);
            var isCrit = false;
            var isLucky = false;
            var isMultipleCrit = false;
            var isMiss = false;
            var isWeishe = false;
            var isZhuiMing = false;
            var isZhiMing = false;
            var isGongMing = void 0;
            var isHearth = void 0;
            var hramValue = 0;
            if (skill.calcType != 3) {
                isMiss = GameLogic.triggerMiss(selfTarget, ttarget);
            }
            if (isMiss) {
                hramValue = 0;
            }
            else {
                hramValue = this.damageBaseCalculation(selfTarget, ttarget, skill);
                if (skill.calcType != 3) {
                    isMultipleCrit = GameLogic.triggerExAttr(selfTarget, ExAttributeType.eatMultipleCrit);
                    if (isMultipleCrit) {
                        hramValue = hramValue * (selfInfo.getExAtt(ExAttributeType.eatMultipleCritCoeff) / 10000);
                        hramValue += selfInfo.getExAtt(ExAttributeType.atMultipleCritHurt);
                        selfTarget.addPaoPao(21);
                    }
                    isCrit = GameLogic.triggerCrit(selfTarget, ttarget, critAdd);
                    var useSkyBall = selfTarget.hasBuff(SkillConst.EFF_SKY_BALL);
                    if (useSkyBall) {
                        selfTarget.addPaoPao(6);
                        isCrit = true;
                    }
                    var addDamage = 0;
                    var addPer = 1;
                    if (isCrit) {
                        hasCrit = true;
                        var critDamage = selfInfo.getAtt(AttributeType.atCritEnhance);
                        if (gwSkillConfig && gwSkillConfig.critDamage) {
                            critDamage += gwSkillConfig.critDamage;
                        }
                        var critHp = selfInfo.getExAtt(ExAttributeType.eatCritHpLt);
                        if (tarInfo.getAtt(AttributeType.atHp) / tarInfo.getAtt(AttributeType.atMaxHp) <= critHp / 10000) {
                            critDamage += selfInfo.getExAtt(ExAttributeType.eatCritHpLtAddDamage);
                        }
                        addPer += critDamage / 10000;
                        addDamage += selfInfo.getAtt(AttributeType.atCritHurt);
                    }
                    var exAttr = {};
                    exAttr[AttributeType.atDeadLyPro] = GameLogic.calculateRealAttribute(selfTarget, AttributeType.atDeadLyPro, selfTarget);
                    isZhiMing = GameLogic.triggerAttr(selfTarget, AttributeType.atDeadLyPro, exAttr);
                    if (isZhiMing) {
                        addPer += 0.5 + (selfInfo.getAtt(AttributeType.atDeadLyMaster) - tarInfo.getAtt(AttributeType.atDeadLyResist)) / 10000;
                    }
                    exAttr = {};
                    exAttr[AttributeType.atHunGuPro] = GameLogic.calculateRealAttribute(selfTarget, AttributeType.atHunGuPro, selfTarget);
                    isGongMing = this.tryTriggerHungu(selfTarget);
                    if (isGongMing) {
                        addPer += selfInfo.getAtt(AttributeType.atHunGuHurt) / 10000;
                    }
                    isHearth = this.tryTriggerHeart(selfTarget);
                    if (isHearth) {
                        addPer += selfInfo.getAtt(AttributeType.atHearthHurt) / 10000;
                        addDamage += selfInfo.getAtt(AttributeType.atHearthDamege);
                    }
                    hramValue = hramValue * addPer + addDamage;
                    if (isSiZhou)
                        hramValue = hramValue * (1 + selfInfo.attributeExData[ExAttributeType.eatDeathCurseDamageIncrease] / 10000);
                    if (!isMainTar && skill.targetType == TargetType.Enemy) {
                        if (tarInfo.type == EntityType.Role) {
                            hramValue = hramValue * (skill.herdPlayerRate / 100);
                        }
                        else {
                            hramValue = hramValue * (skill.herdMonRate / 100);
                        }
                    }
                    if (selfTarget.isMy && selfInfo.type == EntityType.Role && target.infoModel.type == EntityType.Role) {
                        if (Encounter.ins().isEncounter()) {
                            if (EncounterFight.ins().getIsWeiShe(selfTarget.isMy))
                                isWeishe = true;
                        }
                        else if (MineFight.ins().isFighting) {
                            if (MineFight.ins().getIsWeiShe(selfTarget.isMy))
                                isWeishe = true;
                        }
                    }
                    hramValue = this.damageBuff(selfTarget, ttarget, hramValue);
                    hramValue = hramValue + selfInfo.getAtt(AttributeType.atHolyDamege) * (1 + selfInfo.getAtt(AttributeType.atHolyMaster) / 10000.0 - tarInfo.getAtt(AttributeType.atHolyResist) / 10000.0);
                    isZhuiMing = GameLogic.triggerAttr(selfTarget, AttributeType.atZhuiMingPro);
                    if (isZhuiMing) {
                        hramValue += selfInfo.getAtt(AttributeType.atZhuiMingVal);
                    }
                    hramValue = hramValue * (1 - selfInfo.getAtt(AttributeType.neigongAbsorbHurt) / 10000.0);
                }
                hramValue = hramValue >> 0;
                if (selfTarget.team == ttarget.team && hramValue > 0) {
                    hramValue = 0;
                }
            }
            if (!(ttarget instanceof CharRole)) {
                if (ttarget.AI_STATE == AI_State.Patrol) {
                    ttarget.stopMove();
                    ttarget.playAction(EntityAction.STAND);
                    ttarget.AI_STATE = AI_State.Stand;
                }
            }
            var isDie = this.hramedDie(ttarget, hramValue);
            if (isDie) {
                ttarget.AI_STATE = AI_State.Die;
                ExSkillAiLogic.ins().checkDieTrigger(selfTarget, [ttarget]);
            }
            var damageType = 0;
            if (selfTarget.team == Team.My) {
                if (isHeji) {
                    damageType = DamageTypes.Heji;
                }
                else if (isMiss) {
                    damageType = DamageTypes.Dodge;
                }
                else {
                    if (isLucky) {
                        damageType |= DamageTypes.Lucky;
                    }
                    if (isCrit) {
                        damageType |= DamageTypes.CRIT;
                    }
                }
                if (isWeishe)
                    damageType |= DamageTypes.Deter;
                if (isZhuiMing)
                    damageType |= DamageTypes.ZhuiMing;
                if (isZhiMing)
                    damageType |= DamageTypes.ZhiMing;
            }
            if (selfTarget.team != ttarget.team && skill.calcType == 5) {
                var h5 = (hramValue / 5) >> 0;
                var h1 = (h5 * MathUtils.limit(0, 0.05)) >> 0;
                var h2 = (h5 * MathUtils.limit(0, 0.05)) >> 0;
                var hits = [h5 - h1, h5 + h1, h5 - h2, h5 + h2, hramValue - 4 * h5];
                var hitInfo = [];
                for (var i = 0; i < hits.length; i++) {
                    hitInfo.push({
                        isDie: isDie,
                        damageType: DamageTypes.Fujia,
                        ttarget: ttarget,
                        hramValue: hits[i]
                    });
                }
                hitTargetInfo.push(hitInfo);
            }
            else {
                hitTargetInfo.push([{
                        isDie: isDie,
                        damageType: damageType,
                        ttarget: ttarget,
                        hramValue: hramValue
                    }]);
                if (selfTarget.team != ttarget.team && GameLogic.triggerAttr(selfTarget, AttributeType.atAttPerDamPan)) {
                    isDie = this.hramedDie(ttarget, (hramValue >> 1));
                    selfTarget.addPaoPao(20);
                    var targetInfo = hitTargetInfo[hitTargetInfo.length - 1];
                    targetInfo.push({
                        isDie: isDie,
                        damageType: DamageTypes.Fujia,
                        ttarget: ttarget,
                        hramValue: hramValue >> 1
                    });
                }
            }
            ttarget.myKill = ttarget.myKill || selfTarget.isMy;
            if (selfTarget.isMy || selfTarget.team == Team.WillEntity) {
                ttarget.showBlood(true);
                ttarget.showName(true);
            }
            if (ttarget.isMy) {
                selfTarget.showBlood(true);
                selfTarget.showName(true);
            }
        }
        var fbType = GameMap.fbType;
        var fbId = GameMap.fubenID;
        var hitTime = 0;
        GameLogic.ins().playSkillEff(skill, selfTarget, tempArr, function (probability) {
            if (GameMap.fbType != fbType || fbId != GameMap.fubenID)
                return;
            var pType = 0;
            for (var i in tempArr) {
                var ttarget = tempArr[i];
                var ttInfo = ttarget.infoModel;
                var targetIsDie = hitTargetInfo[i][hitTargetInfo[i].length - 1].isDie;
                if (pTarget == ttarget) {
                    pType = hitTargetInfo[i][0].damageType;
                }
                var hramValue = 0;
                for (var j = 0; j < hitTargetInfo[i].length; j++) {
                    var targetInfo = hitTargetInfo[i][j];
                    hramValue += targetInfo.hramValue;
                    _this.showHram(targetInfo.isDie, targetInfo.damageType, ttarget, selfTarget, targetInfo.hramValue, skill.name);
                }
                if (selfTarget.team == Team.My && ttarget.team == Team.WillEntity && EncounterFight.ins().willEntityFightTeam != Team.My) {
                    EncounterFight.ins().willEntityFightTeam = Team.My;
                    var willList = EntityManager.ins().getEntityByTeam(Team.WillEntity);
                    for (var _i = 0, willList_1 = willList; _i < willList_1.length; _i++) {
                        var char = willList_1[_i];
                        _this.curTarget[char.infoModel.handle] = null;
                        _this.lastTarget[char.infoModel.handle] = null;
                    }
                }
                ttarget.shakeIt();
                if (!targetIsDie) {
                    var tarEff = skill.tarEff;
                    if (pTarget != ttarget && ttarget.infoModel.type == EntityType.Role) {
                        tarEff = skill.otarEff || tarEff;
                    }
                    for (var k = 0; tarEff && k < tarEff.length; k++) {
                        var args = _this.getArgs(tarEff[k], ImbaData, gwSkillConfig);
                        var buff = EntityBuff.createBuff(tarEff[k], selfTarget, args);
                        ttarget.addBuff(buff);
                    }
                    if (ImbaData) {
                        _this.addTargetReviseSkillEffect(ttarget, selfTarget, ImbaData);
                    }
                    if (gwSkillConfig) {
                        _this.addTargetReviseSkillEffect(ttarget, selfTarget, gwSkillConfig);
                    }
                    if (gwSkills && gwSkills[1]) {
                        _this.addTargetReviseSkillEffect(ttarget, selfTarget, gwSkills[1]);
                    }
                    if (ttarget instanceof CharRole) {
                        _this.tryUseWingSkill(ttarget, skill, true);
                    }
                    _this.tryUsePassiveSkill(selfTarget, ttarget, true, hitTargetInfo[i][0].damageType);
                    _this.tryUseWeaponSkill(ttarget, skill, true);
                    _this.tryTriggerMijiBuqu(ttarget);
                }
                _this.showBuffHarm(selfTarget, ttarget, skill, hramValue);
            }
            if (selfSkillEff) {
                for (var k = 0; skill.selfEff && k < skill.selfEff.length; k++) {
                    var args = _this.getArgs(skill.selfEff[k], ImbaData, gwSkillConfig);
                    var buff = EntityBuff.createBuff(skill.selfEff[k], selfTarget, args);
                    selfTarget.addBuff(buff);
                }
            }
            if (ImbaData) {
                _this.addSelfReviseSkillEffect(selfTarget, ImbaData);
            }
            if (gwSkillConfig) {
                _this.addSelfReviseSkillEffect(selfTarget, gwSkillConfig);
            }
            if (gwSkills && gwSkills[1]) {
                _this.addSelfReviseSkillEffect(selfTarget, gwSkills[1]);
            }
            if (selfTarget instanceof CharRole) {
                _this.tryUseWingSkill(selfTarget, skill, false);
            }
            _this.tryUsePassiveSkill(selfTarget, pTarget, false, pType);
            _this.tryTriggerHeirloomSkill(selfTarget, tempArr, hitTargetInfo);
            if (isYlBullet) {
                _this.tryUseYlPassiveSkill(selfTarget, pTarget, skill);
            }
            if (skill.configID == 80002) {
                _this.petTryUsePassiveSkill(selfTarget, false);
            }
            if (skill.otherSkills) {
                var skills = skill.otherSkills.concat();
                var skillData = new SkillData(skills[hitTime]);
                skillData.preId = skill.configID;
                _this.useSkill(selfTarget, target, skillData);
                hitTime += 1;
                return;
            }
        });
        if (!SoundUtil.WINDOW_OPEN && skill.sound && selfTarget.team == Team.My) {
            SoundUtil.ins().playEffect(skill.sound);
        }
        selfTarget.AI_STATE = AI_State.Stand;
        selfTarget.atking = false;
        if (hasCrit && selfInfo.getExAtt(ExAttributeType.eatMiJiZHDamPer)) {
            this.checkTriggerAttr(selfTarget, 1, ExAttributeType.eatMiJiZHTime, 1);
        }
        this.repel(selfTarget, target, skill);
    };
    RoleAI.prototype.repel = function (selfTarget, target, skill) {
        if (skill && skill.repelDistance) {
            target.stopMove();
            target.playAction(EntityAction.STAND);
            var h = target.infoModel.handle;
            delete this.curTarget[h];
            var jd = MathUtils.getAngle(MathUtils.getRadian2(selfTarget.x, selfTarget.y, target.x, target.y));
            var p = MathUtils.getDirMove(jd, skill.repelDistance);
            p.x = target.x + p.x;
            p.y = target.y + p.y;
            var data = BresenhamLine.isAbleToThrough(GameMap.point2Grip(target.x), GameMap.point2Grip(target.y), GameMap.point2Grip(p.x), GameMap.point2Grip(p.y));
            if (data[0] == 0) {
                if (data[1] > 3) {
                    debug.error("\u901A\u8FC7\u683C\u5B50\u8D85\u8FC73\u4E2A\uFF0C\u68C0\u67E5\u662F\u5426\u6709\u5F02\u5E38" + data[2] + "," + data[3], p);
                }
                if (GameMap.point2Grip(target.x) == data[2] && GameMap.point2Grip(target.y) == data[3]) {
                    p.x = target.x;
                    p.y = target.y;
                }
                else {
                    p.x = GameMap.grip2Point(data[2]);
                    p.y = GameMap.grip2Point(data[3]);
                }
            }
            p.x = Math.max(Math.min(p.x, GameMap.MAX_WIDTH), 0);
            p.y = Math.max(Math.min(p.y, GameMap.MAX_HEIGHT), 0);
            var xbX = p.x - target.x;
            var xbY = p.y - target.y;
            var time = Math.sqrt(xbX * xbX + xbY * xbY) / (selfTarget.moveSpeed / 1000);
            var holdTime = GlobalConfig.EffectsConfig[skill.tarEff[0]].duration;
            target.addHardStraight(holdTime);
            if (time > 0) {
                var t = egret.Tween.get(target.moveTweenObj);
                t.to({
                    "x": p.x,
                    "y": p.y
                }, time);
            }
            if (skill.teleport == 1) {
                if (skill && skill.actionType != "")
                    selfTarget.playAction(skill.actionType);
                selfTarget.stopMove();
                if (time > 0) {
                    var t = egret.Tween.get(selfTarget.moveTweenObj);
                    t.to({
                        "x": selfTarget.x - (target.x - p.x),
                        "y": selfTarget.y - (target.y - p.y)
                    }, time).call(function () {
                        selfTarget.stopMove();
                        selfTarget.resetStand();
                    });
                    selfTarget.addHardStraight(time);
                }
            }
        }
    };
    RoleAI.prototype.checkTriggerAttr = function (selfTarget, type, attrType, per, exValue) {
        if (per === void 0) { per = 1; }
        if (exValue === void 0) { exValue = 0; }
        if (Math.random() < per) {
            var selfInfo = selfTarget.infoModel;
            var handle = selfInfo.handle;
            var obj = this.attrCD[handle] = this.attrCD[handle] || {};
            var key = type + "_" + attrType;
            var value = exValue ? exValue : (type == 0 ? selfInfo.getAtt(attrType) : selfInfo.getExAtt(attrType));
            var lastTime = obj[key] || 0;
            var curTimer = egret.getTimer();
            if (lastTime && curTimer - lastTime < value) {
                return;
            }
            obj[key] = curTimer;
            var attrValue = this.attrValue[handle] = this.attrValue[handle] || {};
            attrValue[key] = 1;
        }
    };
    RoleAI.prototype.getIsTriggerAttr = function (selfTarget, type, attrType, def) {
        if (def === void 0) { def = 0; }
        var selfInfo = selfTarget.infoModel;
        var attrValue = this.attrValue[selfInfo.handle];
        if (attrValue) {
            var key = type + "_" + attrType;
            var last = attrValue[key];
            attrValue[key] = def;
            return last;
        }
        return 0;
    };
    RoleAI.prototype.addSelfReviseSkillEffect = function (selfTarget, ImbaData) {
        if (ImbaData.selfEff) {
            for (var k in ImbaData.selfEff) {
                var config = GlobalConfig.EffectsConfig[ImbaData.selfEff[k]] ? GlobalConfig.EffectsConfig[ImbaData.selfEff[k]] : null;
                if (config) {
                    var args = this.getArgs(ImbaData.selfEff[k], ImbaData, null);
                    var buff = EntityBuff.createBuff(ImbaData.selfEff[k], selfTarget, args);
                    selfTarget.addBuff(buff);
                }
            }
        }
    };
    RoleAI.prototype.addTargetReviseSkillEffect = function (target, source, ImbaData) {
        if (ImbaData.targetEff) {
            for (var k in ImbaData.targetEff) {
                var config = GlobalConfig.EffectsConfig[ImbaData.targetEff[k]] ? GlobalConfig.EffectsConfig[ImbaData.targetEff[k]] : null;
                if (config) {
                    var args = this.getArgs(ImbaData.targetEff[k], ImbaData, null);
                    var buff = EntityBuff.createBuff(ImbaData.targetEff[k], source, args);
                    target.addBuff(buff);
                }
            }
        }
    };
    RoleAI.prototype.tryUsePassiveSkill = function (selfTarget, target, isBeEffect, _type) {
        if (isBeEffect === void 0) { isBeEffect = false; }
        if (_type === void 0) { _type = 0; }
        var selfTar = isBeEffect ? target : selfTarget;
        var pTarget = isBeEffect ? selfTarget : target;
        if (selfTar instanceof CharRole) {
            var canUseSkill = this.getCanUseSkillList(selfTar, false);
            if (!canUseSkill || canUseSkill.length == 0)
                return;
            var skills = [];
            for (var _i = 0, canUseSkill_1 = canUseSkill; _i < canUseSkill_1.length; _i++) {
                var skill = canUseSkill_1[_i];
                var passive = skill.config.passive;
                if (passive.p1) {
                    if (selfTar.infoModel.getAtt(AttributeType.atHp) / selfTar.infoModel.getAtt(AttributeType.atMaxHp) > passive.p1 / 10000) {
                        continue;
                    }
                }
                switch (passive.cond) {
                    case 0:
                        if (!isBeEffect) {
                            if (GameLogic.triggerValue(passive.rate)) {
                                skills.push(skill);
                            }
                        }
                        break;
                    case 1:
                        if (isBeEffect) {
                            if (GameLogic.triggerValue(passive.rate)) {
                                skills.push(skill);
                            }
                        }
                        break;
                    case 2:
                        if (!isBeEffect && (_type & DamageTypes.CRIT) == DamageTypes.CRIT) {
                            if (GameLogic.triggerValue(passive.rate)) {
                                skills.push(skill);
                            }
                        }
                        break;
                    case 3:
                        if (isBeEffect && (_type & DamageTypes.CRIT) == DamageTypes.CRIT) {
                            if (GameLogic.triggerValue(passive.rate)) {
                                skills.push(skill);
                            }
                        }
                        break;
                }
            }
            if (!skills.length)
                return;
            for (var _a = 0, skills_1 = skills; _a < skills_1.length; _a++) {
                var skillData = skills_1[_a];
                var tar = void 0;
                if (skillData.targetType != TargetType.Enemy) {
                    tar = selfTar;
                }
                else {
                    if (pTarget && pTarget.infoModel.getAtt(AttributeType.atHp) > 0) {
                        tar = pTarget;
                    }
                    else {
                        var monsters = EntityManager.ins().screeningTargetByPos(selfTar, false, 0, skillData.affectRange, this.aiList);
                        tar = monsters && monsters[0];
                    }
                }
                if (tar) {
                    var handle = selfTar.infoModel.handle;
                    this.skillCD[handle] = this.skillCD[handle] || {};
                    this.skillCD[handle][skillData.id] = egret.getTimer();
                    this.useSkill(selfTar, tar, skillData);
                }
            }
        }
    };
    RoleAI.prototype.tryUseWarSpiritSkill = function (selfTarget, skillId, isBeEffect) {
        var skillData = ObjectPool.pop('SkillData');
        skillData.configID = skillId;
        var tar;
        if (skillData.targetType != TargetType.Enemy) {
            tar = selfTarget;
        }
        else {
            var monsters = EntityManager.ins().screeningTargetByPos(selfTarget, false, 0, skillData.affectRange, this.aiList);
            tar = monsters[0];
        }
        if (tar) {
            var handle = selfTarget.infoModel.handle;
            this.skillCD[handle] = this.skillCD[handle] || {};
            this.skillCD[handle][skillData.id] = egret.getTimer();
            this.useSkill(selfTarget, tar, skillData);
        }
    };
    RoleAI.prototype.tryUseWingSkill = function (selfTarget, skill, isBeEffect) {
        var wingSkills = this.checkWingEffect(selfTarget, skill, isBeEffect);
        if (wingSkills.length) {
            for (var _i = 0, wingSkills_1 = wingSkills; _i < wingSkills_1.length; _i++) {
                var skillId = wingSkills_1[_i];
                var skillData = ObjectPool.pop('SkillData');
                skillData.configID = skillId;
                var tar = void 0;
                if (skillData.targetType != TargetType.Enemy) {
                    tar = selfTarget;
                }
                else {
                    var monsters = EntityManager.ins().screeningTargetByPos(selfTarget, false, 0, skillData.affectRange, this.aiList);
                    tar = monsters[0];
                }
                if (tar) {
                    var handle = selfTarget.infoModel.handle;
                    this.skillCD[handle] = this.skillCD[handle] || {};
                    this.skillCD[handle][skillData.id] = egret.getTimer();
                    this.useSkill(selfTarget, tar, skillData);
                }
            }
        }
    };
    RoleAI.prototype.checkWingEffect = function (selfTarget, skill, isBeEffect) {
        if (isBeEffect === void 0) { isBeEffect = false; }
        var wingSkill = selfTarget.infoModel.wingSkillData;
        var triggerSkills = [];
        if (skill.isPassive) {
            return triggerSkills;
        }
        var skillCD = this.skillCD[selfTarget.infoModel.handle];
        for (var _i = 0, wingSkill_1 = wingSkill; _i < wingSkill_1.length; _i++) {
            var skillId = wingSkill_1[_i];
            var skillConfig = ObjectPool.pop('SkillData');
            skillConfig.configID = skillId;
            if (skillCD && skillCD[skillConfig.id] && (egret.getTimer() - skillCD[skillConfig.id] < skillConfig.cd)) {
                continue;
            }
            if (skillConfig.config.passive.cond == 0 && !isBeEffect) {
                if (GameLogic.triggerValue(skillConfig.config.passive.rate)) {
                    triggerSkills.push(skillId);
                }
            }
            else if (skillConfig.config.passive.cond == 1 && isBeEffect) {
                if (GameLogic.triggerValue(skillConfig.config.passive.rate)) {
                    triggerSkills.push(skillId);
                }
            }
        }
        return triggerSkills;
    };
    RoleAI.prototype.tryUseYlPassiveSkill = function (selfTarget, target, skill) {
        var info = selfTarget.infoModel;
        if (info.lyMarkLv && info.lyMarkSkills) {
            for (var i = 0; i < info.lyMarkSkills.length; i++) {
                var lv = info.lyMarkSkills[i] || 0;
                if (lv) {
                    var config = GlobalConfig.FlameStampEffect[i + 1][lv];
                    if (config.effId) {
                        var effConfig = GlobalConfig.EffectsConfig[config.effId];
                        if (effConfig.probabilityBuff) {
                            if (GameLogic.triggerValue(effConfig.probabilityBuff)) {
                                var buff = EntityBuff.createBuff(config.effId, selfTarget);
                                target.addBuff(buff);
                            }
                        }
                    }
                    if (config.selfEffId) {
                        var effConfig = GlobalConfig.EffectsConfig[config.selfEffId];
                        if (effConfig.probabilityBuff) {
                            if (GameLogic.triggerValue(effConfig.probabilityBuff)) {
                                var buff = EntityBuff.createBuff(config.selfEffId, selfTarget);
                                selfTarget.addBuff(buff);
                            }
                        }
                    }
                }
            }
        }
    };
    RoleAI.prototype.tryTriggerHeirloomSkill = function (selfTarget, tempArr, hitTargetInfo) {
        var buff80004 = null;
        var _bfCurse = 80004;
        var shixueId = 6666601;
        var isTriggerShiXue = -1;
        var shixueValue = 0;
        var selfHandle = selfTarget.infoModel.handle;
        for (var i in tempArr) {
            var ttarget = tempArr[i];
            var tarHandle = ttarget.infoModel.handle;
            if (selfTarget.team != ttarget.team) {
                if (isTriggerShiXue == -1) {
                    isTriggerShiXue = 0;
                    if (!this.skillCD[selfHandle] || !this.skillCD[selfHandle][shixueId] || (egret.getTimer() - this.skillCD[selfHandle][shixueId] >= 5000)) {
                        if (GameLogic.triggerAttr(selfTarget, AttributeType.atVamirePro)) {
                            isTriggerShiXue = 1;
                            this.skillCD[selfHandle] = this.skillCD[selfHandle] || {};
                            this.skillCD[selfHandle][shixueId] = egret.getTimer();
                        }
                    }
                }
                if (ttarget instanceof CharRole && !selfTarget.hasBuff(_bfCurse) && !buff80004) {
                    if (!this.skillCD[tarHandle] || !this.skillCD[tarHandle][_bfCurse] || (egret.getTimer() - this.skillCD[tarHandle][_bfCurse] >= 5000)) {
                        if (GameLogic.triggerAttr(ttarget, AttributeType.atCursePro)) {
                            var lv = ttarget.infoModel.heirloom.getInfoBySolt(2).lv;
                            if (lv > 0) {
                                lv -= 1;
                            }
                            var buffId = [80004, 80005, 80006, 80007][lv];
                            buff80004 = ObjectPool.pop('EntityBuff');
                            buff80004.effConfig = GlobalConfig.EffectsConfig[buffId];
                            buff80004.value = buff80004.effConfig.args.a;
                            buff80004.addTime = egret.getTimer();
                            buff80004.endTime = buff80004.addTime + buff80004.effConfig.duration;
                            selfTarget.addBuff(buff80004);
                            ttarget.addPaoPao(13);
                            this.skillCD[tarHandle] = this.skillCD[tarHandle] || {};
                            this.skillCD[tarHandle][_bfCurse] = egret.getTimer();
                        }
                    }
                }
            }
        }
        if (isTriggerShiXue == 1) {
            selfTarget.addPaoPao(14);
            for (var _i = 0, hitTargetInfo_1 = hitTargetInfo; _i < hitTargetInfo_1.length; _i++) {
                var info = hitTargetInfo_1[_i];
                if (shixueValue == 0) {
                    shixueValue = Math.floor(selfTarget.infoModel.getAtt(AttributeType.atVamirePen) / 10000 * info[0].hramValue);
                }
            }
            this.hramedDie(selfTarget, -shixueValue);
            this.showHram(false, 1, selfTarget, selfTarget, -shixueValue);
        }
    };
    RoleAI.prototype.tryUseWeaponSkill = function (target, skill, isBeHit) {
        if (target.AI_STATE == AI_State.Die)
            return;
        if (target.getRealHp() <= 0)
            return;
        if (isBeHit) {
            var isAddHpPro = GameLogic.triggerAttr(target, AttributeType.atBeAttAddHpPro);
            if (isAddHpPro) {
                target.addPaoPao(16);
                var addHp = target.infoModel.getAtt(AttributeType.atBeAttAddHpVal);
                this.hramedDie(target, -addHp);
                this.showHram(false, 1, target, target, -addHp);
            }
            if (target.infoModel.getAtt(AttributeType.atHpLtAddBuff) && (target.infoModel.getAtt(AttributeType.atHp) / target.infoModel.getAtt(AttributeType.atMaxHp)) < (target.infoModel.getAtt(AttributeType.atHpLtAddBuff) / 10000)) {
                var skillCD = this.skillCD[target.infoModel.handle];
                var effConfig = GlobalConfig.EffectsConfig[target.infoModel.getExAtt(ExAttributeType.eatHpLtAddBuffId)];
                if (skillCD && skillCD[ExAttributeType.eatHpLtAddBuffId] && egret.getTimer() - skillCD[ExAttributeType.eatHpLtAddBuffId] < target.infoModel.getExAtt(ExAttributeType.eatHpLtAddBuffCd)) {
                    return;
                }
                target.addPaoPao(18);
                var buff = ObjectPool.pop('EntityBuff');
                buff.effConfig = effConfig;
                buff.value = buff.effConfig.args.a;
                buff.addTime = egret.getTimer();
                buff.endTime = buff.addTime + buff.effConfig.duration;
                target.addBuff(buff);
                this.skillCD[target.infoModel.handle] = this.skillCD[target.infoModel.handle] || {};
                this.skillCD[target.infoModel.handle][ExAttributeType.eatHpLtAddBuffId] = egret.getTimer();
            }
        }
    };
    RoleAI.prototype.tryTriggerMijiBuqu = function (ttarget) {
        var ttInfo = ttarget.infoModel;
        if (!ttInfo.getExAtt(ExAttributeType.eatMiJiBQBuffId))
            return;
        if (ttInfo.getAtt(AttributeType.atHp) / ttInfo.getAtt(AttributeType.atMaxHp) * 10000 < ttInfo.getExAtt(ExAttributeType.eatMiJiBQHpPer)) {
            this.checkTriggerAttr(ttarget, 1, ExAttributeType.eatMiJiBQHpTime, 1);
            var isTrigger = this.getIsTriggerAttr(ttarget, 1, ExAttributeType.eatMiJiBQHpTime);
            if (isTrigger) {
                var buff = EntityBuff.createBuff(ttInfo.getExAtt(ExAttributeType.eatMiJiBQBuffId), ttarget);
                ttarget.addBuff(buff);
                ttarget.addPaoPao(23);
            }
        }
    };
    RoleAI.prototype.tryTriggerHungu = function (ttarget) {
        var ttInfo = ttarget.infoModel;
        var per = ttInfo.getAtt(AttributeType.atHunGuPro);
        if (!per)
            return;
        this.checkTriggerAttr(ttarget, 0, AttributeType.atHunGuCd, per / 10000);
        var isTrigger = this.getIsTriggerAttr(ttarget, 0, AttributeType.atHunGuCd);
        if (isTrigger) {
            BubbleFactory.ins().playBubbleEffect(24);
        }
        return isTrigger;
    };
    RoleAI.prototype.tryTriggerHeart = function (ttarget) {
        var ttInfo = ttarget.infoModel;
        if (!ttInfo.getAtt(AttributeType.atHearthCount))
            return;
        this.checkTriggerAttr(ttarget, 0, AttributeType.atHearthCount, 1, 8000);
        var isTrigger = this.getIsTriggerAttr(ttarget, 0, AttributeType.atHearthCount);
        if (isTrigger) {
            BubbleFactory.ins().playBubbleEffect(25);
        }
        return isTrigger;
    };
    RoleAI.prototype.petTryUsePassiveSkill = function (selfTarget, isBeEffect) {
        if (isBeEffect === void 0) { isBeEffect = true; }
        var masterHandle = selfTarget.infoModel.masterHandle;
        var role = EntityManager.ins().getEntityByHandle(masterHandle);
        if (role && role.infoModel && role.infoModel.getExAtt(ExAttributeType.eatPetSkillLevel)) {
            var skillId = 36000 + role.infoModel.getExAtt(ExAttributeType.eatPetSkillLevel);
            var canUseSkill = [new SkillData(skillId)];
            var skills = [];
            for (var _i = 0, canUseSkill_2 = canUseSkill; _i < canUseSkill_2.length; _i++) {
                var skill = canUseSkill_2[_i];
                if (skill.config.passive.cond == 0 && !isBeEffect) {
                    if (GameLogic.triggerValue(skill.config.passive.rate)) {
                        skills.push(skill);
                    }
                }
                else if (skill.config.passive.cond == 1 && isBeEffect) {
                    if (GameLogic.triggerValue(skill.config.passive.rate)) {
                        skills.push(skill);
                    }
                }
            }
            if (!skills.length)
                return;
            for (var _a = 0, skills_2 = skills; _a < skills_2.length; _a++) {
                var skillData = skills_2[_a];
                var tar = void 0;
                if (skillData.targetType != TargetType.Enemy) {
                    tar = selfTarget;
                }
                else {
                    var monsters = EntityManager.ins().screeningTargetByPos(selfTarget, false, 0, skillData.affectRange, this.aiList);
                    tar = monsters[0];
                }
                if (tar) {
                    var handle = selfTarget.infoModel.handle;
                    this.skillCD[handle] = this.skillCD[handle] || {};
                    this.skillCD[handle][skillData.id] = egret.getTimer();
                    this.useSkill(selfTarget, tar, skillData);
                }
            }
        }
    };
    RoleAI.prototype.showBuffHarm = function (selfTarget, target, skill, hramValue) {
        var addValue = GameLogic.calculateRealAttribute(target, AttributeType.atAddEnemyHp, selfTarget);
        if (addValue > 0) {
            addValue = -addValue;
            this.hramedDie(selfTarget, addValue);
            if (selfTarget instanceof CharRole) {
                this.showHram(false, DamageTypes.BLANK, selfTarget, selfTarget, addValue);
            }
        }
        var atHurtMyself = GameLogic.calculateRealAttribute(selfTarget, AttributeType.atHurtMyself, target);
        if (atHurtMyself) {
            var value = Math.floor(hramValue * atHurtMyself / 10000);
            var isDie = this.hramedDie(selfTarget, value);
            this.showHram(isDie, DamageTypes.BLANK, selfTarget, target, value);
        }
    };
    RoleAI.prototype.hramedDie = function (t, v) {
        var value = t.infoModel.getAtt(AttributeType.atHp) - v;
        if (v < 0) {
            var maxValue = t.infoModel.getAtt(AttributeType.atMaxHp);
            value = value > maxValue ? maxValue : value;
        }
        t.infoModel.setAtt(AttributeType.atHp, value);
        if (t.infoModel.getAtt(AttributeType.atHp) <= 0) {
            return true;
        }
        return false;
    };
    RoleAI.prototype.showHram = function (isDie, damageType, target, sourceTarget, hramValue, logStr) {
        var _this = this;
        if (logStr === void 0) { logStr = ""; }
        if (!target || !target.infoModel)
            return;
        this.trace(target.infoModel.handle + " -- 受到" + hramValue + ", 当前剩余血量:" + target.getHP() + "	--" + logStr);
        target.hram(hramValue);
        GameLogic.ins().postEntityHpChange(target, sourceTarget, damageType, hramValue);
        if (isDie) {
            target.removeAllFilters();
            target.stopMove();
            target.playAction(EntityAction.HIT);
            if (target.myKill && !(target instanceof CharRole)) {
                var data = UserTask.ins().taskTrace;
                if (data) {
                    var config = UserTask.ins().getAchieveConfById(data.id);
                    if (config && config.type == RoleAI.SEND_TASK_TYPE)
                        UserFb.ins().sendKillMonster(target.infoModel.configID);
                }
            }
            if (!target.hasBuff(52001) &&
                GameLogic.triggerExAttr(target, ExAttributeType.eatGodBlessProbability)) {
                target.AI_STATE = AI_State.Stand;
                target.removeAllBuff();
                var r = target.infoModel.getAtt(AttributeType.atMaxHp) * target.infoModel.attributeExData[ExAttributeType.eatGodBlessRate] / 10000;
                target.infoModel.setAtt(AttributeType.atHp, r);
                target.hram(-r);
                this.trace("复活后剩余血量" + target.getHP());
                target.addPaoPao(7);
            }
            else {
                this.trace(target.infoModel.handle + " -- 死亡，等待删除形象");
                if (sourceTarget && sourceTarget.team == Team.My) {
                    this.checkPlayDieSound(target);
                }
                TimerManager.ins().doTimer(500, 1, function () {
                    _this.trace(target.infoModel.handle + " -- 删除");
                    EntityManager.ins().removeByHandle(target.infoModel.handle, false, (target.myKill && target.infoModel.type == EntityType.Monster));
                    if (target.infoModel.type == EntityType.Role) {
                        var enti = EntityManager.ins().getEntityBymasterhHandle(target.infoModel.masterHandle);
                        if (!enti) {
                            var list = EntityManager.ins().getMasterList(target.infoModel.masterHandle);
                            if (list && list.length) {
                                for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                                    var en = list_1[_i];
                                    EntityManager.ins().removeByHandle(en.infoModel.handle);
                                }
                            }
                        }
                    }
                    delete _this.hashHpObj[target.hashCode];
                    target.onDead(function () {
                        target.deadDelay();
                        _this.clearTarget(target);
                        var t = egret.Tween.get(target.dieTweenObj);
                        t.wait(1000).to({ alpha: 0 }, 1000).call(function () {
                            if (target instanceof CharMonster && !(target instanceof CharRole)) {
                                target.destruct();
                            }
                            else {
                                DisplayUtils.removeFromParent(target);
                            }
                        });
                    });
                    if (target.team == Team.Monster) {
                        var count = EntityManager.ins().getTeamCount(Team.Monster);
                        if (count <= UserFb.ins().rCount) {
                            GameLogic.ins().createGuanqiaMonster(false);
                        }
                    }
                    _this.checkAIend(sourceTarget, target);
                }, this);
                if (target.team == Team.Monster) {
                    var count = EntityManager.ins().getTeamCount(Team.Monster);
                    if (count <= UserFb.ins().rCount) {
                        GameLogic.ins().createGuanqiaMonster(false);
                    }
                    if (sourceTarget.team == Team.My) {
                        var master = EntityManager.ins().getNoDieRole();
                        var isElite_1 = target.infoModel.configID == UserFb.ins().eliteMonsterId;
                        if (master && (isElite_1 || sourceTarget.infoModel.handle == master.infoModel.handle) && GameMap.fubenID == 0) {
                            var x_Grid = Math.floor(target.x / GameMap.CELL_SIZE);
                            var y_Grid = Math.floor(target.y / GameMap.CELL_SIZE);
                            var itemData = void 0;
                            if (!isElite_1) {
                                itemData = UserFb.ins().getRewardsPop();
                                UserFb.ins().rewards = [];
                            }
                            else {
                                itemData = UserFb.ins().eliteRewards.shift();
                            }
                            if (itemData && itemData.length > 0) {
                                for (var j = 0; j < itemData.length && j < 8; j++) {
                                    Encounter.ins().postCreateDrop(x_Grid, y_Grid, itemData[j].drops[0]);
                                }
                                var callback = function () {
                                    UserFb.ins().sendGetReward(isElite_1);
                                };
                                DropHelp.addCompleteFunc(callback, this);
                                DropHelp.start();
                            }
                            if (UserFb.ins().exp > 0 && (!itemData || itemData.length == 0)) {
                                UserFb.ins().sendGetReward(isElite_1);
                                UserFb.ins().exp = 0;
                            }
                        }
                        var nextList = EntityManager.ins().screeningTargetByPos(sourceTarget, false, 0, Number.MAX_VALUE, this.aiList);
                        if (!nextList || nextList.length == 0) {
                            var mylist = EntityManager.ins().getEntityByTeam(Team.My);
                            for (var _i = 0, mylist_1 = mylist; _i < mylist_1.length; _i++) {
                                var char = mylist_1[_i];
                                char.playAction(EntityAction.STAND);
                            }
                        }
                    }
                    for (var handle in this.curTarget) {
                        if (this.curTarget[handle] == target) {
                            var char = EntityManager.ins().getEntityByHandle(handle);
                            if (char && char.infoModel) {
                                ++char.infoModel.killNum;
                            }
                            break;
                        }
                    }
                    if (sourceTarget.team == Team.Faker) {
                        var wildData = Encounter.ins().wildPersonList[sourceTarget.infoModel.masterHandle];
                        var killNum = EncounterModel.countKillNumByMarster(sourceTarget.infoModel.masterHandle);
                        if (wildData && wildData.actionType == 1 && killNum >= wildData.killNum) {
                            GameMap.moveEntity(sourceTarget, wildData.backX, wildData.backY);
                        }
                    }
                }
            }
        }
        else {
            if (target.AI_STATE != AI_State.Die && hramValue > 0) {
            }
            ExSkillAiLogic.ins().checkHPTrigger(target, sourceTarget);
        }
    };
    RoleAI.prototype.checkAIend = function (st, t) {
        var count = EntityManager.ins().getTeamCount(t.team);
        if (!count) {
            switch (st.team) {
                case Team.My:
                    switch (t.team) {
                        case Team.Monster:
                            this.trace('开始捡东西');
                            break;
                        case Team.WillBoss:
                            Encounter.ins().sendResult(true);
                            this.trace("遭遇boss成功");
                            break;
                        case Team.WillEntity:
                            this.trace("遭遇敌人成功");
                            if (EntityManager.ins().getTeamCount(Team.My)) {
                                if (GameMap.sceneInMine()) {
                                    MineFight.ins().fightEnd(true);
                                }
                                else {
                                    EncounterFight.ins().sendFightResult(1);
                                }
                            }
                            else {
                                return;
                            }
                            break;
                        case Team.Faker:
                            var wildData_1 = Encounter.ins().wildPersonList[t.infoModel.masterHandle];
                            if (wildData_1)
                                Encounter.ins().sendWildPeopleResult(wildData_1.index, 1);
                            break;
                    }
                    if (Encounter.ins().isGuiding) {
                        Encounter.ins().isGuiding = false;
                        Encounter.ins().postEncounterDataChange();
                    }
                    EntityManager.ins().resetRole();
                    break;
                case Team.WillBoss:
                    Encounter.ins().sendResult(false);
                    this.trace("遭遇boss失败");
                    break;
                case Team.WillEntity:
                    this.trace("遭遇敌人失败");
                    if (EntityManager.ins().getTeamCount(Team.WillEntity)) {
                        if (GameMap.sceneInMine()) {
                            MineFight.ins().fightEnd(false);
                        }
                        else {
                            EncounterFight.ins().sendFightResult(0);
                        }
                    }
                    else {
                        return;
                    }
                    break;
                case Team.Faker:
                    var wildData = Encounter.ins().wildPersonList[st.infoModel.masterHandle];
                    Encounter.ins().sendWildPeopleResult(wildData.index, 0);
                    break;
                case Team.Monster:
                    EntityManager.ins().resetRole();
                    break;
            }
            this.getPickAI();
        }
    };
    RoleAI.prototype.checkPlayDieSound = function (monster) {
        var configID = monster.infoModel ? monster.infoModel.configID : 0;
        var config;
        if (!SoundUtil.WINDOW_OPEN && configID) {
            config = UserFb.ins().guanqiaMonster[configID];
            if (config) {
                if (config.sound) {
                    SoundUtil.ins().playEffect(config.sound);
                }
            }
            else {
                config = GlobalConfig.MonstersConfig[configID];
                if (config) {
                    if (config.sound) {
                        SoundUtil.ins().playEffect(config.sound);
                    }
                }
            }
        }
    };
    RoleAI.prototype.getPickAI = function () {
        if (this.inited && !Encounter.ins().isEncounter()) {
            this.stopAITimer();
        }
    };
    RoleAI.prototype.getTeamCount = function (t) {
        var count = 0;
        for (var handle in this.aiList) {
            var tar = this.aiList[handle];
            if (tar.team == t)
                count += 1;
        }
        return count;
    };
    RoleAI.prototype.stopAITimer = function () {
        TimerManager.ins().remove(this.startAI, this);
        TimerManager.ins().remove(this.startZhanLing, this);
    };
    RoleAI.prototype.addAITimer = function () {
        if (!TimerManager.ins().isExists(this.startAI, this)) {
            TimerManager.ins().doTimer(RoleAI.AI_UPDATE_TIME, 0, this.startAI, this);
            TimerManager.ins().doTimer(RoleAI.AI_UPDATE_AUTOACTACK_TIME, 0, this.startAutoActack, this);
            this.addZhanLingTimer();
        }
    };
    RoleAI.prototype.addZhanLingTimer = function () {
        this.zhanlingTime = egret.getTimer();
        this.zhanlingdelayTime = egret.getTimer();
        TimerManager.ins().doTimer(1000, 0, this.startZhanLing, this);
    };
    RoleAI.prototype.getArgs = function (id, imbaData, gwSKill) {
        var skillEff = GlobalConfig.EffectsConfig[id];
        var addA = 0, addC = 0, addTime = 0;
        if (imbaData) {
            if (imbaData.args) {
                for (var _i = 0, _a = imbaData.args; _i < _a.length; _i++) {
                    var arg = _a[_i];
                    if (arg.type == 8 && arg.vals[0] == skillEff.group) {
                        addA += arg.vals[2] || 0;
                        addC += arg.vals[4] || 0;
                        addTime += arg.vals[1] || 0;
                    }
                    if (arg.type == 6) {
                        addA += arg.vals[0] || 0;
                    }
                }
            }
        }
        if (gwSKill) {
            if (gwSKill.args) {
                for (var _b = 0, _c = gwSKill.args; _b < _c.length; _b++) {
                    var arg = _c[_b];
                    if (arg.type == 8 && arg.vals[0] == skillEff.group) {
                        addA += arg.vals[2] || 0;
                        addC += arg.vals[4] || 0;
                        addTime += arg.vals[1] || 0;
                    }
                    if (arg.type == 6) {
                        addA += arg.vals[0] || 0;
                    }
                }
            }
        }
        return { a: addA, b: 0, c: addC, time: addTime };
    };
    RoleAI.prototype.skillEffValue = function (selfTarget, skillEff, args) {
        var effValue = 0;
        var addA = 0;
        var addC = 0;
        if (args) {
            addA = args.a || 0;
            addC = args.c || 0;
        }
        if (skillEff) {
            if (skillEff.args) {
                switch (skillEff.type) {
                    case SkillEffType.AdditionalDamage:
                        effValue = selfTarget.infoModel.getAtt(skillEff.args.b) * (skillEff.args.a + addA) + (skillEff.args.c || 0) + addC;
                        break;
                    case SkillEffType.AddBlood:
                        effValue = selfTarget.infoModel.getAtt(skillEff.args.b) * (skillEff.args.a + addA) + (skillEff.args.c || 0) + addC;
                        effValue = -effValue;
                        break;
                    case SkillEffType.AdditionalAttributes:
                    case SkillEffType.HostAddAttributes:
                        effValue = selfTarget.infoModel.getAtt(skillEff.args.b) * (skillEff.args.a + addA) + (skillEff.args.c || 0) + addC;
                        break;
                    case SkillEffType.AdditionalState:
                        if (skillEff.args.i == 2) {
                            effValue = selfTarget.infoModel.getAtt(skillEff.args.b) * (skillEff.args.a + addA) + (skillEff.args.c || 0) + addC;
                        }
                        else {
                            var value = !skillEff.args.c ? 1 + addC : (skillEff.args.c || 0) + addC;
                            effValue = selfTarget.infoModel.getAtt(skillEff.args.b) * value;
                        }
                        break;
                }
            }
            effValue = effValue >> 0;
        }
        return effValue;
    };
    RoleAI.prototype.checkTeamDistan = function (selfTarget, master, range) {
        if (range === void 0) { range = 5; }
        var xb = MathUtils.getDistance(selfTarget.x, selfTarget.y, master.x, master.y);
        return xb < range * GameMap.CELL_SIZE;
    };
    RoleAI.prototype.tryUseSkill = function (selfTarget) {
        var hCode = selfTarget.infoModel.handle;
        var skill = this.curSkill[hCode];
        var target = this.curTarget[hCode];
        if (!skill) {
            return false;
        }
        var xb = MathUtils.getDistance(selfTarget.x, selfTarget.y, target.x, target.y);
        return xb < skill.castRange * GameMap.CELL_SIZE;
    };
    RoleAI.prototype.screeningSkill = function (hCode) {
        var selfTarget = this.aiList[hCode];
        var isRole = selfTarget instanceof CharRole;
        this.skillCD[hCode] = this.skillCD[hCode] || {};
        if (selfTarget.team == Team.My) {
            var master = EntityManager.ins().getNoDieRole();
            if (master && master != selfTarget && !this.checkTeamDistan(selfTarget, master, 10)) {
                this.curSkill[hCode] = null;
                return;
            }
        }
        var mSkill = this.curSkill[hCode];
        if (mSkill && egret.getTimer() - this.skillCD[hCode][mSkill.id] < mSkill.cd) {
            this.curSkill[hCode] = null;
        }
        if (this.curSkill[hCode]) {
            return;
        }
        var canUseSkill = this.getCanUseSkillList(selfTarget);
        if (!canUseSkill)
            return;
        var skillEff;
        var skillIndex = 0;
        var skill = canUseSkill[skillIndex];
        skillEff = (skill && skill.tarEff) ? GlobalConfig.EffectsConfig[skill.tarEff[0]] : null;
        if (skillEff && skillEff.type == SkillEffType.Summon) {
            if (selfTarget.hasBuff(skillEff.group))
                skill = canUseSkill[++skillIndex];
        }
        skillEff = (skill && skill.tarEff) ? GlobalConfig.EffectsConfig[skill.tarEff[0]] : null;
        if (skillEff && skillEff.type == SkillEffType.AddBlood) {
            if (!EntityManager.ins().checkCanAddBlood(selfTarget.team))
                skill = canUseSkill[++skillIndex];
        }
        if (skill && skill.id == 25000) {
            var tar = this.curTarget[selfTarget.infoModel.handle];
            if (!tar || tar.AI_STATE == AI_State.Die)
                tar = selfTarget;
            if (Encounter.ins().isEncounter() || MineFight.ins().isFighting || !EntityManager.ins().checkCount(tar, skill.affectRange, 2, tar.team != selfTarget.team))
                skill = canUseSkill[++skillIndex];
        }
        if (skill && skill.id == 13000) {
            if (Encounter.ins().isEncounter() || MineFight.ins().isFighting || !EntityManager.ins().checkCount(selfTarget, skill.affectRange, 2))
                skill = canUseSkill[++skillIndex];
        }
        this.curSkill[hCode] = skill;
    };
    RoleAI.prototype.getCanUseSkillList = function (selfTarget, isActive) {
        if (isActive === void 0) { isActive = true; }
        var skills = [];
        if (selfTarget instanceof CharRole && selfTarget.infoModel) {
            if (Assert(selfTarget.infoModel.skillsData, "\u89D2\u8272\u6280\u80FD\u4E3A\u7A7A\uFF0CisMy:" + selfTarget.isMy + ",fbType:" + GameMap.fbType + ",fubenId:" + GameMap.fubenID)) {
                return;
            }
            skills = selfTarget.infoModel.skillsData.concat();
            if (selfTarget.team == Team.My) {
                var gwSkills = GodWeaponCC.ins().getJobGWNewSkill(selfTarget.infoModel.job);
                if (gwSkills) {
                    skills = skills.concat(gwSkills);
                }
                var roleId = selfTarget.infoModel.index;
                var jadeData = JadeNew.ins().getJadeDataByID(roleId);
                if (jadeData)
                    skills = skills.concat(jadeData.getSkillList());
            }
            else {
                var jadeData = selfTarget.infoModel.jadeData;
                if (jadeData)
                    skills = skills.concat(jadeData.getSkillList());
            }
            skills = skills.concat(ExtremeEquipModel.ins().getZhiZunSkills(selfTarget.infoModel));
        }
        else {
            if (selfTarget.team == Team.My) {
                if (SpecialRing.ins().isFireRing(selfTarget.infoModel.handle)) {
                    var skillId = SpecialRing.ins().getRingSkill();
                    if (skillId) {
                        var skillData = ObjectPool.pop('SkillData');
                        skillData.configID = skillId;
                        skills.push(skillData);
                    }
                    skillId = LyMark.ins().getCurSkillID();
                    if (skillId) {
                        var skillData = ObjectPool.pop('SkillData');
                        skillData.specialCD = LyMark.ins().getCurSkillCD();
                        skillData.configID = skillId;
                        skills.push(skillData);
                    }
                }
                else {
                    var skillData = ObjectPool.pop('SkillData');
                    skillData.configID = 80001;
                    var gwSkills = GodWeaponCC.ins().getReviseBySkill(35000);
                    if (gwSkills && gwSkills.length) {
                        skillData.configID = 80002;
                    }
                    skills.push(skillData);
                }
            }
            else {
                var skillData = ObjectPool.pop('SkillData');
                skillData.configID = 50001;
                skills.push(skillData);
            }
        }
        if (!skills || skills.length == 0)
            return;
        var hCode = selfTarget.infoModel.handle;
        this.skillCD[hCode] = this.skillCD[hCode] || {};
        var len = skills.length;
        if (len == 0)
            return;
        var canUseSkill = [];
        for (var i = 0; i < len; i++) {
            if (!skills[i].canUse)
                continue;
            if (isActive == skills[i].isPassive)
                continue;
            var reduceCD = 0;
            if (selfTarget.team == Team.My) {
                var imbaData = Artifact.ins().getReviseBySkill(skills[i].id);
                if (imbaData && imbaData.cd) {
                    reduceCD += imbaData.cd;
                }
                var gwSkills = GodWeaponCC.ins().getReviseBySkill(skills[i].id);
                var gwSkill = void 0;
                if (gwSkills) {
                    gwSkill = gwSkills[0];
                }
                if (gwSkill && gwSkill.cd) {
                    reduceCD += gwSkill.cd;
                }
            }
            if (egret.getTimer() - this.skillCD[hCode][skills[i].id] < (skills[i].cd - reduceCD))
                continue;
            canUseSkill.push(skills[i]);
        }
        canUseSkill.sort(this.sortFunc);
        return canUseSkill;
    };
    RoleAI.prototype.damageBaseCalculation = function (selfTarget, target, skill) {
        var attrValue = 0;
        var tempValue = 0;
        var damage = 0;
        var buff;
        var sJob = JobConst.None;
        var tJob = JobConst.None;
        var selfIsActor = false;
        var targetIsActor = false;
        var selfInfo = selfTarget.infoModel;
        var attArga = 0;
        var attArgb = 0;
        var attArgc = 0;
        var toMonAdd = 0;
        var addValue = 0;
        if (selfTarget.team == Team.My) {
            var imbaData = Artifact.ins().getReviseBySkill(skill.id);
            if (imbaData) {
                attArga = imbaData.a || 0;
                attArgb = imbaData.b || 0;
                toMonAdd = imbaData.d || 0;
                if (imbaData.selfEff) {
                    for (var k in imbaData.selfEff) {
                        buff = selfTarget.buffList[imbaData.selfEff[k]];
                        if (buff && buff.effConfig.type == 3) {
                            addValue += buff.value;
                        }
                    }
                }
            }
            var gwSkills = GodWeaponCC.ins().getReviseBySkill(skill.id);
            var gwSkill = void 0;
            if (gwSkills) {
                gwSkill = gwSkills[0];
            }
            if (gwSkill) {
                attArga += gwSkill.a || 0;
                attArgb += gwSkill.b || 0;
                toMonAdd += gwSkill.d || 0;
                if (gwSkill.selfEff) {
                    for (var k in gwSkill.selfEff) {
                        buff = selfTarget.buffList[gwSkill.selfEff[k]];
                        if (buff && buff.effConfig.type == 3) {
                            addValue += buff.value;
                        }
                    }
                }
            }
        }
        if (skill.preId && GlobalConfig.FlameStamp.skillId.indexOf(skill.preId) >= 0) {
            var lv = selfInfo.lyMarkLv || 0;
            if (lv) {
                var config = GlobalConfig.FlameStampLevel[lv];
                if (config) {
                    attArga += config.bulletDamage.a;
                    attArgb += config.bulletDamage.b;
                }
            }
            var lySkills = selfInfo.lyMarkSkills || [];
            lv = lySkills[7 - 1] || 0;
            if (lv) {
                var config = GlobalConfig.FlameStampEffect[7][lv];
                if (config.bulletDamage) {
                    attArga += config.bulletDamage.a || 0;
                    attArgb += config.bulletDamage.b || 0;
                }
            }
        }
        if (selfTarget instanceof CharRole) {
            selfIsActor = true;
        }
        else {
            selfIsActor = false;
        }
        if (target instanceof CharRole) {
            targetIsActor = true;
        }
        else {
            targetIsActor = false;
        }
        if (selfIsActor && sJob) {
            if (sJob == JobConst.ZhanShi) {
                attrValue = GameLogic.calculateRealAttribute(target, AttributeType.atDef, selfTarget);
            }
            else {
                attrValue = GameLogic.calculateRealAttribute(target, AttributeType.atRes, selfTarget);
            }
        }
        else {
            attrValue = GameLogic.calculateRealAttribute(target, AttributeType.atDef, selfTarget);
        }
        tempValue = attrValue * (1 - selfInfo.getAtt(AttributeType.atPenetrate) / 10000);
        if (skill.calcType == 3) {
            if (skill.args) {
                var attack = 0;
                if (selfTarget.team == Team.My) {
                    var len = SubRoles.ins().subRolesLen;
                    for (var i = 0; i < len; i++) {
                        var roleData = SubRoles.ins().getSubRoleByIndex(i);
                        if (roleData)
                            attack += roleData.getAtt(AttributeType.atAttack);
                    }
                }
                else if (selfTarget.team == Team.WillEntity) {
                    var roles = HejiUseMgr.ins().getRoles();
                    var len = roles.length;
                    for (var i = 0; i < len; i++) {
                        var roleData = roles[i];
                        if (roleData)
                            attack += roleData.getAtt(AttributeType.atAttack);
                    }
                }
                attack = Math.max((attack - tempValue), 0.05 * attack);
                var argb = !skill.args.b ? 0 + attArgb : skill.args.b + attArgb;
                damage = attack * (skill.args.a + attArga) + argb + attArgc;
                damage = Math.max(damage, 0.05 * attack);
                if (target instanceof CharRole) {
                    damage = Math.floor(damage * (1.0 + selfInfo.getExAtt(ExAttributeType.eatTogetherHitRoleDamageInc) / 10000.0));
                }
                else {
                    damage = Math.floor(damage * (1.0 + selfInfo.getExAtt(ExAttributeType.eatTogetherHitMonDamageInc + toMonAdd) / 10000.0));
                }
                damage = Math.floor(damage * (1.0 - selfInfo.getExAtt(ExAttributeType.eatTogetherHitFree) / 10000.0));
                var damageAddRate = GameLogic.calculateRealAttribute(selfTarget, AttributeType.atRoleDamageEnhance, selfTarget);
                damageAddRate -= GameLogic.calculateRealAttribute(target, AttributeType.atRoleDamageReduction, selfTarget);
                damageAddRate -= GameLogic.calculateRealAttribute(target, AttributeType.atDamageReduction, selfTarget);
                damage = Math.floor(damage * (1.0 + damageAddRate / 10000.0));
                damage = damage + selfInfo.getAtt(AttributeType.atTogetherHolyDamege) * (1 + selfInfo.getAtt(AttributeType.atTogetherHolyMaster) / 10000.0 - target.infoModel.getAtt(AttributeType.atTogetherHolyResist) / 10000.0);
            }
        }
        else {
            if (skill.targetType == TargetType.Enemy) {
                if (skill.args) {
                    var exArg = 0;
                    var skillBaseId = Math.floor(skill.id / 1000) % 100;
                    for (var i = 0; i < skillConst.baseSkillIndex.length; i++) {
                        if (skillBaseId == skillConst.baseSkillIndex[i])
                            exArg = selfInfo.attributeExData[ExAttributeType.eatBaseSkillExArg];
                    }
                    var attack = selfInfo.getAtt(AttributeType.atAttack);
                    var tempAttack = GameLogic.calculateRealAttribute(selfTarget, AttributeType.atAttack, selfTarget);
                    if (skill.configID == 80002) {
                        var add = this.gePetSkillAdd(selfTarget);
                        tempAttack += Math.floor(attack * add / 10000);
                    }
                    var isAddDamPro = GameLogic.triggerAttr(selfTarget, AttributeType.atAttAddDamPro);
                    var addDamProVal = 0;
                    if (isAddDamPro) {
                        addDamProVal = selfInfo.getAtt(AttributeType.atAttAddDamVal);
                        selfTarget.addPaoPao(15);
                    }
                    var addDamPen = 0;
                    if (target.hasBuff(51001) && selfInfo.getAtt(AttributeType.atAttMbAddDamPen)) {
                        addDamPen = selfInfo.getAtt(AttributeType.atAttMbAddDamPen);
                        selfTarget.addPaoPao(17);
                    }
                    var hpAddDamPen = 0;
                    if (selfInfo.getAtt(AttributeType.atAttHpLtPenAddDam) && (target.infoModel.getAtt(AttributeType.atHp) / target.infoModel.getAtt(AttributeType.atMaxHp) < selfInfo.getAtt(AttributeType.atAttHpLtPenAddDam) / 10000)) {
                        hpAddDamPen = selfInfo.getAtt(AttributeType.atAttHpLtAddDamPen);
                        if (!this.hashHpObj[target.hashCode]) {
                            selfTarget.addPaoPao(19);
                            this.hashHpObj[target.hashCode] = 1;
                        }
                    }
                    var weishe = 0;
                    if (selfInfo.type == EntityType.Role && target.infoModel.type == EntityType.Role) {
                        if (Encounter.ins().isEncounter()) {
                            weishe = EncounterFight.ins().getWeiSheHurt(selfTarget.isMy);
                        }
                        else if (MineFight.ins().isFighting) {
                            weishe = MineFight.ins().getWeiSheHurt(selfTarget.isMy);
                        }
                    }
                    var mijiAdd = 0;
                    if (selfInfo.getExAtt(ExAttributeType.eatMiJiKNHpPer)) {
                        var hpPer = selfInfo.getAtt(AttributeType.atHp) / selfInfo.getAtt(AttributeType.atMaxHp) * 10000;
                        if (hpPer < selfInfo.getExAtt(ExAttributeType.eatMiJiKNHpPer)) {
                            mijiAdd = Math.floor((selfInfo.getExAtt(ExAttributeType.eatMiJiKNHpPer) - hpPer) / selfInfo.getExAtt(ExAttributeType.eatMiJiKNHpSubPer))
                                * selfInfo.getExAtt(ExAttributeType.eatMiJiKNDamPer);
                        }
                    }
                    if (selfInfo.getExAtt(ExAttributeType.eatMiJiZHDamPer) && this.getIsTriggerAttr(selfTarget, 1, ExAttributeType.eatMiJiZHTime)) {
                        mijiAdd += selfInfo.getExAtt(ExAttributeType.eatMiJiZHDamPer);
                    }
                    var argb = !skill.args.b ? 0 + attArgb : skill.args.b + attArgb;
                    if (targetIsActor && skill.args.c) {
                        attArgc += skill.args.c * target.infoModel.getAtt(AttributeType.atHp);
                    }
                    tempAttack = Math.max((tempAttack - tempValue), 0.05 * tempAttack);
                    damage = tempAttack * (skill.args.a + exArg + attArga) + argb + attArgc + addDamProVal;
                    damage = Math.floor(damage * (1.0 + ((toMonAdd + addDamPen + hpAddDamPen + weishe + mijiAdd) / 10000.0)));
                    var damageAddRate = GameLogic.calculateRealAttribute(selfTarget, AttributeType.atRoleDamageEnhance, selfTarget);
                    damageAddRate -= GameLogic.calculateRealAttribute(target, AttributeType.atRoleDamageReduction, selfTarget);
                    damageAddRate -= GameLogic.calculateRealAttribute(target, AttributeType.atDamageReduction, selfTarget);
                    damage = Math.floor(damage * (1.0 + damageAddRate / 10000.0));
                    damage = Math.max(damage, 0.05 * attack);
                }
            }
        }
        var ranNumber = (105 - Math.random() * 10) / 100;
        damage *= ranNumber;
        return Math.floor(damage);
    };
    RoleAI.prototype.gePetSkillAdd = function (selfTarget) {
        var masterHandle = selfTarget.infoModel.masterHandle;
        var master = EntityManager.ins().getEntityByHandle(masterHandle);
        if (master && master.infoModel && master.infoModel.getExAtt(ExAttributeType.eatPetAttackInc)) {
            var add = master.infoModel.getExAtt(ExAttributeType.eatPetAttackInc);
            var dieCount = 0;
            var teamCount = EntityManager.ins().getTeamCount(selfTarget.team);
            if (selfTarget.team == Team.My) {
                dieCount = SubRoles.ins().subRolesLen + 1 - teamCount;
            }
            else if (selfTarget.team == Team.WillEntity) {
                if (Encounter.ins().isEncounter()) {
                    dieCount = EncounterFight.ins().getRoles().length + 1 - teamCount;
                }
                else if (MineFight.ins().isFighting) {
                    dieCount = MineFight.ins().getRoles().length + 1 - teamCount;
                }
            }
            return add * dieCount;
        }
        return 0;
    };
    RoleAI.prototype.damageBuff = function (selfTarget, target, damage) {
        if (selfTarget instanceof CharMonster) {
            if (selfTarget.team == Team.Monster || selfTarget.team == Team.WillBoss) {
                if (selfTarget.infoModel.name != "神兽") {
                    damage = 0;
                }
            }
        }
        var buff = target.buffList[19001];
        if (buff) {
            var skillEff = buff.effConfig;
            var dxValue = Math.floor(damage * skillEff.args.a);
            buff.value -= dxValue;
            if (buff.value <= 0) {
                target.removeBuff(buff);
            }
            damage = damage - dxValue + (buff.value < 0 ? -buff.value : 0);
        }
        buff = target.buffList[60002];
        if (buff) {
            var skillEff = buff.effConfig;
            var dxValue = Math.floor(damage * (skillEff.args.c / 10000));
            damage = damage - dxValue;
        }
        buff = target.buffList[60004];
        if (buff) {
            damage = 0;
        }
        if (target instanceof CharRole && target.infoModel && target.infoModel.exRingsData && target.infoModel.exRingsData[1] == 1) {
            var mp = target.infoModel.getAtt(AttributeType.atMp);
            if (mp > 0) {
                var oldMp = mp - damage;
                target.infoModel.setAtt(AttributeType.atMp, oldMp > 0 ? oldMp : 0);
                damage = damage - mp >= 0 ? damage - mp : 0;
            }
        }
        buff = target.buffList[80001];
        if (buff && damage > 0) {
            damage -= buff.value;
            damage = damage > 0 ? damage : 0;
        }
        return damage;
    };
    RoleAI.prototype.sortFunc = function (a, b) {
        var job = a.job;
        var conf = GlobalConfig.SkillsSorderConfig[job];
        if (!conf)
            return 0;
        var arr = conf.skillorder;
        var ap = arr.length;
        var bp = arr.length;
        for (var i in arr) {
            if (arr[i] == a.id)
                ap = +i;
            if (arr[i] == b.id)
                bp = +i;
        }
        if (ap > bp)
            return 1;
        if (ap < bp)
            return -1;
        return 0;
    };
    RoleAI.prototype.screeningTarget = function (selfTarget, range, isSameTeam) {
        if (range === void 0) { range = Number.MAX_VALUE; }
        if (isSameTeam === void 0) { isSameTeam = false; }
        var hCode = selfTarget.infoModel.handle;
        var skill = this.curSkill[hCode];
        var targetType = 0;
        if (skill)
            targetType = skill.targetType;
        if (!isSameTeam) {
            isSameTeam = targetType == TargetType.Friendly;
        }
        if (!isSameTeam) {
            if (this.lastTarget[hCode]) {
                var monster = EntityManager.ins().getEntityByHandle(this.lastTarget[hCode]);
                if (monster && monster.parent && monster.AI_STATE != AI_State.Die) {
                    if (this.Monstertarget) {
                        this.curTarget[hCode] = this.Monstertarget;
                        this.Monstertarget = undefined;
                    }
                    else {
                        this.curTarget[hCode] = monster;
                    }
                    return;
                }
            }
        }
        var tempArr = EntityManager.ins().screeningTargetByPos(selfTarget, isSameTeam, 0, range, this.aiList);
        switch (selfTarget.team) {
            case Team.My:
                var charMonster = this.checkMySubInList(tempArr, false, Team.Faker);
                if (this.Monstertarget) {
                    this.curTarget[hCode] = this.Monstertarget;
                    this.Monstertarget = undefined;
                }
                else {
                    this.curTarget[hCode] = charMonster;
                }
                break;
            case Team.Faker:
                var monster = this.checkMySubInList(tempArr);
                this.curTarget[hCode] = monster;
                break;
            default:
                this.curTarget[hCode] = tempArr ? tempArr[0] : null;
        }
        if (!isSameTeam && this.curTarget[hCode]) {
            this.lastTarget[hCode] = this.curTarget[hCode].infoModel.handle;
        }
    };
    RoleAI.prototype.checkMySubInList = function (list, isSameTeam, team) {
        if (isSameTeam === void 0) { isSameTeam = false; }
        if (team === void 0) { team = Team.My; }
        for (var i = 0; i < list.length; i++) {
            if (isSameTeam) {
                if (list[i].team == team)
                    return list[i];
            }
            else {
                if (list[i].team != team)
                    return list[i];
            }
        }
        return null;
    };
    RoleAI.prototype.trace = function (str) {
        if (this.isLog)
            console.warn(str);
    };
    RoleAI.prototype.startZhanLing = function () {
        if (this.zhanlingdelayTime && egret.getTimer() - this.zhanlingdelayTime > GlobalConfig.ZhanLingConfig.delayTime) {
            this.zhanlingdelayTime = 0;
            this.checkShowZhanling();
        }
        if (egret.getTimer() - this.zhanlingTime > 10000) {
            this.checkShowZhanling();
        }
    };
    RoleAI.AI_UPDATE_TIME = 100;
    RoleAI.AI_UPDATE_AUTOACTACK_TIME = 500;
    RoleAI.SEND_TASK_TYPE = 68;
    return RoleAI;
}(BaseClass));
__reflect(RoleAI.prototype, "RoleAI");
var Team;
(function (Team) {
    Team[Team["My"] = 0] = "My";
    Team[Team["Monster"] = 1] = "Monster";
    Team[Team["WillEntity"] = 2] = "WillEntity";
    Team[Team["WillBoss"] = 3] = "WillBoss";
    Team[Team["NotAtk"] = 4] = "NotAtk";
    Team[Team["Faker"] = 5] = "Faker";
})(Team || (Team = {}));
var TargetType;
(function (TargetType) {
    TargetType[TargetType["Friendly"] = 1] = "Friendly";
    TargetType[TargetType["Enemy"] = 2] = "Enemy";
    TargetType[TargetType["My"] = 3] = "My";
})(TargetType || (TargetType = {}));
var AI_State;
(function (AI_State) {
    AI_State[AI_State["Stand"] = 0] = "Stand";
    AI_State[AI_State["Run"] = 1] = "Run";
    AI_State[AI_State["Atk"] = 2] = "Atk";
    AI_State[AI_State["Die"] = 3] = "Die";
    AI_State[AI_State["Patrol"] = 4] = "Patrol";
})(AI_State || (AI_State = {}));
//# sourceMappingURL=RoleAI.js.map