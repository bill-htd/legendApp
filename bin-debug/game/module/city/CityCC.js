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
var CityCC = (function (_super) {
    __extends(CityCC, _super);
    function CityCC() {
        var _this = _super.call(this) || this;
        _this.cityBossId = 0;
        _this.cityBossHandle = 0;
        _this.attStatue = 2;
        _this.bossKillNumData = {};
        _this.sysId = PackageID.City;
        _this.enterCD = 0;
        _this.observe(GameLogic.ins().postEnterMap, function () {
            if (GameMap.fbType == UserFb.FB_TYPE_CITY)
                _this.postEnterCity();
            if (_this.isCity && GameMap.fbType != UserFb.FB_TYPE_CITY)
                _this.postEscCity();
        });
        _this.observe(Rank.ins().postPraiseData, _this.createStatue);
        _this.observe(GuildWar.ins().postWinGuildInfo, _this.createStatue);
        _this.regNetMsg(1, _this.postCityBossBelong);
        _this.regNetMsg(2, UserBoss.ins().doBossChallengeResult);
        _this.regNetMsg(3, _this.postBossInfo);
        _this.regNetMsg(4, _this.postCityBossId);
        _this.regNetMsg(5, _this.postRemainTime);
        _this.regNetMsg(6, _this.postHudunPoint);
        _this.regNetMsg(7, _this.postEnterCD);
        return _this;
    }
    CityCC.prototype.getBossList = function () {
        var ary;
        var ids = new Array();
        for (var i in GlobalConfig.CityBossConfig) {
            var cfg = GlobalConfig.CityBossConfig[i];
            if (ids.indexOf(cfg.bossId) == -1 && cfg.killBossId > 999) {
                ids.push(cfg.bossId);
            }
        }
        ary = new eui.ArrayCollection(ids);
        return ary;
    };
    CityCC.prototype.getCityBossConfig = function (bossId) {
        var cfg;
        for (var i in GlobalConfig.CityBossConfig) {
            if (GlobalConfig.CityBossConfig[i].bossId == bossId && GlobalConfig.CityBossConfig[i].killBossId > 999) {
                cfg = GlobalConfig.CityBossConfig[i];
                break;
            }
        }
        return cfg;
    };
    CityCC.prototype.getKillBossNum = function (bossId) {
        var cityBoss = CityCC.ins().getCityBossConfig(bossId);
        var killBossId = cityBoss.killBossId;
        var killNum = 0;
        if (CityCC.ins().bossKillNumData[killBossId] != undefined) {
            killNum = CityCC.ins().bossKillNumData[killBossId][0];
        }
        var needKillNum = this.getNeedKillBossNum(bossId);
        if (bossId == this.cityBossId || killNum > needKillNum) {
            killNum = needKillNum;
        }
        return killNum;
    };
    CityCC.prototype.getNeedKillBossNum = function (bossId) {
        var cityBoss = CityCC.ins().getCityBossConfig(bossId);
        var killBossId = cityBoss.killBossId;
        var appearNum = 0;
        if (CityCC.ins().bossKillNumData[killBossId] != undefined) {
            appearNum = CityCC.ins().bossKillNumData[killBossId][1];
        }
        if (appearNum >= cityBoss.killCount.length) {
            appearNum = cityBoss.killCount.length - 1;
        }
        return cityBoss.killCount[appearNum];
    };
    CityCC.prototype.getRefreshTime = function (bossId) {
        var cityBoss = CityCC.ins().getCityBossConfig(bossId);
        var killBossId = cityBoss.killBossId;
        var time = 0;
        if (CityCC.ins().bossKillNumData[killBossId] != undefined) {
            time = CityCC.ins().bossKillNumData[killBossId][2];
        }
        var format;
        if (time == 0) {
            format = "";
        }
        else {
            time = DateUtils.formatMiniDateTime(time);
            if (DateUtils.checkTime(time, 7) || time == 0) {
                format = "";
            }
            else {
                format = DateUtils.formatFullTime(time);
            }
        }
        return format;
    };
    CityCC.prototype.postBossInfo = function (bytes) {
        var count = bytes.readShort();
        for (var i = 0; i < count; i++) {
            var id = bytes.readInt();
            var num = bytes.readInt();
            var appearNum = bytes.readInt();
            var refeshTime = bytes.readInt();
            this.bossKillNumData[id] = [num, appearNum, refeshTime];
        }
    };
    CityCC.prototype.postCityBossId = function (bytes) {
        UserBoss.ins().monsterID = this.cityBossId = bytes.readInt();
        UserBoss.ins().bossHandler = this.cityBossHandle = bytes.readDouble();
        this.changeFunView();
    };
    CityCC.prototype.getMaxKillNumBoss = function () {
        var bossId = 0;
        var tempMax = 0;
        var temp = 0;
        var time = Number.MAX_VALUE;
        var cfg;
        var isFirstZero = false;
        var zeroBossId = 0;
        for (var i in this.bossKillNumData) {
            if (+i < 999)
                continue;
            cfg = this.getCfgByKillBossId(parseInt(i));
            var appearNum = cfg.killCount[this.bossKillNumData[i][1]];
            if (appearNum == undefined) {
                appearNum = cfg.killCount[cfg.killCount.length - 1];
            }
            temp = this.bossKillNumData[i][0] / appearNum;
            if (temp >= 1) {
                return [bossId, temp];
            }
            if (!bossId && !isFirstZero && this.bossKillNumData[i][2] == 0) {
                isFirstZero = true;
                zeroBossId = cfg.bossId;
                tempMax = temp;
            }
            if (this.bossKillNumData[i][2] && this.bossKillNumData[i][2] < time) {
                bossId = cfg.bossId;
                time = this.bossKillNumData[i][2];
                tempMax = temp;
            }
        }
        return [bossId || zeroBossId, tempMax];
    };
    CityCC.prototype.getShowBossId = function () {
        var bossId;
        if (this.cityBossId > 0) {
            bossId = this.cityBossId;
        }
        else {
            bossId = this.getMaxKillNumBoss()[0];
        }
        return bossId;
    };
    CityCC.prototype.getCfgByKillBossId = function (killBossId) {
        for (var i in GlobalConfig.CityBossConfig) {
            if (GlobalConfig.CityBossConfig[i].killBossId == killBossId) {
                return GlobalConfig.CityBossConfig[i];
            }
        }
        return null;
    };
    CityCC.prototype.createStatue = function (type) {
        if (type === void 0) { type = -1; }
        if (!this.isCity)
            return;
        var title = {};
        title[RankDataType.TYPE_POWER] = "chenghaotxdy";
        title[RankDataType.TYPE_LILIAN] = "chenghaomdtx";
        title[RankDataType.TYPE_SKIRMISH] = "chenghaoslzw";
        var scene = ViewManager.ins().getView(GameSceneView);
        var sv;
        var p;
        if (type == -1) {
            var guildModel = GuildWar.ins().getModel().winGuildInfo;
            p = GlobalConfig.CityBaseConfig.masterPos;
            sv = new StatueView("chenghaolcbz", guildModel.guildOwnName || "\u865A\u4F4D\u4EE5\u5F85", "diaoxiang0_" + guildModel.guildOwnSex);
        }
        else {
            p = GlobalConfig.CityBaseConfig.statuePos[type];
            if (!p)
                return;
            var model = Rank.ins().getRankModel(type).praise;
            var id = 3;
            if (!model.subRole[0]) {
                switch (type) {
                    case RankDataType.TYPE_POWER:
                        id = 1;
                        break;
                    case RankDataType.TYPE_SKIRMISH:
                        id = 2;
                        break;
                }
            }
            else
                id = model.subRole[0].job;
            sv = new StatueView(title[type], model.name || "\u865A\u4F4D\u4EE5\u5F85", "statue_" + id + "_" + (model.subRole[0] ? model.subRole[0].sex : 0));
        }
        sv.x = p.x;
        sv.y = p.y;
        scene.map.addEntity(sv);
    };
    CityCC.prototype.sendEnter = function () {
        this.sendBaseProto(1);
    };
    CityCC.prototype.sendStopAI = function () {
        this.sendBaseProto(2);
    };
    CityCC.prototype.sendRevival = function () {
        this.sendBaseProto(3);
    };
    CityCC.prototype.postEnterCity = function () {
        this.isCity = true;
        if (this.cityBossId > 0 && this.isChallenge) {
            this.isChallenge = false;
            TimerManager.ins().doNext(function () {
                var win = ViewManager.ins().getView(BossBelongPanel);
                if (win)
                    win.attrBoss();
            }, this);
        }
        this.changeFunView();
        ViewManager.ins().open(CityFunPanel);
        Rank.ins().sendGetRankingData();
        Rank.ins().sendGetPraiseData(RankDataType.TYPE_POWER);
        Rank.ins().sendGetPraiseData(RankDataType.TYPE_SKIRMISH);
        Rank.ins().sendGetPraiseData(RankDataType.TYPE_LILIAN);
        GuildWar.ins().requestWinGuildInfo();
    };
    CityCC.prototype.postEscCity = function () {
        this.isCity = false;
        this.attStatue = 2;
        ViewManager.ins().close(CityFunPanel);
        ViewManager.ins().close(BossBelongPanel);
        ViewManager.ins().close(BossBloodPanel);
        ViewManager.ins().close(TargetPlayerBigBloodPanel);
    };
    CityCC.prototype.postChangeAttStatue = function (type) {
        this.attStatue = type;
        this.changeFunView();
        return type;
    };
    CityCC.prototype.changeFunView = function () {
        if (!this.isCity)
            return;
        if (this.attStatue == 2 && this.cityBossId == 0)
            ViewManager.ins().open(PlayFunView);
        else
            ViewManager.ins().close(PlayFunView);
        if (this.cityBossId == 0) {
            ViewManager.ins().close(BossBloodPanel);
            ViewManager.ins().close(BossBelongPanel);
        }
        else {
            ViewManager.ins().open(BossBelongPanel);
            ViewManager.ins().open(BossBloodPanel);
        }
    };
    CityCC.prototype.postCityBossBelong = function (bytes) {
        var oldHandle = bytes.readDouble();
        var handle = bytes.readDouble();
        var oldName = "";
        if (oldHandle > 0) {
            var oldChar = EntityManager.ins().getMasterList(oldHandle);
            if (oldChar && oldChar[0] && oldChar[0].infoModel) {
                oldName = oldChar[0].infoModel.name;
            }
        }
        UserBoss.ins().postBelongChange(handle, oldHandle, oldName);
    };
    CityCC.prototype.postRemainTime = function (bytes) {
        UserBoss.ins().reliveTime = bytes.readShort();
        UserBoss.ins().killerHandler = bytes.readDouble();
        if (UserBoss.ins().reliveTime > 0) {
            UserBoss.ins().clearWorldBossList();
            ViewManager.ins().open(WorldBossBeKillWin);
        }
        else
            ViewManager.ins().close(WorldBossBeKillWin);
    };
    CityCC.prototype.postHudunPoint = function (bytes) {
        if (!bytes)
            return;
        this.hudun = bytes.readInt();
        this.huDunMax = bytes.readInt();
        TimerManager.ins().remove(this.hudunPointFun, this);
        if (this.hudun > 0) {
            TimerManager.ins().doTimer(1000, CityCC.ins().hudun, this.hudunPointFun, this);
        }
    };
    CityCC.prototype.hudunPointFun = function () {
        CityCC.ins().hudun--;
        this.postHudunPoint(null);
    };
    CityCC.prototype.postEnterCD = function (bytes) {
        this.enterCD = bytes.readInt();
        TimerManager.ins().remove(this.enterCDFun, this);
        if (this.enterCD > 0) {
            TimerManager.ins().doTimer(1000, this.enterCD, this.enterCDFun, this);
        }
    };
    CityCC.prototype.enterCDFun = function () {
        this.enterCD--;
    };
    CityCC.ins = function () {
        return _super.ins.call(this);
    };
    return CityCC;
}(BaseSystem));
__reflect(CityCC.prototype, "CityCC");
var GameSystem;
(function (GameSystem) {
    GameSystem.citycc = CityCC.ins.bind(CityCC);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=CityCC.js.map