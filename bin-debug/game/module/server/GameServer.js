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
var GameServer = (function (_super) {
    __extends(GameServer, _super);
    function GameServer() {
        var _this = _super.call(this) || this;
        _this.sysId = PackageID.Default;
        _this.regNetMsg(23, _this.postServerOpenDay);
        _this.regNetMsg(14, _this.doServerTime);
        return _this;
    }
    GameServer.ins = function () {
        return _super.ins.call(this);
    };
    Object.defineProperty(GameServer, "serverTime", {
        get: function () {
            return GameServer._serverTime + egret.getTimer();
        },
        enumerable: true,
        configurable: true
    });
    GameServer.setServerTime = function (t) {
        console.log('服务器当前时间 ： ' + t);
        GameServer._serverTime = DateUtils.formatMiniDateTime(t) - egret.getTimer();
    };
    GameServer.prototype.postServerOpenDay = function (bytes) {
        GameServer.serverOpenDay = bytes.readInt();
        GameServer._serverZeroTime = bytes.readInt();
        GameServer._serverHeZeroTime = bytes.readInt();
        GameServer._hefuCount = bytes.readInt();
        GameServer.isOpenLF = bytes.readBoolean();
    };
    GameServer.prototype.doServerTime = function (bytes) {
        GameServer.setServerTime(bytes.readUnsignedInt());
    };
    return GameServer;
}(BaseSystem));
__reflect(GameServer.prototype, "GameServer");
var GameSystem;
(function (GameSystem) {
    GameSystem.gameServer = GameServer.ins.bind(GameServer);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=GameServer.js.map