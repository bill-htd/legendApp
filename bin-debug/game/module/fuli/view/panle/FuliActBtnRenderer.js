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
var FuliActBtnRenderer = (function (_super) {
    __extends(FuliActBtnRenderer, _super);
    function FuliActBtnRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "ActBtnSkin";
        DisplayUtils.removeFromParent(_this.mc);
        _this.mc = null;
        return _this;
    }
    FuliActBtnRenderer.prototype.dataChanged = function () {
        this.iconDisplay.source = this.data.icon;
        var isShowEff = false;
        switch (this.data.type) {
            case 1:
                isShowEff = DailyCheckIn.ins().showRedPoint();
                break;
            case 2:
                isShowEff = Activity.ins().getSevenDayStast();
                break;
            case 3:
                isShowEff = false;
                break;
            case 4:
                isShowEff = Recharge.ins().franchise && Recharge.ins().franchiseget ? true : false;
                break;
            case 5:
                isShowEff = Activity.ins().checkNoticeRed();
                break;
            case 6:
                isShowEff = false;
                break;
            case 7:
                isShowEff = UserVip.ins().getVipGiftRedPoint(this.data.id);
                break;
        }
        if (isShowEff) {
            if (!this.mc) {
                this.mc = new MovieClip();
                this.mc.x = 40;
                this.mc.y = 42;
            }
            this.mc.playFile(RES_DIR_EFF + "actIconCircle", -1);
            this.addChild(this.mc);
        }
        else {
            DisplayUtils.removeFromParent(this.mc);
            this.mc = null;
        }
        this.redPoint.visible = isShowEff;
    };
    return FuliActBtnRenderer;
}(BaseItemRender));
__reflect(FuliActBtnRenderer.prototype, "FuliActBtnRenderer");
//# sourceMappingURL=FuliActBtnRenderer.js.map