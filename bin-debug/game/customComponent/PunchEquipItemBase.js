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
var PunchEquipItemBase = (function (_super) {
    __extends(PunchEquipItemBase, _super);
    function PunchEquipItemBase() {
        var _this = _super.call(this) || this;
        _this.skinName = 'PunchEquipItemSkin';
        return _this;
    }
    PunchEquipItemBase.prototype.dataChanged = function () {
        this.validateNow();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        var award = this.data;
        var data = this.wearData = new ItemData();
        data.configID = award.id;
        this.addBtn.visible = false;
        this.redPoint.visible = false;
        this.img.source = "";
        if (data && data.itemConfig) {
            this.img.source = "" + (data.itemConfig.zsLevel || 0) + data.itemConfig.level + "_" + (ItemConfig.getSubType(data.itemConfig) + 1) + "_png";
        }
        else {
            this.img.source = "";
        }
    };
    PunchEquipItemBase.prototype.destruct = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    };
    PunchEquipItemBase.prototype.onTap = function () {
        if (this.wearData && this.wearData.configID != 0)
            ViewManager.ins().open(HejiEquipTipsWin, this.wearData, true);
        else
            ViewManager.ins().open(PunchEquipChooseWin, this.data, 0);
    };
    return PunchEquipItemBase;
}(BaseComponent));
__reflect(PunchEquipItemBase.prototype, "PunchEquipItemBase");
//# sourceMappingURL=PunchEquipItemBase.js.map