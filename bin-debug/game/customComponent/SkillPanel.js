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
var SkillPanel = (function (_super) {
    __extends(SkillPanel, _super);
    function SkillPanel() {
        var _this = _super.call(this) || this;
        _this.curRole = 0;
        _this.curIndex = 0;
        return _this;
    }
    SkillPanel.prototype.init = function () {
        this.curRole = 0;
    };
    SkillPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.all, this.onAllUpgrade);
        for (var i = 0; i < 5; i++) {
            var skillItem = this["skillItem" + (i + 1)];
            this.addTouchEvent(skillItem, this.onSelect);
            this.addTouchEvent(skillItem["grewUpAllBtn"], this.onSingleUpgrade);
        }
        this.observe(UserSkill.ins().postSkillUpgradeAll, this.grewupAllSkillCB);
        this.updateAllSkillItemAndDesc();
    };
    SkillPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.all, this.onAllUpgrade);
        for (var i = 0; i < 5; i++) {
            var skillItem = this["skillItem" + (i + 1)];
            this.removeTouchEvent(skillItem, this.onSelect);
            this.removeTouchEvent(skillItem["grewUpAllBtn"], this.onSingleUpgrade);
        }
        this.removeObserve();
        DisplayUtils.removeFromParent(this.mc);
        this.mc = null;
    };
    SkillPanel.prototype.showHint = function () {
        var str;
        if (Actor.level >= 80) {
            str = "|C:0xf3311e&T:技能等级达到上限，请提高转生|";
        }
        else {
            str = "|C:0xf3311e&T:技能等级不能超过人物等级|";
        }
        UserTips.ins().showTips(str);
    };
    SkillPanel.prototype.onSelect = function (e) {
        var level = UserSkill.ins().getSkillLimitLevel();
        switch (e.currentTarget) {
            case this.skillItem1:
                if (level < GlobalConfig.SkillsOpenConfig[1].level)
                    return;
                this.curIndex = 0;
                break;
            case this.skillItem2:
                if (level < GlobalConfig.SkillsOpenConfig[2].level)
                    return;
                this.curIndex = 1;
                break;
            case this.skillItem3:
                if (level < GlobalConfig.SkillsOpenConfig[3].level)
                    return;
                this.curIndex = 2;
                break;
            case this.skillItem4:
                if (level < GlobalConfig.SkillsOpenConfig[4].level)
                    return;
                this.curIndex = 3;
                break;
            case this.skillItem5:
                if (level < GlobalConfig.SkillsOpenConfig[5].level)
                    return;
                this.curIndex = 4;
                break;
        }
        this.setSkillItem();
    };
    SkillPanel.prototype.onSingleUpgrade = function (e) {
        switch (e.currentTarget.parent) {
            case this.skillItem1:
                this.onSendUpgrade(0);
                this.curIndex = 0;
                break;
            case this.skillItem2:
                this.onSendUpgrade(1);
                this.curIndex = 1;
                break;
            case this.skillItem3:
                this.onSendUpgrade(2);
                this.curIndex = 2;
                break;
            case this.skillItem4:
                this.onSendUpgrade(3);
                this.curIndex = 3;
                break;
            case this.skillItem5:
                this.onSendUpgrade(4);
                this.curIndex = 4;
                break;
        }
        SoundUtil.ins().playEffect(SoundUtil.SKILL_UP);
        this.setSkillItem();
    };
    SkillPanel.prototype.onAllUpgrade = function (e) {
        this.onSendUpgrade(0, true);
        SoundUtil.ins().playEffect(SoundUtil.SKILL_UP);
        this.setSkillItem();
    };
    SkillPanel.prototype.onSendUpgrade = function (skillIndex, isAll) {
        if (isAll === void 0) { isAll = false; }
        UserSkill.ins().sendGrewUpAllSkill(this.curRole, isAll, skillIndex);
    };
    SkillPanel.prototype.updateAllSkillItemAndDesc = function () {
        DisplayUtils.removeFromParent(this.mc);
        this.mc = null;
        this.updateAllSkillItem();
        this.setSkillItem();
    };
    SkillPanel.prototype.updateAllSkillItem = function () {
        this.isUpGrade = false;
        for (var i = 0; i < 5; i++) {
            var skillItem = this["skillItem" + (i + 1)];
            var role = SubRoles.ins().getSubRoleByIndex(this.curRole);
            if (!role)
                return;
            var skillLevel = role.skillsData[i];
            if (skillLevel.lv <= 0) {
                if (UserSkill.ins().getSkillLimitLevel() >= GlobalConfig.SkillsOpenConfig[i + 1].level) {
                    skillItem['lock'].textColor = 0X00FD61;
                    skillItem['lock'].text = "开启";
                }
                else {
                    skillItem['lock'].textColor = 0XFD000A;
                    skillItem['lock'].text = GlobalConfig.SkillsOpenConfig[i + 1].level + "级开启";
                }
                skillItem['lock'].visible = true;
                skillItem["lv"].text = "";
                skillItem["costAll"].visible = false;
                skillItem["coinIcon1"].visible = false;
                skillItem["grewUpAllBtn"].visible = false;
            }
            else {
                skillItem['lock'].visible = false;
                skillItem["lv"].text = "Lv." + skillLevel.lv + "";
                skillItem["costAll"].visible = true;
                skillItem["coinIcon1"].visible = true;
                skillItem["grewUpAllBtn"].visible = true;
                this.setCost(skillItem, i, skillLevel.lv);
            }
            skillItem["icon"].source = skillLevel.icon;
            skillItem["skillName"].text = skillLevel.name + "";
            skillItem["skillDesc"].textFlow = TextFlowMaker.generateTextFlow1(skillLevel.desc + "");
        }
        if (this.all.visible && this.isUpGrade) {
            if (!this.mc) {
                this.mc = new MovieClip;
                this.mc.x = this.all.width / 2;
                this.mc.y = this.all.height / 2;
                this.all.addChild(this.mc);
                this.mc.playFile(RES_DIR_EFF + "chargeff1", -1);
            }
        }
    };
    SkillPanel.prototype.setCost = function (item, index, lv) {
        var costNum = GlobalConfig.SkillsUpgradeConfig[lv].cost;
        var roleLevel = Actor.level;
        var coin = Actor.gold;
        item["costAll"].visible = item["coinIcon1"].visible = true;
        if (lv >= UserSkill.ins().getSkillLimitLevel()) {
            item["grewUpAllBtn"].enabled = false;
            var skillLevel = SubRoles.ins().getSubRoleByIndex(this.curRole).skillsData[this.curIndex];
            if (skillLevel.lv >= UserSkill.MAX_LEVEL) {
                item["grewUpAllBtn"].labelDisplay.text = "已满级";
                item["costAll"].visible = item["coinIcon1"].visible = false;
            }
            else {
                var ins = UserZs.ins();
                if (lv >= 80) {
                    item["grewUpAllBtn"].labelDisplay.text = (ins.lv + 1) + "转可升";
                }
                else {
                    item["grewUpAllBtn"].labelDisplay.text = (roleLevel + 1) + "级可升";
                }
            }
            if (costNum <= coin) {
                item["costAll"].textColor = 0x35e62d;
                item["costAll"].text = costNum;
            }
            else {
                item["costAll"].textColor = 0XFD000A;
                item["costAll"].text = costNum;
            }
        }
        else {
            var costAllNum = UserSkill.ins().getSingleSkillGrewUpCost(this.curRole, index);
            item["grewUpAllBtn"].labelDisplay.text = "一键升级";
            if (costAllNum > 0) {
                this.isUpGrade = true;
                item["costAll"].textColor = 0x35e62d;
                item["costAll"].text = costAllNum;
                item["grewUpAllBtn"].enabled = true;
            }
            else {
                item["costAll"].textColor = 0XFD000A;
                item["costAll"].text = costNum;
                item["grewUpAllBtn"].enabled = false;
            }
        }
    };
    SkillPanel.prototype.setSkillItem = function () {
        for (var i = 0; i < 5; i++) {
            var skillItem = this["skillItem" + (i + 1)];
            skillItem["select"].visible = i == this.curIndex;
        }
    };
    SkillPanel.prototype.setRoleId = function (id) {
        this.curRole = id;
        this.updateAllSkillItemAndDesc();
    };
    SkillPanel.prototype.grewupAllSkillCB = function (upData) {
        var old = upData[0];
        if (upData[1] != this.curRole)
            return;
        var role = SubRoles.ins().getSubRoleByIndex(this.curRole);
        for (var i = 0; i < old.length; i++) {
            if (old[i].lv && old[i].lv < role.skillsData[i].lv) {
                this.grewupTip(old[i], role.skillsData[i], i);
            }
        }
        this.updateAllSkillItemAndDesc();
        DisplayUtils.removeFromParent(this.mc);
        this.mc = null;
    };
    SkillPanel.prototype.grewupTip = function (skillold, skill, compIndex) {
        var _this = this;
        var str = "";
        var label = new eui.Label;
        label.size = 20;
        label.textColor = 0x20cb30;
        var addAttack;
        if (skill.args) {
            if (skillold.args) {
                addAttack = skill.args.b - skillold.args.b;
                str = skill.name + "\u589E\u52A0" + addAttack + "\u70B9\u4F24\u5BB3";
            }
            else {
                Assert(false, "SkillPanel.grewupTip() skillold.args is null!!\u65B0\u6280\u80FD\uFF1Aid(" + skill.id + "),lv(" + skill.lv + ") \u65E7\u6280\u80FD\uFF1Aid(" + skillold.id + "),lv(" + skillold.lv + ")");
            }
        }
        else {
            if (skillold.tarEff && skill.tarEff) {
                var effectsCfg = GlobalConfig.EffectsConfig[skillold.tarEff[0]];
                var nextEffectsCfg = GlobalConfig.EffectsConfig[skill.tarEff[0]];
                var sId = Math.floor(skill.id / 1000);
                switch (sId) {
                    case SHORT_SKILLID.MAGIC:
                        addAttack = Math.ceil((nextEffectsCfg.args.d - effectsCfg.args.d) * 1000) / 10;
                        str = skill.name + "\u4F24\u5BB3\u51CF\u514D\u589E\u52A0" + addAttack + "%";
                        break;
                    case SHORT_SKILLID.CURE:
                        addAttack = nextEffectsCfg.args.c - effectsCfg.args.c;
                        str = skill.name + "\u589E\u52A0" + addAttack + "\u70B9\u6CBB\u7597\u91CF";
                        break;
                    case SHORT_SKILLID.POISONING:
                        addAttack = nextEffectsCfg.args.c - effectsCfg.args.c;
                        str = skill.name + "\u6BCF\u79D2\u5931\u53BB" + addAttack + "\u70B9\u751F\u547D";
                        break;
                    case SHORT_SKILLID.ARMOR:
                        addAttack = nextEffectsCfg.args.c - effectsCfg.args.c;
                        str = skill.name + "\u589E\u52A0" + addAttack + "\u70B9\u7269\u9632\u548C\u9B54\u9632";
                        break;
                    case SHORT_SKILLID.SUMMON:
                        addAttack = nextEffectsCfg.args.a - effectsCfg.args.a;
                        str = "\u795E\u517D\u7B49\u7EA7\u589E\u52A0" + addAttack;
                        break;
                }
                addAttack = nextEffectsCfg.args.d - effectsCfg.args.d;
            }
            else if (skill.tarEff) {
                Assert(false, "SkillPanel.grewupTip() skillold.tarEff is null!!\u65B0\u6280\u80FD\uFF1Aid(" + skill.id + "),lv(" + skill.lv + ") \u65E7\u6280\u80FD\uFF1Aid(" + skillold.id + "),lv(" + skillold.lv + ")");
            }
        }
        var skillItem = this['skillItem' + (compIndex + 1)];
        label.text = str;
        var x = skillItem.x + skillItem.width / 2 - label.textWidth / 2;
        var y = skillItem.y + skillItem.height / 4;
        label.x = x;
        label.y = y;
        this.addChild(label);
        var mc = new MovieClip;
        mc.x = 65;
        mc.y = y + 20;
        mc.playFile(RES_DIR_EFF + "forgeSuccess", 1);
        this.addChild(mc);
        var t = egret.Tween.get(label);
        t.to({ "y": label.y - 45 }, 600).wait(1000).call(function () {
            _this.removeChild(label);
        }, this);
    };
    return SkillPanel;
}(BaseView));
__reflect(SkillPanel.prototype, "SkillPanel");
//# sourceMappingURL=SkillPanel.js.map