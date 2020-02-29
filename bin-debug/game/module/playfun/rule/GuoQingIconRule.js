var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GuoQingIconRule = (function (_super) {
    __extends(GuoQingIconRule, _super);
    function GuoQingIconRule(id, t) {
        return _super.call(this, id, t) || this;
    }
    GuoQingIconRule.prototype.checkShowIcon = function () {
        var date = new Date(GameServer.serverTime);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        return year == 2017 && ((month == 9 && day == 30) || month == 10 && day < 9);
    };
    GuoQingIconRule.prototype.checkShowRedPoint = function () {
        return 0;
    };
    GuoQingIconRule.prototype.getEffName = function (redPointNum) {
        this.effX = 38;
        this.effY = 38;
        return "actIconCircle";
    };
    GuoQingIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(GuoActivityWin);
    };
    return GuoQingIconRule;
}(RuleIconBase));
__reflect(GuoQingIconRule.prototype, "GuoQingIconRule");
//# sourceMappingURL=GuoQingIconRule.js.map