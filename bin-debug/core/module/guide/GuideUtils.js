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
var GuideUtils = (function (_super) {
    __extends(GuideUtils, _super);
    function GuideUtils() {
        var _this = _super.call(this) || this;
        _this.step = 0;
        _this.part = 0;
        _this.wrongCount = 0;
        _this.maxWrongCount = 2;
        return _this;
    }
    GuideUtils.ins = function () {
        return _super.ins.call(this);
    };
    GuideUtils.prototype.init = function () {
        if (this.isInit)
            return;
        this.isInit = true;
        if (Setting.currPart == 0) {
            this.part = 1;
            this.step = 1;
        }
        else {
            this.part = Setting.currPart;
            this.step = Setting.currStep;
        }
        this.cfg = [];
        var temp;
        for (var i in GlobalConfig.GuideConfig) {
            temp = [];
            for (var j in GlobalConfig.GuideConfig[i]) {
                temp.push(GlobalConfig.GuideConfig[i][j]);
            }
            this.cfg.push(temp);
        }
        if (this.part <= this.cfg.length) {
            var len = this.cfg[this.part - 1].length - 1;
            this.overs = this.cfg[this.part - 1][len].overs;
        }
        if (this.part <= this.cfg.length) {
            MessageCenter.addListener(UserTask.ins().postUpdteTaskTrace, this.updateByTask, this);
        }
    };
    GuideUtils.prototype.updateByTask = function () {
        this.guideOver();
        this.update(1);
    };
    GuideUtils.prototype.updateByClick = function () {
        this.update(2);
    };
    GuideUtils.prototype.updateByAppear = function () {
        this.update(3);
    };
    GuideUtils.prototype.canShow = function () {
        if (Assert(this.cfg, "\u65B0\u624B\u5F15\u5BFC\u672A\u521D\u59CB\u5316\u5C31\u8C03\u7528 canShow()")) {
            return false;
        }
        if (this.part > this.cfg.length) {
            MessageCenter.ins().removeAll(this);
            return false;
        }
        if (this.view && this.view.parent)
            return false;
        return true;
    };
    GuideUtils.prototype.checkShow = function () {
        if (!this.curCfg)
            return false;
        try {
            var displayObject = this.getDisplayObj(this.part, this.step);
            if (!displayObject) {
                return false;
            }
        }
        catch (e) {
            return false;
        }
        return true;
    };
    GuideUtils.prototype.addTimeHandler = function () {
        if (!TimerManager.ins().isExists(this.timeHandler, this)) {
            TimerManager.ins().doTimer(50, 0, this.timeHandler, this);
        }
    };
    GuideUtils.prototype.removeTimeHandler = function () {
        TimerManager.ins().remove(this.timeHandler, this);
    };
    GuideUtils.prototype.timeHandler = function () {
        if (this.canShow()) {
            if (this.checkShow()) {
                this.show(this.part, this.step);
            }
        }
        else {
            this.removeTimeHandler();
        }
    };
    GuideUtils.prototype.guideOver = function () {
        var data = UserTask.ins().taskTrace;
        if (this.overs && data && data.state == 0) {
            var len = this.overs.length;
            for (var i = 0; i < len; i++) {
                var over = this.overs[i];
                if (over.type == 1 && over.value == data.id) {
                    this.readyForNext();
                    this.close();
                    return;
                }
            }
        }
    };
    GuideUtils.prototype.update = function (type) {
        if (type === void 0) { type = 0; }
        if (this.canShow() == false)
            return;
        this.curCfg = this.cfg[this.part - 1][this.step - 1];
        if (!this.curCfg || !this.curCfg.start)
            return;
        if (type == 1) {
            if (this.curCfg.start.type == 1) {
                var data = UserTask.ins().taskTrace;
                if (data.id == this.curCfg.start.value)
                    if (data.state == 0)
                        GuideUtils.ins().show(this.part, this.step);
            }
            else if (this.curCfg.start.type == 3) {
                var data = UserTask.ins().taskTrace;
                if (data.id == this.curCfg.start.value && data.state == 1)
                    GuideUtils.ins().show(this.part, this.step);
            }
        }
        else if (type == 2) {
            if (this.curCfg.start.type == 2) {
                var data = UserTask.ins().taskTrace;
                if (data.id == this.curCfg.start.value && data.state == 0)
                    GuideUtils.ins().show(this.part, this.step);
            }
        }
        else if (type == 3) {
            if (this.curCfg.start.type == 4) {
                GuideUtils.ins().show(this.part, this.step);
            }
        }
    };
    GuideUtils.prototype.show = function (part, step) {
        var _this = this;
        this.part = part;
        this.step = step;
        var cfg = this.cfg[this.part - 1];
        if (cfg) {
            this.curCfg = this.cfg[this.part - 1][this.step - 1];
        }
        else {
            this.curCfg = null;
        }
        if (!this.curCfg) {
            this.readyForNext();
            this.close();
            return;
        }
        if (!this.checkShow()) {
            this.close();
            this.addTimeHandler();
            return;
        }
        if (this.view == null) {
            this.view = new GuideView();
        }
        this.view.clickCD = true;
        if (!this.view.hasEventListener(egret.Event.CHANGE))
            this.view.addEventListener(egret.Event.CHANGE, this.next, this);
        this.save();
        var displayObject;
        try {
            displayObject = this.getDisplayObj(part, step);
        }
        catch (e) {
            if (this.wrongCount >= this.maxWrongCount) {
                this.close();
                return;
            }
            else {
                this.wrongCount++;
                this.view.close();
                TimerManager.ins().doTimer(300, 1, function () {
                    _this.show(part, step - 1);
                }, this);
                return;
            }
        }
        if (displayObject) {
            TimerManager.ins().doNext(function () {
                _this.view.show(displayObject);
                StageUtils.ins().getStage().addChild(_this.view);
            }, this);
        }
        else {
            this.readyForNext();
            this.close();
        }
    };
    GuideUtils.prototype.clickOut = function () {
        if (this.curCfg && this.curCfg.type == 1) {
            this.readyForNext();
            this.close();
        }
    };
    GuideUtils.prototype.readyForNext = function () {
        this.part++;
        this.step = 1;
        if (this.part <= this.cfg.length) {
            var len = this.cfg[this.part - 1].length - 1;
            this.overs = this.cfg[this.part - 1][len].overs;
        }
        else
            this.overs = null;
        this.curCfg = null;
    };
    GuideUtils.prototype.close = function () {
        if (this.view) {
            DisplayUtils.removeFromParent(this.view);
            this.view.close();
            this.view.removeEventListener(egret.Event.CHANGE, this.next, this);
            this.wrongCount = 0;
        }
        this.removeTimeHandler();
    };
    GuideUtils.prototype.next = function () {
        var _this = this;
        TimerManager.ins().doNext(function () {
            _this.show(_this.part, _this.step + 1);
        }, this);
    };
    GuideUtils.prototype.save = function () {
        if (this.step == 1) {
            Setting.ins().setValue(ClientSet.guidePart, this.part + 1);
            Setting.ins().setValue(ClientSet.guideStep, 1);
        }
    };
    GuideUtils.prototype.getDisplayObj = function (part, step) {
        var displayObject;
        var cfg;
        if (this.cfg[part - 1] && step <= this.cfg[part - 1].length) {
            cfg = this.cfg[part - 1][step - 1];
            displayObject = eval('ViewManager.ins().getView(' + cfg.view + ')' + '.' + cfg.target);
        }
        return displayObject;
    };
    return GuideUtils;
}(BaseClass));
__reflect(GuideUtils.prototype, "GuideUtils");
var GameSystem;
(function (GameSystem) {
    GameSystem.guideUtils = GuideUtils.ins.bind(GuideUtils);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=GuideUtils.js.map