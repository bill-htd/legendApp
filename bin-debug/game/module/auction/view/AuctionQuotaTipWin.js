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
var AuctionQuotaTipWin = (function (_super) {
    __extends(AuctionQuotaTipWin, _super);
    function AuctionQuotaTipWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "auctionQuotaTipSkin";
        return _this;
    }
    AuctionQuotaTipWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    AuctionQuotaTipWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEndEvent(this, this.onTouch);
        this.positiveQuotaNum.text = param[0];
        this.rechargeQuotaNum.text = param[1];
    };
    AuctionQuotaTipWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
            case this.goRechargeBtn:
                var reData = Recharge.ins().getRechargeData(0);
                if (!reData || reData.num != 2) {
                    ViewManager.ins().open(Recharge1Win);
                }
                else {
                    ViewManager.ins().open(ChargeFirstWin);
                }
                ViewManager.ins().close(AuctionQuotaTipWin);
                break;
        }
    };
    return AuctionQuotaTipWin;
}(BaseEuiView));
__reflect(AuctionQuotaTipWin.prototype, "AuctionQuotaTipWin");
ViewManager.ins().reg(AuctionQuotaTipWin, LayerManager.UI_Popup);
//# sourceMappingURL=AuctionQuotaTipWin.js.map