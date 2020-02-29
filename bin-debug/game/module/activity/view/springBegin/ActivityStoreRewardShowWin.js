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
var ActivityStoreRewardShowWin = (function (_super) {
    __extends(ActivityStoreRewardShowWin, _super);
    function ActivityStoreRewardShowWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "activityStoreRewardShowSkin";
        _this.isTopLevel = true;
        return _this;
    }
    ActivityStoreRewardShowWin.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.shopList.itemRenderer = ActivityStoreShowItemRender;
    };
    ActivityStoreRewardShowWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._activityID = args[0];
        this.update();
        this.addTouchEvent(this.bgClose, this.onTouch);
    };
    ActivityStoreRewardShowWin.prototype.close = function () {
        this.removeTouchEvent(this.bgClose, this.onTouch);
    };
    ActivityStoreRewardShowWin.prototype.update = function () {
        var config = Activity.ins().getConfig22_3(this._activityID);
        this.shopList.dataProvider = new ArrayCollection(config ? config.showReward : null);
    };
    ActivityStoreRewardShowWin.prototype.onTouch = function (e) {
        ViewManager.ins().close(this);
    };
    return ActivityStoreRewardShowWin;
}(BaseEuiView));
__reflect(ActivityStoreRewardShowWin.prototype, "ActivityStoreRewardShowWin");
ViewManager.ins().reg(ActivityStoreRewardShowWin, LayerManager.UI_Main);
//# sourceMappingURL=ActivityStoreRewardShowWin.js.map