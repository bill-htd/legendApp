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
var OSATarget3ItemRender7 = (function (_super) {
    __extends(OSATarget3ItemRender7, _super);
    function OSATarget3ItemRender7() {
        var _this = _super.call(this) || this;
        _this.skinName = "OSAItem";
        return _this;
    }
    OSATarget3ItemRender7.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.rewardList.itemRenderer = ItemBase;
        this.isGet = true;
    };
    OSATarget3ItemRender7.prototype.onClick = function (e) {
        switch (e.target) {
            case this.get0:
                if (this.isGet) {
                    if (this.data instanceof ActivityType3Config) {
                        Activity.ins().sendReward(this.actId, this.index);
                    }
                    else if (this.data instanceof PActivity3Config) {
                        PActivity.ins().sendReward(this.actId, this.index);
                    }
                }
                else {
                    var config = void 0;
                    var activityData = void 0;
                    var ins = void 0;
                    if (this.data instanceof ActivityType3Config) {
                        config = GlobalConfig.ActivityType3Config[this.actId][this.index];
                        ins = Activity.ins();
                        activityData = ins.getActivityDataById(this.actId);
                    }
                    else if (this.data instanceof PActivity3Config) {
                        config = GlobalConfig.PActivity3Config[this.actId][this.index];
                        ins = PActivity.ins();
                        activityData = ins.getActivityDataById(this.actId);
                    }
                    var tips = 0;
                    switch (config.showType) {
                        case Show3Type.TYPE7:
                            if (activityData.dabiao[this.index - 1] < config.day)
                                tips = config.day - activityData.dabiao[this.index - 1];
                            break;
                    }
                    if (!tips) {
                        ins.sendReward(this.actId, this.index);
                        return;
                    }
                    if (config.showType == Show3Type.TYPE7 && activityData.dabiao[this.index - 1] < config.day)
                        UserTips.ins().showTips("累计充值" + (+tips) + "天之后即可领取奖励");
                }
                break;
        }
    };
    OSATarget3ItemRender7.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var config;
        var ins;
        var activityData;
        if (this.data instanceof ActivityType3Config) {
            config = this.data;
            ins = Activity.ins();
            activityData = ins.getActivityDataById(config.Id);
        }
        else if (this.data instanceof PActivity3Config) {
            config = this.data;
            ins = PActivity.ins();
            activityData = ins.getActivityDataById(config.Id);
        }
        this.num.text = config.day + "";
        this.rewardList.dataProvider = new eui.ArrayCollection(config.rewards);
        var btnType = activityData.getRewardStateById(config.index);
        switch (btnType) {
            case Activity.NotReached:
                this.get0.label = "未完成";
                this.get0.currentState = "disabled";
                this.isGet = false;
                this.redPoint.visible = false;
                break;
            case Activity.CanGet:
                this.get0.label = "领取";
                this.get0.currentState = "up";
                this.isGet = true;
                this.redPoint.visible = true;
                break;
            case Activity.Geted:
                this.isGet = false;
                this.redPoint.visible = false;
                this.get0.visible = false;
                this.already.visible = true;
                break;
        }
        this.actId = config.Id;
        this.index = config.index;
    };
    return OSATarget3ItemRender7;
}(BaseItemRender));
__reflect(OSATarget3ItemRender7.prototype, "OSATarget3ItemRender7");
//# sourceMappingURL=OSATarget3ItemRender7.js.map