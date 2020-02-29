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
var AuctionRecordWin = (function (_super) {
    __extends(AuctionRecordWin, _super);
    function AuctionRecordWin() {
        var _this = _super.call(this) || this;
        _this.type = 0;
        _this.skinName = "auctionRecordSkin";
        return _this;
    }
    AuctionRecordWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.list.itemRenderer = AuctionRecordItemRender;
    };
    AuctionRecordWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.type = param[0];
        this.observe(Auction.ins().postRecord, this.update);
        this.curAuction.textFlow = TextFlowMaker.generateTextFlow("\u62CD\u5356\u7EAA\u5F55(" + (this.type ? "\u5168\u670D" : "\u516C\u4F1A") + ")");
        this.null.visible = true;
        Auction.ins().sendRecord(this.type);
        this.addTouchEndEvent(this, this.onTouch);
    };
    AuctionRecordWin.prototype.onTouch = function (e) {
        if (e.target == this.bgClose)
            ViewManager.ins().close(this);
    };
    AuctionRecordWin.prototype.update = function (param) {
        if (!this.collect) {
            this.collect = new ArrayCollection();
            this.list.dataProvider = this.collect;
        }
        if (param.type != this.type)
            return;
        this.collect.source = param.list;
        this.null.visible = !this.collect.source || this.collect.source.length <= 0;
    };
    return AuctionRecordWin;
}(BaseEuiView));
__reflect(AuctionRecordWin.prototype, "AuctionRecordWin");
ViewManager.ins().reg(AuctionRecordWin, LayerManager.UI_Popup);
//# sourceMappingURL=AuctionRecordWin.js.map