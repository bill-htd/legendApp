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
var HeartMethodRedPoint = (function (_super) {
    __extends(HeartMethodRedPoint, _super);
    function HeartMethodRedPoint() {
        var _this = _super.call(this) || this;
        _this.roleTabs = {};
        _this.roleTabs = {};
        _this.redPoint = false;
        _this.associated(_this.postHeartMethodRedPoint, _this.postHeartRoleRedPoint);
        _this.associated(_this.postHeartRoleRedPoint, HeartMethod.ins().postHeartInfo, HeartMethod.ins().postHeartUpLevel, HeartMethod.ins().postOneKeyDecompose, UserBag.ins().postItemCountChange, UserZs.ins().postZsLv, GameLogic.ins().postSubRoleChange);
        return _this;
    }
    HeartMethodRedPoint.prototype.postHeartMethodRedPoint = function () {
        var old = this.redPoint;
        if (!HeartMethod.ins().checkOpen()) {
            this.redPoint = false;
            return old != this.redPoint;
        }
        for (var i = 0; i < SubRoles.ins().subRolesLen; i++) {
            if (!this.roleTabs[i])
                continue;
            for (var k in this.roleTabs[i]) {
                if (this.roleTabs[i][k]) {
                    this.redPoint = true;
                    return this.redPoint;
                }
            }
        }
        this.redPoint = false;
        return old != this.redPoint;
    };
    HeartMethodRedPoint.prototype.postHeartRoleRedPoint = function () {
        if (!HeartMethod.ins().checkOpen()) {
            return;
        }
        for (var i = 0; i < SubRoles.ins().subRolesLen; i++) {
            if (!this.roleTabs[i]) {
                this.roleTabs[i] = {};
            }
            var hmMap = HeartMethod.ins().HeartMethodInfo[i];
            if (!hmMap)
                hmMap = {};
            for (var k in GlobalConfig.HeartMethodConfig) {
                var hmdata = hmMap[k];
                if (!hmdata) {
                    if (HeartMethod.ins().heartOpenCondition(GlobalConfig.HeartMethodConfig[k].id)) {
                        this.roleTabs[i][GlobalConfig.HeartMethodConfig[k].id] = true;
                    }
                    else {
                        this.roleTabs[i][GlobalConfig.HeartMethodConfig[k].id] = false;
                    }
                    continue;
                }
                if (!this.roleTabs[i][hmdata.id])
                    this.roleTabs[i][hmdata.id] = false;
                if (!hmdata.id) {
                    this.roleTabs[i][hmdata.id] = true;
                }
                else {
                    this.roleTabs[i][hmdata.id] = false;
                    if (!HeartMethod.ins().heartOpenCondition(hmdata.id))
                        continue;
                    var cost = HeartMethod.ins().calcHeartCost(i, hmdata.id);
                    if (cost) {
                        var idata = UserBag.ins().getBagItemById(cost.itemid);
                        var mycount = idata ? idata.count : 0;
                        this.roleTabs[i][hmdata.id] = mycount >= GlobalConfig.HeartMethodStageConfig[hmdata.id][hmdata.stage].normalCostTip;
                        if (this.roleTabs[i][hmdata.id]) {
                            if (HeartMethod.ins().heartUpCondition(i, hmdata.id))
                                continue;
                            else
                                this.roleTabs[i][hmdata.id] = false;
                        }
                    }
                    if (hmdata.isUp && !HeartMethod.ins().isHeartMax(i, hmdata.id)) {
                        this.roleTabs[i][hmdata.id] = true;
                        continue;
                    }
                    var hmdconfig = GlobalConfig.HeartMethodConfig[hmdata.id];
                    LIST: for (var pos = 0; pos < hmdconfig.posList.length; pos++) {
                        var slotId = HeartMethod.ins().getHeartSlotItemId(i, hmdata.id, pos + 1);
                        if (slotId) {
                            if (HeartMethod.ins().calcHeartSlotCost(slotId)) {
                                this.roleTabs[i][hmdata.id] = true;
                            }
                            else {
                                for (var j = 0; j < hmdata.slots.length; j++) {
                                    var hid = hmdata.slots[j];
                                    var sId = HeartMethod.ins().calcHeartSlotChange(i, hmdata.id, hid);
                                    this.roleTabs[i][hmdata.id] = sId ? true : false;
                                    if (sId)
                                        break LIST;
                                }
                            }
                        }
                        else {
                            var configId = HeartMethod.ins().getHeartSlotItemIdWear(i, hmdata.id, pos + 1);
                            this.roleTabs[i][hmdata.id] = configId ? true : false;
                            if (configId)
                                break;
                        }
                    }
                    if (this.roleTabs[i][hmdata.id])
                        continue;
                }
            }
        }
    };
    HeartMethodRedPoint.prototype.checkHeartRedPoint = function (roleId, heartId) {
        if (!this.roleTabs[roleId]) {
            this.roleTabs[roleId] = {};
        }
        return this.roleTabs[roleId][heartId] ? true : false;
    };
    return HeartMethodRedPoint;
}(BaseSystem));
__reflect(HeartMethodRedPoint.prototype, "HeartMethodRedPoint");
var GameSystem;
(function (GameSystem) {
    GameSystem.heartmethodredpoint = HeartMethodRedPoint.ins.bind(HeartMethodRedPoint);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=HeartMethodRedPoint.js.map