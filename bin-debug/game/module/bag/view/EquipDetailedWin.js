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
var EquipDetailedWin = (function (_super) {
    __extends(EquipDetailedWin, _super);
    function EquipDetailedWin() {
        var _this = _super.call(this) || this;
        _this._bottomY = 0;
        _this._equipPower = 0;
        _this._totalPower = 0;
        _this.curRole = 0;
        _this.index = 0;
        _this.skinName = "EquipTipsSkin";
        _this.powerPanel.setBgVis(false);
        return _this;
    }
    EquipDetailedWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.itemIcon.imgJob.visible = false;
    };
    EquipDetailedWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var type = param[0];
        var handle = param[1];
        var configID = param[2];
        var data = param[3];
        this.roleModel = param[4];
        if (param[5] >= 0) {
            this.curRole = param[5];
            this.index = param[6];
            this.changeBtn.visible = true;
        }
        else {
            this.changeBtn.visible = false;
        }
        this.addTouchEndEvent(this.bgClose, this.otherClose);
        this.addTouchEndEvent(this.changeBtn, this.onEquipChange);
        this.setData(type, handle, configID, data);
    };
    EquipDetailedWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.otherClose, this.bgClose);
    };
    EquipDetailedWin.prototype.otherClose = function (evt) {
        ViewManager.ins().close(EquipDetailedWin);
    };
    EquipDetailedWin.prototype.onEquipChange = function (e) {
        ViewManager.ins().open(RoleChooseEquipWin, this.curRole, this.index);
        ViewManager.ins().close(EquipDetailedWin);
    };
    EquipDetailedWin.prototype.getExtremeName = function () {
        if (!this.changeBtn.visible)
            return "";
        var lv = ExtremeEquipModel.ins().getZhiZunLvByRoleID(this.roleModel, this.index);
        if (!lv)
            return "";
        return GlobalConfig.ZhiZunEquipLevel[this.index][lv].headTxt;
    };
    EquipDetailedWin.prototype.setData = function (type, handle, configID, _data) {
        var data = _data instanceof ItemData ? _data : undefined;
        var itemConfig;
        this._totalPower = 0;
        if (handle != undefined && data == undefined) {
            data = UserBag.ins().getBagGoodsByHandle(type, handle);
            if (!data) {
                var len = SubRoles.ins().subRolesLen;
                for (var i = 0; i < len; i++) {
                    var role = SubRoles.ins().getSubRoleByIndex(i);
                    var equipLen = role.getEquipLen();
                    for (var kk = 0; kk < equipLen; kk++) {
                        if (role.getEquipByIndex(kk).item.handle == (handle)) {
                            data = role.getEquipByIndex(kk).item;
                            break;
                        }
                    }
                }
            }
            if (!data) {
                var shopData = Shop.ins().shopData;
                var len = shopData.getShopEquipDataLength();
                var sed = null;
                for (var i = 0; i < len; i++) {
                    sed = shopData.getShopEquipDataByIndex(i);
                    if (sed != null) {
                        if (handle == sed.item.handle) {
                            data = sed.item;
                            break;
                        }
                    }
                }
            }
            if (!data) {
                new Error("请检查handle是否传错！");
            }
            itemConfig = data.itemConfig;
            configID = data.configID;
        }
        else
            itemConfig = GlobalConfig.ItemConfig[configID];
        this.nameLabel.text = this.getExtremeName() + itemConfig.name;
        this.nameLabel.textColor = ItemConfig.getQualityColor(itemConfig);
        var q = ItemConfig.getQuality(itemConfig);
        var subType = ItemConfig.getSubType(itemConfig);
        var job = ItemConfig.getJob(itemConfig);
        this.quali.source = q > 0 ? "quali" + q : "";
        this.itemIcon.setData(itemConfig);
        var exPower = 0;
        if (data instanceof ItemData || itemConfig != null) {
            if (data && ItemConfig.getType(data.itemConfig) == 4) {
                this.levelKey.text = "需求：";
                this.type.text = Role.getWingEquipNameByType(subType);
                this.lv.text = itemConfig.level + 1 + "阶羽翼可穿戴";
                this.lv.textColor = 0xf3311e;
                var len = SubRoles.ins().subRolesLen;
                for (var i = 0; i < len; i++) {
                    if (SubRoles.ins().getSubRoleByIndex(i).wingsData.lv >= itemConfig.level) {
                        this.lv.textColor = 0x35e62d;
                        break;
                    }
                }
                this.career.text = Role.getJobNameByJob(job);
                this.jobGroup.visible = true;
            }
            else if (data && ItemConfig.getType(data.itemConfig) == 5) {
                this.levelKey.text = itemConfig.zsLevel > 0 ? "转生：" : "等级：";
                this.type.text = Role.getHejiEquipNameByType(subType);
                this.lv.text = isNaN(itemConfig.zsLevel) ? ((itemConfig.level || 1) + "级") : (itemConfig.zsLevel + "转");
                if (itemConfig.zsLevel > 0) {
                    this.lv.textColor = UserZs.ins().lv < itemConfig.zsLevel ? 0xf3311e : 0x35e62d;
                }
                else {
                    this.lv.textColor = Actor.level < itemConfig.level ? 0xf3311e : 0x35e62d;
                }
                this.jobGroup.visible = false;
                if (UserBag.fitleEquip.indexOf(itemConfig.id) != -1) {
                    this.lv.text = "无级别";
                }
            }
            else {
                if (subType == EquipPos.DZI) {
                    this.levelKey.text = "等阶：";
                    this.type.text = Role.getEquipNameByType(subType);
                    this.lv.text = UserBag.ins().getGuanyinLevel(itemConfig);
                }
                else {
                    this.levelKey.text = itemConfig.zsLevel > 0 ? "转生：" : "等级：";
                    this.type.text = Role.getEquipNameByType(subType);
                    this.lv.text = isNaN(itemConfig.zsLevel) ? ((itemConfig.level || 1) + "级") : (itemConfig.zsLevel + "转");
                    if (UserBag.fitleEquip.indexOf(itemConfig.id) != -1) {
                        this.lv.text = "无级别";
                    }
                }
                if (itemConfig.zsLevel > 0) {
                    this.lv.textColor = UserZs.ins().lv < itemConfig.zsLevel ? 0xf3311e : 0x35e62d;
                }
                else {
                    this.lv.textColor = Actor.level < itemConfig.level ? 0xf3311e : 0x35e62d;
                }
                this.career.text = Role.getJobNameByJob(job);
                this.jobGroup.visible = true;
            }
        }
        var ii = 1;
        this.attr1.visible = false;
        this.attr2.visible = false;
        this.attr3.visible = false;
        this.attr4.visible = false;
        var config = GlobalConfig.EquipConfig[configID];
        var totalAttr = [];
        var info;
        var transfrom = [
            '',
            '',
            'hp',
            '',
            'atk',
            'def',
            'res',
        ];
        if (this.roleModel)
            info = this.roleModel.heirloom.getInfoBySolt(this.index);
        for (var k in Role.translate) {
            if (isNaN(config[k]) || !config[k])
                continue;
            var attrStr = "";
            attrStr += AttributeData.getAttrStrByType(Role.getAttrTypeByName(k)) + "  ";
            attrStr += config[k];
            var attrs = new AttributeData;
            if (data != undefined) {
                if (data.att) {
                    var attr = data.att;
                    for (var index = 0; index < attr.length; index++) {
                        if (attr[index].type == Role.getAttrTypeByName(k)) {
                            attrStr += ' +' + attr[index].value;
                            if (info && info.attr_add) {
                                attrStr += "+" + Math.floor((config[k] + attr[index].value) * (info.attr_add / 100));
                            }
                            attrs.type = attr[index].type;
                            attrs.value = config[k] + attr[index].value;
                            totalAttr.push(attrs);
                            break;
                        }
                    }
                }
                else {
                    for (var k_1 in config) {
                        if (!transfrom[k_1])
                            continue;
                        var value = config[transfrom[k_1]];
                        if (value == undefined || value == 0)
                            continue;
                        var type_1 = Role.getAttrTypeByName(transfrom[k_1]);
                        attrStr += AttributeData.getAttrStrByType(type_1) + "  ";
                        attrStr += config[k_1];
                        attrs.type = type_1;
                        attrs.value = config[k_1];
                        totalAttr.push(attrs);
                    }
                }
            }
            else {
                attrs.type = Role.getAttrTypeByName(k);
                attrs.value = config[k];
                totalAttr.push(attrs);
            }
            this['attr' + ii].text = attrStr;
            this['attr' + ii].visible = true;
            ii++;
        }
        if (data) {
            this._equipPower = data.point;
        }
        else {
            this._equipPower = Math.floor(UserBag.getAttrPower(totalAttr));
            if (config && config.exPower) {
                exPower = config.exPower;
            }
        }
        this._totalPower += this._equipPower + exPower;
        this._score = this._totalPower;
        this.score.text = "评分：" + this._totalPower;
        this._bottomY = this['attr' + (ii - 1)].y + this['attr' + (ii - 1)].height;
        while (this.forgeGroup.numElements) {
            this.forgeGroup.removeChildAt(0);
        }
        if (this.roleModel) {
            var len = this.roleModel.getEquipLen();
            for (var i = 0; i < len; i++) {
                var equipsData = this.roleModel.getEquipByIndex(i);
                if (equipsData.item.handle == (handle)) {
                    this.setForge(equipsData, i);
                    break;
                }
            }
            if (config) {
                if (config.baseAttr1) {
                    this._equipPower += ItemConfig.relatePower(config.baseAttr1, this.roleModel);
                }
                if (config.baseAttr2) {
                    this._equipPower += ItemConfig.relatePower(config.baseAttr2, this.roleModel);
                }
            }
        }
        if (subType == EquipPos.DZI)
            this.addTips(null, 4, 0);
        if (itemConfig.desc) {
            var desc = new eui.Label;
            desc.size = 18;
            desc.width = 250;
            desc.textColor = 0xD1C28F;
            desc.x = this.attr1.x;
            desc.y = this._bottomY += 10;
            desc.textFlow = TextFlowMaker.generateTextFlow(itemConfig.desc);
            this.forgeGroup.addChild(desc);
            this._bottomY += desc.textHeight;
        }
        var scrollMaxHeight = 630;
        if (this._bottomY > scrollMaxHeight)
            this._bottomY = scrollMaxHeight;
        this.background.height = this.powerPanel.y + this.powerPanel.height + this._bottomY + 12;
        this.bgGroup.y = this.background.y + this.background.height;
        this.powerPanel.setPower(this._totalPower);
        var scrollerGroup = this.attr1.parent.parent;
        scrollerGroup.height = this._bottomY;
        scrollerGroup.scrollPolicyV = this._bottomY >= scrollMaxHeight ? "on" : "off";
        this.anigroup.height = this.powerPanel.y + this.powerPanel.height + this.bgGroup.height + scrollerGroup.height + 60;
        this.anigroup.height = this.anigroup.height > 930 ? 930 : this.anigroup.height;
        this.anigroup.y = this.anigroup.height / 2 - this.background.height / 2;
    };
    EquipDetailedWin.prototype.setForge = function (equipsData, pos) {
        var lv = 0;
        for (var i = 0; i < 4; i++) {
            switch (i) {
                case ForgeWin.Page_Select_Boost:
                    lv = equipsData.strengthen;
                    break;
                case ForgeWin.Page_Select_ZhuLing:
                    lv = equipsData.zhuling;
                    break;
                case ForgeWin.Page_Select_Gem:
                    lv = equipsData.gem;
                    break;
                case ForgeWin.Page_Select_Weapon:
                    lv = equipsData.tupo;
                    break;
            }
            if (lv > 0) {
                var config = UserForge.ins().getForgeConfigByPos(pos, lv, i);
                this.addTips(config.attr, i, lv);
                var power = 0;
                if (i == 3)
                    power = Math.floor(this._equipPower * (Number(config.attr) / 100));
                else
                    power = Math.floor(UserBag.getAttrPower(config.attr));
                this._totalPower += power;
            }
        }
        if (pos >= EquipPos.WEAPON && pos <= EquipPos.SHOE) {
            lv = ExtremeEquipModel.ins().getZhiZunLvByRoleID(this.roleModel, pos);
            this.itemIcon.extreme.visible = lv ? true : false;
            if (lv) {
                var config = GlobalConfig.ZhiZunEquipLevel[pos][lv];
                if (config.ex_attrs)
                    this._totalPower += Math.floor(UserBag.getAttrPower(config.ex_attrs));
                this._totalPower += config.ex_power;
                var des = "";
                var lv2 = ExtremeEquipModel.ins().getZhiZunLinkLv(this.curRole + 1, pos, lv);
                var isTrue = lv2 > 0;
                var linkCfg = void 0;
                var stop_1 = false;
                for (var key in GlobalConfig.ZhiZunLinkLevel[pos]) {
                    for (var key2 in GlobalConfig.ZhiZunLinkLevel[pos][key]) {
                        linkCfg = GlobalConfig.ZhiZunLinkLevel[pos][key][key2];
                        if (linkCfg.level == 1)
                            des = linkCfg.chainDesc;
                        if (linkCfg.level == lv2 && isTrue) {
                            stop_1 = true;
                            if (linkCfg.attrs)
                                this._totalPower += Math.floor(UserBag.getAttrPower(linkCfg.attrs));
                            if (linkCfg.exAttrs)
                                this._totalPower += Math.floor(UserBag.getAttrPower(linkCfg.exAttrs));
                            this._totalPower += linkCfg.ex_power;
                            des = linkCfg.chainDesc;
                            break;
                        }
                    }
                    if (stop_1)
                        break;
                }
                this._totalPower += Math.floor(UserBag.getAttrPower(config.attrs));
                this.addTips(config.attrs, 5, lv, lv2, config.skillId, des);
            }
        }
    };
    EquipDetailedWin.prototype.addTips = function (attr, type, lv, lv2, skillId, des) {
        if (lv === void 0) { lv = 0; }
        if (lv2 === void 0) { lv2 = 0; }
        if (skillId === void 0) { skillId = 0; }
        if (des === void 0) { des = ""; }
        var titleAttrTxt = new eui.Label;
        titleAttrTxt.fontFamily = "Arial";
        titleAttrTxt.size = 20;
        titleAttrTxt.textColor = 0x7e6437;
        titleAttrTxt.bold = true;
        titleAttrTxt.x = 24;
        titleAttrTxt.y = this._bottomY + 10 + 14;
        titleAttrTxt.touchEnabled = false;
        this.forgeGroup.addChild(titleAttrTxt);
        var attrTxt = new eui.Label;
        attrTxt.fontFamily = "Arial";
        attrTxt.size = 18;
        attrTxt.lineSpacing = 8;
        attrTxt.x = 46;
        attrTxt.y = titleAttrTxt.y + 24;
        attrTxt.touchEnabled = false;
        this.forgeGroup.addChild(attrTxt);
        var attrs;
        switch (type) {
            case ForgeWin.Page_Select_Boost:
                titleAttrTxt.text = "强化属性";
                attrs = AttributeData.getAttrStrAdd(attr, 11);
                attrTxt.textColor = 0x5186fd;
                break;
            case ForgeWin.Page_Select_Gem:
                titleAttrTxt.text = "精炼属性";
                attrs = AttributeData.getAttrStrAdd(attr, 12);
                attrTxt.textColor = 0xd242fb;
                break;
            case ForgeWin.Page_Select_ZhuLing:
                titleAttrTxt.text = "铸造属性";
                attrTxt.textColor = 0xe5b613;
                attrs = AttributeData.getAttrStrAdd(attr, 15);
                break;
            case ForgeWin.Page_Select_Weapon:
                titleAttrTxt.text = "突破属性";
                break;
            case 4:
                titleAttrTxt.text = "特殊属性";
                this._bottomY = titleAttrTxt.y + titleAttrTxt.height;
                break;
            case 5:
                titleAttrTxt.text = "至尊属性";
                titleAttrTxt.textColor = 0xFCF537;
                attrs = attr;
                attrTxt.textColor = 0xFCF537;
                break;
        }
        var info;
        if (type != ForgeWin.Page_Select_ZhuLing && type != 5 && this.roleModel)
            info = this.roleModel.heirloom.getInfoBySolt(this.index);
        var off = 0;
        if (attrs) {
            if (type != ForgeWin.Page_Select_Weapon) {
                attrTxt.textFlow = TextFlowMaker.generateTextFlow1(AttributeData.getAttStr(attrs, 1, 1, "  ", false, true, info));
                if (type == 5) {
                    var z1 = new eui.Label;
                    z1.fontFamily = "Arial";
                    z1.size = 20;
                    z1.textColor = 0xFCF537;
                    z1.x = 24;
                    z1.y = attrTxt.y + attrTxt.height + 10;
                    z1.touchEnabled = false;
                    z1.width = 280;
                    this.forgeGroup.addChild(z1);
                    z1.textFlow = TextFlowMaker.generateTextFlow("<font color = '" + (lv2 ? "#FCF537" : "#666666") + "'>" + "<b>【灵魂锁链Lv" + (lv2 ? lv2 : 1) + "】</b></font>");
                    off += z1.textHeight + 10;
                    var z2 = new eui.Label;
                    z2.fontFamily = "Arial";
                    z2.size = 18;
                    z2.lineSpacing = 8;
                    z2.textColor = 0xFCF537;
                    z2.x = 46;
                    z2.y = z1.y + z1.textHeight + 10;
                    z2.touchEnabled = false;
                    z2.multiline = true;
                    z2.wordWrap = true;
                    this.forgeGroup.addChild(z2);
                    z2.textFlow = TextFlowMaker.generateTextFlow("<font color = '" + (lv2 ? "#FCF537" : "#666666") + "'>" + des + "</font>");
                    off += z2.textHeight + 10;
                    if (skillId) {
                        var skillCfg = GlobalConfig.SkillsConfig[skillId];
                        var skillDes = GlobalConfig.SkillsDescConfig[skillCfg.desc];
                        var z3 = new eui.Label;
                        z3.fontFamily = "Arial";
                        z3.size = 20;
                        z3.textColor = 0xFCF537;
                        z3.x = 24;
                        z3.y = z2.y + z2.height + 10;
                        z3.touchEnabled = false;
                        z3.width = 280;
                        z3.wordWrap = true;
                        z3.multiline = true;
                        this.forgeGroup.addChild(z3);
                        z3.textFlow = TextFlowMaker.generateTextFlow("<b>【" + skillDes.name + "Lv" + lv + "】</b>");
                        off += z3.textHeight + 10;
                        var z4 = new eui.Label;
                        z4.fontFamily = "Arial";
                        z4.size = 18;
                        z4.lineSpacing = 8;
                        z4.textColor = 0xFCF537;
                        z4.x = 46;
                        z4.y = z3.y + z3.textHeight + 10;
                        z4.touchEnabled = false;
                        z4.width = 280;
                        z4.wordWrap = true;
                        z4.multiline = true;
                        this.forgeGroup.addChild(z4);
                        z4.textFlow = TextFlowMaker.generateTextFlow((skillDes.desc.replace("%s%", skillCfg.desc_ex[0] + "")));
                        off += z4.textHeight + 10;
                    }
                }
            }
            else
                attrTxt.textFlow = TextFlowMaker.generateTextFlow1("基础属性 +" + attr + "%");
        }
        this._bottomY = attrTxt.y + attrTxt.height + off;
    };
    EquipDetailedWin.prototype.getScore = function () {
        return this._score;
    };
    EquipDetailedWin.prototype.getPower = function () {
        return this.powerPanel.power;
    };
    EquipDetailedWin.prototype.getType = function () {
        return this.type.text;
    };
    return EquipDetailedWin;
}(BaseEuiView));
__reflect(EquipDetailedWin.prototype, "EquipDetailedWin");
ViewManager.ins().reg(EquipDetailedWin, LayerManager.UI_Popup);
//# sourceMappingURL=EquipDetailedWin.js.map