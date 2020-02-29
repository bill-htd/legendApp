var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GodWeaponData = (function () {
    function GodWeaponData(bytes) {
        this.parse(bytes);
    }
    GodWeaponData.prototype.parse = function (bytes) {
        this.weaponId = bytes.readInt();
        this.curLv = bytes.readInt();
        this.curExp = bytes.readInt();
        this.skillPoint = bytes.readInt();
        this.openCount = bytes.readInt();
        if (this.openCount <= 0 && this.openSkillAry && this.openSkillAry.length > 0) {
            var len = this.openSkillAry.length;
            for (var i = 0; i < len; i++)
                this.openSkillAry[i].skillLv = 0;
        }
        this.openSkillAry = [];
        var data;
        var skillId;
        for (var i = 0; i < this.openCount; i++) {
            skillId = bytes.readInt();
            data = GodWeaponCC.ins().getWeaponSkillidData(this.weaponId, skillId);
            data.addLv = 0;
            data.skillLv = bytes.readInt();
            this.openSkillAry.push(data);
        }
        for (var key in GodWeaponCC.ins().allSkillData2[this.weaponId]) {
            if (GodWeaponCC.ins().allSkillData2[this.weaponId][key].skillLv == 0) {
                GodWeaponCC.ins().allSkillData2[this.weaponId][key].addLv = 0;
            }
        }
        this.inlayCount = bytes.readInt();
        var item;
        var pos;
        for (var i = 0; i < this.inlayCount; i++) {
            pos = bytes.readInt();
            item = GodWeaponCC.ins().getGodItemData(this.weaponId, pos);
            item.itemId = bytes.readInt();
            for (var j = 0; j < item.config.skill.length; j++) {
                var dataTemp = GodWeaponCC.ins().getWeaponSkillidData(this.weaponId, item.config.skill[j]);
                dataTemp.addLv += 1;
            }
        }
        this.config = GlobalConfig.GodWeaponLevelConfig[this.curLv];
    };
    Object.defineProperty(GodWeaponData.prototype, "hasRedPoint", {
        get: function () {
            if (this.skillPoint > 0) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GodWeaponData.prototype, "addAttr", {
        get: function () {
            return this.config["attr" + this.weaponId] == null ? [] : this.config["attr" + this.weaponId];
        },
        enumerable: true,
        configurable: true
    });
    GodWeaponData.prototype.getResetPoint = function () {
        var len = this.openSkillAry ? this.openSkillAry.length : 0;
        var count = 0;
        for (var i = 0; i < len; i++)
            count += this.openSkillAry[i].skillLv;
        return count;
    };
    GodWeaponData.prototype.getWeaponName = function () {
        switch (this.weaponId) {
            case 1:
                return "\u96F7\u9706\u6012\u65A9";
            case 2:
                return "\u8D64\u8840\u9B54\u5251";
            case 3:
                return "\u65E0\u6781\u900D\u9065\u6247";
        }
        return "";
    };
    return GodWeaponData;
}());
__reflect(GodWeaponData.prototype, "GodWeaponData");
var GwSkillData = (function () {
    function GwSkillData(id, lv) {
        this._skillLv = 0;
        this.addLv = 0;
        this.skillId = id;
        this.skillLv = lv;
    }
    Object.defineProperty(GwSkillData.prototype, "skillLv", {
        get: function () {
            return this._skillLv;
        },
        set: function (value) {
            this._skillLv = value;
        },
        enumerable: true,
        configurable: true
    });
    GwSkillData.prototype.lvLabel = function (b) {
        if (b === void 0) { b = false; }
        var cur = this._skillLv + this.addLv;
        var max;
        if (!this.isOpen) {
            max = this._skillLv != 0 ? this.config.upLevel + this.addLv : this.addLv;
        }
        else {
            max = this.config.upLevel + this.addLv;
        }
        if (b) {
            return "" + cur;
        }
        else {
            return cur + "/" + max;
        }
    };
    Object.defineProperty(GwSkillData.prototype, "skillPower", {
        get: function () {
            var power = this.config.exPower || 0;
            var cur = this._skillLv + this.addLv;
            return power * cur;
        },
        enumerable: true,
        configurable: true
    });
    GwSkillData.prototype.addAttrValyeType = function (lvN) {
        var str = "";
        if (this.config.attr) {
            for (var i = 0; i < this.config.attr.length; i++) {
                if (str.length > 0) {
                    str += "\n";
                }
                str += AttributeData.getAttrStrByType(this.config.attr[i].type) + "提升" + ("<font color=\"#35E62D\">" + this.config.attr[i].value * lvN + "</font>");
            }
        }
        return str;
    };
    GwSkillData.prototype.addExAttrstr = function (lvN) {
        var str = "";
        if (this.config.exattr) {
            var des = "";
            var addDes = "";
            for (var i = 0; i < this.config.exattr.length; i++) {
                if (str.length > 0) {
                    str += "\n";
                }
                des = GodWeaponCC.ins().exattrDesObj[this.config.exattr[i].type];
                switch (this.config.exattr[i].type) {
                    case 43:
                    case 48:
                        addDes = "<font color=\"#35E62D\">" + this.config.exattr[i].value * lvN / 100 + "</font>";
                        break;
                    case 44:
                    case 45:
                    case 46:
                        addDes = "<font color=\"#35E62D\">" + (1 + this.config.exattr[i].value * lvN / 100) + "</font>";
                        break;
                    case 47:
                        var effectConfig = GlobalConfig.EffectsConfig[100400 + this.config.exattr[i].value * lvN];
                        if (effectConfig && effectConfig.args) {
                            addDes = "<font color=\"#35E62D\">" + effectConfig.args.a * 100 + "</font>";
                        }
                        break;
                }
                des = des.replace("%s%", addDes);
                str += des;
            }
        }
        return str;
    };
    GwSkillData.prototype.addatrStr = function (value) {
        this._addStr = "";
        var lvN = value + this.addLv;
        this._addStr += this.addAttrValyeType(lvN);
        this._addStr += this.addExAttrstr(lvN);
        var skillId;
        var data;
        if (this.config.newskill) {
            skillId = this.config.newskill * 1000 + lvN;
            data = new SkillData(skillId);
            if (this._addStr.length > 0) {
                this._addStr += "\n";
            }
            this._addStr += this.getSkillDataDes(data);
        }
        if (this.config.passiveskill) {
            skillId = this.config.passiveskill * 1000 + lvN;
            data = new SkillData(skillId);
            if (this._addStr.length > 0) {
                this._addStr += "\n";
            }
            this._addStr += this.getSkillDataDes(data);
        }
        this._addStr += this.specialSkill(lvN);
        return this._addStr;
    };
    GwSkillData.prototype.getSkillDataDes = function (data) {
        var levelConfig = data.config || GlobalConfig.SkillsConfig[data.lv1ConfigID];
        if (Assert(levelConfig, "\u6280\u80FDid:" + data.configID + "\u627E\u4E0D\u5230\u914D\u7F6E")) {
            return "";
        }
        var config = GlobalConfig.SkillsDescConfig[levelConfig.desc];
        var str = config ? config.desc : "";
        if (!str.length || !levelConfig.desc_ex)
            return str;
        var len = levelConfig.desc_ex.length;
        for (var i = 0; i < len; i++) {
            str = str.replace("%s%", "<font color=\"#35E62D\">" + levelConfig.desc_ex[i] + "</font>");
        }
        return str;
    };
    GwSkillData.prototype.specialSkill = function (value) {
        var lvN = value + this.addLv;
        var str = "";
        if (this.config.skill) {
            var config = void 0;
            var index = this.skillId * 1000 + lvN;
            for (var key in GlobalConfig.GWSkillReviseConfig) {
                config = GlobalConfig.GWSkillReviseConfig[key];
                if (config.skill == this.config.skill && config.gwIndex == index) {
                    str = config.desc;
                    break;
                }
            }
        }
        return str;
    };
    Object.defineProperty(GwSkillData.prototype, "isOpen", {
        get: function () {
            var b = true;
            if (this.config.condition) {
                for (var key in this.config.condition) {
                    var data = void 0;
                    if (parseInt(key) == 0) {
                        data = GodWeaponCC.ins().getWeaponSkillidData(this.weaponId, parseInt(key) + 1);
                    }
                    else {
                        data = GodWeaponCC.ins().getWeaponSkillidData(this.weaponId, parseInt(key));
                    }
                    if (data.skillLv < this.config.condition[key]) {
                        b = false;
                        break;
                    }
                }
                return b;
            }
            else {
                return b;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GwSkillData.prototype, "openTip", {
        get: function () {
            if (!this._openTip) {
                this._openTip = "";
                if (this.skillId == GodWeaponCC.ins().maxSkillIdAry[this.weaponId - 1]) {
                    this._openTip = "所有技能满级后解锁";
                }
                else {
                    for (var key in this.config.condition) {
                        var data = void 0;
                        if (parseInt(key) == 0) {
                            data = GodWeaponCC.ins().getWeaponSkillidData(this.weaponId, parseInt(key) + 1);
                        }
                        else {
                            data = GodWeaponCC.ins().getWeaponSkillidData(this.weaponId, parseInt(key));
                        }
                        if (this._openTip.length > 0) {
                            this._openTip += "\n";
                        }
                        this._openTip += data.config.skillName + ("\u8FBE\u5230" + this.config.condition[key] + "\u89E3\u9501");
                    }
                }
            }
            return this._openTip;
        },
        enumerable: true,
        configurable: true
    });
    return GwSkillData;
}());
__reflect(GwSkillData.prototype, "GwSkillData");
var GwItem = (function () {
    function GwItem() {
        this.isCur = false;
    }
    Object.defineProperty(GwItem.prototype, "itemId", {
        get: function () {
            return this._itemId;
        },
        set: function (value) {
            this._itemId = value;
            this.config = GlobalConfig.GodweaponItemConfig[this.itemId];
            this.itemConfig = GlobalConfig.ItemConfig[this.itemId];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GwItem.prototype, "openLv", {
        get: function () {
            return GlobalConfig.GodWeaponBaseConfig.openLevel[this.pos - 1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GwItem.prototype, "isOpen", {
        get: function () {
            var weaponData = GodWeaponCC.ins().getWeaponData(this.weaponId);
            if (weaponData && weaponData.curLv < this.openLv) {
                return false;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GwItem.prototype, "addatrStr", {
        get: function () {
            if (this._addStr == null) {
                this._addStr = "";
                for (var i = 0; i < this.config.attr.length; i++) {
                    if (this._addStr.length > 0) {
                        this._addStr += "\n";
                    }
                    this._addStr += AttributeData.getAttrStrByType(this.config.attr[i].type) + " +" + this.config.attr[i].value;
                }
            }
            return this._addStr;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GwItem.prototype, "skillName", {
        get: function () {
            if (this._skillName == null) {
                this._skillName = "";
                for (var i = 0; i < this.config.skill.length; i++) {
                    if (this._skillName.length > 0) {
                        this._skillName += "、";
                    }
                    this._skillName += GodWeaponCC.ins().getWeaponSkillidData(this.weaponId, this.config.skill[i]).config.skillName;
                }
            }
            return this._skillName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GwItem.prototype, "skillPower", {
        get: function () {
            if (!this._skillPower) {
                this._skillPower = 0;
                var data = void 0;
                for (var i = 0; i < this.config.skill.length; i++) {
                    data = GodWeaponCC.ins().getWeaponSkillidData(this.weaponId, this.config.skill[i]);
                    if (data.config.exPower) {
                        this._skillPower += data.config.exPower;
                    }
                    if (data.config.attr) {
                        var dataList = [];
                        for (var j = 0; j < data.config.attr.length; j++) {
                            dataList.push(new AttributeData(data.config.attr[j].type, data.config.attr[j].value));
                        }
                        this._skillPower += UserBag.getAttrPower(dataList);
                    }
                }
            }
            return this._skillPower;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GwItem.prototype, "power", {
        get: function () {
            if (!this._power) {
                this._power = 0;
                this._power += this.skillPower;
                var data = [];
                for (var i = 0; i < this.config.attr.length; i++) {
                    data.push(new AttributeData(this.config.attr[i].type, this.config.attr[i].value));
                }
                this._power += UserBag.getAttrPower(data);
            }
            return this._power;
        },
        enumerable: true,
        configurable: true
    });
    return GwItem;
}());
__reflect(GwItem.prototype, "GwItem");
//# sourceMappingURL=GodWeaponData.js.map