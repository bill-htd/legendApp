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
var BattleRewardItemRender = (function (_super) {
    __extends(BattleRewardItemRender, _super);
    function BattleRewardItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "BattleRewarrdItemSkin";
        return _this;
    }
    BattleRewardItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.awards.itemRenderer = ItemBase;
        this._arrayCollect = new eui.ArrayCollection();
        this.awards.dataProvider = this._arrayCollect;
    };
    BattleRewardItemRender.prototype.dataChanged = function () {
        var cfg = this.data;
        this.rank.text = "第" + cfg.rank + "名";
        this._arrayCollect.source = cfg.award;
    };
    return BattleRewardItemRender;
}(BaseItemRender));
__reflect(BattleRewardItemRender.prototype, "BattleRewardItemRender");
//# sourceMappingURL=BattleRewardItemRender.js.map