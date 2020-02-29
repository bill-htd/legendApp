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
var specialRing = GameSystem.specialRing;
var RingInfoView = (function (_super) {
    __extends(RingInfoView, _super);
    function RingInfoView() {
        var _this = _super.call(this) || this;
        _this.barbc = new ProgressBarEff();
        _this.cruCostId = 0;
        _this.isAutoUp = false;
        _this.canUpdate = false;
        _this.FIRE_RING_ID = 7;
        _this.skinName = "ring";
        _this.isTopLevel = true;
        return _this;
    }
    RingInfoView.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.barbc.setWidth(400);
        this.barbc.x = -15;
        this.barbc.y = 25;
        this.barGroup.addChild(this.barbc);
        this.starList = new StarList(SpecialRing.perStar);
        this.starList.x = 15;
        this.starList.y = 0;
        this.star.addChild(this.starList);
        this.iconMc = new MovieClip();
        this.iconMc.x = 0;
        this.iconMc.y = 0;
        this.ringMcGroup.addChild(this.iconMc);
        this.reliveEff = new MovieClip();
        this.reliveEff.x = 200;
        this.reliveEff.y = 62;
        this.reliveEff.scaleX = 1.15;
        this.baojiMc = new MovieClip();
        this.baojiMc.x = 245;
        this.baojiMc.y = 650;
        this.menuList.itemRenderer = SpecialRingItem;
        this.menuList.selectedIndex = 0;
        this.menuListData = new eui.ArrayCollection();
        this.menuList.dataProvider = this.menuListData;
        this.ringget.textFlow = (new egret.HtmlTextParser).parser("<a href=\"event:\"><u>" + this.ringget.text + "</u></a>");
        this.upgradebtn.label = "进阶";
        this.uplevel.label = "升星";
        this.countTxt.textColor = ColorUtil.NORMAL_COLOR;
    };
    RingInfoView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addChangeEvent(this.menuList, this.onClickMenu);
        this.addTouchEvent(this.uplevel, this.onTap);
        this.addTouchEvent(this.acivebtn, this.onTap);
        this.addTouchEvent(this.ringget, this.onTap);
        this.addTouchEvent(this.upgradebtn, this.onTap);
        this.addTouchEvent(this.goQuicklyOpen, this.onQuickOpen);
        this.observe(SpecialRing.ins().postUnLock, this.updateView);
        this.observe(UserTask.ins().postUpdateAchieve, this.updateView);
        this.observe(SpecialRing.ins().postSpicelRingUpdate, this.playEffect);
        this.observe(SpecialRing.ins().postActiveRing, this.showActivityView);
        this.observe(SpecialRing.ins().postActiveRing, this.updateView);
        this.observe(SpecialRing.ins().postSRStairUp, this.updateView);
        this.barbc.reset();
        this.updateView();
        this.setIcon();
    };
    RingInfoView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.uplevel, this.onTap);
        this.removeTouchEvent(this.ringget, this.onTap);
        this.removeTouchEvent(this.acivebtn, this.onTap);
        this.removeTouchEvent(this.upgradebtn, this.onTap);
        DisplayUtils.removeFromParent(this.reliveEff);
        this.removeObserve();
        if (this.isAutoUp) {
            this.stopAutoUp();
        }
    };
    RingInfoView.prototype.onQuickOpen = function (e) {
        var config = GlobalConfig.ActorExRingConfig[SpecialRing.FIRE_RING_ID];
        var costMoney = config.useYb;
        if (Actor.yb >= costMoney) {
            SpecialRing.ins().sendActiveRing(SpecialRing.FIRE_RING_ID, 1);
        }
        else {
            UserTips.ins().showTips("|C:0xf3311e&T:\u5143\u5B9D\u4E0D\u8DB3|");
        }
    };
    RingInfoView.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.uplevel:
                this.warnShow();
                break;
            case this.acivebtn:
                if (this.currData.id == SpecialRing.FIRE_RING_ID) {
                    SpecialRing.ins().requestDeblock(this.currData.id);
                }
                else {
                    SpecialRing.ins().sendActiveRing(this.currData.id);
                }
                break;
            case this.upgradebtn:
                UserTips.ins().showTips("排版优化 屏蔽升级功能");
                break;
            case this.ringget:
                UserWarn.ins().setBuyGoodsWarn(this.cruCostId);
                break;
            default:
                break;
        }
    };
    RingInfoView.prototype.showActivityView = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var config = GlobalConfig.ActorExRingConfig[this.currData.id];
        if (this.currData.id == SpecialRing.FIRE_RING_ID) {
            ViewManager.ins().close(this);
            ViewManager.ins().open(FireRingWin);
        }
        else {
            this.upDateItem.apply(this, param);
        }
        Activationtongyong.show(0, config.name, "j" + config.icon + "_png");
    };
    RingInfoView.prototype.upDateItem = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var id = 0;
        if (param && param[0]) {
            id = param[0][0];
        }
        var item = SpecialRing.ins().getSpecialRingDataById(id);
        var config = GlobalConfig.ActorExRingConfig[this.currData.id];
        this.menuListData.replaceItemAt(item, config.order - 1);
        this.currData = item;
        this.updateDetail(true);
    };
    RingInfoView.prototype.playEffect = function () {
        var _this = this;
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.upDateItem.apply(this, param);
        var baoji = 0;
        var config = GlobalConfig.ActorExRingConfig[this.currData.id];
        if (param && param[0])
            baoji = param[0][1];
        var attrConfig = SpecialRing.ins().getRingConfigById(this.currData.id, this.currData.level);
        if (baoji > 0) {
            this.baojiMc.playFile(RES_DIR_EFF + "moneytreecrit", 1);
            this.addChild(this.baojiMc);
        }
        var label = new eui.Label;
        label.size = 14;
        label.textColor = 0x35e62d;
        label.width = 450;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.x = 19;
        label.y = 420;
        label.text = config.name + "\u7ECF\u9A8C\u589E\u52A0" + attrConfig.addPower;
        this.addChild(label);
        var t = egret.Tween.get(label);
        t.to({ "y": label.y - 45 }, 500).call(function () {
            _this.removeChild(label);
        }, this);
    };
    RingInfoView.prototype.onClickMenu = function (e) {
        var data = this.specialDatas[e.currentTarget.selectedIndex];
        if (!data) {
            return;
        }
        this.barbc.reset();
        this.currData = data;
        this.updateDetail();
        this.setIcon();
    };
    RingInfoView.prototype.setIcon = function () {
        var config = GlobalConfig.ActorExRingConfig[this.currData.id];
        if (!GlobalConfig.DefineEff[config.effid]) {
            egret.log(config.name + "特效ID出错啦");
            return;
        }
        var effSoure = GlobalConfig.DefineEff[config.effid].souce;
        this.iconMc.playFile(RES_DIR_EFF + effSoure, -1);
    };
    RingInfoView.prototype.updateView = function () {
        this.updateMenuList();
        this.updateDetail();
    };
    RingInfoView.prototype.updateMenuList = function () {
        this.specialDatas = CommonUtils.copyDataHandler(SpecialRing.ins().ringList);
        this.menuListData.source = this.specialDatas.sort(function (obj1, obj2) {
            return Algorithm.sortAscAttr(obj1, obj2, "order");
        });
        if (this.currData) {
            for (var i in this.specialDatas) {
                if (this.currData.id == this.specialDatas[i].id) {
                    this.currData = this.specialDatas[i];
                    break;
                }
            }
        }
        else {
            this.currData = this.specialDatas[0];
        }
    };
    RingInfoView.prototype.updateFuseView = function () {
        var config = GlobalConfig.ActorExRingConfig[SpecialRing.FIRE_RING_ID];
        this.price0.setPrice(config.useYb);
    };
    RingInfoView.prototype.updateDetail = function (upStar) {
        if (upStar === void 0) { upStar = false; }
        var config = GlobalConfig.ActorExRingConfig[this.currData.id];
        var isFireRingOpen = SpecialRing.ins().isFireRingActivate();
        if (isFireRingOpen) {
            this.currentState = "tejie8";
            this.updateFuseView();
            this.currData.id = this.FIRE_RING_ID;
        }
        else {
            if (this.currData.id == this.FIRE_RING_ID) {
                this.currentState = "disable";
                this.resetUI();
                this.attrBg0.visible = false;
                this.acivebtn.label = "解封";
                var cfg = GlobalConfig.ActorExRingConfig[SpecialRing.FIRE_RING_ID];
                this.ringname.text = "" + cfg.name;
                this.Explain0.textFlow = TextFlowMaker.generateTextFlow(this.countStrDesc(cfg));
                this.openDesc.text = '第8天激活全部特戒后解锁';
                if (SpecialRing.ins().isFireRingCanActivate()) {
                    this.acivebtn.visible = true;
                    this.openDesc.visible = false;
                    this.addReliveEff();
                }
                else {
                    this.acivebtn.visible = false;
                    this.openDesc.visible = true;
                    DisplayUtils.removeFromParent(this.reliveEff);
                }
            }
            else {
                this.attrBg0.visible = true;
                this.acivebtn.label = "激活";
                var configLevel = this.currData.level == 0 ? 1 : this.currData.level;
                var attrConfig = SpecialRing.ins().getRingConfigById(this.currData.id, configLevel);
                var level = SpecialRing.ins().getRingStair(this.currData.level);
                this.ringname.text = "" + config.name;
                this.stageImg.setValue(level);
                if (this.currData.level > 0) {
                    if (Actor.level >= config.needLevel && UserZs.ins().lv >= config.needZs) {
                        if (!SpecialRing.ins().getRingConfigById(this.currData.id, this.currData.level + 1)) {
                            this.currentState = "final";
                        }
                        else {
                            this.currentState = "open";
                        }
                        this.setOpenInfo(upStar);
                    }
                    else {
                        this.currentState = "wait";
                        this.Explain0.textFlow = TextFlowMaker.generateTextFlow(this.countStrDesc(config));
                        this.openLevelDesc.text = "\u8FBE\u5230" + (config.needZs > 0 ? config.needZs + "\u8F6C" : "") + (config.needLevel > 0 ? config.needLevel + "\u7EA7" : "") + "\u540E\u7279\u6212\u5F00\u542F\u98DE\u5347";
                        if (attrConfig.attrAward) {
                            this.setLayoutAttr(attrConfig);
                            var point = UserBag.getAttrPower(attrConfig.attrAward);
                            this.powerPanel.setPower(point);
                        }
                        else {
                            this.setLayoutAttr(attrConfig, true);
                            this.powerPanel.setPower(0);
                        }
                    }
                }
                else {
                    this.currentState = "disable";
                    if (attrConfig.attrAward) {
                        this.setLayoutAttr(attrConfig);
                        var point = UserBag.getAttrPower(attrConfig.attrAward);
                        this.powerPanel.setPower(point);
                    }
                    else {
                        this.setLayoutAttr(attrConfig, true);
                        this.powerPanel.setPower(0);
                    }
                    this.Explain0.textFlow = TextFlowMaker.generateTextFlow(this.countStrDesc(config));
                    var flag = SpecialRing.ins().checkRedPoint(this.currData.id, this.currData.level);
                    if (flag) {
                        this.openDesc.text = "";
                        this.acivebtn.visible = true;
                        this.addReliveEff();
                    }
                    else {
                        var config_1 = GlobalConfig.ActorExRingConfig[this.currData.id];
                        this.acivebtn.visible = false;
                        this.openDesc.text = "\u7B2C" + config_1.openDay + "\u5929\u6216VIP" + config_1.openVip + "\u5F00\u542F";
                        DisplayUtils.removeFromParent(this.reliveEff);
                    }
                    this.canUpdate = false;
                }
                this.skillname.text = attrConfig.SpecialRingSkin;
            }
        }
    };
    RingInfoView.prototype.addReliveEff = function () {
        this.reliveEff.playFile(RES_DIR_EFF + "chargeff1", -1);
        if (!this.reliveEff.parent)
            this.aciveGroup.addChild(this.reliveEff);
    };
    RingInfoView.prototype.resetUI = function () {
        this.setLayoutAttr(null, true);
        this.Explain0.text = "";
        this.skillname.text = "";
        this.openDesc.text = "";
    };
    RingInfoView.prototype.setLayoutAttr = function (attrConfig, clean) {
        for (var i = 0; i < 4; i++) {
            if (!clean) {
                var spl = AttributeData.getAttStr(this.getAttrArray(attrConfig.attrAward), 1);
                var attstrs = spl.split("\n");
                this["attrLabel" + (i + 1)].text = attstrs[i];
            }
            else {
                this["attrLabel" + (i + 1)].text = "";
            }
        }
    };
    RingInfoView.prototype.getAttrArray = function (attr) {
        var noShowType = [11, 12, 23, 24];
        var showAttr = [];
        for (var i = 0; i < attr.length; i++) {
            if (noShowType.indexOf(attr[i].type) < 0) {
                showAttr.push(attr[i]);
            }
        }
        return showAttr;
    };
    RingInfoView.prototype.setOpenInfo = function (upStar) {
        if (upStar === void 0) { upStar = false; }
        var config = GlobalConfig.ActorExRingConfig[this.currData.id];
        var configLevel = this.currData.level == 0 ? 1 : this.currData.level;
        var attrConfig = SpecialRing.ins().getRingConfigById(this.currData.id, configLevel);
        this.cruCostId = attrConfig.costItem;
        this.Explain0.textFlow = this.Explain.textFlow = TextFlowMaker.generateTextFlow(this.countStrDesc(config));
        var count = UserBag.ins().getBagGoodsCountById(0, attrConfig.costItem);
        this.countTxt.text = "\u9700\u8981" + GlobalConfig.ItemConfig[attrConfig.costItem].name + ":";
        var colorStr = "";
        if (count >= attrConfig.cost)
            colorStr = ColorUtil.GREEN_COLOR;
        else
            colorStr = ColorUtil.RED_COLOR;
        this.useTxt.textFlow = TextFlowMaker.generateTextFlow("<font color=" + colorStr + ">" + count + "</font><font color=" + ColorUtil.WHITE_COLOR + ">/" + attrConfig.cost + "</font> ");
        this.canUpdate = (count >= attrConfig.cost);
        var nextAttrConfig;
        this.upgradebtn.visible = false;
        if (this.currentState != "final")
            this.uplevel.visible = true;
        var curStar = SpecialRing.ins().getRingStar(this.currData.level);
        if (attrConfig.judgeup > 0) {
            nextAttrConfig = SpecialRing.ins().getRingConfigById(this.currData.id, this.currData.level + 1);
            if (this.currData.exp >= attrConfig.upPower) {
                this.starList.setStarNum(curStar, Number(upStar));
                this.upgradebtn.visible = true;
                this.uplevel.visible = false;
                if (!SpecialRing.ins().getRingConfigById(this.currData.id, this.currData.level + 1)) {
                    this.upgradebtn.label = "\u5DF2\u6EE1\u7EA7";
                }
                else {
                    this.upgradebtn.label = "\u8FDB\u9636";
                }
            }
            else {
                this.starList.setStarNum(curStar, Number(upStar));
            }
        }
        else {
            nextAttrConfig = SpecialRing.ins().getRingConfigById(this.currData.id, this.currData.level + 1);
            this.starList.setStarNum(curStar, Number(upStar));
        }
        if (nextAttrConfig) {
            if (nextAttrConfig.attrAward) {
                this.nextAttrLabel.text = AttributeData.getAttStr(this.getAttrArray(nextAttrConfig.attrAward), 1);
            }
            else {
                this.nextAttrLabel.text = "";
            }
        }
        this.expBarChange();
        if (attrConfig.attrAward) {
            this.setLayoutAttr(attrConfig);
            var point = UserBag.getAttrPower(attrConfig.attrAward);
            this.powerPanel.setPower(point);
        }
        else {
            this.setLayoutAttr(attrConfig, true);
            this.attrLabel.text = "";
            this.powerPanel.setPower(0);
        }
    };
    RingInfoView.prototype.warnShow = function () {
        if (!this.canUpdate) {
            var attrConfig = SpecialRing.ins().getRingConfigById(this.currData.id, this.currData.level);
            UserTips.ins().showTips(GlobalConfig.ItemConfig[attrConfig.costItem].name + "\u4E0D\u8DB3");
            return;
        }
        var config = GlobalConfig.ActorExRingConfig[this.currData.id];
        if (!(Actor.level >= config.needLevel && UserZs.ins().lv >= config.needZs)) {
            UserTips.ins().showTips("" + (config.needZs > 0 ? config.needZs + "\u8F6C" : "") + (config.needLevel > 0 ? config.needLevel + "\u7EA7" : "") + "\u53EF\u98DE\u5347");
        }
        SpecialRing.ins().sendSpicelRingUpdate(this.currData.id);
    };
    RingInfoView.prototype.stopAutoUp = function () {
        this.isAutoUp = false;
        TimerManager.ins().remove(this.autoUpStar, this);
    };
    RingInfoView.prototype.autoUpStar = function () {
        var attrConfig = SpecialRing.ins().getRingConfigById(this.currData.id, this.currData.level);
        var count = UserBag.ins().getBagGoodsCountById(0, attrConfig.costItem);
        if (count) {
            SpecialRing.ins().sendSpicelRingUpdate(this.currData.id);
        }
        else {
            this.isAutoUp = false;
            TimerManager.ins().remove(this.autoUpStar, this);
        }
    };
    RingInfoView.prototype.expBarChange = function () {
        var attrConfig = SpecialRing.ins().getRingConfigById(this.currData.id, this.currData.level);
        var maxExp = attrConfig.upPower;
        var curExp = this.currData.exp;
        if (!SpecialRing.ins().getRingConfigById(this.currData.id, this.currData.level + 1)) {
            curExp = maxExp;
        }
        else {
            curExp = this.currData.exp > maxExp ? maxExp : this.currData.exp;
        }
        if (this.barbc.getMaxValue() != maxExp) {
            this.barbc.setData(curExp, maxExp);
        }
        else {
            this.barbc.setValue(curExp);
        }
    };
    RingInfoView.prototype.countStrDesc = function (config) {
        var configLevel = this.currData.level == 0 ? 1 : this.currData.level;
        var attrConfig = SpecialRing.ins().getRingConfigById(this.currData.id, configLevel);
        var arr = config.explain.split("$");
        var str = "";
        if (arr.length > 0) {
            for (var i = 0; i < arr.length; i++) {
                if (Number(arr[i])) {
                    var num = Number(arr[i]);
                    var tempConfig = void 0;
                    if (num / 200 >= 1) {
                        tempConfig = attrConfig.extAttrAward;
                    }
                    else {
                        tempConfig = attrConfig.attrAward;
                    }
                    for (var k in tempConfig) {
                        if (tempConfig[k].type == (num % 100)) {
                            if (num > 200) {
                                str += AttributeData.getExtAttStrByType(tempConfig[k], 0, "", false, false);
                            }
                            else {
                                str += AttributeData.getAttStrByType(tempConfig[k], 0, "", false, false);
                            }
                            break;
                        }
                    }
                }
                else {
                    str += arr[i];
                }
            }
        }
        else {
            str = config.explain;
        }
        return str;
    };
    return RingInfoView;
}(BaseEuiView));
__reflect(RingInfoView.prototype, "RingInfoView");
ViewManager.ins().reg(RingInfoView, LayerManager.UI_Main);
//# sourceMappingURL=RingInfoView.js.map