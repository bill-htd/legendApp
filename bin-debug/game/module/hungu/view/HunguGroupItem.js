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
var HunguGroupItem = (function (_super) {
    __extends(HunguGroupItem, _super);
    function HunguGroupItem() {
        var _this = _super.call(this) || this;
        _this.skinName = 'hunguGroupItemSkin';
        return _this;
    }
    HunguGroupItem.prototype.dataChanged = function () {
        if (!this.data)
            return;
        this.qualityName.textFlow = TextFlowMaker.generateTextFlow1(this.data.qualityName);
        this.posName.textFlow = TextFlowMaker.generateTextFlow1(this.data.posName);
        for (var i = 0; i < 3; i++) {
            if (this["suit" + i] && this.data.suits[i])
                this["suit" + i].textFlow = TextFlowMaker.generateTextFlow1(this.data.suits[i]);
            else
                DisplayUtils.removeFromParent(this["suit" + i]);
        }
    };
    return HunguGroupItem;
}(BaseItemRender));
__reflect(HunguGroupItem.prototype, "HunguGroupItem");
//# sourceMappingURL=HunguGroupItem.js.map