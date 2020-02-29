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
var FbRedPoint = (function (_super) {
    __extends(FbRedPoint, _super);
    function FbRedPoint() {
        var _this = _super.call(this) || this;
        _this.isOpen = true;
        _this.registerTab(0, UserFb.ins().postFbInfoInit, UserFb.ins().postUpDataInfo, DieGuide.ins().postdieGuide, Actor.ins().postExp);
        _this.registerTab(1, UserFb.ins().postFbExpInfo);
        _this.registerTab(2, UserFb2.ins().postUpDataInfo);
        _this.registerTab(3, Millionaire.ins().postMillionaireInfo, Millionaire.ins().postTurnDice, Millionaire.ins().postRoundReward, Millionaire.ins().postMillionaireUpdate, BattleCC.ins().postOpenInfo, Actor.ins().postLevelChange, PaoDianCC.ins().postOpenInfo);
        _this.registerTab(4, UserZs.ins().postZsLv, GameApp.ins().postZeroInit, UserFb.ins().postGuardInfo);
        return _this;
    }
    FbRedPoint.prototype.getTabRedPoint = function (tab) {
        if (tab == 0)
            return UserFb.ins().hasCount();
        else if (tab == 1)
            return UserFb.ins().fbExpRed();
        else if (tab == 2)
            return (SkyLevelModel.ins().cruLevel > 1 && SkyLevelModel.ins().dayReward == 1) || SkyLevelModel.ins().lotteryRemainTimes > 0;
        else if (tab == 3)
            return BattleCC.ins().checkRedPoint() || Millionaire.ins().getRedPoint() || PaoDianCC.ins().checkRedPoint();
        else if (tab == 4)
            return GuardWeaponModel.ins().canChallenge();
        return false;
    };
    return FbRedPoint;
}(RedPointBase));
__reflect(FbRedPoint.prototype, "FbRedPoint");
var GameSystem;
(function (GameSystem) {
    GameSystem.fbredpoint = FbRedPoint.ins.bind(FbRedPoint);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=FbRedPoint.js.map