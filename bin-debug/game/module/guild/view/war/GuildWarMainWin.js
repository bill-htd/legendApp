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
var GuildWarMainWin = (function (_super) {
    __extends(GuildWarMainWin, _super);
    function GuildWarMainWin() {
        return _super.call(this) || this;
    }
    GuildWarMainWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.isTopLevel = true;
        this.redEff = new MovieClip;
        this.enterEff = new MovieClip;
        this.titleEff = new MovieClip();
        this.skinName = "GuildWarMainSkin";
        this.roleEff = new MovieClip;
        this.player.addChild(this.roleEff);
    };
    GuildWarMainWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.practiseBtn, this.onTap);
        this.addTouchEvent(this.redBag, this.onTap);
        this.addTouchEvent(this.play, this.onTap);
        this.addTouchEvent(this.practiseBtn2, this.onTap);
        this.addTouchEvent(this.practiseBtn0, this.onTap);
        this.addTouchEvent(this.help, this.onTap);
        this.addTouchEvent(this.practiseBtn1, this.onTap);
        this.observe(GuildWar.ins().postDayRewardInfo, this.refushRewardStatu);
        this.observe(GuildWar.ins().postGuildRedPointChange, this.refushRewardStatu);
        this.observe(GuildWar.ins().postJoinPlayBack, this.refushStartEffect);
        this.practiseBtn1.visible = (GuildWar.ins().getModel().guildRankList.length > 0 && !GuildWar.ins().getModel().isWatStart);
        this.refushPanelInfo();
        this.refushStartEffect();
        this.refushTitleEffect();
        this.observe(GuildRedPoint.ins().postRedBag, this.updateRedBag);
        this.observe(GuildRedPoint.ins().postDayReward, this.updateRedBag);
        this.updateRedBag();
    };
    GuildWarMainWin.prototype.updateRedBag = function () {
        this.redBag.visible = GuildRedPoint.ins().redBag;
        this.redPoint0.visible = GuildRedPoint.ins().dayReward;
    };
    GuildWarMainWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        ViewManager.ins().open(GuildMap);
    };
    GuildWarMainWin.prototype.refushPanelInfo = function () {
        if (GuildWar.ins().getModel().isWatStart)
            this.openDesc.text = "";
        else
            this.openDesc.text = GuildWar.ins().getModel().setOpenDesc();
        this.refushRewardStatu();
        this.refushWinGuild();
    };
    GuildWarMainWin.prototype.refushStartEffect = function () {
        if (GuildWar.ins().getModel().isWatStart) {
            this.enterEff.playFile(RES_DIR_EFF + "chargeff1", -1);
            this.enterEff.x = this.play.width >> 1;
            this.enterEff.y = this.play.height >> 1;
            this.play.addChild(this.enterEff);
        }
        else {
            DisplayUtils.removeFromParent(this.enterEff);
        }
    };
    GuildWarMainWin.prototype.refushTitleEffect = function () {
        this.titleEff.playFile(RES_DIR_EFF + "chenghaolcbz", -1);
        this.titleGroup.addChild(this.titleEff);
    };
    GuildWarMainWin.prototype.refushRewardStatu = function () {
        if (GuildWar.ins().getModel().canSend || GuildWar.ins().getModel().canRod) {
            this.redEff.playFile(RES_DIR_EFF + "actIconCircle", -1);
            this.redEff.x = this.redEff.y = 28;
            this.redBag.addChild(this.redEff);
        }
        else {
            DisplayUtils.removeFromParent(this.redEff);
        }
    };
    GuildWarMainWin.prototype.refushWinGuild = function () {
        var show = GuildWar.ins().getModel().winGuildInfo.guildId > 0;
        this.guildOwn.visible = show;
        this.guildName.visible = show;
        this.roleEff.visible = show;
        this.none.visible = !show;
        if (show) {
            var data = GuildWar.ins().getModel().winGuildInfo;
            this.guildName.text = data.guildName;
            this.guildOwn.text = data.guildOwnName;
            var effstr = data.guildOwnSex == 1 ? "junzhunv" : "junzhunan";
            this.roleEff.playFile(RES_DIR_EFF + effstr, -1);
        }
    };
    GuildWarMainWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
                ViewManager.ins().close(GuildWarMainWin);
                break;
            case this.practiseBtn:
                ViewManager.ins().open(GuildWarRewardWin);
                break;
            case this.redBag:
                if (GuildWar.ins().getModel().canRod || GuildWar.ins().getModel().canSend)
                    ViewManager.ins().open(RedBagWin);
                else
                    ViewManager.ins().open(RedBagDetailsWin);
                break;
            case this.play:
                if (!GuildWar.ins().getModel().isWatStart) {
                    UserTips.ins().showTips("|C:0xf3311e&T:活动未开启|");
                    return;
                }
                ViewManager.ins().close(GuildMap);
                ViewManager.ins().close(GuildWarMainWin);
                GuildWar.ins().requestJoinAc();
                break;
            case this.practiseBtn0:
                ViewManager.ins().open(DailypresidentAwardPanel);
                break;
            case this.practiseBtn2:
                ViewManager.ins().open(DailyAwardPanel);
                break;
            case this.help:
                ViewManager.ins().open(ZsBossRuleSpeak, 8);
                break;
            case this.practiseBtn1:
                ViewManager.ins().open(GuildWarRewardWin, 0, 1);
                break;
        }
    };
    return GuildWarMainWin;
}(BaseEuiView));
__reflect(GuildWarMainWin.prototype, "GuildWarMainWin");
ViewManager.ins().reg(GuildWarMainWin, LayerManager.UI_Main);
//# sourceMappingURL=GuildWarMainWin.js.map