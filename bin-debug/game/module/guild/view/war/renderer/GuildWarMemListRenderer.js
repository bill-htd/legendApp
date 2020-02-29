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
var GuildWarMemListRenderer = (function (_super) {
    __extends(GuildWarMemListRenderer, _super);
    function GuildWarMemListRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "WarMemSkin";
        return _this;
    }
    GuildWarMemListRenderer.prototype.dataChanged = function () {
        this.face.source = "head_" + this.data.job + this.data.sex;
        this.nameLab.text = "[" + GuildLanguage.guildOffice[this.data.office] + "]";
        this.nameLab0.text = this.data.myName;
        this.conLab.text = this.data.point + "";
        this.attack.text = this.data.attr + "";
        this.onLine.text = this.data.mapName == "" ? "\u4E0D\u5728\u9F99\u57CE" : this.data.mapName;
    };
    return GuildWarMemListRenderer;
}(BaseItemRender));
__reflect(GuildWarMemListRenderer.prototype, "GuildWarMemListRenderer");
//# sourceMappingURL=GuildWarMemListRenderer.js.map