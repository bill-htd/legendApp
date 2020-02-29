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
var PaoDianCC = (function (_super) {
    __extends(PaoDianCC, _super);
    function PaoDianCC() {
        var _this = _super.call(this) || this;
        _this._openLeftTime = 0;
        _this._openTimer = 0;
        _this._enterCD = 0;
        _this._enterCDTimer = 0;
        _this._leftTime = 0;
        _this._areaId = 0;
        _this._shenBingExp = 0;
        _this._jadeChips = 0;
        _this.sysId = PackageID.PaoDian;
        _this.observe(GameLogic.ins().postEnterMap, _this.mapChange);
        _this.regNetMsg(1, _this.postEnterSuccess);
        _this.regNetMsg(2, _this.postBelongChange);
        _this.regNetMsg(3, _this.doEnterCD);
        _this.regNetMsg(4, _this.postOpenInfo);
        _this.regNetMsg(5, _this.doRelive);
        _this.regNetMsg(6, _this.postMyInfo);
        _this.regNetMsg(7, _this.postAreaChange);
        _this.regNetMsg(8, _this.doResult);
        return _this;
    }
    Object.defineProperty(PaoDianCC.prototype, "areaId", {
        get: function () {
            return this._areaId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaoDianCC.prototype, "shenBingExp", {
        get: function () {
            return this._shenBingExp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaoDianCC.prototype, "jadeChips", {
        get: function () {
            return this._jadeChips;
        },
        enumerable: true,
        configurable: true
    });
    PaoDianCC.prototype.mapChange = function () {
        if (GameMap.fubenID == GlobalConfig.PassionPointConfig.fbId)
            this.enterBattle();
        if (this._isPaoDian && GameMap.fubenID != GlobalConfig.PassionPointConfig.fbId)
            this.escBattle();
        if (this.gotoNpc && GameMap.fbType == UserFb.FB_TYPE_CITY) {
            this.gotoNpc = false;
            GameMap.myMoveTo(GlobalConfig.PassionPointConfig.npcPos[0] * GameMap.CELL_SIZE, GlobalConfig.PassionPointConfig.npcPos[1] * GameMap.CELL_SIZE, this.findComplete);
            GameMap.moveTo(GlobalConfig.PassionPointConfig.npcPos[0] * GameMap.CELL_SIZE, GlobalConfig.PassionPointConfig.npcPos[1] * GameMap.CELL_SIZE);
        }
    };
    PaoDianCC.prototype.findComplete = function () {
        ViewManager.ins().open(PaoDianNpcTalkWin);
    };
    PaoDianCC.prototype.enterBattle = function () {
        this._isPaoDian = true;
        if (!ViewManager.ins().isShow(PaoDianWin))
            ViewManager.ins().open(PaoDianWin);
        ViewManager.ins().close(PaoDianNpcTalkWin);
    };
    PaoDianCC.prototype.escBattle = function () {
        this._isPaoDian = false;
        ViewManager.ins().close(PaoDianWin);
    };
    PaoDianCC.ins = function () {
        return _super.ins.call(this);
    };
    Object.defineProperty(PaoDianCC.prototype, "isPaoDian", {
        get: function () {
            return this._isPaoDian;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaoDianCC.prototype, "isOpen", {
        get: function () {
            return this._isOpen;
        },
        enumerable: true,
        configurable: true
    });
    PaoDianCC.prototype.enterPaoDian = function () {
        this.sendBaseProto(1);
    };
    PaoDianCC.prototype.postEnterSuccess = function (bytes) {
        this._leftTime = DateUtils.formatMiniDateTime(bytes.readInt());
    };
    PaoDianCC.prototype.getLeftTime = function () {
        return Math.floor((this._leftTime - GameServer.serverTime) / 1000);
    };
    PaoDianCC.prototype.postBelongChange = function (bytes) {
        this._belongs = [];
        var len = bytes.readInt();
        this._belongs.length = len;
        for (var i = 0; i < len; i++)
            this._belongs[i] = { id: bytes.readShort(), handler: bytes.readDouble() };
    };
    PaoDianCC.prototype.doEnterCD = function (bytes) {
        this._enterCD = bytes.readInt();
        this._enterCDTimer = egret.getTimer();
    };
    PaoDianCC.prototype.getEnterCD = function () {
        return Math.ceil(this._enterCD - (egret.getTimer() - this._enterCDTimer) / 1000);
    };
    PaoDianCC.prototype.postOpenInfo = function (bytes) {
        this._isOpen = bytes.readBoolean();
        this._openLeftTime = bytes.readInt();
        this._openTimer = egret.getTimer();
    };
    PaoDianCC.prototype.getOpenLeftTime = function () {
        return this._openLeftTime - (egret.getTimer() - this._openTimer) / 1000;
    };
    PaoDianCC.prototype.sendReLive = function () {
        this.sendBaseProto(5);
    };
    PaoDianCC.prototype.doRelive = function (bytes) {
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
    PaoDianCC.prototype.sendCheckMyInfo = function () {
        this.sendBaseProto(6);
    };
    PaoDianCC.prototype.postMyInfo = function (bytes) {
        this._shenBingExp = bytes.readInt();
        this._jadeChips = bytes.readInt();
    };
    PaoDianCC.prototype.postAreaChange = function (bytes) {
        this._areaId = bytes.readShort();
    };
    PaoDianCC.prototype.doResult = function (bytes) {
        var len = bytes.readInt();
        var list = [];
        list.length = len;
        for (var i = 0; i < len; i++)
            list[i] = new PaoDianRankVo(bytes);
        ViewManager.ins().open(PaoDianResultWin, list);
    };
    PaoDianCC.prototype.checkRedPoint = function () {
        return this.isOpen && (Actor.level + UserZs.ins().lv * 1000 >= GlobalConfig.PassionPointConfig.openLv);
    };
    PaoDianCC.prototype.getBelongById = function (id) {
        if (!this._belongs || this._belongs.length == 0)
            return null;
        var len = this._belongs.length;
        for (var i = 0; i < len; i++) {
            if (this._belongs[i].id == id)
                return this._belongs[i];
        }
        return null;
    };
    return PaoDianCC;
}(BaseSystem));
__reflect(PaoDianCC.prototype, "PaoDianCC");
var GameSystem;
(function (GameSystem) {
    GameSystem.paoDianCC = PaoDianCC.ins.bind(PaoDianCC);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=PaoDianCC.js.map