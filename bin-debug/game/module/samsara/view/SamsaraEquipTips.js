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
var SamsaraEquipTips = (function (_super) {
    __extends(SamsaraEquipTips, _super);
    function SamsaraEquipTips() {
        var _this = _super.call(this) || this;
        _this.skinName = "ReincarnateEquipTipsSkin";
        return _this;
    }
    SamsaraEquipTips.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        if (param[1] != undefined) {
            this.roleIndex = -1;
            this.roleModel = param[1];
            this.index = param[2];
            var roleIndex = param[0];
            var isSelfRole = false;
            if (roleIndex >= 0 && roleIndex <= SubRoles.ins().subRolesLen - 1) {
                var temp = SubRoles.ins().getSubRoleByIndex(roleIndex);
                if (temp.handle == this.roleModel.handle) {
                    isSelfRole = true;
                    this.roleIndex = this.roleModel.index;
                }
            }
            var data = this.roleModel.getEquipByIndex(this.index);
            this.setData(data);
            if (isSelfRole) {
                this.addTouchEvent(this.spiritBtn, this.addSpirit);
                this.addTouchEvent(this.soulBtn, this.addSoul);
                this.spiritBtn.visible = true;
                this.soulBtn.visible = true;
            }
            else {
                this.spiritBtn.visible = false;
                this.soulBtn.visible = false;
            }
        }
        else {
            this.setTips(param[0]);
        }
        this.addTouchEvent(this.bgClose, this.closeWin);
    };
    SamsaraEquipTips.prototype.setTips = function (itemId) {
        this.spiritBtn.visible = false;
        this.soulBtn.visible = false;
        this.redPoint.visible = false;
        this.redPoint1.visible = false;
        var itemConfig = GlobalConfig.ItemConfig[itemId];
        this.updateBaseView(itemConfig);
        var itemData = new ItemData();
        itemData.itemConfig = itemConfig;
        var power = ItemConfig.calculateBagItemScore(itemData);
        this.powerPanel.setPower(power);
        this.score.text = "\u8BC4\u5206\uFF1A" + power;
        var subType = ItemConfig.getSubType(itemConfig);
        var isHat;
        if (subType == EquipPos.HAT) {
            this.currentState = "noSpirit0";
            isHat = true;
        }
        else {
            isHat = false;
            this.currentState = "noSpirit1";
        }
        this.updateBaseAttr(itemId, isHat);
        this.setSoulAttr(0);
        this.setSoulLink(0, 0);
        var itemType = [0, 0, 0, 0];
        switch (subType) {
            case EquipPos.HAT:
                itemType[0] = 1;
                break;
            case EquipPos.VIZARD:
                itemType[1] = 1;
                break;
            case EquipPos.CLOAK:
                itemType[2] = 1;
                break;
            case EquipPos.SHIELD:
                itemType[3] = 1;
                break;
        }
        this.setSuitAttr(itemConfig.id, itemType);
    };
    SamsaraEquipTips.prototype.setData = function (data) {
        this.soulBtn.visible = true;
        this.spiritBtn.visible = true;
        this.redPoint.visible = this.roleIndex >= 0 && SamsaraModel.ins().checkEquipPosCanAddSpirit(this.roleModel, this.index);
        this.redPoint1.visible = this.roleIndex >= 0 && SamsaraModel.ins().checkUpgradeSoul(this.roleModel, this.index);
        var itemConfig = data.item.itemConfig;
        this.updateBaseView(itemConfig, data.soulLv);
        var equipCfg = GlobalConfig.EquipConfig[itemConfig.id];
        var spiritLv = data.spiritLv;
        var isHat;
        if (spiritLv == 0 && data.spiritExp == 0) {
            if (this.index == EquipPos.HAT) {
                this.currentState = "noSpirit0";
                isHat = true;
            }
            else {
                this.currentState = "noSpirit1";
                isHat = false;
            }
        }
        else {
            var isMax = (spiritLv == CommonUtils.getObjectLength(GlobalConfig.ReincarnateSpirit[this.index]));
            if (this.index == EquipPos.HAT) {
                this.currentState = "doSpirit0";
                isHat = true;
            }
            else {
                this.currentState = "doSpirit1";
                isHat = false;
            }
            this.setSpirit(data.spiritExp, data.spiritLv, isMax, isHat);
        }
        this.updateBaseAttr(itemConfig.id, isHat);
        var itemType = SamsaraModel.ins().lowSuitEquips(this.index, this.roleModel);
        this.setSuitAttr(itemConfig.id, itemType);
        this.score.text = "\u8BC4\u5206\uFF1A" + data.item.point;
        var count = 0;
        for (var i = 0; i < itemType.length; i++) {
            if (itemType[i])
                count++;
        }
        var isSuit = count == 4;
        var suitCfg = SamsaraModel.ins().getReincarnateSuit(itemConfig.id);
        var power = data.item.point;
        power = this.setSoulAttr(data.soulLv, itemConfig.id, power);
        power = this.setSoulLink(data.soulLv, SamsaraModel.ins().getSoulLinkLv(this.roleModel, this.index, data.soulLv), itemConfig.id, power);
        if (this.roleModel && equipCfg && equipCfg.baseAttr2) {
            var per = equipCfg.baseAttr2.value / 100;
            power += SamsaraModel.ins().getExtraPower(this.roleModel, per, equipCfg.baseAttr2.type);
        }
        if (isSuit) {
            power += UserBag.getAttrPower(suitCfg.attrs);
        }
        if (spiritLv > 0) {
            var cfg = CommonUtils.getObjectByUnionAttr(GlobalConfig.ReincarnateSpirit, this.index, spiritLv);
            power += UserBag.getAttrPower(cfg.attrs);
        }
        power = power >> 0;
        this.powerPanel.setPower(power);
    };
    SamsaraEquipTips.prototype.updateBaseView = function (itemConfig, soulLv) {
        if (soulLv === void 0) { soulLv = 0; }
        var q = ItemConfig.getQuality(itemConfig);
        var subType = ItemConfig.getSubType(itemConfig);
        var job = ItemConfig.getJob(itemConfig);
        this.nameLabel.text = itemConfig.name;
        if (soulLv > 0) {
            var desc = "注魂";
            switch (soulLv) {
                case 1:
                    desc += "Ⅰ";
                    break;
                case 2:
                    desc += "Ⅱ";
                    break;
                case 3:
                    desc += "Ⅲ";
                    break;
                case 4:
                    desc += "Ⅳ";
                    break;
            }
            this.nameLabel.text = desc + "." + itemConfig.name;
            this.itemIcon.setSoul(true);
        }
        this.nameLabel.textColor = ItemConfig.getQualityColor(itemConfig);
        this.quali.source = q > 0 ? "quali" + q : "";
        this.itemIcon.setData(itemConfig);
        this.type.text = Role.getEquipNameByType(subType);
        this.lv.text = itemConfig.zsLevel + "\u8F6C";
        this.lv.textColor = UserZs.ins().lv < itemConfig.zsLevel ? 0xf3311e : 0x35e62d;
        this.career.text = Role.getJobNameByJob(job);
    };
    SamsaraEquipTips.prototype.updateBaseAttr = function (id, isHat) {
        var equipCfg = GlobalConfig.EquipConfig[id];
        this.attr0.text = equipCfg.atk.toString();
        this.attr1.text = equipCfg.hp.toString();
        this.attr2.text = equipCfg.def.toString();
        this.attr3.text = equipCfg.res.toString();
        this.attr4.text = equipCfg.baseAttr1.value.toString();
        if (isHat)
            this.attr5.text = equipCfg.baseAttr2.value / 100 + "%";
    };
    SamsaraEquipTips.prototype.setSuitAttr = function (id, itemType) {
        var equipSamsaraLv = SamsaraModel.ins().getEquipSamsaraLv(id);
        var desc = SamsaraModel.ins().getSamsaraDesc(equipSamsaraLv - 7);
        var suitCfg = SamsaraModel.ins().getReincarnateSuit(id);
        this.suitName.text = desc + "\u5957\u88C5";
        this.attr12.text = this.getValue(suitCfg.attrs, AttributeType.atAttack);
        this.attr13.text = this.getValue(suitCfg.attrs, AttributeType.atMaxHp);
        this.attr14.text = this.getValue(suitCfg.attrs, AttributeType.atDef);
        this.attr15.text = this.getValue(suitCfg.attrs, AttributeType.atRes);
        this.attr16.text = suitCfg.exAttrs[0].value / 100 + "%";
        var cor1 = itemType[0] ? ColorUtil.GREEN_COLOR : "0xff0000";
        var cor2 = itemType[1] ? ColorUtil.GREEN_COLOR : "0xff0000";
        var cor3 = itemType[2] ? ColorUtil.GREEN_COLOR : "0xff0000";
        var cor4 = itemType[3] ? ColorUtil.GREEN_COLOR : "0xff0000";
        var count = 0;
        for (var i = 0; i < itemType.length; i++) {
            if (itemType[i])
                count++;
        }
        this.suitState.textFlow = TextFlowMaker.generateTextFlow("<font color=" + cor1 + ">" + Role.getEquipNameByType(EquipPos.HAT) + "\u3001</font><font color=" + cor2 + ">" + Role.getEquipNameByType(EquipPos.VIZARD) + "\u3001</font><font color=" + cor3 + ">" + Role.getEquipNameByType(EquipPos.CLOAK) + "\u3001</font><font color=" + cor4 + ">" + Role.getEquipNameByType(EquipPos.SHIELD) + "</font>");
        var isSuit = count == 4;
        var cor5 = isSuit ? ColorUtil.GREEN_COLOR_N : 0xff0000;
        this.suitNum.textColor = cor5;
        this.suitNum.text = "(" + count + "/4)";
        this.setSuitAttrTextColor(isSuit);
    };
    SamsaraEquipTips.prototype.setSuitAttrTextColor = function (isSuit) {
        var color = isSuit ? 0xFF00FF : 0x666666;
        this.attr12.textColor = color;
        this.attr13.textColor = color;
        this.attr14.textColor = color;
        this.attr15.textColor = color;
        this.attr16.textColor = color;
        this.attrDesc.textColor = color;
        this.attrDesc1.textColor = color;
    };
    SamsaraEquipTips.prototype.setSpirit = function (exp, lv, isMax, isHat) {
        var lvDesc;
        var cfg = CommonUtils.getObjectByUnionAttr(GlobalConfig.ReincarnateSpirit, this.index, lv);
        if (isMax) {
            lvDesc = "";
        }
        else {
            lvDesc = "(" + exp + "/" + cfg.consume + ")";
        }
        this.spiritLv.text = "Lv" + lv;
        this.spiritCost.text = lvDesc;
        if (lv == 0) {
            this.attr6.text = "0";
            this.attr7.text = "0";
            this.attr8.text = "0";
            this.attr9.text = "0";
        }
        else {
            this.attr6.text = this.getValue(cfg.attrs, AttributeType.atAttack);
            this.attr7.text = this.getValue(cfg.attrs, AttributeType.atMaxHp);
            this.attr8.text = this.getValue(cfg.attrs, AttributeType.atDef);
            this.attr9.text = this.getValue(cfg.attrs, AttributeType.atRes);
        }
    };
    SamsaraEquipTips.prototype.getValue = function (attrs, typeValue) {
        var obj = CommonUtils.getObjectByAttr(attrs, "type", typeValue);
        return obj.value.toString();
    };
    SamsaraEquipTips.prototype.addSpirit = function () {
        this.closeWin();
        ViewManager.ins().open(AddSpiritView, this.roleIndex, this.index);
    };
    SamsaraEquipTips.prototype.addSoul = function () {
        this.closeWin();
        ViewManager.ins().open(SamsaraSoulWin, this.roleIndex, this.index);
    };
    SamsaraEquipTips.prototype.setSoulAttr = function (soulLv, id, power) {
        if (id === void 0) { id = 0; }
        if (power === void 0) { power = 0; }
        if (soulLv == 0) {
            this["soulDescLable"].visible = false;
            this.soulAddAttr0.text = "";
            this.soulAddAttr1.text = "";
            this.soulAddAttr2.text = "";
            this.soulAddAttr3.text = "";
            this.soulAddAttr4.text = "";
        }
        else {
            this["soulDescLable"].visible = true;
            var equipCfg = GlobalConfig.EquipConfig[id];
            var atk = equipCfg.atk;
            var hp = equipCfg.hp;
            var def = equipCfg.def;
            var res = equipCfg.res;
            var exAttr = equipCfg.baseAttr1.value;
            var subType = ItemConfig.getSubType(GlobalConfig.ItemConfig[id]);
            var cfg = GlobalConfig.ReincarnationDemonLevel[subType][soulLv];
            var percent = cfg.precent / 10000;
            this.soulAddAttr0.text = Math.floor(atk * percent).toString();
            this.soulAddAttr1.text = Math.floor(hp * percent).toString();
            this.soulAddAttr2.text = Math.floor(def * percent).toString();
            this.soulAddAttr3.text = Math.floor(res * percent).toString();
            this.soulAddAttr4.text = Math.floor(exAttr * percent).toString();
            var holyAttr = 0;
            if (equipCfg.baseAttr2) {
                holyAttr = UserBag.getAttrPower([equipCfg.baseAttr2]);
            }
            power = (power - holyAttr) * (1 + percent) + holyAttr;
            if (soulLv > 0) {
                var data = GlobalConfig.ReincarnationSoulLevel[ItemConfig.getJob(GlobalConfig.ItemConfig[id])][subType][soulLv];
                power += UserBag.getAttrPower(data.attrs);
            }
            power = power >> 0;
        }
        return power;
    };
    SamsaraEquipTips.prototype.setSoulLink = function (soulLv, soulLinlLv, itemId, power) {
        if (itemId === void 0) { itemId = 0; }
        if (power === void 0) { power = 0; }
        if (soulLv == 0) {
            if (this.chainGroup.parent) {
                this.chainGroup.parent.removeChild(this.chainGroup);
            }
            if (this.soulGroup.parent) {
                this.soulGroup.parent.removeChild(this.soulGroup);
            }
        }
        else {
            if (!this.chainGroup.parent) {
                this.suitGroup.parent.addChild(this.soulGroup);
            }
            if (!this.soulGroup.parent) {
                this.suitGroup.parent.addChild(this.soulGroup);
            }
        }
        this.soulLv.text = "Lv" + soulLv;
        var showSoulLinlLv = soulLinlLv;
        if (soulLinlLv == 0)
            showSoulLinlLv = 1;
        this.chainLv.text = "Lv" + showSoulLinlLv;
        if (itemId) {
            var subType = ItemConfig.getSubType(GlobalConfig.ItemConfig[itemId]);
            if (showSoulLinlLv > 0) {
                var cfg = SamsaraModel.ins().getReincarnationLinkLevel(subType, showSoulLinlLv);
                this.chainPos.text = "[\u9B54\u9B42" + Role.getEquipNameByType(cfg.secondSlot) + "]";
                this.chainAttr.text = SamsaraModel.ins().getSoulLinkDesc(cfg.attrs[0].type);
                this.chainValue.text = (cfg.attrs[0].value / 100) + "%";
                var colour = void 0;
                if (soulLinlLv == 0) {
                    colour = 0x666666;
                }
                else {
                    colour = 0xFFFF00;
                }
                this.chainPos.textColor = colour;
                this.chainAttr.textColor = colour;
                this.chainState.textColor = colour;
                this.chainValue.textColor = colour;
                if (soulLinlLv > 0) {
                    var role = this.roleModel;
                    var temp = UserBag.getAttrPower([cfg.attrs[0]]) + ItemConfig.relatePower(cfg.attrs[0], role);
                    power += temp;
                }
            }
            if (soulLv > 0) {
                var demon = GlobalConfig.ReincarnationDemonLevel[subType][soulLv];
                var soulAttrDesc = void 0;
                var per = demon.precent / 100;
                per += 100;
                soulAttrDesc = per + "%";
                this.soulAttr.text = soulAttrDesc;
            }
        }
        return power;
    };
    SamsaraEquipTips.prototype.closeWin = function () {
        ViewManager.ins().close(this);
    };
    return SamsaraEquipTips;
}(BaseEuiView));
__reflect(SamsaraEquipTips.prototype, "SamsaraEquipTips");
ViewManager.ins().reg(SamsaraEquipTips, LayerManager.UI_Popup);
//# sourceMappingURL=SamsaraEquipTips.js.map