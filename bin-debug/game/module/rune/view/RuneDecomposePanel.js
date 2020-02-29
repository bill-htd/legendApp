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
var RuneDecomposePanel = (function (_super) {
    __extends(RuneDecomposePanel, _super);
    function RuneDecomposePanel() {
        var _this = _super.call(this) || this;
        _this.cardList = null;
        _this.cardCollection = null;
        _this.checkBoxNum = 5;
        _this.itemListScrollV = 0;
        _this.resolveIng = false;
        _this._addNum = 0;
        _this._chipNum = 0;
        return _this;
    }
    RuneDecomposePanel.prototype.childrenCreated = function () {
        this.itemList.itemRenderer = RuneDecomposeItemRenderer;
        this.itemList.useVirtualLayout = true;
    };
    RuneDecomposePanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        for (var i = 0; i < this.checkBoxNum; i++) {
            if (this["cb" + i]) {
                this.addTouchEvent(this["cb" + i], this.onCBTap);
            }
        }
        this.addTouchEvent(this.decomposeBtn, this.onTap);
        this.addTouchEvent(this.itemList, this.onListTap);
        this.observe(GameLogic.ins().postRuneShatter, this.onShatterChange);
        this.observe(GameLogic.ins().postRuneExchange, this.onShatterChange);
        this.observe(Rune.ins().postOneKeyDecomposeResult, this.onDecomposeResult);
        this.initCardList();
        this.resetCheckBox();
        this.updateShatter();
    };
    RuneDecomposePanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
        this.cleanCardList();
    };
    RuneDecomposePanel.prototype.onDecomposeResult = function (param) {
        var _this = this;
        if (param[0]) {
            var normalNum = param[1];
            var specialNum = param[2];
            var str = "";
            var num = 0;
            if (normalNum > 0) {
                str = "普通";
                num = normalNum;
            }
            else if (specialNum > 0) {
                str = "特殊";
                num = specialNum;
            }
            if (this._addNum)
                UserTips.ins().showTips("\u5206\u89E3\u6210\u529F\uFF0C|C:0x35e62d&T:\u6218\u7EB9\u7CBE\u534Ex" + this._addNum + "|");
            if (this._chipNum)
                UserTips.ins().showTips("\u5206\u89E3\u6210\u529F\uFF0C|C:0x35e62d&T:\u6218\u7EB9\u788E\u7247x" + this._chipNum + "|");
            this.playEffect();
            TimerManager.ins().doTimer(500, 1, function () {
                _this.initCardList();
                _this.updateShatter();
                _this.updateAddShatter();
                _this.resolveIng = false;
            }, this);
        }
        else {
            UserTips.ins().showTips("分解失败，请稍后再试");
        }
    };
    RuneDecomposePanel.prototype.playEffect = function () {
        var num = this.itemList.numChildren;
        for (var i = 0; i < num; i++) {
            var item = this.itemList.getChildAt(i);
            if (item) {
                item.playEffect();
            }
        }
    };
    RuneDecomposePanel.prototype.onShatterChange = function () {
        this.updateShatter();
    };
    RuneDecomposePanel.prototype.onListTap = function (e) {
        if (e && e.currentTarget) {
            var index = this.itemList.selectedIndex;
            if (index < 0) {
                return;
            }
            var itemRenderer = this.itemList.getVirtualElementAt(index);
            if (itemRenderer
                && itemRenderer instanceof RuneDecomposeItemRenderer
                && itemRenderer.cb) {
                var data = itemRenderer.data;
                if (data) {
                    data.isSelected = !data.isSelected;
                    this.cardCollection.itemUpdated(data);
                }
            }
            this.itemList.selectedIndex = -1;
            this.updateAddShatter();
        }
    };
    RuneDecomposePanel.prototype.onTap = function (e) {
        if (e && e.currentTarget) {
            switch (e.currentTarget) {
                case this.decomposeBtn:
                    this.decomposeRune();
                    break;
            }
        }
    };
    RuneDecomposePanel.prototype.decomposeRune = function () {
        var _this = this;
        if (this.resolveIng)
            return;
        if (this.cardList && this.cardList.length > 0) {
            var hasMaxQuality = false;
            var rbc = null;
            var ic = null;
            var idList_1 = [];
            for (var _i = 0, _a = this.cardList; _i < _a.length; _i++) {
                var v = _a[_i];
                if (v && v.isSelected && v.itemData && v.itemData.itemConfig) {
                    idList_1.push(v.itemData);
                    rbc = RuneConfigMgr.ins().getBaseCfg(v.itemData);
                    ic = v.itemData.itemConfig;
                    if (ItemConfig.getQuality(ic) >= RuneConfigMgr.ins().getOtherCfg().maxQuality) {
                        hasMaxQuality = true;
                    }
                }
            }
            if (hasMaxQuality) {
                var specialStr = "";
                var qualityStr = "";
                var plusStr = "";
                if (hasMaxQuality)
                    qualityStr = "<font color = '" + ItemBase.QUALITY_COLOR[RuneConfigMgr.ins().getOtherCfg().maxQuality] + "' size = '22'>顶级战纹</font>";
                var str = specialStr + plusStr + qualityStr;
                var finalStr = "当前分解战纹包括" + str + "，是否继续进行分解";
                WarnWin.show(finalStr, function () {
                    _this.resolveIng = true;
                    Rune.ins().sendOneKeyDecompose(idList_1);
                }, this);
                return;
            }
            else {
                if (idList_1.length > 0) {
                    this.resolveIng = true;
                    Rune.ins().sendOneKeyDecompose(idList_1);
                    return;
                }
            }
        }
        UserTips.ins().showTips("当前无选择任何战纹");
    };
    RuneDecomposePanel.prototype.onCBTap = function (e) {
        if (e && e.currentTarget) {
            var cb = e.currentTarget;
            if (cb && cb instanceof eui.CheckBox) {
                var tempCB = null;
                for (var i = 0; i < this.checkBoxNum; i++) {
                    tempCB = this["cb" + i];
                    if (tempCB && tempCB === cb) {
                        this.setQualitySelected(i + 1, cb.selected);
                        return;
                    }
                }
            }
        }
    };
    RuneDecomposePanel.prototype.updateShatter = function () {
        var shatter = Actor.runeShatter;
        this.curLab.text = shatter.toString();
        var rune = Actor.runeExchange;
        this.suipianNow.text = rune.toString();
        this.materialLab.text = "" + UserBag.ins().getBagGoodsCountById(UserBag.BAG_TYPE_OTHTER, ItemConst.JINGJIN);
    };
    RuneDecomposePanel.prototype.updateAddShatter = function () {
        var addNum = 0;
        var chip = 0;
        var materiaCount = 0;
        var rbc = null;
        var materialName = GlobalConfig.ItemConfig[GlobalConfig.RuneOtherConfig.goldItemId].name;
        if (this.cardList && this.cardList.length > 0) {
            for (var _i = 0, _a = this.cardList; _i < _a.length; _i++) {
                var v = _a[_i];
                if (v && v.isSelected && v.itemData && v.itemData.itemConfig) {
                    rbc = RuneConfigMgr.ins().getBaseCfg(v.itemData);
                    if (rbc) {
                        addNum += rbc.gain;
                        if (rbc.chip)
                            chip += rbc.chip;
                        var config = GlobalConfig.RuneComposeConfig[rbc.id];
                        if (config) {
                            materiaCount += config.count;
                        }
                    }
                }
            }
        }
        this._addNum = addNum;
        this._chipNum = chip;
        this.addLab.text = addNum > 0 ? "+" + addNum + "  " : "";
        this.suipianAdd.text = chip ? "+" + chip : "";
        this.materialLab.text = "" + UserBag.ins().getBagGoodsCountById(UserBag.BAG_TYPE_OTHTER, ItemConst.JINGJIN);
        this.addMaterialLab.text = materiaCount > 0 ? "  +" + materiaCount : "";
    };
    RuneDecomposePanel.prototype.setQualitySelected = function (qua, selected) {
        if (qua < 0) {
            for (var _i = 0, _a = this.cardList; _i < _a.length; _i++) {
                var v = _a[_i];
                if (v.itemData && v.itemData.itemConfig) {
                    v.isSelected = false;
                }
            }
        }
        else {
            for (var _b = 0, _c = this.cardList; _b < _c.length; _b++) {
                var v = _c[_b];
                if (v.itemData && v.itemData.itemConfig) {
                    if (ItemConfig.getQuality(v.itemData.itemConfig) == qua) {
                        v.isSelected = selected;
                    }
                }
            }
        }
        var len = this.cardCollection.length;
        for (var i = 0; i < len; i++) {
            this.cardCollection.itemUpdated(this.cardList[i]);
        }
        this.updateAddShatter();
    };
    RuneDecomposePanel.prototype.getCheckBoxSelected = function (qualityIndex) {
        var cb = this["cb" + (qualityIndex - 1)];
        if (cb) {
            return cb.selected;
        }
        return false;
    };
    RuneDecomposePanel.prototype.resetCheckBox = function (defaultIndex) {
        if (defaultIndex === void 0) { defaultIndex = 1; }
        var cb = null;
        for (var i = 0; i < this.checkBoxNum; i++) {
            cb = this["cb" + i];
            if (cb && cb instanceof eui.CheckBox) {
                cb.selected = (i + 1) == defaultIndex;
            }
        }
        this.setQualitySelected(defaultIndex, true);
    };
    RuneDecomposePanel.prototype.initCardList = function () {
        this.cleanCardList();
        this.cardList = [];
        var list = UserBag.ins().getBagGoodsByType(6);
        if (list && list.length > 0) {
            var rdid = null;
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var v = list_1[_i];
                for (var i = 0; i < v.count; i++) {
                    rdid = new RuneDecomposeItemData();
                    rdid.itemData = v;
                    this.cardList.push(rdid);
                }
            }
            this.cardList.sort(this.sortList);
        }
        this.cardCollection = new eui.ArrayCollection(this.cardList);
        this.itemList.dataProvider = this.cardCollection;
    };
    RuneDecomposePanel.prototype.cleanCardList = function () {
        this.cardList = null;
        this.cardCollection = null;
        this.itemList.dataProvider = null;
    };
    RuneDecomposePanel.prototype.sortList = function (a, b) {
        var aq = ItemConfig.getQuality(a.itemData.itemConfig);
        var bq = ItemConfig.getQuality(b.itemData.itemConfig);
        if (aq > bq)
            return -1;
        if (aq < bq)
            return 1;
        var arbc = RuneConfigMgr.ins().getBaseCfg(a.itemData);
        var brbc = RuneConfigMgr.ins().getBaseCfg(b.itemData);
        if (arbc && brbc) {
            var lvlA = arbc.id % 100;
            var lvlB = brbc.id % 100;
            if (lvlA > lvlB) {
                return -1;
            }
            else if (lvlA < lvlB) {
                return 1;
            }
        }
        return a.itemData.configID - b.itemData.configID;
    };
    return RuneDecomposePanel;
}(BaseView));
__reflect(RuneDecomposePanel.prototype, "RuneDecomposePanel");
//# sourceMappingURL=RuneDecomposePanel.js.map