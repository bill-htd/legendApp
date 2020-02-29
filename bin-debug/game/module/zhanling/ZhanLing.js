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
var ZhanLing = (function (_super) {
    __extends(ZhanLing, _super);
    function ZhanLing() {
        var _this = _super.call(this) || this;
        _this.sysId = PackageID.WarSpirit;
        _this.regNetMsg(1, _this.postZhanLingInfo);
        _this.regNetMsg(2, _this.postZhanLingUpExp);
        _this.regNetMsg(3, _this.postZhanLingDrug);
        _this.regNetMsg(4, _this.postZhanLingWear);
        _this.regNetMsg(6, _this.postZhanLingComposeItem);
        _this.regNetMsg(7, _this.postZhanLingBubble);
        _this.regNetMsg(8, _this.doZhanLingSkill);
        _this.regNetMsg(11, _this.postZhanLingSkinUpGrade);
        _this.regNetMsg(12, _this.postZhangLingSkinChange);
        _this.observe(UserZs.ins().postZsLv, _this.initZhanLing);
        _this.observe(UserBag.ins().postItemAdd, ZhanLingModel.ins().updateShowZLlist);
        _this.observe(UserBag.ins().postItemDel, ZhanLingModel.ins().updateShowZLlist);
        _this.observe(UserBag.ins().postItemCountChange, ZhanLingModel.ins().updateShowZLlist);
        return _this;
    }
    ZhanLing.ins = function () {
        return _super.ins.call(this);
    };
    ZhanLing.prototype.initLogin = function () {
        ZhanLingModel.ins().updateShowZLlist();
    };
    ZhanLing.prototype.initZero = function () {
        if (!ZhanLingModel.ins().getZhanLingDataById(0) && ZhanLingModel.ins().ZhanLingOpen()) {
            ZhanLingModel.ins().setZhanLingData(new ZhanLingData());
        }
    };
    ZhanLing.prototype.initZhanLing = function () {
        if (!ZhanLingModel.ins().getZhanLingDataById(0) && ZhanLingModel.ins().ZhanLingOpen()) {
            ZhanLingModel.ins().setZhanLingData(new ZhanLingData());
        }
    };
    ZhanLing.prototype.checkRedPoint = function () {
        if (!ZhanLingModel.ins().ZhanLingOpen())
            return false;
        var id = 0;
        var b = ZhanLingModel.ins().isUpGradeByStar(id) || ZhanLingModel.ins().isHintNum(id);
        if (b)
            return true;
        b = ZhanLingModel.ins().isUpGradeByTalent(id);
        if (b)
            return true;
        var zllconfig = GlobalConfig.ZhanLingConfig;
        for (var k in zllconfig.upgradeInfo) {
            b = ZhanLingModel.ins().getZhanLingDataByDrugUse(id, Number(k));
            if (b)
                return true;
        }
        for (var i = 0; i < ZhanLingModel.ins().showZLlist.length; i++) {
            var zlBase = ZhanLingModel.ins().showZLlist[i];
            id = zlBase.id;
            if (id) {
                b = ZhanLingModel.ins().isUpGradeByStar(id) || ZhanLingModel.ins().isHintNum(id);
                ;
                if (b)
                    return true;
                b = ZhanLingModel.ins().isUpGradeByTalent(id);
                if (b)
                    return true;
            }
        }
        id = 0;
        b = ZhanLingModel.ins().getZhanLingItemRedPoint(id);
        if (b)
            return true;
        return false;
    };
    ZhanLing.prototype.ZhanLingItemTips = function (id, zlId, body) {
        if (zlId === void 0) { zlId = 0; }
        if (body === void 0) { body = false; }
        var itemid = id;
        var itemConfig = GlobalConfig.ItemConfig[itemid];
        var have = body ? 1 : 0;
        var power = ZhanLingModel.ins().getZhanLingItemPower(itemid, have);
        var score = power;
        var condition = itemConfig.level ? itemConfig.level + "\u7EA7" : "无级别";
        var config = GlobalConfig.ZhanLingEquip[itemid];
        var desc = {
            left: "\u90E8\u4F4D:\n\u7B49\u7EA7:",
            right: GlobalConfig.ZhanLingConfig.zlEquipName[config.pos - 1] + "\n" + condition
        };
        var attrs = [];
        attrs.push({ title: "基础属性:", attr: config.attrs });
        var suitdesc = "";
        var exdesc = "";
        var suitLv = GlobalConfig.ZhanLingEquip[itemid].level;
        suitLv = suitLv ? suitLv : 1;
        var suitConfig = GlobalConfig.ZhanLingSuit[suitLv];
        var color = 0x00ff00;
        var zlData = ZhanLingModel.ins().getZhanLingDataById(zlId);
        var titile2 = "";
        var colorName = 0xff00ff;
        var colorValue = 0xff00ff;
        var curSum = 0;
        var itemNames = "";
        for (var i = 0; i < GlobalConfig.ZhanLingConfig.equipPosCount; i++) {
            var icolor = 0x00ff00;
            var equip = zlData ? GlobalConfig.ZhanLingEquip[zlData.items[i]] : null;
            if (!zlData || !zlData.items[i] || !equip || equip.level < suitLv) {
                icolor = color = 0xff0000;
                colorName = colorValue = 0x666666;
            }
            else {
                curSum++;
            }
            if (!body) {
                if ((i + 1) == GlobalConfig.ZhanLingEquip[itemid].pos)
                    icolor = 0x00ff00;
            }
            var iname = "|C:" + icolor + "&T:" + GlobalConfig.ZhanLingConfig.zlEquipName[i];
            if (i + 1 < GlobalConfig.ZhanLingConfig.equipPosCount)
                iname += "|C:" + icolor + "&T:\u3001";
            itemNames += iname;
        }
        if (!body) {
            curSum = 1;
        }
        exdesc = "战灵基础属性增加+" + suitConfig.precent / 100 + "%";
        titile2 = "|C:" + color + "&T:(" + curSum + "/" + GlobalConfig.ZhanLingConfig.equipPosCount + ")";
        suitdesc = itemNames;
        attrs.push({ title: "|C:0xff00ff&T:" + suitConfig.suitWithName + "|" + titile2, attr: suitConfig.attrs, colorName: colorName, colorValue: colorValue, others: { suitdesc: suitdesc, exdesc: exdesc } });
        ViewManager.ins().open(EquipTipsBase, UserBag.BAG_TYPE_OTHTER, itemid, score, power, desc, attrs);
    };
    ZhanLing.prototype.sendZhanLingUpExp = function (id, buy) {
        if (buy === void 0) { buy = 0; }
        var bytes = this.getBytes(2);
        bytes.writeByte(id);
        bytes.writeByte(buy);
        this.sendToServer(bytes);
    };
    ZhanLing.prototype.sendZhanLingDrug = function (id, itemid) {
        var bytes = this.getBytes(3);
        bytes.writeByte(id);
        bytes.writeInt(itemid);
        this.sendToServer(bytes);
    };
    ZhanLing.prototype.sendZhanLingWear = function (id, itemid) {
        var bytes = this.getBytes(4);
        bytes.writeByte(id);
        bytes.writeInt(itemid);
        this.sendToServer(bytes);
    };
    ZhanLing.prototype.sendZhanLingComposeItem = function (itemid) {
        var bytes = this.getBytes(5);
        bytes.writeInt(itemid);
        this.sendToServer(bytes);
    };
    ZhanLing.prototype.sendZhanLingSkinUpGrade = function (id) {
        var bytes = this.getBytes(11);
        bytes.writeByte(id);
        this.sendToServer(bytes);
    };
    ZhanLing.prototype.sendZhangLingSkinChange = function (id) {
        var bytes = this.getBytes(12);
        bytes.writeByte(id);
        this.sendToServer(bytes);
    };
    ZhanLing.prototype.postZhanLingInfo = function (bytes) {
        var len = bytes.readByte();
        for (var i = 0; i < len; i++) {
            var zlData = new ZhanLingData();
            zlData.id = bytes.readInt();
            zlData.talentLv = bytes.readByte();
            zlData.level = bytes.readShort();
            zlData.exp = bytes.readInt();
            zlData.drugs = [];
            var drugsLen = bytes.readByte();
            for (var j = 0; j < drugsLen; j++) {
                var itemid = bytes.readInt();
                var count = bytes.readShort();
                zlData.drugs.push({ itemId: itemid, count: count });
            }
            var itemLen = bytes.readByte();
            if (itemLen) {
                zlData.items = [];
                for (var k = 0; k < itemLen; k++) {
                    zlData.items.push(bytes.readInt());
                }
            }
            ZhanLingModel.ins().setZhanLingData(zlData);
        }
        var skinId = bytes.readByte();
        ZhanLingModel.ins().ZhanLingSkinId = skinId;
    };
    ZhanLing.prototype.postZhanLingUpExp = function (bytes) {
        var id = bytes.readByte();
        var level = bytes.readShort();
        var exp = bytes.readInt();
        var zlData = ZhanLingModel.ins().getZhanLingDataById(id);
        if (!zlData)
            return;
        var oldlevel = zlData.level;
        zlData.level = level;
        zlData.exp = exp;
        if (level > oldlevel)
            this.postZhanLingUpgrade();
    };
    ZhanLing.prototype.postZhanLingUpgrade = function () {
    };
    ZhanLing.prototype.postZhanLingDrug = function (bytes) {
        var id = bytes.readByte();
        var itemid = bytes.readInt();
        var count = bytes.readShort();
        var zlData = ZhanLingModel.ins().getZhanLingDataById(id);
        if (!zlData)
            return;
        var ishave = false;
        for (var i = 0; i < zlData.drugs.length; i++) {
            if (zlData.drugs[i].itemId == itemid) {
                zlData.drugs[i].count = count;
                ishave = true;
                break;
            }
        }
        if (!ishave) {
            zlData.drugs.push({ itemId: itemid, count: count });
        }
    };
    ZhanLing.prototype.postZhanLingWear = function (bytes) {
        var id = bytes.readByte();
        var itemid = bytes.readInt();
        var zlData = ZhanLingModel.ins().getZhanLingDataById(id);
        if (!zlData)
            return;
        var config = GlobalConfig.ZhanLingEquip[itemid];
        if (!config)
            return;
        zlData.items[config.pos - 1] = itemid;
    };
    ZhanLing.prototype.postZhanLingComposeItem = function (bytes) {
        var id = bytes.readByte();
        var itemNum = bytes.readByte();
        var zlData = ZhanLingModel.ins().getZhanLingDataById(id);
        if (!zlData)
            return;
        for (var i = 0; i < itemNum; i++) {
            zlData.items[i] = bytes.readInt();
        }
    };
    ZhanLing.prototype.postZhanLingBubble = function (bytes) {
        var handle = bytes.readDouble();
        var lv = bytes.readInt();
        var id = bytes.readByte();
        var entity = EntityManager.ins().getEntityByHandle(handle);
        if (entity) {
            entity.showZhanling(id, lv);
        }
    };
    ZhanLing.prototype.doZhanLingSkill = function (bytes) {
        var id = 0;
        var zlData = ZhanLingModel.ins().getZhanLingDataById(id);
        var talentLv = GlobalConfig.ZhanLingLevel[id][zlData.level].talentLevel;
        var dp = GlobalConfig.ZhanLingTalent[id][talentLv];
        UserSkill.ins().postShowSkillWord(dp.showWords);
    };
    ZhanLing.prototype.postZhanLingSkinUpGrade = function (bytes) {
        var id = bytes.readByte();
        var talentLv = bytes.readShort();
        var zlData = ZhanLingModel.ins().getZhanLingDataById(id);
        var oldtalentLv = 0;
        if (!zlData) {
            zlData = new ZhanLingData();
            zlData.id = id;
            ZhanLingModel.ins().setZhanLingData(zlData);
        }
        else {
            oldtalentLv = zlData.talentLv;
        }
        if (talentLv != oldtalentLv)
            this.postZhanLingTalentLvUpGrade();
        zlData.talentLv = talentLv;
    };
    ZhanLing.prototype.postZhanLingTalentLvUpGrade = function () {
    };
    ZhanLing.prototype.postZhangLingSkinChange = function (bytes) {
        var id = bytes.readByte();
        ZhanLingModel.ins().ZhanLingSkinId = id;
    };
    return ZhanLing;
}(BaseSystem));
__reflect(ZhanLing.prototype, "ZhanLing");
var GameSystem;
(function (GameSystem) {
    GameSystem.zhanling = ZhanLing.ins.bind(ZhanLing);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=ZhanLing.js.map