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
var MineDoneRecordRender = (function (_super) {
    __extends(MineDoneRecordRender, _super);
    function MineDoneRecordRender() {
        var _this = _super.call(this) || this;
        _this.skinName = "DoneRecordItemSkin";
        return _this;
    }
    MineDoneRecordRender.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var robName = this.data.name;
        var win = this.data.win;
        var config = GlobalConfig.KuangYuanConfig[Mine.ins().finishedData.configID];
        var color = config.color;
        if (win) {
            this.des0.textFlow = TextFlowMaker.generateTextFlow1(robName + "\u63A0\u593A\u4E86\u6211\u7684|C:" + color + "&T:" + config.name + "|");
        }
        else {
            this.des0.textFlow = TextFlowMaker.generateTextFlow1(robName + "\u63A0\u593A\u6211\u7684|C:" + color + "&T:" + config.name + "|\u5931\u8D25");
        }
    };
    return MineDoneRecordRender;
}(BaseItemRender));
__reflect(MineDoneRecordRender.prototype, "MineDoneRecordRender");
//# sourceMappingURL=MineDoneRecordRender.js.map