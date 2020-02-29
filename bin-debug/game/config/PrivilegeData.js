var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PrivilegeData = (function () {
    function PrivilegeData() {
        this.priviMoney = 0;
        this.priviCardDays = 0;
    }
    return PrivilegeData;
}());
__reflect(PrivilegeData.prototype, "PrivilegeData");
//# sourceMappingURL=PrivilegeData.js.map