var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HejiProgressData = (function () {
    function HejiProgressData() {
        this.id = 0;
        this.progress = 0;
    }
    HejiProgressData.prototype.parser = function (bytes) {
        this.id = bytes.readByte();
        this.progress = bytes.readUnsignedInt();
    };
    return HejiProgressData;
}());
__reflect(HejiProgressData.prototype, "HejiProgressData");
//# sourceMappingURL=HejiProgressData.js.map