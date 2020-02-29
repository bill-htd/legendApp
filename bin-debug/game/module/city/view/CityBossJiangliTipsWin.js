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
var CityBossJiangliTipsWin = (function (_super) {
    __extends(CityBossJiangliTipsWin, _super);
    function CityBossJiangliTipsWin() {
        return _super.call(this) || this;
    }
    CityBossJiangliTipsWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "CityBossJiangliTipsSkin";
        this.isTopLevel = true;
        this.belongList.itemRenderer = ItemBase;
    };
    CityBossJiangliTipsWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.giveUp, this.otherClose);
        this.showAward();
    };
    CityBossJiangliTipsWin.prototype.showAward = function () {
        if (CityCC.ins().isCity) {
            for (var i in GlobalConfig.CityBossConfig) {
                if (GlobalConfig.CityBossConfig[i].bossId == CityCC.ins().cityBossId) {
                    this.belongList.dataProvider = new eui.ArrayCollection(GlobalConfig.CityBossConfig[i].showReward);
                    break;
                }
            }
        }
    };
    CityBossJiangliTipsWin.prototype.otherClose = function (evt) {
        ViewManager.ins().close(this);
    };
    return CityBossJiangliTipsWin;
}(BaseEuiView));
__reflect(CityBossJiangliTipsWin.prototype, "CityBossJiangliTipsWin");
ViewManager.ins().reg(CityBossJiangliTipsWin, LayerManager.UI_Popup);
//# sourceMappingURL=CityBossJiangliTipsWin.js.map