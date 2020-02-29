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
var DevildomPartAwardWin = (function (_super) {
    __extends(DevildomPartAwardWin, _super);
    function DevildomPartAwardWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "KFInvasionPartSkin";
        return _this;
    }
    DevildomPartAwardWin.prototype.childrenCreated = function () {
        this.saleReward.itemRenderer = ItemBase;
        this.belongReward.itemRenderer = ItemBase;
    };
    DevildomPartAwardWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.BG, this.onCloseWin);
        this.addTouchEvent(this.tipGroup0, this.onCloseWin);
        this.belongReward.dataProvider = new eui.ArrayCollection(CommonUtils.objectToArray(GlobalConfig.DevilBossBase.partAwards));
        this.saleReward.dataProvider = new eui.ArrayCollection(CommonUtils.objectToArray(GlobalConfig.DevilBossBase.partSaleAwards));
    };
    DevildomPartAwardWin.prototype.onCloseWin = function () {
        ViewManager.ins().close(this);
    };
    return DevildomPartAwardWin;
}(BaseEuiView));
__reflect(DevildomPartAwardWin.prototype, "DevildomPartAwardWin");
ViewManager.ins().reg(DevildomPartAwardWin, LayerManager.UI_Popup);
//# sourceMappingURL=DevildomPartAwardWin.js.map