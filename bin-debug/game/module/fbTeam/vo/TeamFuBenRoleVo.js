var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TeamFuBenRoleVo = (function () {
    function TeamFuBenRoleVo() {
    }
    TeamFuBenRoleVo.prototype.parse = function (bytes) {
        this.roleID = bytes.readInt();
        this.position = bytes.readByte();
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
    return TeamFuBenRoleVo;
}());
__reflect(TeamFuBenRoleVo.prototype, "TeamFuBenRoleVo");
//# sourceMappingURL=TeamFuBenRoleVo.js.map