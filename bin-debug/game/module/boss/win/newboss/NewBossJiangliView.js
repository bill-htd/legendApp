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
var NewBossJiangliView = (function (_super) {
    __extends(NewBossJiangliView, _super);
    function NewBossJiangliView() {
        var _this = _super.call(this) || this;
        _this.skinName = "wpkBossJiangLiTishiSkin";
        return _this;
    }
    NewBossJiangliView.prototype.open = function () {
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.giveUp, this.onTap);
        this.initView();
    };
    NewBossJiangliView.prototype.initView = function () {
        var reward = GlobalConfig.NewWorldBossBaseConfig.showDrows;
        this.endItem0.data = reward[0];
        this.endItem1.data = reward[1];
        this.belongItem.data = GlobalConfig.NewWorldBossRankConfig[1][1].reward[0];
        this.joinItem.data = GlobalConfig.NewWorldBossRankConfig[1][4].reward[0];
        this.endItem0.isShowName(false);
        this.endItem1.isShowName(false);
        this.belongItem.isShowName(false);
        this.joinItem.isShowName(false);
    };
    NewBossJiangliView.prototype.onTap = function (e) {
        var tar = e.currentTarget;
        if (tar == this.closeBtn || tar == this.giveUp) {
            ViewManager.ins().close(this);
        }
    };
    NewBossJiangliView.prototype.close = function () {
    };
    return NewBossJiangliView;
}(BaseEuiView));
__reflect(NewBossJiangliView.prototype, "NewBossJiangliView");
ViewManager.ins().reg(NewBossJiangliView, LayerManager.UI_Popup);
//# sourceMappingURL=NewBossJiangliView.js.map