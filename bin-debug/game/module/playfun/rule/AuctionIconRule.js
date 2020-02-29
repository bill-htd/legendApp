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
var AuctionIconRule = (function (_super) {
    __extends(AuctionIconRule, _super);
    function AuctionIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.firstTap = true;
        _this.showMessage = [
            UserZs.ins().postZsData
        ];
        _this.updateMessage = [
            Auction.ins().postListData,
            Auction.ins().postAuctionResult,
            Auction.ins().postBuyResult,
            Auction.ins().postUpdate
        ];
        return _this;
    }
    AuctionIconRule.prototype.checkShowIcon = function () {
        if (Auction.ins().isAuctionOpen())
            return true;
        return false;
    };
    AuctionIconRule.prototype.checkShowRedPoint = function () {
        return Auction.ins().checkRed() && this.firstTap ? 1 : 0;
    };
    AuctionIconRule.prototype.getEffName = function (redPointNum) {
        if (this.firstTap || redPointNum) {
            this.effX = 38;
            this.effY = 38;
            return "actIconCircle";
        }
        return "actIconCircle";
    };
    AuctionIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(AuctionWin);
        Auction.ins().sendGetList(0);
        if (this.firstTap) {
            if (Auction.ins().checkRed())
                this.firstTap = false;
            this.update();
        }
    };
    return AuctionIconRule;
}(RuleIconBase));
__reflect(AuctionIconRule.prototype, "AuctionIconRule");
//# sourceMappingURL=AuctionIconRule.js.map