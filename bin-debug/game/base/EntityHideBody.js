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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EntityHideBody = (function (_super) {
    __extends(EntityHideBody, _super);
    function EntityHideBody() {
        var _this = _super.call(this) || this;
        _this.isOpen = false;
        _this.isShow = false;
        _this.showHandles = [];
        _this.showNum = 3;
        _this.storageKey = "hide_fbtype_";
        _this.lastAtkHandle = 0;
        _this.lastFbID = 0;
        _this.observe(GameLogic.ins().postRemoveEntity, _this.onRemoveEntity);
        _this.observe(GameLogic.ins().postAtkTarget, _this.onChangeTarget);
        _this.observe(UserBoss.ins().postRemainTime, _this.onRoleDie);
        _this.observe(CityCC.ins().postRemainTime, _this.onRoleDie);
        _this.observe(DevildomSys.ins().postRevive, _this.onRoleDie);
        _this.observe(KFBossSys.ins().postRevive, _this.onRoleDie);
        return _this;
    }
    EntityHideBody.ins = function () {
        return _super.ins.call(this);
    };
    EntityHideBody.prototype.changeScene = function () {
        if (this.lastFbID != GameMap.fubenID) {
            this.lastFbID = GameMap.fubenID;
            this.isOpen = this.getIsOpen();
            this.showHandles.length = 0;
            this.lastAtkHandle = 0;
            if (this.isOpen) {
                this.isShow = !SysSetting.ins().getBool(this.storageKey + GameMap.fbType);
            }
            this.isOpen ? ViewManager.ins().open(ShieldWin) : ViewManager.ins().close(ShieldWin);
        }
    };
    EntityHideBody.prototype.onCreateEntity = function (model) {
        if (!this.isOpen)
            return;
        if (model.isMy || model.type != EntityType.Role)
            return;
        if (this.updateShowHandles(model.masterHandle, true)) {
            this.sendHandlesToServer();
        }
    };
    EntityHideBody.prototype.setShowState = function (isShow) {
        this.isShow = isShow;
        this.showOrHideEntitys(this.isShow);
        this.sendHandlesToServer();
        SysSetting.ins().setBool(this.storageKey + GameMap.fbType, !isShow);
    };
    EntityHideBody.prototype.checkIsShowBody = function (handle) {
        if (!this.isOpen)
            return true;
        if (!this.isShow)
            return false;
        var masterHandle = EntityManager.ins().getRootMasterHandle(handle);
        if (!masterHandle)
            return true;
        return this.showHandles.indexOf(masterHandle) >= 0;
    };
    EntityHideBody.prototype.onRemoveEntity = function (_a) {
        var handle = _a[0], entity = _a[1];
        if (!this.isOpen)
            return;
        if (entity.isMy || !(entity instanceof CharRole))
            return;
        if (this.updateShowHandles(entity.infoModel.masterHandle, false)) {
            this.sendHandlesToServer();
            this.searchNewHandle();
        }
    };
    EntityHideBody.prototype.updateShowHandles = function (masterHandle, isAdd) {
        if (isAdd && this.showHandles.length >= this.showNum)
            return false;
        var index = this.showHandles.indexOf(masterHandle);
        if (isAdd) {
            if (index == -1) {
                this.showHandles.push(masterHandle);
                return true;
            }
        }
        else {
            if (index >= 0) {
                this.showHandles.splice(index, 1);
                return true;
            }
        }
        return false;
    };
    EntityHideBody.prototype.onChangeTarget = function () {
        if (!this.isOpen)
            return;
        if (GameLogic.ins().currAttackHandle == this.lastAtkHandle)
            return;
        var ms = GameLogic.ins().currAttackHandle;
        var old = this.lastAtkHandle;
        this.lastAtkHandle = ms;
        if (!this.isShow) {
            if (old)
                this.hideEntity(old);
            if (ms)
                this.showEntity(ms);
            this.sendHandlesToServer();
        }
        if (!ms)
            return;
        if (this.showHandles.indexOf(ms) >= 0)
            return;
        if (this.showHandles.length >= this.showNum) {
            var masterHandle = this.showHandles.shift();
            this.hideEntity(masterHandle);
        }
        this.showHandles.push(ms);
        this.showEntity(ms);
        this.sendHandlesToServer();
    };
    EntityHideBody.prototype.onRoleDie = function () {
        if (!this.isOpen)
            return;
        var old = this.lastAtkHandle;
        this.lastAtkHandle = 0;
        if (!this.isShow) {
            if (old) {
                this.hideEntity(old);
                this.sendHandlesToServer();
            }
        }
    };
    EntityHideBody.prototype.searchNewHandle = function () {
        var entityList = EntityManager.ins().getAllEntity();
        for (var i in entityList) {
            var info = entityList[i].infoModel;
            if (info && !info.isMy && info.type == EntityType.Role) {
                if (this.updateShowHandles(info.masterHandle, true)) {
                    this.showEntity(info.masterHandle);
                    break;
                }
            }
        }
    };
    EntityHideBody.prototype.showOrHideEntitys = function (isShow) {
        var msList = this.showHandles;
        for (var _i = 0, msList_1 = msList; _i < msList_1.length; _i++) {
            var ms = msList_1[_i];
            isShow ? this.showEntity(ms) : this.hideEntity(ms);
        }
    };
    EntityHideBody.prototype.showEntity = function (masterHandle) {
        var list = EntityManager.ins().getEntityRelationHandle(masterHandle);
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var char = list_1[_i];
            char.showBodyContainer();
        }
    };
    EntityHideBody.prototype.hideEntity = function (masterHandle) {
        var list = EntityManager.ins().getEntityRelationHandle(masterHandle);
        for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
            var char = list_2[_i];
            char.hideBodyContainer();
        }
    };
    EntityHideBody.prototype.sendHandlesToServer = function () {
        var msList = this.isShow ? this.showHandles : (this.lastAtkHandle ? [this.lastAtkHandle] : []);
        GameLogic.ins().sendGetOtherAttr(msList);
    };
    EntityHideBody.prototype.getIsOpen = function () {
        return !!GlobalConfig.ScenesConfig[GameMap.mapID].hideBodyEff;
    };
    __decorate([
        callDelay(200)
    ], EntityHideBody.prototype, "sendHandlesToServer", null);
    return EntityHideBody;
}(BaseSystem));
__reflect(EntityHideBody.prototype, "EntityHideBody");
//# sourceMappingURL=EntityHideBody.js.map