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
var YqWin = (function (_super) {
    __extends(YqWin, _super);
    function YqWin() {
        return _super.call(this) || this;
    }
    YqWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "InviteFriendsSkin";
    };
    YqWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.updateInfo();
        TimerManager.ins().doTimer(1000, 0, this.updateInfo, this);
        this.observe(PfActivity.ins().postInviteInfoUpdate, this.updateInfo);
        this.addTouchEvent(this.closeBtn1, this.onTap);
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.addTouchEvent(this.fxBtn, this.onTap);
    };
    YqWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        TimerManager.ins().remove(this.updateInfo, this);
        this.removeTouchEvent(this.closeBtn1, this.onTap);
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.bgClose, this.onTap);
        this.removeTouchEvent(this.fxBtn, this.onTap);
        this.removeObserve();
    };
    YqWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.closeBtn1:
            case this.closeBtn:
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
            case this.fxBtn:
                ViewManager.ins().open(WeiBoShareWin);
                break;
        }
    };
    YqWin.prototype.updateInfo = function () {
        if (PfActivity.ins().wxInviteCount >= 3) {
            ViewManager.ins().close(this);
            return;
        }
        var allCount = 3;
        this.count.text = "(" + PfActivity.ins().wxInviteCount + "/" + allCount + ")";
        this.fxBtn.enabled = PfActivity.ins().wxInviteCount < allCount;
        var award = GlobalConfig.SDKConfig.shareReward;
        var data = award[0];
        if (data.type == 0) {
            this.icon.source = RewardData.getCurrencyRes(data.id);
        }
        else {
            var itemConfig = GlobalConfig.ItemConfig[data.id];
            if (itemConfig)
                this.icon.source = itemConfig.icon + "_png";
        }
        this.item.source = this.icon.source;
        this.ybCountTxt.text = "" + data.count;
        if (PfActivity.ins().wxInviteCount) {
            var t = (DateUtils.formatMiniDateTime(PfActivity.ins().inviteTime) - GameServer.serverTime);
            this.time.text = t > 0 ? DateUtils.getFormatBySecond(t / 1000) + "后可再次邀请" : "";
        }
        else
            this.time.text = "";
    };
    return YqWin;
}(BaseEuiView));
__reflect(YqWin.prototype, "YqWin");
ViewManager.ins().reg(YqWin, LayerManager.UI_Popup);
//# sourceMappingURL=YqWin.js.map