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
var HejiEquipTipsWin = (function (_super) {
    __extends(HejiEquipTipsWin, _super);
    function HejiEquipTipsWin() {
        var _this = _super.call(this) || this;
        _this._bottomY = 0;
        _this._equipPower = 0;
        _this._totalPower = 0;
        _this.curRole = 0;
        _this.index = 0;
        _this.gainWay = [["参与击杀秘境BOSS", "BossWin", 2], ["限时任务", "LimitTaskView"]];
        _this.skinName = "HejiEquipTipsSkin";
        _this.powerPanel.setBgVis(false);
        _this.powerPanel0.setBgVis(false);
        return _this;
    }
    HejiEquipTipsWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.itemIcon.imgJob.visible = false;
        this.waylist.itemRenderer = RingGainItem;
    };
    HejiEquipTipsWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.data = param[0];
        if (param[1]) {
            this.changeBtn.visible = true;
        }
        else {
            this.changeBtn.visible = false;
        }
        this.isBagTips = param[2];
        this.addTouchEndEvent(this.bgClose, this.otherClose);
        this.addTouchEndEvent(this.changeBtn, this.onEquipChange);
        this.waylist.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTouchList, this);
        this.setData(this.data);
    };
    HejiEquipTipsWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.otherClose, this.bgClose);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEquipChange, this.changeBtn);
        this.waylist.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTouchList, this);
    };
    HejiEquipTipsWin.prototype.onTouchList = function (e) {
        var item = e.item;
        if (e.item == null) {
            return;
        }
        var openSuccess = ViewManager.ins().viewOpenCheck(item[1], item[2]);
        if (openSuccess) {
            GameGuider.guidance(item[1], item[2], true);
            ViewManager.ins().close(this);
        }
    };
    HejiEquipTipsWin.prototype.otherClose = function (evt) {
        ViewManager.ins().close(HejiEquipTipsWin);
    };
    HejiEquipTipsWin.prototype.onEquipChange = function (e) {
        if (!this.needCount) {
            UserTips.ins().showTips("|C:0xff0000&T:材料不足");
            return;
        }
        this.onBtn();
    };
    HejiEquipTipsWin.prototype.onBtn = function () {
        var nextId;
        if (!(this.data instanceof ItemData) && !this.data.id) {
            var posId = 910000 + this.data + 1;
            nextId = posId;
        }
        else {
            nextId = this.data.configID + 10;
        }
        var nextItemConfig = GlobalConfig.ItemConfig[nextId];
        var pos = ItemConfig.getSubType(nextItemConfig);
        var itemList = UserBag.ins().getHejiEquipsByType(pos);
        var handle = 0;
        for (var i = 0; i < itemList.length; i++) {
            if (itemList[i].configID == nextItemConfig.id && pos == ItemConfig.getSubType(itemList[i].itemConfig)) {
                handle = itemList[i].handle;
                break;
            }
        }
        if (!handle) {
            UserTips.ins().showTips("|C:0xff0000&T:符文异常");
            return;
        }
        var itemlv = nextItemConfig.level ? nextItemConfig.level : 0;
        var itemzslv = nextItemConfig.zsLevel ? nextItemConfig.zsLevel : 0;
        if (itemzslv > UserZs.ins().lv || itemlv > Actor.level) {
            UserTips.ins().showTips("|C:0xff0000&T:\u7B26\u6587\u9700\u8981" + itemzslv + "\u8F6C" + itemlv + "\u7EA7");
            return;
        }
        ViewManager.ins().close(HejiEquipTipsWin);
        UserSkill.ins().sendDressHejiEquip(handle, pos);
    };
    HejiEquipTipsWin.prototype.setData = function (_data) {
        var data;
        if (!(_data instanceof ItemData)) {
            if (!_data.id) {
                if (_data > 910000) {
                    data = new ItemData();
                    data.configID = _data;
                }
                else {
                    var posId = 910000 + _data + 1;
                    data = new ItemData();
                    data.configID = posId;
                }
            }
            else {
                data = new ItemData();
                data.configID = _data.id;
            }
            var itemData = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_EQUIP, data.configID);
            if (!itemData || !itemData.count)
                this.currentState = "unactivated_no";
            else
                this.currentState = "unactivated_have";
        }
        else {
            data = _data;
            var next = GlobalConfig.EquipConfig[data.configID + 10];
            if (next) {
                var itemData = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_EQUIP, next.id);
                if (itemData)
                    this.currentState = "not_max";
                else
                    this.currentState = "not_max_no";
            }
            else
                this.currentState = "max";
        }
        if (this.isBagTips)
            this.currentState = "default";
        this.validateNow();
        this.needCount = 0;
        this.setCurAttrs(data);
        this.setNextAttrs(data);
        this.unactivated(data);
    };
    HejiEquipTipsWin.prototype.unactivated = function (data) {
        if (this.currentState == "max" || this.currentState == "default")
            return;
        var nextId;
        if (!(this.data instanceof ItemData) && !this.data.id) {
            nextId = data.configID;
        }
        else {
            nextId = data.configID + 10;
        }
        var nextItemConfig = GlobalConfig.ItemConfig[nextId];
        this.attr0.text = "" + nextItemConfig.name;
        this.attr0.textColor = ItemConfig.getQualityColor(nextItemConfig);
        var itemData = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_EQUIP, nextItemConfig.id);
        if (itemData) {
            this.attr6.text = "(\u62E5\u6709\u00D7" + itemData.count + ")";
            this.attr6.textColor = 0x00ff00;
            this.needCount = itemData.count;
        }
        else {
            this.attr6.textColor = 0xff0000;
        }
        if (this.currentState == "unactivated_no" || this.currentState == "not_max_no") {
            this.waylist.dataProvider = new eui.ArrayCollection(this.gainWay);
        }
        else if (this.currentState == "unactivated_have") {
            this.changeBtn.label = "激  活";
        }
    };
    HejiEquipTipsWin.prototype.setNextAttrs = function (data) {
        if (this.currentState != "not_max" && this.currentState != "not_max_no")
            return;
        this.changeBtn.label = "升  级";
        var nextId = data.configID + 10;
        var nextItemConfig = GlobalConfig.ItemConfig[nextId];
        var nextEquipConfig = GlobalConfig.EquipConfig[nextId];
        var itemConfig = nextItemConfig;
        this._totalPower = 0;
        this.nextTile.text = "\u4E0B\u7EA7(" + itemConfig.name + ")";
        this.nextTile.textColor = ItemConfig.getQualityColor(itemConfig);
        this.attr7.text = "" + itemConfig.name;
        this.attr7.textColor = this.nextTile.textColor;
        var itemData = UserBag.ins().getBagGoodsByTypeAndId(UserBag.BAG_TYPE_EQUIP, nextItemConfig.id);
        if (itemData) {
            this.attr9.text = "(\u62E5\u6709\u00D7" + itemData.count + ")";
            this.attr9.textColor = 0x00ff00;
            this.needCount = itemData.count;
        }
        else {
            this.attr9.textColor = 0xff0000;
        }
        var ii = 1;
        this.nextAttr1.visible = false;
        this.nextAttr2.visible = false;
        this.nextAttr3.visible = false;
        this.nextAttr4.visible = false;
        var config = nextEquipConfig;
        var totalAttr = [];
        this.score.visible = false;
        if (data.att) {
            for (var k in AttributeData.translate) {
                if (!config[k] || config[k] <= 0)
                    continue;
                var tempAtt = new AttributeData(AttributeData.translate[k], config[k]);
                for (var j in data.att) {
                    if (data.att[j].type == tempAtt.type) {
                        tempAtt.value += data.att[j].value;
                        break;
                    }
                }
                var attrStr = "";
                attrStr = AttributeData.getAttStrByType(tempAtt, 0, "  ");
                totalAttr.push(tempAtt);
                this['nextAttr' + ii].text = attrStr;
                this['nextAttr' + ii].visible = true;
                ii++;
            }
            this._bottomY = this['nextAttr' + (ii - 1)].y + this['nextAttr' + (ii - 1)].height;
        }
        else {
            for (var k in AttributeData.translate) {
                if (!config[k] || config[k] <= 0)
                    continue;
                var tempAtt = new AttributeData(AttributeData.translate[k], config[k]);
                var attrStr = "";
                attrStr = AttributeData.getAttStrByType(tempAtt, 0, "  ");
                totalAttr.push(tempAtt);
                this['nextAttr' + ii].text = attrStr;
                this['nextAttr' + ii].visible = true;
                ii++;
            }
            this._bottomY = this['nextAttr' + (ii - 1)].y + this['nextAttr' + (ii - 1)].height;
        }
        if (config.baseAttr1) {
            var att = new AttributeData(config.baseAttr1.type, config.baseAttr1.value);
            totalAttr.push(att);
        }
        if (config.baseAttr2) {
            var att = new AttributeData(config.baseAttr2.type, config.baseAttr2.value);
            totalAttr.push(att);
        }
        this._equipPower = Math.floor(UserBag.getAttrPower(totalAttr));
        this._totalPower += this._equipPower + (config.exPower || 0);
        this._totalPower *= SubRoles.ins().subRolesLen;
        this.score.text = "评分：" + this._totalPower;
        while (this.nextForgeGroup.numElements) {
            this.nextForgeGroup.removeChildAt(0);
        }
        this.addTips(config, this.nextForgeGroup);
        this.background.height = this._bottomY + 12;
        this.powerPanel0.setPower(this._totalPower);
    };
    HejiEquipTipsWin.prototype.setCurAttrs = function (data) {
        var itemConfig = data.itemConfig;
        this._totalPower = 0;
        this.nameLabel.text = itemConfig.name;
        this.nameLabel.textColor = ItemConfig.getQualityColor(itemConfig);
        var q = ItemConfig.getQuality(itemConfig);
        this.quali.source = q > 0 ? "quali" + q : "";
        this.itemIcon.setData(itemConfig);
        if (data instanceof ItemData || itemConfig != null) {
            if (data && ItemConfig.getType(data.itemConfig) == 5) {
                this.levelKey.text = itemConfig.zsLevel > 0 ? "转生：" : "等级：";
                this.type.text = Role.getHejiEquipNameByType(ItemConfig.getSubType(itemConfig));
                this.lv.text = itemConfig.zsLevel > 0 ? (itemConfig.zsLevel + "转") : (itemConfig.level + "级");
                if (itemConfig.zsLevel > 0) {
                    this.lv.textColor = UserZs.ins().lv < itemConfig.zsLevel ? 0xf3311e : 0x35e62d;
                }
                else {
                    this.lv.textColor = Actor.level < (itemConfig.level || 1) ? 0xf3311e : 0x35e62d;
                }
            }
        }
        var ii = 1;
        this.attr1.visible = false;
        this.attr2.visible = false;
        this.attr3.visible = false;
        this.attr4.visible = false;
        var config = GlobalConfig.EquipConfig[data.configID];
        var totalAttr = [];
        this.score.visible = false;
        if (data.att) {
            for (var k in AttributeData.translate) {
                if (!config[k] || config[k] <= 0)
                    continue;
                var tempAtt = new AttributeData(AttributeData.translate[k], config[k]);
                for (var j in data.att) {
                    if (data.att[j].type == tempAtt.type) {
                        tempAtt.value += data.att[j].value;
                        break;
                    }
                }
                var attrStr = "";
                attrStr = AttributeData.getAttStrByType(tempAtt, 0, "  ");
                totalAttr.push(tempAtt);
                this['attr' + ii].text = attrStr;
                this['attr' + ii].visible = true;
                ii++;
            }
            this._bottomY = this['attr' + (ii - 1)].y + this['attr' + (ii - 1)].height;
        }
        else {
            for (var k in AttributeData.translate) {
                if (!config[k] || config[k] <= 0)
                    continue;
                var tempAtt = new AttributeData(AttributeData.translate[k], config[k]);
                var attrStr = "";
                attrStr = AttributeData.getAttStrByType(tempAtt, 0, "  ");
                totalAttr.push(tempAtt);
                this['attr' + ii].text = attrStr;
                this['attr' + ii].visible = true;
                ii++;
            }
            this._bottomY = this['attr' + (ii - 1)].y + this['attr' + (ii - 1)].height;
        }
        if (config.baseAttr1) {
            var att = new AttributeData(config.baseAttr1.type, config.baseAttr1.value);
            totalAttr.push(att);
        }
        if (config.baseAttr2) {
            var att = new AttributeData(config.baseAttr2.type, config.baseAttr2.value);
            totalAttr.push(att);
        }
        this._equipPower = Math.floor(UserBag.getAttrPower(totalAttr));
        this._totalPower += this._equipPower + (config.exPower || 0);
        this._totalPower *= SubRoles.ins().subRolesLen;
        this.score.text = "评分：" + this._totalPower;
        while (this.forgeGroup.numElements) {
            this.forgeGroup.removeChildAt(0);
        }
        this.addTips(config, this.forgeGroup);
        this.background.height = this._bottomY + 12;
        this.powerPanel.setPower(this._totalPower);
        this.next.y = this._bottomY + 12;
    };
    HejiEquipTipsWin.prototype.addTips = function (data, forgeGroup) {
        var titleAttrTxt = new eui.Label;
        var attrTxt = new eui.Label;
        if (data.baseAttr1) {
            if (!titleAttrTxt.parent)
                this.createTitle(titleAttrTxt, attrTxt, forgeGroup);
            attrTxt.text += AttributeData.getAttStrByType(data.baseAttr1, 1, "");
            this._bottomY = attrTxt.y + attrTxt.height;
        }
        if (data.baseAttr2) {
            if (!titleAttrTxt.parent)
                this.createTitle(titleAttrTxt, attrTxt, forgeGroup);
            attrTxt.text += AttributeData.getAttStrByType(data.baseAttr2, 1, "");
            this._bottomY = attrTxt.y + attrTxt.height;
        }
        if (data.exAttr1) {
            if (!titleAttrTxt.parent)
                this.createTitle(titleAttrTxt, attrTxt, forgeGroup);
            attrTxt.text += AttributeData.getExtAttStrByType(data.exAttr1, 1, "");
            this._bottomY = attrTxt.y + attrTxt.height;
        }
        if (data["exAttr2"]) {
            attrTxt.text = AttributeData.getExtAttStrByType(data["exAttr2"], 1, "");
            this._bottomY = attrTxt.y + attrTxt.height;
        }
        if (this.forgeGroup == forgeGroup) {
            var titlePunchAttrTxt = new eui.Label;
            var attrPunchTxt = new eui.Label;
            var pos = data.id % 10;
            var lv = UserSkill.ins().getPunchForge().getPunchLevel(pos - 1);
            var config = GlobalConfig.PunchEquipConfig[pos - 1][lv];
            if (config) {
                if (!titlePunchAttrTxt.parent)
                    this.createTitle(titlePunchAttrTxt, attrPunchTxt, forgeGroup, "注灵属性");
                attrPunchTxt.text = AttributeData.getAttStr(config.attr, 1, 1, " ");
                this._bottomY = attrPunchTxt.y + attrPunchTxt.height;
            }
        }
    };
    HejiEquipTipsWin.prototype.createTitle = function (titleAttrTxt, attrTxt, forgeGroup, title) {
        titleAttrTxt.fontFamily = "Arial";
        titleAttrTxt.size = 20;
        titleAttrTxt.textColor = 0x7e6437;
        titleAttrTxt.bold = true;
        titleAttrTxt.x = 24;
        titleAttrTxt.y = this._bottomY + 10 + 14;
        forgeGroup.addChild(titleAttrTxt);
        titleAttrTxt.text = title ? title : "极品属性";
        attrTxt.fontFamily = "Arial";
        attrTxt.size = 18;
        attrTxt.lineSpacing = 8;
        attrTxt.x = 46;
        attrTxt.y = titleAttrTxt.y + 24;
        attrTxt.textColor = 0xFF49F4;
        forgeGroup.addChild(attrTxt);
    };
    return HejiEquipTipsWin;
}(BaseEuiView));
__reflect(HejiEquipTipsWin.prototype, "HejiEquipTipsWin");
ViewManager.ins().reg(HejiEquipTipsWin, LayerManager.UI_Popup);
//# sourceMappingURL=HejiEquipTipsWin.js.map