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
var BattleScoreRankPanel = (function (_super) {
    __extends(BattleScoreRankPanel, _super);
    function BattleScoreRankPanel() {
        return _super.call(this) || this;
    }
    BattleScoreRankPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.list.itemRenderer = BattleRankItemRender;
        this._arrayCllect = new eui.ArrayCollection();
        this.list.dataProvider = this._arrayCllect;
    };
    BattleScoreRankPanel.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.observe(BattleCC.ins().postRankInfo, this.update);
        this.observe(BattleCC.ins().postScoreChange, this.updateMyScore);
        this.update();
        this.updateMyScore();
    };
    BattleScoreRankPanel.prototype.close = function () {
        this.removeObserve();
    };
    BattleScoreRankPanel.prototype.update = function () {
        this._arrayCllect.source = BattleCC.ins().battleRanks;
    };
    BattleScoreRankPanel.prototype.updateMyScore = function () {
        this.myScore.text = BattleCC.ins().myScore + "";
        this.myRank.text = "我的排名：" + BattleCC.ins().myRank;
    };
    return BattleScoreRankPanel;
}(BaseEuiView));
__reflect(BattleScoreRankPanel.prototype, "BattleScoreRankPanel");
//# sourceMappingURL=BattleScoreRankPanel.js.map