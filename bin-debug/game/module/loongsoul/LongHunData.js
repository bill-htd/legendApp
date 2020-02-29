var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LongHunData = (function () {
    function LongHunData() {
        this.level = 0;
        this.stage = 0;
        this.exp = 0;
        this.state = 0;
    }
    LongHunData.prototype.parser = function (bytes) {
        this.stage = bytes.readInt();
        this.level = bytes.readInt();
        this.exp = bytes.readInt();
        this.state = bytes.readByte();
    };
    LongHunData.getLongHunAllLevel = function () {
        var sumlevel = 0;
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            var data = SubRoles.ins().getSubRoleByIndex(i).loongSoulData;
            sumlevel += data.level;
        }
        return sumlevel;
    };
    return LongHunData;
}());
__reflect(LongHunData.prototype, "LongHunData");
//# sourceMappingURL=LongHunData.js.map