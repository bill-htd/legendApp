var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuildWarModel = (function () {
    function GuildWarModel() {
        this.guildPoint = 0;
        this.ownPoint = 0;
        this.gongXun = 0;
        this.rewardDay = 1;
        this.remainYB = -1;
        this.robYbNum = 0;
        this.guildRankList = [];
        this.killName = "";
        this.killGuild = "";
        this.cityOwn = "虚位以待";
        this.myRankList = [];
        this.weixieList = [];
        this.canPlayList = [];
        this.flagStatu = 0;
        this.endTime = 0;
        this.flagName = '';
        this.flagAcId = 0;
        this.flagGuild = "";
        this.canClick = true;
        this._canSendReward = false;
        this.rewardIndex = 0;
        this.sendList = [];
        this.sendNumList = [];
        this.rewardFlag = 0;
        this.winGuildInfo = new WinGuildInfo();
        this.guildWarNumDaXie = [
            "日",
            "一",
            "二",
            "三",
            "四",
            "五",
            "六",
        ];
        this.rankList = [];
        this._doorEndtime = 0;
        this.attHandle = 0;
        this.myGuildPointRank = [];
        this.guildHandleList = [];
        this.guildNum = 0;
    }
    GuildWarModel.prototype.creatGuildRankReward = function (rank, index) {
        if (index === void 0) { index = -1; }
        this.rewardList = [];
        var data = GlobalConfig.GuildBattleDistributionAward[rank];
        for (var i in data) {
            if (data[i].rewardFlag && !(this.rewardFlag == GuildFlag.hf)) {
                continue;
            }
            if (Number(i) == (index + 1)) {
                return data[i].awardShow;
            }
            var award = data[i].awardShow;
            for (var k in award) {
                this.checkIsHave(award[k]);
            }
        }
        return this.rewardList;
    };
    GuildWarModel.prototype.creatGuildRewardList = function () {
        if (this.configList) {
            return this.configList;
        }
        this.configList = [];
        var data = GlobalConfig.GuildBattleDistributionAward;
        for (var i in data) {
            if (this.configList.lastIndexOf(data[i][1].rank) == -1) {
                this.configList.push(data[i][1].rank);
            }
        }
        return this.configList;
    };
    GuildWarModel.prototype.checkIsHave = function (data) {
        var isFound = false;
        var len = this.rewardList.length;
        for (var i = 0; i < len; i++) {
            var info = this.rewardList[i];
            if (info.id == data.id && info.type == data.type) {
                isFound = true;
                this.rewardList[i].count += data.count;
            }
        }
        if (!isFound) {
            this.rewardList.push(data);
        }
    };
    GuildWarModel.prototype.getRedbagInfo = function (bytes) {
        this.remainYB = bytes.readInt();
        this.canSend = bytes.readBoolean();
        this.canRod = bytes.readBoolean();
        this.sendYbNum = bytes.readInt();
        this.maxRedNum = bytes.readInt();
        this.remainRedNum = bytes.readInt();
        var len = bytes.readInt();
        this.rebList = [];
        var info;
        for (var i = 0; i < len; i++) {
            info = new GuildRedRobInfo();
            info.parse(bytes);
            if (Actor.actorID == info.acId)
                this.robYbNum = info.robNum;
            this.rebList.push(info);
        }
    };
    GuildWarModel.prototype.isHaveRedBag = function () {
        return this.canSend || this.canRod;
    };
    GuildWarModel.prototype.checkinAppoint = function (index, up) {
        if (index === void 0) { index = 0; }
        if (up === void 0) { up = false; }
        if (!GuildWar.ins().getModel().isWatStart || GameMap.fubenID == 0 || Guild.ins().guildID == 0) {
            return false;
        }
        var data = GlobalConfig.GuildBattleLevel;
        for (var k in data) {
            if (data[k].fbId == GameMap.fubenID) {
                if (index == 0) {
                    return true;
                }
                if (up && data[k].id >= index) {
                    return true;
                }
                if (data[k].id == index) {
                    return true;
                }
                return false;
            }
        }
        return false;
    };
    GuildWarModel.prototype.decodeGuildRankInfo = function (bytes) {
        this.lastGuildName = bytes.readString();
        var yuan = bytes.readByte();
        var len = bytes.readInt();
        this.guildRankList = [];
        var info;
        for (var i = 0; i < len; i++) {
            info = new RankGuildInfo();
            info.parse(bytes);
            this.guildRankList.push(info);
        }
        GuildWar.ins().postRankInfo();
    };
    GuildWarModel.prototype.getNextMapName = function (next) {
        if (next === void 0) { next = 1; }
        var cruId = GameMap.fubenID;
        var data = GlobalConfig.GuildBattleLevel;
        var index = 1;
        for (var k in data) {
            if (next == data[k].id) {
                index = next;
            }
        }
        return data[index].name;
    };
    GuildWarModel.prototype.getIntoNextMapGongxun = function () {
        var cruId = GameMap.fubenID;
        var data = GlobalConfig.GuildBattleLevel;
        var index = 1;
        for (var k in data) {
            if (cruId == data[k].fbId) {
                if (data[k].id < 4) {
                    index = data[k].id + 1;
                }
                else {
                    return 0;
                }
            }
        }
        return data[index].feats;
    };
    GuildWarModel.prototype.getMapLevelInfo = function () {
        var cruId = GameMap.fubenID;
        var data = GlobalConfig.GuildBattleLevel;
        var index = 1;
        for (var k in data) {
            if (cruId == data[k].fbId) {
                index = data[k].id;
            }
        }
        return data[index];
    };
    GuildWarModel.prototype.decodeMyGuildRankInfo = function (bytes) {
        var len = bytes.readInt();
        this.myRankList = [];
        var info;
        for (var i = 0; i < len; i++) {
            info = new MyRankGuildInfo();
            info.parse(bytes);
            this.myRankList.push(info);
        }
        GuildWar.ins().postMyRankChange();
    };
    GuildWarModel.prototype.changeWeiXieList = function (handel, add, showName) {
        if (add === void 0) { add = true; }
        if (showName === void 0) { showName = ""; }
        if (Actor.handle == handel) {
            return;
        }
        var index = this.checkListElements(handel, this.weixieList);
        if (add) {
            if (index == -1) {
                this.weixieList.push(handel);
                UserTips.ins().showTips("|C:0xf3311e&T:" + showName + " 正在攻击你|");
            }
        }
        else {
            if (index != -1) {
                this.weixieList.splice(index, 1);
            }
        }
        GuildWar.ins().postWeixieChange(0);
    };
    GuildWarModel.prototype.changecanPlayList = function (handel, add) {
        if (add === void 0) { add = true; }
        if (Actor.handle == handel) {
            return;
        }
        var index = this.checkListElements(handel, this.canPlayList);
        if (add) {
            if (index == -1) {
                this.canPlayList.push(handel);
            }
        }
        else {
            if (index != -1) {
                this.canPlayList.splice(index, 1);
            }
        }
        GuildWar.ins().postCanplayChange();
    };
    GuildWarModel.prototype.decodeGulidWarResult = function (bytes) {
        ViewManager.ins().open(GuildWarResultWin, bytes.readString(), bytes.readInt(), bytes.readInt(), bytes.readInt(), bytes.readInt());
    };
    GuildWarModel.prototype.checkListElements = function (handle, list) {
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
    GuildWarModel.prototype.getRewardByPoint = function (point) {
        var rewardList = [];
        if (!this.dataList) {
            this.dataList = [];
            var data = GlobalConfig.GuildBattlePersonalAward;
            for (var str in data) {
                this.dataList.push(data[str]);
            }
        }
        var len = this.dataList.length;
        for (var i = 0; i < len; i++) {
            if (point >= this.dataList[i].integral) {
                rewardList = rewardList.concat(this.dataList[i].award);
            }
        }
        return rewardList;
    };
    GuildWarModel.prototype.getMyPointReward = function () {
        var data = GlobalConfig.GuildBattlePersonalAward;
        var info;
        for (var str in data) {
            info = data[str];
            if (info.id == this.pointInfo.id) {
                return info;
            }
        }
        return null;
    };
    GuildWarModel.prototype.getMaxReward = function () {
        var data = GlobalConfig.GuildBattlePersonalAward;
        var info;
        var maxEgral = 0;
        var maxInfo;
        for (var str in data) {
            info = data[str];
            if (info.integral > maxEgral) {
                maxEgral = info.integral;
                maxInfo = info;
            }
        }
        return maxInfo;
    };
    Object.defineProperty(GuildWarModel.prototype, "clickTime", {
        get: function () {
            return this._clickTime;
        },
        set: function (value) {
            this.canClick = false;
            this._clickTime = value;
            TimerManager.ins().remove(this.endTimeChangeStatu, this);
            TimerManager.ins().doTimer(1000, this._clickTime, this.endTimeChangeStatu, this);
        },
        enumerable: true,
        configurable: true
    });
    GuildWarModel.prototype.endTimeChangeStatu = function () {
        --this._clickTime;
        if (this._clickTime <= 0) {
            this.canClick = true;
            TimerManager.ins().remove(this.endTimeChangeStatu, this);
        }
    };
    Object.defineProperty(GuildWarModel.prototype, "canSendReward", {
        get: function () {
            return Guild.ins().myOffice == GuildOffice.GUILD_BANGZHU && this._canSendReward;
        },
        set: function (b) {
            this._canSendReward = b;
        },
        enumerable: true,
        configurable: true
    });
    GuildWarModel.prototype.getCanSendNumByRank = function (index) {
        if (index === void 0) { index = -1; }
        var data = GlobalConfig.GuildBattleDistributionAward[this.guildWarRank];
        var len = 0;
        for (var i in data) {
            if (data[i].rewardFlag && !(this.rewardFlag == GuildFlag.hf)) {
                continue;
            }
            if (i == (index + 1) + "") {
                return data[i].count;
            }
            ++len;
        }
        return len;
    };
    GuildWarModel.prototype.checkISSendAll = function () {
        var len = this.getCanSendNumByRank();
        for (var i = 0; i < len; i++) {
            var num = this.getCanSendNumByRank(i);
            if (!this.sendList[i]) {
                UserTips.ins().showTips("|C:0xf3311e&T:|请先选择需要分配奖励的成员");
                return false;
            }
            var count = 0;
            for (var k = 0; k < this.sendNumList[i].length; k++) {
                count += this.sendNumList[i][k];
            }
            if (num > count) {
                UserTips.ins().showTips("|C:0xf3311e&T:|请先选择需要分配奖励的成员");
                return false;
            }
            for (var k = 0; k < this.sendList[i].length; k++) {
                if (!Guild.ins().checkIsInGuild(this.sendList[i][k].roleID)) {
                    UserTips.ins().showTips("|C:0xf3311e&T:|" + this.sendList[i][k].name + " 已退出公会");
                    return false;
                }
            }
        }
        return true;
    };
    Object.defineProperty(GuildWarModel.prototype, "acEndTime", {
        get: function () {
            return this._acEndTime;
        },
        set: function (value) {
            this._acEndTime = value;
            if (this._acEndTime > 0) {
                TimerManager.ins().remove(this.reduceTime, this);
                TimerManager.ins().doTimer(1000, value, this.reduceTime, this);
            }
        },
        enumerable: true,
        configurable: true
    });
    GuildWarModel.prototype.reduceTime = function () {
        --this._acEndTime;
        if (this._acEndTime <= 0) {
            TimerManager.ins().remove(this.reduceTime, this);
        }
    };
    GuildWarModel.prototype.setOpenDesc = function () {
        if (this.startTime == 0) {
            return "";
        }
        var date = new Date(this.startTime * 1000);
        return (date.getMonth() + 1) + "月" + date.getDate() + "号(周" + this.guildWarNumDaXie[date.getDay()] + ")" + "20:00开启龙城争霸";
    };
    GuildWarModel.prototype.getCdByType = function (type) {
        if (GameMap.fubenID == 0) {
            return 0;
        }
        var data = GlobalConfig.GuildBattleLevel;
        for (var k in data) {
            if (data[k].fbId == GameMap.fubenID) {
                if (type == 1 || type == 3) {
                    return data[k].switchSceneCd;
                }
            }
        }
        return 0;
    };
    GuildWarModel.prototype.getIsShowGuildWarBtn = function () {
        if (this.startTime == 0 || GlobalConfig.GuildBattleConst.openLevel > Actor.level) {
            return 0;
        }
        var date = new Date(this.startTime * 1000);
        var date2 = new Date(GameServer.serverTime);
        if ((date.getDate() == date2.getDate() && (date2.getHours() < 20 || (date2.getHours() == 20 && date2.getMinutes() <= 15))) || this.isWatStart) {
            return 1;
        }
        return 0;
    };
    GuildWarModel.prototype.rankListChange = function (bytes) {
        var len = bytes.readInt();
        this.rankList = [];
        var info;
        for (var i = 0; i < len; i++) {
            info = new WarRankInfo();
            info.parse(bytes);
            this.rankList.push(info);
        }
        GuildWar.ins().postRankListChange();
    };
    GuildWarModel.prototype.decodePointRewardInfo = function (bytes) {
        if (!this.pointInfo) {
            this.pointInfo = new PointRewarddInfo();
        }
        this.pointInfo.parse(bytes);
        GuildWar.ins().postPointRewardChange();
    };
    GuildWarModel.prototype.getSelectDataByIndex = function (index) {
        var dataList = [];
        var info;
        var numInfo;
        if (this.sendList && this.sendList[index] && this.sendList[index].length > 0) {
            info = this.sendList[index];
            numInfo = this.sendNumList[index];
            var data = void 0;
            for (var i = 0; i < info.length; i++) {
                data = new SelectInfoData();
                data.data = info[i];
                data.num = numInfo[i];
                dataList.push(data);
            }
        }
        return dataList;
    };
    GuildWarModel.prototype.getMyPointRankReward = function (rank) {
        var data = GlobalConfig.GuildBattlePersonalRankAward;
        for (var str in data) {
            if (data[str].rank == rank) {
                return data[str].award;
            }
        }
        return [];
    };
    GuildWarModel.prototype.doEndDoorTime = function (time) {
        this._doorEndtime = time;
        TimerManager.ins().remove(this.timeDo, this);
        TimerManager.ins().doTimer(1000, this._doorEndtime, this.timeDo, this);
    };
    GuildWarModel.prototype.timeDo = function () {
        --this._doorEndtime;
        if (this._doorEndtime <= 0) {
            this._doorEndtime = 0;
            TimerManager.ins().remove(this.timeDo, this);
        }
    };
    Object.defineProperty(GuildWarModel.prototype, "doorEndtime", {
        get: function () {
            return this._doorEndtime;
        },
        enumerable: true,
        configurable: true
    });
    GuildWarModel.prototype.getMyGuildPointRank = function () {
        var guildList = Guild.ins().getGuildMembers(0);
        var len = guildList.length;
        var info;
        var pointInfo;
        this.myGuildPointRank = [];
        for (var i = 0; i < len; i++) {
            info = guildList[i];
            pointInfo = new SelectInfoData();
            pointInfo.data = info;
            pointInfo.num = this.getPointByAcId(info.roleID);
            this.myGuildPointRank.push(pointInfo);
        }
        this.myGuildPointRank.sort(this.sort);
        return this.myGuildPointRank;
    };
    GuildWarModel.prototype.getPointByAcId = function (acId) {
        var len = this.myRankList.length;
        for (var i = 0; i < len; i++) {
            if (this.myRankList[i].roleID == acId) {
                return this.myRankList[i].point;
            }
        }
        return 0;
    };
    GuildWarModel.prototype.sort = function (a, b) {
        var s1 = a.num;
        var s2 = b.num;
        if (s1 > s2)
            return -1;
        else if (s1 < s2)
            return 1;
        else
            return 0;
    };
    GuildWarModel.prototype.setMyGuildNum = function (handle, add) {
        if (add === void 0) { add = true; }
        var index = this.checkListElements(handle, this.guildHandleList);
        if (add) {
            if (index == -1) {
                this.guildHandleList.push(handle);
            }
        }
        else {
            if (index > -1) {
                this.guildHandleList.splice(index, 1);
            }
        }
        this.guildNum = this.guildHandleList.length;
        GuildWar.ins().postGuildNumChange();
    };
    GuildWarModel.prototype.clearGuildWarList = function () {
        if (this.checkinAppoint()) {
            this.weixieList = [];
            this.canPlayList = [];
            this.attHandle = 0;
            this.guildHandleList = [];
        }
    };
    return GuildWarModel;
}());
__reflect(GuildWarModel.prototype, "GuildWarModel");
var GuildRedRobInfo = (function () {
    function GuildRedRobInfo() {
    }
    GuildRedRobInfo.prototype.parse = function (bytes) {
        this.robNum = bytes.readInt();
        this.robName = bytes.readString();
        this.acId = bytes.readInt();
    };
    return GuildRedRobInfo;
}());
__reflect(GuildRedRobInfo.prototype, "GuildRedRobInfo");
var RankGuildInfo = (function () {
    function RankGuildInfo() {
    }
    RankGuildInfo.prototype.parse = function (bytes) {
        this.guildName = bytes.readString();
        this.ownName = bytes.readString();
        this.guildPoint = bytes.readInt();
    };
    return RankGuildInfo;
}());
__reflect(RankGuildInfo.prototype, "RankGuildInfo");
var MyRankGuildInfo = (function () {
    function MyRankGuildInfo() {
    }
    MyRankGuildInfo.prototype.parse = function (bytes) {
        this.roleID = bytes.readInt();
        this.myName = bytes.readString();
        this.mapName = bytes.readString();
        this.point = bytes.readInt();
        this.attr = bytes.readInt();
        this.office = bytes.readInt();
        this.job = bytes.readInt();
        this.sex = bytes.readInt();
    };
    return MyRankGuildInfo;
}());
__reflect(MyRankGuildInfo.prototype, "MyRankGuildInfo");
var WinGuildInfo = (function () {
    function WinGuildInfo() {
        this.guildId = 0;
        this.guildName = "";
        this.guildOwnName = "";
        this.guildOwnId = 0;
        this.guildOwnJob = 0;
        this.guildOwnSex = 0;
        this.clothID = 0;
        this.wapenId = 0;
        this.wingOpen = 0;
        this.winId = 0;
    }
    WinGuildInfo.prototype.parse = function (bytes) {
        this.guildId = bytes.readInt();
        this.guildName = bytes.readString();
        this.guildOwnName = bytes.readString();
        this.guildOwnId = bytes.readInt();
        this.guildOwnJob = bytes.readByte();
        this.guildOwnSex = bytes.readByte();
        this.clothID = bytes.readInt();
        this.wapenId = bytes.readInt();
        this.wingOpen = bytes.readInt();
        this.winId = bytes.readInt();
    };
    return WinGuildInfo;
}());
__reflect(WinGuildInfo.prototype, "WinGuildInfo");
var WarRankInfo = (function () {
    function WarRankInfo() {
    }
    WarRankInfo.prototype.parse = function (bytes) {
        this.name = bytes.readString();
        this.point = bytes.readInt();
    };
    return WarRankInfo;
}());
__reflect(WarRankInfo.prototype, "WarRankInfo");
var PointRewarddInfo = (function () {
    function PointRewarddInfo() {
    }
    PointRewarddInfo.prototype.parse = function (bytes) {
        this.isCan = bytes.readBoolean();
        this.id = bytes.readInt();
        this.point = bytes.readInt();
    };
    return PointRewarddInfo;
}());
__reflect(PointRewarddInfo.prototype, "PointRewarddInfo");
var GuildFlag;
(function (GuildFlag) {
    GuildFlag[GuildFlag["act"] = 0] = "act";
    GuildFlag[GuildFlag["hf"] = 1] = "hf";
    GuildFlag[GuildFlag["kf"] = 2] = "kf";
})(GuildFlag || (GuildFlag = {}));
var SelectInfoData = (function () {
    function SelectInfoData() {
    }
    return SelectInfoData;
}());
__reflect(SelectInfoData.prototype, "SelectInfoData");
//# sourceMappingURL=GuildWarModel.js.map