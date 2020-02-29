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
var EverTipsItem = (function (_super) {
    __extends(EverTipsItem, _super);
    function EverTipsItem() {
        var _this = _super.call(this) || this;
        _this.index = 0;
        _this.skinName = "TipsSkin";
        _this.lab.stroke = 1;
        _this.lab.strokeColor = 0x000000;
        _this.bg.source = "zjmqipao";
        return _this;
    }
    EverTipsItem.prototype.setIndex = function (value) {
        this.index = value;
    };
    Object.defineProperty(EverTipsItem.prototype, "labelText", {
        get: function () {
            return this._labelText;
        },
        set: function (value) {
            var _this = this;
            this.bg.alpha = 1;
            this._labelText = value;
            this.lab.textFlow = TextFlowMaker.generateTextFlow(this._labelText);
            this.bg.width = this.lab.width + 80;
            this.lab.alpha = 1;
            this.bg.y = 0;
            this.lab.verticalCenter = -1;
            var t1 = egret.Tween.get(this.bg);
            t1.to({ "y": 0 }, 500).wait(500).to({ "alpha": 0 }, 200).call(function () {
                DisplayUtils.removeFromParent(_this);
            }, this);
        },
        enumerable: true,
        configurable: true
    });
    return EverTipsItem;
}(BaseView));
__reflect(EverTipsItem.prototype, "EverTipsItem");
//# sourceMappingURL=EverTipsItem.js.map