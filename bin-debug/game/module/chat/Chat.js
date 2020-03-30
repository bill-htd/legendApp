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
var Chat = (function (_super) {
    __extends(Chat, _super);
    function Chat() {
        var _this = _super.call(this) || this;
        _this.isShowTip = false;
        _this.chatInterval = 5000;
        _this.charMax = 50;
        _this.canSpeak = true;
        _this.UpSpeak = "";
        _this.canSpeakTime = 0;
        _this.initData();
        _this.sysId = PackageID.Chat;
        _this.regNetMsg(1, _this.doNewChatMsg);
        _this.regNetMsg(2, _this.doSystemInfo);
        _this.regNetMsg(3, _this.doIsSendSuccess);
        _this.regNetMsg(4, _this.doSystemMessage);
        _this.regNetMsg(5, _this.doCannotSpeak);
        return _this;
    }
    Chat.prototype.initData = function () {
        if (!this._chatListData)
            this._chatListData = new eui.ArrayCollection();
        if (!this._systemListData)
            this._systemListData = new eui.ArrayCollection();
        if (!this._chatListData2)
            this._chatListData2 = new eui.ArrayCollection();
        this._chatListData.removeAll();
        this._systemListData.removeAll();
        this._chatListData2.removeAll();
    };
    Chat.ins = function () {
        return _super.ins.call(this);
    };
    Chat.prototype.sendChatInfo = function (type, str, pointId) {
        if (pointId === void 0) { pointId = 0; }
        if (str.length <= 0) {
            UserTips.ins().showTips("|C:0xf3311e&T:请输入聊天内容|");
            return;
        }
        if (str.charAt(0) == "@") {
            var bytes_1 = this.getBytes(0);
            bytes_1.writeString(str);
            this.sendToServer(bytes_1);
            return;
        }
        var bytes = this.getBytes(1);
        bytes.writeByte(type);
        bytes.writeUnsignedInt(pointId);
        bytes.writeString(str);
        this.sendToServer(bytes);
        if (type == 7 && this.isCanSpeak()) {
            ReportData.getIns().reportChat(str, 4);
        }
    };
    Chat.prototype.doNewChatMsg = function (bytes) {
        var message = new ChatInfoData(bytes);
        if (Friends.ins().indexOfBlackList(message.id) == -1) {
            this.insertChatMsg(message);
        }
    };
    Chat.prototype.insertChatMsg = function (message) {
        if (!this._chatListData) {
            this._chatListData = new eui.ArrayCollection();
        }
        if (this._chatListData.length >= this.charMax) {
            var msg = this._chatListData.removeItemAt(0);
            this.removeAllChatMsg(msg);
        }
        this._chatListData.addItem(message);
        this.insertAllChatMsg(message);
        this.postNewChatMsg(message);
    };
    Chat.prototype.insertAllChatMsg = function (message) {
        if (!this._chatListData2) {
            this._chatListData2 = new eui.ArrayCollection();
        }
        this._chatListData2.addItem(message);
    };
    Chat.prototype.removeAllChatMsg = function (message) {
        var index = this._chatListData2.getItemIndex(message);
        if (index >= 0) {
            this._chatListData2.removeItemAt(index);
        }
    };
    Chat.prototype.removeChatWithId = function (userId) {
        if (this._chatListData && this._chatListData.length) {
            var source = [];
            for (var i = 0; i < this._chatListData.length; i++) {
                var cData = this._chatListData.getItemAt(i);
                if (cData.id != userId) {
                    source.push(cData);
                }
            }
            this._chatListData.source = source;
            this._chatListData.refresh();
        }
    };
    Chat.prototype.postNewChatMsg = function (message) {
        return message;
    };
    Chat.prototype.doSystemInfo = function (bytes) {
    };
    Chat.prototype.doIsSendSuccess = function (bytes) {
        if (bytes.readBoolean()) {
            this.postSendInfoSuccess();
        }
    };
    Chat.prototype.postSendInfoSuccess = function () {
    };
    Chat.prototype.doSystemMessage = function (bytes) {
        var level = bytes.readInt();
        var type = bytes.readInt();
        var str = bytes.readString();
        if (level == 0 || Actor.level >= level) {
            switch (type) {
                case 8:
                    UserTips.ins().showCenterTips2(str);
                    break;
                case 4:
                    ErrorLog.ins().show(str);
                    break;
                case 2:
                    UserTips.ins().showCenterTips(str);
                    break;
                default:
                    UserTips.ins().showTips(str);
                    break;
            }
        }
    };
    Chat.prototype.doCannotSpeak = function (bytes) {
        this.canSpeakTime = bytes.readInt();
    };
    Chat.prototype.isCanSpeak = function () {
        if (this.canSpeakTime) {
            if (this.canSpeakTime > GameServer.serverTime / 1000)
                return false;
        }
        return true;
    };
    Object.defineProperty(Chat.prototype, "chatListData", {
        get: function () {
            if (!this._chatListData)
                this._chatListData = new eui.ArrayCollection();
            return this._chatListData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chat.prototype, "chatListData2", {
        get: function () {
            if (!this._chatListData2)
                this._chatListData2 = new eui.ArrayCollection();
            return this._chatListData2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chat.prototype, "chatListTip", {
        get: function () {
            if (!this._chatListData) {
                this._chatListData = new eui.ArrayCollection([]);
            }
            var len = this._chatListData.length;
            var start;
            var end;
            if (len > 2) {
                start = len - 2;
                end = len;
            }
            else {
                start = 0;
                end = len;
            }
            return this._chatListData.source.slice(start, end);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Chat.prototype, "chatListTip2", {
        get: function () {
            if (!this._chatListData2) {
                this._chatListData2 = new eui.ArrayCollection([]);
            }
            var len = this._chatListData2.length;
            var start;
            var end;
            if (len > 2) {
                start = len - 2;
                end = len;
            }
            else {
                start = 0;
                end = len;
            }
            return this._chatListData2.source.slice(start, end);
        },
        enumerable: true,
        configurable: true
    });
    Chat.prototype.startInterval = function () {
        this.canSpeak = false;
        TimerManager.ins().doTimer(this.chatInterval, 1, this.timeDo, this);
    };
    Chat.prototype.timeDo = function () {
        this.canSpeak = true;
    };
    Chat.prototype.postSysChatMsg = function (message) {
        if (this._systemListData.length >= this.charMax) {
            var msg = this._systemListData.removeItemAt(0);
            this.removeAllChatMsg(msg);
        }
        this._systemListData.addItem(message);
        this.insertAllChatMsg(message);
        return message;
    };
    Object.defineProperty(Chat.prototype, "systemListData", {
        get: function () {
            if (!this._systemListData)
                this._systemListData = new eui.ArrayCollection([]);
            return this._systemListData;
        },
        enumerable: true,
        configurable: true
    });
    Chat.prototype.checkRepeatString = function (str) {
        var len = str.length;
        if (len <= 10) {
            return true;
        }
        var repeatNum = 0;
        for (var i = 0; i < len; i++) {
            var strIndex = str.charAt(i);
            if (this.UpSpeak.lastIndexOf(strIndex) != -1) {
                ++repeatNum;
            }
        }
        if (repeatNum >= 10) {
            UserTips.ins().showTips("|C:0xf3311e&T:输入的内容重复过多|");
            return false;
        }
        return true;
    };
    Chat.prototype.getWorldStr = function () {
        return KFServerSys.ins().isKF || KFBossSys.ins().isKFBossBattle ? "\u8DE8\u670D" : "\u4E16\u754C";
    };
    return Chat;
}(BaseSystem));
__reflect(Chat.prototype, "Chat");
function gm(str) {
    var bytes = GameLogic.ins().getBytes(0);
    bytes.writeString(str);
    GameLogic.ins().sendToServer(bytes);
}
var GameSystem;
(function (GameSystem) {
    GameSystem.chat = Chat.ins.bind(Chat);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=Chat.js.map