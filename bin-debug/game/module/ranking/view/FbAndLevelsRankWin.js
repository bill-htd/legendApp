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
var FbAndLevelsRankWin = (function (_super) {
    __extends(FbAndLevelsRankWin, _super);
    function FbAndLevelsRankWin() {
        return _super.call(this) || this;
    }
    FbAndLevelsRankWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "FbRankSkin";
    };
    FbAndLevelsRankWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.title.source = "fbRankSkin_" + param[0];
        var rankModel = Rank.ins().rankModel[param[0]];
        this.rank.text = 0 < rankModel.selfPos && rankModel.selfPos <= 1000 ? rankModel.selfPos + '' : "未上榜";
        this.list.itemRenderer = FbAndLevelsRankItem;
        this.list.dataProvider = new eui.ArrayCollection(rankModel.getDataList());
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
    };
    FbAndLevelsRankWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.closeBtn0, this.onTap);
    };
    FbAndLevelsRankWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
            case this.closeBtn0:
                ViewManager.ins().close(FbAndLevelsRankWin);
                break;
        }
    };
    return FbAndLevelsRankWin;
}(BaseEuiView));
__reflect(FbAndLevelsRankWin.prototype, "FbAndLevelsRankWin");
ViewManager.ins().reg(FbAndLevelsRankWin, LayerManager.UI_Popup);
//# sourceMappingURL=FbAndLevelsRankWin.js.map