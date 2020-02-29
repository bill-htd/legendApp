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
var FriendsIconRule = (function (_super) {
    __extends(FriendsIconRule, _super);
    function FriendsIconRule(id, t) {
        var _this = _super.call(this, id, t) || this;
        _this.firstTap = false;
        _this.showMessage = [
            Actor.ins().postLevelChange
        ];
        _this.updateMessage = [
            Friends.ins().postFriendChange
        ];
        return _this;
    }
    FriendsIconRule.prototype.checkShowIcon = function () {
        return Actor.level >= 70;
    };
    FriendsIconRule.prototype.checkShowRedPoint = function () {
        var rtn = 0;
        if (Object.keys(Friends.ins().newMsg).length > 0) {
            for (var key in Friends.ins().newMsg) {
                var value = Friends.ins().newMsg[key];
                if (value == true) {
                    rtn++;
                    break;
                }
            }
        }
        if (Friends.ins().appList.length > 0) {
            rtn++;
        }
        return rtn;
    };
    FriendsIconRule.prototype.getEffName = function (redPointNum) {
        return undefined;
    };
    FriendsIconRule.prototype.tapExecute = function () {
        if (Actor.level < GlobalConfig.FriendLimit.sysLv) {
            UserTips.ins().showTips(GlobalConfig.FriendLimit.sysLv + "\u7EA7\u5F00\u542F\u597D\u53CB\u529F\u80FD");
        }
        else {
            ViewManager.ins().open(FriendBgWin);
        }
    };
    return FriendsIconRule;
}(RuleIconBase));
__reflect(FriendsIconRule.prototype, "FriendsIconRule");
//# sourceMappingURL=FriendsIconRule.js.map