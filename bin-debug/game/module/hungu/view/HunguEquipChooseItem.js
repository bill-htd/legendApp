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
var HunguEquipChooseItem = (function (_super) {
    __extends(HunguEquipChooseItem, _super);
    function HunguEquipChooseItem() {
        var _this = _super.call(this) || this;
        _this.skinName = 'hunguChooseItem';
        _this.init();
        return _this;
    }
    HunguEquipChooseItem.prototype.init = function () {
        this.changeBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
    };
    HunguEquipChooseItem.prototype.dataChanged = function () {
        if (!this.data || !this.data.id || isNaN(this.data.roleId))
            return;
        var pow = UserBag.getAttrPower(GlobalConfig.HunGuEquip[this.data.id].attrs);
        var expow = GlobalConfig.HunGuEquip[this.data.id].expower;
        expow = expow ? expow : 0;
        pow += expow;
        this.now.visible = false;
        this.power.text = "\u8BC4\u5206\uFF1A" + pow;
        var config = GlobalConfig.ItemConfig[this.data.id];
        var color = ItemConfig.getQualityColor(config);
        this.quality.textFlow = TextFlowMaker.generateTextFlow1("|C:" + color + "&T:" + Hungu.ins().getHunguItemQualityName(config.id));
        this.itemIcon.setData(config);
        for (var i = 0; i < 3; i++) {
            if (this["group" + i] && this["attr" + i]) {
                if (GlobalConfig.HunGuEquip[this.data.id].attrs[i]) {
                    if (!this["group" + i].parent)
                        this.addChild(this["group" + i]);
                    this["attr" + i].text = AttributeData.getAttrNameByAttrbute(GlobalConfig.HunGuEquip[this.data.id].attrs[i], true);
                    if (this["betterArrow" + i] && this["forgeAttr" + i]) {
                        this["betterArrow" + i].visible = this["forgeAttr" + i].visible = false;
                        var j = ItemConfig.getSubType(config);
                        if (!Hungu.ins().hunguData[this.data.roleId] || !Hungu.ins().hunguData[this.data.roleId].items[j].itemId) {
                            this["betterArrow" + i].visible = this["forgeAttr" + i].visible = true;
                            this["forgeAttr" + i].text = "+" + GlobalConfig.HunGuEquip[this.data.id].attrs[i].value;
                        }
                        else {
                            var itemId = Hungu.ins().hunguData[this.data.roleId].items[j].itemId;
                            for (var z = 0; z < GlobalConfig.HunGuEquip[itemId].attrs.length; z++) {
                                if (GlobalConfig.HunGuEquip[itemId].attrs[z].type == GlobalConfig.HunGuEquip[this.data.id].attrs[i].type) {
                                    if (GlobalConfig.HunGuEquip[itemId].attrs[z].value > GlobalConfig.HunGuEquip[this.data.id].attrs[i].value)
                                        this["betterArrow" + i].visible = this["forgeAttr" + i].visible = true;
                                    break;
                                }
                            }
                        }
                    }
                }
                else {
                    DisplayUtils.removeFromParent(this["group" + i]);
                }
            }
        }
    };
    HunguEquipChooseItem.prototype.setWearVisible = function (v) {
        if (v === void 0) { v = false; }
        this.now.visible = v;
        this.changeBtn.visible = !this.now.visible;
    };
    HunguEquipChooseItem.prototype.onClick = function () {
        var config = GlobalConfig.ItemConfig[this.data.id];
        var pos = ItemConfig.getSubType(config);
        Hungu.ins().sendHunguItems(this.data.roleId, pos, this.data.id);
    };
    return HunguEquipChooseItem;
}(eui.ItemRenderer));
__reflect(HunguEquipChooseItem.prototype, "HunguEquipChooseItem");
//# sourceMappingURL=HunguEquipChooseItem.js.map