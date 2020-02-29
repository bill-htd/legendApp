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
var GodWingWin = (function (_super) {
    __extends(GodWingWin, _super);
    function GodWingWin() {
        var _this = _super.call(this) || this;
        _this.roleIndex = 0;
        _this.skinName = "ShenYuSkin";
        _this.isTopLevel = true;
        return _this;
    }
    GodWingWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addChangeEvent(this.tab, this.onTabTouch);
        this.addChangingEvent(this.tab, this.onTabTouching);
        this.addChangeEvent(this.roleSelect, this.onChange);
        this.observe(GodWingRedPoint.ins().postGodWingRedPoint, this.updateRedPoint);
        this.observe(GodWingRedPoint.ins().postGodWingItem, this.updateRedPoint);
        this.observe(GameLogic.ins().postSubRoleChange, this.updateRedPoint);
        this.roleIndex = param[0] ? param[0] : 0;
        this.roleSelect.setCurRole(this.roleIndex);
        this.godWingPanel.curRole = this.roleIndex;
        this.setOpenIndex(0);
        this.updateRedPoint();
    };
    GodWingWin.prototype.onTabTouching = function (e) {
        if (!this.checkIsOpen(this.tab.selectedIndex)) {
            e.preventDefault();
        }
    };
    GodWingWin.prototype.checkIsOpen = function (index) {
        return true;
    };
    GodWingWin.prototype.onChange = function (e) {
        this.setRoleId(this.roleSelect.getCurRole());
    };
    GodWingWin.prototype.onTabTouch = function (e) {
        this.setOpenIndex(this.tab.selectedIndex);
    };
    GodWingWin.prototype.setRoleId = function (roleId) {
        this.godWingPanel.curRole = roleId;
        this.setOpenIndex(this.viewStack.selectedIndex);
    };
    GodWingWin.prototype.setOpenIndex = function (selectedIndex) {
        switch (selectedIndex) {
            case 0:
                this.roleSelect.openRole();
                this.godWingPanel.open();
                break;
            case 1:
                this.roleSelect.hideRole();
                this.godWingComposePanel.open();
                break;
            case 2:
                this.roleSelect.hideRole();
                this.godWingTransferPanel.open();
                break;
        }
        this.tab.selectedIndex = this.viewStack.selectedIndex = selectedIndex;
    };
    GodWingWin.prototype.updateRedPoint = function () {
        if (!GodWingRedPoint.ins().tabs)
            GodWingRedPoint.ins().tabs = {};
        this.redPoint0.visible = GodWingRedPoint.ins().tabs[0];
        this.redPoint1.visible = GodWingRedPoint.ins().tabs[1];
        if (!this.tab.selectedIndex) {
            for (var i = 0; i < SubRoles.ins().subRolesLen; i++) {
                this.roleSelect.showRedPoint(i, GodWingRedPoint.ins().roleTabs[this.tab.selectedIndex][i]);
            }
        }
    };
    return GodWingWin;
}(BaseEuiView));
__reflect(GodWingWin.prototype, "GodWingWin");
ViewManager.ins().reg(GodWingWin, LayerManager.UI_Main);
//# sourceMappingURL=GodWingWin.js.map