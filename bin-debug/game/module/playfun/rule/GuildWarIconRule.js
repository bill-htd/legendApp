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
var GuildWarIconRule = (function (_super) {
    __extends(GuildWarIconRule, _super);
    function GuildWarIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.showMessage = [
            GuildWar.ins().postGuildWarStarInfo
        ];
        return _this;
    }
    GuildWarIconRule.prototype.checkShowIcon = function () {
        return (GuildWar.ins().getModel().getIsShowGuildWarBtn() == 1);
    };
    GuildWarIconRule.prototype.getEffName = function (redPointNum) {
        return undefined;
    };
    GuildWarIconRule.prototype.tapExecute = function () {
        if (Guild.ins().guildID == undefined || Guild.ins().guildID == 0) {
            UserTips.ins().showTips("|C:0xf3311e&T:加入公会后才能参与龙城争霸活动|");
            return;
        }
        GuildWar.ins().requestWinGuildInfo();
        ViewManager.ins().close(GuildMap);
        ViewManager.ins().open(GuildWarMainWin);
    };
    return GuildWarIconRule;
}(RuleIconBase));
__reflect(GuildWarIconRule.prototype, "GuildWarIconRule");
//# sourceMappingURL=GuildWarIconRule.js.map