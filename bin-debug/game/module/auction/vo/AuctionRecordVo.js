var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AuctionRecordVo = (function () {
    function AuctionRecordVo(bytes) {
        this.type = 0;
        this.parser(bytes);
    }
    AuctionRecordVo.prototype.parser = function (bytes) {
        this.aId = bytes.readInt();
        this.roleName = bytes.readString();
        this.state = bytes.readByte();
        this.price = bytes.readInt();
        this.time = bytes.readInt();
    };
    return AuctionRecordVo;
}());
__reflect(AuctionRecordVo.prototype, "AuctionRecordVo");
//# sourceMappingURL=AuctionRecordVo.js.map