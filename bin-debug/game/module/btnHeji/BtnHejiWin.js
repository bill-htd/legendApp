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
var BtnHejiWin = (function (_super) {
    __extends(BtnHejiWin, _super);
    function BtnHejiWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "BtnHejiSkin";
        return _this;
    }
    BtnHejiWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.heji, this.onTap);
        if (PaoDianCC.ins().isPaoDian) {
            this.y = 200;
        }
        this.hejiState(Setting.ins().getValue(ClientSet.autoHeji));
    };
    BtnHejiWin.prototype.onTap = function () {
        var state = Setting.ins().getValue(ClientSet.autoHeji) > 0 ? 0 : 1;
        this.hejiState(state);
        Setting.ins().setValue(ClientSet.autoHeji, state);
    };
    BtnHejiWin.prototype.hejiState = function (state) {
        this.heji.icon = (!state || state == 0) ? "noheji_png" : "heji_png";
    };
    return BtnHejiWin;
}(BaseEuiView));
__reflect(BtnHejiWin.prototype, "BtnHejiWin");
ViewManager.ins().reg(BtnHejiWin, LayerManager.UI_Popup);
//# sourceMappingURL=BtnHejiWin.js.map