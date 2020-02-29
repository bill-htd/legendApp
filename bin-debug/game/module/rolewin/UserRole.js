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
var UserRole = (function (_super) {
    __extends(UserRole, _super);
    function UserRole() {
        var _this = _super.call(this) || this;
        _this.timeID = 0;
        _this.canChangeEquips = [[], [], []];
        _this.observe(UserBag.ins().postItemChange, _this.startCheckHaveCan);
        _this.observe(UserBag.ins().postItemAdd, _this.startCheckHaveCan);
        _this.observe(UserBag.ins().postItemDel, _this.startCheckHaveCan);
        _this.observe(Actor.ins().postLevelChange, _this.startCheckHaveCan);
        _this.observe(GameLogic.ins().postSubRoleChange, _this.startCheckHaveCan);
        _this.observe(UserEquip.ins().postEquipChange, _this.startCheckHaveCan);
        _this.observe(JadeNew.ins().postJadeData, _this.startCheckHaveCan);
        _this.observe(LyMark.ins().postMarkData, _this.startCheckHaveCan);
        _this.observe(Wing.ins().postUseDanSuccess, _this.startCheckHaveCan);
        _this.observe(Wing.ins().postWingUpgrade, _this.startCheckHaveCan);
        _this.observe(Actor.ins().postGoldChange, _this.delayShowNavBtnRedPoint);
        _this.observe(GameLogic.ins().postRuneExchange, _this.delayShowNavBtnRedPoint);
        _this.observe(GameLogic.ins().postRuneShatter, _this.delayShowNavBtnRedPoint);
        _this.observe(UserBag.ins().postHuntStore, _this.delayShowNavBtnRedPoint);
        _this.observe(UserFb.ins().postFbRingInfo, _this.delayShowNavBtnRedPoint);
        return _this;
    }
    UserRole.prototype.startCheckHaveCan = function (isWear, roleIndex) {
        var _this = this;
        if (isWear === void 0) { isWear = false; }
        if (roleIndex === void 0) { roleIndex = -1; }
        if (this.timeID)
            return;
        this.timeID = 1;
        TimerManager.ins().doTimer(50, 1, function () {
            _this.checkHaveCan(isWear, roleIndex);
        }, this);
    };
    UserRole.ins = function () {
        return _super.ins.call(this);
    };
    UserRole.prototype.checkHaveCan = function (isWear, roleIndex) {
        if (isWear === void 0) { isWear = false; }
        if (roleIndex === void 0) { roleIndex = -1; }
        this.timeID = 0;
        var equipItems = UserBag.ins().getBagEquipByType(0);
        if (!equipItems)
            return;
        var sr = SubRoles.ins();
        var startIndex = roleIndex >= 0 ? roleIndex : 0;
        var endIndex = roleIndex >= 0 ? roleIndex + 1 : sr.subRolesLen;
        var tempChangeEquips = [[], [], []];
        var slen = sr.subRolesLen;
        for (var i = 0; i < slen; i++) {
            for (var _i = 0, _a = sr.getSubRoleByIndex(i).equipsData; _i < _a.length; _i++) {
                var equip = _a[_i];
                tempChangeEquips[i].push(equip.item);
            }
        }
        for (var _b = 0, equipItems_1 = equipItems; _b < equipItems_1.length; _b++) {
            var item = equipItems_1[_b];
            for (var j = startIndex; j < endIndex; j++) {
                var job = ItemConfig.getJob(item.itemConfig);
                if (job != 0 && SubRoles.ins().getSubRoleByIndex(j).job != job)
                    continue;
                if (UserZs.ins().lv < item.itemConfig.zsLevel)
                    continue;
                if (Actor.level < item.itemConfig.level)
                    continue;
                var lowEquipIndex = UserBag.ins().getLowEquipIndex(tempChangeEquips[j], ItemConfig.getSubType(item.itemConfig));
                if (lowEquipIndex >= 0)
                    tempChangeEquips[j][lowEquipIndex] = this.contrastEquip(tempChangeEquips[j][lowEquipIndex] || sr.getSubRoleByIndex(j).equipsData[lowEquipIndex].item, item);
            }
        }
        var len = tempChangeEquips.length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < tempChangeEquips[i].length; j++) {
                this.canChangeEquips[i][j] = false;
                if (tempChangeEquips[i][j] &&
                    tempChangeEquips[i][j].handle != sr.getSubRoleByIndex(i).equipsData[j].item.handle) {
                    if (isWear && roleIndex == i) {
                        UserEquip.ins().sendWearEquipment(tempChangeEquips[i][j].handle, j, roleIndex);
                        this.canChangeEquips[i][j] = false;
                    }
                    else {
                        this.canChangeEquips[i][j] = true;
                    }
                }
            }
            if (this.canChangeEquips[i].indexOf(true) < 0)
                this.canChangeEquips[i].length = 0;
        }
        this.showNavBtnRedPoint();
    };
    UserRole.prototype.contrastEquip = function (sourceItem, item) {
        if (!sourceItem || sourceItem.handle == 0)
            return item;
        if (!item || item.handle == 0)
            return sourceItem;
        var sourceItemScore = sourceItem.point;
        var itemScore = item.point;
        if (itemScore > sourceItemScore)
            return item;
        else
            return sourceItem;
    };
    UserRole.prototype.getCanChangeEquips = function () {
        for (var i = 0; i < this.canChangeEquips.length; i++) {
            for (var j = 0; j < this.canChangeEquips[i].length; j++) {
                if (this.canChangeEquips[i][j]) {
                    return true;
                }
            }
        }
        return false;
    };
    UserRole.prototype.delayShowNavBtnRedPoint = function () {
        if (!TimerManager.ins().isExists(this.showNavBtnRedPoint, this))
            TimerManager.ins().doTimer(60, 1, this.showNavBtnRedPoint, this);
    };
    UserRole.prototype.showNavBtnRedPoint = function (b) {
        if (b === void 0) { b = false; }
        for (var i = 0; i < this.canChangeEquips.length; i++) {
            for (var j = 0; j < this.canChangeEquips[i].length; j++) {
                if (this.canChangeEquips[i][j]) {
                    b = true;
                    break;
                }
            }
            if (b)
                break;
        }
        if (!b && SamsaraModel.ins().isCanAddSpirit()) {
            b = true;
        }
        if (!b && OpenSystem.ins().checkSysOpen(SystemType.RING) && (SpecialRing.ins().checkHaveUpRing() || SpecialRing.ins().isCanStudySkill() || SpecialRing.ins().isCanUpgradeSkill() || SpecialRing.ins().fireRingRedPoint() || LyMark.ins().checkRed())) {
            b = true;
        }
        if (!b && UserSkill.ins().canHejiEquip()) {
            b = true;
        }
        if (!b && UserSkill.ins().canExchange()) {
            b = true;
        }
        if (!b && UserSkill.ins().canSolve()) {
            b = true;
        }
        if (!b && LongHun.ins().canShowRedPointInAll()) {
            b = true;
        }
        else if (!b && UserZs.ins().canOpenZSWin() && !UserZs.ins().isMaxLv() && (UserZs.ins().canGet() > 0 || UserZs.ins().canUpgrade())) {
            b = true;
        }
        else if (!b && this.and(Wing.ins().canGradeupWing()) || this.and(Wing.ins().canItemGradeupWing()) || Wing.ins().isHaveActivationWing()) {
            b = true;
        }
        if (!b && Dress.ins().redPoint()) {
            b = true;
        }
        if (!b && RuneRedPointMgr.ins().checkAllSituation(false)) {
            b = true;
        }
        if (!b) {
            var len = SubRoles.ins().subRolesLen;
            for (var a = 0; a < len; a++) {
                var model = SubRoles.ins().getSubRoleByIndex(a);
                for (var i = 0; i < 8; i++) {
                    var equipItem = this["equip" + i];
                    b = UserEquip.ins().setOrangeEquipItemState(i, model);
                    if (!b && i < 2)
                        b = UserEquip.ins().setLegendEquipItemState(i > 0 ? 2 : 0, model);
                    if (b) {
                        var eb = UserBag.ins().checkEqRedPoint(i, model);
                        b = eb != null ? eb : b;
                    }
                    if (b)
                        break;
                }
                if (b)
                    break;
            }
            if (!b)
                for (var i = 0; i < len; i++) {
                    b = UserEquip.ins().checkRedPointEx(5, i);
                    if (b)
                        break;
                }
            if (!b)
                b = UserBag.ins().getLegendHasResolve();
            if (!b)
                b = Boolean(UserBag.ins().getHuntGoods(0).length);
        }
        if (!b)
            b = SubRoles.ins().isLockRole();
        if (!b)
            b = GodWingRedPoint.ins().getGodWingRedPoint();
        if (!b)
            b = SamsaraModel.ins().isCanUpgrade() || SamsaraModel.ins().isCanExchange() || SamsaraModel.ins().isCanUpgradeSoul();
        if (!b)
            b = JadeNew.ins().checkRed();
        if (!b)
            b = Wing.ins().canUseFlyUp();
        if (!b)
            b = Wing.ins().canUseAptitude();
        this.postRoleHint(b);
    };
    UserRole.prototype.postRoleHint = function (b) {
        return b ? 1 : 0;
    };
    UserRole.prototype.and = function (list) {
        for (var k in list) {
            if (list[k] == true)
                return true;
        }
        return false;
    };
    UserRole.prototype.seekRoleItem = function () {
        var isReturn = false;
        var len = UserBag.ins().getBagItemNum(0);
        for (var i = 0; i < len; i++) {
            if (isReturn)
                return isReturn;
            var item = UserBag.ins().getBagGoodsByIndex(0, i);
            switch (item.itemConfig.id) {
                case 200001:
                    break;
                case 200004:
                    isReturn = this.roleHint(5);
                    break;
                case 200013:
                    isReturn = this.roleHint(0);
                    break;
                case 200014:
                    isReturn = this.roleHint(1);
                    break;
            }
        }
        return isReturn;
    };
    UserRole.prototype.roleHint = function (type) {
        var len = SubRoles.ins().subRolesLen;
        var flag = false;
        for (var i = 0; i < len; i++) {
            var role = SubRoles.ins().getSubRoleByIndex(i);
            flag = this.roleHintCheck(role, type);
            if (flag) {
                return flag;
            }
        }
        return flag;
    };
    UserRole.prototype.roleHintCheck = function (role, type) {
        var lv = 1;
        var costNum = 0;
        var itemNum = 0;
        var itemId = 0;
        switch (type) {
            case 0:
                lv = role.getExRingsData(0);
                var ring0Config = GlobalConfig["ExRing" + 0 + "Config"][lv];
                if (lv >= 1)
                    return false;
                if (ring0Config) {
                    costNum = ring0Config.cost;
                    itemId = GlobalConfig.ExRingConfig[0].costItem;
                }
                break;
            case 1:
                lv = role.getExRingsData(1);
                var ring1Config = GlobalConfig["ExRing" + 1 + "Config"][lv];
                if (lv >= 1)
                    return false;
                if (ring1Config) {
                    costNum = ring1Config.cost;
                    itemId = GlobalConfig.ExRingConfig[1].costItem;
                }
                break;
            case LongHun.TYPE_LONG_HUN:
                lv += role.loongSoulData.level;
                var loongSoulConfig = GlobalConfig.LoongSoulConfig[lv];
                var loongSoulStageConfig = GlobalConfig.LoongSoulStageConfig[role.loongSoulData.stage];
                if (loongSoulConfig) {
                    costNum = loongSoulStageConfig.normalCost;
                    itemId = loongSoulConfig.itemId;
                }
                break;
            case LongHun.TYPE_HU_DUN:
                lv += role.shieldData.level;
                var shieldConfig = GlobalConfig.ShieldConfig[lv];
                var shieldStageConfig = GlobalConfig.ShieldStageConfig[role.loongSoulData.stage];
                if (shieldConfig) {
                    costNum = shieldStageConfig.normalCost;
                    itemId = shieldConfig.itemId;
                }
                break;
            case 5:
                lv = role.jingMaiData.level;
                var jingMaiConfig = GlobalConfig.JingMaiLevelConfig[lv];
                if (jingMaiConfig) {
                    costNum = jingMaiConfig.count;
                    itemId = jingMaiConfig.itemId;
                }
                break;
        }
        if (costNum) {
            itemNum = UserBag.ins().getBagGoodsCountById(0, itemId);
            if (itemNum >= costNum)
                return true;
        }
        return false;
    };
    UserRole.prototype.setCanChange = function () {
        var roleWin = ViewManager.ins().getView(RoleWin);
        if (roleWin) {
            roleWin.roleInfoPanel.setCanChange(this.canChangeEquips);
            roleWin.canChangeEquips = this.canChangeEquips;
        }
    };
    UserRole.oneKeyOpenLevel = 60;
    return UserRole;
}(BaseSystem));
__reflect(UserRole.prototype, "UserRole");
var GameSystem;
(function (GameSystem) {
    GameSystem.userRole = UserRole.ins.bind(UserRole);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=UserRole.js.map