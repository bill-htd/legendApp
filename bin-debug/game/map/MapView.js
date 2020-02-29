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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MapView = (function (_super) {
    __extends(MapView, _super);
    function MapView() {
        var _this = _super.call(this) || this;
        _this.moveObjDic = {};
        _this.touchEnabled = true;
        _this.touchChildren = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, MapView.onGridClick, MapView);
        egret.startTick(_this.onEnterFrame, _this);
        return _this;
    }
    MapView.prototype.initMap = function () {
        var _this = this;
        this._stepIndex = {};
        this._mapImage = new MapViewBg();
        this.addChild(this._mapImage);
        this._dropLayer = new egret.DisplayObjectContainer;
        this.addChild(this._dropLayer);
        this._effBottomLayer = new egret.DisplayObjectContainer;
        this.addChild(this._effBottomLayer);
        this._entityLayer = new egret.DisplayObjectContainer;
        this.addChild(this._entityLayer);
        this._dropNameLayer = new egret.DisplayObjectContainer;
        this.addChild(this._dropNameLayer);
        this._effTopLayer = new egret.DisplayObjectContainer;
        this.addChild(this._effTopLayer);
        this._bloodLayer = new BloodView;
        this.addChild(this._bloodLayer);
        SkillEffPlayer.bottomLayer = this._effBottomLayer;
        SkillEffPlayer.topLayer = this._effTopLayer;
        SkillEffPlayer.setTimeout = function (time, fun, funThis) {
            TimerManager.ins().doTimer(time, 1, fun, funThis);
        };
        SkillEffPlayer.shake = function (e, range, time, count, probability) {
            probability = probability || 1;
            if (e == EntityManager.ins().getMainRole(0) && (Math.random() < probability)) {
                DisplayUtils.shakeIt(_this._mapImage, range, time, count);
            }
        };
        DropHelp.init(this._dropLayer, this._dropNameLayer);
        TimerManager.ins().doTimer(500, 0, this.sortEntity, this);
    };
    MapView.prototype.sortEntity = function () {
        this._entityLayer.$children.sort(this.sortF);
    };
    MapView.prototype.sortF = function (d1, d2) {
        if (d1.weight > d2.weight) {
            return 1;
        }
        else if (d1.weight < d2.weight) {
            return -1;
        }
        else {
            return 0;
        }
    };
    MapView.prototype.addEntity = function (entity) {
        this._entityLayer.addChild(entity);
    };
    MapView.prototype.moveEntity = function (param) {
        var entity = param[0];
        var path = param[1];
        var isGrip = param[2] == undefined ? true : !!param[2];
        if (path && path.length) {
            this._stepIndex[entity.hashCode] = path.length - 1;
            this.moveNextStep(entity, path, isGrip);
        }
        else {
            entity.playAction(EntityAction.STAND);
        }
    };
    MapView.moveComplete = function (e) {
        return e;
    };
    MapView.prototype.moveNextStep = function (entity, path, isGrid) {
        if (isGrid === void 0) { isGrid = true; }
        entity.stopMove();
        if (entity.action == EntityAction.DIE)
            return;
        if (this._stepIndex[entity.hashCode] < 0) {
            delete this._stepIndex[entity.hashCode];
            entity.playAction(EntityAction.STAND);
            MapView.moveComplete(entity);
            return;
        }
        var node = path[this._stepIndex[entity.hashCode]];
        var nextPoint = { x: 0, y: 0 };
        var dir = node.nDir;
        if (isGrid) {
            nextPoint.x = GameMap.grip2Point(node.nX);
            nextPoint.y = GameMap.grip2Point(node.nY);
        }
        else {
            nextPoint.x = node.nX;
            nextPoint.y = node.nY;
        }
        if (entity instanceof CharRole || (entity.infoModel.dirNum != 2)) {
            dir = DirUtil.get8DirBy2Point(entity, nextPoint);
        }
        else {
            dir = DirUtil.get4DirBy2Point(entity, nextPoint);
        }
        entity.dir = dir;
        entity.playAction(EntityAction.RUN);
        this.moveToPoint(entity, nextPoint, path, isGrid);
    };
    MapView.prototype.moveToPoint = function (entity, nextPoint, path, isGrid) {
        var curTime = egret.getTimer();
        var obj = this.moveObjDic[entity.hashCode];
        var timeGap = 0;
        if (obj && curTime > obj.total) {
            timeGap = obj.total - curTime;
        }
        entity.canMove = true;
        var vec = {
            x: nextPoint.x - entity.x,
            y: nextPoint.y - entity.y
        };
        var moveSpeed = entity.moveSpeed / 1000;
        var xb = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
        var isMainRole = entity == EntityManager.ins().getNoDieRole();
        var total = xb / moveSpeed;
        vec.x = vec.x / total;
        vec.y = vec.y / total;
        var newObj = {
            entity: entity,
            endPoint: nextPoint,
            vec: vec,
            path: path,
            isGrid: isGrid,
            time: curTime + timeGap,
            total: curTime + total + timeGap,
            isMainRole: isMainRole
        };
        this.moveObjDic[entity.hashCode] = newObj;
        if (timeGap < 0) {
            this.moveObj(newObj, curTime);
        }
        if (isMainRole)
            SoundUtil.ins().playRun();
    };
    MapView.prototype.onEnterFrame = function (dt) {
        for (var hashCode in this.moveObjDic) {
            var obj = this.moveObjDic[hashCode];
            if (!obj.entity.canMove) {
                delete this.moveObjDic[hashCode];
            }
            else {
                this.moveObj(this.moveObjDic[hashCode], egret.getTimer());
            }
        }
        return false;
    };
    MapView.prototype.moveObj = function (obj, curTime) {
        var entity = obj.entity;
        if (curTime >= obj.total) {
            entity.x = obj.endPoint.x;
            entity.y = obj.endPoint.y;
            this.onChange(obj);
            this.onComplete(obj);
        }
        else {
            var time = curTime - obj.time;
            var addX = obj.vec.x * time;
            var addY = obj.vec.y * time;
            obj.time = curTime;
            entity.x += addX;
            entity.y += addY;
            this.onChange(obj);
        }
    };
    MapView.prototype.onChange = function (obj) {
        var entity = obj.entity;
        var sx = GameMap.point2Grip(entity.x);
        var sy = GameMap.point2Grip(entity.y);
        entity.alpha = GameMap.checkAlpha(sx, sy) ? 0.7 : 1;
        if (obj.isMainRole) {
            this.lookAt(entity.x, entity.y);
        }
    };
    MapView.prototype.onComplete = function (obj) {
        var hashCode = obj.entity.hashCode;
        this._stepIndex[hashCode]--;
        if (this._stepIndex[hashCode] < 0) {
            delete this.moveObjDic[hashCode];
        }
        this.moveNextStep(obj.entity, obj.path, obj.isGrid);
    };
    MapView.onGridClick = function (e) {
        return { target: e.target, x: e.stageX - e.currentTarget.x, y: e.stageY - e.currentTarget.y };
    };
    MapView.prototype.lookAt = function (x, y, force) {
        if (force === void 0) { force = false; }
        var sw = StageUtils.ins().getWidth();
        var sh = StageUtils.ins().getHeight();
        var fun = this.minValue;
        this.x = fun(x * this.scaleX, sw, GameMap.MAX_WIDTH);
        this.y = fun(y * this.scaleY, sh, GameMap.MAX_HEIGHT, 60);
        this._mapImage.updateHDMap({
            x: fun(x, sw / this.scaleX, GameMap.MAX_WIDTH),
            y: fun(y, sh / this.scaleY, GameMap.MAX_HEIGHT, 60)
        }, force);
    };
    MapView.prototype.minValue = function (tx, stw, mv, offset) {
        if (offset === void 0) { offset = 0; }
        return -Math.min(Math.max(tx - offset - (stw >> 1), 0), mv - stw);
    };
    MapView.prototype.changeMap = function () {
        if (MapView.DRAW_GRID)
            this.drawGrid();
        else if (this._shapeContainer && this._shapeContainer.parent)
            this.removeChild(this._shapeContainer);
        egret.Tween.removeTweens(this);
        egret.Tween.removeTweens(this._mapImage);
        this._mapImage.initThumbnail(GameMap.MAX_WIDTH, GameMap.MAX_HEIGHT, GameMap.getFileName(), GameMap.getTurn());
        var sc = GlobalConfig.ScenesConfig[GameMap.mapID];
        for (var i = 0; sc.effPos && i < sc.effPos.length; i++) {
            var effPos = sc.effPos[i];
            var len = effPos.pos.length;
            for (var j = 0; j < len; j++) {
                var ep = effPos.pos[j];
                var mc = ObjectPool.pop("MovieClip");
                mc.playFile(RES_DIR_EFF + effPos.eff, -1);
                mc.x = ep.x;
                mc.y = ep.y;
                this._effBottomLayer.addChild(mc);
            }
        }
        this.createNpc();
        this.addEvent();
        this.lookAt(GameMap.mapX, GameMap.mapY, true);
    };
    MapView.prototype.addEvent = function () {
        var _this = this;
        MessageCenter.ins().removeAll(this);
        MessageCenter.addListener(GameLogic.ins().postMoveEntity, this.moveEntity, this);
        MessageCenter.addListener(GameLogic.ins().postMoveCamera, function (_a) {
            var x = _a[0], y = _a[1], mapId = _a[2], fbId = _a[3];
            if (mapId == GameMap.mapID && fbId == GameMap.fubenID) {
                _this.lookAt(x, y);
            }
        }, this);
        MessageCenter.addListener(GameLogic.ins().postAdjustMapPos, this.adjustMapPos, this);
    };
    MapView.prototype.adjustMapPos = function () {
        this.x = this.x >> 0;
        this.y = this.y >> 0;
    };
    MapView.prototype.createNpc = function () {
        var sc = GlobalConfig.ScenesConfig[GameMap.mapID];
        if (sc.npc) {
            for (var i = 0; i < sc.npc.length; i++) {
                var npcModel = new NpcModel();
                npcModel.configID = sc.npc[i].id;
                npcModel.x = sc.npc[i].x * GameMap.CELL_SIZE + (GameMap.CELL_SIZE >> 1);
                npcModel.y = sc.npc[i].y * GameMap.CELL_SIZE + (GameMap.CELL_SIZE >> 1);
                npcModel.dir = sc.npc[i].d;
                GameLogic.ins().createEntityByModel(npcModel);
            }
        }
    };
    MapView.prototype.drawGrid = function () {
        var rect = this._shape || new egret.Shape();
        this._shapeContainer = this._shapeContainer || new egret.DisplayObjectContainer();
        this._shapeContainer.cacheAsBitmap = true;
        this._shapeContainer.touchEnabled = false;
        this._shapeContainer.touchChildren = false;
        rect.graphics.clear();
        rect.graphics.lineStyle(0.1);
        var maxX = GameMap.COL;
        var maxY = GameMap.ROW;
        for (var i = 0; i < maxX; i++) {
            for (var j = 0; j < maxY; j++) {
                if (GameMap.checkAlpha(i, j))
                    rect.graphics.beginFill(0x35e62d, 0.3);
                else if (GameMap.checkWalkable(i, j))
                    rect.graphics.beginFill(0xcccccc, 0.3);
                else
                    rect.graphics.beginFill(0xf3311e, 0.3);
                rect.graphics.drawRect(i * GameMap.CELL_SIZE, j * GameMap.CELL_SIZE, GameMap.CELL_SIZE, GameMap.CELL_SIZE);
                rect.graphics.endFill();
                var text = new eui.Label();
                text.size = 12;
                text.text = i + "," + j;
                text.x = i * GameMap.CELL_SIZE;
                text.y = j * GameMap.CELL_SIZE;
                this._shapeContainer.addChild(text);
            }
        }
        this._shapeContainer.addChild(rect);
        this.addChild(this._shapeContainer);
        this._shape = rect;
    };
    MapView.prototype.clearAllLayer = function () {
        this._effBottomLayer.removeChildren();
        this._effTopLayer.removeChildren();
        this._bloodLayer.removeChildren();
        this._entityLayer.removeChildren();
    };
    MapView.DRAW_GRID = false;
    __decorate([
        post
    ], MapView, "moveComplete", null);
    __decorate([
        post
    ], MapView, "onGridClick", null);
    return MapView;
}(egret.DisplayObjectContainer));
__reflect(MapView.prototype, "MapView");
//# sourceMappingURL=MapView.js.map