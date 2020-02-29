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
var DevildomBossModel = (function (_super) {
    __extends(DevildomBossModel, _super);
    function DevildomBossModel() {
        return _super.call(this) || this;
    }
    DevildomBossModel.prototype.getCurBossIdByIndex = function (index) {
        var range = GlobalConfig.DevilBossConfig[index].openBossList;
        return range[0] || range[1];
    };
    DevildomBossModel.prototype.getCurFbIndex = function () {
        var devSys = DevildomSys.ins();
        if (devSys.historyId) {
            return devSys.historyId - 1;
        }
        var idList = [];
        for (var id in devSys.killedState) {
            if (!devSys.killedState[id])
                idList.push(id);
        }
        if (idList.length > 0)
            return idList[MathUtils.limit(0, idList.length) >> 0] - 1;
        return MathUtils.limit(0, 3) >> 0;
    };
    return DevildomBossModel;
}(BaseClass));
__reflect(DevildomBossModel.prototype, "DevildomBossModel");
//# sourceMappingURL=DevildomBossModel.js.map