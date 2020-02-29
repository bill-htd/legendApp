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
var RuneReplaceSpecialItemRenderer = (function (_super) {
    __extends(RuneReplaceSpecialItemRenderer, _super);
    function RuneReplaceSpecialItemRenderer() {
        return _super.call(this) || this;
    }
    RuneReplaceSpecialItemRenderer.prototype.dataChanged = function () {
        var itemData = this.data;
        if (itemData && itemData instanceof ItemData) {
            var rbc = RuneConfigMgr.ins().getBaseCfg(itemData);
            this.itemIcon.setData(itemData.itemConfig);
            this.nameLab.textFlow = new egret.HtmlTextParser().parser("<font color = '" + ItemConfig.getQualityColor(itemData.itemConfig) + "'>" + itemData.itemConfig.name + "</font>");
            if (rbc.attr) {
                this.power.text = "评分：" + UserBag.getAttrPower(rbc.attr);
            }
            else {
                this.power.text = "评分：" + rbc.power;
            }
            this.numLab.text = itemData.count.toString();
            this.specialEffLab.text = rbc.specialDesc;
        }
        else {
            this.resetView();
        }
    };
    RuneReplaceSpecialItemRenderer.prototype.resetView = function () {
        this.itemIcon.setData(null);
        this.nameLab.text = "";
        this.specialEffLab.text = "";
        this.power.text = "";
        this.numLab.text = "";
    };
    return RuneReplaceSpecialItemRenderer;
}(eui.ItemRenderer));
__reflect(RuneReplaceSpecialItemRenderer.prototype, "RuneReplaceSpecialItemRenderer");
//# sourceMappingURL=RuneReplaceSpecialItemRenderer.js.map