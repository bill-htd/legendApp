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
var LyMarkMixItemRender = (function (_super) {
    __extends(LyMarkMixItemRender, _super);
    function LyMarkMixItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "markMixItemSkin";
        return _this;
    }
    LyMarkMixItemRender.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.MixBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    };
    LyMarkMixItemRender.prototype.dataChanged = function () {
        var hasCost = this.data.cfg.costItem;
        this.limitLv.textFlow = TextFlowMaker.generateTextFlow1(this.data.cfg.mixDesc);
        this.cost.textFlow = TextFlowMaker.generateTextFlow1(hasCost ? "合成消耗：" + ("|C:" + (this.data.count ? 0xD1C28F : 0xff0000) + "&T:" + this.data.itemName + " X" + this.data.cfg.costCount) : "");
        this.stock.textFlow = TextFlowMaker.generateTextFlow1("\u5F53\u524D\u62E5\u6709\uFF1A|C:" + (this.data.itemCount ? 0x00ff00 : 0xff0000) + "&T:" + this.data.itemCount);
        this.MixBtn.label = hasCost ? "一键合成" : "获取";
        this.MixBtn.enabled = !hasCost || LyMark.ins().lyMarkLv >= this.data.cfg.limitLv;
        this.redpoint.visible = hasCost && LyMark.ins().lyMarkLv >= this.data.cfg.limitLv && this.data.count >= this.data.cfg.costCount;
        this.itemIcon.data = this.data.cfg.itemId;
    };
    LyMarkMixItemRender.prototype.onTap = function (e) {
        if (this.data.cfg.costItem) {
            if (this.data.count >= this.data.cfg.costCount)
                LyMark.ins().sendCompound(this.data.cfg.itemId);
            else
                UserTips.ins().showTips("材料不足");
        }
        else
            UserWarn.ins().setBuyGoodsWarn(this.data.cfg.itemId);
    };
    LyMarkMixItemRender.prototype.destruct = function () {
        this.MixBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    };
    return LyMarkMixItemRender;
}(BaseItemRender));
__reflect(LyMarkMixItemRender.prototype, "LyMarkMixItemRender");
//# sourceMappingURL=LyMarkMixItemRender.js.map