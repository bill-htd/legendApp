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
var ShopWin = (function (_super) {
    __extends(ShopWin, _super);
    function ShopWin() {
        var _this = _super.call(this) || this;
        _this.lastIndex = 0;
        _this.scrollBottom = false;
        _this.skinName = "ShopSkin";
        _this.isTopLevel = true;
        return _this;
    }
    ShopWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
    };
    ShopWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onClick);
        this.addTouchEvent(this.closeBtn0, this.onClick);
        this.addChangeEvent(this.tab, this.onTabTouch);
        this.observe(UserBag.ins().postItemAdd, this.buyToUse);
        this.observe(ShopRedPoint.ins().postBlackMarketRedPoint, this.updateRedPoint);
        this.lastIndex = param[0] == undefined ? this.lastIndex : param[0];
        if (param[1])
            this.scrollBottom = param[1];
        this.tab.selectedIndex = this.lastIndex;
        this.viewStack.selectedIndex = this.lastIndex;
        this.setOpenIndex(this.lastIndex);
        Shop.ins().postRefreshGoodsSuccess(false);
        this.updateRedPoint();
    };
    ShopWin.prototype.updateRedPoint = function () {
        this.redPoint0.visible = ShopRedPoint.ins().blackMarketRedPoint;
    };
    ShopWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var num = this.viewStack.numChildren;
        for (var i = 0; i < num; i++) {
            this.viewStack.getChildAt(i).close();
        }
    };
    ShopWin.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
            case this.closeBtn0:
                ViewManager.ins().close(this);
                break;
        }
    };
    ShopWin.prototype.onTabTouch = function (e) {
        this.setOpenIndex(e.currentTarget.selectedIndex);
    };
    ShopWin.prototype.setOpenIndex = function (selectedIndex) {
        switch (selectedIndex) {
            case 0:
                this.blackMarketPanel.open();
                break;
            case 1:
                this.itemShopPanel.open();
                break;
            case 2:
                this.honorMarketPanel.open();
                break;
        }
        if (this.lastIndex != selectedIndex) {
            this.viewStack.getElementAt(this.lastIndex)['close']();
            this.lastIndex = selectedIndex;
        }
        else {
            this.tab.selectedIndex = this.viewStack.selectedIndex = selectedIndex;
        }
    };
    ShopWin.prototype.buyToUse = function () {
        if (!Shop.ins().shopBuyArr)
            Shop.ins().shopBuyArr = [];
        for (var i = 0; i < Shop.ins().shopBuyArr.length; i++) {
            var tmp = Shop.ins().shopBuyArr[i];
            UserBag.ins().sendUseItem(tmp.id, tmp.count);
        }
    };
    return ShopWin;
}(BaseEuiView));
__reflect(ShopWin.prototype, "ShopWin");
ViewManager.ins().reg(ShopWin, LayerManager.UI_Main);
//# sourceMappingURL=ShopWin.js.map