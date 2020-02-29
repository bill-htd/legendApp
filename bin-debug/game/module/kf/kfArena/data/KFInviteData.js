var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var KFInviteData = (function () {
    function KFInviteData() {
    }
    KFInviteData.prototype.parse = function (bytes) {
        this.roleId = bytes.readInt();
        this.name = bytes.readString();
        this.power = bytes.readInt();
        this.score = bytes.readInt();
        this.winRate = bytes.readInt() / 100;
    };
    return KFInviteData;
}());
__reflect(KFInviteData.prototype, "KFInviteData");
var KFInviteType;
(function (KFInviteType) {
    KFInviteType[KFInviteType["Friend"] = 0] = "Friend";
    KFInviteType[KFInviteType["Guild"] = 1] = "Guild";
})(KFInviteType || (KFInviteType = {}));
//# sourceMappingURL=KFInviteData.js.map