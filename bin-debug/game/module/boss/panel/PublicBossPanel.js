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
var PublicBossPanel = (function (_super) {
    __extends(PublicBossPanel, _super);
    function PublicBossPanel() {
        var _this = _super.call(this) || this;
        _this.isStartTime = false;
        _this.type = 0;
        _this.restoreTime = 0;
        return _this;
    }
    PublicBossPanel.prototype.childrenCreated = function () {
        this.init();
    };
    PublicBossPanel.prototype.init = function () {
        this.list.itemRenderer = BossItem;
        this.setting.textFlow = (new egret.HtmlTextParser).parser("<a href=\"event:\"><u>" + this.setting.text + "</u></a>");
        this.setting.touchEnabled = true;
        this.listData = new eui.ArrayCollection();
        this.list.dataProvider = this.listData;
        this.vipGroup.touchEnabled = this.tipTxt.touchEnabled = false;
        this.tipTxt.textFlow = TextFlowMaker.generateTextFlow("\u6311\u6218\u6B21\u6570\u4E0D\u8DB3\uFF0C\u9996\u5145\u5F00\u542FBOSS\u4E4B\u5BB6\uFF0C|C:0xf3311e&T:BOSS\u4E0D\u9650\u6B21\u6570\u65E0\u9650\u5237!|");
    };
    PublicBossPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.type = UserBoss.BOSS_SUBTYPE_QMBOSS;
        this.observe(UserBoss.ins().postWorldBoss, this.updateList);
        this.observe(UserBoss.ins().postWorldBoss, this.calljoinPulbicChallenge);
        this.observe(UserBag.ins().postItemCountChange, this.UseToItem);
        this.setting.addEventListener(egret.TextEvent.LINK, this.onLink, this);
        this.addTouchEvent(this.buyBtn, this.onTap);
        this.addTouchEvent(this, this.onTap);
        this.setData();
        this.showBossId = param[0];
        TimerManager.ins().doTimer(2000, 0, this.getNewInfo, this);
    };
    PublicBossPanel.prototype.close = function () {
        this.setting.removeEventListener(egret.TextEvent.LINK, this.onLink, this);
        egret.Tween.removeTweens(this.vipGroup);
        this.removeObserve();
        TimerManager.ins().removeAll(this);
        this.isStartTime = false;
    };
    PublicBossPanel.prototype.getNewInfo = function () {
        UserBoss.ins().sendWorldBossInfo(this.type);
    };
    PublicBossPanel.prototype.showTips = function () {
        var count = UserBoss.ins().worldBossLeftTime[this.type];
        if (count > 0) {
            return true;
        }
        var tipText = "";
        var item = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_OTHTER, ItemConst.PUBLICBOSS);
        if (item) {
            tipText = "\u786E\u5B9A\u4F7F\u75281\u4E2A<font color='#FFB82A'>\u91CE\u5916boss</font>\u9053\u5177\u8FDB\u5165\u6311\u6218\uFF1F\n";
            WarnWin.show(tipText, function () {
                this.isUse = true;
                UserBag.ins().sendUseItem(item.configID, 1);
            }, this);
        }
        else {
            var vipConfig = GlobalConfig.VipConfig[UserVip.ins().lv];
            if (!vipConfig) {
                UserTips.ins().showTips("|C:0xf3311e&T:\u6210\u4E3AVIP\u53EF\u8D2D\u4E70\u6311\u6218\u6B21\u6570|");
                return false;
            }
            if (!vipConfig.boss1buy) {
                UserTips.ins().showTips("|C:0xf3311e&T:VIP\u7B49\u7EA7\u4E0D\u8DB3\uFF0C\u63D0\u5347VIP\u7B49\u7EA7\u53EF\u8D2D\u4E70\u6311\u6218\u6B21\u6570|");
                return false;
            }
            var currentUse = UserBoss.ins().worldChallengeTime[this.type];
            if (count <= 0 && currentUse >= vipConfig.boss1buy) {
                UserTips.ins().showTips("|C:0xff0000&T:\u6311\u6218\u6B21\u6570\u4E0D\u8DB3,\u65E0\u6CD5\u6311\u6218");
                return;
            }
            if (Actor.yb < GlobalConfig.WorldBossBaseConfig.buyCountPrice[this.type - 1]) {
                UserTips.ins().showTips("|C:0xf3311e&T:\u5143\u5B9D\u4E0D\u8DB3|");
                return false;
            }
            tipText = "\u786E\u5B9A\u82B1\u8D39<font color='#FFB82A'>" + GlobalConfig.WorldBossBaseConfig.buyCountPrice[this.type - 1] + "\u5143\u5B9D</font>\u8D2D\u4E701\u6B21\u6311\u6218\u6B21\u6570\u5417\uFF1F\n" +
                ("\u4ECA\u65E5\u5DF2\u8D2D\u4E70\uFF1A" + currentUse + "/" + vipConfig.boss1buy);
            WarnWin.show(tipText, function () {
                UserBoss.ins().sendBuyChallengeTimes(this.type);
            }, this);
        }
        return false;
    };
    PublicBossPanel.prototype.UseToItem = function () {
        if (this.isUse) {
            this.isUse = false;
            UserBoss.ins().sendWorldBossInfo(this.type);
        }
    };
    PublicBossPanel.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.buyBtn:
                if (!this.showTips())
                    return;
                break;
            default:
                if (e.target instanceof eui.Button) {
                    var config = e.target.parent['config'];
                    switch (e.target.name) {
                        case "publicChallenge":
                            this.isJoin = true;
                            this.config = config;
                            this.eId = e.target.parent.data.id;
                            if (!this.showTips())
                                return;
                            if (!this.joinPulbicChallenge(config))
                                return;
                            break;
                    }
                    ViewManager.ins().close(LimitTaskView);
                }
                break;
        }
    };
    PublicBossPanel.prototype.calljoinPulbicChallenge = function () {
        if (!this.joinPulbicChallenge(this.config))
            return;
        ViewManager.ins().close(LimitTaskView);
    };
    PublicBossPanel.prototype.joinPulbicChallenge = function (config) {
        if (!config)
            return false;
        if (!this.isJoin)
            return false;
        this.isJoin = false;
        if (UserFb.ins().checkInFB())
            return false;
        if (config.zsLevel <= UserZs.ins().lv && config.level <= Actor.level) {
            if (UserBag.ins().getSurplusCount() < UserBag.BAG_ENOUGH) {
                ViewManager.ins().open(BagFullTipsWin, UserBag.BAG_ENOUGH);
            }
            else {
                var endTime = Math.ceil((UserBoss.ins().worldBossCd[this.type] - egret.getTimer()) / 1000);
                if (endTime > 0) {
                    UserTips.ins().showTips("|C:0xf3311e&T:\u51B7\u5374\u4E2D\uFF0C" + endTime + "\u79D2\u540E\u53EF\u8FDB\u884C\u6311\u6218|");
                    return false;
                }
                UserBoss.ins().sendChallengWorldBoss(this.eId, this.type);
                ViewManager.ins().close(this);
            }
        }
        else {
            UserTips.ins().showTips("|C:0xf3311e&T:等级不足，无法挑战|");
        }
        return true;
    };
    PublicBossPanel.prototype.updateTime = function () {
        if (this.timeTxt == undefined)
            return;
        var time = this.restoreTime - egret.getTimer();
        if (time <= 0) {
            TimerManager.ins().remove(this.updateTime, this);
            this.isStartTime = false;
            if (UserBoss.ins().worldBossLeftTime[this.type] >= GlobalConfig.WorldBossBaseConfig.dayCount[this.type - 1])
                this.timeTxt.visible = false;
        }
        else {
            if (!this.timeTxt.visible)
                this.timeTxt.visible = true;
        }
        var timeStr = DateUtils.getFormatBySecond(Math.floor(time / 1000), DateUtils.TIME_FORMAT_12);
        this.timeTxt.text = "\uFF08" + timeStr + "\u6062\u590D\uFF09";
    };
    PublicBossPanel.prototype.setData = function () {
        var leftTime = UserBoss.ins().worldBossLeftTime[this.type];
        var itemData = UserBag.ins().getBagItemById(ItemConst.PUBLICBOSS);
        this.buyBtn.visible = leftTime > 0 || itemData ? false : true;
        this.showJuan(itemData);
        this.challengeCountTxt.text = leftTime + "/" + GlobalConfig.WorldBossBaseConfig.dayCount[this.type - 1];
        if (leftTime <= 0 && UserVip.ins().lv <= 0) {
            this.vipGroup.visible = true;
            var t = egret.Tween.get(this.vipGroup, { loop: true }).to({ alpha: 0 }, 1000).to({ alpha: 1 }, 1000);
        }
        else {
            this.vipGroup.visible = false;
            egret.Tween.removeTweens(this.vipGroup);
        }
        if (!this.isStartTime) {
            TimerManager.ins().doTimer(1000, 0, this.updateTime, this);
            this.restoreTime = UserBoss.ins().worldBossrestoreTime[this.type];
            this.isStartTime = true;
            this.updateTime();
        }
        this.initList();
    };
    PublicBossPanel.prototype.showJuan = function (itemData) {
        if (!itemData) {
            this.juan.visible = false;
            return;
        }
        this.juan.visible = true;
        this.jicon.source = itemData.itemConfig.icon + "_png";
        this.jcount.text = itemData.count + "";
    };
    PublicBossPanel.prototype.initList = function () {
        var tempArr = UserBoss.ins().worldInfoList[this.type].slice();
        var bossInfos = [];
        var remindArr = [];
        var remindDieArr = [];
        var noRemindArr = [];
        var noRemindDieArr = [];
        var canNotPlayArr = [];
        var roleLv = UserZs.ins().lv * 1000 + Actor.level;
        for (var i = 0; i < tempArr.length; i++) {
            var isDie = (tempArr[i].relieveTime - egret.getTimer()) / 1000 > 0 || tempArr[i].hp <= 0;
            var boo = UserBoss.ins().getBossRemindByIndex(tempArr[i].id);
            var bossConfig = GlobalConfig.WorldBossConfig[tempArr[i].id];
            if (!bossConfig)
                continue;
            var bossLv = bossConfig.zsLevel * 1000 + bossConfig.level;
            var canChallenge = void 0;
            if (bossConfig.samsaraLv) {
                canChallenge = Actor.samsaraLv >= bossConfig.samsaraLv;
                if (!SamsaraModel.ins().isOpen()) {
                    continue;
                }
            }
            else {
                canChallenge = roleLv >= bossLv;
            }
            if (canChallenge) {
                if (boo) {
                    if (isDie) {
                        remindDieArr.push(tempArr[i]);
                    }
                    else {
                        remindArr.push(tempArr[i]);
                    }
                }
                else {
                    if (isDie) {
                        noRemindDieArr.push(tempArr[i]);
                    }
                    else {
                        noRemindArr.push(tempArr[i]);
                    }
                }
            }
            else {
                canNotPlayArr.push(tempArr[i]);
            }
        }
        remindArr.sort(this.compareFn);
        remindDieArr.sort(this.compareFn);
        noRemindArr.sort(this.compareFn);
        noRemindDieArr.sort(this.compareFn);
        canNotPlayArr.sort(this.compareFn);
        bossInfos = remindArr.concat(remindDieArr, noRemindArr, canNotPlayArr, noRemindDieArr);
        this.listData.replaceAll(bossInfos);
        this.refushBarList(bossInfos);
    };
    PublicBossPanel.prototype.updateList = function () {
        for (var i = 0; i < this.listData.length; i++) {
            this.listData.itemUpdated(this.listData.getItemAt(i));
        }
    };
    PublicBossPanel.prototype.compareFn = function (a, b) {
        var configA = GlobalConfig.WorldBossConfig[a.id];
        var configB = GlobalConfig.WorldBossConfig[b.id];
        if (configA.zsLevel < configB.zsLevel) {
            return 1;
        }
        else if (configA.zsLevel > configB.zsLevel) {
            return -1;
        }
        if (configA.level < configB.level)
            return 1;
        else if (configA.level > configB.level)
            return -1;
        else
            return 0;
    };
    PublicBossPanel.prototype.onTouch = function () {
        GameGuider.guidance(egret.getQualifiedClassName(ForgeWin), 2);
    };
    PublicBossPanel.prototype.onLink = function () {
        ViewManager.ins().open(PubBossRemindWin, this.type);
    };
    PublicBossPanel.prototype.refushBarList = function (wbitems) {
        if (!this.showBossId) {
            this.bossScroller.viewport.scrollV = 0;
            return;
        }
        for (var i = 0; i < wbitems.length; i++) {
            var wcfg = GlobalConfig.WorldBossConfig[wbitems[i].id];
            if (wcfg && this.showBossId == wcfg.bossId) {
                this.bossScroller.viewport.validateNow();
                this.bossScroller.viewport.scrollV = i * 138;
                if (this.bossScroller.viewport.contentHeight - this.bossScroller.viewport.scrollV < this.bossScroller.viewport.height) {
                    this.bossScroller.viewport.scrollV = this.bossScroller.viewport.contentHeight - this.bossScroller.height;
                }
                break;
            }
        }
    };
    return PublicBossPanel;
}(BaseView));
__reflect(PublicBossPanel.prototype, "PublicBossPanel");
//# sourceMappingURL=PublicBossPanel.js.map