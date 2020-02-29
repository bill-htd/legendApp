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
var Friends = (function (_super) {
    __extends(Friends, _super);
    function Friends() {
        var _this = _super.call(this) || this;
        _this.friendsList = new eui.ArrayCollection();
        _this.recentList = new eui.ArrayCollection();
        _this.appList = new eui.ArrayCollection();
        _this.blackList = new eui.ArrayCollection();
        _this.isDebug = false;
        _this.chatList = {};
        _this.newMsg = {};
        _this.currentId = -1;
        _this.sysId = PackageID.Friends;
        _this.regNetMsg(7, _this.doAddListMsg);
        _this.regNetMsg(3, _this.doAppList);
        _this.regNetMsg(4, _this.doBlackList);
        _this.regNetMsg(13, _this.doChatAdd);
        _this.regNetMsg(1, _this.doFriendsList);
        _this.regNetMsg(10, _this.doFriendsStateChange);
        _this.regNetMsg(14, _this.doRecentChatList);
        _this.regNetMsg(9, _this.doRemoveListMsg);
        _this.regNetMsg(2, _this.doRencentList);
        _this.regNetMsg(11, _this.doSendResult);
        return _this;
    }
    Friends.ins = function () {
        return _super.ins.call(this);
    };
    Friends.prototype.initLogin = function () {
        this.sendAppList();
    };
    Friends.prototype.log = function (msg) {
        if (this.isDebug)
            debug.log(msg);
    };
    Friends.prototype.sendFriendsList = function () {
        var bytes = this.getBytes(1);
        this.sendToServer(bytes);
    };
    Friends.prototype.sendRecentList = function () {
        var bytes = this.getBytes(2);
        this.sendToServer(bytes);
    };
    Friends.prototype.sendAppList = function () {
        var bytes = this.getBytes(3);
        this.sendToServer(bytes);
    };
    Friends.prototype.sendBlackList = function () {
        var bytes = this.getBytes(4);
        this.sendToServer(bytes);
    };
    Friends.prototype.sendAddFriend = function (userId, userName) {
        if (Actor.level < GlobalConfig.FriendLimit.chatLv) {
            UserTips.ins().showTips(GlobalConfig.FriendLimit.chatLv + "级开放功能");
            return;
        }
        if (this.indexOfBlackList(userId) != -1) {
            UserTips.ins().showTips("不能添加黑名单中的用户为好友");
            return;
        }
        for (var _i = 0, _a = this.blackList.source; _i < _a.length; _i++) {
            var value = _a[_i];
            var fd = value;
            if (fd.name == userName) {
                UserTips.ins().showTips("不能添加黑名单中的用户为好友");
                return;
            }
        }
        var bytes = this.getBytes(5);
        bytes.writeInt(userId);
        bytes.writeString(userName);
        this.sendToServer(bytes);
    };
    Friends.prototype.sendAddBlackList = function (userId, userName) {
        if (Actor.level < GlobalConfig.FriendLimit.chatLv) {
            UserTips.ins().showTips(GlobalConfig.FriendLimit.chatLv + "级开放功能");
            return;
        }
        var bytes = this.getBytes(6);
        bytes.writeInt(userId);
        bytes.writeString(userName);
        this.sendToServer(bytes);
    };
    Friends.prototype.sendAgreeApp = function (userId, agree) {
        var bytes = this.getBytes(8);
        bytes.writeInt(userId);
        bytes.writeByte(agree);
        this.sendToServer(bytes);
    };
    Friends.prototype.sendDelete = function (type, userId) {
        var bytes = this.getBytes(9);
        bytes.writeByte(type);
        bytes.writeInt(userId);
        this.sendToServer(bytes);
    };
    Friends.prototype.sendChat = function (userId, str) {
        var bytes = this.getBytes(11);
        bytes.writeInt(userId);
        bytes.writeString(str);
        this.sendToServer(bytes);
        ReportData.getIns().reportChat(str, 1);
    };
    Friends.prototype.sendRecentChat = function (userId) {
        var bytes = this.getBytes(14);
        bytes.writeInt(userId);
        this.sendToServer(bytes);
    };
    Friends.prototype.doFriendsList = function (bytes) {
        this.paserList(1, bytes);
        this.postFriendChange();
    };
    Friends.prototype.doRencentList = function (bytes) {
        this.paserList(2, bytes);
        this.postFriendChange();
    };
    Friends.prototype.doAppList = function (bytes) {
        this.paserList(3, bytes);
        this.postFriendChange();
    };
    Friends.prototype.doBlackList = function (bytes) {
        this.paserList(4, bytes);
        this.postFriendChange();
    };
    Friends.prototype.doAddListMsg = function (bytes) {
        var type = bytes.readByte();
        this.paserAddData(type, bytes);
        this.postFriendChange();
    };
    Friends.prototype.doRemoveListMsg = function (bytes) {
        var type = bytes.readByte();
        var userId = bytes.readInt();
        this.paserRemoveData(type, userId);
        this.postFriendChange();
    };
    Friends.prototype.doFriendsStateChange = function (bytes) {
        var userId = bytes.readUnsignedInt();
        var online = bytes.readByte();
        this.paserOnlineChange(userId, online);
        this.postFriendChange();
    };
    Friends.prototype.doSendResult = function (bytes) {
        var result = bytes.readByte();
        if (result != 0) {
            var userId = bytes.readUnsignedInt();
            var date = bytes.readInt();
            var msg = bytes.readString();
            this.paserChatMsg(1, userId, date, msg);
        }
        this.postFriendChange();
    };
    Friends.prototype.doChatAdd = function (bytes) {
        var userId = bytes.readUnsignedInt();
        var date = bytes.readInt();
        var msg = bytes.readString();
        this.paserChatMsg(0, userId, date, msg);
        this.postFriendChange();
    };
    Friends.prototype.doRecentChatList = function (bytes) {
        this.paserRecentMsg(bytes);
        this.postFriendChange();
    };
    Friends.prototype.postFriendChange = function () {
        return 0;
    };
    Friends.prototype.postCloseFriendList = function () {
    };
    Friends.prototype.postChatToFriend = function (friendId) {
        return friendId;
    };
    Friends.prototype.indexOfFriendList = function (userId) {
        var rtn = -1;
        for (var i = 0; i < this.friendsList.length; i++) {
            var fd = this.friendsList.getItemAt(i);
            if (fd && fd.id == userId) {
                rtn = i;
                break;
            }
        }
        return rtn;
    };
    Friends.prototype.indexOfBlackList = function (userId) {
        var rtn = -1;
        for (var i = 0; i < this.blackList.length; i++) {
            var fd = this.blackList.getItemAt(i);
            if (fd && fd.id == userId) {
                rtn = i;
                break;
            }
        }
        return rtn;
    };
    Friends.prototype.indexOfRecentList = function (userId) {
        var rtn = -1;
        for (var i = 0; i < this.recentList.length; i++) {
            var fd = this.recentList.getItemAt(i);
            if (fd && fd.id == userId) {
                rtn = i;
                break;
            }
        }
        return rtn;
    };
    Friends.prototype.indexOfAppList = function (userId) {
        var rtn = -1;
        for (var i = 0; i < this.appList.length; i++) {
            var fd = this.appList.getItemAt(i);
            if (fd && fd.id == userId) {
                rtn = i;
                break;
            }
        }
        return rtn;
    };
    Friends.prototype.sortRecentList = function () {
    };
    Friends.prototype.sortFriendList = function () {
        var source = this.friendsList.source;
        var sourceOnline = [];
        var sourceOffline = [];
        source.forEach(function (element) {
            if (element.online == 1) {
                sourceOnline.push(element);
            }
            else {
                sourceOffline.push(element);
            }
        });
        sourceOnline.sort(function (a, b) {
            if (b.zs != a.zs)
                return (b.zs - a.zs);
            return (b.lv - a.lv);
        });
        sourceOffline.sort(function (a, b) {
            if (b.zs != a.zs)
                return (b.zs - a.zs);
            return (b.lv - a.lv);
        });
        source = sourceOnline.concat(sourceOffline);
        this.friendsList.replaceAll(source);
    };
    Friends.prototype.sortAppList = function () {
        var source = this.appList.source;
        source.sort(function (a, b) {
            return b.power - a.power;
        });
        this.appList.replaceAll(source);
    };
    Friends.prototype.paserList = function (type, bytes) {
        var source = [];
        var len = bytes.readInt();
        for (var i = 0; i < len; i++) {
            var fd = new FriendData(type, bytes);
            source.push(fd);
        }
        switch (type) {
            case 1:
                this.friendsList.source = source;
                this.sortFriendList();
                break;
            case 2:
                this.recentList.source = source;
                this.sortRecentList();
                break;
            case 3:
                if (source.length > Friends.MAXNUM)
                    source = source.slice(source.length - Friends.MAXNUM, Friends.MAXNUM);
                this.appList.source = source;
                this.sortAppList();
                break;
            case 4:
                this.blackList.replaceAll(source);
                break;
        }
    };
    Friends.prototype.paserAddData = function (type, bytes) {
        var fd = new FriendData(type, bytes);
        var listName = ["friendsList", "recentList", "appList", "blackList"][type - 1];
        var idx = -1;
        if (type == 1) {
            idx = this.indexOfFriendList(fd.id);
        }
        else if (type == 2) {
            idx = this.indexOfRecentList(fd.id);
        }
        else if (type == 3) {
            idx = this.indexOfAppList(fd.id);
        }
        else if (type == 4) {
            idx = this.indexOfBlackList(fd.id);
            this.paserRemoveData(1, fd.id);
            this.paserRemoveData(2, fd.id);
            this.paserRemoveData(3, fd.id);
            Chat.ins().removeChatWithId(fd.id);
            Guild.ins().removeMsgWithId(fd.id);
        }
        if (this[listName] && type != 2) {
            if (idx > -1) {
                this[listName].replaceItemAt(fd, idx);
            }
            else {
                this[listName].addItemAt(fd, 0);
            }
        }
        this.sortFriendList();
        this.sortRecentList();
        this.sortAppList();
    };
    Friends.prototype.paserRemoveData = function (type, userId) {
        var listName = ["friendsList", "recentList", "appList", "blackList"][type - 1];
        var idx = -1;
        if (this[listName]) {
            if (type == 1) {
                idx = this.indexOfFriendList(userId);
                this.newMsg[userId] = false;
            }
            else if (type == 2) {
                idx = this.indexOfRecentList(userId);
                this.newMsg[userId] = false;
            }
            else if (type == 3) {
                idx = this.indexOfAppList(userId);
            }
            else if (type == 4) {
                idx = this.indexOfBlackList(userId);
            }
            if (idx > -1) {
                this[listName].removeItemAt(idx);
            }
        }
    };
    Friends.prototype.paserOnlineChange = function (userId, online) {
        var idx = this.indexOfFriendList(userId);
        if (idx > -1) {
            var fd = this.friendsList.getItemAt(idx);
            if (fd.id == userId) {
                fd.online = online;
                if (fd.online == 0) {
                    this.friendsList.replaceItemAt(fd, idx);
                }
                else {
                    this.friendsList.removeItemAt(idx);
                    this.friendsList.addItemAt(fd, 0);
                }
            }
        }
    };
    Friends.prototype.paserChatMsg = function (type, userId, date, msg) {
        if (this.indexOfBlackList(userId) > -1) {
            return;
        }
        if (type == 0 && this.currentId != userId) {
            this.newMsg[userId] = true;
        }
        var idxFriend = this.indexOfFriendList(userId);
        if (idxFriend > -1) {
            var fd = this.friendsList.getItemAt(idxFriend);
            var md = new FriendData(1);
            md.id = Actor.actorID;
            md.job = SubRoles.ins().getSubRoleByIndex(0).job;
            md.sex = SubRoles.ins().getSubRoleByIndex(0).sex;
            md.power = Actor.power;
            if (type == 0) {
                fd.addChat(new ChatData(fd, md, date, msg));
            }
            else if (type == 1) {
                fd.addChat(new ChatData(md, fd, date, msg));
            }
        }
        var idxRecent = this.indexOfRecentList(userId);
        if (idxRecent > -1) {
            var fd = this.recentList.getItemAt(idxRecent);
            fd.lastMsg = msg;
            this.recentList.removeItemAt(idxRecent);
            this.recentList.addItemAt(fd, 0);
        }
        else if (idxFriend > -1) {
            var fd = this.friendsList.getItemAt(idxFriend);
            fd.lastMsg = msg;
            this.recentList.addItemAt(fd, 0);
        }
        else {
            debug.log("有一个不属于最近联系人和好友列表的私聊");
            debug.log("id:" + userId + "/ msg:" + msg);
        }
        this.sortFriendList();
        this.sortRecentList();
        this.sortAppList();
    };
    Friends.prototype.paserRecentMsg = function (bytes) {
        var len = bytes.readByte();
        for (var i = 0; i < len; i++) {
            var userId = bytes.readByte();
            var date = bytes.readInt();
            var msg = bytes.readString();
            if (this.indexOfBlackList(userId) == -1) {
                for (var n = 0; i < this.recentList.length; i++) {
                    var fd = this.recentList.getItemAt(n);
                    if (fd.id == userId) {
                        fd.lastMsg = msg;
                        fd.offLineSec = date;
                        break;
                    }
                }
            }
        }
    };
    Friends.prototype.getFriendIndex = function (id) {
        var index = 0;
        while (true) {
            var data = this.friendsList.getItemAt(index);
            if (!data)
                return -1;
            if (data.id == id)
                return index;
            index++;
        }
    };
    Friends.MAXNUM = 100;
    Friends.CLOSS_FRIEND_LIST_BUTTON = "CLOSS_FRIEND_LIST_BUTTON";
    return Friends;
}(BaseSystem));
__reflect(Friends.prototype, "Friends");
var GameSystem;
(function (GameSystem) {
    GameSystem.friends = Friends.ins.bind(Friends);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=Friends.js.map