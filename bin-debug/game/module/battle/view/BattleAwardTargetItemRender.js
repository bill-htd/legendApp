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
var BattleAwardTargetItemRender = (function (_super) {
    __extends(BattleAwardTargetItemRender, _super);
    function BattleAwardTargetItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "BattleTargetItemSkin";
        return _this;
    }
    BattleAwardTargetItemRender.prototype.dataChanged = function () {
        var cfg = this.data[0];
        this.rank.text = cfg.integral + "\n积分";
        this.award.data = cfg.award[0];
        this.already.visible = this.data[1];
    };
    return BattleAwardTargetItemRender;
}(BaseItemRender));
__reflect(BattleAwardTargetItemRender.prototype, "BattleAwardTargetItemRender");
//# sourceMappingURL=BattleAwardTargetItemRender.js.map