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
var GuardMainUI = (function (_super) {
    __extends(GuardMainUI, _super);
    function GuardMainUI() {
        var _this = _super.call(this) || this;
        _this.isDelayBuff = false;
        _this.skillCd1 = 0;
        _this.skillCd2 = 0;
        _this.skillCd3 = 0;
        _this.isDelayUpdateInfo = false;
        _this.skinName = "guardGodWeaponUISkind";
        return _this;
    }
    GuardMainUI.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.help, this.onHelp);
        this.addTouchEvent(this.luckyBossBtn, this.onLuckBoss);
        this.addTouchEvent(this.skillBtn1, this.useSkill);
        this.addTouchEvent(this.skillBtn2, this.useSkill);
        this.addTouchEvent(this.skillBtn3, this.useSkill);
        this.observe(GameLogic.ins().postHpChange, this.updateHead);
        this.observe(UserFb.ins().postGuardCopyInfo, this.delayUpdateInfo);
        this.observe(UserSkill.ins().postDoBuff, this.doBuff);
        this.observe(UserSkill.ins().postDoRemoveBuff, this.doBuff);
        this.observe(UserFb.ins().postGuardUseSkill, this.useSkillHandler);
        if (GuardWeaponModel.ins().leftTime != undefined) {
            this.beginTime();
        }
        else {
            this.observe(UserFb.ins().postGuardLeftTime, this.beginTime);
        }
        this.updateHeadIcon();
        this.initHp();
        this.updateInfo();
        this.skillBtn1.icon = "" + GlobalConfig.GuardGodWeaponConf.sSkillIcon[0];
        this.skillBtn2.icon = "" + GlobalConfig.GuardGodWeaponConf.sSkillIcon[1];
        this.skillBtn3.icon = "" + GlobalConfig.GuardGodWeaponConf.sSkillIcon[2];
        this.skillcostnum1.text = "" + GlobalConfig.GuardGodWeaponConf.sSkillCost[0];
        this.skillcostnum2.text = "" + GlobalConfig.GuardGodWeaponConf.sSkillCost[1];
        this.skillcostnum3.text = "" + GlobalConfig.GuardGodWeaponConf.sSkillCost[2];
        this.shortcutCD1 = new ShortcutCD(40);
        this.cdGroup1.addChild(this.shortcutCD1);
        this.shortcutCD2 = new ShortcutCD(40);
        this.cdGroup2.addChild(this.shortcutCD2);
        this.shortcutCD3 = new ShortcutCD(40);
        this.cdGroup3.addChild(this.shortcutCD3);
    };
    GuardMainUI.prototype.close = function () {
    };
    GuardMainUI.prototype.updateHeadIcon = function () {
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < 3; i++) {
            var img = this["player" + (i + 1) + "touxiang"];
            var role = SubRoles.ins().getSubRoleByIndex(i);
            if (role) {
                img.source = "yuanhead" + role.job + role.sex;
            }
            else {
                img.visible = false;
            }
        }
    };
    GuardMainUI.prototype.onHelp = function () {
        ViewManager.ins().open(ZsBossRuleSpeak, 29);
    };
    GuardMainUI.prototype.updateBuffInfo = function () {
        this.isDelayBuff = false;
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            this.setBuff(i);
        }
    };
    GuardMainUI.prototype.doBuff = function () {
        if (!this.isDelayBuff) {
            this.isDelayBuff = true;
            TimerManager.ins().doTimer(80, 1, this.updateBuffInfo, this);
        }
    };
    GuardMainUI.prototype.setBuff = function (index) {
        var role = EntityManager.ins().getMainRole(index);
        if (role) {
            this["littleBuff" + (index + 1)].visible = role.hasBuff(59100);
        }
    };
    GuardMainUI.prototype.useSkill = function (e) {
        var btn = e.target;
        var index = 1;
        switch (btn) {
            case this.skillBtn1:
                index = 1;
                break;
            case this.skillBtn2:
                index = 2;
                break;
            case this.skillBtn3:
                index = 3;
                if (UserSkill.ins().hejiEnable) {
                    UserTips.ins().showTips("怒气已满");
                    return;
                }
                break;
        }
        var data = GuardWeaponModel.ins().guardCopyInfo;
        var time = this["skillCd" + index];
        if (time > 0) {
            UserTips.ins().showTips("\u6280\u80FDCD\u4E2D,\u8FD8\u5269" + time + "\u79D2");
        }
        else if (data.score < GlobalConfig.GuardGodWeaponConf.sSkillCost[index - 1]) {
            UserTips.ins().showTips("技能积分不足");
        }
        else {
            UserFb.ins().guardUseSkill(index);
        }
    };
    GuardMainUI.prototype.useSkillHandler = function (index) {
        this["shortcutCD" + index].play(GlobalConfig.GuardGodWeaponConf.sSkillCd[index - 1]);
        this["skillCd" + index] = GlobalConfig.GuardGodWeaponConf.sSkillCd[index - 1];
        var str = "|C:0x00ff00&T:" + GlobalConfig.GuardGodWeaponConf.sSkillUseText[index - 1] + "|";
        UserTips.ins().showTips(str);
    };
    GuardMainUI.prototype.delayUpdateInfo = function () {
        if (!this.isDelayUpdateInfo) {
            this.isDelayUpdateInfo = true;
            TimerManager.ins().doTimer(200, 1, this.updateInfo, this);
        }
    };
    GuardMainUI.prototype.updateInfo = function () {
        this.isDelayUpdateInfo = false;
        var data = GuardWeaponModel.ins().guardCopyInfo;
        this.refreshHints0.text = "\uFF08" + data.wave + "/" + GuardWeaponModel.ins().getMaxWaves() + "\uFF09";
        var time;
        if (this.lastWave != data.wave) {
            time = GuardWeaponModel.ins().getWaveTime(data.wave);
            this.refreshHints1.text = "" + time;
        }
        this.lastWave = data.wave;
        this.dangqianbo1.text = "" + data.minMonsterWave;
        this.dangqianbo2.text = "" + data.minMonsteNums;
        this.zongshu2.text = "" + data.monsterNum;
        this.zongshu0.text = "" + data.score;
        this.redPoint.visible = GuardWeaponModel.ins().isCanCallBoss();
        var value;
        if (this.lastScore == undefined) {
            value = data.score;
        }
        else {
            value = data.score - this.lastScore;
        }
        this.lastScore = data.score;
        if (value > 0) {
            var str = "|C:0x00ff00&T:\u79EF\u5206+" + value + "|";
            UserTips.ins().showTips(str);
        }
    };
    GuardMainUI.prototype.initHp = function () {
        for (var i = 0; i < 3; i++) {
            var progress = this["bloodBar" + i];
            var role = SubRoles.ins().getSubRoleByIndex(i);
            if (role) {
                var currentHp = role.getAtt(AttributeType.atHp);
                var maxHp = role.getAtt(AttributeType.atMaxHp);
                progress.maximum = 100;
                progress.value = Math.floor(currentHp * 100 / maxHp);
            }
            else {
                progress.visible = false;
            }
        }
    };
    GuardMainUI.prototype.updateHead = function (_a) {
        var target = _a[0], hp = _a[1], oldHp = _a[2];
        if (!(target instanceof CharRole) || hp == oldHp)
            return;
        var role = target.infoModel;
        var progress = this["bloodBar" + role.index];
        var currentHp = role.getAtt(AttributeType.atHp);
        var maxHp = role.getAtt(AttributeType.atMaxHp);
        progress.maximum = 100;
        progress.value = currentHp * 100 / maxHp;
        var img = this["player" + (role.index + 1) + "touxiang"];
        if (currentHp == 0) {
            img.filters = FilterUtil.ARRAY_GRAY_FILTER;
            this["time" + (role.index + 1)] = GlobalConfig.GuardGodWeaponConf.recoverCD;
        }
        else {
            img.filters = null;
            this["time" + (role.index + 1)] = 0;
            this["CountDown" + (role.index + 1)].visible = false;
        }
    };
    GuardMainUI.prototype.setTimeLabel = function (index) {
        this["time" + index]--;
        if (this["time" + index] > 0) {
            this["CountDown" + index].visible = true;
            this["CountDown" + index].text = this["time" + index].toString();
        }
        else {
            this["CountDown" + index].visible = false;
        }
    };
    GuardMainUI.prototype.onLuckBoss = function () {
        ViewManager.ins().open(GuardCallBossWin);
    };
    GuardMainUI.prototype.beginTime = function () {
        if (this.isBegin)
            return;
        this.time = GuardWeaponModel.ins().leftTime;
        this.isBegin = true;
        TimerManager.ins().doTimer(1000, 0, this.runTime, this);
    };
    GuardMainUI.prototype.runTime = function () {
        this.time -= 1;
        if (this.time > 0) {
            this.lastTime.text = DateUtils.getFormatBySecond(this.time, DateUtils.TIME_FORMAT_12);
        }
        else {
            this.lastTime.text = "";
            TimerManager.ins().remove(this.runTime, this);
        }
        var str = this.refreshHints1.text;
        var time = +(str);
        if (time > 0) {
            time--;
            this.refreshHints1.text = "" + time;
        }
        for (var i = 1; i <= 3; i++) {
            if (this["time" + i] > 0)
                this.setTimeLabel(i);
            this.setSkillCd(i);
        }
    };
    GuardMainUI.prototype.setSkillCd = function (index) {
        if (this["skillCd" + index] > 0) {
            this["skillCd" + index]--;
        }
    };
    return GuardMainUI;
}(BaseEuiView));
__reflect(GuardMainUI.prototype, "GuardMainUI");
ViewManager.ins().reg(GuardMainUI, LayerManager.UI_Main);
//# sourceMappingURL=GuardMainUI.js.map