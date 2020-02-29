var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var KfArenaRoleVo = (function () {
    function KfArenaRoleVo() {
        this.curMonth = new kfArenaMark();
        this.history = new kfArenaMark();
        this.power = 0;
        this.winRate = 0;
    }
    KfArenaRoleVo.prototype.parse = function (bytes) {
        this.roleID = bytes.readInt();
        this.serverId = bytes.readInt();
        this.isonline = bytes.readInt() != 0;
        this.duanLevel = bytes.readInt();
        this.score = bytes.readInt();
        this.curMonth.parse(bytes);
        this.history.parse(bytes);
        this.power = bytes.readInt();
        this.winRate = bytes.readInt() / 100;
        this.roleName = bytes.readString();
        this.job = bytes.readByte();
        this.sex = bytes.readByte();
        this.cloth = bytes.readInt();
        this.weapon = bytes.readInt();
        this.wingLv = bytes.readInt();
        this.wingState = bytes.readByte();
        this.pos1 = bytes.readInt();
        this.pos2 = bytes.readInt();
        this.pos3 = bytes.readInt();
        this.zs = bytes.readInt();
        this.lv = bytes.readInt();
    };
    KfArenaRoleVo.prototype.isLeader = function () {
        return KfArenaSys.ins().leaderID == this.roleID;
    };
    return KfArenaRoleVo;
}());
__reflect(KfArenaRoleVo.prototype, "KfArenaRoleVo");
var kfArenaMark = (function () {
    function kfArenaMark() {
    }
    kfArenaMark.prototype.parse = function (bytes) {
        this.win = bytes.readInt();
        this.ping = bytes.readInt();
        this.fail = bytes.readInt();
    };
    return kfArenaMark;
}());
__reflect(kfArenaMark.prototype, "kfArenaMark");
//# sourceMappingURL=KfArenaRoleVo.js.map