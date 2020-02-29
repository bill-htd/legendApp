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
var EasyLoading = (function (_super) {
    __extends(EasyLoading, _super);
    function EasyLoading() {
        var _this = _super.call(this) || this;
        _this.content = null;
        _this.speed = 10 / (1000 / 60);
        _this.init();
        return _this;
    }
    EasyLoading.ins = function () {
        return _super.ins.call(this);
    };
    EasyLoading.prototype.init = function () {
        this.averageUtils = new AverageUtils();
        this.content = new egret.Sprite();
        this.content.graphics.beginFill(0x000000, 0.2);
        this.content.graphics.drawRect(0, 0, StageUtils.ins().getWidth(), StageUtils.ins().getHeight());
        this.content.graphics.endFill();
        this.content.touchEnabled = true;
        this.uiImageContainer = new egret.DisplayObjectContainer();
        this.uiImageContainer.x = this.content.width * 0.5;
        this.uiImageContainer.y = this.content.height * 0.5;
        this.content.addChild(this.uiImageContainer);
        this.uiImage = new egret.Bitmap();
        this.uiImageContainer.addChild(this.uiImage);
        this.loadReel();
        GameSocket.ins().setOnClose(this.showLoading, this);
        GameSocket.ins().setOnConnected(this.hideLoading, this);
    };
    EasyLoading.prototype.loadReel = function () {
        var self = this;
        RES.getResByUrl(RES_DIR + "load_Reel.png", function (texture) {
            var img = self.uiImage;
            img.texture = texture;
            img.x = -img.width * 0.5;
            img.y = -img.height * 0.5;
        }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    EasyLoading.prototype.showLoading = function () {
        StageUtils.ins().getStage().addChild(this.content);
        this.loadReel();
        egret.startTick(this.enterFrame, this);
    };
    EasyLoading.prototype.hideLoading = function () {
        if (this.content && this.content.parent) {
            StageUtils.ins().getStage().removeChild(this.content);
            this.uiImageContainer.rotation = 0;
        }
        egret.stopTick(this.enterFrame, this);
    };
    EasyLoading.prototype.enterFrame = function (time) {
        this.averageUtils.push(this.speed * time);
        this.uiImageContainer.rotation += this.averageUtils.getValue();
        return false;
    };
    return EasyLoading;
}(BaseClass));
__reflect(EasyLoading.prototype, "EasyLoading");
//# sourceMappingURL=EasyLoading.js.map