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
var assert = egret.assert;
var FBChallengePanel = (function (_super) {
    __extends(FBChallengePanel, _super);
    function FBChallengePanel() {
        var _this = _super.call(this) || this;
        _this.name = "通天塔";
        return _this;
    }
    FBChallengePanel.prototype.childrenCreated = function () {
        this.list.itemRenderer = SkyItemRenderer;
        this.iconList.itemRenderer = ItemBase;
        this.iconList0.itemRenderer = ItemBase;
    };
    FBChallengePanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.challengeBtn, this.challenge);
        this.addTouchEvent(this.challengeBtn0, this.getDayRewward);
        this.addTouchEvent(this.jump, this.onClick);
        this.addTouchEvent(this.choujiang, this.lotto);
        this.refushPanelInfo();
        this.observe(FbRedPoint.ins().postTabs, this.updateRedPoint);
        this.observe(UserFb2.ins().postGetReward, this.updateReward);
        this.observe(Rank.ins().postRankingData, this.initRanking);
        this.observe(UserFb2.ins().postUpDataInfo, this.updateRedPointStyle);
        Rank.ins().sendGetRankingData(RankDataType.TYPE_COPY);
        this.updateRedPoint(2);
        this.showRewwardLabel();
    };
    FBChallengePanel.prototype.updateRedPointStyle = function () {
        this.redPoint0.visible = SkyLevelModel.ins().cruLevel > 1 && SkyLevelModel.ins().dayReward == 1;
        this.redPoint1.visible = SkyLevelModel.ins().lotteryRemainTimes > 0;
        this.updateTowerState();
    };
    FBChallengePanel.prototype.lotto = function (e) {
        if (SkyLevelModel.ins().cruLevel == 0 && SkyLevelModel.ins().rewardTimes == 0) {
            UserTips.ins().showTips("已全部通关");
        }
        else {
            ViewManager.ins().open(BabelLotteryWin);
        }
    };
    FBChallengePanel.prototype.destructor = function () {
        this.removeObserve();
        this.removeTouchEvent(this.challengeBtn, this.challenge);
        this.removeTouchEvent(this.challengeBtn0, this.getDayRewward);
        this.removeTouchEvent(this.jump, this.onClick);
    };
    FBChallengePanel.prototype.updateReward = function () {
        this.showRewwardLabel();
    };
    FBChallengePanel.prototype.initRanking = function (model) {
        if (model.type != RankDataType.TYPE_COPY) {
            return;
        }
        this.rankModel = model;
        var rankDataList = model.getDataList();
        for (var i = 1; i <= 3; i++) {
            var rankdata = rankDataList[i - 1];
            if (rankdata) {
                this["name" + (i - 1)].text = rankdata.player;
                var info = GlobalConfig.FbChallengeConfig[rankdata.count];
                if (!Assert(info, "\u6392\u884C\u699C\u6570\u636E\uFF0C\u722C\u5854\u5F02\u5E38\uFF1Aid(" + rankdata.count + ")")) {
                    this["num" + (i - 1)].text = info.group + "\u91CD\u5929" + info.layer + "\u5C42";
                }
                else {
                    this["num" + (i - 1)].text = "";
                }
            }
            else {
                this["rankImg" + (i - 1)].visible = this["name" + (i - 1)].visible = this["num" + (i - 1)].visible = false;
            }
        }
        var tet = this.jump.text;
        this.jump.textFlow = TextFlowMaker.generateTextFlow1("|U:&T:" + tet);
    };
    FBChallengePanel.prototype.refushPanelInfo = function () {
        var dataList = SkyLevelModel.ins().getSkyLevelList();
        this.list.dataProvider = new eui.ArrayCollection(dataList);
        var nameCfg = GlobalConfig.FbChNameConfig[SkyLevelModel.ins().stageLevel];
        this.nameLabel.text = nameCfg ? nameCfg.name : "";
        var model = SkyLevelModel.ins();
        var nextCfg = model.getNextOpenLevel();
        if (nextCfg) {
            var nextName = GlobalConfig.FbChNameConfig[nextCfg.group];
            var str = "\u901A\u5173" + nextName.name + nextCfg.layer + "\u5C42";
            var des = "";
            if (nextCfg.equipPos) {
                des = "\u7B2C" + nextCfg.equipPos + "\u4E2A\u6218\u7EB9\u69FD";
                this.noOpenTF.text = des;
                this.unlock.text = "开启新战纹槽";
                this.itemicon.runeName = des;
                this.itemicon.desc2 = "" + nextName.name + nextCfg.layer + "\u5C42";
                this.itemicon.data = nextCfg.showIcon;
            }
            else {
                this.itemicon.desc = "\u901A\u5173" + nextName.name + nextCfg.layer + "\u5C42\u89E3\u9501";
                this.itemicon.data = nextCfg.showIcon;
                var cfg = GlobalConfig.ItemConfig[nextCfg.showIcon];
                var runeType = ItemConfig.getQuality(cfg);
                var endstr = "解锁新类型";
                if (runeType == FBChallengePanel.RunType)
                    endstr = "\u83B7\u5F97";
                this.unlock.text = endstr;
            }
            this.openDesc.text = str;
        }
        else {
            this.topGroup.visible = false;
            this.buttomGroup.verticalCenter = 0;
        }
        var info = GlobalConfig.FbChallengeConfig[model.cruLevel];
        if (info) {
            this.nowrawed.text = "\u901A\u5173\u7B2C" + info.layer + "\u5C42\u5956\u52B1";
            var zsstr = "";
            var zslevel = info.zsLevelLimit;
            if (zslevel)
                zsstr = zslevel ? zslevel.toString() + "转" : "";
            this.limit.text = "" + zsstr + info.levelLimit + "\u7EA7\u53EF\u7EE7\u7EED\u6311\u6218";
            this.iconList.dataProvider = new eui.ArrayCollection([info.clearReward[0]]);
            this.iconList0.dataProvider = new eui.ArrayCollection([info.clearReward[1]]);
            this.expText.text = info.clearReward[2] ? "" + info.clearReward[2].count : "";
            var flag = Actor.level >= info.levelLimit && UserZs.ins().lv >= info.zsLevelLimit;
            this.limit.visible = !flag;
            this.challengeBtn.visible = flag;
            this.endImg.visible = info.layer <= 4;
        }
    };
    FBChallengePanel.prototype.updateRedPoint = function (tab) {
        if (tab == 2) {
            this.redPoint0.visible = SkyLevelModel.ins().cruLevel > 1 && SkyLevelModel.ins().dayReward == 1;
            this.redPoint1.visible = SkyLevelModel.ins().lotteryRemainTimes > 0;
            this.updateTowerState();
        }
    };
    FBChallengePanel.prototype.updateTowerState = function () {
        var isShow = true;
        if (SkyLevelModel.ins().cruLevel != 0 && (SkyLevelModel.ins().cruLevel - 1) < GlobalConfig.FbChallengeBaseConfig.LotteryOpenLevel) {
            isShow = false;
        }
        this.dailyGift0.visible = isShow;
        this.choujiang.visible = isShow;
    };
    FBChallengePanel.prototype.challenge = function () {
        if (UserFb.ins().checkInFB())
            return;
        if (SkyLevelModel.ins().lastPass) {
            UserTips.ins().showTips("当前已全部通关");
            return;
        }
        UserFb2.ins().sendChallenge();
        ViewManager.ins().closeTopLevel();
    };
    FBChallengePanel.prototype.getDayRewward = function () {
        if (SkyLevelModel.ins().cruLevel <= 1) {
            UserTips.ins().showTips("通关一层后，明日0点可领取每日奖励，通关层数越高，奖励越好");
            return;
        }
        if (SkyLevelModel.ins().dayReward < 1) {
            UserTips.ins().showTips("今天没有奖励可以领取");
            return;
        }
        else if (SkyLevelModel.ins().dayReward == 2) {
            UserTips.ins().showTips("明日0点可领取每日奖励，通关层数越高，奖励越好");
            return;
        }
        ViewManager.ins().open(ChallengeDayRewardWin);
    };
    FBChallengePanel.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.jump:
                if (this.rankModel)
                    ViewManager.ins().open(FBChallengeRankWin, this.rankModel);
                break;
        }
    };
    FBChallengePanel.prototype.showRewwardLabel = function () {
        var tips = "";
        if (SkyLevelModel.ins().dayReward == 1) {
            tips = "可领取";
        }
        else {
            tips = "明日0点可领取";
        }
        this.dailyGift.text = tips;
    };
    FBChallengePanel.RunType = 3;
    return FBChallengePanel;
}(BaseView));
__reflect(FBChallengePanel.prototype, "FBChallengePanel");
//# sourceMappingURL=FBChallengePanel.js.map