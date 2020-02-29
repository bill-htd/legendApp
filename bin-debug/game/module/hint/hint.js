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
var Hint = (function (_super) {
    __extends(Hint, _super);
    function Hint() {
        var _this = _super.call(this) || this;
        _this.presceneid = -1;
        _this.prefbId = -1;
        _this.killType = 0;
        _this.picKillBoss = "";
        _this.observe(GameLogic.ins().postEnterMap, _this.postSeceneIn);
        return _this;
    }
    Hint.ins = function () {
        return _super.ins.call(this);
    };
    Hint.prototype.checkHint = function (cfg, targetType, config, parma) {
        if (!cfg) {
            switch (targetType) {
                case Hint.TARTYPE_WELCOME:
                    this.showHint(targetType);
                    return true;
                case Hint.TARTYPE_KILL_BOSS:
                    for (var key in GlobalConfig.HintConfig) {
                        var hcf = GlobalConfig.HintConfig[key];
                        if (hcf.target[0].guanqiaId == parma.gqid) {
                            this.showHint(targetType, hcf.image);
                            return true;
                        }
                    }
                    break;
            }
            return false;
        }
        if (cfg) {
            var pic = this.HitConfig(cfg, targetType);
            if (pic != null) {
                this.showHint(targetType, pic);
                return true;
            }
        }
        else {
            for (var key in config) {
                var cfg_1 = config[key];
                var pic = this.HitConfig(cfg_1, targetType);
                if (pic != null) {
                    this.showHint(targetType, pic);
                    return true;
                }
            }
        }
        return false;
    };
    Hint.prototype.HitConfig = function (data, targetType) {
        var cfg = data;
        for (var key in GlobalConfig.HintConfig) {
            var hcf = GlobalConfig.HintConfig[key];
            if (hcf.targetType != targetType)
                continue;
            switch (targetType) {
                case Hint.TARTYPE_ACH_BEF:
                    if (cfg.achievementId == hcf.target[0].achievementId &&
                        cfg.taskId == hcf.target[0].taskId)
                        if (hcf.target[0].isfull && hcf.target[0].isfull > 0 && UserBag.ins().getSurplusCount())
                            return hcf.image;
                    break;
                case Hint.TARTYPE_ACH_AFT:
                    if (cfg.achievementId == hcf.target[0].achievementId &&
                        cfg.taskId == hcf.target[0].taskId)
                        return hcf.image;
                    break;
                case Hint.TARTYPE_SCE_IN:
                    if (GameMap.mapID == hcf.target[0].sceneid &&
                        GameMap.fubenID == hcf.target[0].fbId &&
                        this.presceneid == hcf.target[0].presceneid &&
                        this.prefbId == hcf.target[0].prefbId)
                        return hcf.image;
                    break;
            }
        }
        return null;
    };
    Hint.prototype.showHint = function (targetType, pic) {
        if (!pic && targetType == Hint.TARTYPE_WELCOME) {
            var cfg = GlobalConfig.HintConfig[1];
            pic = cfg.image;
            UserTips.ins().showHintTips(pic);
            return;
        }
        if (pic && pic != "")
            UserTips.ins().showHintTips(pic);
    };
    Hint.prototype.postWelcome = function () {
        this.checkHint(null, Hint.TARTYPE_WELCOME);
    };
    Hint.prototype.postAchievementBef = function (cfg) {
        if (!cfg) {
            return;
        }
        this.checkHint(cfg, Hint.TARTYPE_ACH_BEF);
    };
    Hint.prototype.postAchievementAft = function (ad) {
        if (!ad) {
            return;
        }
        var cfg;
        for (var key in GlobalConfig.AchievementTaskConfig) {
            var dcfg = GlobalConfig.AchievementTaskConfig[key];
            if (dcfg.achievementId == ad.achievementId && dcfg.taskId == ad.id) {
                cfg = dcfg;
                break;
            }
        }
        if (!cfg) {
            return;
        }
        this.checkHint(cfg, Hint.TARTYPE_ACH_AFT);
    };
    Hint.prototype.postSeceneIn = function () {
        if (this.presceneid == -1)
            this.presceneid = GameMap.mapID;
        if (this.prefbId == -1)
            this.prefbId = GameMap.fubenID;
        var cfg = GlobalConfig.ScenesConfig[GameMap.mapID];
        if (!cfg) {
            return;
        }
        this.checkHint(cfg, Hint.TARTYPE_SCE_IN);
        this.presceneid = GameMap.mapID;
        this.prefbId = GameMap.fubenID;
    };
    Hint.prototype.postKillBoss = function (cfg) {
        this.checkHint(cfg, Hint.TARTYPE_KILL_BOSS);
    };
    Hint.prototype.postKillBossEx = function (guanqiaId) {
        this.checkHint(null, Hint.TARTYPE_KILL_BOSS, null, { gqid: guanqiaId });
    };
    Hint.TARTYPE_WELCOME = 1;
    Hint.TARTYPE_ACH_BEF = 2;
    Hint.TARTYPE_ACH_AFT = 3;
    Hint.TARTYPE_SCE_IN = 4;
    Hint.TARTYPE_KILL_BOSS = 5;
    return Hint;
}(BaseSystem));
__reflect(Hint.prototype, "Hint");
var GameSystem;
(function (GameSystem) {
    GameSystem.hint = Hint.ins.bind(Hint);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=hint.js.map