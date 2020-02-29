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
var kfReceiveInviteWin = (function (_super) {
    __extends(kfReceiveInviteWin, _super);
    function kfReceiveInviteWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "kfReceiveInviteSkin";
        _this.isTopLevel = true;
        return _this;
    }
    kfReceiveInviteWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.index = args[0];
        this.inviteData = KfArenaSys.ins().inviteDataList[this.index];
        this.addTouchEvent(this.notBtn, this.onTouch);
        this.addTouchEvent(this.sureBtn, this.onTouch);
        this.update();
    };
    kfReceiveInviteWin.prototype.update = function () {
        this.nameLabel.text = this.inviteData.name;
        this.powerLabel.text = "\u6218\u529B\uFF1A" + this.inviteData.power;
        this.scoreLabel.text = "\u79EF\u5206\uFF1A" + this.inviteData.score;
        this.winRateLabel.text = "\u80DC\u7387" + this.inviteData.winRate + "%";
    };
    kfReceiveInviteWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.notBtn:
                KfArenaSys.ins().sendRespondInvite(this.inviteData.roleId, 0);
                KfArenaSys.ins().inviteDataList.slice(this.index, 1);
                ViewManager.ins().close(this);
                break;
            case this.sureBtn:
                KfArenaSys.ins().sendRespondInvite(this.inviteData.roleId, 1);
                KfArenaSys.ins().inviteDataList.slice(this.index, 1);
                ViewManager.ins().close(this);
                break;
        }
    };
    return kfReceiveInviteWin;
}(BaseEuiView));
__reflect(kfReceiveInviteWin.prototype, "kfReceiveInviteWin");
ViewManager.ins().reg(kfReceiveInviteWin, LayerManager.UI_Popup);
//# sourceMappingURL=KfReceiveInviteWin.js.map