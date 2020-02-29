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
var SevenDayItemRender = (function (_super) {
    __extends(SevenDayItemRender, _super);
    function SevenDayItemRender() {
        var _this = _super.call(this) || this;
        _this.skinName = 'act14item';
        return _this;
    }
    SevenDayItemRender.prototype.dataChanged = function () {
        var index = this.data;
        var config = GlobalConfig.LoginRewardsConfig[index];
        var currDay = Activity.ins().dayNum;
        var flag = ((Activity.ins().isAwards >> config.day & 1) == 1);
        if (flag) {
            this.select.visible = false;
            this.checkedMask.visible = this.checked.visible = true;
        }
        else {
            this.checkedMask.visible = this.checked.visible = false;
        }
        this.item.data = config.rewards[0];
    };
    SevenDayItemRender.prototype.setSelectImg = function (boo) {
        this.select.visible = boo;
    };
    return SevenDayItemRender;
}(BaseItemRender));
__reflect(SevenDayItemRender.prototype, "SevenDayItemRender");
//# sourceMappingURL=SevenDayItemRender.js.map