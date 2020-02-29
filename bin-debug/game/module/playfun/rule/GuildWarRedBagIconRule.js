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
var GuildWarRedBagIconRule = (function (_super) {
    __extends(GuildWarRedBagIconRule, _super);
    function GuildWarRedBagIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.updateMessage = [
            GuildRedPoint.ins().postRedBag
        ];
        return _this;
    }
    GuildWarRedBagIconRule.prototype.checkShowIcon = function () {
        return false;
    };
    GuildWarRedBagIconRule.prototype.checkShowRedPoint = function () {
        return 0;
    };
    GuildWarRedBagIconRule.prototype.getEffName = function (redPointNum) {
        return undefined;
    };
    GuildWarRedBagIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(RedBagWin);
    };
    return GuildWarRedBagIconRule;
}(RuleIconBase));
__reflect(GuildWarRedBagIconRule.prototype, "GuildWarRedBagIconRule");
//# sourceMappingURL=GuildWarRedBagIconRule.js.map