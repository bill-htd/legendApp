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
var HeirloomDownItemRenderer = (function (_super) {
    __extends(HeirloomDownItemRenderer, _super);
    function HeirloomDownItemRenderer() {
        var _this = _super.call(this) || this;
        _this.configID = 0;
        return _this;
    }
    HeirloomDownItemRenderer.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    HeirloomDownItemRenderer.prototype.dataChanged = function () {
        var itemConfig = this.data.itemConfig;
        var hConfig = GlobalConfig.HeirloomEquipItemConfig;
        for (var i in hConfig) {
            if (hConfig[i].item == itemConfig.id) {
                var pos = hConfig[i].pos;
                var info = GlobalConfig.HeirloomEquipConfig[pos][1];
                this.itemicon.data = { pos: pos, info: info };
                this.itemicon.cleanEff();
                var costConfig = GlobalConfig.ItemConfig[hConfig[i].downitem.id];
                var nameLabel = costConfig.name ? costConfig.name : "传世宝钻";
                this.desc.text = nameLabel + " x" + hConfig[i].downitem.count;
                break;
            }
        }
        this.tip.visible = this.data.isSuggest;
        this.equipName.text = itemConfig.name;
        this.equipName.textColor = ItemConfig.getQualityColor(itemConfig);
    };
    return HeirloomDownItemRenderer;
}(BaseItemRender));
__reflect(HeirloomDownItemRenderer.prototype, "HeirloomDownItemRenderer");
//# sourceMappingURL=HeirloomDownItemRenderer.js.map