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
var LegendEquipPanel = (function (_super) {
    __extends(LegendEquipPanel, _super);
    function LegendEquipPanel() {
        var _this = _super.call(this) || this;
        _this._roleId = 0;
        return _this;
    }
    LegendEquipPanel.prototype.childrenCreated = function () {
        this.init();
    };
    LegendEquipPanel.prototype.init = function () {
        this.curIndex = 0;
        this.getTreasureBtn.textFlow = (new egret.HtmlTextParser).parser("<a href=\"event:\"><u>" + this.getTreasureBtn.text + "</u></a>");
        this.getTreasureBtn.touchEnabled = true;
        this.legendMc = new MovieClip;
        this.legendMc1 = new MovieClip;
        this.legendMc2 = new MovieClip;
        this.chargeEff1 = new MovieClip;
        this.chargeEff1.x = this.getTreasureBtn.x + this.getTreasureBtn.width / 2;
        this.chargeEff1.y = this.getTreasureBtn.y + this.getTreasureBtn.height / 2;
        this.chargeEff1.touchEnabled = false;
        this.chargeEff1.scaleY = 0.7;
        this.chargeEff1.scaleX = 0.9;
        this._weaponEffect = new MovieClip();
        this._bodyEffect = new MovieClip();
    };
    LegendEquipPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.legendMc.playFile(RES_DIR_EFF + "artifacteff", -1);
        this.addChild(this.legendMc);
        this.legendMc1.playFile(RES_DIR_EFF + "chuanqizbeff", -1);
        this.legendMc1.x = this.legend1.x + this.legend1.width / 2;
        this.legendMc1.y = this.legend1.y + this.legend1.height / 2;
        this.legendMc1.scaleX = this.legendMc1.scaleY = 1.4;
        this.addChild(this.legendMc1);
        this.legendMc2.playFile(RES_DIR_EFF + "chuanqizbeff", -1);
        this.legendMc2.x = this.legend2.x + this.legend2.width / 2;
        this.legendMc2.y = this.legend2.y + this.legend2.height / 2;
        this.legendMc2.scaleX = this.legendMc2.scaleY = 1.4;
        this.addChild(this.legendMc2);
        this.getTreasureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openSmeltView, this);
        this.addTouchEvent(this.mixSwordBtn, this.onSelect);
        this.addTouchEvent(this.mixArmorBtn, this.onSelect);
        this.addTouchEvent(this.armorIcon, this.onSelect);
        this.addTouchEvent(this.swordIcon, this.onSelect);
        this.addTouchEvent(this.executeBtn, this.executeCB);
        this.observe(UserEquip.ins().postMixGodEquip, this.mixCB);
        this.observe(UserBag.ins().postItemAdd, this.updateView);
        this.observe(UserBag.ins().postItemDel, this.updateView);
        this.observe(UserBag.ins().postItemChange, this.updateView);
        this.observe(GameLogic.ins().postSubRoleChange, this.updateSubRoleChange);
        TimerManager.ins().doTimer(2000, 0, this.mcChange, this);
        this.updateView();
    };
    LegendEquipPanel.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.getTreasureBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openSmeltView, this);
        this.removeTouchEvent(this.mixSwordBtn, this.onSelect);
        this.removeTouchEvent(this.mixArmorBtn, this.onSelect);
        this.removeTouchEvent(this.armorIcon, this.onSelect);
        this.removeTouchEvent(this.swordIcon, this.onSelect);
        this.removeTouchEvent(this.executeBtn, this.executeCB);
        TimerManager.ins().remove(this.mcChange, this);
        this.removeObserve();
        DisplayUtils.removeFromParent(this.legendMc);
        DisplayUtils.removeFromParent(this.legendMc1);
        DisplayUtils.removeFromParent(this.legendMc2);
        DisplayUtils.removeFromParent(this._weaponEffect);
        DisplayUtils.removeFromParent(this._bodyEffect);
    };
    LegendEquipPanel.prototype.mcChange = function () {
        egret.Tween.removeTweens(this.bgMc);
        var tween = egret.Tween.get(this.bgMc);
        tween.to({ "alpha": 0 }, 1000).to({ "alpha": 1 }, 1000);
    };
    LegendEquipPanel.prototype.executeCB = function (e) {
        if (parseInt(this.cur.text) < parseInt(this.need.text.substr(1))) {
            UserTips.ins().showTips("|C:0xf3311e&T:热血碎片不足|");
            return;
        }
        if (this.executeBtn.label == c_grewup) {
            this.grewup();
        }
        else if (this.executeBtn.label == c_mix) {
            this.mix();
        }
    };
    LegendEquipPanel.prototype.grewup = function () {
        var nextEquipConfig = GlobalConfig.ItemConfig[this.curEquipConfigId + 1];
        if (nextEquipConfig.level > Actor.level || nextEquipConfig.zsLevel > UserZs.ins().lv) {
            UserTips.ins().showTips("|C:0xf3311e&T:升级后超过角色等级，无法升级|");
            return;
        }
        UserEquip.ins().sendGrewupEquip(this._roleId, this.curIndex);
    };
    LegendEquipPanel.prototype.grewupCB = function (roleId, result, configID) {
        if (result == 0) {
            UserTips.ins().showTips("|C:0xf3311e&T:升级失败|");
            return;
        }
        UserTips.ins().showTips("升级成功");
        this.updateView();
    };
    LegendEquipPanel.prototype.mix = function () {
        var id = UserEquip.ins().getEquipConfigIDByPosAndQualityByLegend(this._roleId, this.curIndex, 5);
        var config = GlobalConfig.ItemConfig[id];
        if (config.level <= Actor.level && config.zsLevel <= UserZs.ins().lv) {
            UserEquip.ins().sendMixEquip(this._roleId, this.curEquipConfigId, this.curIndex);
        }
        else {
            UserTips.ins().showTips("|C:0xf3311e&T:等级不满足，无法合成|");
        }
    };
    LegendEquipPanel.prototype.mixCB = function (roleId, result, configID) {
        if (result == 0) {
            UserTips.ins().showTips("|C:0xf3311e&T:合成失败|");
            return;
        }
        UserTips.ins().showTips("合成成功,已自动穿戴至角色身上");
        this.updateView();
    };
    LegendEquipPanel.prototype.openSmeltView = function (e) {
        ViewManager.ins().open(BreakDownView, BreakDownView.type_legend, 5);
    };
    LegendEquipPanel.prototype.onSelect = function (e) {
        var level = Actor.level;
        switch (e.currentTarget) {
            case this.mixSwordBtn:
            case this.swordIcon:
                this.curIndex = 0;
                break;
            case this.mixArmorBtn:
            case this.armorIcon:
                this.curIndex = 2;
                break;
        }
        this.updateView();
    };
    LegendEquipPanel.prototype.setRoleId = function (id) {
        this._roleId = id;
        var role = SubRoles.ins().getSubRoleByIndex(this._roleId);
        var equipData0 = role.getEquipByIndex(0);
        var equipData2 = role.getEquipByIndex(2);
        if (equipData0 && this.checkQuality(equipData0)) {
            this.curIndex = 0;
        }
        else if (equipData2 && this.checkQuality(equipData2)) {
            this.curIndex = 2;
        }
        this.updateView();
    };
    LegendEquipPanel.prototype.updateView = function () {
        this.updateAttrPanel();
        this.updateIconAndDesc();
        var red = this.setRedPoint();
        if (red) {
            this.setEff();
        }
    };
    LegendEquipPanel.prototype.setEff = function () {
        var itemData = UserBag.ins().getLegendOutEquips();
        if (!itemData.length) {
            DisplayUtils.removeFromParent(this.chargeEff1);
        }
        else {
            this.chargeEff1.playFile(RES_DIR_EFF + "chargeff1", -1);
            if (!this.chargeEff1.parent)
                this.getTreasureBtn.parent.addChild(this.chargeEff1);
        }
    };
    LegendEquipPanel.prototype.updateSubRoleChange = function () {
        var red = this.setRedPoint();
        if (red) {
            this.setEff();
        }
    };
    LegendEquipPanel.prototype.checkQuality = function (data) {
        var rtn = false;
        if (data && data.item && data.item.itemConfig) {
            rtn = (ItemConfig.getQuality(data.item.itemConfig) == 5);
        }
        return rtn;
    };
    LegendEquipPanel.prototype.updateAttrPanel = function () {
        var equipData = SubRoles.ins().getSubRoleByIndex(this._roleId).getEquipByIndex(this.curIndex);
        var nextEquipData = GlobalConfig.ItemConfig[equipData.item.configID + 1];
        var needNum = 0;
        var costID = 0;
        var q = ItemConfig.getQuality(equipData.item.itemConfig);
        if (nextEquipData == undefined && equipData.item.handle != 0 && q == 5) {
            this.mixAttributes.visible = true;
            this.grewupAttributes.visible = false;
            this.curEquipConfigId = this.updateMixPanel();
            this.topLevel.visible = true;
            this.costGroup.visible = false;
            this.executeBtn.visible = false;
            this.need.text = "";
            this.cur.text = "";
        }
        else {
            if (nextEquipData != undefined && equipData.item.handle != 0 && q == 5) {
                this.mixAttributes.visible = false;
                this.grewupAttributes.visible = true;
                this.curEquipConfigId = this.updateGrewupPanel();
                this.executeBtn.label = c_grewup;
                var grewupConfig = GlobalConfig.LegendLevelupConfig[this.curEquipConfigId];
                needNum = grewupConfig.count;
                costID = grewupConfig.itemId;
            }
            else {
                this.mixAttributes.visible = true;
                this.grewupAttributes.visible = false;
                this.curEquipConfigId = this.updateMixPanel();
                if (this.curEquipConfigId == null)
                    return;
                this.executeBtn.label = c_mix;
                var mixConfig = GlobalConfig.LegendComposeConfig[this.curEquipConfigId];
                needNum = mixConfig.count;
                costID = mixConfig.itemId;
            }
            this.executeBtn.visible = true;
            this.topLevel.visible = false;
            this.costGroup.visible = true;
            var curNum = UserBag.ins().getBagGoodsCountById(0, costID);
            this.need.text = "/" + needNum;
            this.cur.text = curNum + "";
            if (curNum >= needNum) {
                this.cur.textColor = ColorUtil.GREEN_COLOR_N;
            }
            else {
                this.cur.textColor = ColorUtil.RED_COLOR_N;
            }
        }
    };
    LegendEquipPanel.prototype.updateMixPanel = function () {
        var level = Actor.level;
        if (level < 10) {
            debug.log("error: 10级开启");
            return;
        }
        var configID = UserEquip.ins().getEquipConfigIDByPosAndQualityByLegend(this._roleId, this.curIndex, 5);
        var config = GlobalConfig.EquipConfig[configID];
        if (!config)
            return;
        var nameList = [];
        var baseAttrList = [];
        var randAttrList = [];
        for (var k in AttributeData.translate) {
            if (!config[k] || config[k] <= 0)
                continue;
            baseAttrList.push(config[k] + "");
            nameList.push(AttributeData.getAttrStrByType(AttributeData.translate[k]));
            randAttrList.push(" +" + Math.floor(ItemBase.additionRange / 100 * config[k]));
        }
        this.mixAttributes['baseAttr'].text = ItemData.getStringByNextList(baseAttrList, randAttrList);
        this.mixAttributes['nameAttr'].text = ItemData.getStringByList(nameList);
        this.mixAttributes['randAttr'].text = "";
        this.mixAttributes['score'].text = ItemConfig.pointCalNumber(GlobalConfig.ItemConfig[configID]);
        return configID;
    };
    LegendEquipPanel.prototype.updateGrewupPanel = function () {
        var equipData = SubRoles.ins().getSubRoleByIndex(this._roleId).getEquipByIndex(this.curIndex);
        var configID = equipData.item.configID;
        var curItemData = GlobalConfig.ItemConfig[configID];
        var nextItemData = GlobalConfig.ItemConfig[configID + 1];
        if (nextItemData == undefined) {
        }
        else {
            for (var i = 1; i <= 4; i++) {
                this.grewupAttributes["arrow" + i].visible = false;
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
                this.grewupAttributes["arrow" + ii].visible = true;
                ii++;
                baseAttrList.push(curEquipData[k] + "");
                nextBaseAttrList.push(nextEquipData[k] + "");
                nextRandAttrList.push(" +" + Math.floor(ItemBase.additionRange / 100 * nextEquipData[k]));
                nameList.push(AttributeData.getAttrStrByType(AttributeData.translate[k]));
            }
            this.grewupAttributes['curBaseAttr'].text = ItemData.getStringByNextList(baseAttrList, randAttrList);
            this.grewupAttributes['nextBaseAttr'].text = ItemData.getStringByNextList(nextBaseAttrList, nextRandAttrList);
            this.grewupAttributes['nameAttr'].text = ItemData.getStringByList(nameList);
            this.grewupAttributes['curScore'].text = "评分：" + ItemConfig.pointCalNumber(curItemData);
            this.grewupAttributes['nextScore'].text = "评分：" + ItemConfig.pointCalNumber(nextItemData);
        }
        return configID;
    };
    LegendEquipPanel.prototype.updateIconAndDesc = function () {
        var role = SubRoles.ins().getSubRoleByIndex(this._roleId);
        var equipData0 = role.getEquipByIndex(0);
        var equipData2 = role.getEquipByIndex(2);
        if (this.curIndex == 0) {
            this.swordSelect.visible = true;
            this.armorSelect.visible = false;
            this.zhanshi.source = null;
            this.currentState = 'jian';
            this.setWeaponEffect(equipData0.item.configID, "wPos", role.sex, this.weaponEffect, this._weaponEffect);
            this._bodyEffect.parent && this._bodyEffect.parent.removeChild(this._bodyEffect);
        }
        else {
            this.swordSelect.visible = false;
            this.armorSelect.visible = true;
            this.zhanshi.source = LegendEquipPanel.armorImg[0];
            this.currentState = 'jia';
            this.setWeaponEffect(equipData2.item.configID, "bPos", role.sex, this.bodyEffect, this._bodyEffect, 2);
            this._weaponEffect.parent && this._weaponEffect.parent.removeChild(this._weaponEffect);
        }
        this.updateItem(equipData0, this.swordIcon, this.swordLevel, this.mixSwordBtn);
        this.updateItem(equipData2, this.armorIcon, this.armorLevel, this.mixArmorBtn, 2);
    };
    LegendEquipPanel.prototype.updateItem = function (equipData, icon, levelLabel, mixBtn, pos) {
        var curPos = pos ? pos : this.curIndex;
        var zhuan = GlobalConfig.ItemConfig[UserEquip.ins().getEquipConfigIDByPosAndQualityByLegend(this._roleId, curPos, 5)].zsLevel;
        if (equipData.item.handle != 0 && ItemConfig.getQuality(equipData.item.itemConfig) == 5) {
            var itemConfig = GlobalConfig.ItemConfig[equipData.item.configID];
            mixBtn.visible = false;
            levelLabel.text = itemConfig.zsLevel + "转";
            var nextItem = void 0;
            for (var i = this.curEquipConfigId; i % 100 != 99; i++) {
                nextItem = GlobalConfig.ItemConfig[this.curEquipConfigId + 1];
                if (nextItem != undefined) {
                    break;
                }
            }
            if (curPos == ItemConfig.getSubType(equipData.item.itemConfig) && nextItem != undefined) {
                levelLabel.x = mixBtn.x + 15 - levelLabel.width / 2;
            }
            else {
                levelLabel.x = mixBtn.x + 15;
            }
        }
        else {
            mixBtn.visible = false;
            levelLabel.text = zhuan + "转";
            levelLabel.x = mixBtn.x + 15;
        }
    };
    LegendEquipPanel.prototype.setRedPoint = function () {
        var showRed = false;
        var boo = false;
        for (var i = 0; i < 2; i++) {
            boo = UserEquip.ins().setLegendEquipItemUpState(i > 0 ? 2 : 0, SubRoles.ins().getSubRoleByIndex(this._roleId));
            boo = UserEquip.ins().setLegendEquipItemState(i > 0 ? 2 : 0, SubRoles.ins().getSubRoleByIndex(this._roleId)) || boo;
            if (this["redPoint" + i])
                this["redPoint" + i].visible = boo;
            if (!showRed)
                showRed = boo;
            if (!showRed) {
                var itemData = UserBag.ins().getLegendOutEquips();
                showRed = itemData.length > 0;
            }
        }
        return showRed;
    };
    LegendEquipPanel.prototype.setWeaponEffect = function (id, posStr, sex, group, suitEff, pos) {
        if (pos === void 0) { pos = 0; }
        var cfg = GlobalConfig.EquipWithEffConfig[id + "_" + sex];
        var showFirst = false;
        if (!cfg) {
            cfg = GlobalConfig.EquipWithEffConfig[(pos == 0 ? LegendEquipPanel.swrodImg[1] : LegendEquipPanel.armorImg[1]) + "_" + sex];
            showFirst = true;
        }
        suitEff.scaleX = suitEff.scaleY = cfg.scaling;
        suitEff.x = this[posStr + sex].x;
        suitEff.y = this[posStr + sex].y;
        if (!suitEff.parent)
            group.addChild(suitEff);
        suitEff.playFile(RES_DIR_EFF + (showFirst ? cfg.inShowEff : cfg.nextShowEff), -1);
    };
    LegendEquipPanel.swrodImg = ["chuanqi_0_png", "101501"];
    LegendEquipPanel.armorImg = ["chuanqi_1_png", "121501"];
    return LegendEquipPanel;
}(BaseView));
__reflect(LegendEquipPanel.prototype, "LegendEquipPanel");
//# sourceMappingURL=LegendEquipPanel.js.map