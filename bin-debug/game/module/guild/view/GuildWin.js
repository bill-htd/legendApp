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
var GuildWin = (function (_super) {
    __extends(GuildWin, _super);
    function GuildWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "GuildBgSkin";
        _this.isTopLevel = true;
        return _this;
    }
    GuildWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.tab.dataProvider = this.viewStack;
    };
    GuildWin.openCheck = function () {
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
    GuildWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (param && param.length > 0) {
            this.lastSelect = param[0];
        }
        else
            this.lastSelect = 0;
        this.viewStack.selectedIndex = this.lastSelect;
        this.addChangeEvent(this.tab, this.setSelectedIndex);
        this.observe(GuildRedPoint.ins().postGldt, this.updateRedPoint);
        Guild.ins().sendMyGuildInfo();
        Guild.ins().sendGuildMembers();
        this.updateRedPoint();
        this.viewStack.getElementAt(this.lastSelect)['open']();
    };
    GuildWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.viewStack.getElementAt(this.lastSelect)['close']();
        ViewManager.ins().open(GuildMap);
    };
    GuildWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
        }
    };
    GuildWin.prototype.setSelectedIndex = function (e) {
        this.viewStack.getElementAt(this.lastSelect)['close']();
        this.lastSelect = this.viewStack.selectedIndex;
        this.viewStack.getElementAt(this.lastSelect)['open']();
    };
    GuildWin.prototype.updateRedPoint = function () {
        this.redPoint1.visible = GuildRedPoint.ins().gldt;
    };
    return GuildWin;
}(BaseEuiView));
__reflect(GuildWin.prototype, "GuildWin");
ViewManager.ins().reg(GuildWin, LayerManager.UI_Main);
//# sourceMappingURL=GuildWin.js.map