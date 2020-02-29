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
var AdvanEquipWin = (function (_super) {
    __extends(AdvanEquipWin, _super);
    function AdvanEquipWin() {
        var _this = _super.call(this) || this;
        _this.curRole = 0;
        _this.curSelectIndex = 0;
        _this.skinName = "AdvanEquipWinSkin";
        _this.panelArr = [_this.orangeEquipPanel, _this.legendEquipPanel, _this.extremeEquipPanel];
        _this.isTopLevel = true;
        return _this;
    }
    AdvanEquipWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.viewStack.selectedIndex = AdvanEquipWin.ShenZhuang;
        this.tab.dataProvider = this.viewStack;
    };
    AdvanEquipWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var page = param[0] ? param[0] : AdvanEquipWin.ShenZhuang;
        var selectedIndex = param[1] ? param[1] : AdvanEquipWin.ShenZhuang;
        this.roleSelect.setCurRole(selectedIndex);
        this.addTouchEvent(this.closeBtn, this.onClick);
        this.addChangeEvent(this.tab, this.onTabTouch);
        this.addChangingEvent(this.tab, this.onTabTouching);
        this.observe(UserBag.ins().postItemChange, this.setRedPoint);
        this.observe(UserBag.ins().postItemAdd, this.setRedPoint);
        this.observe(UserBag.ins().postItemDel, this.setRedPoint);
        this.observe(GameLogic.ins().postSubRoleChange, this.setRedPoint);
        this.addChangeEvent(this.roleSelect, this.switchRole);
        this.setSelectedIndex(page);
        this.setRedPoint();
    };
    AdvanEquipWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.panelArr[this.curSelectIndex].close();
    };
    AdvanEquipWin.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
        }
    };
    AdvanEquipWin.prototype.switchRole = function () {
        var curRole = this.roleSelect.getCurRole();
        this.panelArr[this.curSelectIndex].setRoleId(curRole);
    };
    AdvanEquipWin.prototype.onTabTouching = function (e) {
        if (e.currentTarget.selectedIndex == AdvanEquipWin.XunBao) {
            ViewManager.ins().open(TreasureHuntWin, 0);
            e.preventDefault();
            return;
        }
        if (!this.checkIsOpen(e.currentTarget.selectedIndex)) {
            e.preventDefault();
            return;
        }
    };
    AdvanEquipWin.prototype.checkIsOpen = function (index) {
        switch (index) {
            case AdvanEquipWin.ShenZhuang:
                break;
            case AdvanEquipWin.ChuanQi:
                break;
            case AdvanEquipWin.ZhiZun:
                if (!OpenSystem.ins().checkSysOpen(SystemType.ZHIZUN)) {
                    UserTips.ins().showTips(OpenSystem.ins().getNoOpenTips(SystemType.ZHIZUN));
                    return false;
                }
                break;
        }
        return true;
    };
    AdvanEquipWin.prototype.onTabTouch = function (e) {
        this.panelArr[this.curSelectIndex].close();
        var selectedIndex = e.currentTarget.selectedIndex;
        this.setSelectedIndex(selectedIndex);
        this.setRedPoint();
        ViewManager.ins().close(LimitTaskView);
    };
    AdvanEquipWin.prototype.setSelectedIndex = function (selectedIndex) {
        this.curSelectIndex = selectedIndex;
        var curRole = this.roleSelect.getCurRole();
        this.panelArr[selectedIndex].open(curRole);
        this.viewStack.selectedIndex = selectedIndex;
    };
    AdvanEquipWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (Actor.level >= 10)
            return true;
        UserTips.ins().showTips("10级开启");
        return false;
    };
    AdvanEquipWin.prototype.setRedPoint = function () {
        this.redPoint3.visible = this.redPoint2.visible = this.redPoint0.visible = this.redPoint1.visible = false;
        var bool = false;
        var len = SubRoles.ins().subRolesLen;
        var rolePoint = [false, false, false];
        for (var a = 0; a < len; a++) {
            for (var i = 0; i < 8; i++) {
                bool = UserEquip.ins().setOrangeEquipItemState(i, SubRoles.ins().getSubRoleByIndex(a));
                if (bool)
                    break;
            }
            this.roleSelect.showRedPoint(a, bool);
            if (bool)
                this.redPoint0.visible = bool;
        }
        bool = false;
        for (var a = 0; a < len; a++) {
            for (var i = 0; i < 2; i++) {
                bool = UserEquip.ins().setLegendEquipItemUpState(i > 0 ? 2 : 0, SubRoles.ins().getSubRoleByIndex(a));
                bool = UserEquip.ins().setLegendEquipItemState(i > 0 ? 2 : 0, SubRoles.ins().getSubRoleByIndex(a)) || bool;
                if (i == 1) {
                    if (bool) {
                        this.redPoint1.visible = bool;
                        break;
                    }
                }
            }
            if (this.viewStack.selectedIndex == AdvanEquipWin.ChuanQi) {
                this.roleSelect.showRedPoint(a, bool);
            }
        }
        if (this.redPoint1.visible == false) {
            this.redPoint1.visible = UserEquip.ins().checkRedPointEx(5, this.roleSelect.getCurRole()) || this.legendEquipPanel.setRedPoint();
        }
        this.redPoint2.visible = Boolean(UserBag.ins().getHuntGoods(0).length);
        if (this.viewStack.selectedIndex == AdvanEquipWin.ZhiZun) {
            this.roleSelect.clearRedPoint();
            for (var i = 0; i < SubRoles.ins().subRolesLen; i++) {
                var role = SubRoles.ins().getSubRoleByIndex(i);
                var b = ExtremeEquipModel.ins().getRedPointByJob(role.job);
                if (b) {
                    this.roleSelect.showRedPoint(i, b);
                }
            }
        }
        this.redPoint3.visible = ExtremeEquipModel.ins().getRedPoint();
    };
    AdvanEquipWin.ShenZhuang = 0;
    AdvanEquipWin.ChuanQi = 1;
    AdvanEquipWin.ZhiZun = 2;
    AdvanEquipWin.XunBao = 3;
    return AdvanEquipWin;
}(BaseEuiView));
__reflect(AdvanEquipWin.prototype, "AdvanEquipWin");
ViewManager.ins().reg(AdvanEquipWin, LayerManager.UI_Main);
//# sourceMappingURL=AdvanEquipWin.js.map