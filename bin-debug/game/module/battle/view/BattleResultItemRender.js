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
var BattleResultItemRender = (function (_super) {
    __extends(BattleResultItemRender, _super);
    function BattleResultItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "BattleResultItem";
        return _this;
    }
    BattleResultItemRender.prototype.dataChanged = function () {
        var vo = this.data;
        this.ranking.text = vo.rank + "";
        this.roleName.text = vo.roleName;
        this.guild.text = vo.unionName;
        this.score.text = vo.score + "";
    };
    return BattleResultItemRender;
}(BaseItemRender));
__reflect(BattleResultItemRender.prototype, "BattleResultItemRender");
//# sourceMappingURL=BattleResultItemRender.js.map