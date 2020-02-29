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
var LadderRewardShowWin = (function (_super) {
    __extends(LadderRewardShowWin, _super);
    function LadderRewardShowWin() {
        var _this = _super.call(this) || this;
        _this.isTopLevel = true;
        _this.skinName = "ladderinforewardskin";
        return _this;
    }
    LadderRewardShowWin.prototype.createChildren = function () {
        this.list0.itemRenderer = LastWeekRankItemRenderer;
        this.list1.itemRenderer = ItemBase;
    };
    LadderRewardShowWin.prototype.open = function () {
        this.setPanelInfo();
    };
    LadderRewardShowWin.prototype.close = function () {
    };
    LadderRewardShowWin.prototype.setPanelInfo = function () {
        var data = Ladder.ins().upRankList;
        if (data.length > 5) {
            data = data.slice(0, 5);
        }
        this.list0.dataProvider = new eui.ArrayCollection(data);
        var duanwei = Ladder.ins().configList;
        var reward = this.getRewardDataList(duanwei);
        this.list1.dataProvider = new eui.ArrayCollection(reward);
        this.winNum.text = "\u51C0\u80DC\u573A\uFF1A" + Ladder.ins().upWin + "\u573A";
        this.winNum0.text = "\u6392\u540D\uFF1A" + (Ladder.ins().upWeekRank > 0 ? "" + Ladder.ins().upWeekRank : "\u672A\u4E0A\u699C");
        if (Ladder.ins().playUpTime) {
            this.upImg.source = "ladder_rank_" + Ladder.ins().upLevel;
            var config = Ladder.ins().getLevelConfig(Ladder.ins().upLevel, Ladder.ins().upId);
            if (config.showDan > 0) {
                this.levelbg.visible = true;
                this.level.source = 'laddergradnum_' + config.showDan;
            }
            else {
                this.levelbg.visible = false;
                this.level.source = null;
            }
        }
        else {
            this.upImg.source = "ladder_rank_1";
            this.level.source = 'laddergradnum_' + 5;
        }
    };
    LadderRewardShowWin.prototype.getRewardDataList = function (cfgList) {
        var list = [];
        for (var i = 0; i < cfgList.length; i++) {
            list = list.concat(cfgList[i].danAward);
        }
        return list;
    };
    LadderRewardShowWin.openCheck = function () {
        if (!Ladder.ins().configList) {
            UserTips.ins().showTips("\u7F51\u7EDC\u4E0D\u4F73\uFF0C\u8BF7\u7A0D\u540E");
            return false;
        }
        return true;
    };
    return LadderRewardShowWin;
}(BaseEuiView));
__reflect(LadderRewardShowWin.prototype, "LadderRewardShowWin");
ViewManager.ins().reg(LadderRewardShowWin, LayerManager.UI_Main);
//# sourceMappingURL=LadderRewardShowWin.js.map