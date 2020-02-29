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
var auction = GameSystem.auction;
var AuctionPanel = (function (_super) {
    __extends(AuctionPanel, _super);
    function AuctionPanel() {
        var _this = _super.call(this) || this;
        _this.curPage = 1;
        _this.maxPage = 1;
        _this.type = 0;
        _this.itemCount = 10;
        return _this;
    }
    AuctionPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.list.itemRenderer = AuctionItemRender;
    };
    AuctionPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.type = param[0];
        this.itemCount = GlobalConfig.AuctionConfig.eachPageNumber;
        this.addTouchEndEvent(this, this.onTouch);
        this.observe(Auction.ins().postListData, this.update);
        this.observe(Auction.ins().postAuctionResult, this.update);
        this.observe(Auction.ins().postBuyResult, this.update);
        this.observe(Auction.ins().postUpdate, this.update);
        this.curPage = 1;
        this.update();
        TimerManager.ins().removeAll(this);
        TimerManager.ins().doTimer(10000, 0, this.onSend, this);
    };
    AuctionPanel.prototype.close = function () {
        TimerManager.ins().removeAll(this);
    };
    AuctionPanel.prototype.onSend = function () {
        Auction.ins().sendGetList(this.type);
    };
    AuctionPanel.prototype.update = function () {
        if (!this.collect) {
            this.collect = new ArrayCollection();
            this.list.dataProvider = this.collect;
        }
        this.maxPage = Auction.ins().getMaxPageByType(this.type, this.itemCount);
        if (this.curPage > this.maxPage)
            this.curPage = this.maxPage;
        this.updateCurPage();
        this.add.visible = this.maxPage > 1;
    };
    AuctionPanel.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.btn:
                ViewManager.ins().open(AuctionRecordWin, this.type);
                break;
            case this.minBtn:
                if (this.curPage > 1) {
                    this.curPage--;
                    this.updateCurPage();
                }
                break;
            case this.maxBtn:
                if (this.curPage < this.maxPage) {
                    this.curPage++;
                    this.updateCurPage();
                }
                break;
        }
    };
    AuctionPanel.prototype.updateCurPage = function () {
        var source = Auction.ins().getDataByPage(this.type, this.curPage, this.itemCount);
        var oldSource = this.collect.source;
        if (oldSource && oldSource.length == (source ? source.length : 0)) {
            var len = oldSource.length;
            for (var i = 0; i < len; i++) {
                oldSource[i] = source[i];
                var render = this.list.getElementAt(i);
                if (render)
                    this.list.updateRenderer(render, i, source[i]);
            }
        }
        else
            this.collect.source = source;
        this.null.visible = !this.collect.source || this.collect.source.length <= 0;
        this.pageTxt.text = this.curPage + "/" + this.maxPage;
    };
    return AuctionPanel;
}(BaseEuiView));
__reflect(AuctionPanel.prototype, "AuctionPanel");
//# sourceMappingURL=AuctionPanel.js.map