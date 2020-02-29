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
var Socket = (function (_super) {
    __extends(Socket, _super);
    function Socket() {
        var _this = _super.call(this) || this;
        _this._needReconnect = false;
        _this._maxReconnectCount = 10;
        _this._reconnectCount = 0;
        return _this;
    }
    Socket.prototype.addEvents = function () {
        this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this._socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this._socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
    };
    Socket.prototype.removeEvents = function () {
        this._socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this._socket.removeEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this._socket.removeEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        this._socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
    };
    Socket.prototype.onSocketOpen = function () {
        this._reconnectCount = 0;
        if (this._connectFlag) {
            MessageCenter.ins().dispatch(SocketConst.SOCKET_RECONNECT);
        }
        else {
            MessageCenter.ins().dispatch(SocketConst.SOCKET_CONNECT);
        }
        this._connectFlag = true;
        this._isConnecting = true;
    };
    Socket.prototype.onSocketClose = function () {
        if (this._needReconnect) {
            this.reconnect();
            MessageCenter.ins().dispatch(SocketConst.SOCKET_START_RECONNECT);
        }
        else {
            MessageCenter.ins().dispatch(SocketConst.SOCKET_CLOSE);
        }
        this._isConnecting = false;
    };
    Socket.prototype.onSocketError = function () {
        if (this._needReconnect) {
            this.reconnect();
        }
        else {
            MessageCenter.ins().dispatch(SocketConst.SOCKET_NOCONNECT);
        }
        this._isConnecting = false;
    };
    Socket.prototype.onReceiveMessage = function (e) {
        this._msg.receive(this._socket);
    };
    Socket.prototype.initServer = function (host, port, msg) {
        this._host = host;
        this._port = port;
        this._msg = msg;
    };
    Socket.prototype.connect = function () {
        if (DeviceUtils.IsHtml5) {
            if (!window["WebSocket"]) {
                Log.trace("不支持WebSocket");
                return;
            }
        }
        this._socket = new egret.WebSocket();
        if (this._msg instanceof ByteArrayMsg) {
            this._socket.type = egret.WebSocket.TYPE_BINARY;
        }
        Log.trace("WebSocket: " + this._host + ":" + this._port);
        this._socket.connect(this._host, this._port);
        this.addEvents();
    };
    Socket.prototype.reconnect = function () {
        this.close();
        this._reconnectCount++;
        if (this._reconnectCount < this._maxReconnectCount) {
            this.connect();
        }
        else {
            this._reconnectCount = 0;
            if (this._connectFlag) {
                MessageCenter.ins().dispatch(SocketConst.SOCKET_CLOSE);
            }
            else {
                MessageCenter.ins().dispatch(SocketConst.SOCKET_NOCONNECT);
            }
        }
    };
    Socket.prototype.send = function (msg) {
        this._msg.send(this._socket, msg);
    };
    Socket.prototype.close = function () {
        this.removeEvents();
        this._socket.close();
        this._socket = null;
        this._isConnecting = false;
        this._connectFlag = false;
    };
    Socket.prototype.isConnecting = function () {
        return this._isConnecting;
    };
    Socket.prototype.debugInfo = function (str) {
        MessageCenter.ins().dispatch(SocketConst.SOCKET_DEBUG_INFO, str);
    };
    return Socket;
}(BaseClass));
__reflect(Socket.prototype, "Socket");
//# sourceMappingURL=Socket.js.map