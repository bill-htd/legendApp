var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FriendData = (function () {
    function FriendData(type, bytes) {
        if (bytes === void 0) { bytes = null; }
        this._offLineSec = 0;
        this.appDate = 0;
        this._redPoint = false;
        this.msgMaxLen = 50;
        this.lastMsg = "";
        this.lastMsgDate = 0;
        this.lastMsgData_local = 0;
        this.type = type;
        if (bytes) {
            this.id = bytes.readUnsignedInt();
            this.name = bytes.readString();
            this.guildName = bytes.readString();
            this.online = bytes.readUnsignedByte();
            this.job = bytes.readUnsignedByte();
            this.sex = bytes.readUnsignedByte();
            this.vip = bytes.readUnsignedByte();
            this.lv = bytes.readUnsignedByte();
            this.zs = bytes.readUnsignedByte();
            this.monthCard = bytes.readUnsignedByte();
            this.ladderLv = bytes.readUnsignedByte();
            this.isLastWeekLadder = bytes.readUnsignedByte();
            this.power = bytes.readInt();
            switch (type) {
                case 1:
                    var n = bytes.readInt() || 0;
                    this.offLineSec = n;
                    break;
                case 2:
                    this.lastMsgDate = bytes.readInt();
                    break;
                case 3:
                    var d = bytes.readInt() || 0;
                    this.appDate = d;
                    break;
                case 4:
                    break;
            }
        }
    }
    Object.defineProperty(FriendData.prototype, "offLineSec", {
        get: function () {
            var rtn = 0;
            try {
                var nowTs = Date.now() / 1000;
                rtn = Math.floor(this._offLineSec + (nowTs - this._updateTs));
            }
            catch (e) {
                debug.log("取好友离线时间失败");
                debug.log(e);
            }
            return rtn;
        },
        set: function (value) {
            this._offLineSec = value;
            this._updateTs = Date.now() / 1000;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FriendData.prototype, "redPoint", {
        get: function () {
            var rtn = this._redPoint;
            this._redPoint = false;
            return rtn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FriendData.prototype, "acMsg", {
        get: function () {
            if (Friends.ins().chatList[this.id] == null) {
                Friends.ins().chatList[this.id] = new eui.ArrayCollection();
            }
            return Friends.ins().chatList[this.id];
        },
        set: function (value) {
            Friends.ins().chatList[this.id] = value;
        },
        enumerable: true,
        configurable: true
    });
    ;
    FriendData.prototype.addChat = function (data) {
        var self = this;
        this._redPoint = (data.fromActor.id == this.id);
        if (this.acMsg.length == 0) {
            data.showDate = true;
        }
        else {
            for (var i = self.acMsg.length - 1; i >= 0; --i) {
                var oldData = self.acMsg.getItemAt(i);
                if (data.date - oldData.date > 300) {
                    data.showDate = true;
                }
                if (oldData.showDate) {
                    break;
                }
            }
        }
        self.acMsg.addItem(data);
        self.lastMsgData_local = Date.now();
        if (self.acMsg.length > this.msgMaxLen) {
            self.acMsg.removeItemAt(0);
        }
    };
    return FriendData;
}());
__reflect(FriendData.prototype, "FriendData");
var ChatData = (function () {
    function ChatData(fromActor, toActor, date, msg) {
        this.date = 0;
        this.msg = "";
        this.showDate = false;
        this.fromActor = fromActor;
        this.toActor = toActor;
        this.date = date;
        this.msg = msg;
    }
    Object.defineProperty(ChatData.prototype, "dateStr", {
        get: function () {
            var rtn = "";
            rtn = DateUtils.getFormatBySecond(DateUtils.formatMiniDateTime(this.date) / 1000, 8);
            rtn = StringUtils.complementByChar(rtn, 16);
            return rtn;
        },
        enumerable: true,
        configurable: true
    });
    return ChatData;
}());
__reflect(ChatData.prototype, "ChatData");
//# sourceMappingURL=FriendData.js.map