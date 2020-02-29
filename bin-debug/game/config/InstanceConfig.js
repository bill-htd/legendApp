var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var InstanceConfig = (function () {
    function InstanceConfig() {
        this.fbid = 0;
        this.type = 0;
    }
    return InstanceConfig;
}());
__reflect(InstanceConfig.prototype, "InstanceConfig");
//# sourceMappingURL=InstanceConfig.js.map