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
var GwBoss = (function (_super) {
    __extends(GwBoss, _super);
    function GwBoss() {
        var _this = _super.call(this) || this;
        _this.isGwBoss = false;
        _this.isGwTopBoss = false;
        _this.isBossDie = false;
        _this.observe(GameLogic.ins().postEnterMap, function () {
            if (GameMap.fbType == UserFb.FB_TYPE_GOD_WEAPON || GameMap.fbType == UserFb.FB_TYPE_GOD_WEAPON_TOP) {
                _this.postEnterGwBoss();
            }
            else if (_this.isGwBoss || _this.isGwTopBoss) {
                _this.postEscGwBoss();
            }
        });
        _this.observe(GameLogic.ins().postCreateOtherEntity, _this.onCreateEntity);
        _this.observe(UserBoss.ins().postRemainTime, _this.onDie);
        _this.observe(UserBoss.ins().postWorldBossEndTime, _this.onBossDisappear);
        return _this;
    }
    GwBoss.prototype.postEnterGwBoss = function () {
        this.isGwBoss = GameMap.fbType == UserFb.FB_TYPE_GOD_WEAPON;
        this.isGwTopBoss = GameMap.fbType == UserFb.FB_TYPE_GOD_WEAPON_TOP;
        this.isBossDie = false;
        this.showView(true);
    };
    GwBoss.prototype.postEscGwBoss = function () {
        this.isGwBoss = false;
        this.isGwTopBoss = false;
        this.isBossDie = false;
        this.showView(false);
        ViewManager.ins().close(BossEndView);
    };
    GwBoss.prototype.showView = function (show) {
        if (show) {
            if (!ViewManager.ins().isShow(BossBelongPanel)) {
                ViewManager.ins().open(BossBelongPanel);
            }
            if (!ViewManager.ins().isShow(BossBloodPanel)) {
                ViewManager.ins().open(BossBloodPanel);
            }
            if (!ViewManager.ins().isShow(TargetListPanel)) {
                ViewManager.ins().open(TargetListPanel);
            }
        }
        else {
            ViewManager.ins().close(BossBelongPanel);
            ViewManager.ins().close(BossBloodPanel);
            ViewManager.ins().close(TargetListPanel);
        }
    };
    GwBoss.prototype.onCreateEntity = function (model) {
        if (!model)
            return;
        if (this.isGwBoss || this.isGwTopBoss) {
            if (model.type == EntityType.Monster && model.team == Team.Monster && !model.masterHandle) {
                UserBoss.ins().monsterID = model.configID;
                UserBoss.ins().bossHandler = model.handle;
                this.showView(true);
            }
        }
    };
    GwBoss.prototype.onDie = function () {
        if (this.isGwBoss || this.isGwTopBoss) {
            if (this.isRoleDie()) {
                ViewManager.ins().open(WorldBossBeKillWin);
            }
            else {
                ViewManager.ins().close(WorldBossBeKillWin);
            }
        }
    };
    GwBoss.prototype.isRoleDie = function () {
        var isDie = false;
        if (this.isGwTopBoss) {
            var role = EntityManager.ins().getNoDieRole();
            if (!role || role.infoModel.getAtt(AttributeType.atHp) <= 0) {
                isDie = true;
            }
        }
        if (UserBoss.ins().reliveTime > 0 || isDie) {
            return true;
        }
        else {
            return false;
        }
    };
    GwBoss.prototype.onBossDisappear = function () {
        if (this.isGwBoss || this.isGwTopBoss) {
            this.showView(false);
            this.isBossDie = true;
            ViewManager.ins().open(BossEndView);
        }
    };
    GwBoss.prototype.canMove = function () {
        return !this.isBossDie;
    };
    GwBoss.ins = function () {
        return _super.ins.call(this);
    };
    return GwBoss;
}(BaseSystem));
__reflect(GwBoss.prototype, "GwBoss");
var GameSystem;
(function (GameSystem) {
    GameSystem.gwboss = GwBoss.ins.bind(GwBoss);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=GwBoss.js.map