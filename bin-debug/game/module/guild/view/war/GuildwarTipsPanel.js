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
var GuildwarTipsPanel = (function (_super) {
    __extends(GuildwarTipsPanel, _super);
    function GuildwarTipsPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuildwarTipsPanel.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "GameTipsSkin";
        this.isTopLevel = true;
    };
    GuildwarTipsPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this, this.onTap);
    };
    GuildwarTipsPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this, this.onTap);
    };
    GuildwarTipsPanel.prototype.onTap = function (e) {
        ViewManager.ins().close(GuildwarTipsPanel);
    };
    return GuildwarTipsPanel;
}(BaseEuiView));
__reflect(GuildwarTipsPanel.prototype, "GuildwarTipsPanel");
ViewManager.ins().reg(GuildwarTipsPanel, LayerManager.UI_Main);
//# sourceMappingURL=GuildwarTipsPanel.js.map