var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WorldBossConfig = (function () {
    function WorldBossConfig() {
        this.zsLevel = 0;
        this.level = 0;
        this.fbid = 0;
        this.bossId = 0;
        this.shield = 0;
        this.joinReward = 0;
        this.shieldReward = 0;
        this.belongReward = 0;
        this.killReward = 0;
        this.vip = 0;
        this.samsaraLv = 0;
    }
    return WorldBossConfig;
}());
__reflect(WorldBossConfig.prototype, "WorldBossConfig");
//# sourceMappingURL=WorldBossConfig.js.map