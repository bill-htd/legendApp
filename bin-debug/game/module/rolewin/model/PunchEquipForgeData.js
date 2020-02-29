var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PunchEquipForgeData = (function () {
    function PunchEquipForgeData() {
        this.data = [];
    }
    PunchEquipForgeData.prototype.parser = function (bytes) {
        var len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            var pos = bytes.readShort();
            var lv = bytes.readInt();
            if (!this.data[pos]) {
                var d = new PunchEquipData;
                d.id = pos;
                d.level = lv;
                this.data[pos] = d;
            }
            else {
                this.data[pos].id = pos;
                this.data[pos].level = lv;
            }
        }
    };
    Object.defineProperty(PunchEquipForgeData.prototype, "level", {
        get: function () {
            var level = 0;
            for (var i = 0; i < this.data.length; i++) {
                var punch = this.data[i];
                level += punch.level;
            }
            return level;
        },
        enumerable: true,
        configurable: true
    });
    PunchEquipForgeData.prototype.getSuitlevel = function () {
        var lv = 0;
        for (var k in GlobalConfig.PunchEquipMasterConfig) {
            var cfg = GlobalConfig.PunchEquipMasterConfig[k];
            if (Math.floor(this.level / 8) >= cfg.level)
                lv = cfg.level;
        }
        return lv;
    };
    PunchEquipForgeData.prototype.getNextSuitlevel = function () {
        var lv = 0;
        for (var k in GlobalConfig.PunchEquipMasterConfig) {
            var cfg = GlobalConfig.PunchEquipMasterConfig[k];
            if (cfg.level > Math.floor(this.level / 8)) {
                lv = cfg.level;
                break;
            }
        }
        return lv;
    };
    PunchEquipForgeData.prototype.getPunchLevel = function (pos) {
        return this.data[pos].level;
    };
    PunchEquipForgeData.prototype.getCurCost = function () {
        var startPos;
        var minLv;
        var isRound = true;
        for (var i = 0; i < 8; i++) {
            var punch = this.data[i];
            if (!i) {
                startPos = i;
                minLv = punch.level;
                continue;
            }
            if (minLv < punch.level) {
                isRound = false;
                startPos = i;
                minLv = punch.level;
            }
        }
        if (isRound) {
            startPos = 0;
            minLv++;
        }
        return GlobalConfig.PunchEquipConfig[startPos][minLv];
    };
    PunchEquipForgeData.prototype.getNextConfig = function (pos) {
        var slot = pos + 1;
        var lv = this.getPunchLevel(pos);
        if (slot > 7) {
            slot = 0;
            lv = this.getPunchLevel(slot) + 1;
        }
        return GlobalConfig.PunchEquipConfig[slot][lv];
    };
    PunchEquipForgeData.prototype.getPosNextLevelConfig = function (pos) {
        var lv = this.getPunchLevel(pos);
        lv++;
        return GlobalConfig.PunchEquipConfig[pos][lv];
    };
    PunchEquipForgeData.prototype.isShowPunchEquipForge = function () {
        var list = UserSkill.ins().equipListData;
        for (var i = 0; i < list.length; i++) {
            var items = list[i];
            if (!items.itemConfig || !items.itemConfig.zsLevel || items.itemConfig.zsLevel < 4)
                return false;
        }
        return true;
    };
    PunchEquipForgeData.prototype.isUpgradePunchForge = function (pos) {
        var lv = 1;
        if (this.data[pos]) {
            lv = this.data[pos].level;
        }
        if (!GlobalConfig.PunchEquipConfig[pos][lv + 1])
            return PunchEquipForgeData.TYPE_MAX;
        if (!lv)
            lv = 1;
        var cfg = GlobalConfig.PunchEquipConfig[pos][lv + 1];
        var count = 0;
        if (cfg.cost.id == MoneyConst.punch1) {
            count = Actor.togeatter1;
        }
        else if (cfg.cost.id == MoneyConst.punch2) {
            count = Actor.togeatter2;
        }
        if (count >= cfg.cost.count) {
            return PunchEquipForgeData.TYPE_OK;
        }
        return PunchEquipForgeData.TYPE_NO;
    };
    PunchEquipForgeData.prototype.calcSelectPos = function () {
        var startPos;
        var minLv;
        var isRound = true;
        for (var i = 0; i < 8; i++) {
            if (!this.data[i])
                continue;
            var punch = this.data[i];
            if (!i) {
                startPos = i;
                minLv = punch.level;
                continue;
            }
            if (minLv > punch.level) {
                isRound = false;
                startPos = i;
                minLv = punch.level;
            }
        }
        if (isRound) {
            startPos = 0;
            minLv++;
        }
        return startPos;
    };
    PunchEquipForgeData.prototype.getRedPoint = function () {
        if (!this.isShowPunchEquipForge())
            return false;
        var fullCount = 0;
        var max = 8;
        for (var i = 0; i < max; i++) {
            var b = this.isUpgradePunchForge(i);
            if (b == PunchEquipForgeData.TYPE_NO)
                return false;
            else if (b == PunchEquipForgeData.TYPE_MAX) {
                fullCount++;
            }
        }
        if (fullCount == max)
            return false;
        return true;
    };
    PunchEquipForgeData.prototype.getAttributeData = function () {
        var attrs = [];
        for (var i = 0; i < this.data.length; i++) {
            var pos = this.data[i].id;
            var lv = this.data[i].level;
            var config = GlobalConfig.PunchEquipConfig[pos][lv];
            if (config) {
                for (var j = 0; j < config.attr.length; j++) {
                    if (!attrs.length) {
                        var at = new AttributeData;
                        at.type = config.attr[j].type;
                        at.value = config.attr[j].value;
                        attrs.push(at);
                    }
                    else {
                        var ishave = false;
                        for (var k = 0; k < attrs.length; k++) {
                            if (attrs[k].type == config.attr[j].type) {
                                ishave = true;
                                attrs[k].value += config.attr[j].value;
                            }
                        }
                        if (!ishave) {
                            var at = new AttributeData;
                            at.type = config.attr[j].type;
                            at.value = config.attr[j].value;
                            attrs.push(at);
                        }
                    }
                }
            }
        }
        return attrs;
    };
    PunchEquipForgeData.TYPE_NO = 0;
    PunchEquipForgeData.TYPE_OK = 1;
    PunchEquipForgeData.TYPE_MAX = 2;
    return PunchEquipForgeData;
}());
__reflect(PunchEquipForgeData.prototype, "PunchEquipForgeData");
var PunchEquipData = (function () {
    function PunchEquipData() {
    }
    return PunchEquipData;
}());
__reflect(PunchEquipData.prototype, "PunchEquipData");
//# sourceMappingURL=PunchEquipForgeData.js.map