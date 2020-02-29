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
var GuildActityPanel = (function (_super) {
    __extends(GuildActityPanel, _super);
    function GuildActityPanel() {
        var _this = _super.call(this) || this;
        _this.initUI();
        _this.name = "公会活动";
        return _this;
    }
    GuildActityPanel.prototype.initUI = function () {
        this.skinName = "GuildActitySkin";
        this.list.itemRenderer = GuildActityItemRender;
    };
    GuildActityPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.updateData();
        this.addTouchEvent(this.list, this.onListTouch);
    };
    GuildActityPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.list, this.onListTouch);
    };
    GuildActityPanel.prototype.updateData = function () {
        var config = [];
        for (var k in GlobalConfig['GuildActivityConfig']) {
            var cfgg = GlobalConfig['GuildActivityConfig'][k];
            config.push(cfgg);
        }
        this.list.dataProvider = new eui.ArrayCollection(config);
    };
    GuildActityPanel.prototype.onListTouch = function (e) {
        if (e.target instanceof eui.Button) {
            var item = e.target.parent.parent;
            item.onTap(e.target);
        }
    };
    return GuildActityPanel;
}(BaseView));
__reflect(GuildActityPanel.prototype, "GuildActityPanel");
//# sourceMappingURL=GuildActityPanel.js.map