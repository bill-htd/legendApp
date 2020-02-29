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
var SuperVipWin = (function (_super) {
    __extends(SuperVipWin, _super);
    function SuperVipWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "gsvipSkin";
        return _this;
    }
    SuperVipWin.prototype.open = function () {
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.bgClose, this.onTap);
        this.addTouchEvent(this.pey, this.onTap);
        this.addTouchEvent(this.copy, this.onTap);
        this.observe(UserVip.ins().postSuperVipInfo, this.initView);
        UserVip.ins().sendGetSuperVipInfo();
        this.initView();
    };
    SuperVipWin.prototype.initView = function () {
        if (UserVip.ins().getSuperVipState()) {
            this.qqtxt.text = UserVip.ins().superVipData ? "" + UserVip.ins().superVipData.data.qq : "";
            this.nopay0.visible = false;
            this.nopay1.visible = false;
            this.copy.visible = true;
            this.pay0.visible = true;
        }
        else {
            this.qqtxt.text = "??????";
            this.nopay0.visible = true;
            this.nopay1.visible = true;
            this.copy.visible = false;
            this.pay0.visible = false;
        }
        if (UserVip.ins().superVip) {
            for (var id in GlobalConfig.SuperVipConfig) {
                var i = +id - 1;
                var config = GlobalConfig.SuperVipConfig[id];
                this["cond" + i].text = "(" + (UserVip.ins().superVip[i] || 0) + "/" + config.money + ")";
            }
        }
    };
    SuperVipWin.prototype.onTap = function (e) {
        var tar = e.currentTarget;
        switch (tar) {
            case this.closeBtn:
            case this.bgClose:
                ViewManager.ins().close(this);
                break;
            case this.pey:
                var rdata = Recharge.ins().getRechargeData(0);
                if (!rdata || rdata.num != 2) {
                    ViewManager.ins().open(Recharge1Win);
                }
                else {
                    ViewManager.ins().open(ChargeFirstWin);
                }
                ViewManager.ins().close(this);
                break;
            case this.copy:
                if (window.prompt) {
                    if (DeviceUtils.IsMobile)
                        window.prompt("\u8BF7\u957F\u6309\u94FE\u63A5\u590D\u5236QQ\uFF1A", UserVip.ins().superVipData.data.qq + "");
                    else
                        window.prompt("\u8BF7\u590D\u5236QQ\uFF1A", UserVip.ins().superVipData.data.qq + "");
                }
                break;
        }
    };
    return SuperVipWin;
}(BaseEuiView));
__reflect(SuperVipWin.prototype, "SuperVipWin");
ViewManager.ins().reg(SuperVipWin, LayerManager.UI_Popup);
//# sourceMappingURL=SuperVipWin.js.map