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
var ShenshouInfoPanel = (function (_super) {
    __extends(ShenshouInfoPanel, _super);
    function ShenshouInfoPanel() {
        return _super.call(this) || this;
    }
    ShenshouInfoPanel.prototype.setID = function (value) {
        this.curId = value;
        this.currentState = "" + value;
    };
    ShenshouInfoPanel.prototype.close = function () {
        this.stopBeatAnimat();
    };
    ShenshouInfoPanel.prototype.refEquipData = function () {
        for (var i = 0; i < GlobalConfig.ShenShouConfig.posCount; i++) {
            var pos = i + 1;
            this["item" + i].name = pos;
            var data = ShenshouModel.ins().getDataById(this.curId);
            if (data && data.equipIDs[pos]) {
                this["item" + i].data = data.equipIDs[pos];
            }
            else {
                this["item" + i].setPosData(this.curId, pos);
            }
        }
    };
    ShenshouInfoPanel.prototype.refState = function (state) {
        var _this = this;
        var bodySource = "";
        this.stopBeatAnimat();
        this.shenshouImg.source = bodySource;
        switch (state) {
            case ShenshouState.State_No:
                bodySource = "ss_" + this.curId + "b_png";
                break;
            case ShenshouState.State_Can:
                bodySource = "ss_" + this.curId + "b_png";
                break;
            case ShenshouState.State_Has:
                this.startBeatAnimat();
                bodySource = "ss_" + this.curId + "a_png";
                break;
        }
        egret.callLater(function () {
            _this.shenshouImg.source = bodySource;
        }, this);
    };
    ShenshouInfoPanel.prototype.startBeatAnimat = function () {
        if (!this.imgCopy)
            this.imgCopy = new eui.Image();
        this.imgCopy.touchEnabled = false;
        this.imgCopy.source = "ss_" + this.curId + "a_png";
        this.imgCopy.visible = false;
        this.addChild(this.imgCopy);
        TimerManager.ins().doTimer(4000, 0, this.runTween, this);
        TimerManager.ins().doTimer(500, 1, this.runTween, this);
    };
    ShenshouInfoPanel.prototype.runTween = function () {
        this.imgCopy.visible = true;
        this.imgCopy.alpha = 0;
        this.imgCopy.scaleX = this.imgCopy.scaleY = 1;
        this.imgCopy.x = this.shenshouImg.x + (this.shenshouImg.width >> 1);
        this.imgCopy.y = this.shenshouImg.y + (this.shenshouImg.height >> 1);
        this.imgCopy.anchorOffsetX = this.shenshouImg.width >> 1;
        this.imgCopy.anchorOffsetY = this.shenshouImg.height >> 1;
        this.imgCopy.top = this.shenshouImg.top;
        this.imgCopy.horizontalCenter = this.shenshouImg.horizontalCenter;
        Tween.get(this.imgCopy)
            .to({ 'alpha': 1 }, 250)
            .to({ 'alpha': 0, 'scaleX': 1.20, 'scaleY': 1.20 }, 2000, egret.Ease.cubicInOut);
    };
    ShenshouInfoPanel.prototype.stopBeatAnimat = function () {
        TimerManager.ins().remove(this.runTween, this);
        if (this.imgCopy) {
            Tween.removeTweens(this.imgCopy);
            this.imgCopy.visible = false;
        }
    };
    return ShenshouInfoPanel;
}(BaseView));
__reflect(ShenshouInfoPanel.prototype, "ShenshouInfoPanel");
//# sourceMappingURL=ShenshouInfoPanel.js.map