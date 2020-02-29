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
var GuideArrow2 = (function (_super) {
    __extends(GuideArrow2, _super);
    function GuideArrow2() {
        var _this = _super.call(this) || this;
        _this.skinName = "guideArrowSkin";
        return _this;
    }
    GuideArrow2.prototype.setDirection = function (direction) {
        egret.Tween.removeTweens(this);
        this.x = 0;
        this.visible = true;
        if (direction == 1) {
            this.currentState = "right";
            egret.Tween.get(this, { loop: true }).to({ x: 40 }, 1000).to({ x: 0 }, 1000);
        }
        else {
            this.currentState = "left";
            egret.Tween.get(this, { loop: true }).to({ x: -40 }, 1000).to({ x: 0 }, 1000);
        }
    };
    GuideArrow2.prototype.setTips = function (tips) {
        this.lab.text = tips;
    };
    GuideArrow2.prototype.removeTweens = function () {
        egret.Tween.removeTweens(this);
    };
    return GuideArrow2;
}(BaseEuiView));
__reflect(GuideArrow2.prototype, "GuideArrow2");
//# sourceMappingURL=GuideArrow2.js.map