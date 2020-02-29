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
var ZhanLingPanel = (function (_super) {
    __extends(ZhanLingPanel, _super);
    function ZhanLingPanel() {
        return _super.call(this) || this;
    }
    ZhanLingPanel.prototype.childrenCreated = function () {
    };
    ZhanLingPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.isAutoUp = false;
        this.upBtn.label = this.isAutoUp ? "\u53D6 \u6D88" : "\u4E00\u952E\u5347\u661F";
        TimerManager.ins().remove(this.checkUpdate, this);
        TimerManager.ins().remove(this.autoUpStar, this);
        this.removeObserve();
    };
    ZhanLingPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.openView(param);
    };
    ZhanLingPanel.prototype.openView = function (param) {
        this.addTouchEvent(this.detail, this.onEvent);
        this.addTouchEvent(this.suit, this.onEvent);
        this.addTouchEvent(this.huanxing, this.onEvent);
        this.addTouchEvent(this.upBtn, this.onEvent);
        this.addTouchEvent(this.upBtnEx, this.onEvent);
        this.addTouchEvent(this["skillIcon0"], this.onEvent);
        this.addTouchEvent(this.huanhua, this.onEvent);
        this.addTouchEvent(this.btn0, this.onEvent);
        this.addTouchEvent(this.btn1, this.onEvent);
        this.addTouchEvent(this.closeBtn, this.onEvent);
        this.addTouchEvent(this.checkBoxs, this.updateCost);
        this.addTouchEvent(this.checkBoxs, this.updateModel);
        this.addTouchEvent(this.icon, this.showIconTips);
        this.addTouchEvent(this.help, this.onEvent);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onSoulClick, this);
        this.observe(UserBag.ins().postItemAdd, this.timerUpdate);
        this.observe(UserBag.ins().postItemDel, this.timerUpdate);
        this.observe(UserBag.ins().postItemCountChange, this.timerUpdate);
        this.observe(ZhanLing.ins().postZhanLingInfo, this.timerUpdate);
        this.observe(ZhanLing.ins().postZhanLingUpExp, this.timerUpdate);
        this.observe(ZhanLing.ins().postZhanLingDrug, this.timerUpdate);
        this.observe(ZhanLing.ins().postZhanLingWear, this.timerUpdate);
        this.observe(ZhanLing.ins().postZhanLingSkinUpGrade, this.timerUpdate);
        this.observe(ZhanLing.ins().postZhangLingSkinChange, this.timerUpdate);
        this.observe(ZhanLing.ins().postZhanLingUpgrade, this.stopUpGrade);
        this.observe(ZhanLing.ins().postZhanLingTalentLvUpGrade, this.TanlentLvUpGrade);
        this.list.itemRenderer = ZhanLingSkinItem;
        this.list.useVirtualLayout = false;
        this.listData = new eui.ArrayCollection();
        this.list.dataProvider = this.listData;
        this.zlId = param[0] || 0;
        this._tick = 0;
        this.postEvent = Math.floor(150 / GlobalConfig.ZhanLingConfig.unitTime);
        for (var i = 0; i < GlobalConfig.ZhanLingBase[this.zlId].skill.length; i++) {
            this.addTouchEvent(this["skillIcon" + (i + 1)], this.onSkillEvent);
        }
        for (var k in GlobalConfig.ZhanLingConfig.upgradeInfo) {
            var idx = GlobalConfig.ZhanLingConfig.upgradeInfo[k].sort;
            this.addTouchEvent(this["up" + idx], this.onDrugEvent);
        }
        this.addEvent(eui.UIEvent.CHANGE_END, this.listScroller, this.onChange);
        this.isAutoUp = false;
        this.roleSelect.hideRole();
        this.init();
        TimerManager.ins().doTimer(500, 0, this.checkUpdate, this);
    };
    ZhanLingPanel.prototype.checkUpdate = function () {
        var _this = this;
        if (this._tick && this._tick <= this.postEvent) {
            this._tick = 0;
            TimerManager.ins().doNext(function () {
                _this.updateUI();
            }, this);
        }
    };
    ZhanLingPanel.prototype.timerUpdate = function () {
        var _this = this;
        this._tick++;
        if (this._tick && this._tick > this.postEvent) {
            this._tick = 0;
            TimerManager.ins().doNext(function () {
                _this.updateUI();
            }, this);
        }
    };
    ZhanLingPanel.prototype.init = function () {
        this.updateUI(true);
    };
    ZhanLingPanel.prototype.updateState = function () {
        var zlData = ZhanLingModel.ins().getZhanLingDataById(this.zlId);
        var zlLeve = zlData ? zlData.level : 0;
        var maxLv = CommonUtils.getObjectLength(GlobalConfig.ZhanLingLevel[this.zlId]) - 1;
        if (!this.zlId) {
            if (zlLeve >= maxLv) {
                this.currentState = "zl_max";
            }
            else {
                this.currentState = "zl_up";
            }
        }
        else {
            if (zlLeve >= maxLv) {
                this.currentState = "skin_max";
            }
            else {
                this.currentState = "skin_up";
            }
        }
        this.validateNow();
    };
    ZhanLingPanel.prototype.updateUI = function (init) {
        this.updateState();
        this.updateTop(init);
        this.updateItem();
        this.updateSkill();
        this.updateValue();
        this.updateDown();
        this.updateCost();
        this.updateRedPoint();
    };
    ZhanLingPanel.prototype.updateTop = function (init) {
        if (this.currentState == "skin_up" || this.currentState == "skin_max") {
            this.listData.replaceAll(ZhanLingModel.ins().showZLlist);
            this.list.validateNow();
            if (this.zlId) {
                for (var i = 0; i < this.list.numElements; i++) {
                    var render = this.list.getVirtualElementAt(i);
                    var zlbase = this.list.dataProvider.getItemAt(i);
                    if (zlbase.id == this.zlId) {
                        render.setSelect(true);
                        if (init) {
                            var startPos = 0;
                            if (i > 3) {
                                this.listScroller.stopAnimation();
                                startPos = Math.floor((i + 1) / 4) * render.height;
                            }
                            this.setStartPosition(startPos);
                        }
                        break;
                    }
                }
            }
            this.onChange();
            this.huanhua.visible = ZhanLingModel.ins().getZhanLingDataById(this.zlId) ? true : false;
            this.huanhua.icon = ZhanLingModel.ins().ZhanLingSkinId == this.zlId ? "zl_quxiao_btn" : "zl_huanhua_btn";
        }
        var zllconfig = GlobalConfig.ZhanLingConfig;
        for (var k in zllconfig.upgradeInfo) {
            var i = zllconfig.upgradeInfo[k].sort;
            if (this["up" + i]) {
                this["up" + i].icon = GlobalConfig.ItemConfig[k].icon + "_png";
            }
            if (this["redPoint" + i]) {
                this["redPoint" + i].visible = ZhanLingModel.ins().getZhanLingDataByDrugUse(this.zlId, Number(k));
            }
            if (this["used" + i]) {
                this["used" + i].text = ZhanLingModel.ins().getZhanLingDataByDrug(this.zlId, Number(k));
            }
        }
        var level = ZhanLingModel.ins().getZhanLingDataByLevel(this.zlId);
        this.lv.data = GlobalConfig.ZhanLingLevel[this.zlId][level].stageDesc;
        if (!this.model)
            this.model = new MovieClip();
        if (!this.model.parent)
            this.zhanling.addChild(this.model);
        this.updateModel();
    };
    ZhanLingPanel.prototype.updateModel = function () {
        var level = ZhanLingModel.ins().getZhanLingDataByLevel(this.zlId);
        var cfg;
        if (this.isAutoUp) {
            var stage = ZhanLingModel.ins().getZhanLingDataByStage(this.zlId);
            var nextLv = stage * 10 + 1;
            cfg = GlobalConfig.ZhanLingLevel[this.zlId][nextLv];
            if (!cfg)
                cfg = GlobalConfig.ZhanLingLevel[this.zlId][level];
            else
                level = nextLv;
        }
        else {
            cfg = GlobalConfig.ZhanLingLevel[this.zlId][level];
        }
        this.zhanlingName.source = GlobalConfig.ZhanLingLevel[this.zlId][level].zlName;
        if (this.model.name != RES_DIR_EFF + cfg.innerAppearance)
            this.model.playFile(RES_DIR_EFF + cfg.innerAppearance, -1);
    };
    ZhanLingPanel.prototype.updateItem = function () {
        var itemData = UserBag.ins().getBagGoodsByType(ItemType.TYPE_21);
        if (itemData)
            itemData.sort(this.sort);
        for (var i = 1; i <= GlobalConfig.ZhanLingConfig.equipPosCount; i++) {
            this["item" + i].name = i.toString();
            var itemid = ZhanLingModel.ins().getZhanLingDataByItem(this.zlId, i);
            this["item" + i].data = { zlId: this.zlId, id: itemid, equips: itemData };
        }
    };
    ZhanLingPanel.prototype.updateSkill = function () {
        var config = GlobalConfig.ZhanLingBase[this.zlId];
        if (!config)
            return;
        var talentId = config.talent;
        var talentLv = ZhanLingModel.ins().getZhanLingDataByTalentLv(this.zlId);
        var zlTconfig = GlobalConfig.ZhanLingTalent[talentId][talentLv];
        if (!zlTconfig)
            zlTconfig = GlobalConfig.ZhanLingTalent[talentId][1];
        if (zlTconfig.talentDesc && zlTconfig.talentDesc.icon) {
            this["skillIcon0"].source = zlTconfig.talentDesc.icon;
        }
        else {
            if (zlTconfig.passive)
                this["skillIcon0"].source = Math.floor(zlTconfig.passive[0].id / 1000) * 1000 + "_png";
        }
        for (var i = 0; i < GlobalConfig.ZhanLingBase[this.zlId].skill.length; i++) {
            var skillid = GlobalConfig.ZhanLingBase[this.zlId].skill[i].id;
            var zlskill = GlobalConfig.ZhanLingSkill[skillid];
            if (zlskill.desc && zlskill.desc.icon)
                this["skillIcon" + (i + 1)].source = zlskill.desc.icon;
            else
                this["skillIcon" + (i + 1)].source = Math.floor(zlskill.passive / 1000) * 1000 + "_png";
        }
        this["blackImg0"].visible = talentLv ? false : true;
        var lv = ZhanLingModel.ins().getZhanLingDataByLevel(this.zlId);
        for (var i = 0; i < GlobalConfig.ZhanLingBase[this.zlId].skill.length; i++) {
            var sk = GlobalConfig.ZhanLingBase[this.zlId].skill[i];
            this["blackImg" + (i + 1)].visible = (sk.open > lv) ? true : false;
        }
    };
    ZhanLingPanel.prototype.updateValue = function () {
        var lv = ZhanLingModel.ins().getZhanLingDataByLevel(this.zlId);
        var zllconfig = GlobalConfig.ZhanLingLevel[this.zlId][lv];
        if (!zllconfig)
            return;
        var TotalValue = ZhanLingModel.ins().getZhanLingPower(this.zlId);
        var power = TotalValue[0] ? TotalValue[0] : 0;
        this.powerPanel.setPower(power);
        if (!TotalValue[1].length)
            TotalValue[1] = this.getEmptyAttrs(this.zlId);
        if (!TotalValue[2].length)
            TotalValue[2] = this.getEmptyAttrs(this.zlId, true);
        var curAttrs = AttributeData.getAttStr(TotalValue[1], 0, 1, "：") + "\n";
        var netAttrs = AttributeData.getAttStr(TotalValue[2], 0, 1, "：") + "\n";
        this.curAtt.text = curAttrs;
        this.nextAtt.text = netAttrs;
    };
    ZhanLingPanel.prototype.getEmptyAttrs = function (id, next) {
        var zlAttr = [];
        var config = GlobalConfig.ZhanLingLevel[id][0];
        zlAttr = ZhanLingModel.ins().addAttrs(zlAttr, config.attrs);
        if (!next) {
            for (var i = 0; i < zlAttr.length; i++) {
                zlAttr[i].value = 0;
            }
        }
        return zlAttr;
    };
    ZhanLingPanel.prototype.updateDown = function (isUp) {
        if (isUp === void 0) { isUp = 0; }
        if (this.zlId) {
            var zlData = ZhanLingModel.ins().getZhanLingDataById(this.zlId);
            this.starGroup.visible = this.barGroup.visible = zlData ? true : false;
            if (!zlData)
                return;
        }
        if (!this.starList) {
            this.starList = new StarList(10);
            this.starList.horizontalCenter = 0;
        }
        if (!this.starList.parent) {
            this.starGroup.addChild(this.starList);
        }
        var lv = ZhanLingModel.ins().getZhanLingDataByLevel(this.zlId);
        var showLv = Math.floor(lv % 10);
        if (lv) {
            var stage2 = showLv;
            if (!stage2) {
                showLv = 10;
            }
        }
        this.starList.setStarNum(showLv, isUp);
        if (!this.barbc) {
            this.barbc = new ProgressBarEff();
            this.barbc.setWidth(525);
        }
        if (!this.barbc.parent) {
            this.barGroup.addChild(this.barbc);
        }
        var exp = ZhanLingModel.ins().getZhanLingDataByExp(this.zlId);
        var config = GlobalConfig.ZhanLingLevel[this.zlId][lv];
        if (config) {
            this.barbc.reset();
            this.barbc.setData(exp, config.exp);
        }
    };
    ZhanLingPanel.prototype.updateCost = function () {
        var arr = this.getCostValue();
        var curCount = arr[0];
        var totalCount = arr[1];
        var color = curCount >= totalCount ? 0x00ff00 : 0xff0000;
        this.countLabel.textFlow = TextFlowMaker.generateTextFlow1("|C:" + color + "&T:" + curCount + "|/" + totalCount);
        this.upBtn.visible = ZhanLingModel.ins().getZhanLingDataById(this.zlId) ? true : false;
        this.upBtnEx.visible = !this.upBtn.visible;
    };
    ZhanLingPanel.prototype.getCostValue = function () {
        var zlData = ZhanLingModel.ins().getZhanLingDataById(this.zlId);
        var zlBase = GlobalConfig.ZhanLingBase[this.zlId];
        this.checkBoxs.visible = true;
        this.costType = ItemType.TYPE_1;
        if (zlData || !zlBase.mat) {
            var curCount_1 = 0;
            var totalCount_1 = 0;
            var lv = ZhanLingModel.ins().getZhanLingDataByLevel(this.zlId);
            var zllconfig = GlobalConfig.ZhanLingLevel[this.zlId][lv];
            var config_1 = GlobalConfig.ItemConfig[GlobalConfig.ZhanLingConfig.stageitemid];
            this.icon.source = config_1.icon + "_png";
            var itemData_1 = UserBag.ins().getBagItemById(GlobalConfig.ZhanLingConfig.stageitemid);
            curCount_1 = itemData_1 ? itemData_1.count : 0;
            totalCount_1 = zllconfig.count;
            if (this.checkBoxs.selected && curCount_1 < totalCount_1) {
                curCount_1 = Actor.yb;
                this.icon.source = "szyuanbao";
                totalCount_1 = GlobalConfig.ZhanLingConfig.unitPrice * zllconfig.count;
                this.costType = MoneyConst.yuanbao;
            }
            this.costCount = totalCount_1;
            return [curCount_1, totalCount_1];
        }
        var config = GlobalConfig.ItemConfig[zlBase.mat];
        this.icon.source = config.icon + "_png";
        var itemData = UserBag.ins().getBagItemById(zlBase.mat);
        var curCount = itemData ? itemData.count : 0;
        var zlTalent = GlobalConfig.ZhanLingTalent[this.zlId][1];
        var totalCount = zlTalent.costCount;
        this.checkBoxs.visible = false;
        this.costType = ItemType.TYPE_22;
        this.costCount = totalCount;
        return [curCount, totalCount];
    };
    ZhanLingPanel.prototype.updateRedPoint = function () {
        for (var i = 0; i < 5; i++) {
            if (this["skillRedPoint" + i]) {
                this["skillRedPoint" + i].visible = false;
            }
        }
        this.hhRedPoint.visible = false;
        this.upRedPoint.visible = ZhanLingModel.ins().isUpGradeByStar(this.zlId) || ZhanLingModel.ins().isHintNum(this.zlId);
        this["skillRedPoint0"].visible = ZhanLingModel.ins().isUpGradeByTalent(this.zlId);
        if (this["hxRedPoint"]) {
            var b = false;
            for (var i = 0; i < ZhanLingModel.ins().showZLlist.length; i++) {
                var zlBase = ZhanLingModel.ins().showZLlist[i];
                if (zlBase.id) {
                    var b1 = ZhanLingModel.ins().isUpGradeByStar(zlBase.id) || ZhanLingModel.ins().isHintNum(zlBase.id);
                    if (b1) {
                        b = true;
                        break;
                    }
                    var b2 = ZhanLingModel.ins().isUpGradeByTalent(zlBase.id);
                    if (b2) {
                        b = true;
                        break;
                    }
                }
            }
            this["hxRedPoint"].visible = b;
        }
    };
    ZhanLingPanel.prototype.onSoulClick = function (e) {
        if (e && e.itemRenderer && e.item) {
            if (this.currentState == "zl_up" || this.currentState == "zl_max") {
                var index = this.getIndexRule();
                ViewManager.ins().open(ZhanLingPanelEx, index);
            }
            else {
                var item = e.item;
                this.zlId = item.id;
                this.updateUI();
            }
        }
    };
    ZhanLingPanel.prototype.onSkillEvent = function (e) {
        for (var i = 0; i < GlobalConfig.ZhanLingBase[this.zlId].skill.length; i++) {
            if (e.currentTarget == this["skillIcon" + (i + 1)]) {
                var sk = GlobalConfig.ZhanLingBase[this.zlId].skill[i];
                ViewManager.ins().open(ZhanLingTips, this.zlId, sk.id);
                break;
            }
        }
    };
    ZhanLingPanel.prototype.onDrugEvent = function (e) {
        for (var k in GlobalConfig.ZhanLingConfig.upgradeInfo) {
            var idx = GlobalConfig.ZhanLingConfig.upgradeInfo[k].sort;
            if (e.currentTarget == this["up" + idx]) {
                var itemid = this.getDrugItemByIndex(idx);
                if (this["redPoint" + idx].visible) {
                    ZhanLing.ins().sendZhanLingDrug(this.zlId, itemid);
                }
                else {
                    ViewManager.ins().open(ZhanLingItemTips, this.zlId, itemid);
                }
            }
        }
    };
    ZhanLingPanel.prototype.onEvent = function (e) {
        var _this = this;
        var num = 84 * 5;
        var scrollV = 0;
        switch (e.currentTarget) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.detail:
                break;
            case this.suit:
                ViewManager.ins().open(ZhanLingSuitTip, this.zlId);
                break;
            case this.huanxing:
                var index = this.getIndexRule();
                ViewManager.ins().open(ZhanLingPanelEx, index);
                break;
            case this.upBtn:
                this.sendUpGrade();
                break;
            case this.upBtnEx:
                if (this.upRedPoint.visible) {
                    ZhanLing.ins().sendZhanLingSkinUpGrade(this.zlId);
                }
                else {
                    UserTips.ins().showTips("|C:0xff0000&T:\u6750\u6599\u4E0D\u8DB3");
                }
                break;
            case this["skillIcon0"]:
                if (this["skillRedPoint0"] && this["skillRedPoint0"].visible) {
                    var talentId = ZhanLingModel.ins().getZhanLingDataByTalentId(this.zlId);
                    var talentLv = ZhanLingModel.ins().getZhanLingDataByTalentLv(this.zlId);
                    var nzltalent = GlobalConfig.ZhanLingTalent[talentId][talentLv + 1];
                    var nzlBase = GlobalConfig.ZhanLingBase[this.zlId];
                    var itemcfg = GlobalConfig.ItemConfig[nzlBase.mat];
                    var w = WarnWin.show("\u662F\u5426\u6D88\u8017|C:0x00ff00&T:" + itemcfg.name + "\u76AE\u80A4*" + nzltalent.costCount + "|\u5347\u7EA7\u5929\u8D4B\uFF1F", null, null, function () {
                        ZhanLing.ins().sendZhanLingSkinUpGrade(_this.zlId);
                    }, this);
                    w.setBtnLabel("\u53D6\u6D88", "\u786E\u5B9A");
                }
                else {
                    ViewManager.ins().open(ZhanLingTips, this.zlId);
                }
                break;
            case this.btn0:
                scrollV = this.list.scrollV - num;
                scrollV = Math.round(scrollV / 84) * 84;
                if (scrollV < 0) {
                    scrollV = 0;
                }
                this.list.scrollV = scrollV;
                this.onChange();
                break;
            case this.btn1:
                scrollV = this.list.scrollV + num;
                scrollV = Math.round(scrollV / 84) * 84;
                if (scrollV > this.list.contentHeight - this.listScroller.height) {
                    scrollV = this.list.contentHeight - this.listScroller.height;
                }
                this.list.scrollH = scrollV;
                this.onChange();
                break;
            case this.huanhua:
                if (!ZhanLingModel.ins().getZhanLingDataById(this.zlId)) {
                    UserTips.ins().showTips("|C:0xff0000&T:\u76AE\u80A4\u672A\u6FC0\u6D3B");
                    return;
                }
                var hhId = this.zlId;
                if (ZhanLingModel.ins().ZhanLingSkinId == hhId) {
                    hhId = 0;
                }
                ZhanLing.ins().sendZhangLingSkinChange(hhId);
                break;
            case this.help:
                ViewManager.ins().open(CommonHelpWin, GlobalConfig.HelpInfoConfig[35].text);
                break;
        }
    };
    ZhanLingPanel.prototype.sendUpGrade = function () {
        this.isAutoUp = !this.isAutoUp;
        if (this.isAutoUp) {
            if (!this.checkUpStar()) {
                this.isAutoUp = false;
                return;
            }
            this.updateModel();
            TimerManager.ins().doTimer(GlobalConfig.ZhanLingConfig.unitTime, 0, this.autoUpStar, this);
        }
        else {
            TimerManager.ins().remove(this.autoUpStar, this);
        }
        this.upBtn.label = this.isAutoUp ? "\u53D6 \u6D88" : "\u4E00\u952E\u5347\u661F";
    };
    ZhanLingPanel.prototype.stopUpGrade = function () {
        this.isAutoUp = false;
        TimerManager.ins().remove(this.autoUpStar, this);
        this.upBtn.label = this.isAutoUp ? "\u53D6 \u6D88" : "\u4E00\u952E\u5347\u661F";
        this.updateDown(1);
        this.updateModel();
        var lv = ZhanLingModel.ins().getZhanLingDataByLevel(this.zlId);
        var zlLevel = GlobalConfig.ZhanLingLevel[this.zlId][lv];
        if (zlLevel.activeLv && this.isTopLevel) {
            Activationtongyong.show(0, zlLevel.zlNameLabel, "", true, null, "", zlLevel.innerAppearance);
        }
    };
    ZhanLingPanel.prototype.TanlentLvUpGrade = function () {
        var talentLv = ZhanLingModel.ins().getZhanLingDataByTalentLv(this.zlId);
        var lv = ZhanLingModel.ins().getZhanLingDataByLevel(this.zlId);
        var zlLevel = GlobalConfig.ZhanLingLevel[this.zlId][lv];
        if (zlLevel && talentLv && talentLv != 1 && this.isTopLevel) {
            Activationtongyong.show(1, talentLv + "\u7EA7\u5929\u8D4B", "", true, null, "", zlLevel.innerAppearance);
        }
    };
    ZhanLingPanel.prototype.showIconTips = function () {
        var id = MoneyConst.yuanbao;
        switch (this.costType) {
            case MoneyConst.yuanbao:
                ViewManager.ins().open(ItemCurrencyWin, id, this.costCount);
                break;
            case ItemType.TYPE_1:
                id = GlobalConfig.ZhanLingConfig.stageitemid;
                ViewManager.ins().open(ItemDetailedWin, 0, id, this.costCount);
                break;
            case ItemType.TYPE_22:
                id = GlobalConfig.ZhanLingBase[this.zlId].mat;
                ViewManager.ins().open(ZhanlingZBTipWin, id);
                break;
        }
    };
    ZhanLingPanel.prototype.autoUpStar = function () {
        if (this.isAutoUp) {
            var buy = this.checkBoxs.selected ? 1 : 0;
            if (!this._tick) {
                if (!this.checkUpStar()) {
                    this.isAutoUp = false;
                    TimerManager.ins().remove(this.autoUpStar, this);
                    return;
                }
            }
            ZhanLing.ins().sendZhanLingUpExp(this.zlId, buy);
        }
    };
    ZhanLingPanel.prototype.checkUpStar = function () {
        if (this.currentState == "skin_max" || this.currentState == "zl_max") {
            UserTips.ins().showTips("|C:0xff0000&T:\u5DF2\u6EE1\u7EA7");
            this.upBtn.label = "\u4E00\u952E\u5347\u661F";
            return false;
        }
        if (!ZhanLingModel.ins().getZhanLingDataById(this.zlId)) {
            UserTips.ins().showTips("|C:0xff0000&T:\u76AE\u80A4\u672A\u6FC0\u6D3B");
            this.upBtn.label = "\u4E00\u952E\u5347\u661F";
            return false;
        }
        var buy = this.checkBoxs.selected ? 1 : 0;
        var arr = this.getCostValue();
        var curCount = arr[0];
        var needCount = arr[1];
        if (!curCount || curCount < needCount) {
            if (buy) {
                curCount = Actor.yb;
                needCount = GlobalConfig.ZhanLingConfig.unitPrice * needCount;
                if (!curCount || curCount < needCount) {
                    UserTips.ins().showTips("|C:0xff0000&T:\u5143\u5B9D\u4E0D\u8DB3");
                    this.upBtn.label = "\u4E00\u952E\u5347\u661F";
                    return false;
                }
            }
            else {
                UserTips.ins().showTips("|C:0xff0000&T:\u6218\u7075\u8FDB\u9636\u4E39\u4E0D\u8DB3,\u53EF\u52FE\u9009\u81EA\u52A8\u8D2D\u4E70\u5347\u7EA7");
                this.upBtn.label = "\u4E00\u952E\u5347\u661F";
                return false;
            }
        }
        this.upBtn.label = "\u53D6 \u6D88";
        return true;
    };
    ZhanLingPanel.prototype.sort = function (a, b) {
        var aconfig = GlobalConfig.ZhanLingEquip[a.configID];
        var bconfig = GlobalConfig.ZhanLingEquip[b.configID];
        if (aconfig.level > bconfig.level)
            return -1;
        else
            return 1;
    };
    ZhanLingPanel.prototype.getIndexRule = function () {
        var index = 0;
        ZhanLingModel.ins().updateShowZLlist();
        index = ZhanLingModel.ins().showZLlist[0].id;
        for (var i = 0; i < ZhanLingModel.ins().showZLlist.length; i++) {
            var isUpStar = ZhanLingModel.ins().isUpGradeByStar(ZhanLingModel.ins().showZLlist[i].id);
            var isUpTalent = ZhanLingModel.ins().isUpGradeByTalent(ZhanLingModel.ins().showZLlist[i].id);
            if (isUpStar || isUpTalent) {
                index = ZhanLingModel.ins().showZLlist[i].id;
                break;
            }
            else {
                var isAct = ZhanLingModel.ins().getZhanLingDataByLevel(ZhanLingModel.ins().showZLlist[i].id);
                if (!isAct) {
                    if (ZhanLingModel.ins().getZhanLingDataById(GlobalConfig.ZhanLingBase[index].id))
                        index = ZhanLingModel.ins().showZLlist[i].id;
                    else if (GlobalConfig.ZhanLingBase[index].sort > GlobalConfig.ZhanLingBase[ZhanLingModel.ins().showZLlist[i].id].sort) {
                        index = ZhanLingModel.ins().showZLlist[i].id;
                    }
                }
            }
        }
        return index;
    };
    ZhanLingPanel.prototype.onChange = function () {
        if (this.list.scrollV < 39) {
            this.btn0.visible = false;
            this.btn1.visible = true;
        }
        else if (this.list.scrollV >= this.list.contentHeight - this.list.height - 39) {
            this.btn0.visible = true;
            this.btn1.visible = false;
        }
        else {
            this.btn0.visible = true;
            this.btn1.visible = true;
        }
        if (this.list.numElements <= 4) {
            this.btn0.visible = this.btn1.visible = false;
        }
        this.rightRed0.visible = this.btn0.visible ? this["hxRedPoint"].visible : false;
        this.rightRed1.visible = this.btn1.visible ? this["hxRedPoint"].visible : false;
    };
    ZhanLingPanel.prototype.setStartPosition = function (startPos) {
        if (this.listScroller.height >= this.list.contentHeight)
            startPos = 0;
        else {
            var maxHeight = this.list.contentHeight - this.listScroller.height;
            maxHeight = maxHeight > 0 ? maxHeight : 0;
            if (startPos >= maxHeight)
                startPos = maxHeight;
        }
        this.list.scrollV = startPos;
    };
    ZhanLingPanel.prototype.getDrugItemByIndex = function (sortId) {
        var itemid = 0;
        var zllconfig = GlobalConfig.ZhanLingConfig;
        for (var k in zllconfig.upgradeInfo) {
            var i = zllconfig.upgradeInfo[k].sort;
            if (i == sortId) {
                itemid = Number(k);
                break;
            }
        }
        return itemid;
    };
    return ZhanLingPanel;
}(BaseEuiView));
__reflect(ZhanLingPanel.prototype, "ZhanLingPanel");
//# sourceMappingURL=ZhanLingPanel.js.map