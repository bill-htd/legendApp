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
var OSARankTipsWin = (function (_super) {
    __extends(OSARankTipsWin, _super);
    function OSARankTipsWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "OSARankTipsSkin";
        return _this;
    }
    OSARankTipsWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
    };
    OSARankTipsWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEndEvent(this.bgClose, this.onClick);
        this.arr = param[0];
        this.rankType = param[1];
        this.record.itemRenderer = OSATargetItemRender4;
        this.init();
    };
    OSARankTipsWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.onClick);
        this.removeObserve();
    };
    OSARankTipsWin.prototype.init = function () {
        switch (this.rankType) {
            case RankDataType.TYPE_BAOSHI:
                this.title.text = "开服铸造榜";
                break;
            case RankDataType.TYPE_LONGHUN:
                this.title.text = "开服龙魂榜";
                break;
            case RankDataType.TYPE_WING:
                this.title.text = "开服翅膀榜";
                break;
            case RankDataType.TYPE_BOOK:
                this.title.text = "开服图鉴榜";
                break;
            case RankDataType.TYPE_ZS:
                this.title.text = "开服转生榜";
                break;
            case RankDataType.TYPE_SCORE:
                this.title.text = "开服装备榜";
                break;
            case RankDataType.TYPE_HF_XIAOFEI:
                this.title.text = "合服消费榜";
                break;
        }
        this.record.dataProvider = new eui.ArrayCollection(this.arr);
    };
    OSARankTipsWin.prototype.onClick = function () {
        ViewManager.ins().close(this);
    };
    return OSARankTipsWin;
}(BaseEuiView));
__reflect(OSARankTipsWin.prototype, "OSARankTipsWin");
ViewManager.ins().reg(OSARankTipsWin, LayerManager.UI_Popup);
//# sourceMappingURL=OSARankTipsWin.js.map