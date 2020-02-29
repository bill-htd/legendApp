var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NeiGongBaseConfig = (function () {
    function NeiGongBaseConfig() {
        this.openLevel = 10;
        this.maxLevel = 20;
        this.maxStage = 0;
        this.levelPerStage = 0;
        this.openGuanqia = 10;
    }
    return NeiGongBaseConfig;
}());
__reflect(NeiGongBaseConfig.prototype, "NeiGongBaseConfig");
//# sourceMappingURL=NeiGongBaseConfig.js.map