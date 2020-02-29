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
var KfArenaWin = (function (_super) {
    __extends(KfArenaWin, _super);
    function KfArenaWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "KfArenaSkin";
        _this.isTopLevel = true;
        return _this;
    }
    KfArenaWin.prototype.childrenCreated = function () {
        this.viewStack.selectedIndex = 0;
        this.tab.dataProvider = this.viewStack;
    };
    KfArenaWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.tab.selectedIndex = this.viewStack.selectedIndex = param[0];
        this.addTouchEvent(this.closeBtn, this.onTouch);
        this.addChangeEvent(this.tab, this.onTabTouch);
        this.addTouchEvent(this.seeRule, this.onTouch);
        this.addChangingEvent(this.tab, this.onTabTouching);
        this.observe(KfArenaRedPoint.ins().postRedPoint, this.redPointEx);
        this.setOpenIndex(this.tab.selectedIndex);
        this.redPointEx();
    };
    KfArenaWin.prototype.onTabTouching = function (e) {
        if (!this.checkIsOpen(e.currentTarget.selectedIndex)) {
            e.preventDefault();
            return;
        }
    };
    KfArenaWin.prototype.checkIsOpen = function (index) {
        return true;
    };
    KfArenaWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    KfArenaWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.seeRule:
                ViewManager.ins().open(CommonHelpWin, GlobalConfig.HelpInfoConfig[34].text);
                break;
        }
    };
    KfArenaWin.prototype.onTabTouch = function (e) {
        this.setOpenIndex(e.currentTarget.selectedIndex);
        this.redPointEx();
    };
    KfArenaWin.prototype.setOpenIndex = function (selectedIndex) {
        switch (selectedIndex) {
            case KfArenaWin.Page_Select_Rank:
                this.rankPanel.open();
                break;
            case KfArenaWin.Page_Select_Macth:
                this.macthPanel.open();
                break;
            case KfArenaWin.Page_Select_Join:
                this.joinPanel.open();
                break;
            case KfArenaWin.Page_Select_Duan:
                this.duanPanel.open();
                break;
        }
    };
    KfArenaWin.prototype.redPointEx = function () {
        this.redPoint0.visible = false;
        this.redPoint1.visible = KfArenaRedPoint.ins().redpoint_1 > 0;
        this.redPoint2.visible = KfArenaRedPoint.ins().redpoint_2 > 0;
        this.redPoint3.visible = KfArenaRedPoint.ins().redpoint_3 > 0;
    };
    KfArenaWin.Page_Select_Rank = 0;
    KfArenaWin.Page_Select_Macth = 1;
    KfArenaWin.Page_Select_Join = 2;
    KfArenaWin.Page_Select_Duan = 3;
    return KfArenaWin;
}(BaseEuiView));
__reflect(KfArenaWin.prototype, "KfArenaWin");
ViewManager.ins().reg(KfArenaWin, LayerManager.UI_Main);
//# sourceMappingURL=KfArenaWin.js.map