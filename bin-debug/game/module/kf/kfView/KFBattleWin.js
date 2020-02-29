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
var KFBattleWin = (function (_super) {
    __extends(KFBattleWin, _super);
    function KFBattleWin() {
        var _this = _super.call(this) || this;
        _this.isTopLevel = true;
        _this.skinName = "KFFieldWinSkin";
        return _this;
    }
    KFBattleWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.oldIndex = this.tab.selectedIndex = this.viewStack.selectedIndex = param[0] ? param[0] : 0;
        this.addTouchEvent(this.closeBtn, this.onTouch);
        this.addTouchEvent(this.seeRule, this.onTouch);
        this.addChangeEvent(this.tab, this.onTabTouch);
        this.addChangingEvent(this.tab, this.onTabTouching);
        this.setOpenIndex(this.oldIndex);
        this.observe(KFBattleRedPoint.ins().postRedPoint, this.refRedpoint);
        this.observe(KfArenaRedPoint.ins().postRedPoint, this.refRedpoint);
        this.refRedpoint();
    };
    KFBattleWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (this.viewStack.getElementAt(this.oldIndex))
            this.viewStack.getElementAt(this.oldIndex)['close']();
    };
    KFBattleWin.prototype.onTabTouch = function (e) {
        var index = this.tab.selectedIndex;
        this.setOpenIndex(index);
    };
    KFBattleWin.prototype.onTabTouching = function (e) {
        if (!this.checkIsOpen(this.tab.selectedIndex)) {
            e.preventDefault();
        }
    };
    KFBattleWin.prototype.checkIsOpen = function (index) {
        return true;
    };
    KFBattleWin.prototype.setOpenIndex = function (selectedIndex) {
        switch (selectedIndex) {
            case 0:
                this.kffieldPanel.open();
                break;
            case 1:
                this.kffieldRecordPanel.open();
                break;
            case 2:
                this.rankPanel.open();
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
    };
    KFBattleWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.closeBtn:
                ViewManager.ins().close(KFBattleWin);
                break;
            case this.seeRule:
                ViewManager.ins().open(CommonHelpWin, GlobalConfig.HelpInfoConfig[34].text);
                break;
        }
    };
    KFBattleWin.prototype.refRedpoint = function () {
        this.redPoint0.visible = KFBattleRedPoint.ins().redPoint > 0 || KfArenaRedPoint.ins().redpoint > 0;
        this.redPoint1.visible = false;
    };
    KFBattleWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        return true;
    };
    return KFBattleWin;
}(BaseEuiView));
__reflect(KFBattleWin.prototype, "KFBattleWin");
ViewManager.ins().reg(KFBattleWin, LayerManager.UI_Main);
//# sourceMappingURL=KFBattleWin.js.map