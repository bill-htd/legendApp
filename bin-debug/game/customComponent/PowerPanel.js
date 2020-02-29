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
var PowerPanel = (function (_super) {
    __extends(PowerPanel, _super);
    function PowerPanel() {
        var _this = _super.call(this) || this;
        _this.showBg = true;
        _this.imgWidth = 72;
        return _this;
    }
    PowerPanel.prototype.childrenCreated = function () {
        this.init();
    };
    PowerPanel.prototype.init = function () {
        this.playFlameMC();
        this.totalPower = BitmapNumber.ins().createNumPic(0, "8", 5);
        this.totalPower.x = 200;
        this.totalPower.y = 17;
        this.addChild(this.totalPower);
        this.initPos();
    };
    PowerPanel.prototype.setPower = function (value) {
        this.power = value;
        BitmapNumber.ins().changeNum(this.totalPower, value, "8", 5);
        this.initPos();
    };
    PowerPanel.prototype.initPos = function () {
        if (!this.showBg)
            return;
        var tempWidth = this.totalPower.width > 50 ? this.totalPower.width : 50;
        this.totalPower.x = this.width - tempWidth - 30;
        this.powerImg.x = this.totalPower.x - this.imgWidth;
    };
    PowerPanel.prototype.setBgVis = function (bool) {
        this.bgImg.visible = bool;
        this.flameGroup.visible = bool;
        this.showBg = bool;
    };
    PowerPanel.prototype.setMcVisible = function (bool) {
        this.flameGroup.visible = bool;
    };
    PowerPanel.prototype.playFlameMC = function () {
        if (this.flameMC) {
            this.flameMC.play(-1);
        }
        else {
            this.flameMC = new MovieClip();
            this.flameMC.x = 76;
            this.flameMC.y = 23;
            this.flameMC.playFile(RES_DIR_EFF + "zhanduolibeijing", -1);
            this.flameGroup.addChild(this.flameMC);
        }
    };
    PowerPanel.prototype.destructor = function () {
        DisplayUtils.removeFromParent(this);
    };
    return PowerPanel;
}(BaseView));
__reflect(PowerPanel.prototype, "PowerPanel");
//# sourceMappingURL=PowerPanel.js.map