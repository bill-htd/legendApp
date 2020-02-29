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
var GuildWarMemWin = (function (_super) {
    __extends(GuildWarMemWin, _super);
    function GuildWarMemWin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuildWarMemWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "GuildWarMemSkin";
        this.list.itemRenderer = GuildWarMemListRenderer;
        this.data = new eui.ArrayCollection();
        this.isTopLevel = true;
    };
    GuildWarMemWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.list.dataProvider = this.data;
        this.observe(GuildWar.ins().postMyRankChange, this.refushList);
        GuildWar.ins().requestOwnMyGuildRank();
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
    };
    GuildWarMemWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.closeBtn0, this.onTap);
        this.removeObserve();
    };
    GuildWarMemWin.prototype.refushList = function () {
        this.data.replaceAll(GuildWar.ins().getModel().myRankList);
    };
    GuildWarMemWin.prototype.onTap = function (e) {
        ViewManager.ins().close(GuildWarMemWin);
    };
    return GuildWarMemWin;
}(BaseEuiView));
__reflect(GuildWarMemWin.prototype, "GuildWarMemWin");
ViewManager.ins().reg(GuildWarMemWin, LayerManager.UI_Popup);
//# sourceMappingURL=GuildWarMemWin.js.map