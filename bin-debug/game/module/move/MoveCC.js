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
var MoveCC = (function (_super) {
    __extends(MoveCC, _super);
    function MoveCC() {
        var _this = _super.call(this) || this;
        _this.observe(MapView.onGridClick, _this.mapClick);
        _this.observe(MapView.moveComplete, _this.touchTarget);
        return _this;
    }
    MoveCC.prototype.mapClick = function (_a) {
        var target = _a.target, x = _a.x, y = _a.y;
        if (BattleCC.ins().isBattle() && !BattleCC.ins().canMove())
            return;
        if ((GwBoss.ins().isGwBoss || GwBoss.ins().isGwTopBoss) && !GwBoss.ins().canMove())
            return;
        if (DarkMjBoss.ins().isDarkBoss)
            return;
        this.findTarget = target;
        var role = EntityManager.ins().getNoDieRole();
        if (role == null || role.isHardStraight)
            return;
        if (CityCC.ins().isCity || GwBoss.ins().isGwBoss || GwBoss.ins().isGwTopBoss)
            CityCC.ins().sendStopAI();
        if (BattleCC.ins().isBattle() || PaoDianCC.ins().isPaoDian || KFBossSys.ins().isKFBossBattle || DevildomSys.ins().isDevildomBattle || KfArenaSys.ins().isKFArena)
            GameLogic.ins().stopAI();
        if (target && target.infoModel) {
            if (target.infoModel.type == EntityType.Npc || target.infoModel.type == EntityType.Mine) {
                var pos = GameMap.getPosRangeRandom(target.x, target.y, DirUtil.get8DirBy2Point(target, role));
                x = pos[0] * GameMap.CELL_SIZE + Math.floor(MathUtils.limit(0.2, 1) * GameMap.CELL_SIZE);
                y = pos[1] * GameMap.CELL_SIZE + Math.floor(MathUtils.limit(0.2, 1) * GameMap.CELL_SIZE);
            }
        }
        if (!GameMap.sceneInMine() && !TargetListCC.ins().isShow) {
            RoleAI.ins().selfRoleStopActack();
            GameMap.myMoveTo(x, y, this.findComplete);
            return;
        }
        GameMap.moveTo(x, y);
    };
    MoveCC.prototype.findComplete = function () {
    };
    MoveCC.prototype.touchTarget = function (e) {
        if (e.team != Team.My)
            return;
        if (this.findTarget && this.findTarget.infoModel) {
            if (this.findTarget.infoModel.type == EntityType.Npc) {
                var role = EntityManager.ins().getNoDieRole();
                if (role == null || role.isHardStraight)
                    return;
                var size = GameMap.CELL_SIZE;
                var tx = SysSetting.ins().getValue("mapClickTx") * size;
                var ty = SysSetting.ins().getValue("mapClickTy") * size;
                if (Math.abs(role.x - tx) <= size && Math.abs(role.y - ty) <= size) {
                    var config = GlobalConfig.NpcBaseConfig[this.findTarget.infoModel.configID];
                    var control = config.controlTarget;
                    if (control && control[0])
                        ViewManager.ins().open(control[0]);
                }
                else
                    return;
            }
            else if (this.findTarget.infoModel.type == EntityType.Mine) {
                ViewManager.ins().open(MineRobWin, this.findTarget.infoModel);
            }
            else if (this.findTarget.infoModel.type == EntityType.Transfer) {
                if (GameMap.sceneInMine()) {
                    Mine.ins().sendSceneChange(this.findTarget.infoModel.configID);
                }
            }
        }
        this.findTarget = null;
    };
    return MoveCC;
}(BaseSystem));
__reflect(MoveCC.prototype, "MoveCC");
var GameSystem;
(function (GameSystem) {
    GameSystem.movecc = MoveCC.ins.bind(MoveCC);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=MoveCC.js.map