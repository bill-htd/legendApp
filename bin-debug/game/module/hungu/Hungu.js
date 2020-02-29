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
var Hungu = (function (_super) {
    __extends(Hungu, _super);
    function Hungu() {
        var _this = _super.call(this) || this;
        _this.hunShouFBTimes = 0;
        _this.hunShouFBPassID = 0;
        _this.sysId = PackageID.Hungu;
        _this.regNetMsg(1, _this.postHunguInfo);
        _this.regNetMsg(2, _this.postHunguItems);
        _this.regNetMsg(3, _this.postHunyu);
        _this.regNetMsg(4, _this.postHunguItemUpgrade);
        _this.regNetMsg(6, _this.postSweepHunShouFB);
        _this.regNetMsg(7, _this.postHunShouFBInfo);
        _this.regNetMsg(8, _this.postHunShouFBEndTime);
        return _this;
    }
    Hungu.ins = function () {
        return _super.ins.call(this);
    };
    Object.defineProperty(Hungu.prototype, "hunguData", {
        get: function () {
            if (!this._hunguData)
                this._hunguData = [];
            return this._hunguData;
        },
        enumerable: true,
        configurable: true
    });
    Hungu.prototype.checkOpen = function () {
        if (GameServer.serverOpenDay < (GlobalConfig.HunGuConf.openserverday - 1)) {
            return false;
        }
        if (UserZs.ins().lv < GlobalConfig.HunGuConf.openzhuanshenglv) {
            return false;
        }
        return true;
    };
    Hungu.prototype.checkShowOpen = function () {
        if (GameServer.serverOpenDay < (GlobalConfig.HunGuConf.openserverday - 1)) {
            return false;
        }
        if (UserZs.ins().lv < GlobalConfig.HunGuConf.showzhuanshenglv) {
            return false;
        }
        return true;
    };
    Hungu.prototype.getHunguItemsPos = function (itemid) {
        var pos = -1;
        var config = GlobalConfig.ItemConfig[itemid];
        if (config) {
            pos = ItemConfig.getSubType(config);
        }
        return pos;
    };
    Hungu.prototype.getHunguItemsList = function (pos) {
        var items = [];
        var TotalItems = UserBag.ins().getBagGoodsByType(ItemType.TYPE_24);
        for (var i = 0; i < TotalItems.length; i++) {
            if (this.getHunguItemsPos(TotalItems[i].itemConfig.id) == pos)
                items.push(TotalItems[i]);
        }
        items.sort(function (a, b) {
            var aconfig = GlobalConfig.HunGuEquip[a.configID];
            var bconfig = GlobalConfig.HunGuEquip[b.configID];
            if (aconfig.stage > bconfig.stage)
                return -1;
            else
                return 1;
        });
        return items;
    };
    Hungu.prototype.getHunyuRedPoint = function (roleId, pos) {
        if (!this.hunguData[roleId])
            return false;
        for (var i = 0; i < this.hunguData[roleId].items[pos].hunyu.length; i++) {
            var b = this.getHunyuKongRedPoint(roleId, pos, i);
            if (b)
                return true;
        }
        return false;
    };
    Hungu.prototype.getHunyuKongRedPoint = function (roleId, pos, hyPos) {
        if (!this.hunguData[roleId])
            return false;
        if (!this.hunguData[roleId].items[pos].itemId || hyPos + 1 > GlobalConfig.HunGuEquip[this.hunguData[roleId].items[pos].itemId].hunyuNum)
            return false;
        var hyType = GlobalConfig.HunGuConf.hunyuType[pos][hyPos];
        var level = this.hunguData[roleId].items[pos].hunyu[hyPos];
        var hyequip = GlobalConfig.HunYuEquip[hyType][level + 1];
        if (!hyequip)
            return false;
        if (!hyequip.cost) {
            var costYb = GlobalConfig.HunGuConf.unlockCost[hyPos + 1];
            if (Actor.yb >= costYb)
                return true;
        }
        else {
            var itemData = UserBag.ins().getBagItemById(hyequip.cost.id);
            if (itemData && itemData.count >= hyequip.cost.count)
                return true;
        }
        return false;
    };
    Hungu.prototype.getHunguPosHyPower = function (roleId, pos) {
        var power = 0;
        if (!this.hunguData[roleId] || !this.hunguData[roleId].items[pos].itemId)
            return power;
        var hgequip = GlobalConfig.HunGuEquip[this.hunguData[roleId].items[pos].itemId];
        if (!hgequip)
            return power;
        var kong = hgequip.hunyuNum;
        for (var i = 0; i < kong; i++) {
            var hyType = GlobalConfig.HunGuConf.hunyuType[pos][i];
            var lv = this.hunguData[roleId].items[pos].hunyu[i];
            var hyequip = GlobalConfig.HunYuEquip[hyType][lv];
            if (hyequip) {
                power += UserBag.getAttrPower(hyequip.attrs, SubRoles.ins().getSubRoleByIndex(roleId));
                var expower = hyequip.expower ? hyequip.expower : 0;
                power += expower;
            }
        }
        return power;
    };
    Hungu.prototype.getHunguItemPower = function (itemId) {
        var power = 0;
        var hgequip = GlobalConfig.HunGuEquip[itemId];
        if (hgequip) {
            power += UserBag.getAttrPower(hgequip.attrs);
            var expower = hgequip.expower ? hgequip.expower : 0;
            power += expower;
        }
        return power;
    };
    Hungu.prototype.getHunguPosPower = function (roleId, pos, suit, hy) {
        var power = 0;
        if (!this.hunguData[roleId])
            return power;
        var hypower = 0;
        if (hy) {
            hypower += this.getHunguPosHyPower(roleId, pos);
        }
        var jcattrs = [];
        var itemId = this.hunguData[roleId].items[pos].itemId;
        var hgequip = GlobalConfig.HunGuEquip[itemId];
        if (hgequip) {
            power += UserBag.getAttrPower(hgequip.attrs, SubRoles.ins().getSubRoleByIndex(roleId));
            var expower = hgequip.expower ? hgequip.expower : 0;
            power += expower;
            if (suit) {
                for (var j = 0; j < hgequip.attrs.length; j++) {
                    var ishave = false;
                    for (var z = 0; z < jcattrs.length; z++) {
                        if (jcattrs[z].type == hgequip.attrs[j].type) {
                            jcattrs[z].value += hgequip.attrs[j].value;
                            ishave = true;
                            break;
                        }
                    }
                    if (!ishave) {
                        jcattrs.push(new AttributeData(hgequip.attrs[j].type, hgequip.attrs[j].value));
                    }
                }
            }
        }
        var jcattrsEx = [];
        if (suit) {
            var percent = [];
            for (var i in suit) {
                for (var j in suit[i]) {
                    if (suit[i][j].count.length >= (+j)) {
                        var stage = suit[i][j].stage;
                        var hgsuit = GlobalConfig.HunGuSuit[i][j][stage];
                        if (hgsuit && hgsuit.specialAttrs) {
                            percent.push(hgsuit.specialAttrs / 10000);
                        }
                    }
                }
            }
            if (!percent.length)
                percent.push(0);
            for (var i = 0; i < percent.length; i++) {
                for (var j = 0; j < jcattrs.length; j++) {
                    if (!jcattrsEx[j])
                        jcattrsEx[j] = new AttributeData(jcattrs[j].type, 0);
                    jcattrsEx[j].value += jcattrs[j].value * percent[i];
                }
            }
        }
        power += hypower + UserBag.getAttrPower(jcattrsEx);
        return power;
    };
    Hungu.prototype.getResonancePower = function (roleId) {
        var power = 0;
        if (!this.hunguData[roleId])
            return power;
        var suit = this.getSuitData(roleId);
        for (var i in suit) {
            for (var j in suit[i]) {
                var stage = suit[i][j].stage;
                if (!stage)
                    continue;
                var count = suit[i][j].count;
                if (count.length < (+j))
                    continue;
                var hgsuit = GlobalConfig.HunGuSuit[i][j][stage];
                if (hgsuit.attrs)
                    power += UserBag.getAttrPower(hgsuit.attrs, SubRoles.ins().getSubRoleByIndex(roleId));
                var expower = hgsuit.expower ? hgsuit.expower : 0;
                power += expower;
            }
        }
        return power;
    };
    Hungu.prototype.getSuitData = function (roleId) {
        var suit = {};
        if (!this.hunguData[roleId])
            return suit;
        var posItemGroup = [];
        for (var k in GlobalConfig.HunGuConf.suit) {
            if (!GlobalConfig.HunGuSuit[k])
                continue;
            posItemGroup[+k] = [];
            for (var i in GlobalConfig.HunGuConf.suit[k]) {
                var iPos = GlobalConfig.HunGuConf.suit[k][i];
                var itemId = this.hunguData[roleId].items[iPos].itemId;
                if (itemId) {
                    posItemGroup[+k].push(GlobalConfig.HunGuEquip[itemId]);
                }
            }
            posItemGroup[+k].sort(function (a, b) {
                if (a.stage > b.stage)
                    return -1;
                else
                    return 1;
            });
        }
        for (var i in GlobalConfig.HunGuSuit) {
            suit[i] = {};
            for (var j in GlobalConfig.HunGuSuit[i]) {
                suit[i][j] = {};
                suit[i][j].count = [];
                suit[i][j].stage = 0;
                for (var z = 0; z < (+j); z++) {
                    if (!posItemGroup[+i][z])
                        break;
                    suit[i][j].count.push(posItemGroup[+i][z].id);
                    if (!suit[i][j].stage)
                        suit[i][j].stage = posItemGroup[+i][z].stage;
                    if (suit[i][j].stage > posItemGroup[+i][z].stage)
                        suit[i][j].stage = posItemGroup[+i][z].stage;
                }
            }
        }
        return suit;
    };
    Hungu.prototype.getHunguPosName = function (pos) {
        return GlobalConfig.HunGuConf.hunguName[pos];
    };
    Hungu.prototype.getHunguItemQualityName = function (itemId, stage) {
        var str = "";
        var quality = stage;
        if (!quality) {
            if (!GlobalConfig.HunGuEquip[itemId])
                quality = 1;
            else
                quality = GlobalConfig.HunGuEquip[itemId].stage;
        }
        switch (quality) {
            case 1:
                str = "凡品";
                break;
            case 2:
                str = "中品";
                break;
            case 3:
                str = "上品";
                break;
            case 4:
                str = "极品";
                break;
            case 5:
                str = "神品";
                break;
        }
        return str;
    };
    Hungu.prototype.calcHunguTotalValue = function (roleId) {
        var attrs = [];
        var hunguData = this.hunguData[roleId];
        if (!hunguData)
            return attrs;
        var jcattrs = [];
        for (var i = 0; i < hunguData.items.length; i++) {
            var itemId = hunguData.items[i].itemId;
            var hgequip = GlobalConfig.HunGuEquip[itemId];
            if (!hgequip)
                continue;
            for (var j = 0; j < hgequip.attrs.length; j++) {
                var ishave = false;
                for (var z = 0; z < jcattrs.length; z++) {
                    if (jcattrs[z].type == hgequip.attrs[j].type) {
                        jcattrs[z].value += hgequip.attrs[j].value;
                        ishave = true;
                        break;
                    }
                }
                if (!ishave) {
                    jcattrs.push(new AttributeData(hgequip.attrs[j].type, hgequip.attrs[j].value));
                }
            }
            for (var j = 0; j < hunguData.items[i].hunyu.length; j++) {
                if (hunguData.items[i].hunyu[j]) {
                    var hunyuType = GlobalConfig.HunGuConf.hunyuType[i][j];
                    var level = hunguData.items[i].hunyu[j];
                    var hyequip = GlobalConfig.HunYuEquip[hunyuType][level];
                    for (var k = 0; k < hyequip.attrs.length; k++) {
                        var ishave = false;
                        for (var z = 0; z < attrs.length; z++) {
                            if (attrs[z].type == hyequip.attrs[k].type) {
                                attrs[z].value += hyequip.attrs[k].value;
                                ishave = true;
                                break;
                            }
                        }
                        if (!ishave) {
                            attrs.push(new AttributeData(hyequip.attrs[k].type, hyequip.attrs[k].value));
                        }
                    }
                }
            }
        }
        var suit = this.getSuitData(roleId);
        var percent = [];
        for (var i in suit) {
            for (var j in suit[i]) {
                if (suit[i][j].count.length >= (+j)) {
                    var stage = suit[i][j].stage;
                    var hgsuit = GlobalConfig.HunGuSuit[i][j][stage];
                    if (hgsuit && hgsuit.attrs) {
                        for (var k = 0; k < hgsuit.attrs.length; k++) {
                            var ishave = false;
                            for (var z = 0; z < attrs.length; z++) {
                                if (attrs[z].type == hgsuit.attrs[k].type) {
                                    attrs[z].value += hgsuit.attrs[k].value;
                                    ishave = true;
                                    break;
                                }
                            }
                            if (!ishave) {
                                attrs.push(new AttributeData(hgsuit.attrs[k].type, hgsuit.attrs[k].value));
                            }
                        }
                    }
                    if (hgsuit && hgsuit.specialAttrs) {
                        percent.push(hgsuit.specialAttrs / 10000);
                    }
                }
            }
        }
        for (var i = 0; i < percent.length; i++) {
            for (var j = 0; j < jcattrs.length; j++) {
                jcattrs[j].value *= (1 + percent[i]);
            }
        }
        for (var k = 0; k < jcattrs.length; k++) {
            var ishave = false;
            for (var z = 0; z < attrs.length; z++) {
                if (attrs[z].type == jcattrs[k].type) {
                    attrs[z].value += jcattrs[k].value;
                    attrs[z].value = Math.floor(attrs[z].value);
                    ishave = true;
                    break;
                }
            }
            if (!ishave) {
                attrs.push(new AttributeData(jcattrs[k].type, Math.floor(jcattrs[k].value)));
            }
        }
        return attrs;
    };
    Hungu.prototype.getAttrStrByType = function (type) {
        var str = "";
        switch (type) {
            case AttributeType.atMaxHp:
                str = "\u751F       \u547D";
                break;
            case AttributeType.atAttack:
                str = "\u653B       \u51FB";
                break;
            case AttributeType.atDef:
                str = "\u7269       \u9632";
                break;
            case AttributeType.atRes:
                str = "\u9B54       \u9632";
                break;
        }
        return str;
    };
    Hungu.prototype.getCurHunguId = function (roleId, pos) {
        var ins = Hungu.ins();
        var hgData = ins.hunguData[roleId];
        if (!hgData)
            return 0;
        var hgItem = hgData.items[pos];
        if (!hgItem)
            return 0;
        return hgItem.itemId;
    };
    Hungu.prototype.getNextHunguId = function (roleId, pos) {
        var ins = Hungu.ins();
        var hgData = ins.hunguData[roleId];
        if (!hgData)
            return 0;
        var hgItem = hgData.items[pos];
        if (!hgItem)
            return 0;
        return GlobalConfig.HunGuEquip[hgItem.itemId].nextId;
    };
    Hungu.prototype.getNextHunyuLvConfig = function (roleId, pos, kong) {
        if (!this.hunguData[roleId])
            return null;
        var hyType = GlobalConfig.HunGuConf.hunyuType[pos][kong];
        var lv = this.hunguData[roleId].items[pos].hunyu[kong];
        return GlobalConfig.HunYuEquip[hyType][lv + 1];
    };
    Hungu.prototype.getUpgradeRedPoint = function (itemId) {
        var hgequip = GlobalConfig.HunGuEquip[itemId];
        if (!hgequip || !hgequip.addStageCost)
            return false;
        var ins = UserBag.ins();
        for (var i in hgequip.addStageCost) {
            var itemData = ins.getBagItemById(hgequip.addStageCost[i].id);
            if (!itemData || itemData.count < hgequip.addStageCost[i].count)
                return false;
        }
        return true;
    };
    Hungu.prototype.sendHunguItems = function (roleId, pos, itemId) {
        var bytes = this.getBytes(2);
        bytes.writeByte(roleId);
        bytes.writeByte(pos);
        bytes.writeInt(itemId);
        this.sendToServer(bytes);
    };
    Hungu.prototype.sendHunyu = function (roleId, pos, hypos) {
        var bytes = this.getBytes(3);
        bytes.writeByte(roleId);
        bytes.writeByte(pos);
        bytes.writeByte(hypos);
        this.sendToServer(bytes);
    };
    Hungu.prototype.sendHunguItemUpgrade = function (roleId, pos) {
        var bytes = this.getBytes(4);
        bytes.writeByte(roleId);
        bytes.writeByte(pos);
        this.sendToServer(bytes);
    };
    Hungu.prototype.postHunguInfo = function (bytes) {
        var roleSum = bytes.readByte();
        for (var i = 0; i < roleSum; i++) {
            var roleId = bytes.readByte();
            var len = bytes.readByte();
            var hgd = void 0;
            if (this.hunguData[roleId])
                hgd = this.hunguData[roleId];
            else
                hgd = new HunguData();
            for (var j = 0; j < len; j++) {
                hgd.items[j].itemId = bytes.readInt();
                var hys = bytes.readByte();
                for (var z = 0; z < hys; z++) {
                    hgd.items[j].hunyu[z] = bytes.readInt();
                }
            }
            this.hunguData[roleId] = hgd;
        }
    };
    Hungu.prototype.postHunguItems = function (bytes) {
        var roleId = bytes.readByte();
        var pos = bytes.readByte();
        var itemId = bytes.readInt();
        if (!this.hunguData[roleId])
            this.hunguData[roleId] = new HunguData();
        var hunguData = this.hunguData[roleId];
        var olditemId = hunguData.items[pos].itemId;
        if (hunguData)
            hunguData.items[pos].itemId = itemId;
        if (olditemId == 0 && itemId != 0) {
            this.postNothing2Wear(1, pos);
        }
        if (itemId == 0 && olditemId != 0) {
            this.postWear2Noting(0, pos);
        }
    };
    Hungu.prototype.postNothing2Wear = function (control, pos) {
        return [control, pos];
    };
    Hungu.prototype.postWear2Noting = function (control, pos) {
        return [control, pos];
    };
    Hungu.prototype.postHunyu = function (bytes) {
        var roleId = bytes.readByte();
        var pos = bytes.readByte();
        var hypos = bytes.readByte();
        var level = bytes.readInt();
        if (this.hunguData[roleId])
            this.hunguData[roleId].items[pos].hunyu[hypos - 1] = level;
    };
    Hungu.prototype.postHunguItemUpgrade = function (bytes) {
        var roleId = bytes.readByte();
        var pos = bytes.readByte();
        var itemId = bytes.readInt();
        if (this.hunguData[roleId])
            this.hunguData[roleId].items[pos].itemId = itemId;
        this.postNothing2Wear(1, pos);
    };
    Hungu.prototype.enterHunShouFB = function () {
        this.sendBaseProto(5);
    };
    Hungu.prototype.sweepHunShouFB = function () {
        this.sendBaseProto(6);
    };
    Hungu.prototype.postSweepHunShouFB = function (bytes) {
        var id = bytes.readInt();
        this.hunShouFBTimes = bytes.readInt();
        var len = bytes.readInt();
        var rewards = [];
        var reward;
        for (var i = 0; i < len; i++) {
            reward = new RewardData();
            reward.type = bytes.readInt();
            reward.id = bytes.readInt();
            reward.count = bytes.readInt();
            rewards.push(reward);
        }
        ViewManager.ins().open(HunShouSweepWin, id, rewards);
    };
    Hungu.prototype.postHunShouFBInfo = function (bytes) {
        this.hunShouFBPassID = bytes.readInt();
        this.hunShouFBTimes = GlobalConfig.HunGuConf.dayRewardCount - bytes.readInt();
    };
    Hungu.prototype.postHunShouFBEndTime = function (bytes) {
        this._hunShouFBEndTime = bytes.readInt();
    };
    Hungu.prototype.getHunShouFbLeftTime = function () {
        return Math.floor((this._hunShouFBEndTime * 1000 + DateUtils.SECOND_2010 * 1000 - GameServer.serverTime) / 1000);
    };
    Hungu.prototype.isHunShouFBOpen = function () {
        return UserZs.ins().lv >= GlobalConfig.HunGuConf.needZsLv && (GameServer.serverOpenDay + 1) >= GlobalConfig.HunGuConf.fbOpenDay;
    };
    Hungu.prototype.showHunShouFB = function () {
        return UserZs.ins().lv >= GlobalConfig.HunGuConf.showZsLv && (GameServer.serverOpenDay + 1) >= GlobalConfig.HunGuConf.fbOpenDay;
    };
    Hungu.prototype.showHunShouRed = function () {
        if (!this.isHunShouFBOpen())
            return false;
        return this.hunShouFBTimes > 0;
    };
    return Hungu;
}(BaseSystem));
__reflect(Hungu.prototype, "Hungu");
var GameSystem;
(function (GameSystem) {
    GameSystem.hungu = Hungu.ins.bind(Hungu);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=Hungu.js.map