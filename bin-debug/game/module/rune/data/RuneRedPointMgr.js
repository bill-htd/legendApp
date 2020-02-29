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
var RuneRedPointMgr = (function (_super) {
    __extends(RuneRedPointMgr, _super);
    function RuneRedPointMgr() {
        return _super.call(this) || this;
    }
    RuneRedPointMgr.ins = function () {
        return _super.ins.call(this);
    };
    RuneRedPointMgr.prototype.checkSingleUpgrade = function (item) {
        if (!this.checkOpen())
            return false;
        var ic = item.itemConfig;
        if (this.assert(ic, "ItemConfig(" + item.configID + ")"))
            return false;
        var next = RuneConfigMgr.ins().getBaseCfg(item, true);
        if (!next)
            return false;
        var rbc = RuneConfigMgr.ins().getBaseCfg(item);
        if (this.assert(rbc, "RuneBaseConfig"))
            return false;
        var curNum = Actor.runeShatter;
        return curNum >= rbc.expend;
    };
    RuneRedPointMgr.prototype.checkRoleUpgrade = function (roleID) {
        if (!this.checkOpen())
            return false;
        var rdList = RuneDataMgr.ins().getRoleRune(roleID);
        if (rdList) {
            for (var _i = 0, rdList_1 = rdList; _i < rdList_1.length; _i++) {
                var v = rdList_1[_i];
                if (v && v.itemConfig && v.itemConfig.id > 0 && this.checkSingleUpgrade(v)) {
                    return true;
                }
            }
        }
        return false;
    };
    RuneRedPointMgr.prototype.checkAllUpgrade = function () {
        if (!this.checkOpen())
            return false;
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            if (this.checkRoleUpgrade(i)) {
                return true;
            }
        }
        return false;
    };
    RuneRedPointMgr.prototype.checkSingleReplace = function (roleID, item) {
        return false;
    };
    RuneRedPointMgr.prototype.checkRoleReplace = function (roleID) {
        if (!this.checkOpen())
            return false;
        var rdList = RuneDataMgr.ins().getRoleRune(roleID);
        if (rdList) {
            for (var _i = 0, rdList_2 = rdList; _i < rdList_2.length; _i++) {
                var v = rdList_2[_i];
                if (v && v.itemConfig && v.itemConfig.id > 0 && this.checkSingleReplace(roleID, v)) {
                    return true;
                }
            }
        }
        return false;
    };
    RuneRedPointMgr.prototype.checkAllReplace = function () {
        if (!this.checkOpen())
            return false;
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            if (this.checkRoleReplace(i)) {
                return true;
            }
        }
        return false;
    };
    RuneRedPointMgr.prototype.checkSingleInlay = function (roleID, pos) {
        if (!this.checkOpen())
            return false;
        var rplc = RuneConfigMgr.ins().getLockCfg(pos);
        if (this.assert(rplc, "RuneLockPosConfig(" + pos + ")"))
            return false;
        var lockLv = rplc.lockLv;
        var level = SkyLevelModel.ins().cruLevel;
        if (level > lockLv) {
            var rd = RuneDataMgr.ins().getRune(roleID, pos);
            if (rd && rd.configID <= 0) {
                var itemDatas = UserBag.ins().getBagGoodsBySort(1);
                var runeType = 0;
                var rdList = RuneDataMgr.ins().getRoleRune(roleID);
                var canInlay = true;
                for (var _i = 0, itemDatas_1 = itemDatas; _i < itemDatas_1.length; _i++) {
                    var v = itemDatas_1[_i];
                    if (v) {
                        runeType = ItemConfig.getSubType(v.itemConfig);
                        if (runeType > 0 && rdList) {
                            canInlay = true;
                            if (canInlay) {
                                for (var _a = 0, rdList_3 = rdList; _a < rdList_3.length; _a++) {
                                    var rdv = rdList_3[_a];
                                    if (rdv && rdv.itemConfig && rdv.itemConfig.id > 0) {
                                        if (runeType == ItemConfig.getSubType(rdv.itemConfig)) {
                                            canInlay = false;
                                            break;
                                        }
                                    }
                                }
                            }
                            if (canInlay) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    };
    RuneRedPointMgr.prototype.checkRoleInlay = function (roleID) {
        if (!this.checkOpen())
            return false;
        for (var i = 0; i < RuneConfigMgr.ins().getOtherCfg().maxEquip; i++) {
            if (this.checkSingleInlay(roleID, i)) {
                return true;
            }
        }
        return false;
    };
    RuneRedPointMgr.prototype.checkAllInlay = function () {
        if (!this.checkOpen())
            return false;
        var len = SubRoles.ins().subRolesLen;
        for (var i = 0; i < len; i++) {
            if (this.checkRoleInlay(i)) {
                return true;
            }
        }
        return false;
    };
    RuneRedPointMgr.prototype.checkRoleAllSituation = function (roleID) {
        if (!this.checkOpen())
            return false;
        var canShow = this.checkRoleInlay(roleID);
        if (!canShow)
            canShow = this.checkRoleUpgrade(roleID);
        if (!canShow)
            canShow = this.checkRoleReplace(roleID);
        return canShow;
    };
    RuneRedPointMgr.prototype.checkAllSituation = function (exchange) {
        if (exchange === void 0) { exchange = true; }
        if (!this.checkOpen())
            return false;
        var canShow = this.checkAllInlay();
        if (!canShow)
            canShow = this.checkAllUpgrade();
        if (!canShow)
            canShow = this.checkAllReplace();
        if (exchange)
            if (!canShow)
                canShow = this.checkCanExchange();
        return canShow;
    };
    RuneRedPointMgr.prototype.checkCanExchange = function () {
        var data = RuneConfigMgr.ins().getExchangeDataList();
        for (var i = 0; i < data.length; i++) {
            var cfg = data[i];
            if (Actor.runeExchange >= cfg.conversion)
                return true;
        }
        return false;
    };
    RuneRedPointMgr.prototype.checkOpen = function () {
        return Actor.level >= RuneConfigMgr.ins().getOtherCfg().zsLevel;
    };
    RuneRedPointMgr.prototype.assert = function (value, msg) {
        return Assert(value, "[" + egret.getQualifiedClassName(RuneRedPointMgr) + "] " + msg + "is null");
    };
    return RuneRedPointMgr;
}(BaseClass));
__reflect(RuneRedPointMgr.prototype, "RuneRedPointMgr");
//# sourceMappingURL=RuneRedPointMgr.js.map