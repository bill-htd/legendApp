var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ArtifactData = (function () {
    function ArtifactData() {
        this.id = 0;
        this.rank = 0;
    }
    ArtifactData.prototype.parser = function (bytes) {
        this.id = bytes.readInt();
        this.rank = bytes.readShort();
    };
    return ArtifactData;
}());
__reflect(ArtifactData.prototype, "ArtifactData");
//# sourceMappingURL=ArtifactData.js.map