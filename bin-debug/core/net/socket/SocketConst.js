var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SocketConst = (function () {
    function SocketConst() {
    }
    SocketConst.SOCKET_CONNECT = "SOCKET_CONNECT";
    SocketConst.SOCKET_RECONNECT = "SOCKET_RECONNECT";
    SocketConst.SOCKET_START_RECONNECT = "SOCKET_START_RECONNECT";
    SocketConst.SOCKET_CLOSE = "SOCKET_CLOSE";
    SocketConst.SOCKET_DATA = "SOCKET_DATA";
    SocketConst.SOCKET_NOCONNECT = "SOCKET_NOCONNECT";
    SocketConst.SOCKET_DEBUG_INFO = "SOCKET_DEBUG_INFO";
    return SocketConst;
}());
__reflect(SocketConst.prototype, "SocketConst");
//# sourceMappingURL=SocketConst.js.map