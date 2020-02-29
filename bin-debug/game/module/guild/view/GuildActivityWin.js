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
var GuildActivityWin = (function (_super) {
    __extends(GuildActivityWin, _super);
    function GuildActivityWin() {
        return _super.call(this) || this;
    }
    GuildActivityWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "GuildActivityBgSkin";
        this.tab.dataProvider = this.viewStack;
        this.activityPanel = new GuildActityPanel();
    };
    GuildActivityWin.openCheck = function () {
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
    GuildActivityWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.lastSelect = 0;
        this.viewStack.selectedIndex = this.lastSelect;
        if (GameServer.serverOpenDay >= (GlobalConfig['GuildActivityConfig']["1"].openDay - 1)) {
            this.viewStack.addChild(this.activityPanel);
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.addChangeEvent(this.tab, this.setSelectedIndex);
        this.observe(GuildFB.ins().postGuildFubenInfo, this.updateRedpoint);
        this.viewStack.getElementAt(this.lastSelect)['open']();
        this.updateRedpoint();
    };
    GuildActivityWin.prototype.updateRedpoint = function () {
        this.redPoint1.visible = GuildFB.ins().hasbtn();
    };
    GuildActivityWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.closeBtn0, this.onTap);
        this.removeObserve();
    };
    GuildActivityWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn0:
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
        }
    };
    GuildActivityWin.prototype.setSelectedIndex = function (e) {
        this.viewStack.getElementAt(this.lastSelect)['close']();
        this.lastSelect = this.viewStack.selectedIndex;
        this.viewStack.getElementAt(this.lastSelect)['open']();
    };
    return GuildActivityWin;
}(BaseEuiView));
__reflect(GuildActivityWin.prototype, "GuildActivityWin");
ViewManager.ins().reg(GuildActivityWin, LayerManager.UI_Main);
//# sourceMappingURL=GuildActivityWin.js.map