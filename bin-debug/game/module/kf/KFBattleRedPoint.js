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
var KFBattleRedPoint = (function (_super) {
    __extends(KFBattleRedPoint, _super);
    function KFBattleRedPoint() {
        var _this = _super.call(this) || this;
        _this.redPoint1 = 0;
        _this.redPoint2 = 0;
        _this.redPoint = 0;
        _this.associated(_this.postRedPoint1, WJBattlefieldSys.ins().postInfo);
        _this.associated(_this.postRedPoint2, KFBossRedpoint.ins().postRedPoint);
        _this.associated(_this.postRedPoint, _this.postRedPoint1, _this.postRedPoint2);
        return _this;
    }
    KFBattleRedPoint.ins = function () {
        return _super.ins.call(this);
    };
    KFBattleRedPoint.prototype.postRedPoint1 = function () {
        if (WJBattlefieldSys.ins().overCounts > 0) {
            this.redPoint1 = 1;
            return true;
        }
        return false;
    };
    KFBattleRedPoint.prototype.postRedPoint2 = function () {
        this.redPoint2 = KFBossRedpoint.ins().redpoint;
        return this.redPoint2;
    };
    KFBattleRedPoint.prototype.postRedPoint = function () {
        this.redPoint = this.redPoint1 + this.redPoint2;
        return this.redPoint;
    };
    return KFBattleRedPoint;
}(BaseSystem));
__reflect(KFBattleRedPoint.prototype, "KFBattleRedPoint");
var GameSystem;
(function (GameSystem) {
    GameSystem.kfBattleRedpoint = KFBattleRedPoint.ins.bind(KFBattleRedPoint);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=KFBattleRedPoint.js.map