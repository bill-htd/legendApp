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
var MineData = (function (_super) {
    __extends(MineData, _super);
    function MineData() {
        var _this = _super.call(this) || this;
        _this.isShowTransfer = true;
        _this.mines = [];
        return _this;
    }
    MineData.ins = function () {
        return _super.ins.call(this);
    };
    MineData.prototype.parser = function (bytes) {
        this.index = bytes.readShort();
        this.isExitUp = !!bytes.readShort();
        this.isExitDown = !!bytes.readShort();
        var len = bytes.readShort();
        this.removeAll();
        for (var i = 0; i < len; i++) {
            this.mines[i] = ObjectPool.pop("MineModel");
            this.mines[i].parser(bytes);
            this.checkIsMyMine(this.mines[i]);
            this.updateMineConfig(this.mines[i]);
        }
        this.resetRole();
        this.createTransfer();
        this.createEntity();
        this.showAwardWin();
    };
    MineData.prototype.showAwardWin = function () {
        if (Mine.ins().finishedData) {
            ViewManager.ins().open(MineRobWin, Mine.ins().finishedData);
        }
    };
    MineData.prototype.resetRole = function () {
        EntityManager.ins().resetRole();
        var len = SubRoles.ins().subRolesLen;
        for (var i = 1; i < len; i++) {
            var data = SubRoles.ins().roles[i];
            var role = EntityManager.ins().getEntityByHandle(data.handle);
            if (role)
                role.visible = false;
        }
    };
    MineData.prototype.createTransfer = function () {
        if (!this.isShowTransfer)
            return;
        var transPos = GlobalConfig.CaiKuangConfig.transPos;
        if (this.isExitUp) {
            var transfer = EntityManager.ins().getTransferById(0);
            if (transfer) {
                transfer.infoModel.index = this.index - 1;
                transfer.updateModel();
            }
            else {
                this.addTransfer(0, this.index - 1);
            }
        }
        else {
            EntityManager.ins().removeTransferById(0);
        }
        if (this.isExitDown) {
            var transfer = EntityManager.ins().getTransferById(1);
            if (transfer) {
                transfer.infoModel.index = this.index + 1;
                transfer.updateModel();
            }
            else {
                this.addTransfer(1, this.index + 1);
            }
        }
        else {
            EntityManager.ins().removeTransferById(1);
        }
    };
    MineData.prototype.showTransfer = function (b) {
        this.isShowTransfer = b;
        if (b)
            this.createTransfer();
        else {
            EntityManager.ins().removeTransferById(0);
            EntityManager.ins().removeTransferById(1);
        }
    };
    MineData.prototype.addTransfer = function (configID, index) {
        var transPos = GlobalConfig.CaiKuangConfig.transPos;
        var model = new TransferModel();
        model.configID = configID;
        model.index = index;
        var pos = transPos[model.configID];
        model.x = pos.x * GameMap.CELL_SIZE + (GameMap.CELL_SIZE >> 1);
        model.y = pos.y * GameMap.CELL_SIZE + (GameMap.CELL_SIZE >> 1);
        EntityManager.ins().createEntity(model);
    };
    MineData.prototype.createEntity = function () {
        for (var _i = 0, _a = this.mines; _i < _a.length; _i++) {
            var mine = _a[_i];
            GameLogic.ins().createEntityByModel(mine);
        }
        if (!TimerManager.ins().isExists(this.updateTime, this)) {
            TimerManager.ins().doTimer(1000, 0, this.updateTime, this);
        }
    };
    MineData.prototype.updateTime = function () {
        for (var _i = 0, _a = this.mines; _i < _a.length; _i++) {
            var mine = _a[_i];
            var char = EntityManager.ins().getMineByIndex(mine.index);
            if (char)
                char.updateTime();
        }
    };
    MineData.prototype.getMineByIndex = function (index, actorID) {
        for (var _i = 0, _a = this.mines; _i < _a.length; _i++) {
            var mine = _a[_i];
            if (mine.index == index) {
                if (!actorID || actorID == mine.actorID) {
                    return mine;
                }
                return null;
            }
        }
    };
    MineData.prototype.add = function (mine) {
        this.remove(mine.index);
        MineData.ins().mines.push(mine);
        this.checkIsMyMine(mine);
        this.updateMineConfig(mine);
        GameLogic.ins().createEntityByModel(mine);
    };
    MineData.prototype.updateMineConfig = function (mine) {
        var kuangPos = GlobalConfig.CaiKuangConfig.kuangPos;
        var pos = kuangPos[mine.index - 1];
        mine.x = pos.x * GameMap.CELL_SIZE + (GameMap.CELL_SIZE >> 1);
        mine.y = pos.y * GameMap.CELL_SIZE + (GameMap.CELL_SIZE >> 1);
        mine.dir = pos.d;
    };
    MineData.prototype.checkIsMyMine = function (mine) {
        if (mine.actorID == Actor.actorID) {
            this.myMine = mine.clone(this.myMine);
            Mine.ins().mineStartTime = this.myMine.startTime;
            Mine.ins().mineEndTime = this.myMine.endTime;
            return true;
        }
        return false;
    };
    MineData.prototype.getIsCanAtk = function (mine) {
        if (mine.actorID == Actor.actorID) {
            return false;
        }
        if (!MineData.ins().getMineByIndex(mine.index, mine.actorID)) {
            return false;
        }
        if (mine.isBeFight) {
            return false;
        }
        if (mine.beFightActorID.length >= GlobalConfig.CaiKuangConfig.maxBeRobCount) {
            return false;
        }
        if (mine.beFightActorID.indexOf(Actor.actorID) >= 0) {
            return false;
        }
        if (Mine.ins().robCount >= GlobalConfig.CaiKuangConfig.maxRobCount) {
            return false;
        }
        return true;
    };
    MineData.prototype.remove = function (index) {
        for (var i in this.mines) {
            var mine = this.mines[i];
            if (mine.index == index) {
                this.mines.splice(parseInt(i), 1);
                EntityManager.ins().removeMineByIndex(index);
                break;
            }
        }
    };
    MineData.prototype.removeAll = function () {
        while (this.mines.length) {
            var mine = this.mines.pop();
            EntityManager.ins().removeMineByIndex(mine.index);
        }
        TimerManager.ins().removeAll(this);
    };
    return MineData;
}(BaseClass));
__reflect(MineData.prototype, "MineData");
//# sourceMappingURL=MineData.js.map