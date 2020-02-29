var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BossHomeConfig = (function () {
    function BossHomeConfig() {
        this.id = 0;
        this.vip = 0;
        this.boss = [];
        this.icon = [];
    }
    return BossHomeConfig;
}());
__reflect(BossHomeConfig.prototype, "BossHomeConfig");
//# sourceMappingURL=BossHomeConfig.js.map