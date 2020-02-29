var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LoongSoulStageConfig = (function () {
    function LoongSoulStageConfig() {
        this.stage = 0;
        this.icon = "";
        this.normalCost = 0;
        this.attr = [];
        this.normalCostTip = 0;
    }
    return LoongSoulStageConfig;
}());
__reflect(LoongSoulStageConfig.prototype, "LoongSoulStageConfig");
//# sourceMappingURL=LoongSoulStageConfig.js.map