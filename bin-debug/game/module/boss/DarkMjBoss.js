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
var DarkMjBoss = (function (_super) {
    __extends(DarkMjBoss, _super);
    function DarkMjBoss() {
        var _this = _super.call(this) || this;
        _this.isDarkBoss = false;
        _this.isBossDie = false;
        _this.observe(GameLogic.ins().postEnterMap, function () {
            if (GameMap.fbType == UserFb.FB_TYPE_DARK_BOSS) {
                _this.postEnterGwBoss();
            }
            else if (_this.isDarkBoss) {
                _this.postEscGwBoss();
            }
            _this.checkIsShowBtn();
        });
        _this.observe(GameLogic.ins().postCreateOtherEntity, _this.onCreateEntity);
        _this.observe(UserBoss.ins().postRemainTime, _this.onDie);
        _this.observe(UserBoss.ins().postWorldBossEndTime, _this.onBossDisappear);
        _this.observe(UserBoss.ins().postBaseHideBossInfo, _this.onHideBossAppear);
        return _this;
    }
    DarkMjBoss.prototype.postEnterGwBoss = function () {
        this.isDarkBoss = GameMap.fbType == UserFb.FB_TYPE_DARK_BOSS;
        this.isBossDie = false;
        this.showView(true);
    };
    DarkMjBoss.prototype.postEscGwBoss = function () {
        this.isDarkBoss = false;
        this.isBossDie = false;
        this.showView(false);
        ViewManager.ins().close(BossEndView);
    };
    DarkMjBoss.prototype.showView = function (show) {
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
    DarkMjBoss.prototype.onCreateEntity = function (model) {
        if (!model)
            return;
        if (this.isDarkBoss) {
            if (model.type == EntityType.Monster && model.team == Team.Monster && !model.masterHandle) {
                UserBoss.ins().monsterID = model.configID;
                UserBoss.ins().bossHandler = model.handle;
                this.showView(true);
            }
        }
    };
    DarkMjBoss.prototype.onDie = function () {
        if (this.isDarkBoss) {
            if (this.isRoleDie()) {
                ViewManager.ins().open(WorldBossBeKillWin);
            }
            else {
                ViewManager.ins().close(WorldBossBeKillWin);
            }
        }
    };
    DarkMjBoss.prototype.isRoleDie = function () {
        if (UserBoss.ins().reliveTime > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    DarkMjBoss.prototype.onBossDisappear = function () {
        if (this.isDarkBoss) {
            this.showView(false);
            this.isBossDie = true;
            ViewManager.ins().open(BossEndView);
        }
    };
    DarkMjBoss.prototype.checkIsShowBtn = function () {
        if (this.checkCanShow() && GameMap.sceneInMain()) {
            if (!ViewManager.ins().isShow(HideBossBtnWin))
                ViewManager.ins().open(HideBossBtnWin);
        }
        else {
            ViewManager.ins().close(HideBossBtnWin);
        }
    };
    DarkMjBoss.prototype.checkCanShow = function () {
        var endTime = UserBoss.ins().hideBossData.endTime;
        return UserBoss.ins().hideBossData.id && endTime && (DateUtils.formatMiniDateTime(endTime) > GameServer.serverTime);
    };
    DarkMjBoss.prototype.onHideBossAppear = function () {
        var _this = this;
        if (this.checkCanShow()) {
            if (this.isDarkBoss) {
                var entity = EntityManager.ins().getEntityByHandle(UserBoss.ins().bossHandler);
                if (entity && entity.parent) {
                    var mc_1 = ObjectPool.pop("MovieClip");
                    var callFunc_1 = function () {
                        if (!ViewManager.ins().isShow(HideBossBtnWin))
                            ViewManager.ins().open(HideBossBtnWin, 1);
                        mc_1.removeEventListener(egret.Event.REMOVED_FROM_STAGE, callFunc_1, _this);
                        mc_1.destroy();
                    };
                    mc_1.playFile(RES_DIR_EFF + "luckyboss_dragon_up", 1, function () {
                        callFunc_1();
                    });
                    mc_1.x = entity.x;
                    mc_1.y = entity.y;
                    mc_1.addEventListener(egret.Event.REMOVED_FROM_STAGE, callFunc_1, this);
                    entity.parent.addChild(mc_1);
                }
                else {
                    ViewManager.ins().open(HideBossBtnWin, 1);
                }
            }
            else {
                ViewManager.ins().open(HideBossBtnWin);
            }
        }
        else {
            ViewManager.ins().close(HideBossBtnWin);
        }
    };
    DarkMjBoss.prototype.canMove = function () {
        return !this.isBossDie;
    };
    DarkMjBoss.ins = function () {
        return _super.ins.call(this);
    };
    return DarkMjBoss;
}(BaseSystem));
__reflect(DarkMjBoss.prototype, "DarkMjBoss");
var GameSystem;
(function (GameSystem) {
    GameSystem.darkMjBoss = DarkMjBoss.ins.bind(DarkMjBoss);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=DarkMjBoss.js.map