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
var ZhanLingTips = (function (_super) {
    __extends(ZhanLingTips, _super);
    function ZhanLingTips() {
        var _this = _super.call(this) || this;
        _this.skinName = "ZhanlingSkillTipsSkin";
        return _this;
    }
    ZhanLingTips.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
    };
    ZhanLingTips.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEndEvent(this, this.otherClose);
        this.addTouchEvent(this.bgClose, this.otherClose);
        this.id = param[0] || 0;
        this.skillid = param[1];
        var tips = { name: "", desc: "", lock: "" };
        var ntips = { name: "", desc: "", lock: "" };
        var state = "";
        if (this.skillid) {
            state = "unactive";
            var zlData = ZhanLingModel.ins().getZhanLingDataById(this.id);
            var skill = ZhanLingModel.ins().getZhanLingDataBySkill(this.id);
            var zlBase = GlobalConfig.ZhanLingBase[this.id];
            var level = ZhanLingModel.ins().getZhanLingDataByLevel(this.id);
            for (var i = 0; i < zlBase.skill.length; i++) {
                if (zlBase.skill[i].id == this.skillid) {
                    var zlskill = GlobalConfig.ZhanLingSkill[zlBase.skill[i].id];
                    var skillconfig = GlobalConfig.SkillsConfig[zlskill.passive];
                    var descId = skillconfig ? skillconfig.desc : 0;
                    var sdconfig = GlobalConfig.SkillsDescConfig[descId];
                    if (!zlData || level < zlBase.skill[i].open) {
                        var stage = Math.floor(zlBase.skill[i].open / 10);
                        var stage2 = Math.floor(zlBase.skill[i].open % 10);
                        if (!stage2) {
                            if (zlBase.skill[i].open && zlBase.skill[i].open % 10 == 0)
                                stage2 = 10;
                            else
                                stage += 1;
                        }
                        else {
                            stage += 1;
                        }
                        if (sdconfig) {
                            tips.name = sdconfig.name;
                            tips.desc = sdconfig.desc;
                        }
                        tips.lock = stage + "\u9636" + (stage2) + "\u661F";
                    }
                    else {
                        state = "max";
                        if (sdconfig) {
                            tips.name = sdconfig.name;
                            tips.desc = sdconfig.desc;
                        }
                    }
                    if (skillconfig && sdconfig && tips.desc) {
                        tips.desc = StringUtils.replace(tips.desc, "" + skillconfig.desc_ex[0]);
                    }
                    if (zlskill.desc && zlskill.desc.name)
                        tips.name = zlskill.desc.name;
                    if (zlskill.desc && zlskill.desc.desc) {
                        tips.desc = zlskill.desc.desc;
                    }
                    if (zlskill.attrs) {
                        if (tips.desc)
                            tips.desc += "\n";
                        tips.desc += "|C:0xff00ff&T:" + AttributeData.getAttStr(zlskill.attrs, 0, 1, "：") + "|";
                    }
                    break;
                }
            }
        }
        else {
            var talentId = ZhanLingModel.ins().getZhanLingDataByTalentId(this.id);
            var talentLv = ZhanLingModel.ins().getZhanLingDataByTalentLv(this.id);
            var maxTalentLv = CommonUtils.getObjectLength(GlobalConfig.ZhanLingTalent[this.id]);
            var zltalent = GlobalConfig.ZhanLingTalent[talentId][talentLv];
            if (!zltalent) {
                state = "unactive";
                zltalent = GlobalConfig.ZhanLingTalent[talentId][1];
                if (!zltalent.costCount) {
                    var stages = ZhanLingModel.ins().getZhanLingDataByNextStage(this.id);
                    if (stages)
                        tips.lock = stages[0] + "\u9636" + stages[1] + "\u661F";
                }
                else {
                    tips.lock = "\u6FC0\u6D3B\u76AE\u80A4\u540E";
                }
            }
            else if (talentLv >= maxTalentLv) {
                state = "max";
            }
            else {
                state = "active";
                var nzlBase = GlobalConfig.ZhanLingBase[this.id];
                var itemcfg = GlobalConfig.ItemConfig[nzlBase.mat];
                var nzltalent = GlobalConfig.ZhanLingTalent[talentId][talentLv + 1];
                if (!nzltalent.talentDesc) {
                    var skillid = nzltalent.passive[0].id;
                    var skconfig = GlobalConfig.SkillsConfig[skillid];
                    var descId = skconfig.desc;
                    var sdconfig = GlobalConfig.SkillsDescConfig[descId];
                    ntips.name = sdconfig.name;
                    ntips.desc = StringUtils.replace(sdconfig.desc, "" + skconfig.desc_ex[0]);
                    if (!nzltalent.costCount) {
                        var stages = ZhanLingModel.ins().getZhanLingDataByNextStage(this.id);
                        if (stages)
                            ntips.lock = stages[0] + "\u9636" + stages[1] + "\u661F";
                    }
                    else {
                        ntips.lock = "|C:0xFFFFCC&T:\u5347\u7EA7\u6761\u4EF6:|C:0xff0000&T:" + itemcfg.name + "\u76AE\u80A4*" + nzltalent.costCount;
                        DisplayUtils.removeFromParent(this["lock1"]);
                    }
                }
                else {
                    ntips.name = nzltalent.talentDesc.name;
                    ntips.desc = StringUtils.replace(nzltalent.talentDesc.desc, "" + nzltalent.rate / 100);
                    if (!nzltalent.costCount) {
                        var stages = ZhanLingModel.ins().getZhanLingDataByNextStage(this.id);
                        if (stages)
                            ntips.lock = stages[0] + "\u9636" + stages[1] + "\u661F";
                    }
                    else {
                        ntips.lock = "|C:0xFFFFCC&T:\u5347\u7EA7\u6761\u4EF6:|C:0xff0000&T:" + itemcfg.name + "\u76AE\u80A4*" + nzltalent.costCount;
                        DisplayUtils.removeFromParent(this["lock1"]);
                    }
                }
            }
            if (!zltalent.talentDesc) {
                var skillid = zltalent.passive[0].id;
                var descId = GlobalConfig.SkillsConfig[skillid].desc;
                var sdconfig = GlobalConfig.SkillsDescConfig[descId];
                tips.name = sdconfig.name;
                tips.desc = sdconfig.desc;
                tips.desc = StringUtils.replace(tips.desc, "" + GlobalConfig.SkillsConfig[skillid].desc_ex[0]);
            }
            else {
                tips.name = zltalent.talentDesc.name;
                tips.desc = StringUtils.replace(zltalent.talentDesc.desc, "" + zltalent.rate / 100);
            }
        }
        this.currentState = state;
        this.validateNow();
        this.skillName0.textFlow = TextFlowMaker.generateTextFlow1(tips.name);
        this.skillDesc0.textFlow = TextFlowMaker.generateTextFlow1(tips.desc);
        if (!tips.lock)
            DisplayUtils.removeFromParent(this.condition0.parent);
        else
            this.condition0.textFlow = TextFlowMaker.generateTextFlow1(tips.lock);
        if (ntips.name) {
            if (state == "active") {
                this.skillName1.textFlow = TextFlowMaker.generateTextFlow1(ntips.name);
                this.skillDesc1.textFlow = TextFlowMaker.generateTextFlow1(ntips.desc);
                if (!ntips.lock)
                    DisplayUtils.removeFromParent(this.condition1.parent);
                else
                    this.condition1.textFlow = TextFlowMaker.generateTextFlow1(ntips.lock);
            }
            else {
                DisplayUtils.removeFromParent(this.nextGroup);
            }
        }
    };
    ZhanLingTips.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.otherClose, this);
    };
    ZhanLingTips.prototype.otherClose = function (e) {
        ViewManager.ins().close(this);
    };
    return ZhanLingTips;
}(BaseEuiView));
__reflect(ZhanLingTips.prototype, "ZhanLingTips");
ViewManager.ins().reg(ZhanLingTips, LayerManager.UI_Popup);
//# sourceMappingURL=ZhanLingTips.js.map