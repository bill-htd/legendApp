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
var MapViewBg = (function (_super) {
    __extends(MapViewBg, _super);
    function MapViewBg() {
        var _this = _super.call(this) || this;
        _this._shape = new egret.Shape;
        _this.lastUpdateX = 0;
        _this.lastUpdateY = 0;
        _this.turn = 0;
        _this.shape = [];
        _this.touchChildren = false;
        _this.touchEnabled = false;
        var s = new eui.Image();
        _this.addChild(s);
        _this.thumbnail = s;
        _this.thumbnail.addEventListener(egret.Event.COMPLETE, _this.onThumbnailComplete, _this);
        _this._imageList = [];
        _this.showImages = [];
        _this._poolImages = [];
        _this._fileDic = {};
        return _this;
    }
    MapViewBg.prototype.destructor = function () {
        this.thumbnail.removeEventListener(egret.Event.COMPLETE, this.onThumbnailComplete, this);
        this.removeChildren();
        this._imageList.length = 0;
    };
    MapViewBg.prototype.onThumbnailComplete = function (e) {
        this.isThumbnailComplete = true;
        if (e.target && e.target.name == this.mapName)
            this.updateHDMap({ x: this.lastUpdateX, y: this.lastUpdateY }, true);
    };
    MapViewBg.prototype.initThumbnail = function (w, h, fName, turn) {
        if (this.mapName != fName) {
            this.isThumbnailComplete = false;
        }
        if (this.mapName != fName || this.turn != turn) {
            this.clearHDMap();
        }
        if (this.mapName != fName) {
            this.destroyFile();
        }
        this.mapName = fName;
        this.turn = turn;
        this.thumbnail.width = w;
        this.thumbnail.height = h;
        this.thumbnail.source = "" + MAP_DIR + this.mapName + "/small.jpg";
        this.thumbnail.scaleX = turn ? -1 : 1;
        this.thumbnail.x = turn ? w : 0;
        this.thumbnail.name = this.mapName;
        var imgSize = 256;
        this.maxImagX = Math.floor(w / imgSize);
        this.maxImagY = Math.floor(h / imgSize);
        this.updateHDMap({ x: this.lastUpdateX, y: this.lastUpdateY }, true);
    };
    MapViewBg.prototype.clearHDMap = function () {
        this._imageList = [];
        this.showImages = [];
        this.removeChildren();
        this.addChild(this.thumbnail);
    };
    MapViewBg.prototype.destroyFile = function () {
        var baseAnalyzer = RES.getAnalyzer(RES.ResourceItem.TYPE_IMAGE);
        for (var url in this._fileDic) {
            baseAnalyzer.destroyRes(url);
        }
        this._fileDic = {};
    };
    MapViewBg.prototype.getImage = function () {
        return this._poolImages.pop() || new eui.Image();
    };
    MapViewBg.prototype.updateHDMap = function (p, force) {
        if (force === void 0) { force = false; }
        var imgSize = 256;
        if (force || Math.abs(this.lastUpdateX - p.x) > imgSize / 4 || Math.abs(this.lastUpdateY - p.y) > imgSize / 4 || this.lastUpdateX == 0) {
            this.lastUpdateX = p.x;
            this.lastUpdateY = p.y;
            if (!this.isThumbnailComplete)
                return;
            var shows = [];
            var ww = StageUtils.ins().getWidth();
            var hh = StageUtils.ins().getHeight();
            var imgX = Math.max(Math.floor(-p.x / imgSize) - 1, 0);
            var imgY = Math.max(Math.floor(-p.y / imgSize) - 1, 0);
            var imgXCount = imgX + Math.floor(ww / imgSize) + 2;
            var imgYCount = imgY + Math.floor(hh / imgSize) + 2;
            if (this.turn) {
                for (var i = imgX; i <= imgXCount && i < this.maxImagX; i++) {
                    var index = this.maxImagX - i > 0 ? this.maxImagX - i - 1 : 0;
                    for (var j = imgY; j <= imgYCount && j < this.maxImagY; j++) {
                        this._imageList[j] = this._imageList[j] || [];
                        if (!this._imageList[j][index]) {
                            var sourceName = "" + MAP_DIR + this.mapName + "/image/" + j + "_" + index + ".jpg";
                            this._fileDic[sourceName] = 1;
                            var s = this.getImage();
                            s.source = sourceName;
                            s.name = sourceName;
                            s.scaleX = -1;
                            s.x = (i + 1) * imgSize;
                            s.y = j * imgSize;
                            this.addChild(s);
                            this._imageList[j][index] = s;
                        }
                        else {
                            if (!this._imageList[j][index].parent) {
                                this.addChild(this._imageList[j][index]);
                            }
                        }
                        shows.push(this._imageList[j][index]);
                    }
                }
            }
            else {
                for (var i = imgX; i <= imgXCount && i < this.maxImagX; i++) {
                    for (var j = imgY; j <= imgYCount && j < this.maxImagY; j++) {
                        this._imageList[j] = this._imageList[j] || [];
                        if (!this._imageList[j][i]) {
                            var sourceName = "" + MAP_DIR + this.mapName + "/image/" + j + "_" + i + ".jpg";
                            this._fileDic[sourceName] = 1;
                            var s = this.getImage();
                            s.source = sourceName;
                            s.name = sourceName;
                            s.x = i * imgSize;
                            s.y = j * imgSize;
                            this.addChild(s);
                            this._imageList[j][i] = s;
                        }
                        else {
                            if (!this._imageList[j][i].parent) {
                                this.addChild(this._imageList[j][i]);
                            }
                        }
                        shows.push(this._imageList[j][i]);
                    }
                }
            }
            var len = this.showImages.length;
            for (var i = len - 1; i >= 0; i--) {
                if (shows.indexOf(this.showImages[i]) >= 0)
                    continue;
                DisplayUtils.removeFromParent(this.showImages[i]);
            }
            this.showImages = shows;
        }
        if (false) {
            var ww = (StageUtils.ins().getWidth() / 1) >> 0;
            var hh = (StageUtils.ins().getHeight() / 1) >> 0;
            var gsx = Math.max(Math.floor(-p.x / GameMap.CELL_SIZE), 0);
            var gsy = Math.max(Math.floor(-p.y / GameMap.CELL_SIZE), 0);
            var gex = gsx + Math.ceil(ww / GameMap.CELL_SIZE);
            var gey = gsy + Math.ceil(hh / GameMap.CELL_SIZE);
            this.drawGrid({ x: gsx, y: gsy }, { x: gex, y: gey });
        }
    };
    MapViewBg.prototype.drawGrid = function (s, e) {
        this.clearDrawGrid();
        this.shapeContainer = this.shapeContainer || new egret.DisplayObjectContainer();
        this.shapeContainer.cacheAsBitmap = true;
        this.shapeContainer.touchEnabled = false;
        this.shapeContainer.touchChildren = false;
        for (var i = s.x; i < e.x; i++) {
            for (var j = s.y; j < e.y; j++) {
                var index = i * e.x + j;
                var rect = this.shape[index];
                if (!rect)
                    rect = this.shape[index] = new egret.Shape;
                rect.graphics.lineStyle(1, 0xFFFFFF);
                if (GameMap.checkAlpha(i, j)) {
                    rect.graphics.beginFill(0x0000ff, 0.8);
                }
                else if (GameMap.checkWalkable(i, j)) {
                    rect.graphics.beginFill(0x00ff00, 0.8);
                }
                else {
                    rect.graphics.beginFill(0xff0000, 0.8);
                }
                rect.graphics.drawRect(0, 0, GameMap.CELL_SIZE, GameMap.CELL_SIZE);
                rect.graphics.endFill();
                rect.x = i * GameMap.CELL_SIZE;
                rect.y = j * GameMap.CELL_SIZE;
                var text = new eui.Label();
                text.size = 12;
                text.text = i + "," + j;
                text.x = i * GameMap.CELL_SIZE;
                text.y = j * GameMap.CELL_SIZE;
                text.name = "label" + i + "," + j;
                this.shapeContainer.addChild(text);
                this.shapeContainer.addChild(rect);
            }
        }
        this.addChild(this.shapeContainer);
    };
    MapViewBg.prototype.clearDrawGrid = function () {
        if (this.shapeContainer && this.shape) {
            while (this.shapeContainer.numChildren > 0) {
                this.shapeContainer.removeChildAt(0);
            }
            this.shape.length = 0;
        }
    };
    return MapViewBg;
}(egret.DisplayObjectContainer));
__reflect(MapViewBg.prototype, "MapViewBg");
//# sourceMappingURL=MapViewBg.js.map