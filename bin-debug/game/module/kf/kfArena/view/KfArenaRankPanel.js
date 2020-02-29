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
var KfArenaRankPanel = (function (_super) {
    __extends(KfArenaRankPanel, _super);
    function KfArenaRankPanel() {
        var _this = _super.call(this) || this;
        _this.name = "\u6392\u884C";
        return _this;
    }
    KfArenaRankPanel.prototype.childrenCreated = function () {
        this.list.itemRenderer = KfArenaRankItemRender;
        this.rankDatas = new eui.ArrayCollection();
        this.list.dataProvider = this.rankDatas;
        this.rank0.index = 0;
        this.rank1.index = 1;
        this.rank2.index = 2;
        this.firstGroup.visible = false;
        this.state.visible = true;
        this.serverId0.text = "";
        this.vip0.visible = false;
        this.firstNameTxt0.text = "";
        this.score0.text = "";
        this.seasonTitle0.text = "";
    };
    KfArenaRankPanel.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.observe(KfArenaSys.ins().postRank, this.upData);
        this.observe(UserReadPlayer.ins().postPlayerResult, this.openOtherPlayer);
        KfArenaSys.ins().sendRank();
    };
    KfArenaRankPanel.prototype.upData = function () {
        var firstData = KfArenaSys.ins().rankDataList.shift();
        this.rankDatas.replaceAll(KfArenaSys.ins().rankDataList);
        this.selfPos0.text = KfArenaSys.ins().ownRank;
        if (!firstData)
            return;
        this.firstGroup.visible = true;
        this.state.visible = false;
        this.reward0.data = GlobalConfig.CrossArenaBase.rankAward[firstData.rank].mail.tAwardList[0];
        this.serverId0.text = "S" + firstData.servId;
        this.vip0.visible = firstData.vip > 0;
        this.firstNameTxt0.text = firstData.playerName;
        this.score0.text = firstData.score + "";
        this.seasonTitle0.text = KfArenaSys.ins().duanName[firstData.dan];
        UserReadPlayer.ins().sendFindPlayer(firstData.playerId, firstData.servId);
    };
    KfArenaRankPanel.prototype.openOtherPlayer = function (otherPlayerData) {
        this.rank0.data = { otherPlayerData: otherPlayerData };
        this.rank1.data = { otherPlayerData: otherPlayerData };
        this.rank2.data = { otherPlayerData: otherPlayerData };
    };
    return KfArenaRankPanel;
}(BaseEuiView));
__reflect(KfArenaRankPanel.prototype, "KfArenaRankPanel");
//# sourceMappingURL=KfArenaRankPanel.js.map