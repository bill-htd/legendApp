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
var DressTipsWin = (function (_super) {
    __extends(DressTipsWin, _super);
    function DressTipsWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "DressTipsSkin";
        return _this;
    }
    DressTipsWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.itemConfig = param[0];
        this.itemId = this.itemConfig.id;
        this.addTouchEvent(this.takeBtn, this.onTap);
        this.addTouchEndEvent(this, this.otherClose);
        this.setTipsData();
    };
    DressTipsWin.prototype.close = function () {
        this.itemData = null;
    };
    DressTipsWin.prototype.setTipsData = function () {
        var data = this.getIdByItemId(this.itemId);
        this.itemData = data;
        if (!data)
            return;
        var attr = data.attr;
        var power = UserBag.getAttrPower(AttributeData.transformAttr(attr));
        this.powerPanel.setPower(power);
        this.itemname.text = data.name;
        var res = data.show_img;
        this.module.source = res;
        this.quali.source = "quali" + ItemConfig.getQuality(this.itemConfig);
        this.style.text = DressTypeName[data.pos];
        this.dressName.source = data.dress_name + "_png";
        var equip = new EquipTipsItemBase();
        equip.data = { title: "普通属性", attributeData: attr, colorName: 0, colorValue: 0, others: null };
        this.content.addChild(equip);
        if (data.special_attr_desc) {
            var special = new DressSpecialTipsBase();
            special.setData({ title: "\u7279\u6B8A\u5C5E\u6027", attrDesc: data.special_attr_desc });
            this.content.addChild(special);
        }
    };
    DressTipsWin.prototype.onTap = function () {
        ViewManager.ins().open(DressWin, 0, this.itemData.pos - 1, this.itemData.id);
    };
    DressTipsWin.prototype.otherClose = function (e) {
        ViewManager.ins().close(this);
    };
    DressTipsWin.prototype.getIdByItemId = function (itemId) {
        var allData = GlobalConfig.ZhuangBanId;
        for (var key in allData) {
            var element = allData[key];
            if (element.cost.itemId == itemId) {
                return element;
            }
        }
        return null;
    };
    return DressTipsWin;
}(BaseEuiView));
__reflect(DressTipsWin.prototype, "DressTipsWin");
ViewManager.ins().reg(DressTipsWin, LayerManager.UI_Popup);
//# sourceMappingURL=DressTipsWin.js.map