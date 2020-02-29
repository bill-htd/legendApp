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
var PunchEquipItem = (function (_super) {
    __extends(PunchEquipItem, _super);
    function PunchEquipItem() {
        var _this = _super.call(this) || this;
        _this.wearData = null;
        _this.skinName = 'PunchEquipItemSkin';
        return _this;
    }
    PunchEquipItem.prototype.dataChanged = function () {
        this.img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        var data = UserSkill.ins().equipListData[this.data];
        this.wearData = UserSkill.ins().getWearEquipsData(this.data);
        this.img.source = "";
        this.addBtn.visible = true;
        if (data && data.itemConfig) {
            var subType = ItemConfig.getSubType(data.itemConfig);
            var nameStrig1 = 'new_juese_heji_pintu';
            var nameStrig = 'new_juese_heji_pingtu';
            var numebr = subType + 1;
            switch (data.itemConfig.zsLevel) {
                case 1:
                    nameStrig += '03_0' + numebr;
                    break;
                case 3:
                    nameStrig += '04_0' + numebr;
                    break;
                case 4:
                    nameStrig += '05_0' + numebr;
                    break;
                case 5:
                    nameStrig += '06_0' + numebr;
                    break;
                case 6:
                    nameStrig += '07_0' + numebr;
                    break;
                case 7:
                    nameStrig += '08_0' + numebr;
                    break;
                default:
                    switch (data.itemConfig.level) {
                        case 60:
                            nameStrig1 += '01_0' + numebr;
                            nameStrig = nameStrig1;
                            break;
                        case 70:
                            nameStrig += '02_0' + numebr;
                            break;
                    }
                    break;
            }
            this.img.source = nameStrig;
            this.redPoint.visible = UserSkill.ins().checkIsHaveBestEquip(subType);
        }
        else {
            this.img.source = "";
            this.redPoint.visible = UserSkill.ins().checkIsHaveBestEquip(this.data);
        }
    };
    PunchEquipItem.prototype.destruct = function () {
        this.img.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.addBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    };
    PunchEquipItem.prototype.onTap = function () {
        if (this.wearData && this.wearData.configID != 0)
            ViewManager.ins().open(HejiEquipTipsWin, this.wearData, true);
        else
            ViewManager.ins().open(HejiEquipTipsWin, this.data, true);
    };
    return PunchEquipItem;
}(BaseComponent));
__reflect(PunchEquipItem.prototype, "PunchEquipItem");
//# sourceMappingURL=PunchEquipItem.js.map