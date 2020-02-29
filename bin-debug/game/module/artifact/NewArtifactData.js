var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NewArtifactData = (function () {
    function NewArtifactData() {
        this.id = 0;
        this.record = 0;
        this.open = false;
        this.exitRecord = 0;
    }
    NewArtifactData.prototype.isChipExit = function (index) {
        return ((this.exitRecord >> index) & 1) == 1;
    };
    NewArtifactData.prototype.isChipOpen = function (index) {
        return ((this.record >> index) & 1) == 1;
    };
    NewArtifactData.prototype.getChipLength = function () {
        return GlobalConfig.ImbaConf[this.id].jigsawId.length;
    };
    NewArtifactData.prototype.getNextChipId = function () {
        var conf = GlobalConfig.ImbaConf[this.id];
        for (var i = 0; i < conf.jigsawId.length; i++) {
            if (!this.isChipExit(i)) {
                return conf.jigsawId[i];
            }
        }
        return null;
    };
    NewArtifactData.prototype.remindNumToOpen = function () {
        var conf = this.getConf();
        var num = 0;
        for (var i = 0; i < conf.jigsawId.length; i++) {
            if (!this.isChipExit(i)) {
                num++;
            }
        }
        return num;
    };
    NewArtifactData.prototype.getConf = function () {
        for (var k in GlobalConfig.ImbaConf) {
            if (GlobalConfig.ImbaConf[k].id == this.id) {
                return GlobalConfig.ImbaConf[k];
            }
        }
    };
    return NewArtifactData;
}());
__reflect(NewArtifactData.prototype, "NewArtifactData");
//# sourceMappingURL=NewArtifactData.js.map