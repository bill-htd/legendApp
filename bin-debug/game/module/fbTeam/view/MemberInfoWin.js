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
var MemberInfoWin = (function (_super) {
    __extends(MemberInfoWin, _super);
    function MemberInfoWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "memberInfoSkin";
        _this.isTopLevel = true;
        return _this;
    }
    MemberInfoWin.prototype.open = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._data = args[0];
        this.addTouchEvent(this, this.onTouch);
        this.observe(UserReadPlayer.ins().postPlayerResult, this.openOtherPlayerView);
        this.update();
    };
    MemberInfoWin.prototype.close = function () {
        this.removeTouchEvent(this, this.onTouch);
        this.removeObserve();
    };
    MemberInfoWin.prototype.update = function () {
        this.imgBg.source = ChatListItemRenderer.HEAD_BG[this._data.sex];
        this.imgHead.source = "head_" + this._data.job + this._data.sex;
        this.labelName.text = this._data.roleName;
        this.labelLv.text = (this._data.zs ? this._data.zs + "级" : "") + this._data.lv + "级";
        this.btnRemove.visible = UserFb.ins().isTFCaptain;
    };
    MemberInfoWin.prototype.onTouch = function (e) {
        switch (e.target) {
            case this.btnInfo:
                UserReadPlayer.ins().sendFindPlayer(this._data.roleID);
                break;
            case this.btnRemove:
                UserFb.ins().sendOutTFRoom(this._data.roleID);
                ViewManager.ins().close(this);
                break;
            case this.closeBtn:
                ViewManager.ins().close(this);
                break;
        }
    };
    MemberInfoWin.prototype.openOtherPlayerView = function (otherPlayerData) {
        ViewManager.ins().open(TeamFBCheckRoleWin, otherPlayerData);
    };
    return MemberInfoWin;
}(BaseEuiView));
__reflect(MemberInfoWin.prototype, "MemberInfoWin");
ViewManager.ins().reg(MemberInfoWin, LayerManager.UI_Popup);
//# sourceMappingURL=MemberInfoWin.js.map