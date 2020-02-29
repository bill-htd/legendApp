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
var UIView2 = (function (_super) {
    __extends(UIView2, _super);
    function UIView2() {
        var _this = _super.call(this) || this;
        _this.lastLevel = 0;
        _this.flyExpLevel = [];
        _this.canClick = true;
        _this._shap = new egret.Shape();
        _this.radius = 0;
        _this._curAngle = 0;
        _this._toAngle = 0;
        _this._oldAngle = 360;
        return _this;
    }
    UIView2.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "UIView2Skin";
        this.expBar.slideDuration = 0;
        this.navBtn = [this.roleBtn, this.furnaceBtn, this.taskBtn, this.forgingBtn, this.bagBtn];
        for (var i = 0; i < this.navBtn.length; i++) {
            this.navBtn[i]['redPoint'].visible = false;
        }
        this.navBind = [RoleWin, SkillWin, LiLianWin, ForgeWin, BagWin];
        this.hpBall = new MovieClip;
        this.hpBall.mask = new egret.Rectangle(-90 / 2, -53, 80, 106);
        this.hpBall.x = 65;
        this.hpBall.y = 45;
        this.mpBall = new MovieClip;
        this.mpBall.mask = new egret.Rectangle(-65 / 2, -53, 88, 106);
        this.mpBall.x = 57;
        this.mpBall.y = 45;
        this.hpLineMc = new MovieClip;
        this.hpLineMc.x = 50;
        this.hpLineMc.y = 0;
        this.hpLineMc.mask = this.hpMask;
        this.mpLineMc = new MovieClip;
        this.mpLineMc.x = 80;
        this.mpLineMc.y = 0;
        this.mpLineMc.mask = this.mpMask;
        this.hjMc = new MovieClip;
        this.hjMc.x = 41;
        this.hjMc.y = 41;
        this.hjMc.touchEnabled = false;
        this.circleImg = new MovieClip;
        this.circleImg.x = 41;
        this.circleImg.y = 41;
        this.circleImg.touchEnabled = false;
        this.taskItemImg = new eui.Image;
        this.taskItemImg.x = 250;
        this.taskItemImg.y = 730;
        this.taskItemImg.visible = false;
        this.flyItemGroup.addChild(this.taskItemImg);
        this.backMc = new MovieClip;
        this.backMc.x = 50;
        this.backMc.y = 50;
        this.isExitUsedItem = false;
        this.isItemCountChange = false;
        this.backBtnGroup.visible = false;
        this.powerGroup.visible = true;
        this.circleImg.touchEnabled = false;
        this.backBtnGroup.touchEnabled = this.backMc.touchEnabled = false;
    };
    UIView2.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        _super.prototype.open.call(this, param);
        this.lastLevel = Actor.level || 0;
        for (var i = 0; i < this.navBtn.length; i++) {
            this.addTouchEvent(this.navBtn[i], this.onClick);
        }
        this.addTouchEvent(this.closeBtn, this.onClick);
        this.addTouchEvent(this.powerGroup, this.onClick);
        this.addTouchEvent(this.lockImg, this.onClick);
        this.observe(Actor.ins().postExp, this.expChange);
        this.observe(Actor.ins().postInit, this.expChange);
        this.observe(UserRole.ins().postRoleHint, this.showRoleBtnRedPoint);
        this.observe(GameLogic.ins().postMpChange, this.updateHuShen);
        this.observe(GameLogic.ins().postCreateOtherEntity, this.updateHuShen);
        this.observe(GameLogic.ins().postHpChange, this.readyUpdateHp);
        this.observe(GameLogic.ins().postHpChange, this.flyGQBossExpToBar);
        this.observe(GameLogic.ins().postCreateOtherEntity, this.readyUpdateHp);
        this.observe(UserTask.ins().postParabolicItem, this.runItem);
        this.observe(UserBag.ins().postItemCountChange, this.showBagBtnRedPoint);
        this.observe(ForgeRedPoint.ins().postForgeRedPoint, this.showForgingBtnRedPoint);
        this.observe(UserBag.ins().postBagWillFull, this.setBagTips);
        this.observe(UserBag.ins().postHasItemCanUse, this.setIsExitUsedItem);
        this.observe(UserBoss.ins().postBossAppear, this.onBossAppear);
        this.observe(MonsterSpeak.ins().postMonsterSpeak, this.onMonsterSpeak);
        this.observe(UserFb.ins().postExpFly, this.flyExpToBar);
        this.observe(Encounter.ins().postFightResult, this.onFightResult);
        this.observe(NeiGong.ins().postNeiGongDataChange, this.startUpdateRedPoint);
        this.observe(UserJingMai.ins().postUpdate, this.startUpdateRedPoint);
        this.observe(UserBag.ins().postItemAdd, this.startUpdateRedPoint);
        this.observe(UserZs.ins().postZsData, this.startUpdateRedPoint);
        this.observe(Actor.ins().postLevelChange, this.startUpdateRedPoint);
        this.observe(Actor.ins().postGoldChange, this.startUpdateRedPoint);
        this.observe(UserSkill.ins().postSkillUpgradeAll, this.startUpdateRedPoint);
        this.observe(ZhanLing.ins().postZhanLingComposeItem, this.startUpdateRedPoint);
        this.observe(ZhanLing.ins().postZhanLingInfo, this.startUpdateRedPoint);
        this.observe(ZhanLing.ins().postZhanLingUpExp, this.startUpdateRedPoint);
        this.observe(ZhanLing.ins().postZhanLingDrug, this.startUpdateRedPoint);
        this.observe(ZhanLing.ins().postZhanLingWear, this.startUpdateRedPoint);
        this.observe(GameLogic.ins().postViewOpen, this.checkViewOpen);
        this.observe(UserBag.ins().postItemAdd, this.setLilianRedPoint);
        this.observe(LiLian.ins().postLilianData, this.setLilianRedPoint);
        this.observe(LiLian.ins().postNobilityData, this.setLilianRedPoint);
        this.observe(UserTask.ins().postTaskChangeData, this.setLilianRedPoint);
        this.observe(Artifact.ins().postNewArtifactUpdate, this.setLilianRedPoint);
        this.observe(Artifact.ins().postNewArtifactInit, this.setLilianRedPoint);
        this.observe(BookRedPoint.ins().postRedPoint, this.setLilianRedPoint);
        this.observe(Actor.ins().postLevelChange, this.setLilianRedPoint);
        this.observe(LiLian.ins().postJadeLv, this.setLilianRedPoint);
        this.observe(UserBag.ins().postItemChange, this.setLilianRedPoint);
        this.observe(UserSkill.ins().postHejiRemove, this.resetHejiCd);
        this.observe(UserSkill.ins().postHejiStartCD, this.resetHejiCd);
        this.observe(UserSkill.ins().postHejiUpdate, this.checkHejiOpen);
        this.observe(LiLian.ins().postGetLilianReward, this.lilianRewardFlash);
        this.observe(Guild.ins().postGuildCreate, this.setRedPiont);
        this.observe(Guild.ins().postProcessJoin, this.setRedPiont);
        this.observe(GameLogic.ins().postFlyItem, this.flyItemToBag);
        this.observe(GameLogic.ins().postFlyItemEx, this.flyItemToBagEx);
        this.observe(Recharge.ins().postRecharge1Data, this.setRedPiont);
        this.observe(UserBag.ins().postItemAdd, this.setRedPiont);
        this.observe(UserBag.ins().postItemDel, this.setRedPiont);
        this.observe(UserBag.ins().postItemChange, this.setRedPiont);
        this.observe(GameLogic.ins().postEnterMap, this.cleanPowerGuilderEff);
        this.hpBall.playFile(RES_DIR_EFF + "hpeff", -1);
        this.mpBall.playFile(RES_DIR_EFF + "mpeff", -1);
        this.hPGroup.addChildAt(this.hpBall, 0);
        this.hPGroup.addChildAt(this.mpBall, 0);
        this.powerGroup.addChildAt(this.circleImg, 1);
        this.powerGroup.addChild(this._shap);
        this.circleImg.mask = this._shap;
        this.checkHejiOpen();
        if (UserSkill.ins().hejiLevel > 0)
            UserSkill.ins().postHejiStartCD();
        this.startUpdateRedPoint();
        this.showForgingBtnRedPoint();
    };
    UIView2.prototype.checkHejiOpen = function () {
        if (UserSkill.ins().hejiLevel > 0) {
            this.powerGroup.touchEnabled = true;
            this.circleImg.playFile(RES_DIR_EFF + "hejianniueff", -1);
            this.powerImg.visible = true;
            this.lockImg.visible = false;
            this.powerImg.source = UserSkill.ins().getHejiSkillIdIcon();
            this.powerImg.scaleX = 0.55;
            this.powerImg.scaleY = 0.55;
        }
        else {
            this.powerGroup.touchEnabled = false;
            this.powerImg.visible = false;
            this.lockImg.visible = true;
        }
    };
    UIView2.prototype.checkViewOpen = function (type) {
        if (type === void 0) { type = 0; }
        if (type == 1) {
            this.backBtnGroup.visible = true;
            this.powerGroup.visible = false;
            if (!this.backMc.parent) {
                this.backMc.playFile(RES_DIR_EFF + "fanhuibtneff", -1);
                this.backBtnGroup.addChild(this.backMc);
            }
        }
        else {
            this.backBtnGroup.visible = false;
            this.powerGroup.visible = true;
            DisplayUtils.removeFromParent(this.backMc);
        }
        this.checkShowHejiIcon(type);
    };
    UIView2.prototype.checkShowHejiIcon = function (type) {
        if (Artifact.ins().openHeji == 2) {
            if (type == 0) {
                TimerManager.ins().doTimer(50, 1, this.showHejiIcon, this);
            }
            else {
                TimerManager.ins().remove(this.showHejiIcon, this);
            }
        }
    };
    UIView2.prototype.showHejiIcon = function () {
        if (Artifact.ins().openHeji == 2 && UserSkill.ins().hejiLevel > 0) {
            var role = SubRoles.ins().getSubRoleByIndex(0);
            if (!role)
                return;
            Artifact.ins().openHeji = -1;
            var job = role.job;
            var config = GlobalConfig.TogetherHitConfig[UserSkill.ins().hejiLevel];
            var curSkill = new SkillData(config.skill_id[job - 1]);
            var icon_1 = new eui.Image(curSkill.id + "_png");
            icon_1.anchorOffsetX = 32;
            icon_1.anchorOffsetY = 32;
            icon_1.scaleX = 4;
            icon_1.scaleY = 4;
            icon_1.x = this.width / 2;
            icon_1.y = this.height / 2;
            this.addChild(icon_1);
            var toX = this.powerGroup.x + this.powerGroup.width / 2;
            var toY = this.powerGroup.y + this.powerGroup.height / 2;
            egret.Tween.get(icon_1).to({ scaleX: 1, scaleY: 1 }, 200).to({ x: toX, y: toY }, 600).to({
                scaleX: 0,
                scaleY: 0
            }, 200).call(function () {
                icon_1.parent.removeChild(icon_1);
            });
        }
    };
    UIView2.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        TimerManager.ins().removeAll(this);
    };
    UIView2.prototype.showRoleBtnRedPoint = function (b) {
        this.roleBtn['redPoint'].visible = b > 0;
    };
    UIView2.prototype.showBagBtnRedPoint = function (b) {
        this.isItemCountChange = b > 0;
        this.setRedPiont();
    };
    UIView2.prototype.showForgingBtnRedPoint = function () {
        this.forgingBtn['redPoint'].visible = ForgeRedPoint.ins().redPoint;
    };
    UIView2.prototype.setLilianRedPoint = function () {
        var lilian = LiLian.ins();
        var isMaxLevel = LiLian.ins().getNobilityIsMaxLevel();
        var flag = lilian.getLilianShenGongStast() ||
            Artifact.ins().showRedPoint() ||
            (lilian.checkXunZhangOpen() && lilian.getNobilityIsUpGrade() && !isMaxLevel) ||
            Artifact.ins().showRedPoint() ||
            BookRedPoint.ins().redpoint || lilian.checkJadeRed();
        this.taskBtn['redPoint'].visible = flag;
    };
    UIView2.prototype.onClick = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
                SoundUtil.ins().playEffect(SoundUtil.WINDOW);
                var view = ViewManager.ins().getView(RoleWin);
                if (view && view.getWingPanelInfo()) {
                    view.doOpenHintWin(2);
                }
                else {
                    ViewManager.ins().closeLastTopView();
                }
                break;
            case this.lockImg:
                UserTips.ins().showTips("\u95EF\u5173\u8FBE\u5230" + UserSkill.ACTIVE_LEVEL + "\u5F00\u542F\u5408\u51FB");
                break;
            case this.powerImg:
            case this.powerGroup:
                if (UserSkill.ins().hejiLevel <= 0) {
                    return;
                }
                if (!this.hjMc || !this.hjMc.parent) {
                    UserTips.ins().showTips("\u6012\u6C14\u672A\u6EE1\uFF0C\u65E0\u6CD5\u91CA\u653E\u5408\u51FB");
                    return;
                }
                this.cleanPowerGuilderEff();
                var state = this.useHejiSkill();
                if (state == -1) {
                    UserTips.ins().showTips("\u91CA\u653E\u8DDD\u79BB\u8FC7\u8FDC\uFF0C\u65E0\u6CD5\u91CA\u653E");
                }
                else if (state == -2) {
                    UserTips.ins().showTips("\u8BF7\u5148\u9009\u62E9\u653B\u51FB\u76EE\u6807");
                }
                else if (state == -3) {
                    UserTips.ins().showTips("\u9EBB\u75F9\u72B6\u6001\u4E2D\uFF0C\u65E0\u6CD5\u91CA\u653E");
                }
                break;
            default:
                var index = this.navBtn.indexOf(e.currentTarget);
                if (this.navBtn[index].selected) {
                    var win = this.openWindow(index);
                    if (!win) {
                        this.navBtn[index].selected = false;
                    }
                }
                else {
                    this.closeWindow(index);
                }
                for (var i = 0; i < this.navBtn.length; i++) {
                    if (index != i) {
                        this.closeWindow(i);
                    }
                }
                break;
        }
    };
    UIView2.prototype.useHejiSkill = function () {
        if (UserSkill.ins().hejiEnable && this.canClick) {
            var skill = UserSkill.ins().getHejiSkillId();
            var role = EntityManager.ins().getNoDieRole();
            if (!role) {
                return;
            }
            var tempArr = EntityManager.ins().screeningTargetByPos(role, false, skill.affectCount, skill.castRange);
            if (!tempArr || tempArr.length == 0) {
                return -1;
            }
            if (GameMap.fbType == UserFb.FB_TYPE_GUILD_WAR
                || GameMap.fbType == UserFb.FB_TYPE_ZHUANSHENGBOSS
                || GameMap.fbType == UserFb.FB_TYPE_ALLHUMENBOSS
                || GameMap.fbType == UserFb.FB_TYPE_HOMEBOSS
                || CityCC.ins().isCity
                || GwBoss.ins().isGwBoss || GwBoss.ins().isGwTopBoss
                || BattleCC.ins().isBattle() || PaoDianCC.ins().isPaoDian) {
                var handle = GameLogic.ins().currHandle;
                var entity = EntityManager.ins().getEntityByHandle(handle);
                if (!handle || !entity || (entity.infoModel.getAtt(AttributeType.atHp) <= 0)) {
                    return -2;
                }
            }
            this.canClick = false;
            TimerManager.ins().doTimer(50, 1, this.setClickDelay, this);
            if (GameMap.fubenID != 0 && !GameMap.sceneInMine()) {
                var len = SubRoles.ins().subRolesLen;
                var charRole = void 0;
                var isStraight = false;
                for (var i = 0; i < len; i++) {
                    charRole = EntityManager.ins().getMainRole(i);
                    if (charRole && charRole.infoModel && charRole.infoModel.getAtt(AttributeType.atHp) > 0) {
                        break;
                    }
                }
                if (charRole.hasEffById(1)) {
                    isStraight = true;
                }
                if (isStraight || charRole.hasBuff(51001) || charRole.hasBuff(14001) || charRole.hasBuff(70001)) {
                    return -3;
                }
                UserSkill.ins().sendUseHejiSkill();
            }
            else {
                UserSkill.ins().fieldUse = true;
            }
        }
        else {
        }
    };
    UIView2.prototype.setClickDelay = function () {
        this.canClick = true;
    };
    UIView2.prototype.openWindow = function (index) {
        if (KFServerSys.ins().checkIsKFBattle("\u8DE8\u670D\u6218\u573A\u5185\uFF0C\u65E0\u6CD5\u64CD\u4F5C!")) {
            return;
        }
        return ViewManager.ins().open(this.navBind[index]);
    };
    UIView2.prototype.closeWindow = function (index) {
        ViewManager.ins().close(this.navBind[index]);
    };
    UIView2.prototype.expChange = function (exp, force) {
        var _this = this;
        if (force === void 0) { force = false; }
        if (!force && (GameMap.fbType == UserFb.FB_TYPE_GUANQIABOSS || GameMap.fbType == UserFb.FB_TYPE_TIAOZHAN))
            return;
        if (!this.lastLevel) {
            this.lastLevel = Actor.level;
        }
        var isNew = this.flyExpLevel.length == 0;
        if (this.flyExpLevel.length) {
            this.flyExpLevel[this.flyExpLevel.length - 1][0] = Actor.level;
            this.flyExpLevel[this.flyExpLevel.length - 1][1] = Actor.exp;
        }
        else {
            this.flyExpLevel.push([Actor.level, Actor.exp]);
        }
        var newLv = this.flyExpLevel[0][0];
        var newExp = this.flyExpLevel[0][1];
        if (this.lastLevel < newLv) {
            if (!this.expBar['tween_count'] || isNew) {
                var maxExp_1 = GlobalConfig.ExpConfig[this.lastLevel].exp;
                egret.Tween.removeTweens(this.expBar);
                var tween = egret.Tween.get(this.expBar);
                tween.to({ "value": this.expBar.maximum }, 300).wait(100).call(function () {
                    _this.expBar.maximum = maxExp_1;
                    _this.expBar.value = 0;
                    _this.lastLevel += 1;
                    GameLogic.ins().postLevelBarChange(_this.lastLevel);
                    SoundUtil.ins().playEffect(SoundUtil.LEVEL_UP);
                    _this.expChange();
                }, this);
            }
        }
        else {
            egret.Tween.removeTweens(this.expBar);
            var maxExp = GlobalConfig.ExpConfig[newLv].exp;
            if (this.expBar.maximum != maxExp) {
                this.expBar.maximum = maxExp;
            }
            var tween = egret.Tween.get(this.expBar);
            tween.to({ "value": newExp }, 400);
            this.flyExpLevel.shift();
        }
    };
    UIView2.prototype.closeNav = function (index) {
        this.navBtn[index].selected = false;
    };
    UIView2.prototype.updateHuShen = function (model) {
        if (model && model.team != Team.My)
            return;
        var len = SubRoles.ins().subRolesLen;
        var role;
        var value = 0;
        var total = 0;
        for (var i = 0; i < len; i++) {
            role = SubRoles.ins().getSubRoleByIndex(i);
            value += role.getAtt(AttributeType.atMp);
            total += role.getAtt(AttributeType.atMaxMp);
        }
        var mask = this.mpBall.mask;
        if (value > total)
            value = total;
        mask.y = -53 + 106 * (1 - (value / total));
        this.mpLineMc.y = mask.y + 35;
    };
    UIView2.prototype.onBossAppear = function () {
        if (GameMap.fbType == UserFb.FB_TYPE_HUN_SHOU)
            return;
        this.showEffectTips("zdbossskin_json.bosstishi");
    };
    UIView2.prototype.onMonsterSpeak = function (tips) {
        this.showEffectTips(tips);
    };
    UIView2.prototype.onFightResult = function (result) {
        if (result) {
            this.showEffectTips("pktishi_png");
        }
        else {
            this.showEffectTips("pktishi1_png");
        }
    };
    UIView2.prototype.showEffectTips = function (tipsStr) {
        var _this = this;
        this.tips.source = tipsStr;
        egret.Tween.removeTweens(this.tips);
        this.tips.visible = true;
        this.tips.alpha = 1;
        egret.Tween.get(this.tips).wait(4000).to({ alpha: 0 }, 1000).call(function () {
            _this.tips.visible = false;
        });
    };
    UIView2.prototype.readyUpdateHp = function (data) {
        if (!data)
            return;
        if (data instanceof EntityModel) {
            if (!data.isMy)
                return;
        }
        else {
            if (!data[0].isMy)
                return;
        }
        this.updateHp();
    };
    UIView2.prototype.updateHp = function () {
        var len = SubRoles.ins().subRolesLen;
        var value = 0;
        var total = 0;
        for (var i = 0; i < len; i++) {
            var role = SubRoles.ins().getSubRoleByIndex(i);
            if (role) {
                var curHp = role.getAtt(AttributeType.atHp) || 0;
                var maxHp = role.getAtt(AttributeType.atMaxHp) || 0;
                value += curHp;
                total += maxHp;
            }
        }
        var mask = this.hpBall.mask;
        if (value > total)
            value = total;
        mask.y = -53 + 106 * (1 - (value / total));
        this.hpLineMc.y = mask.y + 35;
    };
    UIView2.prototype.lilianUpgradeSuccess = function (soureArr) {
        var self = this;
        var _loop_1 = function (i) {
            var img = new eui.Image();
            img.source = soureArr[i];
            img.x = 261 + i * 63;
            img.y = 200;
            self.addChild(img);
            img.visible = false;
            var tween = egret.Tween.get(img);
            tween.wait(130 * i).to({ visible: true }, 1).to({
                x: 326,
                y: 730
            }, 900).call(function () {
                self.removeChild(img);
            });
        };
        for (var i = 0; i < 3; i++) {
            _loop_1(i);
        }
    };
    UIView2.prototype.lilianGetRankSuccess = function (soure) {
        var self = this;
        var img = new eui.Image();
        img.source = soure;
        img.x = 260;
        img.y = 100;
        this.addChild(img);
        var tween = egret.Tween.get(img);
        tween.to({ x: 326, y: 730 }, 1000).call(function () {
            self.removeChild(img);
        });
    };
    UIView2.prototype.runItem = function () {
        var data = UserTask.ins().taskTrace;
        var awardList = UserTask.ins().getAchieveConfById(data.id).awardList;
        this.runStrat(awardList, 0);
    };
    UIView2.prototype.runStrat = function (awardList, index) {
        var _this = this;
        var str = "";
        if (awardList[index].type == 0) {
            switch (awardList[index].id) {
                case MoneyConst.exp:
                    str = "";
                    break;
                case MoneyConst.gold:
                    str = "icgoods117_png";
                    break;
                case MoneyConst.yuanbao:
                    str = "icgoods121_png";
                    break;
            }
        }
        else {
            str = "" + awardList[index].id + "_png";
        }
        this.taskItemImg.visible = true;
        this.taskItemImg.source = str;
        var self = this;
        if (!this.tweenTaskObj) {
            this.tweenTaskObj = {
                get factor() {
                    return 0;
                },
                set factor(value) {
                    self.taskItemImg.x = (1 - value) * (1 - value) * 250 + 2 * value * (1 - value) * 380 + value * value * 426;
                    self.taskItemImg.y = (1 - value) * (1 - value) * 730 + 2 * value * (1 - value) * 630 + value * value * 820;
                }
            };
        }
        egret.Tween.removeTweens(this.tweenTaskObj);
        var t = egret.Tween.get(this.tweenTaskObj);
        t.to({ factor: 1 }, 400).call(function () {
            _this.taskItemImg.visible = false;
            if (awardList.length > (++index)) {
                var roleData = SubRoles.ins().getSubRoleByIndex(0);
                if (awardList[index].job) {
                    if (awardList[index].job == roleData.job) {
                        _this.runStrat(awardList, index);
                    }
                }
                else {
                    _this.runStrat(awardList, index);
                }
            }
        }, this);
    };
    UIView2.prototype.setBagTips = function (result) {
        if (!this.bagBtn.visible) {
            this.groupBagTips.visible = false;
            return;
        }
        this.groupBagTips.visible = result > 0;
        if (result) {
            if (result == 2) {
                this.tipsText.text = "\u6709\u88C5\u5907\u53EF\u4EE5\u7194\u70BC";
            }
            else {
                this.tipsText.text = "\u80CC\u5305\u5C06\u6EE1\uFF0C\u8BF7\u7194\u70BC";
            }
        }
    };
    UIView2.prototype.setIsExitUsedItem = function (result) {
        this.isExitUsedItem = UserBag.ins().getIsExitUsedItem();
        this.setRedPiont();
    };
    UIView2.prototype.setRedPiont = function (b) {
        if (b) {
            this.bagBtn['redPoint'].visible = b;
            return;
        }
        if (this.isExitUsedItem || this.isItemCountChange || UserBag.ins().getBagGoodsCountByType(8) || UserBag.ins().getBagGoodsCountByType(12)
            || UserBag.ins().getRuneBagGoodsCountByType(8) || (MergeCC.ins().isOpen() && MergeCC.ins().redPoint())) {
            this.bagBtn['redPoint'].visible = true;
        }
        else {
            this.bagBtn['redPoint'].visible = false;
        }
    };
    UIView2.prototype.resetHejiCd = function () {
        this.reset();
        DisplayUtils.removeFromParent(this.hjMc);
        this._shap.graphics.clear();
        if (!TimerManager.ins().isExists(this.showAni, this))
            TimerManager.ins().doTimer(500, 0, this.showAni, this);
        this.drawProgress(0);
    };
    UIView2.prototype.reset = function () {
        this._curAngle = 0;
        this._toAngle = 0;
        this._oldAngle = 360;
        UserSkill.ins().hejiEnable = false;
        UserSkill.ins().fieldUse = false;
        this.radius = this.powerGroup.width >> 1;
    };
    UIView2.prototype.showAni = function () {
        var skill = UserSkill.ins().getHejiSkillId();
        var cdPercent = 1 - (UserSkill.ins().hejiCD - GameServer.serverTime) / (skill.cd - UserSkill.ins().reduceCD);
        var count = 360 * cdPercent;
        this.drawProgress(count);
    };
    UIView2.prototype.drawProgress = function (toPos, isTween) {
        if (isTween === void 0) { isTween = true; }
        if (toPos > 360) {
            toPos = 360;
        }
        if (toPos < 0)
            toPos = 0;
        if (toPos == 0 || this.curAngle == 360) {
            if (this.curAngle == 360) {
                UserSkill.ins().hejiEnable = true;
                this.addAutoUse();
                this.addPowerEff();
            }
            egret.Tween.removeTweens(this);
            return;
        }
        this.removeAutoUse();
        this._toAngle = toPos;
        this._shap.x = this._shap.y = this.radius;
        this._shap.rotation = -90;
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).to({ curAngle: this._toAngle }, 500).call(function () {
            if (this.curAngle == 360) {
                UserSkill.ins().hejiEnable = true;
                this.addAutoUse();
            }
        }, this);
    };
    UIView2.prototype.addPowerEff = function () {
        this.hjMc.playFile(RES_DIR_EFF + "hejibtn", -1);
        if (this.hjMc && this.hjMc.parent)
            return;
        this.powerGroup.addChild(this.hjMc);
        this.powerGuilderEff();
    };
    UIView2.prototype.powerGuilderEff = function () {
        if (UserFb.ins().guanqiaID > 16) {
            this.cleanPowerGuilderEff();
            return;
        }
        if (!UserFb.ins().pkGqboss) {
            this.cleanPowerGuilderEff();
            return;
        }
        if (!this.arrow) {
            this.arrow = new GuideArrow;
            this.arrow.touchEnabled = false;
            this.arrow.lab.text = "点击释放合击";
            this.powerGroup.addChild(this.arrow);
            this.arrow.x = 0;
            this.arrow.y = this.powerGroup.height / 2;
            if (!this.eff) {
                this.eff = new MovieClip;
                this.eff.playFile(RES_DIR_EFF + "guideff", -1);
                this.powerGroup.addChild(this.eff);
                this.eff.x = this.powerGroup.width / 2;
                this.eff.y = this.powerGroup.height / 2;
            }
            var self_1 = this;
            egret.Tween.get(this.arrow, { loop: true }).to({ x: this.arrow.x + 40 }, 1000).to({ x: this.arrow.x }, 1000);
            egret.Tween.get(this.powerGroup, { loop: false }).wait(5000).call(function () {
                self_1.cleanPowerGuilderEff();
            });
        }
    };
    UIView2.prototype.cleanPowerGuilderEff = function () {
        if (this.arrow)
            egret.Tween.removeTweens(this.arrow);
        if (this.eff)
            egret.Tween.removeTweens(this.eff);
        DisplayUtils.removeFromParent(this.arrow);
        DisplayUtils.removeFromParent(this.eff);
        this.removeAutoUse();
        this.arrow = null;
        this.eff = null;
    };
    UIView2.prototype.addAutoUse = function () {
        if (UserSkill.ins().hejiEnable && this.checkIsAutoUse()) {
            if (!TimerManager.ins().isExists(this.autoUseHeji, this)) {
                TimerManager.ins().doTimer(400, 0, this.autoUseHeji, this);
            }
        }
    };
    UIView2.prototype.checkIsAutoUse = function () {
        var handle = GameLogic.ins().currHandle;
        var entity = EntityManager.ins().getEntityByHandle(handle);
        return GameMap.autoPunch() && entity && entity.infoModel.type != EntityType.CollectionMonst && Setting.ins().getValue(ClientSet.autoHeji) ||
            SysSetting.ins().getBool(SysSetting.AUTO_HEJI) &&
                (GameMap.fbType != UserFb.FB_TYPE_HOMEBOSS &&
                    GameMap.fbType != UserFb.FB_TYPE_NEW_WORLD_BOSS &&
                    GameMap.fbType != UserFb.FB_TYPE_ALLHUMENBOSS &&
                    GameMap.fbType != UserFb.FB_TYPE_ZHUANSHENGBOSS &&
                    GameMap.fbType != UserFb.FB_TYPE_GUILD_WAR &&
                    GameMap.fbType != UserFb.FB_TYPE_PEAKED &&
                    GameMap.fbType != UserFb.FB_TYPE_KF_BOSS &&
                    !CityCC.ins().isCity && !BattleCC.ins().isBattle() && !PaoDianCC.ins().isPaoDian &&
                    !GwBoss.ins().isGwBoss && !GwBoss.ins().isGwTopBoss && !DarkMjBoss.ins().isDarkBoss);
    };
    UIView2.prototype.removeAutoUse = function () {
        TimerManager.ins().remove(this.autoUseHeji, this);
    };
    UIView2.prototype.autoUseHeji = function () {
        this.useHejiSkill();
    };
    Object.defineProperty(UIView2.prototype, "curAngle", {
        get: function () {
            return this._curAngle;
        },
        set: function (value) {
            this._curAngle = value;
            DisplayUtils.drawCir(this._shap, this.radius, this._curAngle);
        },
        enumerable: true,
        configurable: true
    });
    UIView2.prototype.jingMaiCanUp = function () {
        var data;
        for (var i in SubRoles.ins().roles) {
            data = SubRoles.ins().roles[i].jingMaiData;
            if (data.jingMaiCanUp()) {
                var openLevel = GlobalConfig.JingMaiCommonConfig.openLevel;
                if (Actor.level >= openLevel)
                    return true;
            }
        }
        return false;
    };
    UIView2.prototype.getToggleBtn = function (index) {
        this.validateNow();
        return this.navBtn[index];
    };
    UIView2.prototype.lilianRewardFlash = function (source) {
        var self = this;
        var len = source.length;
        var _loop_2 = function (i) {
            var img = new eui.Image();
            img.source = source[i];
            img.x = 74 + i * 91;
            img.y = 260;
            self.addChild(img);
            img.visible = false;
            img.scaleX = img.scaleY = 1;
            var tween = egret.Tween.get(img);
            tween.wait(130 * i).to({ visible: true }, 1).to({
                x: 441,
                y: 872,
                scaleX: 0.6,
                scaleY: 0.6
            }, 900).call(function () {
                self.removeChild(img);
            });
        };
        for (var i = 0; i < len; i++) {
            _loop_2(i);
        }
    };
    UIView2.prototype.startUpdateRedPoint = function () {
        if (!TimerManager.ins().isExists(this.updateRedPoint, this))
            TimerManager.ins().doTimer(50, 1, this.updateRedPoint, this);
    };
    UIView2.prototype.updateRedPoint = function () {
        var b = false;
        if (UserFb.ins().guanqiaID > 2 && (this.and(UserSkill.ins().canGrewupSkill()) || NeiGongModel.ins().canUp() || this.jingMaiCanUp()))
            b = true;
        if (!b)
            b = UserMiji.ins().isMjiSum();
        if (!b)
            b = ZhanLing.ins().checkRedPoint();
        this.furnaceBtn['redPoint'].visible = b;
    };
    UIView2.prototype.and = function (list) {
        for (var k in list) {
            if (list[k] == true)
                return true;
        }
        return false;
    };
    UIView2.prototype.getBagBtn = function () {
        return this.bagBtn;
    };
    UIView2.prototype.flyGQBossExpToBar = function (_a) {
        var _this = this;
        var target = _a[0], value = _a[1];
        if (GameMap.fbType || value > 0)
            return;
        var movieExp = new eui.Image();
        movieExp.source = "point2";
        movieExp.anchorOffsetX = 20;
        movieExp.anchorOffsetY = 20;
        movieExp.x = 100;
        movieExp.y = 100;
        this.addChild(movieExp);
        var _x = Math.ceil(StageUtils.ins().getWidth() / 2);
        var _y = Math.ceil(StageUtils.ins().getHeight()) + 60;
        var t = egret.Tween.get(movieExp);
        t.to({ x: _x, y: _y, alpha: 0.5 }, 800).call(function () {
            _this.removeChild(movieExp);
            egret.Tween.removeTweens(movieExp);
        }, this);
        var tt = egret.Tween.get(movieExp, { "loop": true });
        tt.to({ "rotation": movieExp.rotation + 360 }, 800);
    };
    UIView2.prototype.flyExpToBar = function (_a) {
        var _this = this;
        var from = _a[0], count = _a[1], delay = _a[2];
        var point = this.globalToLocal(from.x, from.y);
        var _x = this.expBar.x + this.expBar.width / 2;
        var _y = this.expBar.y;
        var endPoint = new egret.Point(_x, _y);
        var _loop_3 = function (i) {
            var center = egret.Point.interpolate(point, endPoint, MathUtils.limit(0.2, 0.8));
            center.x += MathUtils.limitInteger(-100, 100);
            center.y += MathUtils.limitInteger(-100, 100);
            var movieExp = new eui.Image();
            movieExp.source = "point2";
            movieExp.anchorOffsetX = 20;
            movieExp.anchorOffsetY = 20;
            movieExp.x = point.x;
            movieExp.y = point.y;
            this_1.addChild(movieExp);
            var bezier = Bezier.pop(point, endPoint);
            bezier.display = movieExp;
            bezier.centerPoint = center;
            bezier.start(1000, function () {
                Bezier.push(bezier);
                _this.removeChild(movieExp);
                egret.Tween.removeTweens(movieExp);
                if (!i)
                    _this.expChange(0, true);
            }, this_1, i * delay);
            egret.Tween.get(movieExp).to({ alpha: 0.5 }, 1000);
            var tt = egret.Tween.get(movieExp, { "loop": true });
            tt.to({ "rotation": movieExp.rotation + 360 }, 500);
        };
        var this_1 = this;
        for (var i = 0; i < count; i++) {
            _loop_3(i);
        }
    };
    UIView2.prototype.flyItemToBag = function (_a) {
        var item = _a.item, gp = _a.gp;
        if (!ViewManager.ins().hasTopView())
            return;
        var p = this.bagBtn.parent.localToGlobal(this.bagBtn.x + this.bagBtn.width / 2, this.bagBtn.y + this.bagBtn.height / 2);
        item.reset();
        item.setItemParent(this);
        item.x = gp.x;
        item.y = gp.y;
        egret.Tween.get(item).to({ x: p.x, y: p.y }, 1700, egret.Ease.sineOut).call(function () {
            DisplayUtils.removeFromParent(item);
            item.destruct();
            ObjectPool.push(item);
        });
    };
    UIView2.prototype.flyItemToBagEx = function (item) {
        if (item.parent) {
            var p1 = item.parent.localToGlobal(item.x, item.y);
            var p2 = this.bagBtn.parent.localToGlobal(this.bagBtn.x + this.bagBtn.width / 2 - item.width / 4, this.bagBtn.y + this.bagBtn.height / 2 - item.width / 4);
            DisplayUtils.removeFromParent(item);
            item.x = p1.x;
            item.y = p1.y;
            this.addChild(item);
            egret.Tween.get(item).to({ x: p2.x, y: p2.y }, 1700, egret.Ease.sineOut).call(function () {
                DisplayUtils.removeFromParent(item);
            });
        }
        else {
            DisplayUtils.removeFromParent(item);
        }
    };
    UIView2.prototype.playUIEff = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    UIView2.prototype.isHideNavBtn = function (boo) {
        for (var _i = 0, _a = this.navBtn; _i < _a.length; _i++) {
            var btn = _a[_i];
            btn.visible = boo;
        }
        this.expBar.visible = boo;
    };
    UIView2.NAV_ROLE = 0;
    UIView2.NAV_SKILL = 1;
    UIView2.NAV_LILIAN = 2;
    UIView2.NAV_SMITH = 3;
    UIView2.NAV_BAG = 4;
    __decorate([
        callLater
    ], UIView2.prototype, "setLilianRedPoint", null);
    __decorate([
        callLater
    ], UIView2.prototype, "updateHp", null);
    return UIView2;
}(BaseEuiView));
__reflect(UIView2.prototype, "UIView2");
ViewManager.ins().reg(UIView2, LayerManager.UI_Popup);
//# sourceMappingURL=UIView2.js.map