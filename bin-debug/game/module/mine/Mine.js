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
var Mine = (function (_super) {
    __extends(Mine, _super);
    function Mine() {
        var _this = _super.call(this) || this;
        _this.mineStartTime = 0;
        _this.mineEndTime = 0;
        _this.hasNewRecord = false;
        _this.sysId = PackageID.Mine;
        _this.regNetMsg(1, _this.postMineBaseInfo);
        _this.regNetMsg(2, _this.postRefresh);
        _this.regNetMsg(3, _this.postStartMine);
        _this.regNetMsg(4, _this.postInitScene);
        _this.regNetMsg(6, _this.postMineRecord);
        _this.regNetMsg(7, _this.doReqResult);
        _this.regNetMsg(8, _this.postFightBackResult);
        _this.regNetMsg(9, _this.postEnemyAppear);
        _this.regNetMsg(11, _this.postSceneUpdate);
        _this.regNetMsg(13, _this.postRobResult);
        _this.regNetMsg(15, _this.postFinished);
        _this.regNetMsg(16, _this.postRecordHasUpdate);
        _this.regNetMsg(17, _this.postRoleInfo);
        _this.observe(GameLogic.ins().postEnterMap, _this.onEnterMap);
        return _this;
    }
    Mine.ins = function () {
        return _super.ins.call(this);
    };
    Mine.prototype.onEnterMap = function () {
        if (GameMap.sceneInMine() && this.hasNewRecord && !this.finishedData) {
            ViewManager.ins().open(MineRecordWin);
        }
    };
    Mine.openCheck = function (showTips) {
        var sv = GlobalConfig.CaiKuangConfig.openServerDay;
        if (sv > GameServer.serverOpenDay + 1) {
            if (showTips)
                UserTips.ins().showTips("\u5F00\u670D\u7B2C" + sv + "\u5929\u5F00\u542F");
            return false;
        }
        var v = GlobalConfig.CaiKuangConfig.openLevel;
        var b = Actor.level >= v;
        if (!b) {
            if (showTips)
                UserTips.ins().showTips(v + "\u7EA7\u5F00\u542F");
            return false;
        }
        return b;
    };
    Mine.redpointCheck = function () {
        var b = this.openCheck();
        if (!b)
            return b;
        var addCount = Recharge.ins().franchise ? GlobalConfig.PrivilegeData.addKuangCount : 0;
        if (Mine.ins().finishedData || (Mine.ins().mineCount < GlobalConfig.CaiKuangConfig.maxOpenKuangCount + addCount && Mine.ins().isOverTime()) || Mine.ins().hasNewRecord) {
            return b;
        }
        return false;
    };
    Mine.prototype.isOverTime = function () {
        if (!Mine.ins().mineEndTime)
            return true;
        if (GameServer.serverTime > Mine.ins().mineEndTime)
            return true;
        return false;
    };
    Mine.prototype.postRedPoint = function () {
        return Mine.redpointCheck() ? 1 : 0;
    };
    Mine.prototype.postMineFightState = function (state) {
        return state;
    };
    Mine.prototype.postMineBaseInfo = function (bytes) {
        this.mineCount = bytes.readShort();
        this.robCount = bytes.readShort();
        this.mineId = bytes.readInt();
        this.mineFreshCount = bytes.readInt();
        this.mineQuaCount = bytes.readInt();
        this.mineEndTime = DateUtils.formatMiniDateTime(bytes.readInt());
        if (!this.mineId) {
            this.finishedData = null;
        }
        Mine.ins().postRedPoint();
    };
    Mine.prototype.postRefresh = function (bytes) {
        this.mineId = bytes.readInt();
        this.mineFreshCount = bytes.readInt();
        var count = bytes.readInt();
        if (count > this.mineQuaCount) {
            var config = GlobalConfig.KuangYuanConfig[Mine.ins().mineId];
            var num = Math.floor(config.maxTimes / config.baseTime);
            UserTips.ins().showTips("\u5347\u7EA7\u5931\u8D25\uFF0C\u795D\u798F\u503C+" + num);
        }
        this.mineQuaCount = count;
    };
    Mine.prototype.postStartMine = function (bytes) {
        this.mineCount = bytes.readShort();
        Mine.ins().postRedPoint();
    };
    Mine.prototype.postInitScene = function (bytes) {
        MineData.ins().parser(bytes);
    };
    Mine.prototype.postMineRecord = function (bytes) {
        var len = bytes.readShort();
        this.mineRecords = this.mineRecords || [];
        this.mineRecords.length = len;
        for (var i = 0; i < len; i++) {
            this.mineRecords[i] = this.mineRecords[i] || new MineRecord();
            this.mineRecords[i].parser(bytes);
        }
        this.hasNewRecord = false;
        Mine.ins().postRedPoint();
    };
    Mine.prototype.doReqResult = function (bytes) {
        var b = bytes.readBoolean();
        if (b) {
            MineFight.ins().start({ type: 0, id: this.robData.configID, actorID: this.robData.actorID });
        }
        else {
            UserTips.ins().showTips("\u4E0D\u53EF\u63A0\u593A");
        }
    };
    Mine.prototype.postFightBackResult = function (bytes) {
        var win = bytes.readBoolean();
        var index = bytes.readInt();
        for (var _i = 0, _a = this.mineRecords; _i < _a.length; _i++) {
            var record = _a[_i];
            if (record.index == index) {
                record.isBeatHim = win ? 1 : 0;
                break;
            }
        }
    };
    Mine.prototype.postEnemyAppear = function (bytes) {
        var model = new MineEnemyModel();
        model.parser(bytes);
        return model;
    };
    Mine.prototype.postSceneUpdate = function (bytes) {
        var info = ObjectPool.pop('MineSceneInfo');
        info.parser(bytes);
        info.handler();
        info.destroy();
    };
    Mine.prototype.postRobResult = function (bytes) {
        this.robCount = bytes.readShort();
    };
    Mine.prototype.postFinished = function (bytes) {
        this.mineStartTime = 0;
        this.mineEndTime = 0;
        this.finishedData = {};
        this.finishedData.configID = bytes.readShort();
        this.finishedData.beRob = [];
        var len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            var obj = {};
            obj.name = bytes.readString();
            obj.win = bytes.readBoolean();
            this.finishedData.beRob.push(obj);
        }
        this.openRobWin();
        Mine.ins().postRedPoint();
    };
    Mine.prototype.openRobWin = function () {
        if (GameMap.sceneInMine() && !MineFight.ins().isFighting && this.finishedData) {
            ViewManager.ins().open(MineRobWin, this.finishedData);
        }
    };
    Mine.prototype.postRecordHasUpdate = function (bytes) {
        this.hasNewRecord = true;
        Mine.ins().postRedPoint();
        return 1;
    };
    Mine.prototype.postRoleInfo = function (bytes) {
        var power = bytes.readDouble();
        return power;
    };
    Mine.prototype.sendIntoMine = function () {
        this.sendBaseProto(1);
    };
    Mine.prototype.sendRefresh = function (tp) {
        if (!tp) {
            this.sendBaseProto(2);
            return;
        }
        var bytes = this.getBytes(2);
        bytes.writeShort(tp);
        this.sendToServer(bytes);
    };
    Mine.prototype.sendStart = function () {
        this.sendBaseProto(3);
    };
    Mine.prototype.sendGetAward = function (isDouble) {
        if (isDouble === void 0) { isDouble = false; }
        var bytes = this.getBytes(5);
        bytes.writeShort(isDouble ? 1 : 0);
        this.sendToServer(bytes);
    };
    Mine.prototype.sendGetRecord = function () {
        this.sendBaseProto(6);
    };
    Mine.prototype.sendRob = function (data) {
        this.robData = data;
        var actorId = data.actorID;
        var bytes = this.getBytes(7);
        bytes.writeInt(actorId);
        this.sendToServer(bytes);
    };
    Mine.prototype.sendFightBack = function (recordId) {
        var bytes = this.getBytes(8);
        bytes.writeInt(recordId);
        this.sendToServer(bytes);
    };
    Mine.prototype.sendFightBackResult = function (win, index) {
        var bytes = this.getBytes(10);
        bytes.writeInt(win ? 1 : 0);
        bytes.writeInt(index);
        this.sendToServer(bytes);
    };
    Mine.prototype.sendQuickFinish = function () {
        this.sendBaseProto(12);
    };
    Mine.prototype.sendRobResult = function (win, mineId, actorID) {
        var bytes = this.getBytes(13);
        bytes.writeInt(win ? 1 : 0);
        this.sendToServer(bytes);
    };
    Mine.prototype.sendSceneChange = function (next) {
        var bytes = this.getBytes(14);
        bytes.writeShort(next ? 1 : 0);
        this.sendToServer(bytes);
    };
    Mine.prototype.sendGetRolePower = function (roleId) {
        var bytes = this.getBytes(17);
        bytes.writeInt(roleId);
        this.sendToServer(bytes);
    };
    return Mine;
}(BaseSystem));
__reflect(Mine.prototype, "Mine");
var GameSystem;
(function (GameSystem) {
    GameSystem.mine = Mine.ins.bind(Mine);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=Mine.js.map