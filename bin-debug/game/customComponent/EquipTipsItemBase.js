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
var EquipTipsItemBase = (function (_super) {
    __extends(EquipTipsItemBase, _super);
    function EquipTipsItemBase() {
        var _this = _super.call(this) || this;
        _this.skinName = "UsualEquipTipsItemSkin";
        return _this;
    }
    EquipTipsItemBase.prototype.dataChanged = function () {
        if (!this.data)
            return;
        var title = this.data.title;
        var colorName = this.data.colorName;
        var colorValue = this.data.colorValue;
        var attrs = this.data.attributeData;
        var others = this.data.others;
        var attrName = "";
        var attrValue = "";
        if (!others || !others.suitdesc) {
            DisplayUtils.removeFromParent(this.desc1);
        }
        for (var i = 0; i < attrs.length; i++) {
            attrName += AttributeData.getAttrStrByType(attrs[i].type) + ": \n";
            if (attrs[i].type == AttributeType.atMaxHp ||
                attrs[i].type == AttributeType.atAttack ||
                attrs[i].type == AttributeType.atDef ||
                attrs[i].type == AttributeType.atRes) {
                attrValue += attrs[i].value;
            }
            else {
                attrValue += attrs[i].value / 100 + "%";
            }
            attrValue += "\n";
        }
        if (attrName) {
            var index = attrName.lastIndexOf("\n");
            attrName = attrName.substring(0, index);
        }
        if (attrValue) {
            var index = attrValue.lastIndexOf("\n");
            attrValue = attrValue.substring(0, index);
        }
        if (others && others.exdesc) {
            var str = others.exdesc.split("+");
            attrName += "\n" + str[0] + ":";
            attrValue += "\n" + str[1];
        }
        this.attrType.textFlow = TextFlowMaker.generateTextFlow1(title);
        this.attrName.textFlow = TextFlowMaker.generateTextFlow1(colorName ? "|C:" + colorName + "&T:" + attrName : "" + attrName);
        this.attrValue.textFlow = TextFlowMaker.generateTextFlow1(colorValue ? "|C:" + colorValue + "&T:" + attrValue : "" + attrValue);
        if (this.desc1 && this.desc1.parent) {
            this.suit.textFlow = TextFlowMaker.generateTextFlow1(others.suitdesc);
        }
    };
    return EquipTipsItemBase;
}(BaseItemRender));
__reflect(EquipTipsItemBase.prototype, "EquipTipsItemBase");
//# sourceMappingURL=EquipTipsItemBase.js.map