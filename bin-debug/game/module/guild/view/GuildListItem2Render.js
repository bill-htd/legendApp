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
var GuildListItem2Render = (function (_super) {
    __extends(GuildListItem2Render, _super);
    function GuildListItem2Render() {
        var _this = _super.call(this) || this;
        _this.skinName = "GuildListItemSkin";
        return _this;
    }
    GuildListItem2Render.prototype.dataChanged = function () {
        if (this.data instanceof GuildListInfo) {
            var info = this.data;
            var gc = GlobalConfig.GuildConfig;
            if (info && gc) {
                if (info.guildRank < 4) {
                    this.numImg.source = "guildshop_json.guildpaihang" + info.guildRank;
                    this.numLab.visible = false;
                    this.numImg.visible = true;
                }
                else {
                    this.numLab.text = info.guildRank + "";
                    this.numLab.visible = true;
                    this.numImg.visible = false;
                }
                this.nameLab.textFlow = (new egret.HtmlTextParser()).parser(info.guildName);
                this.member0.text = "" + info.guildLevel;
                this.president.text = info.guildPresident;
                var commentLv = Guild.ins().getBuildingLevels(GuildBuilding.GUILD_COMMENT - 1) || 0;
                var exmember = commentLv ? GlobalConfig.GuildConfig.affairMember[commentLv - 1] : 0;
                this.member.text = info.guildMember + "/" + (gc.maxMember[info.guildLevel - 1] + exmember);
                this.attrLab.text = "" + info.attr;
            }
        }
    };
    return GuildListItem2Render;
}(BaseItemRender));
__reflect(GuildListItem2Render.prototype, "GuildListItem2Render");
//# sourceMappingURL=GuildListItem2Render.js.map