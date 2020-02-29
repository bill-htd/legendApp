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
var ArrayCollection = eui.ArrayCollection;
var FireRingSkillPanel = (function (_super) {
    __extends(FireRingSkillPanel, _super);
    function FireRingSkillPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.skillId = 0;
        _this.isEoughItemUpgrade = false;
        _this.skillName = "";
        return _this;
    }
    FireRingSkillPanel.prototype.open = function () {
        this.initView();
        this.addCustomEvent();
    };
    FireRingSkillPanel.prototype.addCustomEvent = function () {
        this.addTouchEvent(this.opraBtn, this.opration);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListChange, this);
        this.learnList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onLearnListChange, this);
        this.observe(SpecialRing.ins().postSkillInfo, this.refreshView);
    };
    FireRingSkillPanel.prototype.opration = function () {
        var data = SpecialRing.ins().skillInfo[this.lastSelectIndex];
        if (data.skillId == 0) {
            SpecialRing.ins().requestLearnSkill(this.skillId, data.position);
        }
        else {
            if (data.skillLvl == SpecialRing.ins().getSkillMaxLvl(data.skillId)) {
                UserTips.ins().showTips(this.skillName + "已升至顶级");
            }
            else if (this.isEoughItemUpgrade) {
                SpecialRing.ins().requestUpgradeSkill(data.position);
            }
            else {
                UserTips.ins().showTips(this.skillName + "数量不足");
            }
        }
    };
    FireRingSkillPanel.prototype.onListChange = function (e) {
        var data = SpecialRing.ins().skillInfo[this.list.selectedIndex];
        if (!data.isOpen) {
            var lvl = SpecialRing.ins().getSpecialRingDataById(SpecialRing.FIRE_RING_ID).level;
            var stage = SpecialRing.ins().getRingStair(lvl);
            if (lvl >= SpecialRing.GRID_OPEN_LEVEL) {
                var data_1 = GlobalConfig.ActorExRingConfig[SpecialRing.FIRE_RING_ID];
                if (Actor.yb >= data_1.skillGridYb) {
                    SpecialRing.ins().requestOpenGrid();
                }
                else {
                    UserTips.ins().showTips("|C:0xf3311e&T:\u5143\u5B9D\u4E0D\u8DB3|");
                }
            }
            else {
                UserTips.ins().showTips(SpecialRing.GRID_OPEN_LEVEL + "阶开启");
            }
        }
        else {
            this.updateView(e.itemIndex);
        }
    };
    FireRingSkillPanel.prototype.onLearnListChange = function (e) {
        this.selectSkill(this.learnList.selectedIndex);
    };
    FireRingSkillPanel.prototype.initView = function () {
        this.list.itemRenderer = FireRingSkillItem;
        this.learnList.itemRenderer = FireRingSkillBookItem;
        this.updateList();
        this.updateView(0);
    };
    FireRingSkillPanel.prototype.updateList = function () {
        this.list.dataProvider = new ArrayCollection(SpecialRing.ins().skillInfo);
    };
    FireRingSkillPanel.prototype.refreshView = function () {
        this.updateList();
        this.updateView(this.lastSelectIndex);
    };
    FireRingSkillPanel.prototype.updateView = function (index) {
        this.lastSelectIndex = index;
        this.list.selectedIndex = index;
        this.selectList();
        var skill = SpecialRing.ins().skillInfo[index];
        if (skill.skillId) {
            this.currentState = "upgrade";
            this.opraBtn.enabled = true;
            var cfg_1 = SpecialRing.ins().getActorExRingBookConfig(skill.skillId, skill.skillLvl);
            this.skillName = cfg_1.skillName;
            this.nextLv.visible = true;
            this.opraBtn.visible = true;
            this.nowLvDesc.textFlow = TextFlowMaker.generateTextFlow(cfg_1.skillDesc);
            if (skill.skillLvl < SpecialRing.ins().getSkillMaxLvl(skill.skillId)) {
                this.nextLv.visible = true;
                var nextcfg = SpecialRing.ins().getActorExRingBookConfig(skill.skillId, skill.skillLvl + 1);
                this.nextLvDesc.textFlow = TextFlowMaker.generateTextFlow(nextcfg.skillDesc);
                this.cost.text = "X" + nextcfg.num;
                this.needItem.data = nextcfg.itemId;
                this.isEoughItemUpgrade = (UserBag.ins().getBagGoodsCountById(0, cfg_1.itemId) >= nextcfg.num);
                if (this.isEoughItemUpgrade) {
                    this.cost.textColor = ColorUtil.GREEN_COLOR_N;
                    this.updateRp.visible = true;
                }
                else {
                    this.cost.textColor = ColorUtil.RED_COLOR_N;
                    this.updateRp.visible = false;
                }
                this.updateGroup.visible = true;
            }
            else {
                this.isEoughItemUpgrade = true;
                this.updateGroup.visible = false;
                this.nextLv.visible = false;
                this.updateRp.visible = false;
            }
        }
        else {
            this.currentState = "study";
            this.learnList.dataProvider = new ArrayCollection(SpecialRing.ins().getStudyBook());
            if (this.learnList.dataProvider.length == 0) {
                this.nowLvDesc.visible = false;
                this.nextLvDesc.visible = false;
                this.opraBtn.enabled = false;
                this.nobook.visible = true;
            }
            else {
                this.nowLvDesc.visible = true;
                this.nextLvDesc.visible = true;
                this.opraBtn.enabled = true;
                this.nobook.visible = false;
                this.selectSkill(SpecialRing.ins().getFirstStudyBookIndex());
            }
        }
        var count = SpecialRing.ins().skillInfo.length;
        var attr;
        var cfg;
        var book;
        var addPower = 0;
        var addPercent;
        for (var i = 0; i < count; i++) {
            cfg = SpecialRing.ins().skillInfo[i];
            if (cfg.skillId > 0) {
                book = SpecialRing.ins().getActorExRingBookConfig(cfg.skillId, cfg.skillLvl);
                if (cfg.skillId <= 4) {
                    if (!attr) {
                        attr = book.attr;
                    }
                    else {
                        attr = AttributeData.AttrAddition(attr, book.attr);
                    }
                }
                else if (cfg.skillId == 5) {
                    addPercent = book.bookAttrPer;
                }
                else if (cfg.skillId > 5 && book.exPower) {
                    addPower += book.exPower;
                }
            }
        }
        var p = addPower;
        if (attr) {
            if (addPercent) {
                attr = AttributeData.AttrMultiply(attr, addPercent);
            }
            p += UserBag.getAttrPower(attr);
        }
        p = p * SubRoles.ins().subRolesLen;
        this.power.setPower(p);
    };
    FireRingSkillPanel.prototype.selectSkill = function (index) {
        this.learnList.selectedIndex = index;
        var data = this.learnList.dataProvider.getItemAt(index);
        var skillId = SpecialRing.ins().getSkillIdByItemId(data.id);
        var cfg = SpecialRing.ins().getActorExRingBookConfig(skillId, 1);
        this.skillId = skillId;
        this.nowLvDesc.textFlow = TextFlowMaker.generateTextFlow(cfg.skillDesc);
        var nextCfg = SpecialRing.ins().getActorExRingBookConfig(skillId, 2);
        this.nextLvDesc.textFlow = TextFlowMaker.generateTextFlow(nextCfg.skillDesc);
        this.selectLearnList();
    };
    FireRingSkillPanel.prototype.selectList = function () {
        var count = this.list.dataProvider.length;
        for (var i = 0; i < count; i++) {
            var item = this.list.getElementAt(i);
            if (item) {
                if (i != this.list.selectedIndex) {
                    item.setSelect(false);
                }
                else {
                    item.setSelect(true);
                }
            }
        }
    };
    FireRingSkillPanel.prototype.selectLearnList = function () {
        var count = this.learnList.dataProvider.length;
        for (var i = 0; i < count; i++) {
            var item = this.learnList.getElementAt(i);
            if (item) {
                if (i != this.learnList.selectedIndex) {
                    item.setSelect(false);
                }
                else {
                    item.setSelect(true);
                }
            }
        }
        if (this.learnList.selectedItem != undefined && this.learnList.selectedItem.id != undefined) {
            this.opraBtn.enabled = SpecialRing.ins().isBookCanStudy(this.learnList.selectedItem.id);
        }
    };
    return FireRingSkillPanel;
}(BaseComponent));
__reflect(FireRingSkillPanel.prototype, "FireRingSkillPanel");
//# sourceMappingURL=FireRingSkillPanel.js.map