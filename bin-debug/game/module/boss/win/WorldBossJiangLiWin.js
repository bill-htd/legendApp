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
var WorldBossJiangLiWin = (function (_super) {
    __extends(WorldBossJiangLiWin, _super);
    function WorldBossJiangLiWin() {
        var _this = _super.call(this) || this;
        _this.configTimes = 0;
        _this.type = 0;
        return _this;
    }
    WorldBossJiangLiWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "WorldBossJiangLiSkin";
        this.bar.labelDisplay.visible = false;
        this.isTopLevel = true;
    };
    WorldBossJiangLiWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.playGroup.visible = true;
        this.maxPointGroup.visible = false;
        this.myPointGroup.visible = false;
        this.addTouchEvent(this.play, this.onTap);
        this.addTouchEvent(this.giveUp, this.onTap);
        this.observe(UserBoss.ins().postLotteryRan, this.getMyPoint);
        this.observe(UserBoss.ins().postLotteryResult, this.getMaxPoint);
        this.observe(GuildWar.ins().postLotteryPoint, this.getMyPoint);
        this.observe(GuildWar.ins().postLotteryMaxPost, this.getMaxPoint);
        this.type = 0;
        if (param[0]) {
            this.configTimes = GlobalConfig.WorldBossBaseConfig.lotteryTime > 0 ? GlobalConfig.WorldBossBaseConfig.lotteryTime : 10;
            this.type = param[0];
        }
        else {
            this.configTimes = 10;
            this.type = 0;
        }
        this.bar.maximum = 10 * this.configTimes;
        this.refushInfo();
    };
    WorldBossJiangLiWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.play, this.onTap);
        this.removeTouchEvent(this.giveUp, this.onTap);
        TimerManager.ins().remove(this.refushBar, this);
        this.removeObserve();
    };
    WorldBossJiangLiWin.prototype.refushInfo = function () {
        this.times = 0;
        if (this.type == 0) {
            this.goods.data = { type: 1, id: UserBoss.ins().worldPrize, count: 1 };
        }
        else if (this.type == 1) {
            this.goods.data = { type: 1, id: UserBoss.ins().worldPrize, count: 1 };
        }
        TimerManager.ins().doTimer(100, 10 * this.configTimes, this.refushBar, this, this.TimeOver, this);
        this.timeLabel.text = this.configTimes + "\u79D2";
    };
    WorldBossJiangLiWin.prototype.refushBar = function () {
        this.times++;
        var value = 10 * this.configTimes - this.times;
        this.bar.value = value;
        this.timeLabel.text = Math.floor(this.configTimes - this.times / 10) + "秒";
        if (value <= 0) {
            ViewManager.ins().close(WorldBossJiangLiWin);
        }
    };
    WorldBossJiangLiWin.prototype.TimeOver = function () {
        ViewManager.ins().close(WorldBossJiangLiWin);
    };
    WorldBossJiangLiWin.prototype.getMyPoint = function (point) {
        this.play.touchEnabled = false;
        this.myPoint.text = point + "";
        this.myPointGroup.visible = true;
    };
    WorldBossJiangLiWin.prototype.getMaxPoint = function (info) {
        this.maxPoint.text = info[1];
        this.playerName.text = info[0];
        this.maxPointGroup.visible = true;
    };
    WorldBossJiangLiWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.play:
                if (this.type == 0) {
                    UserBoss.ins().sendJoinLottery();
                }
                else if (this.type == 1) {
                    GuildWar.ins().sendPlayLotteryInfo();
                }
                this.playGroup.visible = false;
                break;
            case this.giveUp:
                if (this.type == 0) {
                    ViewManager.ins().close(WorldBossJiangLiWin);
                }
                else if (this.type == 1) {
                    ViewManager.ins().close(WorldBossJiangLiWin);
                }
                break;
        }
    };
    return WorldBossJiangLiWin;
}(BaseEuiView));
__reflect(WorldBossJiangLiWin.prototype, "WorldBossJiangLiWin");
ViewManager.ins().reg(WorldBossJiangLiWin, LayerManager.UI_Popup);
//# sourceMappingURL=WorldBossJiangLiWin.js.map