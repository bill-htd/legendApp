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
var ActivityExIconRule = (function (_super) {
    __extends(ActivityExIconRule, _super);
    function ActivityExIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.firstTap = true;
        _this.showMessage = [
            Activity.ins().postActivityIsGetAwards,
            Actor.ins().postLevelChange,
            UserFb.ins().postGuanqiaInfo,
            UserFb.ins().postGuanKaIdChange,
        ];
        _this.updateMessage = [
            Activity.ins().postActivityIsGetAwards,
            Actor.ins().postYbChange,
            Recharge.ins().postUpdateRecharge,
            Recharge.ins().postRechargeTotalDay,
            Recharge.ins().postUpdateRechargeEx,
            UserBag.ins().postItemAdd,
            UserBag.ins().postItemChange
        ];
        return _this;
    }
    ActivityExIconRule.prototype.checkShowIcon = function () {
        if (!OpenSystem.ins().checkSysOpen(SystemType.HFACTIVITY)) {
            return false;
        }
        var data = Activity.ins().activityData;
        var sum = Object.keys(data);
        if (!sum.length)
            return false;
        for (var k in data) {
            var actData = data[k];
            if (!actData.pageStyle && actData.timeType == ActivityDataFactory.TimeType_Total) {
                if (actData.isOpenActivity()) {
                    return true;
                }
            }
        }
        return false;
    };
    ActivityExIconRule.prototype.checkShowRedPoint = function () {
        var data = Activity.ins().activityData;
        for (var k in data) {
            var actData = data[k];
            if (!actData.pageStyle && actData.timeType == ActivityDataFactory.TimeType_Total) {
                if (actData.isOpenActivity() && actData.canReward() && actData.specialState()) {
                    return 1;
                }
            }
        }
        return 0;
    };
    ActivityExIconRule.prototype.getEffName = function (redPointNum) {
        if (this.firstTap || redPointNum) {
            this.effX = 38;
            this.effY = 38;
            return "actIconCircle";
        }
        return undefined;
    };
    ActivityExIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(ActivityExWin);
        this.firstTap = false;
        this.update();
    };
    return ActivityExIconRule;
}(RuleIconBase));
__reflect(ActivityExIconRule.prototype, "ActivityExIconRule");
//# sourceMappingURL=ActivityExIconRule.js.map