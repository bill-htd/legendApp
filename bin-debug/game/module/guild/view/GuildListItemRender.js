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
var GuildListItemRender = (function (_super) {
    __extends(GuildListItemRender, _super);
    function GuildListItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "ApplyItemSkin";
        return _this;
    }
    GuildListItemRender.prototype.onTap = function () {
        if (GuildWar.ins().getModel().isWatStart) {
            WarnWin.show("工会战期间,不允许申请加入公会", function () {
            }, this);
            return;
        }
        var info = this.data;
        if (Guild.ins().applyGuilds.indexOf(info.guildID) == -1) {
            if (this.data.attr > Actor.power) {
                UserTips.ins().showTips("|C:0xf3311e&T:战斗力过低|");
                return;
            }
            this.applyBtn.enabled = false;
            this.applyBtn.label = "已申请";
            Guild.ins().applyGuilds.push(info.guildID);
            Guild.ins().sendJoinGuild(info.guildID);
        }
    };
    GuildListItemRender.prototype.dataChanged = function () {
        if (this.data instanceof GuildListInfo) {
            var info = this.data;
            var gc = GlobalConfig.GuildConfig;
            if (info && gc) {
                this.numLab.text = info.guildRank + "";
                this.nameLab.textFlow = (new egret.HtmlTextParser()).parser(info.guildName + ("<font color='#0FEE27'>(Lv." + info.guildLevel + ")</font>"));
                this.president.text = info.guildPresident;
                var exmember = info.commentLv ? GlobalConfig.GuildConfig.affairMember[info.commentLv - 1] : 0;
                this.member.textColor = info.guildMember < (gc.maxMember[info.guildLevel - 1] + exmember) ? 0x4FBFE2 : 0xf3311e;
                this.member.text = info.guildMember + "/" + (gc.maxMember[info.guildLevel - 1] + exmember);
                var powers = CommonUtils.overLength(info.attr);
                this.attrLabel.visible = powers ? true : false;
                if (powers)
                    this.attrLabel.text = "战力要求：" + powers;
                if (Guild.ins().applyGuilds.indexOf(info.guildID) > -1) {
                    this.applyBtn.enabled = false;
                    this.applyBtn.label = "已申请";
                }
                else {
                    this.applyBtn.enabled = true;
                    this.applyBtn.label = "申请";
                }
            }
        }
    };
    GuildListItemRender.prototype.destruct = function () {
    };
    return GuildListItemRender;
}(BaseItemRender));
__reflect(GuildListItemRender.prototype, "GuildListItemRender");
//# sourceMappingURL=GuildListItemRender.js.map