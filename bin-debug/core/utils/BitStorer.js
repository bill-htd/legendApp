var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BitStorer = (function () {
    function BitStorer(length, fixed) {
        if (length === void 0) { length = 0; }
        if (fixed === void 0) { fixed = true; }
        this._length = length;
        this._storer = [];
    }
    Object.defineProperty(BitStorer.prototype, "length", {
        get: function () {
            return this._length;
        },
        set: function (value) {
            this._storer.length = value >> 5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BitStorer.prototype, "numDirtyBits", {
        get: function () {
            var c, i, b = this._length;
            for (i = 0; i < b; i++) {
                if (this._storer[i >> 5] & (1 << i % 32)) {
                    c++;
                }
            }
            return c;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BitStorer.prototype, "dirtyBits", {
        get: function () {
            var v = [];
            var i;
            for (i = this._length - 1; i > -1; i--) {
                if (this._storer[i >> 5] & (1 << i % 32)) {
                    v[v.length] = i;
                }
            }
            return v;
        },
        enumerable: true,
        configurable: true
    });
    BitStorer.prototype.store = function (bytes) {
        var i, n, b;
        b = this._length >> 3;
        if (b > bytes.bytesAvailable)
            b = bytes.bytesAvailable;
        for (i = 0; i < b; i++) {
            if (i && i % 4 == 0) {
                this._storer[(i >> 2) - 1] = n;
                n = 0;
            }
            n |= (bytes.readByte() & 0xFF) << ((i % 4) << 3);
        }
        if (b % 4)
            this._storer[b >> 2] = n;
    };
    BitStorer.prototype.toByteArray = function (bytes, offset) {
        if (bytes === void 0) { bytes = null; }
        if (offset === void 0) { offset = 0; }
        if (!bytes)
            bytes = new egret.ByteArray();
        bytes.position = offset;
        var b = this._storer.length;
        var n;
        for (var i = 0; i < b; i++) {
            n = this._storer[i];
            for (var j = 0; j < 32; j += 8) {
                bytes.writeByte((n >> j) & 0xFF);
            }
        }
        return bytes;
    };
    BitStorer.prototype.setBit = function (bit, value) {
        if (value & 1)
            this._storer[bit >> 5] |= 1 << bit % 32;
        else
            this._storer[bit >> 5] &= ~(1 << bit % 32);
    };
    BitStorer.prototype.getBit = function (bit) {
        return (this._storer[bit % this._length >> 5] >> (bit % 32)) & 1;
    };
    return BitStorer;
}());
__reflect(BitStorer.prototype, "BitStorer");
//# sourceMappingURL=BitStorer.js.map