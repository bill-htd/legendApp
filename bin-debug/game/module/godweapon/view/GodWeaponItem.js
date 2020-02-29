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
var GodweaponItem = (function (_super) {
    __extends(GodweaponItem, _super);
    function GodweaponItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GodweaponItem.prototype.dataChanged = function () {
        var item = GlobalConfig.ItemConfig[this.data.id];
        this.shengwuImg.source = item.icon + "_png";
        this.shengwuName.text = item.name;
        this.shengwuName.textColor = ItemConfig.getQualityColor(item);
        this.frame.source = "godweapon_quality" + (ItemConfig.getQuality(item) + 1);
        this.imgJob.source = "job" + ItemConfig.getJob(item) + "Item";
        if (this.data.count) {
            this.count.text = this.data.count;
        }
        else {
            this.count.text = "";
        }
    };
    return GodweaponItem;
}(BaseItemRender));
__reflect(GodweaponItem.prototype, "GodweaponItem");
//# sourceMappingURL=GodWeaponItem.js.map