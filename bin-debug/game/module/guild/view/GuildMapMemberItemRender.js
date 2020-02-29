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
var GuildMapMemberItemRender = (function (_super) {
    __extends(GuildMapMemberItemRender, _super);
    function GuildMapMemberItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "gongxianitemSkin";
        return _this;
    }
    GuildMapMemberItemRender.prototype.dataChanged = function () {
        if (this.data instanceof GuildMemberInfo) {
            var info = this.data;
            if (info) {
                this.nameLab.text = info.name;
                this.office.text = GuildLanguage.guildOffice[info.office];
                this.conLab.text = info.curContribution + "";
            }
        }
    };
    return GuildMapMemberItemRender;
}(BaseItemRender));
__reflect(GuildMapMemberItemRender.prototype, "GuildMapMemberItemRender");
//# sourceMappingURL=GuildMapMemberItemRender.js.map