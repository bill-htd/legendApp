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
var UserBoss = (function (_super) {
    __extends(UserBoss, _super);
    function UserBoss() {
        var _this = _super.call(this) || this;
        _this.worldBossLeftTime = [];
        _this.worldChallengeTime = [];
        _this.worldBossCd = [];
        _this.worldBossLastWinner = [];
        _this.worldBossrestoreTime = [];
        _this.worldBossBelongTime = [];
        _this.curShield = 0;
        _this.totalShield = 0;
        _this.shieldType = 0;
        _this.worldInfoList = [];
        _this.worldBossPlayList = [];
        _this.rankList = [];
        _this.monsterID = 0;
        _this.hp = 0;
        _this.bossHandler = 0;
        _this.lastBossID = -1;
        _this.rank = [];
        _this.changeAttr = [];
        _this.challengeCount = 0;
        _this.restoreTime = 0;
        _this.toDaySoul = 0;
        _this.cdTime = 0;
        _this.bossRemind = 0;
        _this.bossInfo = [];
        _this.isDoingTimer = false;
        _this.autoClear = [false, false, false];
        _this.ShowTip = true;
        _this.currBossSubType = 0;
        _this.currBossConfigID = 0;
        _this.newWorldBossData = new NewWorldBossData();
        _this.hideBossData = { id: 0, endTime: 0, lastId: 0 };
        _this.worldPrize = 0;
        _this._reliveTime = 0;
        _this.killerHandler = 0;
        _this.winner = "";
        _this.bossAlertList = [];
        _this.publicBossIdDic = [];
        _this.weixieList = [];
        _this.canPlayList = [];
        _this.belongName = "";
        _this.attHandle = 0;
        _this.canClick = true;
        _this.sysId = PackageID.Boss;
        _this.regNetMsg(10, _this.postWorldBoss);
        _this.regNetMsg(11, _this.setShieldPer);
        _this.regNetMsg(14, _this.doClearCD);
        _this.regNetMsg(16, _this.postLottery);
        _this.regNetMsg(17, _this.doLotteryRan);
        _this.regNetMsg(18, _this.doLotteryResult);
        _this.regNetMsg(20, _this.doBossBlood);
        _this.regNetMsg(21, _this.postUpdatePerInfo);
        _this.regNetMsg(7, _this.doBelongChange);
        _this.regNetMsg(23, _this.postAttackList);
        _this.regNetMsg(24, _this.doKillNotice);
        _this.regNetMsg(25, _this.postRemainTime);
        _this.regNetMsg(26, _this.postWorldBossEndTime);
        _this.regNetMsg(27, _this.postWorldNotice);
        _this.regNetMsg(28, _this.postChallageRank);
        _this.regNetMsg(29, _this.doBossChallengeResult);
        _this.regNetMsg(30, _this.doBossSetting);
        _this.regNetMsg(31, _this.postNewBossResult);
        _this.regNetMsg(32, _this.postNewBossInfo);
        _this.regNetMsg(33, _this.postNewBossReliveTime);
        _this.regNetMsg(34, _this.postNewBossOpen);
        _this.regNetMsg(35, _this.postAddAttrNum);
        _this.regNetMsg(36, _this.postNewBossRank);
        _this.regNetMsg(37, _this.postBossDieNotice);
        _this.regNetMsg(38, _this.postBaseHideBossInfo);
        _this.observe(GameLogic.ins().postEnterMap, _this.checkShow);
        _this.observe(GameLogic.ins().postHpChange, _this.checkOpenBossBlood);
        _this.observe(GameLogic.ins().postRemoveEntity, _this.checkRemoveEntity);
        _this.observe(UserZs.ins().postZsLv, _this.postUpdateWorldPlayList);
        _this.observe(Actor.ins().postLevelChange, _this.postUpdateWorldPlayList);
        return _this;
    }
    UserBoss.ins = function () {
        return _super.ins.call(this);
    };
    UserBoss.prototype.initLogin = function () {
        this.init();
    };
    UserBoss.prototype.checkOpenBossBlood = function (_a) {
        var target = _a[0], value = _a[1];
        var monsterID = target.infoModel.configID;
        if (!monsterID || monsterID != this.monsterID)
            return;
        if (GameMap.fbType == UserFb.FB_TYPE_ZHUANSHENGBOSS)
            return;
        if (GameMap.fbType == UserFb.FB_TYPE_ALLHUMENBOSS)
            return;
        if (GameMap.fbType == UserFb.FB_TYPE_HOMEBOSS)
            return;
        if (GameMap.fbType == UserFb.FB_TYPE_LABA)
            return;
        this.hp = value;
        value > 0 ? ViewManager.ins().open(BossBloodPanel) : ViewManager.ins().close(BossBloodPanel);
    };
    UserBoss.prototype.postListData = function () {
    };
    UserBoss.prototype.postHpChange = function () {
    };
    UserBoss.prototype.postBossData = function (isShow, name) {
        if (name === void 0) { name = ""; }
        return [isShow, name];
    };
    UserBoss.prototype.sendWorldBossInfo = function (id) {
        var bytes = this.getBytes(10);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    UserBoss.prototype.postWorldBoss = function (bytes) {
        var type = bytes.readByte();
        var infoList = this.worldInfoList[type] = this.worldInfoList[type] || [];
        this.worldBossPlayList[type] = [];
        this.worldBossrestoreTime[type] = [];
        this.worldBossCd[type] = bytes.readShort() * 1000 + egret.getTimer();
        this.worldBossLeftTime[type] = bytes.readShort();
        var count = bytes.readShort();
        infoList.length = count;
        for (var i = 0; i < count; i++) {
            var bossInfoData = infoList[i] || new WorldBossItemData;
            bossInfoData.parser(bytes);
            infoList[i] = bossInfoData;
        }
        this.worldBossrestoreTime[type] = bytes.readShort() * 1000 + egret.getTimer();
        this.worldChallengeTime[type] = bytes.readShort();
        this.worldBossBelongTime[type] = bytes.readShort();
        this.updateBossPlayList(type);
        if (type == UserBoss.BOSS_SUBTYPE_QMBOSS || type == UserBoss.BOSS_SUBTYPE_SHENYU) {
            AutoChallengeBoss.ins().refBossTimeFun();
        }
        return type;
    };
    UserBoss.prototype.updateBossPlayList = function (type) {
        var tempArr = UserBoss.ins().worldInfoList[type].slice();
        var bossList = this.worldBossPlayList[type];
        for (var k in tempArr) {
            var bossConfig = GlobalConfig.WorldBossConfig[tempArr[k].id];
            if (!bossConfig)
                continue;
            if (type == UserBoss.BOSS_SUBTYPE_QMBOSS) {
                if (UserZs.ins().lv >= bossConfig.zsLevel && Actor.level >= bossConfig.level) {
                    bossList.push(tempArr[k]);
                }
            }
            else if (type == UserBoss.BOSS_SUBTYPE_WORLDBOSS) {
                if (bossConfig.zslook.indexOf(UserZs.ins().lv) != -1 && Actor.level >= bossConfig.level) {
                    bossList.push(tempArr[k]);
                }
            }
            else if (type == UserBoss.BOSS_SUBTYPE_HOMEBOSS) {
                var levelConfig = void 0;
                for (var j in GlobalConfig.BossHomeConfig) {
                    if (GlobalConfig.BossHomeConfig[j].boss.lastIndexOf(tempArr[k].id) != -1) {
                        levelConfig = GlobalConfig.BossHomeConfig[j];
                        break;
                    }
                }
                if (levelConfig && UserVip.ins().lv >= levelConfig.vip && UserZs.ins().lv >= bossConfig.zsLevel && Actor.level >= bossConfig.level) {
                    bossList.push(tempArr[k]);
                }
            }
            else if (type == UserBoss.BOSS_SUBTYPE_SHENYU) {
                if (UserZs.ins().lv >= bossConfig.zsLevel && Actor.level >= bossConfig.level) {
                    bossList.push(tempArr[k]);
                }
            }
            else if (type == UserBoss.BOSS_SUBTYPE_GODWEAPON || type == UserBoss.BOSS_SUBTYPE_GODWEAPON_TOP) {
                if (tempArr[k].canInto)
                    bossList.push(tempArr[k]);
            }
            else if (type == UserBoss.BOSS_SUBTYPE_DARKBOSS) {
                if (tempArr[k].canInto)
                    bossList.push(tempArr[k]);
            }
        }
    };
    UserBoss.prototype.postUpdateWorldPlayList = function () {
        for (var t in this.worldInfoList) {
            var _type = +t;
            this.worldBossPlayList[_type] = [];
            this.updateBossPlayList(_type);
        }
    };
    UserBoss.prototype.setShieldPer = function (bytes) {
        this.shieldType = bytes.readByte();
        this.curShield = bytes.readInt();
        this.totalShield = bytes.readInt();
        var boo = bytes.readByte();
        var showNotice = (this.curShield == this.totalShield);
        if (showNotice) {
            var str = "";
            if (boo) {
                str = "BOSS\u5F00\u542F\u62A4\u76FE\uFF0C\u51FB\u7834\u62A4\u76FE\u5F00\u542F\u62BD\u5956\u83B7\u5F97\u5E78\u8FD0\u5956\u52B1";
                UserTips.ins().showSceneTips(str);
            }
            else {
                str = "BOSS\u5F00\u542F\u62A4\u76FE\uFF0C\u671F\u95F4BOSS\u4E0D\u4F1A\u51CF\u5C11\u8840\u91CF";
                UserTips.ins().showSceneTips(str);
            }
        }
        this.postShieldPer();
    };
    UserBoss.prototype.postShieldPer = function () {
    };
    UserBoss.prototype.sendClearCD = function () {
        if (GameMap.fbType == UserFb.FB_TYPE_GUIDEBOSS) {
            UserFb.ins().sendGuideFbAlive();
        }
        else if (GameMap.fbType == UserFb.FB_TYPE_CITY)
            CityCC.ins().sendRevival();
        else if (GameMap.fubenID == GlobalConfig.CampBattleConfig.fbId)
            BattleCC.ins().sendReLive();
        else if (GameMap.fubenID == GlobalConfig.PassionPointConfig.fbId)
            PaoDianCC.ins().sendReLive();
        else if (GameMap.fbType == UserFb.FB_TYPE_NEW_WORLD_BOSS) {
            this.sendNewBossBuyRelive();
        }
        else {
            this.sendToServer(this.getBytes(14));
        }
    };
    UserBoss.prototype.doClearCD = function (bytes) {
        UserTips.ins().showTips(bytes.readByte() ? '成功清除挑战CD' : 'CD已结束，直接参与挑战');
    };
    UserBoss.prototype.sendChallengWorldBoss = function (id, type) {
        this.currBossSubType = type;
        this.currBossConfigID = id;
        var bytes = this.getBytes(15);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    UserBoss.prototype.postLottery = function (bytes) {
        this.worldPrize = bytes.readInt();
        ViewManager.ins().open(WorldBossJiangLiWin);
    };
    UserBoss.prototype.sendJoinLottery = function () {
        this.sendBaseProto(17);
    };
    UserBoss.prototype.doLotteryRan = function (bytes) {
        var ran = bytes.readShort();
        this.postLotteryRan(ran);
    };
    UserBoss.prototype.postLotteryRan = function (n) {
        return n;
    };
    UserBoss.prototype.sendChallengRank = function (id) {
        this.currBossSubType = id;
        var bytes = this.getBytes(28);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    UserBoss.prototype.doLotteryResult = function (bytes) {
        var name = bytes.readString();
        var ranPoint = bytes.readShort();
        this.postLotteryResult(name, ranPoint);
    };
    UserBoss.prototype.postLotteryResult = function (str, n) {
        return [str, n];
    };
    UserBoss.prototype.doBossBlood = function (bytes) {
        this.monsterID = bytes.readInt();
        this.hp = bytes.readDouble();
        if (this.hp && this.monsterID != this.lastBossID) {
            if (GameMap.fbType != UserFb.FB_TYPE_MATERIAL && GameMap.fbType != UserFb.FB_TYPE_TIAOZHAN && GameMap.fbType != UserFb.FB_TYPE_EXP && GameMap.fbType != UserFb.FB_TYPE_GUIDEBOSS) {
                this.postBossAppear();
            }
        }
        this.lastBossID = this.monsterID;
        if (this.hp <= 0) {
            this.lastBossID = -1;
        }
        this.bossHandler = bytes.readDouble();
        var handler = bytes.readDouble();
        var count = bytes.readShort();
        this.rank.length = count;
        for (var i = 0; i < count; i++) {
            this.rank[i] = this.rank[i] || new WorldBossRankItemData();
            this.rank[i].parser(bytes);
            this.rank[i].rank = i + 1;
        }
        this.postHpChange();
        if (GameMap.fbType != UserFb.FB_TYPE_ZHUANSHENGBOSS
            && GameMap.fbType != UserFb.FB_TYPE_ALLHUMENBOSS
            && GameMap.fbType != UserFb.FB_TYPE_HOMEBOSS
            && GameMap.fbType != UserFb.FB_TYPE_LABA) {
            ViewManager.ins().open(BossBloodPanel);
        }
        if (!this.hp || (this.hp <= 0 && GuildWar.ins().getModel().checkinAppoint(1))) {
            ViewManager.ins().close(BossBloodPanel);
        }
    };
    UserBoss.prototype.postBossAppear = function () {
        return this.monsterID;
    };
    UserBoss.prototype.postBossDisappear = function (entity) {
        this.bossHandler = 0;
        return entity;
    };
    UserBoss.prototype.postUpdatePerInfo = function (bytes) {
        this.worldBossCd[this.currBossSubType] = bytes.readShort() * 1000 + egret.getTimer();
        this.worldBossLeftTime[this.currBossSubType] = bytes.readShort();
        return [this.worldBossCd, this.worldBossLeftTime];
    };
    UserBoss.prototype.doBelongChange = function (bytes) {
        var handle = bytes.readDouble();
        var oldHandle = bytes.readDouble();
        var oldName = bytes.readString();
        this.postBelongChange(handle, oldHandle, oldName);
    };
    UserBoss.prototype.postBelongChange = function (handle, oldHandle, oldName) {
        if (oldHandle === void 0) { oldHandle = 0; }
        if (oldName === void 0) { oldName = ''; }
        UserBoss.ins().changecanPlayList(handle);
        this.attHandle = handle;
        EntityShowMgr.ins().showHideSomeOne(handle);
        if (handle > 0) {
            var belongHandel = EntityManager.ins().getMasterList(handle);
            var belongName = "";
            if (belongHandel && belongHandel[0] && belongHandel[0].infoModel) {
                belongName = belongHandel[0].infoModel.name;
                this.setBelongHPandColor();
            }
            else {
                return;
            }
            var str = "";
            if (handle > 0 && oldHandle > 0) {
                var btname = belongName;
                var strlist = btname.split("\n");
                if (strlist[1])
                    btname = strlist[1];
                else
                    btname = strlist[0];
                var tname = oldName;
                strlist = tname.split("\n");
                if (strlist[1])
                    tname = strlist[1];
                else
                    tname = strlist[0];
                tname = StringUtils.replaceStr(tname, "0xffffff", ColorUtil.ROLENAME_COLOR_GREEN + "");
                str = "|C:" + ColorUtil.ROLENAME_COLOR_GREEN + "&T:" + btname + "|\u51FB\u8D25\u4E86|C:" + ColorUtil.ROLENAME_COLOR_GREEN + "&T:" + tname + "|\uFF0C\u6210\u4E3A\u4E86\u65B0\u7684\u5F52\u5C5E\u8005\u3002";
                UserTips.ins().showSceneTips(str);
            }
            else {
                if (handle > 0 && belongName != "") {
                }
            }
        }
    };
    UserBoss.prototype.postAttackList = function (bytes) {
        var count = bytes.readUnsignedInt();
        this.weixieList = [];
        for (var i = 0; i < count; i++) {
            var handle = bytes.readDouble();
            var masterHandle = EntityManager.ins().getRootMasterHandle(handle);
            UserBoss.ins().changeWeiXieList(masterHandle);
        }
        this.postHasAttackChange(0);
    };
    UserBoss.prototype.doKillNotice = function (bytes) {
        var name = bytes.readString();
        var killNum = bytes.readShort();
        var ID = bytes.readShort();
        var str = GlobalConfig.WorldBossKillMsgConfig[ID].msg;
        str = StringUtils.substitute(str, name, killNum);
        UserTips.ins().showSceneTips(str);
    };
    UserBoss.prototype.postRemainTime = function (bytes) {
        this.reliveTime = bytes.readShort();
        this.killerHandler = bytes.readDouble();
        if (this.reliveTime > 0) {
            this.clearWorldBossList();
        }
    };
    UserBoss.prototype.setBelongHPandColor = function () {
        if (this.attHandle != Actor.handle) {
            var belongHandel = EntityManager.ins().getMasterList(this.attHandle);
            for (var k in belongHandel) {
                if (!(belongHandel[k] instanceof CharRole))
                    continue;
                belongHandel[k].setNameTxtColor(ColorUtil.ROLENAME_COLOR_YELLOW);
            }
        }
    };
    UserBoss.prototype.postWorldBossEndTime = function (bytes) {
        this.winner = bytes.readString();
        var remainTime = 60000;
        if (GwBoss.ins().isGwBoss)
            remainTime = 30000;
        this.worldBossEndTime = egret.getTimer() + remainTime;
        this.clearWorldBossList();
    };
    UserBoss.prototype.postWorldNotice = function (bytes) {
        var type = bytes.readByte();
        var id = bytes.readInt();
        var lv = Actor.level;
        var zslv = UserZs.ins().lv;
        if (type == UserBoss.BOSS_SUBTYPE_QMBOSS) {
            var tempArr = UserBoss.ins().worldInfoList[type];
            for (var k in tempArr) {
                var config = GlobalConfig.WorldBossConfig[id];
                if (tempArr[k].id == id && this.getBossRemindByIndex(id) && zslv >= config.zsLevel && lv >= config.level) {
                    var bossBaseConfig = GlobalConfig.MonstersConfig[config.bossId];
                    tempArr[k].hp = 100;
                    tempArr[k].bossState = 1;
                    var playList = this.worldBossPlayList[type];
                    for (var j in playList) {
                        if (playList[j] && playList[j].id == id) {
                            playList[j].hp = 100;
                            playList[j].bossState = 1;
                            break;
                        }
                    }
                    var str = "|C:0xfee900&T:BOSS||C:0xfe4444&T:" + bossBaseConfig.name + "||C:0xfee900&T:\u51FA\u73B0\u5728||C:0x16b2ff&T:\u91CE\u5916BOSS\uFF01|";
                    Chat.ins().postSysChatMsg(new ChatSystemData(3, str));
                    if (UserBoss.ins().worldBossLeftTime[type]) {
                        this.postBossData(true, bossBaseConfig.name);
                    }
                    break;
                }
            }
        }
        else if (type == UserBoss.BOSS_SUBTYPE_HOMEBOSS) {
            var config = GlobalConfig.WorldBossConfig[id];
            var bossBaseConfig = GlobalConfig.BossHomeConfig[id];
            if (bossBaseConfig && zslv >= config.zsLevel && lv >= config.level && UserVip.ins().lv >= bossBaseConfig.vip) {
                var tempArr = UserBoss.ins().worldInfoList[type];
                var playList = this.worldBossPlayList[type];
                var layerId = bossBaseConfig.boss;
                for (var k in tempArr) {
                    if (layerId.lastIndexOf(tempArr[k].id) != -1) {
                        tempArr[k].hp = 100;
                        tempArr[k].bossState = 1;
                    }
                }
                for (var j in playList) {
                    if (layerId.lastIndexOf(playList[j].id) != -1) {
                        playList[j].hp = 100;
                        playList[j].bossState = 1;
                    }
                }
                var str = "|C:0xfee900&T:BOSS\u4E4B\u5BB6" + id + "\u5C42\u6240\u6709BOSS\u5237\u65B0\u4E86\uFF0C\u8FD9\u91CC\u7684BOSS\u592A\u591A\u4E86\uFF0C\u7B80\u76F4\u5C31\u662F\u6253\u5B9D\u5929\u5802|";
                Chat.ins().postSysChatMsg(new ChatSystemData(3, str));
                if (UserBoss.ins().worldBossLeftTime[type]) {
                    this.postBossData(true, "BOSS\u4E4B\u5BB6");
                }
            }
        }
        else if (type == UserBoss.BOSS_SUBTYPE_SHENYU) {
            var tempArr = UserBoss.ins().worldInfoList[type];
            for (var k in tempArr) {
                var config = GlobalConfig.WorldBossConfig[id];
                if (tempArr[k].id == id && this.getBossRemindByIndex(id) && zslv >= config.zsLevel && lv >= config.level) {
                    var bossBaseConfig = GlobalConfig.MonstersConfig[config.bossId];
                    tempArr[k].hp = 100;
                    tempArr[k].bossState = 1;
                    var playList = this.worldBossPlayList[type];
                    for (var j in playList) {
                        if (playList[j] && playList[j].id == id) {
                            playList[j].hp = 100;
                            playList[j].bossState = 1;
                            break;
                        }
                    }
                    var str = "|C:0xfee900&T:BOSS||C:0xfe4444&T:" + bossBaseConfig.name + "||C:0xfee900&T:\u51FA\u73B0\u5728||C:0x16b2ff&T:\u795E\u57DFBOSS\uFF01|";
                    Chat.ins().postSysChatMsg(new ChatSystemData(3, str));
                    if (UserBoss.ins().worldBossLeftTime[type]) {
                        this.postBossData(true, bossBaseConfig.name);
                    }
                    break;
                }
            }
        }
        else if (type == UserBoss.BOSS_SUBTYPE_GODWEAPON || type == UserBoss.BOSS_SUBTYPE_GODWEAPON_TOP) {
            var tempArr = UserBoss.ins().worldInfoList[type];
            for (var k in tempArr) {
                var config = GlobalConfig.WorldBossConfig[id];
                if (tempArr[k].id == id) {
                    var bossBaseConfig = GlobalConfig.MonstersConfig[config.bossId];
                    tempArr[k].hp = 100;
                    tempArr[k].bossState = 1;
                    var playList = this.worldBossPlayList[type];
                    for (var j in playList) {
                        if (playList[j] && playList[j].id == id) {
                            playList[j].hp = 100;
                            playList[j].bossState = 1;
                            break;
                        }
                    }
                    break;
                }
            }
        }
        else if (type == UserBoss.BOSS_SUBTYPE_DARKBOSS) {
            var tempArr = UserBoss.ins().worldInfoList[type];
            for (var k in tempArr) {
                var config = GlobalConfig.WorldBossConfig[id];
                if (tempArr[k].id == id) {
                    var bossBaseConfig = GlobalConfig.MonstersConfig[config.bossId];
                    tempArr[k].hp = 100;
                    tempArr[k].bossState = 1;
                    var playList = this.worldBossPlayList[type];
                    for (var j in playList) {
                        if (playList[j] && playList[j].id == id) {
                            playList[j].hp = 100;
                            playList[j].bossState = 1;
                            break;
                        }
                    }
                    if (tempArr[k].canInto) {
                        var str = "|C:0xfee900&T:\u6697\u4E4B\u79D8\u5883BOSS||C:0xfe4444&T:" + bossBaseConfig.name + "||C:0xfee900&T:\u51FA\u73B0\u5728||C:0x16b2ff&T:\u79D8\u5883BOSS\uFF01|";
                        Chat.ins().postSysChatMsg(new ChatSystemData(3, str));
                        if (UserBoss.ins().worldBossLeftTime[type]) {
                            this.postBossData(true, bossBaseConfig.name);
                        }
                    }
                    break;
                }
            }
        }
    };
    UserBoss.prototype.postChallageRank = function (bytes) {
        var id = bytes.readInt();
        var count = bytes.readByte();
        var datas = [];
        var tNum;
        for (var i = 0; i < count; i++) {
            datas[i] = [];
            tNum = bytes.readInt();
            datas[i][0] = DateUtils.getFormatBySecond(DateUtils.formatMiniDateTime(tNum) / 1000, 6);
            datas[i][1] = bytes.readString();
            datas[i][2] = bytes.readDouble().toString();
            datas[i][3] = 1 + "";
        }
        datas.reverse();
        return [id, datas];
    };
    UserBoss.prototype.doBossChallengeResult = function (bytes) {
        var isBelong = bytes.readByte();
        var belongName = bytes.readString();
        var job = bytes.readByte() || 1;
        var sex = bytes.readByte();
        var count = bytes.readShort();
        var myReward = [];
        for (var i = 0; i < count; i++) {
            myReward[i] = new RewardData;
            myReward[i].parser(bytes);
        }
        var belongImg = "yuanhead" + job + sex;
        ResultManager.ins().create(GameMap.fbType, true, myReward, "", null, [isBelong, belongName, belongImg]);
    };
    UserBoss.prototype.setBossSetting = function (id) {
        var index = this.bossAlertList.indexOf(id);
        if (index != -1) {
            this.bossAlertList.splice(index, 1);
        }
        else {
            this.bossAlertList.push(id);
        }
    };
    UserBoss.prototype.sendBossSetting = function () {
        var len = this.bossAlertList ? this.bossAlertList.length : 0;
        var bytes = this.getBytes(29);
        bytes.writeShort(len);
        for (var i = 0; i < len; i++) {
            bytes.writeShort(this.bossAlertList[i]);
        }
        this.sendToServer(bytes);
    };
    UserBoss.prototype.doBossSetting = function (bytes) {
        this.bossAlertList = [];
        var count = bytes.readShort();
        for (var i = 0; i < count; i++) {
            var id = bytes.readShort();
            this.bossAlertList.push(id);
        }
    };
    UserBoss.prototype.checkNewWorldBossOpen = function () {
        return Actor.level >= GlobalConfig.NewWorldBossBaseConfig.openLv;
    };
    UserBoss.prototype.sendIntoNewBoss = function () {
        this.sendBaseProto(31);
    };
    UserBoss.prototype.postNewBossResult = function (bytes) {
        this.newWorldBossData.isKill = !!bytes.readByte();
        this.newWorldBossData.rank = bytes.readInt();
        this.newWorldBossData.lastKillRoleName = bytes.readString();
        this.newWorldBossData.randomRoleName = bytes.readString();
        this.newWorldBossData.totalTime = bytes.readInt();
        this.newWorldBossData.randomAwards = [];
        var len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            this.newWorldBossData.randomAwards[i] = new RewardData();
            this.newWorldBossData.randomAwards[i].parser(bytes);
        }
        ResultManager.ins().create(GameMap.fbType, 1);
    };
    UserBoss.prototype.sendGetNewBossInfo = function () {
        this.sendBaseProto(32);
    };
    UserBoss.prototype.postNewBossInfo = function (bytes) {
        this.newWorldBossData.bossID = bytes.readInt();
        this.newWorldBossData.curHp = bytes.readDouble();
    };
    UserBoss.prototype.sendNewBossBuyRelive = function () {
        this.sendBaseProto(33);
    };
    UserBoss.prototype.postNewBossReliveTime = function (bytes) {
        this.reliveTime = bytes.readShort();
    };
    UserBoss.prototype.postNewBossOpen = function (bytes) {
        this.newWorldBossData.isOpen = !!(bytes.readByte());
        this.newWorldBossData.startTime = bytes.readInt();
        if (this.newWorldBossData.startTime) {
            this.newWorldBossData.startTime = DateUtils.formatMiniDateTime(this.newWorldBossData.startTime);
        }
    };
    UserBoss.prototype.postAddAttrNum = function (bytes) {
        this.newWorldBossData.addAttrNum = bytes.readShort();
    };
    UserBoss.prototype.postNewBossRank = function (bytes) {
        var len = bytes.readShort();
        if (this.newWorldBossData.rankList == null) {
            this.newWorldBossData.rankList = [];
        }
        this.newWorldBossData.rankList.length = len;
        for (var i = 0; i < len; i++) {
            this.newWorldBossData.rankList[i] = this.newWorldBossData.rankList[i] || new NewWorldBossRankData();
            this.newWorldBossData.rankList[i].parser(bytes);
        }
        this.newWorldBossData.rankList.sort(this.sortNewBossRank);
    };
    UserBoss.prototype.sortNewBossRank = function (a, b) {
        if (a.value > b.value)
            return -1;
        return 1;
    };
    UserBoss.prototype.postBossDieNotice = function (bytes) {
        var bossId = bytes.readInt();
        var config = GlobalConfig.WorldBossConfig[bossId];
        if (!config)
            return;
        switch (config.type) {
            case UserBoss.BOSS_SUBTYPE_WORLDBOSS:
            case UserBoss.BOSS_SUBTYPE_QMBOSS:
            case UserBoss.BOSS_SUBTYPE_DARKBOSS:
            case UserBoss.BOSS_SUBTYPE_GODWEAPON:
            case UserBoss.BOSS_SUBTYPE_GODWEAPON_TOP:
                var bossBaseConfig = GlobalConfig.MonstersConfig[config.bossId];
                UserBoss.ins().postBossData(false, bossBaseConfig.name);
                this.sendWorldBossInfo(config.type);
                break;
            case UserBoss.BOSS_SUBTYPE_HOMEBOSS:
                UserBoss.ins().postBossData(false, "BOSS\u4E4B\u5BB6");
                this.sendWorldBossInfo(config.type);
                break;
        }
    };
    UserBoss.prototype.sendBuyChallengeTimes = function (type) {
        var bytes = this.getBytes(30);
        bytes.writeByte(type);
        this.sendToServer(bytes);
    };
    UserBoss.prototype.sendBuyAddAttrNum = function () {
        this.sendBaseProto(34);
    };
    UserBoss.prototype.getBossRemindByIndex = function (id) {
        return (this.bossAlertList.indexOf(id) != -1);
    };
    UserBoss.prototype.sendCleanBelong = function () {
        this.sendBaseProto(35);
    };
    UserBoss.prototype.sendChallengeHideBoss = function () {
        this.sendBaseProto(36);
    };
    UserBoss.prototype.postBaseHideBossInfo = function (bytes) {
        var id = bytes.readInt();
        var time = bytes.readInt();
        this.hideBossData.id = id;
        this.hideBossData.endTime = time;
    };
    UserBoss.prototype.checkWorldBossMoney = function () {
        return Actor.yb >= this.checkWorldBossNeed();
    };
    UserBoss.prototype.checkWorldBossNeed = function () {
        if (GameMap.fbType == UserFb.FB_TYPE_GUIDEBOSS) {
            return GlobalConfig.LeadFubenBaseConfig.BuyRebornCost;
        }
        else if (GameMap.fbType == UserFb.FB_TYPE_CITY) {
            return GlobalConfig.CityBaseConfig.BuyRebornCost;
        }
        else if (GameMap.fbType == UserFb.FB_TYPE_NEW_WORLD_BOSS) {
            return GlobalConfig.NewWorldBossBaseConfig.clearCdCost;
        }
        else if (GameMap.fubenID == GlobalConfig.CampBattleConfig.fbId)
            return GlobalConfig.CampBattleConfig.buyRebornCdCost;
        else if (GameMap.fubenID == GlobalConfig.PassionPointConfig.fbId)
            return GlobalConfig.PassionPointConfig.buyRebornCdCost;
        return GlobalConfig.WorldBossBaseConfig.clearCdCost[this.currBossSubType - 1];
    };
    UserBoss.prototype.checkisAutoRelive = function () {
        if (this.reliveTime > 0) {
            if (this.autoClear[this.currBossSubType]) {
                if (this.checkWorldBossMoney()) {
                    this.sendClearCD();
                    return false;
                }
                else {
                    UserTips.ins().showTips("元宝不足，无法立即复活");
                    this.autoClear[this.currBossSubType] = false;
                }
            }
            return true;
        }
        return false;
    };
    Object.defineProperty(UserBoss.prototype, "reliveTime", {
        get: function () {
            return this._reliveTime;
        },
        set: function (num) {
            if (this._reliveTime != num) {
                this._reliveTime = num;
                TimerManager.ins().remove(this.timeClock, this);
                TimerManager.ins().doTimer(1000, this._reliveTime, this.timeClock, this);
            }
        },
        enumerable: true,
        configurable: true
    });
    UserBoss.prototype.timeClock = function () {
        this._reliveTime--;
        if (this._reliveTime <= 0) {
            TimerManager.ins().remove(this.timeClock, this);
        }
    };
    UserBoss.prototype.parser = function (bytes) {
        this.challengeCount = bytes.readShort();
        this.restoreTime = bytes.readShort() * 1000 + egret.getTimer();
        this.toDaySoul = bytes.readInt();
        this.cdTime = bytes.readShort() * 1000 + egret.getTimer();
        this.bossRemind = bytes.readInt();
        if (!this.hp || (this.hp <= 0 && GuildWar.ins().getModel().checkinAppoint(1))) {
            ViewManager.ins().close(BossBloodPanel);
        }
    };
    UserBoss.prototype.parserBossList = function (bytes) {
    };
    UserBoss.prototype.parserBoss = function (bytes) {
    };
    UserBoss.prototype.checkShow = function () {
        var fbID = GameMap.fubenID;
        if (isNaN(fbID)) {
            return;
        }
        if (GameMap.fubenID != GameMap.lastFbId) {
            this.lastBossID = -1;
            GameMap.lastFbId = GameMap.fubenID;
        }
        if (fbID != 0 && GameMap.fbType != UserFb.FB_TYPE_GUANQIABOSS) {
            if (GameMap.fbType == UserFb.FB_TYPE_NEW_WORLD_BOSS && GameMap.fubenID == GlobalConfig.NewWorldBossBaseConfig.fbId) {
                ViewManager.ins().open(NewWorldBossUIView);
            }
            else if (GameMap.fbType == UserFb.FB_TYPE_ZHUANSHENGBOSS
                || GameMap.fbType == UserFb.FB_TYPE_ALLHUMENBOSS
                || GameMap.fbType == UserFb.FB_TYPE_HOMEBOSS
                || (GameMap.fbType == UserFb.FB_TYPE_GUIDEBOSS && GameMap.fubenID != 40001)) {
                ViewManager.ins().open(WorldBossUiInfo);
            }
            else if (GameMap.sceneInMine()) {
                ViewManager.ins().open(MineScenePanel);
            }
            else if (GameMap.fbType == UserFb.FB_TYPE_LABA) {
                ViewManager.ins().open(LabaBossUIPanel);
            }
        }
        else {
            ViewManager.ins().close(MineScenePanel);
            ViewManager.ins().close(WorldBossUiInfo);
            ViewManager.ins().close(WorldBossBeKillWin);
            ViewManager.ins().close(NewWorldBossUIView);
            ViewManager.ins().close(LabaBossUIPanel);
        }
    };
    UserBoss.prototype.checkRelive = function () {
        if (GwBoss.ins().isRoleDie()) {
            if (this.checkWorldBossMoney()) {
                return true;
            }
            else {
                UserTips.ins().showTips("元宝不足，无法立即复活");
                this.autoClear[this.currBossSubType] = false;
            }
        }
        return false;
    };
    UserBoss.prototype.checkRemoveEntity = function (_a) {
        var handle = _a[0], entity = _a[1];
        var model = entity.infoModel;
        if (model && model.team != Team.My && model.type == EntityType.Role && model.masterHandle) {
            var masterHandle = model.masterHandle;
            if (!EntityManager.ins().getMasterList(masterHandle))
                EntityShowMgr.ins().showNearSomeOne();
        }
        if (model && handle == this.bossHandler) {
            this.postBossDisappear(entity);
        }
    };
    UserBoss.prototype.getRankList = function (index) {
        return this.rankList[index];
    };
    UserBoss.prototype.init = function () {
        this.sendWorldBossInfo(UserBoss.BOSS_SUBTYPE_WORLDBOSS);
        this.sendWorldBossInfo(UserBoss.BOSS_SUBTYPE_QMBOSS);
        this.sendWorldBossInfo(UserBoss.BOSS_SUBTYPE_HOMEBOSS);
        this.sendWorldBossInfo(UserBoss.BOSS_SUBTYPE_SHENYU);
        this.sendWorldBossInfo(UserBoss.BOSS_SUBTYPE_GODWEAPON);
        this.sendWorldBossInfo(UserBoss.BOSS_SUBTYPE_GODWEAPON_TOP);
        this.sendWorldBossInfo(UserBoss.BOSS_SUBTYPE_DARKBOSS);
    };
    UserBoss.prototype.changeWeiXieList = function (handel, add, showName) {
        if (add === void 0) { add = true; }
        if (showName === void 0) { showName = ""; }
        if (Actor.handle == handel) {
            return;
        }
        var index = this.checkListElements(handel, this.weixieList);
        if (add) {
            if (index == -1) {
                this.weixieList.push(handel);
            }
        }
        else {
            if (index != -1) {
                this.weixieList.splice(index, 1);
            }
        }
    };
    UserBoss.prototype.changecanPlayList = function (handel, add) {
        if (add === void 0) { add = true; }
        var tempHandel;
        if (Actor.handle != handel) {
            if (handel == 0) {
                this.canPlayList = [];
                this.belongName = "";
            }
            else {
                this.weixieList = [];
                this.canPlayList[0] = handel;
                tempHandel = EntityManager.ins().getEntityBymasterhHandle(handel);
                if (tempHandel)
                    this.belongName = tempHandel.infoModel.name;
            }
        }
        else {
            this.weixieList = [];
            this.canPlayList = [];
            this.belongName = Actor.myName;
        }
        this.postHasAttackChange(0);
        this.postCanplayChange();
    };
    UserBoss.prototype.checkListElements = function (handle, list) {
        if (list.length <= 0) {
            return -1;
        }
        for (var i = 0; i < list.length; i++) {
            if (list[i] == handle) {
                return i;
            }
        }
        return -1;
    };
    UserBoss.prototype.postHasAttackChange = function (b) {
        return b;
    };
    UserBoss.prototype.postCanplayChange = function () {
    };
    UserBoss.prototype.clearWorldBossList = function () {
        if (GameMap.fbType == UserFb.FB_TYPE_ZHUANSHENGBOSS
            || GameMap.fbType == UserFb.FB_TYPE_ALLHUMENBOSS
            || GameMap.fbType == UserFb.FB_TYPE_HOMEBOSS
            || GameMap.fbType == UserFb.FB_TYPE_GUIDEBOSS
            || GameMap.fbType == UserFb.FB_TYPE_GOD_WEAPON
            || GameMap.fbType == UserFb.FB_TYPE_GOD_WEAPON_TOP
            || GameMap.fbType == UserFb.FB_TYPE_DARK_BOSS) {
            this.weixieList = [];
            this.canPlayList = [];
            GameLogic.ins().currAttackHandle = 0;
        }
        else {
            UserBoss.ins().winner = "";
            UserFb.ins().guideBossKill = 0;
        }
    };
    UserBoss.prototype.checkBossIconShow = function () {
        return OpenSystem.ins().checkSysOpen(SystemType.BOSS) && !UserFb.ins().pkGqboss;
    };
    UserBoss.prototype.checkShenyuOpen = function () {
        return GameServer.serverOpenDay >= GlobalConfig.WorldBossBaseConfig.shenyuOpenDay - 1;
    };
    UserBoss.prototype.checkWorldBossRedPoint = function (type) {
        var bossList = this.worldBossPlayList[type];
        if (!bossList)
            return false;
        if (type == UserBoss.BOSS_SUBTYPE_SHENYU && !this.checkShenyuOpen())
            return false;
        if (type != UserBoss.BOSS_SUBTYPE_HOMEBOSS) {
            if (!this.worldBossLeftTime || this.worldBossLeftTime.length < 0 || !this.worldBossLeftTime[type])
                return false;
        }
        if (type == UserBoss.BOSS_SUBTYPE_QMBOSS || type == UserBoss.BOSS_SUBTYPE_SHENYU || type == UserBoss.BOSS_SUBTYPE_DARKBOSS) {
            if (this.bossAlertList && this.bossAlertList.length) {
                var isAllDie = true;
                var tempArr = this.worldInfoList[type].slice();
                var roleLv = UserZs.ins().lv * 1000 + Actor.level;
                for (var i = 0; i < tempArr.length; i++) {
                    var isDie = (tempArr[i].relieveTime - egret.getTimer()) / 1000 > 0 || tempArr[i].hp <= 0;
                    if (!isDie) {
                        var boo = this.getBossRemindByIndex(tempArr[i].id);
                        if (boo) {
                            var bossConfig = GlobalConfig.WorldBossConfig[tempArr[i].id];
                            if (!bossConfig.samsaraLv) {
                                var bossLv = bossConfig.zsLevel * 1000 + bossConfig.level;
                                if (roleLv >= bossLv) {
                                    isAllDie = false;
                                    break;
                                }
                            }
                            else {
                                if (Actor.samsaraLv >= bossConfig.samsaraLv) {
                                    isAllDie = false;
                                    break;
                                }
                            }
                        }
                    }
                }
                return !isAllDie;
            }
        }
        if (type == UserBoss.BOSS_SUBTYPE_GODWEAPON) {
            for (var _i = 0, bossList_1 = bossList; _i < bossList_1.length; _i++) {
                var data = bossList_1[_i];
                if (this.worldBossBelongTime[type] > 0 && data.canChallenge && this.getBossRemindByIndex(data.id)) {
                    return true;
                }
            }
            return false;
        }
        if (type == UserBoss.BOSS_SUBTYPE_GODWEAPON_TOP) {
            for (var _a = 0, bossList_2 = bossList; _a < bossList_2.length; _a++) {
                var data = bossList_2[_a];
                if (data.canChallenge && this.getBossRemindByIndex(data.id)) {
                    var needYb = GlobalConfig.WorldBossBaseConfig.challengeItemYb[type - 1];
                    if (Actor.yb >= needYb)
                        return true;
                    var itemId = GlobalConfig.WorldBossBaseConfig.challengeItem[type - 1];
                    var item = UserBag.ins().getBagGoodsByTypeAndId(0, itemId);
                    if (item && item.count)
                        return true;
                }
            }
            return false;
        }
        var len = bossList.length;
        for (var i = 0; i < len; i++) {
            if (bossList[i].bossState != 2)
                return true;
        }
        return false;
    };
    Object.defineProperty(UserBoss.prototype, "clickTime", {
        set: function (value) {
            this.canClick = false;
            this._clickTime = value;
            TimerManager.ins().remove(this.endTimeChangeStatu, this);
            TimerManager.ins().doTimer(500, this._clickTime, this.endTimeChangeStatu, this);
        },
        enumerable: true,
        configurable: true
    });
    UserBoss.prototype.endTimeChangeStatu = function () {
        --this._clickTime;
        if (this._clickTime <= 0) {
            this.canClick = true;
            TimerManager.ins().remove(this.endTimeChangeStatu, this);
        }
    };
    UserBoss.prototype.getListData = function () {
        var tempArr = UserFb.getPersonalBossFbIds().slice();
        var dieArr = [];
        var canPlayArr = [];
        var canNotPlayArr = [];
        var roleLv = UserZs.ins().lv * 1000 + Actor.level;
        for (var i in tempArr) {
            var config = UserFb.ins().getFbDataById(tempArr[i].id);
            if (!config)
                continue;
            var isDie = config.getPlayCount() <= 0;
            if (isDie) {
                dieArr.push(tempArr[i]);
            }
            else {
                var bossLv = tempArr[i].zsLevel * 1000 + tempArr[i].levelLimit;
                if (tempArr[i].monthcard) {
                    if (Recharge.ins().monthDay > 0) {
                        canPlayArr.unshift(tempArr[i]);
                    }
                    else {
                        canNotPlayArr.push(tempArr[i]);
                    }
                }
                else if (tempArr[i].specialCard) {
                    if (Recharge.ins().franchise) {
                        canPlayArr.unshift(tempArr[i]);
                    }
                    else {
                        canNotPlayArr.push(tempArr[i]);
                    }
                }
                else if (tempArr[i].privilege) {
                    if (Recharge.ins().getIsForeve()) {
                        canPlayArr.unshift(tempArr[i]);
                    }
                    else {
                        canNotPlayArr.push(tempArr[i]);
                    }
                }
                else {
                    if (roleLv >= bossLv) {
                        canPlayArr.push(tempArr[i]);
                    }
                    else {
                        canNotPlayArr.push(tempArr[i]);
                    }
                }
            }
        }
        return [canPlayArr, canNotPlayArr, dieArr];
    };
    UserBoss.prototype.getGwBossList = function () {
        var gwList = UserBoss.ins().worldInfoList[UserBoss.BOSS_SUBTYPE_GODWEAPON].concat();
        var topList = UserBoss.ins().worldInfoList[UserBoss.BOSS_SUBTYPE_GODWEAPON_TOP].concat();
        for (var i = 0; i < topList.length; i++) {
            var data = topList[i];
            var config = GlobalConfig.WorldBossConfig[data.id];
            if (data.canInto) {
                gwList.push(topList[i]);
                break;
            }
        }
        return gwList;
    };
    UserBoss.isCanChallenge = function (data) {
        var canChallenge;
        if (data.samsaraLv > 0) {
            canChallenge = Actor.samsaraLv >= data.samsaraLv;
        }
        else {
            var roleLv = UserZs.ins().lv * 1000 + Actor.level;
            var bossLv = data.zsLevel * 1000 + data.level;
            canChallenge = roleLv >= bossLv;
        }
        return canChallenge;
    };
    UserBoss.WB_BAG_ENOUGH = 50;
    UserBoss.BOSS_SUBTYPE_WORLDBOSS = 1;
    UserBoss.BOSS_SUBTYPE_QMBOSS = 2;
    UserBoss.BOSS_SUBTYPE_HOMEBOSS = 3;
    UserBoss.BOSS_SUBTYPE_SHENYU = 4;
    UserBoss.BOSS_SUBTYPE_GODWEAPON = 5;
    UserBoss.BOSS_SUBTYPE_GODWEAPON_TOP = 6;
    UserBoss.BOSS_SUBTYPE_DARKBOSS = 7;
    return UserBoss;
}(BaseSystem));
__reflect(UserBoss.prototype, "UserBoss");
var GameSystem;
(function (GameSystem) {
    GameSystem.userboss = UserBoss.ins.bind(UserBoss);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=UserBoss.js.map