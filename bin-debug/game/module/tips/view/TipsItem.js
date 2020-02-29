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
var TipsItem = (function (_super) {
    __extends(TipsItem, _super);
    function TipsItem() {
        var _this = _super.call(this) || this;
        _this.index = 0;
        _this.skinName = "TipsSkin";
        _this.lab.stroke = 1;
        _this.lab.strokeColor = 0x000000;
        return _this;
    }
    TipsItem.prototype.setIndex = function (value) {
        this.index = value;
    };
    Object.defineProperty(TipsItem.prototype, "labelText", {
        get: function () {
            return this._labelText;
        },
        set: function (value) {
            this._labelText = value;
            this.lab.textFlow = TextFlowMaker.generateTextFlow(this._labelText);
            this.bg.width = this.lab.width;
            this.bg.visible = false;
            this.lab.alpha = 1;
            this.bg.y = 0;
            this.lab.verticalCenter = -1;
            if (!this.addToEvent) {
                this.addToEvent = true;
                TimerManager.ins().doTimer(1200, 1, this.removeFromParent, this);
            }
        },
        enumerable: true,
        configurable: true
    });
    TipsItem.prototype.removeFromParent = function () {
        this.addToEvent = false;
        DisplayUtils.removeFromParent(this);
        egret.Tween.removeTweens(this);
        ObjectPool.push(this);
    };
    return TipsItem;
}(BaseView));
__reflect(TipsItem.prototype, "TipsItem");
//# sourceMappingURL=TipsItem.js.map