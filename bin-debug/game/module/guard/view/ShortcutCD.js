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
var ShortcutCD = (function (_super) {
    __extends(ShortcutCD, _super);
    function ShortcutCD(radius) {
        var _this = _super.call(this) || this;
        _this.setSize(radius);
        return _this;
    }
    ShortcutCD.prototype.setSize = function (radius) {
        this.radius = radius;
        this.graphics.clear();
        this.graphics.beginFill(0, 0.9);
        this.graphics.drawCircle(0, 0, radius);
        this.graphics.endFill();
        this.maskShape = new egret.Shape();
        this.maskShape.graphics.clear();
        this.maskShape.graphics.beginFill(0, 0.7);
        this.maskShape.graphics.drawCircle(0, 0, radius);
        this.maskShape.graphics.endFill();
        this.addChild(this.maskShape);
        this.mask = this.maskShape;
        this.visible = false;
    };
    ShortcutCD.prototype.play = function (duration) {
        duration *= 1000;
        if (duration > 0) {
            this.visible = true;
            this.duration = duration;
            this.startTime = egret.getTimer();
            egret.startTick(this.onUpdate, this);
        }
    };
    ShortcutCD.prototype.onUpdate = function () {
        var time = egret.getTimer();
        var useTime = time - this.startTime;
        if (useTime >= this.duration) {
            this.stop();
            return false;
        }
        this.maskShape.graphics.clear();
        this.maskShape.graphics.beginFill(0, 0.7);
        this.maskShape.graphics.moveTo(0, 0);
        this.maskShape.graphics.lineTo(this.radius, 0);
        this.maskShape.graphics.drawArc(0, 0, this.radius, (useTime / this.duration) * 2 * Math.PI - Math.PI / 2, 2 * Math.PI - Math.PI / 2);
        this.maskShape.graphics.lineTo(0, 0);
        this.maskShape.graphics.endFill();
        return false;
    };
    ShortcutCD.prototype.stop = function () {
        this.visible = false;
        egret.stopTick(this.onUpdate, this);
        this.maskShape.graphics.clear();
    };
    return ShortcutCD;
}(egret.Sprite));
__reflect(ShortcutCD.prototype, "ShortcutCD");
//# sourceMappingURL=ShortcutCD.js.map