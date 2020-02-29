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
var TargetWin = (function (_super) {
    __extends(TargetWin, _super);
    function TargetWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "targetSkin";
        return _this;
    }
    TargetWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.taskTip.visible = false;
    };
    TargetWin.prototype.destoryView = function () {
        _super.prototype.destoryView.call(this);
    };
    TargetWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
        this.removeTouchEvent(this, this.onTouch);
        this.removeTouchEvent(this.bgClose, this.onTouch);
        this.removeTouchEvent(this.button, this.onTouch);
        this.removeTouchEvent(this.btn2, this.onTouch);
        TimerManager.ins().removeAll(this);
    };
    TargetWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this, this.onTouch);
        this.addTouchEvent(this.bgClose, this.onTouch);
        this.addTouchEvent(this.button, this.onTouch);
        this.addTouchEvent(this.btn2, this.onTouch);
        this.observe(UserFb.ins().postAddEnergy, this.upDataGuanqia);
        if (param[0] == TargetWin.SEHNQI) {
            this.guanqia.visible = true;
            this.quest.visible = false;
            this.index = this.getShenQiId();
        }
        else {
            this.guanqia.visible = false;
            this.quest.visible = true;
            this.HejiSkillMc1 = new MovieClip;
            this.HejiSkillMc1.x = this.roleimg.x + this.roleimg.width / 2 + 73;
            this.HejiSkillMc1.y = this.roleimg.y + this.roleimg.height / 2 + 70 + 73;
            this.quest.addChild(this.HejiSkillMc1);
            this.HejiSkillMc2 = new MovieClip;
            this.HejiSkillMc2.x = this.enenyimg.x + this.enenyimg.width / 2 + 80;
            this.HejiSkillMc2.y = this.enenyimg.y + this.enenyimg.height / 2 + 167;
            this.quest.addChild(this.HejiSkillMc2);
        }
        this["show" + param[0]]();
    };
    TargetWin.prototype.show2 = function () {
        var role = SubRoles.ins().getSubRoleByIndex(0);
        var cur = this.getTaskSum();
        var totovalue = TargetWin.TASKID % 100;
        this.skillName.source = "8000" + role.job + "_png";
        this.questNumber.text = (TargetWin.TASKID % 100 - cur + 1) + "";
        this.mcSkillID = "skill40" + role.job;
        this.targetSkillID = "skill" + (403 + role.job);
        var bvalue = 0;
        cur = cur > 0 ? cur : 0;
        var calc = (cur - 1) / totovalue;
        calc = calc <= 0 ? 0 : calc;
        calc = calc >= 1 ? 1 : calc;
        bvalue = Math.floor(calc * 100);
        this.bar2.value = cur - 1;
        this.bar2.maximum = totovalue;
        this.bar2.labelFunction = function () {
            return bvalue + "%";
        };
        TimerManager.ins().remove(this.playSkillAnmi, this);
        TimerManager.ins().doTimer(3000, 0, this.playSkillAnmi, this);
        this.playSkillAnmi();
    };
    TargetWin.prototype.getTaskSum = function () {
        if (UserTask.ins().taskTrace.id >= TargetWin.TASKID)
            return 0;
        for (var i in GlobalConfig.AchievementTaskConfig) {
            if (UserTask.ins().taskTrace.id == GlobalConfig.AchievementTaskConfig[i].taskId) {
                var idx = GlobalConfig.AchievementTaskConfig[i].index;
                return idx > 0 ? idx : 0;
            }
        }
        return 0;
    };
    TargetWin.prototype.show1 = function () {
        var config = GlobalConfig.ImbaConf[this.index];
        if (!config)
            return;
        var rd = UserFb.ins().getNextReward();
        if (!rd)
            return;
        var wrconfig = UserFb.ins().getNewChapter();
        if (!wrconfig)
            return;
        var chip = this.getChipNum(config);
        var MaxGK = UserFb.ins().getDiffChapter();
        var newPassGK = wrconfig.needLevel;
        var itemconfig = GlobalConfig.ItemConfig[rd[0].id];
        this.artifactImg.source = config.img;
        this.itemImg.source = itemconfig.icon + "_png";
        this.artifactname.text = config.name;
        this.number1.text = chip + "";
        this.des1a1.text = config.funcDesc;
        this.guanqiaDes2.text = UserFb.ins().getNextNeedChapter() + "";
        this.artifactName1.text = itemconfig.name;
        var bvalue = 0;
        var cur = UserFb.ins().guanqiaID - newPassGK - 1;
        cur = cur > 0 ? cur : 0;
        var calc = cur / MaxGK;
        calc = calc >= 1 ? 1 : calc;
        bvalue = Math.floor(calc * 100);
        this.bar1.value = cur;
        this.bar1.maximum = MaxGK;
        this.bar1.labelFunction = function () {
            return bvalue + "%";
        };
        this.prossX = 0;
        var p = this.btnbar.localToGlobal();
        this.btnbar.parent.globalToLocal(p.x, p.y, p);
        this.masksp = new egret.Sprite();
        var square = new egret.Shape();
        square.graphics.beginFill(0xffffff);
        square.graphics.drawRect(p.x, p.y, this.btnbar.width, this.btnbar.height);
        square.graphics.endFill();
        this.prossX = p.x - this.btnbar.width;
        this.masksp.y = p.y;
        this.masksp.addChild(square);
        this.btnbar.parent.addChild(this.masksp);
        this.btnbar.mask = this.masksp;
        this.upDataGuanqia();
    };
    TargetWin.prototype.upDataGuanqia = function () {
        if (this.masksp) {
            var value = UserFb.ins().currentEnergy;
            var total = UserFb.ins().energy;
            var persent = (value - 1) / total;
            persent = persent >= 1 ? 1 : persent;
            this.masksp.x = this.prossX + Math.abs(this.prossX) * (persent);
        }
    };
    TargetWin.prototype.getChipNum = function (config) {
        var chip = 0;
        for (var i = 0; i < config.jigsawId.length; i++) {
            for (var k in GlobalConfig.WorldRewardConfig) {
                var wrconfig = GlobalConfig.WorldRewardConfig[k];
                if (wrconfig.rewards[0].id == config.jigsawId[i]) {
                    if (wrconfig.needLevel >= UserFb.ins().guanqiaID)
                        chip++;
                    break;
                }
            }
        }
        return chip;
    };
    TargetWin.prototype.getShenQiId = function () {
        var maxIndex = Artifact.ins().getMaxIndex();
        var index = 1;
        for (var i = 1; i <= maxIndex; i++) {
            var data = Artifact.ins().getNewArtifactBy(i);
            for (var j in GlobalConfig.ImbaConf) {
                if (GlobalConfig.ImbaConf[j].id == data.id) {
                    var chipId = UserFb.ins().getChipByGuanQia();
                    if (GlobalConfig.ImbaConf[j].jigsawId.indexOf(chipId) != -1) {
                        index = GlobalConfig.ImbaConf[j].index;
                        return index;
                    }
                }
            }
        }
        return index;
    };
    TargetWin.prototype.onTouch = function (e) {
        switch (e.currentTarget) {
            case this.bgClose:
            case this.btn2:
                ViewManager.ins().close(this);
                break;
            case this.button:
                if (UserFb.ins().currentEnergy >= UserFb.ins().energy) {
                    var self_1 = this;
                    GameGuider.challengeBoss(function () {
                        ViewManager.ins().close(self_1);
                    });
                }
                else {
                    this.showTaskTips("\u80FD\u91CF\u672A\u6EE1\u65E0\u6CD5\u6311\u6218\uFF0C\u8BF7\u7EE7\u7EED\u6E05\u602A\u3002");
                }
                break;
        }
    };
    TargetWin.prototype.showTaskTips = function (text) {
        var tips = this.taskTip;
        this.taskTipText0.textFlow = TextFlowMaker.generateTextFlow1(text);
        egret.Tween.removeTweens(tips);
        tips.bottom = 70;
        tips.visible = true;
        egret.Tween.get(tips).to({ bottom: 100 }, 500).wait(2000).call(function () {
            tips.visible = false;
        });
    };
    TargetWin.prototype.playSkillAnmi = function () {
        var _this = this;
        egret.Tween.removeTweens(this.roleimg);
        var t = egret.Tween.get(this.roleimg);
        if (!this.HejiSkillMc1.parent)
            this.quest.addChild(this.HejiSkillMc1);
        this.HejiSkillMc1.playFile("" + RES_DIR_SKILLEFF + this.mcSkillID, 1, null, true);
        t.wait(1500).call(function () {
            if (!_this.HejiSkillMc2.parent)
                _this.quest.addChild(_this.HejiSkillMc2);
            _this.HejiSkillMc2.playFile("" + RES_DIR_SKILLEFF + _this.targetSkillID, 1, null, true);
        }, this);
    };
    TargetWin.SEHNQI = 1;
    TargetWin.HEJI = 2;
    TargetWin.TASKID = 100026;
    return TargetWin;
}(BaseEuiView));
__reflect(TargetWin.prototype, "TargetWin");
ViewManager.ins().reg(TargetWin, LayerManager.UI_Popup);
//# sourceMappingURL=TargetWin.js.map