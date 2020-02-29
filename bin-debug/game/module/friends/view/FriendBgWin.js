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
var FriendBgWin = (function (_super) {
    __extends(FriendBgWin, _super);
    function FriendBgWin() {
        var _this = _super.call(this) || this;
        _this.skinName = "FriendsWinSkin";
        _this.isTopLevel = true;
        _this.tab.dataProvider = _this.viewStack;
        return _this;
    }
    FriendBgWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        var index = param[0] ? param[0] : 0;
        var chatIndex = 0;
        if (index == 0) {
            chatIndex = param[1] ? param[1] : 0;
        }
        this.viewStack.selectedIndex = index;
        this.addTouchEvent(this.btnClose, this.onTap);
        this.addChangeEvent(this.tab, this.onTap);
        Friends.ins().sendFriendsList();
        this.friendPanel.open();
        this.friendChatPanel.open(chatIndex);
        this.friendAppListPanel.open();
        this.blackListPanel.open();
        this.mailPanel.open();
        this.updateRedPoint();
        this.observe(Friends.ins().postFriendChange, this.updateRedPoint);
        this.observe(UserMail.ins().postMailDetail, this.updateRedPoint);
        this.observe(UserMail.ins().postMailData, this.updateRedPoint);
    };
    FriendBgWin.prototype.close = function () {
        _super.prototype.close.call(this);
        this.friendPanel.close();
        this.friendChatPanel.close();
        this.friendAppListPanel.close();
        this.blackListPanel.close();
        this.mailPanel.close();
        WatcherUtil.removeFromArrayCollection(this.tab.dataProvider);
    };
    FriendBgWin.prototype.onShowdMailPoint = function () {
        if (UserMail.ins().mailData) {
            this.mailRedPoint.visible = UserMail.ins().getUnreadMail() > 0;
        }
        else {
            this.mailRedPoint.visible = false;
        }
    };
    FriendBgWin.prototype.updateRedPoint = function () {
        this.applyRedPoint.visible = Friends.ins().appList.length > 0;
        this.onShowdMailPoint();
    };
    FriendBgWin.prototype.onTap = function (e) {
        switch (e.target) {
            case this.btnClose:
                ViewManager.ins().close(this);
                break;
            case this.tab:
                break;
        }
    };
    return FriendBgWin;
}(BaseEuiView));
__reflect(FriendBgWin.prototype, "FriendBgWin");
ViewManager.ins().reg(FriendBgWin, LayerManager.UI_Popup);
//# sourceMappingURL=FriendBgWin.js.map