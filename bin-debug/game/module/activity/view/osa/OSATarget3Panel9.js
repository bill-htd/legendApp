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
var OSATarget3Panel9 = (function (_super) {
    __extends(OSATarget3Panel9, _super);
    function OSATarget3Panel9(id) {
        var _this = _super.call(this) || this;
        _this.activityID = id || 0;
        _this.initSkin();
        return _this;
    }
    OSATarget3Panel9.prototype.initSkin = function () {
        var config = GlobalConfig.ActivityConfig[this.activityID];
        this.skinName = config.pageSkin;
    };
    OSATarget3Panel9.prototype.open = function () {
        this.initSkin();
        var config = GlobalConfig.ActivityType3Config[this.activityID];
        var len = CommonUtils.getObjectLength(config);
        for (var i = 0; i < len; i++) {
            if (this["targtet" + i])
                this.addTouchEvent(this["targtet" + i], this.onTap);
        }
        this.addTouchEvent(this.rechargeBtn, this.onTap);
        this.observe(Activity.ins().postActivityIsGetAwards, this.showAward);
        this.reward.itemRenderer = ItemBase;
        this.initData();
        TimerManager.ins().doTimer(1000, 0, this.updateTime, this);
    };
    OSATarget3Panel9.prototype.initData = function () {
        this.actInfo1.text = GlobalConfig.ActivityConfig[this.activityID].desc;
        for (var i in GlobalConfig.ActivityType3Config[this.activityID]) {
            var conf = GlobalConfig.ActivityType3Config[this.activityID][i];
            if (conf.type == 4) {
                this.singleReward.data = conf.rewards[0];
                break;
            }
        }
        this.updateTime();
        this.updateData2();
    };
    OSATarget3Panel9.prototype.updateTime = function () {
        var act = Activity.ins().getActivityDataById(this.activityID);
        var sec = act.getLeftTime();
        this.actTime1.text = DateUtils.getFormatBySecond(sec, DateUtils.TIME_FORMAT_5, 3);
    };
    OSATarget3Panel9.prototype.onTap = function (e) {
        if (e.currentTarget == this.rechargeBtn) {
            if (!this._sendConf)
                return;
            var actData = Activity.ins().getActivityDataById(this._sendConf.Id);
            var state = actData.getRewardStateById(this._sendConf.index);
            if (state == Activity.Geted) {
                UserTips.ins().showTips("\u5DF2\u9886\u53D6");
            }
            else if (state == Activity.CanGet) {
                Activity.ins().sendReward(this.activityID, this._sendConf.index);
            }
            else {
                UserTips.ins().showTips("\u672A\u8FBE\u6210\u6761\u4EF6\u4E0D\u8DB3\uFF0C\u8BF7\u5148\u83B7\u5F97\u9524\u5B50\u5145\u503C\u76EE\u6807");
            }
            return;
        }
        if (e.currentTarget instanceof CelebrationItem) {
            var tar = e.currentTarget;
            this.updateReward(tar.data.config.index, tar.data.config.index);
            var cfg = GlobalConfig.ActivityType3Config[this.activityID];
            for (var i in cfg) {
                if (cfg[i].index != tar.data.config.index && this["targtet" + (cfg[i].index - 1)])
                    this["targtet" + (cfg[i].index - 1)].setSelect(false);
            }
        }
    };
    OSATarget3Panel9.prototype.showAward = function () {
        if (this._sendConf) {
            var actData = Activity.ins().getActivityDataById(this._sendConf.Id);
            var state = actData.getRewardStateById(this._sendConf.index);
            if (state == Activity.Geted) {
                this.showEff(this._sendConf);
                this.rechargeBtn.visible = false;
                this.already.visible = !this.rechargeBtn.visible;
            }
        }
    };
    OSATarget3Panel9.prototype.close = function () {
        this.cleanEff();
        this.removeTouchEvent(this.rechargeBtn, this.onTap);
        this.removeObserve();
        TimerManager.ins().remove(this.updateTime, this);
    };
    OSATarget3Panel9.prototype.updateReward = function (index, select) {
        var act = Activity.ins().getActivityDataById(this.activityID);
        var config = GlobalConfig.ActivityType3Config[this.activityID][index];
        if (!config || !act || !this["targtet" + (index - 1)])
            return;
        this["targtet" + (index - 1)].data = { curCost: act.chongzhiTotal, config: config };
        this["targtet" + (index - 1)].setSelect(select ? (index == select) : false);
        this.rechargeBtn.visible = true;
        this.bigEgg.source = config.expAttr[4];
        if (index == select) {
            this._sendConf = config;
            var state = act.getRewardStateById(this._sendConf.index);
            this.redPoint.visible = false;
            if (state == Activity.Geted) {
                this.rechargeBtn.visible = false;
                this.bigEgg.source = config.expAttr[5];
            }
            else if (state == Activity.CanGet) {
                this.redPoint.visible = true;
            }
            else {
            }
            this.reward.dataProvider = new eui.ArrayCollection(config.rewards);
        }
        this.already.visible = !this.rechargeBtn.visible;
    };
    OSATarget3Panel9.prototype.updateData2 = function () {
        var curIndex = this.getRuleIndex();
        if (!curIndex)
            return;
        var act = Activity.ins().getActivityDataById(this.activityID);
        var config = GlobalConfig.ActivityType3Config[this.activityID];
        var len = CommonUtils.getObjectLength(config);
        for (var i = 0; i < len; i++) {
            this.updateReward(i + 1, curIndex);
        }
    };
    OSATarget3Panel9.prototype.updateData = function () {
    };
    OSATarget3Panel9.prototype.getRuleIndex = function () {
        var act = Activity.ins().getActivityDataById(this.activityID);
        if (!act)
            return 0;
        var config = GlobalConfig.ActivityType3Config[this.activityID];
        var maxIndex = CommonUtils.getObjectLength(config);
        var minIndex = maxIndex;
        for (var k in config) {
            if (config[k].index - 1 >= maxIndex || !this["targtet" + (config[k].index - 1)])
                continue;
            var state = act.getRewardStateById(config[k].index);
            if (state == Activity.Geted) {
                continue;
            }
            else if (state == Activity.CanGet) {
                return config[k].index;
            }
            else {
                if (minIndex > config[k].index)
                    minIndex = config[k].index;
            }
        }
        return minIndex;
    };
    OSATarget3Panel9.prototype.cleanEff = function () {
        egret.Tween.removeTweens(this.hamer);
        egret.Tween.removeTweens(this.flower);
        DisplayUtils.removeFromParent(this.tonk);
        DisplayUtils.removeFromParent(this.boom);
    };
    OSATarget3Panel9.prototype.showEff = function (config) {
        var _this = this;
        if (!config)
            return;
        if (!this.tonk)
            this.tonk = new MovieClip;
        if (!this.tonk.parent)
            this.hamer.addChild(this.tonk);
        if (!this.boom)
            this.boom = new MovieClip;
        if (!this.boom.parent)
            this.flower.addChild(this.boom);
        egret.Tween.removeTweens(this.hamer);
        egret.Tween.removeTweens(this.flower);
        var self = this;
        this.tonk.playFile(RES_DIR_EFF + config.expAttr[2], 1, function () {
            var tw = egret.Tween.get(_this.hamer);
            tw.wait(200).call(function () {
                self.updateReward(config.index, config.index);
            });
            self.boom.playFile(RES_DIR_EFF + config.expAttr[3], 1, function () {
                egret.Tween.removeTweens(self.hamer);
                egret.Tween.removeTweens(self.flower);
                DisplayUtils.removeFromParent(self.tonk);
                DisplayUtils.removeFromParent(self.boom);
            });
        });
    };
    return OSATarget3Panel9;
}(BaseView));
__reflect(OSATarget3Panel9.prototype, "OSATarget3Panel9");
//# sourceMappingURL=OSATarget3Panel9.js.map