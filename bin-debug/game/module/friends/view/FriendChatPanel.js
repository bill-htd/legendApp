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
var FriendChatPanel = (function (_super) {
    __extends(FriendChatPanel, _super);
    function FriendChatPanel() {
        var _this = _super.call(this) || this;
        _this.name = "\u6700\u8FD1";
        return _this;
    }
    FriendChatPanel.prototype.childrenCreated = function () {
        this.listFriend.dataProvider = null;
        this.listChat.dataProvider = null;
        this.listFriend.itemRenderer = FriendHeadItem;
        this.listChat.itemRenderer = FriendsChatItemRender;
    };
    FriendChatPanel.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        Friends.ins().sendFriendsList();
        Friends.ins().sendRecentList();
        this.listFriend.selectedIndex = param[0] ? param[0] : 0;
        this.addChangeEvent(this.listFriend, this.onChange);
        this.addTouchEvent(this.btnSend, this.onTap);
        this.observe(Friends.ins().postFriendChange, this.updateView);
        this.observe(Friends.ins().postChatToFriend, this.updateView);
        this.addTouchEvent(this.listChat, this.onListTap);
        this.onChange();
    };
    FriendChatPanel.prototype.close = function () {
        this.removeTouchEvent(this.listChat, this.onListTap);
        WatcherUtil.removeFromArrayCollection(this.listChat.dataProvider);
        WatcherUtil.removeFromArrayCollection(this.listFriend.dataProvider);
        this.listFriend.dataProvider = null;
        this.listChat.dataProvider = null;
        this.$onClose();
    };
    FriendChatPanel.prototype.onListTap = function () {
        var selectedItem = this.listChat.selectedItem;
        if (selectedItem && selectedItem instanceof ChatData) {
            var str = selectedItem.msg;
            if (str && str.indexOf("|E:") >= 0)
                this.onLink(str);
        }
    };
    FriendChatPanel.prototype.onLink = function (str) {
        var index = str.indexOf("|E:");
        str = str.slice(index + 3, Number.MAX_VALUE);
        var list;
        if (str.indexOf(",") >= 0)
            list = str.split(",");
        else if (str.indexOf("*") >= 0)
            list = str.split("*");
        if (!list || list.length <= 0)
            return;
        switch (list[0]) {
            case "1":
                UserFb.ins().sendEnterTFRoom(+list[1]);
                break;
        }
    };
    FriendChatPanel.prototype.updateView = function () {
        this.listFriend.dataProvider = Friends.ins().friendsList;
        var data = this.listFriend.selectedItem;
        if (data) {
            this.currentState = "chat";
            var idx = Friends.ins().indexOfFriendList(data.id);
            if (this.listChat.dataProvider) {
                WatcherUtil.removeFromArrayCollection(this.listChat.dataProvider);
            }
            this.listChat.dataProvider = Friends.ins().friendsList.getItemAt(idx).acMsg;
            this.scroller.viewport.validateNow();
            if (this.scroller.viewport.contentHeight > this.scroller.height) {
                this.scroller.viewport.scrollV = this.scroller.viewport.contentHeight - this.scroller.height;
            }
        }
        else {
            this.currentState = "nofriend";
        }
    };
    FriendChatPanel.prototype.onChange = function () {
        this.updateView();
        var data = this.listFriend.selectedItem;
        if (data)
            Friends.ins().sendRecentChat(data.id);
    };
    FriendChatPanel.prototype.onTap = function (e) {
        switch (e.target) {
            case this.btnSend:
                var data = this.listFriend.selectedItem;
                if (!data)
                    return;
                if (Actor.level < GlobalConfig.FriendLimit.chatLv) {
                    UserTips.ins().showTips(GlobalConfig.FriendLimit.chatLv + "级开放");
                }
                else if (this.input.text.length > GlobalConfig.FriendLimit.contentLimit) {
                    UserTips.ins().showTips("你说的话太长了");
                }
                else if (this.input.text.length > 0) {
                    Friends.ins().sendChat(data.id, this.input.text + "");
                    this.input.text = "";
                }
                break;
        }
    };
    return FriendChatPanel;
}(BaseComponent));
__reflect(FriendChatPanel.prototype, "FriendChatPanel");
//# sourceMappingURL=FriendChatPanel.js.map