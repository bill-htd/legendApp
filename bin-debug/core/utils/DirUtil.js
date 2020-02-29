var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DirUtil = (function () {
    function DirUtil() {
    }
    DirUtil.get8DirBy2Point = function (p1, p2) {
        var angle = MathUtils.getAngle(MathUtils.getRadian2(p1.x, p1.y, p2.x, p2.y));
        return this.angle2dir(angle);
    };
    DirUtil.get4DirBy2Point = function (p1, p2) {
        return p1.x < p2.x ? (p1.y < p2.y ? 3 : 1) : (p1.y < p2.y ? 5 : 7);
    };
    DirUtil.dir2angle = function (dir) {
        dir *= 45;
        dir -= 90;
        return dir;
    };
    DirUtil.angle2dir = function (angle) {
        if (angle < -90)
            angle += 360;
        return Math.round((angle + 90) / 45) % 8;
    };
    DirUtil.dirOpposit = function (dir) {
        return dir < 4 ? dir + 4 : dir - 4;
    };
    DirUtil.get5DirBy8Dir = function (dir8) {
        return dir8 - this.isScaleX(dir8);
    };
    DirUtil.isScaleX = function (dir8) {
        var td = 2 * (dir8 - 4);
        if (td < 0)
            td = 0;
        return td;
    };
    DirUtil.getGridByDir = function (dir, pos, p) {
        if (pos === void 0) { pos = 1; }
        if (p === void 0) { p = {
            x: 0,
            y: 0
        }; }
        var angle = this.dir2angle(this.dirOpposit(dir));
        return MathUtils.getDirMove(angle, pos * GameMap.CELL_SIZE, p.x, p.y);
    };
    return DirUtil;
}());
__reflect(DirUtil.prototype, "DirUtil");
//# sourceMappingURL=DirUtil.js.map