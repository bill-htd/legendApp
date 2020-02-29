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
var RuneDecomposeItemRenderer = (function (_super) {
    __extends(RuneDecomposeItemRenderer, _super);
    function RuneDecomposeItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "RuneSeletctItemSkin";
        _this.mc = new MovieClip;
        _this.mc.x = 56;
        _this.mc.y = 64;
        _this.mc.scaleX = 1.5;
        _this.mc.scaleY = 1.5;
        _this.addChild(_this.mc);
        return _this;
    }
    RuneDecomposeItemRenderer.prototype.dataChanged = function () {
        this.cb.touchChildren = false;
        this.cb.touchEnabled = false;
        var rdid = this.data;
        var itemData = rdid.itemData;
        if (itemData && itemData instanceof ItemData) {
            var rbc = RuneConfigMgr.ins().getBaseCfg(itemData);
            if (rbc) {
                this.itemIcon.setData(itemData);
                this.power.text = RuneConfigMgr.ins().getcfgAttrDesc(rbc, true);
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
    RuneDecomposeItemRenderer.prototype.resetView = function () {
        this.itemIcon.setData(null);
        this.power.text = "";
    };
    RuneDecomposeItemRenderer.prototype.playEffect = function () {
        if (!this.cb.selected)
            return;
        this.mc.playFile(RES_DIR_EFF + "litboom", 1);
    };
    return RuneDecomposeItemRenderer;
}(eui.ItemRenderer));
__reflect(RuneDecomposeItemRenderer.prototype, "RuneDecomposeItemRenderer");
//# sourceMappingURL=RuneDecomposeItemRenderer.js.map