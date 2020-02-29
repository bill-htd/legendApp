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
var ActivityStoreShowItemRender = (function (_super) {
    __extends(ActivityStoreShowItemRender, _super);
    function ActivityStoreShowItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "activityStoreShowItem";
        return _this;
    }
    ActivityStoreShowItemRender.prototype.dataChanged = function () {
        this.discount.visible = this.data.discountImg > 0;
        if (this.discount.visible)
            this.discountNum.source = "discountNum" + this.data.discountImg;
        this.money.text = this.data.cost;
        this.itemIcon.data = this.data;
    };
    return ActivityStoreShowItemRender;
}(BaseItemRender));
__reflect(ActivityStoreShowItemRender.prototype, "ActivityStoreShowItemRender");
//# sourceMappingURL=ActivityStoreShowItemRender.js.map