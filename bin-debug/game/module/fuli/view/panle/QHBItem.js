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
var QHBItem = (function (_super) {
    __extends(QHBItem, _super);
    function QHBItem() {
        return _super.call(this) || this;
    }
    QHBItem.prototype.dataChanged = function () {
        if (this.data == "") {
            this.labelInfo.text = "";
            return;
        }
        var str = "|C:0x05B4C7&T:" + this.data.name + "|" + ' 抢到了 ' + "|C:0xECAA36&T:" + this.data.yuanbao + "|";
        this.labelInfo.textFlow = TextFlowMaker.generateTextFlow1(str);
        this.yuanbaoImg.x = this.labelInfo.width;
    };
    return QHBItem;
}(eui.ItemRenderer));
__reflect(QHBItem.prototype, "QHBItem");
//# sourceMappingURL=QHBItem.js.map