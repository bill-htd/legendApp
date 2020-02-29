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
var GameLogic = (function (_super) {
    __extends(GameLogic, _super);
    function GameLogic() {
        var _this = _super.call(this) || this;
        _this.MONSTER_RADIUS = 2;
        _this.MONSTER_LEN = _this.MONSTER_RADIUS * 2 + 1;
        _this.currHandle = 0;
        _this.currAttackHandle = 0;
        _this.rPosindex = [];
        _this.runTime = 0;
        _this.guanqiaId = 0;
        _this.sysId = PackageID.Default;
        _this.regNetMsg(2, _this.postSubRoleChange);
        _this.regNetMsg(3, _this.postEnterMap);
        _this.regNetMsg(4, _this.postCreateOtherEntity);
        _this.regNetMsg(5, _this.doGoldChange);
        _this.regNetMsg(8, _this.doSubRoleAtt);
        _this.regNetMsg(9, _this.postHpChange);
        _this.regNetMsg(10, _this.doRemoveEntity);
        _this.regNetMsg(11, _this.doMoveEntity);
        _this.regNetMsg(12, _this.doStopMoveEntity);
        _this.regNetMsg(13, _this.doSyncPos);
        _this.regNetMsg(15, _this.postMpChange);
        _this.regNetMsg(17, _this.doTips);
        _this.regNetMsg(18, _this.doFirstRegister);
        _this.regNetMsg(20, _this.doDieNotice);
        _this.regNetMsg(21, _this.postGuildChange);
        _this.regNetMsg(22, _this.postRename);
        _this.regNetMsg(24, _this.postOtherAttChange);
        _this.regNetMsg(25, _this.doPaoPao);
        _this.regNetMsg(26, _this.doNeiGongChange);
        _this.regNetMsg(27, _this.doSubRoleExtAtt);
        _this.regNetMsg(31, _this.doFindPath);
        _this.regNetMsg(32, _this.doBloodNumShow);
        _this.regNetMsg(33, _this.doChangeTarget);
        _this.regNetMsg(34, _this.doAddMonsterConfig);
        _this.regNetMsg(35, _this.doZeroInit);
        _this.regNetMsg(36, _this.postChangeCamp);
        _this.radiusMap = [];
        var len = _this.MONSTER_RADIUS * 2 + 1;
        for (var i = 0; i < len; i++) {
            _this.radiusMap[i] = [];
        }
        return _this;
    }
    GameLogic.ins = function () {
        return _super.ins.call(this);
    };
    GameLogic.prototype.initLogin = function () {
        this.sendHeartbeat();
    };
    GameLogic.prototype.sendNewRole = function (job, sex) {
        var bytes = this.getBytes(2);
        bytes.writeByte(job);
        bytes.writeByte(sex);
        this.sendToServer(bytes);
    };
    GameLogic.prototype.sendHeartbeat = function () {
        var _this = this;
        if (this.heartBeatTimer)
            return;
        var f = function () {
            var bytes = _this.getBytes(255);
            _this.sendToServer(bytes);
        };
        this.heartBeatTimer = new egret.Timer(1000 * 60);
        this.heartBeatTimer.addEventListener(egret.TimerEvent.TIMER, f, this);
        this.heartBeatTimer.start();
    };
    GameLogic.prototype.sendGMCommad = function (str) {
        var bytes = this.getBytes(0);
        bytes.writeString(str);
        this.sendToServer(bytes);
    };
    GameLogic.prototype.postSubRoleChange = function (bytes) {
        SubRoles.ins().doSubRole(bytes);
    };
    GameLogic.prototype.postEnterMap = function (bytes) {
        window['showGame']();
        DropHelp.clearDrop();
        GameMap.parser(bytes);
        RoleAI.ins().clear();
        MonsterSpeak.ins().clear();
        MineFight.ins().stop();
        MineData.ins().removeAll();
        EntityManager.ins().removeAll();
        EntityHideBody.ins().changeScene();
        EntityShowMgr.ins().changeScene();
        TimerManager.ins().removeAll(GameMap);
        TimerManager.ins().removeAll(SkillEffPlayer);
        TimerManager.ins().remove(this.shakeMapView, this);
        this.gamescene.map.clearAllLayer();
        this.gamescene.map.changeMap();
        if (GameMap.fubenID == 0) {
            UserFb.ins().pkGqboss = false;
            if (Encounter.ins().willBossID) {
                Encounter.ins().createBoss();
                PlayFun.ins().upDataWillBoss(Encounter.ins().willBossID);
            }
        }
        else if (GameMap.fbType == UserFb.FB_TYPE_GUANQIABOSS) {
        }
        else {
            ViewManager.ins().closeTopLevel();
        }
        ViewManager.ins().close(BossBloodPanel);
        ViewManager.ins().close(TargetPlayerBigBloodPanel);
        GuildWar.ins().getModel().clearGuildWarList();
        UserBoss.ins().clearWorldBossList();
        TargetListCC.ins().clear();
        if (!SoundUtil.WINDOW_OPEN && (GameMap.lastFbId != GameMap.fubenID || GameMap.fubenID)) {
            SoundUtil.ins().playEffect(SoundUtil.SCENE);
        }
    };
    GameLogic.prototype.postCreateOtherEntity = function (bytes) {
        var entityType = bytes.readShort();
        var handler = bytes.readDouble();
        bytes.position -= 10;
        var model;
        var target;
        if (entityType == EntityType.Monster || entityType == EntityType.CollectionMonst) {
            model = new EntityModel;
            model.parser(bytes);
        }
        else if (entityType == EntityType.Role) {
            model = new Role;
            model.parserBase(bytes);
            model.parserOtherRole(bytes, true);
        }
        else if (entityType == EntityType.LadderPlayer) {
            model = new Role;
            model.parserBase(bytes);
            model.parserOtherRole(bytes, false);
            if (GameMap.fbType == UserFb.FB_TYPE_GUIDEBOSS) {
                model.masterHandle = model.handle;
            }
        }
        else if (entityType == EntityType.DropItem) {
            model = new CharModel();
            model.parserBase(bytes);
            model.parserItemData(bytes);
        }
        if (!model) {
            return false;
        }
        EntityHideBody.ins().onCreateEntity(model);
        target = this.createEntityByModel(model);
        this.afterCreateOtherEntity(entityType, model, target);
        return model;
    };
    GameLogic.prototype.afterCreateOtherEntity = function (entityType, model, target) {
        if (entityType == EntityType.Monster || entityType == EntityType.CollectionMonst) {
            if (GameMap.fbType == UserFb.FB_TYPE_EXP) {
                UserFb.ins().expMonterCount += 1;
            }
            if (GameMap.sceneInMine()) {
                if (target)
                    target.visible = false;
            }
            MonsterSpeak.ins().trigger(model.configID, SpeakType.appear);
        }
        else if (entityType == EntityType.Role) {
            if (GuildWar.ins().getModel().checkinAppoint() || GameMap.fbType == UserFb.FB_TYPE_ZHUANSHENGBOSS) {
                if (model.guildID != Guild.ins().guildID) {
                    GuildWar.ins().getModel().changecanPlayList(model.masterHandle);
                }
                else {
                    GuildWar.ins().getModel().setMyGuildNum(model.masterHandle);
                }
            }
            if (MineFight.ins().isFighting && target) {
                target.visible = false;
            }
        }
        else if (entityType == EntityType.LadderPlayer) {
            if (GameMap.fbType == UserFb.FB_TYPE_GUIDEBOSS) {
                UserFb.ins().guideBossPlayerId = model.configID;
                UserFb.ins().guideBossPlayerJob = model.job;
                UserFb.ins().guideBossPlayerSex = model.sex;
                UserFb.ins().guideBossPlayerName = model.name;
                if (UserFb.ins().guideBossKill == 0) {
                    UserBoss.ins().postBelongChange(model.masterHandle);
                }
            }
        }
    };
    GameLogic.prototype.doGoldChange = function (bytes) {
        var type = bytes.readShort();
        if (type == 1) {
            var newGold = bytes.readNumber();
            Actor.ins().postGoldChange(newGold);
        }
        else if (type == 4) {
            var num = bytes.readNumber();
            Actor.ins().postSoulChange(num);
        }
        else if (type == 7) {
            Actor.ins().postFeatsChange(bytes.readNumber());
        }
        else if (type == 9) {
            var oldRune = Actor.runeShatter;
            Actor.runeShatter = bytes.readNumber();
            if (Actor.runeShatter - oldRune > 0) {
                UserTips.ins().showTips("\u83B7\u5F97|C:0x35e62d&T:\u6218\u7EB9\u7CBE\u534Ex" + (Actor.runeShatter - oldRune) + "|");
            }
            this.postRuneShatter();
        }
        else if (type == MoneyConst.piece) {
            var oldValue = Actor.runeExchange;
            Actor.runeExchange = bytes.readNumber();
            if (oldValue && Actor.runeExchange - oldValue > 0) {
                UserTips.ins().showTips("|C:0xFFD700&T:\u83B7\u5F97" + (Actor.runeExchange - oldValue) + RewardData.getCurrencyName(MoneyConst.piece) + "|");
            }
            this.postRuneExchange();
        }
        else if (type == 11) {
            var together = bytes.readNumber();
            Actor.ins().postUpdateTogeatter(together, 1);
        }
        else if (type == 12) {
            var together = bytes.readNumber();
            Actor.ins().postUpdateTogeatter(together, 2);
        }
        else if (type == MoneyConst.weiWang)
            Actor.ins().postWeiWang(bytes.readNumber());
        else if (type == MoneyConst.chip) {
            Actor.ins().postChip(bytes.readNumber());
        }
        else {
            var newYb = bytes.readNumber();
            Actor.ins().postYbChange(newYb);
        }
    };
    GameLogic.prototype.postRuneShatter = function () {
    };
    GameLogic.prototype.postRuneExchange = function () {
    };
    GameLogic.prototype.postLevelBarChange = function (lv) {
        return lv;
    };
    GameLogic.prototype.postAdjustMapPos = function () {
    };
    GameLogic.prototype.doSubRoleAtt = function (bytes) {
        SubRoles.ins().doSubRoleAtt(bytes);
    };
    GameLogic.prototype.postHpChange = function (bytes) {
        var handle = bytes.readDouble();
        var hp = bytes.readDouble();
        var target = EntityManager.ins().getEntityByHandle(handle);
        if (!target)
            return false;
        var model = target.infoModel;
        var oldHp = model.getAtt(AttributeType.atHp);
        model.setAtt(AttributeType.atHp, hp);
        target.updateBlood();
        if (hp <= 0) {
            RoleAI.ins().checkPlayDieSound(target);
            DropHelp.tempDropPoint.x = Math.floor(target.x / GameMap.CELL_SIZE);
            DropHelp.tempDropPoint.y = Math.floor(target.y / GameMap.CELL_SIZE);
        }
        else {
            if (model.type == EntityType.Role && !target.nameVisible)
                target.showNameAndHp();
        }
        return [target, hp, oldHp];
    };
    GameLogic.prototype.doNeiGongChange = function (bytes) {
        var handle = bytes.readDouble();
        var neigong = bytes.readDouble();
        var target = EntityManager.ins().getEntityByHandle(handle);
        if (target && target.infoModel) {
            target.infoModel.setAtt(AttributeType.cruNeiGong, neigong);
            target.updateNeiGong();
        }
    };
    GameLogic.prototype.postEntityHpChange = function (target, source, type, value) {
        if ((source && source.team == Team.My) || (target && target.team == Team.My)) {
            if (type == DamageTypes.Heji) {
                var gsv = ViewManager.ins().getView(GameSceneView);
                DisplayUtils.shakeItHeji(gsv.map, 30, 700);
            }
        }
        return [target, source, type, value];
    };
    GameLogic.prototype.doRemoveEntity = function (bytes) {
        var handle = bytes.readDouble();
        var entity = EntityManager.ins().getEntityByHandle(handle);
        if (!entity)
            return;
        if (entity instanceof CharRole) {
            if (entity.infoModel && entity.infoModel.type == EntityType.LadderPlayer) {
                if (GameMap.fbType == UserFb.FB_TYPE_GUIDEBOSS) {
                    if (UserFb.ins().guideBossKill == 0) {
                        this.removeEntity(handle);
                        UserBoss.ins().postBelongChange(Actor.handle, handle, entity.infoModel.name);
                        UserFb.ins().guideBossKill += 1;
                    }
                    else {
                        EntityManager.ins().removeByHandle(handle, false, true);
                        entity.onDead(function () {
                            entity.deadDelay();
                        });
                        GuideUtils.ins().clickOut();
                        UserFb.ins().guideBossKill += 1;
                        UserBoss.ins().weixieList.length = 0;
                        UserBoss.ins().postHasAttackChange(0);
                    }
                }
                else {
                    this.removeEntity(handle);
                }
            }
            else {
                EntityManager.ins().removeByHandle(handle);
            }
        }
        else if (entity instanceof CharItem2) {
            EntityManager.ins().removeByHandle(handle);
        }
        else {
            this.removeEntity(handle);
            if (entity && entity.team != Team.My) {
                var isPlayStand = false;
                var nextList = EntityManager.ins().screeningTargetByPos(entity, true);
                if (!nextList || nextList.length == 0) {
                    isPlayStand = true;
                }
                else {
                    if (GameMap.fbType == UserFb.FB_TYPE_GUILD_WAR) {
                        var char = EntityManager.ins().getEntityByHandle(GameLogic.ins().currAttackHandle);
                        if (!char || char.infoModel.getAtt(AttributeType.atHp) <= 0) {
                            isPlayStand = true;
                        }
                    }
                }
                if (isPlayStand) {
                    var mylist = EntityManager.ins().getEntityByTeam(Team.My);
                    for (var _i = 0, mylist_1 = mylist; _i < mylist_1.length; _i++) {
                        var char = mylist_1[_i];
                        if (char.action != EntityAction.RUN)
                            char.playAction(EntityAction.STAND);
                    }
                }
                if (GameMap.fbType == UserFb.FB_TYPE_GUANQIABOSS || GameMap.fbType == UserFb.FB_TYPE_TIAOZHAN) {
                    if (entity.parent) {
                        var point = entity.parent.localToGlobal(entity.x, entity.y);
                        UserFb.ins().postExpFly(point, 50);
                    }
                }
            }
            if (GameMap.fbType == UserFb.FB_TYPE_GUIDEBOSS) {
                UserBoss.ins().attHandle = 0;
                if (UserFb.ins().guideBossKill) {
                    UserBoss.ins().winner = Actor.myName;
                }
                GuideUtils.ins().clickOut();
                GameLogic.ins().postChangeTarget(0);
            }
        }
        this.postRemoveEntity(handle, entity);
    };
    GameLogic.prototype.postRemoveEntity = function (handle, entity) {
        return [handle, entity];
    };
    GameLogic.prototype.removeEntity = function (handle) {
        var entity = EntityManager.ins().getEntityByHandle(handle);
        if (entity && entity.infoModel.getAtt(AttributeType.atHp) <= 0) {
            EntityManager.ins().removeByHandle(handle, false, true);
            entity.playAction(EntityAction.HIT);
            entity.stopMove();
            entity.onDead(function () {
                entity.deadDelay();
                var t = egret.Tween.get(entity.dieTweenObj);
                t.wait(1000).to({ alpha: 0 }, 1000).call(function () {
                    DisplayUtils.removeFromParent(entity);
                });
            });
        }
        else {
            EntityManager.ins().removeByHandle(handle, true, true);
        }
    };
    GameLogic.prototype.doMoveEntity = function (bytes) {
        var handle = bytes.readDouble();
        var target = EntityManager.ins().getEntityByHandle(handle);
        if (!target)
            return;
        var tx = bytes.readInt();
        var ty = bytes.readInt();
        if (target.x == tx && target.y == ty)
            return;
        GameMap.moveEntity(target, tx, ty, true);
    };
    GameLogic.prototype.doStopMoveEntity = function (bytes) {
        var handle = bytes.readDouble();
        var target = EntityManager.ins().getEntityByHandle(handle);
        if (target) {
            target.stopMove();
            if (target.infoModel.getAtt(AttributeType.atHp) > 0) {
                target.playAction(EntityAction.STAND);
            }
            target.x = bytes.readInt();
            target.y = bytes.readInt();
            if (target == EntityManager.ins().getNoDieRole()) {
                GameLogic.ins().postMoveCamera();
            }
        }
    };
    GameLogic.prototype.doSyncPos = function (bytes) {
        var _this = this;
        var handle = bytes.readDouble();
        var target = EntityManager.ins().getEntityByHandle(handle);
        var type = bytes.readShort();
        if (target) {
            target.stopMove();
            var t = void 0;
            switch (type) {
                case 0:
                    target.playAction(EntityAction.STAND);
                    target.x = bytes.readInt();
                    target.y = bytes.readInt();
                    if (target.isMy)
                        egret.callLater(function () {
                            _this.postMoveCamera();
                        }, this);
                    break;
                case 1:
                    target.playAction(EntityAction.RUN);
                    t = egret.Tween.get(target.moveTweenObj);
                    t.to({
                        "x": bytes.readInt(),
                        "y": bytes.readInt()
                    }, bytes.readInt()).call(function () {
                        target.playAction(EntityAction.STAND);
                    });
                    break;
                case 2:
                    target.playAction(EntityAction.STAND);
                    t = egret.Tween.get(target.moveTweenObj);
                    t.to({
                        "x": bytes.readInt(),
                        "y": bytes.readInt()
                    }, bytes.readInt());
                    break;
            }
        }
    };
    GameLogic.prototype.postMoveCamera = function () {
        var entity = EntityManager.ins().getNoDieRole();
        if (!entity)
            return false;
        return [entity.x, entity.y, GameMap.mapID, GameMap.fubenID];
    };
    GameLogic.prototype.sendSyncServerTime = function () {
        this.sendBaseProto(14);
    };
    GameLogic.prototype.postMpChange = function (bytes) {
        var handle = bytes.readDouble();
        var mp = bytes.readDouble();
        var target = EntityManager.ins().getEntityByHandle(handle);
        var model;
        if (target) {
            model = target.infoModel;
            model.setAtt(AttributeType.atMp, mp);
        }
        return model;
    };
    GameLogic.prototype.postExpMc = function (mon) {
        return mon;
    };
    GameLogic.prototype.doTips = function (bytes) {
        var strTips = GlobalConfig.ServerTips[bytes.readInt()].tips;
        UserTips.ins().showTips(strTips);
    };
    GameLogic.prototype.doFirstRegister = function (bytes) {
        ViewManager.ins().open(WelcomeWin);
    };
    GameLogic.prototype.doDieNotice = function (bytes) {
    };
    GameLogic.prototype.postGuildChange = function (bytes) {
        return [bytes.readInt(), bytes.readString()];
    };
    GameLogic.prototype.postOtherAttChange = function (bytes) {
        var target = EntityManager.ins().getEntityByHandle(bytes.readDouble());
        if (!target || !target.infoModel)
            return false;
        var len = bytes.readShort();
        for (var i = 0; i < len; i++)
            target.infoModel.setAtt(bytes.readInt(), bytes.readDouble());
        return target;
    };
    GameLogic.prototype.doPaoPao = function (bytes) {
        var handle = bytes.readDouble();
        var id = bytes.readInt();
        var target = EntityManager.ins().getEntityByHandle(handle);
        if (target)
            target.addPaoPao(id);
    };
    GameLogic.prototype.doSubRoleExtAtt = function (bytes) {
        SubRoles.ins().doSubRoleExtAtt(bytes);
    };
    GameLogic.prototype.sendRename = function (name) {
        var bytes = this.getBytes(22);
        bytes.writeString(name);
        this.sendToServer(bytes);
    };
    GameLogic.prototype.postRename = function (bytes) {
        var result = bytes.readByte();
        if (result == 0) {
            GameSocket.ins().close();
            ViewManager.ins().close(RenameWin);
            alert('改名成功，重新登录即可生效！');
            location.reload();
        }
        else {
            RoleMgr.ins().showErrorTips(result);
        }
    };
    GameLogic.prototype.postChangeAttrPoint = function (handle) {
        var bytes = this.getBytes(25);
        bytes.writeDouble(handle);
        this.sendToServer(bytes);
        GuildWar.ins().getModel().clickTime = 1;
    };
    GameLogic.prototype.doFindPath = function (bytes) {
        var handle = bytes.readDouble();
        var sx = Math.floor(bytes.readInt() / GameMap.CELL_SIZE);
        var sy = Math.floor(bytes.readInt() / GameMap.CELL_SIZE);
        var endX = bytes.readInt();
        var endY = bytes.readInt();
        var tx = Math.floor(endX / GameMap.CELL_SIZE);
        var ty = Math.floor(endY / GameMap.CELL_SIZE);
        var path = GameMap.getPatch(sx, sy, tx, ty);
        if (!path) {
            console.log(false, "0-31 \u5BFB\u8DEF\u5F02\u5E38\uFF0CmapId:" + GameMap.mapID + ",fbid:" + GameMap.fubenID + ",fbType:" + GameMap.fbType + ",sx:" + sx + ",sy:" + sy + ",tx:" + tx + ",ty:" + ty);
        }
        this.sendFindPathToServer(handle, path);
    };
    GameLogic.prototype.sendFindPathToServer = function (handle, path, isLastGrip) {
        if (isLastGrip === void 0) { isLastGrip = true; }
        var len = path ? path.length : 0;
        var bytes = this.getBytes(31);
        bytes.writeDouble(handle);
        bytes.writeInt(len);
        for (var i = 0; i < len; i++) {
            if (i == 0 && !isLastGrip) {
                bytes.writeInt(path[i].nX);
                bytes.writeInt(path[i].nY);
            }
            else {
                bytes.writeInt(path[i].nX * GameMap.CELL_SIZE + (GameMap.CELL_SIZE >> 1));
                bytes.writeInt(path[i].nY * GameMap.CELL_SIZE + (GameMap.CELL_SIZE >> 1));
            }
        }
        this.sendToServer(bytes);
    };
    GameLogic.prototype.doBloodNumShow = function (bytes) {
        var targetHandle = bytes.readDouble();
        var sourceHandle = bytes.readDouble();
        var value = Math.ceil(bytes.readDouble()) * -1;
        var type = bytes.readUnsignedInt();
        var charSource = EntityManager.ins().getEntityByHandle(sourceHandle);
        if (!charSource) {
            return;
        }
        var charTarget = EntityManager.ins().getEntityByHandle(targetHandle);
        if (!charTarget) {
            return;
        }
        if (charTarget.team == Team.My && charTarget.infoModel.type == EntityType.Monster) {
            if (value < 0)
                return;
        }
        if (!(charTarget instanceof CharRole)) {
            charTarget.shakeIt();
        }
        GameLogic.ins().postEntityHpChange(charTarget, charSource, type, value);
    };
    GameLogic.prototype.doChangeTarget = function (bytes) {
        var sourceHandle = bytes.readDouble();
        var targetHandle = bytes.readDouble();
        this.postAllAtkTarget(sourceHandle, targetHandle);
        var char = EntityManager.ins().getEntityByHandle(sourceHandle);
        if (char && char.infoModel && char.infoModel.masterHandle == Actor.handle)
            this.postAtkTarget(targetHandle);
        if (CityCC.ins().isCity || BattleCC.ins().isBattle()
            || PaoDianCC.ins().isPaoDian || GwBoss.ins().isGwBoss
            || GwBoss.ins().isGwTopBoss || KFBossSys.ins().isKFBossBattle
            || DevildomSys.ins().isDevildomBattle || KfArenaSys.ins().isKFArena) {
            TargetListCC.ins().postTargetList(sourceHandle, targetHandle);
            return;
        }
        if (GameMap.fbType != UserFb.FB_TYPE_GUILD_WAR
            && GameMap.fbType != UserFb.FB_TYPE_ZHUANSHENGBOSS
            && GameMap.fbType != UserFb.FB_TYPE_ALLHUMENBOSS
            && GameMap.fbType != UserFb.FB_TYPE_HOMEBOSS
            && GameMap.fbType != UserFb.FB_TYPE_GUIDEBOSS || targetHandle == 0) {
            if (char && char == EntityManager.ins().getNoDieRole())
                GameLogic.ins().currAttackHandle = targetHandle;
            return;
        }
        var target = EntityManager.ins().getEntityByHandle(targetHandle);
        if (target && target.infoModel && target.infoModel.masterHandle > 0) {
            var source = EntityManager.ins().getEntityByHandle(sourceHandle);
            if (source && source.infoModel && source.infoModel.masterHandle == Actor.handle) {
                this.postChangeTarget(target.infoModel.masterHandle);
            }
            if (source && source.infoModel) {
                var sources = EntityManager.ins().getMasterList(source.infoModel.masterHandle);
                if (target.infoModel.masterHandle == Actor.handle && sources) {
                    for (var k in sources) {
                        if (!(sources[k] instanceof CharRole))
                            continue;
                        sources[k].setNameTxtColor(ColorUtil.ROLENAME_COLOR_YELLOW);
                    }
                    if (GameMap.fbType == UserFb.FB_TYPE_GUIDEBOSS) {
                        if (UserBoss.ins().weixieList[0] != source.infoModel.masterHandle) {
                            var tname = source.infoModel.name;
                            if (source.infoModel.type == EntityType.LadderPlayer) {
                                var strlist = tname.split("\n");
                                if (strlist[1])
                                    tname = strlist[1];
                                else
                                    tname = strlist[0];
                                tname = StringUtils.replaceStr(tname, "0xffffff", ColorUtil.ROLENAME_COLOR_GREEN + "");
                            }
                            if (UserFb.ins().guideBossKill)
                                UserTips.ins().showCenterTips("\u53D7\u5230|C:0x35e62d&T:" + tname + "|\u73A9\u5BB6\u7684\u653B\u51FB\uFF0C\u70B9\u51FB\u53F3\u8FB9\u5934\u50CF\u8FDB\u884C\u53CD\u51FB");
                        }
                        UserBoss.ins().weixieList.length = 0;
                        UserBoss.ins().changeWeiXieList(source.infoModel.masterHandle);
                        UserBoss.ins().postHasAttackChange(0);
                    }
                }
            }
        }
        else {
            var sourceHd = EntityManager.ins().getEntityByHandle(sourceHandle);
            if (sourceHd && sourceHd.infoModel) {
                if (sourceHd.infoModel.masterHandle == Actor.handle) {
                    if (target && target.infoModel) {
                        this.postChangeTarget(target.infoModel.masterHandle);
                    }
                    else {
                        this.postChangeTarget(0);
                    }
                }
            }
        }
    };
    GameLogic.prototype.postChangeTarget = function (handle) {
        GameLogic.ins().currAttackHandle = handle;
    };
    GameLogic.prototype.postAtkTarget = function (handle) {
        this.currHandle = handle;
    };
    GameLogic.prototype.postAllAtkTarget = function (sourceHandle, targetHandle) {
        return [sourceHandle, targetHandle];
    };
    GameLogic.prototype.test = function (keyCode) {
        console.log('键盘 : ' + keyCode);
        if (keyCode == Keyboard.BRACE_R) {
        }
        if (keyCode == Keyboard.BRACE_L) {
        }
        if (keyCode == Keyboard.BACKSLASH) {
        }
        if (keyCode == Keyboard.I) {
        }
        if (keyCode == Keyboard.O) {
        }
        if (keyCode == Keyboard.P) {
        }
        if (keyCode == Keyboard.SPACE) {
            RoleAI.ins().togglePause();
        }
        if (keyCode == Keyboard.BACK_QUOTE && this.gamescene) {
            this.gamescene.input.visible = true;
        }
        if (keyCode == Keyboard.ENTER && this.gamescene && this.gamescene.input.visible) {
            console.log(this.gamescene.input);
            console.log(this.gamescene.input.text);
            this.sendGMCommad(this.gamescene.input.text);
        }
        if (keyCode == Keyboard.KC_TAB) {
            if (!ViewManager.ins().isShow(WarnWin)) {
                var infoStr = Version.BUILD_NUMBER;
                infoStr += "\n\u5F00\u670D\u5929\u6570:" + (GameServer.serverOpenDay + 1) + "\u5929";
                infoStr += "\n\u670D\u52A1\u5668id:" + LocationProperty.srvid;
                WarnWin.show(infoStr, null, this, null, null, "sure");
            }
            else {
                ViewManager.ins().close(WarnWin);
            }
        }
    };
    GameLogic.prototype.startPkBoss = function () {
        UserFb.ins().autoPk();
    };
    GameLogic.prototype.createEntityByModel = function (model) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        var target = EntityManager.ins().createEntity(model, param);
        if (target)
            this.addEntity(target);
        return target;
    };
    GameLogic.prototype.addEntity = function (target) {
        if (target instanceof CharRole) {
            target.showBlood(target.isMy || target.team == Team.WillEntity);
            target.showNeigong(target.isMy);
            target.dir = target.x >= GameMap.MAX_WIDTH >> 1 ? 6 : 2;
        }
        else if (target instanceof CharMonster && GlobalConfig.MonstersConfig[target.infoModel.configID] && GlobalConfig.MonstersConfig[target.infoModel.configID].type == 3) {
            target.dir = target.x >= GameMap.MAX_WIDTH >> 1 ? 6 : 2;
        }
        this.gamescene.map.addEntity(target);
    };
    GameLogic.prototype.playSkillEff = function (skill, self, targets, hitFun) {
        if (hitFun === void 0) { hitFun = null; }
        var rtn = 300;
        if (skill.wordEff && self.team == Team.My) {
            UserSkill.ins().postShowSkillWord(skill.wordEff + "");
            if (UserSkill.ins().hejiLevel > 0) {
                if (UserSkill.ins().isHejiSkill(skill.configID)) {
                    UserSkill.ins().hejiEnable = false;
                    UserSkill.ins().setHejiCD(-1);
                    UserSkill.ins().postHejiRemove();
                }
            }
        }
        if ((targets.length == 1 && self != targets[0]) || targets.length > 1) {
            self.dir = DirUtil.get8DirBy2Point(self, targets[0]);
        }
        if (skill && skill.actionType) {
            self.playAction(skill.actionType, self instanceof CharRole ? null : function () {
                if (self.action != EntityAction.DIE) {
                    self.playAction(EntityAction.STAND);
                }
            });
        }
        if (!ViewManager.ins().isShow(GameSceneView)) {
            return 0;
        }
        if (self && self.team == Team.My) {
            if (skill.repelDistance) {
                TimerManager.ins().doTimer(350, 1, this.shakeMapView, this);
            }
        }
        var showList = [14];
        var skillId = Math.floor(skill.configID / 1000);
        if (showList.indexOf(skillId) < 0 && !EntityShowMgr.ins().checkShowSkillEffect()) {
            if (self.infoModel.masterHandle && !self.isMy && !targets[0].isMy) {
                return;
            }
        }
        if (skill.effectId) {
            if (self.infoModel.type == EntityType.Monster) {
                if (GlobalConfig.FlameStamp.skillId.indexOf(skill.configID) != -1)
                    self.usedLyMarkSkill();
            }
            if (self.getIsShowBody()) {
                SkillEffPlayer.play(skill.effectId, self, [targets[0]], hitFun);
            }
            else {
                if (hitFun) {
                    hitFun();
                }
                return 0;
            }
        }
        else {
            if (hitFun) {
                hitFun();
            }
            return 0;
        }
        switch (skill.effType) {
            case EffectType.AnyAngle:
                return 700;
        }
        return rtn;
    };
    GameLogic.prototype.shakeMapView = function () {
        var gsv = ViewManager.ins().getView(GameSceneView);
        DisplayUtils.shakeIt(gsv.map, 5, 250, 2);
    };
    GameLogic.prototype.addOutEff = function (xPos, yPos) {
        var transModel = new TransferModel();
        transModel.configID = 0;
        transModel.x = xPos;
        transModel.y = yPos;
        transModel.type = EntityType.Transfer;
        EntityManager.ins().createEntity(transModel);
    };
    GameLogic.prototype.removeOutEff = function () {
        EntityManager.ins().removeTransferById(0);
    };
    Object.defineProperty(GameLogic.prototype, "gamescene", {
        get: function () {
            return ViewManager.ins().getView(GameSceneView);
        },
        enumerable: true,
        configurable: true
    });
    GameLogic.prototype.createGuanqiaMonster = function (isAll, isElite) {
        if (isAll === void 0) { isAll = true; }
        if (isElite === void 0) { isElite = false; }
        this.guanqiaId = UserFb.ins().guanqiaID;
        if (!GameMap.sceneInMain())
            return;
        var count = Math.ceil(UserFb.ins().waveMonsterCount * Math.random());
        var monsterTypeLen = UserFb.ins().waveMonsterId.length;
        var eliteCount = EntityManager.ins().getEntityByMonsterId(UserFb.ins().eliteMonsterId).length;
        var monsterCount = EntityManager.ins().getTeamCount(Team.Monster) - eliteCount;
        if (monsterCount > 3 && !isElite) {
            return;
        }
        count = 10 - monsterCount;
        for (var i = 0; i < monsterTypeLen; i++) {
            var len = isAll ? UserFb.ins().rPos[i].length : 1;
            if (len > 3) {
                len = 3;
            }
            count = Math.ceil(count / len);
            var eliteBoo = isElite;
            for (var j = 0; j < len; j++) {
                this.runTime = 0;
                if (!this.rPosindex[i] || this.rPosindex[i] >= UserFb.ins().rPos[i].length)
                    this.rPosindex[i] = 0;
                var index = this.rPosindex[i];
                var radiusMap = [];
                var p = UserFb.ins().rPos[i][index];
                var startX = p.x - this.MONSTER_RADIUS;
                var startY = p.y - this.MONSTER_RADIUS;
                this.writeMap(radiusMap, startX, startY, count);
                for (var tempX = 0; tempX < this.MONSTER_LEN; tempX++) {
                    for (var tempY = 0; tempY < this.MONSTER_LEN; tempY++) {
                        if (!radiusMap[tempX])
                            continue;
                        var tempP = radiusMap[tempX][tempY];
                        if (!tempP)
                            continue;
                        var model = void 0;
                        if (isElite && eliteBoo && eliteCount < 5) {
                            model = UserFb.ins().createMonster(UserFb.ins().eliteMonsterId);
                            model.isElite = true;
                            eliteBoo = false;
                            eliteCount += 1;
                        }
                        else {
                            var monId = UserFb.ins().waveMonsterId[i];
                            model = UserFb.ins().createMonster(monId);
                        }
                        model.x = (startX + tempX) * GameMap.CELL_SIZE + (GameMap.CELL_SIZE >> 1);
                        model.y = (startY + tempY) * GameMap.CELL_SIZE + (GameMap.CELL_SIZE >> 1);
                        var wp = isNaN(UserFb.ins().wanderpercent) ? 5000 : UserFb.ins().wanderpercent;
                        model.isWander = Math.random() * 10000 < wp;
                        var monster = this.createEntityByModel(model);
                        monster.AI_STATE = AI_State.Patrol;
                        if (model.effect)
                            monster.addHalo(GlobalConfig.EffectConfig[model.effect].fileName);
                    }
                }
                this.rPosindex[i]++;
            }
        }
        if (GameMap.sceneInMain())
            RoleAI.ins().start();
    };
    GameLogic.prototype.writeMap = function (map, startX, startY, count) {
        this.runTime++;
        if (this.runTime > 200) {
            debug.log("\u5173\u5361" + this.guanqiaId + "\u7684\u5237\u602A\u70B9\u53EF\u80FD\u5728\u4E0D\u53EF\u884C\u533A\u57DF\u5185,\u8BF7\u7B56\u5212\u68C0\u67E5");
            return;
        }
        var tx = MathUtils.limitInteger(0, this.MONSTER_LEN - 1);
        var ty = MathUtils.limitInteger(0, this.MONSTER_LEN - 1);
        if (!map[tx])
            map[tx] = [];
        if (!map[tx][ty]) {
            var canMove = GameMap.checkWalkable(startX + tx, startY + ty);
            if (canMove) {
                map[tx][ty] = 1;
                count--;
            }
            if (count > 0)
                this.writeMap(map, startX, startY, count);
        }
        else {
            this.writeMap(map, startX, startY, count);
        }
    };
    GameLogic.prototype.postHookStateChange = function (value) {
        this.hookState = value;
        return value;
    };
    GameLogic.prototype.postMoveEntity = function (entity, asNode, isGrip) {
        if (isGrip === void 0) { isGrip = true; }
        return [entity, asNode, isGrip];
    };
    GameLogic.calculateRealAttribute = function (target, type, self, passiveAttr) {
        if (passiveAttr === void 0) { passiveAttr = {}; }
        var value = target.infoModel.getAtt(type);
        var buffs = target.buffList;
        var buff;
        for (var i in buffs) {
            buff = buffs[i];
            var mh = EntityManager.ins().getRootMasterHandle(self.infoModel.handle);
            if ((buff.effConfig.type == SkillEffType.AdditionalAttributes || (buff.effConfig.type == SkillEffType.HostAddAttributes && buff.hostsHandle && buff.hostsHandle.indexOf(mh) >= 0))
                && buff.effConfig.args.d == type) {
                if (buff.multRate)
                    value += buff.value * buff.multRate;
                else
                    value += buff.value;
            }
        }
        var exValue = passiveAttr[type] ? passiveAttr[type] : 0;
        return value + exValue;
    };
    GameLogic.triggerAttr = function (selfTarget, type, passiveAttr) {
        if (passiveAttr === void 0) { passiveAttr = {}; }
        var attrValue = selfTarget.infoModel.attributeData[type] || 0;
        attrValue += passiveAttr[type] ? passiveAttr[type] : 0;
        if (attrValue) {
            var r = Math.random();
            if (r < attrValue / 10000) {
                return true;
            }
        }
        return false;
    };
    GameLogic.triggerExAttr = function (selfTarget, type) {
        var attrValue = selfTarget.infoModel.attributeExData[type];
        if (attrValue) {
            var r = Math.random();
            if (r < attrValue / 10000) {
                return true;
            }
        }
        return false;
    };
    GameLogic.triggerCrit = function (selfTarget, target, addValue) {
        if (addValue === void 0) { addValue = 0; }
        var crit = selfTarget.infoModel.getAtt(AttributeType.atCrit);
        if (selfTarget.buffList[60003]) {
            var skillEff = selfTarget.buffList[60003].effConfig;
            crit = crit + Math.floor(skillEff.args.c / 10000 * crit);
        }
        var attrValue = crit - target.infoModel.getAtt(AttributeType.atTough) + addValue;
        if (attrValue > 0) {
            var r = Math.random();
            if (r < attrValue / 10000) {
                return true;
            }
        }
        return false;
    };
    GameLogic.triggerMiss = function (selfTarget, target) {
        var hit = selfTarget.infoModel.getExAtt(ExAttributeType.eatHit);
        var miss = target.infoModel.getExAtt(ExAttributeType.eatMiss);
        var min = Math.min(miss - hit, 4000);
        if (min > 0) {
            var r = Math.random();
            if (r < min / 10000) {
                return true;
            }
        }
        return false;
    };
    GameLogic.triggerValue = function (value) {
        if (value) {
            var r = Math.random();
            if (r < value / 10000) {
                return true;
            }
        }
        return false;
    };
    GameLogic.prototype.postViewOpen = function (b) {
        return b;
    };
    GameLogic.prototype.doAddMonsterConfig = function (bytes) {
        var config = JSON.parse(bytes.readString());
        for (var i in config) {
            GlobalConfig.MonstersConfig[i] = config[i];
        }
    };
    GameLogic.prototype.doZeroInit = function (bytes) {
        GameApp.ins().postZeroInit();
    };
    GameLogic.prototype.postChangeCamp = function (bytes) {
        var handle = bytes.readDouble();
        var target = EntityManager.ins().getEntityByHandle(handle);
        if (target && target.infoModel) {
            target.infoModel.camp = bytes.readInt();
            if (target.infoModel.masterHandle == Actor.handle) {
                BattleCC.ins().camp = target.infoModel.camp;
                BattleCC.ins().postEnterSuccess();
            }
            target.setCharName(target.infoModel.guildAndName);
            target.updateNameColor();
        }
    };
    GameLogic.skyBallCheck = function (target) {
        if (this.triggerExAttr(target, ExAttributeType.eatAllCrit)) {
            var effBuff = void 0;
            effBuff = ObjectPool.pop('EntityBuff');
            effBuff.effConfig = GlobalConfig.EffectsConfig[SkillConst.EFF_SKY_BALL];
            effBuff.addTime = egret.getTimer();
            effBuff.endTime = effBuff.addTime + target.infoModel.getExAtt(ExAttributeType.eatAllCritTime);
            target.addBuff(effBuff);
            return true;
        }
        return false;
    };
    GameLogic.prototype.postFlyItem = function (item) {
        return item;
    };
    GameLogic.prototype.postFlyItemEx = function (item) {
        return item;
    };
    GameLogic.prototype.stopAI = function () {
        this.sendBaseProto(33);
    };
    GameLogic.prototype.sendGetOtherAttr = function (masterHandles) {
        var bytes = this.getBytes(34);
        bytes.writeShort(masterHandles.length);
        for (var i = 0; i < masterHandles.length; i++) {
            bytes.writeDouble(masterHandles[i]);
        }
        this.sendToServer(bytes);
    };
    GameLogic.HOOK_STATE_HOOK = 0;
    GameLogic.HOOK_STATE_FIND_ENMENY = 1;
    return GameLogic;
}(BaseSystem));
__reflect(GameLogic.prototype, "GameLogic");
var GameSystem;
(function (GameSystem) {
    GameSystem.gamelogic = GameLogic.ins.bind(GameLogic);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=GameLogic.js.map