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
var WeaponSoulbreakItem = (function (_super) {
    __extends(WeaponSoulbreakItem, _super);
    function WeaponSoulbreakItem() {
        var _this = _super.call(this) || this;
        _this.skinName = 'weaponSoulbreakitem';
        return _this;
    }
    WeaponSoulbreakItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    WeaponSoulbreakItem.prototype.dataChanged = function () {
        if (!this.data)
            return;
        var sum = this.data.sum;
        var costNum = this.data.costNum;
        var costItem = this.data.costItem;
        var colorStr;
        if (sum >= costNum)
            colorStr = ColorUtil.GREEN;
        else
            colorStr = ColorUtil.RED;
        this.lv.textFlow = TextFlowMaker.generateTextFlow1("|C:" + colorStr + "&T:" + sum + "/" + costNum);
        this.itemIcon.imgJob.visible = false;
        var itemconfig = GlobalConfig.ItemConfig[costItem];
        this.nameTxt.text = itemconfig.name;
        this.itemIcon.imgIcon.source = itemconfig.icon + "_png";
    };
    WeaponSoulbreakItem.prototype.destruct = function () {
    };
    WeaponSoulbreakItem.prototype.clear = function () {
    };
    return WeaponSoulbreakItem;
}(BaseItemRender));
__reflect(WeaponSoulbreakItem.prototype, "WeaponSoulbreakItem");
//# sourceMappingURL=WeaponSoulbreakItem.js.map