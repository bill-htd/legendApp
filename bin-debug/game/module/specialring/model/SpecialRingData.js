var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SpecialRingData = (function () {
    function SpecialRingData() {
        this.id = 0;
        this.level = 0;
        this.exp = 0;
        this.fight = 0;
        this.order = 0;
        this.isUnLock = 0;
    }
    SpecialRingData.prototype.parser = function (bytes) {
        this.id = bytes.readShort();
        this.level = bytes.readShort();
        this.exp = bytes.readInt();
        this.fight = bytes.readByte();
        this.isUnLock = bytes.readByte();
        this.order = GlobalConfig.ActorExRingConfig[this.id].order;
    };
    return SpecialRingData;
}());
__reflect(SpecialRingData.prototype, "SpecialRingData");
//# sourceMappingURL=SpecialRingData.js.map