var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RankDataBase = (function () {
    function RankDataBase() {
    }
    RankDataBase.prototype.parser = function (bytes, items) {
        var _this = this;
        items.forEach(function (key) {
            _this[key] = bytes[RankDataType.readFunc[key]]();
        });
    };
    return RankDataBase;
}());
__reflect(RankDataBase.prototype, "RankDataBase");
//# sourceMappingURL=RankDataBase.js.map