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
var GuildMemberPanel = (function (_super) {
    __extends(GuildMemberPanel, _super);
    function GuildMemberPanel() {
        return _super.call(this) || this;
    }
    GuildMemberPanel.prototype.childrenCreated = function () {
        this.init();
    };
    GuildMemberPanel.prototype.init = function () {
        this.list.itemRenderer = GuildMemberItem2Render;
        this.dataArr = new eui.ArrayCollection;
        this.list.dataProvider = this.dataArr;
    };
    GuildMemberPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.quitBtn, this.onTap);
        this.addTouchEvent(this.list, this.onListTouch);
        this.observe(Guild.ins().postMyGuildInfo, this.updateMyInfo);
        this.observe(Guild.ins().postGuildMembers, this.updateMember);
        this.updateMyInfo();
        this.updateMember();
    };
    GuildMemberPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.quitBtn, this.onTap);
        this.removeTouchEvent(this.list, this.onListTouch);
        this.removeObserve();
    };
    GuildMemberPanel.prototype.onListTouch = function (e) {
        if (e.target instanceof eui.Button) {
            var item = e.target.parent.parent;
            item.onTap(e.target);
        }
    };
    GuildMemberPanel.prototype.updateMember = function () {
        var listData = Guild.ins().getGuildMembers(1);
        this.dataArr.replaceAll(listData);
    };
    GuildMemberPanel.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.quitBtn:
                if (GuildWar.ins().getModel().isWatStart) {
                    WarnWin.show("工会战期间,不允许退出公会", function () {
                    }, this);
                    return;
                }
                if (Guild.ins().myOffice == GuildOffice.GUILD_BANGZHU) {
                    if (Guild.ins().getMemberNum() > 1) {
                        WarnWin.show("需要先进行禅让，才可退出行会", function () {
                        }, this);
                        return;
                    }
                }
                WarnWin.show("是否确定退出公会，\n退出后贡献值清0。\n公会技能继续生效。", function () {
                    Guild.ins().sendQuitGuild();
                }, this, null, null, "normal", "center");
                break;
        }
    };
    GuildMemberPanel.prototype.updateMyInfo = function () {
        this.office.text = GuildLanguage.guildOffice[Guild.ins().myOffice];
        this.totalCon.text = Guild.ins().myTotalCon + "";
    };
    return GuildMemberPanel;
}(BaseComponent));
__reflect(GuildMemberPanel.prototype, "GuildMemberPanel");
//# sourceMappingURL=GuildMemberPanel.js.map