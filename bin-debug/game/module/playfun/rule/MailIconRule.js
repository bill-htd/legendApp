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
var MailIconRule = (function (_super) {
    __extends(MailIconRule, _super);
    function MailIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.showMessage = [
            UserMail.ins().postMailData,
            UserMail.ins().postGetItemFromMail,
            UserMail.ins().postMailDetail,
        ];
        return _this;
    }
    MailIconRule.prototype.checkShowIcon = function () {
        var data = UserMail.ins().getUnreadMail();
        if (data <= 0) {
            return false;
        }
        else {
            return true;
        }
    };
    MailIconRule.prototype.checkShowRedPoint = function () {
        if (UserMail.ins().mailData) {
            return 1;
        }
        return 0;
    };
    MailIconRule.prototype.blink = function () {
        var t = egret.Tween.get(this.tar);
        t.to({ alpha: 0 }, 500).to({ alpha: 1 }, 500).call(this.blink.bind(this));
    };
    MailIconRule.prototype.tapExecute = function () {
        ViewManager.ins().open(FriendBgWin, 4);
    };
    return MailIconRule;
}(RuleIconBase));
__reflect(MailIconRule.prototype, "MailIconRule");
//# sourceMappingURL=MailIconRule.js.map