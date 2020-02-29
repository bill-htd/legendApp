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
var UserForge = (function (_super) {
    __extends(UserForge, _super);
    function UserForge() {
        var _this = _super.call(this) || this;
        _this.sysId = PackageID.strongthen;
        _this.regNetMsg(2, _this.doForgeUpdata);
        _this.regNetMsg(5, _this.postMeltItem);
        _this.observe(UserBag.ins().postItemAdd, _this.delaySeekItem);
        _this.observe(UserBag.ins().postItemDel, _this.delaySeekItem);
        _this.observe(UserBag.ins().postItemChange, _this.delaySeekItem);
        _this.observe(Actor.ins().postSoulChange, _this.delaySeekItem);
        return _this;
    }
    Object.defineProperty(UserForge, "CONDITION_ZHUZAO", {
        get: function () {
            return GlobalConfig.StoneOpenConfig[0].openLv;
        },
        enumerable: true,
        configurable: true
    });
    UserForge.ins = function () {
        return _super.ins.call(this);
    };
    UserForge.prototype.doForgeUpdata = function (bytes) {
        var roleId = bytes.readShort();
        var index = SubRoles.ins().getSubRoleByIndex(roleId).parseForgeChange(bytes, this.sysId);
        this.postForgeUpdate(this.sysId, index);
    };
    UserForge.prototype.postForgeUpdate = function (sysid, index) {
        if (index === void 0) { index = 0; }
        return [sysid, index];
    };
    UserForge.prototype.postForgeTips = function (b) {
        return b ? 1 : 0;
    };
    UserForge.prototype.sendUpGrade = function (roleId, pos) {
        var bytes = this.getBytes(2);
        bytes.writeShort(roleId);
        bytes.writeShort(pos);
        this.sendToServer(bytes);
    };
    UserForge.prototype.delaySeekItem = function () {
        if (!TimerManager.ins().isExists(this.seekForgeItem, this))
            TimerManager.ins().doTimer(60, 1, this.seekForgeItem, this);
    };
    UserForge.prototype.seekForgeItem = function () {
        var isReturn = false;
        var len = UserBag.ins().getBagItemNum(0);
        for (var i = 0; i < len; i++) {
            var item = UserBag.ins().getBagGoodsByIndex(0, i);
            switch (item.itemConfig.id) {
                case 200002:
                    isReturn = this.forgeHint(0, item.count);
                    break;
                case 200003:
                    isReturn = this.forgeHint(ForgeWin.Page_Select_ZhuLing, item.count);
                    break;
            }
            if (isReturn)
                break;
        }
        if (!isReturn) {
            isReturn = this.forgeHint(ForgeWin.Page_Select_Gem, Actor.soul);
        }
        if (!isReturn) {
            for (var roleIndex = 0; roleIndex < SubRoles.ins().subRolesLen; roleIndex++) {
                isReturn = Weapons.ins().checkRedPoint(roleIndex);
                if (isReturn)
                    break;
            }
        }
        this.postForgeTips(isReturn);
    };
    UserForge.prototype.getForgeConfigByPos = function (pos, lv, configType) {
        var config = this.getForgeConfig(configType);
        return config[pos] && config[pos][lv];
    };
    UserForge.prototype.getForgeConfig = function (configType) {
        this.forgeConfigDic = this.forgeConfigDic || {};
        if (!this.forgeConfigDic[configType]) {
            var list = void 0;
            switch (configType) {
                case ForgeWin.Page_Select_Boost:
                    list = GlobalConfig.EnhanceAttrConfig;
                    break;
                case ForgeWin.Page_Select_ZhuLing:
                    list = GlobalConfig.ZhulingAttrConfig;
                    break;
                case ForgeWin.Page_Select_Gem:
                    list = GlobalConfig.StoneLevelConfig;
                    break;
                case 3:
                    break;
            }
            var config = this.forgeConfigDic[configType] = {};
            for (var index in list) {
                var conf = list[index];
                if (!config[conf.posId]) {
                    config[conf.posId] = {};
                }
                config[conf.posId][conf.level] = list[index];
            }
        }
        return this.forgeConfigDic[configType];
    };
    UserForge.prototype.getEnhanceCostConfigByLv = function (lv) {
        var list = GlobalConfig.EnhanceCostConfig;
        return list[lv];
    };
    UserForge.prototype.getStoneLevelCostConfigByLv = function (lv) {
        var list = GlobalConfig.StoneLevelCostConfig;
        var index;
        for (index in list) {
            var config = list[index];
            if (config.level == lv)
                return config;
        }
        return null;
    };
    UserForge.prototype.getZhulingCostConfigByLv = function (lv) {
        var list = GlobalConfig.ZhulingCostConfig;
        var index;
        for (index in list) {
            var config = list[index];
            if (config.level == lv)
                return config;
        }
        return null;
    };
    UserForge.prototype.jingLianCanUp = function () {
        var len = SubRoles.ins().subRolesLen;
        var b = false;
        for (var roleIndex = 0; roleIndex < len; roleIndex++) {
            var role = SubRoles.ins().getSubRoleByIndex(roleIndex);
            var index = role.getMinEquipIndexByType(1);
            var lv = role.getEquipByIndex(index).zhuling;
            var costNum = UserForge.ins().getZhulingCostConfigByLv(lv + 1).count;
            if (costNum) {
                var goodId = UserForge.ins().getZhulingCostConfigByLv(lv + 1).itemId;
                var goodsNum = UserBag.ins().getBagGoodsCountById(0, goodId);
                if (goodsNum >= costNum) {
                    b = true;
                    break;
                }
            }
        }
        return b;
    };
    UserForge.prototype.getTupoCostConfigByLv = function (lv) {
        return null;
    };
    UserForge.prototype.forgeHint = function (type, itemNum) {
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            var role = SubRoles.ins().getSubRoleByIndex(i);
            var index = role.getMinEquipIndexByType(type);
            var lv = this.getForgeLv(type, role, index);
            var costNum = this.getForgeCount(type, lv);
            if (costNum) {
                if (itemNum >= costNum) {
                    if (type != ForgeWin.Page_Select_Gem) {
                        UserForge.ins().postForgeTips(true);
                        return true;
                    }
                    else {
                        if (Actor.level >= UserForge.CONDITION_ZHUZAO) {
                            UserForge.ins().postForgeTips(true);
                            return true;
                        }
                    }
                }
            }
        }
        UserForge.ins().postForgeTips(false);
        return false;
    };
    UserForge.prototype.getForgeLv = function (type, role, index) {
        switch (type) {
            case ForgeWin.Page_Select_Boost:
                return role.getEquipByIndex(index).strengthen;
            case ForgeWin.Page_Select_ZhuLing:
                return role.getEquipByIndex(index).zhuling;
            case ForgeWin.Page_Select_Gem:
                return role.getEquipByIndex(index).gem;
            case 3:
                return role.getEquipByIndex(index).tupo;
        }
    };
    UserForge.prototype.getForgeCount = function (type, lv) {
        switch (type) {
            case ForgeWin.Page_Select_Boost:
                var boostConfig = this.getEnhanceCostConfigByLv(lv + 1);
                if (boostConfig)
                    return boostConfig.stoneNum;
                break;
            case ForgeWin.Page_Select_ZhuLing:
                var zhulingConfig = this.getZhulingCostConfigByLv(lv + 1);
                if (zhulingConfig)
                    return zhulingConfig.count;
                break;
            case ForgeWin.Page_Select_Gem:
                var gemConfig = this.getStoneLevelCostConfigByLv(lv + 1);
                if (gemConfig)
                    return gemConfig.soulNum;
                break;
            case 3:
                var tupoConfig = this.getTupoCostConfigByLv(lv + 1);
                if (tupoConfig)
                    return tupoConfig.count;
                break;
        }
        return 0;
    };
    UserForge.prototype.countAllBoostAttr = function (roleId, type, pos, next) {
        if (pos === void 0) { pos = 0; }
        if (next === void 0) { next = false; }
        var attrList = [];
        var roleData = SubRoles.ins().getSubRoleByIndex(roleId);
        for (var i = 0; i < UserEquip.FOEGE_MAX; i++) {
            var cfg = null;
            var level = this.getForgeLv(type, roleData, i);
            if (next && pos == i) {
                level += 1;
            }
            cfg = UserForge.ins().getForgeConfigByPos(i, level, type);
            if (cfg && cfg.attr) {
                attrList = UserForge.AttrAddition(cfg.attr, attrList);
            }
        }
        return attrList;
    };
    UserForge.prototype.isMaxForge = function (role, index) {
        for (var i = 0; i < 8; i++) {
            var level = this.getForgeLv(index, role, index);
            var nextConfig = UserForge.ins().getForgeConfigByPos(index, level + 1, index);
            if (!nextConfig)
                return false;
        }
        return true;
    };
    UserForge.AttrAddition = function (attr1, attr2) {
        var len1 = attr1.length;
        var len2 = attr2.length;
        var attrList = [];
        var attr;
        for (var i = 0; i < len1; i++) {
            attr = AttributeData.copyAttrbute(attr1[i]);
            attrList.push(attr);
        }
        for (var k = 0; k < len2; k++) {
            var flag = false;
            for (var i = 0; i < attrList.length; i++) {
                if (attr2[k].type == attrList[i].type) {
                    attrList[i].value = attrList[i].value + attr2[k].value;
                    flag = true;
                }
            }
            if (!flag) {
                attr = AttributeData.copyAttrbute(attr2[k]);
                attrList.push(attr);
            }
        }
        return attrList;
    };
    UserForge.prototype.sendMeltItem = function (arr) {
        var bytes = this.getBytes(5);
        bytes.writeShort(arr.length);
        for (var i in arr) {
            bytes.writeInt(arr[i].configID);
            bytes.writeInt(arr[i].count);
        }
        this.sendToServer(bytes);
    };
    UserForge.prototype.postMeltItem = function () {
    };
    return UserForge;
}(BaseSystem));
__reflect(UserForge.prototype, "UserForge");
var GameSystem;
(function (GameSystem) {
    GameSystem.userforge = UserForge.ins.bind(UserForge);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=UserForge.js.map