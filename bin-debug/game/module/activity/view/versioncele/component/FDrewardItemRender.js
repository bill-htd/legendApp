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
var FDrewardItemRender = (function (_super) {
    __extends(FDrewardItemRender, _super);
    function FDrewardItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "FDrewardItem";
        return _this;
    }
    FDrewardItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.itemicon.touchChildren = false;
    };
    FDrewardItemRender.prototype.dataChanged = function () {
        this.tsNeed.text = this.data.config.score + "\u72C2\u6B22\u503C";
        this.get.visible = this.data.state == 2;
        this.redpoint.visible = this.data.state == 1;
        this.arrow.source = this.data.state ? "fd_arrow2" : "fd_arrow1";
        var config = this.data.config;
        this.itemicon.data = config.reward[0];
        this.itemicon.isShowName(false);
        this.itemicon.showNum(false);
        if (!this.hasEventListener(egret.TouchEvent.REMOVED_FROM_STAGE))
            this.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.onRmove, this);
        if (!this.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.itemicon.touchEnabled = this.data.state != 1;
        this.itemicon.filters = this.data.state == 0 ? FilterUtil.ARRAY_GRAY_FILTER : null;
    };
    FDrewardItemRender.prototype.onTouch = function (e) {
        if (this.data.state == 1) {
            Activity.ins().sendReward(this.data.activityID, this.data.index, 1);
        }
    };
    FDrewardItemRender.prototype.onRmove = function (e) {
        this.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.onRmove, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    return FDrewardItemRender;
}(BaseItemRender));
__reflect(FDrewardItemRender.prototype, "FDrewardItemRender");
//# sourceMappingURL=FDrewardItemRender.js.map