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
var SkillWin = (function (_super) {
    __extends(SkillWin, _super);
    function SkillWin() {
        var _this = _super.call(this) || this;
        _this.lastIndex = 0;
        _this.skinName = "ZsSkin";
        _this.isTopLevel = true;
        return _this;
    }
    SkillWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
    };
    SkillWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.addTouchEvent(this.help, this.onTap);
        this.addChangingEvent(this.tab, this.onTabTouching);
        this.addChangeEvent(this.tab, this.onTabTouch);
        this.addChangeEvent(this.roleSelect, this.onChange);
        this.observe(UserBag.ins().postItemAdd, this.updateRedPoint);
        this.observe(UserBag.ins().postItemDel, this.updateRedPoint);
        this.observe(UserBag.ins().postItemChange, this.updateRedPoint);
        this.observe(NeiGong.ins().postNeiGongDataChange, this.updateRedPoint);
        this.observe(UserJingMai.ins().postUpdate, this.updateRedPoint);
        this.observe(Actor.ins().postGoldChange, this.updateRedPoint);
        this.observe(Actor.ins().postLevelChange, this.updateRedPoint);
        this.observe(UserSkill.ins().postSkillUpgradeAll, this.updateRedPoint);
        this.observe(UserMiji.ins().postBagUseMiji, this.onBagUseMiji);
        this.observe(ZhanLing.ins().postZhanLingComposeItem, this.updateRedPoint);
        this.observe(ZhanLing.ins().postZhanLingInfo, this.updateRedPoint);
        this.observe(ZhanLing.ins().postZhanLingUpExp, this.updateRedPoint);
        this.observe(ZhanLing.ins().postZhanLingDrug, this.updateRedPoint);
        this.observe(ZhanLing.ins().postZhanLingWear, this.updateRedPoint);
        this.checkPage();
        var selectIndex = param[0] != undefined ? param[0] : SkillWin.Panel_JINENG;
        var roleIndex = param[1] ? param[1] : 0;
        this.viewStack.selectedIndex = this.tab.selectedIndex = selectIndex;
        this.roleSelect.setCurRole(roleIndex);
        this.setOpenIndex(selectIndex);
    };
    SkillWin.prototype.checkPage = function () {
        if (!ZhanLingModel.ins().ZhanLingOpen()) {
            if (this.zhanlingPanel.parent)
                this.viewStack.removeChild(this.zhanlingPanel);
            if (this["redPoint" + SkillWin.Panel_ZHANLING].parent)
                DisplayUtils.removeFromParent(this["redPoint" + SkillWin.Panel_ZHANLING]);
        }
        else {
            if (!this.zhanlingPanel.parent)
                this.viewStack.addChild(this.zhanlingPanel);
            if (!this["redPoint" + SkillWin.Panel_ZHANLING].parent)
                this.redPointGroup.addChild(this["redPoint" + SkillWin.Panel_ZHANLING]);
        }
    };
    SkillWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        TimerManager.ins().removeAll(this);
        var uiview2 = ViewManager.ins().getView(UIView2);
        if (uiview2)
            uiview2.closeNav(UIView2.NAV_SKILL);
        var num = this.viewStack.numChildren;
        for (var i = 0; i < num; i++) {
            this.viewStack.getChildAt(i).close();
        }
    };
    SkillWin.prototype.onTabTouch = function (e) {
        this.setOpenIndex(e.currentTarget.selectedIndex);
    };
    SkillWin.prototype.onTabTouching = function (e) {
        if (!SkillWin.checkIsOpen(e.currentTarget.selectedIndex)) {
            e.preventDefault();
            return;
        }
    };
    SkillWin.prototype.setOpenIndex = function (selectedIndex) {
        var openLevel;
        var openGuanqia;
        this.roleSelect.openRole();
        this.help.visible = false;
        switch (selectedIndex) {
            case SkillWin.Panel_JINENG:
                this.skillPanel.open();
                this.skillTitle.source = "biaoti_jineng";
                break;
            case SkillWin.Panel_NEIGONG:
                openLevel = GlobalConfig.NeiGongBaseConfig.openLevel;
                openGuanqia = GlobalConfig.NeiGongBaseConfig.openGuanqia;
                if (UserFb.ins().guanqiaID <= openGuanqia) {
                    UserTips.ins().showTips("\u901A\u5173" + openGuanqia + "\u5173\u5F00\u542F");
                    selectedIndex = this.tab.selectedIndex = this.viewStack.selectedIndex = this.lastIndex;
                }
                else {
                    this.neiGongPanel.open(this.roleSelect.getCurRole());
                    this.skillTitle.source = "biaoti_neigong";
                }
                break;
            case SkillWin.Panel_JINGMAI:
                openLevel = GlobalConfig.JingMaiCommonConfig.openLevel;
                if (Actor.level < openLevel) {
                    UserTips.ins().showTips(openLevel + "\u7EA7\u5F00\u542F");
                    selectedIndex = this.tab.selectedIndex = this.viewStack.selectedIndex = this.lastIndex;
                }
                else {
                    this.jingMai.open();
                    this.skillTitle.source = "biaoti_jingmai";
                }
                break;
            case SkillWin.Panel_MIJI:
                var zsLv = UserMiji.ZsLv;
                if (UserZs.ins().lv < zsLv) {
                    UserTips.ins().showTips(zsLv + "\u8F6C\u5F00\u542F");
                    selectedIndex = this.tab.selectedIndex = this.viewStack.selectedIndex = this.lastIndex;
                }
                else {
                    this.mijiPanel.open();
                    this.skillTitle.source = "biaoti_miji";
                }
                break;
            case SkillWin.Panel_ZHANLING:
                if (!ZhanLingModel.ins().ZhanLingOpen()) {
                    UserTips.ins().showTips("\u5F00\u670D\u7B2C" + GlobalConfig.ZhanLingConfig.openserverday + "\u5929\u5E76\u8FBE\u5230" + GlobalConfig.ZhanLingConfig.openzhuanshenglv + "\u8F6C\u5F00\u542F");
                }
                else {
                    this.help.visible = true;
                    this.roleSelect.hideRole();
                    this.zhanlingPanel.open();
                    this.skillTitle.source = "biaoti_zhanling";
                }
                break;
        }
        if (this.lastIndex != selectedIndex) {
            this.viewStack.getElementAt(this.lastIndex)['close']();
            this.lastIndex = selectedIndex;
        }
        else {
            this.tab.selectedIndex = this.viewStack.selectedIndex = selectedIndex;
        }
        this.updateRedPoint();
    };
    SkillWin.checkIsOpen = function (index) {
        var openLevel;
        var openGuanqia;
        switch (index) {
            case SkillWin.Panel_JINENG:
                break;
            case SkillWin.Panel_NEIGONG:
                openLevel = GlobalConfig.NeiGongBaseConfig.openLevel;
                openGuanqia = GlobalConfig.NeiGongBaseConfig.openGuanqia;
                if (UserFb.ins().guanqiaID <= openGuanqia) {
                    UserTips.ins().showTips("\u901A\u5173" + openGuanqia + "\u5173\u5F00\u542F");
                    return false;
                }
                break;
            case SkillWin.Panel_JINGMAI:
                openLevel = GlobalConfig.JingMaiCommonConfig.openLevel;
                if (Actor.level < openLevel) {
                    UserTips.ins().showTips(openLevel + "\u7EA7\u5F00\u542F");
                    return false;
                }
                break;
            case SkillWin.Panel_MIJI:
                var zsLv = UserMiji.ZsLv;
                if (UserZs.ins().lv < zsLv) {
                    UserTips.ins().showTips(zsLv + "\u8F6C\u5F00\u542F");
                    return false;
                }
                break;
            case SkillWin.Panel_ZHANLING:
                if (!ZhanLingModel.ins().ZhanLingOpen()) {
                    UserTips.ins().showTips("\u5F00\u670D\u7B2C" + GlobalConfig.ZhanLingConfig.openserverday + "\u5929\u5E76\u8FBE\u5230" + GlobalConfig.ZhanLingConfig.openzhuanshenglv + "\u8F6C\u5F00\u542F");
                    return false;
                }
                break;
        }
        return true;
    };
    SkillWin.prototype.updateRedPoint = function () {
        if (!TimerManager.ins().isExists(this.updateRed, this))
            TimerManager.ins().doTimer(100, 1, this.updateRed, this);
    };
    SkillWin.prototype.onBagUseMiji = function (itemId) {
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            if (!UserMiji.ins().hasEquipMiji(itemId, i)) {
                this.roleSelect.setCurRole(i);
                this.setRoleId(i);
                break;
            }
        }
        this.mijiPanel.onBagUseMiji(itemId);
    };
    SkillWin.prototype.updateRed = function () {
        this.redPoint0.visible = this.and(UserSkill.ins().canGrewupSkill());
        this.redPoint1.visible = NeiGongModel.ins().canUp();
        this.redPoint2.visible = this.jingMaiCanUp();
        this.redPoint3.visible = UserMiji.ins().isMjiSum();
        this.redPoint4.visible = ZhanLing.ins().checkRedPoint();
        var len = SubRoles.ins().subRolesLen;
        this.roleSelect.clearRedPoint();
        for (var i = 0; i < len; i++) {
            var isCanUpLevel = void 0;
            if (this.tab.selectedIndex == SkillWin.Panel_JINENG) {
                isCanUpLevel = UserSkill.ins().canGrewupAllSkills(i);
            }
            else if (this.tab.selectedIndex == SkillWin.Panel_NEIGONG) {
                isCanUpLevel = NeiGongModel.ins().canUpById(i);
            }
            else if (this.tab.selectedIndex == SkillWin.Panel_JINGMAI) {
                var data = SubRoles.ins().roles[i].jingMaiData;
                isCanUpLevel = data.jingMaiCanUp();
            }
            else if (this.tab.selectedIndex == SkillWin.Panel_MIJI) {
                isCanUpLevel = UserMiji.ins().isMjiSum();
            }
            this.roleSelect.showRedPoint(i, isCanUpLevel);
        }
    };
    SkillWin.prototype.onChange = function (e) {
        this.setRoleId(this.roleSelect.getCurRole());
    };
    SkillWin.prototype.setRoleId = function (roleId) {
        if (roleId != this.skillPanel.curRole) {
            this.neiGongPanel.curRole = this.mijiPanel.curRole = this.skillPanel.curRole = this.jingMai.curRole = roleId;
            this.setOpenIndex(this.viewStack.selectedIndex);
        }
    };
    SkillWin.prototype.and = function (list) {
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var k = list_1[_i];
            if (k == true)
                return true;
        }
        return false;
    };
    SkillWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
            case this.closeBtn0:
                ViewManager.ins().close(this);
                break;
            case this.help:
                if (this.viewStack.selectedIndex == SkillWin.Panel_ZHANLING) {
                    ViewManager.ins().open(CommonHelpWin, GlobalConfig.HelpInfoConfig[35].text);
                }
                break;
        }
    };
    SkillWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var index = param[0] || SkillWin.Panel_JINENG;
        return SkillWin.checkIsOpen(index);
    };
    SkillWin.prototype.jingMaiCanUp = function () {
        var data;
        for (var i in SubRoles.ins().roles) {
            data = SubRoles.ins().roles[i].jingMaiData;
            if (data.jingMaiCanUp()) {
                var openLevel = GlobalConfig.JingMaiCommonConfig.openLevel;
                if (Actor.level >= openLevel)
                    return true;
            }
        }
        return false;
    };
    SkillWin.Panel_JINENG = 0;
    SkillWin.Panel_NEIGONG = 1;
    SkillWin.Panel_JINGMAI = 2;
    SkillWin.Panel_MIJI = 3;
    SkillWin.Panel_ZHANLING = 4;
    return SkillWin;
}(BaseEuiView));
__reflect(SkillWin.prototype, "SkillWin");
ViewManager.ins().reg(SkillWin, LayerManager.UI_Main);
//# sourceMappingURL=SkillWin.js.map