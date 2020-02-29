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
var HeartMethodDecomposeItemRenderer = (function (_super) {
    __extends(HeartMethodDecomposeItemRenderer, _super);
    function HeartMethodDecomposeItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "heartmethodItemSkin";
        return _this;
    }
    HeartMethodDecomposeItemRenderer.prototype.dataChanged = function () {
        this.cb.touchChildren = false;
        this.cb.touchEnabled = false;
        var rdid = this.data;
        var itemData = rdid.itemData;
        if (itemData && itemData instanceof ItemData) {
            var rbc = HeartMethod.ins().getHeartCfg(itemData);
            if (rbc) {
                this.itemIcon.data = itemData;
            }
            else {
                this.resetView();
            }
        }
        else {
            this.resetView();
        }
        this.cb.selected = rdid.isSelected;
    };
    HeartMethodDecomposeItemRenderer.prototype.resetView = function () {
        this.itemIcon.data = null;
    };
    HeartMethodDecomposeItemRenderer.prototype.playEffect = function () {
        if (!this.cb.selected)
            return;
    };
    return HeartMethodDecomposeItemRenderer;
}(eui.ItemRenderer));
__reflect(HeartMethodDecomposeItemRenderer.prototype, "HeartMethodDecomposeItemRenderer");
//# sourceMappingURL=HeartMethodDecomposeItemRenderer.js.map