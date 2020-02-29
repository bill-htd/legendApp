var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MathUtils = (function () {
    function MathUtils() {
    }
    MathUtils.getAngle = function (radian) {
        return 180 * radian / Math.PI;
    };
    MathUtils.getRadian = function (angle) {
        return angle / 180 * Math.PI;
    };
    MathUtils.getRadian2 = function (p1X, p1Y, p2X, p2Y) {
        var xdis = p2X - p1X;
        var ydis = p2Y - p1Y;
        return Math.atan2(ydis, xdis);
    };
    MathUtils.getDistance = function (p1X, p1Y, p2X, p2Y) {
        var disX = p2X - p1X;
        var disY = p2Y - p1Y;
        var disQ = disX * disX + disY * disY;
        return Math.sqrt(disQ);
    };
    MathUtils.getDistanceByObject = function (s, t) {
        return this.getDistance(s.x, s.y, t.x, t.y);
    };
    MathUtils.getDistanceX2ByObject = function (s, t) {
        var disX = s.x - t.x;
        var disY = s.y - t.y;
        return disX * disX + disY * disY;
    };
    MathUtils.getDirMove = function (angle, distance, offsetX, offsetY) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        var radian = this.getRadian(angle);
        var p = { x: 0, y: 0 };
        p.x = Math.cos(radian) * distance + offsetX;
        p.y = Math.sin(radian) * distance + offsetY;
        return p;
    };
    MathUtils.limit = function ($from, $end) {
        $from = Math.min($from, $end);
        $end = Math.max($from, $end);
        var range = $end - $from;
        return $from + Math.random() * range;
    };
    MathUtils.limitInteger = function ($from, $end) {
        return Math.round(this.limit($from, $end));
    };
    MathUtils.randomArray = function (arr) {
        var index = Math.floor(Math.random() * arr.length);
        return arr[index];
    };
    MathUtils.toInteger = function (value) {
        return value >> 0;
    };
    return MathUtils;
}());
__reflect(MathUtils.prototype, "MathUtils");
//# sourceMappingURL=MathUtils.js.map