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
var GuildManagePanel = (function (_super) {
    __extends(GuildManagePanel, _super);
    function GuildManagePanel() {
        return _super.call(this) || this;
    }
    GuildManagePanel.prototype.childrenCreated = function () {
        this.init();
    };
    GuildManagePanel.prototype.init = function () {
        this.buildList.itemRenderer = GuildBuildItemRender;
        this.messageList.itemRenderer = GuildEventItenRender;
    };
    GuildManagePanel.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var rtn = (Guild.ins().guildID != 0);
        if (!rtn) {
            UserTips.ins().showTips("还未加入公会！");
        }
        return rtn;
    };
    GuildManagePanel.prototype.open = function () {
        this.addTouchEvent(this.buildList, this.onListTouch);
        this.observe(Guild.ins().postUpBuilding, this.updateList);
        this.observe(Guild.ins().postManageList, this.update);
        this.observe(Guild.ins().postGuildMoney, this.update);
        Guild.ins().sendManageList();
        this.updateList();
    };
    GuildManagePanel.prototype.close = function () {
        this.removeTouchEvent(this.buildList, this.onListTouch);
        this.removeObserve();
    };
    GuildManagePanel.prototype.update = function () {
        this.messageList.dataProvider = new eui.ArrayCollection(Guild.ins().records);
    };
    GuildManagePanel.prototype.updateList = function () {
        this.index = this.buildScroller.viewport.scrollV;
        this.buildList.dataProvider = new eui.ArrayCollection([GuildBuilding.GUILD_HALL, GuildBuilding.GUILD_LIANGONGFANG, GuildBuilding.GUILD_COMMENT, GuildBuilding.GUILD_SHOP]);
        this.refushBar();
    };
    GuildManagePanel.prototype.refushBar = function () {
        TimerManager.ins().remove(this.refushBarList, this);
        TimerManager.ins().doTimer(100, 1, this.refushBarList, this);
    };
    GuildManagePanel.prototype.refushBarList = function () {
        TimerManager.ins().remove(this.refushBarList, this);
        this.buildScroller.viewport.scrollV = this.index;
    };
    GuildManagePanel.prototype.onListTouch = function (e) {
        if (e.target instanceof eui.Button) {
            var item = e.target.parent;
            item.onTap(e.target);
        }
    };
    return GuildManagePanel;
}(BaseComponent));
__reflect(GuildManagePanel.prototype, "GuildManagePanel");
//# sourceMappingURL=GuildManagePanel.js.map