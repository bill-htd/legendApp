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
var c_grewup = "升 级";
var c_mix = "合 成";
var OrangeEquipPanel = (function (_super) {
    __extends(OrangeEquipPanel, _super);
    function OrangeEquipPanel() {
        var _this = _super.call(this) || this;
        _this._roleId = 0;
        _this.name = "神装";
        return _this;
    }
    OrangeEquipPanel.prototype.childrenCreated = function () {
        this.init();
    };
    OrangeEquipPanel.prototype.init = function () {
        this.curIndex = 0;
        this.getTreasureBtn.textFlow = (new egret.HtmlTextParser).parser("<a href=\"event:\"><u>" + this.getTreasureBtn.text + "</u></a>");
        this.getTreasureBtn.touchEnabled = true;
        this.chargeEff1 = new MovieClip;
        this.chargeEff1.x = this.getTreasureBtn.x + this.getTreasureBtn.width / 2;
        this.chargeEff1.y = this.getTreasureBtn.y + this.getTreasureBtn.height / 2;
        this.chargeEff1.touchEnabled = false;
        this.chargeEff1.scaleY = 0.7;
        this.chargeEff1.scaleX = 0.9;
    };
    OrangeEquipPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.getTreasureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openSmeltView, this);
        for (var i = 0; i < 8; i++) {
            var equipItem = this["equip" + i];
            this.addTouchEvent(equipItem, this.onSelect);
            this.addTouchEvent(equipItem.mixBtn, this.onSelect);
        }
        this.addTouchEvent(this.executeBtn, this.executeCB);
        this.observe(UserEquip.ins().postMixEquip, this.mixCB);
        this.observe(UserBag.ins().postItemAdd, this.updateView);
        this.observe(UserBag.ins().postItemDel, this.updateView);
        this.observe(UserBag.ins().postItemChange, this.updateView);
        this.curIndex = this.computerCurIndex();
        this.updateView();
        this.effArr = [];
    };
    OrangeEquipPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.getTreasureBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openSmeltView, this);
        for (var i = 0; i < 8; i++) {
            var equipItem = this["equip" + i];
            this.removeTouchEvent(equipItem, this.onSelect);
            this.removeTouchEvent(equipItem.mixBtn, this.onSelect);
        }
        DisplayUtils.removeFromParent(this.chargeEff1);
        this.removeTouchEvent(this.executeBtn, this.executeCB);
        this.removeObserve();
        this.cleanEff();
    };
    OrangeEquipPanel.prototype.onSelect = function (e) {
        var level = Actor.level;
        switch (e.currentTarget) {
            case this.equip0:
            case this.equip0['mixBtn']:
                this.curIndex = 0;
                break;
            case this.equip1:
            case this.equip1['mixBtn']:
                this.curIndex = 1;
                break;
            case this.equip2:
            case this.equip2['mixBtn']:
                this.curIndex = 2;
                break;
            case this.equip3:
            case this.equip3['mixBtn']:
                this.curIndex = 3;
                break;
            case this.equip4:
            case this.equip4['mixBtn']:
                this.curIndex = 4;
                break;
            case this.equip5:
            case this.equip5['mixBtn']:
                this.curIndex = 5;
                break;
            case this.equip6:
            case this.equip6['mixBtn']:
                this.curIndex = 6;
                break;
            case this.equip7:
            case this.equip7['mixBtn']:
                this.curIndex = 7;
                break;
        }
        this.updateView();
    };
    OrangeEquipPanel.prototype.executeCB = function (e) {
        var _this = this;
        if (parseInt(this.cur.text) < parseInt(this.need.text.substr(1))) {
            UserTips.ins().showTips("|C:0xf3311e&T:神装碎片不足|");
            return;
        }
        if (this.executeBtn.label == c_grewup) {
            this.grewup();
        }
        else if (this.executeBtn.label == c_mix) {
            var equipData = SubRoles.ins().getSubRoleByIndex(this._roleId).getEquipByIndex(this.curIndex);
            var configID = equipData.item.configID;
            var curItemData = GlobalConfig.ItemConfig[configID];
            if (curItemData != undefined && ItemConfig.getQuality(curItemData) == 5) {
                var config = GlobalConfig.ItemConfig[equipData.item.configID];
                var str = config.zsLevel > 0 ? (config.zsLevel + "转") : (config.level + "级");
                var color = ItemConfig.getQualityColor(config).toString(16);
                WarnWin.show("\u5F53\u524D\u90E8\u4F4D\u4E0A\u5DF2\u7A7F\u7740<font color=\"#" + color + "\">" + str + "\u4F20\u5947\u88C5\u5907</font>\uFF0C\u662F\u5426\u7EE7\u7EED\u5408\u6210\u7EA2\u8272\u88C5\u5907\uFF1F\n", function () {
                    _this.mix();
                }, this);
            }
            else {
                this.mix();
            }
        }
    };
    OrangeEquipPanel.prototype.grewup = function () {
        var nextEquipConfig = GlobalConfig.ItemConfig[this.curEquipConfigId + 1];
        if (nextEquipConfig.level > Actor.level || nextEquipConfig.zsLevel > UserZs.ins().lv) {
            UserTips.ins().showTips("|C:0xf3311e&T:升级后超过角色等级，无法升级|");
            return;
        }
        UserEquip.ins().sendGrewupEquip(this._roleId, this.curIndex);
    };
    OrangeEquipPanel.prototype.grewupCB = function (roleId, result, configID) {
        if (result == 0) {
            UserTips.ins().showTips("|C:0xf3311e&T:升级失败|");
            return;
        }
        UserTips.ins().showTips("升级成功");
        this.updateView();
    };
    OrangeEquipPanel.prototype.mix = function () {
        UserEquip.ins().sendMixEquip(this._roleId, this.curEquipConfigId, this.curIndex);
    };
    OrangeEquipPanel.prototype.mixCB = function (roleId, result, configID) {
        if (result == 0) {
            UserTips.ins().showTips("|C:0xf3311e&T:合成失败|");
            return;
        }
        UserTips.ins().showTips("合成成功,已自动穿戴至角色身上");
        this.updateView();
    };
    OrangeEquipPanel.prototype.openSmeltView = function (e) {
        ViewManager.ins().open(BreakDownView, BreakDownView.type_legend, 4);
    };
    OrangeEquipPanel.prototype.updateView = function () {
        this.updateAllEquipItem();
        this.updateDetailPanel();
        if (!UserBag.ins().getLegendHasResolve()) {
            this.chargeEff1.visible = false;
            DisplayUtils.removeFromParent(this.chargeEff1);
        }
        else {
            this.chargeEff1.visible = true;
            this.chargeEff1.playFile(RES_DIR_EFF + "chargeff1", -1);
            if (!this.chargeEff1.parent)
                this.btnGroup.addChild(this.chargeEff1);
        }
        this.setItemRedPoint();
    };
    OrangeEquipPanel.prototype.updateDetailPanel = function () {
        var equipData = SubRoles.ins().getSubRoleByIndex(this._roleId).getEquipByIndex(this.curIndex);
        if (equipData == null)
            return;
        var nextEquipData = GlobalConfig.ItemConfig[equipData.item.configID + 1];
        var needNum = 0;
        var costID = 0;
        this.costNum.visible = true;
        var q = ItemConfig.getQuality(equipData.item.itemConfig);
        if (nextEquipData == undefined && equipData.item.handle != 0 && q == 4) {
            this.mixPanel.visible = true;
            this.labelMax.visible = true;
            this.grewupPanel.visible = false;
            this.curEquipConfigId = this.updateMixPanel();
            this.executeBtn.visible = false;
            this.need.text = "";
            this.cur.text = "";
            this.costNum.visible = false;
        }
        else {
            if (nextEquipData != undefined && equipData.item.handle != 0 && q == 4 && equipData.item.itemConfig.level != 1 && UserBag.fitleEquip.indexOf(equipData.item.configID) == -1) {
                this.mixPanel.visible = false;
                this.grewupPanel.visible = true;
                this.curEquipConfigId = this.updateGrewupPanel();
                this.executeBtn.label = c_grewup;
                var grewupConfig = GlobalConfig.LegendLevelupConfig[this.curEquipConfigId];
                needNum = grewupConfig.count;
                costID = grewupConfig.itemId;
            }
            else {
                this.mixPanel.visible = true;
                this.grewupPanel.visible = false;
                this.curEquipConfigId = this.updateMixPanel();
                this.executeBtn.label = c_mix;
                var mixConfig = GlobalConfig.LegendComposeConfig[this.curEquipConfigId];
                needNum = mixConfig.count;
                costID = mixConfig.itemId;
            }
            var curNum = UserBag.ins().getBagGoodsCountById(0, costID);
            this.need.text = "/" + needNum;
            this.cur.text = curNum + "";
            if (curNum >= needNum) {
                this.cur.textColor = ColorUtil.GREEN_COLOR_N;
            }
            else {
                this.cur.textColor = ColorUtil.RED_COLOR_N;
            }
            this.executeBtn.visible = true;
            this.labelMax.visible = false;
        }
    };
    OrangeEquipPanel.prototype.updateMixPanel = function () {
        var level = Actor.level;
        var itemData;
        var configID;
        if (level >= 1) {
            var pos = this.curIndex;
            var role = SubRoles.ins().getSubRoleByIndex(this._roleId);
            configID = UserEquip.ins().getEquipConfigIDByPosAndQualityByGod(role, pos, 4, SubRoles.ins().getSubRoleByIndex(this._roleId).job);
            itemData = GlobalConfig.ItemConfig[configID];
        }
        if (itemData != undefined) {
            if (itemData.zsLevel > 0) {
                this.mixPanel['level'].text = itemData.zsLevel + "转";
            }
            else {
                this.mixPanel['level'].text = itemData.level ? "Lv." + itemData.level : "Lv.1";
            }
            this.mixPanel['equipName'].text = itemData.name;
            this.mixPanel['itemIcon'].imgJob.visible = false;
            this.mixPanel['itemIcon'].setData(itemData);
        }
        var nameList = [];
        var baseAttrList = [];
        var randAttrList = [];
        var config = GlobalConfig.EquipConfig[configID];
        for (var k in AttributeData.translate) {
            if (!config[k] || config[k] <= 0)
                continue;
            baseAttrList.push(config[k] + "");
            nameList.push(AttributeData.getAttrStrByType(AttributeData.translate[k]));
            randAttrList.push(" +" + Math.floor(ItemBase.additionRange * config[k] / 100));
        }
        this.mixPanel['attributes'].baseAttr.text = ItemData.getStringByNextList(baseAttrList, randAttrList);
        this.mixPanel['attributes'].randAttr.text = "";
        this.mixPanel['attributes'].nameAttr.text = ItemData.getStringByList(nameList);
        this.mixPanel['attributes'].score.text = ItemConfig.pointCalNumber(itemData);
        return configID;
    };
    OrangeEquipPanel.prototype.updateGrewupPanel = function () {
        var equipData = SubRoles.ins().getSubRoleByIndex(this._roleId).getEquipByIndex(this.curIndex);
        var configID = equipData.item.configID;
        var curItemData = GlobalConfig.ItemConfig[configID];
        var nextItemData = GlobalConfig.ItemConfig[configID + 1];
        if (nextItemData == undefined) {
        }
        else {
            this.grewupPanel['curName'].text = curItemData.name + "";
            this.grewupPanel['nextName'].text = nextItemData.name + "";
            if (curItemData.zsLevel > 0) {
                this.grewupPanel['curLevel'].text = curItemData.zsLevel + "转";
            }
            else {
                this.grewupPanel['curLevel'].text = curItemData.level ? "Lv." + curItemData.level : "Lv.1";
            }
            if (nextItemData.zsLevel > 0) {
                this.grewupPanel['nextLevel'].text = nextItemData.zsLevel + "转";
            }
            else {
                this.grewupPanel['nextLevel'].text = nextItemData.level ? "Lv." + nextItemData.level : "Lv.1";
            }
            this.grewupPanel['curItemIcon'].imgJob.visible = false;
            this.grewupPanel['nextItemIcon'].imgJob.visible = false;
            this.grewupPanel['curItemIcon'].setData(curItemData);
            this.grewupPanel['nextItemIcon'].setData(nextItemData);
            for (var i = 1; i <= 4; i++) {
                this.grewupPanel['attributes']["arrow" + i].visible = false;
            }
            var nameList = [];
            var baseAttrList = [];
            var randAttrList = [];
            var nextBaseAttrList = [];
            var nextRandAttrList = [];
            var curEquipData = GlobalConfig.EquipConfig[configID];
            var nextEquipData = GlobalConfig.EquipConfig[configID + 1];
            var data = equipData.item;
            var ii = 1;
            for (var k in AttributeData.translate) {
                if (!curEquipData[k] || curEquipData[k] <= 0)
                    continue;
                if (data != undefined) {
                    var attr = data.att;
                    for (var index = 0; index < attr.length; index++) {
                        if (attr[index].type == AttributeData.translate[k]) {
                            randAttrList.push(' +' + attr[index].value);
                            break;
                        }
                    }
                }
                this.grewupPanel['attributes']["arrow" + ii].visible = true;
                ii++;
                baseAttrList.push(curEquipData[k] + "");
                nextBaseAttrList.push(nextEquipData[k] + "");
                nextRandAttrList.push(" +" + Math.floor(ItemBase.additionRange * nextEquipData[k] / 100));
                nameList.push(AttributeData.getAttrStrByType(AttributeData.translate[k]));
            }
            this.grewupPanel['attributes'].curBaseAttr.text = ItemData.getStringByNextList(baseAttrList, randAttrList);
            this.grewupPanel['attributes'].nextBaseAttr.text = ItemData.getStringByNextList(nextBaseAttrList, nextRandAttrList);
            this.grewupPanel['attributes'].nameAttr.text = ItemData.getStringByList(nameList);
            this.grewupPanel['attributes'].curScore.text = "评分：" + ItemConfig.pointCalNumber(curItemData);
            this.grewupPanel['attributes'].nextScore.text = "评分：" + ItemConfig.pointCalNumber(nextItemData);
        }
        return configID;
    };
    OrangeEquipPanel.prototype.updateAllEquipItem = function () {
        for (var i = 0; i < 8; i++) {
            this.updateEquipItem(i);
        }
    };
    OrangeEquipPanel.prototype.updateEquipItem = function (index) {
        var equipItem = this["equip" + index];
        if (equipItem == null)
            return;
        var equipData = SubRoles.ins().getSubRoleByIndex(this._roleId).getEquipByIndex(index);
        var itemIcon = equipItem.itemIcon;
        itemIcon.imgJob.visible = false;
        if (UserBag.fitleEquip.indexOf(equipData.item.configID) != -1 || equipData.item.handle == 0 || ItemConfig.getQuality(equipData.item.itemConfig) < 4 || (equipData.item.itemConfig.level == 1 && !equipData.item.itemConfig.zsLevel)) {
            itemIcon.setData(null);
            itemIcon.imgIcon.source = OrangeEquipPanel.defaultEquipIcon[index];
            equipItem.level.text = "";
            equipItem.mixBtn.visible = false;
            this.cleanEffOnly(index);
        }
        else {
            equipItem.mixBtn.visible = false;
            if (equipData.item.itemConfig.zsLevel > 0) {
                equipItem.level.text = equipData.item.itemConfig.zsLevel + "转";
            }
            else {
                equipItem.level.text = equipData.item.itemConfig.level ? "Lv." + equipData.item.itemConfig.level : "Lv.1";
            }
            itemIcon.setData(equipData.item.itemConfig);
            this.playEff(index);
        }
        if (this.curIndex == index) {
            equipItem.select.visible = true;
        }
        else {
            equipItem.select.visible = false;
        }
    };
    OrangeEquipPanel.prototype.playEff = function (index) {
        if (index < 0 || index > 7)
            return;
        var i = index;
        if (!this["effArr" + i]) {
            this["effArr" + i] = new MovieClip();
            this["effArr" + i].x += this["equip" + i].width / 2;
            this["effArr" + i].y += this["equip" + i].height / 2 - 15;
            this["equip" + i].addChild(this["effArr" + i]);
            this["effArr" + i].playFile(RES_DIR_EFF + "quality_05", -1);
        }
    };
    OrangeEquipPanel.prototype.cleanEffOnly = function (index) {
        if (index < 0 || index > 7)
            return;
        var i = index;
        if (this["effArr" + i]) {
            DisplayUtils.removeFromParent(this["effArr" + i]);
            this["effArr" + i] = null;
        }
    };
    OrangeEquipPanel.prototype.cleanEff = function () {
        for (var i = 0; i < 8; i++) {
            if (!this["effArr" + i])
                continue;
            DisplayUtils.removeFromParent(this["effArr" + i]);
            this["effArr" + i] = null;
        }
    };
    OrangeEquipPanel.prototype.setItemRedPoint = function () {
        for (var i = 0; i < 8; i++) {
            var equipItem = this["equip" + i];
            var role = SubRoles.ins().getSubRoleByIndex(this._roleId);
            equipItem["redPoint"].visible = UserEquip.ins().setOrangeEquipItemState(i, role);
            if (equipItem["redPoint"].visible) {
                var b = UserBag.ins().checkEqRedPoint(i, role, true);
                equipItem["redPoint"].visible = b != null ? b : equipItem["redPoint"].visible;
            }
        }
    };
    OrangeEquipPanel.prototype.computerCurIndex = function () {
        return 0;
    };
    OrangeEquipPanel.prototype.setRoleId = function (id) {
        this._roleId = id;
        this.updateView();
    };
    OrangeEquipPanel.defaultEquipIcon = [
        "xb_10",
        "xb_11",
        "xb_12",
        "xb_13",
        "xb_14",
        "xb_15",
        "xb_16",
        "xb_17",
    ];
    return OrangeEquipPanel;
}(BaseView));
__reflect(OrangeEquipPanel.prototype, "OrangeEquipPanel");
//# sourceMappingURL=OrangeEquipPanel.js.map