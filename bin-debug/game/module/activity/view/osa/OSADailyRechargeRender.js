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
var OSADailyRechargeRender = (function (_super) {
    __extends(OSADailyRechargeRender, _super);
    function OSADailyRechargeRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "OSADailyRechargeItem";
        return _this;
    }
    OSADailyRechargeRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.reward.itemRenderer = ItemBase;
        this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    };
    OSADailyRechargeRender.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var config = this.data;
        this.info.text = "\u7D2F\u8BA1\u5145\u503C" + config.pay + "\u5143\u5B9D";
        this.reward.dataProvider = new eui.ArrayCollection(config.awardList.concat());
        var data = Recharge.ins().getRechargeData(0);
        if (data.curDayPay >= config.pay) {
            var state = ((data.isAwards >> config.index) & 1);
            if (state) {
                this.getBtn.label = "\u5DF2\u9886\u53D6";
                this.getBtn.enabled = false;
            }
            else {
                this.getBtn.label = "\u9886\u53D6";
                this.getBtn.enabled = true;
            }
        }
        else {
            this.getBtn.label = "\u672A\u5B8C\u6210";
            this.getBtn.enabled = false;
        }
    };
    OSADailyRechargeRender.prototype.onTap = function (e) {
        Recharge.ins().getDayReward(this.data.index);
    };
    return OSADailyRechargeRender;
}(BaseItemRender));
__reflect(OSADailyRechargeRender.prototype, "OSADailyRechargeRender");
//# sourceMappingURL=OSADailyRechargeRender.js.map