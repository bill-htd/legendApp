/**
 * 游戏地图
 * @author
 */
class MapView extends egret.DisplayObjectContainer {

    private _stepIndex: any;

    static DRAW_GRID: boolean = false;

    /**地图背景 */
    private _mapImage: MapViewBg;

    ///////////////////////////////对象层////////////////////////////////////
    /**物品掉落对象层 */
    private _dropLayer: egret.DisplayObjectContainer;
    /**实体对象层 */
    private _entityLayer: egret.DisplayObjectContainer;
    //掉落物名字层
    private _dropNameLayer: egret.DisplayObjectContainer;
    /**技能表现层（最底层） */
    private _effBottomLayer: egret.DisplayObjectContainer;
    /**技能表现层（最顶层） */
    private _effTopLayer: egret.DisplayObjectContainer;
    /**飘血视图层 */
    private _bloodLayer: BloodView;
    private _shape: egret.Shape;
    private _shapeContainer: egret.DisplayObjectContainer;

    public constructor() {
        super();

        this.touchEnabled = true;
        this.touchChildren = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, MapView.onGridClick, MapView);

        egret.startTick(this.onEnterFrame, this);
    }

    public initMap(): void {
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

        //注册技能表现类相关
        SkillEffPlayer.bottomLayer = this._effBottomLayer;
        SkillEffPlayer.topLayer = this._effTopLayer;
        SkillEffPlayer.setTimeout = (time: number, fun: () => void, funThis: any) => {
            TimerManager.ins().doTimer(time, 1, fun, funThis);
        };

        SkillEffPlayer.shake = (e: CharMonster, range: number, time: number, count: number, probability: number) => {
            probability = probability || 1;
            if (e == EntityManager.ins().getMainRole(0) && (Math.random() < probability)) {
                DisplayUtils.shakeIt(this._mapImage, range, time, count);
            }
        };


        //初始化掉落物品相关结构
        DropHelp.init(this._dropLayer, this._dropNameLayer);
        //定时排序实体层
        TimerManager.ins().doTimer(500, 0, this.sortEntity, this);

    }

    private sortEntity(): void {
        this._entityLayer.$children.sort(this.sortF);
    }

    private sortF(d1: CharMonster, d2: CharMonster): number {
        if (d1.weight > d2.weight) {
            return 1;
        } else if (d1.weight < d2.weight) {
            return -1;
        } else {
            return 0;
        }
    }

    public addEntity(entity: egret.DisplayObject): void {
        this._entityLayer.addChild(entity);
    }

    /**
     * 移动实体
     */
    public moveEntity(param: Array<any>): void {
        let entity: CharMonster = param[0];
        let path: AStarNode[] = param[1];
        let isGrip: boolean = param[2] == undefined ? true : !!param[2];
        if (path && path.length) {
            this._stepIndex[entity.hashCode] = path.length - 1;
            this.moveNextStep(entity, path, isGrip);

            //画红线
            //			this._lineShape.graphics.clear();
            //			this._lineShape.graphics.lineStyle(1,0xf3311e);
            //			this._lineShape.graphics.moveTo(entity.x,entity.y);
            //			for(let i = path.length - 1;i >= 0;i--) {
            //				this._lineShape.graphics.lineTo(path[i].nX * this.CELL_SIZE + (this.CELL_SIZE >> 1),path[i].nY * this.CELL_SIZE + (this.CELL_SIZE >> 1));
            //			}
            //			this._lineShape.graphics.endFill();
        }
        else {
            entity.playAction(EntityAction.STAND);
        }
    }

    @post
    static moveComplete(e: CharMonster) {
        return e;
    }

    private moveNextStep(entity: CharMonster, path: AStarNode[], isGrid: boolean = true): void {

        entity.stopMove();
        if (entity.action == EntityAction.DIE)
            return;
        if (this._stepIndex[entity.hashCode] < 0) {
            delete this._stepIndex[entity.hashCode];
            entity.playAction(EntityAction.STAND);
            MapView.moveComplete(entity);
            return;
        }

        let node: AStarNode = path[this._stepIndex[entity.hashCode]];

        let nextPoint: XY = { x: 0, y: 0 };
        let dir = node.nDir;

        if (isGrid) {
            nextPoint.x = GameMap.grip2Point(node.nX);
            nextPoint.y = GameMap.grip2Point(node.nY);
        } else {
            nextPoint.x = node.nX;
            nextPoint.y = node.nY;
        }

        if (entity instanceof CharRole || (entity.infoModel.dirNum != 2)) {
            dir = DirUtil.get8DirBy2Point(entity, nextPoint);
        } else {
            dir = DirUtil.get4DirBy2Point(entity, nextPoint);
        }

        entity.dir = dir;
        entity.playAction(EntityAction.RUN);

        this.moveToPoint(entity, nextPoint, path, isGrid);

        // //每秒200像素的移动速度
        // let moveSpeed: number = entity.moveSpeed / 1000;
        // let xbX: number = nextPoint.x - entity.x;
        // let xbY: number = nextPoint.y - entity.y;
        // let xb: number = Math.sqrt(xbX * xbX + xbY * xbY);
        //
        // let isMainRole = entity == EntityManager.ins().getNoDieRole();
        // let t: egret.Tween = egret.Tween.get(entity.moveTweenObj, {
        // 	"onChange": () => {
        // 		let sx: number = GameMap.point2Grip(entity.x);
        // 		let sy: number = GameMap.point2Grip(entity.y);
        //
        // 		entity.alpha = GameMap.checkAlpha(sx, sy) ? 0.7 : 1;
        // 		// entity.alpha = 1;
        //
        // 		if (isMainRole) {
        // 			this.lookAt(entity.x, entity.y);
        // 		}
        // 	}
        // })
        //
        // t.to({
        // 	"x": nextPoint.x,
        // 	"y": nextPoint.y
        // },
        // 	xb / moveSpeed).call(() => {
        // 		this._stepIndex[entity.hashCode]--;
        // 		this.moveNextStep(entity, path, isGrid);
        // 	}, this)
        //
        //
        // if (isMainRole) SoundUtil.ins().playRun();
    }

    private moveToPoint(entity: CharMonster, nextPoint: XY, path: any[], isGrid: boolean) {
        let curTime = egret.getTimer();
        let obj = this.moveObjDic[entity.hashCode];
        let timeGap: number = 0;
        if (obj && curTime > obj.total) {
            timeGap = obj.total - curTime;
        }
        // console.log(obj.entity.infoModel.name)
        entity.canMove = true;

        let vec: XY = {
            x: nextPoint.x - entity.x,
            y: nextPoint.y - entity.y
        }

        // //每秒200像素的移动速度
        let moveSpeed: number = entity.moveSpeed / 1000;
        let xb: number = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
        let isMainRole = entity == EntityManager.ins().getNoDieRole();

        let total = xb / moveSpeed;

        //每毫秒跑的速度
        vec.x = vec.x / total;
        vec.y = vec.y / total;

        let newObj = {
            entity: entity,
            endPoint: nextPoint,
            vec: vec,
            path: path,
            isGrid: isGrid,
            time: curTime + timeGap,
            total: curTime + total + timeGap,
            isMainRole: isMainRole
        }

        this.moveObjDic[entity.hashCode] = newObj;

        // console.log('移动时间： '+ timeGap)
        if (timeGap < 0) {
            this.moveObj(newObj, curTime);
        }

        if (isMainRole) SoundUtil.ins().playRun();
    }

    private moveObjDic: { [key: number]: CharMoveObj } = {} as any;

    private onEnterFrame(dt: number) {
        for (let hashCode in this.moveObjDic) {
            let obj = this.moveObjDic[hashCode];

            if (!obj.entity.canMove) {
                delete this.moveObjDic[hashCode];
            } else {
                this.moveObj(this.moveObjDic[hashCode], egret.getTimer());
            }
        }
        return false;
    }

    private moveObj(obj: CharMoveObj, curTime: number) {
        let entity = obj.entity;
        if (curTime >= obj.total) {
            entity.x = obj.endPoint.x;
            entity.y = obj.endPoint.y;
            this.onChange(obj);
            this.onComplete(obj);
        } else {
            let time = curTime - obj.time;
            let addX = obj.vec.x * time;
            let addY = obj.vec.y * time;
            obj.time = curTime;
            entity.x += addX;
            entity.y += addY;
            this.onChange(obj);
        }
    }

    private onChange(obj: CharMoveObj) {
        let entity = obj.entity;
        let sx: number = GameMap.point2Grip(entity.x);
        let sy: number = GameMap.point2Grip(entity.y);

        entity.alpha = GameMap.checkAlpha(sx, sy) ? 0.7 : 1;

        if (obj.isMainRole) {
            this.lookAt(entity.x, entity.y);
        }
    }

    private onComplete(obj: CharMoveObj) {
        let hashCode = obj.entity.hashCode;
        this._stepIndex[hashCode]--;
        if (this._stepIndex[hashCode] < 0) {
            delete this.moveObjDic[hashCode];
        }
        this.moveNextStep(obj.entity, obj.path, obj.isGrid);
    }

    /**
     * Handles the click event on the GridView. Finds the clicked on cell and toggles its walkable state.
     */
    @post
    static onGridClick(e: egret.TouchEvent) {

        return { target: e.target, x: e.stageX - e.currentTarget.x, y: e.stageY - e.currentTarget.y };
    }

    /**
     * 移动镜头
     * @param x 镜头中心X
     * @param y    镜头中心Y
     * @param force 是否强制执行
     */
    public lookAt(x: number, y: number, force: boolean = false): void {
        let sw = StageUtils.ins().getWidth();
        let sh = StageUtils.ins().getHeight();
        let fun = this.minValue;
        this.x = fun(x * this.scaleX, sw, GameMap.MAX_WIDTH);
        this.y = fun(y * this.scaleY, sh, GameMap.MAX_HEIGHT, 60);
        this._mapImage.updateHDMap({
            x: fun(x, sw / this.scaleX, GameMap.MAX_WIDTH),
            y: fun(y, sh / this.scaleY, GameMap.MAX_HEIGHT, 60)
        }, force);
    }

    private minValue(tx: number, stw: number, mv: number, offset: number = 0) {
        return -Math.min(Math.max(tx - offset - (stw >> 1), 0), mv - stw);
    }

    /**
     * 切换地图会清除场景上的所有显示
     */
    public changeMap(): void {
        if (MapView.DRAW_GRID)
            this.drawGrid();
        else if (this._shapeContainer && this._shapeContainer.parent)
            this.removeChild(this._shapeContainer);

        egret.Tween.removeTweens(this);
        egret.Tween.removeTweens(this._mapImage);

        this._mapImage.initThumbnail(
            GameMap.MAX_WIDTH,
            GameMap.MAX_HEIGHT,
            GameMap.getFileName(),
            GameMap.getTurn()
        );

        let sc = GlobalConfig.ScenesConfig[GameMap.mapID];
        for (let i = 0; sc.effPos && i < sc.effPos.length; i++) {
            let effPos = sc.effPos[i];
            let len = effPos.pos.length;
            for (let j = 0; j < len; j++) {
                let ep = effPos.pos[j];
                let mc = ObjectPool.pop("MovieClip");
                mc.playFile(RES_DIR_EFF + effPos.eff, -1);
                mc.x = ep.x;
                mc.y = ep.y;
                this._effBottomLayer.addChild(mc);
            }
        }

        this.createNpc();

        this.addEvent();

        this.lookAt(GameMap.mapX, GameMap.mapY, true);
    }

    protected addEvent() {
        //先移除之前的监听事件 为了解决一瞬间后端发移动坐标过来时候切换场景出现的镜头不对bug
        MessageCenter.ins().removeAll(this);
        //监听实体移动时间
        MessageCenter.addListener(GameLogic.ins().postMoveEntity, this.moveEntity, this);
        MessageCenter.addListener(GameLogic.ins().postMoveCamera, ([x, y, mapId, fbId]: [number, number, number, number]) => {
            if (mapId == GameMap.mapID && fbId == GameMap.fubenID) {
                this.lookAt(x, y);
            }
        }, this);

        MessageCenter.addListener(GameLogic.ins().postAdjustMapPos, this.adjustMapPos, this);
    }

    /**调整地图坐标 */
    private adjustMapPos(): void {
        this.x = this.x >> 0;
        this.y = this.y >> 0;
    }

    private createNpc() {
        let sc = GlobalConfig.ScenesConfig[GameMap.mapID];
        if (sc.npc) {
            for (let i = 0; i < sc.npc.length; i++) {
                let npcModel = new NpcModel();
                npcModel.configID = sc.npc[i].id;
                npcModel.x = sc.npc[i].x * GameMap.CELL_SIZE + (GameMap.CELL_SIZE >> 1);
                npcModel.y = sc.npc[i].y * GameMap.CELL_SIZE + (GameMap.CELL_SIZE >> 1);
                npcModel.dir = sc.npc[i].d;
                GameLogic.ins().createEntityByModel(npcModel);
            }
        }
    }

    /**
     * Draws the given grids, coloring each cell according to its state.
     */
    private drawGrid(): void {
        let rect: egret.Shape = this._shape || new egret.Shape();
        this._shapeContainer = this._shapeContainer || new egret.DisplayObjectContainer();
        this._shapeContainer.cacheAsBitmap = true;
        this._shapeContainer.touchEnabled = false;
        this._shapeContainer.touchChildren = false;
        rect.graphics.clear();
        rect.graphics.lineStyle(0.1);
        let maxX: number = GameMap.COL;
        let maxY: number = GameMap.ROW;
        for (let i: number = 0; i < maxX; i++) {
            for (let j: number = 0; j < maxY; j++) {
                if (GameMap.checkAlpha(i, j))
                    rect.graphics.beginFill(0x35e62d, 0.3);
                else if (GameMap.checkWalkable(i, j))
                    rect.graphics.beginFill(0xcccccc, 0.3);
                else
                    rect.graphics.beginFill(0xf3311e, 0.3);
                rect.graphics.drawRect(i * GameMap.CELL_SIZE, j * GameMap.CELL_SIZE, GameMap.CELL_SIZE, GameMap.CELL_SIZE);
                rect.graphics.endFill();

                let text: eui.Label = new eui.Label();
                text.size = 12;
                text.text = `${i},${j}`;
                text.x = i * GameMap.CELL_SIZE;
                text.y = j * GameMap.CELL_SIZE;
                this._shapeContainer.addChild(text);
            }
        }
        this._shapeContainer.addChild(rect);
        this.addChild(this._shapeContainer);
        this._shape = rect;
    }

    public clearAllLayer(): void {
        this._effBottomLayer.removeChildren();
        this._effTopLayer.removeChildren();
        this._bloodLayer.removeChildren();
        this._entityLayer.removeChildren();
    }

    // public set x(x) {
    // 	x = x >> 0;
    // 	egret.superSetter(MapView, this, 'x', x);
    // }

    // public get x() {
    // 	return egret.superGetter(MapView, this, 'x');
    // }

    // public set y(y) {
    // 	y = y >> 0;
    // 	egret.superSetter(MapView, this, 'y', y);
    // }

    // public get y() {
    // 	return egret.superGetter(MapView, this, 'y');
    // }
}
