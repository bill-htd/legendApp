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
var KFBossSys = (function (_super) {
    __extends(KFBossSys, _super);
    function KFBossSys() {
        var _this = _super.call(this) || this;
        _this.fbInfo = [];
        _this.isKFBossBattle = false;
        _this.dropRecordDataList = [];
        _this.dropBestRecordDataList = [];
        _this.sysId = PackageID.KFBoss;
        _this.regNetMsg(1, _this.postBossInfo);
        _this.regNetMsg(2, _this.postAscriptionChange);
        _this.regNetMsg(3, _this.postRevive);
        _this.regNetMsg(5, _this.postBossRevive);
        _this.regNetMsg(7, _this.postRefFlag);
        _this.regNetMsg(8, _this.postCollectFlag);
        _this.regNetMsg(9, _this.postInfo);
        _this.regNetMsg(10, _this.doResult);
        _this.regNetMsg(11, _this.postDropList);
        _this.regNetMsg(12, _this.postBroadcastResult);
        _this.observe(UserBoss.ins().postBossAppear, function () {
            if (_this.isKFBossBattle)
                ViewManager.ins().open(BossBelongPanel);
        });
        _this.observe(UserBoss.ins().postBossDisappear, function () {
            if (_this.isKFBossBattle)
                ViewManager.ins().close(BossBelongPanel);
        });
        _this.observe(GameLogic.ins().postEnterMap, function () {
            if (GameMap.fbType == UserFb.FB_TYPE_KF_BOSS) {
                _this.postEnterKFBossFb();
            }
            else if (GameMap.lastFbTyp == UserFb.FB_TYPE_KF_BOSS) {
                _this.postQuiKFBossFb();
            }
        });
        return _this;
    }
    KFBossSys.prototype.postBossInfo = function (bytes) {
        var count = bytes.readShort();
        this.fbInfo = [];
        for (var i = 0; i < count; i++) {
            var info = new KFBossInfoData(bytes);
            this.fbInfo[info.dpId] = info;
        }
    };
    KFBossSys.prototype.postAscriptionChange = function (bytes) {
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
    KFBossSys.prototype.postRevive = function (bytes) {
        var cd = bytes.readInt();
        var killHandel = bytes.readDouble();
        if (cd > 0)
            ViewManager.ins().open(KFBossReliveWin, cd, killHandel);
        else {
            ViewManager.ins().close(KFBossReliveWin);
            if (KFServerSys.ins().isKF) {
                var yb = Actor.yb - GlobalConfig.CrossBossBase.rebornCost;
                Actor.ins().postYbChange(yb);
            }
        }
    };
    KFBossSys.prototype.postBossRevive = function (bytes) {
        var type = bytes.readShort();
        var id = bytes.readShort();
        if (this.fbInfo[id]) {
            if (type == 1)
                this.fbInfo[id].flagRefTimer = egret.getTimer();
            else if (type == 2)
                this.fbInfo[id].bossRefTimer = egret.getTimer();
        }
    };
    KFBossSys.prototype.postRefFlag = function (bytes) {
        this.flagHandle = bytes.readDouble();
        this.flagCD = bytes.readInt() * 1000 + egret.getTimer();
        if (GameMap.fubenID != GlobalConfig.CrossBossConfig[8].fbid)
            this.flagHandle = 100010100101;
        else
            this.flagHandle = 0;
    };
    KFBossSys.prototype.postCollectFlag = function (bytes) {
        var handle = bytes.readDouble();
        var lefttimer = bytes.readInt();
        if (handle && handle == Actor.handle && lefttimer) {
            ViewManager.ins().open(CollectWin, handle, lefttimer);
            GameLogic.ins().currAttackHandle = 0;
        }
        else
            ViewManager.ins().close(CollectWin);
    };
    KFBossSys.prototype.postInfo = function (bytes) {
        this.flagTimes = bytes.readShort();
        this.bossTimes = bytes.readShort();
        var cd = bytes.readShort();
        this.enterCD = cd * 1000 + egret.getTimer();
    };
    KFBossSys.prototype.doResult = function (bytes) {
        var type = bytes.readShort();
        var awards = [];
        var count = bytes.readShort();
        var isFlag = type == 1;
        for (var i = 0; i < count; i++) {
            var awardData = new RewardData();
            awardData.type = bytes.readInt();
            awardData.count = bytes.readInt();
            awardData.id = bytes.readInt();
            awards.push(awardData);
            if (awardData.type == 0 && awardData.id != 1 && awardData.id != 2 && awardData.id != MoneyConst.rune) {
            }
            else if (!isFlag) {
                DropHelp.addDrop([DropHelp.tempDropPoint.x != 0 ? DropHelp.tempDropPoint.x : Math.floor(EntityManager.ins().getNoDieRole().x / GameMap.CELL_SIZE),
                    DropHelp.tempDropPoint.y != 0 ? DropHelp.tempDropPoint.y : Math.floor(EntityManager.ins().getNoDieRole().y / GameMap.CELL_SIZE),
                    awardData]);
            }
        }
        if (isFlag) {
            ResultManager.ins().create(GameMap.fbType, awards, isFlag);
        }
        else {
            var f = function () {
                ResultManager.ins().create(GameMap.fbType, awards, isFlag);
            };
            DropHelp.start();
            DropHelp.addCompleteFunc(f, this);
        }
    };
    KFBossSys.prototype.postDropList = function (bytes) {
        this.dropRecordDataList = [];
        this.dropBestRecordDataList = [];
        var len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            this.dropRecordDataList.push(new KFDropRecordData(bytes));
        }
        len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            var data = new KFDropRecordData(bytes);
            data.isBest = true;
            this.dropBestRecordDataList.push(data);
        }
    };
    KFBossSys.prototype.postBroadcastResult = function (bytes) {
        var servId = bytes.readInt();
        var nick = bytes.readString();
        var handle = bytes.readDouble();
        var actor = EntityManager.ins().getEntityByHandle(handle);
        if (!actor || actor.action == EntityAction.DIE || actor == EntityManager.ins().getNoDieRole()) {
            return "S" + servId + nick;
        }
        var awards = [];
        var count = bytes.readShort();
        for (var i = 0; i < count; i++) {
            var awardData = new RewardData();
            awardData.type = bytes.readInt();
            awardData.id = bytes.readInt();
            awardData.count = bytes.readInt();
            awards.push(awardData);
            if (awardData.type == 0 && awardData.id != 1 && awardData.id != 2 && awardData.id != MoneyConst.rune) {
            }
            else {
                DropHelp.addDrop([DropHelp.tempDropPoint.x != 0 ? DropHelp.tempDropPoint.x : Math.floor(actor.x / GameMap.CELL_SIZE),
                    DropHelp.tempDropPoint.y != 0 ? DropHelp.tempDropPoint.y : Math.floor(actor.y / GameMap.CELL_SIZE),
                    awardData]);
            }
        }
        var f = function () {
        };
        DropHelp.start(actor);
        DropHelp.addCompleteFunc(f, this);
        return "S" + servId + nick;
    };
    KFBossSys.prototype.postEnterKFBossFb = function () {
        this.isKFBossBattle = true;
        if (ViewManager.ins().isShow(BossBloodPanel))
            ViewManager.ins().open(BossBloodPanel);
        ViewManager.ins().close(KFBossShowWin);
        ViewManager.ins().open(KFBossSceneWin);
    };
    KFBossSys.prototype.postQuiKFBossFb = function () {
        ViewManager.ins().close(BossBelongPanel);
        this.isKFBossBattle = false;
        this.flagHandle = 0;
        ViewManager.ins().close(KFBossReliveWin);
        ViewManager.ins().close(KFBossSceneWin);
    };
    KFBossSys.prototype.sendBossInfo = function () {
        this.sendBaseProto(1);
    };
    KFBossSys.prototype.sendClearReliveCD = function () {
        this.sendBaseProto(3);
    };
    KFBossSys.prototype.sendCleanBelong = function () {
        this.sendBaseProto(4);
    };
    KFBossSys.prototype.sendEnter = function (fbid) {
        var bytes = this.getBytes(6);
        bytes.writeInt(fbid);
        this.sendToServer(bytes);
    };
    KFBossSys.prototype.sendCollectFlag = function () {
        this.sendBaseProto(8);
    };
    KFBossSys.prototype.sendDropList = function () {
        this.sendBaseProto(11);
    };
    KFBossSys.ins = function () {
        return _super.ins.call(this);
    };
    KFBossSys.prototype.isOpen = function () {
        if (!GlobalConfig.CrossBossBase.limitZsLv)
            GlobalConfig.CrossBossBase.limitZsLv = 5;
        return GlobalConfig.CrossBossBase.openDay <= GameServer.serverOpenDay + 1 && UserZs.ins().lv >= GlobalConfig.CrossBossBase.limitZsLv;
    };
    return KFBossSys;
}(BaseSystem));
__reflect(KFBossSys.prototype, "KFBossSys");
var GameSystem;
(function (GameSystem) {
    GameSystem.kfBossSys = KFBossSys.ins.bind(KFBossSys);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=KFBossSys.js.map