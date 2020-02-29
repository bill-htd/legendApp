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
var UserReadPlayer = (function (_super) {
    __extends(UserReadPlayer, _super);
    function UserReadPlayer() {
        var _this = _super.call(this) || this;
        _this.sysId = PackageID.Default;
        _this.regNetMsg(16, _this.postPlayerResult);
        return _this;
    }
    UserReadPlayer.ins = function () {
        return _super.ins.call(this);
    };
    UserReadPlayer.prototype.sendFindPlayer = function (id, serverId) {
        if (serverId === void 0) { serverId = 0; }
        var bytes = this.getBytes(16);
        bytes.writeInt(id);
        bytes.writeInt(serverId);
        this.sendToServer(bytes);
    };
    UserReadPlayer.prototype.postPlayerResult = function (bytes) {
        var data = UserReadPlayer.ins().otherPlayerData;
        if (!data)
            data = new OtherPlayerData();
        data.parser(bytes);
        return data;
    };
    return UserReadPlayer;
}(BaseSystem));
__reflect(UserReadPlayer.prototype, "UserReadPlayer");
var OtherPlayerData = (function () {
    function OtherPlayerData() {
        this.roleData = [];
        this.lilianLv = 0;
        this.zhanlingID = 0;
        this.zhanlingLevel = 0;
    }
    OtherPlayerData.prototype.parser = function (bytes) {
        this.id = bytes.readInt();
        this.serverId = bytes.readInt();
        this.name = bytes.readString();
        this.level = bytes.readShort();
        this.vipLevel = bytes.readShort();
        this.zhuan = bytes.readShort();
        this.lilianLv = bytes.readInt();
        this.ce = bytes.readDouble();
        this.guildId = bytes.readInt();
        this.guildName = bytes.readString();
        this.zhanlingID = bytes.readInt();
        this.zhanlingLevel = bytes.readInt();
        var num = bytes.readShort();
        for (var i = 0; i < num; i++) {
            this.roleData[i] = new Role;
            this.roleData[i].parser(bytes);
        }
    };
    return OtherPlayerData;
}());
__reflect(OtherPlayerData.prototype, "OtherPlayerData");
var GameSystem;
(function (GameSystem) {
    GameSystem.userreadplayer = UserReadPlayer.ins.bind(UserReadPlayer);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=UserReadPlayer.js.map