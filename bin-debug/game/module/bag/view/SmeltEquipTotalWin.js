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
var SmeltEquipTotalWin = (function (_super) {
    __extends(SmeltEquipTotalWin, _super);
    function SmeltEquipTotalWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "SmeltMainViewSkin";
        _this.isTopLevel = true;
        return _this;
    }
    SmeltEquipTotalWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
    };
    SmeltEquipTotalWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.lastSelect = 0;
        this.equip.open();
        this.addTouchEvent(this.bgClose, this.onTap);
    };
    SmeltEquipTotalWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.equip.close();
        this.removeTouchEvent(this.bgClose, this.onTap);
    };
    SmeltEquipTotalWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
            case this.closeBtn:
            case this.closeBtn0:
                ViewManager.ins().close(this);
                break;
        }
    };
    return SmeltEquipTotalWin;
}(BaseEuiView));
__reflect(SmeltEquipTotalWin.prototype, "SmeltEquipTotalWin");
ViewManager.ins().reg(SmeltEquipTotalWin, LayerManager.UI_Popup);
//# sourceMappingURL=SmeltEquipTotalWin.js.map