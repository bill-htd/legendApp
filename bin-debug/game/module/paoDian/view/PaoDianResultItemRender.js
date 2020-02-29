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
var PaoDianResultItemRender = (function (_super) {
    __extends(PaoDianResultItemRender, _super);
    function PaoDianResultItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "PointResultItemSkin";
        return _this;
    }
    PaoDianResultItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.award.itemRenderer = PaoDianIconItemRender;
    };
    PaoDianResultItemRender.prototype.dataChanged = function () {
        var vo = this.data;
        this.ranking.text = vo.rank + "";
        this.roleName.text = vo.roleName;
        this.guild.text = vo.unionName;
        this.award.dataProvider = new ArrayCollection([["ZSprestige", vo.jadeChips], ["ZSexp", vo.shenBingExp]]);
    };
    return PaoDianResultItemRender;
}(BaseItemRender));
__reflect(PaoDianResultItemRender.prototype, "PaoDianResultItemRender");
//# sourceMappingURL=PaoDianResultItemRender.js.map