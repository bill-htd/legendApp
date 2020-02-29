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
var GuildIconRule = (function (_super) {
    __extends(GuildIconRule, _super);
    function GuildIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.showMessage = [
            Actor.ins().postLevelChange,
        ];
        _this.updateMessage = [
            GuildRedPoint.ins().postHanghui
        ];
        return _this;
    }
    GuildIconRule.prototype.checkShowIcon = function () {
        return (Actor.level >= GlobalConfig.GuildConfig.openLevel);
    };
    GuildIconRule.prototype.checkShowRedPoint = function () {
        return GuildRedPoint.ins().hanghui;
    };
    GuildIconRule.prototype.tapExecute = function () {
        if (Actor.level >= GlobalConfig.GuildConfig.openLevel) {
            if (Guild.ins().guildID == undefined || Guild.ins().guildID == 0)
                ViewManager.ins().open(GuildApplyWin);
            else
                ViewManager.ins().open(GuildMap);
        }
        else {
            UserTips.ins().showTips(GlobalConfig.GuildConfig.openLevel + "\u7EA7\u5F00\u542F");
        }
    };
    return GuildIconRule;
}(RuleIconBase));
__reflect(GuildIconRule.prototype, "GuildIconRule");
//# sourceMappingURL=GuildIconRule.js.map