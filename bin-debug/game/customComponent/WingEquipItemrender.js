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
var WingEquipItemrender = (function (_super) {
    __extends(WingEquipItemrender, _super);
    function WingEquipItemrender() {
        var _this = _super.call(this) || this;
        _this.skinName = "WingEquipItemSkin";
        _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onClick, _this);
        return _this;
    }
    WingEquipItemrender.prototype.dataChanged = function () {
        var model = this.data;
        var curRole = model["curRole"];
        var itemData = model["data"];
        this.role = SubRoles.ins().getSubRoleByIndex(curRole);
        this.itemConfig = itemData.itemConfig;
        this.item0.setData(itemData.itemConfig);
        this.equipXuqiu.text = "\u9700\u6C42\uFF1A\u7FBD\u7FFC\u8FBE\u5230" + (this.itemConfig.level + 1) + "\u9636";
        this.equipXuqiu.textColor = 0xf3311e;
        this.equipName.text = itemData.itemConfig.name;
        this.score.text = "\u8BC4\u5206\uFF1A" + itemData.point;
    };
    WingEquipItemrender.prototype.descut = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
    };
    WingEquipItemrender.prototype.onClick = function () {
        this.openEquipsTips();
    };
    WingEquipItemrender.prototype.openEquipsTips = function () {
        ViewManager.ins().open(EquipDetailedWin, 1, this.data.data.handle, this.itemConfig.id, this.data.data, this.role);
    };
    return WingEquipItemrender;
}(BaseItemRender));
__reflect(WingEquipItemrender.prototype, "WingEquipItemrender");
//# sourceMappingURL=WingEquipItemrender.js.map