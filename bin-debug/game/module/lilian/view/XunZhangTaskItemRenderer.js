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
var XunZhangTaskItemRenderer = (function (_super) {
    __extends(XunZhangTaskItemRenderer, _super);
    function XunZhangTaskItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "XunzhangTaskSkin";
        return _this;
    }
    XunZhangTaskItemRenderer.prototype.dataChanged = function () {
        var data = this.data;
        if (data) {
            var config = UserTask.ins().getAchieveConfById(data.id);
            this.nameTF.textFlow = TextFlowMaker.generateTextFlow(config.name);
            var value = Math.min(data.value, config.target);
            this.expLabel.text = value + "/" + config.target;
            this.expBar.maximum = config.target;
            this.expBar.value = value;
            this.taskIcon.source = "xunzhang" + data.achievementId + "_png";
            if (data.value >= config.target) {
                this.currentState = "done";
            }
            else {
                this.currentState = "goon";
            }
        }
    };
    return XunZhangTaskItemRenderer;
}(BaseItemRender));
__reflect(XunZhangTaskItemRenderer.prototype, "XunZhangTaskItemRenderer");
//# sourceMappingURL=XunZhangTaskItemRenderer.js.map