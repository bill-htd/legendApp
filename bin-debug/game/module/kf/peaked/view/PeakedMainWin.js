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
var PeakedMainWin = (function (_super) {
    __extends(PeakedMainWin, _super);
    function PeakedMainWin() {
        var _this = _super.call(this) || this;
        _this.isTopLevel = true;
        _this.skinName = "PeakednessWinSkin";
        return _this;
    }
    PeakedMainWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.oldIndex = this.tab.selectedIndex = this.viewStack.selectedIndex = param[0] ? param[0] : 0;
        this.addChangeEvent(this.tab, this.onTabTouch);
        this.addChangingEvent(this.tab, this.onTabTouching);
        this.addTouchEvent(this.help, this.onTouch);
        this.addTouchEvent(this.closeBtn, this.onTouch);
        this.setOpenIndex(this.oldIndex);
        this.observe(UserReadPlayer.ins().postPlayerResult, this.openOtherPlayerView);
        this.observe(PeakedRedpoint.ins().postRedPoint, this.refRedpoint);
    };
    PeakedMainWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (this.viewStack.getElementAt(this.oldIndex)) {
            this.viewStack.getElementAt(this.oldIndex)['close']();
        }
    };
    PeakedMainWin.prototype.openOtherPlayerView = function (otherPlayerData) {
        if (this.oldIndex == 4)
            return;
        var hasTopRank = ViewManager.ins().isShow(PeakTopRankWin);
        if (hasTopRank)
            ViewManager.ins().close(PeakTopRankWin);
        var win = ViewManager.ins().open(RRoleWin, otherPlayerData);
        win.hideEx(1);
        win.closeFun = function () {
            if (hasTopRank)
                ViewManager.ins().open(PeakTopRankWin);
        };
    };
    PeakedMainWin.prototype.onTabTouch = function (e) {
        var index = this.tab.selectedIndex;
        this.setOpenIndex(index);
    };
    PeakedMainWin.prototype.onTabTouching = function (e) {
        if (!this.checkIsOpen(this.tab.selectedIndex)) {
            e.preventDefault();
        }
    };
    PeakedMainWin.prototype.checkIsOpen = function (index) {
        return true;
    };
    PeakedMainWin.prototype.setOpenIndex = function (selectedIndex) {
        switch (selectedIndex) {
            case 0:
                this.peakedPanel.open();
                break;
            case 1:
                this.peakAwardPanel.open();
                break;
            case 2:
                this.peakedMallPanel.open();
                break;
            case 3:
                this.peakChipMallPanel.open();
                break;
            case 4:
                this.worshipChampionPanel.open();
                break;
        }
        if (this.oldIndex != selectedIndex) {
            this.viewStack.getElementAt(this.oldIndex)['close']();
            this.oldIndex = selectedIndex;
        }
        else {
            this.tab.selectedIndex = this.viewStack.selectedIndex = selectedIndex;
        }
    };
    PeakedMainWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.help:
                var helpId = PeakedSys.ins().isKf() ? 32 : 31;
                ViewManager.ins().open(CommonHelpWin, GlobalConfig.HelpInfoConfig[helpId].text);
                break;
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
        }
    };
    PeakedMainWin.prototype.refRedpoint = function () {
        this.redPoint0.visible = PeakedRedpoint.ins().redpoint1 > 0;
        this.redPoint1.visible = false;
        this.redPoint2.visible = false;
        this.redPoint3.visible = false;
        this.redPoint4.visible = PeakedRedpoint.ins().redpoint3 > 0;
    };
    PeakedMainWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (PeakedSys.ins().isOpen())
            return true;
        else {
            UserTips.ins().showTips("\u5DC5\u5CF0\u6218\u7EE9\u672A\u5F00\u542F\uFF01");
            return false;
        }
    };
    return PeakedMainWin;
}(BaseEuiView));
__reflect(PeakedMainWin.prototype, "PeakedMainWin");
ViewManager.ins().reg(PeakedMainWin, LayerManager.UI_Main);
//# sourceMappingURL=PeakedMainWin.js.map