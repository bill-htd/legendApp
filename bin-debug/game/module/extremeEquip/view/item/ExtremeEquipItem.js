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
var ExtremeEquipItem = (function (_super) {
    __extends(ExtremeEquipItem, _super);
    function ExtremeEquipItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtremeEquipItem.prototype.dataChanged = function () {
        var subType = this.data;
        this.redPoint.visible = ExtremeEquipModel.ins().canOperate(ExtremeEquipModel.ins().selectJob, subType);
        var zhiZunLv = ExtremeEquipModel.ins().getZhiZunLv(ExtremeEquipModel.ins().selectJob, subType);
        var desc;
        if (zhiZunLv <= 0) {
            desc = ExtremeEquipModel.ins().descNames[subType];
        }
        else {
            desc = ExtremeEquipModel.ins().descNames[subType];
        }
        this.nameLabel.text = desc;
        this.selectIcon.visible = this.selected;
        this.itemIcon.source = "icon_extreme_0" + subType;
    };
    ExtremeEquipItem.prototype.setSelect = function (isSelect) {
        this.selectIcon.visible = isSelect;
    };
    return ExtremeEquipItem;
}(ItemRenderer));
__reflect(ExtremeEquipItem.prototype, "ExtremeEquipItem");
//# sourceMappingURL=ExtremeEquipItem.js.map