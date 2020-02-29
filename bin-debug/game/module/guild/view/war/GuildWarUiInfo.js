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
var GuildWarUiInfo = (function (_super) {
    __extends(GuildWarUiInfo, _super);
    function GuildWarUiInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GuildWarUiInfo.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "GuildWarUiSkin";
        this.clickEffc = new MovieClip;
        this.pointEff = new MovieClip;
        this.pointEff.x = 61;
        this.pointEff.y = 34;
        this.list1.itemRenderer = GuildWarMemberHeadRender;
        this.list2.itemRenderer = GuildWarMemberHeadRender;
        this.sceneBar.maximum = 300;
        this.sceneBar.labelFunction = function () {
            return "";
        };
        this.bloodBar1.slideDuration = 0;
        this.bloodBar.labelDisplay.visible = false;
    };
    GuildWarUiInfo.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.Nextchengnei, this.onTap);
        this.addTouchEvent(this.Nextchengnei0, this.onTap);
        this.addTouchEvent(this.Nextdianqian, this.onTap);
        this.addTouchEvent(this.Nexthuanggong, this.onTap);
        this.observe(GameLogic.ins().postEnterMap, this.refushShowInfo);
        this.observe(GuildWar.ins().postPointUpdate, this.refushPoint);
        this.observe(GuildWar.ins().postPointRewardChange, this.refushPointReward);
        this.addTouchEvent(this.seeRank, this.onTap);
        this.observe(GuildWar.ins().postCityownChange, this.cityOwnChange);
        this.addTouchEvent(this.seeMyGuild, this.onTap);
        this.observe(GuildWar.ins().postWeixieChange, this.refushWeixieList);
        this.observe(GuildWar.ins().postCanplayChange, this.refushcanPlayList);
        this.addTouchEvent(this.list1, this.listTap);
        this.addTouchEvent(this.list2, this.listTap);
        this.addTouchEvent(this.btn, this.onTap);
        this.addTouchEvent(this.palaceFlag, this.onTap);
        this.addTouchEvent(this.help, this.onTap);
        this.addTouchEvent(this.mon, this.onTap);
        this.addTouchEvent(this.guid2, this.onTap);
        this.addTouchEvent(this.taskTraceBtn, this.onTap);
        this.observe(GuildWar.ins().postFlagInfoChange, this.refushFlagStatu);
        this.observe(GuildWar.ins().postHudunInfo, this.hudunChange);
        this.observe(GuildWar.ins().postRankListChange, this.rankListChange);
        this.observe(GuildWar.ins().postGuildNumChange, this.refushGuildNum);
        this.observe(GuildWar.ins().postJoinPlayBack, this.doorStatuChange);
        this.observe(GuildWar.ins().postKillHuman, this.showSkill);
        this.observe(GameLogic.ins().postEntityHpChange, this.updateHP);
        this.observe(GameLogic.ins().postChangeTarget, this.updateTarget);
        this.addTouchEvent(this.ruleDesc, this.onTap);
        this.belongGroup.visible = false;
        this.ruleDesc.textFlow = new egret.HtmlTextParser().parser("<u>玩法说明</u>");
        this.refushShowInfo();
        this.refushPoint();
        this.cityOwnChange();
        this.refushWeixieList();
        this.refushcanPlayList();
        this.rankListChange();
        this.doorStatuChange();
        this.refushFlagStatu();
        this.refushGuildNum();
    };
    GuildWarUiInfo.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (ViewManager.ins().isShow(GuileWarReliveWin)) {
            ViewManager.ins().close(GuileWarReliveWin);
        }
        if (ViewManager.ins().isShow(TargetPlayerBigBloodPanel)) {
            ViewManager.ins().close(TargetPlayerBigBloodPanel);
        }
        this.currAttackHandle = 0;
        TimerManager.ins().removeAll(this);
        DisplayUtils.removeFromParent(this.clickEffc);
        DisplayUtils.removeFromParent(this.pointEff);
        this.clearRendererItem();
    };
    GuildWarUiInfo.prototype.refushShowInfo = function () {
        var _this = this;
        this.gongxun.visible = GuildWar.ins().getModel().checkinAppoint(2);
        this.mon.visible = GuildWar.ins().getModel().checkinAppoint(2);
        this.bar1.y = this.mon.visible ? 99 : 30;
        this.flagGroup.visible = GuildWar.ins().getModel().checkinAppoint(4);
        this.flag.visible = GuildWar.ins().getModel().checkinAppoint(4);
        this.flag.y = 103;
        this.scene.text = GuildWar.ins().getModel().getNextMapName(0);
        this.guid.visible = (GuildWar.ins().getModel().checkinAppoint(2) && GuildWar.ins().getModel().getIntoNextMapGongxun() > GuildWar.ins().getModel().gongXun);
        if (this.guid.visible) {
            this.clickEffc.playFile(RES_DIR_EFF + "tapCircle");
            this.clickEffc.x = this.guid.x - 23;
            this.clickEffc.y = this.guid.y + this.guid.height / 2 - 5;
            this.addChild(this.clickEffc);
        }
        else {
            DisplayUtils.removeFromParent(this.clickEffc);
        }
        var cruInfo = GuildWar.ins().getModel().getMapLevelInfo();
        this.sceneBar.value = (cruInfo.id - 1) * 100;
        this.weijihuo1.visible = !(cruInfo.id >= 1);
        this.jihuo1.visible = cruInfo.id >= 1;
        this.weijihuo2.visible = !(cruInfo.id >= 2);
        this.jihuo2.visible = cruInfo.id >= 2;
        this.weijihuo3.visible = !(cruInfo.id >= 3);
        this.jihuo3.visible = cruInfo.id >= 3;
        this.hgweijihuo.visible = !(cruInfo.id >= 4);
        this.hgjh.visible = cruInfo.id >= 4;
        this.Nextdianqian.visible = false;
        this.Nextchengnei.visible = cruInfo.id == 1;
        this.Nexthuanggong.visible = cruInfo.id == 3;
        this.Nextchengnei0.visible = cruInfo.id == 3;
        if (cruInfo.id == 4) {
            this.Nextdianqian.visible = true;
        }
        this.lastTime.text = DateUtils.getFormatTimeByStyle(GuildWar.ins().getModel().acEndTime, DateUtils.STYLE_4);
        TimerManager.ins().doTimer(1000, GuildWar.ins().getModel().acEndTime, function () {
            _this.lastTime.text = DateUtils.getFormatTimeByStyle(GuildWar.ins().getModel().acEndTime, DateUtils.STYLE_4);
        }, this);
    };
    GuildWarUiInfo.prototype.refushGuildNum = function () {
        this.comNum.text = GuildWar.ins().getModel().guildNum + "人";
    };
    GuildWarUiInfo.prototype.refushPoint = function () {
        this.guildPoint.text = GuildWar.ins().getModel().guildPoint + "";
        this.ownPoint.text = GuildWar.ins().getModel().ownPoint + "";
        this.point.text = GuildWar.ins().getModel().gongXun + "/" + GuildWar.ins().getModel().getIntoNextMapGongxun();
        var cruInfo = GuildWar.ins().getModel().getMapLevelInfo();
        if (GuildWar.ins().getModel().gongXun >= GuildWar.ins().getModel().getIntoNextMapGongxun()) {
            if (cruInfo.id == 2) {
                this.Nextdianqian.visible = true;
                this.point.visible = false;
                this.gongxun.visible = false;
            }
        }
        else {
            if (cruInfo.id != 4) {
                this.Nextdianqian.visible = false;
                this.point.visible = true;
            }
        }
        this.refushPointReward();
        this.doorStatuChange();
    };
    GuildWarUiInfo.prototype.refushPointReward = function () {
        var info = GuildWar.ins().getModel().getMyPointReward();
        if (info) {
            this.taskTraceName0.y = 16;
            var str = "积分目标：" + "\r" + GuildWar.ins().getModel().ownPoint + "/" + info.integral;
            str += GuildWar.ins().getModel().pointInfo.isCan ? StringUtils.addColor("(\u5B8C\u6210)", '#35e62d') : "";
            this.taskTraceName0.textFlow = new egret.HtmlTextParser().parser(str);
            var itemData = info.award[0];
            if (GuildWar.ins().getModel().pointInfo.isCan) {
                this.taskTraceBtn.visible = true;
                this.pointEff.playFile(RES_DIR_EFF + "actIconCircle", -1);
                this.taskTraceBtn.addChild(this.pointEff);
            }
            else {
                DisplayUtils.removeFromParent(this.pointEff);
            }
        }
        else {
            this.taskTraceAwards0.visible = false;
            DisplayUtils.removeFromParent(this.pointEff);
            this.taskTraceBtn.visible = false;
        }
        this.scorePoint.visible = this.pointEff.parent ? true : false;
    };
    GuildWarUiInfo.prototype.cityOwnChange = function () {
        this.guildName.text = GuildWar.ins().getModel().cityOwn == "" ? "虚位以待" : GuildWar.ins().getModel().cityOwn;
    };
    GuildWarUiInfo.prototype.refushWeixieList = function (refushPlayList) {
        if (refushPlayList === void 0) { refushPlayList = 0; }
        this.list2.dataProvider = new eui.ArrayCollection(GuildWar.ins().getModel().weixieList);
        if (refushPlayList == 1) {
            this.refushcanPlayList();
        }
        this.weixie.visible = GuildWar.ins().getModel().checkinAppoint(2, true) && GuildWar.ins().getModel().weixieList.length > 0;
    };
    GuildWarUiInfo.prototype.refushcanPlayList = function (data) {
        data = data || GuildWar.ins().getModel().canPlayList;
        this.list1.dataProvider = new eui.ArrayCollection(data);
        this.attList.visible = GuildWar.ins().getModel().checkinAppoint(2, true) && (data.length > 0 || this.mon.visible);
    };
    GuildWarUiInfo.prototype.doorStatuChange = function () {
        this.Nextchengnei.enabled = GuildWar.ins().getModel().doorDie;
    };
    GuildWarUiInfo.prototype.rankListChange = function () {
        var dataList = GuildWar.ins().getModel().rankList;
        var info;
        for (var i = 0; i < 3; i++) {
            info = dataList[i];
            if (info) {
                this["rankName" + (i + 1)].text = info.name;
                this["rankPoint" + (i + 1)].text = info.point + "";
            }
            else {
                this["rankName" + (i + 1)].text = "暂无";
                this["rankPoint" + (i + 1)].text = "0";
            }
        }
    };
    GuildWarUiInfo.prototype.refushFlagStatu = function () {
        TimerManager.ins().remove(this.runTime, this);
        this.hudun1.visible = false;
        if (GuildWar.ins().getModel().flagStatu == 0) {
            this.clearTimeBar();
            this.runTime();
            TimerManager.ins().doTimer(1000, GuildWar.ins().getModel().endTime, this.runTime, this);
        }
        else if (GuildWar.ins().getModel().flagStatu == 1) {
            this.clearTimeBar();
            this.timeDesc.text = "当前皇旗可采集";
        }
        else {
            this.runTime();
            this.bloodBar.maximum = GlobalConfig.GuildBattleConst.gatherTime;
            TimerManager.ins().doTimer(1000, GuildWar.ins().getModel().endTime, this.runTime, this);
            this.hudun1.visible = true;
        }
        this.palaceFlag.enabled = GuildWar.ins().getModel().flagStatu == 1;
        this.flagStatu.visible = (GuildWar.ins().getModel().flagStatu == 2 && !this.flagGroup.visible);
        if (this.flagStatu.visible) {
            var t = egret.Tween.get(this.flagStatu);
            this.flagStatu.x = 480;
            t.to({ "x": 106 }, 500).call(function () {
            }, this);
        }
    };
    GuildWarUiInfo.prototype.clearTimeBar = function () {
        this.bloodBar.maximum = 0;
        this.bloodBar.value = 0;
        this.bloodBar.labelFunction = function () {
            return "";
        };
    };
    GuildWarUiInfo.prototype.hudunChange = function (n) {
        this.hudun.maximum = n[1];
        this.hudun.value = n[0];
        this.hudun.labelFunction = function () {
            return Math.ceil(n[0] * 100 / n[1]) + "%";
        };
    };
    GuildWarUiInfo.prototype.runTime = function () {
        --GuildWar.ins().getModel().endTime;
        if (GuildWar.ins().getModel().endTime >= 0) {
            if (GuildWar.ins().getModel().flagStatu != 2) {
                this.timeDesc.text = Math.floor(GuildWar.ins().getModel().endTime / 60) + "分" + GuildWar.ins().getModel().endTime % 60 + "秒后可采集";
            }
            else {
                this.timeDesc.text = GuildWar.ins().getModel().flagName + " 采集中.....";
                this.bloodBar.value = GuildWar.ins().getModel().endTime;
                this.bloodBar.labelFunction = function () {
                    return "采集成功剩余时间：" + Math.floor(GuildWar.ins().getModel().endTime / 60) + "分" + GuildWar.ins().getModel().endTime % 60 + "秒";
                };
                if (this.flagStatu.visible) {
                    var str = "<font color = '#FFB82A'>" + GuildWar.ins().getModel().flagName + "</font>采集皇旗中（<font color = '#35e62d'>" + Math.floor(GuildWar.ins().getModel().endTime / 60) + "分" + GuildWar.ins().getModel().endTime % 60 + "</font>秒）";
                    this.flagTime.textFlow = new egret.HtmlTextParser().parser(str);
                    this.guildName1.text = "公会：" + GuildWar.ins().getModel().flagGuild;
                }
            }
        }
        if (GuildWar.ins().getModel().endTime <= 0) {
            TimerManager.ins().remove(this.runTime, this);
        }
    };
    GuildWarUiInfo.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.Nextchengnei:
            case this.Nextchengnei0:
            case this.Nextdianqian:
            case this.Nexthuanggong:
                if (GuildWar.ins().getModel().killName != "") {
                    UserTips.ins().showTips("|C:0xf3311e&T:复活状态，不能切换地图|");
                    return;
                }
                if (GuildWar.ins().getModel().getIntoNextMapGongxun() > GuildWar.ins().getModel().gongXun) {
                    UserTips.ins().showTips("|C:0xf3311e&T:战功不满足条件，不能进入下一层|");
                    return;
                }
                if (!GuildWar.ins().getModel().doorDie) {
                    UserTips.ins().showTips("|C:0xf3311e&T:击破城门后可进入下一关|");
                    return;
                }
                var index = 1;
                if (e.currentTarget == this.Nextchengnei || e.currentTarget == this.Nextchengnei0) {
                    index = 2;
                }
                else if (e.currentTarget == this.Nextdianqian) {
                    index = 3;
                }
                else if (e.currentTarget == this.Nexthuanggong) {
                    index = 4;
                }
                ViewManager.ins().open(GuileWarReliveWin, 1, index);
                break;
            case this.seeRank:
                ViewManager.ins().open(GuildWarRewardWin);
                break;
            case this.seeMyGuild:
                ViewManager.ins().open(GuildWarMemWin);
                break;
            case this.btn:
                if (this.btn.currentState == "down") {
                    this.refushcanPlayList([]);
                }
                else {
                    this.refushcanPlayList();
                }
                break;
            case this.palaceFlag:
                if (GuildWar.ins().getModel().flagStatu != 0) {
                    GuildWar.ins().requestStartGetFlag();
                }
                else {
                    UserTips.ins().showTips("|C:0xf3311e&T:皇旗当前不可采集|");
                }
                break;
            case this.mon:
                this.clickEffc.playFile(RES_DIR_EFF + "tapCircle", 1);
                this.addChild(this.clickEffc);
                GameLogic.ins().postChangeAttrPoint(0);
                this.guid.visible = false;
                break;
            case this.help:
                ViewManager.ins().open(ZsBossRuleSpeak, 7);
                break;
            case this.taskTraceBtn:
                if (GuildWar.ins().getModel().pointInfo.isCan)
                    GuildWar.ins().sendPointReward();
                break;
            case this.guid2:
                ViewManager.ins().open(GuildwarTipsPanel);
                break;
        }
    };
    GuildWarUiInfo.prototype.listTap = function (e) {
        if (e.target.parent instanceof GuildWarMemberHeadRender) {
            var item_1 = e.target.parent;
            item_1.showEffect();
            if (!GuildWar.ins().getModel().canClick) {
                return;
            }
            if (GuildWar.ins().getModel().flagAcId == Actor.actorID) {
                WarnWin.show("采集中攻击玩家会导致采集<font color='#FFB82A'>进度归0</font>，确定要攻击玩家嘛？", function () {
                    GameLogic.ins().postChangeAttrPoint(item_1.data);
                    EntityShowMgr.ins().showHideSomeOne(item_1.data);
                }, this);
                return;
            }
            GameLogic.ins().postChangeAttrPoint(item_1.data);
            if (this.guid.visible) {
                DisplayUtils.removeFromParent(this.clickEffc);
            }
            this.guid.visible = false;
            if (!(GuildWar.ins().getModel().attHandle == item_1.data))
                EntityShowMgr.ins().showHideSomeOne(item_1.data);
        }
    };
    GuildWarUiInfo.prototype.clearRendererItem = function () {
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
    GuildWarUiInfo.prototype.showSkill = function (value) {
        if (!value) {
            egret.Tween.removeTweens(this.lzlabel);
            egret.Tween.removeTweens(this.skillGroup);
            this.skillGroup.visible = false;
            return;
        }
        if (this.skillGroup.visible) {
            egret.Tween.removeTweens(this.lzlabel);
            egret.Tween.removeTweens(this.skillGroup);
        }
        this.skillGroup.visible = true;
        this.skillGroup.alpha = 1;
        this.lzlabel.scaleX = this.lzlabel.scaleY = 1;
        this.lzlabel.text = value + "";
        var self = this;
        egret.Tween.get(this.lzlabel).to({ scaleX: 2, scaleY: 2 }, 200).to({ scaleX: 1, scaleY: 1 }, 100).call(function () {
            egret.Tween.get(self.skillGroup).wait(1000).to({ alpha: 0 }, 1000).call(function () {
                egret.Tween.removeTweens(self.lzlabel);
                egret.Tween.removeTweens(self.skillGroup);
                self.skillGroup.visible = false;
            });
        });
    };
    GuildWarUiInfo.prototype.updateTarget = function () {
        var cruInfo = GuildWar.ins().getModel().getMapLevelInfo();
        if (cruInfo.id == 1) {
            this.belongGroup.visible = false;
        }
        else {
            this.belongGroup.visible = true;
        }
        if (GameLogic.ins().currAttackHandle == 0) {
            this.belongGroup.visible = false;
        }
        if (GameLogic.ins().currAttackHandle != 0 && this.currAttackHandle != GameLogic.ins().currAttackHandle) {
            this.currAttackHandle = GameLogic.ins().currAttackHandle;
            var mainRoleInfo = void 0;
            var roleList = EntityManager.ins().getEntitysBymasterhHandle(this.currAttackHandle, EntityType.Role);
            if (roleList && roleList.length > 0) {
                mainRoleInfo = roleList[0].infoModel;
                var tname = mainRoleInfo.name;
                var strlist = tname.split("\n");
                if (strlist[1])
                    tname = strlist[1];
                else
                    tname = strlist[0];
                this.belongNameTxt0.textFlow = TextFlowMaker.generateTextFlow(tname);
                this.roleHead0.source = "yuanhead" + mainRoleInfo.job + mainRoleInfo.sex;
                this.changeHp();
            }
        }
        if (this.belongGroup.visible) {
            this.changeHp();
        }
    };
    GuildWarUiInfo.prototype.updateHP = function (param) {
        var targetRole = param[0];
        var sourceRole = param[1];
        var type = param[2];
        var value = param[3];
        if (targetRole && targetRole.infoModel.masterHandle == this.currAttackHandle) {
            this.changeHp();
        }
    };
    GuildWarUiInfo.prototype.changeHp = function () {
        var roleList = EntityManager.ins().getEntitysBymasterhHandle(this.currAttackHandle, EntityType.Role);
        if (roleList && roleList.length > 0) {
            var len = roleList.length;
            var hpValue = 0;
            var hpTotal = 0;
            var neigongValue = 0;
            var neigongTotal = 0;
            for (var i = 0; i < len; i++) {
                var role = roleList[i];
                if (role) {
                    var curHp = role.infoModel.getAtt(AttributeType.atHp) || 0;
                    var maxHp = role.infoModel.getAtt(AttributeType.atMaxHp) || 0;
                    hpValue += curHp;
                    hpTotal += maxHp;
                    var curNeigong = role.infoModel.getAtt(AttributeType.cruNeiGong) || 0;
                    var maxNeigong = role.infoModel.getAtt(AttributeType.maxNeiGong) || 0;
                    neigongValue += curNeigong;
                    neigongTotal += maxNeigong;
                }
            }
            this.neigongBar1.maximum = neigongTotal;
            this.neigongBar1.value = neigongValue;
            this.bloodBar1.maximum = hpTotal;
            this.bloodBar1.value = hpValue;
            if (hpValue <= 0) {
                this.belongGroup.visible = false;
            }
        }
    };
    return GuildWarUiInfo;
}(BaseEuiView));
__reflect(GuildWarUiInfo.prototype, "GuildWarUiInfo");
ViewManager.ins().reg(GuildWarUiInfo, LayerManager.UI_Main);
//# sourceMappingURL=GuildWarUiInfo.js.map