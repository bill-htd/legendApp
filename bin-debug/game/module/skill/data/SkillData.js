var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SkillData = (function () {
    function SkillData(id) {
        this._specialCD = 0;
        this.configID = id;
    }
    Object.defineProperty(SkillData.prototype, "lv", {
        get: function () {
            return this._id % 1000;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "job", {
        get: function () {
            return Math.floor(this._id % 100000 / 10000);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "id", {
        get: function () {
            return Math.floor(this._id / 1000) * 1000;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "icon", {
        get: function () {
            return this.id + "_png";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "configID", {
        get: function () {
            return this._id;
        },
        set: function (id) {
            this._id = id;
            this.config = GlobalConfig.SkillsConfig[id];
            this._preId = NaN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "preId", {
        get: function () {
            return this._preId;
        },
        set: function (id) {
            this._preId = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "lv1ConfigID", {
        get: function () {
            return this.id + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "castType", {
        get: function () {
            return isNaN(this.config.castType) ? 2 : this.config.castType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "targetType", {
        get: function () {
            return isNaN(this.config.targetType) ? 2 : this.config.targetType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "desc", {
        get: function () {
            var levelConfig = this.config || GlobalConfig.SkillsConfig[this.lv1ConfigID];
            if (Assert(levelConfig, "\u6280\u80FDid:" + this.configID + "\u627E\u4E0D\u5230\u914D\u7F6E")) {
                return "";
            }
            var config = GlobalConfig.SkillsDescConfig[levelConfig.desc];
            var str = config ? config.desc : "";
            if (!str.length || !levelConfig.desc_ex)
                return str;
            var len = levelConfig.desc_ex.length;
            for (var i = 0; i < len; i++) {
                str = str.replace("%s%", levelConfig.desc_ex[i] + "");
            }
            return str;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "affectRange", {
        get: function () {
            return isNaN(this.config.affectRange) ? 1 : this.config.affectRange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "affectCount", {
        get: function () {
            return isNaN(this.config.affectCount) ? 1 : this.config.affectCount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "calcType", {
        get: function () {
            return isNaN(this.config.calcType) ? 1 : this.config.calcType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "herdMonRate", {
        get: function () {
            var config = GlobalConfig.SkillsDescConfig[this.descID];
            return config ? (isNaN(config.herdMonRate) ? 100 : config.herdMonRate) : 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "herdPlayerRate", {
        get: function () {
            var config = GlobalConfig.SkillsDescConfig[this.descID];
            return config ? (isNaN(config.herdPlayerRate) ? 10 : config.herdPlayerRate) : 10;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "cd", {
        get: function () {
            if (this._specialCD)
                return this._specialCD;
            var config = GlobalConfig.SkillsDescConfig[this.descID];
            return config ? config.cd : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "specialCD", {
        set: function (value) {
            this._specialCD = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "isPassive", {
        get: function () {
            return !!this.config.passive;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "rate", {
        get: function () {
            return this.config.passive && this.config.passive.rate || 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "cond", {
        get: function () {
            return this.config.passive && this.config.passive.cond || 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "castRange", {
        get: function () {
            var config = GlobalConfig.SkillsDescConfig[this.descID];
            return config ? config.castRange : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "repelDistance", {
        get: function () {
            return this.config.repelDistance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "teleport", {
        get: function () {
            return this.config.teleport;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "actionType", {
        get: function () {
            var config = GlobalConfig.SkillsDescConfig[this.descID];
            return config ? config.actionType : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "tarEff", {
        get: function () {
            return this.config.tarEff;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "otarEff", {
        get: function () {
            return this.config.otarEff;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "selfEff", {
        get: function () {
            return this.config.selfEff;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "canUse", {
        get: function () {
            return this.config && !!this.lv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "name", {
        get: function () {
            var config = GlobalConfig.SkillsDescConfig[this.descID];
            return config ? config.name : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "args", {
        get: function () {
            return this.config.args;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "wordEff", {
        get: function () {
            var config = GlobalConfig.SkillsDescConfig[this.descID];
            return config ? config.wordEff : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "effType", {
        get: function () {
            return this.config.effType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "otherSkills", {
        get: function () {
            return this.config.otherSkills;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "effectId", {
        get: function () {
            var config = GlobalConfig.SkillsDescConfig[this.descID];
            return config ? config.effectId : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SkillData.prototype, "sound", {
        get: function () {
            var config = GlobalConfig.SkillsDescConfig[this.descID];
            return config ? config.sound : '';
        },
        enumerable: true,
        configurable: true
    });
    SkillData.getSkillByJob = function (job, index, lv) {
        if (index === void 0) { index = 1; }
        if (lv === void 0) { lv = 1; }
        return new SkillData(job * 10000 + index * 1000 + lv);
    };
    Object.defineProperty(SkillData.prototype, "descID", {
        get: function () {
            var config = GlobalConfig.SkillsConfig[this.configID] || GlobalConfig.SkillsConfig[this.lv1ConfigID];
            return config ? config.desc : 0;
        },
        enumerable: true,
        configurable: true
    });
    return SkillData;
}());
__reflect(SkillData.prototype, "SkillData");
//# sourceMappingURL=SkillData.js.map