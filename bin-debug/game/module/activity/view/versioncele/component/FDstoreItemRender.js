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
var FDstoreItemRender = (function (_super) {
    __extends(FDstoreItemRender, _super);
    function FDstoreItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "FDstoreItem";
        return _this;
    }
    FDstoreItemRender.prototype.dataChanged = function () {
        var vo = this.data.data;
        this.discount.visible = vo.buyMax > 0;
        this.limitCount.text = (vo.buyMax - vo.buyCount) + "";
        this.itemIcon.data = { type: 1, id: vo.itemID, count: vo.itemCount };
        this.costIcon.source = GlobalConfig.ItemConfig[GlobalConfig.ActivityType22_1Config[this.data.activityID][1].costItem].icon + "_png";
        this.money.text = "X" + vo.materialNum;
        if (!this.hasEventListener(egret.TouchEvent.REMOVED_FROM_STAGE))
            this.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.onRmove, this);
        if (!this.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.buyBtn.label = this.data.data.state == 0 ? "\u8D2D\u4E70" : "\u5DF2\u8D2D\u4E70";
        this.buyBtn.enabled = this.data.data.state == 0;
    };
    FDstoreItemRender.prototype.onRmove = function (e) {
        this.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.onRmove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    FDstoreItemRender.prototype.onTouch = function (e) {
        if (e.target != this.buyBtn)
            return;
        var itemData = UserBag.ins().getBagItemById(GlobalConfig.ActivityType22_1Config[this.data.activityID][1].costItem);
        var count = itemData ? itemData.count : 0;
        if (count >= this.data.data.materialNum)
            Activity.ins().sendReward(this.data.activityID, 0, 3, this.data.data.id);
        else
            UserTips.ins().showTips("\u6750\u6599\u4E0D\u8DB3");
    };
    return FDstoreItemRender;
}(BaseItemRender));
__reflect(FDstoreItemRender.prototype, "FDstoreItemRender");
//# sourceMappingURL=FDstoreItemRender.js.map