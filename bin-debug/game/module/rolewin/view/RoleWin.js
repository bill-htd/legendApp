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
var RoleWin = (function (_super) {
    __extends(RoleWin, _super);
    function RoleWin() {
        var _this = _super.call(this) || this;
        _this.roleIndex = 0;
        _this.oldIndex = 0;
        _this.roleSelectVis = true;
        _this.skinName = "RoleWinSkin";
        _this.isTopLevel = true;
        _this.addExclusionWin(egret.getQualifiedClassName(SmeltEquipTotalWin));
        return _this;
    }
    RoleWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
    };
    RoleWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.oldIndex = this.tab.selectedIndex = this.viewStack.selectedIndex = param[0] ? param[0] : 0;
        this.addTouchEvent(this, this.onClick);
        this.addTouchEvent(this.closeBtn, this.onClick);
        this.addChangeEvent(this.tab, this.onTabTouch);
        this.addChangingEvent(this.tab, this.onTabTouching);
        this.addChangeEvent(this.roleSelect, this.onChange);
        this.observe(UserRole.ins().postRoleHint, this.delayRedPoint);
        this.observe(UserZs.ins().postZsData, this.delayRedPoint);
        this.observe(Actor.ins().postLevelChange, this.delayRedPoint);
        this.observe(Actor.ins().postUpdateTogeatter, this.delayRedPoint);
        this.observe(UserFb.ins().postGuanKaIdChange, this.delayRedPoint);
        this.observe(UserSkill.ins().postUpgradeForge, this.delayRedPoint);
        this.observe(UserBag.ins().postItemAdd, this.delayRedPoint);
        this.observe(UserBag.ins().postItemChange, this.delayRedPoint);
        this.observe(UserBag.ins().postItemDel, this.delayRedPoint);
        this.observe(JadeNew.ins().postJadeData, this.delayRedPoint);
        this.observe(LyMark.ins().postMarkData, this.delayRedPoint);
        this.observe(Wing.ins().postUseDanSuccess, this.delayRedPoint);
        this.observe(Wing.ins().postWingUpgrade, this.delayRedPoint);
        this.observe(SamsaraCC.ins().postSamsaraInfo, this.delayRedPoint);
        this.addTouchEvent(this.help, this.onClick);
        this.roleIndex = param[1] ? param[1] : 0;
        var index = this.viewStack.selectedIndex;
        this.roleSelect.setCurRole(this.roleIndex);
        if (index == 4)
            this.roleSelect.hideRole();
        this.setOpenIndex(index);
        this.redPoint();
    };
    RoleWin.prototype.openSamsara = function () {
        var index = this.viewStack.getChildIndex(this.reincarnationPanel);
        if (index < 0) {
            this.viewStack.addChild(this.reincarnationPanel);
        }
        this.tab.dataProvider = this.viewStack;
        this.redPointGroup.horizontalCenter = 42;
        this.redPoint4.visible = SamsaraModel.ins().isCanUpgrade() || SamsaraModel.ins().isCanExchange() || (!SamsaraModel.ins().isMaxSamsara(Actor.samsaraLv) && SamsaraModel.ins().isCanUpgradeSoul());
    };
    RoleWin.prototype.inactiveSamsara = function () {
        var index = this.viewStack.getChildIndex(this.reincarnationPanel);
        if (index >= 0) {
            this.viewStack.removeChildAt(index);
        }
        this.tab.dataProvider = this.viewStack;
        this.redPointGroup.horizontalCenter = 42 + 62;
        this.redPoint4.visible = false;
    };
    RoleWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var uiview2 = ViewManager.ins().getView(UIView2);
        if (uiview2)
            uiview2.closeNav(UIView2.NAV_ROLE);
        var num = this.viewStack.numChildren;
        for (var i = 0; i < num; i++) {
            this.viewStack.getChildAt(i).close();
        }
    };
    RoleWin.prototype.checkIsOpen = function (index) {
        var config = GlobalConfig.TogetherHitConfig[1];
        if (index == 1) {
            if (UserSkill.ins().checkHejiOpen()) {
            }
            else {
                UserTips.ins().showTips("\u6FC0\u6D3B\u795E\u5668 \u706B\u9F99\u4E4B\u5FC3 \u540E\u5F00\u542F");
                this.roleSelect.visible = this.roleSelectVis;
                return false;
            }
        }
        else if (index == 2) {
            if (Actor.level < GlobalConfig.ZhuanShengConfig.level) {
                UserTips.ins().showTips(GlobalConfig.ZhuanShengConfig.level + "\u7EA7\u5F00\u542F\u8F6C\u751F");
                return false;
            }
        }
        else if (index == 3) {
            if (Actor.level < GlobalConfig.WingCommonConfig.openLevel) {
                UserTips.ins().showTips("羽翼" + GlobalConfig.WingCommonConfig.openLevel + "级开启");
                return false;
            }
        }
        return true;
    };
    RoleWin.prototype.onTabTouch = function (e) {
        var index = this.tab.selectedIndex;
        if (index == 4)
            this.roleSelect.hideRole();
        this.setOpenIndex(index);
    };
    RoleWin.prototype.onTabTouching = function (e) {
        if (!this.checkIsOpen(this.tab.selectedIndex)) {
            e.preventDefault();
        }
    };
    RoleWin.prototype.onChange = function (e) {
        this.setRoleId(this.roleSelect.getCurRole());
    };
    RoleWin.prototype.setRoleId = function (roleId) {
        this.roleInfoPanel.curRole = this.wingPanel.curRole = roleId;
        this.setOpenIndex(this.viewStack.selectedIndex);
    };
    RoleWin.prototype.setTabSelectedIndex = function (index) {
        this.tab.selectedIndex = index;
        this.oldIndex = index;
        this.setOpenIndex(index);
    };
    RoleWin.prototype.setOpenIndex = function (selectedIndex) {
        this.roleSelectVis = this.roleSelect.visible;
        if (this.oldIndex && this.oldIndex == 3 && this.oldIndex != selectedIndex) {
            if (this.getWingPanelInfo()) {
                this.doOpenHintWin(1, this.tab.selectedIndex);
                this.tab.selectedIndex = this.oldIndex;
                return;
            }
        }
        if (selectedIndex != 1)
            this.hejiPanel.close();
        this.help.visible = false;
        switch (selectedIndex) {
            case 0:
                this.biaoti.source = "biaoti_juese";
                this.roleSelect.openRole();
                this.roleInfoPanel.open();
                break;
            case 1:
                this.biaoti.source = "biaoti_heji";
                this.roleSelect.hideRole();
                this.hejiPanel.open();
                break;
            case 2:
                if (Actor.level >= GlobalConfig.ZhuanShengConfig.level) {
                    this.biaoti.source = "biaoti_zhuansheng";
                    this.roleSelect.hideRole();
                    this.zsPanel.open();
                    this.zsPanel.setData();
                }
                else {
                    UserTips.ins().showTips(GlobalConfig.ZhuanShengConfig.level + "\u7EA7\u5F00\u542F\u8F6C\u751F");
                    this.tab.selectedIndex = this.viewStack.selectedIndex;
                }
                break;
            case 3:
                if (Actor.level >= GlobalConfig.WingCommonConfig.openLevel) {
                    this.biaoti.source = "biaoti_yuyi";
                    this.roleSelect.openRole();
                    this.wingPanel.open();
                }
                else {
                    UserTips.ins().showTips("羽翼" + GlobalConfig.WingCommonConfig.openLevel + "级开启");
                    this.tab.selectedIndex = this.viewStack.selectedIndex;
                }
                break;
            case 4:
                this.reincarnationPanel.open();
                this.tab.selectedIndex = this.viewStack.selectedIndex = 4;
                this.help.visible = true;
                break;
        }
        if (this.oldIndex != selectedIndex) {
            if (this.tab.selectedIndex != this.viewStack.selectedIndex) {
                this.viewStack.getElementAt(this.oldIndex)['close']();
                this.oldIndex = selectedIndex;
            }
        }
        else {
            this.tab.selectedIndex = this.viewStack.selectedIndex = selectedIndex;
        }
        this.redPoint();
    };
    RoleWin.prototype.onClick = function (e) {
        switch (e.target) {
            case this.closeBtn:
            case this.closeBtn0:
                ViewManager.ins().close(this);
                var uiview2 = ViewManager.ins().getView(UIView2);
                if (uiview2)
                    uiview2.closeNav(UIView2.NAV_ROLE);
                break;
            case this.help:
                ViewManager.ins().open(ZsBossRuleSpeak, 22);
                break;
        }
    };
    RoleWin.prototype.delayRedPoint = function () {
        if (!TimerManager.ins().isExists(this.redPoint, this))
            TimerManager.ins().doTimer(60, 1, this.redPoint, this);
    };
    RoleWin.prototype.redPoint = function () {
        var zsIsOpens = [UserZs.ins().canOpenZSWin() && !UserZs.ins().isMaxLv() && (UserZs.ins().canGet() > 0 || UserZs.ins().canUpgrade())];
        var wingOpens = this.canWingEquip();
        var hejiOpens = UserSkill.ins().canHejiEquip() || UserSkill.ins().canExchange() || UserSkill.ins().canSolve() || UserSkill.ins().canAcitve();
        var equipIsOpens = this.canEquip();
        var samsaraOpen = SamsaraModel.ins().isOpen();
        var ringRed = OpenSystem.ins().checkSysOpen(SystemType.RING) && (SpecialRing.ins().checkHaveUpRing() || SpecialRing.ins().isCanStudySkill() || SpecialRing.ins().isCanUpgradeSkill() || SpecialRing.ins().fireRingRedPoint() || LyMark.ins().checkRed());
        var isOpens = [equipIsOpens, hejiOpens, zsIsOpens, wingOpens];
        this.redPoint0.visible = this.and(equipIsOpens) || ringRed || SubRoles.ins().isLockRole() || (SamsaraModel.ins().isOpen() && SamsaraModel.ins().isCanAddSpirit()) || JadeNew.ins().checkRed() || ShenshouRedpoint.ins().redpoint;
        this.redPoint1.visible = hejiOpens || UserSkill.ins().getPunchForge().getRedPoint();
        this.redPoint2.visible = this.and(zsIsOpens);
        this.redPoint3.visible = this.and(wingOpens) || this.and(Wing.ins().canGradeupWing())
            || this.and(Wing.ins().canItemGradeupWing())
            || Wing.ins().isHaveActivationWing()
            || GodWingRedPoint.ins().getGodWingRedPoint();
        this.redPoint3.visible = Actor.level >= GlobalConfig.WingCommonConfig.openLevel ? this.redPoint3.visible : false;
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            var isOpen = false;
            if (this.tab.selectedIndex < 4) {
                if (isOpens[this.tab.selectedIndex][i]) {
                    isOpen = true;
                }
                this.roleSelect.showRedPoint(i, isOpen);
            }
        }
        if (SamsaraModel.ins().isOpen()) {
            this.openSamsara();
            this.setSamsaraEquipVisible(true);
        }
        else {
            this.inactiveSamsara();
            this.setSamsaraEquipVisible(false);
        }
    };
    RoleWin.prototype.setSamsaraEquipVisible = function (visible) {
        if (this.roleInfoPanel && this.viewStack.selectedIndex == 4 && this.roleInfoPanel.skinName) {
            this.roleInfoPanel["item9"].visible = visible;
            this.roleInfoPanel["item10"].visible = visible;
            this.roleInfoPanel["item11"].visible = visible;
            this.roleInfoPanel["item12"].visible = visible;
        }
    };
    RoleWin.prototype.and = function (list) {
        for (var k in list) {
            if (list[k] == true)
                return true;
        }
        return false;
    };
    RoleWin.prototype.canWingEquip = function () {
        var isOpens = [false, false, false];
        var isLevel = Wing.ins().canGradeupWing();
        var isLevelByItem = Wing.ins().canItemGradeupWing();
        var isRoleOpenWing = Wing.ins().canRoleOpenWing();
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            if (GlobalConfig.WingCommonConfig.openLevel > Actor.level) {
                isOpens[i] = false;
                continue;
            }
            if (isRoleOpenWing[i]) {
                isOpens[i] = true;
                continue;
            }
            if (isLevel[i] || isLevelByItem[i]) {
                isOpens[i] = true;
            }
            if (Wing.ins().canUseAptitudeByRoleID(i))
                isOpens[i] = true;
            if (Wing.ins().canUseFlyUpByRoleID(i))
                isOpens[i] = true;
        }
        return isOpens;
    };
    RoleWin.prototype.canEquip = function () {
        var isOpens = [false, false, false];
        if (!this.canChangeEquips || !this.canChangeEquips[0].length) {
            this.canChangeEquips = UserRole.ins().canChangeEquips;
        }
        if (this.canChangeEquips) {
            var len = SubRoles.ins().subRolesLen;
            for (var i = 0; i < len; i++) {
                var data = this.canChangeEquips[i];
                for (var k in data) {
                    if (data[k]) {
                        isOpens[i] = true;
                        break;
                    }
                }
                if (isOpens[i] == false) {
                    for (var a = 0; a < 5; a++) {
                        var opens = [];
                        if (a > 1)
                            opens = LongHun.ins().canGradeupLoongSoul(a);
                        else
                            opens = SpecialRing.ins().canGradeupRing(a);
                        if (opens[i]) {
                            isOpens[i] = opens[i];
                            break;
                        }
                    }
                }
                var model = SubRoles.ins().getSubRoleByIndex(i);
                var bool = false;
                for (var j = 0; j < 8; j++) {
                    bool = UserEquip.ins().setOrangeEquipItemState(j, model);
                    if (!bool && j < 2)
                        bool = UserEquip.ins().setLegendEquipItemState(j > 0 ? 2 : 0, model);
                    if (bool) {
                        var b = UserBag.ins().checkEqRedPoint(i, model);
                        bool = b != null ? b : bool;
                    }
                    if (bool)
                        break;
                }
                if (!bool)
                    bool = UserEquip.ins().checkRedPointEx(4, i);
                if (!bool)
                    bool = UserEquip.ins().checkRedPointEx(5, i);
                if (!bool)
                    bool = Boolean(UserBag.ins().getHuntGoods(0).length);
                if (bool)
                    isOpens[i] = bool;
                if (!isOpens[i]) {
                    isOpens[i] = SamsaraModel.ins().checkRoleCanAddSpirit(i);
                }
            }
        }
        return isOpens;
    };
    RoleWin.prototype.getWingPanelInfo = function () {
        if (!this.isShow())
            return false;
        if (this.oldIndex != 3)
            return false;
        var chooseData;
        var len = SubRoles.ins().roles.length;
        for (var i = 0; i < len; i++) {
            var data = SubRoles.ins().getSubRoleByIndex(i).wingsData;
            if (!chooseData || chooseData.clearTime == 0) {
                chooseData = data;
            }
            else if (chooseData.clearTime > data.clearTime && data.clearTime > 0) {
                chooseData = data;
            }
        }
        this.wingData = chooseData;
        return chooseData.clearTime > 0 && Wing.hint;
    };
    RoleWin.prototype.doOpenHintWin = function (type, index) {
        if (index === void 0) { index = 0; }
        ViewManager.ins().open(WingHintWin, type, index, this.wingData);
    };
    RoleWin.prototype.getEquipGrid = function (pos) {
        this.validateNow();
        return this.roleInfoPanel.getEquipItem(pos);
    };
    RoleWin.prototype.playUIEff = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    return RoleWin;
}(BaseEuiView));
__reflect(RoleWin.prototype, "RoleWin");
ViewManager.ins().reg(RoleWin, LayerManager.UI_Main);
//# sourceMappingURL=RoleWin.js.map