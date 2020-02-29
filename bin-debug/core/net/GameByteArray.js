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
var GameByteArray = (function (_super) {
    __extends(GameByteArray, _super);
    function GameByteArray() {
        var _this = _super.call(this) || this;
        _this.endian = egret.Endian.LITTLE_ENDIAN;
        return _this;
    }
    GameByteArray.prototype.readString = function () {
        var s = this.readUTF();
        this.position += 1;
        return s;
    };
    GameByteArray.prototype.readNumber = function () {
        var i64 = new uint64(this);
        var str = i64.toString();
        return +str;
    };
    GameByteArray.prototype.writeNumber = function (val) {
        var i64 = uint64.stringToUint64(val.toString());
        this.writeInt64(i64);
    };
    GameByteArray.prototype.writeInt64 = function (bigInt) {
        this.writeUnsignedInt(bigInt._lowUint);
        this.writeUnsignedInt(bigInt._highUint);
    };
    GameByteArray.prototype.writeString = function (value) {
        this.writeUTF(value);
        this.writeByte(0);
    };
    GameByteArray.prototype.writeCmd = function (id, subId) {
        this.writeByte(id);
        this.writeByte(subId);
    };
    GameByteArray.prototype.readInts = function (count) {
        var result = [];
        for (var i = 0; i < count; i++) {
            result.push(this.readInt());
        }
        return result;
    };
    GameByteArray.prototype.writeInts = function () {
        var nums = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            nums[_i] = arguments[_i];
        }
        for (var _a = 0, nums_1 = nums; _a < nums_1.length; _a++) {
            var i = nums_1[_a];
            this.writeInt(i);
        }
    };
    return GameByteArray;
}(egret.ByteArray));
__reflect(GameByteArray.prototype, "GameByteArray");
//# sourceMappingURL=GameByteArray.js.map