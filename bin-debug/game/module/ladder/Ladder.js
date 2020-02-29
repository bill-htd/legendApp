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
var Ladder = (function (_super) {
    __extends(Ladder, _super);
    function Ladder() {
        var _this = _super.call(this) || this;
        _this.isCanReward = false;
        _this.upLevel = 0;
        _this.upId = 0;
        _this.upWin = 0;
        _this.todayBuyTime = 0;
        _this.upWeekRank = 0;
        _this.upRankList = [];
        _this._actorInfo = [];
        _this.sysId = PackageID.Ladder;
        _this.regNetMsg(1, _this.doLadderInfo);
        _this.regNetMsg(2, _this.doGetPlayer);
        _this.regNetMsg(3, _this.doPlayResule);
        _this.regNetMsg(5, _this.postRankInfoList);
        _this.regNetMsg(6, _this.doChallageNum);
        return _this;
    }
    Ladder.ins = function () {
        return _super.ins.call(this);
    };
    Ladder.prototype.getActorInfo = function (index) {
        if (index === void 0) { index = -1; }
        return index == -1 ? this._actorInfo : this._actorInfo[index];
    };
    Ladder.prototype.sendGetSomeOne = function () {
        this.sendBaseProto(2);
    };
    Ladder.prototype.sendStarPlay = function (id, type) {
        var bytes = this.getBytes(3);
        bytes.writeInt(type);
        bytes.writeInt(id);
        this.sendToServer(bytes);
        this._actorInfo = [];
    };
    Ladder.prototype.sendGetWeekReward = function () {
        this.sendBaseProto(4);
    };
    Ladder.prototype.sendGetRankInfo = function () {
        this.sendBaseProto(5);
    };
    Ladder.prototype.sendBuyChallgeTime = function () {
        this.sendBaseProto(6);
    };
    Ladder.prototype.doLadderInfo = function (bytes) {
        this.docodeInfo(bytes);
    };
    Ladder.prototype.postTadderChange = function () {
    };
    Ladder.prototype.doGetPlayer = function (bytes) {
        var type = bytes.readInt();
        var id = bytes.readInt();
        this._actorInfo.length = 0;
        this._actorInfo.push(type, id);
        if (id > 0) {
            this._actorInfo.push(bytes.readString());
            this._actorInfo.push(bytes.readByte());
            this._actorInfo.push(bytes.readByte());
            this._actorInfo.push(bytes.readInt());
            this._actorInfo.push(bytes.readInt());
        }
    };
    Ladder.prototype.doPlayResule = function (bytes) {
        this.doPlayResult(bytes);
    };
    Ladder.prototype.postRankInfoList = function (bytes) {
        var rankModel = Rank.ins().getRankModel(RankDataType.TYPE_LADDER);
        var n = bytes.readShort();
        rankModel.getDataList().length = n;
        var arr = rankModel.getDataList();
        var i = 0;
        for (i = 0; i < n; ++i) {
            this.setRankData(arr, i, bytes);
        }
        var rankInfo = this.getMyRankInfo(arr);
        rankModel.selfPos = rankInfo ? rankInfo.pos : 0;
        this.upRankList = [];
        this.upweekLength = 0;
        n = bytes.readShort();
        for (i = 0; i < n; ++i) {
            this.setRankData(this.upRankList, i, bytes, true);
        }
        this.fillingList();
        return rankModel;
    };
    Ladder.prototype.setRankData = function (list, index, bytes, setRank) {
        if (setRank === void 0) { setRank = false; }
        if (!(index in list))
            list[index] = new RankDataLadder;
        list[index].parser(bytes, null);
        list[index].pos = index + 1;
        if (setRank && list[index].id == Actor.actorID) {
            this.upWeekRank = list[index].pos;
        }
    };
    Ladder.prototype.doChallageNum = function (bytes) {
        this.todayBuyTime = bytes.readInt();
    };
    Ladder.prototype.docodeInfo = function (bytes) {
        this.isOpen = bytes.readBoolean();
        this.level = bytes.readInt();
        this.nowId = bytes.readInt();
        this.challgeNum = bytes.readInt();
        var time = bytes.readInt();
        this.challgeCd = time * 1000 + egret.getTimer();
        this.winNum = bytes.readInt();
        this.lianWin = bytes.readBoolean();
        this.playUpTime = bytes.readBoolean();
        if (this.playUpTime) {
            this.isCanReward = bytes.readBoolean();
            this.upLevel = bytes.readInt();
            this.upId = bytes.readInt();
            this.upWin = bytes.readInt();
        }
        Ladder.ins().postTadderChange();
    };
    Ladder.prototype.doPlayResult = function (bytes) {
        var isWin = bytes.readBoolean();
        var num = bytes.readShort();
        var list = [];
        var item;
        for (var i = 0; i < num; i++) {
            item = new RewardData();
            item.parser(bytes);
            list.push(item);
        }
        var upLevel = bytes.readInt();
        var upId = bytes.readInt();
        var upStar = bytes.readInt();
        TimerManager.ins().doTimer(1000, 1, function () {
            ViewManager.ins().open(LadderResultWin, isWin, list.reverse(), upLevel, upId, upStar);
        }, this);
    };
    Ladder.prototype.fillingList = function () {
        if (this.upweekLength == 0) {
            this.upweekLength = this.checkObjListLength();
        }
        var len = this.upweekLength - this.upRankList.length;
        if (len > 0) {
            for (var i = 1; i < len; i++) {
                this.upRankList.push(null);
            }
        }
        if (!this.configList) {
            this.configList = this.cloneConfigDataList(GlobalConfig.TianTiDanConfig);
            this.configList.reverse();
        }
    };
    Ladder.prototype.getUpRankList = function () {
        var list = [];
        for (var index in this.upRankList) {
            if (this.upRankList[index]) {
                list.push(this.upRankList[index]);
            }
        }
        return list;
    };
    Ladder.prototype.checkObjListLength = function () {
        for (var i = 1; i < 200; i++) {
            if (!GlobalConfig.TianTiRankAwardConfig[i + ""]) {
                return i;
            }
        }
        return 0;
    };
    Ladder.prototype.getMyRankInfo = function (itemList) {
        for (var i = 0; i < itemList.length; i++) {
            if (itemList[i].id == Actor.actorID) {
                return itemList[i];
            }
        }
        return null;
    };
    Ladder.prototype.getLevelDuanWeiLength = function (level) {
        var len = 0;
        var list = GlobalConfig.TianTiDanConfig;
        for (var id in list[level + ""]) {
            if (list[level + ""][id]) {
                len++;
            }
        }
        return len;
    };
    Ladder.prototype.getDuanWeiDesc = function () {
        var str = "";
        var config = this.getLevelConfig();
        if (config) {
            str = config.showLevel + this.getZhongwenNumber(config.showDan) + "段";
        }
        return str;
    };
    Ladder.prototype.getLevelConfig = function (level, ids) {
        if (level === void 0) { level = -1; }
        if (ids === void 0) { ids = -1; }
        if (level == -1) {
            level = this.level;
        }
        if (ids == -1) {
            ids = this.nowId;
        }
        var list = GlobalConfig.TianTiDanConfig;
        for (var id in list[level + ""]) {
            if (list[level + ""][id].id == ids) {
                return list[level + ""][id];
            }
        }
        return null;
    };
    Ladder.prototype.creatRewardData = function (data) {
        var item;
        item = new RewardData();
        item.count = data.count;
        item.type = data.type;
        item.id = data.id;
        return item;
    };
    Ladder.prototype.getZhongwenNumber = function (i) {
        var str = "";
        switch (i) {
            case 1:
                str = "一";
                break;
            case 2:
                str = "二";
                break;
            case 3:
                str = "三";
                break;
            case 4:
                str = "四";
                break;
            case 5:
                str = "五";
                break;
            case 6:
                str = "六";
                break;
            case 7:
                str = "七";
                break;
            case 8:
                str = "八";
                break;
            case 9:
                str = "九";
                break;
            case 10:
                str = "十";
                break;
        }
        return str;
    };
    Ladder.prototype.cloneConfigDataList = function (list) {
        var returnList = [];
        var item;
        for (var i in list) {
            for (var j in list[i]) {
                item = new TianTiDanConfig();
                item.level = parseInt(i);
                item.id = list[i][j].id;
                item.showStar = list[i][j].showStar;
                item.showDan = list[i][j].showDan;
                item.showLevel = list[i][j].showLevel;
                item.winAward = list[i][j].winAward;
                item.danAward = list[i][j].danAward;
                if (this.checkIshaveOne(returnList, item)) {
                    returnList.push(item);
                }
            }
        }
        return returnList;
    };
    Ladder.prototype.checkRedShow = function () {
        if ((this.challgeNum > 0 && this.isOpen)) {
            return 1;
        }
        return 0;
    };
    Ladder.prototype.checkIshaveOne = function (list, item) {
        var len = list.length;
        for (var i = 0; i < len; i++) {
            if (list[i].level == item.level) {
                return false;
            }
        }
        return true;
    };
    Ladder.prototype.getStatuByLevel = function (level) {
        var str;
        switch (level) {
            case 1:
                str = 3;
                break;
            case 2:
                str = 4;
                break;
            case 3:
                str = 5;
                break;
            case 4:
                str = 0;
                break;
        }
        return str;
    };
    return Ladder;
}(BaseSystem));
__reflect(Ladder.prototype, "Ladder");
var GameSystem;
(function (GameSystem) {
    GameSystem.ladder = Ladder.ins.bind(Ladder);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=Ladder.js.map