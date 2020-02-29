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
var Rank = (function (_super) {
    __extends(Rank, _super);
    function Rank() {
        var _this = _super.call(this) || this;
        _this.rankModel = [];
        _this.rankTypeList = [];
        _this.sysId = PackageID.Ranking;
        _this.regNetMsg(1, _this.postRankingData);
        _this.regNetMsg(2, _this.postPraiseData);
        _this.regNetMsg(3, _this.postPraiseResult);
        _this.regNetMsg(4, _this.postAllPraiseData);
        return _this;
    }
    Rank.ins = function () {
        return _super.ins.call(this);
    };
    Rank.prototype.initLogin = function () {
        this.sendGetAllPraiseData();
    };
    Rank.prototype.sendGetRankingData = function (type) {
        if (type === void 0) { type = 0; }
        var bytes = this.getBytes(1);
        bytes.writeShort(type);
        this.sendToServer(bytes);
    };
    Rank.prototype.postRankingData = function (bytes) {
        var rankModel = this.getRankModel(bytes.readShort());
        rankModel.parser(bytes);
        return rankModel;
    };
    Rank.prototype.sendGetPraiseData = function (type) {
        if (type === void 0) { type = 0; }
        var bytes = this.getBytes(2);
        bytes.writeShort(type);
        this.sendToServer(bytes);
    };
    Rank.prototype.postPraiseData = function (bytes) {
        var rankModel = Rank.ins().getRankModel(bytes.readShort());
        rankModel.praise.praiseTime = bytes.readShort();
        rankModel.praise.parser(bytes);
        return rankModel.type;
    };
    Rank.prototype.sendGetAllPraiseData = function () {
        this.sendBaseProto(4);
    };
    Rank.prototype.postAllPraiseData = function (bytes) {
        var n = bytes.readShort();
        for (var i = 0; i < n; i++) {
            var rankModel = Rank.ins().getRankModel(bytes.readShort());
            rankModel.praise.praiseTime = bytes.readShort();
        }
    };
    Rank.prototype.sendPraise = function (type) {
        var bytes = this.getBytes(3);
        bytes.writeShort(type);
        this.sendToServer(bytes);
    };
    Rank.prototype.postPraiseResult = function (bytes) {
        var rankModel = Rank.ins().getRankModel(bytes.readShort());
        rankModel.praise.praiseTime = bytes.readShort();
        return [rankModel.type, rankModel.praise.getLastMobaiNum()];
    };
    Rank.prototype.getRankModel = function (type) {
        if (!(type in this.rankModel)) {
            var dataClass = void 0;
            if (type == RankDataType.TYPE_SKIRMISH)
                dataClass = RankDataSkirmish;
            else if (type == RankDataType.TYPE_LADDER)
                dataClass = RankDataLadder;
            else if (type == RankDataType.TYPE_BAOSHI)
                dataClass = RankDataZhuZao;
            else if (type == RankDataType.TYPE_LONGHUN)
                dataClass = RankDataLongHun;
            else if (type == RankDataType.TYPE_WING)
                dataClass = RankDataWing;
            else if (type == RankDataType.TYPE_BOOK)
                dataClass = RankDataBook;
            else if (type == RankDataType.TYPE_ZS)
                dataClass = RankDataZhuan;
            else if (type == RankDataType.TYPE_SCORE)
                dataClass = RankDataScore;
            else if (type == RankDataType.TYPE_WEIWANG)
                dataClass = RankDataWeiWang;
            else
                dataClass = RankDataBase;
            this.rankModel[type] = new RankModel(type, dataClass);
        }
        return this.rankModel[type];
    };
    Rank.prototype.canPraiseByType = function (type) {
        return false;
    };
    Rank.prototype.canPraiseInAll = function () {
        if (this.rankTypeList.length <= 0) {
            this.rankTypeList = [RankDataType.TYPE_POWER,
                RankDataType.TYPE_SKIRMISH,
                RankDataType.TYPE_LEVEL,
                RankDataType.TYPE_LILIAN,
                RankDataType.TYPE_XUNZHANG];
        }
        for (var _i = 0, _a = this.rankModel; _i < _a.length; _i++) {
            var value = _a[_i];
            if (value && this.rankTypeList.lastIndexOf(value.type) > -1) {
                if (value.praise && value.praise.praiseTime < 1) {
                    return true;
                }
            }
        }
        return false;
    };
    return Rank;
}(BaseSystem));
__reflect(Rank.prototype, "Rank");
var RankModel = (function () {
    function RankModel(type, dataClass) {
        this.type = type;
        this._dataClass = dataClass;
        this._dataList = [];
        this.praise = new PraiseData;
    }
    RankModel.prototype.getDataList = function (index) {
        if (index === void 0) { index = -1; }
        return index == -1 ? this._dataList : this._dataList[index];
    };
    RankModel.prototype.parser = function (bytes) {
        var items = RankDataType.ITEMS[this.type];
        var n = bytes.readShort();
        this._dataList.length = n;
        for (var i = 0; i < n; ++i) {
            if (!(i in this._dataList))
                this._dataList[i] = new this._dataClass;
            this._dataList[i].parser(bytes, items);
        }
        this.selfPos = bytes.readShort();
    };
    return RankModel;
}());
__reflect(RankModel.prototype, "RankModel");
var GameSystem;
(function (GameSystem) {
    GameSystem.rank = Rank.ins.bind(Rank);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=Rank.js.map