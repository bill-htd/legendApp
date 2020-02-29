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
var GwShengWuChooseView = (function (_super) {
    __extends(GwShengWuChooseView, _super);
    function GwShengWuChooseView() {
        return _super.call(this) || this;
    }
    GwShengWuChooseView.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "GwShengWuChooseSkin";
        this._aryDate = new eui.ArrayCollection();
        this.list.dataProvider = this._aryDate;
        this.list.itemRenderer = GwShengwurenderItem;
    };
    GwShengWuChooseView.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this._data = param[0];
        this.addTouchEvent(this.bgClose, this.closeHandler);
        this.addTouchEvent(this.list, this.clickHandler);
        this.updateView();
    };
    GwShengWuChooseView.prototype.updateView = function () {
        var temp = GwShengWuChooseView.getGwItemType(this._data);
        temp.sort(this.sortFun);
        if (this._data.itemId) {
            var tempData = new GwItem();
            tempData.itemId = this._data.itemId;
            tempData.weaponId = this._data.weaponId;
            tempData.isCur = true;
            temp.unshift(tempData);
        }
        if (temp.length == 0) {
            this.tipLabel2.visible = true;
        }
        else {
            this.tipLabel2.visible = false;
        }
        this._aryDate.replaceAll(temp);
    };
    GwShengWuChooseView.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.bgClose, this.closeHandler);
        this.removeTouchEvent(this.list, this.clickHandler);
        this.list.dataProvider = null;
    };
    GwShengWuChooseView.prototype.closeHandler = function (e) {
        ViewManager.ins().close(this);
    };
    GwShengWuChooseView.prototype.clickHandler = function (e) {
        if (e.target instanceof eui.Button) {
            var tempRender = e.target.parent;
            GodWeaponCC.ins().inlayItem(this._data.weaponId, this._data.pos, tempRender.datathis.itemId);
            ViewManager.ins().close(this);
        }
    };
    GwShengWuChooseView.getGwItemType = function (_data) {
        var temp = [];
        var itemData = UserBag.ins().bagModel[UserBag.BAG_TYPE_OTHTER];
        var j = 0;
        if (itemData) {
            for (var i = 0; i < itemData.length; i++) {
                var type = ItemConfig.getType(itemData[i].itemConfig);
                var job = ItemConfig.getJob(itemData[i].itemConfig);
                if (ItemConfig.getType(itemData[i].itemConfig) == 15 && ItemConfig.getJob(itemData[i].itemConfig) == _data.weaponId) {
                    for (j = 0; j < itemData[i].count; j++) {
                        var tempData = new GwItem();
                        tempData.itemId = itemData[i].configID;
                        tempData.weaponId = _data.weaponId;
                        temp.push(tempData);
                    }
                }
            }
        }
        var tempGw = GodWeaponCC.ins().allGodItemData[_data.weaponId];
        tempGw = tempGw.concat();
        var objdata = {};
        for (j = 0; j < tempGw.length; j++) {
            if (tempGw[j].itemId) {
                if (objdata[tempGw[j].itemId] == undefined) {
                    objdata[tempGw[j].itemId] = 1;
                }
                else {
                    objdata[tempGw[j].itemId]++;
                }
            }
        }
        for (j = 0; j < tempGw.length; j++) {
            if (tempGw[j].itemId) {
                if (tempGw[j].config.onlyOne) {
                    var only = tempGw[j].config.onlyOne;
                    if (tempGw[j].config.onlyOne == objdata[tempGw[j].itemId]) {
                        GwShengWuChooseView.deleteItemData(tempGw[j].itemId, temp);
                        delete objdata[tempGw[j].itemId];
                    }
                }
            }
        }
        return temp;
    };
    GwShengWuChooseView.prototype.sortFun = function (a, b) {
        return b.power - a.power;
    };
    GwShengWuChooseView.deleteItemData = function (id, temp) {
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].itemId == id) {
                temp.splice(i--, 1);
            }
        }
    };
    return GwShengWuChooseView;
}(BaseEuiView));
__reflect(GwShengWuChooseView.prototype, "GwShengWuChooseView");
ViewManager.ins().reg(GwShengWuChooseView, LayerManager.UI_Popup);
var GwShengwurenderItem = (function (_super) {
    __extends(GwShengwurenderItem, _super);
    function GwShengwurenderItem() {
        var _this = _super.call(this) || this;
        _this.qualityName = ["凡品", "精品", "极品", "神品"];
        _this.skinName = "GWChooseItemSkin";
        _this.best.visible = false;
        return _this;
    }
    GwShengwurenderItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (!this.data) {
            return;
        }
        this.datathis = this.data;
        var qualityNum = ItemConfig.getQuality(this.datathis.itemConfig);
        this.nameTxt.text = this.datathis.itemConfig.name;
        this.nameTxt.textColor = ItemConfig.getQualityColor(this.datathis.itemConfig);
        this.attr.text = this.datathis.addatrStr;
        this.power.text = "\u8BC4\u5206\uFF1A" + this.datathis.power;
        this.itemIcon.imgJob.source = "job" + this.datathis.weaponId + "Item";
        this.itemIcon.imgIcon.source = this.datathis.itemConfig.icon + "_png";
        this.itemIcon.imgBg.source = 'quality' + qualityNum;
        if (qualityNum - 1 < 0) {
            this.quality.text = this.qualityName[0];
        }
        else {
            this.quality.text = this.qualityName[qualityNum - 1];
        }
        this.quality.textColor = ItemConfig.getQualityColor(this.datathis.itemConfig);
        this.addNameLb.text = "\u88C5\u5907\u8BE5\u5723\u7269\u53EF\u63D0\u5347" + this.datathis.skillName + "\u7B49\u7EA7";
        if (this.datathis.isCur == true) {
            this.now.visible = true;
            this.changeBtn.visible = false;
        }
        else {
            this.now.visible = false;
            this.changeBtn.visible = true;
        }
    };
    return GwShengwurenderItem;
}(BaseItemRender));
__reflect(GwShengwurenderItem.prototype, "GwShengwurenderItem");
var Gwshengwuitem_icon = (function (_super) {
    __extends(Gwshengwuitem_icon, _super);
    function Gwshengwuitem_icon() {
        return _super.call(this) || this;
    }
    return Gwshengwuitem_icon;
}(eui.Component));
__reflect(Gwshengwuitem_icon.prototype, "Gwshengwuitem_icon");
//# sourceMappingURL=GwShengWuChooseView.js.map