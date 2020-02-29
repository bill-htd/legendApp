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
var ForgeWin = (function (_super) {
    __extends(ForgeWin, _super);
    function ForgeWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "forgeskin";
        _this.isTopLevel = true;
        return _this;
    }
    ForgeWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.viewStack.selectedIndex = ForgeWin.Page_Select_Boost;
        this.tab.dataProvider = this.viewStack;
        this.mc = new MovieClip;
        this.mc.x = 240;
        this.mc.y = 400;
        this.mcList = [];
        for (var i = 0; i < 8; i++) {
            var mcp = new MovieClip;
            mcp.x = 240;
            mcp.y = 400;
            this.mcList.push(mcp);
        }
    };
    ForgeWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.tab.selectedIndex = this.viewStack.selectedIndex = param[0];
        if (param[1] != undefined) {
            this.roleSelect.setCurRole(parseInt(param[1] + ""));
        }
        this.setRoleId(this.roleSelect.getCurRole());
        this.addTouchEvent(this.closeBtn, this.onTouch);
        this.addTouchEvent(this.closeBtn0, this.onTouch);
        this.addChangeEvent(this.tab, this.onTabTouch);
        this.addChangingEvent(this.tab, this.onTabTouching);
        this.addChangeEvent(this.roleSelect, this.onChange);
        this.observe(UserForge.ins().postForgeUpdate, this.onEvent);
        this.observe(ForgeRedPoint.ins().postForgeBoostRedPoint, this.delayRedPoint);
        this.observe(ForgeRedPoint.ins().postForgeZhulingRedPoint, this.delayRedPoint);
        this.observe(ForgeRedPoint.ins().postForgeGemRedPoint, this.delayRedPoint);
        this.observe(ForgeRedPoint.ins().postForgeWeaponRedPoint, this.delayRedPoint);
    };
    ForgeWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var num = this.viewStack.numChildren;
        for (var i = 0; i < num; i++) {
            this.viewStack.getChildAt(i).close();
        }
        var uiview2 = ViewManager.ins().getView(UIView2);
        if (uiview2)
            uiview2.closeNav(UIView2.NAV_SMITH);
        DisplayUtils.removeFromParent(this.mc);
        for (var i = 0; i < 8; i++) {
            DisplayUtils.removeFromParent(this.mcList[i]);
        }
    };
    ForgeWin.prototype.onTouch = function (e) {
        ViewManager.ins().close(ForgeWin);
    };
    ForgeWin.prototype.onTabTouch = function (e) {
        this.setOpenIndex(e.currentTarget.selectedIndex);
        this.redPointEx();
    };
    ForgeWin.prototype.onTabTouching = function (e) {
        if (!this.checkIsOpen(e.currentTarget.selectedIndex)) {
            e.preventDefault();
            return;
        }
    };
    ForgeWin.prototype.setOpenIndex = function (selectedIndex, roleChange) {
        var index = 0;
        var role = SubRoles.ins().getSubRoleByIndex(this.roleSelect.getCurRole());
        var change = true;
        this.roleSelect.openRole();
        switch (selectedIndex) {
            case ForgeWin.Page_Select_Boost:
                index = role.getMinEquipIndexByType(0);
                this.boostPanel.open(index, role.getEquipByIndex(index).strengthen);
                break;
            case ForgeWin.Page_Select_Gem:
                index = role.getMinEquipIndexByType(ForgeWin.Page_Select_Gem);
                if (Actor.level >= GlobalConfig.StoneOpenConfig[0].openLv) {
                    this.gemPanel.open(index, role.getEquipByIndex(index).gem);
                }
                else {
                    change = false;
                    UserTips.ins().showTips("精炼" + GlobalConfig.StoneOpenConfig[0].openLv + "级开启");
                }
                break;
            case ForgeWin.Page_Select_ZhuLing:
                index = role.getMinEquipIndexByType(ForgeWin.Page_Select_ZhuLing);
                this.zhulingPanel.open(index, role.getEquipByIndex(index).zhuling);
                break;
            case ForgeWin.Page_Select_Weapon:
                change = OpenSystem.ins().checkSysOpen(SystemType.WEAPONS);
                if (change) {
                    if (roleChange) {
                        if (this.weaponsoul.isShowSoul()) {
                            this.weaponsoul.open(this.roleSelect.getCurRole(), false);
                        }
                        else {
                            this.weaponsoul.open(this.roleSelect.getCurRole(), true);
                        }
                    }
                    else {
                        this.weaponsoul.open(this.roleSelect.getCurRole(), true);
                    }
                }
                else {
                    UserTips.ins().showTips(OpenSystem.ins().getNoOpenTips(SystemType.WEAPONS));
                }
                break;
            case ForgeWin.PageSelectSamsara:
                this.roleSelect.hideRole();
                break;
        }
        if (!change)
            this.tab.selectedIndex = this.viewStack.selectedIndex;
        if (this.tab.selectedIndex != this.viewStack.selectedIndex) {
            this.checkAutoBtn();
        }
    };
    ForgeWin.prototype.checkIsOpen = function (index) {
        switch (index) {
            case ForgeWin.Page_Select_Boost:
                break;
            case ForgeWin.Page_Select_Gem:
                if (Actor.level < GlobalConfig.StoneOpenConfig[0].openLv) {
                    UserTips.ins().showTips("精炼" + GlobalConfig.StoneOpenConfig[0].openLv + "级开启");
                    return false;
                }
                break;
            case ForgeWin.Page_Select_ZhuLing:
                break;
            case ForgeWin.Page_Select_Weapon:
                if (!OpenSystem.ins().checkSysOpen(SystemType.WEAPONS)) {
                    UserTips.ins().showTips(OpenSystem.ins().getNoOpenTips(SystemType.WEAPONS));
                    return false;
                }
                break;
        }
        return true;
    };
    ForgeWin.prototype.checkAutoBtn = function () {
        if (this.boostPanel.isAutoUp) {
            this.boostPanel.stopAutoUp();
        }
        if (this.zhulingPanel.isAutoUp) {
            this.zhulingPanel.stopAutoUp();
        }
    };
    ForgeWin.prototype.onEvent = function (para) {
        var _this = this;
        var packageID = para[0];
        var index = para[1];
        var lastIndex = 0;
        var role = SubRoles.ins().getSubRoleByIndex(this.roleSelect.getCurRole());
        switch (packageID) {
            case PackageID.strongthen:
                if (ForgeWin.Page_Select_Boost == this.viewStack.selectedIndex) {
                    if (!this.boostPanel.isAutoUp) {
                        this.mcList[index].x = index % 2 * 434 + 40;
                        this.mcList[index].y = Math.floor(index / 2) * 120 + 35;
                        this.mcList[index].playFile(RES_DIR_EFF + "forgeSuccess", 1);
                        this.boostPanel.itemGroup.addChild(this.mcList[index]);
                    }
                    index = role.getMinEquipIndexByType(0);
                    this.boostPanel.changeData(index, role.getEquipByIndex(index).strengthen);
                    this.boostPanel.autoUpBack(index);
                }
                break;
            case PackageID.Gem:
                break;
            case PackageID.Zhuling:
                if (ForgeWin.Page_Select_ZhuLing == this.viewStack.selectedIndex) {
                    if (!this.zhulingPanel.isAutoUp) {
                        this.mcList[index].x = this.zhulingPanel["kuang" + index].x + this.zhulingPanel["kuang" + index].width / 2;
                        this.mcList[index].y = this.zhulingPanel["kuang" + index].y + this.zhulingPanel["kuang" + index].height / 2;
                        this.mcList[index].playFile(RES_DIR_EFF + "forgeSuccess", 1);
                        this.zhulingPanel.itemGroup.addChild(this.mcList[index]);
                    }
                    index = role.getMinEquipIndexByType(ForgeWin.Page_Select_ZhuLing);
                    this.zhulingPanel.changeData(index, role.getEquipByIndex(index).zhuling);
                    this.zhulingPanel.autoUpBack(index);
                }
                break;
        }
        TimerManager.ins().doTimer(200, 1, function () {
            switch (packageID) {
                case PackageID.strongthen:
                    break;
                case PackageID.Gem:
                    if (ForgeWin.Page_Select_Gem == _this.viewStack.selectedIndex) {
                        _this.gemPanel.changeData(index, role.getEquipByIndex(index).gem);
                    }
                    break;
                case PackageID.Zhuling:
                    break;
            }
        }, this);
        this.redPointEx();
    };
    ForgeWin.prototype.delayRedPoint = function () {
        if (!TimerManager.ins().isExists(this.redPointEx, this))
            TimerManager.ins().doTimer(60, 1, this.redPointEx, this);
    };
    ForgeWin.prototype.redPointEx = function () {
        var roleRedPoint = [false, false, false];
        for (var i = 0; i < roleRedPoint.length; i++) {
            this.roleSelect.showRedPoint(i, roleRedPoint[i]);
        }
        for (var i = 0; i < 4; i++) {
            if (ForgeRedPoint.ins().roleTabs[i] && this.tab.selectedIndex == i) {
                for (var j = 0; j < SubRoles.ins().subRolesLen; j++) {
                    this.roleSelect.showRedPoint(j, ForgeRedPoint.ins().roleTabs[i][j]);
                    if (i == ForgeWin.Page_Select_Weapon) {
                        if (this.weaponsoul.isShowSoul()) {
                            this.roleSelect.showRedPoint(j, ForgeRedPoint.ins().getFlexibleRoleRedPoint(j));
                        }
                    }
                }
            }
            this["redPoint" + i].visible = false;
            this["redPoint" + i].visible = ForgeRedPoint.ins().getRedPoint(i);
        }
    };
    ForgeWin.prototype.redPoint = function () {
        var len = SubRoles.ins().subRolesLen;
        var roleRedPoint = [false, false, false];
        for (var i = 0; i < roleRedPoint.length; i++) {
            this.roleSelect.showRedPoint(i, roleRedPoint[i]);
            this["redPoint" + i].visible = false;
        }
        this.redPoint3.visible = false;
        for (var roleIndex = 0; roleIndex < len; roleIndex++) {
            for (var i = 0; i < 3; i++) {
                var role = SubRoles.ins().getSubRoleByIndex(roleIndex);
                var index = role.getMinEquipIndexByType(i);
                var lv = this.getForgeLv(i, role, index);
                var costNum = this.getForgeIdOrCount(i, lv, 0);
                if (costNum) {
                    var goodId = this.getForgeIdOrCount(i, lv, 1);
                    var goodsNum = void 0;
                    if (i == ForgeWin.Page_Select_Gem) {
                        goodsNum = Actor.soul;
                    }
                    else {
                        goodsNum = UserBag.ins().getBagGoodsCountById(0, goodId);
                    }
                    if (goodsNum >= costNum) {
                        if (this.tab.selectedIndex == i)
                            this.roleSelect.showRedPoint(roleIndex, true);
                        if (i != ForgeWin.Page_Select_Gem)
                            this["redPoint" + i].visible = true;
                        else {
                            if (Actor.level >= GlobalConfig.StoneOpenConfig[0].openLv)
                                this["redPoint" + i].visible = true;
                        }
                        if (this["redPoint" + i].visible) {
                            var r = SubRoles.ins().getSubRoleByIndex(this.roleSelect.getCurRole());
                            this["redPoint" + i].visible = UserForge.ins().isMaxForge(r, i);
                        }
                    }
                }
            }
            var weapRedPoint = Weapons.ins().checkRedPoint(roleIndex);
            if (!this.redPoint3.visible) {
                this.redPoint3.visible = weapRedPoint;
            }
            if (this.tab.selectedIndex == ForgeWin.Page_Select_Weapon)
                this.roleSelect.showRedPoint(roleIndex, weapRedPoint);
        }
    };
    ForgeWin.prototype.getForgeLv = function (type, role, index) {
        switch (type) {
            case ForgeWin.Page_Select_Boost:
                return role.getEquipByIndex(index).strengthen;
            case ForgeWin.Page_Select_ZhuLing:
                return role.getEquipByIndex(index).zhuling;
            case ForgeWin.Page_Select_Gem:
                return role.getEquipByIndex(index).gem;
            case 3:
                return role.getEquipByIndex(index).tupo;
        }
    };
    ForgeWin.prototype.getForgeIdOrCount = function (type, lv, idOCount) {
        switch (type) {
            case ForgeWin.Page_Select_Boost:
                var boostConfig = UserForge.ins().getEnhanceCostConfigByLv(lv + 1);
                if (boostConfig) {
                    if (idOCount)
                        return boostConfig.stoneId;
                    else
                        return boostConfig.stoneNum;
                }
                break;
            case ForgeWin.Page_Select_ZhuLing:
                var zhulingConfig = UserForge.ins().getZhulingCostConfigByLv(lv + 1);
                if (zhulingConfig) {
                    if (idOCount)
                        return zhulingConfig.itemId;
                    else
                        return zhulingConfig.count;
                }
                break;
            case ForgeWin.Page_Select_Gem:
                var gemConfig = UserForge.ins().getStoneLevelCostConfigByLv(lv + 1);
                if (gemConfig) {
                    if (idOCount)
                        return gemConfig.stoneId;
                    else
                        return gemConfig.soulNum;
                }
                break;
            case 3:
                var tupoConfig = UserForge.ins().getTupoCostConfigByLv(lv + 1);
                if (tupoConfig) {
                    if (idOCount)
                        return tupoConfig.itemId;
                    else
                        return tupoConfig.count;
                }
                break;
        }
        return 0;
    };
    ForgeWin.prototype.onChange = function (e) {
        this.setRoleId(this.roleSelect.getCurRole(), true);
    };
    ForgeWin.prototype.setRoleId = function (roleId, roleChange) {
        this.boostPanel.curRole = this.gemPanel.curRole = this.zhulingPanel.curRole = roleId;
        this.setOpenIndex(this.viewStack.selectedIndex, roleChange);
        this.redPointEx();
    };
    ForgeWin.Page_Select_Boost = 0;
    ForgeWin.Page_Select_Gem = 1;
    ForgeWin.Page_Select_ZhuLing = 2;
    ForgeWin.Page_Select_Weapon = 3;
    ForgeWin.PageSelectSamsara = 4;
    return ForgeWin;
}(BaseEuiView));
__reflect(ForgeWin.prototype, "ForgeWin");
ViewManager.ins().reg(ForgeWin, LayerManager.UI_Main);
//# sourceMappingURL=ForgeWin.js.map