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
var ActivityStoreItemRender = (function (_super) {
    __extends(ActivityStoreItemRender, _super);
    function ActivityStoreItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "activityStoreItem";
        return _this;
    }
    ActivityStoreItemRender.prototype.dataChanged = function () {
        this.buyBtn.label = this.data.isScore ? "兑 换" : "购 买";
        this.discount.visible = !this.data.isScore && this.data.data.discount;
        if (this.discount.visible)
            this.discountNum.source = "discountNum" + this.data.data.discount;
        this.itemIcon.data = { type: 1, id: this.data.data.itemID, count: this.data.data.itemCount };
        this.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.onRmove, this);
        this.buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        if (!this.data.isScore) {
            this.buyBtn.enabled = this.data.data.state == 0;
            this.yuanbao.visible = true;
            this.jifen.visible = false;
            this.money.text = this.data.data.price;
        }
        else {
            this.buyBtn.enabled = true;
            this.yuanbao.visible = false;
            this.jifen.visible = true;
            this.jifenNum.text = this.data.data.score;
        }
    };
    ActivityStoreItemRender.prototype.onRmove = function (e) {
        this.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.onRmove, this);
        this.buyBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    ActivityStoreItemRender.prototype.onTouch = function (e) {
        var data = Activity.ins().activityData[this.data.activityID];
        if (this.data.isScore) {
            if (data.tScore < this.data.data.score)
                UserTips.ins().showTips("|C:0xf3311e&T:\u79EF\u5206\u4E0D\u8DB3|");
            else
                Activity.ins().sendReward(this.data.activityID, 0, 4, this.data.data.id);
        }
        else {
            if (Actor.yb < this.data.data.price)
                UserTips.ins().showTips("|C:0xf3311e&T:\u5143\u5B9D\u4E0D\u8DB3|");
            else
                Activity.ins().sendReward(this.data.activityID, 0, 3, this.data.data.id);
        }
    };
    return ActivityStoreItemRender;
}(BaseItemRender));
__reflect(ActivityStoreItemRender.prototype, "ActivityStoreItemRender");
//# sourceMappingURL=ActivityStoreItemRender.js.map