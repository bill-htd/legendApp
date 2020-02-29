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
var BoxFreeItemRenderer = (function (_super) {
    __extends(BoxFreeItemRenderer, _super);
    function BoxFreeItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "ChestSkinReward2";
        return _this;
    }
    BoxFreeItemRenderer.prototype.dataChanged = function () {
        this.info = this.data;
        if (!this.info)
            return;
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        var downIndex = BoxModel.ins().getDownTimeIndex();
        if (this.info.getTime() > 0 && downIndex == this.info.pos) {
            this.currentState = "close";
            this.refushDaojishi();
            TimerManager.ins().doTimer(1000, 0, this.refushDaojishi, this);
        }
        else {
            if (this.info.getTime() <= 0) {
                this.currentState = "open";
            }
            else {
                this.currentState = "wait";
            }
        }
    };
    BoxFreeItemRenderer.prototype.refushDaojishi = function () {
        var time = this.info.getTime();
        this.labelTime.text = DateUtils.getFormatBySecond(time);
        if (time <= 0) {
            TimerManager.ins().removeAll(this);
            this.currentState = "open";
            Box.ins().postUpdateFreeBox();
        }
    };
    BoxFreeItemRenderer.prototype.onRemove = function () {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        this.removeTimer();
    };
    BoxFreeItemRenderer.prototype.removeTimer = function () {
        TimerManager.ins().removeAll(this);
    };
    return BoxFreeItemRenderer;
}(BaseItemRender));
__reflect(BoxFreeItemRenderer.prototype, "BoxFreeItemRenderer");
//# sourceMappingURL=BoxFreeItemRenderer.js.map