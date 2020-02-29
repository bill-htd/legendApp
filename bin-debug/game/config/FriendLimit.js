var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FriendLimit = (function () {
    function FriendLimit() {
        this.sysLv = 50;
        this.chatLv = 50;
        this.friendListLen = 50;
        this.chatsListLen = 50;
        this.applyListLen = 50;
        this.blacklistLen = 50;
        this.contentLimit = 50;
    }
    return FriendLimit;
}());
__reflect(FriendLimit.prototype, "FriendLimit");
//# sourceMappingURL=FriendLimit.js.map