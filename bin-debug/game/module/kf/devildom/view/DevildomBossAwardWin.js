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
var DevildomBossAwardWin = (function (_super) {
    __extends(DevildomBossAwardWin, _super);
    function DevildomBossAwardWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "KFInvasionJiangLiTishiSkin";
        return _this;
    }
    DevildomBossAwardWin.prototype.childrenCreated = function () {
        this.belongReward1.itemRenderer = ItemBase;
        this.saleReward1.itemRenderer = ItemBase;
        this.belongReward0.itemRenderer = ItemBase;
        this.saleReward0.itemRenderer = ItemBase;
    };
    DevildomBossAwardWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.bgClose, this.onCloseWin);
        this.addTouchEvent(this.giveUp, this.onCloseWin);
        this.belongReward1.dataProvider = new eui.ArrayCollection(CommonUtils.objectToArray(GlobalConfig.DevilBossBase.belongAwards));
        this.saleReward1.dataProvider = new eui.ArrayCollection(CommonUtils.objectToArray(GlobalConfig.DevilBossBase.belongSaleAwards));
        this.belongReward0.dataProvider = new eui.ArrayCollection(CommonUtils.objectToArray(GlobalConfig.DevilBossBase.partAwards));
        this.saleReward0.dataProvider = new eui.ArrayCollection(CommonUtils.objectToArray(GlobalConfig.DevilBossBase.partSaleAwards));
    };
    DevildomBossAwardWin.prototype.onCloseWin = function () {
        ViewManager.ins().close(this);
    };
    return DevildomBossAwardWin;
}(BaseEuiView));
__reflect(DevildomBossAwardWin.prototype, "DevildomBossAwardWin");
ViewManager.ins().reg(DevildomBossAwardWin, LayerManager.UI_Popup);
//# sourceMappingURL=DevildomBossAwardWin.js.map