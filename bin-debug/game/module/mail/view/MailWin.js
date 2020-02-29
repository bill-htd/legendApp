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
var MailWin = (function (_super) {
    __extends(MailWin, _super);
    function MailWin() {
        var _this = _super.call(this) || this;
        _this.name = "\u90AE\u4EF6";
        return _this;
    }
    MailWin.prototype.childrenCreated = function () {
        this._mails = [];
        this.mailList.itemRenderer = MailItem;
        this.mailScroller.viewport = this.mailList;
    };
    MailWin.prototype.open = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        this.addTouchEvent(this.closeBtn, this.onTap);
        this.addTouchEvent(this.closeBtn0, this.onTap);
        this.addTouchEvent(this.allReceiveBtn, this.onTap);
        this.addTouchEvent(this.mailList, this.onSendMail);
        this.observe(UserMail.ins().postMailDetail, this.setOpenMail);
        this.observe(UserMail.ins().postGetItemFromMail, this.mailCall);
        this.setMailData();
    };
    MailWin.prototype.close = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
        WatcherUtil.removeFromArrayCollection(this.mailList.dataProvider);
        this.mailList.dataProvider = null;
    };
    MailWin.prototype.mailCall = function () {
        if (UserMail.ins().isAllReceive) {
            for (var i = 0; i < this._mails.length; i++) {
                UserMail.ins().sendMailContentData(this._mails[i].handle);
            }
        }
    };
    MailWin.prototype.onTap = function (e) {
        switch (e.currentTarget) {
            case this.allReceiveBtn:
                UserMail.ins().isAllReceive = true;
                var list = [];
                var mailList = UserMail.ins().getMailByReceive();
                for (var i = 0; i < mailList.length; i++) {
                    list.push(mailList[i].handle);
                }
                UserMail.ins().sendGetItem(list);
                break;
        }
    };
    MailWin.prototype.onSendMail = function (e) {
        if (!e)
            return;
        UserMail.ins().isAllReceive = false;
        var item = e.target.parent;
        if (item) {
            var mailData = item.data;
            if (mailData) {
                UserMail.ins().sendMailContentData(mailData.handle);
            }
        }
    };
    MailWin.prototype.setMailData = function () {
        this._mails = UserMail.ins().mailData;
        this.mailList.dataProvider = new eui.ArrayCollection(this._mails);
        this.allReceiveBtn.visible = Boolean(UserMail.ins().getMailByReceive().length);
        if (UserMail.ins().mailData.length > 0)
            this.noMailTip.visible = false;
    };
    MailWin.prototype.setOpenMail = function (mailData) {
        for (var i = 0; i < this.mailList.numChildren; i++) {
            var item = this.mailList.getChildAt(i);
            if (item.data.handle == mailData.handle) {
                item.data = mailData;
                return;
            }
        }
    };
    return MailWin;
}(BaseComponent));
__reflect(MailWin.prototype, "MailWin");
//# sourceMappingURL=MailWin.js.map