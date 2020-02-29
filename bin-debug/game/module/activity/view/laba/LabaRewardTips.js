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
var LabaRewardTips = (function (_super) {
    __extends(LabaRewardTips, _super);
    function LabaRewardTips() {
        var _this = _super.call(this) || this;
        _this.skinName = "LaBaRankRewardskin";
        return _this;
    }
    LabaRewardTips.prototype.destoryView = function () {
        _super.prototype.destoryView.call(this);
    };
    LabaRewardTips.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
    };
    LabaRewardTips.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.list0.itemRenderer = LaBaRewardItemItemRender;
        this.addTouchEvent(this.bgClose, this.onClick);
        this.activity = param[0];
        this.updateView();
    };
    LabaRewardTips.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
    };
    LabaRewardTips.prototype.updateView = function () {
        if (!this.activity)
            return;
        var config = GlobalConfig.ActivityType20Config[this.activity.id][this.activity.index];
        var arr = [];
        for (var i = 0; i < config.rankReward.length; i++) {
            arr.push({ config: config, index: i });
        }
        this.list0.dataProvider = new eui.ArrayCollection(arr);
    };
    return LabaRewardTips;
}(BaseEuiView));
__reflect(LabaRewardTips.prototype, "LabaRewardTips");
ViewManager.ins().reg(LabaRewardTips, LayerManager.UI_Popup);
//# sourceMappingURL=LabaRewardTips.js.map