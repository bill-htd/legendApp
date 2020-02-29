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
var SmeltItemTotalWin = (function (_super) {
    __extends(SmeltItemTotalWin, _super);
    function SmeltItemTotalWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "hunguRongluSkin";
        _this.isTopLevel = true;
        return _this;
    }
    SmeltItemTotalWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
    };
    SmeltItemTotalWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.equip.open(param[0]);
        this.addTouchEvent(this.bgClose, this.onTap);
    };
    SmeltItemTotalWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.equip.close();
    };
    SmeltItemTotalWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
    };
    return SmeltItemTotalWin;
}(BaseEuiView));
__reflect(SmeltItemTotalWin.prototype, "SmeltItemTotalWin");
ViewManager.ins().reg(SmeltItemTotalWin, LayerManager.UI_Popup);
//# sourceMappingURL=SmeltItemTotalWin.js.map