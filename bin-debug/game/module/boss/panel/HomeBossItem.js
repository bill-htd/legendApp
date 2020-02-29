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
var HomeBossItem = (function (_super) {
    __extends(HomeBossItem, _super);
    function HomeBossItem() {
        return _super.call(this) || this;
    }
    HomeBossItem.prototype.dataChanged = function () {
        var limitStr = '';
        var color = '';
        var canChallenge;
        var boss;
        var model = this.data;
        var config = GlobalConfig.WorldBossConfig[model.id];
        this.list.itemRenderer = ItemBase;
        this.config = config;
        this.list.dataProvider = new eui.ArrayCollection(config.showReward);
        var isDie = model.bossState == 2;
        this.boxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
        this.infoTxt0.touchEnabled = true;
        var levelConfig;
        for (var k in GlobalConfig.BossHomeConfig) {
            if (GlobalConfig.BossHomeConfig[k].boss.lastIndexOf(model.id) != -1) {
                levelConfig = GlobalConfig.BossHomeConfig[k];
                break;
            }
        }
        if (UserVip.ins().lv >= levelConfig.vip) {
            if (config.zsLevel > 0) {
                canChallenge = UserZs.ins().lv >= config.zsLevel;
                color = canChallenge ? "23CA23" : "f15a25";
                limitStr = config.zsLevel + "\u8F6C\u5F00\u542F";
            }
            else {
                canChallenge = Actor.level >= config.level;
                color = canChallenge ? "23CA23" : "f15a25";
                limitStr = config.level + "\u7EA7\u5F00\u542F";
            }
        }
        else {
            canChallenge = false;
            color = canChallenge ? "23CA23" : "f15a25";
            limitStr = "VIP" + levelConfig.vip + "\u5F00\u653E";
        }
        if (isDie)
            limitStr = "已击杀";
        this.levelRequire.text = limitStr;
        this.bar.value = model.hp;
        this.bar.maximum = 100;
        boss = GlobalConfig.MonstersConfig[config.bossId];
        this.challengeBtn.visible = !isDie;
        this.challengeBtn.name = "homeChallenge";
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
            var levelStr = config.zsLevel > 0 ? config.zsLevel + "\u8F6C" : config.level + "\u7EA7";
            this.nameTxt0.text = levelStr;
            this.nameTxt.text = "" + boss.name;
        }
        this.challengeBtn.visible = this.challengeBtn.visible && canChallenge;
        this.needLv.visible = !this.challengeBtn.visible;
    };
    HomeBossItem.prototype.updateCDTime = function () {
        var cdTime = (UserBoss.ins().cdTime - egret.getTimer()) / 1000;
        this.challengeBtn.label = "\u51B7\u5374\u4E2D\uFF08" + cdTime.toFixed(0) + "\uFF09";
        if (cdTime <= 0) {
            this.challengeBtn.label = '挑战';
            this.challengeBtn.enabled = true;
            this.challengeBtn.touchEnabled = true;
            TimerManager.ins().remove(this.updateCDTime, this);
        }
    };
    HomeBossItem.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.boxBtn:
                WarnWin.show(this.config.rewardsDesc, null, this, null, null, "sure");
                break;
        }
    };
    return HomeBossItem;
}(BaseItemRender));
__reflect(HomeBossItem.prototype, "HomeBossItem");
//# sourceMappingURL=HomeBossItem.js.map