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
var VipGiftIconRule = (function (_super) {
    __extends(VipGiftIconRule, _super);
    function VipGiftIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.showMessage = [
            Actor.ins().postLevelChange,
            UserVip.ins().postVipGiftBuy,
        ];
        _this.updateMessage = [
            UserVip.ins().postUpdateVipData,
            UserVip.ins().postVipGiftBuy,
            Recharge.ins().postUpdateRechargeEx,
            Actor.ins().postYbChange,
        ];
        return _this;
    }
    VipGiftIconRule.prototype.checkShowIcon = function () {
        if (!OpenSystem.ins().checkSysOpen(SystemType.VIPGIFT)) {
            return false;
        }
        var maxId = Object.keys(GlobalConfig.VipGiftConfig).length;
        var state = UserVip.ins().vipGiftState;
        for (var id = 1; id <= maxId; id++) {
            var hfTimes = GlobalConfig.VipGiftConfig[id].hfTimes;
            hfTimes = hfTimes ? hfTimes : 0;
            if (GameServer._hefuCount >= hfTimes && (state[id - 1].state & 1) == 0) {
                return true;
            }
        }
        return false;
    };
    VipGiftIconRule.prototype.checkShowRedPoint = function () {
        var vip = UserVip.ins().lv;
        for (var id in GlobalConfig.VipGiftConfig) {
            var config = GlobalConfig.VipGiftConfig[id];
            var hfTimes = config.hfTimes;
            hfTimes = hfTimes ? hfTimes : 0;
            if (vip >= config.vipLv && GameServer._hefuCount >= hfTimes) {
                if (UserVip.ins().getVipGiftRedPoint(+id)) {
                    return 1;
                }
            }
        }
        return 0;
    };
    VipGiftIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(VipGiftWin);
    };
    return VipGiftIconRule;
}(RuleIconBase));
__reflect(VipGiftIconRule.prototype, "VipGiftIconRule");
//# sourceMappingURL=VipGiftIconRule.js.map