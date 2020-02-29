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
var ShenyuBossPanel = (function (_super) {
    __extends(ShenyuBossPanel, _super);
    function ShenyuBossPanel() {
        var _this = _super.call(this) || this;
        _this.isStartTime = false;
        _this.type = 0;
        _this.restoreTime = 0;
        return _this;
    }
    ShenyuBossPanel.prototype.childrenCreated = function () {
        this.init();
    };
    ShenyuBossPanel.prototype.init = function () {
        this.list.itemRenderer = BossItem;
        this.setting.textFlow = (new egret.HtmlTextParser).parser("<a href=\"event:\"><u>" + this.setting.text + "</u></a>");
        this.setting.touchEnabled = true;
        this.listData = new eui.ArrayCollection();
        this.list.dataProvider = this.listData;
    };
    ShenyuBossPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.type = UserBoss.BOSS_SUBTYPE_SHENYU;
        this.observe(UserBoss.ins().postWorldBoss, this.setData);
        this.observe(UserBoss.ins().postWorldBoss, this.calljoinPulbicChallenge);
        this.observe(UserBag.ins().postItemCountChange, this.UseToItem);
        this.setting.addEventListener(egret.TextEvent.LINK, this.onLink, this);
        this.addTouchEvent(this.buyBtn, this.onTap);
        this.addTouchEvent(this, this.onTap);
        this.setData();
        this.showBossId = param[0];
    };
    ShenyuBossPanel.prototype.close = function () {
        this.setting.removeEventListener(egret.TextEvent.LINK, this.onLink, this);
        this.removeObserve();
        TimerManager.ins().remove(this.updateTime, this);
        this.isStartTime = false;
    };
    ShenyuBossPanel.prototype.showTips = function () {
        var count = UserBoss.ins().worldBossLeftTime[this.type];
        if (count > 0) {
            return true;
        }
        UserTips.ins().showTips("|C:0xff0000&T:\u6311\u6218\u6B21\u6570\u4E0D\u8DB3,\u65E0\u6CD5\u6311\u6218");
        return false;
    };
    ShenyuBossPanel.prototype.UseToItem = function () {
        if (this.isUse) {
            this.isUse = false;
            UserBoss.ins().sendWorldBossInfo(this.type);
        }
    };
    ShenyuBossPanel.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.buyBtn:
                if (!this.showTips())
                    return;
                break;
            default:
                if (e.target instanceof eui.Button) {
                    var config = e.target.parent['config'];
                    switch (e.target.name) {
                        case "shenyuChallenge":
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
    ShenyuBossPanel.prototype.calljoinPulbicChallenge = function () {
        if (!this.joinPulbicChallenge(this.config))
            return;
        ViewManager.ins().close(LimitTaskView);
    };
    ShenyuBossPanel.prototype.joinPulbicChallenge = function (config) {
        if (!config)
            return false;
        if (!this.isJoin)
            return false;
        this.isJoin = false;
        if (UserFb.ins().checkInFB())
            return false;
        if (UserBoss.ins().worldBossLeftTime[this.type] <= 0) {
            UserTips.ins().showTips("挑战次数不足");
        }
        else if (config.zsLevel <= UserZs.ins().lv && config.level <= Actor.level) {
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
    ShenyuBossPanel.prototype.updateTime = function () {
        if (this.timeTxt == undefined)
            return;
        var time = this.restoreTime - egret.getTimer();
        if (time <= 0) {
            TimerManager.ins().remove(this.updateTime, this);
            this.isStartTime = false;
            if (UserBoss.ins().worldBossLeftTime[this.type] >= GlobalConfig.WorldBossBaseConfig.dayCount[this.type - 1])
                this.timeTxt.visible = false;
            else {
                UserBoss.ins().sendWorldBossInfo(this.type);
            }
        }
        else {
            if (!this.timeTxt.visible)
                this.timeTxt.visible = true;
        }
        var timeStr = DateUtils.getFormatBySecond(Math.floor(time / 1000), DateUtils.TIME_FORMAT_12);
        this.timeTxt.text = "\uFF08" + timeStr + "\u6062\u590D\uFF09";
    };
    ShenyuBossPanel.prototype.showJuan = function (itemData) {
        if (!itemData) {
            this.juan.visible = false;
            return;
        }
        this.juan.visible = true;
        this.jicon.source = itemData.itemConfig.icon + "_png";
        this.jcount.text = itemData.count + "";
    };
    ShenyuBossPanel.prototype.setData = function () {
        var leftTime = UserBoss.ins().worldBossLeftTime[this.type];
        this.buyBtn.visible = false;
        var itemData = UserBag.ins().getBagItemById(ItemConst.SHENYUBOSS);
        this.showJuan(itemData);
        this.challengeCountTxt.text = leftTime + "/" + GlobalConfig.WorldBossBaseConfig.dayCount[this.type - 1];
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
            var bossLv = bossConfig.zsLevel * 1000 + bossConfig.level;
            if (roleLv >= bossLv) {
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
        if (!this.isStartTime) {
            TimerManager.ins().doTimer(1000, 0, this.updateTime, this);
            this.restoreTime = UserBoss.ins().worldBossrestoreTime[this.type];
            this.isStartTime = true;
            this.updateTime();
        }
        this.refushBarList(bossInfos);
    };
    ShenyuBossPanel.prototype.compareFn = function (a, b) {
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
    ShenyuBossPanel.prototype.onTouch = function () {
        GameGuider.guidance(egret.getQualifiedClassName(ForgeWin), 2);
    };
    ShenyuBossPanel.prototype.onLink = function () {
        ViewManager.ins().open(PubBossRemindWin, this.type);
    };
    ShenyuBossPanel.prototype.refushBarList = function (wbitems) {
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
    return ShenyuBossPanel;
}(BaseView));
__reflect(ShenyuBossPanel.prototype, "ShenyuBossPanel");
//# sourceMappingURL=ShenyuBossPanel.js.map