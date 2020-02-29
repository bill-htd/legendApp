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
var OSATargetDays42ItemRender = (function (_super) {
    __extends(OSATargetDays42ItemRender, _super);
    function OSATargetDays42ItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "OSAItem";
        return _this;
    }
    OSATargetDays42ItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.get0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.rewardList.itemRenderer = ItemBase;
    };
    OSATargetDays42ItemRender.prototype.onTap = function (e) {
        Recharge.ins().getRechargeTotalAward(this.data.id);
    };
    OSATargetDays42ItemRender.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var data = this.data;
        this.num.text = data.id + "";
        this.rewardList.dataProvider = new eui.ArrayCollection(data.awardList);
        if (Recharge.ins().rechargeTotal.hasGetDays.indexOf(data.id) >= 0) {
            this.get0.visible = false;
            this.already.visible = true;
        }
        else {
            this.get0.visible = true;
            this.already.visible = false;
            if (data.id <= Recharge.ins().rechargeTotal.totalDay) {
                this.get0.label = "\u9886\u53D6";
                this.get0.enabled = true;
            }
            else {
                this.get0.label = "\u672A\u5B8C\u6210";
                this.get0.enabled = false;
            }
        }
    };
    return OSATargetDays42ItemRender;
}(BaseItemRender));
__reflect(OSATargetDays42ItemRender.prototype, "OSATargetDays42ItemRender");
//# sourceMappingURL=OSATargetDays42ItemRender.js.map