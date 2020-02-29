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
var StageUtils = (function (_super) {
    __extends(StageUtils, _super);
    function StageUtils() {
        var _this = _super.call(this) || this;
        if (StageUtils._uiStage == null) {
            StageUtils._uiStage = new eui.UILayer();
            StageUtils._uiStage.touchEnabled = false;
            StageUtils._uiStage.percentHeight = 100;
            StageUtils._uiStage.percentWidth = 100;
            _this.getStage().addChild(StageUtils._uiStage);
        }
        return _this;
    }
    StageUtils.ins = function () {
        return _super.ins.call(this);
    };
    StageUtils.prototype.getHeight = function () {
        return this.getStage().stageHeight;
    };
    StageUtils.prototype.getWidth = function () {
        return this.getStage().stageWidth;
    };
    StageUtils.prototype.setTouchChildren = function (value) {
        this.getStage().touchChildren = value;
    };
    StageUtils.prototype.setMaxTouches = function (value) {
        this.getStage().maxTouches = value;
    };
    StageUtils.prototype.setFrameRate = function (value) {
        this.getStage().frameRate = value;
    };
    StageUtils.prototype.setScaleMode = function (value) {
        this.getStage().scaleMode = value;
    };
    StageUtils.prototype.getStage = function () {
        return egret.MainContext.instance.stage;
    };
    StageUtils.prototype.getUIStage = function () {
        return StageUtils._uiStage;
    };
    return StageUtils;
}(BaseClass));
__reflect(StageUtils.prototype, "StageUtils");
//# sourceMappingURL=StageUtils.js.map