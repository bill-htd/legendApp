var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MapGridNode = (function () {
    function MapGridNode() {
    }
    Object.defineProperty(MapGridNode.prototype, "hidden", {
        get: function () {
            return (this.flags & (1 << 1)) > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapGridNode.prototype, "walkable", {
        get: function () {
            return (this.flags & (1 << 0)) > 0;
        },
        enumerable: true,
        configurable: true
    });
    MapGridNode.FLAG_WALKABLE = 0x8000;
    MapGridNode.FLAG_HIDDEN = 0x4000;
    return MapGridNode;
}());
__reflect(MapGridNode.prototype, "MapGridNode");
//# sourceMappingURL=MapGridNode.js.map