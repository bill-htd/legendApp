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
var WorldBossWin = (function (_super) {
    __extends(WorldBossWin, _super);
    function WorldBossWin() {
        var _this = _super.call(this) || this;
        _this.selectIndex = 0;
        _this.isTopLevel = true;
        return _this;
    }
    WorldBossWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "WorldBossSkin";
        this.bossImage = new MovieClip;
        this.bossImage.scaleX = -1;
        this.bossImage.scaleY = 1;
        this.bossImage.x = 330;
        this.bossImage.y = 380;
        this.challengeBtn.y = 400;
    };
    return WorldBossWin;
}(BaseEuiView));
__reflect(WorldBossWin.prototype, "WorldBossWin");
ViewManager.ins().reg(WorldBossWin, LayerManager.UI_Main);
//# sourceMappingURL=WorldBossWin.js.map