var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuildBossConfig = (function () {
    function GuildBossConfig() {
        this.dayTimes = 0;
        this.notOpenDayOfWeek = 0;
        this.effid = 0;
        this.radisLv = 0;
    }
    return GuildBossConfig;
}());
__reflect(GuildBossConfig.prototype, "GuildBossConfig");
//# sourceMappingURL=GuildBossConfig.js.map