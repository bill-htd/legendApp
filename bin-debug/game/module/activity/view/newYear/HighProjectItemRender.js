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
var HighProjectItemRender = (function (_super) {
    __extends(HighProjectItemRender, _super);
    function HighProjectItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "highProjectItemSkin";
        _this.touchChildren = false;
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouch, _this);
        return _this;
    }
    HighProjectItemRender.prototype.dataChanged = function () {
        this.projectName.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:" + this.data.config.name);
        this.jifen.textFlow = TextFlowMaker.generateTextFlow1("|C:" + 0x00ff00 + "&T:" + this.data.config.score + "|\u79EF\u5206");
        var cur = Math.floor(this.data.times / this.data.config.target);
        var max = Math.floor(this.data.config.dayLimit / this.data.config.target);
        if (cur > max)
            cur = max;
        this.daliyCount.textFlow = TextFlowMaker.generateTextFlow1("|C:" + 0x00ff00 + "&T:" + cur + "|/" + max);
    };
    HighProjectItemRender.prototype.onTouch = function (e) {
        if (this.data.config.turn)
            ViewManager.ins().open(this.data.config.turn[0], this.data.config.turn[1]);
    };
    HighProjectItemRender.prototype.destruct = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    return HighProjectItemRender;
}(BaseItemRender));
__reflect(HighProjectItemRender.prototype, "HighProjectItemRender");
//# sourceMappingURL=HighProjectItemRender.js.map