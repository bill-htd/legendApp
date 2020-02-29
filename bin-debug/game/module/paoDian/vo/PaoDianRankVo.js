var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PaoDianRankVo = (function () {
    function PaoDianRankVo(bytes) {
        this.rank = bytes.readShort();
        this.roleName = bytes.readString();
        this.unionName = bytes.readString();
        this.shenBingExp = bytes.readInt();
        this.jadeChips = bytes.readInt();
    }
    return PaoDianRankVo;
}());
__reflect(PaoDianRankVo.prototype, "PaoDianRankVo");
//# sourceMappingURL=PaoDianRankVo.js.map