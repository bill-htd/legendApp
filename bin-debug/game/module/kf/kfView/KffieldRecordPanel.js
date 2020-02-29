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
var KffieldRecordPanel = (function (_super) {
    __extends(KffieldRecordPanel, _super);
    function KffieldRecordPanel() {
        return _super.call(this) || this;
    }
    KffieldRecordPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.listDt = new eui.ArrayCollection();
        this.list.itemRenderer = KffieldRecordItemReder;
        this.list.dataProvider = this.listDt;
    };
    KffieldRecordPanel.prototype.open = function () {
        this.observe(KFBossSys.ins().postDropList, this.upList);
        this.observe(UserReadPlayer.ins().postPlayerResult, this.openOtherPlayerView);
        this.upList();
        KFBossSys.ins().sendDropList();
    };
    KffieldRecordPanel.prototype.openOtherPlayerView = function (otherPlayerData) {
        var win = ViewManager.ins().open(RRoleWin, otherPlayerData);
        win.hideEx(2);
    };
    KffieldRecordPanel.prototype.upList = function () {
        var list = KFBossSys.ins().dropBestRecordDataList;
        list = list.concat(KFBossSys.ins().dropRecordDataList);
        this.listDt.replaceAll(list);
    };
    return KffieldRecordPanel;
}(BaseView));
__reflect(KffieldRecordPanel.prototype, "KffieldRecordPanel");
//# sourceMappingURL=KffieldRecordPanel.js.map