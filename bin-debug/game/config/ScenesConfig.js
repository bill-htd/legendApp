var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ScenesConfig = (function () {
    function ScenesConfig() {
        this.turn = 0;
        this.autoPunch = 0;
    }
    return ScenesConfig;
}());
__reflect(ScenesConfig.prototype, "ScenesConfig");
//# sourceMappingURL=ScenesConfig.js.map