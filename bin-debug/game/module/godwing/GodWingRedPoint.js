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
var GodWingRedPoint = (function (_super) {
    __extends(GodWingRedPoint, _super);
    function GodWingRedPoint() {
        var _this = _super.call(this) || this;
        _this.roleTabs = {};
        _this.tabs = {};
        _this.roleTabs = {};
        _this.redPoint = false;
        _this.associated(_this.postGodWingRedPoint, _this.postGodWingItem);
        _this.associated(_this.postGodWingItem, Wing.ins().postWingWear, Wing.ins().postGodWingData, Wing.ins().postWingUpgrade, Wing.ins().postActivate, UserBag.ins().postItemChange, UserBag.ins().postItemAdd);
        _this.associated(_this.postGodWingCompose, UserBag.ins().postItemChange, UserBag.ins().postItemAdd);
        return _this;
    }
    GodWingRedPoint.prototype.postGodWingRedPoint = function () {
        var oldv = this.redPoint;
        this.redPoint = this.tabs[0] || this.tabs[1];
        return oldv != this.redPoint;
    };
    GodWingRedPoint.prototype.postGodWingItem = function () {
        var tab = 0;
        if (!this.roleTabs[tab])
            this.roleTabs[tab] = {};
        var len = 3;
        for (var roleIndex = 0; roleIndex < len; roleIndex++) {
            if (!this.roleTabs[tab])
                this.roleTabs[tab] = {};
            this.roleTabs[tab][roleIndex] = Wing.ins().isWearGodWing(roleIndex);
        }
        this.tabs[tab] = false;
        for (var i in this.roleTabs[tab]) {
            if (this.roleTabs[tab][i])
                this.tabs[tab] = true;
        }
        return true;
    };
    GodWingRedPoint.prototype.postGodWingCompose = function () {
        var tab = 1;
        this.tabs[tab] = Wing.ins().isComposeGodWingAll();
        if (!this.roleTabs[tab])
            this.roleTabs[tab] = {};
        return true;
    };
    GodWingRedPoint.prototype.postGodWingTransfer = function () {
        var tab = 2;
        if (!this.roleTabs[tab])
            this.roleTabs[tab] = {};
        this.tabs[tab] = Boolean(UserBag.ins().getBagGoodsByType(ItemType.TYPE_16));
    };
    GodWingRedPoint.prototype.getGodWingRedPoint = function () {
        if (GameServer.serverOpenDay + 1 < GlobalConfig.WingCommonConfig.openDay) {
            return false;
        }
        for (var i = 0; i < SubRoles.ins().subRolesLen; i++) {
            var wingsData = SubRoles.ins().getSubRoleByIndex(i).wingsData;
            if (wingsData.openStatus) {
                return this.redPoint;
            }
        }
        return false;
    };
    return GodWingRedPoint;
}(BaseSystem));
__reflect(GodWingRedPoint.prototype, "GodWingRedPoint");
var GameSystem;
(function (GameSystem) {
    GameSystem.godwingredpoint = GodWingRedPoint.ins.bind(GodWingRedPoint);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=GodWingRedPoint.js.map