var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuildStoreModel = (function () {
    function GuildStoreModel() {
        this.guildStoreLv = 0;
        this.recordInfoAry = [];
        this.recordMax = 50;
    }
    GuildStoreModel.prototype.parserBaseInfo = function (bytes) {
        this.guildStoreLv = bytes.readByte();
        this.guildStoreNum = bytes.readByte();
    };
    GuildStoreModel.prototype.parserRecordInfo = function (bytes) {
        var num = bytes.readByte();
        var tArray = [];
        var info;
        if (this.recordInfoAry != null && this.recordInfoAry.length > 0 && this.recordInfoAry.length + num > this.recordMax) {
            var tNum = this.recordMax - num > 0 ? this.recordMax - num : 0;
            this.recordInfoAry.length = tNum;
        }
        for (var i = 0; i < num; i++) {
            info = new GuildStoreRecordInfo();
            info.times = bytes.readInt();
            info.roleName = bytes.readString();
            info.itemId = bytes.readInt();
            tArray.push(info);
        }
        this.recordInfoAry = tArray.concat(this.recordInfoAry);
    };
    GuildStoreModel.prototype.parserBoxItemInfo = function (bytes) {
        var num = bytes.readByte();
        this.guildStoreItemData = [];
        for (var i = 0; i < num; i++) {
            var info = new GuildStoreItemData();
            info.itemId = bytes.readInt();
            info.num = bytes.readInt();
            this.guildStoreItemData.push(info);
        }
    };
    GuildStoreModel.prototype.parserRecord = function (bytes) {
        this.recordInfo = new GuildStoreRecordInfo();
        this.recordInfo.roleName = bytes.readString();
        this.recordInfo.itemId = bytes.readInt();
    };
    return GuildStoreModel;
}());
__reflect(GuildStoreModel.prototype, "GuildStoreModel");
//# sourceMappingURL=GuildStoreModel.js.map