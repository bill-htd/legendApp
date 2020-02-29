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
var HeartMethodDecomposePanel = (function (_super) {
    __extends(HeartMethodDecomposePanel, _super);
    function HeartMethodDecomposePanel() {
        var _this = _super.call(this) || this;
        _this.cardList = null;
        _this.cardCollection = null;
        _this.checkBoxNum = 4;
        _this.itemListScrollV = 0;
        _this.resolveIng = false;
        _this._addNum = 0;
        _this._chipNum = 0;
        _this.skinName = "heartmethodDecomposeSkin";
        return _this;
    }
    HeartMethodDecomposePanel.prototype.childrenCreated = function () {
        this.itemList.itemRenderer = HeartMethodDecomposeItemRenderer;
        this.itemList.useVirtualLayout = true;
    };
    HeartMethodDecomposePanel.prototype.open = function () {
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
        this.addTouchEvent(this.bgClose, this.onTap);
        this.observe(HeartMethod.ins().postOneKeyDecompose, this.onDecomposeResult);
        this.heartId = param[0];
        this.initCardList();
        this.resetCheckBox();
        this.updateShatter();
    };
    HeartMethodDecomposePanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeObserve();
        this.cleanCardList();
    };
    HeartMethodDecomposePanel.prototype.onDecomposeResult = function (param) {
        var _this = this;
        if (param[0]) {
            var heardId = param[1];
            var len = param[2];
            if (len) {
            }
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
    HeartMethodDecomposePanel.prototype.playEffect = function () {
        var num = this.itemList.numChildren;
        for (var i = 0; i < num; i++) {
            var item = this.itemList.getChildAt(i);
            if (item) {
                item.playEffect();
            }
        }
    };
    HeartMethodDecomposePanel.prototype.onShatterChange = function () {
        this.updateShatter();
    };
    HeartMethodDecomposePanel.prototype.onListTap = function (e) {
        if (e && e.currentTarget) {
            var index = this.itemList.selectedIndex;
            if (index < 0) {
                return;
            }
            var itemRenderer = this.itemList.getVirtualElementAt(index);
            if (itemRenderer
                && itemRenderer instanceof HeartMethodDecomposeItemRenderer
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
    HeartMethodDecomposePanel.prototype.onTap = function (e) {
        if (e && e.currentTarget) {
            switch (e.currentTarget) {
                case this.decomposeBtn:
                    this.decomposeHeart();
                    break;
                case this.bgClose:
                    ViewManager.ins().close(this);
                    break;
            }
        }
    };
    HeartMethodDecomposePanel.prototype.decomposeHeart = function () {
        if (this.resolveIng)
            return;
        if (this.cardList && this.cardList.length > 0) {
            var rbc = null;
            var idList = [];
            for (var _i = 0, _a = this.cardList; _i < _a.length; _i++) {
                var v = _a[_i];
                if (v && v.isSelected && v.itemData && v.itemData.itemConfig) {
                    idList.push(v.itemData);
                }
            }
            if (idList.length > 0) {
                this.resolveIng = true;
                HeartMethod.ins().sendOneKeyDecompose(this.heartId, idList);
                return;
            }
        }
        UserTips.ins().showTips("当前无选择任何心法");
    };
    HeartMethodDecomposePanel.prototype.onCBTap = function (e) {
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
    HeartMethodDecomposePanel.prototype.updateShatter = function () {
        var splitItem = GlobalConfig.HeartMethodConfig[this.heartId].splitItem;
        var itemConfig = GlobalConfig.ItemConfig[splitItem];
        this.suipianIcon.source = itemConfig.icon + "_png";
        var item = UserBag.ins().getBagItemById(itemConfig.id);
        this.suipianNum.text = (item ? item.count : 0) + "";
    };
    HeartMethodDecomposePanel.prototype.updateAddShatter = function () {
        var addNum = 0;
        var rbc = null;
        if (this.cardList && this.cardList.length > 0) {
            for (var _i = 0, _a = this.cardList; _i < _a.length; _i++) {
                var v = _a[_i];
                if (v && v.isSelected && v.itemData && v.itemData.itemConfig) {
                    rbc = HeartMethod.ins().getHeartCfg(v.itemData);
                    if (rbc) {
                        addNum += rbc.splitNum;
                    }
                }
            }
        }
        this._addNum = addNum;
        this.suipianAdd.text = addNum ? "+" + addNum : "";
    };
    HeartMethodDecomposePanel.prototype.setQualitySelected = function (qua, selected) {
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
    HeartMethodDecomposePanel.prototype.getCheckBoxSelected = function (qualityIndex) {
        var cb = this["cb" + (qualityIndex - 1)];
        if (cb) {
            return cb.selected;
        }
        return false;
    };
    HeartMethodDecomposePanel.prototype.resetCheckBox = function (defaultIndex) {
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
    HeartMethodDecomposePanel.prototype.selectHeartItem = function (list) {
        var hlist = [];
        for (var i = 0; i < list.length; i++) {
            var config = GlobalConfig.HeartMethodStarConfig[list[i].configID];
            if (this.heartId == config.heartmethodId)
                hlist.push(list[i]);
        }
        return hlist;
    };
    HeartMethodDecomposePanel.prototype.initCardList = function () {
        this.cleanCardList();
        this.cardList = [];
        var totallist = UserBag.ins().getBagGoodsByType(ItemType.TYPE_18);
        var list = this.selectHeartItem(totallist);
        if (list && list.length > 0) {
            var rdid = null;
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var v = list_1[_i];
                for (var i = 0; i < v.count; i++) {
                    rdid = new HeartMethodDecomposeItemData();
                    rdid.itemData = v;
                    this.cardList.push(rdid);
                }
            }
            this.cardList.sort(this.sortList);
        }
        this.cardCollection = new eui.ArrayCollection(this.cardList);
        this.itemList.dataProvider = this.cardCollection;
    };
    HeartMethodDecomposePanel.prototype.cleanCardList = function () {
        this.cardList = null;
        this.cardCollection = null;
        this.itemList.dataProvider = null;
    };
    HeartMethodDecomposePanel.prototype.sortList = function (a, b) {
        var aq = ItemConfig.getQuality(a.itemData.itemConfig);
        var bq = ItemConfig.getQuality(b.itemData.itemConfig);
        if (aq > bq)
            return -1;
        if (aq < bq)
            return 1;
        var arbc = HeartMethod.ins().getHeartCfg(a.itemData);
        var brbc = HeartMethod.ins().getHeartCfg(b.itemData);
        if (arbc.star > brbc.star)
            return -1;
        else
            return 1;
    };
    return HeartMethodDecomposePanel;
}(BaseEuiView));
__reflect(HeartMethodDecomposePanel.prototype, "HeartMethodDecomposePanel");
ViewManager.ins().reg(HeartMethodDecomposePanel, LayerManager.UI_Popup);
//# sourceMappingURL=HeartMethodDecomposePanel.js.map