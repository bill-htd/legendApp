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
var MineFight = (function (_super) {
    __extends(MineFight, _super);
    function MineFight() {
        var _this = _super.call(this) || this;
        _this.isFighting = 0;
        _this.range = 4;
        return _this;
    }
    MineFight.ins = function () {
        return _super.ins.call(this);
    };
    MineFight.prototype.start = function (data) {
        if (this.isFighting) {
            return;
        }
        this.isFighting = 1;
        this.handles = [];
        this._data = data;
        var entityList = EntityManager.ins().getAllEntity();
        var role = EntityManager.ins().getNoDieRole();
        for (var handle in entityList) {
            var info = entityList[handle].infoModel;
            if (!info)
                continue;
            if (data.type == 0 && info.type == EntityType.Mine && info.actorID == data.actorID) {
            }
            else if (entityList[handle] != role) {
                entityList[handle].visible = false;
            }
        }
        this.setShowUI(false);
        UserSkill.ins().setHejiCD(6000);
        this.enemyPoints = this.getEnemyPoint();
        this.startPos = { x: role.x, y: role.y };
        var dir = DirUtil.get8DirBy2Point(this.startPos, {
            x: GameMap.grip2Point(this.enemyPoints[0][0]),
            y: GameMap.grip2Point(this.enemyPoints[0][1])
        });
        for (var i = 0; i < SubRoles.ins().subRolesLen; i++) {
            var tar = EntityManager.ins().getJobMainRole(i);
            if (!tar) {
                break;
            }
            if (i == 0) {
                tar.x = this.startPos.x;
                tar.y = this.startPos.y;
            }
            else {
                var grids = GameMap.getPosRangeRandom(this.startPos.x, this.startPos.y, DirUtil.dirOpposit(dir), i);
                tar.x = GameMap.grip2Point(grids[0]);
                tar.y = GameMap.grip2Point(grids[1]);
            }
            tar.dir = dir;
            tar.visible = true;
            tar.AI_STATE = AI_State.Stand;
            this.playTransferEffect(tar);
            this.handles.push(tar.infoModel.handle);
            RoleAI.ins().add(tar);
        }
        GameLogic.ins().postMoveCamera();
    };
    MineFight.prototype.stop = function () {
        if (!this.isFighting)
            return;
        this.isFighting = 0;
        this._model = null;
        HejiUseMgr.ins().unregister(this);
        TimerManager.ins().removeAll(this);
        var entityList = EntityManager.ins().getAllEntity();
        for (var handle in entityList) {
            if (entityList[handle].infoModel && entityList[handle].infoModel.type != EntityType.Monster)
                entityList[handle].visible = true;
        }
        for (var i = 0; i < this.handles.length; i++) {
            var handle = this.handles[i];
            EntityManager.ins().removeByHandle(handle);
        }
        this.resetRole();
        this.setShowUI(true);
        RoleAI.ins().stop();
        RoleAI.ins().clearAIList();
        if (GameMap.sceneInMine() && Mine.ins().finishedData) {
            ViewManager.ins().open(MineRobWin, Mine.ins().finishedData);
        }
        GameLogic.ins().postMoveCamera();
    };
    MineFight.prototype.resetRole = function () {
        MineData.ins().resetRole();
        var model = SubRoles.ins().getSubRoleByIndex(0);
        var tar = EntityManager.ins().getEntityByHandle(model.handle);
        tar.x = this.startPos.x;
        tar.y = this.startPos.y;
        tar.AI_STATE = AI_State.Stand;
    };
    MineFight.prototype.fightEnd = function (win) {
        if (win)
            this.fightWin();
        else
            this.fightFail();
    };
    MineFight.prototype.fightWin = function () {
        var _this = this;
        var id = this._data.id;
        var config = GlobalConfig.KuangYuanConfig[id];
        var awards = this.getAward(config);
        awards = this.getCountAward(awards);
        for (var _i = 0, awards_1 = awards; _i < awards_1.length; _i++) {
            var award = awards_1[_i];
            if (award.type != 0) {
                Encounter.ins().postCreateDrop(DropHelp.tempDropPoint.x, DropHelp.tempDropPoint.y, award);
            }
        }
        var entityList = EntityManager.ins().getAllEntity();
        var _loop_1 = function (handle) {
            var info = entityList[handle].infoModel;
            if (!info)
                return "continue";
            if (this_1._data.type == 0 && info.type == EntityType.Mine && info.actorID == this_1._data.actorID) {
                egret.Tween.get(entityList[handle]).to({ alpha: 0 }, 1000).call(function () {
                    entityList[handle].visible = false;
                    entityList[handle].alpha = 1;
                });
                return "break";
            }
        };
        var this_1 = this;
        for (var handle in entityList) {
            var state_1 = _loop_1(handle);
            if (state_1 === "break")
                break;
        }
        var f = function () {
            _this.sendToServer(true);
            TimerManager.ins().doTimer(1000, 1, _this.stop, _this);
            var mylist = EntityManager.ins().getEntityByTeam(Team.My);
            for (var _i = 0, mylist_1 = mylist; _i < mylist_1.length; _i++) {
                var char = mylist_1[_i];
                char.stopMove();
                if (!(char instanceof CharRole)) {
                    EntityManager.ins().removeByHandle(char.infoModel.handle);
                }
                else {
                    _this.playTransferEffect(char);
                }
            }
            SoundUtil.ins().playEffect(SoundUtil.SCENE);
        };
        DropHelp.addCompleteFunc(f, this);
        DropHelp.start();
    };
    MineFight.prototype.fightFail = function () {
        var _this = this;
        this.sendToServer(false);
        Encounter.ins().postFightResult(0);
        TimerManager.ins().doTimer(2000, 1, function () {
            _this.stop();
        }, this);
    };
    MineFight.prototype.sendToServer = function (win) {
        if (this._data.type == 0) {
            Mine.ins().sendRobResult(win, this._data.id, this._data.actorID);
        }
        else {
            Mine.ins().sendFightBackResult(win, this._data.index);
        }
    };
    MineFight.prototype.setShowUI = function (b) {
        if (!GameMap.sceneInMine())
            return;
        MineData.ins().showTransfer(b);
        Mine.ins().postMineFightState(b ? 1 : 0);
    };
    MineFight.prototype.getRoles = function () {
        if (this._model) {
            return this._model.subRole;
        }
        return null;
    };
    MineFight.prototype.getSkillLvl = function () {
        if (this._model) {
            return this._model.hejiLvl;
        }
        return 0;
    };
    MineFight.prototype.getIsWeiShe = function (selfTargetIsMy) {
        if (!this._model)
            return false;
        var model = this._model;
        if (selfTargetIsMy) {
            return Actor.weiWang > model.weiWang;
        }
        else {
            return Actor.weiWang < model.weiWang;
        }
    };
    MineFight.prototype.getWeiSheHurt = function (selfTargetIsMy) {
        if (!this.getIsWeiShe(selfTargetIsMy))
            return 0;
        var rankList = Rank.ins().getRankModel(RankDataType.TYPE_WEIWANG);
        var name = '';
        if (selfTargetIsMy) {
            name = Actor.myName;
        }
        else {
            name = this._model && this._model.subRole[0].name;
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
    MineFight.prototype.createEnemy = function (model) {
        this._model = model;
        var roles = model.getJobRoles();
        var mainRole = EntityManager.ins().getNoDieRole();
        HejiUseMgr.ins().register(this);
        for (var i = 0; i < roles.length; i++) {
            var role = roles[i];
            role.masterHandle = role.masterHandle * 10;
            role.type = EntityType.Role;
            var grids = this.enemyPoints[i] || GameMap.getPosRangeRandom(mainRole.x, mainRole.y, mainRole.dir, this.range + i);
            if (!grids) {
                role.x = mainRole.x;
                role.y = mainRole.y;
            }
            else {
                role.x = GameMap.grip2Point(grids[0]);
                role.y = GameMap.grip2Point(grids[1]);
            }
            role.dir = DirUtil.dirOpposit(mainRole.dir);
            var tar = GameLogic.ins().createEntityByModel(role, Team.WillEntity);
            tar.dir = DirUtil.dirOpposit(mainRole.dir);
            tar.AI_STATE = AI_State.Stand;
            tar.updateNeiGong();
            this.playTransferEffect(tar);
            this.handles.push(role.handle);
            RoleAI.ins().add(tar);
        }
        RoleAI.ins().start();
    };
    MineFight.prototype.playTransferEffect = function (char) {
        var appearEff = new MovieClip();
        appearEff.playFile(RES_DIR_SKILLEFF + "skill208", 1);
        char.addChild(appearEff);
        char.playAction(EntityAction.ATTACK);
    };
    MineFight.prototype.getAward = function (config) {
        var rewards = config.rewards;
        var awards = [];
        var percent = config.robPrecent;
        for (var i = 0; i < rewards.length; i++) {
            var data = new RewardData();
            data.type = rewards[i].type;
            data.id = rewards[i].id;
            data.count = Math.ceil(rewards[i].count * percent / 100);
            if (this._data.type == 1) {
                data.count *= 2;
            }
            awards.push(data);
        }
        return awards;
    };
    MineFight.prototype.getCountAward = function (awards) {
        var arr = [];
        for (var _i = 0, awards_2 = awards; _i < awards_2.length; _i++) {
            var award = awards_2[_i];
            while (award.count > 0) {
                var data = new RewardData();
                data.type = award.type;
                data.id = award.id;
                data.count = award.count > 10 ? 10 : award.count;
                arr.push(data);
                award.count -= 10;
            }
        }
        return arr;
    };
    MineFight.prototype.getEnemyPoint = function () {
        var role = EntityManager.ins().getNoDieRole();
        var px = GameMap.point2Grip(role.x);
        var py = GameMap.point2Grip(role.y);
        var points = [];
        var maxDir = 0;
        var maxCount = 0;
        var isAdd = Math.random() > 0.5;
        for (var i = 0; i < 8; i++) {
            var dir = isAdd ? i : (7 - i);
            for (var range = this.range; range < this.range + 3; range++) {
                var arr = GameMap.getPosRangeByDir(px, py, dir, range);
                if (arr[2]) {
                    points[dir] = points[dir] || [];
                    points[dir].push(arr);
                }
            }
            if (points[dir] && points[dir].length >= 3) {
                return points[dir];
            }
        }
        for (var i = 0; i < points.length; i++) {
            if (points[i] && points[i].length > maxCount) {
                maxCount = points[i].length;
                maxDir = i;
            }
        }
        return points[maxDir];
    };
    return MineFight;
}(BaseClass));
__reflect(MineFight.prototype, "MineFight", ["IHejiUse"]);
//# sourceMappingURL=MineFight.js.map