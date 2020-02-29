var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WorldBossRankItemData = (function () {
    function WorldBossRankItemData() {
    }
    WorldBossRankItemData.prototype.parser = function (bytes) {
        this.id = bytes.readInt();
        this.roleName = bytes.readString();
        this.value = bytes.readDouble();
    };
    WorldBossRankItemData.prototype.parser1 = function (bytes) {
        this.roleName = bytes.readString();
        this.value = bytes.readInt();
    };
    Object.defineProperty(WorldBossRankItemData.prototype, "name", {
        get: function () {
            var str = this.roleName + ":" + CommonUtils.overLength(this.value);
            return str;
        },
        enumerable: true,
        configurable: true
    });
    return WorldBossRankItemData;
}());
__reflect(WorldBossRankItemData.prototype, "WorldBossRankItemData");
//# sourceMappingURL=WorldBossRankItemData.js.map