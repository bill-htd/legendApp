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
var ShenshouEquipItem = (function (_super) {
    __extends(ShenshouEquipItem, _super);
    function ShenshouEquipItem() {
        var _this = _super.call(this) || this;
        _this.equipName = ["", "\u8840\u77B3", "\u9B54\u8EAF", "\u5996\u5C3E", "\u5723\u89D2", "\u9B3C\u722A"];
        _this.qualityName = ["白1星", "白1星", "紫1星", "紫1星", "紫1星", "橙1星", "橙1星", "橙1星", "红3星"];
        _this.qualityObj = [0, 0, 2, 2, 2, 3, 3, 3, 4];
        _this.touchChildren = false;
        _this.touchChildren = false;
        return _this;
    }
    ShenshouEquipItem.prototype.setPosData = function (shoushenId, pos) {
        var quality = GlobalConfig.ShenShouBase[shoushenId].minLevel[pos - 1];
        this.imgBg.source = 'quality0';
        this.nameTxt.text = this.qualityName[quality] + this.equipName[pos];
        this.nameTxt.textColor = ItemBase.QUALITY_COLOR[0];
        this.imgIcon.source = "ss_equip" + (pos - 1);
        this.equipLv.text = "";
        this.data = null;
    };
    ShenshouEquipItem.prototype.dataChanged = function () {
        if (!isNaN(this.data) && this.data) {
            this.itemConfig = GlobalConfig.ItemConfig[this.data];
            this.nameTxt.text = this.itemConfig.name;
            this.nameTxt.textColor = ItemConfig.getQualityColor(this.itemConfig);
            this.imgBg.source = 'quality' + ItemConfig.getQuality(this.itemConfig);
            this.imgIcon.source = this.itemConfig.icon + "_png";
            var lv = ShenshouModel.ins().getEquipLv(this.itemConfig.id) - 1;
            this.equipLv.text = lv > 0 ? "+" + lv : "";
        }
    };
    return ShenshouEquipItem;
}(BaseItemRender));
__reflect(ShenshouEquipItem.prototype, "ShenshouEquipItem");
//# sourceMappingURL=ShenshouEquipItem.js.map