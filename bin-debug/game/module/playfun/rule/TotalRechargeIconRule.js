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
var TotalRechargeIconRule = (function (_super) {
    __extends(TotalRechargeIconRule, _super);
    function TotalRechargeIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.firstTap = true;
        _this.activityId = 0;
        _this.showMessage = [
            Activity.ins().postActivityIsGetAwards,
            Actor.ins().postLevelChange
        ];
        _this.updateMessage = [
            Activity.ins().postActivityIsGetAwards,
            Recharge.ins().postUpdateRecharge,
        ];
        return _this;
    }
    TotalRechargeIconRule.prototype.createTar = function () {
        var t = _super.prototype.createTar.call(this);
        this.alertText = new eui.Label();
        this.alertText.size = 14;
        this.alertText.width = 120;
        this.alertText.textAlign = "center";
        this.alertText.textColor = 0x35e62d;
        this.alertText.horizontalCenter = 0;
        t.addChild(this.alertText);
        this.alertText.y = 70;
        this.runTime();
        this.addTime();
        return t;
    };
    TotalRechargeIconRule.prototype.addTime = function () {
        TimerManager.ins().doTimer(1000, 0, this.runTime, this);
    };
    TotalRechargeIconRule.prototype.removeTime = function () {
        TimerManager.ins().remove(this.runTime, this);
    };
    TotalRechargeIconRule.prototype.runTime = function () {
        var data = Activity.ins().activityData;
        if (!this.activityId) {
            for (var k in data) {
                var actData_1 = data[k];
                if (actData_1.pageStyle == ActivityPageStyle.TOTALRECHARGE) {
                    if (actData_1.isOpenActivity() && !actData_1.getHide()) {
                        this.activityId = +k;
                        break;
                    }
                }
            }
        }
        if (!this.activityId) {
            this.alertText.text = "";
            return;
        }
        var actData = data[this.activityId];
        if (!actData) {
            this.alertText.text = "";
            return;
        }
        var time = actData.getLeftTime();
        if (time > 0) {
            this.alertText.text = DateUtils.getFormatBySecond(time, DateUtils.TIME_FORMAT_12);
        }
        else {
            var panel = ViewManager.ins().getView(PlayFunView);
            if (panel) {
                this.removeTime();
                this.update();
            }
        }
    };
    TotalRechargeIconRule.prototype.checkShowIcon = function () {
        this.removeTime();
        if (!OpenSystem.ins().checkSysOpen(SystemType.DOUBLE_TWELVE_RECHARGE))
            return false;
        var data = Activity.ins().activityData;
        var sum = Object.keys(data);
        if (!sum || !sum.length)
            return false;
        for (var k in data) {
            var actData = data[k];
            if (actData.pageStyle == ActivityPageStyle.TOTALRECHARGE) {
                if (actData.isOpenActivity() && !actData.getHide()) {
                    this.activityId = +k;
                    var data3 = data[this.activityId];
                    if (data3.getLeftTime() > 0) {
                        this.addTime();
                        return true;
                    }
                }
            }
        }
        return false;
    };
    TotalRechargeIconRule.prototype.checkShowRedPoint = function () {
        var data = Activity.ins().activityData;
        for (var k in data) {
            var actData = data[k];
            if (actData.pageStyle == ActivityPageStyle.TOTALRECHARGE) {
                if (actData.isOpenActivity() && actData.canReward() && !actData.getHide())
                    return 1;
            }
        }
        return 0;
    };
    TotalRechargeIconRule.prototype.getEffName = function (redPointNum) {
        if (this.firstTap || redPointNum) {
            this.effX = 38;
            this.effY = 38;
            return "actIconCircle";
        }
        return undefined;
    };
    TotalRechargeIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(TotalRechargeWin);
        if (this.firstTap) {
            this.firstTap = false;
            this.update();
        }
    };
    return TotalRechargeIconRule;
}(RuleIconBase));
__reflect(TotalRechargeIconRule.prototype, "TotalRechargeIconRule");
//# sourceMappingURL=TotalRechargeIconRule.js.map