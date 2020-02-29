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
var BoxPayItemRenderer = (function (_super) {
    __extends(BoxPayItemRenderer, _super);
    function BoxPayItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "ChestSkinState1";
        return _this;
    }
    BoxPayItemRenderer.prototype.dataChanged = function () {
        var info = this.data;
        var level = UserFb.ins().guanqiaID;
        egret.Tween.removeTweens(this.imgNeedle);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        this.imgNeedle.rotation = 0;
        if (info.chapter > level) {
            this.currentState = "kong2";
            this.openDesc.text = "\u7B2C" + info.chapter + "\u5173\u5F00\u542F";
        }
        else {
            var openInfo = Box.ins().getGridInfoById(info.pos);
            this.dataInfo = openInfo;
            if (openInfo && openInfo.itemId > 0) {
                var boxCfg = GlobalConfig.TreasureBoxConfig[openInfo.itemId];
                if (boxCfg)
                    this.baoxiang.source = boxCfg.imgClose;
                if (openInfo.state == 1) {
                    if (boxCfg) {
                        this.boxName.text = boxCfg.name;
                        this.jishi.text = DateUtils.getFormatBySecond(boxCfg.time, 9);
                    }
                    if (Box.ins().isHaveFreePos()) {
                        this.currentState = "wait2";
                    }
                    else {
                        this.currentState = "wait3";
                    }
                }
                else {
                    if (openInfo.getTime() > 0) {
                        this.currentState = "wait";
                        this.refushDaojishi();
                        TimerManager.ins().doTimer(1000, 0, this.refushDaojishi, this);
                        this.runTween();
                    }
                    else {
                        this.currentState = "open";
                    }
                }
            }
            else {
                this.currentState = "kong";
            }
        }
    };
    BoxPayItemRenderer.prototype.runTween = function () {
        this.imgNeedle.rotation = 0;
        egret.Tween.removeTweens(this.imgNeedle);
        var t = egret.Tween.get(this.imgNeedle, { loop: true });
        t.to({ "rotation": 360 }, 2000);
    };
    BoxPayItemRenderer.prototype.refushDaojishi = function () {
        var lastTime = this.dataInfo.getTime();
        this.t3.text = DateUtils.getFormatBySecond(lastTime);
        var cost = BoxModel.ins().countBoxTimeCost(lastTime, this.dataInfo.itemId);
        this.payNum.text = cost + "";
        if (lastTime <= 0) {
            TimerManager.ins().removeAll(this);
            this.currentState = "open";
            this.imgNeedle.rotation = 0;
        }
    };
    BoxPayItemRenderer.prototype.onRemove = function () {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        TimerManager.ins().removeAll(this);
        egret.Tween.removeTweens(this.imgNeedle);
    };
    return BoxPayItemRenderer;
}(BaseItemRender));
__reflect(BoxPayItemRenderer.prototype, "BoxPayItemRenderer");
//# sourceMappingURL=BoxPayItemRenderer.js.map