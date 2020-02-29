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
var ShenshouRedpoint = (function (_super) {
    __extends(ShenshouRedpoint, _super);
    function ShenshouRedpoint() {
        var _this = _super.call(this) || this;
        _this.redpointEquips1 = [];
        _this.redpointEquips2 = [];
        _this.redpoints = [];
        _this.redpoint = false;
        _this.associated(_this.postRedPoint, _this.postRedPoint1, _this.postRedPoint2, ShenshouSys.ins().postBattleState);
        _this.associated(_this.postRedPoint1, ShenshouSys.ins().postInfo, UserBag.ins().postItemAdd, UserBag.ins().postItemDel, UserBag.ins().postItemCountChange);
        _this.associated(_this.postRedPoint2, ShenshouSys.ins().postInfo, ShenshouSys.ins().postUpdateExp, ShenshouSys.ins().postWearEquip);
        return _this;
    }
    ShenshouRedpoint.prototype.postRedPoint = function () {
        if (!ShenshouModel.ins().checkOpen()) {
            this.redpoint = false;
            return 0;
        }
        this.redpoints = [];
        for (var id in GlobalConfig.ShenShouBase) {
            this.redpoints[id] = this.redpointEquips1[id] && this.redpointEquips1[id].indexOf(1) > -1;
            if (!this.redpoints[id] && this.redpointEquips2[id])
                this.redpoints[id] = this.redpointEquips2[id].indexOf(1) > -1;
            if (!this.redpoints[id]) {
                var data = ShenshouModel.ins().getDataById(parseInt(id));
                this.redpoints[id] = data && data.state == ShenshouState.State_Can && ShenshouModel.ins().isCanBattle();
            }
        }
        this.redpoint = this.redpoints.indexOf(true) > -1;
        return this.redpoint ? 1 : 0;
    };
    ShenshouRedpoint.prototype.postRedPoint1 = function () {
        if (!ShenshouModel.ins().checkOpen()) {
            this.redpointEquips1 = [];
            return;
        }
        for (var id in GlobalConfig.ShenShouBase) {
            var data = ShenshouSys.ins().dataList[id];
            this.redpointEquips1[id] = [];
            for (var i = 1; i <= GlobalConfig.ShenShouConfig.posCount; i++) {
                var list = ShenshouModel.ins().findCanWearEquips(+id, i);
                if (list.length > 0) {
                    this.redpointEquips1[id][i] = 1;
                    if (data && data.equipIDs[i] && ShenshouModel.ins().checkEquipScore(data.equipIDs[i], list[0].id)) {
                        this.redpointEquips1[id][i] = 0;
                    }
                }
                else {
                    this.redpointEquips1[id][i] = 0;
                }
            }
        }
    };
    ShenshouRedpoint.prototype.postRedPoint2 = function () {
        if (!ShenshouModel.ins().checkOpen()) {
            this.redpointEquips2 = [];
            return;
        }
        for (var id in ShenshouSys.ins().dataList) {
            var data = ShenshouSys.ins().dataList[id];
            this.redpointEquips2[id] = [];
            for (var pos = 1; pos <= 5; pos++) {
                if (data.equipIDs[pos] && this.getForgeRedpoint(data.equipIDs[pos], ShenshouSys.ins().exp) && data.state != ShenshouState.State_No) {
                    this.redpointEquips2[id][pos] = 1;
                }
                else {
                    this.redpointEquips2[id][pos] = 0;
                }
            }
        }
    };
    ShenshouRedpoint.prototype.getForgeRedpoint = function (id, exp) {
        return GlobalConfig.ShenShouEquip[id + 1] && exp >= GlobalConfig.ShenShouEquip[id].exp;
    };
    return ShenshouRedpoint;
}(BaseSystem));
__reflect(ShenshouRedpoint.prototype, "ShenshouRedpoint");
var GameSystem;
(function (GameSystem) {
    GameSystem.shenshouRedpoint = ShenshouRedpoint.ins.bind(ShenshouRedpoint);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=ShenshouRedpoint.js.map