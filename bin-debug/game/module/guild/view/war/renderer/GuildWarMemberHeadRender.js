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
var GuildWarMemberHeadRender = (function (_super) {
    __extends(GuildWarMemberHeadRender, _super);
    function GuildWarMemberHeadRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "MemberHeadSkin";
        _this.clickEffc = new MovieClip;
        _this.clickEffc.x = 52;
        _this.clickEffc.y = 37;
        return _this;
    }
    GuildWarMemberHeadRender.prototype.dataChanged = function () {
        this.haveGuildName(false);
        if (!isNaN(this.data)) {
            this.currentState = "war";
            var charSource = EntityManager.ins().getEntityBymasterhHandle(this.data);
            if (charSource) {
                var info = charSource.infoModel;
                var guildName = info.guildName ? "\n<font color='#6495ed'>" + info.guildName + "</font>" : "";
                var str = DevildomSys.ins().isDevildomBattle && guildName ? info.name + guildName : info.getNameWithServer2();
                if (str.indexOf("\n") > -1) {
                    this.haveGuildName(true);
                }
                this.roleName.textFlow = new egret.HtmlTextParser().parser(str);
                this.roleHead.source = "yuanhead" + info.job + info.sex;
                if (GuildWar.ins().getModel().attHandle && GuildWar.ins().getModel().attHandle == this.data) {
                    this.addAttEffect();
                }
            }
            else {
                this.roleName.textFlow = new egret.HtmlTextParser().parser("已死亡");
            }
        }
        else if (this.data instanceof SelectInfoData) {
            this.currentState = "panel";
            this.num.textFlow = new egret.HtmlTextParser().parser(this.data.num + "份");
            this.roleName.textFlow = new egret.HtmlTextParser().parser(this.data.data.name);
            this.roleHead.source = "yuanhead" + this.data.data.job + this.data.data.sex;
        }
    };
    GuildWarMemberHeadRender.prototype.addAttEffect = function () {
        if (!this.attEffect) {
            this.attEffect = new MovieClip;
            this.attEffect.x = 49;
            this.attEffect.y = 28;
        }
        this.attEffect.playFile(RES_DIR_EFF + "FightingEff", -1);
        this.addChild(this.attEffect);
    };
    GuildWarMemberHeadRender.prototype.removeAttEffect = function () {
        if (this.attEffect) {
            this.attEffect.stop();
            this.attEffect.destroy();
            this.attEffect = null;
        }
    };
    GuildWarMemberHeadRender.prototype.showEffect = function () {
        this.clickEffc.playFile(RES_DIR_EFF + "tapCircle", 1);
        this.addChild(this.clickEffc);
    };
    GuildWarMemberHeadRender.prototype.clearEffect = function () {
        DisplayUtils.removeFromParent(this.clickEffc);
        DisplayUtils.removeFromParent(this.attEffect);
    };
    GuildWarMemberHeadRender.prototype.haveGuildName = function (b) {
        if (b) {
            this.namebg.height = 45;
            this.height = 110;
        }
        else {
            this.namebg.height = 26;
            this.height = 98;
        }
    };
    return GuildWarMemberHeadRender;
}(BaseItemRender));
__reflect(GuildWarMemberHeadRender.prototype, "GuildWarMemberHeadRender");
//# sourceMappingURL=GuildWarMemberHeadRender.js.map