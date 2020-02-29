var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MonthSignConfig = (function () {
    function MonthSignConfig() {
        this.month = 0;
        this.day = 0;
        this.rewards = null;
        this.dayLabel = 0;
        this.vipLabel = 0;
    }
    return MonthSignConfig;
}());
__reflect(MonthSignConfig.prototype, "MonthSignConfig");
//# sourceMappingURL=MonthSignConfig.js.map