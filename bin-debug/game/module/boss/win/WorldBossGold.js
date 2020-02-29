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
var WorldBossGold = (function (_super) {
    __extends(WorldBossGold, _super);
    function WorldBossGold() {
        return _super.call(this) || this;
    }
    WorldBossGold.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "WorldBossGoldSkin";
    };
    WorldBossGold.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var hurt = param[0];
        var gold = param[1];
        this.infoTxt.textFlow = (new egret.HtmlTextParser()).parser("\u672C\u6B21\u6311\u6218BOSS\u8BE6\u60C5\uFF1A\n<font size='18' color='#A89C88'>\t\u9020\u6210\u4F24\u5BB3\uFF1A<font color='#23CA23'>" + hurt + "</font>\n\t\u83B7\u5F97\u5956\u52B1\uFF1A</font>");
        this.price.setType(MoneyConst.gold);
        this.price.setPrice(gold);
        this.s = 10;
        this.updateBtn();
        TimerManager.ins().doTimer(1000, this.s, this.updateBtn, this);
        this.addTouchEvent(this.okBtn, this.onTap);
    };
    WorldBossGold.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.okBtn, this.onTap);
        TimerManager.ins().remove(this.updateBtn, this);
        UserFb.ins().sendExitFb();
    };
    WorldBossGold.prototype.onTap = function (e) {
        ViewManager.ins().close(this);
    };
    WorldBossGold.prototype.updateBtn = function () {
        this.s--;
        this.okBtn.label = "\u786E \u5B9A\uFF08" + this.s + "s\uFF09";
        if (this.s <= 0) {
            this.onTap();
        }
    };
    return WorldBossGold;
}(BaseEuiView));
__reflect(WorldBossGold.prototype, "WorldBossGold");
ViewManager.ins().reg(WorldBossGold, LayerManager.UI_Main);
//# sourceMappingURL=WorldBossGold.js.map