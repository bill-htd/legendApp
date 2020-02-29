var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EncounterModel = (function () {
    function EncounterModel(name) {
        this.subRole = [];
        this.hejiLvl = 0;
        this.weiWang = 0;
        this.name = name;
    }
    EncounterModel.prototype.parser = function (bytes) {
        this.index = bytes.readInt();
        this.lv = bytes.readShort();
        this.zsLv = bytes.readShort();
        this.name = bytes.readString();
        this.subRole = [];
        var count = bytes.readShort();
        for (var i = 0; i < count; i++) {
            var role = this.subRole[i] = new Role();
            role.parser(bytes);
            role.name = this.name;
        }
        this.fireRing = this.fireRing || new OtherFireRingData();
        this.fireRing.parser(bytes);
        this.firstData = bytes.readByte() != 0;
        this.hejiLvl = bytes.readInt();
        this.weiWang = bytes.readInt();
    };
    EncounterModel.moveEncounterByMasterHandle = function (handle, posX, posY) {
        var list = EntityManager.ins().getMasterList(handle);
        for (var k in list) {
            var entity = list[k];
            if (entity.parent && entity.infoModel) {
                GameMap.moveEntity(entity, posX, posY);
                entity.AI_STATE = AI_State.Run;
            }
        }
    };
    EncounterModel.countKillNumByMarster = function (handle) {
        var num = 0;
        var list = EntityManager.ins().getMasterList(handle);
        for (var k in list) {
            var entity = list[k];
            if (entity.parent && entity.infoModel) {
                num += entity.infoModel.killNum;
            }
        }
        return num;
    };
    EncounterModel.getLiveNumByMarster = function (handle) {
        var list = EntityManager.ins().getMasterList(handle);
        for (var k in list) {
            var entity = list[k];
            if (entity.parent && entity.infoModel) {
                return 1;
            }
        }
        return 0;
    };
    EncounterModel.redName = 0;
    return EncounterModel;
}());
__reflect(EncounterModel.prototype, "EncounterModel");
//# sourceMappingURL=EncounterModel.js.map