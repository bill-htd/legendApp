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
var ShenshouTab = (function (_super) {
    __extends(ShenshouTab, _super);
    function ShenshouTab() {
        return _super.call(this) || this;
    }
    ShenshouTab.prototype.dataChanged = function () {
        if (this.data.id) {
            var shendshouData = ShenshouModel.ins().getDataById(this.data.id);
            this.redPoint.visible = ShenshouRedpoint.ins().redpoints[this.data.id];
            this.activityImg.visible = shendshouData && shendshouData.state == ShenshouState.State_Has;
            if (shendshouData && shendshouData.state != ShenshouState.State_No) {
                this.btnName.source = GlobalConfig.ShenShouBase[this.data.id].activeImg;
            }
            else {
                this.btnName.source = GlobalConfig.ShenShouBase[this.data.id].iconImg;
            }
        }
    };
    Object.defineProperty(ShenshouTab.prototype, "selected", {
        set: function (value) {
            this.select.visible = value;
        },
        enumerable: true,
        configurable: true
    });
    return ShenshouTab;
}(BaseItemRender));
__reflect(ShenshouTab.prototype, "ShenshouTab");
//# sourceMappingURL=ShenshouTab.js.map