var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GwRankInfoData = (function () {
    function GwRankInfoData() {
    }
    GwRankInfoData.prototype.parse = function (bytes) {
        this.rank = bytes.readInt();
        this.nameStr = bytes.readString();
        var num = bytes.readInt();
        this.floorNum = Math.floor(num / 10000);
        this.timeNum = 10000 - (num % 10000);
    };
    GwRankInfoData.prototype.getgetTimeStr = function () {
        var str = "";
        str = DateUtils.getFormatBySecond(this.timeNum, DateUtils.TIME_FORMAT_3);
        return str;
    };
    return GwRankInfoData;
}());
__reflect(GwRankInfoData.prototype, "GwRankInfoData");
//# sourceMappingURL=GwRankInfoData.js.map