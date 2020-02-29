var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var EquipsData = (function () {
    function EquipsData() {
    }
    EquipsData.prototype.parser = function (bytes) {
        this.strengthen = bytes.readInt();
        this.spiritLv = bytes.readInt();
        this.gem = bytes.readInt();
        this.item = new ItemData;
        this.item.parser(bytes);
        this.zhuling = bytes.readInt();
        this.soulLv = bytes.readInt();
        this.bless = bytes.readInt();
        this.spiritExp = bytes.readInt();
    };
    return EquipsData;
}());
__reflect(EquipsData.prototype, "EquipsData");
//# sourceMappingURL=EquipsData.js.map