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
var KFServerSys = (function (_super) {
    __extends(KFServerSys, _super);
    function KFServerSys() {
        var _this = _super.call(this) || this;
        _this.isLinkingKF = false;
        _this.curServerType = ServerType.bsCommSrv;
        _this.sysId = PackageID.Login;
        _this.regNetMsg(9, _this.doSwitchServer);
        return _this;
    }
    KFServerSys.ins = function () {
        return _super.ins.call(this);
    };
    KFServerSys.prototype.linkingKFState = function (value) {
        this.isLinkingKF = value;
        if (value) {
            ViewManager.ins().open(ServerSwitchIngWin);
        }
        else {
            ViewManager.ins().close(ServerSwitchIngWin);
        }
    };
    KFServerSys.prototype.doSwitchServer = function (bytes) {
        var _this = this;
        this.kfSrvid = bytes.readInt();
        this.kfIp = bytes.readString();
        this.kfPort = bytes.readInt();
        this.kfLoginKey = bytes.readString();
        this.curServerType = bytes.readInt();
        this.linkingKFState(true);
        TimerManager.ins().doTimer(500, 1, function () {
            _this.connectKFServer();
        }, this);
    };
    KFServerSys.prototype.sendKFLogin = function () {
        var bytes = this.getBytes(9);
        bytes.writeInt(Actor.actorID);
        bytes.writeString(this.kfLoginKey);
        bytes.writeString(LocationProperty.pf);
        this.sendToServer(bytes);
    };
    Object.defineProperty(KFServerSys.prototype, "isKF", {
        get: function () {
            return this.curServerType > ServerType.bsCommSrv;
        },
        enumerable: true,
        configurable: true
    });
    KFServerSys.prototype.connectKFServer = function () {
        GameSocket.ins().close();
        GameSocket.ins().newSocket();
        if (!GameSocket.ins().getSocket().connected) {
            debug.log("kf connect to " + this.kfIp + " ,port: " + this.kfPort);
            GameSocket.ins().connect(this.kfIp, this.kfPort);
        }
        else {
            this.sendKFLogin();
        }
        WJBattlefieldSys.postSwitchServer();
    };
    KFServerSys.prototype.closeSocket = function () {
        this.curServerType = ServerType.bsCommSrv;
        this.kfSrvid = LocationProperty.srvid;
    };
    KFServerSys.prototype.checkIsKFBattle = function (tips) {
        if (this.isKF && tips)
            UserTips.ins().showTips(tips);
        return this.isKF;
    };
    return KFServerSys;
}(BaseSystem));
__reflect(KFServerSys.prototype, "KFServerSys");
var ServerType;
(function (ServerType) {
    ServerType[ServerType["bsCommSrv"] = 0] = "bsCommSrv";
    ServerType[ServerType["bsBattleSrv"] = 1] = "bsBattleSrv";
    ServerType[ServerType["bsMainBattleSrv"] = 2] = "bsMainBattleSrv";
    ServerType[ServerType["bsLianFuSrv"] = 3] = "bsLianFuSrv";
})(ServerType || (ServerType = {}));
//# sourceMappingURL=KFServerSys.js.map