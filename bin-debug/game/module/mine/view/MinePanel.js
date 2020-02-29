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
var MinePanel = (function (_super) {
    __extends(MinePanel, _super);
    function MinePanel() {
        return _super.call(this) || this;
    }
    MinePanel.prototype.open = function () {
        this.addTouchEvent(this.go, this.onTap);
        this.observe(Mine.ins().postRedPoint, this.updateRedPoint);
        this.update();
    };
    MinePanel.prototype.update = function () {
        var addCount = Recharge.ins().franchise ? GlobalConfig.PrivilegeData.addKuangCount : 0;
        var maxCount = GlobalConfig.CaiKuangConfig.maxOpenKuangCount + addCount;
        var curCount = Mine.ins().mineCount;
        this.workNum.text = "\u6316\u6398\u6B21\u6570\uFF1A" + (maxCount - curCount) + "/" + maxCount;
        var maxRobCount = GlobalConfig.CaiKuangConfig.maxRobCount;
        var curRobCount = Mine.ins().robCount;
        this.plunderNum.text = "\u63A0\u593A\u6B21\u6570\uFF1A" + (maxRobCount - curRobCount) + "/" + maxRobCount;
        this.redPoint.visible = Mine.redpointCheck();
    };
    MinePanel.prototype.updateRedPoint = function (num) {
        this.redPoint.visible = !!num;
    };
    MinePanel.prototype.onTap = function (e) {
        if (!UserFb.ins().checkInFB()) {
            Mine.ins().sendIntoMine();
        }
    };
    return MinePanel;
}(BaseEuiView));
__reflect(MinePanel.prototype, "MinePanel");
//# sourceMappingURL=MinePanel.js.map