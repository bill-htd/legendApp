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
var ThanksIconRule = (function (_super) {
    __extends(ThanksIconRule, _super);
    function ThanksIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.firstTap = true;
        _this.showMessage = [
            Actor.ins().postLevelChange,
            UserFb.ins().postGuanqiaInfo,
            UserFb.ins().postGuanKaIdChange,
            Activity.ins().postActivityIsGetAwards,
        ];
        _this.updateMessage = [
            Activity.ins().postActivityIsGetAwards,
            Actor.ins().postYbChange,
            Recharge.ins().postUpdateRecharge,
            Recharge.ins().postRechargeTotalDay,
            Recharge.ins().postUpdateRechargeEx
        ];
        return _this;
    }
    ThanksIconRule.prototype.checkShowIcon = function () {
        if (!OpenSystem.ins().checkSysOpen(SystemType.THANKS))
            return false;
        var data = Activity.ins().activityData;
        var sum = Object.keys(data);
        if (!sum.length)
            return false;
        for (var k in data) {
            var actData = data[k];
            if (actData.pageStyle == ActivityPageStyle.THANKS) {
                if (actData.isOpenActivity()) {
                    return true;
                }
            }
        }
        return false;
    };
    ThanksIconRule.prototype.checkShowRedPoint = function () {
        var data = Activity.ins().activityData;
        for (var k in data) {
            var actData = data[k];
            if (actData.pageStyle == ActivityPageStyle.THANKS) {
                if (actData.isOpenActivity() && actData.canReward() && actData.specialState()) {
                    return 1;
                }
            }
        }
        return 0;
    };
    ThanksIconRule.prototype.getEffName = function (redPointNum) {
        if (this.firstTap || redPointNum) {
            this.effX = 38;
            this.effY = 38;
            return "actIconCircle";
        }
        return undefined;
    };
    ThanksIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(ThanksGivingWin);
        this.firstTap = false;
        this.update();
    };
    return ThanksIconRule;
}(RuleIconBase));
__reflect(ThanksIconRule.prototype, "ThanksIconRule");
//# sourceMappingURL=ThanksIconRule.js.map