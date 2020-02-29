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
var UserMail = (function (_super) {
    __extends(UserMail, _super);
    function UserMail() {
        var _this = _super.call(this) || this;
        _this.currentMailHandle = 0;
        _this.mailData = [];
        _this._mailListData = new eui.ArrayCollection();
        _this.sysId = PackageID.Mail;
        _this.regNetMsg(1, _this.doMailData);
        _this.regNetMsg(2, _this.doMailDetailedData);
        _this.regNetMsg(3, _this.doDeleteMail);
        _this.regNetMsg(4, _this.doGetItemMail);
        _this.regNetMsg(5, _this.doAddMail);
        return _this;
    }
    UserMail.ins = function () {
        return _super.ins.call(this);
    };
    Object.defineProperty(UserMail.prototype, "mailListData", {
        get: function () {
            this.mailData.sort(this.mailSort2);
            this._mailListData.source = this.mailData;
            return this._mailListData;
        },
        enumerable: true,
        configurable: true
    });
    UserMail.prototype.sendMailContentData = function (mailHandle) {
        var bytes = this.getBytes(2);
        bytes.writeInt(mailHandle);
        this.sendToServer(bytes);
    };
    UserMail.prototype.sendGetItem = function (list) {
        var bytes = this.getBytes(4);
        bytes.writeInt(list.length);
        for (var i = 0; i < list.length; i++) {
            bytes.writeInt(list[i]);
        }
        this.sendToServer(bytes);
    };
    UserMail.prototype.doMailData = function (bytes) {
        this.parser(bytes, 1);
        this.postMailData();
    };
    UserMail.prototype.postMailData = function () {
    };
    UserMail.prototype.doMailDetailedData = function (bytes) {
        var mailData = new MailData();
        mailData.parser(bytes);
        for (var i = 0; i < this.mailData.length; i++) {
            if (this.mailData[i].handle == mailData.handle) {
                this.mailData.splice(i, 1, mailData);
                break;
            }
        }
        this.currentMailHandle = mailData.handle;
        if (!UserMail.ins().isAllReceive)
            ViewManager.ins().open(MailDetailedWin);
        this.postMailDetail(mailData);
    };
    UserMail.prototype.postMailDetail = function (data) {
        return data;
    };
    UserMail.prototype.doDeleteMail = function (bytes) {
        this.deleteMailDataByHandle(bytes.readInt());
        this.postMailData();
    };
    UserMail.prototype.doGetItemMail = function (bytes) {
        this.setMailListData(bytes);
    };
    UserMail.prototype.postGetItemFromMail = function () {
    };
    UserMail.prototype.doAddMail = function (bytes) {
        this.parser(bytes, 0);
        this.postMailData();
    };
    UserMail.prototype.parser = function (bytes, type) {
        if (type) {
            this.mailData = [];
            var len = bytes.readInt();
            for (var i = 0; i < len; i++) {
                var mailData = new MailData();
                mailData.disposeData(bytes);
                this.mailData.push(mailData);
            }
            this.mailSort(1);
        }
        else {
            var mailData = new MailData();
            mailData.disposeData(bytes);
            this.mailData.unshift(mailData);
        }
    };
    UserMail.prototype.getMailDataByHandle = function (handle) {
        for (var _i = 0, _a = this.mailData; _i < _a.length; _i++) {
            var mail = _a[_i];
            if (mail.handle == handle)
                return mail;
        }
        return null;
    };
    UserMail.prototype.deleteMailDataByHandle = function (handle) {
        for (var i = 0; i < this.mailData.length; i++) {
            if (this.mailData[i].handle == handle) {
                this.mailData.splice(i, 1);
                return;
            }
        }
    };
    UserMail.prototype.getMailByReceive = function (receive) {
        if (receive === void 0) { receive = 0; }
        var list = [];
        for (var i = this.mailData.length - 1; i >= 0; i--) {
            if (this.mailData[i].receive == receive)
                list.push(this.mailData[i]);
        }
        return list;
    };
    UserMail.prototype.getUnreadMail = function () {
        var sum = 0;
        for (var i = this.mailData.length - 1; i >= 0; i--) {
            var mail = this.mailData[i];
            if (mail.type == 0 || mail.receive == 0)
                sum += 1;
        }
        return sum;
    };
    UserMail.prototype.getCurrentMail = function () {
        return this.getMailDataByHandle(this.currentMailHandle);
    };
    UserMail.prototype.setMailListData = function (bytes) {
        var len = bytes.readInt();
        for (var i = 0; i < len; i++) {
            var handle = bytes.readInt();
            for (var _i = 0, _a = this.mailData; _i < _a.length; _i++) {
                var mail = _a[_i];
                if (mail.handle == handle) {
                    mail.type = bytes.readInt();
                    mail.receive = bytes.readInt();
                    this.postMailDetail(mail);
                    break;
                }
            }
        }
        this.postGetItemFromMail();
    };
    UserMail.prototype.sortDesc = function (a, b) {
        var s1 = a.times;
        var s2 = b.times;
        return Algorithm.sortDesc(s1, s2);
    };
    UserMail.prototype.sortAsc = function (a, b) {
        var s1 = a.times;
        var s2 = b.times;
        return Algorithm.sortAsc(s1, s2);
    };
    UserMail.prototype.mailSort = function (isSort) {
        var mailList = this.mailData;
        if (isSort)
            mailList.sort(this.sortDesc);
        else
            mailList.sort(this.sortAsc);
        return mailList;
    };
    UserMail.prototype.mailSort2 = function (a, b) {
        var num = 0;
        num = Algorithm.sortAsc(a.type, b.type);
        if (num != 0)
            return num;
        if (a.receive == 0 && b.receive != 0)
            return -1;
        if (a.receive != 0 && b.receive == 0)
            return 1;
        num = Algorithm.sortDesc(a.times, b.times);
        if (num != 0)
            return num;
        return num;
    };
    return UserMail;
}(BaseSystem));
__reflect(UserMail.prototype, "UserMail");
var GameSystem;
(function (GameSystem) {
    GameSystem.usermail = UserMail.ins.bind(UserMail);
})(GameSystem || (GameSystem = {}));
//# sourceMappingURL=UserMail.js.map