var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SpringBeginShopVo = (function () {
    function SpringBeginShopVo() {
        this.discount = 0;
    }
    SpringBeginShopVo.prototype.parser = function (bytes) {
        this.id = bytes.readInt();
        this.itemID = bytes.readInt();
        this.itemCount = bytes.readShort();
        this.price = bytes.readInt();
        this.discount = bytes.readByte();
        this.state = bytes.readByte();
        this.buyCount = bytes.readByte();
        this.buyMax = bytes.readByte();
        this.materialNum = bytes.readShort();
    };
    SpringBeginShopVo.prototype.parser2 = function (bytes) {
        this.id = bytes.readInt();
        this.itemID = bytes.readInt();
        this.itemCount = bytes.readShort();
        this.score = bytes.readInt();
    };
    SpringBeginShopVo.prototype.parser3 = function (bytes) {
        this.itemID = bytes.readInt();
        this.buyCount = bytes.readByte();
        this.buyMax = bytes.readByte();
    };
    return SpringBeginShopVo;
}());
__reflect(SpringBeginShopVo.prototype, "SpringBeginShopVo");
//# sourceMappingURL=SpringBeginShopVo.js.map