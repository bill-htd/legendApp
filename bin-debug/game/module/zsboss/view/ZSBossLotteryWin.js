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
var ZSBossLotteryWin = (function (_super) {
    __extends(ZSBossLotteryWin, _super);
    function ZSBossLotteryWin() {
        var _this = _super.call(this) || this;
        _this.configTimes = 0;
        return _this;
    }
    ZSBossLotteryWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "ZSBossLotterySkin";
        this.bar.labelFunction = function () {
            return "";
        };
        this.isTopLevel = true;
        this.pointImg = BitmapNumber.ins().createNumPic(0, "1", 10);
        this.pointImg.x = this["point"].x;
        this.pointImg.y = this["point"].y;
        DisplayUtils.removeFromParent(this["point"]);
    };
    ZSBossLotteryWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.play, this.onTap);
        this.addTouchEvent(this.giveUp, this.onTap);
        this.observe(UserBoss.ins().postLotteryRan, this.getMyPoint);
        this.observe(UserBoss.ins().postLotteryResult, this.getMaxPoint);
        this.observe(GuildWar.ins().postLotteryPoint, this.getMyPoint);
        this.observe(GuildWar.ins().postLotteryMaxPost, this.getMaxPoint);
        this.statu = 0;
        if (param[0])
            this.statu = param[0];
        else
            this.statu = 0;
        if (ZsBoss.ins().isZsBossFb(GameMap.fubenID)) {
            this.configTimes = GlobalConfig.WorldBossBaseConfig.lotteryTime;
        }
        else {
            this.configTimes = 10;
        }
        this.bar.maximum = 10 * this.configTimes;
        this.refushInfo();
        this.play.enabled = true;
    };
    ZSBossLotteryWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.play, this.onTap);
        this.removeTouchEvent(this.giveUp, this.onTap);
        TimerManager.ins().remove(this.refushBar, this);
        this.removeObserve();
    };
    ZSBossLotteryWin.prototype.refushInfo = function () {
        this.times = 0;
        this.item0.data = UserBoss.ins().worldPrize;
        TimerManager.ins().doTimer(100, 10 * this.configTimes, this.refushBar, this, this.TimeOver, this);
        this.timeLabel.text = this.configTimes + "\u79D2";
    };
    ZSBossLotteryWin.prototype.refushBar = function () {
        this.times++;
        var value = 10 * this.configTimes - this.times;
        this.bar.value = value;
        this.timeLabel.text = Math.floor(this.configTimes - this.times / 10) + "秒";
    };
    ZSBossLotteryWin.prototype.TimeOver = function () {
        ViewManager.ins().close(ZSBossLotteryWin);
    };
    ZSBossLotteryWin.prototype.getMyPoint = function (point) {
        this.play.enabled = false;
        BitmapNumber.ins().changeNum(this.pointImg, point, "7", 2);
        this.addChild(this.pointImg);
    };
    ZSBossLotteryWin.prototype.getMaxPoint = function (info) {
        this.maxPoint.textFlow = new egret.HtmlTextParser().parser("<font color = '#FFB82A'>" + info[0] + "</font>投出了<font color = '#FFB82A'>" + info[1] + "</font>点");
    };
    ZSBossLotteryWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn:
                ViewManager.ins().close(ZSBossLotteryWin);
                break;
            case this.play:
                if (this.statu == 0) {
                    UserBoss.ins().sendJoinLottery();
                }
                else if (this.statu == 1) {
                    GuildWar.ins().sendPlayLotteryInfo();
                }
                break;
            case this.giveUp:
                ViewManager.ins().close(ZSBossLotteryWin);
                break;
        }
    };
    return ZSBossLotteryWin;
}(BaseEuiView));
__reflect(ZSBossLotteryWin.prototype, "ZSBossLotteryWin");
ViewManager.ins().reg(ZSBossLotteryWin, LayerManager.UI_Popup);
//# sourceMappingURL=ZSBossLotteryWin.js.map