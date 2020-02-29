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
var Encounter = (function (_super) {
    __extends(Encounter, _super);
    function Encounter() {
        var _this = _super.call(this) || this;
        _this.encounterModel = [];
        _this.wildModel = {};
        _this.isGuiding = false;
        _this.wildPersonList = {};
        _this.isFindDrop = false;
        _this.buyAndFight = false;
        _this.encounterRank = 0;
        _this.sysId = PackageID.Encounter;
        _this.regNetMsg(1, _this.doLastRefreshTime);
        _this.regNetMsg(2, _this.doEncounterData);
        _this.regNetMsg(3, _this.doResult);
        _this.regNetMsg(4, _this.postZaoYuRecord);
        _this.regNetMsg(7, _this.postDataUpdate);
        _this.regNetMsg(5, _this.doUpdateWildBoss);
        _this.regNetMsg(6, _this.doWildBossResult);
        _this.regNetMsg(8, _this.doAddWildPlayer);
        _this.regNetMsg(9, _this.doWildPlayerResult);
        _this.regNetMsg(10, _this.doRedNameResult);
        return _this;
    }
    Encounter.ins = function () {
        return _super.ins.call(this);
    };
    Encounter.prototype.doLastRefreshTime = function (bytes) {
        EncounterModel.lastTime = bytes.readInt();
        var a = bytes.readInt();
        var b = bytes.readInt();
        EncounterModel.refreshTimes = bytes.readInt();
        EncounterModel.redName = bytes.readInt();
        this.postEncounterDataChange();
    };
    Encounter.prototype.sendRefresh = function () {
        this.sendBaseProto(1);
    };
    Encounter.prototype.sendFightResult = function (result) {
        if (EncounterFight.ins().encounterIndex == undefined)
            return;
        if (result == 1) {
            UserTips.ins().showTips("PK\u503C\u589E\u52A0" + GlobalConfig.SkirmishBaseConfig.onesPkval + "\u70B9");
        }
        var bytes = this.getBytes(2);
        bytes.writeInt(EncounterFight.ins().encounterIndex);
        bytes.writeInt(result);
        this.sendToServer(bytes);
    };
    Encounter.prototype.postFightResult = function (result) {
        return result;
    };
    Encounter.prototype.isEncounter = function () {
        return EncounterFight.ins().encounterIndex != undefined && EncounterFight.ins().encounterIndex >= 0 || this.isFindDrop;
    };
    Encounter.prototype.isHasRed = function () {
        var num = 0;
        for (var i = 0; i < Encounter.ins().encounterModel.length; i++) {
            if (Encounter.ins().getEncounterModel(i))
                num++;
        }
        if (num > 0 && EncounterModel.redName < GlobalConfig.SkirmishBaseConfig.maxPkval)
            return num;
        return 0;
    };
    Encounter.prototype.doEncounterData = function (bytes) {
        var index = bytes.readInt();
        bytes.position -= 4;
        this.encounterModel[index] = this.encounterModel[index] || new EncounterModel();
        this.encounterModel[index].parser(bytes);
        this.postEncounterDataChange();
    };
    Encounter.prototype.postEncounterDataChange = function () {
    };
    Encounter.prototype.sendGetreward = function () {
        this.sendBaseProto(3);
    };
    Encounter.prototype.doResult = function (bytes) {
        var index = bytes.readInt();
        var result = bytes.readInt();
        var reward = [];
        var types = [0, 1, 4, 3];
        var len = types.length;
        var rewardData;
        for (var i = 0; i < len; i++) {
            rewardData = new RewardData();
            rewardData.type = 0;
            rewardData.id = types[i];
            rewardData.count = bytes.readInt();
            if (rewardData.count)
                reward.push(rewardData);
        }
        len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            rewardData = new RewardData();
            rewardData.parser(bytes);
            Encounter.ins().postCreateDrop(DropHelp.tempDropPoint.x, DropHelp.tempDropPoint.y, rewardData);
            reward.push(rewardData);
        }
        this.encounterModel[index - 1] = null;
        var s = "获得奖励如下：";
        if (result && len) {
            var f = function () {
                Encounter.ins().isFindDrop = false;
                this.sendGetreward();
                EncounterFight.ins().win();
            };
            this.isFindDrop = true;
            DropHelp.addCompleteFunc(f, this);
            DropHelp.start();
        }
        else if (!result) {
            EncounterFight.ins().lose();
        }
        this.postEncounterDataChange();
    };
    Encounter.prototype.getEncounterLength = function () {
        var len = 0;
        for (var i = 0; i < Encounter.ins().encounterModel.length; i++) {
            var enModel = Encounter.ins().getEncounterModel(i);
            if (enModel) {
                len += 1;
            }
        }
        return len;
    };
    Encounter.prototype.postDataUpdate = function (bytes) {
        var prestige = bytes.readInt();
        var rank = bytes.readShort();
        this.encounterRank = rank;
        return [prestige, rank];
    };
    Encounter.prototype.sendInquirePrestige = function () {
        this.sendBaseProto(7);
    };
    Encounter.prototype.postZaoYuRecord = function (bytes) {
        if (bytes === void 0) { bytes = null; }
        if (!bytes)
            return null;
        var count = bytes.readShort();
        var arr = [];
        for (var i = 0; i < count; i++) {
            var r = [];
            r[0] = bytes.readInt();
            r[1] = bytes.readBoolean();
            r[2] = bytes.readString();
            r[3] = bytes.readInt();
            r[4] = bytes.readInt();
            r[5] = bytes.readInt();
            r[6] = bytes.readInt();
            arr[i] = r;
        }
        return arr;
    };
    Encounter.prototype.sendInquireRecord = function () {
        this.sendBaseProto(4);
    };
    Encounter.prototype.doUpdateWildBoss = function (bytes) {
        var id = bytes.readInt();
        this.willBossID = id;
        if (id == 0) {
        }
        else {
        }
        PlayFun.ins().upDataWillBoss(id);
    };
    Encounter.prototype.createBoss = function () {
    };
    Encounter.prototype.doWildBossResult = function (bytes) {
        var b = bytes.readBoolean();
        if (b) {
            var count = bytes.readShort();
            for (var j = 0; j < count; j++) {
                var award = new RewardData();
                award.parser(bytes);
                Encounter.ins().postCreateDrop(DropHelp.tempDropPoint.x, DropHelp.tempDropPoint.y, award);
            }
        }
        var f = function () {
            this.sendGetAward();
            GameLogic.ins().createGuanqiaMonster();
        };
        DropHelp.addCompleteFunc(f, this);
        DropHelp.start();
    };
    Encounter.prototype.postCreateDrop = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        if (DropHelp.getItemCount() < 5) {
            DropHelp.addDrop(params);
            return false;
        }
        return params;
    };
    Encounter.prototype.sendResult = function (result) {
        var bytes = this.getBytes(5);
        bytes.writeBoolean(result);
        this.sendToServer(bytes);
    };
    Encounter.prototype.sendGetAward = function () {
        this.sendBaseProto(6);
    };
    Encounter.prototype.getEncounterModel = function (index) {
        return this.encounterModel[index];
    };
    Encounter.prototype.clearEncounterModel = function () {
        this.encounterModel.length = 0;
    };
    Encounter.prototype.sendCleanRedName = function () {
        this.sendBaseProto(8);
    };
    Encounter.prototype.doAddWildPlayer = function (bytes) {
        var data = new WildPlayerData();
        data.index = bytes.readInt();
        var x = bytes.readShort();
        var y = bytes.readShort();
        var lv = bytes.readShort();
        var zsLv = bytes.readShort();
        data.actionType = bytes.readByte();
        data.attackEnable = bytes.readByte() != 0;
        data.killNum = bytes.readInt();
        data.backX = bytes.readShort();
        data.backY = bytes.readShort();
        var name = bytes.readString();
        var len = bytes.readShort();
        var masterHandle;
        for (var i = 0; i < len; i++) {
            var role = new Role;
            role.parser(bytes);
            role.x = x;
            role.y = y;
            role.name = name;
            role.type = EntityType.Role;
            role.killNum = 0;
            GameLogic.ins().createEntityByModel(role, Team.Faker);
            if (i == 0) {
                masterHandle = role.handle;
            }
            role.masterHandle = masterHandle;
        }
        data.fireRing = new OtherFireRingData();
        data.fireRing.parser(bytes);
        this.wildPersonList[masterHandle] = data;
    };
    Encounter.prototype.canRunAwary = function (masterHandle) {
        var tar = this.wildPersonList[masterHandle];
        tar.backCount--;
        return tar.backCount == 0;
    };
    Encounter.prototype.RunAwary = function (masterHandle) {
        var data = this.wildPersonList[masterHandle];
        delete this.wildPersonList[masterHandle];
    };
    Encounter.prototype.sendWildPeopleResult = function (acId, result) {
        var bytes = this.getBytes(9);
        bytes.writeInt(acId);
        bytes.writeInt(result);
        this.sendToServer(bytes);
    };
    Encounter.prototype.doWildPlayerResult = function (bytes) {
        var index = bytes.readInt();
        var result = bytes.readInt();
        var reward = [];
        var rewardData;
        var len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            rewardData = new RewardData();
            rewardData.parser(bytes);
            Encounter.ins().postCreateDrop(DropHelp.tempDropPoint.x, DropHelp.tempDropPoint.y, rewardData);
            reward.push(rewardData);
        }
        if (result) {
            var f = function () {
                this.sendGetWildPeopleReward();
                GameLogic.ins().createGuanqiaMonster();
            };
            DropHelp.addCompleteFunc(f, this);
            DropHelp.start();
        }
        else {
            TimerManager.ins().doTimer(800, 1, function () {
                ResultManager.ins().create(GameMap.fbType, result, reward, "", false);
                GameLogic.ins().createGuanqiaMonster();
                Encounter.ins().wildPersonList = {};
            }, this);
        }
    };
    Encounter.prototype.sendCleanWildPeople = function (index) {
        var bytes = this.getBytes(10);
        bytes.writeInt(index);
        this.sendToServer(bytes);
    };
    Encounter.prototype.sendGetWildPeopleReward = function () {
        this.sendBaseProto(11);
    };
    Encounter.prototype.doRedNameResult = function (bytes) {
        UserTips.ins().showTips("PK\u503C\u51CF\u5C11" + GlobalConfig.SkirmishBaseConfig.subPkval + "\u70B9");
    };
    Encounter.prototype.checkIsEncounter = function (index, model) {
        var enModel = this.encounterModel[index];
        if (!enModel)
            return false;
        var list = enModel.subRole;
        for (var i = 0; i < list.length; i++) {
            var role = list[i];
            if (role && role.handle == model.handle) {
                return true;
            }
        }
        return false;
    };
    return Encounter;
}(BaseSystem));
__reflect(Encounter.prototype, "Encounter");
var GameSystem;
(function (GameSystem) {
    GameSystem.encounter = Encounter.ins.bind(Encounter);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=Encounter.js.map