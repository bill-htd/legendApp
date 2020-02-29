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
var HeartMethod = (function (_super) {
    __extends(HeartMethod, _super);
    function HeartMethod() {
        var _this = _super.call(this) || this;
        _this._proShowList = [];
        _this.sysId = PackageID.HeartMethod;
        _this.regNetMsg(1, _this.postHeartInfo);
        _this.regNetMsg(2, _this.postHeartUpLevel);
        _this.regNetMsg(5, _this.postOneKeyDecompose);
        _this.HeartMethodInfo = [];
        return _this;
    }
    Object.defineProperty(HeartMethod.prototype, "proShowList", {
        get: function () {
            if (!this._proShowList.length) {
                this._proShowList = GlobalConfig.HeartMethodBaseConfig.proShowList;
            }
            return this._proShowList;
        },
        enumerable: true,
        configurable: true
    });
    HeartMethod.ins = function () {
        return _super.ins.call(this);
    };
    HeartMethod.prototype.heartOpenCondition = function (hearId) {
        var config = GlobalConfig.HeartMethodConfig[hearId];
        if (!config.openCondition)
            return true;
        if ((GameServer.serverOpenDay + 1) < config.openCondition.day)
            return false;
        if (UserZs.ins().lv < config.openCondition.zs)
            return false;
        return true;
    };
    HeartMethod.prototype.heartUpCondition = function (roleId, hearId) {
        var config = GlobalConfig.HeartMethodConfig[hearId];
        if (!config.upGradeCondition)
            return true;
        var hmdataMap = this.HeartMethodInfo[roleId];
        if (!hmdataMap)
            return false;
        var hmdata = hmdataMap[hearId];
        if (!hmdata)
            return false;
        var count = 0;
        for (var i = 0; i < hmdata.slots.length; i++) {
            if (hmdata.slots[i])
                count++;
        }
        if (count < config.upGradeCondition)
            return false;
        return true;
    };
    HeartMethod.prototype.checkOpen = function () {
        if (GameServer.serverOpenDay < (GlobalConfig.HeartMethodBaseConfig.serverDay - 1)) {
            return false;
        }
        if (UserZs.ins().lv < GlobalConfig.HeartMethodBaseConfig.zsLv) {
            return false;
        }
        return true;
    };
    HeartMethod.prototype.getHeartCfg = function (item, next) {
        if (next === void 0) { next = false; }
        var heartConfigs = GlobalConfig.HeartMethodStarConfig;
        if (Assert(heartConfigs, "HeartMethodStarConfig is null"))
            return null;
        var id = next ? item.configID + 1 : item.configID;
        return heartConfigs[id];
    };
    HeartMethod.prototype.calcHeartSlotValue = function (roleId, id) {
        var attrs = [];
        return attrs;
    };
    HeartMethod.prototype.getHeartSlotItemIdWear = function (roleId, hearId, pos) {
        var hmdataMap = this.HeartMethodInfo[roleId];
        if (!hmdataMap)
            return 0;
        var hmdata = hmdataMap[hearId];
        if (!hmdata)
            return 0;
        var itemData = UserBag.ins().getBagGoodsByType(ItemType.TYPE_18);
        itemData.sort(this.changeSort);
        for (var k in itemData) {
            var cfg = GlobalConfig.HeartMethodStarConfig[itemData[k].configID];
            if (cfg.heartmethodId != hearId)
                continue;
            var itemConfig = itemData[k].itemConfig;
            var lv = itemConfig.level ? itemConfig.level : 0;
            var zslv = itemConfig.zsLevel ? itemConfig.zsLevel : 0;
            if (Actor.level < lv || UserZs.ins().lv < zslv)
                continue;
            var pId = this.getSuitPosFromItemId(itemData[k].configID);
            if (pos == pId)
                return itemData[k].configID;
        }
        return 0;
    };
    HeartMethod.prototype.getHeartSlotItemId = function (roleId, hearId, pos) {
        var hmdataMap = this.HeartMethodInfo[roleId];
        if (!hmdataMap)
            return 0;
        var hmdata = hmdataMap[hearId];
        if (!hmdata)
            return 0;
        if (hmdata.slots[pos - 1])
            return hmdata.slots[pos - 1];
        return 0;
    };
    HeartMethod.prototype.calcHeartSlotChange = function (roleId, hearId, itemid) {
        var hmdataMap = this.HeartMethodInfo[roleId];
        if (!hmdataMap)
            return 0;
        var hmdata = hmdataMap[hearId];
        if (!hmdata)
            return 0;
        var starConfig = GlobalConfig.HeartMethodStarConfig[itemid];
        if (!starConfig)
            return 0;
        var index = hmdata.slots.indexOf(itemid);
        if (index == -1)
            return 0;
        var pId = this.getSuitPosFromItemId(itemid);
        if (!pId)
            return 0;
        var itemData = UserBag.ins().getBagGoodsByType(ItemType.TYPE_18);
        itemData.sort(this.changeSort);
        for (var k in itemData) {
            if (GlobalConfig.HeartMethodStarConfig[itemData[k].configID].posSort != pId)
                continue;
            if (GlobalConfig.HeartMethodStarConfig[itemData[k].configID].heartmethodId != hearId)
                continue;
            var itemConfig = GlobalConfig.ItemConfig[itemData[k].configID];
            var lv = itemConfig.level ? itemConfig.level : 0;
            var zslv = itemConfig.zsLevel ? itemConfig.zsLevel : 0;
            if (Actor.level < lv || UserZs.ins().lv < zslv)
                continue;
            var hmsConfig = GlobalConfig.HeartMethodStarConfig[itemConfig.id];
            if (hmsConfig.quality > starConfig.quality) {
                return itemConfig.id;
            }
            else if (hmsConfig.quality == starConfig.quality) {
                if (hmsConfig.star > starConfig.star)
                    return itemConfig.id;
            }
        }
        return 0;
    };
    HeartMethod.prototype.changeSort = function (a, b) {
        if (ItemConfig.getQuality(a.itemConfig) > ItemConfig.getQuality(b.itemConfig))
            return -1;
        else {
            var aStar = GlobalConfig.HeartMethodStarConfig[a.configID];
            var bStar = GlobalConfig.HeartMethodStarConfig[b.configID];
            if (aStar.star > bStar.star)
                return -1;
            else
                return 1;
        }
    };
    HeartMethod.prototype.getSuitPosFromItemId = function (itemid) {
        var config = GlobalConfig.HeartMethodStarConfig[itemid];
        if (config)
            return config.posSort;
        return 0;
    };
    HeartMethod.prototype.calcHeartSlotCost = function (itemid) {
        var b = false;
        var config = GlobalConfig.HeartMethodStarConfig[itemid];
        if (!config || !config.nextItem)
            return b;
        var item = UserBag.ins().getBagItemById(config.costItem);
        if (item && item.count >= config.costNum)
            b = true;
        return b;
    };
    HeartMethod.prototype.calcHeartTotalValue = function (roleId, id) {
        var proShowList = this.proShowList;
        var attrvalue = [];
        for (var i = 0; i < proShowList.length; i++) {
            attrvalue.push(0);
        }
        var hmdata = this.HeartMethodInfo[roleId];
        if (!hmdata || !hmdata[id])
            return attrvalue;
        var attrbute = this.calcHeartAttrs(roleId, id);
        for (var i = 0; i < proShowList.length; i++) {
            if (!proShowList[i].filter) {
                for (var j = 0; j < hmdata[id].slots.length; j++) {
                    var itemid = hmdata[id].slots[j];
                    var cfg = GlobalConfig.HeartMethodStarConfig[itemid];
                    if (!cfg)
                        continue;
                    for (var z = 0; z < cfg.attr.length; z++) {
                        if (proShowList[i].id == cfg.attr[z].type) {
                            attrvalue[i] += cfg.attr[z].value;
                        }
                    }
                }
                for (var k = 0; k < attrbute.length; k++) {
                    if (proShowList[i].id == attrbute[k].type) {
                        attrvalue[i] += attrbute[k].value;
                        break;
                    }
                }
            }
            else {
                var skillLv = this.calcHeartSkillLevel(roleId, id);
                if (skillLv) {
                    var hmscfg = GlobalConfig.HeartMethodSuitConfig[id][skillLv];
                    if (hmscfg && proShowList[i].id == hmscfg.attr[0].type) {
                        attrvalue[i] += hmscfg.attr[0].value / 100;
                    }
                }
            }
        }
        return attrvalue;
    };
    HeartMethod.prototype.getHeartSuitCount = function (roleId, id, lv) {
        var hmdata = this.HeartMethodInfo[roleId];
        if (!hmdata || !hmdata[id])
            return 0;
        var count = 0;
        for (var i = 0; i < hmdata[id].slots.length; i++) {
            var itemid = hmdata[id].slots[i];
            if (!itemid)
                continue;
            var config = GlobalConfig.HeartMethodStarConfig[itemid];
            if (config.quality >= lv)
                count++;
        }
        return count;
    };
    HeartMethod.prototype.calcHeartSkillLevel = function (roleId, id) {
        var level = 0;
        var hmdata = this.HeartMethodInfo[roleId];
        if (!hmdata || !hmdata[id])
            return level;
        var minLv;
        for (var i = 0; i < hmdata[id].slots.length; i++) {
            var itemid = hmdata[id].slots[i];
            if (!itemid)
                return 0;
            var config = GlobalConfig.HeartMethodStarConfig[itemid];
            if (config) {
                var quality = config.quality;
                if (!minLv || minLv > quality)
                    minLv = quality;
            }
        }
        if (minLv)
            level = minLv;
        return level;
    };
    HeartMethod.prototype.calcHeartAttrs = function (roleId, heartId) {
        var hminfo = this.HeartMethodInfo[roleId];
        var attrs = [];
        if (!hminfo || !hminfo[heartId] || !hminfo[heartId].id)
            return attrs;
        var hmdata = hminfo[heartId];
        var stagecfg = GlobalConfig.HeartMethodStageConfig[hmdata.id];
        if (stagecfg && stagecfg[hmdata.stage]) {
            var list = stagecfg[hmdata.stage].attr;
            for (var k in list) {
                var att = new AttributeData();
                att.type = list[k].type;
                att.value = list[k].value;
                attrs.push(att);
            }
        }
        var hmlconfig = GlobalConfig.HeartMethodLevelConfig[hmdata.id];
        if (hmlconfig && hmlconfig[hmdata.lv]) {
            var list = hmlconfig[hmdata.lv].attr;
            for (var k in list) {
                var isHave = false;
                for (var i = 0; i < attrs.length; i++) {
                    if (attrs[i].type == list[k].type) {
                        attrs[i].value += list[k].value;
                        isHave = true;
                        break;
                    }
                }
                if (!isHave) {
                    var att = new AttributeData();
                    att.type = list[k].type;
                    att.value = list[k].value;
                    attrs.push(att);
                }
            }
        }
        return attrs;
    };
    HeartMethod.prototype.calcHeartAttrsNext = function (roleId, heartId) {
        var hminfo = this.HeartMethodInfo[roleId];
        var attrs = [];
        if (!hminfo || !hminfo[heartId] || !hminfo[heartId].id)
            return attrs;
        var hmdata = hminfo[heartId];
        var stagecfg = GlobalConfig.HeartMethodStageConfig[hmdata.id];
        var levelcfg = GlobalConfig.HeartMethodLevelConfig[hmdata.id];
        var stageAttrs = [];
        var levelAttrs = [];
        if (hmdata.isUp) {
            if (!stagecfg[hmdata.stage + 1])
                stageAttrs = stagecfg[hmdata.stage].attr;
            else
                stageAttrs = stagecfg[hmdata.stage + 1].attr;
            levelAttrs = levelcfg[hmdata.lv].attr;
        }
        else {
            stageAttrs = stagecfg[hmdata.stage].attr;
            if (!levelcfg[hmdata.lv + 1])
                levelAttrs = levelcfg[hmdata.lv].attr;
            else
                levelAttrs = levelcfg[hmdata.lv + 1].attr;
        }
        if (stageAttrs && stageAttrs.length) {
            var list = stageAttrs;
            for (var k in list) {
                var att = new AttributeData();
                att.type = list[k].type;
                att.value = list[k].value;
                attrs.push(att);
            }
        }
        if (levelAttrs.length) {
            var list = levelAttrs;
            for (var k in list) {
                var isHave = false;
                for (var i = 0; i < attrs.length; i++) {
                    if (attrs[i].type == list[k].type) {
                        attrs[i].value += list[k].value;
                        isHave = true;
                        break;
                    }
                }
                if (!isHave) {
                    var att = new AttributeData();
                    att.type = list[k].type;
                    att.value = list[k].value;
                    attrs.push(att);
                }
            }
        }
        return attrs;
    };
    HeartMethod.prototype.calcHeartCost = function (roleId, heartId) {
        var obj = null;
        var hminfo = this.HeartMethodInfo[roleId];
        if (!hminfo || !hminfo[heartId] || !hminfo[heartId].id || this.isHeartMax(roleId, heartId) || hminfo[heartId].isUp)
            return obj;
        var lvConfig = GlobalConfig.HeartMethodLevelConfig[hminfo[heartId].id][hminfo[heartId].lv + 1];
        if (lvConfig) {
            obj = { itemid: lvConfig.costItem, count: lvConfig.costNum };
        }
        return obj;
    };
    HeartMethod.prototype.isHeartMax = function (roleId, heartId) {
        var hminfo = this.HeartMethodInfo[roleId];
        if (!hminfo || !hminfo[heartId] || !hminfo[heartId].id)
            return false;
        var cfg = GlobalConfig.HeartMethodLevelConfig[hminfo[heartId].id][hminfo[heartId].lv + 1];
        return !cfg ? true : false;
    };
    HeartMethod.prototype.getAttrStrByType = function (type) {
        var str = "";
        for (var i in this.proShowList) {
            if (this.proShowList[i].id == type) {
                str = this.proShowList[i].name;
                break;
            }
        }
        return str;
    };
    HeartMethod.prototype.sendHeartUpLevel = function (roleId, id, pos) {
        var bytes = this.getBytes(3);
        bytes.writeByte(roleId);
        bytes.writeShort(id);
        bytes.writeShort(pos);
        this.sendToServer(bytes);
    };
    HeartMethod.prototype.sendHeartChange = function (roleId, id, pos, itemid) {
        var bytes = this.getBytes(4);
        bytes.writeByte(roleId);
        bytes.writeShort(id);
        bytes.writeShort(pos);
        bytes.writeInt(itemid);
        this.sendToServer(bytes);
    };
    HeartMethod.prototype.sendOneKeyDecompose = function (heartId, uidList) {
        var len = uidList.length;
        var bytes = this.getBytes(5);
        bytes.writeShort(heartId);
        bytes.writeInt(len);
        for (var i = 0; i < len; i++) {
            bytes.writeInt(uidList[i].configID);
        }
        this.sendToServer(bytes);
    };
    HeartMethod.prototype.postHeartInfo = function (bytes) {
        var len = bytes.readByte();
        for (var i = 0; i < len; i++) {
            var roleId = bytes.readByte();
            if (!this.HeartMethodInfo[roleId])
                this.HeartMethodInfo[roleId] = {};
            var sum = bytes.readShort();
            for (var j = 0; j < sum; j++) {
                var id = bytes.readShort();
                var lv = bytes.readShort();
                var isUp = bytes.readByte();
                var slots = bytes.readShort();
                var hminfo = new HearMethodData();
                hminfo.id = id;
                hminfo.lv = lv;
                hminfo.stage = isUp;
                for (var z = 0; z < slots; z++) {
                    var itemid = bytes.readInt();
                    hminfo.slots.push(itemid);
                }
                this.HeartMethodInfo[roleId][id] = hminfo;
            }
        }
    };
    HeartMethod.prototype.postHeartUpLevel = function (bytes) {
        var roleId = bytes.readUnsignedByte();
        if (!this.HeartMethodInfo[roleId])
            this.HeartMethodInfo[roleId] = {};
        var id = bytes.readShort();
        var hminfo;
        if (!this.HeartMethodInfo[roleId][id]) {
            hminfo = new HearMethodData();
            hminfo.id = id;
        }
        else {
            hminfo = this.HeartMethodInfo[roleId][id];
        }
        var lv = bytes.readShort();
        hminfo.lv = lv;
        var isUp = bytes.readByte();
        hminfo.stage = isUp;
        var slots = bytes.readShort();
        hminfo.slots = [];
        for (var z = 0; z < slots; z++) {
            var itemid = bytes.readInt();
            hminfo.slots.push(itemid);
        }
        this.HeartMethodInfo[roleId][id] = hminfo;
    };
    HeartMethod.prototype.postOneKeyDecompose = function (bytes) {
        var isSuccess = bytes.readByte();
        var heardId = 0;
        var len = 0;
        if (isSuccess) {
            heardId = bytes.readShort();
            len = bytes.readShort();
        }
        return [isSuccess, heardId, len];
    };
    return HeartMethod;
}(BaseSystem));
__reflect(HeartMethod.prototype, "HeartMethod");
var HearMethodData = (function () {
    function HearMethodData() {
        this.id = 0;
        this.lv = 0;
        this.stage = 0;
        this.slots = [];
    }
    Object.defineProperty(HearMethodData.prototype, "stage", {
        get: function () {
            if (this.isUp) {
                return Math.floor(this.lv / 10);
            }
            else {
                return Math.floor(this.lv / 10) + 1;
            }
        },
        set: function (isUp) {
            this.isUp = isUp;
        },
        enumerable: true,
        configurable: true
    });
    return HearMethodData;
}());
__reflect(HearMethodData.prototype, "HearMethodData");
var HeartTypeData = (function () {
    function HeartTypeData() {
    }
    return HeartTypeData;
}());
__reflect(HeartTypeData.prototype, "HeartTypeData");
var GameSystem;
(function (GameSystem) {
    GameSystem.heartmethod = HeartMethod.ins.bind(HeartMethod);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=HeartMethod.js.map