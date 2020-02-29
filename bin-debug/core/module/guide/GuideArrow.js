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
var GuideArrow = (function (_super) {
    __extends(GuideArrow, _super);
    function GuideArrow() {
        var _this = _super.call(this) || this;
        _this.skinName = "guideArrowSkin";
        return _this;
    }
    GuideArrow.prototype.update = function () {
        var curCfg = GuideUtils.ins().curCfg;
        if (!curCfg)
            return;
        if (!curCfg.tips || curCfg.tips == "") {
            this.visible = false;
            return;
        }
        egret.Tween.removeTweens(this.parent);
        this.parent.x = 0;
        this.visible = true;
        if (curCfg.direction == 1) {
            this.currentState = "right";
            egret.Tween.get(this.parent, { loop: true }).to({ x: 40 }, 1000).to({ x: 0 }, 1000);
        }
        else {
            this.currentState = "left";
            egret.Tween.get(this.parent, { loop: true }).to({ x: -40 }, 1000).to({ x: 0 }, 1000);
        }
        this.lab.text = curCfg.tips;
    };
    GuideArrow.prototype.close = function () {
        if (this.parent)
            egret.Tween.removeTweens(this.parent);
    };
    return GuideArrow;
}(BaseEuiView));
__reflect(GuideArrow.prototype, "GuideArrow");
//# sourceMappingURL=GuideArrow.js.map