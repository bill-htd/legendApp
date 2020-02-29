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
var OSATarget8Panel = (function (_super) {
    __extends(OSATarget8Panel, _super);
    function OSATarget8Panel() {
        var _this = _super.call(this) || this;
        _this.skinName = "OSARingFbSkin";
        return _this;
    }
    OSATarget8Panel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
    };
    OSATarget8Panel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(Activity.ins().postChangePage, this.updateView);
        this.addTouchEvent(this.chanllage, this.onChanllage);
        var actId = 0;
        for (var i in GlobalConfig.ActivityType8Config) {
            var cfg = GlobalConfig.ActivityType8Config[i][1];
            if (cfg.showType = ActivityType8Data.TYPE_RING) {
                actId = cfg.Id;
                break;
            }
        }
        this.updateView();
    };
    OSATarget8Panel.prototype.updateView = function () {
        var data = Activity.ins().activityData[this.activityID];
        var config = GlobalConfig.ActivityType8Config[this.activityID][1];
        if (config.showType == ActivityType8Data.TYPE_RING) {
            var index = Activity.ins().getCurrentRingAwardIndex(data.record);
            var cfg = Activity.ins().getRingAward(index);
            if (cfg) {
                this.currentState = 'normal';
                this.price.setPrice(cfg.ybCount);
                this.awardIndex = index;
                this.needYB = cfg.ybCount;
                var rewardsNum = cfg.rewardsNum;
                this.starNum.text = SpecialRing.ins().getCanUpgradeStars(rewardsNum).toString();
                this.rewardsCount.text = rewardsNum.toString();
            }
            else {
                var data_1 = Activity.ins().getLastRingAward();
                this.starNum.text = SpecialRing.ins().getCanUpgradeStars(data_1.rewardsNum).toString();
                this.rewardsCount.text = data_1.rewardsNum.toString();
                this.currentState = 'fullcount';
                this.price.visible = false;
                this.chanllage.visible = false;
            }
        }
        this.actTime.text = data.getRemainTime();
    };
    OSATarget8Panel.prototype.onChanllage = function () {
        if (Actor.yb >= this.needYB) {
            Activity.ins().sendReward(this.activityID, this.awardIndex);
            Activity.ins().addEvent();
        }
        else {
            UserTips.ins().showTips("|C:0xf3311e&T:\u5143\u5B9D\u4E0D\u8DB3|");
        }
    };
    return OSATarget8Panel;
}(ActivityPanel));
__reflect(OSATarget8Panel.prototype, "OSATarget8Panel");
//# sourceMappingURL=OSATarget8Panel.js.map