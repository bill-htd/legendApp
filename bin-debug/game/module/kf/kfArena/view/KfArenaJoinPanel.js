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
var KfArenaJoinPanel = (function (_super) {
    __extends(KfArenaJoinPanel, _super);
    function KfArenaJoinPanel() {
        var _this = _super.call(this) || this;
        _this.name = "\u53C2\u4E0E";
        return _this;
    }
    KfArenaJoinPanel.prototype.childrenCreated = function () {
        this.initUI();
    };
    KfArenaJoinPanel.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.listArray = new eui.ArrayCollection();
        this.list.itemRenderer = KfArenaJoinItemRender;
        this.list.dataProvider = this.listArray;
    };
    KfArenaJoinPanel.prototype.open = function () {
        this.observe(KfArenaSys.ins().postJoinRewards, this.update);
        this.update();
    };
    KfArenaJoinPanel.prototype.update = function () {
        var peakAwards = GlobalConfig.CrossArenaBase.peakAwards;
        var tem = [];
        var index = 1;
        for (var i in peakAwards) {
            peakAwards[i].id = index;
            tem.push(peakAwards[i]);
            index++;
        }
        this.listArray.source = tem;
        this.myRecord.text = KfArenaSys.ins().dflCount;
    };
    KfArenaJoinPanel.prototype.close = function () {
    };
    return KfArenaJoinPanel;
}(BaseEuiView));
__reflect(KfArenaJoinPanel.prototype, "KfArenaJoinPanel");
//# sourceMappingURL=KfArenaJoinPanel.js.map