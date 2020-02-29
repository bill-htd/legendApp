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
var BossItem = (function (_super) {
    __extends(BossItem, _super);
    function BossItem() {
        return _super.call(this) || this;
    }
    BossItem.prototype.childrenCreated = function () {
    };
    BossItem.prototype.dataChanged = function () {
        var limitStr = '';
        var color = '';
        var canChallenge;
        var boss;
        var model = this.data;
        var config = GlobalConfig.WorldBossConfig[model.id];
        this.list.itemRenderer = this.list.itemRenderer || ItemBase;
        this.config = config;
        if (!this.list.dataProvider) {
            this.list.dataProvider = new eui.ArrayCollection(config.showReward.concat());
        }
        else {
            var dataPro = this.list.dataProvider;
            dataPro.source = config.showReward.concat();
        }
        var isDie = model.isDie;
        this.boxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        this.infoTxt0.touchEnabled = true;
        canChallenge = UserBoss.isCanChallenge(config);
        if (config.samsaraLv > 0) {
            limitStr = config.showName + "\u5F00\u542F";
        }
        else {
            if (config.zsLevel > 0) {
                limitStr = config.zsLevel + "\u8F6C\u5F00\u542F";
            }
            else {
                limitStr = config.level + "\u7EA7\u5F00\u542F";
            }
        }
        color = canChallenge ? "23CA23" : "f15a25";
        this.levelRequire.text = limitStr;
        this.bar.value = model.hp;
        this.bar.maximum = 100;
        boss = GlobalConfig.MonstersConfig[config.bossId];
        this.timeTxt.visible = isDie;
        if (this.timeTxt.visible) {
            this.updateTime();
            TimerManager.ins().doTimer(100, 0, this.updateTime, this);
        }
        this.challengeBtn.visible = !isDie;
        if (config.type == UserBoss.BOSS_SUBTYPE_QMBOSS) {
            this.challengeBtn.name = "publicChallenge";
        }
        else if (config.type == UserBoss.BOSS_SUBTYPE_SHENYU) {
            this.challengeBtn.name = "shenyuChallenge";
        }
        if (this.challengeBtn.visible) {
            var cdTime = (UserBoss.ins().cdTime - egret.getTimer()) / 1000;
            if (model.challengeing && cdTime > 0) {
                this.challengeBtn.enabled = false;
                this.challengeBtn.touchEnabled = false;
                this.updateCDTime();
                TimerManager.ins().doTimer(100, 0, this.updateCDTime, this);
            }
            else {
                this.challengeBtn.label = '挑战';
                this.challengeBtn.enabled = true;
                this.challengeBtn.touchEnabled = true;
                TimerManager.ins().remove(this.updateCDTime, this);
            }
        }
        this.barBg.visible = this.bar.visible = true;
        if (boss) {
            this.head.source = "monhead" + boss.head + "_png";
            var levelStr = void 0;
            if (config.samsaraLv > 0) {
                levelStr = config.showName;
            }
            else if (config.zsLevel > 0) {
                levelStr = config.zsLevel + "\u8F6C";
            }
            else {
                levelStr = config.level + "\u7EA7";
            }
            this.nameTxt0.text = levelStr;
            this.nameTxt.text = "" + boss.name;
        }
        this.needLv.visible = !canChallenge;
        this.challengeBtn.visible = this.challengeBtn.visible && canChallenge;
    };
    BossItem.prototype.updateCDTime = function () {
        var cdTime = (UserBoss.ins().cdTime - egret.getTimer()) / 1000;
        this.challengeBtn.label = "\u51B7\u5374\u4E2D\uFF08" + cdTime.toFixed(0) + "\uFF09";
        if (cdTime <= 0) {
            this.challengeBtn.label = '挑战';
            this.challengeBtn.enabled = true;
            this.challengeBtn.touchEnabled = true;
            TimerManager.ins().remove(this.updateCDTime, this);
        }
    };
    BossItem.prototype.updateTime = function () {
        var model = this.data;
        var time = model.relieveTime - egret.getTimer();
        this.timeTxt.text = DateUtils.getFormatBySecond(Math.floor(time / 1000), 1) + "\u540E\u91CD\u751F";
        if (time <= 0) {
            this.timeTxt.visible = false;
            UserBoss.ins().sendWorldBossInfo(UserBoss.BOSS_SUBTYPE_QMBOSS);
            TimerManager.ins().remove(this.updateTime, this);
        }
    };
    BossItem.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.boxBtn:
                WarnWin.show(this.config.rewardsDesc, null, this, null, null, "sure");
                break;
        }
    };
    BossItem.prototype.onRemove = function () {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        TimerManager.ins().removeAll(this);
    };
    return BossItem;
}(BaseItemRender));
__reflect(BossItem.prototype, "BossItem");
//# sourceMappingURL=BossItem.js.map