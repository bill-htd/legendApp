var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EquipConfig = (function () {
    function EquipConfig() {
        this.stoneId = 0;
        this.stoneNum = 0;
        this.moneyNum = 0;
        this.equipRate = 0;
        this.moneyType = 0;
        this.exPower = 0;
    }
    return EquipConfig;
}());
__reflect(EquipConfig.prototype, "EquipConfig");
//# sourceMappingURL=EquipConfig.js.map