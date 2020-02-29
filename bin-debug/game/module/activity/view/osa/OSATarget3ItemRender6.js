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
var OSATarget3ItemRender6 = (function (_super) {
    __extends(OSATarget3ItemRender6, _super);
    function OSATarget3ItemRender6() {
        var _this = _super.call(this) || this;
        _this.skinName = "DailyRechargeItemSkin";
        return _this;
    }
    OSATarget3ItemRender6.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.reward.itemRenderer = ItemBase;
        this.isGet = true;
    };
    OSATarget3ItemRender6.prototype.onClick = function (e) {
        var ins;
        var config;
        var activityData;
        if (this.data instanceof ActivityType3Config) {
            ins = Activity.ins();
            config = GlobalConfig.ActivityType3Config[this.actId][this.index];
            activityData = ins.getActivityDataById(this.actId);
        }
        else if (this.data instanceof PActivity3Config) {
            ins = PActivity.ins();
            config = GlobalConfig.PActivity3Config[this.actId][this.index];
            activityData = ins.getActivityDataById(this.actId);
        }
        switch (e.target) {
            case this.get:
                if (this.isGet) {
                    ins.sendReward(this.actId, this.index);
                }
                else {
                    var tips = 0;
                    switch (config.showType) {
                        case Show3Type.TYPE6:
                            if (activityData.chongzhiTotal < config.val)
                                tips = config.val - activityData.chongzhiTotal;
                            break;
                    }
                    if (!tips) {
                        Activity.ins().sendReward(this.actId, this.index);
                        return;
                    }
                    if (config.showType == Show3Type.TYPE6 && activityData.chongzhiTotal < config.val)
                        UserTips.ins().showTips("未完成累计充值");
                }
                break;
        }
    };
    OSATarget3ItemRender6.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var config;
        var activityData;
        if (this.data instanceof ActivityType3Config) {
            config = this.data;
            activityData = Activity.ins().getActivityDataById(config.Id);
        }
        else if (this.data instanceof PActivity3Config) {
            config = this.data;
            activityData = PActivity.ins().getActivityDataById(config.Id);
        }
        this.reward.dataProvider = new eui.ArrayCollection(config.rewards);
        this.target.text = "\u7D2F\u8BA1\u5145\u503C" + config.val + "\u5143\u5B9D";
        var color = 0x00ff00;
        if (activityData.chongzhiTotal < config.val) {
            color = 0xff0000;
        }
        this.recharge.textFlow = TextFlowMaker.generateTextFlow1("(|C:" + color + "&T:" + activityData.chongzhiTotal + "|C:" + 0x00ff00 + "&T:/" + config.val + ")");
        var btnType = activityData.getRewardStateById(config.index);
        switch (btnType) {
            case Activity.NotReached:
                this.get.label = "未完成";
                this.get.currentState = "disabled";
                this.isGet = false;
                this.redPoint.visible = false;
                break;
            case Activity.CanGet:
                this.get.label = "领取";
                this.get.currentState = "up";
                this.isGet = true;
                this.redPoint.visible = true;
                break;
            case Activity.Geted:
                this.isGet = false;
                this.redPoint.visible = false;
                this.get.visible = false;
                this.already.visible = true;
                break;
        }
        this.actId = config.Id;
        this.index = config.index;
    };
    return OSATarget3ItemRender6;
}(BaseItemRender));
__reflect(OSATarget3ItemRender6.prototype, "OSATarget3ItemRender6");
//# sourceMappingURL=OSATarget3ItemRender6.js.map