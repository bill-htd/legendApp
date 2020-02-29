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
var RuneExchangeShopWin = (function (_super) {
    __extends(RuneExchangeShopWin, _super);
    function RuneExchangeShopWin() {
        var _this = _super.call(this) || this;
        _this.curSelectIndex = 0;
        _this.skinName = "RuneExchangeShop";
        _this.isTopLevel = true;
        return _this;
    }
    RuneExchangeShopWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.panelArr = [this.runeShop];
        this.viewStack.selectedIndex = 0;
        this.tab.dataProvider = this.viewStack;
    };
    RuneExchangeShopWin.prototype.destoryView = function () {
        _super.prototype.destoryView.call(this);
    };
    RuneExchangeShopWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.menulist1, this.onClick);
        this.addTouchEvent(this.tab, this.onTabTouch);
        this.runeShop.curRole = 0;
        this.setSelectedIndex(0);
    };
    RuneExchangeShopWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.menulist1, this.onClick);
        this.tab.removeEventListener(egret.Event.CHANGE, this.onTabTouch, this);
        this.removeObserve();
        this.panelArr[this.curSelectIndex].close();
    };
    RuneExchangeShopWin.prototype.onTabTouch = function (e) {
        this.setOpenIndex(this.tab.selectedIndex);
    };
    RuneExchangeShopWin.prototype.setOpenIndex = function (selectedIndex) {
        switch (selectedIndex) {
            case 0:
                this.runeShop.open();
                break;
        }
    };
    RuneExchangeShopWin.prototype.onClick = function (e) {
    };
    RuneExchangeShopWin.prototype.setSelectedIndex = function (selectedIndex) {
        this.curSelectIndex = selectedIndex;
        this.panelArr[selectedIndex].open();
        this.viewStack.selectedIndex = selectedIndex;
    };
    return RuneExchangeShopWin;
}(BaseEuiView));
__reflect(RuneExchangeShopWin.prototype, "RuneExchangeShopWin");
ViewManager.ins().reg(RuneExchangeShopWin, LayerManager.UI_Main);
//# sourceMappingURL=RuneExchangeShopWin.js.map