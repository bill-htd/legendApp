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
var GuildAppltListItemRender = (function (_super) {
    __extends(GuildAppltListItemRender, _super);
    function GuildAppltListItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "MemberApplyItemSkin";
        return _this;
    }
    GuildAppltListItemRender.prototype.onTap = function (e) {
        if (GuildWar.ins().getModel().isWatStart) {
            WarnWin.show("工会战期间,不允许对申请玩家进行操作", function () {
            }, this);
            return;
        }
        switch (e) {
            case this.ok:
                var commentLv = Guild.ins().getBuildingLevels(GuildBuilding.GUILD_COMMENT - 1) || 0;
                var exmember = commentLv ? GlobalConfig.GuildConfig.affairMember[commentLv - 1] : 0;
                if (Guild.ins().getMemberNum() >= (GlobalConfig.GuildConfig.maxMember[Guild.ins().guildLv - 1] + exmember)) {
                    UserTips.ins().showTips("|C:0xf3311e&T:公会成员已满|");
                    return;
                }
                Guild.ins().sendProcessJoin(this.data.roleID, 1);
                break;
            case this.cancel:
                Guild.ins().sendProcessJoin(this.data.roleID, 0);
                break;
        }
    };
    GuildAppltListItemRender.prototype.dataChanged = function () {
        if (this.data instanceof GuildApplyInfo) {
            var info = this.data;
            if (info.vipLevel > 0) {
                this.nameLab.x = 162;
            }
            else {
                this.nameLab.x = 109;
            }
            var name_1 = "<font color='#C2BAA5'>" + info.name + "</font>";
            this.nameLab.textFlow = (new egret.HtmlTextParser).parser(name_1);
            this.attack0.text = info.attack + "";
            this.myFace.source = "head_" + info.job + info.sex;
            this.vipTitle.visible = info.vipLevel > 0;
        }
    };
    return GuildAppltListItemRender;
}(BaseItemRender));
__reflect(GuildAppltListItemRender.prototype, "GuildAppltListItemRender");
//# sourceMappingURL=GuildAppltListItemRender.js.map