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
var VipGiftBtnRender = (function (_super) {
    __extends(VipGiftBtnRender, _super);
    function VipGiftBtnRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "VipGiftBtnSkin";
        return _this;
    }
    VipGiftBtnRender.prototype.dataChanged = function () {
        var data = this.data;
        this.item.source = data.img;
        this.viptxt.text = "v" + data.vipLv;
        var isShowEff = UserVip.ins().getVipGiftRedPoint(data.id);
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
    return VipGiftBtnRender;
}(BaseItemRender));
__reflect(VipGiftBtnRender.prototype, "VipGiftBtnRender");
//# sourceMappingURL=VipGiftBtnRender.js.map