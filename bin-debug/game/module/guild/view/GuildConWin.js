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
var GuildConWin = (function (_super) {
    __extends(GuildConWin, _super);
    function GuildConWin() {
        return _super.call(this) || this;
    }
    GuildConWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "GuildConSkin";
        this.desc0.text = "捐献" + GlobalConfig.GuildDonateConfig[1].count + "元宝";
        this.desc1.text = "捐献" + GlobalConfig.GuildDonateConfig[2].count + "金币";
        this.info0.text = "贡献 +" + GlobalConfig.GuildDonateConfig[1].awardContri + "	资金 +" + GlobalConfig.GuildDonateConfig[1].awardFund;
        this.info1.text = "贡献 +" + GlobalConfig.GuildDonateConfig[2].awardContri + "	资金 +" + GlobalConfig.GuildDonateConfig[2].awardFund;
    };
    GuildConWin.openCheck = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        return true;
    };
    GuildConWin.prototype.update = function () {
        var num = GlobalConfig.GuildDonateConfig[1].dayCount[UserVip.ins().lv];
        var nextNum = GlobalConfig.GuildDonateConfig[1].dayCount[UserVip.ins().lv + 1];
        var arr = Guild.ins().getConCount();
        if (arr[0] <= 0) {
            if (nextNum && (nextNum - num > 0))
                this.count0.textFlow = new egret.HtmlTextParser().parser("<font color='#f3311e'>VIP" + (UserVip.ins().lv + 1) + "</font>额外捐献" + (nextNum - num) + "次");
            else
                this.count0.text = (num - arr[0]) + "/" + GlobalConfig.GuildDonateConfig[1].dayCount[UserVip.ins().lv];
            this.btn0.enabled = false;
        }
        else {
            this.btn0.enabled = true;
            this.count0.text = (num - arr[0]) + "/" + GlobalConfig.GuildDonateConfig[1].dayCount[UserVip.ins().lv];
        }
        this.btn1.enabled = arr[1] > 0;
        this.count1.text = (GlobalConfig.GuildDonateConfig[2].dayCount - arr[1]) + "/" + GlobalConfig.GuildDonateConfig[2].dayCount;
    };
    GuildConWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.addTouchEvent(this.btn0, this.onTap);
        this.addTouchEvent(this.btn1, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.observe(Guild.ins().postConCount, this.update);
        Guild.ins().sendConCount();
        if (UserVip.ins().lv == 0)
            this.btn0.label = "成为VIP";
        else
            this.btn0.label = "捐 献";
    };
    GuildConWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.closeBtn0, this.onTap);
        this.removeTouchEvent(this.btn0, this.onTap);
        this.removeTouchEvent(this.btn1, this.onTap);
        this.removeTouchEvent(this.bgClose, this.onTap);
        this.removeObserve();
    };
    GuildConWin.prototype.onTap = function (e) {
        var arr = Guild.ins().getConCount();
        switch (e.currentTarget) {
            case this.closeBtn:
            case this.closeBtn0:
                ViewManager.ins().close(this);
                break;
            case this.btn0:
                if (UserVip.ins().lv == 0)
                    ViewManager.ins().open(VipWin);
                else if (arr[0] <= 0)
                    UserTips.ins().showTips("次数不足");
                else if (Actor.yb >= GlobalConfig.GuildDonateConfig[1].count) {
                    Guild.ins().sendCon(1);
                }
                else {
                    UserTips.ins().showTips("元宝不足");
                    ViewManager.ins().close(this);
                }
                break;
            case this.btn1:
                if (arr[1] <= 0)
                    UserTips.ins().showTips("次数不足");
                else if (Actor.gold >= GlobalConfig.GuildDonateConfig[2].count) {
                    Guild.ins().sendCon(2);
                }
                else
                    UserTips.ins().showTips("金币不足");
                break;
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
        }
    };
    return GuildConWin;
}(BaseEuiView));
__reflect(GuildConWin.prototype, "GuildConWin");
ViewManager.ins().reg(GuildConWin, LayerManager.UI_Popup);
//# sourceMappingURL=GuildConWin.js.map