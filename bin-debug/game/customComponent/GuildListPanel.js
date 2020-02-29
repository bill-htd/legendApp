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
var GuildListPanel = (function (_super) {
    __extends(GuildListPanel, _super);
    function GuildListPanel() {
        return _super.call(this) || this;
    }
    GuildListPanel.prototype.childrenCreated = function () {
        this.init();
    };
    GuildListPanel.prototype.init = function () {
        this.list.itemRenderer = GuildListItem2Render;
    };
    GuildListPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(Guild.ins().postGuildList, this.updateList);
        this.updateList();
        this.pageChange(0);
    };
    GuildListPanel.prototype.pageChange = function (page) {
        if (this.curPage != page && page >= 0 && page < Guild.ins().pageMax) {
            this.curPage = page;
            Guild.ins().sendGuildList(this.curPage, 6);
        }
    };
    GuildListPanel.prototype.updateList = function () {
        this.list.dataProvider = new eui.ArrayCollection(Guild.ins().guildListInfos);
    };
    return GuildListPanel;
}(BaseComponent));
__reflect(GuildListPanel.prototype, "GuildListPanel");
//# sourceMappingURL=GuildListPanel.js.map