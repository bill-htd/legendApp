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
var ActivityType4Panel = (function (_super) {
    __extends(ActivityType4Panel, _super);
    function ActivityType4Panel() {
        var _this = _super.call(this) || this;
        _this.skinName = "ActRaceSkin";
        _this.list.itemRenderer = ActivityType4ItemRenderer;
        _this.list1.itemRenderer = ItemBase;
        return _this;
    }
    ActivityType4Panel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.listData = new eui.ArrayCollection;
        this.list.dataProvider = this.listData;
    };
    ActivityType4Panel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.updateData();
        this.addTouchEvent(this.getReward, this.onClick);
        if (this.btn_showRank) {
            this.addTouchEvent(this.btn_showRank, this.onClick);
        }
        if (this.btn_showRank0) {
            this.addTouchEvent(this.btn_showRank0, this.onClick);
        }
        if (this.group_Rank) {
            this.group_Rank.visible = false;
        }
        if (this.btn_showRank && this.group_Rank) {
            this.btn_showRank.label = this.group_Rank.visible ? "查看奖励" : "查看排行";
        }
    };
    ActivityType4Panel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        debug.log("close");
        this.removeTouchEvent(this.getReward, this.onClick);
        if (this.btn_showRank) {
            this.removeTouchEvent(this.btn_showRank, this.onClick);
        }
        if (this.btn_showRank0) {
            this.removeTouchEvent(this.btn_showRank0, this.onClick);
        }
        this.removeObserve();
    };
    ActivityType4Panel.prototype.updateData = function () {
        var activityData = Activity.ins().getActivityDataById(this.activityID);
        var beganTime = Math.floor((DateUtils.formatMiniDateTime(activityData.startTime) - GameServer.serverTime) / 1000);
        var endedTime = Math.floor((DateUtils.formatMiniDateTime(activityData.endTime) - GameServer.serverTime) / 1000);
        if (beganTime >= 0) {
            this.date.text = "活动未开启";
        }
        else if (endedTime <= 0) {
            this.date.text = "活动已结束";
        }
        else {
            var day = Math.floor(endedTime / (3600 * 24));
            var hour = Math.floor((endedTime % (3600 * 24)) / 3600);
            var minu = Math.floor((endedTime % 3600) / 60);
            this.date.text = day + "天" + hour + "小时" + minu + "分";
        }
        this.desc.text = GlobalConfig.ActivityConfig[this.activityID].desc;
        var listData = this.getDataList(activityData.id);
        this.listData.replaceAll(listData);
        var rewards = this.getCurRewards();
        this.list1.dataProvider = new eui.ArrayCollection(rewards);
        this.refushBtnStatu();
        for (var i = 0; i < 4; i++) {
            var actConfig = listData[i];
            var rankData = Activity.ins().getrankInfoListByIndex[i];
            var idx = i + 1;
            var list_item = this["list_item" + idx];
            var label_nname = this["label_nname" + idx];
            var label_value = this["label_value" + idx];
            var sName = "暂无";
            var sValue = "";
            if (rankData) {
                sName = rankData.name;
                switch (actConfig.rankType) {
                    case RankDataType.TYPE_LEVEL:
                        if (rankData.zsLevel > 0) {
                            sValue = rankData.zsLevel + "转" + rankData.level + "级";
                        }
                        else {
                            sValue = rankData.level + "级";
                        }
                        break;
                    case RankDataType.TYPE_POWER:
                        sValue = CommonUtils.overLength(rankData.numType);
                        break;
                    case RankDataType.TYPE_WING:
                        sValue = CommonUtils.overLength(rankData.numType);
                        break;
                    case RankDataType.TYPE_JOB_ZS:
                        sValue = CommonUtils.overLength(rankData.numType);
                        break;
                    case RankDataType.TYPE_JOB_FS:
                        sValue = CommonUtils.overLength(rankData.numType);
                        break;
                    case RankDataType.TYPE_JOB_DS:
                        sValue = CommonUtils.overLength(rankData.numType);
                        break;
                    case RankDataType.TYPE_BAOSHI:
                        sValue = rankData.numType + "级";
                        break;
                    case RankDataType.TYPE_ZHANLING:
                        sValue = rankData.numType[0] + "阶" + rankData.numType[1] + "星";
                        break;
                    case RankDataType.TYPE_LONGHUN:
                        sValue = rankData.numType + "级";
                        break;
                    case RankDataType.TYPE_XIAOFEI:
                        sValue = rankData.numType + '元宝';
                        break;
                }
            }
            if (list_item) {
                list_item.itemRenderer = ItemBase;
                list_item.dataProvider = new eui.ArrayCollection(actConfig.rewards);
            }
            if (label_nname) {
                label_nname.text = sName;
            }
            if (label_value) {
                label_value.text = sValue;
            }
        }
    };
    ActivityType4Panel.prototype.refushBtnStatu = function () {
        for (var k in Activity.ins().activityData) {
            var _data = Activity.ins().activityData[k];
            if (_data && _data.type == 4 && _data.isOpenActivity()) {
                Activity.ins().sendDabiaoInfo(_data.id);
            }
        }
        var model = Activity.ins();
        var rewardStatus = this.getCurStatus();
        var curValue = this.getCurValue();
        switch (rewardStatus) {
            case 0:
                this.dabiaoImg.visible = false;
                this.getReward.visible = false;
                this.rankName.visible = true;
                this.rankDesc.visible = true;
                this.rankName.text = Actor.myName;
                break;
            case 1:
                this.rankName.visible = false;
                this.rankDesc.visible = false;
                this.dabiaoImg.visible = false;
                this.getReward.visible = true;
                break;
            case 2:
                this.rankName.visible = false;
                this.rankDesc.visible = false;
                this.dabiaoImg.visible = true;
                this.getReward.visible = false;
                break;
            default: debug.log("达标活动领奖状态不存在:" + rewardStatus);
        }
        switch (this.dabiao.rankType) {
            case RankDataType.TYPE_LEVEL:
                if (UserZs.ins().lv > 0) {
                    this.rankDesc.text = UserZs.ins().lv + "转" + Actor.level + "级";
                }
                else {
                    this.rankDesc.text = Actor.level + "级";
                }
                var zs = Math.floor(curValue / 1000);
                var lv = curValue % 1000;
                if (this.label_DabiaoTarget)
                    this.label_DabiaoTarget.text = "达到等级\n" + (zs ? zs + "转" : "") + (lv + "级");
                break;
            case RankDataType.TYPE_POWER:
            case RankDataType.TYPE_WING:
            case RankDataType.TYPE_JOB_ZS:
            case RankDataType.TYPE_JOB_FS:
            case RankDataType.TYPE_JOB_DS:
                this.rankDesc.text = CommonUtils.overLength(Activity.ins().myDabiaoInfo);
                if (this.label_DabiaoTarget)
                    this.label_DabiaoTarget.text = "达到战力\n" + curValue;
                break;
            case RankDataType.TYPE_BAOSHI:
                this.rankDesc.text = Activity.ins().myDabiaoInfo + "级";
                if (this.label_DabiaoTarget)
                    this.label_DabiaoTarget.text = "达到等级\n" + curValue;
                break;
            case RankDataType.TYPE_ZHANLING:
                var tgZj = Math.floor(curValue / 1000);
                var tgZx = curValue % 1000;
                var myZj = Activity.ins().myDabiaoInfo[0];
                var myZx = Activity.ins().myDabiaoInfo[1];
                this.rankDesc.text = myZj + "阶" + myZx + "星";
                if (this.label_DabiaoTarget)
                    this.label_DabiaoTarget.text = "达到星阶\n" + (tgZj ? tgZj + "阶" : "") + (tgZx + "星");
                ;
                break;
            case RankDataType.TYPE_LONGHUN:
                this.rankDesc.text = Activity.ins().myDabiaoInfo + "级";
                if (this.label_DabiaoTarget)
                    this.label_DabiaoTarget.text = "达到等级\n" + curValue;
                break;
            case RankDataType.TYPE_XIAOFEI:
                this.rankDesc.text = Activity.ins().myDabiaoInfo + "元宝";
                if (this.label_DabiaoTarget)
                    this.label_DabiaoTarget.text = "消费\n" + curValue + "元宝";
                break;
        }
    };
    ActivityType4Panel.prototype.getDataList = function (id) {
        var config = GlobalConfig['ActivityType4Panel'][id];
        var list = [];
        for (var k in config) {
            if (config[k].ranking == 0)
                this.dabiao = config[k];
            else
                list.push(config[k]);
        }
        return list;
    };
    ActivityType4Panel.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.getReward:
                Activity.ins().sendGetDabiaoReward(this.activityID);
                break;
            case this.btn_showRank:
            case this.btn_showRank0:
                if (this.group_Rank) {
                    this.group_Rank.visible = !this.group_Rank.visible;
                    if (this.btn_showRank) {
                        this.btn_showRank.label = this.group_Rank.visible ? "查看奖励" : "查看排行";
                    }
                }
                break;
        }
    };
    ActivityType4Panel.prototype.getCurValue = function () {
        var rtn = 0;
        return rtn;
    };
    ActivityType4Panel.prototype.getCurRewards = function () {
        var rtn = [];
        return rtn;
    };
    ActivityType4Panel.prototype.getCurStatus = function () {
        var rtn = 0;
        return rtn;
    };
    return ActivityType4Panel;
}(ActivityPanel));
__reflect(ActivityType4Panel.prototype, "ActivityType4Panel");
//# sourceMappingURL=ActivityType4Panel.js.map