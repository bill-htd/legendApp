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
var WJBattlefieldTrusteeshipAi = (function (_super) {
    __extends(WJBattlefieldTrusteeshipAi, _super);
    function WJBattlefieldTrusteeshipAi() {
        var _this = _super.call(this) || this;
        _this.AI_INTERVAL = 1000;
        return _this;
    }
    WJBattlefieldTrusteeshipAi.ins = function () {
        return _super.ins.call(this);
    };
    WJBattlefieldTrusteeshipAi.prototype.startAi = function () {
        if (!WJBattlefieldSys.ins().isWJBattle)
            return;
        MessageCenter.addListener(MapView.moveComplete, this.moveEnd, this);
        TimerManager.ins().doTimer(this.AI_INTERVAL, 0, this.runLogic, this);
        this.state = TrusteeshipAiState.Normal;
    };
    WJBattlefieldTrusteeshipAi.prototype.closeAi = function () {
        MessageCenter.ins().removeAll(this);
        TimerManager.ins().remove(this.runLogic, this);
        var mainRole = EntityManager.ins().getNoDieRole();
        mainRole.stopMove();
        mainRole.playAction(EntityAction.STAND);
    };
    WJBattlefieldTrusteeshipAi.prototype.runLogic = function () {
        var mainRole = EntityManager.ins().getNoDieRole();
        if (mainRole.AI_STATE != AI_State.Stand)
            return;
        switch (this.state) {
            case TrusteeshipAiState.Normal:
                var flagData = this.findCanCollectFlag();
                if (flagData) {
                    if (this.checkCanCollectByDis(flagData)) {
                        this.state = TrusteeshipAiState.Collect;
                        for (var i = 0; i < 3; i++) {
                            var flagInfos = WJBattlefieldSys.ins().flagInfos[i + 1];
                            if (flagInfos && flagInfos == WJBattlefieldSys.ins().myCampId)
                                continue;
                            var nearFlagHandle = this.findNearFlag();
                            if (nearFlagHandle) {
                                GameLogic.ins().postChangeAttrPoint(nearFlagHandle);
                            }
                            break;
                        }
                    }
                    else {
                        GameMap.moveTo(flagData.x, flagData.y);
                    }
                }
                else {
                    var flagDt = this.findCampFlag();
                    GameMap.moveTo(flagDt.x, flagDt.y);
                }
                break;
            case TrusteeshipAiState.Collect:
                break;
            case TrusteeshipAiState.Attack:
                var enemy = this.checkNearbyEnemy();
                if (enemy && enemy.infoModel) {
                    GameLogic.ins().postChangeAttrPoint(enemy.infoModel.handle);
                }
                else {
                    this.state = TrusteeshipAiState.Normal;
                }
                break;
        }
    };
    WJBattlefieldTrusteeshipAi.prototype.moveEnd = function (e) {
        if (e.team != Team.My)
            return;
        var flagData = this.findCanCollectFlag();
        if (flagData) {
            this.state = TrusteeshipAiState.Collect;
        }
        else {
            this.state = TrusteeshipAiState.Attack;
        }
    };
    WJBattlefieldTrusteeshipAi.prototype.findCanCollectFlag = function () {
        var list = [];
        var count = 3;
        var mainRole = EntityManager.ins().getNoDieRole();
        for (var i = 0; i < count; i++) {
            if (true) {
                var flagData = {};
                flagData.distance = MathUtils.getDistance(mainRole.x, mainRole.y, flagData.x, flagData.y);
                list.push(flagData);
            }
        }
        var compareFn = function (a, b) {
            if (a.distance > b.distance)
                return 1;
            else if (a.distance < b.distance)
                return -1;
            else
                return 0;
        };
        list.sort(compareFn);
        if (list.length)
            return list[0];
        return null;
    };
    WJBattlefieldTrusteeshipAi.prototype.findCampFlag = function () {
        var list = [];
        var count = 3;
        var mainRole = EntityManager.ins().getNoDieRole();
        for (var i = 0; i < count; i++) {
            if (true) {
                var flagData = {};
                list.push(flagData);
            }
        }
        if (list.length)
            return list[MathUtils.limit(0, list.length - 1)];
        return null;
    };
    WJBattlefieldTrusteeshipAi.prototype.findNearFlag = function () {
        var disList = [];
        var mainRole = EntityManager.ins().getNoDieRole();
        if (!mainRole)
            return 0;
        for (var _i = 0, _a = WJBattlefieldSys.ins().flagHandle; _i < _a.length; _i++) {
            var index = _a[_i];
            var handle = WJBattlefieldSys.ins().flagHandle[index];
            var entity = EntityManager.ins().getEntityByHandle(handle);
            if (entity && entity.infoModel) {
                if (WJBattlefieldSys.ins().flagInfos[index] && WJBattlefieldSys.ins().flagInfos[index] == WJBattlefieldSys.ins().myCampId)
                    continue;
                var dis = MathUtils.getDistance(entity.x, entity.y, mainRole.x, mainRole.y);
                disList[WJBattlefieldSys.ins().flagHandle.indexOf(handle)] = dis;
            }
        }
        disList.sort(Algorithm.sortAsc);
        if (disList[1])
            return WJBattlefieldSys.ins().flagHandle[disList[1]];
        return 0;
    };
    WJBattlefieldTrusteeshipAi.prototype.checkNearbyEnemy = function () {
        var mainRole = EntityManager.ins().getNoDieRole();
        var range = 6;
        var list = EntityManager.ins().screeningTargetByPos(mainRole, false, 4, range);
        for (var n = list.length - 1; n > -1; n--) {
            if (list[n] && list[n].infoModel && list[n].infoModel.camp == WJBattlefieldSys.ins().myCampId) {
                list.splice(n, 1);
            }
        }
        if (list.length)
            return list[MathUtils.limit(0, list.length - 1)];
        return null;
    };
    WJBattlefieldTrusteeshipAi.prototype.checkCanCollectByDis = function (flagData) {
        var mainRole = EntityManager.ins().getNoDieRole();
        var distance = MathUtils.getDistance(mainRole.x, mainRole.y, flagData.x, flagData.y);
        return distance <= 50;
    };
    return WJBattlefieldTrusteeshipAi;
}(BaseClass));
__reflect(WJBattlefieldTrusteeshipAi.prototype, "WJBattlefieldTrusteeshipAi");
var TrusteeshipAiState;
(function (TrusteeshipAiState) {
    TrusteeshipAiState[TrusteeshipAiState["Normal"] = 0] = "Normal";
    TrusteeshipAiState[TrusteeshipAiState["Collect"] = 1] = "Collect";
    TrusteeshipAiState[TrusteeshipAiState["Attack"] = 2] = "Attack";
})(TrusteeshipAiState || (TrusteeshipAiState = {}));
//# sourceMappingURL=WJBattlefieldTrusteeshipAi.js.map