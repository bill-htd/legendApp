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
var LadderBtnIconRule = (function (_super) {
    __extends(LadderBtnIconRule, _super);
    function LadderBtnIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.showMessage = [
            GameLogic.ins().postEnterMap,
            Actor.ins().postLevelChange,
            UserFb.ins().postGuanKaIdChange,
            UserTask.ins().postUpdteTaskTrace,
        ];
        _this.updateMessage = [
            Ladder.ins().postTadderChange,
            Encounter.ins().postEncounterDataChange,
            Mine.ins().postRedPoint,
            KFBattleRedPoint.ins().postRedPoint,
            UserFb.ins().postShowRedChange,
        ];
        return _this;
    }
    LadderBtnIconRule.prototype.checkShowIcon = function () {
        return (UserFb.ins().guanqiaID >= GlobalConfig.SkirmishBaseConfig.openLevel && !Encounter.ins().isGuiding && !UserFb.ins().pkGqboss);
    };
    LadderBtnIconRule.prototype.checkShowRedPoint = function () {
        var num = Encounter.ins().isHasRed();
        if (num) {
            return num;
        }
        if (Ladder.ins().checkRedShow()) {
            return 1;
        }
        if (Mine.redpointCheck()) {
            return 1;
        }
        if (UserFb.ins().checkTFRed())
            return 1;
        if (Hungu.ins().showHunShouRed())
            return 1;
        return 0;
    };
    LadderBtnIconRule.prototype.getEffName = function (redPointNum) {
        return undefined;
    };
    LadderBtnIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(LadderWin, 0);
    };
    return LadderBtnIconRule;
}(RuleIconBase));
__reflect(LadderBtnIconRule.prototype, "LadderBtnIconRule");
//# sourceMappingURL=LadderBtnIconRule.js.map