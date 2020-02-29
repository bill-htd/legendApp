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
var VipBossItem = (function (_super) {
    __extends(VipBossItem, _super);
    function VipBossItem() {
        return _super.call(this) || this;
    }
    VipBossItem.prototype.dataChanged = function () {
        if (!this.data)
            return;
        var index = this.itemIndex + 1;
        var config = GlobalConfig.BossHomeConfig[index];
        this.bg.source = "vipbossb" + index;
    };
    return VipBossItem;
}(BaseItemRender));
__reflect(VipBossItem.prototype, "VipBossItem");
//# sourceMappingURL=VipBossItem.js.map