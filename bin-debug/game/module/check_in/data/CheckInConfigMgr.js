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
var CheckInConfigMgr = (function (_super) {
    __extends(CheckInConfigMgr, _super);
    function CheckInConfigMgr() {
        return _super.call(this) || this;
    }
    CheckInConfigMgr.ins = function () {
        return _super.ins.call(this);
    };
    CheckInConfigMgr.prototype.getMonthRewardCfg_Daily = function () {
        if (!this.monthListConfig || this.monthListConfig.length <= 0) {
            this.monthListConfig = [];
            var config = GlobalConfig.MonthSignConfig;
            for (var j in config) {
                this.monthListConfig.push(config[j]);
            }
        }
        return this.monthListConfig;
    };
    CheckInConfigMgr.prototype.getSingleRewardCfg_Daily = function (index) {
        var monthCfg = this.getMonthRewardCfg_Daily();
        if (monthCfg) {
            var singleCfg = monthCfg[index - 1];
            if (this.assert(singleCfg, "MonthSignConfig(" + index + ")"))
                return null;
            return singleCfg;
        }
        return null;
    };
    CheckInConfigMgr.prototype.getVipCfg_Daily = function (vipLevel) {
        var cfg = GlobalConfig.MonthSignVipConfig[vipLevel];
        if (this.assert(cfg, "MonthSignVipConfig(" + vipLevel + ")"))
            return null;
        return cfg;
    };
    CheckInConfigMgr.prototype.assert = function (value, msg) {
        return Assert(value, msg + " is null");
    };
    return CheckInConfigMgr;
}(BaseClass));
__reflect(CheckInConfigMgr.prototype, "CheckInConfigMgr");
//# sourceMappingURL=CheckInConfigMgr.js.map