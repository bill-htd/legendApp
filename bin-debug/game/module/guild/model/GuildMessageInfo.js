var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuildMessageInfo = (function () {
    function GuildMessageInfo() {
    }
    GuildMessageInfo.prototype.parserMessage = function (bytes) {
        this.type = bytes.readUnsignedByte();
        this.content = bytes.readString();
        if (this.type == 1) {
            this.roleId = bytes.readInt();
            this.name = bytes.readString();
            this.job = bytes.readUnsignedByte();
            this.sex = bytes.readUnsignedByte();
            this.vipLevel = bytes.readInt();
            this.monthCard = bytes.readUnsignedByte();
            this.office = bytes.readUnsignedByte();
            this.zsLevel = bytes.readUnsignedByte();
            this.lv = bytes.readShort();
            this.guildName = bytes.readString();
        }
    };
    return GuildMessageInfo;
}());
__reflect(GuildMessageInfo.prototype, "GuildMessageInfo");
//# sourceMappingURL=GuildMessageInfo.js.map