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
var BattleRankWin = (function (_super) {
    __extends(BattleRankWin, _super);
    function BattleRankWin() {
        var _this = _super.call(this) || this;
        _this._selectedIndex = 0;
        _this.skinName = "BattleScoreSkin";
        _this.isTopLevel = true;
        return _this;
    }
    BattleRankWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this._panels = [this.runePanel0, this.decomPanel0];
        this._panels[this._selectedIndex].open();
        this.viewStack.selectedIndex = this._selectedIndex;
    };
    BattleRankWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this, this.onTap);
        this.addChangeEvent(this.tab, this.onTabTouch);
    };
    BattleRankWin.prototype.close = function () {
        this.removeTouchEvent(this, this.onTap);
        this.removeEventListener(egret.TouchEvent.CHANGE, this.onTabTouch, this.tab);
    };
    BattleRankWin.prototype.onTabTouch = function (e) {
        this._panels[this._selectedIndex].close();
        this._selectedIndex = e.currentTarget.selectedIndex;
        this._panels[this._selectedIndex].open();
        this.viewStack._selectedIndex = this._selectedIndex;
    };
    BattleRankWin.prototype.onTap = function (e) {
        if (e.target == this.bgClose)
            ViewManager.ins().close(this);
    };
    return BattleRankWin;
}(BaseEuiView));
__reflect(BattleRankWin.prototype, "BattleRankWin");
ViewManager.ins().reg(BattleRankWin, LayerManager.UI_Main);
//# sourceMappingURL=BattleRankWin.js.map