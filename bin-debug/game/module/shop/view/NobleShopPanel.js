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
var NobleShopPanel = (function (_super) {
    __extends(NobleShopPanel, _super);
    function NobleShopPanel() {
        var _this = _super.call(this) || this;
        _this.name = "贵族商城";
        return _this;
    }
    NobleShopPanel.prototype.childrenCreated = function () {
        this.init();
    };
    NobleShopPanel.prototype.init = function () {
        this.listView.itemRenderer = NobleShopItemRender;
    };
    NobleShopPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (param[0]) {
            this.listView.addEventListener(egret.Event.ENTER_FRAME, this.scrollBottom, this);
        }
        this.addTouchEvent(this, this.onTap);
        this.addTouchEvent(this.tipImg, this.onTap);
        this.updateData();
    };
    NobleShopPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this, this.onTap);
        this.removeTouchEvent(this.tipImg, this.onTap);
        this.listView.removeEventListener(egret.Event.ENTER_FRAME, this.scrollBottom, this);
    };
    NobleShopPanel.prototype.updateData = function () {
        var arr = [];
        var dataProvider = GlobalConfig.IntegralStore;
        for (var k in dataProvider) {
            arr.push(dataProvider[k]);
        }
        this.listView.dataProvider = new eui.ArrayCollection(arr);
    };
    NobleShopPanel.prototype.onTap = function (e) {
        if (e.target.name == "buy") {
            var goodsID = e.target.parent['goodsID'];
            var shopType = e.target.parent['shopType'];
            if (!Recharge.ins().getIsForeve())
                UserTips.ins().showTips("\u6CA1\u6709\u6FC0\u6D3B\u8D35\u65CF\u7279\u6743\u65E0\u6CD5\u8D2D\u4E70");
            else
                ViewManager.ins().open(BuyWin, goodsID, shopType);
        }
        else if (e.currentTarget == this.tipImg) {
            ViewManager.ins().open(FuliWin, 2);
        }
    };
    NobleShopPanel.prototype.scrollBottom = function () {
        this.listView.removeEventListener(egret.Event.ENTER_FRAME, this.scrollBottom, this);
        this.listView.scrollV = this.listView.contentHeight - this.listView.height;
    };
    return NobleShopPanel;
}(BaseView));
__reflect(NobleShopPanel.prototype, "NobleShopPanel");
//# sourceMappingURL=NobleShopPanel.js.map