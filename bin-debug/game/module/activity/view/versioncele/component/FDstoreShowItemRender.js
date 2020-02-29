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
var FDstoreShowItemRender = (function (_super) {
    __extends(FDstoreShowItemRender, _super);
    function FDstoreShowItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "FDstoreShowItem";
        return _this;
    }
    FDstoreShowItemRender.prototype.update = function (data) {
        this.itemID = data.itemID;
        this.itemImg.source = GlobalConfig.ItemConfig[data.itemID].icon + "_png";
        this.limitCount.textFlow = TextFlowMaker.generateTextFlow("\u9650\u8D2D " + data.buy + "/" + data.max);
        if (!this.hasEventListener(egret.TouchEvent.REMOVED_FROM_STAGE))
            this.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.onRmove, this);
        if (!this.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    FDstoreShowItemRender.prototype.onRmove = function (e) {
        this.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.onRmove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    FDstoreShowItemRender.prototype.onTouch = function (e) {
        if (!this.itemID)
            return;
        ViewManager.ins().open(ItemDetailedWin, 0, this.itemID);
    };
    return FDstoreShowItemRender;
}(eui.Component));
__reflect(FDstoreShowItemRender.prototype, "FDstoreShowItemRender");
//# sourceMappingURL=FDstoreShowItemRender.js.map