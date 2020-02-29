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
var IntegrationPanel = (function (_super) {
    __extends(IntegrationPanel, _super);
    function IntegrationPanel() {
        var _this = _super.call(this) || this;
        _this.name = "积分商店";
        _this.skinName = "ShopPointSkin";
        _this.list.itemRenderer = IntegrationItemRenderer;
        return _this;
    }
    IntegrationPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.observe(Shop.ins().postRefreshIntegrationSucc, this.buyResultCB);
        this.updateData();
    };
    IntegrationPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.removeObserve();
    };
    IntegrationPanel.prototype.buyResultCB = function (result, num) {
        if (result[0] == 1) {
            UserTips.ins().showTips("购买成功");
        }
        else {
            UserTips.ins().showTips("|C:0xf3311e&T:购买失败|");
        }
        this.label1.text = "\u6211\u7684\u79EF\u5206\uFF1A" + CommonUtils.overLength(result[1]) + "\uFF08\u5728\u795E\u79D8\u5546\u5E97\u8D2D\u4E70\u5546\u54C1\u6216\u5237\u65B0\u83B7\u5F97\uFF09";
    };
    IntegrationPanel.prototype.updateData = function () {
        var arr = [];
        var dataProvider = GlobalConfig.IntegralStore;
        for (var k in dataProvider) {
            arr.push(dataProvider[k]);
        }
        this.list.dataProvider = new eui.ArrayCollection(arr);
        this.label1.text = "\u6211\u7684\u79EF\u5206\uFF1A" + CommonUtils.overLength(Shop.ins().shopData.point) + "\uFF08\u5728\u795E\u79D8\u5546\u5E97\u8D2D\u4E70\u5546\u54C1\u6216\u5237\u65B0\u83B7\u5F97\uFF09";
    };
    IntegrationPanel.prototype.onTap = function (e) {
        if (e.target.name == "buy") {
            var goodsID = e.target.parent['goodsID'];
            var dataProvider = GlobalConfig.IntegralStore;
            var integ = void 0;
            for (var k in dataProvider) {
                var element = dataProvider[k];
                if (element.index == goodsID) {
                    integ = element;
                }
            }
            if (integ.type != 1) {
                if (UserBag.ins().getSurplusCount() <= 0) {
                    var strTips = "背包已满，无法购买";
                    UserTips.ins().showTips(strTips);
                    return;
                }
            }
            if (Actor.yb < integ.price) {
                UserTips.ins().showTips("|C:0xf3311e&T:元宝不足|");
                return;
            }
            if (Shop.ins().shopData.point < integ.integral) {
                UserTips.ins().showTips("|C:0xf3311e&T:积分不足！|");
                return;
            }
            Shop.ins().sendIntegrationShop(goodsID);
        }
    };
    return IntegrationPanel;
}(BaseView));
__reflect(IntegrationPanel.prototype, "IntegrationPanel");
//# sourceMappingURL=IntegrationPanel.js.map