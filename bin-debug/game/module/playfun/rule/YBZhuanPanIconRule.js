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
var YBZhuanPanIconRule = (function (_super) {
    __extends(YBZhuanPanIconRule, _super);
    function YBZhuanPanIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.firstTap = true;
        _this.activityId = 0;
        _this.showMessage = [
            Activity.ins().postActivityIsGetAwards,
            Actor.ins().postLevelChange
        ];
        _this.updateMessage = [
            Activity.ins().postActivityIsGetAwards,
            Actor.ins().postYbChange,
        ];
        return _this;
    }
    YBZhuanPanIconRule.prototype.createTar = function () {
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
    YBZhuanPanIconRule.prototype.addTime = function () {
        TimerManager.ins().doTimer(1000, 0, this.runTime, this);
    };
    YBZhuanPanIconRule.prototype.removeTime = function () {
        TimerManager.ins().remove(this.runTime, this);
    };
    YBZhuanPanIconRule.prototype.runTime = function () {
        var data = Activity.ins().activityData;
        if (!this.activityId) {
            for (var k in data) {
                var actData_1 = data[k];
                if (actData_1.pageStyle == ActivityPageStyle.YBZHUANPAN) {
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
        if (!actData.getLeftTime()) {
            this.removeTime();
        }
        var time = actData.getRemainTime();
        this.alertText.text = time;
    };
    YBZhuanPanIconRule.prototype.checkShowIcon = function () {
        if (!OpenSystem.ins().checkSysOpen(SystemType.CHRISTMAS))
            return false;
        var data = Activity.ins().activityData;
        var sum = Object.keys(data);
        if (!sum || !sum.length)
            return false;
        for (var k in data) {
            var actData = data[k];
            if (actData.pageStyle == ActivityPageStyle.YBZHUANPAN) {
                if (actData.isOpenActivity() && !actData.getHide()) {
                    return true;
                }
            }
        }
        return false;
    };
    YBZhuanPanIconRule.prototype.checkShowRedPoint = function () {
        var data = Activity.ins().activityData;
        for (var k in data) {
            var actData = data[k];
            if (actData.pageStyle == ActivityPageStyle.YBZHUANPAN) {
                if (actData.isOpenActivity() && actData.canReward() && !actData.getHide())
                    return 1;
            }
        }
        return 0;
    };
    YBZhuanPanIconRule.prototype.getEffName = function (redPointNum) {
        if (this.firstTap || redPointNum) {
            this.effX = 38;
            this.effY = 38;
            return "actIconCircle";
        }
        return undefined;
    };
    YBZhuanPanIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(YBZhuanPanWin);
        if (this.firstTap) {
            this.firstTap = false;
            this.update();
        }
    };
    return YBZhuanPanIconRule;
}(RuleIconBase));
__reflect(YBZhuanPanIconRule.prototype, "YBZhuanPanIconRule");
//# sourceMappingURL=YBZhuanPanIconRule.js.map