var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ByteArrayMsg = (function () {
    function ByteArrayMsg() {
        this._msgBuffer = new egret.ByteArray();
    }
    ByteArrayMsg.prototype.receive = function (socket) {
        socket.readBytes(this._msgBuffer);
        var obj = this.decode(this._msgBuffer);
        if (obj) {
            MessageCenter.ins().dispatch(obj.key, obj.body);
        }
        if (this._msgBuffer.bytesAvailable == 0) {
            this._msgBuffer.clear();
        }
    };
    ByteArrayMsg.prototype.send = function (socket, msg) {
        var obj = this.encode(msg);
        if (obj) {
            obj.position = 0;
            socket.writeBytes(obj, 0, obj.bytesAvailable);
        }
    };
    ByteArrayMsg.prototype.decode = function (msg) {
        Log.trace("decode需要子类重写，根据项目的协议结构解析");
        return null;
    };
    ByteArrayMsg.prototype.encode = function (msg) {
        Log.trace("encode需要子类重写，根据项目的协议结构解析");
        return null;
    };
    return ByteArrayMsg;
}());
__reflect(ByteArrayMsg.prototype, "ByteArrayMsg", ["BaseMsg"]);
//# sourceMappingURL=ByteArrayMsg.js.map