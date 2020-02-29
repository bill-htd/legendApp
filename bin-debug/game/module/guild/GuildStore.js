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
var GuildStore = (function (_super) {
    __extends(GuildStore, _super);
    function GuildStore() {
        var _this = _super.call(this) || this;
        _this.guildStoreLv = 0;
        _this.guildStoreNum = 0;
        _this._recordInfoAry = [];
        _this._guildStoreItemData = [];
        _this.sysId = PackageID.GuildStore;
        _this.regNetMsg(1, _this.postGuildStoreInfo);
        _this.regNetMsg(2, _this.postGuildStoreBoxInfo);
        _this.regNetMsg(3, _this.postGuildStoreBox);
        return _this;
    }
    GuildStore.ins = function () {
        return _super.ins.call(this);
    };
    GuildStore.prototype.getRecordInfoAry = function (index) {
        if (index === void 0) { index = -1; }
        return index == -1 ? this._recordInfoAry : this._recordInfoAry[index];
    };
    GuildStore.prototype.getGuildStoreItemData = function (index) {
        if (index === void 0) { index = -1; }
        return index == -1 ? this._guildStoreItemData : this._guildStoreItemData[index];
    };
    GuildStore.prototype.postGuildStoreInfo = function (bytes) {
        this.guildStoreLv = bytes.readByte();
        this.guildStoreNum = bytes.readByte();
    };
    GuildStore.prototype.postGuildStoreBoxInfo = function (bytes) {
        var num = bytes.readByte();
        for (var i = 0; i < num; i++) {
            var info = new GuildStoreRecordInfo();
            info.times = bytes.readInt();
            info.roleName = bytes.readString();
            info.itemId = bytes.readInt();
            if (this._recordInfoAry.length >= 50)
                this._recordInfoAry.pop();
            this._recordInfoAry.unshift(info);
        }
    };
    GuildStore.prototype.postGuildStoreBox = function (bytes) {
        var num = bytes.readByte();
        this._guildStoreItemData = [];
        for (var i = 0; i < num; i++) {
            var info = new GuildStoreItemData();
            info.itemId = bytes.readInt();
            info.num = bytes.readInt();
            this._guildStoreItemData.push(info);
        }
        this.guildStoreNum -= 1;
    };
    GuildStore.prototype.doGuildStoreAddBoxInfo = function (bytes) {
        this._recordInfo = new GuildStoreRecordInfo();
        this._recordInfo.roleName = bytes.readString();
        this._recordInfo.itemId = bytes.readInt();
    };
    GuildStore.prototype.getGuildStoreInfo = function () {
        this.sendBaseProto(1);
    };
    GuildStore.prototype.sendGuildStoreBoxInfo = function () {
        var bytes = this.getBytes(2);
        if (this._recordInfoAry == null || this._recordInfoAry.length == 0) {
            bytes.writeInt(0);
        }
        else {
            bytes.writeInt(this.getRecordInfoAry(0).times);
        }
        this.sendToServer(bytes);
    };
    GuildStore.prototype.sendGuildStoreBox = function () {
        this.sendBaseProto(3);
    };
    return GuildStore;
}(BaseSystem));
__reflect(GuildStore.prototype, "GuildStore");
var GameSystem;
(function (GameSystem) {
    GameSystem.guildstore = GuildStore.ins.bind(GuildStore);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=GuildStore.js.map