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
var TargetListCC = (function (_super) {
    __extends(TargetListCC, _super);
    function TargetListCC() {
        var _this = _super.call(this) || this;
        _this.masterAtkTarget = {};
        _this.tipsCD = false;
        _this.attackMeHandles = [];
        _this.canAttackHandles = [];
        _this.observe(GameLogic.ins().postEntityHpChange, _this.attackAndShowTip);
        _this.observe(BattleCC.ins().postEnterSuccess, _this.campChange);
        _this.observe(GameLogic.ins().postAllAtkTarget, _this.updateAtkTarget);
        _this.observe(GameLogic.ins().postEnterMap, _this.onEnterMap);
        return _this;
    }
    TargetListCC.prototype.onEnterMap = function () {
        var _this = this;
        this.masterAtkTarget = {};
        this.attackMeHandles.length = 0;
        this.canAttackHandles.length = 0;
        TimerManager.ins().removeAll(this);
        ViewManager.ins().close(TargetListPanel);
        TimerManager.ins().doTimer(600, 1, function () {
            if (_this.isShow) {
                TimerManager.ins().doTimer(1000, 0, _this.update, _this);
                _this.update();
                ViewManager.ins().open(TargetListPanel);
            }
        }, this);
    };
    Object.defineProperty(TargetListCC.prototype, "isShow", {
        get: function () {
            return CityCC.ins().isCity ||
                BattleCC.ins().isBattle() ||
                PaoDianCC.ins().isPaoDian ||
                GwBoss.ins().isGwBoss ||
                GwBoss.ins().isGwTopBoss ||
                DarkMjBoss.ins().isDarkBoss ||
                WJBattlefieldSys.ins().isWJBattle ||
                KFBossSys.ins().isKFBossBattle ||
                DevildomSys.ins().isDevildomBattle ||
                KfArenaSys.ins().isKFArena;
        },
        enumerable: true,
        configurable: true
    });
    TargetListCC.prototype.update = function () {
        if (!this.isShow)
            return;
        this.postChangeCanAttackHandle();
        this.updateAttackMe();
    };
    TargetListCC.prototype.campChange = function () {
        if (BattleCC.ins().isBattle()) {
            var char = void 0;
            var roleList = EntityManager.ins().getAllEntity();
            for (var i in roleList) {
                char = roleList[i];
                if (char && char.infoModel) {
                    if (char.infoModel.type == EntityType.Role) {
                        char.setCharName(char.infoModel.guildAndName);
                        char.updateNameColor();
                    }
                }
            }
        }
    };
    TargetListCC.prototype.postChangeCanAttackHandle = function () {
        var char;
        var roleList = EntityManager.ins().getAllEntity();
        this.canAttackHandles.length = 0;
        var infoModel;
        var addMonster = false;
        var monsterCannotAttack = CityCC.ins().isCity || GwBoss.ins().isGwBoss
            || GwBoss.ins().isGwTopBoss || KFBossSys.ins().isKFBossBattle
            || DarkMjBoss.ins().isDarkBoss || DevildomSys.ins().isDevildomBattle
            || KfArenaSys.ins().isKFArena;
        for (var i in roleList) {
            char = roleList[i];
            infoModel = char.infoModel;
            if (!infoModel)
                continue;
            if (infoModel.type == EntityType.Role) {
                if (char.isSafety() == false && infoModel.getAtt(AttributeType.atHp) > 0) {
                    if (BattleCC.ins().isBattle()) {
                        if (infoModel.camp > 0 && infoModel.camp != BattleCC.ins().camp)
                            this.updateCanAttackHandle(infoModel.masterHandle, true);
                    }
                    else if (DevildomSys.ins().isDevildomBattle) {
                        if (!infoModel.guildID || infoModel.guildID && infoModel.guildID != Guild.ins().guildID) {
                            this.updateCanAttackHandle(char.infoModel.masterHandle, true);
                        }
                    }
                    else
                        this.updateCanAttackHandle(infoModel.masterHandle, true);
                }
            }
            else if (infoModel.type == EntityType.Monster && infoModel.getAtt(AttributeType.atHp) > 0 && !addMonster) {
                if (monsterCannotAttack) {
                    continue;
                }
                var monsterConfig = GlobalConfig.MonstersConfig[infoModel.configID];
                if (!monsterConfig)
                    continue;
                if (monsterConfig.type == 4 || monsterConfig.type == 3)
                    continue;
                if (!this.checkMonHead(monsterConfig))
                    continue;
                if (GlobalConfig.CampBattleConfig.noAttack.indexOf(infoModel.configID) == -1) {
                    addMonster = true;
                    this.updateCanAttackHandle(infoModel.handle, true, true);
                }
            }
        }
        if (KFBossSys.ins().isKFBossBattle && KFBossSys.ins().flagHandle && KFBossSys.ins().flagTimes > 0) {
            this.updateCanAttackHandle(KFBossSys.ins().flagHandle, true, true);
        }
        else if (KfArenaSys.ins().isKFArena && KfArenaSys.ins().flagHandle) {
            this.updateCanAttackHandle(KfArenaSys.ins().flagHandle, true, true);
        }
    };
    TargetListCC.prototype.checkMonHead = function (config) {
        return !Assert(config.head, "\u602A\u7269\u5934\u50CF\u4E0D\u5B58\u57281\uFF0Cid:" + config.id + ",name:" + config.name);
    };
    TargetListCC.prototype.updateAttackMe = function () {
        for (var _i = 0, _a = this.attackMeHandles; _i < _a.length; _i++) {
            var masterHandle = _a[_i];
            var chars_1 = EntityManager.ins().getMasterList(masterHandle);
            if (!chars_1 || chars_1.length == 0) {
                this.postTargetList(masterHandle, 0);
            }
            else {
                var isDead = true;
                for (var _b = 0, chars_2 = chars_1; _b < chars_2.length; _b++) {
                    var char = chars_2[_b];
                    if (char && char.infoModel && char.infoModel.getAtt(AttributeType.atHp) > 0) {
                        isDead = false;
                        break;
                    }
                }
                if (isDead)
                    this.postTargetList(masterHandle, 0);
            }
        }
    };
    TargetListCC.prototype.clear = function () {
        this.attackMeHandles.length = 0;
        this.canAttackHandles.length = 0;
        GameLogic.ins().currAttackHandle = 0;
        UserBoss.ins().monsterID = 0;
    };
    TargetListCC.prototype.updateCanAttackHandle = function (handle, add, firstPos) {
        if (firstPos === void 0) { firstPos = false; }
        var rootHandle = EntityManager.ins().getRootMasterHandle(handle);
        if (rootHandle == 0 || rootHandle == Actor.handle)
            return;
        var idx = this.canAttackHandles.indexOf(rootHandle);
        if (add && idx == -1) {
            if (firstPos)
                this.canAttackHandles.unshift(rootHandle);
            else
                this.canAttackHandles.push(rootHandle);
        }
        else if (!add && idx != -1)
            this.canAttackHandles.splice(idx, 1);
    };
    TargetListCC.prototype.postTargetList = function (sourceHandle, targetHandle) {
        if (sourceHandle == 0 && targetHandle == 0)
            return;
        var rootSource = EntityManager.ins().getRootMasterHandle(sourceHandle);
        var rootTarget = EntityManager.ins().getRootMasterHandle(targetHandle);
        var idx = this.attackMeHandles.indexOf(rootSource);
        if (rootSource == Actor.handle) {
            var target = EntityManager.ins().getEntityByHandle(targetHandle);
            if (target && target.infoModel && target.infoModel.type == EntityType.CollectionMonst)
                return;
            if (target && target.infoModel && target.infoModel.getAtt(AttributeType.atHp) > 0) {
                GameLogic.ins().postChangeTarget(target.infoModel.type == EntityType.Monster ? target.infoModel.handle : target.infoModel.masterHandle);
            }
            else {
                GameLogic.ins().postChangeTarget(0);
                ViewManager.ins().close(TargetPlayerBigBloodPanel);
            }
            if (ViewManager.ins().isShow(TargetListPanel))
                ViewManager.ins().getView(TargetListPanel).showTarget(targetHandle != 0);
        }
        else if (idx != -1 && rootTarget == 0)
            this.attackMeHandles.splice(idx, 1);
    };
    TargetListCC.prototype.attackAndShowTip = function (_a) {
        var targetRole = _a[0], sourceRole = _a[1], type = _a[2], value = _a[3];
        if (!this.isShow || !targetRole || !sourceRole || value <= 0)
            return;
        if (!targetRole.isMy && !sourceRole.isMy)
            return;
        var rootSource = EntityManager.ins().getRootMasterHandle(sourceRole.infoModel.handle);
        var rootTarget = EntityManager.ins().getRootMasterHandle(targetRole.infoModel.handle);
        if (rootTarget != Actor.handle && rootSource == Actor.handle) {
            if (GameLogic.ins().currAttackHandle != 0 && !ViewManager.ins().isShow(TargetPlayerBigBloodPanel)) {
                if (BattleCC.ins().isBattle() || PaoDianCC.ins().isPaoDian)
                    ViewManager.ins().open(TargetPlayerBigBloodPanel);
                else if (CityCC.ins().isCity && CityCC.ins().cityBossId == 0)
                    ViewManager.ins().open(TargetPlayerBigBloodPanel);
            }
            return;
        }
        var idx = this.attackMeHandles.indexOf(rootSource);
        if (idx == -1 && rootTarget == Actor.handle && rootSource != Actor.handle && this.masterAtkTarget[rootSource] == rootTarget) {
            if (sourceRole.infoModel.type == EntityType.Role) {
                this.attackMeHandles.push(rootSource);
                if (this.attackMeHandles.length > 0) {
                    if (!ViewManager.ins().isShow(TargetListPanel)) {
                        ViewManager.ins().open(TargetListPanel);
                        CityCC.ins().postChangeAttStatue(1);
                    }
                }
                this.postTargetList(0, 0);
            }
        }
        if (targetRole.infoModel.isMy && targetRole.infoModel.getAtt(AttributeType.atHp) <= 0 && !EntityManager.ins().getNoDieRole()) {
            if (ViewManager.ins().isShow(TargetListPanel))
                ViewManager.ins().getView(TargetListPanel).showTarget(false);
        }
    };
    TargetListCC.prototype.updateAtkTarget = function (_a) {
        var sourceHandle = _a[0], targetHandle = _a[1];
        var sourceMaster = EntityManager.ins().getRootMasterHandle(sourceHandle);
        var targetMaster = EntityManager.ins().getRootMasterHandle(targetHandle);
        this.masterAtkTarget[sourceMaster] = targetMaster;
    };
    TargetListCC.ins = function () {
        return _super.ins.call(this);
    };
    return TargetListCC;
}(BaseSystem));
__reflect(TargetListCC.prototype, "TargetListCC");
var GameSystem;
(function (GameSystem) {
    GameSystem.targetListCC = TargetListCC.ins.bind(TargetListCC);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=TargetListCC.js.map