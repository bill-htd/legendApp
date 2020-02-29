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
var GameSceneView = (function (_super) {
    __extends(GameSceneView, _super);
    function GameSceneView() {
        var _this = _super.call(this) || this;
        _this.skillWordList = [];
        _this.mijingpassTime = 0;
        _this._shap = new egret.Shape();
        _this.gwStartTimes = 0;
        _this.leftTimeMj = 0;
        _this._miCurFloor = 0;
        _this.leftTime = 0;
        _this.isStartTime = false;
        _this.leftFlyExp = 0;
        _this.curAddExp = 0;
        _this.curExp = 0;
        return _this;
    }
    GameSceneView.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "GameFightSceneSkin";
        this.touchEnabled = false;
        this.map = new MapView;
        this.map.initMap();
        this.addChildAt(this.map, 0);
        this.pkBossBtn.touchEnabled = true;
        this.pkBossBtn.visible = false;
        this.input = new eui.TextInput;
        this.input.visible = false;
        this.input.text = "点我输入命令1645";
        this.input.y = 300;
        this.addChild(this.input);
        this.escBtn.visible = false;
        this.skillWordImg = new eui.Image();
        this.skillWordImg.x = 100;
        this.skillWordImg.visible = false;
        this.skillWordImg.touchEnabled = false;
        this.addChild(this.skillWordImg);
        this.leftTimePic = BitmapNumber.ins().createNumPic(0, "r0", 5);
        this.leftTimePic.x = 90;
        this.leftTimePic.y = 38;
        this.guildBossGroup.addChild(this.leftTimePic);
        this.GwRankGroup.addChild(this._shap);
        this._shap.rotation = -90;
        this._shap.x = 48;
        this._shap.y = 50;
        this.schedule.mask = this._shap;
        this.riseupBtn.visible = false;
    };
    GameSceneView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        this.observe(GameLogic.ins().postHookStateChange, this.upDataGuajiState);
        this.observe(GameLogic.ins().postHpChange, this.updateExpGroup);
        this.observe(UserSkill.ins().postShowSkillWord, this.showSkillWord);
        this.observe(UserFb.ins().postFbExpTotal, this.updateKill);
        this.observe(GameLogic.ins().postEnterMap, this.onEnterMap);
        this.observe(UserFb.ins().postFbTime, this.onSetTime);
        this.observe(GameLogic.ins().postViewOpen, this.onViewOpen);
        this.observe(GodWeaponCC.ins().postFubenInfo, this.updateMijingAdd);
        this.observe(Actor.ins().postExp, this.expChange);
        this.addTouchEvent(this.pkBossBtn, this.onTap);
        this.addTouchEvent(this.escBtn, this.onTap);
        this.addTouchEvent(this.riseup, this.onTap);
    };
    GameSceneView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.close.call(this, param);
        this.skillWordList = [];
        egret.Tween.removeTweens(this.skillWordImg);
        this.skillWordImg.visible = false;
        TimerManager.ins().remove(this.updateTime, this);
        TimerManager.ins().remove(this.updateMijingTime, this);
        this.mijingpassTime = 0;
    };
    GameSceneView.prototype.expChange = function (exp) {
        if (GameMap.fbType != UserFb.FB_TYPE_GUANQIABOSS &&
            GameMap.fbType != UserFb.FB_TYPE_TIAOZHAN || !exp)
            return;
        var role = EntityManager.ins().getNoDieRole();
        if (!role)
            return;
        var blood = new egret.DisplayObjectContainer();
        BitmapNumber.ins().changeNum(blood, 'j+' + exp, 'g3', 3.5, 0);
        blood.anchorOffsetX = blood.width / 2;
        blood.y = role.y - role.typeface - 30;
        blood.x = role.x;
        blood.scaleX = blood.scaleY = 1;
        this.map.addChild(blood);
        egret.Tween.get(blood).to({ y: blood.y - 80, scaleX: 2, scaleY: 2 }, 200).to({
            scaleX: 1.2,
            scaleY: 1.2
        }, 100).wait(1000).to({ alpha: 0, y: blood.y - 140 }, 1000).call(function () {
            DisplayUtils.removeFromParent(blood);
        });
    };
    GameSceneView.prototype.onViewOpen = function (tag) {
        if (tag == 1) {
            if (this.map.parent) {
                ViewManager.ins().open(GameBlackView);
                this.removeChild(this.map);
            }
        }
        else {
            if (!this.map.parent) {
                this.addChildAt(this.map, 0);
                ViewManager.ins().close(GameBlackView);
            }
        }
    };
    GameSceneView.prototype.onEnterMap = function () {
        TimerManager.ins().remove(this.updateTime, this);
        ViewManager.ins().close(GwMijingRiseUpView);
        TimerManager.ins().remove(this.updateMijingTime, this);
        this.mijingpassTime = 0;
        this.isStartTime = false;
        if (GameMap.fbType == UserFb.FB_TYPE_EXP) {
            this.curExp = 0;
            if (!this.expTxt) {
                this.expTxt = BitmapNumber.ins().createNumPic(0, 'r0', 5);
                this.expTxt.x = this.flyExpGroup.width / 2;
                this.expTxt.y = 65;
                this.flyExpGroup.addChild(this.expTxt);
            }
            this.updateKill();
            this.setExp(this.curExp);
            this.leftFlyExp = 0;
            this.totleExp.source = "chuangtianguan_json.fbljjy";
            this.killNumImg.source = "chuangtianguan_json.fbjsgw";
            this.flyExpGroup.visible = true;
            this.flyExpGroup1.visible = true;
        }
        else {
            this.flyExpGroup.visible = false;
            this.flyExpGroup1.visible = false;
        }
        this.guildBossGroup.visible = false;
        this.escBtn.visible = GameMap.fubenID &&
            GameMap.fbType != UserFb.FB_TYPE_GUANQIABOSS &&
            GameMap.fbType != UserFb.FB_TYPE_CITY &&
            GameMap.fbType != UserFb.FB_TYPE_FIRE_RING &&
            GameMap.fbType != UserFb.FB_TYPE_PEAK;
        if (UserSkill.ins().hejiLevel >= 0)
            this.checkHJState();
        if (GameMap.fbType == UserFb.FB_TYPE_MIJING) {
            this.GwRankGroup.visible = false;
            this.showMijing();
        }
        else {
            this.GwRankGroup.visible = false;
        }
        if (GameMap.fbType == UserFb.FB_TYPE_GUARD_WEAPON) {
            ViewManager.ins().open(GuardMainUI);
        }
        else {
            ViewManager.ins().close(GuardMainUI);
            ViewManager.ins().close(GuardCallBossWin);
        }
    };
    GameSceneView.prototype.checkHJState = function () {
        if (GameMap.autoPunch()) {
            ViewManager.ins().open(BtnHejiWin);
        }
        else {
            ViewManager.ins().close(BtnHejiWin);
        }
    };
    GameSceneView.prototype.updateMijingAdd = function () {
        if (GameMap.fbType == UserFb.FB_TYPE_MIJING) {
            var data = GodWeaponCC.ins().fubenInfoData;
            var list = data.listData;
            for (var i = 0; i < list.length; i++) {
                if (list[i].config.fbId == GameMap.fubenID) {
                    UserFb.ins().oldMijingPoint = list[i].curPoint;
                    break;
                }
            }
        }
    };
    GameSceneView.prototype.showMijing = function () {
        var config = GlobalConfig.GodWeaponBaseConfig;
        var curJoinFloor = 1;
        var confF;
        for (var key in GlobalConfig.GodWeaponFubenConfig) {
            if (GlobalConfig.GodWeaponFubenConfig[key].fbId == GameMap.fubenID) {
                curJoinFloor = parseInt(key);
                confF = GlobalConfig.GodWeaponFubenConfig[key];
                break;
            }
        }
        this._miCurFloor = curJoinFloor;
        var data = GodWeaponCC.ins().fubenInfoData;
        if (data) {
            var list = data.listData;
            for (var i = 0; i < list.length; i++) {
                if (list[i].config.fbId == GameMap.fubenID) {
                    UserFb.ins().oldMijingPoint = list[i].curPoint;
                    break;
                }
            }
        }
        else {
            GodWeaponCC.ins().requestFubenInfo();
        }
    };
    GameSceneView.prototype.removeMiingTimeFun = function () {
        TimerManager.ins().remove(this.updateMijingTime, this);
    };
    GameSceneView.prototype.updateMijingTime = function () {
        if (this.leftTimeMj <= 0) {
            ViewManager.ins().close(GwMijingRiseUpView);
            this.mijingpassTime = 0;
            UserFb.ins().sendExitFb();
            ViewManager.ins().open(GwResultView, GameMap.fubenID, 4);
            TimerManager.ins().remove(this.updateMijingTime, this);
            return;
        }
        else {
            var passNum = 360 - this.leftTimeMj;
            var maxNum = void 0;
            for (var i = 0; i < GlobalConfig.GodWeaponBaseConfig.fbGrade.length; i++) {
                if (passNum <= GlobalConfig.GodWeaponBaseConfig.fbGrade[i]) {
                    this.mijingpassTime = GlobalConfig.GodWeaponBaseConfig.fbGrade[i] - passNum;
                    maxNum = GodWeaponCC.ins().getPinfenTime(i);
                    UserFb.ins().mijingFingfen = i + 1;
                    UserFb.ins().mijingUseTime = passNum;
                    this.updateMijingTimeView(maxNum, i);
                    break;
                }
            }
            this.leftTimeMj = 360 - (Math.floor(new Date().getTime() / 1000) - this.gwStartTimes);
        }
    };
    GameSceneView.prototype.updateMijingTimeView = function (maxNum, mjIndex) {
        if (!this.GwRankGroup.visible) {
            this.GwRankGroup.visible = true;
            this.schedule.source = "godweapon_rankschedule";
            this.rankbg.source = "GodWeapon_rankball";
        }
        var angle = 360 * this.mijingpassTime / maxNum;
        if (angle == 360) {
            angle = 0;
        }
        else if (angle == 0) {
            angle = 360;
        }
        DisplayUtils.drawCir(this._shap, this.schedule.width / 2, 360 - angle, true);
        this.rank.source = "godweapon_rank" + (mjIndex + 1);
        this.time.text = DateUtils.getFormatBySecond(this.mijingpassTime, DateUtils.TIME_FORMAT_1);
        var str;
        str = GlobalConfig.GodWeaponBaseConfig.fbGrade[mjIndex] + "秒";
        var strP = "";
        switch (mjIndex + 1) {
            case 1:
                strP = "S";
                break;
            case 2:
                strP = "A";
                break;
            case 3:
                strP = "B";
                break;
            case 4:
                strP = "C";
                break;
        }
        this.requireTime.textFlow = (new egret.HtmlTextParser).parser(str + '<font color="#FFFFFF">内通关将保持</font>' + strP + '<font color="#FFFFFF">评价</font>');
        var floorConfig = GlobalConfig.GodWeaponFubenConfig[this._miCurFloor];
        if (floorConfig) {
            var obj = floorConfig.award[mjIndex + 1];
            if (obj) {
                this.rewardExp.text = "" + obj[0].count;
            }
            else {
                this.rewardExp.text = '';
            }
        }
        else {
            this.rewardExp.text = '';
        }
    };
    GameSceneView.prototype.setMJPingfen = function (point) {
        var sourStr = "godweapon_rank" + point;
        if (this.rank.source != sourStr) {
            this.rank.source = sourStr;
        }
    };
    GameSceneView.prototype.upDataGuajiState = function (value) {
        if (GameMap.fubenID != 0 && value == 1) {
            value = 0;
        }
        this.stateImg.source = value ? "zy_20" : "";
    };
    GameSceneView.prototype.onSetTime = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (GameMap.fbType == UserFb.FB_TYPE_GUILD_BOSS) {
            if (param && param[0]) {
                this.leftTime = param[0][1];
                this.leftTimeImg.source = "lastcount";
                this.guildBossGroup.visible = true;
                if (!this.isStartTime) {
                    TimerManager.ins().doTimer(1000, 0, this.updateTime, this);
                    this.isStartTime = true;
                    this.updateTime();
                }
            }
        }
        else if (GameMap.fbType == UserFb.FB_TYPE_MIJING) {
            if (param && param[0]) {
                this.leftTimeMj = param[0][1];
                if (this.leftTimeMj >= 2) {
                    this.leftTimeMj = this.leftTimeMj - 2;
                }
                this.gwStartTimes = Math.floor(new Date().getTime() / 1000) - (360 - this.leftTimeMj);
                TimerManager.ins().doTimer(1000, 0, this.updateMijingTime, this);
                this.updateMijingTime();
            }
        }
    };
    GameSceneView.prototype.updateTime = function () {
        if (this.leftTime < 0) {
            TimerManager.ins().remove(this.updateTime, this);
            this.isStartTime = false;
            this.guildBossGroup.visible = false;
            BitmapNumber.ins().changeNum(this.leftTimePic, 0, "r0", 5);
            UserFb.ins().sendExitFb();
            return;
        }
        BitmapNumber.ins().changeNum(this.leftTimePic, this.leftTime, "r0", 5);
        this.leftTime--;
    };
    GameSceneView.prototype.updateKill = function () {
        this.lbNum.textFlow = TextFlowMaker.generateTextFlow1("|C:0x35e62b&T:" + UserFb.ins().expMonterCountKill + "||C:0xF8B141&T:/" + UserFb.ins().fbExpTotal + "|");
    };
    GameSceneView.prototype.flyExp = function (point, exp) {
        var _this = this;
        var movieExp = new eui.Image();
        movieExp.source = "point2";
        movieExp.anchorOffsetX = 20;
        movieExp.anchorOffsetY = 20;
        movieExp.x = point.x;
        movieExp.y = point.y;
        this.addChild(movieExp);
        var _x = this.flyExpGroup.x + this.expTxt.x;
        var _y = this.flyExpGroup.y + this.expTxt.y + this.expTxt.height / 2;
        var t = egret.Tween.get(movieExp);
        t.to({ x: _x, y: _y, alpha: 0.5 }, 800).call(function () {
            _this.addExp(exp);
            _this.removeChild(movieExp);
            egret.Tween.removeTweens(movieExp);
        }, this);
        var tt = egret.Tween.get(movieExp, { "loop": true });
        tt.to({ "rotation": movieExp.rotation + 360 }, 800);
    };
    GameSceneView.prototype.rollExp = function () {
        var addExp = this.leftFlyExp > this.curAddExp ? this.curAddExp : this.leftFlyExp;
        this.leftFlyExp = this.leftFlyExp - addExp;
        this.curExp += addExp;
        this.setExp(this.curExp);
        if (this.leftFlyExp <= 0) {
            TimerManager.ins().remove(this.rollExp, this);
        }
    };
    GameSceneView.prototype.addExp = function (exp) {
        this.leftFlyExp += exp;
        this.curAddExp = Math.floor(this.leftFlyExp / 10);
        if (!TimerManager.ins().isExists(this.rollExp, this)) {
            TimerManager.ins().doTimer(30, 0, this.rollExp, this);
        }
    };
    GameSceneView.prototype.setExp = function (exp) {
        BitmapNumber.ins().changeNum(this.expTxt, exp, "r0", 5);
        this.expTxt.anchorOffsetX = this.expTxt.width / 2;
    };
    GameSceneView.prototype.updateExpGroup = function (_a) {
        var target = _a[0], value = _a[1];
        if (value > 0 || GameMap.fbType != UserFb.FB_TYPE_EXP)
            return;
        var configID = target.infoModel.configID;
        var config = GlobalConfig.ExpFbMonsterConfig[configID];
        if (!config)
            return;
        var parent = target.parent;
        if (!parent) {
            var role = EntityManager.ins().getNoDieRole();
            if (role)
                parent = role.parent;
        }
        if (parent) {
            var discount = GlobalConfig.MonthCardConfig.expFubenPrecent / 100;
            var addValue = Recharge.ins().getIsForeve() ? 1 + discount : 1;
            var point = parent.localToGlobal(target.x, target.y);
            this.flyExp(point, Math.ceil(config.exp * addValue));
        }
        this.updateKill();
    };
    GameSceneView.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.pkBossBtn:
                break;
            case this.escBtn:
                if (GameMap.fbType == UserFb.FB_TYPE_GUARD_WEAPON) {
                    ViewManager.ins().open(GuardQuitTips);
                    return;
                }
                if (MineFight.ins().isFighting) {
                    UserTips.ins().showTips("\u63A0\u593A\u77FF\u4E2D\u4E0D\u53EF\u4EE5\u9000\u51FA");
                    return;
                }
                if (GameMap.fbType == UserFb.FB_TYPE_GUANQIABOSS)
                    PlayFun.ins().closeAuto();
                if (ZsBoss.ins().isZsBossFb(GameMap.fubenID))
                    UserBoss.ins().ShowTip = true;
                if (GuildWar.ins().getModel().checkinAppoint()) {
                    ViewManager.ins().open(GuileWarReliveWin, 3);
                    return;
                }
                if (BattleCC.ins().isBattle()) {
                    WarnWin.show("\u662F\u5426\u9000\u51FA\u9635\u8425\u526F\u672C\uFF0C\u9000\u51FA\u540E\u670930\u79D2\u8FDB\u5165CD", function () {
                        UserFb.ins().sendExitFb();
                    }, this);
                    return;
                }
                if (PaoDianCC.ins().isPaoDian) {
                    WarnWin.show("\u662F\u5426\u786E\u5B9A\u9000\u51FA\u6FC0\u60C5\u6CE1\u70B9\uFF1F\u9000\u51FA\u540E\u5C06\u635F\u5931\u5927\u91CF\u7ECF\u9A8C\u3001\u5A01\u671B\u5956\u52B1\u4E14\u670930\u79D2\u8FDB\u5165CD", function () {
                        UserFb.ins().sendExitFb();
                    }, this);
                    return;
                }
                if (KfArenaSys.ins().isKFArena) {
                    WarnWin.show("\u6218\u573A\u672A\u7ED3\u675F\uFF0C\u9000\u51FA\u5C06\u6263\u9664\u5927\u91CF\u7ADE\u6280\u573A\u79EF\u5206\uFF0C\u662F\u5426\u9000\u51FA\uFF1F", function () {
                        UserFb.ins().sendExitFb();
                    }, this);
                    return;
                }
                UserFb.ins().sendExitFb();
                TimerManager.ins().remove(this.updateMijingTime, this);
                this.mijingpassTime = 0;
                break;
            case this.riseup:
                ViewManager.ins().open(GwMijingRiseUpView);
                break;
        }
    };
    GameSceneView.prototype.showSkillWord = function (img) {
        if (!img)
            return;
        egret.Tween.removeTweens(this.skillWordImg);
        var t = egret.Tween.get(this.skillWordImg);
        this.skillWordImg.source = null;
        this.skillWordImg.source = img;
        this.skillWordImg.visible = true;
        this.skillWordImg.scaleX = 3;
        this.skillWordImg.scaleY = 3;
        this.skillWordImg.alpha = 1;
        this.skillWordImg.y = 250;
        t.to({ y: 250, scaleX: 1, scaleY: 1 }, 200).wait(600).to({ alpha: 0 }, 350);
    };
    GameSceneView.prototype.destoryView = function () {
    };
    return GameSceneView;
}(BaseEuiView));
__reflect(GameSceneView.prototype, "GameSceneView");
ViewManager.ins().reg(GameSceneView, LayerManager.Game_Bg);
//# sourceMappingURL=GameSceneView.js.map