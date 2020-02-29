var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UTFMsg = (function () {
    function UTFMsg() {
    }
    UTFMsg.prototype.receive = function (socket) {
        var msg = socket.readUTF();
        var obj = this.decode(msg);
        if (obj) {
            MessageCenter.ins().dispatch(obj.key, obj.body);
        }
    };
    UTFMsg.prototype.send = function (socket, msg) {
        var obj = this.encode(msg);
        if (obj) {
            socket.type = egret.WebSocket.TYPE_STRING;
            socket.writeUTF(obj);
        }
    };
    UTFMsg.prototype.decode = function (msg) {
        Log.trace("decode需要子类重写，根据项目的协议结构解析");
        return null;
    };
    UTFMsg.prototype.encode = function (msg) {
        Log.trace("encode需要子类重写，根据项目的协议结构解析");
        return null;
    };
    return UTFMsg;
}());
__reflect(UTFMsg.prototype, "UTFMsg", ["BaseMsg"]);
//# sourceMappingURL=UTFMsg.js.map