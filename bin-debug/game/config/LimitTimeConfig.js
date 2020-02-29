var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LimitTimeConfig = (function () {
    function LimitTimeConfig() {
        this.id = 0;
        this.time = 0;
        this.openLevel = 0;
        this.openZhuan = 0;
    }
    return LimitTimeConfig;
}());
__reflect(LimitTimeConfig.prototype, "LimitTimeConfig");
//# sourceMappingURL=LimitTimeConfig.js.map