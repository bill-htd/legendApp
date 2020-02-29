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
var AuctionRecordItemRender = (function (_super) {
    __extends(AuctionRecordItemRender, _super);
    function AuctionRecordItemRender() {
        return _super.call(this) || this;
    }
    AuctionRecordItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    AuctionRecordItemRender.prototype.dataChanged = function () {
        var vo = this.data;
        var cfg = GlobalConfig.AuctionItem[vo.aId];
        this.item.data = cfg.item;
        this.playerName.text = vo.roleName;
        this.price.text = vo.price + "";
        this.successTime.text = DateUtils.getFormatBySecond(Math.floor(DateUtils.formatMiniDateTime(vo.time) / 1000), DateUtils.TIME_FORMAT_15);
        this.text1.text = vo.state ? (vo.state == 1 ? "\u7ADE\u62CD\u4EF7\u6210\u4EA4" : "\u4E00\u53E3\u4EF7\u6210\u4EA4") : (vo.type == 0 ? "\u6D41\u62CD\u5230\u5168\u670D" : "\u6D41\u62CD");
    };
    return AuctionRecordItemRender;
}(BaseItemRender));
__reflect(AuctionRecordItemRender.prototype, "AuctionRecordItemRender");
//# sourceMappingURL=AuctionRecordItemRender.js.map