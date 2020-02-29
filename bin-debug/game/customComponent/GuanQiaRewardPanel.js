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
var GuanQiaRewardPanel = (function (_super) {
    __extends(GuanQiaRewardPanel, _super);
    function GuanQiaRewardPanel() {
        var _this = _super.call(this) || this;
        _this.boxPass = 0;
        return _this;
    }
    GuanQiaRewardPanel.prototype.childrenCreated = function () {
        this.init();
    };
    GuanQiaRewardPanel.prototype.init = function () {
        this.reward = [];
        for (var i = 0; i < 5; i++) {
            this.reward[i] = this['item' + i];
        }
        var str = "<font color='#20A208'><u>查看排行</u></font>";
        this.seeRank.textFlow = new egret.HtmlTextParser().parser(str);
        this.bar.value = 0;
        this.award.visible = false;
        this.challengeBtn.visible = true;
        this.mapImage.touchEnabled = true;
        this.bar.slideDuration = 0;
        this.headGroup.removeChildren();
    };
    GuanQiaRewardPanel.prototype.open = function () {
        this.addTouchEvent(this.challengeBtn, this.onTouchTap);
        this.addTouchEvent(this.seeRank, this.onTouchTap);
        this.addTouchEvent(this.getawardBtn, this.onTouchTap);
        this.addTouchEvent(this.mapImage, this.onTouchTap);
        this.observe(GameLogic.ins().postEnterMap, this.upDataGuanqia);
        this.observe(UserFb.ins().postZhangJieAwardChange, this.upDataGuanqia);
        this.observe(UserFb.ins().postGuanqiaWroldReward, this.upDateGuanqiaWroldReward);
        this.observe(Rank.ins().postRankingData, this.updataFirstThree);
        Rank.ins().sendGetRankingData(RankDataType.TYPE_PASS);
        this.upDateGuanqiaWroldReward();
        this.update();
    };
    GuanQiaRewardPanel.prototype.close = function () {
        this.removeTouchEvent(this.challengeBtn, this.onTouchTap);
        this.removeTouchEvent(this.seeRank, this.onTouchTap);
        this.removeTouchEvent(this.getawardBtn, this.onTouchTap);
        this.removeTouchEvent(this.mapImage, this.onTouchTap);
        this.removeObserve();
    };
    GuanQiaRewardPanel.prototype.onTouchTap = function (e) {
        switch (e.currentTarget) {
            case this.challengeBtn:
                UserFb.ins().autoPk();
                break;
            case this.getawardBtn:
                var config = GlobalConfig.ChaptersRewardConfig[UserFb.ins().guanqiaReward];
                var awards = config.rewards;
                var num = 0;
                for (var i = 0; i < awards.length; i++) {
                    if (awards[i].type == 1 && awards[i].id < 200000)
                        num++;
                }
                if (UserBag.ins().getSurplusCount() >= num)
                    UserFb.ins().sendGetAward();
                else
                    UserTips.ins().showTips("|C:0xf3311e&T:背包已满，请清理背包|");
                break;
            case this.seeRank:
                if (Rank.ins().rankModel[RankDataType.TYPE_PASS] && Rank.ins().rankModel[RankDataType.TYPE_PASS].getDataList().length > 0) {
                    ViewManager.ins().open(FbAndLevelsRankWin, RankDataType.TYPE_PASS);
                }
                else {
                    UserTips.ins().showTips("|C:0xf3311e&T:排行榜暂时未开放|");
                }
                break;
            case this.mapImage:
                ViewManager.ins().open(GuanQiaWorldRewardWin, UserFb.ins().getWorldGuanQiaBox());
                break;
        }
    };
    GuanQiaRewardPanel.prototype.upDataGuanqia = function () {
        this.update();
    };
    GuanQiaRewardPanel.prototype.upDateGuanqiaWroldReward = function () {
        this.boxPass = UserFb.ins().getWorldGuanQia();
        this.redPointBox.visible = UserFb.ins().isReceiveBox(this.boxPass);
    };
    GuanQiaRewardPanel.prototype.update = function () {
        var guanqiaID = UserFb.ins().guanqiaID;
        var config = GlobalConfig.ChaptersRewardConfig[UserFb.ins().guanqiaReward];
        var preConfig = GlobalConfig.ChaptersRewardConfig[UserFb.ins().guanqiaReward - 1];
        if (!config) {
            config = preConfig;
            this.award.visible = false;
            this.info.visible = true;
            this.goldTxt0.text = "";
            this.expTxt0.text = "";
            this.goldTxt1.text = "";
            this.expTxt1.text = "";
        }
        else {
            this.bar.maximum = preConfig ? config.needLevel - preConfig.needLevel : config.needLevel;
            this.bar.value = guanqiaID - (preConfig ? preConfig.needLevel : 0) - 1;
            this.award.visible = this.bar.value == this.bar.maximum;
            this.info.visible = !this['award'].visible;
            this.goldTxt0.text = UserFb.ins().goldEff + "/小时";
            this.expTxt0.text = UserFb.ins().expEff + "/小时";
            this.goldTxt1.text = "";
            this.expTxt1.text = "";
        }
        this.mapNameTxt.text = "\u7B2C" + config.id + "\u7AE0 " + config.name;
        this.specialItem.data = config.rewards[0];
        this.specialItem1.data = config.rewards[0];
        if (this.specialItem1.getText() == "麻痹碎片") {
            this.labelInfo.text = "麻痹戒指：每次攻击有几率麻痹敌人，使敌人无法攻击";
        }
        else if (this.specialItem1.getText() == "护身碎片") {
            this.labelInfo.text = "护身戒指：被攻击时优先消耗魔法值抵消伤害";
        }
        else {
            this.labelInfo.text = "";
        }
        this.desc.text = "\u901A\u5173 " + config.name + " \u6240\u6709\u5173\u5361\u53EF\u83B7\u5F97\u7279\u6212\u788E\u7247\u5956\u52B1";
        this.rewardDesc.text = "\u901A\u5173 " + config.name + " \u5168\u90E8\u5173\u5361\u5956\u52B1";
        this.updateChallenge();
        this.updataFirstThree(Rank.ins().rankModel[RankDataType.TYPE_PASS]);
        this.showChallengeGuide();
    };
    GuanQiaRewardPanel.prototype.updateChallenge = function () {
        this.needWave.visible = false;
        if (UserFb.ins().guanqiaID >= UserFb.ins().maxLen) {
            this.challengeBtn.visible = false;
            this.needWave.visible = true;
            this.needWave.text = "恭喜通关所有关卡";
        }
    };
    GuanQiaRewardPanel.prototype.showChallengeGuide = function () {
        if (UserFb.ins().guanqiaID <= 1
            && UserFb.ins().isShowBossPK()
            && !UserFb.ins().bossIsChallenged) {
        }
    };
    GuanQiaRewardPanel.prototype.updataFirstThree = function (rankModel) {
        if (!rankModel) {
            this.name0.text = this.name1.text = this.name2.text = "暂无";
            this.harm0.text = this.harm1.text = this.harm2.text = "0";
            return;
        }
        if (rankModel.type != RankDataType.TYPE_PASS)
            return;
        for (var i = 0; i < 4; i++) {
            if (i == 3) {
                this["rank" + i].text = 0 < rankModel.selfPos && rankModel.selfPos <= 1000 ? rankModel.selfPos + '' : "未上榜";
                this["harm" + i].text = UserFb.ins().guanqiaID + "关";
                return;
            }
            var data = rankModel.getDataList(i);
            if (data) {
                this["name" + i].text = data[RankDataType.DATA_PLAYER];
                this["harm" + i].text = data[RankDataType.DATA_COUNT] + "关";
            }
            else {
                this["name" + i].text = "暂无";
                this["harm" + i].text = "0";
            }
        }
    };
    return GuanQiaRewardPanel;
}(BaseComponent));
__reflect(GuanQiaRewardPanel.prototype, "GuanQiaRewardPanel");
//# sourceMappingURL=GuanQiaRewardPanel.js.map