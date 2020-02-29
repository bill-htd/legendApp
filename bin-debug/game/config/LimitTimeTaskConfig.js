var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LimitTimeTaskConfig = (function () {
    function LimitTimeTaskConfig() {
        this.id = 0;
        this.name = "";
        this.desc = "";
        this.target = 0;
        this.control = 0;
    }
    return LimitTimeTaskConfig;
}());
__reflect(LimitTimeTaskConfig.prototype, "LimitTimeTaskConfig");
//# sourceMappingURL=LimitTimeTaskConfig.js.map