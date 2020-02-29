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
var BreakDownItemRenderer = (function (_super) {
    __extends(BreakDownItemRenderer, _super);
    function BreakDownItemRenderer() {
        var _this = _super.call(this) || this;
        _this.configID = 0;
        return _this;
    }
    BreakDownItemRenderer.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.itemIcon.imgJob.visible = false;
    };
    BreakDownItemRenderer.prototype.dataChanged = function () {
        var itemConfig = this.data.itemConfig;
        if (itemConfig.zsLevel > 0) {
            this.level.text = itemConfig.zsLevel + "转";
        }
        else {
            this.level.text = itemConfig.level ? "Lv." + itemConfig.level : "Lv.1";
        }
        this.itemIcon.setData(itemConfig);
        this.equipName.text = "" + itemConfig.name;
        this.equipName.textColor = ItemConfig.getQualityColor(itemConfig);
        if (ItemConfig.getType(itemConfig) == ItemType.TYPE_9) {
            var decomConf = Book.ins().getDecomposeConfigByItemId(itemConfig.id);
            var descValue = 0;
            if (decomConf)
                descValue = decomConf.value;
            else {
                var cfg = GlobalConfig.DecomposeConfig[67];
                if (cfg)
                    descValue = cfg.value;
            }
            this.desc.text = "\u56FE\u9274\u7ECF\u9A8C x" + descValue;
            this.tip.visible = true;
            this.tip.x = this.equipName.x + this.equipName.width;
            this.level.text = '';
        }
        else {
            var currItem = GlobalConfig.EquipConfig[itemConfig.id];
            if (!currItem)
                return;
            var rewardItem = GlobalConfig.ItemConfig[currItem.stoneId];
            if (!rewardItem)
                return;
            this.desc.text = rewardItem.name + " x " + currItem.stoneNum;
            this.desc.textColor = this.equipName.textColor;
            var subType = ItemConfig.getSubType(itemConfig);
            var id = UserEquip.ins().getEquipConfigIDByPosAndQuality(subType, ItemConfig.getQuality(itemConfig));
            var fitConfig = GlobalConfig.ItemConfig[id];
            var l1zs = itemConfig.zsLevel ? itemConfig.zsLevel : 0;
            var flzs = fitConfig.zsLevel ? fitConfig.zsLevel : 0;
            var l1lv = itemConfig.level ? itemConfig.level : 0;
            var fllv = fitConfig.level ? fitConfig.level : 0;
            var L = l1zs * 10000 + l1lv;
            var fitL = flzs * 10000 + fllv;
            if (fitL > L) {
                if (UserZs.ins().lv >= flzs && Actor.level >= fllv) {
                    this.tip.visible = false;
                }
                else {
                    this.tip.visible = true;
                    this.tip.x = this.equipName.x + this.equipName.width;
                }
            }
            else {
                this.tip.visible = false;
            }
        }
        this.configID = this.data.handle;
    };
    return BreakDownItemRenderer;
}(BaseItemRender));
__reflect(BreakDownItemRenderer.prototype, "BreakDownItemRenderer");
//# sourceMappingURL=BreakDownItemRenderer.js.map