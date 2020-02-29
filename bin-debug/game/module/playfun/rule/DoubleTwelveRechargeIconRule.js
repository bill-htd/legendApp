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
var DoubleTwelveRechargeIconRule = (function (_super) {
    __extends(DoubleTwelveRechargeIconRule, _super);
    function DoubleTwelveRechargeIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.firstTap = true;
        _this.time = 0;
        _this.showMessage = [
            Activity.ins().postActivityIsGetAwards,
            Actor.ins().postLevelChange
        ];
        _this.updateMessage = [
            Activity.ins().postActivityIsGetAwards,
            Recharge.ins().postUpdateRecharge,
            Recharge.ins().postUpdateRechargeEx,
        ];
        return _this;
    }
    DoubleTwelveRechargeIconRule.prototype.createTar = function () {
        var t = _super.prototype.createTar.call(this);
        this.alertText = new eui.Label();
        this.alertText.size = 14;
        this.alertText.width = 120;
        this.alertText.textAlign = "center";
        this.alertText.textColor = 0x35e62d;
        this.alertText.horizontalCenter = 0;
        t.addChild(this.alertText);
        this.alertText.y = 70;
        return t;
    };
    DoubleTwelveRechargeIconRule.prototype.runTime = function () {
        var time = this.time;
        this.time -= 1;
        if (time > 0) {
            this.alertText.text = DateUtils.getFormatBySecond(time, DateUtils.TIME_FORMAT_12);
        }
        else {
            this.alertText.text = "";
            TimerManager.ins().remove(this.runTime, this);
            this.updateShow();
        }
    };
    DoubleTwelveRechargeIconRule.prototype.checkShowIcon = function () {
        if (!OpenSystem.ins().checkSysOpen(SystemType.DOUBLE_TWELVE_RECHARGE)) {
            return false;
        }
        var rechargeData = Activity.ins().doubleTwelveRechargeData;
        for (var k in rechargeData) {
            if (rechargeData[k].isOpenActivity()) {
                var data = rechargeData[Activity.ins().doubleTwelveRechargeIDAry[0]];
                if (data) {
                    TimerManager.ins().remove(this.runTime, this);
                    this.time = data.getLeftTime();
                    TimerManager.ins().doTimer(1000, 0, this.runTime, this);
                }
                return true;
            }
        }
        return false;
    };
    DoubleTwelveRechargeIconRule.prototype.checkShowRedPoint = function () {
        var data = Activity.ins().doubleTwelveRechargeData;
        for (var k in data) {
            if (data[k].canReward()) {
                return 1;
            }
        }
        return 0;
    };
    DoubleTwelveRechargeIconRule.prototype.getEffName = function (redPointNum) {
        if (this.firstTap || redPointNum) {
            this.effX = 38;
            this.effY = 38;
            return "actIconCircle";
        }
        return undefined;
    };
    DoubleTwelveRechargeIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(DoubleTwelveRechargeWin);
        this.firstTap = false;
        this.update();
    };
    return DoubleTwelveRechargeIconRule;
}(RuleIconBase));
__reflect(DoubleTwelveRechargeIconRule.prototype, "DoubleTwelveRechargeIconRule");
//# sourceMappingURL=DoubleTwelveRechargeIconRule.js.map