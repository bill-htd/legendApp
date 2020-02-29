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
var ZsBossPanel = (function (_super) {
    __extends(ZsBossPanel, _super);
    function ZsBossPanel() {
        return _super.call(this) || this;
    }
    ZsBossPanel.prototype.childrenCreated = function () {
    };
    ZsBossPanel.prototype.initData = function () {
        var config;
        for (var i = 1; i < 5; i++) {
            config = GlobalConfig.OtherBoss1Config[i];
            this["head" + i].source = "monhead" + GlobalConfig.MonstersConfig[config.bossId].head + "_png";
            this["bossName" + i].text = GlobalConfig.MonstersConfig[config.bossId].name + "(" + config.llimit + "-" + config.hlimit + "转)";
            this["rewardList" + i].itemRenderer = ItemBase;
            this["rewardList" + i].dataProvider = new eui.ArrayCollection(config.showReward);
        }
        this.seeReward.textFlow = new egret.HtmlTextParser().parser(StringUtils.addColor("<u>\u67E5\u770B\u5956\u52B1</u>", '#23C42A'));
    };
    ZsBossPanel.prototype.open = function () {
        ZsBoss.ins().sendGetBossList();
        var playIn = ZsBoss.ins().acIsOpen ? "查看排名" : "上次排名";
        for (var i = 1; i < 5; i++) {
            this["rank" + i].textFlow = new egret.HtmlTextParser().parser(StringUtils.addColor("<u>" + playIn + "</u>", '#23C42A'));
            this.addTouchEvent(this["head" + i], this.onTouch);
            this.addTouchEvent(this["rank" + i], this.onTouch);
        }
        this.addTouchEvent(this.seeReward, this.onTouch);
        this.addTouchEvent(this.enterGame, this.onTouch);
        this.addTouchEvent(this.clearBtn, this.onTouch);
        this.observe(ZsBoss.ins().postRrmainTime, this.reliveInfoChange);
        this.observe(ZsBoss.ins().postBossList, this.refushBtn);
        this.reliveInfoChange();
        this.refushBtn();
        this.initData();
    };
    ZsBossPanel.prototype.close = function () {
        for (var i = 1; i < 5; i++) {
            this.removeTouchEvent(this["head" + i], this.onTouch);
            this.removeTouchEvent(this["rank" + i], this.onTouch);
        }
        this.removeTouchEvent(this.seeReward, this.onTouch);
        this.removeTouchEvent(this.enterGame, this.onTouch);
        this.removeTouchEvent(this.clearBtn, this.onTouch);
        this.removeObserve();
    };
    ZsBossPanel.prototype.cleanWarnWin = function () {
        if (this.warnWin) {
            ViewManager.ins().close(WarnWin);
        }
    };
    ZsBossPanel.prototype.refushBtn = function () {
        var isPlay = false;
        var model = ZsBoss.ins();
        if (model.acIsOpen) {
            var bossListLen = model.getBossListLength();
            var data = void 0;
            for (var i = 0; i < bossListLen; i++) {
                data = model.getBossInfoByIndex(i);
                if (data.challengeIn) {
                    this["bossBg" + (i + 1)].source = "zsboss_04";
                    if (data.kill) {
                        this.sign.source = "zsboss_03";
                        model.reliveTime = 0;
                        this.reliveInfoChange();
                    }
                    else {
                        this.sign.source = "zsboss_07";
                    }
                    this.setSignPoint(i);
                    isPlay = true;
                    break;
                }
                else {
                    this["bossBg" + (i + 1)].source = "zsboss_01";
                }
            }
            if (!isPlay) {
                var canIndex = model.canPlayBossIndex();
                if (canIndex > 0) {
                    this["bossBg" + canIndex].source = "zsboss_04";
                    data = model.getBossInfoByIndex(canIndex - 1);
                    if (data) {
                        if (data.kill) {
                            this.sign.source = "zsboss_03";
                            model.reliveTime = 0;
                            this.reliveInfoChange();
                        }
                        else {
                            this.sign.source = "";
                        }
                        this.setSignPoint(canIndex - 1);
                    }
                }
            }
        }
        else {
            this.sign.source = "";
            var canIndex = model.canPlayBossIndex();
            if (canIndex > 0) {
                this["bossBg" + canIndex].source = "zsboss_04";
            }
        }
        for (var index = 2; index < 5; index++) {
            if (index > model.aliveBossNum)
                this["sign" + index].source = "zsboss_17";
            else
                this["sign" + index].source = "";
        }
    };
    ZsBossPanel.prototype.setSignPoint = function (i) {
        this.sign.x = (i % 2) * 210 + 133;
        this.sign.y = Math.floor(i / 2) * 230 + 25;
    };
    ZsBossPanel.prototype.reliveInfoChange = function () {
        var model = ZsBoss.ins();
        this.timeLable.text = "CD：" + model.reliveTime + "秒";
        TimerManager.ins().remove(this.refushLabel, this);
        if (this.cd.visible) {
            this.remainM = model.reliveTime;
            TimerManager.ins().doTimer(1000, this.remainM, this.refushLabel, this, this.overTime, this);
        }
    };
    ZsBossPanel.prototype.overTime = function () {
        this.cd.visible = false;
        this.cleanWarnWin();
    };
    ZsBossPanel.prototype.refushLabel = function () {
        this.remainM--;
        this.timeLable.text = "CD：" + this.remainM + "秒";
    };
    ZsBossPanel.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.head1:
            case this.rank1:
                this.openRankWin(1);
                break;
            case this.head2:
            case this.rank2:
                this.openRankWin(2);
                break;
            case this.head3:
            case this.rank3:
                this.openRankWin(3);
                break;
            case this.head4:
            case this.rank4:
                this.openRankWin(4);
                break;
            case this.seeReward:
                ViewManager.ins().open(ZsBossRewardShowWin);
                break;
            case this.enterGame:
                if (ZsBoss.ins().checkIsShowNoticeWin()) {
                    this.warnWin = WarnWin.show("每天只能参加<font color='#FFB82A'>1次</font>转生BOSS,确定要进入挑战吗？", function () {
                        ZsBoss.ins().sendRequstChallenge();
                        ZsBoss.ins().firstShowWin = true;
                    }, this);
                }
                else {
                    ZsBoss.ins().sendRequstChallenge();
                }
                break;
            case this.clearBtn:
                if (ZsBoss.ins().checkIsMoreMoney()) {
                    this.warnWin = WarnWin.show("确定要消耗<font color='#FFB82A'>300元宝</font>清除CD吗？", function () {
                        ZsBoss.ins().sendBuyCd();
                    }, this);
                }
                else {
                    UserTips.ins().showTips("元宝不足");
                }
                break;
        }
    };
    ZsBossPanel.prototype.openRankWin = function (index) {
        ZsBoss.ins().sendRequstBossRank(index);
        ViewManager.ins().open(ZsBossRankWin);
    };
    return ZsBossPanel;
}(BaseComponent));
__reflect(ZsBossPanel.prototype, "ZsBossPanel");
//# sourceMappingURL=ZsBossPanel.js.map