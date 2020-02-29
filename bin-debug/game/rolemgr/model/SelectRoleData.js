var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SelectRoleData = (function () {
    function SelectRoleData(bytes) {
        this.id = bytes.readInt();
        this.name = bytes.readString();
        this.roleClass = bytes.readInt();
        this.zsLevel = bytes.readInt();
        this.level = bytes.readInt();
        this.power = bytes.readDouble();
        this.vipLevel = bytes.readInt();
        this.sex = bytes.readInt();
    }
    return SelectRoleData;
}());
__reflect(SelectRoleData.prototype, "SelectRoleData");
//# sourceMappingURL=SelectRoleData.js.map