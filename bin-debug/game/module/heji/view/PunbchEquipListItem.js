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
var PunchEquipListItem = (function (_super) {
    __extends(PunchEquipListItem, _super);
    function PunchEquipListItem() {
        var _this = _super.call(this) || this;
        _this.skinName = 'PunchEquipChangeSkinItem';
        return _this;
    }
    PunchEquipListItem.prototype.dataChanged = function () {
        if (!this.data || !this.data.itemConfig)
            return;
        var itemdata = this.data;
        var att = itemdata.att;
        var equipConfig = GlobalConfig.EquipConfig[itemdata.configID];
        var str1 = "";
        var str2 = "";
        this.now.visible = false;
        var i = 0;
        for (var k in AttributeData.translate) {
            if (!equipConfig[k] || equipConfig[k] <= 0)
                continue;
            var tempAtt = new AttributeData(AttributeData.translate[k], equipConfig[k]);
            var attrStr = "";
            attrStr = AttributeData.getAttStrByType(tempAtt, 0, "  ");
            if (i % 2 == 0) {
                str1 += StringUtils.complementByChar(attrStr, 32);
            }
            else {
                str1 += attrStr + "\n";
            }
            i++;
        }
        this.attr1.textFlow = new egret.HtmlTextParser().parser(str1);
        if (equipConfig.baseAttr1) {
            str2 = AttributeData.getAttStrByType(equipConfig.baseAttr1, 1, "");
        }
        else {
            str2 = AttributeData.getExtAttStrByType(equipConfig.exAttr1, 1, "");
        }
        this.attr2.text = str2;
        this.changeBtn.visible = true;
        this.nameTxt.text = itemdata.itemConfig.name;
    };
    PunchEquipListItem.prototype.setBtnStatu = function () {
        this.changeBtn.visible = false;
        this.now.visible = true;
    };
    return PunchEquipListItem;
}(eui.ItemRenderer));
__reflect(PunchEquipListItem.prototype, "PunchEquipListItem");
//# sourceMappingURL=PunbchEquipListItem.js.map