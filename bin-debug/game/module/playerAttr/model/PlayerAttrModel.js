var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PlayerAttrModel = (function () {
    function PlayerAttrModel() {
        this.module = 0;
        this.soldierPower = 0;
        this.magePower = 0;
        this.immortalPower = 0;
    }
    return PlayerAttrModel;
}());
__reflect(PlayerAttrModel.prototype, "PlayerAttrModel");
//# sourceMappingURL=PlayerAttrModel.js.map