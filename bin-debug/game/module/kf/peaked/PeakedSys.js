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
var PeakedSys = (function (_super) {
    __extends(PeakedSys, _super);
    function PeakedSys() {
        var _this = _super.call(this) || this;
        _this.player16List = [];
        _this.player8List = [];
        _this.player4List = [];
        _this.topRankInfoList = [];
        _this.betInfo = [];
        _this.myBattleReportList = [];
        _this.bfStatusIsEnd = 0;
        _this.kfStatusIsEnd = 0;
        _this.bfKonckReportList = [];
        _this.kfPlayer64List = [];
        _this.kfPlayer32List = [];
        _this.kfPlayer16List = [];
        _this.kfPlayer8List = [];
        _this.kfPlayer4List = [];
        _this.kfKonckReportList = [];
        _this.kfTopRankInfoList = [];
        _this.kfBetInfo = [];
        _this.myKFBattleReportList = [];
        _this.crossScene = 10000;
        _this.sysId = PackageID.PKCompetition;
        _this.regNetMsg(0, _this.postState);
        _this.regNetMsg(1, _this.postSignUp);
        _this.regNetMsg(2, _this.doPKResult);
        _this.regNetMsg(3, _this.postEliminateReportData);
        _this.regNetMsg(4, _this.postBFInfoList);
        _this.regNetMsg(5, _this.postTopRank);
        _this.regNetMsg(7, _this.postBetInfo);
        _this.regNetMsg(8, _this.postKFEliminateReportData);
        _this.regNetMsg(9, _this.postKFInfoList);
        _this.regNetMsg(10, _this.postKFTopRank);
        _this.regNetMsg(12, _this.postKFBetInfo);
        _this.regNetMsg(13, _this.doFbCountDown);
        _this.regNetMsg(14, _this.postWorship);
        _this.observe(GameLogic.ins().postEnterMap, function () {
            _this.isCrossScene();
        });
        return _this;
    }
    PeakedSys.ins = function () {
        return _super.ins.call(this);
    };
    PeakedSys.prototype.postState = function (bytes) {
        var _this = this;
        if (bytes) {
            this.bfStatus = bytes.readByte();
            this.bfStatusIsEnd = bytes.readByte();
            this.kfStatus = bytes.readByte();
            this.kfStatusIsEnd = bytes.readByte();
            if (this.bfStatus == 0)
                this.isSignUp = 0;
        }
        PeakedHelp.calcTimerNode();
        if (this.bfStatus == BF_PeakStatus.Finals && this.bfStatusIsEnd) {
            var t = PeakedHelp.bfStatusTimer[BF_PeakStatus.Over] * 1000 - GameServer.serverTime;
            console.log('--------------');
            console.log(PeakedHelp.bfStatusTimer[BF_PeakStatus.Over] * 1000);
            console.log(GameServer.serverTime);
            if (this.kfStatus > KF_PeakStatus.None)
                t = 0;
            if (t <= 0)
                this.bfStatus = BF_PeakStatus.Over;
            else {
                TimerManager.ins().doTimer(t, 1, function () {
                    _this.bfStatus = BF_PeakStatus.Over;
                    PeakedHelp.calcTimerNode();
                    _this.postState(null);
                }, this);
            }
        }
        if (PeakedSys.ins().isKf())
            PeakedSys.ins().sendKFBetInfo();
    };
    PeakedSys.prototype.postSignUp = function (bytes) {
        this.isSignUp = bytes.readByte();
        this.kideNum = bytes.readInt();
        Actor.ins().postChip(bytes.readNumber());
        this.curStateTime = bytes.readInt();
        this.worshipNum = bytes.readByte();
        PeakedHelp.calcTimerNode();
        return this.isSignUp;
    };
    PeakedSys.prototype.doPKResult = function (bytes) {
        var result = bytes.readByte();
        var enemyName = bytes.readString();
        ViewManager.ins().open(PeakedFBResult, result, enemyName);
    };
    PeakedSys.prototype.postEliminateReportData = function (bytes) {
        this.bfKonckRound = bytes.readShort();
        this.bfKonckNextTimer = bytes.readInt();
        this.bfKonckSurplusNum = bytes.readShort();
        this.bfKonckReportList = [];
        var count = bytes.readShort();
        for (var i = 0; i < count; i++) {
            var data = new KonckReportData();
            data.readBFData(bytes);
            data.round = i + 1;
            this.bfKonckReportList.push(data);
        }
    };
    PeakedSys.prototype.postBFInfoList = function (bytes) {
        var pkPlayerData;
        this.player16List = [];
        var count = bytes.readByte();
        for (var i = 0; i < count; i++) {
            pkPlayerData = new PeakPlayerData();
            pkPlayerData.readBaseData(bytes);
            this.player16List.push(pkPlayerData);
        }
        this.player8List = [];
        count = bytes.readByte();
        for (var i = 0; i < count; i++) {
            pkPlayerData = new PeakPlayerData();
            pkPlayerData.playerList = [];
            PeakedHelp.pushPlayerList(this.player16List, this.player16List, pkPlayerData.playerList, i);
            pkPlayerData.readToData(bytes);
            this.player8List.push(pkPlayerData);
        }
        this.player4List = [];
        count = bytes.readByte();
        for (var i = 0; i < count; i++) {
            pkPlayerData = new PeakPlayerData();
            pkPlayerData.playerList = [];
            PeakedHelp.pushPlayerList(this.player8List, this.player16List, pkPlayerData.playerList, i);
            pkPlayerData.readToData(bytes);
            this.player4List.push(pkPlayerData);
        }
        this.player2Data = new PeakPlayerData();
        this.player2Data.playerList = [];
        PeakedHelp.pushPlayerList(this.player4List, this.player16List, this.player2Data.playerList, 0);
        this.player2Data.readToData(bytes);
        this.myBattleReportList = PeakedHelp.countMyRecordData();
    };
    PeakedSys.prototype.postTopRank = function (bytes) {
        var count = bytes.readShort();
        this.topRankInfoList = [];
        for (var i = 0; i < count; i++) {
            var data = new PeakTopRankData(bytes);
            data.rank = i + 1;
            this.topRankInfoList.push(data);
        }
    };
    PeakedSys.prototype.postBetInfo = function (bytes) {
        var count = bytes.readByte();
        this.betInfo = [];
        for (var i = 0; i < count; i++) {
            var dt = new PeakBetData(bytes);
            this.betInfo.push(dt);
        }
        if (ViewManager.ins().isShow(PeakBetWin))
            UserTips.ins().showTips("\u606D\u559C\u60A8\uFF0C\u4E0B\u6CE8\u6210\u529F");
        ViewManager.ins().close(PeakBetWin);
    };
    PeakedSys.prototype.postKFEliminateReportData = function (bytes) {
        this.kfKonckRound = bytes.readShort();
        this.kfKonckNextTimer = bytes.readInt();
        this.kfKonckSurplusNum = bytes.readShort();
        this.kfKonckReportList = [];
        var count = bytes.readShort();
        for (var i = 0; i < count; i++) {
            var data = new KonckReportData();
            data.readKFData(bytes);
            data.round = i + 1;
            this.kfKonckReportList.push(data);
        }
    };
    PeakedSys.prototype.postKFInfoList = function (bytes) {
        var pkPlayerData;
        this.kfPlayer64List = [];
        var count = bytes.readByte();
        for (var i = 0; i < count; i++) {
            pkPlayerData = new PeakPlayerData();
            pkPlayerData.readBaseData(bytes, true);
            this.kfPlayer64List.push(pkPlayerData);
        }
        this.kfPlayer32List = [];
        count = bytes.readByte();
        for (var i = 0; i < count; i++) {
            pkPlayerData = new PeakPlayerData();
            pkPlayerData.playerList = [];
            PeakedHelp.pushPlayerList(this.kfPlayer64List, this.kfPlayer64List, pkPlayerData.playerList, i);
            pkPlayerData.readToData(bytes);
            this.kfPlayer32List.push(pkPlayerData);
        }
        this.kfPlayer16List = [];
        count = bytes.readByte();
        for (var i = 0; i < count; i++) {
            pkPlayerData = new PeakPlayerData();
            pkPlayerData.playerList = [];
            PeakedHelp.pushPlayerList(this.kfPlayer32List, this.kfPlayer64List, pkPlayerData.playerList, i);
            pkPlayerData.readToData(bytes);
            this.kfPlayer16List.push(pkPlayerData);
        }
        this.kfPlayer8List = [];
        count = bytes.readByte();
        for (var i = 0; i < count; i++) {
            pkPlayerData = new PeakPlayerData();
            pkPlayerData.playerList = [];
            PeakedHelp.pushPlayerList(this.kfPlayer16List, this.kfPlayer64List, pkPlayerData.playerList, i);
            pkPlayerData.readToData(bytes);
            this.kfPlayer8List.push(pkPlayerData);
        }
        this.kfPlayer4List = [];
        count = bytes.readByte();
        for (var i = 0; i < count; i++) {
            pkPlayerData = new PeakPlayerData();
            pkPlayerData.playerList = [];
            PeakedHelp.pushPlayerList(this.kfPlayer8List, this.kfPlayer64List, pkPlayerData.playerList, i);
            pkPlayerData.readToData(bytes);
            this.kfPlayer4List.push(pkPlayerData);
        }
        this.kfPlayer2Data = new PeakPlayerData();
        this.kfPlayer2Data.playerList = [];
        PeakedHelp.pushPlayerList(this.kfPlayer4List, this.kfPlayer64List, this.kfPlayer2Data.playerList, 0);
        this.kfPlayer2Data.readToData(bytes);
        this.myKFBattleReportList = PeakedHelp.countKFMyRecordData();
    };
    PeakedSys.prototype.postKFTopRank = function (bytes) {
        var count = bytes.readShort();
        this.kfTopRankInfoList = [];
        for (var i = 0; i < count; i++) {
            var data = new PeakTopRankData(bytes);
            data.rank = i + 1;
            this.kfTopRankInfoList.push(data);
        }
    };
    PeakedSys.prototype.postKFBetInfo = function (bytes) {
        var count = bytes.readByte();
        this.kfBetInfo = [];
        for (var i = 0; i < count; i++) {
            var dt = new PeakBetData(bytes);
            this.kfBetInfo.push(dt);
        }
        if (ViewManager.ins().isShow(PeakBetWin))
            UserTips.ins().showTips("\u606D\u559C\u60A8\uFF0C\u4E0B\u6CE8\u6210\u529F");
        ViewManager.ins().close(PeakBetWin);
    };
    PeakedSys.prototype.doFbCountDown = function (bytes) {
        var t = bytes.readInt();
        var curTime = Math.floor((DateUtils.formatMiniDateTime(t) - GameServer.serverTime) / 1000);
        egret.log(curTime);
        if (curTime > 0)
            ViewManager.ins().open(FBCountDown, curTime);
    };
    PeakedSys.prototype.postWorship = function (bytes) {
        this.worshipNum = bytes.readByte();
        if (!GlobalConfig.PeakRaceBase.mobaiChips)
            GlobalConfig.PeakRaceBase.mobaiChips = 1000;
        UserTips.ins().showCenterTips("\u819C\u62DC\u6210\u529F\uFF0C\u7B79\u7801+" + GlobalConfig.PeakRaceBase.mobaiChips);
    };
    PeakedSys.prototype.sendSignUp = function () {
        this.sendBaseProto(1);
    };
    PeakedSys.prototype.sendEliminateReport = function () {
        this.sendBaseProto(3);
    };
    PeakedSys.prototype.sendBFInfoList = function () {
        this.sendBaseProto(4);
    };
    PeakedSys.prototype.sendTopRank = function () {
        this.sendBaseProto(5);
    };
    PeakedSys.prototype.sendToLikes = function (id) {
        var bytes = this.getBytes(6);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    PeakedSys.prototype.sendBet = function (id, num) {
        var bytes = this.getBytes(7);
        bytes.writeInt(id);
        bytes.writeInt(num);
        this.sendToServer(bytes);
    };
    PeakedSys.prototype.sendKFEliminateReport = function () {
        this.sendBaseProto(8);
    };
    PeakedSys.prototype.sendKFInfoList = function () {
        this.sendBaseProto(9);
    };
    PeakedSys.prototype.sendKFTopRank = function () {
        this.sendBaseProto(10);
    };
    PeakedSys.prototype.sendKFToLikes = function (id) {
        var bytes = this.getBytes(11);
        bytes.writeInt(id);
        this.sendToServer(bytes);
    };
    PeakedSys.prototype.sendKFBet = function (id, num) {
        var bytes = this.getBytes(12);
        bytes.writeInt(id);
        bytes.writeInt(num);
        this.sendToServer(bytes);
    };
    PeakedSys.prototype.sendKFBetInfo = function () {
        this.sendBaseProto(13);
    };
    PeakedSys.prototype.sendWorship = function () {
        this.sendBaseProto(14);
    };
    PeakedSys.prototype.isOpen = function () {
        var b = OpenSystem.ins().checkSysOpen(SystemType.RING);
        var maxCount = Object.keys(GlobalConfig.ActorExRingConfig).length;
        var term = SpecialRing.ins().ringActiNum < maxCount;
        if (GameServer.serverOpenDay >= GlobalConfig.PeakRaceBase.openDay && b && !term)
            return true;
        return false;
    };
    PeakedSys.prototype.isKf = function () {
        console.log('是否在跨服中 :', this.bfStatus, this.bfStatus == BF_PeakStatus.Over, this.bfStatusIsEnd != 0);
        return this.bfStatus == BF_PeakStatus.Over && this.bfStatusIsEnd != 0;
    };
    PeakedSys.prototype.canSignUp = function () {
        var t = PeakedHelp.bfStatusTimer[BF_PeakStatus.Knockout] * 1000 - GameServer.serverTime;
        return true;
    };
    PeakedSys.prototype.isKFSixteen = function () {
        return this.kfStatus > KF_PeakStatus.Prom32 || (this.kfStatus == KF_PeakStatus.Prom32 && this.kfStatusIsEnd != 0);
    };
    PeakedSys.prototype.isCrossScene = function () {
        if (this.crossScene == 2) {
            ViewManager.ins().open(PeakedMainWin);
        }
        this.crossScene++;
    };
    return PeakedSys;
}(BaseSystem));
__reflect(PeakedSys.prototype, "PeakedSys");
var GameSystem;
(function (GameSystem) {
    GameSystem.pkCompetitionSys = PeakedSys.ins.bind(PeakedSys);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=PeakedSys.js.map