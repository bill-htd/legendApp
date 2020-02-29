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
var ShenshouWearEquipItem = (function (_super) {
    __extends(ShenshouWearEquipItem, _super);
    function ShenshouWearEquipItem() {
        return _super.call(this) || this;
    }
    ShenshouWearEquipItem.prototype.childrenCreated = function () {
    };
    ShenshouWearEquipItem.prototype.dataChanged = function () {
        if (this.data instanceof ShenshouEquipData) {
            this.itemIcon.data = this.data.id;
            var itemConfig = GlobalConfig.ItemConfig[this.data.id];
            this.quality.text = ShenshouModel.EQUIPE_QUALITY_CN[ItemConfig.getQuality(itemConfig)];
            this.quality.textColor = ItemConfig.getQualityColor(itemConfig);
            this.now.visible = false;
            this.best.visible = false;
            this.changeBtn.visible = true;
            if (this.data.sortIndex == Number.MAX_VALUE) {
                this.now.visible = true;
                this.changeBtn.visible = false;
            }
            if (this.data.best) {
                this.best.visible = true;
            }
            var baseEquip = GlobalConfig.ShenShouEquip[ShenshouModel.ins().getEquipBaseId(this.data.id)];
            var equipDp = GlobalConfig.ShenShouEquip[this.data.id];
            var myDt = ShenshouModel.ins().getDataById(this.data.shenshuId);
            var myBaseEquip = myDt ? GlobalConfig.ShenShouEquip[ShenshouModel.ins().getEquipBaseId(myDt.equipIDs[this.data.pos])] : null;
            for (var i = 0; i < 3; i++) {
                if (equipDp.attrs[i]) {
                    this["attr" + i].visible = true;
                    this["attr" + i].text = AttributeData.getAttStrByType(baseEquip.attrs[i], 0, ":");
                    this["betterArrow" + i].visible = !myBaseEquip || myBaseEquip && baseEquip.attrs[i].value > myBaseEquip.attrs[i].value;
                    if (equipDp.attrs[i].value > baseEquip.attrs[i].value) {
                        this["forgeAttr" + i].visible = true;
                        this["forgeAttr" + i].text = "+" + (equipDp.attrs[i].value - baseEquip.attrs[i].value);
                    }
                    else {
                        this["forgeAttr" + i].visible = false;
                    }
                }
                else {
                    this["attr" + i].visible = false;
                    this["betterArrow" + i].visible = false;
                    this["forgeAttr" + i].visible = false;
                }
            }
            var score = UserBag.getAttrPower(equipDp.attrs);
            if (equipDp.expower)
                score += equipDp.expower;
            this.power.text = "\u8BC4\u5206\uFF1A" + score * 3;
        }
    };
    return ShenshouWearEquipItem;
}(BaseItemRender));
__reflect(ShenshouWearEquipItem.prototype, "ShenshouWearEquipItem");
//# sourceMappingURL=ShenshouWearEquipItem.js.map