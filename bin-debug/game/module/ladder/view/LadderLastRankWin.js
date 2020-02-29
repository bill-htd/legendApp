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
var LadderLastRankWin = (function (_super) {
    __extends(LadderLastRankWin, _super);
    function LadderLastRankWin() {
        var _this = _super.call(this) || this;
        _this.isTopLevel = true;
        _this.skinName = "ladderinforankingskin";
        return _this;
    }
    LadderLastRankWin.prototype.createChildren = function () {
        this.list.itemRenderer = LadderRankItemRenderer;
    };
    LadderLastRankWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var type = param[0];
        this.setPanelInfo(type);
        this.titleDesc.text = type == 1 ? "\u672C\u5468\u6392\u540D" : "\u4E0A\u5468\u6392\u540D";
        this.rankDesc.text = type == 1 ? "\u6211\u7684\u6218\u7EE9" : "\u6211\u7684\u4E0A\u5468\u6218\u7EE9";
    };
    LadderLastRankWin.prototype.close = function () {
    };
    LadderLastRankWin.prototype.setPanelInfo = function (type) {
        var config = Ladder.ins().getLevelConfig();
        if (type == 1) {
            var rankModel = Rank.ins().rankModel[RankDataType.TYPE_LADDER];
            this.list.dataProvider = new eui.ArrayCollection(rankModel.getDataList() ? rankModel.getDataList() : []);
            this.myRank.text = rankModel.selfPos > 0 ? "\u6392\u540D\uFF1A" + rankModel.selfPos : "\u6392\u540D\uFF1A\u672A\u4E0A\u699C";
            this.WinNum.text = "\u51C0\u80DC\u573A\uFF1A" + Ladder.ins().winNum + "\u573A";
            this.myDwIng.source = "ladder_rank_" + Ladder.ins().level;
            config = Ladder.ins().getLevelConfig();
        }
        else {
            this.list.dataProvider = new eui.ArrayCollection(Ladder.ins().getUpRankList());
            this.myRank.text = Ladder.ins().upWeekRank > 0 ? "\u6392\u540D\uFF1A" + Ladder.ins().upWeekRank : "\u6392\u540D\uFF1A\u672A\u4E0A\u699C";
            this.WinNum.text = "\u51C0\u80DC\u573A\uFF1A" + Ladder.ins().upWin + "\u573A";
            this.myDwIng.source = "ladder_rank_" + Ladder.ins().upLevel;
            config = Ladder.ins().getLevelConfig(Ladder.ins().upLevel, Ladder.ins().upId);
        }
        if (config.showDan > 0) {
            this.levelBg.visible = true;
            this.level.source = 'laddergradnum_' + config.showDan;
        }
        else {
            this.levelBg.visible = false;
            this.level.source = null;
        }
    };
    return LadderLastRankWin;
}(BaseEuiView));
__reflect(LadderLastRankWin.prototype, "LadderLastRankWin");
ViewManager.ins().reg(LadderLastRankWin, LayerManager.UI_Main);
//# sourceMappingURL=LadderLastRankWin.js.map