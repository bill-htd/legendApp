var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DefineEff = (function () {
    function DefineEff() {
        this.effid = 0;
        this.souce = "";
    }
    return DefineEff;
}());
__reflect(DefineEff.prototype, "DefineEff");
//# sourceMappingURL=DefineEff.js.map