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
var SmeltSelectItem = (function (_super) {
    __extends(SmeltSelectItem, _super);
    function SmeltSelectItem() {
        var _this = _super.call(this) || this;
        _this.translate = {
            'hp': AttributeType.atMaxHp,
            'atk': AttributeType.atAttack,
            'def': AttributeType.atDef,
            'res': AttributeType.atRes,
            'crit': AttributeType.atCrit,
            'tough': AttributeType.atTough
        };
        _this.skinName = "SmeltSeletctItemSkin";
        _this.touchChildren = false;
        return _this;
    }
    SmeltSelectItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    SmeltSelectItem.prototype.dataChanged = function () {
        if (this.data instanceof ItemData) {
            var data = this.data;
            this.itemConfig = data.itemConfig;
            this.arrowIcon.visible = false;
            if (!this.itemConfig)
                return;
            this.itemIcon.setData(this.itemConfig);
            var type = ItemConfig.getType(this.itemConfig);
            if (type == 4) {
                this.updateWingEquip();
                this.lvLabel.text = this.itemConfig.name;
            }
            else if (type == 0) {
                this.lvLabel.text = ((this.itemConfig.zsLevel) ? this.itemConfig.zsLevel + "转" : "lv." + this.itemConfig.level);
            }
            else {
                this.lvLabel.text = '';
            }
            this.nameLabel.textColor = ItemConfig.getQualityColor(this.itemConfig);
            this.nameLabel.text = this.itemConfig.name;
            this.gradeLabel.text = "评分：" + data.point;
            this.attrLabel.text = AttributeData.getAttrInfoByItemData(data);
        }
    };
    SmeltSelectItem.prototype.updateWingEquip = function () {
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            var wingsData = SubRoles.ins().getSubRoleByIndex(i).wingsData;
            var equipLen = wingsData.equipsLen;
            for (var k = 0; k < equipLen; k++) {
                var equdata = wingsData.getEquipByIndex(k);
                if (equdata.item.configID != 0) {
                    if (ItemConfig.getSubType(this.data.itemConfig) == ItemConfig.getSubType(equdata.item.itemConfig)
                        && this.data.point > equdata.item.point) {
                        this.arrowIcon.visible = true;
                        return;
                    }
                }
                else if (this.data.itemConfig.subType == k) {
                    this.arrowIcon.visible = true;
                    return;
                }
            }
        }
    };
    return SmeltSelectItem;
}(BaseItemRender));
__reflect(SmeltSelectItem.prototype, "SmeltSelectItem");
//# sourceMappingURL=SmeltSelectItem.js.map