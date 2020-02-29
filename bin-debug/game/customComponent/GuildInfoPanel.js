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
var GuildInfoPanel = (function (_super) {
    __extends(GuildInfoPanel, _super);
    function GuildInfoPanel() {
        var _this = _super.call(this) || this;
        _this.isInit = false;
        _this.userGuild = Guild.ins();
        return _this;
    }
    GuildInfoPanel.prototype.childrenCreated = function () {
        this.init();
    };
    GuildInfoPanel.prototype.init = function () {
        this.initUI();
    };
    GuildInfoPanel.prototype.initUI = function () {
        this.checkJoin.textFlow = (new egret.HtmlTextParser).parser("<a href=\"event:\"><u>" + this.checkJoin.text + "</u></a>");
        this.checkJoin.touchEnabled = true;
        this.list.itemRenderer = GuildMemberItem1Render;
        this.eff = new MovieClip();
        this.eff.x = this.checkJoin.x + 40;
        this.eff.y = this.checkJoin.y + 10;
        this.isInit = true;
    };
    GuildInfoPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (!this.isInit)
            this.initUI();
        this.addTouchEvent(this.checkJoin, this.onLinkApply);
        this.addTouchEvent(this.cityBtn, this.onTap);
        this.addTouchEvent(this.conBtn, this.onTap);
        this.addTouchEvent(this.rename, this.onTap);
        this.observe(Guild.ins().postGuildInfo, this.updateGuild);
        this.observe(Guild.ins().postMyGuildInfo, this.updateMyInfo);
        this.observe(Guild.ins().postChangeNotice, this.updateGuild);
        this.observe(Guild.ins().postGuildMoney, this.updateGuild);
        this.observe(Guild.ins().postApplyInfos, this.updateApplys);
        this.observe(Guild.ins().postJoinGuild, this.updateApplys);
        this.observe(Guild.ins().postGuildMembers, this.updateMember);
        this.updateApplys();
        this.updateMyInfo();
        this.updateGuild();
        this.updateMember();
    };
    GuildInfoPanel.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.conBtn:
                ViewManager.ins().open(GuildConWin);
                break;
            case this.cityBtn:
                ViewManager.ins().open(GuildNoticeWin);
                break;
            case this.rename:
                ViewManager.ins().open(GuildChangeNameView);
                break;
        }
    };
    GuildInfoPanel.prototype.updateMyInfo = function () {
        this.myCon.text = this.userGuild.myCon + "";
        this.checkJoin.visible = this.userGuild.myOffice >= GuildOffice.GUILD_FUBANGZHU;
        this.cityBtn.visible = this.userGuild.myOffice >= GuildOffice.GUILD_FUBANGZHU;
    };
    GuildInfoPanel.prototype.updateGuild = function () {
        this.guildName.text = this.userGuild.guildName;
        this.guildLevel.text = this.userGuild.guildLv.toString();
        this.guildMoney.text = this.userGuild.money.toString();
        this.notice.text = this.userGuild.notice;
        this.rename.visible = Guild.ins().changeNameNum && this.userGuild.myOffice >= GuildOffice.GUILD_BANGZHU;
    };
    GuildInfoPanel.prototype.updateMember = function () {
        var gc = GlobalConfig.GuildConfig;
        var commentLv = Guild.ins().getBuildingLevels(GuildBuilding.GUILD_COMMENT - 1) || 0;
        var exmember = commentLv ? GlobalConfig.GuildConfig.affairMember[commentLv - 1] : 0;
        this.guildMember.text = this.userGuild.getMemberNum() + "/" + (gc.maxMember[Guild.ins().guildLv - 1] + exmember);
        this.list.dataProvider = new eui.ArrayCollection(this.userGuild.getGuildMembers(1));
    };
    GuildInfoPanel.prototype.onLinkApply = function () {
        ViewManager.ins().open(GuildApplyListWin);
    };
    GuildInfoPanel.prototype.updateApplys = function () {
        if (this.userGuild.hasApplys()) {
            this.checkJoin.parent.addChildAt(this.eff, this.getChildIndex(this.checkJoin));
            this.eff.playFile(RES_DIR_EFF + "chargeff1", -1);
            this.eff.scaleX = 0.7;
            this.eff.scaleY = 0.7;
        }
        else
            DisplayUtils.removeFromParent(this.eff);
    };
    return GuildInfoPanel;
}(BaseComponent));
__reflect(GuildInfoPanel.prototype, "GuildInfoPanel");
//# sourceMappingURL=GuildInfoPanel.js.map