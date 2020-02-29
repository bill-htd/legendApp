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
var ActivityType1ItemRenderer = (function (_super) {
    __extends(ActivityType1ItemRenderer, _super);
    function ActivityType1ItemRenderer() {
        var _this = _super.call(this) || this;
        _this.skinName = "ActLevelSonSkin";
        _this.list.itemRenderer = ItemBase;
        _this.rewardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.reward, _this);
        return _this;
    }
    ActivityType1ItemRenderer.prototype.dataChanged = function () {
        var config = this.data;
        var data = Activity.ins().getActivityDataById(config.Id);
        if (config.zslevel > 0) {
            this.level.source = "level_" + (8 + config.zslevel);
        }
        else {
            this.level.source = "level_" + config.level / 10;
        }
        this.currentState = data.getRewardStateById(config.index - 1) + "";
        this.list.dataProvider = new eui.ArrayCollection(config.rewards);
    };
    ActivityType1ItemRenderer.prototype.reward = function (e) {
        var config = this.data;
        if (UserBag.ins().getSurplusCount() < 1 && this.data.index == 13) {
            UserTips.ins().showTips("|C:0xf3311e&T:背包已满，请清理背包|");
        }
        else {
            Activity.ins().sendReward(config.Id, config.index);
        }
    };
    return ActivityType1ItemRenderer;
}(BaseItemRender));
__reflect(ActivityType1ItemRenderer.prototype, "ActivityType1ItemRenderer");
//# sourceMappingURL=ActivityType1ItemRenderer.js.map