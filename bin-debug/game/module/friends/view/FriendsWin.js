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
var FriendsWin = (function (_super) {
    __extends(FriendsWin, _super);
    function FriendsWin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FriendsWin.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
        this.skinName = "FriendsWinSkin";
        this.isTopLevel = true;
        var arr = ["最近", "联系人"];
        this.tab.dataProvider = new eui.ArrayCollection(arr);
    };
    FriendsWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.addTouchEvent(this.btn_add, this.onTap);
        this.addTouchEvent(this.btn_AskList, this.onTap);
        this.addTouchEvent(this.btn_blackList, this.onTap);
        this.addTouchEvent(this.btn_send, this.onTap);
        this.addChangeEvent(this.tab, this.onTap);
        this.list_recent.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onRecentListItemTap, this);
        this.tab.selectedIndex = 0;
        this.onTabBarTouchTap();
        this.list_friends.itemRenderer = FriendListItemRender;
        this.list_friends.dataProvider = Friends.ins().friendsList;
        this.list_recent.itemRenderer = FriendRecentListItemRender;
        this.list_recent.dataProvider = Friends.ins().recentList;
        this.list_chat.itemRenderer = FriendsChatItemRender;
        this.editText_input.maxChars = GlobalConfig.FriendLimit.contentLimit;
        this.observe(Friends.ins().postFriendChange, this.updateView);
        this.observe(Friends.ins().postChatToFriend, this.openChatGroup);
        Friends.ins().sendFriendsList();
    };
    FriendsWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.removeTouchEvent(this.closeBtn, this.onTap);
        this.removeTouchEvent(this.closeBtn0, this.onTap);
        this.removeTouchEvent(this.btn_add, this.onTap);
        this.removeTouchEvent(this.btn_AskList, this.onTap);
        this.removeTouchEvent(this.btn_blackList, this.onTap);
        this.removeTouchEvent(this.btn_send, this.onTap);
        this.list_recent.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onRecentListItemTap, this);
        this.removeObserve();
    };
    FriendsWin.prototype.onTap = function (evt) {
        switch (evt.target) {
            case this.closeBtn:
            case this.closeBtn0:
                Friends.ins().currentId = -1;
                ViewManager.ins().close(FriendsWin);
                break;
            case this.btn_add:
                ViewManager.ins().open(FriendsAddWin);
                break;
            case this.btn_AskList:
                ViewManager.ins().open(FriendsAppListWin);
                break;
            case this.btn_blackList:
                ViewManager.ins().open(BlackListWin);
                break;
            case this.btn_send:
                if (Actor.level < GlobalConfig.FriendLimit.chatLv) {
                    UserTips.ins().showTips(GlobalConfig.FriendLimit.chatLv + "级开放");
                }
                else if (this.editText_input.text.length > GlobalConfig.FriendLimit.contentLimit) {
                    UserTips.ins().showTips("你说的话太长了");
                }
                else if (this.editText_input.text.length > 0) {
                    Friends.ins().sendChat(this.talkWith, this.editText_input.text + "");
                    this.editText_input.text = "";
                    TimerManager.ins().doTimer(200, 1, this.scrollerChatToBottom, this);
                }
                break;
            case this.tab:
                this.onTabBarTouchTap();
                break;
        }
    };
    FriendsWin.prototype.onRecentListItemTap = function (evt) {
        var data = evt.item;
        if (data && data.id) {
            this.openChatGroup(data.id);
        }
    };
    FriendsWin.prototype.onTabBarTouchTap = function () {
        if (this.group_recent)
            this.group_recent.visible = false;
        if (this.group_lianxiren)
            this.group_lianxiren.visible = false;
        this.list_friends.selectedIndex = -1;
        this.group_0.visible = this.group_1.visible = this.group_chat.visible = false;
        var group = this["group_" + this.tab.selectedIndex];
        if (group) {
            this.img_title.visible = true;
            group.visible = true;
            this.updateView();
            if (this.tab.selectedIndex == 0) {
                Friends.ins().recentList.refresh();
            }
            this.updateTipTab();
            Friends.ins().sortRecentList();
            Friends.ins().sortFriendList();
        }
        Friends.ins().postCloseFriendList();
    };
    FriendsWin.prototype.openChatGroup = function (userId) {
        if (this.group_recent)
            this.group_recent.visible = false;
        if (this.group_lianxiren)
            this.group_lianxiren.visible = false;
        var idx = Friends.ins().indexOfFriendList(userId);
        if (idx > -1) {
            Friends.ins().currentId = userId;
            var fd = Friends.ins().friendsList.getItemAt(idx);
            this.group_0.visible = this.group_1.visible = this.img_title.visible = false;
            this.group_chat.visible = true;
            this.talkWith = fd.id;
            this.label_name.text = fd.name;
            this.list_chat.dataProvider = Friends.ins().friendsList.getItemAt(idx).acMsg;
            delete Friends.ins().newMsg[userId];
        }
        egret.setTimeout(this.scrollerChatToBottom, this, 200);
    };
    FriendsWin.prototype.scrollerChatToBottom = function () {
        if (this.scroller_chat) {
            this.scroller_chat.viewport.scrollV = Math.max(this.scroller_chat.viewport.contentHeight - this.scroller_chat.height, 0);
        }
    };
    FriendsWin.prototype.updateView = function (userId) {
        if (userId === void 0) { userId = null; }
        this.label_num.text = this.list_friends.dataProvider.length + "/" + GlobalConfig.FriendLimit.friendListLen;
        if (this.redPoint0) {
            this.redPoint0.visible = false;
            if (Object.keys(Friends.ins().newMsg).length > 0) {
                for (var key in Friends.ins().newMsg) {
                    var value = Friends.ins().newMsg[key];
                    if (value == true) {
                        this.redPoint0.visible = true;
                        break;
                    }
                }
            }
        }
        this.redPoint1.visible = (Friends.ins().appList.length > 0);
        if (this.redPoint2)
            this.redPoint2.visible = (Friends.ins().appList.length > 0);
        if (this.group_chat.visible) {
            egret.setTimeout(this.scrollerChatToBottom, this, 200);
        }
        this.updateTipTab();
    };
    FriendsWin.prototype.updateTipTab = function () {
        if (this.group_recent && this.tab.selectedIndex == 0) {
            this.group_recent.visible = (Friends.ins().recentList.length == 0);
        }
        if (this.group_lianxiren && this.tab.selectedIndex == 1) {
            this.group_lianxiren.visible = (Friends.ins().friendsList.length == 0);
        }
    };
    return FriendsWin;
}(BaseEuiView));
__reflect(FriendsWin.prototype, "FriendsWin");
ViewManager.ins().reg(FriendsWin, LayerManager.UI_Main);
//# sourceMappingURL=FriendsWin.js.map