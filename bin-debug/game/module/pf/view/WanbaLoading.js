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
var WanbaLoading = (function (_super) {
    __extends(WanbaLoading, _super);
    function WanbaLoading() {
        return _super.call(this) || this;
    }
    WanbaLoading.prototype.init = function () {
        this.bg = new eui.Image;
        this.bg.source = RES.getRes("wbbg_jpg");
        this.addChildAt(this.bg, 0);
        this.progress = new eui.Image;
        this.progress.width = 0.1;
        this.progress.source = RES.getRes("wbProgress_png");
        this.progress.scale9Grid = new egret.Rectangle(5, 2, 3, 1);
        this.progress.x = 110;
        this.progress.y = 583;
        this.addChild(this.progress);
        this.icon = new eui.Image;
        this.icon.source = RES.getRes("wbIcon_png");
        this.icon.anchorOffsetX = 21 >> 1;
        this.icon.anchorOffsetY = 11;
        this.icon.x = this.progress.x + this.progress.width;
        this.icon.y = this.progress.y + (this.progress.height >> 1);
        this.addChild(this.icon);
    };
    WanbaLoading.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        egret.startTick(this.iconRotation, this);
    };
    WanbaLoading.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        egret.stopTick(this.iconRotation, this);
    };
    WanbaLoading.prototype.iconRotation = function (time) {
        this.icon.rotation += 5;
        return false;
    };
    WanbaLoading.prototype.setProgress = function (current, total) {
        var p = current / total;
        this.progress.width = 257 * p;
        this.icon.x = this.progress.x + this.progress.width;
        this.icon.y = this.progress.y + (this.progress.height >> 1);
    };
    return WanbaLoading;
}(LoadingView));
__reflect(WanbaLoading.prototype, "WanbaLoading");
//# sourceMappingURL=WanbaLoading.js.map