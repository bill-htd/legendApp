var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ActorExRingBookConfig = (function () {
    function ActorExRingBookConfig() {
        this.id = 0;
        this.level = 0;
        this.itemId = 0;
        this.num = 0;
        this.attr = [];
        this.bookAttrPer = [];
        this.skillName = "";
        this.skillDesc = "";
        this.skillIcon = "";
        this.exPower = 0;
    }
    return ActorExRingBookConfig;
}());
__reflect(ActorExRingBookConfig.prototype, "ActorExRingBookConfig");
//# sourceMappingURL=ActorExRingBookConfig.js.map