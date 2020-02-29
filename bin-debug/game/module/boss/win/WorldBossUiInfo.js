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
var WorldBossUiInfo = (function (_super) {
    __extends(WorldBossUiInfo, _super);
    function WorldBossUiInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.GRAYIMG_WIDTH = 0;
        _this._curMonsterID = 0;
        _this.lastWeixieList = [];
        _this.isDelayUpdate = false;
        _this.curValue = 1;
        return _this;
    }
    WorldBossUiInfo.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "WorldBossUiSkin";
        this.clickEffc = new MovieClip;
        this.clickEffc.x = 630;
        this.clickEffc.y = 269;
        this.pointEff = new MovieClip;
        this.pointEff.x = 110;
        this.pointEff.y = 510;
        this.list1.itemRenderer = WorldBossHeadRender;
        this.list2.itemRenderer = WorldBossHeadRender;
        this.bloodBar.slideDuration = 0;
        this.bloodBar0.labelFunction = function (value, maximum) {
            return '';
        };
        this.grayImg.source = "bosshp2";
        this.grayImgMask = new egret.Rectangle(0, 0, this.grayImg.width, this.grayImg.height);
        this.grayImg.mask = this.grayImgMask;
        this.GRAYIMG_WIDTH = this.grayImg.width;
        this.observe(UserBoss.ins().postHasAttackChange, this.refushWeixieList);
        this.observe(UserBoss.ins().postCanplayChange, this.refushcanPlayList);
        this.observe(UserBoss.ins().postHpChange, this.reflashBlood);
        this.observe(UserBoss.ins().postShieldPer, this.huDunChange);
        this.observe(UserBoss.ins().postRemainTime, this.reliveInfoChange);
        this.observe(UserBoss.ins().postWorldBossEndTime, this.worldBossEnd);
        this.observe(GameLogic.ins().postChangeTarget, this.refushcanPlayList);
        this.list2.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.list2Tap, this);
        this.addTouchEvent(this.btn, this.onTap);
        this.addTouchEvent(this.attackBoss, this.onTap);
        this.addTouchEvent(this.attackPlayer, this.onTap);
        this.addTouchEvent(this.belongGroup, this.onTap);
        this.addTouchEvent(this.tipBtn, this.onTap);
        this.addTouchEvent(this.attguishu, this.onTap);
        TimerManager.ins().remove(this.reflashAtkInfo, this);
        TimerManager.ins().doTimer(200, 0, this.reflashAtkInfo, this);
    };
    WorldBossUiInfo.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.hudun.visible = false;
        this.visible = true;
        this.attList.visible = this.attackBtnGroup.visible = (true && UserBoss.ins().winner == "");
        this.updateBaseInfo();
        this.refushShowInfo();
        this.reflashAtkInfo();
        this.refushWeixieList();
        this.refushcanPlayList();
        this.reflashBlood();
    };
    WorldBossUiInfo.prototype.updateBaseInfo = function () {
        this.bossConfig = GlobalConfig.MonstersConfig[UserBoss.ins().monsterID];
        if (!this.bossConfig) {
            return;
        }
        this._curMonsterID = UserBoss.ins().monsterID;
        this.nameTxt.text = this.bossConfig.name;
        this.head.source = "monhead" + this.bossConfig.head + "_png";
        this.lvTxt.text = "Lv." + this.bossConfig.level;
    };
    WorldBossUiInfo.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        DisplayUtils.removeFromParent(this.clickEffc);
        DisplayUtils.removeFromParent(this.nextEff);
        DisplayUtils.removeFromParent(this.pointEff);
        this.list2.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.list2Tap, this);
        this.clearRendererItem();
        this._curMonsterID = 0;
    };
    WorldBossUiInfo.prototype.refushShowInfo = function () {
        this.leftTimeGroup.visible = false;
        this.lastTime.text = DateUtils.getFormatTimeByStyle(GuildWar.ins().getModel().acEndTime, DateUtils.STYLE_4);
        if (!TimerManager.ins().isExists(this.showInfoTime, this))
            TimerManager.ins().doTimer(1000, GuildWar.ins().getModel().acEndTime, this.showInfoTime, this);
    };
    WorldBossUiInfo.prototype.showInfoTime = function () {
        this.lastTime.text = DateUtils.getFormatTimeByStyle(GuildWar.ins().getModel().acEndTime, DateUtils.STYLE_4);
    };
    WorldBossUiInfo.prototype.reflashAtkInfo = function () {
        var roleList = EntityManager.ins().getMasterList(EntityManager.ins().getRootMasterHandle(UserBoss.ins().attHandle));
        if (roleList && roleList.length > 0) {
            var len = roleList.length;
            var hpValue = 0;
            var hpTotal = 0;
            var neigongValue = 0;
            var neigongTotal = 0;
            var mainRoleInfo = void 0;
            for (var i = 0; i < len; i++) {
                var role = roleList[i];
                if (role instanceof CharRole) {
                    var curHp = role.infoModel.getAtt(AttributeType.atHp) || 0;
                    var maxHp = role.infoModel.getAtt(AttributeType.atMaxHp) || 0;
                    hpValue += curHp;
                    hpTotal += maxHp;
                    var curNeigong = role.infoModel.getAtt(AttributeType.cruNeiGong) || 0;
                    var maxNeigong = role.infoModel.getAtt(AttributeType.maxNeiGong) || 0;
                    neigongValue += curNeigong;
                    neigongTotal += maxNeigong;
                    if (!mainRoleInfo) {
                        mainRoleInfo = role.infoModel;
                    }
                }
            }
            this.belongGroup.visible = (hpValue > 0 && UserBoss.ins().winner == "");
            var color = Actor.handle != UserBoss.ins().attHandle ? ColorUtil.ROLENAME_COLOR_YELLOW : ColorUtil.ROLENAME_COLOR_GREEN;
            var tname = mainRoleInfo.name;
            var strlist = tname.split("\n");
            if (strlist[1])
                tname = strlist[1];
            else
                tname = strlist[0];
            tname = StringUtils.replaceStr(tname, "0xffffff", color + "");
            this.belongNameTxt.textFlow = TextFlowMaker.generateTextFlow("|C:" + color + "&T:" + tname);
            this.roleHead.source = "yuanhead" + mainRoleInfo.job + mainRoleInfo.sex;
            this.bloodBar0.maximum = hpTotal;
            this.bloodBar0.value = hpValue;
            this.neigongBar0.maximum = neigongTotal;
            this.neigongBar0.value = neigongValue;
        }
        else {
            this.belongGroup.visible = false;
        }
    };
    WorldBossUiInfo.prototype.refushWeixieList = function () {
        if (!this.isDelayUpdate) {
            this.isDelayUpdate = true;
            TimerManager.ins().doTimer(500, 1, this.updateWeixieList, this);
        }
    };
    WorldBossUiInfo.prototype.updateWeixieList = function () {
        this.isDelayUpdate = false;
        if (UserBoss.ins().weixieList.length > this.lastWeixieList.length) {
            this.showAttGroupEff();
        }
        var cartList = this.getWeixieList();
        if (!this.list2.dataProvider) {
            this.list2.dataProvider = new eui.ArrayCollection(cartList);
        }
        else {
            var dataPro = this.list2.dataProvider;
            dataPro.replaceAll(cartList);
        }
        this.lastWeixieList = UserBoss.ins().weixieList.slice();
        if (!this.list1.dataProvider) {
            this.list1.dataProvider = new eui.ArrayCollection([GameLogic.ins().currAttackHandle]);
        }
        else {
            var dataPro = this.list1.dataProvider;
            dataPro.replaceAll([GameLogic.ins().currAttackHandle]);
        }
        this.checkListVis();
        if (UserBoss.ins().weixieList.length) {
            this.checkGuide();
        }
    };
    WorldBossUiInfo.prototype.getWeixieList = function () {
        var list = UserBoss.ins().weixieList;
        var charList = [];
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var handle = list_1[_i];
            var masterList = EntityManager.ins().getMasterList(handle);
            var char = void 0;
            if (masterList && masterList.length) {
                for (var _a = 0, masterList_1 = masterList; _a < masterList_1.length; _a++) {
                    var monster = masterList_1[_a];
                    if (monster instanceof CharRole) {
                        char = monster;
                        break;
                    }
                }
                if (!char)
                    char = masterList[0];
            }
            else {
                char = EntityManager.ins().getEntityByHandle(handle);
            }
            if (char)
                charList.push(char);
        }
        return charList;
    };
    WorldBossUiInfo.prototype.showAttGroupEff = function () {
        var _this = this;
        if (!this.attEffectGroup.visible) {
            this.attEffectGroup.touchEnabled = false;
            this.attEffectGroup.visible = true;
            var t = egret.Tween.get(this.attEffectGroup);
            t.to({ "alpha": 1 }, 500).to({ "alpha": 0 }, 500).to({ "alpha": 1 }, 500).to({ "alpha": 0 }, 500).call(function () {
                _this.attEffectGroup.visible = false;
            }, this);
        }
    };
    WorldBossUiInfo.prototype.refushcanPlayList = function () {
        this.reflashAtkInfo();
        this.checkListVis();
        this.refushWeixieList();
    };
    WorldBossUiInfo.prototype.checkListVis = function () {
        var role = EntityManager.ins().getNoDieRole();
        var bool = ((role && role.infoModel.getAtt(AttributeType.atHp) > 0) && UserBoss.ins().winner == "");
        this.beAttackGroup.visible = UserBoss.ins().weixieList.length > 0 && bool;
        this.attackGroup.visible = bool;
        this.setBtnState(bool);
    };
    WorldBossUiInfo.prototype.checkGuide = function () {
        if (UserFb.ins().guideBossKill == 1) {
            GuideUtils.ins().updateByAppear();
        }
    };
    WorldBossUiInfo.prototype.setBtnState = function (bool) {
        this.attguishu.visible = true;
        if (!bool) {
            this.attackPlayer.currentState = "attgsup";
            this.attackBoss.currentState = "attbossup";
            return;
        }
        if (UserBoss.ins().attHandle == Actor.handle) {
            this.attackPlayer.currentState = "attgsdis";
            this.attguishu.visible = false;
        }
        else {
            if (GameLogic.ins().currAttackHandle) {
                this.attackPlayer.currentState = "attgsing";
            }
            else {
                this.attackPlayer.currentState = "attgsup";
            }
        }
        if (GameLogic.ins().currAttackHandle || this.attackPlayer.currentState == "attgsing") {
            this.attackBoss.currentState = "attbossup";
        }
        else {
            this.attackBoss.currentState = "attbossing";
        }
    };
    WorldBossUiInfo.prototype.onBegin = function (e) {
        switch (e.currentTarget) {
            case this.attackPlayer:
                this.attackPlayer.scaleX = this.attackPlayer.scaleY = 0.8;
                break;
            case this.attackBoss:
                this.attackBoss.scaleX = this.attackBoss.scaleY = 0.8;
                break;
        }
    };
    WorldBossUiInfo.prototype.onEnd = function (e) {
        switch (e.currentTarget) {
            case this.attackPlayer:
                this.attackPlayer.scaleX = this.attackPlayer.scaleY = 1;
                break;
            case this.attackBoss:
                this.attackBoss.scaleX = this.attackBoss.scaleY = 1;
                break;
            default:
                this.attackPlayer.scaleX = this.attackPlayer.scaleY = 1;
                this.attackBoss.scaleX = this.attackBoss.scaleY = 1;
                break;
        }
    };
    WorldBossUiInfo.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.btn:
                if (this.btn.currentState == "down") {
                    this.list1.dataProvider = new eui.ArrayCollection([]);
                }
                else {
                    this.refushcanPlayList();
                }
                break;
            case this.attackBoss:
                if (GameLogic.ins().currAttackHandle == 0) {
                    return;
                }
                this.clearRendererItem();
                GameLogic.ins().postChangeAttrPoint(0);
                break;
            case this.attackPlayer:
            case this.belongGroup:
                if (UserBoss.ins().attHandle == Actor.handle || UserBoss.ins().attHandle == GameLogic.ins().currAttackHandle) {
                    return;
                }
                if (!this.list1 || this.list1.dataProvider.length <= 0)
                    return;
                if (!UserBoss.ins().canClick) {
                    return;
                }
                this.clearRendererItem();
                if (GameMap.fbType == UserFb.FB_TYPE_GUIDEBOSS) {
                    UserFb.ins().sendGuideFbAttacker();
                }
                else {
                    GameLogic.ins().postChangeAttrPoint(UserBoss.ins().attHandle);
                }
                break;
            case this.tipBtn:
                if (GameMap.fbType == UserFb.FB_TYPE_ZHUANSHENGBOSS) {
                    ViewManager.ins().open(WorldBossJiangliTipWin);
                }
                else {
                    ViewManager.ins().open(PublicBossJiangliTipWin);
                }
                break;
            case this.attguishu:
                UserTips.ins().showTips("正在攻击归属者！");
                break;
        }
    };
    WorldBossUiInfo.prototype.list2Tap = function (e) {
        if (!UserBoss.ins().canClick || UserBoss.ins().attHandle == GameLogic.ins().currAttackHandle) {
            return;
        }
        var item = this.list2.getChildAt(e.itemIndex);
        if (!item)
            return;
        this.clearRendererItem();
        item.addAttEffect();
        var attHandle = item.data;
        if (item.data instanceof CharMonster) {
            attHandle = item.data.infoModel.masterHandle;
        }
        if (GameMap.fbType == UserFb.FB_TYPE_GUIDEBOSS) {
            UserFb.ins().sendGuideFbAttacker();
        }
        else {
            GameLogic.ins().postChangeAttrPoint(attHandle);
        }
        if (!(UserBoss.ins().attHandle == attHandle))
            EntityShowMgr.ins().showHideSomeOne(attHandle);
    };
    WorldBossUiInfo.prototype.clearRendererItem = function () {
        var len = this.list1.numChildren;
        for (var index = 0; index < len; index++) {
            var item = this.list1.getChildAt(index);
            item.clearEffect();
        }
        len = this.list2.numChildren;
        for (var index = 0; index < len; index++) {
            var item = this.list2.getChildAt(index);
            item.clearEffect();
        }
    };
    WorldBossUiInfo.prototype.reflashBlood = function () {
        if (this._curMonsterID != UserBoss.ins().monsterID) {
            this.updateBaseInfo();
        }
        this.bossConfig = GlobalConfig.MonstersConfig[UserBoss.ins().monsterID];
        if (!this.bossConfig) {
            this.bossBloodGroup.visible = false;
            this.checkListVis();
            return;
        }
        var charm = EntityManager.ins().getEntityByHandle(UserBoss.ins().bossHandler);
        if (!charm || !charm.infoModel) {
            this.bossBloodGroup.visible = false;
            this.checkListVis();
            return;
        }
        var monstermodel = charm ? charm.infoModel : null;
        if (monstermodel) {
            this.bloodBar.maximum = monstermodel.getAtt(AttributeType.atMaxHp);
            this.bloodBar.value = monstermodel.getAtt(AttributeType.atHp);
            this.bossBloodGroup.visible = this.bloodBar.value > 0;
        }
        else {
            this.bloodBar.maximum = this.bossConfig.hp;
            this.bloodBar.value = this.bossConfig.hp;
            this.bossBloodGroup.visible = this.bloodBar.value > 0;
        }
        this.curValue = Math.floor(this.bloodBar.value / this.bloodBar.maximum * 100);
        this.tweenBlood();
    };
    WorldBossUiInfo.prototype.huDunChange = function () {
        if (UserBoss.ins().shieldType) {
            if (UserBoss.ins().curShield > 0) {
                if (!TimerManager.ins().isExists(this.setTimeShieldChange, this))
                    TimerManager.ins().doTimer(1000, 0, this.setTimeShieldChange, this);
                this.setTimeShieldChange();
            }
        }
        else {
            this.setHpShieldChange();
        }
    };
    WorldBossUiInfo.prototype.setHpShieldChange = function () {
        if (UserBoss.ins().curShield && UserBoss.ins().curShield > 0) {
            this.hudun.visible = true;
            var value = Math.ceil(UserBoss.ins().curShield / UserBoss.ins().totalShield * 100);
            this.hudunbloodBar.value = value;
        }
        else {
            this.hudun.visible = false;
        }
    };
    WorldBossUiInfo.prototype.setTimeShieldChange = function () {
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
    WorldBossUiInfo.prototype.worldBossEnd = function () {
        var _this = this;
        TimerManager.ins().remove(this.reflashAtkInfo, this);
        if (GameMap.fbType == UserFb.FB_TYPE_ZHUANSHENGBOSS) {
            this.endGroup.visible = true;
            this.winnerName.text = "\u6700\u7EC8\u5F52\u5C5E\u8005\u662F\uFF1A" + UserBoss.ins().winner;
            var time_1 = Math.ceil((UserBoss.ins().worldBossEndTime - egret.getTimer()) / 1000);
            this.leftTime.text = DateUtils.getFormatTimeByStyle(time_1, DateUtils.STYLE_4);
            TimerManager.ins().doTimer(1000, time_1, function () {
                time_1--;
                _this.leftTime.text = DateUtils.getFormatTimeByStyle(time_1, DateUtils.STYLE_4);
                if (time_1 == 0) {
                    UserFb.ins().sendExitFb();
                }
            }, this);
        }
        this.attList.visible = this.attackBtnGroup.visible = this.attackPlayer.visible = this.attackBoss.visible = false;
    };
    WorldBossUiInfo.prototype.reliveInfoChange = function () {
        if (UserBoss.ins().reliveTime > 0) {
            ViewManager.ins().open(WorldBossBeKillWin);
        }
        else {
            ViewManager.ins().close(WorldBossBeKillWin);
        }
        this.refushWeixieList();
    };
    WorldBossUiInfo.prototype.tweenBlood = function () {
        var _this = this;
        var bloodPer = (this.curValue * this.GRAYIMG_WIDTH) / 100;
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
                self.grayImgMask.width = this.GRAYIMG_WIDTH;
                egret.Tween.removeTweens(this.grayImgMask);
            }
        }, self);
    };
    return WorldBossUiInfo;
}(BaseEuiView));
__reflect(WorldBossUiInfo.prototype, "WorldBossUiInfo");
ViewManager.ins().reg(WorldBossUiInfo, LayerManager.UI_Main);
//# sourceMappingURL=WorldBossUiInfo.js.map