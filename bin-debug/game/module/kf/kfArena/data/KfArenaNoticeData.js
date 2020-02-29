var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var KfArenaNoticeData = (function () {
    function KfArenaNoticeData(bytes) {
        var type = bytes.readShort();
        if (type == 1 || type == 3) {
            this.servId = bytes.readInt();
            this.name = bytes.readString();
        }
        else {
            this.killerServId = bytes.readInt();
            this.killerName = bytes.readString();
            this.deadServId = bytes.readInt();
            this.deadName = bytes.readString();
        }
        this.noticeId = bytes.readShort();
    }
    return KfArenaNoticeData;
}());
__reflect(KfArenaNoticeData.prototype, "KfArenaNoticeData");
//# sourceMappingURL=KfArenaNoticeData.js.map