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
var LongHunWin = (function (_super) {
    __extends(LongHunWin, _super);
    function LongHunWin() {
        var _this = _super.call(this) || this;
        _this.starList = null;
        _this.barbc = new ProgressBarEff();
        return _this;
    }
    LongHunWin.prototype.childrenCreated = function () {
        this.barbc.setWidth(525);
        this.barbc.x = -15;
        this.barbc.y = -12;
        this.expGroup.addChild(this.barbc);
        this.mc = new MovieClip;
        this.mc.x = 240;
        this.mc.y = 400;
        this.starList = new StarList(10);
        this.starList.x = 15;
        this.starList.y = 0;
        this.starGroup.addChild(this.starList);
        this.iconY = this.icon.y;
        this.iconMoveY = this.iconY - 10;
        this.eff = new MovieClip;
        this.eff.x = this.activeBtnMc.width / 2;
        this.eff.y = this.activeBtnMc.height / 2;
        this.eff.scaleX = 1.17;
        this.eff.touchEnabled = false;
        this.activeBtnMc.touchEnabled = false;
    };
    LongHunWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var selectedIndex = (param && param[0]) ? param[0] : 0;
        this.curRole = selectedIndex;
        this.index = LongHun.TYPE_LONG_HUN;
        this.addTouchEvent(this.upgradeBtn, this.onTap);
        this.addTouchEvent(this.activeBtn, this.onTap);
        this.observe(UserBag.ins().postItemAdd, this.roleChange);
        this.observe(LongHun.ins().postDateUpdate, this.roleChange);
        this.observe(LongHun.ins().postStageUpgrade, this.roleChange);
        this.observe(LongHun.ins().postStageActive, this.roleChange);
        this.barbc.reset();
        this.maxShowGroup.visible = false;
        this.roleChange();
        this.onTabChange();
        this.playIconTween();
    };
    LongHunWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.stopIconTween();
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.closeBtn0, this.onTap);
        this.removeTouchEvent(this.colorCanvas0, this.onTap);
        this.removeTouchEvent(this.upgradeBtn, this.onTap);
        DisplayUtils.removeFromParent(this.eff);
        this.removeObserve();
    };
    LongHunWin.prototype.roleSelectChange = function (e) {
        this.roleChange();
    };
    LongHunWin.prototype.playIconTween = function () {
        this.icon.y = this.iconY;
        egret.Tween.removeTweens(this.icon);
        egret.Tween.get(this.icon, { loop: true }).to({ y: this.iconMoveY }, 1000).to({ y: this.iconY }, 1000);
    };
    LongHunWin.prototype.stopIconTween = function () {
        egret.Tween.removeTweens(this.icon);
    };
    LongHunWin.prototype.onTabChange = function (e) {
        if (e === void 0) { e = null; }
        this.roleChange();
    };
    LongHunWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.colorCanvas0:
            case this.closeBtn0:
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.upgradeBtn:
                if (this.upgradeBtn.label == "提升") {
                    this.sendUpgrade();
                }
                else if (this.upgradeBtn.label == "升阶") {
                    this.sendStageUpgrade();
                }
                else {
                    this.openBuyGoods();
                }
                break;
            case this.activeBtn:
                var level = GlobalConfig.LoongSoulBaseConfig.openlv;
                if (Actor.level >= level) {
                    this.sendStageActive();
                }
                else {
                    UserTips.ins().showTips("\u7B49\u7EA7\u8FBE\u5230" + level + "\u7EA7\u53EF\u6FC0\u6D3B");
                }
                break;
        }
    };
    LongHunWin.prototype.onTaps = function (e) {
        if (this._config == null)
            return;
        var num = GlobalConfig.VipConfig[this.index > 2 ? 13 : 14].attrAddition["percent"];
        num = this.index == LongHun.TYPE_XUE_YU ? 0 : num;
        var attr = [];
        this._config.attr.forEach(function (element) {
            attr.push((element.value * num / 100) >> 0);
        });
        ViewManager.ins().open(ForgeTipsWin, attr, AttributeData.getAttStr(this._config.attr, 1, 1, ""));
    };
    LongHunWin.prototype.maxControll = function (flag) {
        this.maxGroup.visible = flag;
        this.material.visible = flag;
        this.barbc.visible = flag;
        this.powerPanel.visible = true;
        this.maxLevel.visible = !flag;
        this.activeGroup.visible = false;
        this.stairImg.visible = true;
        this.maxShowGroup.visible = !flag;
        if (flag) {
            this.curAtt.x = 62;
            this.curAtt.y = 408;
        }
        else {
            this.curAtt.x = 170;
            this.curAtt.y = 408;
        }
    };
    LongHunWin.prototype.sendUpgrade = function () {
        LongHun.ins().sendUpGrade(this.curRole, this.index - 1);
    };
    LongHunWin.prototype.sendStageUpgrade = function () {
        LongHun.ins().sendStageUpgrade(this.curRole, this.index - 1);
    };
    LongHunWin.prototype.openBuyGoods = function () {
        UserWarn.ins().setBuyGoodsWarn(this._config.itemId, this._missingNum);
    };
    LongHunWin.prototype.sendStageActive = function () {
        LongHun.ins().sendStageActive(this.curRole, this.index - 1);
    };
    LongHunWin.prototype.updateStageInfo = function () {
        var currentRole = SubRoles.ins().getSubRoleByIndex(this.curRole);
        switch (this.index) {
            case LongHun.TYPE_LONG_HUN:
                this._stageConfig = GlobalConfig.LoongSoulStageConfig[currentRole.loongSoulData.stage];
                break;
            case LongHun.TYPE_HU_DUN:
                this._stageConfig = GlobalConfig.ShieldStageConfig[currentRole.shieldData.stage];
                break;
            case LongHun.TYPE_XUE_YU:
                this._stageConfig = GlobalConfig['XueyuStageConfig'][currentRole.xueyuData.stage];
                break;
        }
        this.icon.source = this._stageConfig.icon;
    };
    LongHunWin.prototype.roleChange = function (isUpgrade) {
        if (isUpgrade === void 0) { isUpgrade = 0; }
        this.updateStageInfo();
        var lv = 0;
        var exp = 0;
        var nextConfig;
        var fase;
        var role = SubRoles.ins().getSubRoleByIndex(this.curRole);
        var finallyAttr = null;
        if (this.index == LongHun.TYPE_HU_DUN) {
            lv = role.shieldData.level;
            exp = role.shieldData.exp;
            this._config = GlobalConfig.ShieldConfig[lv];
            nextConfig = GlobalConfig.ShieldConfig[lv + 1];
            if (UserVip.ins().lv >= 13) {
                this.addTouchEvent(this.vipLabel, this.onTaps);
                var attr = AttributeData.getAttrStrAdd(this._config.attr, 13);
                this.curAtt.text = AttributeData.getAttStr(attr, 0, 1, "：");
            }
            else {
                finallyAttr = AttributeData.AttrAddition(this._config.attr, this._stageConfig.attr);
                this.curAtt.text = AttributeData.getAttStr(finallyAttr, 0, 1, "：");
            }
        }
        else if (this.index == LongHun.TYPE_LONG_HUN) {
            lv = role.loongSoulData.level;
            exp = role.loongSoulData.exp;
            var stair = 0;
            this._config = GlobalConfig.LoongSoulConfig[lv];
            nextConfig = GlobalConfig.LoongSoulConfig[lv + 1];
            this.stairImg.setValue(role.loongSoulData.stage + 1);
            if (UserVip.ins().lv >= 14) {
                var attr = AttributeData.getAttrStrAdd(this._config.attr, 14);
                this.curAtt.text = AttributeData.getAttStr(attr, 0, 1, "：");
            }
            else {
                finallyAttr = AttributeData.AttrAddition(this._config.attr, this._stageConfig.attr);
                this.curAtt.text = AttributeData.getAttStr(finallyAttr, 0, 1, "：");
            }
            this.maxCurAtt.text = this.curAtt.text;
        }
        if (lv > 0) {
            this.starList.setStarNum(lv % 10 == 0 ? 10 : lv % 10, isUpgrade);
        }
        else {
            this.starList.setStarNum(0);
        }
        var level = GlobalConfig.LoongSoulBaseConfig.openlv;
        this.sysDescText.text = "\u5F00\u542F\u9F99\u9B42\u83B7\u5F97\u5927\u91CF\u653B\u51FB\u9632\u5FA1\n\n" + level + "\u7EA7\u53EF\u5F00\u542F";
        this.barbc.setData(exp, this._config.exp);
        var power = UserBag.getAttrPower(this._config.attr);
        this.powerPanel.setPower(power);
        var longHunMax = CommonUtils.getObjectLength(GlobalConfig.LoongSoulConfig) - 1;
        if (role.loongSoulData.state) {
            if (lv != longHunMax) {
                this.maxControll(true);
            }
            else {
                this.maxControll(false);
                return;
            }
        }
        else {
            this.maxGroup.visible = false;
            this.material.visible = false;
            this.barbc.visible = false;
            this.maxLevel.visible = false;
            this.stairImg.visible = false;
            this.activeGroup.visible = true;
            this.powerPanel.visible = false;
            this.redPoint.visible = false;
            if (Actor.level >= level) {
                this.activeBtn.enabled = true;
                this.eff.playFile(RES_DIR_EFF + "chargeff1", -1);
                if (!this.eff.parent) {
                    this.activeBtnMc.addChild(this.eff);
                }
                this.redPoint.visible = true;
            }
            else {
                this.activeBtn.enabled = false;
                DisplayUtils.removeFromParent(this.eff);
            }
        }
        var itemCount = UserBag.ins().getBagGoodsCountById(0, this._config.itemId);
        var itemName = GlobalConfig.ItemConfig[this._config.itemId].name;
        this.upgradeBtn.label = itemCount < 1 ? "获得材料" : "提升";
        if (itemCount < this._stageConfig.normalCost) {
            this._missingNum = this._stageConfig.normalCost - itemCount;
        }
        else {
            this._missingNum = 0;
        }
        var colorStr = "";
        if (itemCount >= this._stageConfig.normalCost)
            colorStr = ColorUtil.GREEN_COLOR;
        else
            colorStr = ColorUtil.RED_COLOR;
        this.material.textFlow = TextFlowMaker.generateTextFlow("\u62E5\u6709\u788E\u7247:<font color=" + colorStr + ">" + itemCount + "</font><font color=" + ColorUtil.WHITE_COLOR + ">/" + this._stageConfig.normalCost + "</font> ");
        this.material.visible = true;
        this.showStageUpgradeBtn(lv);
        var attrs;
        var nextStageCofig;
        var stageLevel = 0;
        var isStageUpgrade = this.upgradeBtn.label == "升阶";
        var tempConfig = isStageUpgrade ? this._config : nextConfig;
        if (this.index == LongHun.TYPE_LONG_HUN) {
            attrs = AttributeData.getAttrStrAdd(tempConfig.attr, 13);
            stageLevel = isStageUpgrade ? role.loongSoulData.stage + 1 : role.loongSoulData.stage;
            nextStageCofig = GlobalConfig.LoongSoulStageConfig[stageLevel];
        }
        else if (this.index == LongHun.TYPE_HU_DUN) {
            attrs = AttributeData.getAttrStrAdd(tempConfig.attr, 14);
            stageLevel = isStageUpgrade ? role.shieldData.stage + 1 : role.shieldData.stage;
            nextStageCofig = GlobalConfig.ShieldStageConfig[stageLevel];
        }
        else if (this.index == LongHun.TYPE_XUE_YU) {
            attrs = AttributeData.getAttrStrAdd(tempConfig.attr, 15);
            stageLevel = isStageUpgrade ? role.xueyuData.stage + 1 : role.xueyuData.stage;
            nextStageCofig = GlobalConfig['XueyuStageConfig'][stageLevel];
        }
        attrs = AttributeData.AttrAddition(attrs, nextStageCofig.attr);
        this.nextAtt.text = AttributeData.getAttStr(attrs, 0, 1, "：");
    };
    LongHunWin.prototype.showStageUpgradeBtn = function (lv) {
        var stageLevel = 0;
        var role = SubRoles.ins().getSubRoleByIndex(this.curRole);
        switch (this.index) {
            case LongHun.TYPE_LONG_HUN:
                stageLevel = role.loongSoulData.stage;
                break;
            case LongHun.TYPE_HU_DUN:
                stageLevel = role.shieldData.stage;
                break;
            case LongHun.TYPE_XUE_YU:
                stageLevel = role.xueyuData.stage;
                break;
        }
        if (lv > 0 && lv % 10 == 0) {
            if (stageLevel <= lv / 10 - 1) {
                this.upgradeBtn.label = "升阶";
                this.material.visible = false;
                this.starList.setStarNum(10);
                this.barbc.visible = false;
            }
            else {
                this.starList.setStarNum(0);
                this.barbc.visible = true;
            }
        }
    };
    return LongHunWin;
}(BaseView));
__reflect(LongHunWin.prototype, "LongHunWin");
//# sourceMappingURL=LongHunWin.js.map