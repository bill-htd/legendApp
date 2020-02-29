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
var Wing = (function (_super) {
    __extends(Wing, _super);
    function Wing() {
        var _this = _super.call(this) || this;
        _this.timeID = 0;
        _this.godWing = [];
        _this.isListen = false;
        _this.sysId = PackageID.Wing;
        _this.regNetMsg(1, _this.doUpDataWing);
        _this.regNetMsg(2, _this.doBoost);
        _this.regNetMsg(3, _this.postWingWear);
        _this.regNetMsg(4, _this.postActivate);
        _this.regNetMsg(5, _this.postGodWingData);
        _this.regNetMsg(8, _this.postUseDanSuccess);
        _this.regNetMsg(11, _this.postWingEquip);
        _this.observe(UserBag.ins().postItemAdd, _this.startCheckHaveCan);
        _this.observe(UserBag.ins().postItemDel, _this.startCheckHaveCan);
        _this.observe(GameLogic.ins().postSubRoleChange, _this.startCheckHaveCan);
        _this.observe(Actor.ins().postLevelChange, _this.startCheckHaveCan);
        _this.observe(_this.postWingUpgrade, _this.startCheckHaveCan);
        _this.observe(UserBag.ins().postItemChange, _this.startCheckHaveCan);
        _this.observe(_this.postUseDanSuccess, _this.startCheckHaveCan);
        return _this;
    }
    Wing.ins = function () {
        return _super.ins.call(this);
    };
    Wing.prototype.initConfig = function () {
        if (!this.wingSkillDic) {
            this.wingSkillDic = [];
            var config = GlobalConfig.WingLevelConfig;
            for (var k in config) {
                if (config[k].pasSkillId) {
                    this.wingSkillDic.push(config[k].pasSkillId);
                }
            }
        }
    };
    Wing.prototype.getWingSkillByIndex = function (index) {
        this.initConfig();
        return this.wingSkillDic[index];
    };
    Wing.prototype.startCheckHaveCan = function (isWear, roleIndex) {
        if (isWear === void 0) { isWear = false; }
        if (roleIndex === void 0) { roleIndex = -1; }
        if (this.isListen)
            return;
        this.isListen = true;
        TimerManager.ins().doTimerDelay(3000, 1000, 1, this.showNavBtnRedPoint, this);
    };
    Wing.prototype.sendBoost = function (roleId, type) {
        var bytes = this.getBytes(2);
        bytes.writeShort(roleId);
        bytes.writeByte(type);
        this.sendToServer(bytes);
    };
    Wing.prototype.sendUpgrade = function (roleId) {
        var bytes = this.getBytes(3);
        bytes.writeShort(roleId);
        this.sendToServer(bytes);
    };
    Wing.prototype.sendActivate = function (roleId) {
        var bytes = this.getBytes(4);
        bytes.writeShort(roleId);
        this.sendToServer(bytes);
    };
    Wing.prototype.dressWingEquip = function (roleId, itemId, dressIndex) {
        var bytes = this.getBytes(11);
        bytes.writeDouble(itemId);
        bytes.writeShort(roleId);
        bytes.writeShort(dressIndex);
        this.sendToServer(bytes);
    };
    Wing.prototype.sendBigUpLevel = function (role) {
        var bytes = this.getBytes(12);
        bytes.writeInt(role);
        this.sendToServer(bytes);
    };
    Wing.prototype.doBigUpLevel = function (bytes) {
        var result = bytes.readInt();
        var str;
        if (!result) {
            var type = bytes.readInt();
        }
        else {
            str = "道具不足够";
        }
        UserTips.ins().showTips(str);
    };
    Wing.prototype.doUpDataWing = function (bytes) {
        var index = bytes.readShort();
        SubRoles.ins().getSubRoleByIndex(index).wingsData.parser(bytes);
    };
    Wing.prototype.doBoost = function (bytes) {
        var index = bytes.readShort();
        var lastLv = SubRoles.ins().getSubRoleByIndex(index).wingsData.lv;
        SubRoles.ins().getSubRoleByIndex(index).wingsData.parserBoost(bytes);
        var crit = 0;
        var addExp = bytes.readInt();
        SubRoles.ins().getSubRoleByIndex(index).wingsData.parserClearTime(bytes);
        crit = bytes.readShort();
        this.postBoost(crit, addExp);
        if (lastLv != SubRoles.ins().getSubRoleByIndex(index).wingsData.lv) {
            var skillAct = GlobalConfig.WingLevelConfig[SubRoles.ins().getSubRoleByIndex(index).wingsData.lv];
            if (skillAct.pasSkillId) {
            }
            SubRoles.ins().getSubRoleByIndex(index).setWingSkill();
            var role = EntityManager.ins().getMainRole(index);
            if (role)
                role.updateModel();
            this.postWingUpgrade();
            Activationtongyong.show(1, skillAct.name, "j" + skillAct.appearance + "_png");
        }
        this.postWingTime();
    };
    Wing.prototype.postBoost = function (crit, addExp) {
        return [crit, addExp];
    };
    Wing.prototype.postWingUpgrade = function () {
    };
    Wing.prototype.postActivate = function (bytes) {
        var index = bytes.readShort();
        SubRoles.ins().getSubRoleByIndex(index).wingsData.parserOpenStatus(bytes);
        var config = GlobalConfig.WingLevelConfig[0];
        Activationtongyong.show(0, config.name, "j" + config.appearance + "_png");
        var role = EntityManager.ins().getMainRole(index);
        if (!role)
            return;
        role.updateModel();
    };
    Wing.prototype.postWingEquip = function (bytes) {
        var roleId = bytes.readShort();
        var index = bytes.readShort();
        var item = new ItemData;
        item.parser(bytes);
        SubRoles.ins().getSubRoleByIndex(roleId).wingsData.getEquipByIndex(index).item = item;
        var role = EntityManager.ins().getMainRole(roleId);
        if (!role)
            return;
        role.updateModel();
    };
    Wing.prototype.postWingTime = function () {
    };
    Wing.prototype.showNavBtnRedPoint = function () {
        this.isListen = false;
        var b = false;
        var actorLv = Actor.level;
        if (Actor.level >= GlobalConfig.WingCommonConfig.openLevel) {
            if (!b && this.and(this.canGradeupWing())) {
                UserRole.ins().showNavBtnRedPoint(true);
                return;
            }
        }
        if (this.canUseFlyUp()) {
            UserRole.ins().showNavBtnRedPoint(true);
            return;
        }
        if (this.canUseAptitude()) {
            UserRole.ins().showNavBtnRedPoint(true);
            return;
        }
        UserRole.ins().showNavBtnRedPoint(false);
    };
    Wing.prototype.and = function (list) {
        for (var k in list) {
            if (list[k] == true)
                return true;
        }
        return false;
    };
    Wing.prototype.getLevelBySkill = function (index) {
        if (!this.wingSkillLevelDic) {
            this.wingSkillLevelDic = [];
            var config = GlobalConfig.WingLevelConfig;
            for (var k in config) {
                if (config[k].pasSkillId > 0) {
                    this.wingSkillLevelDic.push(config[k].level);
                }
            }
        }
        if (this.wingSkillLevelDic[index]) {
            return this.wingSkillLevelDic[index];
        }
        return 0;
    };
    Wing.prototype.canGradeupWing = function () {
        var boolList = [false, false, false];
        return boolList;
    };
    Wing.prototype.canItemGradeupWing = function () {
        var boolList = [false, false, false];
        var lvMax = Wing.WingMaxLv;
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            var roleOpenWing = SubRoles.ins().getSubRoleByIndex(i).wingsData.openStatus;
            if (roleOpenWing) {
                var curlevel = SubRoles.ins().getSubRoleByIndex(i).wingsData.lv;
                if (curlevel < lvMax && curlevel < Wing.WingExpRedPoint) {
                    var config = GlobalConfig.WingLevelConfig[curlevel];
                    if (Assert(config, "get WingLevelConfig null " + curlevel))
                        continue;
                    var num = UserBag.ins().getBagGoodsCountById(0, config.itemId);
                    boolList[i] = config.itemNum <= num;
                }
                else {
                    boolList[i] = false;
                }
                if (!boolList[i]) {
                    var count = UserBag.ins().getBagGoodsCountById(0, GlobalConfig.WingCommonConfig.levelItemid);
                    boolList[i] = count > 0 && curlevel == Wing.WingExpRedPoint;
                }
            }
        }
        return boolList;
    };
    Wing.prototype.isHaveActivationWing = function (roleId) {
        if (roleId === void 0) { roleId = -1; }
        var myLevel = Actor.level;
        var needLevel = GlobalConfig.WingCommonConfig.openLevel;
        if (myLevel < needLevel)
            return false;
        var len = SubRoles.ins().subRolesLen;
        if (roleId == -1) {
            for (var i = 0; i < len; i++) {
                var wingData = SubRoles.ins().getSubRoleByIndex(i).wingsData;
                if (!wingData.openStatus)
                    return true;
            }
        }
        else {
            var wingData = SubRoles.ins().getSubRoleByIndex(roleId).wingsData;
            if (!wingData.openStatus)
                return true;
        }
        return false;
    };
    Wing.prototype.canRoleOpenWing = function () {
        var boolList = [false, false, false];
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            var roleOpenWing = SubRoles.ins().getSubRoleByIndex(i).wingsData.openStatus;
            boolList[i] = !roleOpenWing && Actor.level >= 16;
        }
        return boolList;
    };
    Wing.prototype.sendWingWear = function (roleId, itemId) {
        var bytes = this.getBytes(3);
        bytes.writeShort(roleId);
        bytes.writeInt(itemId);
        this.sendToServer(bytes);
    };
    Wing.prototype.postWingWear = function (bytes) {
        var b = bytes.readBoolean();
        return b;
    };
    Wing.prototype.postGodWingData = function (bytes) {
        var roleId = bytes.readShort();
        if (!this.godWing[roleId])
            this.godWing[roleId] = new GodWingData();
        this.godWing[roleId].parser(bytes);
    };
    Wing.prototype.sendUseDan = function (id, type) {
        var bytes = this.getBytes(8);
        bytes.writeByte(id);
        bytes.writeByte(type);
        this.sendToServer(bytes);
    };
    Wing.prototype.postUseDanSuccess = function (bytes) {
        var wingsData = SubRoles.ins().getSubRoleByIndex(bytes.readByte()).wingsData;
        var type = bytes.readByte();
        var count = bytes.readShort();
        if (type == 0)
            wingsData.aptitudeDan = count;
        else
            wingsData.flyUpDan = count;
    };
    Wing.prototype.canUseFlyUp = function () {
        var len = SubRoles.ins().roles.length;
        for (var i = 0; i < len; i++) {
            if (this.canUseFlyUpByRoleID(i))
                return true;
        }
        return false;
    };
    Wing.prototype.canUseFlyUpByRoleID = function (roleID) {
        var role = SubRoles.ins().getSubRoleByIndex(roleID);
        if (role.wingsData && role.wingsData.openStatus == 1) {
            if (role.wingsData.flyUpDan < GlobalConfig.WingLevelConfig[role.wingsData.lv].flyPill) {
                var itemData = UserBag.ins().getBagItemById(GlobalConfig.WingCommonConfig.flyPillId);
                var num = itemData ? itemData.count : 0;
                if (num)
                    return true;
            }
        }
        return false;
    };
    Wing.prototype.canUseAptitude = function () {
        var len = SubRoles.ins().roles.length;
        for (var i = 0; i < len; i++) {
            if (this.canUseAptitudeByRoleID(i))
                return true;
        }
        return false;
    };
    Wing.prototype.canUseAptitudeByRoleID = function (roleID) {
        var role = SubRoles.ins().getSubRoleByIndex(roleID);
        if (role.wingsData && role.wingsData.openStatus == 1) {
            if (role.wingsData.aptitudeDan < GlobalConfig.WingLevelConfig[role.wingsData.lv].attrPill) {
                var itemData = UserBag.ins().getBagItemById(GlobalConfig.WingCommonConfig.attrPillId);
                var num = itemData ? itemData.count : 0;
                if (num)
                    return true;
            }
        }
        return false;
    };
    Wing.prototype.userDans = function (id) {
        var len = SubRoles.ins().roles.length;
        var role;
        var maxRole = null;
        var maxLvRole = null;
        var maxUnOpen = 0;
        var lvMax = 0;
        var cfg;
        var useMax;
        var isZiZhi = id == GlobalConfig.WingCommonConfig.attrPillId;
        for (var i = 0; i < len; i++) {
            role = SubRoles.ins().getSubRoleByIndex(i);
            if (role.wingsData.openStatus == 1) {
                cfg = GlobalConfig.WingLevelConfig[role.wingsData.lv];
                useMax = (isZiZhi && role.wingsData.aptitudeDan >= cfg.attrPill) || (!isZiZhi && role.wingsData.flyUpDan >= cfg.flyPill);
                if (!useMax) {
                    if (!maxRole)
                        maxRole = role;
                    if (role.wingsData.lv > maxRole.wingsData.lv)
                        maxRole = role;
                    if (!maxLvRole)
                        maxLvRole = role;
                    if (isZiZhi && role.wingsData.aptitudeDan > maxRole.wingsData.aptitudeDan)
                        maxLvRole = role;
                    if (!isZiZhi && role.wingsData.flyUpDan > maxRole.wingsData.flyUpDan)
                        maxLvRole = role;
                }
                else
                    lvMax++;
            }
            else
                maxUnOpen++;
        }
        if (maxUnOpen >= len) {
            UserTips.ins().showTips("所有角色均未开启羽翼");
            return;
        }
        if (lvMax >= len) {
            UserTips.ins().showTips("所有角色羽翼" + (isZiZhi ? "资质" : "飞升") + "已满级");
            return;
        }
        var index = maxRole.index;
        if (maxRole.index != maxLvRole.index && maxRole.wingsData.lv == maxLvRole.wingsData.lv)
            index = maxLvRole.index;
        ViewManager.ins().open(RoleWin, 3, index);
    };
    Wing.prototype.sendWingCompose = function (type, itemId, roleIndex) {
        var tp = type;
        var bytes = this.getBytes(6);
        bytes.writeShort(tp);
        bytes.writeInt(itemId);
        if (tp == 1) {
            bytes.writeInt(roleIndex);
        }
        this.sendToServer(bytes);
    };
    Wing.prototype.sendResetGodWing = function (src, des) {
        var bytes = this.getBytes(7);
        bytes.writeInt(src);
        bytes.writeInt(des);
        this.sendToServer(bytes);
    };
    Wing.prototype.getCurLevelItemId = function (roleId, slot) {
        var glconfig;
        var level;
        if (!this.godWing[roleId])
            return null;
        level = this.godWing[roleId].getLevel(slot);
        if (!level)
            return null;
        glconfig = GlobalConfig.GodWingLevelConfig[level][slot];
        return glconfig;
    };
    Wing.prototype.getNextLevelItemId = function (roleId, slot) {
        var level;
        level = this.godWing[roleId].getLevel(slot);
        level = level ? (this.getNextLevel(level)) : 0;
        if (!GlobalConfig.GodWingLevelConfig[level])
            return null;
        return GlobalConfig.GodWingLevelConfig[level][slot];
    };
    Wing.prototype.quickComposeRedPoint = function (roleIndex, slot) {
        var lv = Wing.ins().getGodWing(roleIndex).getLevel(slot);
        var nextLvl = this.getNextLevel(lv);
        if (!nextLvl)
            return false;
        var cfg = GlobalConfig.GodWingLevelConfig[nextLvl][slot];
        if (!this.checkGodWingLevel(roleIndex, cfg.itemId))
            return false;
        if (this.checkGodWingItem(roleIndex, cfg.itemId, slot)) {
            return true;
        }
        return false;
    };
    Wing.prototype.wearItemRedPoint = function (roleIndex, slot) {
        if (this.checkSlotLevel(roleIndex, slot)) {
            return true;
        }
        return false;
    };
    Wing.prototype.gridRedPoint = function (roleIndex, slot) {
        if (this.wearItemRedPoint(roleIndex, slot)) {
            return true;
        }
        return this.quickComposeRedPoint(roleIndex, slot);
    };
    Wing.prototype.isWearGodWing = function (i) {
        var role = SubRoles.ins().getSubRoleByIndex(i);
        if (!role)
            return false;
        for (var j = 1; j <= Wing.GodWingMaxSlot; j++) {
            if (this.gridRedPoint(role.index, j)) {
                return true;
            }
        }
        return false;
    };
    Wing.prototype.checkSlot = function (roleId, slot) {
        var lv = Wing.ins().getGodWing(roleId).getLevel(slot);
        if (!lv) {
            return false;
        }
        return true;
    };
    Wing.prototype.getWearItem = function (roleId, slot) {
        var lv = Wing.ins().getGodWing(roleId).getLevel(slot);
        var items = UserBag.ins().getBagGoodsByType(ItemType.TYPE_16);
        for (var i = 0; i < items.length; i++) {
            var itemConf = GlobalConfig.GodWingItemConfig[items[i].configID];
            if (this.checkGodWingLevel(roleId, itemConf.itemId) && itemConf.slot == slot && itemConf.level > lv) {
                return itemConf.itemId;
            }
        }
        return 0;
    };
    Wing.prototype.checkSlotLevel = function (roleId, slot) {
        var lv = Wing.ins().getGodWing(roleId).getLevel(slot);
        var items = UserBag.ins().getBagGoodsByType(ItemType.TYPE_16);
        for (var i = 0; i < items.length; i++) {
            var itemConf = GlobalConfig.GodWingItemConfig[items[i].configID];
            if (this.checkGodWingLevel(roleId, itemConf.itemId) && itemConf.slot == slot && itemConf.level > lv) {
                return true;
            }
        }
        return false;
    };
    Wing.prototype.checkGodWingLevel = function (roleId, itemId) {
        var gwconfig = GlobalConfig.GodWingItemConfig[itemId];
        var myWinglevel = 0;
        var wd = SubRoles.ins().getSubRoleByIndex(roleId).wingsData;
        myWinglevel += wd.lv;
        if (wd.openStatus)
            myWinglevel += 1;
        if (myWinglevel >= gwconfig.level) {
            return true;
        }
        return false;
    };
    Wing.prototype.checkGodWingItem = function (roleId, itemId, slot) {
        var gwconfig = GlobalConfig.GodWingItemConfig[itemId];
        var totalSum = gwconfig.composeItem.count;
        var mySum = 0;
        var itemdata = UserBag.ins().getBagItemById(gwconfig.composeItem.id);
        if (itemdata)
            mySum = itemdata.count;
        if (slot) {
            var isWear = this.getGodWing(roleId).getLevel(slot);
            if (isWear)
                totalSum -= 1;
        }
        if (mySum >= totalSum)
            return true;
        return false;
    };
    Wing.prototype.isQuicComposeGodWing = function (roleId, slot) {
        var role = SubRoles.ins().getSubRoleByIndex(roleId);
        if (!role)
            return false;
        var level = this.godWing[roleId].getLevel(slot);
        if (!level) {
            level = this.getStartLevel(slot);
        }
        if (!level)
            return false;
        var myWinglevel = 0;
        var wd = SubRoles.ins().getSubRoleByIndex(roleId).wingsData;
        myWinglevel += wd.lv;
        if (wd.openStatus)
            myWinglevel += 1;
        if (myWinglevel < level) {
            return false;
        }
        var isAct = Wing.ins().getGodWing(roleId).getLevel(slot);
        if (isAct) {
            level = this.getNextLevel(level);
            if (!level)
                return false;
        }
        var itemId = GlobalConfig.GodWingLevelConfig[level][slot].itemId;
        var gwconfig = GlobalConfig.GodWingItemConfig[itemId];
        var totalSum = gwconfig.composeItem.count;
        var mySum = 0;
        var itemdata = UserBag.ins().getBagItemById(gwconfig.composeItem.id);
        if (itemdata)
            mySum = itemdata.count;
        var myLevel = Wing.ins().getGodWing(roleId).getLevel(slot);
        if (myLevel) {
            var lcfg = GlobalConfig.GodWingLevelConfig[myLevel][slot];
            if (lcfg.itemId == gwconfig.composeItem.id)
                mySum += 1;
        }
        if (mySum >= totalSum)
            return true;
        return false;
    };
    Wing.prototype.isComposeGodWingOnly = function (itemId) {
        var gwconfig = GlobalConfig.GodWingItemConfig[itemId];
        var totalSum = gwconfig.composeItem.count;
        var mySum = 0;
        var itemdata = UserBag.ins().getBagItemById(gwconfig.composeItem.id);
        if (itemdata)
            mySum = itemdata.count;
        if (mySum >= totalSum)
            return true;
        return false;
    };
    Wing.prototype.isComposeGodWingAll = function () {
        for (var k in GlobalConfig.GodWingSuitConfig) {
            var cfg = GlobalConfig.GodWingSuitConfig[k];
            for (var i = 1; i <= Wing.GodWingMaxSlot; i++) {
                var glcfg = GlobalConfig.GodWingLevelConfig[cfg.lv][i];
                if (this.isComposeGodWingOnly(glcfg.itemId))
                    return true;
            }
        }
        return false;
    };
    Wing.prototype.isComposeGodWingLevel = function (lv, slot) {
        var glcfg = GlobalConfig.GodWingLevelConfig[lv][slot];
        if (this.isComposeGodWingOnly(glcfg.itemId)) {
            return true;
        }
        return false;
    };
    Wing.prototype.isComposeGodWingSlot = function (lv, slot) {
        var cfg = GlobalConfig.GodWingSuitConfig[lv];
        var glcfg = GlobalConfig.GodWingLevelConfig[cfg.lv][slot];
        if (this.isComposeGodWingOnly(glcfg.itemId))
            return true;
        return false;
    };
    Wing.prototype.isComposeGodWing = function (type) {
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < 3; i++) {
            var role = SubRoles.ins().getSubRoleByIndex(i);
            if (!role)
                continue;
            var slotData = this.calcGodWingSlot(i);
            for (var j = 0; j < slotData.length; j++) {
                var gl = GlobalConfig.GodWingLevelConfig[slotData[j].level][slotData[j].slot];
                if (type) {
                    var myWinglevel = 0;
                    var wd = SubRoles.ins().getSubRoleByIndex(i).wingsData;
                    myWinglevel += wd.lv;
                    if (wd.openStatus)
                        myWinglevel += 1;
                    if (myWinglevel < gl.level) {
                        continue;
                    }
                }
                var gwconfig = GlobalConfig.GodWingItemConfig[gl.itemId];
                var itemId = gwconfig.composeItem.id;
                var itemData = UserBag.ins().getBagItemById(itemId);
                var totalSum = gwconfig.composeItem.count;
                var mySum = itemData ? itemData.count : 0;
                if (mySum >= totalSum) {
                    return true;
                }
            }
        }
        return false;
    };
    Wing.prototype.calcGodWingSlot = function (roleId) {
        var slotData = [];
        for (var i = 1; i <= Wing.GodWingMaxSlot; i++) {
            var lv = Wing.ins().getGodWing(roleId).getLevel(i);
            var tmp = { slot: 0, level: 0 };
            tmp.slot = i;
            if (!lv) {
                lv = this.getStartLevel(i);
            }
            tmp.level = lv;
            slotData.push(tmp);
        }
        return slotData;
    };
    Wing.prototype.getStartLevel = function (slot) {
        for (var k in GlobalConfig.GodWingLevelConfig) {
            var gwconfig = GlobalConfig.GodWingLevelConfig[k];
            for (var j in gwconfig) {
                if (gwconfig[j].slot == slot) {
                    return gwconfig[j].level;
                }
            }
        }
        return 0;
    };
    Wing.prototype.getPreLevel = function (curLevel) {
        var prelevel = 0;
        for (var k in GlobalConfig.GodWingLevelConfig) {
            if (!prelevel) {
                prelevel = Number(k);
                continue;
            }
            if (Number(k) == curLevel)
                return prelevel;
            prelevel = Number(k);
        }
        return prelevel;
    };
    Wing.prototype.getNextLevel = function (curLevel) {
        var keys = [];
        for (var i in GlobalConfig.GodWingLevelConfig) {
            keys.push(+i);
        }
        keys.sort(function (a, b) {
            if (a < b)
                return -1;
            return 1;
        });
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var k = keys_1[_i];
            if (curLevel < k)
                return k;
        }
        return 0;
    };
    Wing.prototype.getNameFromSlot = function (slot) {
        var gwName = "";
        switch (slot) {
            case 1:
                gwName = "飞羽";
                break;
            case 2:
                gwName = "纤羽";
                break;
            case 3:
                gwName = "绒羽";
                break;
            case 4:
                gwName = "翎羽";
                break;
        }
        return gwName;
    };
    Wing.prototype.getGodWing = function (roleId) {
        if (!this.godWing[roleId])
            this.godWing[roleId] = new GodWingData();
        return this.godWing[roleId];
    };
    Wing.WingMaxLv = 9;
    Wing.WingExpRedPoint = 3;
    Wing.GodWingMaxSlot = 4;
    Wing.hint = true;
    return Wing;
}(BaseSystem));
__reflect(Wing.prototype, "Wing");
var GodWingData = (function () {
    function GodWingData() {
        this.data = {};
    }
    GodWingData.prototype.parser = function (bytes) {
        var len = bytes.readShort();
        for (var i = 0; i < len; i++) {
            var slot = bytes.readShort();
            var level = bytes.readInt();
            this.data[slot] = { slot: slot, level: level };
        }
    };
    GodWingData.prototype.getLevel = function (slot) {
        return this.data[slot] ? this.data[slot].level : 0;
    };
    GodWingData.prototype.getData = function () {
        return this.data;
    };
    GodWingData.prototype.getSuitLevel = function () {
        var minLv = Number.MAX_VALUE;
        var slot = 0;
        for (var i in this.data) {
            if (this.data[i].level < minLv) {
                slot = this.data[i].slot;
                minLv = this.data[i].level;
            }
        }
        if (!slot)
            return 0;
        var glconfig = GlobalConfig.GodWingLevelConfig[minLv][slot];
        if (!glconfig)
            return 0;
        var ishave = [];
        for (var k in GlobalConfig.GodWingItemConfig) {
            var gwconfig = GlobalConfig.GodWingItemConfig[k];
            if (ishave.length >= Wing.GodWingMaxSlot)
                break;
            if (gwconfig.level >= glconfig.level && glconfig.slot != gwconfig.slot) {
                if (this.data[gwconfig.slot] && this.data[gwconfig.slot].level >= gwconfig.level) {
                    ishave.push(gwconfig.itemId);
                }
            }
        }
        if (ishave.length >= Wing.GodWingMaxSlot - 1)
            return minLv;
        return 0;
    };
    GodWingData.prototype.getSuitSum = function () {
        var lv = this.getSuitLevel();
        var sum = 0;
        for (var i in this.data) {
            if (this.data[i].level >= lv) {
                sum++;
            }
        }
        return sum;
    };
    return GodWingData;
}());
__reflect(GodWingData.prototype, "GodWingData");
var GameSystem;
(function (GameSystem) {
    GameSystem.wing = Wing.ins.bind(Wing);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=Wing.js.map