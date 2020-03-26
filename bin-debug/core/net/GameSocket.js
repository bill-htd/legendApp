var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameSocket = (function () {
    function GameSocket() {
        this._socketStatus = 0;
        this._lastReceiveTime = 0;
        this.pid = 0;
        this.PACK_HANDLER = [];
        this._serverId = 0;
        this._user = "";
        this._pwd = "";
        this.lastPos = -1;
        this.hasShowReLoginWin = false;
        this.disconnectTime = 0;
        egret.startTick(this.update, this);
        this.newSocket();
        this.recvPack = new GameByteArray();
        this._packets = [];
    }
    GameSocket.ins = function () {
        if (!GameSocket._ins) {
            GameSocket._ins = new GameSocket();
        }
        return GameSocket._ins;
    };
    GameSocket.prototype.getSocket = function () {
        return this.socket_;
    };
    GameSocket.prototype.newSocket = function () {
        if (this.socket_) {
            this.removeEvent();
        }
        this.socket_ = new egret.WebSocket;
        this.socket_.type = egret.WebSocket.TYPE_BINARY;
        this.socket_.addEventListener(egret.Event.CONNECT, this.onSocketConnected, this);
        this.socket_.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this.socket_.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketRead, this);
        this.socket_.addEventListener(egret.IOErrorEvent.IO_ERROR, this.connectError, this);
    };
    GameSocket.prototype.removeEvent = function () {
        this.socket_.removeEventListener(egret.Event.CONNECT, this.onSocketConnected, this);
        this.socket_.removeEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this.socket_.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onSocketRead, this);
        this.socket_.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.connectError, this);
    };
    GameSocket.prototype.sendToServer = function (bytes) {
        this.send(bytes);
        bytes.position = 12;
        this.recycleByte(bytes);
    };
    GameSocket.prototype.connectError = function () {
        var p = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            p[_i] = arguments[_i];
        }
        window["connectError"]();
        TimerManager.ins().remove(this.reLogin, this);
        TimerManager.ins().doTimer(1000, 1, this.reLogin, this);
    };
    GameSocket.prototype.connect = function (host, port) {
        this.updateStatus(GameSocket.STATUS_CONNECTING);
        this._host = host;
        this._port = port;
        if (location.protocol.indexOf("https:") != -1) {
            this.socket_.connectByUrl("wss://" + host + ":" + port);
        }
        else {
            this.socket_.connect(host, port);
        }
    };
    GameSocket.prototype.close = function () {
        if (!this.socket_)
            return;
        this.socket_.close();
    };
    GameSocket.prototype.send = function (message) {
        if (this._socketStatus == GameSocket.STATUS_COMMUNICATION) {
            this.sendPack(message);
            return true;
        }
        else {
            console.log("发送数据时没和服务连接或者未进入通信状态");
            return false;
        }
    };
    GameSocket.prototype.onSocketConnected = function (e) {
        TimerManager.ins().remove(this.reLogin, this);
        this.updateStatus(GameSocket.STATUS_CHECKING);
        var bytes = new GameByteArray;
        bytes.writeUnsignedInt(Encrypt.getSelfSalt());
        this.socket_.writeBytes(bytes);
        this.socket_.flush();
        if (this._onConnected) {
            this._onConnected();
        }
    };
    GameSocket.prototype.onSocketRead = function (e) {
        if (this.lastPos != -1) {
            for (var i = 0; i <= this.lastPos; i++) {
                this.recycleByte(this._packets[i]);
            }
            this._packets.splice(0, this.lastPos + 1);
            this.lastPos = -1;
        }
        if (this._socketStatus < GameSocket.STATUS_COMMUNICATION) {
            this.sendKeyToServer();
            return;
        }
        var bytesCache = new GameByteArray();
        this._lastReceiveTime = egret.getTimer();
        this.socket_.readBytes(bytesCache, bytesCache.length);
        var tag = bytesCache.readUnsignedShort();
        if (tag != GameSocket.DEFAULT_TAG)
            return;
        var buffLen = bytesCache.readUnsignedShort();
        bytesCache.position += 4;
        this._packets.push(bytesCache);
    };
    GameSocket.prototype.update = function (time) {
        for (var _i = 0, _a = this._packets; _i < _a.length; _i++) {
            var pack = _a[_i];
            this.lastPos++;
            this.processRecvPacket(pack);
            this.recycleByte(pack);
        }
        this._packets.length = 0;
        this.lastPos = -1;
        return false;
    };
    GameSocket.prototype.sendKeyToServer = function () {
        var pack = new GameByteArray;
        this.socket_.readBytes(pack);
        pack.position = 0;
        var salt = pack.readUnsignedInt();
        Encrypt.setTargetSalt(salt);
        pack.position = 0;
        pack.writeShort(Encrypt.getCheckKey());
        this.socket_.writeBytes(pack, 0, 2);
        this.updateStatus(GameSocket.STATUS_COMMUNICATION);
    };
    GameSocket.prototype.onSocketClose = function (e) {
        this.updateStatus(GameSocket.STATUS_DISCONNECT);
        TimerManager.ins().remove(this.reLogin, this);
        KFServerSys.ins().closeSocket();
        this.showReLoginWin();
    };
    GameSocket.prototype.showReLoginWin = function () {
        var _this = this;
        if (this.hasShowReLoginWin && ViewManager.ins().isShow(WarnWin))
            return;
        this.hasShowReLoginWin = true;
        this.disconnectTime = egret.getTimer();
        var func = function () {
            _this.hasShowReLoginWin = false;
            if (_this._onClosed) {
                _this._onClosed();
            }
            TimerManager.ins().remove(_this.reLogin, _this);
            if (egret.getTimer() - _this.disconnectTime >= 6000) {
                _this.reLogin();
            }
            else {
                TimerManager.ins().doTimer(6000 - (egret.getTimer() - _this.disconnectTime), 1, _this.reLogin, _this);
            }
        };
        WarnWin.show("\u7F51\u7EDC\u5DF2\u65AD\u5F00\uFF0C\u70B9\u51FB\u786E\u5B9A\u91CD\u65B0\u8FDE\u63A5", func, this, func, this, 'sure');
    };
    GameSocket.prototype.reLogin = function () {
        var _this = this;
        this.close();
        var loadGame = function () {
            _this.newSocket();
            RoleMgr.ins().connectServer();
        };
        if (LocationProperty.isLocation) {
            loadGame();
            return;
        }
        window["getClientVersion"](function (ver) {
            var v = parseInt(ver) || 0;
            if (v === LocationProperty.v || v === 0) {
                loadGame();
            }
            else {
                location.reload();
            }
        });
    };
    GameSocket.prototype.updateStatus = function (status) {
        if (this._socketStatus != status) {
            var old = this._socketStatus;
            this._socketStatus = status;
            this.onFinishCheck(status, old);
        }
    };
    GameSocket.prototype.onFinishCheck = function (newStatus, oldStatus) {
        if (newStatus == GameSocket.STATUS_COMMUNICATION) {
            if (KFServerSys.ins().isKF) {
                KFServerSys.ins().sendKFLogin();
            }
            else {
                this.sendCheckAccount(this._user, this._pwd);
            }
        }
        else if (newStatus == GameSocket.STATUS_DISCONNECT) {
        }
    };
    Object.defineProperty(GameSocket.prototype, "host", {
        get: function () {
            return this._host;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameSocket.prototype, "port", {
        get: function () {
            return this._port;
        },
        enumerable: true,
        configurable: true
    });
    GameSocket.prototype.sendCheckAccount = function (user, pwd) {
        var bytes = this.getBytes();
        bytes.writeCmd(255, 1);
        bytes.writeInt(this._serverId);
        bytes.writeString(user);
        bytes.writeString(pwd);
        this.sendToServer(bytes);
    };
    GameSocket.prototype.login = function (user, pwd, serverID, ip, port) {
        this._user = user;
        this._pwd = pwd;
        this._serverId = serverID;
        if (ip.split(":")[1] && ip.split(":")[1].length)
            port = parseInt(ip.split(":")[1]);
        if (!this.socket_.connected) {
            this.connect(ip, port);
        }
        else {
            this.sendCheckAccount(user, pwd);
        }
    };
    GameSocket.prototype.processRecvPacket = function (packet) {
        var sysId = packet.readUnsignedByte();
        var msgId = packet.readUnsignedByte();
        this.dispatch(sysId, msgId, packet);
    };
    GameSocket.prototype.dispatch = function (sysId, msgId, byte) {
        if (!this.PACK_HANDLER[sysId] || !this.PACK_HANDLER[sysId][msgId]) {
            return;
        }
        var arr = this.PACK_HANDLER[sysId][msgId];
        arr[0].call(arr[1], byte);
    };
    GameSocket.prototype.recycleByte = function (byte) {
        ObjectPool.push(byte);
    };
    GameSocket.prototype.getBytes = function () {
        var pack = ObjectPool.pop(GameSocket.CLASSNAME);
        pack.clear();
        pack.writeShort(GameSocket.DEFAULT_TAG);
        pack.writeShort(0);
        pack.writeShort(0);
        pack.writeShort(GameSocket.DEFAULT_CRC_KEY);
        pack.writeUnsignedInt(this.pid++);
        return pack;
    };
    GameSocket.prototype.registerSTCFunc = function (sysId, msgId, fun, sysClass) {
        if (!this.PACK_HANDLER[sysId]) {
            this.PACK_HANDLER[sysId] = [];
        }
        else if (this.PACK_HANDLER[sysId][msgId]) {
            console.error("\u91CD\u590D\u6CE8\u518C\u534F\u8BAE\u63A5\u53E3" + sysId + "-" + msgId);
            return;
        }
        this.PACK_HANDLER[sysId][msgId] = [fun, sysClass];
    };
    GameSocket.prototype.setOnClose = function (ex, obj) {
        this._onClosed = ex.bind(obj);
    };
    GameSocket.prototype.setOnConnected = function (ex, obj) {
        this._onConnected = ex.bind(obj);
    };
    GameSocket.prototype.sendPack = function (pack) {
        if (pack == null || pack.length == 0) {
            throw new egret.error("创建客户端数据包时数据不能为空！");
        }
        var headsize = GameSocket.HEAD_SIZE;
        pack.position = 2;
        pack.writeShort(pack.length - headsize);
        var msgCK = Encrypt.getCRC16ByPos(pack, headsize);
        pack.position = 4;
        pack.writeShort(msgCK);
        var headerCRC = Encrypt.getCRC16(pack, headsize);
        pack.position = 6;
        pack.writeShort(headerCRC);
        Encrypt.encode(pack, 4, 4);
        this.socket_.writeBytes(pack);
    };
    GameSocket.DEFAULT_TAG = 0xCCEE;
    GameSocket.DEFAULT_CRC_KEY = 0x765D;
    GameSocket.HEAD_SIZE = 8;
    GameSocket.STATUS_CONNECTING = 1;
    GameSocket.STATUS_CHECKING = 2;
    GameSocket.STATUS_COMMUNICATION = 3;
    GameSocket.STATUS_DISCONNECT = 4;
    GameSocket.CLASSNAME = egret.getQualifiedClassName(GameByteArray);
    return GameSocket;
}());
__reflect(GameSocket.prototype, "GameSocket");
//# sourceMappingURL=GameSocket.js.map