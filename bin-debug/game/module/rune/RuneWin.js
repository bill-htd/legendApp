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
var RuneWin = (function (_super) {
    __extends(RuneWin, _super);
    function RuneWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "RuneSkin";
        _this.isTopLevel = true;
        return _this;
    }
    RuneWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var selectedIndex = param ? (param[0] ? param[0] : 0) : 0;
        var viewIndex = param ? (param[1] ? param[1] : 0) : 0;
        this.roleSelect.setCurRole(selectedIndex);
        this.switchTab(viewIndex);
        this.addChangeEvent(this.roleSelect, this.onChange);
        this.addChangeEvent(this.tab, this.onTabTouch);
        this.addTouchEndEvent(this.closeBtn, this.onClick);
        this.observe(GameLogic.ins().postRuneExchange, this.refushRedPoint);
        this.observe(GameLogic.ins().postRuneShatter, this.refushRedPoint);
        this.observe(UserBag.ins().postHuntStore, this.refushRedPoint);
        this.observe(Rune.ins().postInlayResult, this.refushRedPoint);
        this.observe(Rune.ins().postUpgradeResult, this.refushRedPoint);
        this.setRoleId(this.roleSelect.getCurRole());
        this.refushRedPoint();
    };
    RuneWin.prototype.onClick = function (e) {
        ViewManager.ins().close(this);
    };
    RuneWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
        if (ViewManager.ins().isShow(RuneBookWin))
            ViewManager.ins().close(RuneBookWin);
        this.runePanel.close();
        this.decomPanel.close();
        this.removeTouchEvent(this.closeBtn, this.onClick);
    };
    RuneWin.prototype.onChange = function (e) {
        this.setRoleId(this.roleSelect.getCurRole());
        this.refushRedPoint();
    };
    RuneWin.prototype.switchTab = function (index) {
        this.viewStack.selectedIndex = index;
        this.setOpenIndex(this.viewStack.selectedIndex);
    };
    RuneWin.prototype.onTabTouch = function (e) {
        this.setOpenIndex(this.tab.selectedIndex);
    };
    RuneWin.prototype.setRoleId = function (roleId) {
        this.runePanel.curRole = this.decomPanel.curRole = roleId;
        this.setOpenIndex(this.viewStack.selectedIndex);
    };
    RuneWin.prototype.setOpenIndex = function (selectedIndex) {
        switch (selectedIndex) {
            case 0:
                this.runePanel.open();
                break;
            case 1:
                this.decomPanel.open();
                break;
            case 2:
                break;
        }
    };
    RuneWin.prototype.refushRedPoint = function () {
        this.redPoint1.visible = RuneRedPointMgr.ins().checkAllSituation(false);
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            var flag = RuneRedPointMgr.ins().checkRoleAllSituation(i);
            this.roleSelect.showRedPoint(i, flag);
        }
    };
    RuneWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var level = GlobalConfig.RuneOtherConfig.zsLevel;
        if (Actor.level < level) {
            UserTips.ins().showTips(level + "\u7EA7\u5F00\u542F");
            return false;
        }
        return true;
    };
    return RuneWin;
}(BaseEuiView));
__reflect(RuneWin.prototype, "RuneWin");
ViewManager.ins().reg(RuneWin, LayerManager.UI_Main);
//# sourceMappingURL=RuneWin.js.map