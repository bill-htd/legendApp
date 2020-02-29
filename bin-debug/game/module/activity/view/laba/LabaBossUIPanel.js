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
var LabaBossUIPanel = (function (_super) {
    __extends(LabaBossUIPanel, _super);
    function LabaBossUIPanel() {
        var _this = _super.call(this) || this;
        _this._curMonsterID = 0;
        _this.curValue = 1;
        _this.skinName = "LaBaBossBattleUiSkin";
        return _this;
    }
    LabaBossUIPanel.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.bloodBar.slideDuration = 0;
        this.grayImg.visible = false;
        this.already = false;
        this.bossHurt = false;
    };
    LabaBossUIPanel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.otherRank.itemRenderer = LaBaBossPlayerItemRender;
        this.rankArrayCollection = new eui.ArrayCollection();
        this.otherRank.dataProvider = this.rankArrayCollection;
        this.meRank.itemRenderer = LaBaBossPlayerItemRender;
        this.myrankArrayCollection = new eui.ArrayCollection();
        this.meRank.dataProvider = this.myrankArrayCollection;
    };
    LabaBossUIPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        TimerManager.ins().remove(this.calcTime, this);
        TimerManager.ins().remove(this.updateLogic, this);
        this.removeObserve();
        this._curMonsterID = 0;
        ViewManager.ins().close(this);
    };
    LabaBossUIPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.observe(UserBoss.ins().postHpChange, this.updateInfo);
        this.addTouchEvent(this.rankReward, this.onTap);
        this.updateData();
        if (!this.activity || !this.activity.go2BossFb()) {
            ViewManager.ins().close(this);
            UserFb.ins().sendExitFb();
            return;
        }
        this.init();
    };
    LabaBossUIPanel.prototype.init = function () {
        this.timer = this.activity.getResidueTimer();
        this.readyTimer = this.activity.getResidueStartTimer();
        this.already = this.activity.checkRedPoint();
        this.TimerChange();
    };
    LabaBossUIPanel.prototype.updateData = function () {
        this.activity = Activity.ins().checkLabaBossData();
    };
    LabaBossUIPanel.prototype.updateLogic = function () {
        if (this.already)
            this.updateFb();
        else
            this.updateReady();
        this.refreshBg.visible = this.refreshHints.visible = this.refreshTime.visible = !this.already;
        this.bossBloodGroup.visible = this.already;
    };
    LabaBossUIPanel.prototype.updateReady = function () {
        if (this.readyTimer) {
            this.refreshTime.text = this.readyTimer + "秒";
        }
        else {
            this.refreshTime.text = "刷新中";
        }
        if (!this.bossHurt) {
            this.already = false;
        }
        else {
            this.timer = this.activity.getResidueTimer();
            this.already = true;
        }
    };
    LabaBossUIPanel.prototype.updateFb = function () {
        this.updateBaseInfo();
        var config = GlobalConfig.ActivityType20Config[this.activity.id][this.activity.index];
        var percent = this.timer / config.duration;
        percent = percent >= 1 ? 1 : percent;
        this.bloodBar.value = percent * 100;
        this.bloodBar.maximum = 100;
        var percentLabel = (percent * 100).toFixed(1);
        this.bloodBar.labelFunction = function () {
            return percentLabel + "%";
        };
        this.updateHurtRank();
    };
    LabaBossUIPanel.prototype.updateHurtRank = function () {
        var rankData = [];
        var myData = [];
        for (var i = 0; i < UserBoss.ins().rank.length; i++) {
            var rankitemdata = UserBoss.ins().rank[i];
            var rd = {
                rank: rankitemdata.rank,
                name: rankitemdata.roleName,
                damage: rankitemdata.value
            };
            if (i < 5) {
                rankData.push(rd);
            }
            if (rankitemdata.id == Actor.actorID) {
                myData.push(rd);
            }
            if (rankData.length == 5 && !myData.length)
                break;
        }
        if (!myData.length) {
            var rd = {
                rank: 0,
                name: Actor.myName,
                damage: 0
            };
            myData.push(rd);
        }
        this.rankArrayCollection.replaceAll(rankData);
        this.myrankArrayCollection.replaceAll(myData);
    };
    LabaBossUIPanel.prototype.updateBaseInfo = function () {
        if (this._curMonsterID == UserBoss.ins().monsterID)
            return;
        this._curMonsterID = UserBoss.ins().monsterID;
        var config = GlobalConfig.MonstersConfig[UserBoss.ins().monsterID];
        if (!config)
            return;
        this.head.source = "monhead" + config.head + "_png";
        this.lvTxt.text = "Lv." + config.level;
        this.nameTxt.text = config.name;
    };
    LabaBossUIPanel.prototype.tweenBlood = function () {
        var _this = this;
        var bloodPer = (this.curValue * LabaBossUIPanel.GRAYIMG_WIDTH) / 100;
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
    LabaBossUIPanel.prototype.TimerChange = function () {
        if (!TimerManager.ins().isExists(this.calcTime, this))
            TimerManager.ins().doTimer(1000, 0, this.calcTime, this);
        if (!TimerManager.ins().isExists(this.updateLogic, this))
            TimerManager.ins().doTimer(60, 0, this.updateLogic, this);
    };
    LabaBossUIPanel.prototype.calcTime = function () {
        if (this.timer > 0)
            this.timer--;
        else {
            this.timer = 0;
        }
        if (this.bossHurt)
            this.readyTimer = 0;
        else {
            if (this.readyTimer > 0)
                this.readyTimer--;
        }
    };
    LabaBossUIPanel.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.rankReward:
                ViewManager.ins().open(LabaRewardTips, this.activity);
                break;
        }
    };
    LabaBossUIPanel.prototype.updateReliveTime = function () {
        if (UserBoss.ins().reliveTime > 0) {
            ViewManager.ins().open(WorldBossBeKillWin);
        }
        else {
            ViewManager.ins().close(WorldBossBeKillWin);
        }
    };
    LabaBossUIPanel.prototype.updateInfo = function () {
        this.bossHurt = true;
    };
    LabaBossUIPanel.GRAYIMG_WIDTH = 0;
    return LabaBossUIPanel;
}(BaseEuiView));
__reflect(LabaBossUIPanel.prototype, "LabaBossUIPanel");
ViewManager.ins().reg(LabaBossUIPanel, LayerManager.Game_Main);
//# sourceMappingURL=LabaBossUIPanel.js.map