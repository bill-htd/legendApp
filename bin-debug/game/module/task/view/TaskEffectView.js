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
var TaskEffectView = (function (_super) {
    __extends(TaskEffectView, _super);
    function TaskEffectView() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    TaskEffectView.prototype.init = function () {
        this._effGroup = new eui.Group();
        this.addChild(this._effGroup);
        this._arrowGroup = new eui.Group();
        this.addChild(this._arrowGroup);
        this._effCir = new MovieClip();
        this._effGroup.addChild(this._effCir);
        this._arrow = new GuideArrow2();
        this._arrowGroup.addChild(this._arrow);
        this.touchChildren = false;
        this.touchEnabled = false;
    };
    TaskEffectView.prototype.start = function () {
        TimerManager.ins().remove(this.update, this);
        TimerManager.ins().doTimer(500, 0, this.update, this);
    };
    TaskEffectView.prototype.stop = function () {
        TimerManager.ins().remove(this.update, this);
        this.hide();
    };
    TaskEffectView.prototype.show = function (tips) {
        if (!this._isShow) {
            this._isShow = true;
            var view = ViewManager.ins().getView(PlayFunView);
            if (!view) {
                this.hide();
                return;
            }
            egret.Tween.removeTweens(this);
            this.alpha = 0;
            egret.Tween.get(this).to({ alpha: 1 }, 300);
            var target = view['taskTraceBtn'];
            this.x = target.width >> 1;
            this.y = target.height >> 1;
            target.addChild(this);
            this._arrow.setDirection(0);
            this._effCir.playFile(RES_DIR_EFF + "guideff", -1);
        }
        this._arrow.setTips(tips);
    };
    TaskEffectView.prototype.hide = function () {
        if (this._isShow) {
            this._isShow = false;
            this._arrow.removeTweens();
            if (this.parent)
                this.parent.removeChild(this);
        }
    };
    TaskEffectView.prototype.isShow = function () {
        return this._isShow;
    };
    TaskEffectView.prototype.update = function () {
        var taskData = UserTask.ins().taskTrace;
        if (taskData) {
            var config = UserTask.ins().getAchieveConfById(taskData.id);
            var noShowWin = ["WelcomeWin"];
            for (var _i = 0, noShowWin_1 = noShowWin; _i < noShowWin_1.length; _i++) {
                var win = noShowWin_1[_i];
                if (ViewManager.ins().getView(win)) {
                    this.hide();
                    return;
                }
            }
            if (config) {
                if (taskData.state == 0 && config.startwarning) {
                    this.show(config.startwarning);
                }
                else if (taskData.state == 1 && config.finishwarning) {
                    this.show(config.finishwarning);
                }
                else {
                    this.hide();
                }
            }
        }
    };
    return TaskEffectView;
}(egret.DisplayObjectContainer));
__reflect(TaskEffectView.prototype, "TaskEffectView");
//# sourceMappingURL=TaskEffectView.js.map