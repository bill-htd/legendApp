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
var ShareIconRule = (function (_super) {
    __extends(ShareIconRule, _super);
    function ShareIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.showMessage = [
            PfActivity.ins().postInviteInfoUpdate,
            PfActivity.ins().postShare,
            Actor.ins().postLevelChange
        ];
        _this.updateMessage = [
            PfActivity.ins().postInviteInfoUpdate
        ];
        return _this;
    }
    ShareIconRule.prototype.checkShowIcon = function () {
        return OpenSystem.ins().checkSysOpen(SystemType.SHARE) && PfActivity.ins().shareState != -1 && PfActivity.ins().wxInviteCount < 3;
    };
    ShareIconRule.prototype.checkShowRedPoint = function () {
        var t = (DateUtils.formatMiniDateTime(PfActivity.ins().inviteTime) - GameServer.serverTime);
        TimerManager.ins().removeAll(this);
        var b = t <= 0 ? 1 : 0;
        if (!b)
            TimerManager.ins().doTimer(t, 1, this.updateTime, this);
        return b;
    };
    ShareIconRule.prototype.updateTime = function () {
        this.update();
    };
    ShareIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(YqWin);
    };
    return ShareIconRule;
}(RuleIconBase));
__reflect(ShareIconRule.prototype, "ShareIconRule");
//# sourceMappingURL=ShareIconRule.js.map