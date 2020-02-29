var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BresenhamLine = (function () {
    function BresenhamLine() {
    }
    BresenhamLine.isAbleToThrough = function (ox, oy, tx, ty) {
        var x1 = 0, y1 = 0, x2 = 0, y2 = 0;
        var xstep = 0, ystep = 0, dx = 0, x = 0, y = 0, lastY = 0;
        var ny = 0, k = 0, b = 0, i = 0;
        if (!this.throughCheckResult) {
            this.throughCheckResult = new Array(4);
        }
        this.throughCheckResult[0] = 0;
        this.throughCheckResult[1] = 0;
        k = (ty - oy) / (tx - ox);
        b = ty - k * tx;
        xstep = tx > ox ? 1 : -1;
        ystep = ty > oy ? 1 : -1;
        x1 = ox >> 0, y1 = oy >> 0, x2 = tx >> 0, y2 = ty >> 0;
        dx = x2 - x1, dx = (dx ^ (dx >> 31)) - (dx >> 31);
        x = x1, lastY = y1;
        this.throughCheckResult[2] = x, this.throughCheckResult[3] = lastY;
        for (i = 0; i < dx; i++) {
            x += xstep;
            ny = k * x + b;
            y = ny >> 0;
            while (lastY != y) {
                lastY += ystep;
                if (!GameMap.checkWalkable(x, lastY))
                    return this.throughCheckResult;
                this.throughCheckResult[2] = x, this.throughCheckResult[3] = lastY;
            }
            if (!GameMap.checkWalkable(x, y))
                return this.throughCheckResult;
            this.throughCheckResult[2] = x, this.throughCheckResult[3] = y;
        }
        while (lastY != y2) {
            lastY += ystep;
            if (!GameMap.checkWalkable(x, lastY))
                return this.throughCheckResult;
            this.throughCheckResult[2] = x, this.throughCheckResult[3] = lastY;
        }
        this.throughCheckResult[0] = 1;
        return this.throughCheckResult;
    };
    BresenhamLine.tileLine = function (ox, oy, tx, ty) {
        var k = (ty - oy) / (tx - ox);
        var b = ty - k * tx;
        var dx = tx > ox ? 1 : -1;
        var loop = Math.abs(tx - ox);
        var result = [];
        for (var j = 0; j < loop; ++j) {
            var x = (ox + j * dx) >> 0;
            var y = (k * x + b) >> 0;
            result.push(x);
            result.push(y);
        }
        return result;
    };
    BresenhamLine.getPointOnLine = function (ox, oy, tx, ty, ds) {
        var os = 0, ts = 0, dx = 0, dy = 0;
        dx = tx - ox, dy = ty - oy;
        os = Math.sqrt(dx * dx + dy * dy);
        ts = os + ds;
        return [Math.round(ox + dx * ts / os), Math.round(oy + dy * ts / os)];
    };
    BresenhamLine.shortenPath = function (ox, oy, path, distance) {
        var sx = ox, sy = oy;
        var tx = path[path.length - 2], ty = path[path.length - 1];
        var dx = 0, dy = 0;
        var pt;
        if (path.length >= 4) {
            sx = path[path.length - 4], sy = path[path.length - 3];
        }
        dx = tx - sx, dy = ty - sy;
        if (dx * dx + dy * dy > distance * distance) {
            pt = BresenhamLine.getPointOnLine(sx, sy, tx, ty, -distance);
            path[path.length - 2] = pt[0], path[path.length - 1] = pt[1];
        }
        else {
            path.length -= 2;
        }
    };
    return BresenhamLine;
}());
__reflect(BresenhamLine.prototype, "BresenhamLine");
//# sourceMappingURL=BresenhamLine.js.map