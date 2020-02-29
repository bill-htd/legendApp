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
var KfArenaDuanPanel = (function (_super) {
    __extends(KfArenaDuanPanel, _super);
    function KfArenaDuanPanel() {
        var _this = _super.call(this) || this;
        _this.name = "\u6BB5\u4F4D";
        return _this;
    }
    KfArenaDuanPanel.prototype.childrenCreated = function () {
        this.initUI();
    };
    KfArenaDuanPanel.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.listArray = new eui.ArrayCollection();
        this.list.itemRenderer = KfArenaDuanItemRender;
        this.list.dataProvider = this.listArray;
        this.rewardList.itemRenderer = ItemBase;
    };
    KfArenaDuanPanel.prototype.open = function () {
        this.addTouchEvent(this.rewardList, this.onTouch);
        this.observe(KfArenaSys.ins().postJoinRewards, this.update);
        this.update();
    };
    KfArenaDuanPanel.prototype.update = function () {
        this.listArray.source = GlobalConfig.CrossArenaBase.finalAward;
        this.rewardList.dataProvider = new eui.ArrayCollection(KfArenaSys.ins().getDuanAwards());
        this.dw.text = KfArenaSys.ins().getDuanName();
        this.redPoint.visible = KfArenaSys.ins().dailyState == 0;
        this.get.visible = KfArenaSys.ins().dailyState == 1;
    };
    KfArenaDuanPanel.prototype.onTouch = function (e) {
        KfArenaSys.ins().sendDailyRewards();
    };
    return KfArenaDuanPanel;
}(BaseEuiView));
__reflect(KfArenaDuanPanel.prototype, "KfArenaDuanPanel");
//# sourceMappingURL=KfArenaDuanPanel.js.map