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
var BattleRankItemRender = (function (_super) {
    __extends(BattleRankItemRender, _super);
    function BattleRankItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "BattleScoreRankItem";
        return _this;
    }
    BattleRankItemRender.prototype.dataChanged = function () {
        var vo = this.data;
        var isTop = vo.rank <= 3;
        this.rankImg.source = isTop ? "paihang" + vo.rank : null;
        this.rank.text = isTop ? "" : vo.rank + "";
        this.nameLabel.text = vo.roleName;
        this.nameGuild.text = vo.unionName;
        this.score.text = vo.score + "";
    };
    return BattleRankItemRender;
}(BaseItemRender));
__reflect(BattleRankItemRender.prototype, "BattleRankItemRender");
//# sourceMappingURL=BattleRankItemRender.js.map