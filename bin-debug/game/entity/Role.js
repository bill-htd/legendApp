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
var Role = (function (_super) {
    __extends(Role, _super);
    function Role() {
        var _this = _super.call(this) || this;
        _this.runeDatas = [];
        _this.wingSkillData = [];
        _this.lilianLv = 0;
        _this._mbRing = 0;
        _this.hsRing = 0;
        _this.type = EntityType.Role;
        return _this;
    }
    Role.getAttrTypeByName = function (attrName) {
        return this.translate[attrName];
    };
    Role.getJobNameByJob = function (type) {
        return this.jobNumberToName[type];
    };
    Role.getHejiEquipNameByType = function (type) {
        return this.hejiPosName[type];
    };
    Role.getEquipNameByType = function (type) {
        return this.typeNumberToName[type];
    };
    Role.getWingEquipNameByType = function (type) {
        return this.typeEquipWingToName[type];
    };
    Role.getAllForgeLevelByType = function (packageID) {
        var sumlevel = 0;
        var len = SubRoles.ins().subRolesLen;
        for (var r = 0; r < len; r++) {
            var eqdata = SubRoles.ins().getSubRoleByIndex(r).equipsData;
            for (var i = 0; i < UserEquip.FOEGE_MAX; i++) {
                switch (packageID) {
                    case PackageID.strongthen:
                        sumlevel += eqdata[i].strengthen;
                        break;
                    case PackageID.Gem:
                        sumlevel += eqdata[i].gem;
                        break;
                    case PackageID.Zhuling:
                        sumlevel += eqdata[i].zhuling;
                        break;
                }
            }
        }
        return sumlevel;
    };
    Role.getAllZSLevel = function () {
        var sumlevel = 0;
        var len = SubRoles.ins().subRolesLen;
        for (var r = 0; r < len; r++) {
            var eqdata = SubRoles.ins().getSubRoleByIndex(r).equipsData;
            for (var i = 0; i < UserEquip.FOEGE_MAX; i++) {
                var configID = eqdata[i].item.configID;
                var curItemData = GlobalConfig.ItemConfig[configID];
                if (curItemData && ItemConfig.getQuality(curItemData) == 4 && curItemData.zsLevel) {
                    sumlevel += curItemData.zsLevel;
                }
            }
        }
        return sumlevel;
    };
    Role.prototype.parser = function (bytes) {
        this.title = bytes.readInt();
        this.index = bytes.readInt();
        this.job = bytes.readInt();
        this.sex = bytes.readInt();
        this.power = bytes.readDouble();
        this.skillsData = [];
        var i;
        for (i = 0; i < 5; i++) {
            var lv = bytes.readInt();
            this.skillsData.push(SkillData.getSkillByJob(this.job, i + 1, lv));
        }
        for (i = 0; i < 5; i++) {
            bytes.readInt();
        }
        this.yuanshengData = [];
        this.yuanshenLv = bytes.readInt();
        for (i = 0; i < 6; i++) {
            this.yuanshengData.push(bytes.readBoolean());
        }
        this.equipsData = [];
        var equip;
        for (i = 0; i < EquipPos.MAX; i++) {
            equip = new EquipsData();
            equip.parser(bytes);
            this.equipsData.push(equip);
        }
        this.exRingsData = [];
        for (i = 0; i < 4; i++) {
            this.exRingsData.push(bytes.readInt());
        }
        this.wingsData = new WingsData;
        this.wingsData.parser(bytes);
        this.jingMaiData = new JingMaiData;
        this.jingMaiData.parser(bytes);
        this.loongSoulData = new LongHunData();
        this.loongSoulData.parser(bytes);
        this.parserRune(bytes);
        this.parserhHeirloom(bytes);
        this.parserhWeapons(bytes);
        this.parserAtt(bytes);
        this.parserExAtt(bytes);
        this.parseJadeData(bytes);
        this.parserZhuangbei(bytes);
        this.setWingSkill();
    };
    Role.prototype.parserhWeapons = function (bytes) {
        if (!this.weapons)
            this.weapons = new WeaponsData();
        this.weapons.weaponsId = bytes.readInt();
    };
    Role.prototype.parserhHeirloom = function (bytes) {
        if (!this.heirloom)
            this.heirloom = new HeirloomData();
        this.heirloom.parser(bytes);
    };
    Role.prototype.setWingSkill = function () {
        this.wingSkillData = [];
        for (var j = 0; j < this.wingsData.lv + 1; j++) {
            var tData = GlobalConfig.WingLevelConfig[j];
            if (tData && tData.pasSkillId) {
                this.wingSkillData.push(tData.pasSkillId);
            }
        }
    };
    Role.prototype.parserModel = function (bytes) {
        var len = bytes.readShort();
        this.zhuZaiData = [];
        for (var j = 0; j < len; j++) {
            var data = new ZhuZaiData;
            data.parser(bytes);
            this.zhuZaiData[data.id - 1] = data;
        }
    };
    Role.prototype.parseJadeData = function (bytes) {
        if (!this.jadeData)
            this.jadeData = new JadeDataNew();
        this.jadeData.parserOther(bytes);
    };
    Role.prototype.parserZhuangbei = function (bytes) {
        this.zhuangbei = [];
        for (var i = 0; i < 3; i++) {
            this.zhuangbei.push(bytes.readInt());
        }
    };
    Role.prototype.parserRune = function (bytes) {
        var num = 8;
        var rd = null;
        this.runeDatas = [];
        for (var i = 0; i < num; i++) {
            rd = new ItemData();
            rd.parser(bytes);
            this.runeDatas.push(rd);
        }
    };
    Role.prototype.parseForgeChange = function (bytes, packageID) {
        var index = bytes.readInt();
        switch (packageID) {
            case PackageID.strongthen:
                this.equipsData[index].strengthen = bytes.readInt();
                break;
            case PackageID.Gem:
                this.equipsData[index].gem = bytes.readInt();
                break;
            case PackageID.Zhuling:
                this.equipsData[index].zhuling = bytes.readInt();
                break;
            case PackageID.Tupo:
                this.equipsData[index].tupo = bytes.readInt();
                break;
            case 1100:
                this.equipsData[index].bless = bytes.readInt();
                break;
        }
        return index;
    };
    Role.prototype.parserExAtt = function (bytes) {
        var count = bytes.readShort();
        for (var i = 0; i < count; i++) {
            this.attributeExData[i] = bytes.readInt();
        }
    };
    Role.prototype.parserOtherRole = function (bytes, isHuman) {
        this.parserAtt(bytes);
        this.parserExAtt(bytes);
        this._name = bytes.readString();
        if (isHuman)
            this._servId = bytes.readInt();
        this.job = bytes.readByte();
        this.sex = bytes.readByte();
        this._lv = bytes.readInt();
        this.equipsData = [];
        this.equipsData[2] = new EquipsData;
        this.equipsData[2].item = new ItemData;
        this.equipsData[2].item.configID = bytes.readInt();
        this.equipsData[0] = new EquipsData;
        this.equipsData[0].item = new ItemData;
        this.equipsData[0].item.configID = bytes.readInt();
        this.wingsData = new WingsData;
        this.wingsData.lv = bytes.readInt();
        this.wingsData.openStatus = bytes.readInt();
        this.title = bytes.readInt();
        this.guildID = bytes.readInt();
        this.guildName = bytes.readString();
        this.parserZhuangbei(bytes);
        this.lilianLv = bytes.readInt();
        this.weaponsId = bytes.readShort();
        this.parserhHeirloom(bytes);
        this.camp = bytes.readShort();
    };
    Object.defineProperty(Role.prototype, "mbRing", {
        get: function () {
            return this._mbRing;
        },
        set: function (value) {
            this._mbRing = value;
        },
        enumerable: true,
        configurable: true
    });
    Role.prototype.getMinEquipIndexByType = function (type) {
        var index = 0;
        var min = Number.MAX_VALUE;
        var lv = 0;
        var num = ForgeConst.CAN_FORGE_EQUIP.length;
        for (var n = 0; n < num; ++n) {
            var i = ForgeConst.CAN_FORGE_EQUIP[n];
            switch (type) {
                case ForgeWin.Page_Select_Boost:
                    lv = this.equipsData[i].strengthen;
                    break;
                case ForgeWin.Page_Select_Gem:
                    lv = this.equipsData[i].gem;
                    var openConfig = GlobalConfig.StoneOpenConfig[i];
                    if (Actor.level < openConfig.openLv)
                        continue;
                    break;
                case ForgeWin.Page_Select_ZhuLing:
                    lv = this.equipsData[i].zhuling;
                    break;
                case 3:
                    lv = this.equipsData[i].tupo;
                    break;
            }
            if (min > lv) {
                min = lv;
                index = i;
            }
        }
        return index;
    };
    Role.prototype.getEquipForgeTotalLv = function (type) {
        var totalLv = 0;
        var n = ForgeConst.CAN_FORGE_EQUIP.length;
        while (n--) {
            var i = ForgeConst.CAN_FORGE_EQUIP[n];
            switch (type) {
                case ForgeWin.Page_Select_Boost:
                    totalLv += this.getEquipByIndex(i).strengthen;
                    break;
                case ForgeWin.Page_Select_Gem:
                    totalLv += this.getEquipByIndex(i).gem;
                    break;
                case ForgeWin.Page_Select_ZhuLing:
                    totalLv += this.getEquipByIndex(i).zhuling;
                    break;
                case 3:
                    totalLv += this.getEquipByIndex(i).tupo;
                    break;
            }
        }
        return totalLv;
    };
    Role.prototype.getEquipForgeLv = function (solt, type) {
        var lv = 0;
        switch (type) {
            case ForgeWin.Page_Select_Boost:
                lv += this.getEquipByIndex(solt).strengthen;
                break;
            case ForgeWin.Page_Select_Gem:
                lv += this.getEquipByIndex(solt).gem;
                break;
            case ForgeWin.Page_Select_ZhuLing:
                lv += this.getEquipByIndex(solt).zhuling;
                break;
            case 3:
                lv += this.getEquipByIndex(solt).tupo;
                break;
        }
        return lv;
    };
    Role.prototype.getAllHeirloomPower = function () {
        var total = 0;
        for (var i = 0; i < 8; i++)
            total += this.getHeirloomSlotPower(i);
        return total;
    };
    Role.prototype.getHeirloomSlotPower = function (solt) {
        var info = this.heirloom.getInfoBySolt(solt);
        var power = UserBag.getAttrPower(info.attr) || 0;
        var add_attr = info.attr_add;
        var forgePower = 0;
        var equipData = this.getEquipByIndex(solt);
        if (equipData.item.itemConfig) {
            forgePower += equipData.item.point;
            for (var i = 0; i < 3; i++) {
                var lv = this.getEquipForgeLv(solt, i);
                var config = UserForge.ins().getForgeConfigByPos(solt, lv, i);
                forgePower += UserBag.getAttrPower(config.attr) || 0;
            }
        }
        var totalPower = power + Math.floor(forgePower * (add_attr / 100));
        return totalPower;
    };
    Role.prototype.getCurSkillIDs = function () {
        var data = [];
        for (var i = 0; i < this.skillsData.length; i++) {
            data.push(this.skillsData[i].lv1ConfigID);
        }
        return data;
    };
    Role.prototype.mergeData = function (data) {
        this.masterHandle = data.masterHandle;
        this.handle = data.handle;
        this.type = data.type;
        this.x = data.x;
        this.y = data.y;
        this.attributeData = data.attributeData;
        this.attributeExData = data.attributeExData;
        this.team = data.team;
        this.lilianLv = data.lilianLv;
        this.name = data.name;
        this.guildID = data.guildID;
        this.guildName = data.guildName;
        this.isMy = data.isMy;
        this.title = data.title;
        if (data instanceof Role) {
            this.warLevel = data.warLevel;
            this.mbRing = data.mbRing;
            this.hsRing = data.hsRing;
        }
        return this;
    };
    Role.prototype.getEquipDataByPos = function (pos) {
        if (this.equipsData && this.equipsData[pos]) {
            return this.equipsData[pos];
        }
        return null;
    };
    Role.prototype.getForgeTotalPower = function (type) {
        var totalPower = 0;
        var n = ForgeConst.CAN_FORGE_EQUIP.length;
        while (n--) {
            var i = ForgeConst.CAN_FORGE_EQUIP[n];
            var lv = void 0;
            switch (type) {
                case ForgeWin.Page_Select_Boost:
                    lv = this.equipsData[i].strengthen;
                    break;
                case ForgeWin.Page_Select_ZhuLing:
                    lv = this.equipsData[i].zhuling;
                    break;
                case ForgeWin.Page_Select_Gem:
                    lv = this.equipsData[i].gem;
                    break;
                case 3:
                    lv = this.equipsData[i].tupo;
                    break;
            }
            if (lv > 0) {
                var forgeConfig = UserForge.ins().getForgeConfigByPos(i, lv, type);
                totalPower += Math.floor(UserBag.getAttrPower(forgeConfig.attr));
            }
        }
        return totalPower;
    };
    Role.prototype.getWeaponTotalPower = function (id) {
        var totalPower = 0;
        var attr = [];
        if (id > 0) {
            var wsconfig = GlobalConfig.WeaponSoulConfig[id];
            for (var i = 0; i < wsconfig.actcond.length; i++) {
                var slot = wsconfig.actcond[i];
                var winfo = this.weapons.getSlotByInfo(slot);
                if (winfo) {
                    for (var j = 0; j < winfo.attr.length; j++) {
                        var at = new AttributeData;
                        at.type = winfo.attr[j].type;
                        at.value = winfo.attr[j].value;
                        attr.push(at);
                    }
                }
            }
        }
        else {
            var infodata = this.weapons.getInfoData();
            for (var k in infodata) {
                var wsinfo = infodata[k];
                for (var w in wsinfo) {
                    var info = wsinfo[w];
                    if (info && info.level) {
                        for (var j = 0; j < info.attr.length; j++) {
                            var at = new AttributeData;
                            var tmp = info.attr[j];
                            at.type = tmp.type;
                            at.value = tmp.value;
                            attr.push(at);
                        }
                    }
                }
            }
        }
        var index = this.weapons.flexibleCount ? this.weapons.flexibleCount - 1 : 0;
        var config = GlobalConfig.WeaponSoulItemAttr[index];
        if (attr.length && config) {
            for (var i = 0; i < config.attr.length; i++) {
                var isHave = false;
                for (var j = 0; j < attr.length; j++) {
                    if (attr[j].type == config.attr[i].type) {
                        isHave = true;
                        attr[j].value += config.attr[i].value;
                        break;
                    }
                }
                if (!isHave) {
                    var at = new AttributeData;
                    var tmp = config.attr[i];
                    at.type = tmp.type;
                    at.value = tmp.value;
                    attr.push(at);
                }
            }
        }
        totalPower += Math.floor(UserBag.getAttrPower(attr));
        return totalPower;
    };
    Object.defineProperty(Role.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (str) {
            this._name = str;
        },
        enumerable: true,
        configurable: true
    });
    Role.prototype.getNameWithServer2 = function () {
        var serverName = window['getServerName'](this._servId);
        return this._servId && KFServerSys.ins().isKF ? this.name + ("\n[" + serverName + "]") : this.name;
    };
    Object.defineProperty(Role.prototype, "guildAndName", {
        get: function () {
            var nameStr = this.getNameWithServer();
            var specailColor = this.camp > 0 && BattleCC.ins().isBattle() ? (this.camp != BattleCC.ins().camp ? "#FF0000" : "#00FF00") : null;
            var str = this.guildID == 0 || this.guildID == undefined ? nameStr : "<font color='" + (specailColor ? specailColor : this.guildID == GuildWar.ins().getModel().winGuildInfo.guildId ? "#ffb243" : this.guildID == Guild.ins().guildID ? "#5add70" : "#2CC2F8") + "}'>" + this.guildName + "</font>" + "\n" + this.name;
            if (this.lilianLv > 0) {
                var config = GlobalConfig.TrainLevelConfig[this.lilianLv];
                if (config.type > 1) {
                    var color = ColorUtil.JUEWEI_COLOR[config.type - 1] || ColorUtil.JUEWEI_COLOR[ColorUtil.JUEWEI_COLOR.length - 1];
                    str += " <font color=" + (specailColor ? specailColor : color) + ">[" + config.trainName + "]</font>";
                }
            }
            return str;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Role.prototype, "lilianUrl", {
        get: function () {
            return '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Role.prototype, "lv", {
        get: function () {
            return this._lv;
        },
        enumerable: true,
        configurable: true
    });
    Role.prototype.getZhuZaiDataByIndex = function (index) {
        return this.zhuZaiData[index];
    };
    Role.prototype.getEquipByIndex = function (index) {
        return this.equipsData[index];
    };
    Role.prototype.hideWeapons = function () {
        var id = this.getEquipByIndex(0).item.configID;
        return GlobalConfig.EquipConfig[id] && GlobalConfig.EquipConfig[id].noWSoulEff >= 1;
    };
    Role.prototype.getEquipLen = function () {
        return this.equipsData.length;
    };
    Role.prototype.getExRingsData = function (index) {
        return this.exRingsData[index];
    };
    Role.prototype.setExRingsData = function (index, value) {
        this.exRingsData[index] = value;
    };
    Role.prototype.setZhuZaiData = function (index, value) {
        this.zhuZaiData[index] = value;
    };
    Role.jobNumberToName = {
        0: "通用",
        1: "战士",
        2: "法师",
        3: "道士",
    };
    Role.translate = {
        'hp': AttributeType.atMaxHp,
        'atk': AttributeType.atAttack,
        'def': AttributeType.atDef,
        'res': AttributeType.atRes,
        'crit': AttributeType.atCrit,
        'tough': AttributeType.atTough
    };
    Role.typeNumberToName = [
        "武器",
        "头盔",
        "衣服",
        "项链",
        "护腕",
        "腰带",
        "戒指",
        "鞋子",
        "官印",
        "斗笠",
        "面甲",
        "披风",
        "盾牌",
    ];
    Role.hejiPosName = ["乾", "巽", "坎", "艮", "坤", "震", "离", "兑"];
    Role.typeEquipWingToName = [
        "翼枢",
        "翼爪",
        "翎羽",
        "彩凤",
    ];
    return Role;
}(EntityModel));
__reflect(Role.prototype, "Role");
//# sourceMappingURL=Role.js.map