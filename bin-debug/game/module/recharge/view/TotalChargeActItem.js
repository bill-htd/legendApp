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
var TotalChargeActItem = (function (_super) {
    __extends(TotalChargeActItem, _super);
    function TotalChargeActItem() {
        var _this = _super.call(this) || this;
        _this.skinName = 'TotalChargeActItemSkin';
        _this.list.itemRenderer = ItemBase;
        return _this;
    }
    TotalChargeActItem.prototype.dataChanged = function () {
        this.price.setType(MoneyConst.yuanbao);
        var config = this.data;
        var num = Recharge.ins().getRechargeData(1).num;
        this._index = config.index;
        this.price.setPrice(config.pay);
        this.list.dataProvider = new eui.ArrayCollection(config.awardList);
        var bool = this.getRemindByIndex(this._index);
        if (num >= config.pay) {
            if (bool) {
                this.rewardBtn.visible = false;
                this.rewardedTip.visible = true;
            }
            else {
                this.rewardBtn.visible = true;
                this.rewardedTip.visible = false;
                this.rewardBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
            }
        }
        else {
            this.rewardBtn.visible = this.rewardedTip.visible = false;
        }
    };
    TotalChargeActItem.prototype.getRemindByIndex = function (index) {
        return ((Recharge.ins().getRechargeData(1).isAwards >> index) & 1) == 1;
    };
    TotalChargeActItem.prototype.onClick = function () {
        Recharge.ins().sendGetAwards(1, this._index);
        this.rewardBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onClick, this);
    };
    return TotalChargeActItem;
}(BaseItemRender));
__reflect(TotalChargeActItem.prototype, "TotalChargeActItem");
//# sourceMappingURL=TotalChargeActItem.js.map