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
var TeamFbInviteWin = (function (_super) {
    __extends(TeamFbInviteWin, _super);
    function TeamFbInviteWin() {
        var _this = _super.call(this) || this;
        _this._deDes = "";
        _this.skinName = "teamFbInviteSkin";
        _this.isTopLevel = true;
        return _this;
    }
    TeamFbInviteWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._deDes = args[0];
        this._room = args[1];
        this._configID = args[2];
        this.input.text = this._deDes;
        this.input.maxChars = 40;
        this.addTouchEvent(this, this.onTouch);
    };
    TeamFbInviteWin.prototype.close = function () {
    };
    TeamFbInviteWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
            case this.worldInviteBtn:
                var t = UserFb.ins().getTfInviteCD();
                if (t > 0) {
                    UserTips.ins().showTips(t + "\u79D2\u540E\u624D\u80FD\u4E16\u754C\u9080\u8BF7");
                    return;
                }
                UserFb.ins().sendTfSysInvite(this.getDes() + ("|E:1," + UserFb.ins().tfRoomID + ",&U:&C:" + 0x00FF00 + "&T:\u5FEB\u901F\u52A0\u5165"));
                ViewManager.ins().close(this);
                break;
            case this.friendInviteBtn:
                ViewManager.ins().open(FriendListWin, this.getDes() + ("|E:1," + UserFb.ins().tfRoomID + ",&U:&C:" + 0x00FF00 + "&T:\u5FEB\u901F\u52A0\u5165"));
                ViewManager.ins().close(this);
                break;
        }
    };
    TeamFbInviteWin.prototype.getDes = function () {
        var str = (!this.input.text ? this._deDes : this.input.text);
        var nameStr = "[|C:" + 0x16B2FF + "&T:" + Actor.myName + "|]";
        if (str == this._deDes)
            str = str.replace("我", nameStr);
        else
            str = nameStr + str;
        return str;
    };
    return TeamFbInviteWin;
}(BaseEuiView));
__reflect(TeamFbInviteWin.prototype, "TeamFbInviteWin");
ViewManager.ins().reg(TeamFbInviteWin, LayerManager.UI_Popup);
//# sourceMappingURL=TeamFbInviteWin.js.map