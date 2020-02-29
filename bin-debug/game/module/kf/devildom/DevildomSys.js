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
var DevildomSys = (function (_super) {
    __extends(DevildomSys, _super);
    function DevildomSys() {
        var _this = _super.call(this) || this;
        _this.refTime = [];
        _this.dropRecordDataList = [];
        _this.sysId = PackageID.Devildom;
        _this.regNetMsg(1, _this.postBossInfo);
        _this.regNetMsg(2, _this.postAscriptionChange);
        _this.regNetMsg(3, _this.postRevive);
        _this.regNetMsg(7, _this.doResult);
        _this.regNetMsg(8, _this.postInfo);
        _this.observe(GameLogic.ins().postEnterMap, function () {
            if (GameMap.fbType == UserFb.FB_TYPE_DEVILDOM_BOSS) {
                _this.postEnterFb();
            }
            else if (GameMap.lastFbTyp == UserFb.FB_TYPE_DEVILDOM_BOSS) {
                _this.postQuiKFb();
            }
        });
        _this.observe(UserBoss.ins().postBossAppear, function () {
            if (_this.isDevildomBattle)
                ViewManager.ins().open(BossBelongPanel);
        });
        return _this;
    }
    DevildomSys.prototype.postBossInfo = function (bytes) {
        var count = bytes.readShort();
        this.killedState = [];
        var refTime = [];
        for (var i = 0; i < count; i++) {
            var id = bytes.readShort();
            var time = bytes.readInt();
            var isKill = bytes.readBoolean();
            this.killedState[id] = isKill;
            refTime[id] = time;
        }
        if (this.historyId && this.refTime[this.historyId] && refTime[this.historyId] != this.refTime[this.historyId]) {
            this.historyId = 0;
        }
        this.refTime = refTime.concat();
    };
    DevildomSys.prototype.postAscriptionChange = function (bytes) {
        var oldHandle = bytes.readDouble();
        var nowHandle = bytes.readDouble();
        var oldName = "";
        if (oldHandle > 0) {
            var oldChar = EntityManager.ins().getMasterList(oldHandle);
            if (oldChar && oldChar[0] && oldChar[0].infoModel) {
                oldName = oldChar[0].infoModel.name;
            }
        }
        UserBoss.ins().postBelongChange(nowHandle, oldHandle, oldName);
    };
    DevildomSys.prototype.postRevive = function (bytes) {
        var cd = bytes.readInt();
        var killHandel = bytes.readDouble();
        if (cd > 0)
            ViewManager.ins().open(DevildomReliveWin, cd, killHandel);
        else {
            ViewManager.ins().close(DevildomReliveWin);
            if (KFServerSys.ins().isKF) {
                var yb = Actor.yb - GlobalConfig.CrossBossBase.rebornCost;
                Actor.ins().postYbChange(yb);
            }
        }
    };
    DevildomSys.prototype.doResult = function (bytes) {
        var name = bytes.readString();
        var handel = bytes.readDouble();
        var isBelong = bytes.readBoolean();
        var len = bytes.readShort();
        var listReward = [];
        for (var i = 0; i < len; i++) {
            var awardData = new RewardData();
            awardData.type = bytes.readInt();
            awardData.id = bytes.readInt();
            awardData.count = bytes.readInt();
            listReward.push(awardData);
        }
        len = bytes.readShort();
        var saleListReward = [];
        for (var i = 0; i < len; i++) {
            var saleId = bytes.readInt();
            saleListReward.push(GlobalConfig.AuctionItem[saleId].item);
        }
        ViewManager.ins().open(DevildomResultWin, handel, name, isBelong, saleListReward, listReward);
    };
    DevildomSys.prototype.postInfo = function (bytes) {
        this.historyId = bytes.readShort();
        var cd = bytes.readShort();
        this.enterCD = cd * 1000 + egret.getTimer();
    };
    DevildomSys.prototype.sendClearReliveCD = function () {
        this.sendBaseProto(3);
    };
    DevildomSys.prototype.sendCleanBelong = function () {
        this.sendBaseProto(4);
    };
    DevildomSys.prototype.sendEnter = function (fbid) {
        var bytes = this.getBytes(5);
        bytes.writeInt(fbid);
        this.sendToServer(bytes);
    };
    DevildomSys.prototype.postEnterFb = function () {
        this.isDevildomBattle = true;
    };
    DevildomSys.prototype.postQuiKFb = function () {
        this.isDevildomBattle = false;
        ViewManager.ins().close(BossBelongPanel);
    };
    DevildomSys.prototype.isOpen = function () {
        return GameServer.isOpenLF && GameServer.serverOpenDay + 1 >= GlobalConfig.DevilBossBase.openDay && this.isHfTerm();
    };
    DevildomSys.prototype.isHfTerm = function () {
        var hfTime = DateUtils.formatMiniDateTime(GameServer._serverHeZeroTime) + GlobalConfig.DevilBossBase.hefuTimeLimit * DateUtils.MS_PER_DAY;
        return GameServer.serverTime - hfTime > 0;
    };
    return DevildomSys;
}(BaseSystem));
__reflect(DevildomSys.prototype, "DevildomSys");
var GameSystem;
(function (GameSystem) {
    GameSystem.devildomSys = DevildomSys.ins.bind(DevildomSys);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=DevildomSys.js.map