var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WorldBossBaseConfig = (function () {
    function WorldBossBaseConfig() {
        this.refreshHour = 0;
        this.refreshMinute = 0;
        this.levelUpTime = 0;
        this.challengeCd = 0;
        this.convertRate = 0;
        this.maxGold = 0;
        this.clearCdCost = [];
        this.lotteryTime = 0;
        this.dayCount = [];
        this.buyCountPrice = [];
        this.rebornItem = 0;
    }
    return WorldBossBaseConfig;
}());
__reflect(WorldBossBaseConfig.prototype, "WorldBossBaseConfig");
//# sourceMappingURL=WorldBossBaseConfig.js.map