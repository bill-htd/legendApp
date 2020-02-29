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
var DevildomBelongAwardWin = (function (_super) {
    __extends(DevildomBelongAwardWin, _super);
    function DevildomBelongAwardWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "KFInvasionBelongSkin";
        return _this;
    }
    DevildomBelongAwardWin.prototype.childrenCreated = function () {
        this.saleReward0.itemRenderer = ItemBase;
        this.belongReward0.itemRenderer = ItemBase;
    };
    DevildomBelongAwardWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.BG, this.onCloseWin);
        this.addTouchEvent(this.tipGroup1, this.onCloseWin);
        this.belongReward0.dataProvider = new eui.ArrayCollection(CommonUtils.objectToArray(GlobalConfig.DevilBossBase.belongAwards));
        this.saleReward0.dataProvider = new eui.ArrayCollection(CommonUtils.objectToArray(GlobalConfig.DevilBossBase.belongSaleAwards));
    };
    DevildomBelongAwardWin.prototype.onCloseWin = function () {
        ViewManager.ins().close(this);
    };
    return DevildomBelongAwardWin;
}(BaseEuiView));
__reflect(DevildomBelongAwardWin.prototype, "DevildomBelongAwardWin");
ViewManager.ins().reg(DevildomBelongAwardWin, LayerManager.UI_Popup);
//# sourceMappingURL=DevildomBelongAwardWin.js.map