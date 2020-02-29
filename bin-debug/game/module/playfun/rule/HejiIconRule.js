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
var HejiIconRule = (function (_super) {
    __extends(HejiIconRule, _super);
    function HejiIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.showMessage = [
            UserTask.ins().postUpdteTaskTrace,
        ];
        _this.playPunView = ViewManager.ins().getView(PlayFunView);
        var role = SubRoles.ins().getSubRoleByIndex(0);
        _this.guangquan = t["guangquan"];
        _this.questNumber = t["questNumber"];
        _this.skillName = t["skillName"];
        _this.Img = t["Img"];
        _this.bgimg = t["bgimg"];
        _this.imggroup = t["imggroup"];
        _this.eff = t["eff"];
        _this.skillName.source = "8000" + role.job + "_png";
        _this.questNumber.text = "0";
        _this.Img.source = "7" + role.job + "000_png";
        _this.bgimg.source = "7" + role.job + "000b_png";
        _this.mc = new MovieClip();
        _this.eff.addChild(_this.mc);
        _this.prossY = 0;
        var p = _this.Img.localToGlobal();
        _this.imggroup.globalToLocal(p.x, p.y, p);
        _this.masksp = new egret.Sprite();
        var square = new egret.Shape();
        square.graphics.beginFill(0xffffff);
        square.graphics.drawRect(p.x, p.y, _this.Img.width, _this.Img.height);
        square.graphics.endFill();
        _this.prossY = p.y + _this.Img.height;
        _this.masksp.y = _this.prossY;
        _this.masksp.addChild(square);
        _this.imggroup.addChild(_this.masksp);
        _this.Img.mask = _this.masksp;
        var dif = _this.updatekStep();
        _this.updatePross(dif);
        return _this;
    }
    HejiIconRule.prototype.checkShowIcon = function () {
        if (!UserTask.ins().taskTrace) {
            return false;
        }
        if (UserFb.ins().pkGqboss)
            return false;
        if (UserTask.ins().taskTrace.id >= TargetWin.TASKID) {
            if (this.mc.parent)
                DisplayUtils.removeFromParent(this.mc);
            return false;
        }
        return true;
    };
    HejiIconRule.prototype.updatekStep = function (success) {
        if (!UserTask.ins().taskTrace) {
            return 0;
        }
        if (UserTask.ins().taskTrace.id >= TargetWin.TASKID)
            return 0;
        var _loop_1 = function (i) {
            if (UserTask.ins().taskTrace.id == GlobalConfig.AchievementTaskConfig[i].taskId) {
                var dif_1 = GlobalConfig.AchievementTaskConfig[i].index;
                var difex = dif_1;
                if (success)
                    difex = dif_1 + 1;
                this_1.questNumber.text = TargetWin.TASKID % 100 - difex + 1 + "";
                var self_1 = this_1;
                this_1.showEff(function () { self_1.updatePross(dif_1); });
                if (success)
                    return { value: dif_1 > 0 ? dif_1 : 0 };
                return { value: dif_1 <= 1 ? 0 : dif_1 };
            }
        };
        var this_1 = this;
        for (var i in GlobalConfig.AchievementTaskConfig) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return 0;
    };
    HejiIconRule.prototype.showEff = function (func) {
        var taskTraceName = this.playPunView.taskTraceName;
        var point = taskTraceName.localToGlobal();
        this.playPunView.globalToLocal(point.x, point.y, point);
        if (!this.jumpmc) {
            this.jumpmc = new MovieClip();
            this.jumpmc.playFile(RES_DIR_EFF + "bally2", -1);
        }
        if (!this.jumpmc.parent)
            this.playPunView.addChild(this.jumpmc);
        this.jumpmc.x = point.x + this.playPunView.taskTraceBtn.width / 2;
        this.jumpmc.y = point.y;
        point = this.playPunView.hejiguide.localToGlobal();
        this.playPunView.globalToLocal(point.x, point.y, point);
        var self = this;
        egret.Tween.get(this.jumpmc).to({ x: point.x + self.playPunView.hejiguide.width / 2, y: point.y + self.playPunView.hejiguide.height / 2 }, 600).call(function () {
            if (!self.mc.parent)
                self.eff.addChild(self.mc);
            self.mc.playFile(RES_DIR_EFF + "guidecircle", 1, function () {
                DisplayUtils.removeFromParent(self.mc);
            });
            egret.Tween.removeTweens(self.jumpmc);
            DisplayUtils.removeFromParent(self.jumpmc);
            if (func && typeof (func) == "function") {
                func();
            }
        });
    };
    HejiIconRule.prototype.updatePross = function (v) {
        if (this.masksp) {
            var value = v;
            var total = TargetWin.TASKID % 100;
            var persent = value / total;
            persent = persent >= 1 ? 1 : persent;
            this.masksp.y = this.prossY - Math.abs(this.prossY) * (persent);
        }
    };
    HejiIconRule.prototype.checkShowRedPoint = function () {
        return 0;
    };
    HejiIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(TargetWin, TargetWin.HEJI);
        Artifact.ins().showGuide = -2000;
    };
    HejiIconRule.prototype.getEffName = function (redPointNum) {
        return undefined;
    };
    return HejiIconRule;
}(RuleIconBase));
__reflect(HejiIconRule.prototype, "HejiIconRule");
//# sourceMappingURL=HejiIconRule.js.map