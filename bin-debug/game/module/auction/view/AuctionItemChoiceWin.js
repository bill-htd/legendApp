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
var AuctionItemChoiceWin = (function (_super) {
    __extends(AuctionItemChoiceWin, _super);
    function AuctionItemChoiceWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "auctionItemChoiceSkin";
        _this.isTopLevel = true;
        return _this;
    }
    AuctionItemChoiceWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    AuctionItemChoiceWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.itemID = param[0];
        this.auID = param[1];
        this.addTouchEndEvent(this, this.onTouch);
        this.update();
    };
    AuctionItemChoiceWin.prototype.update = function () {
        var cfg = GlobalConfig.AuctionItem[this.auID];
        this.item.data = cfg.item;
        this.price1.text = cfg.bid + "";
        this.price2.text = cfg.buy + "";
    };
    AuctionItemChoiceWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
            case this.ownUse:
            case this.auctionBtn:
                Auction.ins().sendUseAuBox(e.target == this.ownUse ? 0 : 1, this.itemID);
                ViewManager.ins().close(this);
                break;
        }
    };
    return AuctionItemChoiceWin;
}(BaseEuiView));
__reflect(AuctionItemChoiceWin.prototype, "AuctionItemChoiceWin");
ViewManager.ins().reg(AuctionItemChoiceWin, LayerManager.UI_Main);
//# sourceMappingURL=AuctionItemChoiceWin.js.map