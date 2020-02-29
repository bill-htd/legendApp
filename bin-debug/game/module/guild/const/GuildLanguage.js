var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GuildLanguage = (function () {
    function GuildLanguage() {
    }
    GuildLanguage.guildOffice = ["成员", "精英", "堂主", "护法", "长老", "副会长", "会长"];
    GuildLanguage.guildOfficeColor = ["d1c3a8", "00c832", "1694ec", "8e2abc", "f4b12a", "ffff00", "ffff00"];
    GuildLanguage.guildBuilding = ["", "管理大厅", "练功房"];
    return GuildLanguage;
}());
__reflect(GuildLanguage.prototype, "GuildLanguage");
//# sourceMappingURL=GuildLanguage.js.map