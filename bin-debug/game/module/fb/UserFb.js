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
var UserFb = (function (_super) {
    __extends(UserFb, _super);
    function UserFb() {
        var _this = _super.call(this) || this;
        _this.fbModel = {};
        _this._groupID = 1;
        _this._guanqiaID = -1;
        _this.rewards = [];
        _this.eliteRewards = [];
        _this.maxLen = 0;
        _this.guanqiaReward = 0;
        _this.worldReward = 0;
        _this.worldGuanQias = [];
        _this.worldGuanQiaHasReceive = [];
        _this.currentEnergy = 0;
        _this.canChallengGuanQia = true;
        _this.encounterPos = [];
        _this.expMonterCount = 0;
        _this.expMonterCountKill = 0;
        _this.isQuite = true;
        _this.guideBossKill = 0;
        _this.showAni = true;
        _this.showAutoPk = -1;
        _this.showAutoPk2 = -1;
        _this.firstAutoGuilder = false;
        _this.fbExpTotal = 0;
        _this.tfRoomID = 0;
        _this.tfPassID = 0;
        _this._tfInviteTime = 0;
        _this.showTfRed = true;
        _this.fbRings = {
            buyTime: 0, challengeTime: 0, canTakeAward: false
        };
        _this.guanqiaMonster = [];
        _this.fbConfig = {};
        _this.mijingFingfen = 4;
        _this.mijingUseTime = 0;
        _this.pkGqboss = false;
        _this.exp = 0;
        _this.fbDataList = [];
        _this.initPos = true;
        _this.sysId = PackageID.Guanqia;
        _this.regNetMsg(4, _this.doRoleAllDie);
        _this.regNetMsg(10, _this.postFbInfoInit);
        _this.regNetMsg(11, _this.postUpDataInfo);
        _this.regNetMsg(13, _this.postFbTime);
        _this.regNetMsg(14, _this.doBossBoxNum);
        _this.regNetMsg(16, _this.postFbExpInfo);
        _this.regNetMsg(17, _this.postFbExpTotal);
        _this.regNetMsg(18, _this.doGuideFbAliveTime);
        _this.regNetMsg(21, _this.postFbRingInfo);
        _this.regNetMsg(1, _this.postGuanqiaInfo);
        _this.regNetMsg(2, _this.doWaveData);
        _this.regNetMsg(3, _this.doBossResult);
        _this.regNetMsg(5, _this.doGuanqiaReward);
        _this.regNetMsg(6, _this.doGuanqiaWroldReward);
        _this.regNetMsg(12, _this.doOfflineReward);
        _this.regNetMsg(24, _this.postGuardLeftTime);
        _this.regNetMsg(25, _this.postGuardInfo);
        _this.regNetMsg(27, _this.postGuardUseSkill);
        _this.regNetMsg(28, _this.postGuardCopyInfo);
        _this.regNetMsg(29, _this.postBossDrop);
        _this.regNetMsg(30, _this.postCreateTFRoomSuccess);
        _this.regNetMsg(31, _this.postEnterTFRoomSuccess);
        _this.regNetMsg(32, _this.exitTFRoom);
        _this.regNetMsg(33, _this.postFTRoomChange);
        _this.regNetMsg(34, _this.postFTRoomPassInfo);
        _this.regNetMsg(35, _this.doTeamFuBenEnd);
        _this.regNetMsg(36, _this.doTeamFuBenRelive);
        _this.regNetMsg(37, _this.postTeamFuBenRank);
        _this.regNetMsg(38, _this.postTeamFbFlowarRecords);
        _this.regNetMsg(39, _this.teamFbSysInviteInfo);
        _this.regNetMsg(40, _this.postGuardWeaponLogs);
        _this.observe(GameLogic.ins().postEnterMap, _this.onChangeScene);
        _this.observe(GameLogic.ins().postHpChange, _this.recordKill);
        return _this;
    }
    Object.defineProperty(UserFb.prototype, "rCount", {
        get: function () {
            return this.fbConfig.rCount || 0;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(UserFb.prototype, "goldEff", {
        get: function () {
            return this.fbConfig.goldEff || 0;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(UserFb.prototype, "expEff", {
        get: function () {
            return this.fbConfig.expEff || 0;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(UserFb.prototype, "zyPos", {
        get: function () {
            return this.fbConfig.zyPos;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(UserFb.prototype, "energy", {
        get: function () {
            return this.fbConfig.energy || 0;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(UserFb.prototype, "waveEnergy", {
        get: function () {
            return this.fbConfig.waveEnergy || 0;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(UserFb.prototype, "waveMonsterCount", {
        get: function () {
            return this.fbConfig.waveMonsterCount || 0;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(UserFb.prototype, "waveMonsterId", {
        get: function () {
            return this.fbConfig.waveMonsterId || [];
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(UserFb.prototype, "outPos", {
        get: function () {
            return this.fbConfig.outPos || { x: 0, y: 0, a: 0 };
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(UserFb.prototype, "rPos", {
        get: function () {
            return this.fbConfig.rPos || [];
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(UserFb.prototype, "eliteMonsterId", {
        get: function () {
            return this.fbConfig.eliteMonsterId || 0;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(UserFb.prototype, "wanderpercent", {
        get: function () {
            return this.fbConfig.wanderpercent == undefined ? 5000 : this.fbConfig.wanderpercent;
        },
        enumerable: true,
        configurable: true
    });
    ;
    UserFb.prototype.getBossDrop = function (type, bossHandler) {
        var bytes = this.getBytes(29);
        bytes.writeByte(type);
        bytes.writeDouble(bossHandler);
        this.sendToServer(bytes);
    };
    UserFb.prototype.postBossDrop = function (bytes) {
        var _this = this;
        var type = bytes.readByte();
        var bossHandle = bytes.readDouble();
        var len = bytes.readByte();
        for (var j = 0; j < len; j++) {
            var reward = new RewardData();
            reward.type = bytes.readInt();
            reward.id = bytes.readInt();
            reward.count = bytes.readInt();
            if (reward.type == 0 && reward.id != 1 && reward.id != 2 && reward.id != MoneyConst.rune) {
            }
            else {
                DropHelp.addDrop([DropHelp.tempDropPoint.x != 0 ? DropHelp.tempDropPoint.x : Math.floor(EntityManager.ins().getNoDieRole().x / GameMap.CELL_SIZE),
                    DropHelp.tempDropPoint.y != 0 ? DropHelp.tempDropPoint.y : Math.floor(EntityManager.ins().getNoDieRole().y / GameMap.CELL_SIZE),
                    reward]);
            }
        }
        DropHelp.start();
        TimerManager.ins().doTimerDelay(500, 100, 1, function () {
            _this.getBossDrop(type, bossHandle);
        }, this);
    };
    UserFb.prototype.postGuardLeftTime = function (bytes) {
        GuardWeaponModel.ins().leftTime = bytes.readUnsignedInt();
    };
    UserFb.prototype.challengeGuard = function () {
        var bytes = this.getBytes(24);
        this.sendToServer(bytes);
    };
    UserFb.prototype.callGuardBoss = function () {
        var bytes = this.getBytes(26);
        this.sendToServer(bytes);
    };
    UserFb.prototype.guardUseSkill = function (index) {
        var bytes = this.getBytes(27);
        bytes.writeByte(index);
        this.sendToServer(bytes);
    };
    UserFb.prototype.postGuardInfo = function (bytes) {
        var num = bytes.readByte();
        GuardWeaponModel.ins().challengeTimes = num;
        GuardWeaponModel.ins().isShowSweep = bytes.readByte() == 1;
    };
    UserFb.prototype.postGuardUseSkill = function (bytes) {
        return bytes.readByte();
    };
    UserFb.prototype.postGuardCopyInfo = function (bytes) {
        var info = GuardWeaponModel.ins().guardCopyInfo || new GuardCopyInfo();
        info.parser(bytes.readByte(), bytes.readInt(), bytes.readByte(), bytes.readInt(), bytes.readByte(), bytes.readInt());
        GuardWeaponModel.ins().guardCopyInfo = info;
    };
    UserFb.prototype.recordKill = function (_a) {
        var target = _a[0], value = _a[1];
        if (target instanceof CharRole)
            return;
        if (value <= 0)
            this.expMonterCountKill += 1;
    };
    UserFb.prototype.initLogin = function () {
        if (GlobalConfig.DailyFubenConfig) {
            this.fbDataList.length = 0;
            for (var key in GlobalConfig.DailyFubenConfig) {
                var cfg = GlobalConfig.DailyFubenConfig[key];
                if (cfg.bossId) {
                    continue;
                }
                this.fbDataList.push(cfg.id);
            }
        }
    };
    UserFb.ins = function () {
        return _super.ins.call(this);
    };
    UserFb.prototype.onChangeScene = function () {
        this.rewards = [];
        this.eliteRewards = [];
        this.expMonterCountKill = 0;
        this.expMonterCount = 0;
        if (!this.tfRoomID)
            ViewManager.ins().close(TeamFbRoomWin);
        ViewManager.ins().close(TeamFbResultWin);
        if (GameMap.fbType == UserFb.FB_TEAM) {
            ViewManager.ins().open(TeamFbFightWin);
        }
        else {
            ViewManager.ins().close(TeamFbFightWin);
        }
    };
    UserFb.prototype.getFbDataById = function (id) {
        return this.fbModel[id];
    };
    UserFb.prototype.autoPk = function () {
        if (!GameMap.sceneInMain())
            return;
        if (Encounter.ins().isEncounter()) {
            UserTips.ins().showTips("|C:0xf3311e&T:正在挑战附近的人|");
            return;
        }
        if (!EntityManager.ins().getNoDieRole()) {
            return;
        }
        RoleAI.ins().stop();
        RoleAI.ins().clearAIList();
        this.postPlayWarm(1);
        UserFb.ins().sendPKBoss();
        UserFb.ins().pkGqboss = true;
    };
    UserFb.prototype.postAddEnergy = function () {
        this.currentEnergy += Math.ceil(this.waveEnergy / this.waveMonsterCount);
        if (this.currentEnergy > UserFb.ins().energy) {
            this.currentEnergy = UserFb.ins().energy;
        }
    };
    UserFb.prototype.postPlayWarm = function (num) {
        return num;
    };
    UserFb.prototype.hasCount = function () {
        if (GlobalConfig.DailyFubenConfig) {
            for (var key in GlobalConfig.DailyFubenConfig) {
                var cfg = GlobalConfig.DailyFubenConfig[key];
                var mo = this.fbModel[cfg.id];
                if (!mo || cfg.bossId) {
                    continue;
                }
                var count = this.fbModel[mo.fbID].getCount();
                if (count > 0) {
                    return true;
                }
                if (DieGuide.ins().dieFbRedPoint(this.fbModel[mo.fbID].getResetCount(), cfg.id))
                    return true;
            }
        }
        return false;
    };
    UserFb.prototype.doRoleAllDie = function (bytes) {
        ResultManager.ins().create(GameMap.fbType, 0);
    };
    UserFb.prototype.postFbInfoInit = function (bytes) {
        var count = bytes.readShort();
        var fbModel;
        for (var i = 0; i < count; i++) {
            fbModel = new FbModel();
            fbModel.parser(bytes);
            this.fbModel[fbModel.fbID] = fbModel;
        }
    };
    UserFb.prototype.sendCallBossPlay = function (id) {
        var bytes = this.getBytes(12);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    UserFb.prototype.sendChallenge = function (fbID) {
        var bytes = this.getBytes(10);
        bytes.writeInt(fbID);
        this.sendToServer(bytes);
    };
    UserFb.prototype.postUpDataInfo = function (bytes) {
        var fbID = bytes.readInt();
        bytes.position -= 4;
        this.fbModel[fbID].parser(bytes);
    };
    UserFb.prototype.sendAddCount = function (fbID, isDouble) {
        if (isDouble === void 0) { isDouble = 0; }
        var bytes = this.getBytes(11);
        bytes.writeInt(fbID);
        bytes.writeByte(isDouble);
        this.sendToServer(bytes);
    };
    UserFb.prototype.postFbTime = function (bytes) {
        this.curFbID = bytes.readInt();
        this.curFbLeftTime = bytes.readInt();
        return [this.curFbID, this.curFbLeftTime];
    };
    UserFb.prototype.doBossBoxNum = function (bytes) {
        this.bossCallNum = bytes.readShort();
    };
    UserFb.prototype.postFbExpInfo = function (bytes) {
        this.fbExp = this.fbExp || {};
        this.fbExp.useTime = bytes.readByte();
        this.fbExp.sdTime = bytes.readByte();
        this.fbExp.cid = bytes.readByte();
        this.fbExp.sid = bytes.readByte();
        return this.fbExp;
    };
    UserFb.prototype.postFbExpTotal = function (bytes) {
        this.fbExpTotal = bytes.readInt();
        return this.fbExpTotal;
    };
    UserFb.prototype.fbExpRed = function () {
        if (Actor.level >= GlobalConfig.ExpFubenBaseConfig.openLv) {
            if (this.fbExp.useTime < (GlobalConfig.ExpFubenBaseConfig.freeCount + (GlobalConfig.ExpFubenBaseConfig.vipCount[UserVip.ins().lv] || 0)) || this.fbExp.cid || this.fbExp.sid) {
                return true;
            }
        }
        return false;
    };
    UserFb.prototype.sendIntoGuideFb = function (fbId) {
        var bytes = this.getBytes(18);
        bytes.writeInt(fbId);
        this.sendToServer(bytes);
    };
    UserFb.prototype.sendGuideFbAttacker = function () {
        this.sendBaseProto(19);
    };
    UserFb.prototype.sendGuideFbAlive = function () {
        this.sendBaseProto(20);
    };
    UserFb.prototype.doGuideFbAliveTime = function (bytes) {
        UserBoss.ins().postRemainTime(bytes);
    };
    UserFb.prototype.postFbRingInfo = function (bytes) {
        this.fbRings.buyTime = bytes.readShort();
        this.fbRings.challengeTime = bytes.readShort();
        this.fbRings.canTakeAward = bytes.readBoolean();
    };
    UserFb.prototype.sendRingSweep = function (count) {
        var bytes = this.getBytes(41);
        bytes.writeShort(count);
        this.sendToServer(bytes);
    };
    UserFb.prototype.sendShSweep = function (count) {
        var bytes = this.getBytes(42);
        bytes.writeByte(count);
        this.sendToServer(bytes);
    };
    UserFb.prototype.parser = function (bytes) {
        var idIndex = bytes.readInt();
        this.guanqiaID = idIndex;
        if (this.firstAutoGuilder && this.guanqiaID == UserFb.AUTO_GUANQIA) {
            this.firstAutoGuilder = false;
            UserFb.ins().setAutoPk2();
        }
    };
    UserFb.prototype.parser1 = function (bytes) {
        this.exp = bytes.readInt();
        var count = bytes.readInt();
        for (var i = 0; i < count; i++) {
            var item = new WaveDropData();
            item.parser(bytes);
            this.rewards.push(item);
        }
    };
    Object.defineProperty(UserFb.prototype, "guanqiaID", {
        get: function () {
            return this._guanqiaID;
        },
        set: function (value) {
            if (this._guanqiaID != value) {
                this._guanqiaID = value;
                this.bossIsChallenged = false;
                for (var i in GlobalConfig.WorldRewardConfig) {
                    if (this._guanqiaID <= GlobalConfig.WorldRewardConfig[i].needLevel) {
                        this._groupID = GlobalConfig.WorldRewardConfig[i].groupId;
                        break;
                    }
                }
                this.postGuanKaIdChange();
            }
            this.encounterPos = [];
            for (var k in this.zyPos) {
                this.encounterPos.push(parseInt(k));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserFb.prototype, "groupID", {
        get: function () {
            return this._groupID;
        },
        enumerable: true,
        configurable: true
    });
    UserFb.prototype.isReceiveBox = function (pass) {
        return this.worldGuanQias.indexOf(pass) != -1;
    };
    UserFb.prototype.isGetReceiveBox = function (pass) {
        return this.worldGuanQiaHasReceive.indexOf(pass) != -1;
    };
    UserFb.prototype.isShowBossPK = function () {
        return this.guanqiaID != -1;
    };
    UserFb.prototype.getRewardsPop = function () {
        return this.rewards;
    };
    UserFb.prototype.getMapReward = function () {
        var index = 1;
        while (GlobalConfig.WorldRewardConfig[index]) {
            if (!this.isGetReceiveBox(index) && GlobalConfig.WorldRewardConfig[index].needLevel < UserFb.ins().guanqiaID) {
                this.sendGuanqiaWroldReward(index);
                return;
            }
            index++;
        }
    };
    UserFb.prototype.getCurrentReward = function () {
        var index = 1;
        while (GlobalConfig.WorldRewardConfig[index]) {
            var config = GlobalConfig.WorldRewardConfig[index];
            var result = this.isGetReceiveBox(index);
            var id = UserFb.ins().guanqiaID;
            if (!this.isGetReceiveBox(index) && UserFb.ins().guanqiaID > config.needLevel) {
                return config.rewards;
            }
            index++;
        }
        return null;
    };
    UserFb.prototype.getNextReward = function () {
        var index = 1;
        while (GlobalConfig.WorldRewardConfig[index]) {
            var config = GlobalConfig.WorldRewardConfig[index];
            if (UserFb.ins().guanqiaID <= config.needLevel) {
                return config.rewards;
            }
            index++;
        }
        return null;
    };
    UserFb.prototype.getNextNeedChapter = function () {
        var index = 1;
        while (GlobalConfig.WorldRewardConfig[index]) {
            var config = GlobalConfig.WorldRewardConfig[index];
            if (UserFb.ins().guanqiaID <= config.needLevel) {
                return config.needLevel - UserFb.ins().guanqiaID + 1;
            }
            index++;
        }
        return 0;
    };
    UserFb.prototype.getDiffChapter = function () {
        var index = 1;
        while (GlobalConfig.WorldRewardConfig[index]) {
            var config = GlobalConfig.WorldRewardConfig[index];
            if (UserFb.ins().guanqiaID <= config.needLevel) {
                var preconfig = GlobalConfig.WorldRewardConfig[index - 1];
                return config.needLevel - preconfig.needLevel;
            }
            index++;
        }
        return 0;
    };
    UserFb.prototype.getNewChapter = function () {
        var index = 1;
        while (GlobalConfig.WorldRewardConfig[index]) {
            var config = GlobalConfig.WorldRewardConfig[index];
            if (UserFb.ins().guanqiaID <= config.needLevel) {
                var idx = index - 1;
                idx = idx ? idx : 1;
                return GlobalConfig.WorldRewardConfig[idx];
            }
            index++;
        }
        return null;
    };
    UserFb.prototype.getChipByGuanQia = function () {
        for (var k in GlobalConfig.WorldRewardConfig) {
            var config = GlobalConfig.WorldRewardConfig[k];
            if (this.guanqiaID <= config.needLevel)
                return config.rewards[0].id;
        }
        return 0;
    };
    UserFb.prototype.postGuanqiaInfo = function (bytes) {
        var lastID = this.guanqiaID;
        this.parser(bytes);
        this.goldEffLast = bytes.readInt();
        this.expEffLast = bytes.readInt();
        this.fbConfig = JSON.parse(bytes.readString());
        if (lastID != -1 && this.guanqiaID != lastID) {
            this.currentEnergy = 0;
            ViewManager.ins().open(EffectivenessTip);
        }
        this.guanqiaMonster = JSON.parse(bytes.readString());
        if (GameMap.fubenID == 0)
            GameLogic.ins().createGuanqiaMonster();
    };
    UserFb.prototype.postGuanKaIdChange = function () {
    };
    UserFb.prototype.sendGetReward = function (isElite) {
        var bytes = this.getBytes(1);
        bytes.writeByte(isElite ? 1 : 0);
        this.sendToServer(bytes);
    };
    UserFb.prototype.sendPKBoss = function () {
        var _this = this;
        var bytes = this.getBytes(2);
        var char = EntityManager.ins().getNoDieRole();
        TimerManager.ins().doTimer(500, 1, function () {
            bytes.writeInt(Math.floor(char.x));
            bytes.writeInt(Math.floor(char.y));
            _this.sendToServer(bytes);
        }, this);
    };
    UserFb.prototype.doWaveData = function (bytes) {
        this.exp = bytes.readInt();
        var count = bytes.readInt();
        var awards = [];
        for (var i = 0; i < count; i++) {
            var item = new WaveDropData();
            item.parser(bytes);
            awards.push(item);
        }
        var isElite = bytes.readByte();
        if (isElite > 0) {
            this.eliteRewards.push(awards);
            if (this.eliteRewards.length > 5)
                this.eliteRewards.shift();
            GameLogic.ins().createGuanqiaMonster(false, true);
        }
        else {
            this.rewards = this.rewards.concat(awards);
        }
    };
    UserFb.prototype.doBossResult = function (bytes) {
        var _this = this;
        var result = bytes.readBoolean();
        var fbType = bytes.readShort();
        var count = bytes.readShort();
        var reward;
        var rewards = [];
        for (var i = 0; i < count; i++) {
            reward = new RewardData();
            reward.parser(bytes);
            rewards.push(reward);
        }
        if (result) {
            var len = SubRoles.ins().subRolesLen;
            var role = void 0;
            for (var k = 0; k < len; k++) {
                role = EntityManager.ins().getMainRole(k);
                if (role) {
                    role.resetStand();
                }
            }
            for (var j = 0; j < rewards.length; j++) {
                reward = rewards[j];
                if (reward.type == 0 && reward.id != 1 && reward.id != 2 && reward.id != MoneyConst.rune) {
                }
                else if (fbType == UserFb.FB_TYPE_GUARD_WEAPON) {
                }
                else {
                    DropHelp.addDrop([DropHelp.tempDropPoint.x != 0 ? DropHelp.tempDropPoint.x : Math.floor(EntityManager.ins().getNoDieRole().x / GameMap.CELL_SIZE),
                        DropHelp.tempDropPoint.y != 0 ? DropHelp.tempDropPoint.y : Math.floor(EntityManager.ins().getNoDieRole().y / GameMap.CELL_SIZE),
                        reward]);
                }
                if (reward.type == 1) {
                    var conf = GlobalConfig.ItemConfig[reward.id];
                    var type = ItemConfig.getType(conf);
                    if (type == 7) {
                        var itemData = new ItemData();
                        itemData.configID = reward.id;
                        UserTips.ins().showGoodEquipTips(itemData);
                    }
                }
            }
            var f = function () {
                if (GameMap.fbType != UserFb.FB_TYPE_EXP) {
                    _this.sendGetBossReward();
                }
                var f2 = null;
                if ((fbType == UserFb.FB_TYPE_TIAOZHAN && SkyLevelModel.ins().getIsopenNext) || GameMap.fbType == UserFb.FB_TYPE_PERSONAL) {
                    f2 = function () {
                        UserFb.ins().pkGqboss = false;
                        if (GameMap.fbType == UserFb.FB_TYPE_PERSONAL) {
                            ViewManager.ins().open(BossWin, 0);
                        }
                        else {
                            if (UserFb.ins().isQuite) {
                                ViewManager.ins().open(FbWin, 2);
                            }
                        }
                    };
                }
                if (fbType == UserFb.FB_TYPE_GUIDEBOSS && GameMap.fubenID == 40000) {
                    var isBelong = UserFb.ins().guideBossKill;
                    var belongName = void 0, job = void 0, sex = void 0, belongImg = void 0;
                    if (isBelong) {
                        belongName = Actor.myName;
                        job = SubRoles.ins().roles[0].job;
                        sex = SubRoles.ins().roles[0].sex;
                    }
                    else {
                        belongName = UserFb.ins().guideBossPlayerName;
                        job = UserFb.ins().guideBossPlayerJob;
                        sex = UserFb.ins().guideBossPlayerSex;
                    }
                    belongImg = "yuanhead" + job + sex;
                    ResultManager.ins().create(fbType, true, rewards, "", null, [isBelong, belongName, belongImg]);
                }
                else if (GameMap.fbType == UserFb.FB_TYPE_EXP) {
                    TimerManager.ins().doTimer(800, 1, function () {
                        ViewManager.ins().open(ExpFbResultWin);
                    }, _this);
                }
                else if (GameMap.fbType == UserFb.FB_TYPE_LIEYAN) {
                    TimerManager.ins().doTimer(800, 1, function () {
                        ViewManager.ins().open(FireResultWin);
                    }, _this);
                }
                else if (GameMap.fbType == UserFb.FB_TYPE_MIJING || GameMap.fbType == UserFb.FB_TYPE_LABA) {
                }
                else if (fbType != UserFb.FB_TYPE_GUANQIABOSS) {
                    if (rewards.length) {
                        TimerManager.ins().doTimer(800, 1, function () {
                            ResultManager.ins().create(fbType, 1, rewards, "获得奖励如下：", f2);
                        }, _this);
                    }
                    else {
                        UserFb.ins().pkGqboss = false;
                        UserFb.ins().sendExitFb();
                    }
                }
                else {
                    if (_this.outPos.x && _this.outPos.y) {
                        var posX = _this.outPos.x * GameMap.CELL_SIZE;
                        var posY = _this.outPos.y * GameMap.CELL_SIZE;
                        if (_this.outPos.hasOwnProperty("a") && _this.outPos.a == 1)
                            GameLogic.ins().addOutEff(posX, posY);
                        var len_1 = SubRoles.ins().subRolesLen;
                        var char = void 0;
                        for (var i = 0; i < len_1; i++) {
                            char = EntityManager.ins().getMainRole(i);
                            if (char)
                                GameMap.moveEntity(char, posX, posY);
                        }
                        TimerManager.ins().doTimer(1000, 0, _this.tempFunc, _this);
                    }
                    else {
                        _this.initPos = true;
                        UserFb.ins().pkGqboss = false;
                        UserFb.ins().sendExitFb();
                    }
                }
            };
            DropHelp.addCompleteFunc(f, this);
            DropHelp.start();
        }
        else {
            UserFb.ins().pkGqboss = false;
            if (GameMap.fbType == UserFb.FB_TYPE_GUANQIABOSS) {
                PlayFun.ins().closeAuto();
            }
            ResultManager.ins().create(fbType, 0);
        }
        if (GameMap.fbType == UserFb.FB_TYPE_GUANQIABOSS) {
            Hint.ins().postKillBossEx(UserFb.ins().guanqiaID);
        }
    };
    UserFb.prototype.tempFunc = function () {
        var char = EntityManager.ins().getNoDieRole();
        if (!char) {
            TimerManager.ins().remove(this.tempFunc, this);
            return;
        }
        var x_Grid = Math.floor(char.x / GameMap.CELL_SIZE);
        var y_Grid = Math.floor(char.y / GameMap.CELL_SIZE);
        var out_X_Grid = this.outPos.x;
        var out_Y_Grid = this.outPos.y;
        if (x_Grid == out_X_Grid && y_Grid == out_Y_Grid) {
            TimerManager.ins().remove(this.tempFunc, this);
            GameLogic.ins().removeOutEff();
            this.initPos = false;
            UserFb.ins().pkGqboss = false;
            UserFb.ins().sendExitFb();
            Hint.ins().postSeceneIn();
        }
    };
    UserFb.prototype.sendGetBossReward = function () {
        this.sendBaseProto(3);
    };
    UserFb.prototype.sendExitFb = function () {
        this.sendBaseProto(4);
    };
    UserFb.prototype.sendGetAward = function () {
        this.sendBaseProto(5);
    };
    UserFb.prototype.doGuanqiaReward = function (bytes) {
        this.guanqiaReward = bytes.readShort() + 1;
        this.postZhangJieAwardChange();
        this.postGuanKaIdChange();
        this.postGuanqiaWroldReward();
    };
    UserFb.prototype.postZhangJieAwardChange = function () {
    };
    UserFb.prototype.sendGuanqiaWroldReward = function (pass) {
        var bytes = this.getBytes(6);
        bytes.writeInt(pass);
        this.sendToServer(bytes);
    };
    UserFb.prototype.doGuanqiaWroldReward = function (bytes) {
        var len = bytes.readInt();
        var isReceive = 0;
        var pass = 0;
        this.worldGuanQias = [];
        this.worldGuanQiaHasReceive = [];
        for (var i = 0; i < len; i++) {
            isReceive = bytes.readInt();
            pass = i + 1;
            if (isReceive == 0) {
                this.worldGuanQias.push(pass);
            }
            else if (isReceive == 1) {
                this.worldGuanQiaHasReceive.push(pass);
            }
            if (isReceive == 0 || isReceive == 1) {
                this.worldReward = pass;
            }
        }
        this.postGuanqiaWroldReward();
    };
    UserFb.prototype.postGuanqiaWroldReward = function () {
    };
    UserFb.prototype.doOfflineReward = function (bytes) {
        var arr = [];
        arr[0] = bytes.readInt();
        arr[1] = bytes.readInt();
        arr[2] = bytes.readInt();
        arr[3] = bytes.readInt();
        arr[4] = bytes.readInt();
        var len = bytes.readInt();
        var aryObj = [];
        for (var i = 0; i < len; i++) {
            var obj = new Object();
            obj["type"] = bytes.readInt();
            obj["exp"] = bytes.readInt();
            obj["gold"] = bytes.readInt();
            aryObj.push(obj);
        }
        arr[5] = aryObj;
        len = bytes.readByte();
        var coin = [];
        for (var i = 0; i < len; i++) {
            var tmp = {};
            tmp.id = bytes.readByte();
            tmp.count = bytes.readInt();
            coin.push(tmp);
        }
        ViewManager.ins().open(OfflineRewardWin, arr, coin);
    };
    UserFb.prototype.getWorldGuanQia = function () {
        if (this.worldGuanQias.length > 0)
            return this.worldGuanQias[this.worldGuanQias.length - 1];
        else
            return 0;
    };
    UserFb.prototype.getWorldGuanQiaBox = function () {
        var len = this.worldGuanQias.length;
        if (len > 0) {
            var index = void 0;
            for (var i = 0; i < len; i++) {
                index = this.worldGuanQias[i];
                if (UserFb.ins().isReceiveBox(index))
                    return index;
            }
        }
        return this.worldReward + 1;
    };
    UserFb.prototype.sendKillMonster = function (id) {
        var bytes = this.getBytes(13);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    UserFb.prototype.sendChallengeExpFb = function () {
        this.sendBaseProto(14);
    };
    UserFb.prototype.sendSaodang = function () {
        var bytes = this.getBytes(15);
        this.sendToServer(bytes);
    };
    UserFb.prototype.sendGetAwardMul = function (type, mul) {
        var bytes = this.getBytes(16);
        bytes.writeByte(type);
        bytes.writeByte(mul);
        this.sendToServer(bytes);
    };
    UserFb.prototype.sendChallengeFbRing = function () {
        this.sendBaseProto(22);
    };
    UserFb.prototype.sendFbRingTakeAward = function (mul) {
        var bytes = this.getBytes(23);
        bytes.writeShort(mul);
        this.sendToServer(bytes);
    };
    UserFb.prototype.checkGuanqiaIconShow = function () {
        return OpenSystem.ins().checkSysOpen(SystemType.CHALLENGE);
    };
    UserFb.prototype.postExpFly = function (globalPoint, count, delay) {
        if (count === void 0) { count = 1; }
        if (delay === void 0) { delay = 10; }
        return [globalPoint, count, delay];
    };
    UserFb.prototype.getExpFbId = function () {
        var config = GlobalConfig.ExpFubenConfig;
        var lv = Actor.level;
        var _id = 0;
        for (var id in config) {
            if (config[id].slv > lv) {
                break;
            }
            _id = +id;
        }
        return _id;
    };
    UserFb.prototype.checkInFB = function () {
        if (GameMap.fbType == UserFb.FB_TYPE_GUANQIABOSS || UserFb.ins().pkGqboss) {
            UserTips.ins().showCenterTips("|C:0xf3311e&T:\u5F53\u524D\u6B63\u5728\u6311\u6218\u5173\u5361\u4E2D|");
            return true;
        }
        if (GameMap.fubenID != 0 && !CityCC.ins().isCity) {
            UserTips.ins().showCenterTips("|C:0xf3311e&T:正在挑战副本中，请稍后再试|");
            return true;
        }
        return false;
    };
    UserFb.prototype.createMonster = function (id) {
        var config = this.guanqiaMonster[id];
        var model = UserFb.createModel(config);
        model.name = config.name;
        model._avatar = +config.avatar;
        model._scale = config.scale;
        model.wanderrange = config['wanderrange'];
        model.wandertime = config['wandertime'];
        model.effect = config.effect;
        model._dirNum = config.dirNum;
        return model;
    };
    UserFb.createModel = function (config) {
        var model = new EntityModel;
        model.type = EntityType.Monster;
        model.configID = config.id;
        model.setAtt(AttributeType.atHp, config.hp);
        model.setAtt(AttributeType.atMaxHp, config.hp);
        model.setAtt(AttributeType.atAttack, config.atk);
        model.setAtt(AttributeType.atDef, config.def);
        model.setAtt(AttributeType.atRes, config.res);
        model.setAtt(AttributeType.atCrit, config['crit']);
        model.setAtt(AttributeType.atTough, config['tough']);
        model.setAtt(AttributeType.atMoveSpeed, config['ms'] || 1000);
        model.setAtt(AttributeType.atAttackSpeed, config['as'] || 1000);
        model.setAtt(AttributeType.atPenetrate, config['penetRate'] || 0);
        return model;
    };
    UserFb.getPersonalBossFbIds = function () {
        var result = [];
        for (var i in GlobalConfig.DailyFubenConfig) {
            var c = GlobalConfig.DailyFubenConfig[i];
            if (c && c.bossId)
                result.push(c);
        }
        return result;
    };
    UserFb.isCanChallenge = function () {
        var datas = this.getPersonalBossFbIds();
        var len = datas.length;
        var data;
        var sCount;
        for (var i = 0; i < len; i++) {
            data = datas[i];
            if (!UserFb.ins().getFbDataById(data.id))
                continue;
            sCount = UserFb.ins().getFbDataById(data.id).getCount();
            if (sCount > 0) {
                if (data.monthcard) {
                    if (Recharge.ins().monthDay > 0) {
                        return true;
                    }
                }
                else if (data.privilege) {
                    if (Recharge.ins().getIsForeve()) {
                        return true;
                    }
                }
                else if (data.specialCard) {
                    if (Recharge.ins().franchise) {
                        return true;
                    }
                }
                else {
                    if (data.zsLevel > 0) {
                        if (UserZs.ins().lv >= data.zsLevel)
                            return true;
                    }
                    else {
                        if (Actor.level >= data.levelLimit)
                            return true;
                    }
                }
            }
        }
        return false;
    };
    UserFb.prototype.setAutoPk = function () {
        if (this.showAutoPk == -1) {
            this.showAutoPk = 0;
            this.postAutoPk();
        }
    };
    UserFb.prototype.postAutoPk = function () {
    };
    UserFb.prototype.setAutoPk2 = function () {
        if (this.showAutoPk2 == -1) {
            this.showAutoPk2 = 0;
            this.postAutoPk2();
        }
    };
    UserFb.prototype.postAutoPk2 = function () {
    };
    UserFb.prototype.sendCreateTFRoom = function () {
        var bytes = this.getBytes(30);
        this.sendToServer(bytes);
    };
    UserFb.prototype.postCreateTFRoomSuccess = function (bytes) {
        this.tfRoomID = bytes.readInt();
        var cfgID = bytes.readInt();
        if (this.tfRoomID)
            ViewManager.ins().open(TeamFbRoomWin, 1, cfgID, this.tfRoomID);
        else
            ViewManager.ins().close(TeamFbRoomWin);
    };
    UserFb.prototype.sendEnterTFRoom = function (id) {
        var bytes = this.getBytes(31);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    UserFb.prototype.postEnterTFRoomSuccess = function (bytes) {
        switch (bytes.readByte()) {
            case 0:
                var cfgID = bytes.readInt();
                this.tfRoomID = bytes.readInt();
                ViewManager.ins().open(TeamFbRoomWin, 1, cfgID, this.tfRoomID);
                break;
            case 1:
                UserTips.ins().showTips("\u6BCF\u5468" + DateUtils.WEEK_CN[GlobalConfig.TeamFuBenBaseConfig.closeTime[0]] + GlobalConfig.TeamFuBenBaseConfig.closeTime[1] + "\u540E\u4E0D\u80FD\u6311\u6218");
                break;
            case 2:
                UserTips.ins().showTips("在副本内不能进入");
                break;
            case 3:
                UserTips.ins().showTips("已经在别的房间");
                break;
            case 4:
                UserTips.ins().showTips("要进入的房间不存在");
                break;
            case 5:
                UserTips.ins().showTips("当前通关的层级不够");
                break;
            case 6:
                UserTips.ins().showTips("配置错误,不存在该房间配置");
                break;
            case 7:
                UserTips.ins().showTips("房间已经满人");
                break;
        }
    };
    UserFb.prototype.sendExitTFRoom = function () {
        this.sendBaseProto(32);
    };
    UserFb.prototype.exitTFRoom = function (bytes) {
        switch (bytes.readByte()) {
            case 1:
                break;
            case 2:
                UserTips.ins().showTips("\u60A8\u88AB\u961F\u957F\u8E22\u51FA\u623F\u95F4");
                break;
            case 3:
                UserTips.ins().showTips("\u961F\u957F\u89E3\u6563\u4E86\u623F\u95F4");
                break;
        }
        ViewManager.ins().close(TeamFbRoomWin);
        this.tfRoomID = 0;
    };
    UserFb.prototype.sendBeginTF = function () {
        this.sendBaseProto(33);
    };
    UserFb.prototype.postFTRoomChange = function (bytes) {
        this.tfRoomID = bytes.readInt();
        var len = bytes.readByte();
        if (!this.tfMembers)
            this.tfMembers = [];
        this.tfMembers.length = len;
        this.isTFCaptain = false;
        var vo;
        for (var i = 0; i < len; i++) {
            vo = this.tfMembers[i];
            if (!vo) {
                vo = new TeamFuBenRoleVo();
                this.tfMembers[i] = vo;
            }
            vo.parse(bytes);
            if (vo.roleID == Actor.actorID && vo.position == 1)
                this.isTFCaptain = true;
        }
    };
    UserFb.prototype.sendOutTFRoom = function (id) {
        var bytes = this.getBytes(34);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    UserFb.prototype.sendExitTFFb = function (type) {
        var bytes = this.getBytes(35);
        bytes.writeByte(type);
        this.sendToServer(bytes);
    };
    UserFb.prototype.postFTRoomPassInfo = function (bytes) {
        this.tfPassID = bytes.readInt();
        this._tfInviteTime = bytes.readInt();
    };
    UserFb.prototype.getTfInviteCD = function () {
        return Math.floor((this._tfInviteTime * 1000 + DateUtils.SECOND_2010 * 1000 - GameServer.serverTime) / 1000);
    };
    UserFb.prototype.isTeamFBOpen = function () {
        return UserZs.ins().lv >= GlobalConfig.TeamFuBenBaseConfig.needZsLv && (GameServer.serverOpenDay + 1) >= GlobalConfig.TeamFuBenBaseConfig.openDay;
    };
    UserFb.prototype.doTeamFuBenEnd = function (bytes) {
        var id = bytes.readInt();
        var result = bytes.readByte();
        var len = bytes.readByte();
        var list = [];
        list.length = len;
        var vo;
        for (var i = 0; i < len; i++) {
            vo = new TeamFuBenRoleVo();
            list[i] = vo;
            vo.roleID = bytes.readInt();
            vo.position = bytes.readByte();
            vo.roleName = bytes.readString();
            vo.job = bytes.readByte();
            vo.sex = bytes.readByte();
        }
        ViewManager.ins().open(TeamFbResultWin, id, result, list);
    };
    UserFb.prototype.doTeamFuBenRelive = function (bytes) {
        UserBoss.ins().killerHandler = bytes.readDouble();
        UserBoss.ins().reliveTime = bytes.readInt();
        if (UserBoss.ins().reliveTime > 0) {
            UserBoss.ins().clearWorldBossList();
            ViewManager.ins().open(WorldBossBeKillWin);
        }
        else
            ViewManager.ins().close(WorldBossBeKillWin);
    };
    UserFb.prototype.sendTFRank = function () {
        this.sendBaseProto(36);
    };
    UserFb.prototype.postTeamFuBenRank = function (bytes) {
        this.tfPassRanks = [];
        var len = bytes.readByte();
        var vo;
        var subLen;
        for (var i = 0; i < len; i++) {
            vo = { configID: bytes.readInt(), members: [] };
            subLen = bytes.readByte();
            for (var j = 0; j < subLen; j++)
                vo.members.push({ position: bytes.readByte(), roleName: bytes.readString() });
            this.tfPassRanks.push(vo);
        }
    };
    UserFb.prototype.sendTfFlower = function (id, count) {
        var bytes = this.getBytes(37);
        bytes.writeInt(id);
        bytes.writeInt(count);
        this.sendToServer(bytes);
    };
    UserFb.prototype.postTeamFbFlowarRecords = function (bytes) {
        var len = bytes.readInt();
        if (!this.tfFlowerRecords)
            this.tfFlowerRecords = [];
        for (var i = 0; i < len; i++)
            this.tfFlowerRecords.push({ roleName: bytes.readString(), count: bytes.readInt() });
        while (this.tfFlowerRecords.length > 10)
            this.tfFlowerRecords.shift();
    };
    UserFb.prototype.clearTfFlowerRecords = function () {
        this.tfFlowerRecords = [];
    };
    UserFb.prototype.sendTfSysInvite = function (des) {
        var bytes = this.getBytes(38);
        bytes.writeString(des);
        this.sendToServer(bytes);
    };
    UserFb.prototype.teamFbSysInviteInfo = function (bytes) {
        Chat.ins().postSysChatMsg(new ChatSystemData(3, bytes.readString()));
    };
    UserFb.prototype.checkTFRed = function () {
        if (!this.isTeamFBOpen())
            return false;
        return this.showTfRed;
    };
    UserFb.prototype.postShowRedChange = function (value) {
        this.showTfRed = value;
    };
    UserFb.prototype.sendGuardWeaponLogs = function () {
        this.sendBaseProto(40);
    };
    UserFb.prototype.postGuardWeaponLogs = function (bytes) {
        var len = bytes.readByte();
        var arr = [];
        for (var i = 0; i < len; i++) {
            var noticeId = bytes.readInt();
            var roleName = bytes.readString();
            var monsterName = bytes.readString();
            var itemName = bytes.readString();
            arr.push({ noticeId: noticeId, roleName: roleName, monsterName: monsterName, itemName: itemName });
        }
        return arr;
    };
    UserFb.FB_TYPE_GUANQIABOSS = 1;
    UserFb.FB_TYPE_CITY = 20;
    UserFb.FB_TYPE_TIAOZHAN = 9;
    UserFb.FB_TYPE_ZHUANSHENGBOSS = 10;
    UserFb.FB_TYPE_ALLHUMENBOSS = 7;
    UserFb.FB_TYPE_PERSONAL = 6;
    UserFb.FB_TYPE_HOMEBOSS = 17;
    UserFb.FB_TYPE_MATERIAL = 2;
    UserFb.FB_TYPE_EXP = 16;
    UserFb.FB_TYPE_GUILD_BOSS = 15;
    UserFb.FB_TYPE_GUILD_WAR = 14;
    UserFb.FB_TYPE_MIJING = 21;
    UserFb.FB_ID_JINGYAN = 3005;
    UserFb.FB_ID_MINE = 99999;
    UserFb.FB_TYPE_GUIDEBOSS = 18;
    UserFb.FB_TYPE_NEW_WORLD_BOSS = 19;
    UserFb.FB_TYPE_LIEYAN = 23;
    UserFb.FB_TYPE_GOD_WEAPON = 26;
    UserFb.FB_TYPE_GOD_WEAPON_TOP = 27;
    UserFb.FB_TYPE_PEAKED = 30;
    UserFb.FB_TYPE_DARK_BOSS = 36;
    UserFb.FB_TYPE_HIDE_BOSS = 37;
    UserFb.FB_TYPE_HUN_SHOU = 38;
    UserFb.FB_TEAM = 35;
    UserFb.FB_TYPE_FIRE_RING = 24;
    UserFb.FB_TYPE_PEAK = 30;
    UserFb.FB_TYPE_GUARD_WEAPON = 29;
    UserFb.FB_TYPE_LABA = 31;
    UserFb.FB_TYPE_KF_BOSS = 32;
    UserFb.FB_TYPE_DEVILDOM_BOSS = 39;
    UserFb.FB_TYPE_KF_ARENA = 40;
    UserFb.AUTO_GUANQIA = 20;
    UserFb.TEAM_FB_WIN_REFLASH_PANEL = "TEAM_FB_WIN_REFLASH_PANEL";
    UserFb.TF_SIMLPE_HEIGHT = 149;
    UserFb.TF_EXPAND_HEIGHT = 298;
    return UserFb;
}(BaseSystem));
__reflect(UserFb.prototype, "UserFb");
var GameSystem;
(function (GameSystem) {
    GameSystem.userfb = UserFb.ins.bind(UserFb);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=UserFb.js.map