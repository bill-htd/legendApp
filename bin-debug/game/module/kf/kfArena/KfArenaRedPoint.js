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
var KfArenaRedPoint = (function (_super) {
    __extends(KfArenaRedPoint, _super);
    function KfArenaRedPoint() {
        var _this = _super.call(this) || this;
        _this.redpoint_1 = 0;
        _this.redpoint_2 = 0;
        _this.redpoint_3 = 0;
        _this.associated(_this.postRedPoint, KfArenaSys.ins().postJoinRewards, KfArenaSys.ins().postPlayerInfo);
        return _this;
    }
    KfArenaRedPoint.prototype.postRedPoint = function () {
        this.redpoint_1 = this.redpoint_2 = this.redpoint_3 = this.redpoint = 0;
        var ins = KfArenaSys.ins();
        if (!ins.isOpen())
            return 0;
        this.redpoint_1 = ins.times;
        this.redpoint_2 = ins.getJoinRedPoint();
        this.redpoint_3 = ins.getDuanRedPoint();
        this.redpoint = this.redpoint_1 + this.redpoint_2 + this.redpoint_3;
        return this.redpoint;
    };
    KfArenaRedPoint.ins = function () {
        return _super.ins.call(this);
    };
    return KfArenaRedPoint;
}(BaseSystem));
__reflect(KfArenaRedPoint.prototype, "KfArenaRedPoint");
var GameSystem;
(function (GameSystem) {
    GameSystem.kfArenaRedPoint = KfArenaRedPoint.ins.bind(KfArenaRedPoint);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=KfArenaRedPoint.js.map