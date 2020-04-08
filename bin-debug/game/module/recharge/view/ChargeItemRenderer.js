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
        this.yuanbaoImg.source = this.data.icon;
        var colorMatrix = [
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0.3, 0.6, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        if (this.data.status != 1) {
            this.allImg.filters = [colorFlilter];
        }
        var cost = parseInt(this.data.money_num);
        this.pay.text = "\u539F\u4EF7:" + cost + "\u5143";
        var trueCost = parseInt(this.data.dazhe_num);
        if (this.data.trueCost == 1) {
            this.payPrice.visible = true;
            this.pay1.visible = false;
        }
        else {
            this.payPrice.visible = false;
            this.pay1.visible = true;
        }
        this.pay1.text = cost + "\u5143";
        this.pay0.text = trueCost + "\u5143";
        this.pay.strokeColor = 0x000000;
        this.pay.stroke = 2;
        this.pay1.strokeColor = 0x000000;
        this.pay1.stroke = 2;
        this.pay0.strokeColor = 0x000000;
        this.pay0.stroke = 2;
        if (Recharge.ins().getOrderByIndex(this.data.moneyid)) {
            BitmapNumber.ins().changeNum(this.totalPower, this.data.yuanbao_num, "vip_v", 3);
        }
        else {
            BitmapNumber.ins().changeNum(this.totalPower, this.data.award, "vip_v", 3);
        }
        this.moneyGroup.width = this.totalPower.width;
        this.invalidateState();
    };
    ChargeItemRenderer.prototype.getCurrentState = function () {
        var state = "up";
        if (Recharge.ins().getOrderByIndex(this.data.moneyid)) {
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