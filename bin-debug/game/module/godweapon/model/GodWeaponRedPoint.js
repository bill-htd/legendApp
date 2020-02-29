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
var GodWeaponRedPoint = (function (_super) {
    __extends(GodWeaponRedPoint, _super);
    function GodWeaponRedPoint() {
        var _this = _super.call(this) || this;
        _this.gwTaskRed = false;
        _this.gwTaskRed1 = false;
        _this.gwTaskRed2 = false;
        _this.gwTaskRed3 = false;
        _this.godWeaponRed = false;
        _this.gwMjRed = false;
        _this.gwSbRed = false;
        _this.gwSbRed1 = false;
        _this.gwSbRed2 = false;
        _this.gwSbRed3 = false;
        _this.gwBossRp = false;
        _this.gwItem = false;
        _this.associated(_this.postGodWeapon, _this.postGwSb, _this.postGwMj, _this.postgGwBossRp, _this.postGodWeaponItem);
        _this.associated(_this.postGwSb, _this.postGwTab1, _this.postGwTab2, _this.postGwTab3);
        _this.associated(_this.postGwTask, GodWeaponCC.ins().postGwTask, GodWeaponCC.ins().postUpdateInfo, GameLogic.ins().postSubRoleChange);
        _this.associated(_this.postGwMj, GodWeaponCC.ins().postFubenInfo);
        _this.associated(_this.postGwTab1, _this.postGwTask, GodWeaponCC.ins().postUpdateInfo, GodWeaponCC.ins().postUpdateExp);
        _this.associated(_this.postGwTab2, _this.postGwTask, GodWeaponCC.ins().postUpdateInfo, GodWeaponCC.ins().postUpdateExp);
        _this.associated(_this.postGwTab3, _this.postGwTask, GodWeaponCC.ins().postUpdateInfo, GodWeaponCC.ins().postUpdateExp);
        _this.associated(_this.postgGwBossRp, UserBoss.ins().postWorldBoss, GodWeaponCC.ins().postUpdateInfo, UserBoss.ins().postWorldNotice, UserBoss.ins().postUpdateWorldPlayList, Actor.ins().postYbChange, UserBag.ins().postItemDel, UserBag.ins().postItemAdd);
        _this.associated(_this.postGodWeaponItem, UserBag.ins().postItemAdd, UserBag.ins().postItemDel, UserBag.ins().postItemCountChange);
        return _this;
    }
    GodWeaponRedPoint.prototype.postGodWeaponItem = function () {
        return false;
    };
    GodWeaponRedPoint.prototype.postGodWeapon = function () {
        var oldv = this.godWeaponRed;
        this.godWeaponRed = this.gwSbRed || this.gwMjRed || this.gwItem || this.gwBossRp;
        return oldv != this.godWeaponRed;
    };
    GodWeaponRedPoint.prototype.postGwSb = function () {
        var oldv = this.gwSbRed;
        this.gwSbRed = this.gwSbRed1 || this.gwSbRed2 || this.gwSbRed3;
        return oldv != this.gwSbRed;
    };
    GodWeaponRedPoint.prototype.postGwTab1 = function () {
        var oldv = this.gwSbRed1;
        if (this.gwTaskRed1) {
            this.gwSbRed1 = true;
        }
        else if (GodWeaponCC.ins().getWeaponData(1)) {
            this.gwSbRed1 = GodWeaponCC.ins().maxLvRedPoint() || GodWeaponCC.ins().getWeaponData(1).hasRedPoint || GodWeaponCC.ins().getSwRedPoint(1);
            if (!this.gwSbRed1)
                this.gwSbRed1 = GodWeaponCC.ins().weaponIsActive(1) && GodWeaponCC.ins().maxLvRedPoint();
        }
        else {
            this.gwSbRed1 = false;
        }
        return oldv != this.gwSbRed1;
    };
    GodWeaponRedPoint.prototype.postGwTab2 = function () {
        var oldv = this.gwSbRed2;
        if (this.gwTaskRed2) {
            this.gwSbRed2 = true;
        }
        else if (GodWeaponCC.ins().getWeaponData(2)) {
            this.gwSbRed2 = GodWeaponCC.ins().maxLvRedPoint() || GodWeaponCC.ins().getWeaponData(2).hasRedPoint || GodWeaponCC.ins().getSwRedPoint(2);
            if (!this.gwSbRed2)
                this.gwSbRed2 = GodWeaponCC.ins().weaponIsActive(2) && GodWeaponCC.ins().maxLvRedPoint();
        }
        else {
            this.gwSbRed2 = false;
        }
        return oldv != this.gwSbRed2;
    };
    GodWeaponRedPoint.prototype.postGwTab3 = function () {
        var oldv = this.gwSbRed3;
        if (this.gwTaskRed3) {
            this.gwSbRed3 = true;
        }
        else if (GodWeaponCC.ins().getWeaponData(3)) {
            this.gwSbRed3 = GodWeaponCC.ins().maxLvRedPoint() || GodWeaponCC.ins().getWeaponData(3).hasRedPoint || GodWeaponCC.ins().getSwRedPoint(3);
            if (!this.gwSbRed3)
                this.gwSbRed3 = GodWeaponCC.ins().weaponIsActive(3) && GodWeaponCC.ins().maxLvRedPoint();
        }
        else {
            this.gwSbRed3 = false;
        }
        return oldv != this.gwSbRed3;
    };
    GodWeaponRedPoint.prototype.postGwMj = function () {
        var oldv = this.gwMjRed;
        this.gwMjRed = GodWeaponCC.ins().mijintHadRedPoint();
        return oldv != this.gwMjRed;
    };
    GodWeaponRedPoint.prototype.postGwTask = function () {
        var oldv = this.gwTaskRed;
        this.gwTaskRed = false;
        if (GodWeaponCC.ins().taskIsOpen()) {
            var gwTask = GodWeaponCC.ins().gwTask;
            if (gwTask.statue == GwTaskData.DONE || gwTask.statue == GwTaskData.FINISH) {
                this.gwTaskRed = true;
            }
            else if (gwTask.taskIdx == 0 && SubRoles.ins().subRolesLen > GodWeaponCC.ins().weaponDataAry.length) {
                this.gwTaskRed = true;
            }
            if (this.gwTaskRed) {
                for (var i = 1; i <= 3; i++) {
                    if (GodWeaponCC.ins().getWeaponData(i)) {
                        this["gwTaskRed" + i] = false;
                    }
                    else if ((SubRoles.ins().getSubRoleByJob(i) && gwTask.taskIdx == 0) || gwTask.weapon == i) {
                        this["gwTaskRed" + i] = true;
                    }
                    else {
                        this["gwTaskRed" + i] = false;
                    }
                }
            }
            else {
                this.gwTaskRed1 = false;
                this.gwTaskRed2 = false;
                this.gwTaskRed3 = false;
            }
        }
        return true;
    };
    GodWeaponRedPoint.prototype.postgGwBossRp = function () {
        var oldv = this.gwBossRp;
        this.gwBossRp = GodWeaponCC.ins().godWeaponIsOpen() && (UserBoss.ins().checkWorldBossRedPoint(UserBoss.BOSS_SUBTYPE_GODWEAPON) || UserBoss.ins().checkWorldBossRedPoint(UserBoss.BOSS_SUBTYPE_GODWEAPON_TOP));
        return oldv != this.gwBossRp;
    };
    return GodWeaponRedPoint;
}(BaseSystem));
__reflect(GodWeaponRedPoint.prototype, "GodWeaponRedPoint");
var GameSystem;
(function (GameSystem) {
    GameSystem.godweaponRedPoint = GodWeaponRedPoint.ins.bind(GodWeaponRedPoint);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=GodWeaponRedPoint.js.map