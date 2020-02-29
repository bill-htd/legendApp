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
var ZhuzaiEquipDecomWin = (function (_super) {
    __extends(ZhuzaiEquipDecomWin, _super);
    function ZhuzaiEquipDecomWin() {
        return _super.call(this) || this;
    }
    ZhuzaiEquipDecomWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "ZhuzaiEquipDecomSkin";
    };
    ZhuzaiEquipDecomWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onClick);
        this.addTouchEvent(this.closeBtn0, this.onClick);
    };
    ZhuzaiEquipDecomWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onClick);
        this.removeTouchEvent(this.closeBtn0, this.onClick);
    };
    ZhuzaiEquipDecomWin.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
            case this.closeBtn0:
                ViewManager.ins().close(this);
                break;
        }
    };
    return ZhuzaiEquipDecomWin;
}(BaseEuiView));
__reflect(ZhuzaiEquipDecomWin.prototype, "ZhuzaiEquipDecomWin");
ViewManager.ins().reg(ZhuzaiEquipDecomWin, LayerManager.UI_Main);
//# sourceMappingURL=ZhuzaiEquipDecomWin.js.map