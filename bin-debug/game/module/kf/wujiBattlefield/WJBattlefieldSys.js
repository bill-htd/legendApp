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
var WJBattlefieldSys = (function (_super) {
    __extends(WJBattlefieldSys, _super);
    function WJBattlefieldSys() {
        var _this = _super.call(this) || this;
        _this.campAScores = 0;
        _this.campBScores = 0;
        _this.flagInfos = [];
        _this.overCounts = 0;
        _this.matchingTime = 0;
        _this.isWJBattle = false;
        _this.isActiveQuit = false;
        _this.sysId = PackageID.WJBattle;
        _this.regNetMsg(0, _this.postStateInfo);
        _this.regNetMsg(1, _this.postMatchData);
        _this.regNetMsg(2, _this.doCancelMatch);
        _this.regNetMsg(3, _this.postEnterFbInfo);
        _this.regNetMsg(4, _this.doBattleResult);
        _this.regNetMsg(5, _this.postRefCampScores);
        _this.regNetMsg(6, _this.postRefCampFlag);
        _this.regNetMsg(7, _this.postFirstKiller);
        _this.regNetMsg(8, _this.postInfo);
        _this.regNetMsg(9, _this.postChatInfo);
        _this.regNetMsg(10, _this.doViewDataInfo);
        _this.regNetMsg(11, _this.postRemain);
        _this.regNetMsg(12, _this.postMyData);
        _this.observe(GameLogic.ins().postEnterMap, function () {
            if (_this.isWJBattle && GameMap.fubenID != 52000)
                _this.quitWJBattle();
        });
        return _this;
    }
    WJBattlefieldSys.ins = function () {
        return _super.ins.call(this);
    };
    WJBattlefieldSys.prototype.postStateInfo = function (bytes) {
        this.isOpen = bytes.readByte() > 0 ? true : false;
        this._prepStartTime = bytes.readInt();
        this._startTime = bytes.readInt();
        this._endTime = bytes.readInt();
    };
    WJBattlefieldSys.prototype.postMatchData = function (bytes) {
        ViewManager.ins().open(WJBattlefieldMatchPanel);
    };
    WJBattlefieldSys.prototype.doCancelMatch = function (bytes) {
        ViewManager.ins().close(WJBattlefieldMatchPanel);
        WJBattlefieldSys.ins().matchingTime = 0;
    };
    WJBattlefieldSys.prototype.postEnterFbInfo = function (bytes) {
        var startTimeStamp = bytes.readInt();
        this.myCampId = bytes.readInt();
        this.campAScores = bytes.readInt();
        this.campBScores = bytes.readInt();
        this.flagHandle = [];
        var num = bytes.readByte();
        for (var i = 0; i < num; i++) {
            this.flagHandle[bytes.readByte()] = bytes.readDouble();
        }
        this.isWJBattle = true;
        WJBattlefieldSys.ins().matchingTime = 0;
        ViewManager.ins().close(WJBattlefieldWin);
        ViewManager.ins().open(WJBattlefieldMainUI);
        ViewManager.ins().open(WJBattlefieldStartCountdownPanel);
        KFServerSys.ins().linkingKFState(false);
    };
    WJBattlefieldSys.prototype.doBattleResult = function (bytes) {
        var AScores = bytes.readInt();
        var BScores = bytes.readInt();
        this.resultMyInfoData = [];
        this.resultEnemyInfoData = [];
        var num = bytes.readByte();
        for (var i = 0; i < num; i++) {
            var data = new WJBattleData();
            data.readResultData(bytes);
            data.isResult = true;
            if (data.camp == this.myCampId) {
                this.resultMyInfoData.push(data);
            }
            else {
                this.resultEnemyInfoData.push(data);
            }
        }
        ViewManager.ins().open(WJBattlefieldResultWin, AScores, BScores, this.resultMyInfoData, this.resultEnemyInfoData);
    };
    WJBattlefieldSys.prototype.postRefCampScores = function (bytes) {
        this.campAScores = bytes.readInt();
        this.campBScores = bytes.readInt();
    };
    WJBattlefieldSys.prototype.postRefCampFlag = function (bytes) {
        var n = bytes.readByte();
        this.flagInfos[n] = bytes.readInt();
    };
    WJBattlefieldSys.prototype.postFirstKiller = function (bytes) {
    };
    WJBattlefieldSys.prototype.postInfo = function (bytes) {
        var _this = this;
        this.overCounts = bytes.readInt();
        var isBattle = bytes.readByte();
        if (isBattle && !this.isActiveQuit) {
            WarnWin.show("您有正在进行的玩法，是否立刻返回？", function () {
                _this.sendEnter();
            }, this, null, null, "sure");
        }
        this.isActiveQuit = false;
    };
    WJBattlefieldSys.prototype.postChatInfo = function (bytes) {
        var servId = bytes.readInt();
        var playerName = bytes.readString();
        var msg = bytes.readString();
        var content = "s" + servId + "." + playerName + ":" + msg;
        return content;
    };
    WJBattlefieldSys.prototype.doViewDataInfo = function (bytes) {
        var num = bytes.readByte();
        var myList = [];
        var enemyList = [];
        for (var i = 0; i < num; i++) {
            var data = new WJBattleData();
            data.readViewData(bytes);
            data.isResult = false;
            if (data.camp == this.myCampId) {
                myList.push(data);
            }
            else {
                enemyList.push(data);
            }
        }
        ViewManager.ins().open(WJBattlefieldDataWin, myList, enemyList);
    };
    WJBattlefieldSys.prototype.postRemain = function (bytes) {
        var cd = bytes.readShort();
        ViewManager.ins().open(ReliveWin, cd, "\u654C\u65B9");
    };
    WJBattlefieldSys.prototype.postMyData = function (bytes) {
        this.myData = new WJBattleData;
        this.myData.readMyData(bytes);
        return this.myData;
    };
    WJBattlefieldSys.prototype.sendMatch = function (isDown) {
        var bytes = this.getBytes(1);
        bytes.writeShort(isDown ? 1 : 0);
        this.sendToServer(bytes);
    };
    WJBattlefieldSys.prototype.sendEnter = function () {
        this.sendBaseProto(3);
    };
    WJBattlefieldSys.prototype.sendCancelMatch = function () {
        this.sendBaseProto(2);
    };
    WJBattlefieldSys.prototype.sendChatInfo = function (msg) {
        var bytes = this.getBytes(9);
        bytes.writeString(msg);
        this.sendToServer(bytes);
    };
    WJBattlefieldSys.prototype.sendViewDataInfo = function () {
        this.sendBaseProto(10);
    };
    WJBattlefieldSys.prototype.quitWJBattle = function () {
        this.isWJBattle = false;
        this.myCampId = 0;
        this.campAScores = 0;
        this.campBScores = 0;
        ViewManager.ins().close(WJBattlefieldMainUI);
        ViewManager.ins().close(WJBattlefieldResultWin);
        this.isActiveQuit = true;
    };
    WJBattlefieldSys.postSwitchServer = function () {
        ViewManager.ins().close(WJBattlefieldMatchPanel);
    };
    WJBattlefieldSys.prototype.getPrepStartTimeStamp = function () {
        return this._prepStartTime - egret.getTimer();
    };
    WJBattlefieldSys.prototype.getStartTime = function () {
        return Math.floor((DateUtils.formatMiniDateTime(this._startTime) - GameServer.serverTime) / 1000);
    };
    WJBattlefieldSys.prototype.getEndTime = function () {
        return Math.floor((DateUtils.formatMiniDateTime(this._endTime) - GameServer.serverTime) / 1000);
    };
    WJBattlefieldSys.prototype.getMatchingTime = function () {
        if (this.matchingTime == 0)
            return 0;
        return this.matchingTime + egret.getTimer() / 1000 >> 0;
    };
    return WJBattlefieldSys;
}(BaseSystem));
__reflect(WJBattlefieldSys.prototype, "WJBattlefieldSys");
var GameSystem;
(function (GameSystem) {
    GameSystem.wjBattlefieldSys = WJBattlefieldSys.ins.bind(WJBattlefieldSys);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=WJBattlefieldSys.js.map