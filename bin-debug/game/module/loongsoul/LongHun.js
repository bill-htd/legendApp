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
var LongHun = (function (_super) {
    __extends(LongHun, _super);
    function LongHun() {
        var _this = _super.call(this) || this;
        _this.sysId = PackageID.LoongSoul;
        _this.regNetMsg(1, _this.postDateUpdate);
        _this.regNetMsg(2, _this.postStageUpgrade);
        _this.regNetMsg(3, _this.postStageActive);
        return _this;
    }
    LongHun.ins = function () {
        return _super.ins.call(this);
    };
    LongHun.prototype.sendUpGrade = function (roleID, type) {
        var bytes = this.getBytes(1);
        bytes.writeShort(roleID);
        bytes.writeShort(type);
        this.sendToServer(bytes);
    };
    LongHun.prototype.postDateUpdate = function (bytes) {
        var roleIndex = bytes.readShort();
        var type = bytes.readShort();
        var model = SubRoles.ins().getSubRoleByIndex(roleIndex);
        var lv = bytes.readInt();
        var exp = bytes.readInt();
        var lvChange = 0;
        switch (type + 1) {
            case LongHun.TYPE_LONG_HUN:
                lvChange = model.loongSoulData.level == lv ? 0 : 1;
                model.loongSoulData.level = lv;
                model.loongSoulData.exp = exp;
                break;
            case LongHun.TYPE_HU_DUN:
                model.shieldData.level = lv;
                model.shieldData.exp = exp;
                break;
            case LongHun.TYPE_XUE_YU:
                model.xueyuData.level = lv;
                model.xueyuData.exp = exp;
                break;
        }
        return lvChange;
    };
    LongHun.prototype.sendStageUpgrade = function (roleID, type) {
        var bytes = this.getBytes(2);
        bytes.writeShort(roleID);
        bytes.writeShort(type);
        this.sendToServer(bytes);
    };
    LongHun.prototype.postStageUpgrade = function (bytes) {
        var roleIndex = bytes.readShort();
        var type = bytes.readShort();
        var stage = bytes.readInt();
        var model = SubRoles.ins().getSubRoleByIndex(roleIndex);
        switch (type + 1) {
            case LongHun.TYPE_LONG_HUN:
                model.loongSoulData.stage = stage;
                break;
            case LongHun.TYPE_HU_DUN:
                model.shieldData.stage = stage;
                break;
            case LongHun.TYPE_XUE_YU:
                model.xueyuData.stage = stage;
                break;
        }
    };
    LongHun.prototype.sendStageActive = function (roleID, type) {
        var bytes = this.getBytes(3);
        bytes.writeShort(roleID);
        bytes.writeShort(type);
        this.sendToServer(bytes);
    };
    LongHun.prototype.postStageActive = function (bytes) {
        var roleIndex = bytes.readShort();
        var type = bytes.readShort();
        var state = bytes.readByte();
        var model = SubRoles.ins().getSubRoleByIndex(roleIndex);
        switch (type + 1) {
            case LongHun.TYPE_LONG_HUN:
                model.loongSoulData.state = state;
                break;
            case LongHun.TYPE_HU_DUN:
                model.shieldData.state = state;
                break;
            case LongHun.TYPE_XUE_YU:
                model.xueyuData.state = state;
                break;
        }
        Activationtongyong.show(0, "龙魂", "jlonghun_01_png");
    };
    LongHun.prototype.canShowRedPointByType = function (roleID, type) {
        var role = SubRoles.ins().getSubRoleByIndex(roleID);
        if (!role)
            return false;
        var costExp = 0;
        var currExp = 0;
        var config = null;
        var nextConfig = null;
        var stageConfig = null;
        switch (type) {
            case LongHun.TYPE_LONG_HUN:
                if (role.loongSoulData.state == 0) {
                    var level = GlobalConfig.LoongSoulBaseConfig.openlv;
                    if (Actor.level < level) {
                        return false;
                    }
                    return true;
                }
                config = GlobalConfig.LoongSoulConfig[role.loongSoulData.level];
                nextConfig = GlobalConfig.LoongSoulConfig[role.loongSoulData.level + 1];
                stageConfig = GlobalConfig.LoongSoulStageConfig[role.loongSoulData.stage];
                currExp = role.loongSoulData.exp;
                break;
            case LongHun.TYPE_HU_DUN:
                config = GlobalConfig.ShieldConfig[role.shieldData.level];
                nextConfig = GlobalConfig.ShieldConfig[role.shieldData.level + 1];
                stageConfig = GlobalConfig.ShieldStageConfig[role.shieldData.stage];
                currExp = role.shieldData.exp;
                break;
        }
        if (!nextConfig)
            return false;
        if (this.assert(config && stageConfig, "config or stageConfig is null"))
            return false;
        var itemNum = UserBag.ins().getBagGoodsCountById(0, config.itemId);
        if (stageConfig.normalCostTip == undefined) {
            return false;
        }
        return itemNum >= stageConfig.normalCostTip;
    };
    LongHun.prototype.canShowRedPointInRole = function (roleID) {
        var arr = [LongHun.TYPE_LONG_HUN];
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var value = arr_1[_i];
            if (this.canShowRedPointByType(roleID, value)) {
                return true;
            }
        }
        return false;
    };
    LongHun.prototype.canShowRedPointInAll = function () {
        for (var i = 0; i < 3; i++) {
            if (this.canShowRedPointInRole(i)) {
                return true;
            }
        }
        if (HeartMethodRedPoint.ins().redPoint)
            return true;
        if (HunguRedPoint.ins().redPoint)
            return true;
        return false;
    };
    LongHun.prototype.canUpgradeByType = function (roleID, type) {
        var role = SubRoles.ins().getSubRoleByIndex(roleID);
        if (role) {
            var config = null;
            var stageConfig = null;
            switch (type) {
                case LongHun.TYPE_LONG_HUN:
                    config = GlobalConfig.LoongSoulConfig[role.loongSoulData.level];
                    stageConfig = GlobalConfig.LoongSoulStageConfig[role.loongSoulData.stage];
                    break;
                case LongHun.TYPE_HU_DUN:
                    config = GlobalConfig.ShieldConfig[role.shieldData.level];
                    stageConfig = GlobalConfig.ShieldStageConfig[role.shieldData.stage];
                    break;
            }
            var itemNum = UserBag.ins().getBagGoodsCountById(0, config.itemId);
            return itemNum > 0;
        }
        return false;
    };
    LongHun.prototype.canUpgradeinAll = function () {
        var arr = [LongHun.TYPE_LONG_HUN, LongHun.TYPE_HU_DUN, LongHun.TYPE_XUE_YU];
        for (var i = 0; i < 3; i++) {
            for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
                var value = arr_2[_i];
                if (this.canUpgradeByType(i, value) == true) {
                    return true;
                }
            }
        }
        return false;
    };
    LongHun.prototype.canGradeupLoongSoul = function (type) {
        var boolList = [false, false, false];
        var roleLen = SubRoles.ins().subRolesLen;
        for (var i = 0; i < roleLen; i++) {
            boolList[i] = this.canShowRedPointInRole(i);
        }
        return boolList;
    };
    LongHun.prototype.assert = function (value, msg) {
        return Assert(value, "[" + egret.getQualifiedClassName(this) + "] " + msg);
    };
    LongHun.TYPE_LONG_HUN = 2;
    LongHun.TYPE_HU_DUN = 3;
    LongHun.TYPE_XUE_YU = 4;
    return LongHun;
}(BaseSystem));
__reflect(LongHun.prototype, "LongHun");
var GameSystem;
(function (GameSystem) {
    GameSystem.longhun = LongHun.ins.bind(LongHun);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=LongHun.js.map