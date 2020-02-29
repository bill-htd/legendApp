var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BattleRankVo = (function () {
    function BattleRankVo() {
    }
    BattleRankVo.prototype.parse = function (bytes) {
        this.rank = bytes.readShort();
        this.camp = bytes.readShort();
        this.roleName = bytes.readString();
        this.unionName = bytes.readString();
        this.score = bytes.readInt();
    };
    return BattleRankVo;
}());
__reflect(BattleRankVo.prototype, "BattleRankVo");
//# sourceMappingURL=BattleRankVo.js.map