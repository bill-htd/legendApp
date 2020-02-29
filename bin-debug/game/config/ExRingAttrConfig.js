var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ExRingAttrConfig = (function () {
    function ExRingAttrConfig() {
        this.level = 0;
        this.costItem = 0;
        this.cost = 0;
        this.attrAward = [];
        this.extAttrAward = [];
        this.upPower = 0;
        this.addPower = 0;
        this.judgeup = 0;
        this.SpecialRingSkin = "";
    }
    return ExRingAttrConfig;
}());
__reflect(ExRingAttrConfig.prototype, "ExRingAttrConfig");
//# sourceMappingURL=ExRingAttrConfig.js.map