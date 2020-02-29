var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuildMemberInfo = (function () {
    function GuildMemberInfo() {
        this.level = 0;
        this.zsLevel = 0;
    }
    GuildMemberInfo.prototype.parse = function (bytes) {
        this.roleID = bytes.readInt();
        this.vipLevel = bytes.readInt();
        this.attack = bytes.readInt();
        this.sex = bytes.readUnsignedByte();
        this.job = bytes.readUnsignedByte();
        this.name = bytes.readString();
        this.zsLevel = bytes.readInt();
        this.score = bytes.readInt();
        this.winRate = bytes.readInt() / 10000;
        this.KfArenaCount = bytes.readUnsignedByte();
        this.isJoinkfArena = bytes.readUnsignedByte() == 1;
    };
    GuildMemberInfo.prototype.copyData = function (tData) {
        for (var key in tData) {
            this[key] = tData[key];
        }
    };
    return GuildMemberInfo;
}());
__reflect(GuildMemberInfo.prototype, "GuildMemberInfo");
//# sourceMappingURL=GuildMemberInfo.js.map