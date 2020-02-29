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
var KFBossRedpoint = (function (_super) {
    __extends(KFBossRedpoint, _super);
    function KFBossRedpoint() {
        var _this = _super.call(this) || this;
        _this.redpoints = [];
        _this.associated(_this.postRedPoint, KFBossSys.ins().postBossInfo, KFBossSys.ins().postBossRevive, KFBossSys.ins().postInfo);
        return _this;
    }
    KFBossRedpoint.prototype.postRedPoint = function () {
        this.redpoints = [];
        this.redpoint = 0;
        if (!KFBossSys.ins().isOpen())
            return 0;
        for (var _i = 0, _a = KFBossSys.ins().fbInfo; _i < _a.length; _i++) {
            var info = _a[_i];
            if (!info)
                continue;
            var index = info.dpId;
            var dp = GlobalConfig.CrossBossConfig[info.dpId];
            var boo = UserZs.ins().lv >= dp.levelLimit[0] / 1000 && UserZs.ins().lv <= dp.levelLimit[1] / 1000;
            if (boo)
                boo = (info.flagRefTimer - egret.getTimer() < 0 && KFBossSys.ins().flagTimes > 0) || (info.bossRefTimer - egret.getTimer() < 0 && KFBossSys.ins().bossTimes > 0);
            this.redpoints[info.dpId] = boo ? 1 : 0;
        }
        this.redpoint = this.redpoints.indexOf(1) > -1 ? 1 : 0;
        return this.redpoint;
    };
    KFBossRedpoint.ins = function () {
        return _super.ins.call(this);
    };
    return KFBossRedpoint;
}(BaseSystem));
__reflect(KFBossRedpoint.prototype, "KFBossRedpoint");
var GameSystem;
(function (GameSystem) {
    GameSystem.kfBossRedpoint = KFBossRedpoint.ins.bind(KFBossRedpoint);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=KFBossRedpoint.js.map