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
var AuctionWin = (function (_super) {
    __extends(AuctionWin, _super);
    function AuctionWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "auctionSkin";
        _this.isTopLevel = true;
        return _this;
    }
    AuctionWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEndEvent(this, this.onTouch);
        this.addChangeEvent(this.tab, this.selectIndexChange);
        this.observe(Auction.ins().postListData, this.updateRed);
        this.observe(Auction.ins().postAuctionResult, this.updateRed);
        this.observe(Auction.ins().postBuyResult, this.updateRed);
        this.observe(Auction.ins().postUpdate, this.updateRed);
        this.updateRed();
        this.tab.selectedIndex = this.viewStack.selectedIndex = Auction.ins().checkRedByType(1) && !Auction.ins().checkRedByType(0) ? 1 : 0;
        this.selectIndexChange();
    };
    AuctionWin.prototype.close = function () {
    };
    AuctionWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.seeRule:
                ViewManager.ins().open(ZsBossRuleSpeak, 41);
                break;
        }
    };
    AuctionWin.prototype.selectIndexChange = function (e) {
        if (e === void 0) { e = null; }
        switch (this.tab.selectedIndex) {
            case 0:
                Auction.ins().sendGetList(0);
                this.guild.open(0);
                break;
            case 1:
                Auction.ins().sendGetList(1);
                this.server.open(1);
                break;
        }
    };
    AuctionWin.prototype.updateRed = function () {
        this.redPoint0.visible = Auction.ins().checkRedByType(0);
        this.redPoint1.visible = Auction.ins().checkRedByType(1);
    };
    return AuctionWin;
}(BaseEuiView));
__reflect(AuctionWin.prototype, "AuctionWin");
ViewManager.ins().reg(AuctionWin, LayerManager.UI_Main);
//# sourceMappingURL=AuctionWin.js.map