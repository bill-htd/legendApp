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
var BossBloodPanel = (function (_super) {
    __extends(BossBloodPanel, _super);
    function BossBloodPanel() {
        var _this = _super.call(this) || this;
        _this._curMonsterID = 0;
        _this.curValue = 1;
        return _this;
    }
    BossBloodPanel.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "BossBloodSkin";
        this.bloodBar.slideDuration = 0;
        this.grayImg.source = "bosshp2";
        this.grayImgMask = new egret.Rectangle(0, 0, this.grayImg.width, this.grayImg.height);
        this.grayImg.mask = this.grayImgMask;
        BossBloodPanel.GRAYIMG_WIDTH = this.grayImg.width;
        this.see.visible = false;
        this.hudunbloodBar.value = 100;
        this.hudunbloodBar.maximum = 100;
        this.observe(CityCC.ins().postHudunPoint, this.delayHuDunChange);
        this.observe(ZsBoss.ins().postHudunPoint, this.delayHuDunChange);
        this.observe(UserBoss.ins().postShieldPer, this.delayHuDunChange);
        this.addTouchEvent(this.seeRewardBtn, this.onTap);
        this.addChangeEvent(this.clearRole, this.autoClearChange);
        this.addTouchEvent(this.clearBtn, this.onTap);
        this.addTouchEvent(this.tipBtn0, this.onTap);
    };
    BossBloodPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.myTxt.text = "\u81EA\u5DF1\uFF1A";
        this.dropDown.setEnabled(false);
        this.hudun.visible = false;
        this.tipBtn0.visible = this.checkShowSeeAwardBtn();
        var dataArr = UserBoss.ins().rank.concat();
        var len = dataArr.length;
        if (len) {
            if (len > 10) {
                len = 10;
            }
            var showArr = dataArr.slice(1, len);
            this.dropDown.setData(showArr);
            this.dropDown.setLabel(dataArr[0].name);
        }
        else {
            this.dropDown.setData([]);
            this.dropDown.setLabel('');
        }
        len = dataArr.length;
        var id = Actor.actorID;
        for (var i = 0; i < len; i++) {
            if (dataArr[i].id == id) {
                this.myTxt.text = "\u81EA\u5DF1:" + CommonUtils.overLength(dataArr[i].value);
                break;
            }
        }
        this.huDunChange();
        this.clearRole.selected = ZsBoss.ins().clearOther;
        this.checkIsShowFbInfo();
        this.showCurRewards();
        var config = GlobalConfig.MonstersConfig[UserBoss.ins().monsterID];
        if (config) {
            this.updateBaseInfo();
            this.guildFBInfo(config);
        }
    };
    BossBloodPanel.prototype.checkShowSeeAwardBtn = function () {
        return CityCC.ins().isCity || GwBoss.ins().isGwBoss || GwBoss.ins().isGwTopBoss || KFBossSys.ins().isKFBossBattle
            || GameMap.fbType == UserFb.FB_TYPE_HIDE_BOSS || DarkMjBoss.ins().isDarkBoss || DevildomSys.ins().isDevildomBattle;
    };
    BossBloodPanel.prototype.updateBaseInfo = function () {
        if (this._curMonsterID == UserBoss.ins().monsterID)
            return;
        this._curMonsterID = UserBoss.ins().monsterID;
        var config = GlobalConfig.MonstersConfig[UserBoss.ins().monsterID];
        var layer;
        if (GameMap.fbType == UserFb.FB_TYPE_TIAOZHAN) {
            if (SkyLevelModel.ins().cruLevel)
                layer = GlobalConfig.FbChallengeConfig[SkyLevelModel.ins().cruLevel].layer;
        }
        var head = layer && GameMap.fbType != UserFb.FB_TYPE_HUN_SHOU ? layer + "\u5C42\u5B88\u5C06\u00B7" : "";
        if (GameMap.fbType == UserFb.FB_TYPE_GUIDEBOSS) {
            var tf = TextFlowMaker.generateTextFlow1(config.name);
            var tfName = tf[tf.length - 1].text;
            this.nameTxt.text = "" + head + tfName + "(" + config.level + "\u7EA7)";
        }
        else {
            this.nameTxt.text = "" + head + config.name + "(" + config.level + "\u7EA7)";
        }
        this.head.source = "monhead" + config.head + "_png";
        if (GameMap.fbType == UserFb.FB_TYPE_KF_BOSS || GameMap.fbType == UserFb.FB_TYPE_HIDE_BOSS)
            UserBoss.ins().currBossConfigID = UserBoss.ins().monsterID;
    };
    BossBloodPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.seeRewardBtn, this.onTap);
        this.clearRole.removeEventListener(egret.Event.CHANGE, this.autoClearChange, this);
        this.removeTouchEvent(this.clearBtn, this.onTap);
        this.closeShowInfoPanel();
        this.removeObserve();
        this._curMonsterID = 0;
        if (this.grayImgMask)
            egret.Tween.removeTweens(this.grayImgMask);
    };
    BossBloodPanel.prototype.guildFBInfo = function (config) {
        var charm = EntityManager.ins().getEntityByHandle(UserBoss.ins().bossHandler);
        var monstermodel = charm ? charm.infoModel : null;
        if (GuildWar.ins().getModel().checkinAppoint(1)) {
            var time_1 = GuildWar.ins().getModel().doorEndtime;
            this.bloodBar.value = time_1;
            this.bloodBar.maximum = 120;
            this.barGroup.y = 101;
            if (time_1 <= 0) {
                this.visible = false;
            }
            else {
                this.visible = true;
            }
            this.bloodBar.labelFunction = function () {
                return Math.floor(time_1 * 100 / 120) + "%";
            };
            this.curValue = Math.floor(this.bloodBar.value / 120 * 100);
            this.tweenBlood();
        }
        else {
            this.myTxt.visible = this.dropDown.visible = UserBoss.ins().publicBossIdDic.lastIndexOf(config.id) >= 0;
            this.bloodBar.value = UserBoss.ins().hp == undefined ? config.hp : UserBoss.ins().hp;
            this.bloodBar.maximum = config.hp;
            this.barGroup.y = 20;
            this.visible = (this.bloodBar.value > 0);
            this.curValue = Math.floor(this.bloodBar.value / config.hp * 100);
            this.tweenBlood();
        }
    };
    BossBloodPanel.prototype.tweenBlood = function () {
        var _this = this;
        var bloodPer = (this.curValue * BossBloodPanel.GRAYIMG_WIDTH) / 100;
        var self = this;
        egret.Tween.removeTweens(this.grayImgMask);
        if (bloodPer < 3)
            return;
        var t = egret.Tween.get(this.grayImgMask, {
            onChange: function () {
                if (self.grayImg)
                    self.grayImg.mask = _this.grayImgMask;
            }
        }, self);
        t.to({ "width": bloodPer - 3 }, 1000).call(function () {
            if (bloodPer <= 0) {
                self.grayImgMask.width = 0;
                egret.Tween.removeTweens(this.grayImgMask);
            }
        }, self);
    };
    BossBloodPanel.prototype.autoClearChange = function (e) {
        if (ZsBoss.ins().canChange) {
            ZsBoss.ins().clearOther = this.clearRole.selected;
            this.clearSelect = this.clearRole.selected;
            EntityManager.ins().hideOtherEntity(this.clearSelect);
        }
        else {
            this.clearRole.selected = this.clearSelect;
            UserTips.ins().showTips("操作过于频繁，稍后再试");
        }
    };
    BossBloodPanel.prototype.delayHuDunChange = function () {
        if (!TimerManager.ins().isExists(this.huDunChange, this))
            TimerManager.ins().doTimer(60, 1, this.huDunChange, this);
    };
    BossBloodPanel.prototype.huDunChange = function () {
        this.proLab.visible = true;
        if (ZsBoss.ins().isZsBossFb(GameMap.fubenID) || GuildWar.ins().getModel().checkinAppoint(1)) {
            if (ZsBoss.ins().hudun && ZsBoss.ins().hudun > 0) {
                this.hudun.visible = true;
                this.hudunbloodBar.value = ZsBoss.ins().hudun;
            }
            else {
                this.hudun.visible = false;
            }
        }
        else if (CityCC.ins().isCity) {
            this.proLab.visible = false;
            if (CityCC.ins().hudun && CityCC.ins().hudun > 0) {
                this.hudun.visible = true;
                this.hudunbloodBar.value = CityCC.ins().hudun;
                this.hudunbloodBar.maximum = CityCC.ins().huDunMax;
            }
            else {
                this.hudun.visible = false;
            }
        }
        else if (GwBoss.ins().isGwBoss || GwBoss.ins().isGwTopBoss || DarkMjBoss.ins().isDarkBoss) {
            this.proLab.visible = false;
            if (UserBoss.ins().shieldType) {
                if (UserBoss.ins().curShield > 0) {
                    this.hudun.visible = true;
                    if (!TimerManager.ins().isExists(this.setTimeShieldChange, this)) {
                        TimerManager.ins().doTimer(1000, 0, this.setTimeShieldChange, this);
                        this.setTimeShieldChange();
                    }
                }
            }
            else {
                this.setHpShieldChange();
            }
        }
        else {
            this.hudun.visible = false;
        }
    };
    BossBloodPanel.prototype.setHpShieldChange = function () {
        if (UserBoss.ins().curShield && UserBoss.ins().curShield > 0) {
            this.hudun.visible = true;
            var value = Math.ceil(UserBoss.ins().curShield / UserBoss.ins().totalShield * 100);
            this.hudunbloodBar.value = value;
        }
        else {
            this.hudun.visible = false;
        }
    };
    BossBloodPanel.prototype.setTimeShieldChange = function () {
        this.hudunbloodBar.value = UserBoss.ins().curShield;
        this.hudunbloodBar.maximum = UserBoss.ins().totalShield;
        if (UserBoss.ins().curShield > 0) {
            this.hudun.visible = true;
        }
        else {
            TimerManager.ins().remove(this.setTimeShieldChange, this);
            this.hudun.visible = false;
        }
        UserBoss.ins().curShield--;
    };
    BossBloodPanel.prototype.overTime = function () {
        this.cd.visible = false;
        ViewManager.ins().close(ZSBossCDWin);
    };
    BossBloodPanel.prototype.refushLabel = function () {
        this.remainM--;
        this.timeLable.text = "复活倒数：" + this.remainM + "秒";
    };
    BossBloodPanel.prototype.onTap = function (e) {
        switch (e.target) {
            case this.tipBtn0:
                if (CityCC.ins().isCity) {
                    ViewManager.ins().open(CityBossJiangliTipsWin);
                }
                else if (GameMap.fbType == UserFb.FB_TYPE_GUARD_WEAPON) {
                    ViewManager.ins().open(GuardRewardWin);
                }
                else if (DevildomSys.ins().isDevildomBattle) {
                    ViewManager.ins().open(DevildomBossAwardWin);
                }
                else {
                    ViewManager.ins().open(PublicBossJiangliTipWin);
                }
                break;
            case this.seeRewardBtn:
                ViewManager.ins().open(ZsBossRewardShowWin);
                break;
            case this.clearBtn:
                if (UserBoss.ins().checkWorldBossMoney()) {
                    ViewManager.ins().open(ZSBossCDWin, this.autoClear.selected);
                }
                else {
                    UserTips.ins().showTips("元宝不足");
                }
                break;
        }
    };
    BossBloodPanel.prototype.checkIsShowFbInfo = function () {
        switch (GameMap.fbType) {
            case UserFb.FB_TYPE_TIAOZHAN:
            case UserFb.FB_TYPE_HUN_SHOU:
                ViewManager.ins().open(ChallengeInfoPanel);
                break;
        }
    };
    BossBloodPanel.prototype.closeShowInfoPanel = function () {
        if (ViewManager.ins().isShow(ChallengeInfoPanel)) {
            ViewManager.ins().close(ChallengeInfoPanel);
        }
    };
    BossBloodPanel.prototype.showCurRewards = function () {
        if (GameMap.fbType != UserFb.FB_TYPE_TIAOZHAN && GameMap.fbType != UserFb.FB_TYPE_HUN_SHOU) {
            this.currewards.visible = false;
            return;
        }
        this.currewards.visible = true;
        var rdatas = { rewards: [] };
        if (GameMap.fbType == UserFb.FB_TYPE_HUN_SHOU) {
            var id = Hungu.ins().hunShouFBPassID >= Object.keys(GlobalConfig.FsFbConfig).length ? Hungu.ins().hunShouFBPassID : Hungu.ins().hunShouFBPassID + 1;
            var cfg = GlobalConfig.FsFbConfig[id];
            rdatas.rewards = cfg.award;
        }
        else {
            var model = SkyLevelModel.ins();
            var info = GlobalConfig.FbChallengeConfig[model.cruLevel];
            if (info) {
                rdatas.rewards = info.clearReward;
            }
        }
        this.currewards.data = rdatas;
    };
    BossBloodPanel.GRAYIMG_WIDTH = 0;
    return BossBloodPanel;
}(BaseEuiView));
__reflect(BossBloodPanel.prototype, "BossBloodPanel");
ViewManager.ins().reg(BossBloodPanel, LayerManager.Game_Main);
//# sourceMappingURL=BossBloodPanel.js.map