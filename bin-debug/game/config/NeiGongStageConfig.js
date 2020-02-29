var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NeiGongStageConfig = (function () {
    function NeiGongStageConfig() {
        this.stage = 0;
        this.level = 0;
        this.totalExp = 0;
        this.costMoney = 0;
        this.addExp = 0;
        this.attribute = [];
        this.tips = 0;
    }
    return NeiGongStageConfig;
}());
__reflect(NeiGongStageConfig.prototype, "NeiGongStageConfig");
//# sourceMappingURL=NeiGongStageConfig.js.map