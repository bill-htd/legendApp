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
var GuideView = (function (_super) {
    __extends(GuideView, _super);
    function GuideView() {
        var _this = _super.call(this) || this;
        _this.rect = new egret.Rectangle(1, 1, 1, 1);
        _this.infoGroup = new eui.Group;
        _this.infoGroup.touchEnabled = false;
        _this.infoGroup.touchChildren = false;
        _this.addChild(_this.infoGroup);
        _this.mc = new MovieClip;
        _this.infoGroup.addChild(_this.mc);
        _this.arrowGroup = new eui.Group();
        _this.infoGroup.addChild(_this.arrowGroup);
        _this.arrow = new GuideArrow;
        _this.arrowGroup.addChild(_this.arrow);
        return _this;
    }
    GuideView.prototype.show = function (obj) {
        _super.prototype.show.call(this, obj);
        this.arrow.update();
        this.mc.playFile(RES_DIR_EFF + "guideff", -1);
    };
    GuideView.prototype.close = function () {
        _super.prototype.close.call(this);
        this.arrow.close();
    };
    return GuideView;
}(GuideViewBase));
__reflect(GuideView.prototype, "GuideView");
//# sourceMappingURL=GuideView.js.map