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
var ActivityIconRule = (function (_super) {
    __extends(ActivityIconRule, _super);
    function ActivityIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.firstTap = true;
        _this.showMessage = [
            Actor.ins().postLevelChange,
            UserFb.ins().postGuanqiaInfo,
            UserFb.ins().postGuanKaIdChange,
            Activity.ins().postActivityIsGetAwards,
            PActivity.ins().postActivityIsGetAwards
        ];
        _this.updateMessage = [
            Actor.ins().postYbChange,
            Recharge.ins().postUpdateRecharge,
            Recharge.ins().postRechargeTotalDay,
            Recharge.ins().postUpdateRechargeEx,
            Activity.ins().postActivityIsGetAwards,
            PActivity.ins().postActivityIsGetAwards
        ];
        return _this;
    }
    ActivityIconRule.prototype.createTar = function () {
        var tar = _super.prototype.createTar.call(this);
        if (GameServer.serverOpenDay < 7) {
            if (tar)
                tar['icon'] = "zjmkaifu";
        }
        else {
            if (tar)
                tar['icon'] = "zjmhuodong";
        }
        return tar;
    };
    ActivityIconRule.prototype.checkShowIcon = function () {
        if (GameServer.serverOpenDay < 7) {
            if (this.tar)
                this.tar['icon'] = "zjmkaifu";
        }
        else {
            if (this.tar)
                this.tar['icon'] = "zjmhuodong";
        }
        if (!OpenSystem.ins().checkSysOpen(SystemType.ACTIVITY)) {
            return false;
        }
        var data = Activity.ins().activityData;
        var sum = Object.keys(data);
        if (!sum.length)
            return false;
        for (var k in data) {
            var actData = data[k];
            if (!actData.pageStyle && actData.timeType != ActivityDataFactory.TimeType_Total) {
                if (actData.isOpenActivity() && !actData.getHide()) {
                    return true;
                }
            }
        }
        data = PActivity.ins().activityData;
        for (var k in data) {
            var actData = data[k];
            if (actData.isOpenActivity() && !actData.getHide()) {
                return true;
            }
        }
        return false;
    };
    ActivityIconRule.prototype.checkShowRedPoint = function () {
        var data = Activity.ins().activityData;
        for (var k in data) {
            var actData = data[k];
            if (!actData.pageStyle && actData.timeType != ActivityDataFactory.TimeType_Total) {
                if (actData.isOpenActivity() && actData.canReward()) {
                    return 1;
                }
            }
        }
        data = PActivity.ins().activityData;
        for (var k in data) {
            var actData = data[k];
            if (actData.isOpenActivity() && actData.canReward()) {
                return 1;
            }
        }
        return 0;
    };
    ActivityIconRule.prototype.getEffName = function (redPointNum) {
        if (this.firstTap || redPointNum) {
            this.effX = 38;
            this.effY = 38;
            return "actIconCircle";
        }
        return undefined;
    };
    ActivityIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(ActivityWin);
        this.firstTap = false;
        this.update();
    };
    return ActivityIconRule;
}(RuleIconBase));
__reflect(ActivityIconRule.prototype, "ActivityIconRule");
//# sourceMappingURL=ActivityIconRule.js.map