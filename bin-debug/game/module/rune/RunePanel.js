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
var RunePanel = (function (_super) {
    __extends(RunePanel, _super);
    function RunePanel() {
        var _this = _super.call(this) || this;
        _this.runeList = null;
        _this.curRole = 0;
        _this.selectedIndex = 0;
        _this.upgradeDifference = 0;
        _this.selectItem = null;
        _this.openNum = 0;
        return _this;
    }
    RunePanel.prototype.childrenCreated = function () {
        this.initRunes();
    };
    RunePanel.prototype.initRunes = function () {
        this.runeList = [];
        var len = 8;
        var rd = null;
        for (var i = 0; i < len; i++) {
            rd = this["rune" + i];
            if (rd) {
                this.runeList.push(rd);
            }
        }
    };
    RunePanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var len = this.runeList.length;
        this.selectedIndex = isNaN(param[1]) ? this.selectedIndex : param[1];
        if (this.selectedIndex < 0)
            this.selectedIndex = 0;
        if (this.selectedIndex >= len)
            this.selectedIndex = len - 1;
        this.addTouchEvent(this.replace, this.onTap);
        this.addTouchEvent(this.uplevel, this.onTap);
        this.addTouchEvent(this.runeBook, this.onTap);
        this.addTouchEvent(this.bookBtn, this.onTap);
        this.addTouchEvent(this.btn1, this.onTap);
        this.addTouchEvent(this.btn2, this.onTap);
        this.observe(Rune.ins().postInlayResult, this.onInlayResult);
        this.observe(Rune.ins().postUpgradeResult, this.onUpgradeResult);
        this.observe(UserZs.ins().postZsData, this.onLevelUp);
        this.observe(Actor.ins().postPowerChange, this.onLevelUp);
        this.observe(GameLogic.ins().postRuneShatter, this.onShatterChange);
        this.observe(UserBag.ins().postItemAdd, this.onItemChange);
        this.observe(UserBag.ins().postItemDel, this.onItemChange);
        this.observe(UserBag.ins().postItemChange, this.onItemChange);
        this.observe(Rune.ins().postDelRune, this.onLevelUp);
        this.updateRunes(true);
        var runeDisplay = null;
        for (var i = 0; i < len; i++) {
            runeDisplay = this.runeList[i];
            runeDisplay.init();
            if (runeDisplay && runeDisplay.currentState == RuneDisplay.SKIN_STATE_UNLOCK) {
                this.addTouchEvent(runeDisplay, this.onRuneTap);
                if (this["linebg" + i])
                    this["linebg" + i].source = "zwfwline2";
            }
            else {
                if (this["linebg" + i])
                    this["linebg" + i].source = "zwfwline1";
            }
        }
        this.updateRuneDetail();
        this.updateSelectedEffect();
        this.showRuneRedPoint();
        this.setNextOpenInfo();
    };
    RunePanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.replace, this.onTap);
        this.removeTouchEvent(this.uplevel, this.onTap);
        this.removeTouchEvent(this.runeBook, this.onTap);
        this.removeTouchEvent(this.bookBtn, this.onTap);
        this.removeTouchEvent(this.btn1, this.onTap);
        this.removeTouchEvent(this.btn2, this.onTap);
        this.removeObserve();
        var runeDisplay = null;
        var len = this.runeList.length;
        for (var i = 0; i < len; i++) {
            runeDisplay = this.runeList[i];
            runeDisplay.close();
        }
    };
    RunePanel.prototype.setNextOpenInfo = function () {
        var rlpc = RuneConfigMgr.ins().getLockCfg(this.openNum);
        if (rlpc)
            this.levelsay.text = "\u901A\u8FC7\u7B2C" + rlpc.lockLv + "\u5173\u5F00\u542F\u4E0B\u4E00\u51F9\u69FD";
        else
            this.levelsay.text = "";
    };
    RunePanel.prototype.onLevelUp = function () {
        this.updateRunes();
        this.updateRuneDetail();
        this.showRuneRedPoint();
        this.showReplaceRedPoint();
    };
    RunePanel.prototype.onUpgradeResult = function (param) {
        if (param[0]) {
            UserTips.ins().showTips("\u5347\u7EA7\u6218\u7EB9\u6210\u529F");
            var roleIndex = param[1];
            this.curRole = roleIndex;
            this.updateRunes();
            this.updateRuneDetail();
            this.showRuneRedPoint();
            this.showReplaceRedPoint();
        }
        else {
            UserTips.ins().showTips("\u5347\u7EA7\u6218\u7EB9\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5");
        }
    };
    RunePanel.prototype.onInlayResult = function (param) {
        if (param[0]) {
            UserTips.ins().showTips("\u9576\u5D4C\u6218\u7EB9\u6210\u529F");
            var roleIndex = param[1];
            var posIndex = param[2];
            var id = param[3];
            RuneDataMgr.ins().replaceRune(roleIndex, posIndex, id);
            this.curRole = roleIndex;
            this.updateRunes();
            this.updateRuneDetail();
            this.showRuneRedPoint();
            this.showReplaceRedPoint();
        }
        else {
            UserTips.ins().showTips("\u9576\u5D4C\u6218\u7EB9\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5");
        }
    };
    RunePanel.prototype.onShatterChange = function () {
        this.updateRuneDetail();
        this.showRuneRedPoint();
    };
    RunePanel.prototype.onItemChange = function () {
        this.showRuneRedPoint();
        this.showReplaceRedPoint();
    };
    RunePanel.prototype.onTap = function (e) {
        if (e && e.currentTarget) {
            switch (e.currentTarget) {
                case this.replace:
                    this.showReplaceWin();
                    break;
                case this.uplevel:
                    this.upgradeRune();
                    break;
                case this.runeBook:
                    ViewManager.ins().open(RuneAttrWin, this.curRole);
                    break;
                case this.bookBtn:
                    ViewManager.ins().open(RuneBookWin);
                    break;
                case this.btn1:
                    ViewManager.ins().open(TreasureHuntWin, 1);
                    break;
                case this.btn2:
                    ViewManager.ins().open(FbWin, 2);
                    break;
            }
        }
    };
    RunePanel.prototype.upgradeRune = function () {
        var rd = this.getRuneDisplay(this.selectedIndex);
        if (rd) {
            switch (rd.currentState) {
                case RuneDisplay.SKIN_STATE_LOCK:
                case RuneDisplay.SKIN_STATE_READY:
                    UserTips.ins().showTips("\u8BF7\u5148\u89E3\u9501");
                    break;
                case RuneDisplay.SKIN_STATE_UNLOCK:
                    var ic = this.getCurIC();
                    if (ic) {
                        var next = GlobalConfig.ItemConfig[ic.id + 1];
                        if (!next) {
                            UserTips.ins().showTips("\u6218\u7EB9\u7B49\u7EA7\u5DF2\u6EE1\u65E0\u6CD5\u8FDB\u884C\u5347\u7EA7");
                        }
                        else {
                            if (this.upgradeDifference <= 0) {
                                Rune.ins().sendUpgrade(this.curRole, this.selectedIndex);
                            }
                            else {
                                UserTips.ins().showTips("\u6218\u7EB9\u7CBE\u534E\u4E0D\u8DB3\uFF0C\u5206\u89E3\u6218\u7EB9\u53EF\u83B7\u5F97\u6218\u7EB9\u7CBE\u534E");
                            }
                        }
                    }
                    else {
                        UserTips.ins().showTips("\u8BF7\u5148\u9576\u5D4C\u4E00\u4E2A\u6218\u7EB9");
                    }
                    break;
            }
        }
    };
    RunePanel.prototype.showReplaceWin = function () {
        var rd = this.getRuneDisplay(this.selectedIndex);
        if (rd) {
            switch (rd.currentState) {
                case RuneDisplay.SKIN_STATE_LOCK:
                case RuneDisplay.SKIN_STATE_READY:
                    UserTips.ins().showTips("\u8BF7\u5148\u89E3\u9501");
                    break;
                case RuneDisplay.SKIN_STATE_UNLOCK:
                    ViewManager.ins().open(RuneReplaceWin, this.selectedIndex, this.curRole, rd.data, this.runeTypeList);
                    break;
            }
        }
    };
    RunePanel.prototype.onRuneTap = function (e) {
        if (e && e.currentTarget) {
            var rd = e.currentTarget;
            this.selectedIndex = rd.pos;
            this.updateRuneDetail();
            this.updateSelectedEffect();
            this.showReplaceRedPoint();
            if (rd.currentState == RuneDisplay.SKIN_STATE_UNLOCK) {
                var runeData = RuneDataMgr.ins().getRune(this.curRole, this.selectedIndex);
                if (runeData && runeData.configID <= 0) {
                    ViewManager.ins().open(RuneReplaceWin, this.selectedIndex, this.curRole, rd.data, this.runeTypeList);
                }
            }
        }
    };
    RunePanel.prototype.updateSelectedEffect = function () {
        if (this.runeList) {
            for (var _i = 0, _a = this.runeList; _i < _a.length; _i++) {
                var v = _a[_i];
                if (v) {
                    v.showOrHideSelected(v.pos == this.selectedIndex);
                }
            }
        }
    };
    RunePanel.prototype.showLink = function () {
        this.linkGroup.visible = false;
        var rdList = RuneDataMgr.ins().getRoleRune(this.curRole);
        if (!rdList)
            return;
        var isShow = true;
        var cfg;
        var len = this.runeList.length;
        for (var i = 0; i < len; i++) {
            var rd = rdList[i];
            cfg = RuneConfigMgr.ins().getBaseCfg(rd);
            if (cfg) {
                isShow = false;
                break;
            }
        }
        this.linkGroup.visible = isShow;
    };
    RunePanel.prototype.updateRunes = function (init) {
        var rdList = RuneDataMgr.ins().getRoleRune(this.curRole);
        if (!rdList)
            return;
        this.openNum = 0;
        this.runeTypeList = [];
        var lockNum = 0;
        var rd = null;
        var cfg = null;
        var rDisplay = null;
        var len = this.runeList.length;
        var attrPoint = 0;
        this.runeBook.visible = false;
        for (var i = 0; i < len; i++) {
            rd = rdList[i];
            cfg = RuneConfigMgr.ins().getBaseCfg(rd);
            if (cfg)
                attrPoint += UserBag.getAttrPower(cfg.attr) + (cfg.power || 0);
            rDisplay = this.runeList[i];
            if (rd.configID && rd.itemConfig) {
                this.runeTypeList.push(ItemConfig.getSubType(rd.itemConfig));
            }
            if (rDisplay) {
                rDisplay.setPos(i);
                if (rd && rd.itemConfig && rd.itemConfig.id > 0) {
                    rDisplay.setData(rd);
                    this.runeBook.visible = true;
                }
                else {
                    rDisplay.cleanData();
                }
                if (rDisplay.currentState == RuneDisplay.SKIN_STATE_UNLOCK)
                    this.openNum += 1;
                if (rDisplay.currentState == RuneDisplay.SKIN_STATE_LOCK) {
                    lockNum += 1;
                    if (lockNum == 1)
                        rDisplay.setLockTF(true);
                    else
                        rDisplay.setLockTF(false);
                }
                else {
                    rDisplay.setLockTF(false);
                }
            }
        }
        this.powerPanel.setPower(attrPoint);
        if (init)
            this.setSelectedIndexRule(this.curRole);
        this.showLink();
    };
    RunePanel.prototype.updateRuneDetail = function () {
        var rd = RuneDataMgr.ins().getRune(this.curRole, this.selectedIndex);
        this.selectItem = rd;
        if (rd && rd.configID > 0) {
            this.rune8.showName(false);
            this.rune8.setData(rd);
            var itemCfg = GlobalConfig.ItemConfig[rd.itemConfig.id];
            var nameCfg = GlobalConfig.RuneNameConfig[ItemConfig.getSubType(itemCfg)];
            this.nuneName.textFlow = TextFlowMaker.generateTextFlow("|C:" + ItemConfig.getQualityColor(itemCfg) + "&T:" + nameCfg.runeName + "Lv." + itemCfg.id % 100);
            var rbc = RuneConfigMgr.ins().getBaseCfg(rd);
            var ic = this.getCurIC();
            if (!ic || !rbc)
                return;
            this.up.visible = true;
            this.showReplaceRedPoint();
            var nextRBC = null;
            nextRBC = RuneConfigMgr.ins().getBaseCfg(rd, true);
            if (nextRBC) {
                this.attrDesc.text = RuneConfigMgr.ins().getcfgAttrDesc(nextRBC);
                this.setCost(rbc);
                this.costImg.visible = true;
                this.cost.x = 328;
                this.arrow.visible = true;
            }
            else {
                this.attrDesc.text = "";
                this.costImg.visible = false;
                this.arrow.visible = false;
                this.cost.textFlow = TextFlowMaker.generateTextFlow("|C:0xf3311e&T:\u7B49\u7EA7\u5DF2\u6EE1|");
                this.cost.x = 310;
            }
            this.addAttr.text = RuneConfigMgr.ins().getcfgAttrDesc(rbc);
        }
        else {
            this.up.visible = false;
        }
    };
    RunePanel.prototype.setCost = function (cfg) {
        if (!cfg)
            return;
        var needNum = cfg.expend;
        var curNum = Actor.runeShatter;
        this.upgradeDifference = needNum - curNum;
        if (this.upgradeDifference < 0)
            this.upgradeDifference = 0;
        var colorStr = "";
        if (curNum >= needNum)
            colorStr = ColorUtil.GREEN_COLOR;
        else
            colorStr = ColorUtil.RED_COLOR;
        this.cost.textFlow = TextFlowMaker.generateTextFlow("<font color=" + colorStr + ">" + curNum + "</font><font color=" + ColorUtil.WHITE_COLOR + ">/" + needNum + "</font> ");
    };
    RunePanel.prototype.getRuneDisplay = function (pos) {
        if (this.runeList) {
            return this.runeList[pos];
        }
        return null;
    };
    RunePanel.prototype.getCurIC = function () {
        var rd = RuneDataMgr.ins().getRune(this.curRole, this.selectedIndex);
        if (rd && rd.configID > 0) {
            var itemCfg = GlobalConfig.ItemConfig[rd.configID];
            if (!this.assert(itemCfg, "ItemConfig(" + rd.configID + ")")) {
                return itemCfg;
            }
        }
        return null;
    };
    RunePanel.prototype.showRuneRedPoint = function () {
        var isShow = false;
        var rd = null;
        for (var _i = 0, _a = this.runeList; _i < _a.length; _i++) {
            var v = _a[_i];
            if (v) {
                isShow = RuneRedPointMgr.ins().checkSingleInlay(this.curRole, v.pos);
                if (!isShow) {
                    rd = v.data;
                    if (rd && rd instanceof ItemData && rd.configID > 0) {
                        isShow = RuneRedPointMgr.ins().checkSingleUpgrade(rd);
                        if (!isShow)
                            isShow = RuneRedPointMgr.ins().checkSingleReplace(this.curRole, rd);
                    }
                }
                v.redPoint.visible = isShow;
            }
        }
    };
    RunePanel.prototype.showReplaceRedPoint = function () {
        var rd = RuneDataMgr.ins().getRune(this.curRole, this.selectedIndex);
        if (rd && rd.configID > 0) {
            this.redPointReplace.visible = RuneRedPointMgr.ins().checkSingleReplace(this.curRole, rd);
            if (this.upRed) {
                this.upRed.visible = RuneRedPointMgr.ins().checkSingleUpgrade(rd);
            }
        }
        else {
            this.redPointReplace.visible = false;
            if (this.upRed) {
                this.upRed.visible = false;
            }
        }
    };
    RunePanel.prototype.setSelectedIndexRule = function (roleId) {
        var minItem = RuneDataMgr.ins().getMinRune(roleId, true);
        if (!minItem)
            return;
        for (var i = 0; i < this.runeList.length; i++) {
            if (this.runeList[i].getItemConfig() && this.runeList[i].getItemConfig().id == minItem.configID) {
                this.selectedIndex = this.runeList[i].pos;
                break;
            }
        }
    };
    RunePanel.prototype.assert = function (value, msg) {
        return Assert(value, "[" + egret.getQualifiedClassName(RunePanel) + "] " + msg + "is null!");
    };
    return RunePanel;
}(BaseView));
__reflect(RunePanel.prototype, "RunePanel");
//# sourceMappingURL=RunePanel.js.map