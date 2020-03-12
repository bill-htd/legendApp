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
var RankDataScore = (function (_super) {
    __extends(RankDataScore, _super);
    function RankDataScore() {
        return _super.call(this) || this;
    }
    RankDataScore.prototype.parser = function (bytes, items) {
        this.pos = bytes.readShort();
        this.id = bytes.readInt();
        this.player = bytes.readString();
        this.level = bytes.readShort();
        this.zslevel = bytes.readShort();
        this.viplevel = bytes.readShort();
        this.monthCard = bytes.readShort();
        this.value = bytes.readDouble();
    };
    return RankDataScore;
}(RankDataBase));
__reflect(RankDataScore.prototype, "RankDataScore");
//# sourceMappingURL=RankDataScore.js.map