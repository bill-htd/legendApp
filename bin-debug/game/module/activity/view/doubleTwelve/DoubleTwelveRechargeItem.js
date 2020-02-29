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
var DoubleTwelveRechargeItem = (function (_super) {
    __extends(DoubleTwelveRechargeItem, _super);
    function DoubleTwelveRechargeItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DoubleTwelveRechargeItem.prototype.dataChanged = function () {
        this.item.isShowName(false);
        this.item.data = this.data;
        if (this.data.type == 0) {
            var type = 1;
            switch (this.data.id) {
                case MoneyConst.yuanbao:
                    type = 5;
                    break;
                case MoneyConst.gold:
                    type = 0;
                    break;
                case MoneyConst.soul:
                    type = 2;
                    break;
                case MoneyConst.piece:
                    type = 2;
                    break;
                case MoneyConst.godweaponExp:
                    type = 2;
                    break;
                default:
                    break;
            }
            this.nameTxt.text = RewardData.getCurrencyName(this.data.id);
            this.nameTxt.textColor = ItemBase.QUALITY_COLOR[type];
        }
        else {
            var item = GlobalConfig.ItemConfig[this.data.id];
            this.nameTxt.text = item.name;
            this.nameTxt.textColor = ItemConfig.getQualityColor(item);
        }
    };
    return DoubleTwelveRechargeItem;
}(ItemRenderer));
__reflect(DoubleTwelveRechargeItem.prototype, "DoubleTwelveRechargeItem");
//# sourceMappingURL=DoubleTwelveRechargeItem.js.map