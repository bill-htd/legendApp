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
var OSATarget6Panel = (function (_super) {
    __extends(OSATarget6Panel, _super);
    function OSATarget6Panel() {
        var _this = _super.call(this) || this;
        _this.skinName = "OSABoss";
        _this.maxIndex = 0;
        return _this;
    }
    OSATarget6Panel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        var sortId = this.getRule();
        this.updateData(sortId);
    };
    OSATarget6Panel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.leftBtn, this.onTap);
        this.addTouchEvent(this.rightBtn, this.onTap);
        this.addTouchEvent(this.goBtn, this.onTap);
        this.observe(Activity.ins().postRewardResult, this.GetCallBack);
        for (var i = 1; i <= 3; i++) {
            this.addTouchEvent(this["boss" + i], this.onClick);
        }
        this.maxIndex = 0;
        for (var k in GlobalConfig.ActivityType6Config[this.activityID])
            this.maxIndex++;
        var sortId = this.getRule();
        this.updateData(sortId);
    };
    OSATarget6Panel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.leftBtn, this.onTap);
        this.removeTouchEvent(this.rightBtn, this.onTap);
        this.removeTouchEvent(this.goBtn, this.onTap);
        this.removeObserve();
    };
    OSATarget6Panel.prototype.onClick = function (e) {
        for (var i = 1; i <= 3; i++) {
            if (e.currentTarget == this["boss" + i]) {
                var idx = this.calcIndex(this.index);
                var config = GlobalConfig.ActivityType6Config[this.activityID][idx];
                if (config && config.bossID && config.jump) {
                    ViewManager.ins().open(config.jump[0][0], config.jump[0][1], config.bossID[i - 1][0]);
                }
                break;
            }
        }
    };
    OSATarget6Panel.prototype.onTap = function (e) {
        var config;
        var idx;
        switch (e.currentTarget) {
            case this.leftBtn:
                --this.index;
                idx = this.calcIndex(this.index);
                if (!idx)
                    return;
                config = GlobalConfig.ActivityType6Config[this.activityID][idx];
                if (!config || this.index - 1 <= 0) {
                    this.index = 1;
                    this.leftBtn.visible = false;
                }
                this.rightBtn.visible = true;
                this.updateData(this.index);
                break;
            case this.rightBtn:
                ++this.index;
                idx = this.calcIndex(this.index);
                if (!idx)
                    return;
                config = GlobalConfig.ActivityType6Config[this.activityID][idx];
                if (!config || this.index + 1 > this.maxIndex) {
                    this.index = this.maxIndex;
                    this.rightBtn.visible = false;
                }
                this.leftBtn.visible = true;
                this.updateData(this.index);
                break;
            case this.goBtn:
                idx = this.calcIndex(this.index);
                if (!idx)
                    return;
                if (this.goBtn.label == "前往击杀") {
                    ViewManager.ins().close(ActivityWin);
                    config = GlobalConfig.ActivityType6Config[this.activityID][idx];
                    if (config && config.bossID && config.jump) {
                        ViewManager.ins().open(config.jump[0][0], config.jump[0][1], config.bossID[0][0]);
                    }
                }
                else {
                    Activity.ins().sendReward(this.activityID, idx);
                }
                break;
        }
    };
    OSATarget6Panel.prototype.GetCallBack = function (activityID) {
        if (this.activityID != activityID)
            return;
        if (!Activity.ins().isSuccee) {
            if (!UserBag.ins().getSurplusCount()) {
                UserTips.ins().showTips("背包已满");
            }
            else {
                UserTips.ins().showTips("领取失败");
                var activityData = Activity.ins().getActivityDataById(this.activityID);
                Activity.ins().sendChangePage(activityData.id);
            }
        }
        Activity.ins().isSuccee = false;
        var sortId = this.getRule();
        this.updateData(sortId);
    };
    OSATarget6Panel.prototype.sortRule = function (a, b) {
        if (a.sort > b.sort)
            return 1;
        else if (a.sort < b.sort)
            return -1;
        else
            return 0;
    };
    OSATarget6Panel.prototype.getRule = function () {
        var activityData = Activity.ins().getActivityDataById(this.activityID);
        var copyConfig = GlobalConfig.ActivityType6Config[this.activityID];
        var ruleIndex1 = 0;
        var ruleIndex2 = 0;
        var isRule = false;
        var config = [];
        for (var i in copyConfig) {
            config.push(copyConfig[i]);
        }
        config.sort(this.sortRule);
        for (var k in config) {
            var idx = this.calcIndex(Number(k));
            var record = activityData.getBossGroupGiftIndex(config[k]);
            var bossRecord = activityData.getBossGroup(activityData.rewardsBossSum[idx], config[k]);
            if (record == Activity.Geted) {
            }
            else if (bossRecord == Activity.KILL && record == Activity.CanGet) {
                if (!ruleIndex1 || config[k].sort < ruleIndex1) {
                    ruleIndex1 = config[k].sort;
                    isRule = true;
                }
                break;
            }
            else if (bossRecord == Activity.NOKILL && record == Activity.CanGet) {
                if (!ruleIndex2 || config[k].sort < ruleIndex2)
                    ruleIndex2 = config[k].sort;
                break;
            }
            if (isRule)
                break;
        }
        var curIndex = 0;
        if (ruleIndex1)
            curIndex = ruleIndex1;
        else
            curIndex = ruleIndex2;
        curIndex = curIndex ? curIndex : config[0].sort;
        return curIndex;
    };
    OSATarget6Panel.prototype.updateData = function (sortId) {
        if (sortId === void 0) { sortId = 1; }
        if (sortId > this.maxIndex) {
            this.index = this.maxIndex;
            return;
        }
        this.index = sortId;
        var id = this.calcIndex(this.index);
        if (!id)
            return;
        var activityData = Activity.ins().getActivityDataById(this.activityID);
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(activityData.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(activityData.endTime) - GameServer.serverTime) / 1000);
        if (beganTime >= 0) {
            this.actTime.text = "活动未开启";
        }
        else if (endedTime <= 0) {
            this.actTime.text = "活动已结束";
        }
        else {
            this.actTime.text = DateUtils.getFormatBySecond(endedTime, DateUtils.TIME_FORMAT_5, 3);
        }
        this.actInfo.text = GlobalConfig.ActivityConfig[this.activityID].desc;
        var curRole = SubRoles.ins().getSubRoleByIndex(0);
        var config = GlobalConfig.ActivityType6Config[this.activityID][id];
        var idx = 0;
        for (var i = 0; i < config.rewards.length; i++) {
            if (!this["item" + idx])
                break;
            var rew = config.rewards[i];
            if (rew.job && curRole.job != rew.job)
                continue;
            this["item" + idx].data = { type: rew.type, count: rew.count, id: rew.id };
            this["item" + idx].visible = true;
            idx++;
        }
        for (var j = idx; j < 4; j++) {
            this["item" + j].visible = false;
        }
        var bossList = config.bossID;
        for (var i = 0; i < 3; i++) {
            if (this["boss" + (i + 1)]) {
                var mid = bossList[i][0];
                var mcfg = GlobalConfig.MonstersConfig[mid];
                this["boss" + (i + 1)].source = "monhead" + mcfg.head + "_png";
                this["monName" + i].text = mcfg.name;
            }
        }
        var record = activityData.getBossGroupGiftIndex(config);
        var bossRecord = activityData.getBossGroup(activityData.rewardsBossSum[id], config);
        this.redPoint.visible = false;
        if (record == Activity.Geted) {
            this.successBtn.visible = true;
            this.goBtn.visible = false;
        }
        else if (bossRecord == Activity.KILL && record == Activity.CanGet) {
            this.goBtn.visible = true;
            this.successBtn.visible = false;
            this.goBtn.label = "领取";
            this.redPoint.visible = true;
        }
        else if (bossRecord == Activity.NOKILL && record == Activity.CanGet) {
            this.goBtn.visible = true;
            this.successBtn.visible = false;
            this.goBtn.label = "前往击杀";
        }
        this.leftBtn.visible = true;
        this.rightBtn.visible = true;
        if (this.index == 1) {
            this.leftBtn.visible = false;
            this.rightBtn.visible = true;
        }
        else if (this.index == this.maxIndex) {
            this.rightBtn.visible = false;
            this.leftBtn.visible = true;
        }
        var group = activityData.getBossGroupIndex(activityData.rewardsBossSum[id], config);
        for (var i = 0; i < group.length; i++) {
            if (group[i]) {
                this["state" + i].visible = true;
            }
            else {
                this["state" + i].visible = false;
            }
        }
        this.actTitle.source = config.groupName;
        this.giftTitle.source = config.giftName;
    };
    OSATarget6Panel.prototype.calcSortId = function (index) {
        for (var i in GlobalConfig.ActivityType6Config[this.activityID]) {
            var cfg = GlobalConfig.ActivityType6Config[this.activityID][i];
            if (cfg.index == index)
                return cfg.sort;
        }
        return 0;
    };
    OSATarget6Panel.prototype.calcIndex = function (sortId) {
        for (var i in GlobalConfig.ActivityType6Config[this.activityID]) {
            var cfg = GlobalConfig.ActivityType6Config[this.activityID][i];
            if (cfg.sort == sortId)
                return cfg.index;
        }
        return 0;
    };
    return OSATarget6Panel;
}(ActivityPanel));
__reflect(OSATarget6Panel.prototype, "OSATarget6Panel");
//# sourceMappingURL=OSATarget6Panel.js.map