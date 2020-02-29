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
var GuildWarRewardWin = (function (_super) {
    __extends(GuildWarRewardWin, _super);
    function GuildWarRewardWin() {
        var _this = _super.call(this) || this;
        _this.type = 0;
        return _this;
    }
    GuildWarRewardWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "GuildWarRewardSkin";
        this.isTopLevel = true;
    };
    GuildWarRewardWin.prototype.addPanelList = function () {
        this.guildInteRankInfo = new GuildInteRankInfo();
        this.viewStack.addChild(this.guildInteRankInfo);
        this.personalInteRankInfo = new PersonalInteRankInfo();
        this.viewStack.addChild(this.personalInteRankInfo);
        this.guildInteRewardInfo = new GuildInteRewardInfo();
        this.viewStack.addChild(this.guildInteRewardInfo);
        this.personInteRewardInfo = new PersonInteRewardInfo();
        this.viewStack.addChild(this.personInteRewardInfo);
        this.cruPanel = this.viewStack.getChildAt(0);
        this.tab.dataProvider = this.viewStack;
    };
    GuildWarRewardWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (param && param[1]) {
            this.type = param[1];
        }
        this.addPanelList();
        if (param && param[0])
            this.viewStack.selectedIndex = param[0];
        else
            this.viewStack.selectedIndex = 0;
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.addChangeEvent(this.tab, this.onTabTouch);
        this.cruPanel.open();
    };
    GuildWarRewardWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.closeBtn0, this.onTap);
        this.cruPanel.close();
        this.viewStack.removeChildren();
        this.type = 0;
    };
    GuildWarRewardWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
            case this.closeBtn0:
                ViewManager.ins().close(GuildWarRewardWin);
                break;
        }
    };
    GuildWarRewardWin.prototype.onTabTouch = function (e) {
        if (this.cruPanel) {
            this.cruPanel.close();
        }
        this.cruPanel = this.viewStack.selectedChild;
        this.cruPanel.open();
    };
    return GuildWarRewardWin;
}(BaseEuiView));
__reflect(GuildWarRewardWin.prototype, "GuildWarRewardWin");
ViewManager.ins().reg(GuildWarRewardWin, LayerManager.UI_Main);
//# sourceMappingURL=GuildWarRewardWin.js.map