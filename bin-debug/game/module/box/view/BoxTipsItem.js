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
var BoxTipsItem = (function (_super) {
    __extends(BoxTipsItem, _super);
    function BoxTipsItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "ChestInformationSkin";
        return _this;
    }
    BoxTipsItem.prototype.dataChanged = function () {
        var data = this.data;
        var str = "|C:0x12b2ff&T:";
        str += data.name + "|在宝箱中获得";
        var item = GlobalConfig.ItemConfig[data.id];
        str += "|C:" + ItemConfig.getQualityColor(item) + "&T:" + item.name + "|";
        this.label.textFlow = TextFlowMaker.generateTextFlow1(str);
    };
    return BoxTipsItem;
}(BaseItemRender));
__reflect(BoxTipsItem.prototype, "BoxTipsItem");
//# sourceMappingURL=BoxTipsItem.js.map