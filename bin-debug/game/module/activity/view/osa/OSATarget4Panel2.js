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
var OSATarget4Panel2 = (function (_super) {
    __extends(OSATarget4Panel2, _super);
    function OSATarget4Panel2() {
        var _this = _super.call(this) || this;
        _this._time = 0;
        _this.skinName = "OSARankSkin";
        return _this;
    }
    OSATarget4Panel2.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.reward0.itemRenderer = ItemBase;
        this.reward1.itemRenderer = ItemBase;
        this.reward2.itemRenderer = ItemBase;
        this.reward3.itemRenderer = ItemBase;
        if (!this.titleEffNameMc)
            this.titleEffNameMc = new MovieClip;
        if (!this.titleEffNameMc.parent)
            this.titleEffGroup.addChild(this.titleEffNameMc);
        this.titleEffNameMc.x = this.titleEffGroup.x;
        this.titleEffNameMc.y = this.titleEffGroup.y;
    };
    OSATarget4Panel2.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.seek, this.onTap);
        TimerManager.ins().doTimer(1000, 0, this.setTime, this);
        if (param) {
            this.model = param[0];
        }
        this.observe(Activity.ins().postGetDaBiaoInfo, this.updateData);
        var cfg = GlobalConfig.ActivityType4Config[this.activityID][1];
        if (cfg && cfg.rankType == RankDataType.TYPE_HF_XIAOFEI)
            Activity.ins().sendDabiaoInfo(this.activityID);
        else
            this.updateData();
    };
    OSATarget4Panel2.prototype.setTime = function () {
        if (this._time > 0) {
            this._time -= 1;
            this.actTime.text = DateUtils.getFormatBySecond(this._time, DateUtils.TIME_FORMAT_5, 3);
        }
    };
    OSATarget4Panel2.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.seek, this.onTap);
        TimerManager.ins().removeAll(this);
        this.removeObserve();
    };
    OSATarget4Panel2.prototype.onTap = function (e) {
        switch (e.target) {
            case this.seek:
                var rankType = GlobalConfig.ActivityType4Config[this.activityID][0].rankType;
                var rankDataList = void 0;
                var len = void 0;
                if (!this.model) {
                    rankDataList = Activity.ins().rankInfoList;
                }
                else {
                    rankDataList = this.model.getDataList();
                }
                len = Math.min(rankDataList.length, 20);
                var arr = [];
                var activityData = Activity.ins().getActivityDataById(this.activityID);
                var curIndex = { idx: 1 };
                for (var i = 0; i < len; i++) {
                    var rankdata = rankDataList[i];
                    var rank = activityData.getCostRank(rankdata, curIndex);
                    arr.push({ rankData: rankDataList[i], activityID: this.activityID, rank: rank });
                }
                ViewManager.ins().open(OSARankTipsWin, arr, rankType);
                break;
        }
    };
    OSATarget4Panel2.prototype.setMyRank = function () {
        this.myAttrValue.text = "空";
        var rankType = GlobalConfig.ActivityType4Config[this.activityID][0].rankType;
        if (rankType == RankDataType.TYPE_HF_XIAOFEI) {
            if (Activity.ins().myPaiming == null || Activity.ins().myPaiming == 0) {
                this.myRanking.text = "20名以后";
            }
            else {
                var activityData = Activity.ins().getActivityDataById(this.activityID);
                if (activityData.myPaiming)
                    this.myRanking.text = activityData.myPaiming + "";
                else
                    this.myRanking.text = "20名以后";
            }
        }
        else {
            this.myRanking.text = "20名以后";
        }
        switch (rankType) {
            case RankDataType.TYPE_BAOSHI:
                this.myAttrValue.text = Role.getAllForgeLevelByType(PackageID.Zhuling) + "";
                break;
            case RankDataType.TYPE_LONGHUN:
                this.myAttrValue.text = LongHunData.getLongHunAllLevel() + "";
                break;
            case RankDataType.TYPE_WING:
                this.myAttrValue.text = WingsData.getWingAllLevel() + "";
                break;
            case RankDataType.TYPE_BOOK:
                var power = Book.ins().getBookPowerNumEx();
                this.myAttrValue.text = power + "";
                break;
            case RankDataType.TYPE_ZS:
                this.myAttrValue.text = UserZs.ins().lv + "";
                break;
            case RankDataType.TYPE_SCORE:
                this.myAttrValue.text = UserBag.ins().getEquipsScoreByRolesOfBody() + "";
                break;
            case RankDataType.TYPE_HF_XIAOFEI:
                this.myAttrValue.text = Activity.ins().myDabiaoInfo ? Activity.ins().myDabiaoInfo : 0;
                break;
        }
    };
    OSATarget4Panel2.prototype.updateData = function () {
        var rankType = GlobalConfig.ActivityType4Config[this.activityID][0].rankType;
        if (rankType == RankDataType.TYPE_HF_XIAOFEI)
            this.currentState = "hefu";
        else
            this.currentState = "kaifu";
        this.validateNow();
        var actcfg = GlobalConfig.ActivityConfig[this.activityID];
        var config = GlobalConfig.ActivityType4Config[this.activityID];
        var rankDataList;
        if (!this.model) {
            rankDataList = Activity.ins().rankInfoList;
        }
        else {
            rankDataList = this.model.getDataList();
        }
        if (!rankDataList) {
            return;
        }
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
            this._time = endedTime;
            if (this._time < 0)
                this._time = 0;
            this.actTime.text = DateUtils.getFormatBySecond(endedTime, DateUtils.TIME_FORMAT_5, 3);
        }
        this.actDesc.text = actcfg.desc;
        if (rankType == RankDataType.TYPE_HF_XIAOFEI) {
            this.costRank(rankDataList, config);
        }
        else {
            this.normalRank(rankDataList, config);
        }
        var btnCfg = GlobalConfig.ActivityBtnConfig[this.activityID];
        if (btnCfg) {
            this.title.source = btnCfg.title;
        }
        switch (rankType) {
            case RankDataType.TYPE_BAOSHI:
                this.attr.text = "我的铸造总等级：";
                break;
            case RankDataType.TYPE_LONGHUN:
                this.attr.text = "我的龙魂总等级：";
                break;
            case RankDataType.TYPE_WING:
                this.attr.text = "我的翅膀总等阶：";
                break;
            case RankDataType.TYPE_BOOK:
                this.attr.text = "我的图鉴总战力：";
                break;
            case RankDataType.TYPE_ZS:
                this.attr.text = "我的总转生：";
                break;
            case RankDataType.TYPE_SCORE:
                this.attr.text = "我的装备总评分：";
                break;
            case RankDataType.TYPE_HF_XIAOFEI:
                this.attr.text = "我的消费：";
                break;
        }
        if (GlobalConfig.ActivityType4Config[this.activityID][0].titleEffName) {
            var ref = GlobalConfig.ActivityType4Config[this.activityID][0].titleEffName;
            this.titleEffNameMc.playFile(RES_DIR_EFF + ref, -1);
        }
        else {
            this.titleName.source = GlobalConfig.ActivityType4Config[this.activityID][0].titleName;
        }
    };
    OSATarget4Panel2.prototype.costRank = function (rankDataList, config) {
        for (var z = 0; z < 4; z++) {
            if (this["name" + z])
                this["name" + z].visible = false;
            if (this["name" + z + "1"])
                this["name" + z + "1"].visible = false;
            var idx = z + 1;
            if (z == 2)
                idx = 4;
            else if (z == 3)
                idx = 6;
            var cfg_1 = config[idx];
            this["reward" + z].dataProvider = new eui.ArrayCollection(cfg_1.rewards);
            if (this["attrValue" + z]) {
                this["attrValue" + z].visible = true;
                this["attrValue" + z].text = "\u8981\u6C42\uFF1A" + cfg_1.value;
            }
        }
        var curIndex = { idx: 1 };
        var activityData = Activity.ins().getActivityDataById(this.activityID);
        for (var k in rankDataList) {
            var rankdata = rankDataList[k];
            var i = activityData.getCostRank(rankdata, curIndex);
            var cfg_2 = config[i];
            if (!i || !cfg_2 || i > 5)
                continue;
            if (i == 1) {
                if (rankdata) {
                    this["name0"].visible = true;
                    this["attrValue0"].visible = this["name0"].visible;
                    if (!this.model) {
                        this["name0"].text = rankdata.name;
                        this["attrValue0"].text = "消费：" + rankdata.numType;
                    }
                    else {
                        this["name0"].text = rankdata.player;
                        this["attrValue0"].text = rankdata.value;
                    }
                }
            }
            else {
                var nlabel = "";
                if (i == 2) {
                    nlabel = "name1";
                }
                else if (i == 3) {
                    nlabel = "name11";
                    this["attrValue1"].visible = false;
                }
                else if (i == 4) {
                    nlabel = "name2";
                }
                else if (i == 5) {
                    nlabel = "name21";
                    this["attrValue2"].visible = false;
                }
                else {
                    continue;
                }
                cfg_2 = config[i];
                var selfname = this[nlabel];
                selfname.visible = true;
                if (!this.model) {
                    selfname.text = rankdata.name;
                }
                else {
                    selfname.text = rankdata.player;
                }
            }
        }
        var cfg = config[6];
        this["reward3"].dataProvider = new eui.ArrayCollection(cfg.rewards);
        if (this.model) {
            if (this.model.selfPos) {
                if (this.model.selfPos <= 20)
                    this.myRanking.text = this.model.selfPos + "";
                else
                    this.myRanking.text = "20名以后";
                if (rankDataList[this.model.selfPos - 1]) {
                    this.myAttrValue.text = rankDataList[this.model.selfPos - 1].value;
                }
                else {
                    this.setMyRank();
                }
            }
            else {
                this.setMyRank();
            }
        }
        else {
            this.setMyRank();
        }
    };
    OSATarget4Panel2.prototype.normalRank = function (rankDataList, config) {
        for (var i = 1; i <= 3; i++) {
            var rankdata = rankDataList[i - 1];
            if (rankdata) {
                this["name" + (i - 1)].visible = true;
                this["attrValue" + (i - 1)].visible = this["name" + (i - 1)].visible;
                if (!this.model) {
                    this["name" + (i - 1)].text = rankdata.name;
                    this["attrValue" + (i - 1)].text = "消费：" + rankdata.numType;
                }
                else {
                    this["name" + (i - 1)].text = rankdata.player;
                    this["attrValue" + (i - 1)].text = rankdata.value;
                }
            }
            else {
                this["name" + (i - 1)].visible = false;
                this["attrValue" + (i - 1)].visible = this["name" + (i - 1)].visible;
            }
            var cfg_3 = config[i];
            this["reward" + (i - 1)].dataProvider = new eui.ArrayCollection(cfg_3.rewards);
        }
        var cfg = config[4];
        this["reward3"].dataProvider = new eui.ArrayCollection(cfg.rewards);
        if (this.model) {
            if (this.model.selfPos) {
                if (this.model.selfPos <= 20)
                    this.myRanking.text = this.model.selfPos + "";
                else
                    this.myRanking.text = "20名以后";
                if (rankDataList[this.model.selfPos - 1]) {
                    this.myAttrValue.text = rankDataList[this.model.selfPos - 1].value;
                }
                else {
                    this.setMyRank();
                }
            }
            else {
                this.setMyRank();
            }
        }
        else {
            this.setMyRank();
        }
    };
    return OSATarget4Panel2;
}(BaseView));
__reflect(OSATarget4Panel2.prototype, "OSATarget4Panel2");
//# sourceMappingURL=OSATarget4Panel2.js.map