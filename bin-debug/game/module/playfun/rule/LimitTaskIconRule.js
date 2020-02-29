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
var LimitTaskIconRule = (function (_super) {
    __extends(LimitTaskIconRule, _super);
    function LimitTaskIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.showMessage = [
            Actor.ins().postLevelChange,
            UserZs.ins().postZsData,
        ];
        _this.updateMessage = [
            UserTask.ins().postUpdteLimitTaskData,
        ];
        return _this;
    }
    LimitTaskIconRule.prototype.createTar = function () {
        var t = _super.prototype.createTar.call(this);
        this.alertText = new eui.Label();
        this.alertText.size = 14;
        this.alertText.width = 120;
        this.alertText.textAlign = "center";
        this.alertText.textColor = 0x35e62d;
        this.alertText.horizontalCenter = 0;
        t.addChild(this.alertText);
        this.alertText.y = 70;
        if (UserTask.ins().limitTaskState == 0) {
            this.alertText.text = "点击开放";
        }
        else {
            this.runTime();
            TimerManager.ins().doTimer(1000, 0, this.runTime, this);
        }
        return t;
    };
    LimitTaskIconRule.prototype.runTime = function () {
        var time = UserTask.ins().limitTaskEndTime - Math.floor(GameServer.serverTime / 1000);
        if (time >= 0) {
            this.alertText.text = DateUtils.getFormatBySecond(time, DateUtils.TIME_FORMAT_12);
        }
        else {
            this.alertText.text = "活动结束";
            TimerManager.ins().remove(this.runTime, this);
            this.updateShow();
        }
    };
    LimitTaskIconRule.prototype.checkShowIcon = function () {
        if (!OpenSystem.ins().checkSysOpen(SystemType.LIMITTASK)) {
            return false;
        }
        var config = GlobalConfig.LimitTimeConfig[UserTask.ins().currTaskListsId];
        if (!config)
            return false;
        if (UserTask.ins().limitTaskEndTime > 0) {
            if ((UserTask.ins().limitTaskEndTime - Math.floor(GameServer.serverTime / 1000) < 0)) {
                if (!GlobalConfig.LimitTimeConfig[UserTask.ins().currTaskListsId + 1]) {
                    ViewManager.ins().close(LimitTaskView);
                    return false;
                }
            }
            else if (!GlobalConfig.LimitTimeConfig[UserTask.ins().currTaskListsId + 1] && UserTask.ins().limitTaskCount == 8) {
                this.updateShow();
                TimerManager.ins().doTimer(1500, 1, function () {
                    ViewManager.ins().close(LimitTaskView);
                }, this);
                return false;
            }
        }
        if (UserTask.ins().limitTaskState != -1 && UserTask.ins().limitTaskEndTime > 0)
            return true;
        return true;
    };
    LimitTaskIconRule.prototype.checkShowRedPoint = function () {
        return UserTask.ins().getLimitTaskRed();
    };
    LimitTaskIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(LimitTaskView);
    };
    LimitTaskIconRule.prototype.getEffName = function (redPointNum) {
        this.effX = 38;
        this.effY = 38;
        return "actIconCircle";
    };
    return LimitTaskIconRule;
}(RuleIconBase));
__reflect(LimitTaskIconRule.prototype, "LimitTaskIconRule");
//# sourceMappingURL=LimitTaskIconRule.js.map