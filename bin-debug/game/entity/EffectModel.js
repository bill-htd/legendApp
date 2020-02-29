var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EffectModel = (function () {
    function EffectModel() {
        this.dir = 4;
        this.team = Team.NotAtk;
    }
    return EffectModel;
}());
__reflect(EffectModel.prototype, "EffectModel");
//# sourceMappingURL=EffectModel.js.map