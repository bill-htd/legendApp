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
var GuildTaskPanel = (function (_super) {
    __extends(GuildTaskPanel, _super);
    function GuildTaskPanel() {
        return _super.call(this) || this;
    }
    GuildTaskPanel.prototype.childrenCreated = function () {
        this.init();
    };
    GuildTaskPanel.prototype.init = function () {
        this.list.itemRenderer = GuildTaskItemRender;
    };
    GuildTaskPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.list, this.onListTouch);
        this.list.dataProvider = Guild.ins().guildTaskInfos;
    };
    GuildTaskPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.list, this.onListTouch);
        this.removeObserve();
    };
    GuildTaskPanel.prototype.onLink = function () {
        ViewManager.ins().open(VipWin);
    };
    GuildTaskPanel.prototype.onListTouch = function (e) {
        if (e.target instanceof eui.Button) {
            var item = e.target.parent.parent;
            item.onTap(e.target);
        }
    };
    return GuildTaskPanel;
}(BaseComponent));
__reflect(GuildTaskPanel.prototype, "GuildTaskPanel");
//# sourceMappingURL=GuildTaskPanel.js.map