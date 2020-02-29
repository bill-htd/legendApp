var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EntityAction = (function () {
    function EntityAction() {
    }
    EntityAction.ATTACK = "a";
    EntityAction.CAST = "c";
    EntityAction.STAND = "s";
    EntityAction.RUN = "r";
    EntityAction.DIE = "d";
    EntityAction.HIT = "h";
    return EntityAction;
}());
__reflect(EntityAction.prototype, "EntityAction");
//# sourceMappingURL=EntityAction.js.map