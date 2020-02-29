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
var TaskTraceIconRule = (function (_super) {
    __extends(TaskTraceIconRule, _super);
    function TaskTraceIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.currentEff = "";
        _this.showMessage = [
            UserTask.ins().postUpdteTaskTrace,
            Actor.ins().postLevelChange,
            GameLogic.ins().postEnterMap
        ];
        return _this;
    }
    TaskTraceIconRule.prototype.checkShowIcon = function () {
        var b = UserTask.ins().getTaskState() && !UserFb.ins().pkGqboss;
        return b;
    };
    TaskTraceIconRule.prototype.getEffName = function (redPointNum) {
        var eff;
        var data = UserTask.ins().taskTrace;
        if (data) {
            switch (data.state) {
                case 0:
                    eff = "achieveCom";
                    this.effX = 130;
                    this.effY = 35;
                    break;
                case 1:
                    eff = "GWOpenEff";
                    this.effX = 140;
                    this.effY = 32;
                    break;
            }
        }
        if (this.currentEff != eff) {
            var playPunView = ViewManager.ins().getView(PlayFunView);
            if (playPunView.ruleEff[this.tar.hashCode]) {
                DisplayUtils.removeFromParent(playPunView.ruleEff[this.tar.hashCode]);
                playPunView.ruleEff[this.tar.hashCode] = null;
            }
        }
        this.currentEff = eff;
        return eff;
    };
    TaskTraceIconRule.prototype.tapExecute = function () {
        var data = UserTask.ins().taskTrace;
        if (data.state == 0) {
            GameGuider.taskGuidance(data.id, 1);
            GuideUtils.ins().updateByClick();
        }
        else {
            UserTask.ins().sendGetAchieve(data.achievementId);
            UserTask.ins().postParabolicItem();
            Hint.ins().postAchievementAft(data);
            if (!UserTask.ins().getAchieveConfById(data.id + 1)) {
                UserTips.ins().showTips("已完成所有任务!");
            }
            var view = ViewManager.ins().getView(PlayFunView);
            view.hejiRule.updatekStep(true);
        }
        this.update();
    };
    return TaskTraceIconRule;
}(RuleIconBase));
__reflect(TaskTraceIconRule.prototype, "TaskTraceIconRule");
//# sourceMappingURL=TaskTraceIconRule.js.map