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
var GwResetWin = (function (_super) {
    __extends(GwResetWin, _super);
    function GwResetWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "GwResetSkin";
        _this.isTopLevel = true;
        return _this;
    }
    GwResetWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.price.setType(MoneyConst.yuanbao);
    };
    GwResetWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgclose, this.onTouch);
        this.addTouchEvent(this.resetBtn, this.onTouch);
        this.price.setPrice(GlobalConfig.GodWeaponBaseConfig.skillResetCost);
        this._dataWeapon = args[0];
        var point = this._dataWeapon.getResetPoint();
        this.resetDesc.text = point > 0 ? "\u91CD\u7F6E\u540E\u53EF\u8FD4\u8FD8" + point + "\u6280\u80FD\u70B9" : "\u76EE\u524D\u6CA1\u6709\u53EF\u91CD\u7F6E\u7684\u6280\u80FD";
        this.gwName.text = this._dataWeapon.getWeaponName();
        this.resetBtn.enabled = point > 0 && Actor.yb >= GlobalConfig.GodWeaponBaseConfig.skillResetCost;
    };
    GwResetWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.bgclose:
                ViewManager.ins().close(this);
                break;
            case this.resetBtn:
                GodWeaponCC.ins().sendReset(this._dataWeapon.weaponId);
                ViewManager.ins().close(this);
                break;
        }
    };
    return GwResetWin;
}(BaseEuiView));
__reflect(GwResetWin.prototype, "GwResetWin");
ViewManager.ins().reg(GwResetWin, LayerManager.UI_Main);
//# sourceMappingURL=GwResetWin.js.map