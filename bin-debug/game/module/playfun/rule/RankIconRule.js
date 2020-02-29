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
var RankIconRule = (function (_super) {
    __extends(RankIconRule, _super);
    function RankIconRule(id, t) {
        if (t === void 0) { t = null; }
        var _this = _super.call(this, id, t) || this;
        _this.showMessage = [
            Actor.ins().postLevelChange,
            UserFb.ins().postGuanqiaInfo,
            UserFb.ins().postGuanKaIdChange,
        ];
        return _this;
    }
    RankIconRule.prototype.checkShowIcon = function () {
        return OpenSystem.ins().checkSysOpen(SystemType.RANK);
    };
    RankIconRule.prototype.checkShowRedPoint = function () {
        if (OpenSystem.ins().checkSysOpen(SystemType.RANK)) {
            return 0;
        }
        else {
            return Rank.ins().canPraiseInAll() ? 1 : 0;
        }
    };
    RankIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(RankingWin);
    };
    return RankIconRule;
}(RuleIconBase));
__reflect(RankIconRule.prototype, "RankIconRule");
//# sourceMappingURL=RankIconRule.js.map