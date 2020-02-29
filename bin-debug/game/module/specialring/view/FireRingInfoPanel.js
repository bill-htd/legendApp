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
var FireRingInfoPanel = (function (_super) {
    __extends(FireRingInfoPanel, _super);
    function FireRingInfoPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isItemEnough = false;
        return _this;
    }
    FireRingInfoPanel.prototype.open = function () {
        this.addCustomEvent();
        this.initView();
    };
    FireRingInfoPanel.prototype.addCustomEvent = function () {
        this.addTouchEvent(this.showBtn, this.showDetail);
        this.addTouchEvent(this.lvupBtn, this.upStar);
        this.addTouchEvent(this.checkBtn, this.showAbility);
        this.addTouchEvent(this.ultraBtn, this.showUltra);
        this.observe(SpecialRing.ins().postSpicelRingUpdate, this.initView);
        this.observe(SpecialRing.ins().postSRStairUp, this.initView);
    };
    FireRingInfoPanel.prototype.showUltra = function () {
        ViewManager.ins().open(RingUpgradeWin);
    };
    FireRingInfoPanel.prototype.showAbility = function () {
        ViewManager.ins().open(FireRingAbilityView);
    };
    FireRingInfoPanel.prototype.upStar = function () {
        if (this.starList.starNum == 10) {
            SpecialRing.ins().sendRingLevelUp(SpecialRing.FIRE_RING_ID);
        }
        else {
            if (!this.isItemEnough) {
                UserTips.ins().showTips("特戒碎片不足");
            }
            else {
                SpecialRing.ins().sendSpicelRingUpdate(SpecialRing.FIRE_RING_ID);
            }
        }
    };
    FireRingInfoPanel.prototype.showDetail = function () {
        ViewManager.ins().open(RingDetailPanel, this.powerAttr);
    };
    FireRingInfoPanel.prototype.initView = function () {
        var data = SpecialRing.ins().getSpecialRingDataById(SpecialRing.FIRE_RING_ID);
        var stage = SpecialRing.ins().getRingStair(data.level);
        var star = SpecialRing.ins().getRingStar(data.level);
        var isUpgrade = 0;
        if (this.lastStar == undefined) {
            isUpgrade = 0;
        }
        else {
            if (this.lastStar < star) {
                isUpgrade = 1;
            }
            else {
                isUpgrade = 0;
            }
        }
        this.lastStar = star;
        var cfg = SpecialRing.ins().getRingConfigById(SpecialRing.FIRE_RING_ID, data.level);
        var itemCfg = GlobalConfig.ItemConfig[cfg.costItem];
        var nextCfg = SpecialRing.ins().getRingConfigById(SpecialRing.FIRE_RING_ID, data.level + 1);
        this.lv.text = StringUtils.NumberToChinese(stage) + "阶";
        this.costImg.source = itemCfg.icon + '_png';
        var itemCount = UserBag.ins().getBagGoodsCountById(0, cfg.costItem);
        var colorStr = "";
        var cost = cfg.cost;
        if (star == 10) {
            itemCount = 0;
            cost = 0;
            this.costImg.visible = false;
            this.costCount.visible = false;
            this.costTitle.visible = false;
            this.lvupBtn.label = "升  阶";
        }
        else {
            this.costImg.visible = true;
            this.costCount.visible = true;
            this.costTitle.visible = true;
            this.lvupBtn.label = "升  星";
        }
        if (itemCount >= cost) {
            colorStr = ColorUtil.GREEN_COLOR;
            this.isItemEnough = true;
        }
        else {
            colorStr = ColorUtil.RED_COLOR;
            this.isItemEnough = false;
        }
        this.costCount.textFlow = TextFlowMaker.generateTextFlow("<font color=" + colorStr + ">" + itemCount + "</font><font color=" + ColorUtil.WHITE_COLOR + ">/" + cost + "</font> ");
        this.nowAttr.text = AttributeData.getAttStr(cfg.attrAward, 0, 1, "：");
        if (nextCfg) {
            this.nextAttr.text = AttributeData.getAttStr(nextCfg.attrAward, 0, 1, "：");
        }
        else {
            this.nextAttr.text = "已满级";
        }
        this.powerAttr = this.getRingTotalAttribute();
        var p = UserBag.getAttrPower(this.powerAttr);
        p = p * SubRoles.ins().subRolesLen;
        this.power.setPower(p);
        if (!this.starList) {
            this.starList = new StarList(10);
            this.starList.x = 15;
            this.starGroup.addChild(this.starList);
        }
        this.starList.setStarNum(star, isUpgrade);
        this.info.text = this.getNextStageAbility(stage);
        if (SpecialRing.ins().getAbilityID()) {
            this.ultraBtn.icon = "ability_0N";
            this.nameImg.source = "ring_title2";
        }
        else {
            this.ultraBtn.icon = "ability_0L";
            this.nameImg.source = "ring_title";
        }
    };
    FireRingInfoPanel.prototype.getRingTotalAttribute = function () {
        var attr;
        var _loop_1 = function (i) {
            var lvl = 1;
            if (i == SpecialRing.FIRE_RING_ID) {
                lvl = SpecialRing.ins().getSpecialRingDataById(SpecialRing.FIRE_RING_ID).level;
            }
            var cfg = SpecialRing.ins().getRingConfigById(i, lvl);
            if (!attr) {
                attr = cfg.attrAward;
            }
            else {
                if (i == SpecialRing.FIRE_RING_ID) {
                    var addAttr = CommonUtils.copyDataHandler(cfg.attrAward);
                    var abilityId = SpecialRing.ins().getAbilityID();
                    if (abilityId) {
                        var exRingCfg_1 = GlobalConfig.ActorExRingItemConfig[SpecialRing.FIRE_RING_ID][abilityId][SpecialRing.ins().abilityIds[abilityId]];
                        addAttr.forEach(function (dp, index) {
                            dp.value *= 1 + exRingCfg_1.attrPer / 10000;
                            dp.value = Math.round(dp.value);
                        });
                    }
                    attr = AttributeData.AttrAddition(attr, addAttr);
                }
                else {
                    attr = AttributeData.AttrAddition(attr, cfg.attrAward);
                }
            }
        };
        for (var i = 2; i <= 7; i++) {
            _loop_1(i);
        }
        return attr;
    };
    FireRingInfoPanel.prototype.getNextStageAbility = function (stage) {
        var nextstage = stage + 1;
        if (nextstage < 2)
            nextstage = 2;
        var count = 0;
        for (var i in GlobalConfig.ActorExRing7Config) {
            if (GlobalConfig.ActorExRing7Config[i] instanceof ActorExRing7Config) {
                count++;
            }
        }
        var cfg = GlobalConfig.ActorExRing7Config[count];
        var maxStage = SpecialRing.ins().getRingStair(cfg.level);
        while (nextstage < maxStage) {
            var skillName = SpecialRing.ins().getNextStageSkillName(nextstage);
            if (skillName) {
                return nextstage + "阶解锁" + SpecialRing.ins().getNextStageSkillName(nextstage);
            }
            else {
                nextstage++;
            }
        }
        return "";
    };
    return FireRingInfoPanel;
}(BaseComponent));
__reflect(FireRingInfoPanel.prototype, "FireRingInfoPanel");
//# sourceMappingURL=FireRingInfoPanel.js.map