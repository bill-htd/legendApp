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
var EntityManager = (function (_super) {
    __extends(EntityManager, _super);
    function EntityManager() {
        var _this = _super.call(this) || this;
        _this.entityList = {};
        _this.transferList = {};
        _this.mineList = {};
        _this._masterList = {};
        _this.distances = [];
        _this.listCount = [];
        return _this;
    }
    EntityManager.ins = function () {
        return _super.ins.call(this);
    };
    EntityManager.prototype.getAllEntity = function () {
        return this.entityList;
    };
    EntityManager.prototype.resetRole = function () {
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            var model = SubRoles.ins().getSubRoleByIndex(i);
            model.name = Actor.myName;
            if (!this.getEntityByHandle(model.handle)) {
                model.setPos(DropHelp.tempDropPoint.x * GameMap.CELL_SIZE, DropHelp.tempDropPoint.y * GameMap.CELL_SIZE);
                debug.log("--------------所有角色重置----------------");
                model.setAtt(AttributeType.atHp, model.getAtt(AttributeType.atMaxHp));
                model.setAtt(AttributeType.atMp, model.getAtt(AttributeType.atMaxMp));
                GameLogic.ins().createEntityByModel(model, Team.My);
            }
            else {
                var char = this.getEntityByHandle(model.handle);
                char.infoModel.setAtt(AttributeType.atHp, model.getAtt(AttributeType.atMaxHp));
                char.infoModel.setAtt(AttributeType.atMp, model.getAtt(AttributeType.atMaxMp));
                char.updateBlood(true);
            }
        }
    };
    EntityManager.prototype.addList = function (char) {
        if (!char.infoModel.handle)
            char.infoModel.handle = char.hashCode;
        if (this.entityList[char.infoModel.handle] == char) {
            return;
        }
        this.entityList[char.infoModel.handle] = char;
        if (char.infoModel.masterHandle) {
            var msth = char.infoModel.masterHandle;
            if (!this._masterList[msth])
                this._masterList[msth] = [];
            this._masterList[msth].push(char);
        }
        if (char.infoModel.type == EntityType.Mine) {
            this.mineList[char.infoModel.index] = char;
        }
        var count = this.listCount[char.team] || 0;
        this.listCount[char.team] = ++count;
    };
    EntityManager.prototype.addTransfer = function (char) {
        this.transferList[char.infoModel.configID] = char;
        SkillEffPlayer.bottomLayer.addChild(char);
    };
    EntityManager.prototype.removeTransferById = function (configID) {
        var char = this.transferList[configID];
        if (char) {
            delete this.transferList[configID];
            DisplayUtils.removeFromParent(char);
        }
    };
    EntityManager.prototype.getTransferById = function (configID) {
        return this.transferList[configID];
    };
    EntityManager.prototype.getMineByIndex = function (index) {
        return this.mineList[index];
    };
    EntityManager.prototype.removeMineByIndex = function (index) {
        var char = this.mineList[index];
        if (char) {
            delete this.mineList[index];
            if (char.infoModel) {
                this.removeByHandle(char.infoModel.handle);
            }
        }
    };
    EntityManager.prototype.createEntity = function (model, param) {
        switch (model.type) {
            case EntityType.Role:
            case EntityType.LadderPlayer: {
                var roleModel = model;
                if (param && param[0] != null) {
                    roleModel.team = param[0];
                }
                else {
                    if (model.masterHandle && model.masterHandle == Actor.handle)
                        roleModel.team = Team.My;
                    else
                        roleModel.team = Team.WillEntity;
                }
                var role = ObjectPool.pop('CharRole');
                role.reset();
                if (roleModel.masterHandle == Actor.handle) {
                    var index = void 0;
                    var len = SubRoles.ins().subRolesLen;
                    for (var i = 0; i < len; i++) {
                        if (i == roleModel.configID) {
                            index = i;
                            break;
                        }
                    }
                    if (SubRoles.ins().getSubRoleByIndex(index)) {
                        roleModel = SubRoles.ins().getSubRoleByIndex(index).mergeData(roleModel);
                    }
                }
                role.infoModel = roleModel;
                role.x = roleModel.x;
                role.y = roleModel.y;
                this.addList(role);
                if (RoleAI.ins().canAddToAi())
                    RoleAI.ins().add(role);
                var isShowBody = true;
                if (roleModel.team != Team.My) {
                    if (!EntityShowMgr.ins().checkShowHandle(roleModel.masterHandle)) {
                        role.hideBodyContainer();
                        role.updateModel();
                        return null;
                    }
                    isShowBody = EntityHideBody.ins().checkIsShowBody(roleModel.masterHandle);
                }
                isShowBody ? role.showBodyContainer() : role.hideBodyContainer();
                role.updateModel();
                return role;
            }
            case EntityType.Monster:
            case EntityType.CollectionMonst: {
                if (param && param[0] != null) {
                    model.team = param[0];
                }
                else {
                    if (model.masterHandle && model.masterHandle != 0) {
                        if (model.isMy)
                            model.team = Team.My;
                        else
                            model.team = Team.WillEntity;
                    }
                    else
                        model.team = Team.Monster;
                }
                var monster = ObjectPool.pop("CharMonster");
                monster.reset();
                monster.infoModel = model;
                monster.x = model.x;
                monster.y = model.y;
                this.addList(monster);
                if (RoleAI.ins().canAddToAi())
                    RoleAI.ins().add(monster);
                var isShowBody = true;
                if (monster.team != Team.My && model.masterHandle) {
                    var rootMasterHandle = this.getRootMasterHandle(model.masterHandle);
                    var masters = this.getMasterList(rootMasterHandle);
                    if (masters) {
                        for (var _i = 0, masters_1 = masters; _i < masters_1.length; _i++) {
                            var master = masters_1[_i];
                            if (monster != master && !master.parent) {
                                monster.hideBodyContainer();
                                monster.updateModel();
                                return null;
                            }
                        }
                    }
                    if (model.team == Team.WillEntity) {
                        isShowBody = EntityHideBody.ins().checkIsShowBody(model.masterHandle);
                    }
                }
                isShowBody ? monster.showBodyContainer() : monster.hideBodyContainer();
                monster.updateModel();
                return monster;
            }
            case EntityType.DropItem: {
                var charItem = ObjectPool.pop("CharItem2");
                charItem.setData(model.itemData);
                charItem.x = model.x;
                charItem.y = model.y;
                charItem.infoModel = model;
                this.addList(charItem);
                charItem.addRoatEffect();
                charItem.addFloatEffect();
                return charItem;
            }
            case EntityType.Transfer: {
                var transfer = ObjectPool.pop("CharTransfer");
                transfer.infoModel = model;
                this.addTransfer(transfer);
                transfer.updateModel();
                return transfer;
            }
            case EntityType.Npc: {
                var npc = ObjectPool.pop("CharNpc");
                npc.infoModel = model;
                this.addList(npc);
                npc.updateModel();
                return npc;
            }
            case EntityType.Mine: {
                var miner = ObjectPool.pop("CharMiner");
                miner.infoModel = model;
                this.addList(miner);
                miner.updateModel();
                return miner;
            }
        }
        return null;
    };
    EntityManager.prototype.removeAll = function () {
        for (var i in this.entityList) {
            this.removeByHandle(i);
        }
        for (var i in this.transferList) {
            this.removeTransferById(i);
        }
        EncounterFight.ins().stop();
        this.entityList = {};
        this._masterList = {};
        this.transferList = {};
        this.listCount = [];
    };
    EntityManager.prototype.hideOtherEntity = function (b) {
        this.isHideOther = b;
        for (var i in this.entityList) {
            if (this.entityList[i].team != Team.WillEntity)
                continue;
            if (b)
                DisplayUtils.removeFromParent(this.entityList[i]);
            else
                GameLogic.ins().addEntity(this.entityList[i]);
        }
    };
    EntityManager.prototype.getEntityRelationHandle = function (handle) {
        var masterHandle = this.getRootMasterHandle(handle);
        var masters = this.getMasterList(masterHandle);
        var list = [].concat(masters || []);
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var char = list_1[_i];
            var model = char.infoModel;
            if (!model)
                continue;
            if (model.job == JobConst.DaoShi) {
                var l = this.getMasterList(model.handle);
                if (l) {
                    list = list.concat(l);
                }
                break;
            }
        }
        return list;
    };
    EntityManager.prototype.removeByHandle = function (handle, removeDisplay, expEffect) {
        if (removeDisplay === void 0) { removeDisplay = true; }
        if (expEffect === void 0) { expEffect = false; }
        var entity = this.entityList[handle];
        if (!entity)
            return;
        var isRole = (entity instanceof CharRole);
        var msth = entity.infoModel.masterHandle;
        if (msth) {
            var arr = this._masterList[msth];
            for (var i = 0; arr && i < arr.length; i++) {
                if (arr[i] == entity) {
                    arr.splice(i, 1);
                    break;
                }
            }
            if (arr && arr.length == 0)
                delete this._masterList[msth];
        }
        delete this.entityList[handle];
        for (var i in this.entityList) {
            if (this.entityList[i].infoModel.masterHandle &&
                this.entityList[i].infoModel.masterHandle == handle)
                this.removeByHandle(this.entityList[i].infoModel.handle);
        }
        var count = this.listCount[entity.team] || 0;
        this.listCount[entity.team] = --count;
        if (entity instanceof CharMonster) {
            entity.stopMove();
            entity.removeAllFilters();
        }
        egret.Tween.removeTweens(entity);
        if (removeDisplay) {
            DisplayUtils.removeFromParent(entity);
            if (entity instanceof CharMonster && !(entity instanceof CharRole)) {
                entity.destroy();
            }
        }
        RoleAI.ins().remove(entity);
        DropHelp.tempDropPoint.x = Math.floor(entity.x / GameMap.CELL_SIZE);
        DropHelp.tempDropPoint.y = Math.floor(entity.y / GameMap.CELL_SIZE);
        if ((GameMap.sceneInMain() || GameMap.fbType == UserFb.FB_TYPE_EXP) && entity.infoModel.type == EntityType.Monster && expEffect) {
            GameLogic.ins().postExpMc(entity);
        }
        if (entity.infoModel.type == EntityType.Mine) {
            delete this.mineList[entity.infoModel.index];
            entity.destruct();
        }
        return entity;
    };
    EntityManager.prototype.getEntityByHandle = function (handle) {
        return this.entityList[handle];
    };
    EntityManager.prototype.getMasterList = function (masterHandle) {
        return this._masterList[masterHandle];
    };
    Object.defineProperty(EntityManager.prototype, "masterList", {
        get: function () {
            return this._masterList;
        },
        enumerable: true,
        configurable: true
    });
    EntityManager.prototype.getRootMasterHandle = function (handle) {
        var target = EntityManager.ins().getEntityByHandle(handle);
        if (target && target.infoModel && target.infoModel.masterHandle > 0 && target.infoModel.masterHandle != handle) {
            return this.getRootMasterHandle(target.infoModel.masterHandle);
        }
        else {
            return handle;
        }
    };
    EntityManager.prototype.getMainRole = function (index) {
        return this.getEntityByHandle(SubRoles.ins().getSubRoleByIndex(index).handle);
    };
    EntityManager.prototype.getJobMainRole = function (index) {
        var i = 0;
        var role;
        for (var k in SubRoles.ins().jobDic) {
            if (i == index) {
                role = SubRoles.ins().jobDic[k];
                break;
            }
            i++;
        }
        return this.getEntityByHandle(role.handle);
    };
    EntityManager.prototype.getNoDieRoleIndex = function () {
        var len = SubRoles.ins().subRolesLen;
        var role;
        for (var k = 0; k < len; k++) {
            role = EntityManager.ins().getJobMainRole(k);
            if (role && role.getHP() > 0 && role.visible)
                return k;
        }
        return -1;
    };
    EntityManager.prototype.getNoDieRole = function () {
        var len = SubRoles.ins().subRolesLen;
        var role;
        for (var k = 0; k < len; k++) {
            role = EntityManager.ins().getJobMainRole(k);
            if (role && role.getHP() > 0 && role.visible) {
                return role;
            }
        }
        return null;
    };
    EntityManager.prototype.getMyOtherRolePos = function () {
        var selfMaster = this.getNoDieRole();
        var mylist = this.getEntityByTeam(Team.My);
        var poxIndex = 0;
        var pos = {};
        for (var i in mylist) {
            var selfTarget = mylist[i];
            if (selfTarget == selfMaster) {
                continue;
            }
            var count = mylist.length;
            var dirs = [1, -1];
            if (count == 2) {
                dirs = [0];
            }
            var p = DirUtil.getGridByDir(selfMaster.dir + dirs[poxIndex] != null ? dirs[poxIndex] : 0);
            poxIndex += 1;
            pos[selfTarget.infoModel.handle] = { x: selfMaster.x + p.x, y: selfMaster.y + p.y };
        }
        pos[selfMaster.infoModel.handle] = { x: selfMaster.x, y: selfMaster.y };
        return pos;
    };
    EntityManager.prototype.sortSubRole = function (a, b) {
        return Algorithm.sortAsc(a.infoModel.job, b.infoModel.job);
    };
    EntityManager.prototype.getTeamCount = function (t) {
        if (MineFight.ins().isFighting || Encounter.ins().isEncounter())
            return RoleAI.ins().getTeamCount(t);
        return this.listCount[t] || 0;
    };
    EntityManager.prototype.checkCount = function (target, range, count, sameTeam) {
        if (count === void 0) { count = 1; }
        if (sameTeam === void 0) { sameTeam = false; }
        var total = 0;
        for (var i in this.entityList) {
            var element = this.entityList[i];
            if (((!sameTeam && element.team != target.team) || (sameTeam && element.team == target.team)) &&
                MathUtils.getDistanceX2ByObject(target, element) <= Math.pow(range * GameMap.CELL_SIZE, 2)) {
                total++;
                if (total >= count)
                    break;
            }
        }
        return total >= count;
    };
    EntityManager.prototype.checkCanAddBlood = function (t) {
        var isCan = false;
        for (var j in this.entityList) {
            if (this.entityList[j].team == t && this.entityList[j].isCanAddBlood) {
                isCan = true;
            }
        }
        return isCan;
    };
    EntityManager.prototype.getEntityBymasterhHandle = function (handle) {
        for (var i in this.entityList) {
            if (this.entityList[i].infoModel &&
                this.entityList[i].infoModel.masterHandle &&
                this.entityList[i].infoModel.masterHandle == handle) {
                if (this.entityList[i].infoModel.type != EntityType.Monster)
                    return this.entityList[i];
            }
        }
        return null;
    };
    EntityManager.prototype.getEntitysBymasterhHandle = function (handle, type) {
        if (type === void 0) { type = -1; }
        var list = [];
        for (var i in this.entityList) {
            if (list.length >= 3)
                return list;
            if (this.entityList[i].infoModel &&
                this.entityList[i].infoModel.masterHandle &&
                this.entityList[i].infoModel.masterHandle == handle) {
                if (type == -1 || type == this.entityList[i].infoModel.type)
                    list.push(this.entityList[i]);
            }
        }
        return list;
    };
    EntityManager.prototype.getEntityByTeam = function (team) {
        if (team === void 0) { team = Team.My; }
        var list = [];
        for (var i in this.entityList) {
            if (this.entityList[i].infoModel && this.entityList[i].infoModel.team == team) {
                list.push(this.entityList[i]);
            }
        }
        return list;
    };
    EntityManager.prototype.getEntityByMonsterId = function (monsterId) {
        var list = [];
        for (var i in this.entityList) {
            if (this.entityList[i].infoModel && this.entityList[i].infoModel.configID == monsterId) {
                list.push(this.entityList[i]);
            }
        }
        return list;
    };
    EntityManager.prototype.screeningTargetByMap = function (selfTarget, target, maxNum, areaId) {
        var areaConfig;
        if (ErrorLog.Assert(areaConfig, "SkillCastRangeConf no such areaId:" + areaId)) {
            return this.screeningTargetByPos(selfTarget, false, maxNum, Number.MAX_VALUE);
        }
        var position = GameMap.getTargetIndex(selfTarget, target, areaConfig.width, areaConfig.height);
        var hId = areaConfig.range[position];
        var hAreaConfig;
        if (!hAreaConfig) {
            return this.screeningTargetByPos(selfTarget, false, maxNum, Number.MAX_VALUE);
        }
        var points = [];
        for (var i = 0; i < hAreaConfig.range.length; i++) {
            var point = GameMap.getPoint(hAreaConfig.range[i], hAreaConfig.width, hAreaConfig.height);
            points.push(point);
        }
        points.push(new egret.Point(0, 0));
        var list = GameMap.getIncludeElement(selfTarget, points, this.entityList);
        return this.screeningTargetByPos(selfTarget, false, maxNum, Number.MAX_VALUE, list);
    };
    EntityManager.prototype.screeningTargetByPos = function (selfTarget, sameTeam, maxNum, range, list) {
        if (sameTeam === void 0) { sameTeam = false; }
        if (maxNum === void 0) { maxNum = 0; }
        if (range === void 0) { range = Number.MAX_VALUE; }
        if (list === void 0) { list = this.entityList; }
        var disFun = MathUtils.getDistanceX2ByObject;
        var range2 = range;
        if (range != Number.MAX_VALUE) {
            range2 = (range * GameMap.CELL_SIZE) * (range * GameMap.CELL_SIZE);
        }
        this.distances.length = 0;
        var tempValue;
        for (var i in list) {
            var element = list[i];
            if (sameTeam && element.team != selfTarget.team)
                continue;
            if (!sameTeam && element.team == selfTarget.team)
                continue;
            if (selfTarget.team == Team.My && element.team == Team.Faker)
                continue;
            if (selfTarget.team == Team.Faker && element.team != Team.Monster && element.team != Team.Faker)
                continue;
            if (!(element instanceof CharRole) && element.team != Team.Monster && element.team != Team.WillBoss)
                continue;
            if (element.AI_STATE == AI_State.Die)
                continue;
            if (Encounter.ins().isEncounter()) {
                if (Team.My == selfTarget.team) {
                    if (Team.WillEntity == element.team && !sameTeam) {
                        if (!Encounter.ins().checkIsEncounter(EncounterFight.ins().encounterIndex, element.infoModel))
                            continue;
                    }
                    else if (Team.My == element.team && sameTeam) {
                    }
                    else {
                        continue;
                    }
                }
                else if (Team.WillEntity == selfTarget.team) {
                    if (sameTeam && Team.WillEntity == element.team) {
                    }
                    else if (!sameTeam && EncounterFight.ins().willEntityFightTeam == element.team) {
                    }
                    else {
                        continue;
                    }
                }
                else {
                }
            }
            tempValue = disFun(selfTarget, element);
            if (tempValue > range2)
                continue;
            this.distances.push({
                priority: tempValue,
                target: element
            });
        }
        this.distances.sort(this.sortFunc);
        var tempArr = [];
        var len = 0;
        if (maxNum)
            len = Math.min(this.distances.length, maxNum);
        else
            len = this.distances.length;
        for (var j = 0; j < len; j++) {
            tempArr[j] = this.distances[j].target;
        }
        return tempArr;
    };
    EntityManager.prototype.sortFunc = function (a, b) {
        if (a.priority > b.priority)
            return 1;
        if (a.priority < b.priority)
            return -1;
        return 0;
    };
    EntityManager.CHAR_DEFAULT_HEIGHT = 118;
    EntityManager.CHAR_DEFAULT_TYPEFACE = 110;
    return EntityManager;
}(BaseClass));
__reflect(EntityManager.prototype, "EntityManager");
//# sourceMappingURL=EntityManager.js.map