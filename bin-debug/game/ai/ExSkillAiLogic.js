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
var ExSkillAiLogic = (function (_super) {
    __extends(ExSkillAiLogic, _super);
    function ExSkillAiLogic() {
        var _this = _super.call(this) || this;
        _this.ZL_SKILL_DEVIL = 0;
        _this.ZL_SKILL_EXPLOSION = 1;
        _this.ZL_SKILL_KILL = 2;
        _this.ZL_SKILL_SACRIFICE = 3;
        _this.ZL_SKILL_RELIEF = 4;
        _this.ZL_SKILL_ANGER = 5;
        _this.ZL_H_SKILL_DETER = 6;
        _this.ZL_H_SKILL_ANTICIPATI = 7;
        _this.ZL_SKILL_REMEDY = 8;
        _this.ZL_SKILL_RENJIA = 9;
        _this.MAX = 10;
        _this.triggerInterval = {};
        return _this;
    }
    ExSkillAiLogic.ins = function () {
        return _super.ins.call(this);
    };
    ExSkillAiLogic.prototype.checkWarSpiritBubbleTrigger = function () {
        if (ZhanLingModel.ins().ZhanLingOpen()) {
            for (var key in GlobalConfig.ZhanLingBase) {
                var base = GlobalConfig.ZhanLingBase[key];
                var zlData = ZhanLingModel.ins().getZhanLingDataById(base.id);
                if (!zlData)
                    continue;
                switch (base.talent) {
                    case this.ZL_SKILL_DEVIL:
                        if (!GlobalConfig.ZhanLingLevel[base.id][zlData.level])
                            break;
                        var talentLv = GlobalConfig.ZhanLingLevel[base.id][zlData.level].talentLevel;
                        var dp = GlobalConfig.ZhanLingTalent[base.talent][talentLv];
                        if (dp) {
                            if (GameLogic.triggerValue(dp.rate)) {
                                UserSkill.ins().postShowSkillWord(dp.showWords);
                                for (var i = 0; i < SubRoles.ins().subRolesLen; i++) {
                                    var myChar = EntityManager.ins().getMainRole(i);
                                    if (myChar) {
                                        var buff = EntityBuff.createBuff(dp.effId, myChar);
                                        myChar.addBuff(buff);
                                    }
                                }
                            }
                        }
                        break;
                    case this.ZL_SKILL_REMEDY:
                        talentLv = ZhanLingModel.ins().getZhanLingDataByTalentLv(base.id);
                        dp = GlobalConfig.ZhanLingTalent[base.talent][talentLv];
                        if (GameLogic.triggerValue(dp.rate)) {
                            for (var i = 0; i < SubRoles.ins().subRolesLen; i++) {
                                var myChar = EntityManager.ins().getMainRole(i);
                                if (myChar) {
                                    var buff = EntityBuff.createBuff(dp.effId, myChar);
                                    myChar.addBuff(buff);
                                }
                            }
                        }
                        break;
                }
            }
        }
    };
    ExSkillAiLogic.prototype.checkHJTrigger = function (source, targets) {
        if (ZhanLingModel.ins().ZhanLingOpen()) {
            if (!source || !targets[0])
                return;
            var hp = source.getHP();
            var maxHp = source.infoModel.getAtt(AttributeType.atMaxHp);
            var isTrigger = false;
            var isAttacck = source.infoModel.team == Team.My && source instanceof CharRole;
            for (var key in GlobalConfig.ZhanLingBase) {
                var base = GlobalConfig.ZhanLingBase[key];
                var zlData = ZhanLingModel.ins().getZhanLingDataById(base.id);
                if (!zlData)
                    continue;
                switch (base.talent) {
                    case this.ZL_H_SKILL_DETER:
                        if (isAttacck) {
                            var talentLv = ZhanLingModel.ins().getZhanLingDataByTalentLv(base.id);
                            var dp_1 = GlobalConfig.ZhanLingTalent[base.talent][talentLv];
                            if (!dp_1)
                                break;
                            for (var i = 0; i < SubRoles.ins().subRolesLen; i++) {
                                var myChar = EntityManager.ins().getMainRole(i);
                                if (myChar) {
                                    var _loop_1 = function (passive) {
                                        if (!passive.type || passive.type == myChar.infoModel.job) {
                                            var skillDp = new SkillData(passive.id);
                                            this_1.intervalDoFun(source.infoModel.handle + passive.id + base.talent, skillDp.cd, function () {
                                                RoleAI.ins().tryUseWarSpiritSkill(source, passive.id, true);
                                            });
                                        }
                                    };
                                    var this_1 = this;
                                    for (var _i = 0, _a = dp_1.passive; _i < _a.length; _i++) {
                                        var passive = _a[_i];
                                        _loop_1(passive);
                                    }
                                }
                            }
                        }
                        break;
                    case this.ZL_H_SKILL_ANTICIPATI:
                        var dp = GlobalConfig.ZhanLingTalent[base.talent][1];
                        if (GameLogic.triggerValue(dp.rate)) {
                        }
                        break;
                }
            }
        }
    };
    ExSkillAiLogic.prototype.checkDieTrigger = function (source, targets) {
        if (ZhanLingModel.ins().ZhanLingOpen()) {
            if (!source || !targets[0])
                return;
            var hp = source.getHP();
            var maxHp = source.infoModel.getAtt(AttributeType.atMaxHp);
            var isTrigger = false;
            var isAttacck = source.infoModel.team == Team.My && source instanceof CharRole;
            for (var key in GlobalConfig.ZhanLingBase) {
                var base = GlobalConfig.ZhanLingBase[key];
                var zlData = ZhanLingModel.ins().getZhanLingDataById(base.id);
                if (!zlData)
                    continue;
                var talentLv = ZhanLingModel.ins().getZhanLingDataByTalentLv(base.id);
                var dp = GlobalConfig.ZhanLingTalent[base.talent][talentLv];
                if (!dp)
                    continue;
                switch (base.talent) {
                    case this.ZL_SKILL_KILL:
                        if (isAttacck) {
                            for (var i = 0; i < SubRoles.ins().subRolesLen; i++) {
                                var myChar = EntityManager.ins().getMainRole(i);
                                if (myChar && myChar.infoModel.handle != source.infoModel.handle) {
                                    var _loop_2 = function (passive) {
                                        if (!passive.type || passive.type == myChar.infoModel.job) {
                                            var skillDp = new SkillData(passive.id);
                                            this_2.intervalDoFun(source.infoModel.handle + passive.id + base.id, skillDp.cd, function () {
                                                RoleAI.ins().tryUseWarSpiritSkill(source, passive.id, true);
                                            });
                                        }
                                    };
                                    var this_2 = this;
                                    for (var _i = 0, _a = dp.passive; _i < _a.length; _i++) {
                                        var passive = _a[_i];
                                        _loop_2(passive);
                                    }
                                }
                            }
                        }
                        break;
                    case this.ZL_SKILL_EXPLOSION:
                        if (!isAttacck && targets[0] && targets[0].infoModel.team == Team.My) {
                            for (var _b = 0, _c = dp.passive; _b < _c.length; _b++) {
                                var passive = _c[_b];
                                if (!passive.type || targets[0].infoModel.job == passive.type) {
                                    var skillDp = new SkillData(passive.id);
                                    for (var i = 0; i < SubRoles.ins().subRolesLen; i++) {
                                        var myChar = EntityManager.ins().getMainRole(i);
                                        if (!myChar || myChar.infoModel.handle == targets[0].infoModel.handle)
                                            break;
                                        var skillDp_1 = new SkillData(passive.id);
                                        if (skillDp_1.tarEff && skillDp_1.tarEff.length > 0) {
                                            for (var _d = 0, _e = skillDp_1.tarEff; _d < _e.length; _d++) {
                                                var effid = _e[_d];
                                                var buff = EntityBuff.createBuff(effid, myChar);
                                                myChar.addBuff(buff);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    case this.ZL_SKILL_SACRIFICE:
                        if (!isAttacck && targets[0] && targets[0].infoModel.team == Team.My && targets[0].infoModel.job == JobConst.ZhanShi) {
                            var _loop_3 = function (passive) {
                                if (!passive.type || passive.type == source.infoModel.job) {
                                    var skillDp = new SkillData(passive.id);
                                    this_3.intervalDoFun(source.infoModel.handle + passive.id + base.id, skillDp.cd, function () {
                                        RoleAI.ins().tryUseWarSpiritSkill(source, passive.id, true);
                                    });
                                }
                            };
                            var this_3 = this;
                            for (var _f = 0, _g = dp.passive; _f < _g.length; _f++) {
                                var passive = _g[_f];
                                _loop_3(passive);
                            }
                        }
                        break;
                    case this.ZL_SKILL_ANGER:
                        if (!isAttacck && targets[0] && targets[0].infoModel.team == Team.My && targets[0].infoModel.job == JobConst.FaShi) {
                            var _loop_4 = function (passive) {
                                if (!passive.type || passive.type == source.infoModel.job) {
                                    var skillDp = new SkillData(passive.id);
                                    this_4.intervalDoFun(source.infoModel.handle + passive.id + base.id, skillDp.cd, function () {
                                        RoleAI.ins().tryUseWarSpiritSkill(source, passive.id, true);
                                    });
                                }
                            };
                            var this_4 = this;
                            for (var _h = 0, _j = dp.passive; _h < _j.length; _h++) {
                                var passive = _j[_h];
                                _loop_4(passive);
                            }
                        }
                        break;
                }
            }
        }
    };
    ExSkillAiLogic.prototype.checkHPTrigger = function (target, sourceTarget) {
        if (ZhanLingModel.ins().ZhanLingOpen()) {
            if (!target || !sourceTarget)
                return;
            var hp = target.getHP();
            var maxHp = target.infoModel.getAtt(AttributeType.atMaxHp);
            var isTrigger = false;
            var isAttacck = target.infoModel.team == Team.My && target instanceof CharRole;
            var _loop_5 = function (key) {
                var base = GlobalConfig.ZhanLingBase[key];
                var zlData = ZhanLingModel.ins().getZhanLingDataById(base.id);
                if (!zlData)
                    return "continue";
                switch (base.talent) {
                    case this_5.ZL_SKILL_RELIEF:
                        break;
                    case this_5.ZL_SKILL_RENJIA:
                        if (isAttacck) {
                            var id = 0;
                            var skillList = ZhanLingModel.ins().getZhanLingDataBySkill(id);
                            var zlDt = ZhanLingModel.ins().getZhanLingDataById(id);
                            var passiveId_1 = 0;
                            for (var k in skillList) {
                                if (zlDt.level >= skillList[k].open) {
                                    if (skillList[k].id == 1) {
                                        passiveId_1 = GlobalConfig.ZhanLingSkill[skillList[k].id].passive;
                                    }
                                    else if (skillList[k].id == 4) {
                                        passiveId_1 = GlobalConfig.ZhanLingSkill[skillList[k].id].passivePlus;
                                    }
                                }
                            }
                            if (passiveId_1 > 0) {
                                var skillDp = new SkillData(passiveId_1);
                                if (hp / maxHp < skillDp.config.passive.p1 / 10000) {
                                    this_5.intervalDoFun(target.infoModel.handle + passiveId_1 + id, skillDp.cd, function () {
                                        RoleAI.ins().tryUseWarSpiritSkill(target, passiveId_1, true);
                                    });
                                }
                            }
                        }
                        break;
                }
            };
            var this_5 = this;
            for (var key in GlobalConfig.ZhanLingBase) {
                _loop_5(key);
            }
        }
    };
    ExSkillAiLogic.prototype.intervalDoFun = function (indx, cd, fun) {
        if (this.triggerInterval[indx] == undefined)
            this.triggerInterval[indx] = egret.getTimer();
        if (egret.getTimer() - this.triggerInterval[indx] >= 0) {
            fun();
        }
        this.triggerInterval[indx] = egret.getTimer() + cd;
    };
    return ExSkillAiLogic;
}(BaseClass));
__reflect(ExSkillAiLogic.prototype, "ExSkillAiLogic");
//# sourceMappingURL=ExSkillAiLogic.js.map