var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameMap = (function () {
    function GameMap() {
    }
    GameMap.init = function (data) {
        this.grid = this.grid || new MapGrid;
        this.aStar = this.aStar || new AStar;
        this.mapZip = data;
    };
    GameMap.update = function () {
    };
    GameMap.moveEntity = function (entity, endX, endY, isStraightLine) {
        if (isStraightLine === void 0) { isStraightLine = false; }
        var size = GameMap.CELL_SIZE;
        var sx = Math.floor(entity.x / size);
        var sy = Math.floor(entity.y / size);
        var tx = Math.floor(endX / size);
        var ty = Math.floor(endY / size);
        var path;
        if (isStraightLine) {
            path = [new AStarNode(endX, endY, DirUtil.get8DirBy2Point({ x: entity.x, y: entity.y }, {
                    x: endX,
                    y: endY
                }))];
        }
        else if (sx == tx && sy == ty)
            path = [new AStarNode(tx, ty, DirUtil.get8DirBy2Point({ x: entity.x, y: entity.y }, {
                    x: endX,
                    y: endY
                }))];
        else {
            path = this.aStar.getPatch(sx, sy, tx, ty);
            if (!path) {
                return;
            }
        }
        GameLogic.ins().postMoveEntity(entity, path, !isStraightLine);
    };
    GameMap.getPatch = function (fromX, fromY, targetX, targetY) {
        var path = this.aStar.getPatch(fromX, fromY, targetX, targetY);
        return path;
    };
    GameMap.myMoveTo = function (tx, ty, fun, funThis) {
        var len = SubRoles.ins().subRolesLen;
        var char;
        for (var i = 0; i < len; i++) {
            char = EntityManager.ins().getMainRole(i);
            if (char)
                this.moveEntity(char, tx, ty);
        }
        var tempFunc = function () {
            var isCom = true;
            for (var i = 0; i < len; i++) {
                char = EntityManager.ins().getMainRole(i);
                if (char && char.action == EntityAction.RUN) {
                    if (MathUtils.getDistance(char.x, char.y, tx, ty) < 100) {
                        char.stopMove();
                        char.playAction(EntityAction.STAND);
                    }
                    isCom = false;
                }
            }
            if (isCom) {
                TimerManager.ins().remove(tempFunc, this);
                fun && fun.call(funThis);
            }
        };
        TimerManager.ins().doTimer(500, 0, tempFunc, this);
    };
    GameMap.moveTo = function (endX, endY) {
        var size = GameMap.CELL_SIZE;
        var tx = Math.floor(endX / size);
        var ty = Math.floor(endY / size);
        SysSetting.ins().setValue("mapClickTx", tx);
        SysSetting.ins().setValue("mapClickTy", ty);
        if (!this.checkWalkable(tx, ty)) {
            return false;
        }
        var role = EntityManager.ins().getNoDieRole();
        if (!role) {
            return false;
        }
        if (role.hasFilter(EntityFilter.hard)) {
            UserTips.ins().showTips("\u88AB\u9EBB\u75F9\uFF0C\u65E0\u6CD5\u79FB\u52A8");
            return false;
        }
        var sx = Math.floor(role.x / size);
        var sy = Math.floor(role.y / size);
        var path = this.aStar.getPatch(sx, sy, tx, ty);
        if (!path || path.length == 0) {
            return false;
        }
        var lastNode = path[0];
        lastNode.nX = endX;
        lastNode.nY = endY;
        GameLogic.ins().sendFindPathToServer(role.infoModel.handle, path, false);
        return true;
    };
    GameMap.checkWalkable = function (x, y) {
        var rtn = false;
        var node = this.grid.getNode(x, y);
        if (!node) {
            (debug.log("地图:" + this.mapID + "副本:" + this._fubenID + "坐标:" + x + "," + y + "出现问题!"));
        }
        else {
            rtn = node.walkable;
        }
        return rtn;
    };
    GameMap.checkAlpha = function (x, y) {
        var rtn = false;
        var node = this.grid.getNode(x, y);
        if (!node) {
            (debug.log("地图:" + this.mapID + "副本:" + this._fubenID + "坐标:" + x + "," + y + "出现问题!"));
        }
        else {
            rtn = node.hidden;
        }
        return rtn;
    };
    GameMap.parser = function (bytes) {
        this.lastFbId = this.fubenID;
        this.fubenID = bytes.readInt();
        this.mapID = bytes.readInt();
        this.mapX = bytes.readShort();
        this.mapY = bytes.readShort();
        this.lastFbTyp = this.fbType;
        this.fbType = bytes.readByte();
        this.fbName = bytes.readString();
        this.fbDesc = bytes.readString();
        var mapName = this.getFileName();
        var mapInfo = this.mapZip[mapName];
        this.CELL_SIZE = mapInfo.title_wh;
        this.MAX_HEIGHT = mapInfo.pixHeight;
        this.MAX_WIDTH = mapInfo.pixWidth;
        this.COL = mapInfo.maxX;
        this.ROW = mapInfo.maxY;
        this.grid.initMapInfo(mapInfo, GameMap.getTurn());
        this.aStar.initFromMap(this.grid);
        this.SafetyZone = {};
        var cfg = GlobalConfig.ScenesConfig[this.mapID];
        for (var i = 0; cfg.area && i < cfg.area.length; i++) {
            var area = cfg.area[i];
            var attr = area.attr;
            for (var j = 0; j < attr.length; j++) {
                switch (attr[j].type) {
                    case 0:
                        this.safetyCalculate(area);
                        break;
                }
            }
        }
    };
    GameMap.safetyCalculate = function (area) {
        var p = area.grids;
        var left = Number.MAX_VALUE;
        var top = Number.MAX_VALUE;
        var right = Number.MIN_VALUE;
        var botton = Number.MIN_VALUE;
        var isHas = false;
        for (var i = 0; i < p.length; i++) {
            var p1 = p[i];
            var p2 = i + 1 == p.length ? p[0] : p[i + 1];
            var ps = BresenhamLine.tileLine(p1.x, p1.y, p2.x, p2.y);
            for (var k = 0; k < ps.length; k += 2) {
                var x = ps[k];
                var y = ps[k + 1];
                this.SafetyZone[y * GameMap.CELL_SIZE + x] = { x: x, y: y };
                isHas = true;
            }
            left = Math.min(p1.x, left);
            right = Math.max(p1.x, right);
            top = Math.min(p1.y, top);
            botton = Math.max(p1.y, botton);
        }
        if (isHas) {
            for (var i = top; i <= botton; i++) {
                var start = void 0;
                var end = void 0;
                for (var j = left; j <= right; j++) {
                    if (this.SafetyZone[i * GameMap.CELL_SIZE + j]) {
                        start = j;
                        break;
                    }
                }
                for (var j = right; j >= left; j--) {
                    if (this.SafetyZone[i * GameMap.CELL_SIZE + j]) {
                        end = j;
                        break;
                    }
                }
                if (!isNaN(start) && !isNaN(end)) {
                    for (var j = start + 1; j <= end; j++) {
                        this.SafetyZone[i * GameMap.CELL_SIZE + j] = { x: i, y: j };
                    }
                }
            }
        }
    };
    GameMap.checkSafety = function (xy) {
        return !!this.SafetyZone[xy.y * GameMap.CELL_SIZE + xy.x];
    };
    Object.defineProperty(GameMap, "fubenID", {
        get: function () {
            return this._fubenID;
        },
        set: function (value) {
            this._fubenID = value;
            if (value > 0) {
                GameLogic.ins().postHookStateChange(GameLogic.HOOK_STATE_HOOK);
            }
        },
        enumerable: true,
        configurable: true
    });
    GameMap.sceneInMain = function () {
        return GameMap.fbType == 0 && GameMap.fubenID == 0;
    };
    GameMap.sceneInMine = function () {
        return GameMap.fbType == 0 && GameMap.fubenID != 0;
    };
    GameMap.canStartAI = function () {
        return GameMap.fbType == 0;
    };
    GameMap.getFileName = function () {
        return GlobalConfig.ScenesConfig[this.mapID].mapfilename;
    };
    GameMap.getTurn = function () {
        return GlobalConfig.ScenesConfig[this.mapID].turn;
    };
    GameMap.autoPunch = function () {
        return GlobalConfig.ScenesConfig[this.mapID].autoPunch == 1;
    };
    GameMap.getRectangle = function (target, x, y) {
        var _x = target.x + (x - 0.5) * GameMap.CELL_SIZE;
        var _y = target.y + (y - 0.5) * GameMap.CELL_SIZE;
        return new egret.Rectangle(_x, _y, GameMap.CELL_SIZE, GameMap.CELL_SIZE);
    };
    GameMap.getIncludeElement = function (target, points, charList) {
        var list = [];
        for (var k in points) {
            var re = GameMap.getRectangle(target, points[k].x, points[k].y);
            for (var p in charList) {
                var char = charList[p];
                if (char.x >= re.x && char.y >= re.y && char.x < re.x + re.width && char.y < re.y + re.height) {
                    list.push(char);
                }
            }
        }
        return list;
    };
    GameMap.getPoint = function (index, w, h) {
        var y = Math.floor(index / w) - Math.floor(h / 2);
        var x = Math.floor(index % w) - Math.floor(w / 2);
        return new egret.Point(x, y);
    };
    GameMap.getTargetIndex = function (sour, target, width, height) {
        var aX = target.x - sour.x + GameMap.CELL_SIZE * (width / 2);
        var aY = target.y - sour.y + GameMap.CELL_SIZE * (height / 2);
        var x = Math.floor(aX / GameMap.CELL_SIZE);
        var y = Math.floor(aY / GameMap.CELL_SIZE);
        return width * y + x;
    };
    GameMap.checkWalkableByPixel = function (x, y) {
        var mapX = Math.floor(x / GameMap.CELL_SIZE);
        var mapY = Math.floor(y / GameMap.CELL_SIZE);
        return GameMap.checkWalkable(mapX, mapY);
    };
    GameMap.getPosRange = function (px, py, range) {
        var _x = MathUtils.limitInteger(-range, +range);
        var _y = MathUtils.limitInteger(-range, +range);
        if (+_x != +range) {
            _y = Math.random() < 0.5 ? -range : range;
        }
        var count = 0;
        var i = _x, j = _y;
        while (true) {
            var walk = GameMap.checkWalkable(px + i, py + j);
            if (walk) {
                return [px + i, py + j];
            }
            if (i == range && j < range) {
                j += 1;
            }
            else if (j == range && i > -range) {
                i -= 1;
            }
            else if (i == -range && j > -range) {
                j -= 1;
            }
            else if (j == -range && i < range) {
                i += 1;
            }
            if (i == _x && j == _y) {
                if (_x == range) {
                    i = _x = range + 1;
                }
                if (_x == -range) {
                    i = _x = -range - 1;
                }
                if (_y == range) {
                    j = _y = range + 1;
                }
                if (_y == -range) {
                    j = _y = -range - 1;
                }
                range += 1;
            }
            count += 1;
            if (count > 100) {
                break;
            }
        }
        return [px, py];
    };
    GameMap.getPosRangeByDir = function (px, py, dir, range) {
        var _px = px, _py = py;
        if ((dir >= 0 && dir <= 1) || dir == 7) {
            _py -= range;
        }
        if (dir >= 3 && dir <= 5) {
            _py += range;
        }
        if (dir >= 1 && dir <= 3) {
            _px += range;
        }
        if (dir >= 5 && dir <= 7) {
            _px -= range;
        }
        return [_px, _py, GameMap.checkWalkable(_px, _py)];
    };
    GameMap.getPosRangeRandom = function (x, y, dir, range) {
        if (range === void 0) { range = 1; }
        var px = GameMap.point2Grip(x);
        var py = GameMap.point2Grip(y);
        var arr = [dir];
        var random = Math.random();
        if (random > 0.66) {
            dir = dir - 1 < 0 ? 7 : dir - 1;
            arr.unshift(dir);
            if (random > 0.8) {
                arr.push((dir + 2) % 8);
            }
            else {
                arr.splice(1, 0, (dir + 2) % 8);
            }
        }
        else if (random > 0.33) {
            dir = dir + 1 > 7 ? 0 : dir + 1;
            arr.unshift(dir);
            if (random > 0.5) {
                arr.push((dir - 2 + 8) % 8);
            }
            else {
                arr.splice(1, 0, (dir - 2 + 8) % 8);
            }
        }
        var isGetPoint = false;
        var pos;
        for (var i = 0; i < arr.length; i++) {
            pos = GameMap.getPosRangeByDir(px, py, arr[i], range);
            if (pos[2]) {
                isGetPoint = true;
                break;
            }
        }
        if (!isGetPoint) {
            pos = GameMap.getPosRange(px, py, range);
        }
        return pos;
    };
    GameMap.point2Grip = function (x) {
        return Math.floor(x / GameMap.CELL_SIZE);
    };
    GameMap.grip2Point = function (px) {
        return px * GameMap.CELL_SIZE + (GameMap.CELL_SIZE >> 1);
    };
    GameMap.fbType = 0;
    GameMap.lastFbTyp = 0;
    GameMap.lastFbId = 0;
    return GameMap;
}());
__reflect(GameMap.prototype, "GameMap");
//# sourceMappingURL=GameMap.js.map