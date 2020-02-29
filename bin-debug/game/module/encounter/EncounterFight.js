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
var EncounterFight = (function (_super) {
    __extends(EncounterFight, _super);
    function EncounterFight() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.aiList = {};
        _this.encounterList = {};
        _this.willEntityFightTeam = Team.Monster;
        return _this;
    }
    EncounterFight.ins = function () {
        return _super.ins.call(this);
    };
    EncounterFight.prototype.start = function (index) {
        var _this = this;
        if (Encounter.ins().isEncounter() || EntityManager.ins().getTeamCount(Team.WillBoss) > 0) {
            UserTips.ins().showTips("|C:0xf3311e&T:正在挑战附近的人|");
            return;
        }
        if (UserFb.ins().checkInFB())
            return;
        if (!Encounter.ins().encounterModel[index])
            return;
        this.encounterIndex = index;
        this.rolePositions = {};
        this.removeAllEncounter();
        RoleAI.ins().stop();
        DropHelp.clearDrop();
        UserSkill.ins().setHejiCD(6000);
        HejiUseMgr.ins().register(this);
        this.addCheckResult();
        var mylist = EntityManager.ins().getEntityByTeam(Team.My);
        for (var _i = 0, mylist_1 = mylist; _i < mylist_1.length; _i++) {
            var char = mylist_1[_i];
            char.stopMove();
            char.playAction(EntityAction.STAND);
            if ((char instanceof CharRole)) {
                this.rolePositions[char.infoModel.handle] = { x: char.x, y: char.y, dir: char.dir };
                var appearEff = new MovieClip();
                appearEff.playFile(RES_DIR_SKILLEFF + "skill208", 1);
                char.addChild(appearEff);
                char.playAction(EntityAction.ATTACK);
            }
            else {
                EntityManager.ins().removeByHandle(char.infoModel.handle);
            }
        }
        TimerManager.ins().doTimer(800, 1, function () {
            DropHelp.clearDrop();
            _this.addRole();
        }, this);
        this.clearOldAI();
        this.createEncounterAndMonster();
        SoundUtil.ins().playEffect(SoundUtil.SCENE);
    };
    EncounterFight.prototype.addCheckResult = function () {
        TimerManager.ins().doTimer(1000, 0, this.checkResult, this);
    };
    EncounterFight.prototype.checkResult = function () {
        if (!Encounter.ins().isFindDrop) {
            if (EntityManager.ins().getTeamCount(Team.My) == 0 || EntityManager.ins().getTeamCount(Team.WillEntity) == 0) {
                if (EntityManager.ins().getTeamCount(Team.WillEntity) == 0) {
                    this.sendFightResult(1);
                }
                else {
                    this.sendFightResult(0);
                }
            }
        }
    };
    EncounterFight.prototype.sendFightResult = function (result) {
        if (result) {
            Encounter.ins().sendFightResult(result);
        }
        else {
            TimerManager.ins().doTimer(2000, 1, function () {
                Encounter.ins().sendFightResult(result);
            }, this);
        }
        Encounter.ins().postFightResult(result);
        TimerManager.ins().remove(this.checkResult, this);
    };
    EncounterFight.prototype.win = function () {
        var _this = this;
        var mylist = EntityManager.ins().getEntityByTeam(Team.My);
        for (var _i = 0, mylist_2 = mylist; _i < mylist_2.length; _i++) {
            var char = mylist_2[_i];
            char.stopMove();
            if (!(char instanceof CharRole)) {
                EntityManager.ins().removeByHandle(char.infoModel.handle);
            }
            else {
                var appearEff = new MovieClip();
                appearEff.playFile(RES_DIR_SKILLEFF + "skill208", 1);
                char.addChild(appearEff);
                char.playAction(EntityAction.ATTACK);
            }
        }
        SoundUtil.ins().playEffect(SoundUtil.SCENE);
        TimerManager.ins().doTimer(800, 1, function () {
            var mylist = EntityManager.ins().getEntityByTeam(Team.My);
            for (var _i = 0, mylist_3 = mylist; _i < mylist_3.length; _i++) {
                var char = mylist_3[_i];
                EntityManager.ins().removeByHandle(char.infoModel.handle);
            }
            _this.stop();
            _this.fightEnd();
            if (GameMap.sceneInMain()) {
                _this.resetPos();
                RoleAI.ins().start();
            }
        }, this);
    };
    EncounterFight.prototype.lose = function () {
        SoundUtil.ins().playEffect(SoundUtil.SCENE);
        this.stop();
        this.fightEnd();
    };
    EncounterFight.prototype.fightEnd = function () {
        if (EncounterModel.redName < GlobalConfig.SkirmishBaseConfig.maxPkval && Encounter.ins().getEncounterLength())
            ViewManager.ins().open(LadderWin);
    };
    EncounterFight.prototype.stop = function () {
        if (this.encounterIndex == undefined)
            return;
        HejiUseMgr.ins().unregister(this);
        TimerManager.ins().removeAll(this);
        EntityManager.ins().resetRole();
        this.encounterIndex = undefined;
        this.willEntityFightTeam = Team.Monster;
        this.removeAllEncounter();
        for (var handle in this.aiList) {
            var char = EntityManager.ins().getEntityByHandle(handle);
            if (char && char.AI_STATE != AI_State.Die) {
                RoleAI.ins().add(char);
            }
        }
        this.aiList = {};
        GameLogic.ins().postMoveCamera();
    };
    EncounterFight.prototype.resetPos = function () {
        var mylist = EntityManager.ins().getEntityByTeam(Team.My);
        for (var i in mylist) {
            var char = mylist[i];
            var pos = this.rolePositions[char.infoModel.handle];
            if (pos) {
                char.x = pos.x;
                char.y = pos.y;
            }
            var appearEff = new MovieClip();
            appearEff.playFile(RES_DIR_SKILLEFF + "skill208", 1);
            char.addChild(appearEff);
        }
        this.rolePositions = {};
        GameLogic.ins().postMoveCamera();
    };
    EncounterFight.prototype.removeAllEncounter = function () {
        for (var handle in this.encounterList) {
            EntityManager.ins().removeByHandle(handle);
            delete this.encounterList[handle];
        }
    };
    EncounterFight.prototype.addRole = function () {
        var mylist = EntityManager.ins().getEntityByTeam(Team.My);
        for (var _i = 0, mylist_4 = mylist; _i < mylist_4.length; _i++) {
            var char = mylist_4[_i];
            EntityManager.ins().removeByHandle(char.infoModel.handle);
        }
        EntityManager.ins().resetRole();
        var master = EntityManager.ins().getNoDieRole();
        var rolePos = this.getRolePos();
        master.x = rolePos[0] * GameMap.CELL_SIZE;
        master.y = rolePos[1] * GameMap.CELL_SIZE;
        var list = EntityManager.ins().screeningTargetByPos(master);
        if (list[0]) {
            master.dir = DirUtil.get8DirBy2Point(master, list[0]);
        }
        else {
            var encounterModel = Encounter.ins().encounterModel[this.encounterIndex];
            if (encounterModel) {
                var len = encounterModel.subRole.length;
                Assert(false, "\u906D\u9047\u6218\u627E\u4E0D\u5230\u654C\u4EBA\uFF0C\u5B9E\u9645\u906D\u9047\u6218\u6570\u636E\u4EBA\u6570\uFF1A" + len);
            }
        }
        var otherPos = EntityManager.ins().getMyOtherRolePos();
        mylist = EntityManager.ins().getEntityByTeam(Team.My);
        for (var i in mylist) {
            mylist[i].playAction(EntityAction.STAND);
            RoleAI.ins().add(mylist[i]);
            if (mylist[i] != master) {
                var handle = mylist[i].infoModel.handle;
                mylist[i].dir = master.dir;
                mylist[i].x = Math.floor(otherPos[handle].x);
                mylist[i].y = Math.floor(otherPos[handle].y);
            }
            var appearEff = new MovieClip();
            appearEff.playFile(RES_DIR_SKILLEFF + "skill208", 1);
            mylist[i].addChild(appearEff);
        }
        GameLogic.ins().postMoveCamera();
    };
    EncounterFight.prototype.getRoles = function () {
        var encounterModel = Encounter.ins().encounterModel[this.encounterIndex];
        return encounterModel && encounterModel.subRole;
    };
    EncounterFight.prototype.getSkillLvl = function () {
        var encounterModel = Encounter.ins().encounterModel[this.encounterIndex];
        return encounterModel && encounterModel.hejiLvl || 0;
    };
    EncounterFight.prototype.getIsWeiShe = function (selfTargetIsMy) {
        var model = Encounter.ins().encounterModel[this.encounterIndex];
        if (!model)
            return false;
        if (selfTargetIsMy) {
            return Actor.weiWang > model.weiWang;
        }
        else {
            return Actor.weiWang < model.weiWang;
        }
    };
    EncounterFight.prototype.getWeiSheHurt = function (selfTargetIsMy) {
        if (!this.getIsWeiShe(selfTargetIsMy))
            return 0;
        var rankList = Rank.ins().getRankModel(RankDataType.TYPE_WEIWANG);
        var name = '';
        if (selfTargetIsMy) {
            name = Actor.myName;
        }
        else {
            var model = Encounter.ins().encounterModel[this.encounterIndex];
            name = model.subRole[0].name;
        }
        var rank = 0;
        if (rankList) {
            for (var i = 0; i < 3; i++) {
                var data = rankList.getDataList(i);
                if (data && data.player == name) {
                    rank = data.pos;
                    break;
                }
            }
        }
        return GlobalConfig.PrestigeBase.rankDeterDam[rank - 1] || GlobalConfig.PrestigeBase.normalDeterDam;
    };
    EncounterFight.prototype.getRolePos = function () {
        var range = GlobalConfig.SkirmishBaseConfig.range;
        return GameMap.getPosRange(this.zyRolePos[0], this.zyRolePos[1], range);
    };
    EncounterFight.prototype.clearOldAI = function () {
        this.aiList = RoleAI.ins().getAIList();
        RoleAI.ins().clearAIList();
    };
    EncounterFight.prototype.createEncounterAndMonster = function () {
        var zyPos = UserFb.ins().zyPos;
        var index = Math.floor(Math.random() * zyPos.length);
        var zyData = zyPos[index];
        var zyRolePos = zyData[0];
        this.zyRolePos = zyRolePos;
        var monsterId = UserFb.ins().waveMonsterId[0];
        var monsterPos = zyData[1];
        if (Assert(monsterPos, "\u5173\u5361\u7B2C" + UserFb.ins().guanqiaID + "\u5173\u906D\u9047\u6218\u602A\u7269\u51FA\u751F\u70B9\u914D\u9519")) {
            monsterPos = [];
        }
        for (var i = 0; i < monsterPos.length; i++) {
            var entityModel = UserFb.ins().createMonster(monsterId);
            0;
            entityModel.x = monsterPos[i][0] * GameMap.CELL_SIZE;
            entityModel.y = monsterPos[i][1] * GameMap.CELL_SIZE;
            var monster = GameLogic.ins().createEntityByModel(entityModel);
            monster.AI_STATE = AI_State.Patrol;
            this.encounterList[monster.infoModel.handle] = monster;
        }
        var encounterModel = Encounter.ins().encounterModel[this.encounterIndex];
        var len = encounterModel.subRole.length;
        for (var i = 0; i < len; i++) {
            var role = encounterModel.subRole[i];
            if (role) {
                role.setAtt(AttributeType.atHp, role.getAtt(AttributeType.atMaxHp));
                role.setAtt(AttributeType.atMp, role.getAtt(AttributeType.atMaxMp));
                role.type = EntityType.Role;
                role.x = zyRolePos[0] * GameMap.CELL_SIZE + Math.floor(i * 40 * Math.random());
                role.y = zyRolePos[1] * GameMap.CELL_SIZE + Math.floor(i * 40 * Math.random());
                var tar = GameLogic.ins().createEntityByModel(role, Team.WillEntity);
                tar.AI_STATE = AI_State.Stand;
                tar.updateNeiGong();
                this.encounterList[role.handle] = tar;
            }
        }
        RoleAI.ins().start();
    };
    return EncounterFight;
}(BaseClass));
__reflect(EncounterFight.prototype, "EncounterFight", ["IHejiUse"]);
var GameSystem;
(function (GameSystem) {
    GameSystem.encounterFight = EncounterFight.ins.bind(EncounterFight);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=EncounterFight.js.map