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
var ActivityBtnRenderer = (function (_super) {
    __extends(ActivityBtnRenderer, _super);
    function ActivityBtnRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "ActBtnSkin";
        return _this;
    }
    ActivityBtnRenderer.prototype.dataChanged = function () {
        var abc;
        var ins;
        if (this.data instanceof ActivityBtnConfig) {
            abc = this.data;
            ins = Activity.ins();
        }
        else if (this.data instanceof PActivityBtnConfig) {
            abc = this.data;
            ins = PActivity.ins();
        }
        if (abc != null) {
            this.iconDisplay.source = abc.icon;
            this.redPoint.visible = ins.isShowRedPointByBtnInfo(abc);
            if (abc.light && !ins.getPalyEffListById(abc.id)) {
                if (!this.mc) {
                    this.mc = new MovieClip();
                    this.mc.x = 40;
                    this.mc.y = 43;
                }
                this.mc.playFile(RES_DIR_EFF + "actIconCircle", -1);
                this.addChild(this.mc);
            }
            else {
                DisplayUtils.removeFromParent(this.mc);
            }
        }
        else {
            this.iconDisplay.source = "";
        }
    };
    return ActivityBtnRenderer;
}(FuliActBtnRenderer));
__reflect(ActivityBtnRenderer.prototype, "ActivityBtnRenderer");
//# sourceMappingURL=ActivityBtnRenderer.js.map