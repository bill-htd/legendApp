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
var BossEndView = (function (_super) {
    __extends(BossEndView, _super);
    function BossEndView() {
        var _this = _super.call(this) || this;
        _this.skinName = "BossEndSkin";
        return _this;
    }
    BossEndView.prototype.open = function () {
        this.observe(UserBoss.ins().postWorldBossEndTime, this.worldBossEnd);
        this.worldBossEnd();
    };
    BossEndView.prototype.close = function () {
        TimerManager.ins().removeAll(this);
    };
    BossEndView.prototype.worldBossEnd = function () {
        var _this = this;
        this.winnerName.text = "\u6700\u7EC8\u5F52\u5C5E\u8005\u662F\uFF1A" + UserBoss.ins().winner;
        var time = Math.ceil((UserBoss.ins().worldBossEndTime - egret.getTimer()) / 1000);
        this.leftTime.text = DateUtils.getFormatTimeByStyle(time, DateUtils.STYLE_4);
        TimerManager.ins().removeAll(this);
        TimerManager.ins().doTimer(1000, time, function () {
            time--;
            _this.leftTime.text = DateUtils.getFormatTimeByStyle(time, DateUtils.STYLE_4);
            if (time == 0) {
                UserFb.ins().sendExitFb();
            }
        }, this);
    };
    return BossEndView;
}(BaseEuiView));
__reflect(BossEndView.prototype, "BossEndView");
ViewManager.ins().reg(BossEndView, LayerManager.Main_View);
//# sourceMappingURL=BossEndView.js.map