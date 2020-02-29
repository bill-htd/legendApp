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
var FlowerShowItem = (function (_super) {
    __extends(FlowerShowItem, _super);
    function FlowerShowItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "flowerShowItem";
        return _this;
    }
    FlowerShowItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this._inited = true;
        this.showEffect();
    };
    FlowerShowItem.prototype.onTouch = function (e) {
        ViewManager.ins().open(FlowerOpenWin);
        DisplayUtils.removeFromParent(this);
    };
    FlowerShowItem.prototype.onRemove = function (e) {
        this.flowerImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.removeEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.onRemove, this);
        if (this.mcEff) {
            this.mcEff.destroy();
            this.mcEff = null;
            this.isPlaying = false;
        }
    };
    FlowerShowItem.prototype.showEffect = function () {
        if (!this._inited)
            return;
        if (this.isPlaying)
            return;
        this.flowerImg.alpha = 0;
        if (!this.mcEff) {
            this.mcEff = ObjectPool.pop("MovieClip");
            this.flowereff.addChild(this.mcEff);
        }
        this.mcEff.playFile(RES_DIR_EFF + "flowereff", 1, this.playComplete.bind(this), true);
        this.isPlaying = true;
        if (!this.flowerImg.hasEventListener(egret.TouchEvent.TOUCH_TAP))
            this.flowerImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        if (!this.hasEventListener(egret.TouchEvent.REMOVED_FROM_STAGE))
            this.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, this.onRemove, this);
        this.flowerImg.source = null;
        this.flowerImg.source = "flower_openImg";
        this.imgBg.source = null;
        this.imgBg.source = "main_hongbaotexiao_png";
    };
    FlowerShowItem.prototype.playComplete = function () {
        this.mcEff.destroy();
        this.mcEff = null;
        this.flowerImg.alpha = 1;
        this.isPlaying = false;
    };
    return FlowerShowItem;
}(eui.Component));
__reflect(FlowerShowItem.prototype, "FlowerShowItem");
//# sourceMappingURL=FlowerShowItem.js.map