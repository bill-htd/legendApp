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
var GwTaskView = (function (_super) {
    __extends(GwTaskView, _super);
    function GwTaskView() {
        var _this = _super.call(this) || this;
        _this._state = 0;
        _this._weaponId = 1;
        _this.weaponTxt = ["\u96F7\u9706\u6012\u65A9", "\u8D64\u8840\u9B54\u5251", "\u65E0\u6781\u900D\u9065\u6247"];
        _this.skinName = "GwTaskSkin";
        return _this;
    }
    GwTaskView.prototype.open = function (index) {
        this.addTouchEndEvent(this.btn, this.onTap);
        this.setSelectIndex(index);
    };
    GwTaskView.prototype.close = function () {
        this.removeTouchEvent(this.btn, this.onTap);
    };
    GwTaskView.prototype.setSelectIndex = function (index) {
        var weaponId = this._weaponId = index + 1;
        this.initSkill();
        var taskTip = "\u6FC0\u6D3B|C:0xFFCC00&T:" + this.weaponTxt[index] + "|\uFF0C\u9700\u8981\u5148\u5B8C\u6210\u795E\u5175\u4EFB\u52A1";
        var btnTxt = ["\u9886\u53D6\u4EFB\u52A1", "\u524D\u5F80", "\u5B8C\u6210\u4EFB\u52A1", "\u6FC0\u6D3B"];
        this.BG.source = "godweapon_weaponBG" + weaponId + "_png";
        var nameImg = ["zhanshi", "fashi", "daoshi"];
        for (var i = 0; i <= 2; i++) {
            var img = this[nameImg[i]];
            if (i == index)
                img.visible = true;
            else
                img.visible = false;
        }
        var tipsTxt = ["renwuchushi", "renwuneirong", "quanbuwancheng"];
        for (var _i = 0, tipsTxt_1 = tipsTxt; _i < tipsTxt_1.length; _i++) {
            var key = tipsTxt_1[_i];
            this[key].visible = false;
        }
        var gwTask = GodWeaponCC.ins().gwTask;
        if (!GodWeaponCC.ins().weaponIsActive(weaponId)) {
            if (gwTask.taskIdx && gwTask.weapon == weaponId) {
                var config = GlobalConfig.GodWeaponTaskConfig[gwTask.weaponIdx][gwTask.taskIdx];
                if (gwTask.statue == GwTaskData.DOING) {
                    taskTip += "|C:0xff0000&T:(" + (gwTask.taskIdx - 1) + "/5)|";
                    this.taskLabel.textFlow = TextFlowMaker.generateTextFlow1(taskTip);
                    this.renwuneirong.visible = true;
                    this.renwuneirong.textFlow = TextFlowMaker.generateTextFlow1(gwTask.taskIdx + "." + config.desc + (config.itemName[gwTask.weapon - 1] || "") + "|C:0xff0000&T:(" + gwTask.progress + "/" + config.target + ")|");
                    this.btn.label = btnTxt[1];
                    this._state = 1;
                    this.removeTaskMc();
                }
                else if (gwTask.statue == GwTaskData.DONE) {
                    taskTip += "|C:0xff0000&T:(" + (gwTask.taskIdx - 1) + "/5)|";
                    this.taskLabel.textFlow = TextFlowMaker.generateTextFlow1(taskTip);
                    this.renwuneirong.visible = true;
                    this.renwuneirong.textFlow = TextFlowMaker.generateTextFlow1(gwTask.taskIdx + "." + config.desc + (config.itemName[gwTask.weapon - 1] || "") + "|C:0x00ff00&T:(" + gwTask.progress + "/" + config.target + ")|");
                    this.btn.label = btnTxt[2];
                    this._state = 2;
                    this.addTaskMc();
                }
                else {
                    taskTip += "|C:0x00ff00&T:(" + gwTask.taskIdx + "/5)|";
                    this.taskLabel.textFlow = TextFlowMaker.generateTextFlow1(taskTip);
                    this.quanbuwancheng.visible = true;
                    this.btn.label = btnTxt[3];
                    this._state = 3;
                    this.addTaskMc();
                }
            }
            else {
                this.taskLabel.textFlow = TextFlowMaker.generateTextFlow1(taskTip);
                this.renwuchushi.visible = true;
                this.btn.label = btnTxt[0];
                this._state = 0;
                this.removeTaskMc();
            }
        }
    };
    GwTaskView.prototype.addTaskMc = function () {
        this.validateNow();
        this.taskMc = this.taskMc || ObjectPool.pop("MovieClip");
        this.taskMc.x = this.btn.width / 2;
        this.taskMc.y = this.btn.height / 2;
        this.taskMc.scaleX = 1;
        this.taskMc.scaleY = 0.85;
        this.taskMc.touchEnabled = false;
        this.btn.parent.addChild(this.taskMc);
        this.taskMc.playFile(RES_DIR_EFF + "chargeff1", -1);
    };
    GwTaskView.prototype.removeTaskMc = function () {
        TimerManager.ins().removeAll(this);
        if (this.taskMc && this.taskMc.parent) {
            this.taskMc.parent.removeChild(this.taskMc);
            this.taskMc.destroy();
        }
        this.taskMc = null;
    };
    GwTaskView.prototype.initSkill = function () {
        var weaponId = this._weaponId;
        var skills = GlobalConfig.GodWeaponBaseConfig.noticeSkillId[weaponId - 1];
        var configs = GlobalConfig.GodWeaponLineConfig[weaponId];
        var index = 0;
        for (var _i = 0, skills_1 = skills; _i < skills_1.length; _i++) {
            var skillId = skills_1[_i];
            var data = GodWeaponCC.ins().getWeaponSkinIdData(weaponId, configs[skillId].skinId);
            this["item" + index].imgLight = true;
            this["item" + index].updateView(data, weaponId - 1);
            this["skillName" + index].text = configs[skillId].skillName;
            this["skillDesc" + index].text = configs[skillId].lockDesc;
            index += 1;
        }
    };
    GwTaskView.prototype.onTap = function (e) {
        var _this = this;
        var tar = e.currentTarget;
        var gwTask = GodWeaponCC.ins().gwTask;
        if (tar == this.btn) {
            if (this._state == 0) {
                var role = SubRoles.ins().getSubRoleByJob(this._weaponId);
                if (!role) {
                    var jobNames = ["0", "战士", "法师", "道士"];
                    UserTips.ins().showTips("\u672A\u6FC0\u6D3B" + jobNames[this._weaponId] + "\uFF0C\u65E0\u6CD5\u9886\u53D6\u4EFB\u52A1");
                    return;
                }
                if (!gwTask.weapon) {
                    WarnWin.show("\u9886\u53D6<font color='#FFCC00'>" + this.weaponTxt[this._weaponId - 1] + "</font>\u4EFB\u52A1\u540E\uFF0C\u9700\u8981\u5168\u90E8\u4EFB\u52A1\u505A\u5B8C\uFF0C\u624D\u80FD\u518D\u6B21\u9886\u53D6\u5176\u4ED6\u795E\u5175\u4EFB\u52A1\uFF0C\u662F\u5426\u786E\u5B9A\u9886\u53D6\uFF1F", function () {
                        GodWeaponCC.ins().requestReceiveTask(_this._weaponId);
                    }, this);
                }
                else {
                    UserTips.ins().showTips("\u6709\u5DF2\u9886\u53D6\u7684\u795E\u5175\u4EFB\u52A1\uFF0C\u8BF7\u5148\u5B8C\u6210");
                }
            }
            else if (this._state == 1) {
                var config = GlobalConfig.GodWeaponTaskConfig[gwTask.weaponIdx][gwTask.taskIdx];
                if (config.controlTarget) {
                    ViewManager.ins().open(config.controlTarget[0], config.controlTarget[1]);
                }
            }
            else if (this._state == 2 || this._state == 3) {
                GodWeaponCC.ins().requestActiveWeapon();
                if (this._state == 2) {
                    this.taskComMc = this.taskComMc || ObjectPool.pop("MovieClip");
                    this.taskComMc.playFile(RES_DIR_EFF + "complete", 1, function () {
                        if (_this.taskComMc.parent) {
                            _this.taskComMc.parent.removeChild(_this.taskComMc);
                            _this.taskComMc.destroy();
                            _this.taskComMc = null;
                        }
                    });
                    this.taskComMc.y = this.btn.y - 80;
                    this.taskComMc.x = this.btn.x + this.btn.width / 2;
                    this.GwTask.addChild(this.taskComMc);
                }
            }
        }
    };
    return GwTaskView;
}(BaseView));
__reflect(GwTaskView.prototype, "GwTaskView");
//# sourceMappingURL=GwTaskView.js.map