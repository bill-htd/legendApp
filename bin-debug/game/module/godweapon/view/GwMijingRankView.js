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
var GwMijingRankView = (function (_super) {
    __extends(GwMijingRankView, _super);
    function GwMijingRankView() {
        var _this = _super.call(this) || this;
        _this.skinName = "GwMijingRankSkin";
        return _this;
    }
    GwMijingRankView.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.touchEnabled = true;
        this.addTouchEvent(this.bgClose, this.touchHandler);
        this._ary = new eui.ArrayCollection();
        this.list.dataProvider = this._ary;
        this.list.itemRenderer = GwMijingRankItemRender;
    };
    GwMijingRankView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this._ary.replaceAll(GodWeaponCC.ins().rankInfoDataAry);
    };
    GwMijingRankView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.touchHandler);
        this.list.dataProvider = null;
    };
    GwMijingRankView.prototype.touchHandler = function (e) {
        ViewManager.ins().close(this);
    };
    return GwMijingRankView;
}(BaseEuiView));
__reflect(GwMijingRankView.prototype, "GwMijingRankView");
var GwMijingRankItemRender = (function (_super) {
    __extends(GwMijingRankItemRender, _super);
    function GwMijingRankItemRender() {
        return _super.call(this) || this;
    }
    GwMijingRankItemRender.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!this.data) {
            return;
        }
        this._thisData = this.data;
        this.playerName.text = this._thisData.nameStr;
        this.storeyCount.text = "\u7B2C" + this._thisData.floorNum + "\u5C42";
        this.time.text = this._thisData.getgetTimeStr();
        if (this._thisData.rank <= 3) {
            this.rank.visible = false;
            this.qiansan.visible = true;
            this.qiansan.source = "paihang" + this._thisData.rank;
        }
        else {
            this.rank.text = "" + this._thisData.rank;
            this.rank.visible = true;
            this.qiansan.visible = false;
        }
    };
    return GwMijingRankItemRender;
}(BaseItemRender));
__reflect(GwMijingRankItemRender.prototype, "GwMijingRankItemRender");
ViewManager.ins().reg(GwMijingRankView, LayerManager.UI_Popup);
//# sourceMappingURL=GwMijingRankView.js.map