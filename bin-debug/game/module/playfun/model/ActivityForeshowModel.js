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
var ActivityForeshowModel = (function (_super) {
    __extends(ActivityForeshowModel, _super);
    function ActivityForeshowModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActivityForeshowModel.ins = function () {
        return _super.ins.call(this);
    };
    ActivityForeshowModel.prototype.getForeshow = function () {
        for (var i in GlobalConfig.NewFuncNoticeConfig) {
            var cfg = GlobalConfig.NewFuncNoticeConfig[i];
            var isIn = this.checkOpenTime(cfg.open, cfg.close);
            if (isIn && Actor.level >= cfg.openLv)
                return cfg;
        }
        return null;
    };
    ActivityForeshowModel.prototype.checkOpenTime = function (openDay, closeDay) {
        var isIn = (GameServer.serverOpenDay >= openDay && GameServer.serverOpenDay < closeDay);
        return isIn;
    };
    ActivityForeshowModel.prototype.getRemainTime = function () {
        var remainTime = 0;
        var cfg = this.getForeshow();
        if (cfg) {
            var endDate = new Date(DateUtils.formatMiniDateTime(GameServer._serverZeroTime));
            endDate.setDate(endDate.getDate() + cfg.close);
            endDate.setHours(0, 0, 0, 0);
            var endTime = endDate.getTime();
            var currentTime = new Date().getTime();
            remainTime = endTime - currentTime;
            if (remainTime < 0)
                remainTime = 0;
        }
        remainTime = remainTime / 1000;
        return remainTime;
    };
    return ActivityForeshowModel;
}(BaseClass));
__reflect(ActivityForeshowModel.prototype, "ActivityForeshowModel");
//# sourceMappingURL=ActivityForeshowModel.js.map