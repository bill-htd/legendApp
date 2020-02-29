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
var GuildWarRulesWin = (function (_super) {
    __extends(GuildWarRulesWin, _super);
    function GuildWarRulesWin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuildWarRulesWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "RuleTipsSkin";
        this.isTopLevel = true;
    };
    GuildWarRulesWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bigBg, this.onTap);
        this.addTouchEvent(this.bg, this.onTap);
        this.addTouchEvent(this.attr, this.onTap);
        this.addTouchEvent(this.leftBtn, this.onTap);
        this.addTouchEvent(this.rightBtn, this.onTap);
        this.cruIndex = GuildWar.ins().getModel().getMapLevelInfo().id;
        this.refushInfo();
    };
    GuildWarRulesWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bigBg, this.onTap);
        this.removeTouchEvent(this.bg, this.onTap);
        this.removeTouchEvent(this.attr, this.onTap);
        this.removeTouchEvent(this.leftBtn, this.onTap);
        this.removeTouchEvent(this.rightBtn, this.onTap);
    };
    GuildWarRulesWin.prototype.refushInfo = function () {
        var data = GlobalConfig.GuildBattleLevel;
        var info = data[this.cruIndex];
        this.mapName.text = info.name;
        this.attr.textFlow = TextFlowMaker.generateTextFlow(info.help);
        this.rightBtn.visible = this.cruIndex < 4;
        this.leftBtn.visible = this.cruIndex > 1;
    };
    GuildWarRulesWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.leftBtn:
                --this.cruIndex;
                this.refushInfo();
                break;
            case this.rightBtn:
                ++this.cruIndex;
                this.refushInfo();
                break;
            case this.bigBg:
                ViewManager.ins().close(GuildWarRulesWin);
                break;
            default:
                ViewManager.ins().close(GuildWarRulesWin);
        }
    };
    return GuildWarRulesWin;
}(BaseEuiView));
__reflect(GuildWarRulesWin.prototype, "GuildWarRulesWin");
ViewManager.ins().reg(GuildWarRulesWin, LayerManager.UI_Main);
//# sourceMappingURL=GuildWarRulesWin.js.map