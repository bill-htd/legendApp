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
var actor = GameSystem.actor;
var Notice = (function (_super) {
    __extends(Notice, _super);
    function Notice() {
        var _this = _super.call(this) || this;
        _this.sysId = PackageID.Notice;
        _this.regNetMsg(1, _this.doNotice);
        _this.regNetMsg(2, _this.doNoticeOpen);
        TimerManager.ins().doTimer(3000, 1, _this.checkUpdata, _this);
        return _this;
    }
    Notice.ins = function () {
        return _super.ins.call(this);
    };
    Notice.prototype.checkUpdata = function () {
        if (!GlobalConfig.UpdateRemindConfig.appearTime || !GlobalConfig.UpdateRemindConfig.disappearTime)
            return;
        if (UserZs.ins().lv * 1000 + Actor.level < GlobalConfig.UpdateRemindConfig.appearLv)
            return;
        if ((GameServer.serverOpenDay + 1) < GlobalConfig.UpdateRemindConfig.serverDayLimit)
            return;
        var serverTime = GameServer.serverTime;
        if (DateUtils.formatStrTimeToMs(GlobalConfig.UpdateRemindConfig.appearTime) <= serverTime && serverTime < DateUtils.formatStrTimeToMs(GlobalConfig.UpdateRemindConfig.disappearTime))
            ViewManager.ins().open(UpdateRemindWin, GlobalConfig.UpdateRemindConfig.lotteryNotice);
    };
    Notice.prototype.doNotice = function (bytes) {
        var type = bytes.readShort();
        var str = bytes.readString();
        var isNew = bytes.readUnsignedByte();
        if (type == 1) {
            if (isNew == 0) {
                ViewManager.ins().open(NoticeView).showNotice(str);
            }
        }
        else if (type == 2) {
            if (!this.data) {
                this.data = new ChatInfoData(null);
            }
            this.data.str = str;
            this.data.type = 7;
        }
        if (type == 3) {
            ViewManager.ins().open(NoticeView).showNotice(str);
        }
        if (type == 4) {
            ViewManager.ins().open(YBguangboWin, str);
        }
        else {
            Chat.ins().postSysChatMsg(new ChatSystemData(type, str));
        }
    };
    Notice.prototype.doNoticeOpen = function (bytes) {
        UserFuLi.ins().isOpenNotice = bytes.readBoolean();
        Notice.ins().postGameNotice();
    };
    Notice.prototype.setNoticeOPen = function () {
        this.sendBaseProto(2);
    };
    Notice.prototype.postGameNotice = function () {
    };
    return Notice;
}(BaseSystem));
__reflect(Notice.prototype, "Notice");
var GameSystem;
(function (GameSystem) {
    GameSystem.notice = Notice.ins.bind(Notice);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=Notice.js.map