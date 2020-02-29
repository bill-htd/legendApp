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
var BattleCC = (function (_super) {
    __extends(BattleCC, _super);
    function BattleCC() {
        var _this = _super.call(this) || this;
        _this._leftTime = 0;
        _this.battleRanks = [];
        _this.myRank = 0;
        _this.myScore = 0;
        _this.awardID = 0;
        _this._openLeftTime = 0;
        _this._openTimer = 0;
        _this._enterCD = 0;
        _this._enterCDTimer = 0;
        _this._changeTime = 0;
        _this._changeLittle = 0;
        _this.sysId = PackageID.Battle;
        _this.observe(GameLogic.ins().postEnterMap, _this.mapChange);
        _this.regNetMsg(1, _this.joinResult);
        _this.regNetMsg(2, _this.doRank);
        _this.regNetMsg(3, _this.doOpen);
        _this.regNetMsg(4, _this.doRelive);
        _this.regNetMsg(5, _this.getAwardResult);
        _this.regNetMsg(6, _this.doAwardInfo);
        _this.regNetMsg(7, _this.doMyScore);
        _this.regNetMsg(10, _this.doMyRank);
        _this.regNetMsg(11, _this.doEnterCD);
        _this.regNetMsg(12, _this.doGameOver);
        _this.regNetMsg(13, _this.postLittleChange);
        _this.regNetMsg(14, _this.postChangeTime);
        _this.regNetMsg(15, _this.postKilled);
        return _this;
    }
    BattleCC.prototype.mapChange = function () {
        if (GameMap.fubenID == GlobalConfig.CampBattleConfig.fbId)
            this.enterBattle();
        if (this._isBattle && GameMap.fubenID != GlobalConfig.CampBattleConfig.fbId)
            this.escBattle();
        if (this.gotoNpc && GameMap.fbType == UserFb.FB_TYPE_CITY) {
            this.gotoNpc = false;
            GameMap.myMoveTo(GlobalConfig.CampBattleConfig.npcPos[0] * GameMap.CELL_SIZE, GlobalConfig.CampBattleConfig.npcPos[1] * GameMap.CELL_SIZE, this.findComplete);
            GameMap.moveTo(GlobalConfig.CampBattleConfig.npcPos[0] * GameMap.CELL_SIZE, GlobalConfig.CampBattleConfig.npcPos[1] * GameMap.CELL_SIZE);
        }
    };
    BattleCC.prototype.findComplete = function () {
        ViewManager.ins().open(BattleNpcTipWin);
    };
    BattleCC.ins = function () {
        return _super.ins.call(this);
    };
    BattleCC.prototype.isBattle = function () {
        return this._isBattle;
    };
    BattleCC.prototype.joinBattle = function () {
        this.sendBaseProto(1);
    };
    BattleCC.prototype.joinResult = function (bytes) {
        this.camp = bytes.readShort();
        this._leftTime = DateUtils.formatMiniDateTime(bytes.readInt());
        this.postEnterSuccess();
    };
    BattleCC.prototype.postEnterSuccess = function () {
    };
    BattleCC.prototype.doRank = function (bytes) {
        var len = bytes.readInt();
        this.battleRanks.length = len;
        var vo;
        for (var i = 0; i < len; i++) {
            vo = this.battleRanks[i];
            if (!vo) {
                vo = new BattleRankVo();
                this.battleRanks[i] = vo;
            }
            vo.parse(bytes);
        }
        this.postRankInfo();
    };
    BattleCC.prototype.doOpen = function (bytes) {
        this.isOpen = bytes.readBoolean();
        this._openLeftTime = bytes.readInt();
        this._openTimer = egret.getTimer();
        this.postOpenInfo();
    };
    BattleCC.prototype.doRelive = function (bytes) {
        UserBoss.ins().reliveTime = bytes.readInt();
        UserBoss.ins().killerHandler = bytes.readDouble();
        ViewManager.ins().close(TargetPlayerBigBloodPanel);
        if (UserBoss.ins().reliveTime > 0) {
            UserBoss.ins().clearWorldBossList();
            ViewManager.ins().open(WorldBossBeKillWin);
        }
        else
            ViewManager.ins().close(WorldBossBeKillWin);
    };
    BattleCC.prototype.postOpenInfo = function () {
    };
    BattleCC.prototype.getOpenLeftTime = function () {
        return this._openLeftTime - (egret.getTimer() - this._openTimer) / 1000;
    };
    BattleCC.prototype.getRankTop = function (len) {
        if (len === void 0) { len = 3; }
        if (this.battleRanks)
            return this.battleRanks.slice(0, len);
        return null;
    };
    BattleCC.prototype.postRankInfo = function () {
    };
    BattleCC.prototype.getLeftTime = function () {
        return Math.floor((this._leftTime - GameServer.serverTime) / 1000);
    };
    BattleCC.prototype.enterBattle = function () {
        this._isBattle = true;
        if (!ViewManager.ins().isShow(BattleWin))
            ViewManager.ins().open(BattleWin);
        ViewManager.ins().close(BattleNpcTipWin);
    };
    BattleCC.prototype.escBattle = function () {
        this._isBattle = false;
        ViewManager.ins().close(BattleWin);
        var roleList = EntityManager.ins().getEntitysBymasterhHandle(Actor.handle, EntityType.Role);
        if (roleList && roleList.length > 0) {
            var len = roleList.length;
            var role = void 0;
            for (var i = 0; i < len; i++) {
                role = roleList[i];
                if (role && role.infoModel) {
                    role.setCharName(role.infoModel.guildAndName);
                    role.updateNameColor();
                }
            }
        }
    };
    BattleCC.prototype.sendReLive = function () {
        this.sendBaseProto(4);
    };
    BattleCC.prototype.getMyAward = function () {
        this.sendBaseProto(5);
    };
    BattleCC.prototype.getAwardResult = function (bytes) {
        if (bytes.readBoolean()) {
        }
    };
    BattleCC.prototype.doAwardInfo = function (bytes) {
        this.awardID = bytes.readInt();
        this.postGiftInfo();
    };
    BattleCC.prototype.postGiftInfo = function () {
    };
    BattleCC.prototype.doMyScore = function (bytes) {
        this.myScore = bytes.readInt();
        var change = bytes.readInt();
        var roleName = bytes.readString();
        var str;
        var tip = bytes.readUnsignedByte();
        switch (tip) {
            case 1:
                str = "\u6210\u529F\u51FB\u6740|C:0x00ff00&T:" + roleName + "|\uFF0C\u79EF\u5206+|C:0x00ff00&T:" + change + "|";
                break;
            case 2:
                str = "\u52A9\u653B\u51FB\u6740|C:0x00ff00&T:" + roleName + "|\uFF0C\u79EF\u5206+|C:0x00ff00&T:" + change + "|";
                break;
            case 3:
                str = "\u88AB|C:0x00ff00&T:" + roleName + "|\u51FB\u6740\uFF0C\u79EF\u5206+|C:0x00ff00&T:" + change + "|";
                break;
            case 4:
                str = "\u83B7\u5F97\u6301\u7EED\u53C2\u4E0E\u5956\uFF0C\u79EF\u5206+|C:0x00ff00&T:" + change + "|";
                break;
            case 5:
                str = "\u6740\u602A\u83B7\u5F97\u79EF\u5206+|C:0x00ff00&T:" + change + "|";
                break;
        }
        if (str) {
            UserTips.ins().showCenterTips3(str);
        }
        this.postScoreChange();
    };
    BattleCC.prototype.doMyRank = function (bytes) {
        this.myRank = bytes.readInt();
        this.myScore = bytes.readInt();
        this.postScoreChange();
    };
    BattleCC.prototype.postScoreChange = function () {
    };
    BattleCC.prototype.doEnterCD = function (bytes) {
        this._enterCD = bytes.readInt();
        this._enterCDTimer = egret.getTimer();
    };
    BattleCC.prototype.doGameOver = function (bytes) {
        ViewManager.ins().open(BattleResultWin);
    };
    BattleCC.prototype.postLittleChange = function (bytes) {
        this._changeLittle = DateUtils.formatMiniDateTime(bytes.readInt());
    };
    BattleCC.prototype.getChangeLittleTime = function () {
        return Math.floor((this._changeLittle - GameServer.serverTime) / 1000);
    };
    BattleCC.prototype.canMove = function () {
        return this.getChangeLittleTime() <= 0;
    };
    BattleCC.prototype.postChangeTime = function (bytes) {
        this._changeTime = DateUtils.formatMiniDateTime(bytes.readInt());
    };
    BattleCC.prototype.postKilled = function (bytes) {
        return bytes.readShort();
    };
    BattleCC.prototype.getChangeTime = function () {
        return Math.floor((this._changeTime - GameServer.serverTime) / 1000);
    };
    BattleCC.prototype.getEnterCD = function () {
        return Math.ceil(this._enterCD - (egret.getTimer() - this._enterCDTimer) / 1000);
    };
    BattleCC.prototype.checkRedPoint = function () {
        return this.isOpen && Actor.level >= GlobalConfig.CampBattleConfig.openLevel;
    };
    return BattleCC;
}(BaseSystem));
__reflect(BattleCC.prototype, "BattleCC");
var GameSystem;
(function (GameSystem) {
    GameSystem.battlecc = BattleCC.ins.bind(BattleCC);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=BattleCC.js.map