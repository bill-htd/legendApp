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
var GuangqiaIconRule = (function (_super) {
    __extends(GuangqiaIconRule, _super);
    function GuangqiaIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.canChallen = false;
        _this.showMessage = [
            GameLogic.ins().postEnterMap,
            UserFb.ins().postGuanqiaInfo,
            UserFb.ins().postGuanKaIdChange,
            UserTask.ins().postUpdteTaskTrace,
            UserFb.ins().postAutoPk,
            UserFb.ins().postAutoPk2,
        ];
        return _this;
    }
    GuangqiaIconRule.prototype.checkShowIcon = function () {
        return UserFb.ins().checkGuanqiaIconShow() && GameMap.sceneInMain();
    };
    GuangqiaIconRule.prototype.upDateGuanqiaWroldReward = function () {
        var boxPass = UserFb.ins().getWorldGuanQia();
        return UserFb.ins().isReceiveBox(boxPass) ? 1 : 0;
    };
    GuangqiaIconRule.prototype.getEffName = function (redPointNum) {
        var eff = "";
        return eff;
    };
    GuangqiaIconRule.prototype.tapExecute = function () {
    };
    return GuangqiaIconRule;
}(RuleIconBase));
__reflect(GuangqiaIconRule.prototype, "GuangqiaIconRule");
//# sourceMappingURL=GuangqiaIconRule.js.map