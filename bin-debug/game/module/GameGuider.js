var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameGuider = (function () {
    function GameGuider() {
    }
    GameGuider.taskGuidance = function (id, taskType) {
        var config;
        switch (taskType) {
            case 0:
                config = GlobalConfig.DailyConfig[id];
                break;
            case 1:
                config = UserTask.ins().getAchieveConfById(id);
                Hint.ins().postAchievementBef(config);
                break;
        }
        switch (config.control) {
            case GuideType.OpenWin:
                if (id == 100082 && String(config.controlTarget[0]) == "LimitTaskView") {
                    if (UserTask.ins().limitTaskEndTime > 0
                        && UserTask.ins().limitTaskState != 0
                        && UserTask.ins().limitTaskEndTime > 0
                        && (UserTask.ins().limitTaskEndTime - Math.floor(GameServer.serverTime / 1000) > 0)) {
                        GameGuider.guidance(config.controlTarget[0], config.controlTarget[1]);
                    }
                    else {
                        GameGuider.guidance("RoleWin", 1);
                    }
                }
                else {
                    GameGuider.guidance(config.controlTarget[0], config.controlTarget[1]);
                }
                break;
            case GuideType.ChallengeBoss:
                this.challengeBoss();
                if (taskType == 1) {
                    var cfg = config;
                    Hint.ins().postKillBoss(cfg);
                }
                break;
            case GuideType.ArtifactGuide:
                Artifact.ins().setGuide();
                break;
            case GuideType.AtkMonster:
                RoleAI.ins().stop();
                var index = config.controlTarget[0];
                var x = UserFb.ins().rPos[index][0].x * GameMap.CELL_SIZE;
                var y = UserFb.ins().rPos[index][0].y * GameMap.CELL_SIZE;
                this.tempMainRole = EntityManager.ins().getNoDieRole();
                GameMap.moveEntity(this.tempMainRole, x, y);
                TimerManager.ins().doTimer(500, 0, this.guideFun, this);
                break;
            case GuideType.AutoPk:
                UserFb.ins().setAutoPk();
                break;
            case GuideType.KillDeer:
                break;
            case GuideType.GuideFb:
                if (Encounter.ins().isEncounter()) {
                    UserTips.ins().showTips("|C:0xf3311e&T:正在挑战附近的人|");
                    return;
                }
                if (UserBag.ins().getSurplusCount() < UserBag.BAG_ENOUGH) {
                    ViewManager.ins().open(BagFullTipsWin);
                    return;
                }
                UserFb.ins().sendIntoGuideFb(config.controlTarget[1]);
                break;
        }
    };
    GameGuider.guideFun = function () {
        if (this.tempMainRole.action == EntityAction.STAND) {
            RoleAI.ins().start();
            TimerManager.ins().remove(this.guideFun, this);
        }
    };
    GameGuider.guidance = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var tparam = param[1] != -1 ? param[1] : null;
        ViewManager.ins().open(param[0], tparam, param[2]);
    };
    GameGuider.challengeBoss = function (func) {
        if (UserBag.ins().getSurplusCount() < UserBag.BAG_ENOUGH) {
            ViewManager.ins().open(BagFullTipsWin);
            return;
        }
        if (UserFb.ins().currentEnergy >= UserFb.ins().energy) {
            if (func && typeof (func) == "function")
                func();
            UserFb.ins().autoPk();
        }
        else {
        }
    };
    GameGuider.startTaskEffect = function () {
        if (!this.taskEffect) {
            this.taskEffect = new TaskEffectView();
        }
        this.taskEffect.start();
    };
    GameGuider.stopTaskEffect = function () {
        if (this.taskEffect) {
            this.taskEffect.stop();
        }
    };
    return GameGuider;
}());
__reflect(GameGuider.prototype, "GameGuider");
var GuideType;
(function (GuideType) {
    GuideType[GuideType["OpenWin"] = 1] = "OpenWin";
    GuideType[GuideType["ChallengeBoss"] = 2] = "ChallengeBoss";
    GuideType[GuideType["ArtifactGuide"] = 3] = "ArtifactGuide";
    GuideType[GuideType["AtkMonster"] = 4] = "AtkMonster";
    GuideType[GuideType["AutoPk"] = 5] = "AutoPk";
    GuideType[GuideType["KillDeer"] = 6] = "KillDeer";
    GuideType[GuideType["GuideFb"] = 7] = "GuideFb";
})(GuideType || (GuideType = {}));
//# sourceMappingURL=GameGuider.js.map