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
var EntityShowMgr = (function (_super) {
    __extends(EntityShowMgr, _super);
    function EntityShowMgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.MAX_SHOW_NUM = 3;
        _this.MAX_EFFECT_NUM = 3;
        _this.isOpen = false;
        return _this;
    }
    EntityShowMgr.ins = function () {
        return _super.ins.call(this);
    };
    EntityShowMgr.prototype.changeScene = function () {
        this.isOpen = !EntityHideBody.ins().isOpen;
        if (GameMap.fbType == UserFb.FB_TYPE_NEW_WORLD_BOSS) {
            this.MAX_SHOW_NUM = 5;
        }
        else {
            this.MAX_SHOW_NUM = 3;
        }
    };
    EntityShowMgr.prototype.hideFurtherOtherRole = function () {
        if (this.countShowNum() < this.MAX_SHOW_NUM) {
            return;
        }
        var role = EntityManager.ins().getNoDieRole();
        if (!role)
            return;
        var dis = 0;
        var handle;
        var maxDis = StageUtils.ins().getHeight() >> 1;
        var maxDis2 = maxDis * maxDis;
        var entityList = EntityManager.ins().getAllEntity();
        for (var i in entityList) {
            var entity = entityList[i];
            if (entity.parent && entity.infoModel && entity.team != Team.My && entity.infoModel.type == EntityType.Role) {
                var d = MathUtils.getDistanceX2ByObject(role, entity);
                if (d > maxDis2) {
                    handle = entity.infoModel.handle;
                    break;
                }
                else if (d > dis) {
                    dis = d;
                    handle = entity.infoModel.handle;
                }
            }
        }
        this.hideByHandle(handle);
    };
    EntityShowMgr.prototype.showNearSomeOne = function () {
        if (!this.isOpen)
            return;
        if (this.countShowNum() >= this.MAX_SHOW_NUM) {
            return;
        }
        var role = EntityManager.ins().getNoDieRole();
        if (!role)
            return;
        var dis = Number.MAX_VALUE;
        var handle;
        var maxDis = StageUtils.ins().getWidth() >> 1;
        var maxDis2 = maxDis * maxDis;
        var entityList = EntityManager.ins().getAllEntity();
        for (var i in entityList) {
            var entity = entityList[i];
            if (!entity.parent && entity.infoModel && entity.team != Team.My && entity.infoModel.type == EntityType.Role) {
                var d = MathUtils.getDistanceX2ByObject(role, entity);
                if (d < maxDis2) {
                    handle = entity.infoModel.handle;
                    break;
                }
                else if (d < dis) {
                    dis = d;
                    handle = entity.infoModel.handle;
                }
            }
        }
        this.showByHandle(handle);
    };
    EntityShowMgr.prototype.showHideSomeOne = function (handle) {
        if (!this.isOpen)
            return;
        this.hideFurtherOtherRole();
        this.showByHandle(handle);
    };
    EntityShowMgr.prototype.hideByHandle = function (handle) {
        if (GameLogic.ins().currAttackHandle == handle || this.countShowNum() < this.MAX_SHOW_NUM) {
            return;
        }
        var list = EntityManager.ins().getEntityRelationHandle(handle);
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var char = list_1[_i];
            DisplayUtils.removeFromParent(char);
            char.hideBodyContainer();
        }
    };
    EntityShowMgr.prototype.showByHandle = function (handle) {
        if (!this.isOpen)
            return;
        if (this.countShowNum() >= this.MAX_SHOW_NUM) {
            return;
        }
        var list = EntityManager.ins().getEntityRelationHandle(handle);
        for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
            var char = list_2[_i];
            GameLogic.ins().addEntity(char);
            char.showBodyContainer();
        }
    };
    EntityShowMgr.prototype.checkShowSkillEffect = function () {
        if (this.countShowNum() < this.MAX_EFFECT_NUM) {
            return true;
        }
        return false;
    };
    EntityShowMgr.prototype.checkShowHandle = function (handle) {
        if (!this.isOpen)
            return true;
        var ins = EntityManager.ins();
        var masterHandle = ins.getRootMasterHandle(handle);
        if (!masterHandle)
            return true;
        if (this.countShowNum() >= this.MAX_SHOW_NUM) {
            if (ins.masterList[masterHandle] && ins.masterList[masterHandle].length && ins.masterList[masterHandle][0].parent) {
                return true;
            }
            return false;
        }
        return true;
    };
    EntityShowMgr.prototype.countShowNum = function () {
        var showNum = 0;
        if (EntityHideBody.ins().isOpen) {
            return showNum;
        }
        var masterList = EntityManager.ins().masterList;
        for (var k in masterList) {
            var masters = masterList[k];
            if (masters && masters.length) {
                if (masters[0].parent && masters[0].team != Team.My && masters[0].infoModel && masters[0].infoModel.type == EntityType.Role) {
                    showNum += 1;
                }
            }
        }
        return showNum;
    };
    return EntityShowMgr;
}(BaseClass));
__reflect(EntityShowMgr.prototype, "EntityShowMgr");
//# sourceMappingURL=EntityShowMgr.js.map