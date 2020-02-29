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
var EntityModel = (function (_super) {
    __extends(EntityModel, _super);
    function EntityModel() {
        var _this = _super.call(this) || this;
        _this.isElite = false;
        _this.attributeData = [];
        _this.attributeExData = [];
        _this.killNum = 0;
        _this.isMy = false;
        _this.weaponsId = 0;
        _this.isWander = false;
        _this.lyMarkLv = 0;
        _this.lyMarkSkills = [];
        _this.type = EntityType.Monster;
        return _this;
    }
    EntityModel.prototype.parser = function (bytes) {
        this.parserBase(bytes);
        if (this.type != EntityType.CollectionMonst) {
            this.parserAtt(bytes);
            var count = bytes.readShort();
            for (var i = 0; i < count; i++)
                bytes.readInt();
            this.parserLyMark(bytes);
        }
    };
    EntityModel.prototype.parserLyMark = function (bytes) {
        this.lyMarkLv = bytes.readShort();
        this.lyMarkSkills = [];
        var len = bytes.readByte();
        this.lyMarkSkills.length = len;
        for (var i = 0; i < len; i++)
            this.lyMarkSkills[i] = bytes.readShort();
    };
    EntityModel.prototype.parserBase = function (bytes) {
        this.type = bytes.readShort();
        this.handle = bytes.readDouble();
        this.configID = bytes.readInt();
        this.masterHandle = bytes.readDouble();
        this.x = bytes.readInt();
        this.y = bytes.readInt();
        this.isMy = this.checkHandleIsMy(this.masterHandle);
    };
    EntityModel.prototype.checkHandleIsMy = function (handle) {
        if (handle == Actor.handle) {
            return true;
        }
        var roles = SubRoles.ins().roles;
        for (var _i = 0, roles_1 = roles; _i < roles_1.length; _i++) {
            var role = roles_1[_i];
            if (role.handle == handle) {
                return true;
            }
        }
        return false;
    };
    EntityModel.prototype.parserAtt = function (bytes, showTip) {
        if (showTip === void 0) { showTip = false; }
        var count = bytes.readShort();
        if (showTip) {
            for (var i = 0; i < count; i++) {
                var oldValue = this.attributeData[i];
                this.attributeData[i] = bytes.readDouble();
                var changeValue = this.attributeData[i] - oldValue;
                if (oldValue != this.attributeData[i] && AttributeData.FILTER_BASE_DATA_ID.lastIndexOf(i) == -1) {
                    if (changeValue <= 0)
                        continue;
                    if (i < 2 || i > 6) {
                        var color = changeValue > 0 ? "35e62d" : "f3311e";
                        var td = new AttributeData(i, changeValue);
                        if (!AttributeData.getAttrStrByType(td.type))
                            continue;
                        var str1 = "|C:0x" + color + "&T:" + AttributeData.getAttStrByType(td, 0) + "|";
                        if (!GodWeaponCC.ins().gwshowTips)
                            UserTips.ins().showTips(str1);
                        continue;
                    }
                    UserTips.ins().showAttrTips(i, changeValue);
                }
            }
        }
        else {
            for (var i = 0; i < count; i++) {
                this.attributeData[i] = bytes.readDouble();
            }
        }
    };
    EntityModel.prototype.parserExtAtt = function (bytes, showTip) {
        if (showTip === void 0) { showTip = false; }
        var count = bytes.readShort();
        if (showTip) {
            for (var i = 0; i < count; i++) {
                var oldValue = this.attributeExData[i];
                this.attributeExData[i] = bytes.readInt();
                if (oldValue != this.attributeExData[i] && AttributeData.FILTER_EXTDATA_ID.lastIndexOf(i) == -1) {
                    var changeValue = this.attributeExData[i] - oldValue;
                    if (changeValue <= 0)
                        continue;
                    var color = changeValue > 0 ? "35e62d" : "f3311e";
                    var str = changeValue > 0 ? "+" : "";
                    var td = new AttributeData(i, changeValue);
                    var str1 = "|C:0x" + color + "&T:" + AttributeData.getExtAttStrByType(td, 0) + "|";
                    UserTips.ins().showTips(str1);
                }
            }
        }
        else {
            for (var i = 0; i < count; i++) {
                this.attributeData[i] = bytes.readInt();
            }
        }
    };
    EntityModel.prototype.parserHeirloom = function () {
    };
    EntityModel.prototype.getAtt = function (attType) {
        return this.attributeData[attType] || 0;
    };
    EntityModel.prototype.setAtt = function (attType, value) {
        this.attributeData[attType] = value;
    };
    EntityModel.prototype.getExAtt = function (attType) {
        return this.attributeExData[attType] || 0;
    };
    Object.defineProperty(EntityModel.prototype, "avatarFileName", {
        get: function () {
            return "monster" + this.avatar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityModel.prototype, "weaponFileName", {
        get: function () {
            return '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityModel.prototype, "avatar", {
        get: function () {
            return this._avatar || GlobalConfig.MonstersConfig[this.configID].avatar;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityModel.prototype, "name", {
        get: function () {
            return this._name || GlobalConfig.MonstersConfig[this.configID].name;
        },
        set: function (str) {
            this._name = str;
        },
        enumerable: true,
        configurable: true
    });
    EntityModel.prototype.getNameWithServer = function () {
        return this._servId && KFServerSys.ins().isKF ? this.name + ("S" + this._servId) : this.name;
    };
    EntityModel.prototype.getDir = function () {
        var config = GlobalConfig.MonstersConfig[this.configID];
        if (!config)
            return -1;
        var dir = GlobalConfig.MonstersConfig[this.configID].dir;
        if (isNaN(dir))
            return -1;
        return dir;
    };
    Object.defineProperty(EntityModel.prototype, "dirNum", {
        get: function () {
            var config = GlobalConfig.MonstersConfig[this.configID];
            if (config) {
                this._dirNum = NaN;
                if (config.dirNum) {
                    return config.dirNum;
                }
            }
            if (this._dirNum) {
                return this._dirNum;
            }
            return 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityModel.prototype, "avatarScale", {
        get: function () {
            var s = this._scale || GlobalConfig.MonstersConfig[this.configID].scale;
            if (s)
                return s / 100;
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityModel.prototype, "avatarEffect", {
        get: function () {
            if (GlobalConfig.MonstersConfig[this.configID] &&
                GlobalConfig.MonstersConfig[this.configID].effect) {
                return GlobalConfig.EffectConfig[GlobalConfig.MonstersConfig[this.configID].effect].fileName;
            }
            return "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityModel.prototype, "attRange", {
        get: function () {
            if (GlobalConfig.MonstersConfig[this.configID].attrange) {
                return GlobalConfig.MonstersConfig[this.configID].attrange;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityModel.prototype, "movePara", {
        get: function () {
            if (GlobalConfig.YouDangConfig[this.wandertime] && this.wanderrange) {
                return [this.wanderrange, GlobalConfig.YouDangConfig[this.wandertime].fileName];
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityModel.prototype, "lv", {
        get: function () {
            return GlobalConfig.MonstersConfig[this.configID].level;
        },
        set: function (value) {
            this._lv = value;
        },
        enumerable: true,
        configurable: true
    });
    EntityModel.prototype.setPos = function (x, y) {
        this.x = x;
        this.y = y;
    };
    return EntityModel;
}(NpcModel));
__reflect(EntityModel.prototype, "EntityModel");
//# sourceMappingURL=EntityModel.js.map