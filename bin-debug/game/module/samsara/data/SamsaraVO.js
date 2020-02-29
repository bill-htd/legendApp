var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SamsaraVO = (function () {
    function SamsaraVO(lv, exp, expUpgradeNum, normalUpgradeNum, advancedUpgradeNum) {
        this.lv = lv;
        this.exp = exp;
        this.expUpgradeNum = expUpgradeNum;
        this.normalUpgradeNum = normalUpgradeNum;
        this.advancedUpgradeNum = advancedUpgradeNum;
    }
    return SamsaraVO;
}());
__reflect(SamsaraVO.prototype, "SamsaraVO");
//# sourceMappingURL=SamsaraVO.js.map