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
var HunguRedPoint = (function (_super) {
    __extends(HunguRedPoint, _super);
    function HunguRedPoint() {
        var _this = _super.call(this) || this;
        _this.itemPoints = [];
        _this.roleTabs = [];
        _this.redPoint = false;
        _this.associated(_this.postRedPoint, _this.postRoleRedPoint);
        _this.associated(_this.postRoleRedPoint, Hungu.ins().postHunguInfo, Hungu.ins().postHunguItems, Hungu.ins().postHunyu, Hungu.ins().postHunguItemUpgrade, UserBag.ins().postItemCountChange, UserZs.ins().postZsLv, GameLogic.ins().postSubRoleChange);
        return _this;
    }
    HunguRedPoint.prototype.postRedPoint = function () {
        var old = this.redPoint;
        this.redPoint = false;
        for (var i = 0; i < this.roleTabs.length; i++) {
            if (this.roleTabs[i]) {
                this.redPoint = true;
            }
        }
        return old != this.redPoint;
    };
    HunguRedPoint.prototype.postRoleRedPoint = function () {
        var ins = Hungu.ins();
        for (var r = 0; r < 3; r++) {
            var role = SubRoles.ins().getSubRoleByIndex(r);
            if (!role) {
                this.roleTabs[r] = false;
                continue;
            }
            for (var i = 0; i < GlobalConfig.HunGuConf.equipCount; i++) {
                this.roleTabs[r] = this.HunguItemRedPoint(role.index, i);
                if (this.roleTabs[r])
                    break;
            }
        }
        return true;
    };
    HunguRedPoint.prototype.HunguItemRedPoint = function (roleId, pos) {
        var ins = Hungu.ins();
        var redPoint = false;
        var items = ins.getHunguItemsList(pos);
        if (items.length) {
            if (ins.hunguData[roleId] && ins.hunguData[roleId].items[pos].itemId) {
            }
            else {
                redPoint = true;
                return redPoint;
            }
        }
        redPoint = ins.getHunyuRedPoint(roleId, pos);
        if (redPoint)
            return true;
        if (ins.hunguData[roleId] && ins.hunguData[roleId].items[pos].itemId) {
            redPoint = ins.getUpgradeRedPoint(ins.hunguData[roleId].items[pos].itemId);
            if (redPoint)
                return redPoint;
        }
        return redPoint;
    };
    return HunguRedPoint;
}(BaseSystem));
__reflect(HunguRedPoint.prototype, "HunguRedPoint");
var GameSystem;
(function (GameSystem) {
    GameSystem.hunguRedPoint = HunguRedPoint.ins.bind(HunguRedPoint);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=HunguRedPoint.js.map