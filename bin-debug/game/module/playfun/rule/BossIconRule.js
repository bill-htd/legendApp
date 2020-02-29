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
var BossIconRule = (function (_super) {
    __extends(BossIconRule, _super);
    function BossIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.showMessage = [
            UserFb.ins().postGuanKaIdChange,
            UserTask.ins().postUpdteTaskTrace,
            ZsBoss.ins().postBossOpen,
            GameLogic.ins().postEnterMap
        ];
        _this.updateMessage = [
            UserBoss.ins().postWorldBoss,
            UserBoss.ins().postWorldNotice,
            ZsBoss.ins().postBossList,
            UserBoss.ins().postBossData,
        ];
        return _this;
    }
    BossIconRule.prototype.checkShowIcon = function () {
        return UserBoss.ins().checkBossIconShow();
    };
    BossIconRule.prototype.checkShowRedPoint = function () {
        if (PlayFun.ins().newBossRelive
            || UserFb.isCanChallenge()
            || UserBoss.ins().checkWorldBossRedPoint(UserBoss.BOSS_SUBTYPE_QMBOSS)
            || UserBoss.ins().checkWorldBossRedPoint(UserBoss.BOSS_SUBTYPE_WORLDBOSS)
            || UserBoss.ins().checkWorldBossRedPoint(UserBoss.BOSS_SUBTYPE_HOMEBOSS)
            || UserBoss.ins().checkWorldBossRedPoint(UserBoss.BOSS_SUBTYPE_SHENYU)
            || UserBoss.ins().checkWorldBossRedPoint(UserBoss.BOSS_SUBTYPE_DARKBOSS))
            return 1;
        return 0;
    };
    BossIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(BossWin);
        UserBoss.ins().postBossData(false);
    };
    BossIconRule.OpenTaskIndex = 41;
    return BossIconRule;
}(RuleIconBase));
__reflect(BossIconRule.prototype, "BossIconRule");
//# sourceMappingURL=BossIconRule.js.map