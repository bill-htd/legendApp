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
var HintTipsItem = (function (_super) {
    __extends(HintTipsItem, _super);
    function HintTipsItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "TipsSkin";
        _this.lab.visible = false;
        _this.bg.visible = false;
        return _this;
    }
    HintTipsItem.prototype.setTips = function (res) {
        var _this = this;
        this.pic.source = res + "_png";
        this.pic.alpha = 0;
        this.pic.y = 0;
        var t1 = egret.Tween.get(this.pic);
        t1.to({ "alpha": 1 }, 500).wait(3000).to({ "alpha": 0 }, 200).call(function () {
            DisplayUtils.removeFromParent(_this);
        }, this);
    };
    return HintTipsItem;
}(BaseView));
__reflect(HintTipsItem.prototype, "HintTipsItem");
//# sourceMappingURL=HintTipsItem.js.map