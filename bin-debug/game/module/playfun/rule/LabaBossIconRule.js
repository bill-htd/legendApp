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
var LabaBossIconRule = (function (_super) {
    __extends(LabaBossIconRule, _super);
    function LabaBossIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        if (OpenSystem.ins().checkSysOpen(SystemType.LABA)) {
            _this.activityData = Activity.ins().checkLabaBossData();
            if (!_this.activityData)
                return _this;
            _this.actId = _this.activityData.id;
        }
        _this.showMessage = [
            Activity.ins().postActivityIsGetAwards
        ];
        return _this;
    }
    LabaBossIconRule.prototype.createTar = function () {
        var t = _super.prototype.createTar.call(this);
        this.alertText = new eui.Label();
        this.alertText.size = 14;
        this.alertText.width = 120;
        this.alertText.textAlign = "center";
        this.alertText.textColor = 0x35e62d;
        this.alertText.horizontalCenter = 0;
        t.addChild(this.alertText);
        this.alertText.y = 70;
        if (this.activityData.isOpenActivity() && !this.activityData.IsEnd()) {
            if (!TimerManager.ins().isExists(this.runTime, this)) {
                TimerManager.ins().doTimer(1000, 0, this.runTime, this);
            }
            if (!TimerManager.ins().isExists(this.updateActivity, this)) {
                TimerManager.ins().doTimer(30000, 0, this.updateActivity, this);
            }
        }
        return t;
    };
    LabaBossIconRule.prototype.updateActivity = function () {
        if (this.activityData) {
            Activity.ins().sendChangePage(this.activityData.id);
        }
    };
    LabaBossIconRule.prototype.runTime = function () {
        if (!this.actId)
            return;
        this.activityData = Activity.ins().getActivityDataById(this.actId);
        if (!this.activityData) {
            TimerManager.ins().remove(this.runTime, this);
            TimerManager.ins().remove(this.updateActivity, this);
            return;
        }
        if (this.activityData.IsEnd()) {
            this.alertText.text = "今天刷新完";
            TimerManager.ins().remove(this.runTime, this);
            TimerManager.ins().remove(this.updateActivity, this);
            return;
        }
        var curTime = Math.floor(GameServer.serverTime / DateUtils.MS_PER_SECOND);
        var endTime = this.activityData.getEndTimer();
        if (curTime >= endTime) {
            this.alertText.text = "\u5DF2\u7ED3\u675F";
            return;
        }
        var startTime = this.activityData.getStartTimer();
        if (this.activityData.isGoIn) {
            this.alertText.text = "\u5DF2\u5237\u65B0";
        }
        else {
            var time = startTime - curTime;
            if (time > 0) {
                this.alertText.text = DateUtils.getFormatBySecond(time, DateUtils.TIME_FORMAT_12);
            }
            else {
                this.alertText.text = "\u5237\u65B0\u4E2D";
            }
        }
    };
    LabaBossIconRule.prototype.checkShowIcon = function () {
        if (!OpenSystem.ins().checkSysOpen(SystemType.LABA))
            return false;
        if (!this.activityData)
            return false;
        if (this.activityData.IsEnd()) {
            return false;
        }
        if (this.activityData.go2BossFb()) {
            return true;
        }
        return false;
    };
    LabaBossIconRule.prototype.checkShowRedPoint = function () {
        return 0;
    };
    LabaBossIconRule.prototype.tapExecute = function () {
        if (!this.activityData)
            return;
        if (this.activityData.IsEnd()) {
            UserTips.ins().showTips("\u5DF2\u7ECF\u5168\u90E8\u6D88\u706D\uFF0C\u8BF7\u671F\u5F85\u4E0B\u6B21\uFF01");
            return;
        }
        if (this.activityData.go2BossFb()) {
            Activity.ins().sendReward(this.activityData.id, this.activityData.index);
        }
        else {
            UserTips.ins().showTips("\u672A\u5230\u5237\u65B0\u65F6\u95F4");
        }
    };
    return LabaBossIconRule;
}(RuleIconBase));
__reflect(LabaBossIconRule.prototype, "LabaBossIconRule");
//# sourceMappingURL=LabaBossIconRule.js.map