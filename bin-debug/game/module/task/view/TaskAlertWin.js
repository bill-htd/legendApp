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
var TaskAlertWin = (function (_super) {
    __extends(TaskAlertWin, _super);
    function TaskAlertWin() {
        var _this = _super.call(this) || this;
        _this.CLOSE_TIME = 40;
        _this.timeCount = 0;
        _this.skinName = "TaskSkin";
        return _this;
    }
    TaskAlertWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.rewardList.itemRenderer = ItemBase;
    };
    TaskAlertWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.gotoBtn, this.onClick);
        this.setView();
    };
    TaskAlertWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
        TimerManager.ins().removeAll(this);
        this.removeTouchEvent(this.gotoBtn, this.onClick);
        egret.Tween.removeTweens(this.arrowGroup);
    };
    TaskAlertWin.prototype.setView = function () {
        var data = UserTask.ins().taskTrace;
        if (data) {
            var config = UserTask.ins().getAchieveConfById(data.id);
            if (config) {
                this.rewardList.dataProvider = new eui.ArrayCollection(config.awardList);
                if (config.type == 79) {
                    this.taskInfo.textFlow = TextFlowMaker.generateTextFlow(config.longdesc);
                }
                else {
                    this.taskInfo.textFlow = TextFlowMaker.generateTextFlow(config.longdesc);
                }
            }
            this.taskName.textFlow = TextFlowMaker.generateTextFlow(config.name + "|C:0xf3311e&T: (" + data.value + "/" + config.target + ")|");
            switch (data.state) {
                case 0:
                    this.gotoBtn.label = "前  往";
                    break;
                case 1:
                    this.gotoBtn.label = "领  取";
                    break;
            }
        }
        var t = egret.Tween.get(this.arrowGroup, { "loop": true });
        t.to({ y: this.arrowGroup.y - 10 }, 400).to({ y: this.arrowGroup.y + 10 }, 400);
        TimerManager.ins().remove(this.onTimeCount, this);
        this.timeCount = this.CLOSE_TIME;
        TimerManager.ins().doTimer(1000, this.timeCount, this.onTimeCount, this);
        this.timeText.text = this.timeCount + "\u79D2\u540E\u81EA\u52A8\u63D0\u4EA4";
    };
    TaskAlertWin.prototype.onTimeCount = function () {
        this.timeCount--;
        this.timeText.text = this.timeCount + "\u79D2\u540E\u81EA\u52A8\u63D0\u4EA4";
        if (this.timeCount == 0) {
            TimerManager.ins().remove(this.onTimeCount, this);
            this.doTask();
        }
    };
    TaskAlertWin.prototype.onClick = function (e) {
        switch (e.target) {
            case this.gotoBtn:
                this.doTask();
                break;
        }
    };
    TaskAlertWin.prototype.doTask = function () {
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
        }
        ViewManager.ins().close(TaskAlertWin);
    };
    return TaskAlertWin;
}(BaseEuiView));
__reflect(TaskAlertWin.prototype, "TaskAlertWin");
ViewManager.ins().reg(TaskAlertWin, LayerManager.Game_Main);
//# sourceMappingURL=TaskAlertWin.js.map