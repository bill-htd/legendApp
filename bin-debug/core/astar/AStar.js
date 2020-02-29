var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AStar = (function () {
    function AStar(map) {
        if (map === void 0) { map = null; }
        this.m_nMarkTag = 0;
        if (map) {
            this.initFromMap(map);
        }
    }
    AStar.prototype.initFromMap = function (map) {
        var nOldCount = 0;
        if (this.m_ASMapCells)
            nOldCount = this.m_ASMapCells.length;
        else
            this.m_ASMapCells = [];
        this.m_nWidth = map.numCols;
        this.m_nHeight = map.numRows;
        var nNewCount = this.m_nWidth * this.m_nHeight;
        if (nNewCount > this.m_ASMapCells.length)
            this.m_ASMapCells.length = nNewCount;
        for (var i = nOldCount; i < nNewCount; ++i) {
            this.m_ASMapCells[i] = new ASMapCell;
        }
        var x, y, idx;
        var cell;
        idx = 0;
        for (y = 0; y < this.m_nHeight; ++y) {
            for (x = 0; x < this.m_nWidth; ++x) {
                cell = this.m_ASMapCells[idx];
                cell.X = x;
                cell.Y = y;
                cell.CanNotMove = !map.isWalkableTile(x, y);
                idx++;
            }
        }
    };
    AStar.prototype.getPatch = function (fromX, fromY, targetX, targetY) {
        if (fromX == targetX && fromY == targetY)
            return null;
        if (fromX < 0 || fromX >= this.m_nWidth || fromY < 0 || fromY >= this.m_nHeight)
            debug.log("寻路的起始位置参数无效：(" + fromX + ", " + fromY + ")");
        if (targetX < 0 || targetX >= this.m_nWidth || targetY < 0 || targetY >= this.m_nHeight)
            debug.log("寻路的目的位置参数无效：(" + targetX + ", " + targetY + ")");
        var ac = this.m_ASMapCells[targetY * this.m_nWidth + targetX];
        if (!ac || ac.CanNotMove) {
            return null;
        }
        this.reset(fromX, fromY);
        if (this.pathLine({ x: fromX, y: fromY }, { x: targetX, y: targetY })) {
            return [new AStarNode(targetX, targetY, DirUtil.get8DirBy2Point({ x: fromX, y: fromY }, {
                    x: targetX,
                    y: targetY
                }))];
        }
        var boPathFound = false;
        var nCurX = fromX;
        var nCurY = fromY;
        var curCell = this.m_ASMapCells[nCurY * this.m_nWidth + nCurX];
        curCell.GCost = 0;
        curCell.LastX = -1;
        curCell.LastY = -1;
        curCell.X = nCurX;
        curCell.Y = nCurY;
        curCell.MarkTag = this.m_nMarkTag;
        curCell.HCost = Math.abs(targetX - fromX) + Math.abs(targetY - fromY) * 10;
        var i;
        var nX, nY;
        var cell;
        while (true) {
            if (nCurX == targetX && nCurY == targetY) {
                boPathFound = true;
                break;
            }
            if (curCell.State != ASMapCell.CSCLOSE) {
                this.closeCell(curCell);
            }
            for (i = 0; i < 8; ++i) {
                nX = nCurX + AStar.NEIGHBORPOS_X_VALUES[i];
                nY = nCurY + AStar.NEIGHBORPOS_Y_VALUES[i];
                if (nX < 0 || nX >= this.m_nWidth || nY < 0 || nY >= this.m_nHeight)
                    continue;
                cell = this.m_ASMapCells[nY * this.m_nWidth + nX];
                if (cell.CanNotMove)
                    continue;
                if (cell.MarkTag != this.m_nMarkTag || cell.State == ASMapCell.CSNONE) {
                    cell.MarkTag = this.m_nMarkTag;
                    cell.LastX = nCurX;
                    cell.LastY = nCurY;
                    cell.btDir = i;
                    cell.GCost = curCell.GCost + AStar.AS_MOVECOST[i & 1];
                    cell.HCost = Math.abs(targetX - nX) + Math.abs(targetY - nY) * 10;
                    this.openCell(cell);
                }
                else if (cell.State == ASMapCell.CSOPEN) {
                    if (cell.GCost > curCell.GCost + AStar.AS_MOVECOST[i & 1]) {
                        cell.LastX = nCurX;
                        cell.LastY = nCurY;
                        cell.btDir = i;
                        cell.GCost = curCell.GCost + AStar.AS_MOVECOST[i & 1];
                        this.reopenCell(cell);
                    }
                }
            }
            curCell = this.m_LastOpenCell;
            if (curCell == null)
                break;
            nCurX = curCell.X;
            nCurY = curCell.Y;
        }
        if (boPathFound) {
            var Result = new Array();
            var lastNode = void 0;
            while (true) {
                if (lastNode && curCell && lastNode.nDir == curCell.btDir) {
                }
                else {
                    lastNode = new AStarNode(curCell.X, curCell.Y, curCell.btDir);
                    Result.push(lastNode);
                }
                curCell = this.m_ASMapCells[curCell.LastY * this.m_nWidth + curCell.LastX];
                if ((curCell.LastX <= 0 && curCell.LastY <= 0) || curCell.MarkTag != this.m_nMarkTag)
                    break;
            }
            return Result;
        }
        return null;
    };
    AStar.prototype.pathLine = function (pt1, pt2) {
        var last = pt1;
        var k = 0;
        if (pt2.x == pt1.x)
            k = 1;
        else
            k = (pt2.y - pt1.y) * 1.0 / (pt2.x - pt1.x);
        var b = pt2.y - k * pt2.x;
        var dx = pt2.x > pt1.x ? 1 : -1;
        var dy = pt2.y > pt1.y ? 1 : -1;
        var px = pt1.x + (dx > 0 ? 1 : 0);
        var loop = Math.abs(pt1.x - pt2.x);
        var pos = pt2;
        for (var i = 0; i <= loop; i++, px += dx) {
            if (i != loop) {
                pos.x = dx > 0 ? px : px - 1;
                pos.y = Math.floor(k * pos.x + b);
            }
            if (last.y != pos.y) {
                for (var j = last.y + dy;; j += dy) {
                    if (!GameMap.checkWalkable(last.x, j)) {
                        return false;
                    }
                    if (j == pos.y)
                        break;
                }
            }
            if (i != loop) {
                if (!GameMap.checkWalkable(pos.x, pos.y)) {
                    return false;
                }
            }
            last = pos;
        }
        return true;
    };
    AStar.prototype.reset = function (cX, cY) {
        var cell = this.m_ASMapCells[cY * this.m_nWidth + cX];
        cell.LastX = 0;
        cell.LastY = 0;
        cell.HCost = 0;
        cell.GCost = 0;
        cell.FValue = 0;
        cell.State = 0;
        cell.Prev = null;
        cell.Next = null;
        cell.btDir = 0;
        this.m_LastOpenCell = null;
        this.m_nMarkTag = this.m_nMarkTag + 1;
    };
    AStar.prototype.closeCell = function (cell) {
        if (cell.State == ASMapCell.CSOPEN) {
            if (cell.Prev)
                cell.Prev.Next = cell.Next;
            if (cell.Next)
                cell.Next.Prev = cell.Prev;
            if (cell == this.m_LastOpenCell)
                this.m_LastOpenCell = cell.Prev;
        }
        cell.State = ASMapCell.CSCLOSE;
    };
    AStar.prototype.openCell = function (cell) {
        cell.State = ASMapCell.CSOPEN;
        var nFValue = cell.HCost + cell.GCost;
        cell.FValue = nFValue;
        var lastCell = this.m_LastOpenCell;
        if (!lastCell) {
            this.m_LastOpenCell = cell;
            cell.Prev = null;
            cell.Next = null;
        }
        else {
            while (lastCell.FValue < nFValue) {
                if (lastCell.Prev == null) {
                    lastCell.Prev = cell;
                    cell.Prev = null;
                    cell.Next = lastCell;
                    return;
                }
                lastCell = lastCell.Prev;
            }
            cell.Prev = lastCell;
            if (lastCell.Next) {
                cell.Next = lastCell.Next;
                lastCell.Next.Prev = cell;
                lastCell.Next = cell;
            }
            else {
                cell.Next = null;
                lastCell.Next = cell;
                this.m_LastOpenCell = cell;
            }
        }
    };
    AStar.prototype.reopenCell = function (cell) {
        var nFValue = cell.HCost + cell.GCost;
        cell.FValue = nFValue;
        var nextCell = cell.Next;
        if (nextCell && nextCell.FValue > nFValue) {
            do {
                nextCell = nextCell.Next;
            } while (nextCell && nextCell.FValue > nFValue);
            if (cell.Prev)
                cell.Prev.Next = cell.Next;
            if (cell.Next)
                cell.Next.Prev = cell.Prev;
            if (nextCell) {
                cell.Next = nextCell;
                if (nextCell.Prev) {
                    cell.Prev = nextCell.Prev;
                    nextCell.Prev.Next = cell;
                }
                else
                    cell.Prev = null;
                nextCell.Prev = cell;
            }
            else {
                cell.Prev = this.m_LastOpenCell;
                cell.Next = null;
                this.m_LastOpenCell.Next = cell;
                this.m_LastOpenCell = cell;
            }
        }
    };
    AStar.RMOVECOST = 14;
    AStar.DMOVECOST = 10;
    AStar.AS_MOVECOST = [AStar.DMOVECOST, AStar.RMOVECOST];
    AStar.NEIGHBORPOS_X_VALUES = [0, 1, 1, 1, 0, -1, -1, -1];
    AStar.NEIGHBORPOS_Y_VALUES = [-1, -1, 0, 1, 1, 1, 0, -1];
    return AStar;
}());
__reflect(AStar.prototype, "AStar");
var ASMapCell = (function () {
    function ASMapCell() {
    }
    ASMapCell.CSNONE = 0;
    ASMapCell.CSOPEN = 1;
    ASMapCell.CSCLOSE = 2;
    return ASMapCell;
}());
__reflect(ASMapCell.prototype, "ASMapCell");
//# sourceMappingURL=AStar.js.map