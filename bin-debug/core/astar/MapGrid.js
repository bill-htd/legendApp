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
var MapGrid = (function (_super) {
    __extends(MapGrid, _super);
    function MapGrid() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = false;
        _this._poolNodes = [];
        return _this;
    }
    Object.defineProperty(MapGrid.prototype, "numCols", {
        get: function () {
            return this._numCols;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapGrid.prototype, "numRows", {
        get: function () {
            return this._numRows;
        },
        enumerable: true,
        configurable: true
    });
    MapGrid.prototype.getNode = function (x, y) {
        if (this._nodes[x])
            return this._nodes[x][y];
        else
            return undefined;
    };
    MapGrid.prototype.isWalkableTile = function (x, y) {
        if (x < 0 || x >= this._numCols || y < 0 || y >= this._numRows)
            return false;
        else
            return this._nodes[x][y].walkable;
    };
    MapGrid.prototype.destruct = function () {
        this.clearNodes();
    };
    MapGrid.prototype.initMapInfo = function (mapInfo, turn) {
        if (this._nodes)
            this.clearNodes();
        this._numRows = mapInfo.maxY;
        this._numCols = mapInfo.maxX;
        this._nodes = [];
        var node;
        for (var i = 0; i < this._numCols; i++) {
            this._nodes[i] = [];
            for (var j = 0; j < this._numRows; j++) {
                node = this.getGridNode();
                node.flags = mapInfo.grids[i * this._numRows + j];
                this._nodes[i][j] = node;
            }
        }
        if (turn)
            this._nodes.reverse();
    };
    MapGrid.prototype.clearNodes = function () {
        for (var i in this._nodes) {
            this._poolNodes = this._poolNodes.concat(this._nodes[i]);
            this._nodes[i].length = 0;
        }
        this._nodes.length = 0;
    };
    MapGrid.prototype.getGridNode = function () {
        return this._poolNodes.pop() || new MapGridNode();
    };
    MapGrid.prototype._trace = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.debugTrace != null)
            this.debugTrace.apply(null, args);
    };
    return MapGrid;
}(egret.Sprite));
__reflect(MapGrid.prototype, "MapGrid");
//# sourceMappingURL=MapGrid.js.map