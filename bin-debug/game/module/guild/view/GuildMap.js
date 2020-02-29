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
var GuildMap = (function (_super) {
    __extends(GuildMap, _super);
    function GuildMap() {
        return _super.call(this) || this;
    }
    GuildMap.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.isTopLevel = true;
        this.skinName = "GuildSkin";
        this.list.itemRenderer = GuildMapMemberItemRender;
        this.guildWarEffect2 = new MovieClip;
        this.guildRewardEff = new MovieClip;
        this.guildRewardEff.touchEnabled = true;
    };
    GuildMap.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        return true;
    };
    GuildMap.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.manageBtn, this.onTap);
        this.addTouchEvent(this.practiseBtn, this.onTap);
        this.addTouchEvent(this.shopBtn, this.onTap);
        this.addTouchEvent(this.cityBtn, this.onTap);
        this.addTouchEvent(this.chatBtn, this.onTap);
        this.addTouchEvent(this.guildRewardEff, this.onTap);
        this.observe(GuildRedPoint.ins().postGuildFire, this.updateRedpoint);
        this.observe(GuildBoss.ins().postGuildBossDetailChange, this.updateRedpoint);
        Guild.ins().sendMyGuildInfo();
        GuildWar.ins().requestGuildRank();
        GuildBoss.ins().sendGetBossInfo();
        this.updateRedpoint();
        if (GuildRobber.ins().isUpdateRobber) {
            GuildRobber.ins().isUpdateRobber = false;
            GuildRobber.ins().sendRobberInfo();
        }
        this.observe(GuildWar.ins().postGuildWarStarInfo, this.refushGuildwarEffect);
        this.refushGuildwarEffect();
        this.observe(GuildRedPoint.ins().postSendReward, this.updateSendBtnStatu);
        this.updateSendBtnStatu();
        this.observe(GuildRedPoint.ins().postSczb, this.updateGuildPoint);
        this.updateGuildPoint();
        this.observe(GuildRedPoint.ins().postHhdt, this.hhdtRed);
        this.hhdtRed();
        this.observe(GuildRedPoint.ins().postHanghuiBoss, this.updateBossPoint);
        this.updateBossPoint();
        this.observe(Guild.ins().postGuildMembers, this.updateList);
        this.updateList();
    };
    GuildMap.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        DisplayUtils.removeFromParent(this.guildWarEffect2);
        DisplayUtils.removeFromParent(this.guildRewardEff);
    };
    GuildMap.prototype.hhdtRed = function () {
        this.redPoint0.visible = GuildRedPoint.ins().hhdt;
    };
    GuildMap.prototype.updateRedpoint = function () {
        this.redPoint1.visible = GuildRedPoint.ins().guildFire || GuildRedPoint.ins().liangongRed;
    };
    GuildMap.prototype.updateGuildPoint = function () {
        this.redPoint2.visible = GuildRedPoint.ins().sczb;
    };
    GuildMap.prototype.updateBossPoint = function () {
        this.redPoint3.visible = GuildRedPoint.ins().hhBoss;
    };
    GuildMap.prototype.updateList = function () {
        this.list.dataProvider = new eui.ArrayCollection(Guild.ins().getGuildMembers(2));
    };
    GuildMap.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
                ViewManager.ins().close(GuildMap);
                break;
            case this.practiseBtn:
                ViewManager.ins().close(GuildMap);
                ViewManager.ins().open(GuildSkillWin);
                break;
            case this.manageBtn:
                ViewManager.ins().close(GuildMap);
                ViewManager.ins().open(GuildWin);
                break;
            case this.cityBtn:
                GuildWar.ins().requestWinGuildInfo();
                ViewManager.ins().close(GuildMap);
                ViewManager.ins().open(GuildWarMainWin);
                break;
            case this.shopBtn:
                ViewManager.ins().open(GuildBossWin);
                break;
            case this.chatBtn:
                ViewManager.ins().open(ChatWin);
                break;
            case this.guildRewardEff:
                ViewManager.ins().open(SelectMemberRewardWin);
                break;
        }
    };
    GuildMap.prototype.updateSendBtnStatu = function () {
        if (GuildRedPoint.ins().sendReward) {
            this.guildRewardEff.playFile(RES_DIR_EFF + "giftShake", -1);
            this.reward.addChild(this.guildRewardEff);
        }
        else {
            DisplayUtils.removeFromParent(this.guildRewardEff);
        }
    };
    GuildMap.prototype.refushGuildwarEffect = function () {
        if (GuildWar.ins().getModel().isWatStart) {
            this.guildWarEffect2.playFile(RES_DIR_EFF + "swordSparkEff", -1);
            this.guildWarEffect2.x = 28;
            this.guildWarEffect2.y = 30;
            this.cityBtn.addChild(this.guildWarEffect2);
        }
        else {
            DisplayUtils.removeFromParent(this.guildWarEffect2);
        }
    };
    return GuildMap;
}(BaseEuiView));
__reflect(GuildMap.prototype, "GuildMap");
ViewManager.ins().reg(GuildMap, LayerManager.UI_Popup);
//# sourceMappingURL=GuildMap.js.map