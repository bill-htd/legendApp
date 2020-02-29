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
var DevildomRedPoint = (function (_super) {
    __extends(DevildomRedPoint, _super);
    function DevildomRedPoint() {
        var _this = _super.call(this) || this;
        _this.redPoint = 0;
        _this.redPoints = [];
        _this.associated(_this.postRedPoint, DevildomSys.ins().postBossInfo, DevildomSys.ins().postInfo);
        return _this;
    }
    DevildomRedPoint.prototype.postRedPoint = function () {
        this.redPoint = 0;
        var devildomSys = DevildomSys.ins();
        if (!devildomSys.isOpen())
            return;
        for (var id in devildomSys.killedState) {
            this.redPoints[id] = !devildomSys.killedState[id] && (!devildomSys.historyId || devildomSys.historyId == id);
        }
        this.redPoint = this.redPoints.indexOf(true) > -1 ? 1 : 0;
    };
    return DevildomRedPoint;
}(BaseSystem));
__reflect(DevildomRedPoint.prototype, "DevildomRedPoint");
var GameSystem;
(function (GameSystem) {
    GameSystem.devildomRedPoint = DevildomRedPoint.ins.bind(DevildomRedPoint);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=DevildomRedPoint.js.map