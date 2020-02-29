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
var EquipTipsBase = (function (_super) {
    __extends(EquipTipsBase, _super);
    function EquipTipsBase() {
        var _this = _super.call(this) || this;
        _this.skinName = "UsualEquipTipsSkin";
        return _this;
    }
    EquipTipsBase.prototype.otherClose = function (e) {
        ViewManager.ins().close(this);
    };
    EquipTipsBase.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (this.func)
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.func, this);
    };
    EquipTipsBase.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEndEvent(this, this.otherClose);
        this.itemType = param[0];
        this.id = param[1];
        this.sco = param[2];
        this.power = param[3];
        this.desc = param[4];
        this.attrs = param[5];
        this.func = param[6];
        if (this.func) {
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.func, this);
        }
        else {
            this.setHideButton();
        }
        var itemConfig = GlobalConfig.ItemConfig[this.id];
        this.itemIcon.setData(itemConfig);
        var q = ItemConfig.getQuality(itemConfig);
        this.quali.source = q > 0 ? "quali" + q : "";
        this.nameLabel.textFlow = TextFlowMaker.generateTextFlow1("|C:" + ItemConfig.getQualityColor(itemConfig) + "&T:" + itemConfig.name);
        this.score.text = "\u8BC4\u5206\uFF1A" + this.sco;
        this.typeName.textFlow = TextFlowMaker.generateTextFlow1(this.desc.left);
        this.typeValue.textFlow = TextFlowMaker.generateTextFlow1(this.desc.right);
        this.powerPanel.setPower(this.power);
        for (var i = 0; i < this.attrs.length; i++) {
            var equip = new EquipTipsItemBase();
            equip.data = { title: this.attrs[i].title, attributeData: this.attrs[i].attr, colorName: this.attrs[i].colorName, colorValue: this.attrs[i].colorValue, others: this.attrs[i].others };
            this.content.addChild(equip);
        }
    };
    EquipTipsBase.prototype.setHideButton = function () {
        this.changeBtn.visible = false;
    };
    return EquipTipsBase;
}(BaseEuiView));
__reflect(EquipTipsBase.prototype, "EquipTipsBase");
ViewManager.ins().reg(EquipTipsBase, LayerManager.UI_Popup);
//# sourceMappingURL=EquipTipsBase.js.map