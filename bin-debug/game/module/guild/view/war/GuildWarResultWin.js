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
var GuildWarResultWin = (function (_super) {
    __extends(GuildWarResultWin, _super);
    function GuildWarResultWin() {
        return _super.call(this) || this;
    }
    GuildWarResultWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.isTopLevel = true;
        this.skinName = "GuildWarResultSkin";
        this.closeBtn.label = "确定";
        this.list1.itemRenderer = ItemBase;
        this.list2.itemRenderer = ItemBase;
    };
    GuildWarResultWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.guildName.text = param[0] == "" ? "虚位以待" : param[0];
        this.myPoint.text = param[1] + "";
        this.guildPoint.text = "" + param[2];
        this.guildRank.text = "第" + param[3] + "名";
        this.myRank.text = param[4] > 0 ? "第" + param[4] + "名" : "未上榜";
        var pointReward = GuildWar.ins().getModel().getRewardByPoint(param[1]);
        var pointRank = GuildWar.ins().getModel().getMyPointRankReward(param[4]);
        this.list1.dataProvider = new eui.ArrayCollection(pointRank.concat(pointReward));
        this.list2.dataProvider = new eui.ArrayCollection(GuildWar.ins().getModel().creatGuildRankReward(param[3]));
        this.s = 10;
        this.addTouchEvent(this.closeBtn, this.onTap);
    };
    GuildWarResultWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
    };
    GuildWarResultWin.prototype.onTap = function () {
        ViewManager.ins().close(GuildWarResultWin);
    };
    return GuildWarResultWin;
}(BaseEuiView));
__reflect(GuildWarResultWin.prototype, "GuildWarResultWin");
ViewManager.ins().reg(GuildWarResultWin, LayerManager.UI_Popup);
//# sourceMappingURL=GuildWarResultWin.js.map