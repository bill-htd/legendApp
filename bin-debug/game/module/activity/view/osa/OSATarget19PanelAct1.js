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
var OSATarget19PanelAct1 = (function (_super) {
    __extends(OSATarget19PanelAct1, _super);
    function OSATarget19PanelAct1() {
        var _this = _super.call(this) || this;
        _this.skinName = "ISCostTargetSkin";
        return _this;
    }
    OSATarget19PanelAct1.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
    };
    OSATarget19PanelAct1.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.maskGroup, this.onClick);
        this.observe(Activity.ins().postActivityIsGetAwards, this.updateData);
        this.activityID = param[0];
        Activity.ins().sendChangePage(this.activityID);
    };
    OSATarget19PanelAct1.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.maskGroup:
                if (this.state == Activity.CanGet) {
                    Activity.ins().sendReward(this.activityID, this.index);
                }
                else {
                    var config = GlobalConfig.ActivityType1Config[this.activityID][this.index];
                    var tips = 0;
                    switch (config.showType) {
                        case ShowType.XIAOFEI:
                            var act = Activity.ins().getActivityDataById(this.activityID);
                            if (act.hFTotalConsumption < config.consumeYuanbao)
                                tips = config.consumeYuanbao - act.hFTotalConsumption;
                            break;
                    }
                    if (!tips) {
                        Activity.ins().sendReward(this.activityID, this.index);
                        return;
                    }
                    if (config.showType == ShowType.XIAOFEI)
                        UserTips.ins().showTips("再消费" + tips + "之后即领取奖励");
                }
                break;
        }
    };
    OSATarget19PanelAct1.prototype.updateData = function () {
        var activityData = Activity.ins().getActivityDataById(this.activityID);
        if (!activityData)
            return;
        if (!activityData.isOpenActivity()) {
            UserTips.ins().showTips("\u5F02\u5E38:\u8DE8\u670D\u8FBE\u6807\u9886\u53D6\u6D3B\u52A8\u7ED3\u675F!");
            return;
        }
        var config = GlobalConfig.ActivityType1Config[this.activityID];
        this.index = this.getRuleIndex();
        this.reward.data = config[this.index].rewards[0];
        this.reward.setImgBg1();
        this.reward.hideName();
        this.reward.clearEffect();
        this.reward.showNum(false);
        this.cost.text = activityData.hFTotalConsumption + "";
        this.target.text = "/" + config[this.index].consumeYuanbao;
    };
    OSATarget19PanelAct1.prototype.getRuleIndex = function () {
        var activityData = Activity.ins().getActivityDataById(this.activityID);
        var config = GlobalConfig.ActivityType1Config[this.activityID];
        var index = 1;
        for (var i in config) {
            var acfg = config[i];
            activityData.getRewardStateById(acfg.index);
            var btnType = activityData.getRewardStateById(acfg.index);
            var curget = activityData.rewardsSum[acfg.index];
            var sum = acfg.total ? (acfg.total - curget) : 1;
            this.state = btnType;
            index = acfg.index;
            switch (btnType) {
                case Activity.NotReached:
                    break;
                case Activity.CanGet:
                    if (sum <= 0)
                        this.state = Activity.NotReached;
                    else
                        this.state = Activity.CanGet;
                    break;
                case Activity.Geted:
                    break;
            }
            if (this.state == Activity.CanGet) {
                this.currentState = "can";
                break;
            }
            if (this.state == Activity.NotReached) {
                this.currentState = "cannot";
                break;
            }
        }
        if (this.state == Activity.Geted) {
            this.currentState = "already";
        }
        this.validateNow();
        return index;
    };
    return OSATarget19PanelAct1;
}(BaseComponent));
__reflect(OSATarget19PanelAct1.prototype, "OSATarget19PanelAct1");
//# sourceMappingURL=OSATarget19PanelAct1.js.map