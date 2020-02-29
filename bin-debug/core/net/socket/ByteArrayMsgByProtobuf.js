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
var ByteArrayMsgByProtobuf = (function (_super) {
    __extends(ByteArrayMsgByProtobuf, _super);
    function ByteArrayMsgByProtobuf() {
        var _this = _super.call(this) || this;
        _this.msgClass = null;
        _this.protoConfig = null;
        _this.protoConfigSymmetry = null;
        _this.ProtoFile = null;
        _this.msgClass = {};
        _this.protoConfig = ByteArrayMsgByProtobuf.ProtoConfig;
        _this.protoConfigSymmetry = {};
        var keys = Object.keys(_this.protoConfig);
        for (var i = 0, len = keys.length; i < len; i++) {
            var key = keys[i];
            var value = _this.protoConfig[key];
            _this.protoConfigSymmetry[value] = key;
        }
        return _this;
    }
    ByteArrayMsgByProtobuf.prototype.getMsgClass = function (key) {
        var cls = this.msgClass[key];
        if (cls == null) {
            cls = this.ProtoFile.build(key);
            this.msgClass[key] = cls;
        }
        return cls;
    };
    ByteArrayMsgByProtobuf.prototype.getMsgID = function (key) {
        return this.protoConfigSymmetry[key];
    };
    ByteArrayMsgByProtobuf.prototype.getMsgKey = function (msgId) {
        return this.protoConfig[msgId];
    };
    ByteArrayMsgByProtobuf.prototype.decode = function (msg) {
        var msgID = msg.readShort();
        var len = msg.readShort();
        if (msg.bytesAvailable >= len) {
            var bytes = new egret.ByteArray();
            msg.readBytes(bytes, 0, len);
            var obj = {};
            obj.key = this.getMsgKey(msgID);
            DebugUtils.start("Protobuf Decode");
            obj.body = this.getMsgClass(obj.key).decode(bytes.buffer);
            DebugUtils.stop("Protobuf Decode");
            Log.trace("收到数据：", "[" + msgID + " " + obj.key + "]", obj.body);
            return obj;
        }
        return null;
    };
    ByteArrayMsgByProtobuf.prototype.encode = function (msg) {
        var msgID = this.getMsgID(msg.key);
        var msgBody = new (this.getMsgClass(msg.key))(msg.body);
        DebugUtils.start("Protobuf Encode");
        var bodyBytes = new egret.ByteArray(msgBody.toArrayBuffer());
        DebugUtils.stop("Protobuf Encode");
        Log.trace("发送数据：", "[" + msgID + " " + msg.key + "]", msg.body);
        var sendMsg = new egret.ByteArray();
        sendMsg.writeShort(msgID);
        sendMsg.writeBytes(bodyBytes);
        return sendMsg;
    };
    ByteArrayMsgByProtobuf.ProtoConfig = null;
    return ByteArrayMsgByProtobuf;
}(ByteArrayMsg));
__reflect(ByteArrayMsgByProtobuf.prototype, "ByteArrayMsgByProtobuf");
//# sourceMappingURL=ByteArrayMsgByProtobuf.js.map