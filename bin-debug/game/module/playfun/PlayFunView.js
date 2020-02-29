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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PlayFunView = (function (_super) {
    __extends(PlayFunView, _super);
    function PlayFunView() {
        var _this = _super.call(this) || this;
        _this.ruleList = {};
        _this.ruleParent = {};
        _this.ruleIdList = {};
        _this.ruleEff = {};
        _this.taskEffTypes = [];
        _this.preRecharge = false;
        _this.preVip = false;
        _this.lastEnergy = -1;
        _this.touchEnabled = false;
        return _this;
    }
    PlayFunView.prototype.destoryView = function () {
    };
    PlayFunView.prototype.initData = function () {
        CommonUtils.labelIsOverLenght(this.goldTxt, Actor.gold);
        CommonUtils.labelIsOverLenght(this.ybTxt, Actor.yb);
        this.nameTxt.text = Actor.myName;
        this.expChange();
        BitmapNumber.ins().changeNum(this.power, Actor.power, "8", 5);
        this.vipNum.x = UserVip.ins().lv >= 10 ? this.vipImg0.x + this.vipImg0.width + 5 : this.vipNum.x = this.vipImg0.x + this.vipImg0.width + 10;
        BitmapNumber.ins().changeNum(this.vipNum, UserVip.ins().lv, "zv0", 8);
        this.upDataVipBtnRedPoint();
    };
    PlayFunView.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "PlayFunSkin";
        this.showViewList = {};
        this.showViewList[PlayFunShow.topMain] = this.topMain;
        this.showViewList[PlayFunShow.leftGroup] = this.leftGroup;
        this.showViewList[PlayFunShow.rightGroup] = this.rightGroup;
        this.showViewList[PlayFunShow.downGroup] = this.downGroup;
        this.showViewList[PlayFunShow.topGroup] = this.topGroup;
        this.rulePos = {
            0: this.downGroup,
            1: this.iconGroup,
            2: this.leftGroup,
            3: this.rightGroup
        };
        this.flameMC = new MovieClip();
        this.flameMC.x = 72;
        this.flameMC.y = 21;
        this.flameGroup.addChildAt(this.flameMC, 0);
        this.power = BitmapNumber.ins().createNumPic(0, "8", 5);
        this.power.scaleX = this.power.scaleY = 0.8;
        this.power.x = this.fightImg.x + 53;
        this.power.y = this.fightImg.y + 4;
        this.flameGroup.addChild(this.power);
        this.guanQicMc = new MovieClip();
        this.guanQicMc.touchEnabled = false;
        this.expBallMc = new MovieClip;
        this.expBallMc.x = 80;
        this.expBallMc.y = 86;
        this.expBallMc.touchEnabled = false;
        this.guanQiaLineMc = new MovieClip();
        this.guanQiaLineMc.x = 83;
        this.guanQiaLineMc.y = 107;
        this.guanQiaLineMc.touchEnabled = false;
        this.taskAsseptMc = new MovieClip();
        this.taskAsseptMc.x = 140;
        this.taskAsseptMc.y = -50;
        this.taskAsseptMc.touchEnabled = false;
        this.taskComMc = new MovieClip();
        this.taskComMc.x = 140;
        this.taskComMc.y = -80;
        this.taskComMc.touchEnabled = false;
        var roleData = SubRoles.ins().getSubRoleByIndex(0);
        this.face.source = "yuanhead" + roleData.job + roleData.sex;
        this.vipNum = BitmapNumber.ins().createNumPic(UserVip.ins().lv, "zv0", 8);
        this.vipNum.x = UserVip.ins().lv >= 10 ? this.vipImg0.x + this.vipImg0.width + 5 : this.vipNum.x = this.vipImg0.x + this.vipImg0.width + 10;
        this.vipNum.y = this.vipImg0.y;
        this.vipGroup.addChild(this.vipNum);
        this.guanqiaBar.slideDuration = 0;
        this.publicBossRelive(false);
        RuleIconBase.update = this.updateRule.bind(this);
        RuleIconBase.updateShow = this.updateRuleAndSort.bind(this);
        this.initRuleList();
    };
    PlayFunView.prototype.initRuleList = function () {
        var configs = GlobalConfig.PlayFunConfig;
        for (var id in configs) {
            var config = configs[id];
            var cls = egret.getDefinitionByName(config.cls);
            if (!cls) {
                alert("\u529F\u80FD\u5165\u53E3\u914D\u7F6E\u9519\u8BEF\uFF0Cid:" + id + " cls:" + config.cls);
            }
            else {
                this.addRuleList(new cls(config.id));
            }
        }
        this.groupGuanqia.touchEnabled = false;
        this.addRuleList(new GuangqiaIconRule(0, this.groupGuanqia));
        this.addRuleList(new TaskTraceIconRule(0, this.taskTraceBtn));
        this.hejiRule = new HejiIconRule(0, this.hejiguide);
        this.addRuleList(this.hejiRule);
    };
    PlayFunView.prototype.addRuleList = function (rule) {
        this.ruleList[rule.hashCode] = rule;
        if (rule.id) {
            this.ruleIdList[rule.id] = rule;
        }
        if (rule.tar && rule.tar.parent) {
            this.ruleParent[rule.hashCode] = rule.tar.parent;
            rule.tar.parent.removeChild(rule.tar);
        }
        else {
            var config = GlobalConfig.PlayFunConfig[rule.id];
            this.ruleParent[rule.hashCode] = this.rulePos[config.pos];
        }
    };
    PlayFunView.prototype.showViews = function (_a) {
        var handle = _a[0], reverse = _a[1];
        var value = 1;
        while (PlayFunShow[value]) {
            var b = (handle & value) == value;
            this.showView(value, reverse ? !b : b);
            value *= 2;
        }
    };
    PlayFunView.prototype.showView = function (handle, b) {
        this.showViewList[handle].visible = b;
    };
    PlayFunView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.btn_toolbar, this.onTap);
        this.addTouchEvent(this.autoPkBoss, this.onChange);
        this.addTouchEvent(this.vipBtn0, this.onTap);
        this.addTouchEvent(this.taskTraceBtn, this.onTaskTrace);
        this.addTouchEvent(this.guanqiaBtn, this.onTaskTrace);
        this.addTouchEvent(this.guanqiaBtn, this.guanqiaBtnClick);
        this.addTouchEvent(this.face, this.onTap);
        this.addTouchEvent(this.expGroup, this.onTap);
        this.addTouchEvent(this.mapName0, this.onTap);
        this.observe(GameLogic.ins().postEnterMap, this.upDataGuanqia);
        this.observe(UserFb.ins().postGuanqiaInfo, this.upDataGuanQiaInfo);
        this.observe(UserTask.ins().postUpdteTaskTrace, this.changeTaskTrace);
        this.observe(UserTask.ins().postUpdteTaskTrace, this.updateTaskState);
        this.observe(UserFb.ins().postGuanKaIdChange, this.guanqiaChange);
        this.observe(GameLogic.ins().postSubRoleChange, this.initData);
        this.observe(Actor.ins().postGoldChange, this.initData);
        this.observe(Actor.ins().postYbChange, this.initData);
        this.observe(Actor.ins().postNameChange, this.initData);
        this.observe(Actor.ins().postPowerChange, this.initData);
        this.observe(GameLogic.ins().postExpMc, this.addExpFlyMc);
        this.observe(UserFb.ins().postAddEnergy, this.upDataGuanqia);
        this.observe(UserFb.ins().postPlayWarm, this.warmWord);
        this.observe(UserVip.ins().postUpdateVipData, this.initData);
        this.observe(UserVip.ins().postUpdataExp, this.upDataVipBtnRedPoint);
        this.observe(UserVip.ins().postUpdateVipAwards, this.upDataVipBtnRedPoint);
        this.observe(UserVip.ins().postUpdateWeekAwards, this.upDataVipBtnRedPoint);
        this.observe(Actor.ins().postLevelChange, this.updateHeadRedPoint);
        this.observe(GameLogic.ins().postLevelBarChange, this.updateLevelBar);
        this.observe(Actor.ins().postExp, this.checkGuide);
        this.observe(PlayFun.ins().postShowViews, this.showViews);
        this.observe(UserFb.ins().postTeamFbFlowarRecords, this.updateFlower);
        this.observe(UserFb.ins().postAutoPk, this.GuanQiaEffLogic);
        this.observe(UserFb.ins().postAutoPk2, this.GuanQiaEffLogic);
        this.addTouchEvent(this.recharge1, this.onTap);
        this.addTouchEvent(this.recharge2, this.onTap);
        this.initData();
        this.upDataGuanQiaInfo();
        this.changeTaskTrace();
        this.addRuleEvent();
        this.updateRules();
        this.upDataWillBoss(Encounter.ins().willBossID);
        this.updateHeadRedPoint();
        HBSystem.ins().updateHongBao();
        this.flameMC.playFile(RES_DIR_EFF + "zhanduolibeijing", -1);
    };
    PlayFunView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeGuanQiaEnergy();
        this.removeRuleEvent();
        this.hongbao.removeChildren();
        DisplayUtils.removeFromParent(this._flowerShowItem);
    };
    PlayFunView.prototype.expChange = function (lvl) {
        var lv = lvl || Actor.level;
        var zs = UserZs.ins() ? UserZs.ins().lv : 0;
        var strLv = "|C:0xF1D715&T:" + (zs ? zs + "转" : "") + "|";
        strLv = strLv + lv + "级";
        this.lvTxt.textFlow = TextFlowMaker.generateTextFlow(strLv);
    };
    PlayFunView.prototype.hideBtn = function () {
        this.iconGroup.visible = !this.btn_toolbar.selected;
    };
    PlayFunView.prototype.addRuleEvent = function () {
        for (var i in this.ruleList) {
            var rule = this.ruleList[i];
            rule.addShowEvents();
            if (rule.isShow) {
                rule.addRedEvents();
                ResourceMgr.ins().reloadContainer(rule.tar);
            }
        }
    };
    PlayFunView.prototype.removeRuleEvent = function () {
        for (var i in this.ruleList) {
            var rule = this.ruleList[i];
            rule.removeEvents();
        }
    };
    PlayFunView.prototype.updateRules = function () {
        if (!TimerManager.ins().isExists(this.startUpdateRule, this))
            TimerManager.ins().doTimer(60, 1, this.startUpdateRule, this);
    };
    PlayFunView.prototype.startUpdateRule = function () {
        var isChanged = false;
        for (var i in this.ruleList) {
            var rule = this.ruleList[i];
            var hasChanged = this.updateShow(rule);
            if (hasChanged)
                isChanged = true;
            if (!hasChanged && rule.isShow) {
                this.updateRule(rule);
            }
        }
        if (isChanged)
            this.sortBtnList();
        this.checkGuide();
    };
    PlayFunView.prototype.checkGuide = function () {
        DieGuide.ins().checkFirstChargeOrVIPWin();
    };
    PlayFunView.prototype.updateRuleAndSort = function (rule) {
        TimerManager.ins().doTimer(100, 1, function () {
            if (this.updateShow(rule)) {
                this.sortBtnList(rule);
            }
        }, this);
    };
    PlayFunView.prototype.updateShow = function (rule) {
        var isShow = rule.checkShowIcon();
        var tar;
        if (KFServerSys.ins().isLinkingKF)
            isShow = false;
        if (rule.isShow == isShow)
            return false;
        rule.isShow = isShow;
        if (isShow) {
            rule.addRedEvents();
            tar = rule.getTar();
            tar.addEventListener(egret.TouchEvent.TOUCH_TAP, rule.tapExecute, rule);
            var tarParent = this.ruleParent[rule.hashCode];
            tarParent.addChild(tar);
            ResourceMgr.ins().reloadContainer(tar);
            this.updateRule(rule);
        }
        else {
            rule.removeRedEvents();
            tar = rule.tar;
            if (tar) {
                tar.removeEventListener(egret.TouchEvent.TOUCH_TAP, rule.tapExecute, rule);
                DisplayUtils.removeFromParent(tar);
                DisplayUtils.removeFromParent(this.ruleEff[tar.hashCode]);
            }
        }
        return true;
    };
    PlayFunView.prototype.updateRule = function (rule) {
        var count = 0;
        var tar = rule.getTar();
        if (tar['redPoint']) {
            count = rule.checkShowRedPoint();
            tar['redPoint'].visible = count;
        }
        var effName = rule.getEffName(count);
        if (effName) {
            if (!this.ruleEff[tar.hashCode] || !this.ruleEff[tar.hashCode].parent) {
                var mc = this.getEff(tar.hashCode, effName);
                if (effName == 'achieveCom') {
                    mc.x = rule.effX + 85;
                    mc.y = rule.effY - 10;
                }
                else if (effName == 'GWOpenEff') {
                    mc.x = rule.effX + 85;
                    mc.y = rule.effY - 10;
                }
                else {
                    mc.x = rule.effX;
                    mc.y = rule.effY;
                }
                tar.addChildAt(mc, 100);
            }
            else {
                this.ruleEff[tar.hashCode].play(-1);
            }
        }
        else {
            DisplayUtils.removeFromParent(this.ruleEff[tar.hashCode]);
        }
    };
    PlayFunView.prototype.getEff = function (value, effName) {
        this.ruleEff[value] = this.ruleEff[value] || new MovieClip;
        if (effName)
            this.ruleEff[value].playFile(RES_DIR_EFF + effName, -1);
        return this.ruleEff[value];
    };
    PlayFunView.prototype.onChange = function (e) {
        if (UserFb.ins().guanqiaID <= 10) {
            UserTips.ins().showTips("\u901A\u5173\u5230\u7B2C" + 10 + "\u5173\u5F00\u542F");
            this.autoPkBoss.selected = false;
        }
        else if (this.autoPkBoss.selected) {
            if (UserBag.ins().getSurplusCount() < UserBag.BAG_ENOUGH) {
                UserTips.ins().showTips("\u80CC\u5305\u5269\u4F59\u7A7A\u4F4D\u4E0D\u8DB3\uFF0C\u8BF7\u5148\u6E05\u7406");
                this.autoPkBoss.selected = false;
            }
            else if (UserFb.ins().guanqiaID < UserFb.AUTO_GUANQIA) {
                UserTips.ins().showTips("|C:0xff0000&T:\u6311\u6218\u81F3" + UserFb.AUTO_GUANQIA + "\u5173\u5F00\u542F");
                this.autoPkBoss.selected = false;
            }
            else if (UserFb.ins().guanqiaID >= GlobalConfig.InstanceBaseConfig.maxCheckPoint) {
                UserTips.ins().showCenterTips("\u5F53\u524D\u5DF2\u8FBE\u6700\u5927\u5173\u5361");
                this.autoPkBoss.selected = false;
            }
            else {
                this.GuanQiacleanEff();
                PlayFun.ins().openAuto();
            }
        }
        else {
            PlayFun.ins().closeAuto();
        }
        e.stopPropagation();
        e.stopImmediatePropagation();
    };
    PlayFunView.prototype.guanqiaChange = function () {
        this.maskImg.visible = (UserFb.ins().guanqiaID <= 10);
    };
    PlayFunView.prototype.onTaskTrace = function (e) {
        var data = UserTask.ins().taskTrace;
        if (data && data.state == 0) {
            var config = UserTask.ins().getAchieveConfById(data.id);
            switch (config.control) {
                case GuideType.ChallengeBoss:
                case GuideType.AutoPk:
                    if (UserBag.ins().getSurplusCount() < UserBag.BAG_ENOUGH) {
                        return;
                    }
                    if (UserFb.ins().currentEnergy < UserFb.ins().energy) {
                        this.showTaskTips("\u80FD\u91CF\u672A\u6EE1\u65E0\u6CD5\u6311\u6218\uFF0C\u8BF7\u7EE7\u7EED\u6E05\u602A\u3002");
                    }
                    if (config.control == GuideType.AutoPk) {
                        Hint.ins().postKillBoss(config);
                    }
                    break;
                case GuideType.KillDeer:
                    var text = "\u6B63\u5728\u5B8C\u6210\u6E05\u602A\u4EFB\u52A1\uFF0C\u8FD8\u5DEE|C:0xf8b141&T:" + (config.target - data.value) + "|\u4E2A\u3002";
                    this.showTaskTips(text);
                    break;
            }
        }
    };
    PlayFunView.prototype.guanqiaBtnClick = function (e) {
        if (UserFb.ins().guanqiaID >= GlobalConfig.InstanceBaseConfig.maxCheckPoint) {
            UserTips.ins().showCenterTips("\u5F53\u524D\u5DF2\u8FBE\u6700\u5927\u5173\u5361");
            return;
        }
        if (UserBag.ins().getSurplusCount() < UserBag.BAG_ENOUGH) {
            ViewManager.ins().open(BagFullTipsWin);
        }
        else {
            if (UserFb.ins().currentEnergy >= UserFb.ins().energy) {
                this.GuanQiacleanEff();
                UserFb.ins().autoPk();
                UserFb.ins().firstAutoGuilder = (UserFb.ins().guanqiaID == (UserFb.AUTO_GUANQIA - 1));
            }
            else {
            }
        }
    };
    PlayFunView.prototype.showTaskTips = function (text) {
        UserTips.ins().showTaskTips(text);
    };
    PlayFunView.prototype.onTap = function (e) {
        var tar = e.currentTarget;
        switch (tar) {
            case this.willBossPrompt:
                ViewManager.ins().open(BossWin, 1);
                break;
            case this.btn_toolbar:
                this.hideBtn();
                break;
            case this.recharge1:
                var rdata = Recharge.ins().getRechargeData(0);
                if (!rdata || rdata.num != 2) {
                    ViewManager.ins().open(Recharge1Win);
                }
                else {
                    ViewManager.ins().open(ChargeFirstWin);
                }
                break;
            case this.recharge2:
                Shop.openBuyGoldWin();
                break;
            case this.vipBtn0:
                ViewManager.ins().open(VipWin);
                break;
            case this.face:
                ViewManager.ins().open(SettingView);
                if (this.headRedPoint.visible) {
                    Setting.ins().setValue(ClientSet.headRed, 1);
                    this.updateHeadRedPoint();
                }
                break;
            case this.expGroup:
            case this.mapName0:
                ViewManager.ins().open(EffectivenessTip, 1);
                break;
        }
    };
    PlayFunView.prototype.changeTaskTrace = function () {
        var data = UserTask.ins().taskTrace;
        if (data) {
            var config = UserTask.ins().getAchieveConfById(data.id);
            if (!config) {
                console.log("\u4EFB\u52A1\u914D\u7F6E" + data.id + "\u4E0D\u5B58\u5728\uFF01");
                return;
            }
            if (config.type == 79) {
                this.taskTraceAwards.textFlow = TextFlowMaker.generateTextFlow("|C:0x40df38&T:" + config.desc + "|");
            }
            else {
                this.taskTraceAwards.text = "" + config.desc;
            }
            switch (data.state) {
                case 0:
                    var maxtarget = config.target;
                    var value = data.value;
                    if (config.type == 79) {
                        value = 0;
                        maxtarget = 1;
                    }
                    if (config.type == 36) {
                        value -= 1;
                        maxtarget -= 1;
                    }
                    this.taskTraceName.textFlow = TextFlowMaker.generateTextFlow(config.name + "|C:0xf3311e&T: (" + value + "/" + maxtarget + ")|");
                    if (data.value == 0)
                        GameGuider.stopTaskEffect();
                    GameGuider.startTaskEffect();
                    break;
                case 1:
                    this.taskTraceName.textFlow = TextFlowMaker.generateTextFlow(config.name + "|C:0x35e62d&T: (已完成)|");
                    GameGuider.stopTaskEffect();
                    GameGuider.startTaskEffect();
                    break;
            }
            var t = egret.Tween.get(this.taskTraceAwards);
            t.to({
                "x": this.taskTraceAwards.x + 100,
                "alpha": 0
            }, 200).to({ "x": 0 }, 200).to({ "x": 61, "alpha": 1 }, 200);
            var t1 = egret.Tween.get(this.taskTraceName);
            t1.to({
                "x": this.taskTraceName.x + 100,
                "alpha": 0
            }, 200).to({ "x": 0 }, 200).to({ "x": 61, "alpha": 1 }, 200);
        }
        else {
            GameGuider.stopTaskEffect();
        }
    };
    PlayFunView.prototype.updateTaskState = function () {
        var data = UserTask.ins().taskTrace;
        if (data) {
            if (data.state == 1) {
                if (this.taskAsseptMc.parent) {
                    if (this.taskEffTypes.indexOf(1) < 0)
                        this.taskEffTypes.push(1);
                }
                else if (!this.taskComMc.parent) {
                    this.addTaskEffectIndex(1);
                }
            }
            else if (data.state == 0 && data.value == 0) {
                if (this.taskComMc.parent) {
                    if (this.taskEffTypes.indexOf(0) < 0)
                        this.taskEffTypes.push(0);
                }
                else if (!this.taskAsseptMc.parent) {
                    this.addTaskEffectIndex(0);
                }
            }
        }
    };
    PlayFunView.prototype.addTaskEffectIndex = function (index) {
        var _this = this;
        if (index == 0) {
            this.taskTraceBtn.addChild(this.taskAsseptMc);
            this.taskAsseptMc.playFile(RES_DIR_EFF + "receive", 1, function () {
                TimerManager.ins().doNext(function () {
                    if (_this.taskEffTypes.length) {
                        _this.addTaskEffectIndex(_this.taskEffTypes.shift());
                    }
                }, _this);
            });
            SoundUtil.ins().playEffect(SoundUtil.TASK);
            this.taskAsseptMc.y = -50;
        }
        else if (index == 1) {
            this.taskTraceBtn.addChild(this.taskComMc);
            this.taskComMc.playFile(RES_DIR_EFF + "complete", 1, function () {
                TimerManager.ins().doNext(function () {
                    if (_this.taskEffTypes.length) {
                        _this.addTaskEffectIndex(_this.taskEffTypes.shift());
                    }
                }, _this);
            });
            this.taskComMc.y = -80;
        }
    };
    PlayFunView.prototype.upDataGuanQiaInfo = function () {
        this.expTxt.textFlow = TextFlowMaker.generateTextFlow("|C:0x35e62d&T:" + UserFb.ins().expEff + "|/\u5C0F\u65F6");
        this.mapName0.textFlow = TextFlowMaker.generateTextFlow("\u7B2C|C:0x35e62d&T:" + UserFb.ins().guanqiaID + "|\u5173");
        this.upDataGuanqia();
    };
    PlayFunView.prototype.upDataGuanqia = function () {
        var gqID = UserFb.ins().guanqiaID;
        if (gqID >= 0 && GameMap.sceneInMain()) {
            this.upDataExpMcBall(UserFb.ins().currentEnergy, UserFb.ins().energy);
            if (UserFb.ins().energy && UserFb.ins().currentEnergy >= UserFb.ins().energy) {
                if (this.guanQicMc && !this.guanQicMc.parent) {
                    this.guanQicMc.playFile(RES_DIR_EFF + "guankabtn", -1);
                    this.guanqiaEff0.addChild(this.guanQicMc);
                    this.guanqiaEff0.touchEnabled = this.guanQicMc.touchEnabled = false;
                }
            }
            else {
                if (UserFb.ins().energy > 0 && this.lastEnergy != UserFb.ins().currentEnergy && this.lastEnergy != -1) {
                    this.playGuanQiaDoorMc();
                }
                DisplayUtils.removeFromParent(this.guanQicMc);
            }
            this.lastEnergy = UserFb.ins().currentEnergy;
        }
        else {
            DisplayUtils.removeFromParent(this.guanQicMc);
            this.lastEnergy = -1;
        }
        if (gqID < UserFb.AUTO_GUANQIA)
            this.pkBossBtnGroup.visible = false;
        else
            this.pkBossBtnGroup.visible = true;
    };
    PlayFunView.prototype.removeGuanQiaEnergy = function () {
        DisplayUtils.removeFromParent(this.guanQicMc);
        UserFb.ins().currentEnergy = 0;
    };
    PlayFunView.prototype.upDataExpMcBall = function (value, total) {
        this.setGuanQiaBar(value, total);
    };
    PlayFunView.prototype.upDataWillBoss = function (id) {
        if (id) {
            this.willBossPrompt = this.willBossPrompt || new MovieClip();
            this.willBossPrompt.playFile(RES_DIR_EFF + "zaoyuBoss", -1);
            this.willBossPrompt.y = 500;
            this.willBossPrompt.x = 330;
            this.willBossPrompt.touchEnabled = true;
            this.addTouchEvent(this.willBossPrompt, this.onTap);
            this.addChild(this.willBossPrompt);
        }
        else if (this.willBossPrompt) {
            DisplayUtils.removeFromParent(this.willBossPrompt);
            this.removeTouchEvent(this.willBossPrompt, this.onTap);
        }
    };
    PlayFunView.prototype.updateHeadRedPoint = function () {
        if (Actor.level >= 30 && !Setting.ins().getValue(ClientSet.headRed)) {
            this.headRedPoint.visible = true;
        }
        else {
            this.headRedPoint.visible = false;
        }
    };
    PlayFunView.prototype.updateLevelBar = function (lv) {
        this.expChange(lv);
    };
    PlayFunView.prototype.publicBossRelive = function (isShow, bossName) {
        if (bossName === void 0) { bossName = ""; }
        if (!isShow && bossName && bossName != this.reliveBossLab.name)
            return;
        var boo = UserBoss.ins().checkBossIconShow();
        var isVisible = isShow && boo && (GameMap.sceneInMain());
        PlayFun.ins().newBossRelive = this.newBossRelive.visible = isVisible;
        this.reliveBossLab.name = isShow ? bossName : "1";
        if (!isVisible)
            return;
        this.reliveBossLab.textFlow = new egret.HtmlTextParser().parser(StringUtils.addColor("" + bossName, "#35e62d") + "\u5237\u65B0\u4E86\uFF01");
    };
    PlayFunView.prototype.sortRule = function (a, b) {
        var ac = GlobalConfig.PlayFunConfig[a.id];
        var bc = GlobalConfig.PlayFunConfig[b.id];
        if (ac.sort < bc.sort)
            return -1;
        else
            return 1;
    };
    PlayFunView.prototype.sortBtnList = function (rule) {
        if (rule === void 0) { rule = null; }
        var pos = -1;
        if (rule) {
            var config = GlobalConfig.PlayFunConfig[rule.id];
            if (!config)
                return;
            pos = config.pos;
        }
        var btnDic = {};
        if (pos == -1) {
            btnDic[0] = [];
            btnDic[1] = [[], [], []];
            btnDic[2] = [];
            btnDic[3] = [];
        }
        else {
            if (pos != 1)
                btnDic[pos] = [];
            else
                btnDic[pos] = [[], [], []];
        }
        var configs = GlobalConfig.PlayFunConfig;
        var ruleIdList = this.ruleIdList;
        for (var id in configs) {
            var r = ruleIdList[id];
            if (r.isShow) {
                var config = configs[id];
                var temp = config.pos;
                if (pos == -1 || pos == temp) {
                    if (temp == 1) {
                        btnDic[temp][config.layer - 1].push(r);
                    }
                    else {
                        btnDic[temp].push(r);
                    }
                }
            }
        }
        for (var i in btnDic) {
            if (i == '1') {
                for (var j in btnDic[i])
                    btnDic[i][j].sort(this.sortRule);
            }
            else {
                btnDic[i].sort(this.sortRule);
            }
        }
        var starX = this.width - 156;
        var starY = 0;
        var btn;
        var btnList;
        var showNum = 0;
        var index = 0;
        var actRow = 0;
        if (pos == -1 || pos == 1) {
            btnList = btnDic[1];
            for (var row = 0; row < btnList.length; row++) {
                if (actRow < row) {
                    actRow = row;
                    showNum = 0;
                }
                for (var i = 0; i < btnList[row].length; i++) {
                    btn = btnList[row][i].tar;
                    btn.parent.setChildIndex(btn, 0);
                    btn.x = starX - showNum * 80;
                    btn.y = starY + actRow * 80;
                    showNum += 1;
                    if (showNum > 5) {
                        actRow += 1;
                        showNum = 0;
                    }
                }
            }
        }
        if (pos == -1 || pos == 2) {
            showNum = 0;
            index = 0;
            btnList = btnDic[2];
            for (var i = 0; i < btnList.length; i++) {
                var r = btnList[i];
                btn = r.tar;
                btn.parent.setChildIndex(btn, index);
                index += 1;
                if (!r.getConfig().noMove) {
                    btn.left = 10;
                    btn.top = 502 - showNum * 76;
                    showNum++;
                }
            }
        }
        if (pos == -1 || pos == 3) {
            showNum = 0;
            index = 0;
            btnList = btnDic[3];
            for (var i = 0; i < btnList.length; i++) {
                var r = btnList[i];
                btn = r.tar;
                btn.parent.setChildIndex(btn, index);
                index += 1;
                if (!r.getConfig().noMove) {
                    btn.right = 0;
                    btn.bottom = 300 + showNum * 65;
                    showNum++;
                }
            }
        }
        if (pos == -1 || pos == 0) {
            index = 0;
            btnList = btnDic[0];
            for (var i = 0; i < btnList.length; i++) {
                btn = btnList[i].tar;
                btn.parent.setChildIndex(btn, index);
                index += 1;
            }
        }
    };
    PlayFunView.prototype.addExpFlyMc = function (mon) {
        var _this = this;
        if (GameMap.fbType == UserFb.FB_TYPE_EXP)
            return;
        if (!UserFb.ins().checkGuanqiaIconShow()) {
            UserFb.ins().postAddEnergy();
            return;
        }
        var movieExp = new eui.Image();
        movieExp.source = "point";
        movieExp.anchorOffsetX = 20;
        movieExp.anchorOffsetY = 20;
        var map = ViewManager.gamescene.map;
        var point = this.localToGlobal();
        map.globalToLocal(point.x, point.y, point);
        movieExp.x = mon.x - point.x;
        movieExp.y = mon.y - point.y;
        this.addChild(movieExp);
        var tweenX = this.groupGuanqia.x + 60;
        var tweenY = this.groupGuanqia.y + 60;
        var t = egret.Tween.get(movieExp);
        t.to({ x: tweenX, y: tweenY, alpha: 0.5 }, 600).call(function () {
            UserFb.ins().postAddEnergy();
            _this.removeChild(movieExp);
            egret.Tween.removeTweens(movieExp);
        }, this);
        var tt = egret.Tween.get(movieExp, { "loop": true });
        tt.to({ "rotation": movieExp.rotation + 360 }, 800);
    };
    PlayFunView.prototype.playGuanQiaDoorMc = function () {
        if (!this.eyesMc)
            this.eyesMc = new MovieClip();
        if (!this.eyesMc.parent)
            this.guanqiaEff1.addChild(this.eyesMc);
        this.eyesMc.playFile(RES_DIR_EFF + "guankaeye", 1);
    };
    PlayFunView.prototype.warmWord = function (num) {
        var _this = this;
        if (num) {
            if (GameMap.sceneInMain()) {
                this.bossWarmMc = this.bossWarmMc || new MovieClip();
                this.bossWarmMc.touchEnabled = false;
                this.mcGroup.addChildAt(this.bossWarmMc, 0);
                this.mcGroup.visible = true;
                this.aniShadow();
                this.bossWarmMc.playFile(RES_DIR_EFF + "bosscaution", 2, function () {
                    _this.removeShadow();
                });
                this.removeGuanQiaEnergy();
            }
        }
        else {
            this.mcGroup.visible = false;
            egret.Tween.removeTweens(this.alphaGroup);
            if (this.bossWarmMc) {
                DisplayUtils.removeFromParent(this.bossWarmMc);
                this.bossWarmMc = null;
            }
        }
    };
    PlayFunView.prototype.aniShadow = function () {
        var _this = this;
        this.warmImage.visible = true;
        var t = egret.Tween.get(this.warmImage);
        this.warmImage.alpha = 0.23;
        t.to({ alpha: 1 }, 300).wait(2200).to({ alpha: 0 }, 350)
            .call(function () {
            egret.Tween.removeTweens(_this.warmImage);
        });
        this.levelNum.text = UserFb.ins().guanqiaID + "";
        this.alphaGroup.alpha = 0.2;
        egret.Tween.removeTweens(this.alphaGroup);
        egret.Tween.get(this.alphaGroup, { loop: true }).to({ alpha: 1 }, 625).to({ alpha: 0.2 }, 625);
        TimerManager.ins().doTimer(3500, 1, this.removeShadow, this);
    };
    PlayFunView.prototype.removeShadow = function () {
        this.warmImage.visible = false;
        this.mcGroup.visible = false;
        egret.Tween.removeTweens(this.alphaGroup);
        TimerManager.ins().remove(this.removeShadow, this);
    };
    PlayFunView.prototype.upDataVipBtnRedPoint = function () {
        this.redPointVip0.visible = UserVip.ins().getVipState();
    };
    PlayFunView.prototype.setDieGuide = function (dieType) {
        switch (dieType) {
            case DieGuide.RECHARGE:
                this.preRecharge = this.recharge.visible = true;
                this.cz.source = "swyd_firstrecharge_png";
                this.cz.touchEnabled = this.recharge.touchEnabled = false;
                break;
            case DieGuide.VIP:
                this.preVip = this.vip.visible = true;
                this.v.source = "swyd_vip_png";
                this.v.touchEnabled = this.vip.touchEnabled = false;
                break;
        }
    };
    PlayFunView.prototype.setGuanQiaBar = function (cur, total) {
        var curValue = cur;
        var maxValue = total;
        if (curValue >= maxValue)
            curValue = maxValue;
        this.guanqiaBar.value = curValue;
        this.guanqiaBar.maximum = maxValue;
        this.guanqiaBar.labelFunction = function () {
            return "";
        };
    };
    PlayFunView.prototype.GuanQiaEffLogic = function () {
        var _this = this;
        if (this.guanqiaBtn && UserFb.ins().showAutoPk == 0) {
            UserFb.ins().showAutoPk = 1;
            if (!this.arrow) {
                this.arrow = new GuideArrow;
                this.arrow.touchEnabled = false;
                this.arrow.lab.text = "点击挑战关卡";
                this.addChild(this.arrow);
                var point = this.guanqiaBtn.localToGlobal();
                this.globalToLocal(point.x, point.y, point);
                this.arrow.x = point.x;
                this.arrow.y = point.y + this.guanqiaBtn.height / 2;
                if (!this.eff) {
                    this.eff = new MovieClip;
                    this.eff.playFile(RES_DIR_EFF + "guideff", -1);
                    this.groupGuanqia.addChild(this.eff);
                    this.eff.x = this.guanqiaBtn.x + this.guanqiaBtn.width / 2;
                    this.eff.y = this.guanqiaBtn.y + this.guanqiaBtn.height / 2;
                }
                egret.Tween.get(this.arrow, { loop: true }).to({ x: this.arrow.x + 40 }, 1000).to({ x: this.arrow.x }, 1000);
                egret.Tween.get(this, { loop: false }).wait(5000).call(function () {
                    UserFb.ins().showAutoPk = -1;
                    DisplayUtils.removeFromParent(_this.eff);
                    DisplayUtils.removeFromParent(_this.arrow);
                    if (_this.arrow)
                        egret.Tween.removeTweens(_this.arrow);
                    _this.arrow = null;
                    _this.eff = null;
                });
            }
        }
        else if (this.pkBossBtnGroup && UserFb.ins().showAutoPk2 == 0) {
            UserFb.ins().showAutoPk2 = 1;
            if (!this.arrow) {
                this.arrow = new GuideArrow;
                this.arrow.touchEnabled = false;
                this.arrow.lab.text = "点击自动挑战关卡";
                this.addChild(this.arrow);
                var point = this.pkBossBtnGroup.localToGlobal();
                this.globalToLocal(point.x, point.y, point);
                this.arrow.x = point.x;
                this.arrow.y = point.y + this.pkBossBtnGroup.height / 2;
                if (!this.eff) {
                    this.eff = new MovieClip;
                    this.eff.playFile(RES_DIR_EFF + "guideff", -1);
                    this.groupGuanqia.addChild(this.eff);
                    this.eff.x = this.pkBossBtnGroup.x + this.pkBossBtnGroup.width / 2;
                    this.eff.y = this.pkBossBtnGroup.y + this.pkBossBtnGroup.height / 2;
                }
                egret.Tween.get(this.arrow, { loop: true }).to({ x: this.arrow.x + 40 }, 1000).to({ x: this.arrow.x }, 1000);
                egret.Tween.get(this, { loop: false }).wait(5000).call(function () {
                    UserFb.ins().showAutoPk2 = -1;
                    DisplayUtils.removeFromParent(_this.eff);
                    DisplayUtils.removeFromParent(_this.arrow);
                    if (_this.arrow)
                        egret.Tween.removeTweens(_this.arrow);
                    _this.arrow = null;
                    _this.eff = null;
                });
            }
        }
    };
    PlayFunView.prototype.GuanQiacleanEff = function () {
        UserFb.ins().showAutoPk = -1;
        UserFb.ins().showAutoPk2 = -1;
        DisplayUtils.removeFromParent(this.eff);
        DisplayUtils.removeFromParent(this.arrow);
        if (this.arrow)
            egret.Tween.removeTweens(this.arrow);
        this.arrow = null;
        this.eff = null;
    };
    PlayFunView.prototype.updateFlower = function () {
        if (!this._flowerShowItem) {
            this._flowerShowItem = new FlowerShowItem();
            this.flower.addChild(this._flowerShowItem);
            return;
        }
        if (!this._flowerShowItem.parent)
            this.flower.addChild(this._flowerShowItem);
        this._flowerShowItem.showEffect();
    };
    PlayFunView.prototype.removeFlowerItem = function () {
        DisplayUtils.removeFromParent(this._flowerShowItem);
    };
    PlayFunView.prototype.playUIEff = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    __decorate([
        callLater
    ], PlayFunView.prototype, "initData", null);
    return PlayFunView;
}(BaseEuiView));
__reflect(PlayFunView.prototype, "PlayFunView");
ViewManager.ins().reg(PlayFunView, LayerManager.Main_View);
//# sourceMappingURL=PlayFunView.js.map