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
var CityBossView = (function (_super) {
    __extends(CityBossView, _super);
    function CityBossView() {
        var _this = _super.call(this) || this;
        _this.lastSelect = 0;
        _this.skinName = "CitySkin";
        _this.isTopLevel = true;
        return _this;
    }
    CityBossView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.tab.addEventListener(egret.Event.CHANGE, this.setSelectedIndex, this);
        this.addTouchEvent(this.seeRule, this.onSeeRule);
        this.viewStack.selectedIndex = 0;
        this.viewStack.getElementAt(0)['open']();
    };
    CityBossView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn0, this.onTap);
    };
    CityBossView.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn0:
                ViewManager.ins().close(this);
                break;
        }
    };
    CityBossView.prototype.onSeeRule = function (e) {
        ViewManager.ins().open(ZsBossRuleSpeak, 16);
    };
    CityBossView.prototype.setSelectedIndex = function (e) {
        this.viewStack.getElementAt(this.lastSelect)['close']();
        this.lastSelect = this.viewStack.selectedIndex;
        this.viewStack.getElementAt(this.lastSelect)['open']();
    };
    return CityBossView;
}(BaseEuiView));
__reflect(CityBossView.prototype, "CityBossView");
ViewManager.ins().reg(CityBossView, LayerManager.UI_Main);
//# sourceMappingURL=CityBossView.js.map