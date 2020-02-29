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
var LadderInfoPanel = (function (_super) {
    __extends(LadderInfoPanel, _super);
    function LadderInfoPanel() {
        var _this = _super.call(this) || this;
        _this.name = "\u5929\u68AF";
        return _this;
    }
    LadderInfoPanel.prototype.childrenCreated = function () {
        this.rewardList.itemRenderer = ItemBase;
    };
    LadderInfoPanel.prototype.open = function () {
        this.buyTime.textFlow = new egret.HtmlTextParser().parser("<u>\u8D2D\u4E70\u5339\u914D\u6B21\u6570</u>");
        this.showNomber.textFlow = new egret.HtmlTextParser().parser("<u>\u67E5\u770B\u6392\u540D</u>");
        this.showReward.textFlow = new egret.HtmlTextParser().parser("<u>\u67E5\u770B\u5956\u52B1</u>");
        this.showNomber0.textFlow = new egret.HtmlTextParser().parser("<u>\u4E0A\u5468\u6392\u540D</u>");
        this.addTouchEvent(this.flowPlayer, this.onTap);
        this.addTouchEvent(this.buyTime, this.onTap);
        this.addTouchEvent(this.showNomber, this.onTap);
        this.addTouchEvent(this.showReward, this.onTap);
        this.addTouchEvent(this.showNomber0, this.onTap);
        this.observe(Ladder.ins().postTadderChange, this.tadderInfoChange);
        this.observe(Ladder.ins().postRankInfoList, this.tadderInfoChange);
        Ladder.ins().sendGetRankInfo();
        this.tadderInfoChange();
    };
    LadderInfoPanel.prototype.$onClose = function () {
        _super.prototype.$onClose.call(this);
        TimerManager.ins().removeAll(this);
    };
    LadderInfoPanel.prototype.updateTime = function () {
        var v = Ladder.ins().challgeNum;
        var mv = GlobalConfig.TianTiConstConfig.maxRestoreChallengesCount;
        var color = v > 0 ? "2ECA22" : "f3311e";
        var time = Math.round((Ladder.ins().challgeCd - egret.getTimer()) / 1000);
        time = time <= 0 ? 0 : time;
        var str = v >= mv ? "(2\u5C0F\u65F6\u6062\u590D1\u6B21)" : "(\u6062\u590D\u5012\u8BA1\u65F6\uFF1A" + DateUtils.getFormatBySecond(time) + ")";
        this.lastNum.textFlow = new egret.HtmlTextParser().parser("<font color=\"#" + color + "\">\u5269\u4F59\u6B21\u6570\uFF1A" + v + "/" + mv + " <font color=\"#7E6437\">" + str + "</font></font>");
    };
    LadderInfoPanel.prototype.tadderInfoChange = function () {
        TimerManager.ins().remove(this.updateTime, this);
        TimerManager.ins().doTimer(500, 0, this.updateTime, this);
        this.updateTime();
        var rankModel = Rank.ins().rankModel[RankDataType.TYPE_LADDER];
        if (rankModel)
            this.winNum0.text = rankModel.selfPos > 0 ? "" + rankModel.selfPos : "\u672A\u4E0A\u699C";
        this.winNum.text = "" + Ladder.ins().winNum;
        this.duanwei.text = Ladder.ins().getDuanWeiDesc();
        var config = Ladder.ins().getLevelConfig();
        if (config) {
            this.rewardList.dataProvider = new eui.ArrayCollection(config.danAward);
        }
        this.winImg.visible = Ladder.ins().lianWin;
        this.starInfo.updataStarInfo(config);
        this.starInfo.setLvAndRank(config);
        this.noOpenDesc.visible = !Ladder.ins().isOpen;
        this.openInfo.visible = Ladder.ins().isOpen;
    };
    LadderInfoPanel.prototype.onTap = function (e) {
        ViewManager.ins().close(LimitTaskView);
        switch (e.currentTarget) {
            case this.flowPlayer:
                if (UserFb.ins().checkInFB())
                    return;
                if (Ladder.ins().challgeNum <= 0) {
                    UserTips.ins().showTips("|C:0xf3311e&T:\u6311\u6218\u6B21\u6570\u4E0D\u8DB3|");
                    return;
                }
                if (ViewManager.ins().isShow(LadderChallengeWin)) {
                    return;
                }
                ViewManager.ins().open(LadderChallengeWin);
                break;
            case this.buyTime:
                if (Ladder.ins().todayBuyTime == GlobalConfig.TianTiConstConfig.maxBuyChallengesCount) {
                    UserTips.ins().showTips("|C:0xf3311e&T:\u4ECA\u65E5\u8D2D\u4E70\u6B21\u6570\u5DF2\u8FBE\u4E0A\u9650|");
                    return;
                }
                if (Actor.yb < GlobalConfig.TianTiConstConfig.buyChallengesCountYuanBao) {
                    UserTips.ins().showTips("|C:0xf3311e&T:\u5143\u5B9D\u4E0D\u8DB3|");
                    return;
                }
                WarnWin.show("\u786E\u5B9A\u82B1\u8D39<font color='#FFB82A'>" + GlobalConfig.TianTiConstConfig.buyChallengesCountYuanBao + "\u5143\u5B9D</font>\u8D2D\u4E701\u6B21\u738B\u8005\u4E89\u9738\u6311\u6218\u6B21\u6570\u5417\uFF1F\n" +
                    ("\u4ECA\u65E5\u5DF2\u8D2D\u4E70\uFF1A" + Ladder.ins().todayBuyTime + "/" + GlobalConfig.TianTiConstConfig.maxBuyChallengesCount), function () {
                    Ladder.ins().sendBuyChallgeTime();
                }, this);
                break;
            case this.showReward:
                ViewManager.ins().open(LadderRewardShowWin);
                break;
            case this.showNomber:
                ViewManager.ins().open(LadderLastRankWin, 1);
                break;
            case this.showNomber0:
                if (Ladder.ins().upLevel > 0)
                    ViewManager.ins().open(LadderLastRankWin, 0);
                else
                    UserTips.ins().showTips("|C:0xf3311e&T:\u6682\u65E0\u4E0A\u5468\u6392\u884C\u6570\u636E|");
                break;
        }
    };
    return LadderInfoPanel;
}(BaseComponent));
__reflect(LadderInfoPanel.prototype, "LadderInfoPanel");
//# sourceMappingURL=LadderInfoPanel.js.map