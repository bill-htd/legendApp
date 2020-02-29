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
var ShenshouEquipItem1 = (function (_super) {
    __extends(ShenshouEquipItem1, _super);
    function ShenshouEquipItem1() {
        return _super.call(this) || this;
    }
    ShenshouEquipItem1.prototype.playDepartMc = function () {
        if (!this.mc)
            this.mc = new MovieClip;
        this.mc.x = 43;
        this.mc.y = 44;
        this.mc.scaleX = 1.5;
        this.mc.scaleY = 1.5;
        this.addChild(this.mc);
        this.mc.playFile(RES_DIR_EFF + "litboom", 1);
    };
    ShenshouEquipItem1.prototype.dataChanged = function () {
        if (!isNaN(this.data) && this.data) {
            this.itemConfig = GlobalConfig.ItemConfig[this.data];
            this.nameTxt.text = "";
            this.imgBg.source = 'quality' + ItemConfig.getQuality(this.itemConfig);
            this.imgIcon.source = this.itemConfig.icon + "_png";
            var lv = ShenshouModel.ins().getEquipLv(this.itemConfig.id) - 1;
            this.equipLv.text = lv > 0 ? "+" + lv : "";
        }
    };
    return ShenshouEquipItem1;
}(ShenshouEquipItem));
__reflect(ShenshouEquipItem1.prototype, "ShenshouEquipItem1");
//# sourceMappingURL=ShenshouEquipItem1.js.map