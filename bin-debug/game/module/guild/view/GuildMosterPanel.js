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
var GuildMosterPanel = (function (_super) {
    __extends(GuildMosterPanel, _super);
    function GuildMosterPanel() {
        var _this = _super.call(this) || this;
        _this.bossmc = new MovieClip;
        _this.bossmc.scaleX = -0.5;
        _this.bossmc.scaleY = 0.5;
        _this.bossmc.x = 0;
        _this.bossmc.y = 0;
        _this.addChild(_this.bossmc);
        _this.staticMc = new MovieClip;
        _this.addChild(_this.staticMc);
        _this.staticMc.y = -60;
        _this.addTouchEvent(_this, _this.onTap);
        return _this;
    }
    GuildMosterPanel.prototype.onTap = function (e) {
        if (this.start.robberStart == 1) {
            UserTips.ins().showTips("|C:0xf3311e&T:正在被挑战中|");
            return;
        }
        GuildRobber.ins().sendRobberChanger(this.index);
        ViewManager.ins().close(GuildMap);
    };
    GuildMosterPanel.prototype.update = function (info, bossnum, p) {
        this.start = info;
        var monster = '';
        this.bossmc.playFile(RES_DIR_EFF + ("monster" + monster + "_" + p + "s"), -1);
        this.index = bossnum + 1;
        this.staticMc.playFile(RES_DIR_EFF + (info.robberStart == 0 ? "ketiaozhan" : "zhandouzhong"), -1);
    };
    return GuildMosterPanel;
}(BaseView));
__reflect(GuildMosterPanel.prototype, "GuildMosterPanel");
//# sourceMappingURL=GuildMosterPanel.js.map