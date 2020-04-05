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
var ChargeItemRenderer = (function (_super) {
    __extends(ChargeItemRenderer, _super);
    function ChargeItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "ChargeItemSkin";
        _this.totalPower = BitmapNumber.ins().createNumPic(0, "vip_v", 5);
        _this.totalPower.x = 0;
        _this.totalPower.y = 0;
        _this.moneyGroup.addChild(_this.totalPower);
        return _this;
    }
    ChargeItemRenderer.prototype.dataChanged = function () {
        this.refushInfo();
    };
    ChargeItemRenderer.prototype.refushInfo = function () {
        this.gain0.text = this.data.itemName;
        this.gain1.text = this.data.desc;
        switch (this.data.icon) {
            case 'cz_11':
                this.yuanbaoImg.source = 'new_chongzhi_yuanbao1';
                break;
            case 'cz_12':
                this.yuanbaoImg.source = 'new_chongzhi_yuanbao2';
                break;
            case 'cz_13':
                this.yuanbaoImg.source = 'new_chongzhi_yuanbao3';
                break;
            case 'cz_14':
                this.yuanbaoImg.source = 'new_chongzhi_yuanbao4';
                break;
            case 'cz_15':
                this.yuanbaoImg.source = 'new_chongzhi_yuanbao5';
                break;
            case 'cz_16':
                this.yuanbaoImg.source = 'new_chongzhi_yuanbao6';
                break;
            default:
                this.yuanbaoImg.source = 'new_chongzhi_yuanbao6';
                break;
        }
        var cost = this.data.cash;
        this.pay.text = "\u539F\u4EF7:" + cost + "\u5143";
        var trueCost = 0;
        switch (cost) {
            case 10:
                this.payPrice.visible = false;
                this.pay1.visible = true;
                break;
            case 20:
                this.payPrice.visible = false;
                this.pay1.visible = true;
                break;
            case 50:
                this.payPrice.visible = false;
                this.pay1.visible = true;
                break;
            case 100:
                this.payPrice.visible = false;
                this.pay1.visible = true;
                break;
            case 200:
                this.payPrice.visible = false;
                this.pay1.visible = true;
                break;
            case 300:
                this.payPrice.visible = false;
                this.pay1.visible = true;
                break;
            case 350:
                this.payPrice.visible = true;
                this.pay1.visible = false;
                trueCost = 300;
                break;
            case 500:
                this.payPrice.visible = true;
                this.pay1.visible = false;
                trueCost = 440;
                break;
            case 1000:
                this.payPrice.visible = true;
                this.pay1.visible = false;
                trueCost = 840;
                break;
            case 1500:
                this.payPrice.visible = true;
                this.pay1.visible = false;
                trueCost = 1230;
                break;
            case 2000:
                this.payPrice.visible = true;
                this.pay1.visible = false;
                trueCost = 1560;
                break;
            case 3000:
                this.payPrice.visible = true;
                this.pay1.visible = false;
                trueCost = 2250;
                break;
        }
        this.pay1.text = cost + "\u5143";
        this.pay0.text = trueCost + "\u5143";
        this.pay.strokeColor = 0x000000;
        this.pay.stroke = 2;
        this.pay1.strokeColor = 0x000000;
        this.pay1.stroke = 2;
        this.pay0.strokeColor = 0x000000;
        this.pay0.stroke = 2;
        if (Recharge.ins().getOrderByIndex(this.data.id)) {
            BitmapNumber.ins().changeNum(this.totalPower, this.data.amount, "vip_v", 3);
        }
        else {
            BitmapNumber.ins().changeNum(this.totalPower, this.data.award, "vip_v", 3);
        }
        this.moneyGroup.width = this.totalPower.width;
        this.invalidateState();
    };
    ChargeItemRenderer.prototype.getCurrentState = function () {
        var state = "up";
        if (Recharge.ins().getOrderByIndex(this.data.id)) {
            if (this.selected) {
                state = "down";
            }
        }
        else {
            state = "firstUp";
            if (this.selected) {
                state = "fistDown";
            }
        }
        return state;
    };
    return ChargeItemRenderer;
}(BaseItemRender));
__reflect(ChargeItemRenderer.prototype, "ChargeItemRenderer");
//# sourceMappingURL=ChargeItemRenderer.js.map