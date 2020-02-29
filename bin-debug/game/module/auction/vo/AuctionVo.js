var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AuctionVo = (function () {
    function AuctionVo(bytes) {
        this.parser(bytes);
    }
    AuctionVo.prototype.parser = function (bytes) {
        this.type = bytes.readByte();
        this.endTime = bytes.readInt();
        this.id = bytes.readInt();
        this.putAwayTime = bytes.readInt();
        this.aID = bytes.readInt();
        this.auctionTimes = bytes.readByte();
        this.myAuPrice = bytes.readByte();
        this.owner = bytes.readByte();
    };
    return AuctionVo;
}());
__reflect(AuctionVo.prototype, "AuctionVo");
//# sourceMappingURL=AuctionVo.js.map