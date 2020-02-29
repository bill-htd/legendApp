var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RuneBaseConfig = (function () {
    function RuneBaseConfig() {
        this.id = 0;
        this.type = 0;
        this.expend = 0;
        this.gain = 0;
        this.chip = 0;
        this.attr = [];
        this.equipAttr = [];
        this.exAttr = [];
        this.specialAttr = [];
        this.specialDesc = null;
        this.power = 0;
    }
    return RuneBaseConfig;
}());
__reflect(RuneBaseConfig.prototype, "RuneBaseConfig");
//# sourceMappingURL=RuneBaseConfig.js.map