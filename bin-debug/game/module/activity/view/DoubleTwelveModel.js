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
var DoubleTwelveModel = (function (_super) {
    __extends(DoubleTwelveModel, _super);
    function DoubleTwelveModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DoubleTwelveModel.ins = function () {
        return _super.ins.call(this);
    };
    DoubleTwelveModel.prototype.getNeedRecharge = function (activityId) {
        var data = Activity.ins().doubleTwelveRechargeData[activityId];
        var cfg = GlobalConfig.ActivityType3Config[activityId][1];
        return Math.max(0, cfg.val - data.chongzhiTotal);
    };
    return DoubleTwelveModel;
}(BaseClass));
__reflect(DoubleTwelveModel.prototype, "DoubleTwelveModel");
var GameSystem;
(function (GameSystem) {
    GameSystem.doubleTwelveModel = DoubleTwelveModel.ins.bind(DoubleTwelveModel);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=DoubleTwelveModel.js.map