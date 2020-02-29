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
var RankDataLadder = (function (_super) {
    __extends(RankDataLadder, _super);
    function RankDataLadder() {
        return _super.call(this) || this;
    }
    RankDataLadder.prototype.parser = function (bytes, items) {
        this.id = bytes.readInt();
        this.player = bytes.readString();
        this.challgeLevel = bytes.readInt();
        this.challgeId = bytes.readInt();
        this.winNum = bytes.readInt();
        this.job = bytes.readByte();
        this.sex = bytes.readByte();
    };
    return RankDataLadder;
}(RankDataBase));
__reflect(RankDataLadder.prototype, "RankDataLadder");
//# sourceMappingURL=RankDataLadder.js.map