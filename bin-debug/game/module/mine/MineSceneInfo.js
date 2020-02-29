var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MineSceneUpdate;
(function (MineSceneUpdate) {
    MineSceneUpdate[MineSceneUpdate["fighting"] = 1] = "fighting";
    MineSceneUpdate[MineSceneUpdate["finished"] = 2] = "finished";
    MineSceneUpdate[MineSceneUpdate["addNew"] = 3] = "addNew";
    MineSceneUpdate[MineSceneUpdate["scene"] = 4] = "scene";
    MineSceneUpdate[MineSceneUpdate["updateMine"] = 5] = "updateMine";
    MineSceneUpdate[MineSceneUpdate["userInfo"] = 6] = "userInfo";
})(MineSceneUpdate || (MineSceneUpdate = {}));
var MineSceneInfo = (function () {
    function MineSceneInfo() {
    }
    MineSceneInfo.prototype.parser = function (bytes) {
        this.index = bytes.readShort();
        this.type = bytes.readShort();
        if (this.type == MineSceneUpdate.fighting) {
            this.state = bytes.readByte();
        }
        else if (this.type == MineSceneUpdate.addNew) {
            this.mine = ObjectPool.pop("MineModel");
            this.mine.parser(bytes);
        }
        else if (this.type == MineSceneUpdate.scene) {
            this.sceneIndex = bytes.readShort();
            this.isExitUp = !!bytes.readShort();
            this.isExitDown = !!bytes.readShort();
        }
        else if (this.type == MineSceneUpdate.updateMine) {
            this.actorId = bytes.readInt();
        }
        else if (this.type == MineSceneUpdate.userInfo) {
            this.mine = MineData.ins().getMineByIndex(this.index);
            if (this.mine)
                this.mine.parser(bytes);
        }
    };
    MineSceneInfo.prototype.handler = function () {
        if (this.type == MineSceneUpdate.fighting) {
            var mine = MineData.ins().getMineByIndex(this.index);
            if (mine) {
                mine.isBeFight = this.state == 1;
                var char = EntityManager.ins().getMineByIndex(this.index);
                if (char)
                    char.updateTitleState();
            }
        }
        else if (this.type == MineSceneUpdate.finished) {
            MineData.ins().remove(this.index);
        }
        else if (this.type == MineSceneUpdate.addNew) {
            MineData.ins().add(this.mine);
        }
        else if (this.type == MineSceneUpdate.scene) {
            MineData.ins().isExitUp = this.isExitUp;
            MineData.ins().isExitDown = this.isExitDown;
            MineData.ins().index = this.sceneIndex;
            MineData.ins().createTransfer();
        }
        else if (this.type == MineSceneUpdate.updateMine) {
            var mine = MineData.ins().getMineByIndex(this.index);
            if (mine) {
                mine.beFightActorID.push(this.actorId);
                var char = EntityManager.ins().getMineByIndex(this.index);
                if (char)
                    char.updateTitleState();
            }
        }
        else if (this.type == MineSceneUpdate.userInfo) {
            var char = EntityManager.ins().getMineByIndex(this.index);
            if (char)
                char.updateModel();
        }
    };
    MineSceneInfo.prototype.destroy = function () {
        this.mine = null;
        ObjectPool.push(this);
    };
    return MineSceneInfo;
}());
__reflect(MineSceneInfo.prototype, "MineSceneInfo");
//# sourceMappingURL=MineSceneInfo.js.map