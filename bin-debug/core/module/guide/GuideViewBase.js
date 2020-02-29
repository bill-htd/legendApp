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
var GuideViewBase = (function (_super) {
    __extends(GuideViewBase, _super);
    function GuideViewBase() {
        var _this = _super.call(this) || this;
        _this.clickCD = true;
        _this.otherMc = [];
        _this.rect = new egret.Rectangle(1, 1, 1, 1);
        _this.infoGroup = new eui.Group;
        _this.infoGroup.touchEnabled = false;
        _this.infoGroup.touchChildren = false;
        _this.addChild(_this.infoGroup);
        return _this;
    }
    GuideViewBase.prototype.drawMask = function () {
        if (!this.shapeMasks) {
            this.shapeMasks = [];
            for (var i = 0; i < 8; i++) {
                this.shapeMasks[i] = new egret.Shape();
                this.shapeMasks[i].touchEnabled = true;
            }
        }
        var rect = this.rect;
        var w1 = rect.x;
        var w2 = rect.width;
        var w3 = StageUtils.ins().getWidth() - rect.right;
        var h1 = rect.y;
        var h2 = rect.height;
        var h3 = StageUtils.ins().getHeight() - rect.bottom;
        this.drawShape(this.shapeMasks[0], new egret.Rectangle(0, 0, w1, h1));
        this.drawShape(this.shapeMasks[1], new egret.Rectangle(rect.x, 0, w2, h1));
        this.drawShape(this.shapeMasks[2], new egret.Rectangle(rect.right, 0, w3, h1));
        this.drawShape(this.shapeMasks[3], new egret.Rectangle(0, rect.topLeft.y, w1, h2));
        this.drawShape(this.shapeMasks[4], new egret.Rectangle(rect.bottomRight.x, rect.topLeft.y, w3, h2));
        this.drawShape(this.shapeMasks[5], new egret.Rectangle(0, rect.bottomRight.y, w1, h3));
        this.drawShape(this.shapeMasks[6], new egret.Rectangle(rect.x, rect.bottomRight.y, w2, h3));
        this.drawShape(this.shapeMasks[7], new egret.Rectangle(rect.right, rect.bottomRight.y, w3, h3));
    };
    GuideViewBase.prototype.drawShape = function (shape, rect) {
        shape.graphics.clear();
        shape.graphics.beginFill(0x000000, 0);
        shape.graphics.drawRect(rect.x, rect.y, rect.width, rect.height);
        shape.graphics.endFill();
        this.addChild(shape);
    };
    GuideViewBase.prototype.onResize = function () {
        if (this.target) {
            var p = this.target.localToGlobal();
            if (this.rect.x != p.x || this.rect.y != p.y || this.rect.width != this.target.width || this.rect.height != this.target.height) {
                this.refurbish();
                this.drawMask();
            }
            return false;
        }
    };
    GuideViewBase.prototype.onClick = function (e) {
        var _this = this;
        if (this.rect.contains(e.stageX, e.stageY)) {
            if (this.clickCD) {
                this.clickCD = false;
                TimerManager.ins().doNext(function () {
                    _this.dispatchEventWith(egret.Event.CHANGE);
                }, this);
            }
            for (var i = 0; i < this.otherMc.length; i++) {
                egret.Tween.removeTweens(this.otherMc[i]);
                DisplayUtils.removeFromParent(this.otherMc[i]);
            }
            this.clicking = false;
        }
        else {
            GuideUtils.ins().clickOut();
            if (this.clicking)
                return;
            this.clicking = true;
            this.otherMc.length = 2;
            var _loop_1 = function (i) {
                if (!this_1.otherMc[i]) {
                    this_1.otherMc[i] = new MovieClip();
                }
                if (!this_1.otherMc[i].parent) {
                    this_1.addChild(this_1.otherMc[i]);
                }
                this_1.otherMc[i].scaleX = 3.3;
                this_1.otherMc[i].scaleY = 3.3;
                this_1.otherMc[i].x = this_1.infoGroup.x;
                this_1.otherMc[i].y = this_1.infoGroup.y;
                var tw = egret.Tween.get(this_1.otherMc[i]);
                var self_1 = this_1;
                tw.wait(i * 240).call(function () {
                    self_1.otherMc[i].playFile(RES_DIR_EFF + "forceguildeff", 1, function () {
                        egret.Tween.removeTweens(self_1.otherMc[i]);
                        DisplayUtils.removeFromParent(self_1.otherMc[i]);
                        if (i == self_1.otherMc.length - 1)
                            self_1.clicking = false;
                    });
                });
            };
            var this_1 = this;
            for (var i = 0; i < this.otherMc.length; i++) {
                _loop_1(i);
            }
        }
    };
    GuideViewBase.prototype.refurbish = function () {
        this.show(this.target);
    };
    GuideViewBase.prototype.show = function (target) {
        if (target == null) {
            return;
        }
        this.target = target;
        var p = target.localToGlobal();
        this.rect.x = p.x;
        this.rect.y = p.y;
        this.rect.width = target.width ? target.width : 60;
        this.rect.height = target.height ? target.height : 60;
        this.drawMask();
        this.addChild(this.infoGroup);
        this.infoGroup.x = p.x + (this.rect.width >> 1);
        this.infoGroup.y = p.y + (this.rect.height >> 1);
        var st = StageUtils.ins().getStage();
        st.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this, true, 0);
        egret.stopTick(this.onResize, this);
        egret.startTick(this.onResize, this);
    };
    GuideViewBase.prototype.close = function () {
        this.target = null;
        this.rect.x = this.rect.y = this.rect.width = this.rect.height = 1;
        var st = StageUtils.ins().getStage();
        st.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this, true);
        egret.stopTick(this.onResize, this);
    };
    return GuideViewBase;
}(egret.DisplayObjectContainer));
__reflect(GuideViewBase.prototype, "GuideViewBase");
//# sourceMappingURL=GuideViewBase.js.map